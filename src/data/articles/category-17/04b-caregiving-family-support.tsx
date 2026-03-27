/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Article } from '@/types/models';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
import { ArticleAccordion } from '@/components/article/blocks/ArticleAccordion';
import { ArticleTabs } from '@/components/article/blocks/ArticleTabs';
import { QuoteBlock } from '@/components/article/blocks/QuoteBlock';
import { ArticleChart } from '@/components/article/blocks/ArticleChart';
import { BeforeAfter } from '@/components/article/blocks/BeforeAfter';
import { ComparisonTable } from '@/components/article/blocks/ComparisonTable';
import { ProgressSteps } from '@/components/article/blocks/ProgressSteps';
import {
  CATEGORY_AGING,
  PRIMARY_AUTHOR,
  CLINICAL_REVIEWER,
  catId,
} from './_shared';
export const caregivingFamilySupportArticlesB: Article[] = [
  {
    id: catId(26),
    slug: 'paying-for-elder-care-medicare-medicaid-and-long-term-care-insurance',
    title: 'Paying for Elder Care: Medicare, Medicaid, and Long-Term Care Insurance',
    description: `Navigate the complex landscape of elder care financing: what Medicare covers (and doesn't), Medicaid spend-down rules, long-term care insurance, and out-of-pocket costs.`,
    image: '/images/articles/cat17/cover-026.svg',
    category: CATEGORY_AGING,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Medicare', 'Medicaid', 'Long-Term Care Insurance', 'Elder Care Costs'],

    summary: `Elder care is expensive, and the American healthcare system makes payment rules nearly impenetrable. Medicare covers acute medical care but does NOT cover long-term custodial care that most older adults with dementia or frailty need. Medicaid covers long-term care, but only after you "spend down" assets to near-poverty levels. Long-term care insurance can fill the gap if purchased decades before you need it. This article translates the Byzantine rules into actionable guidance.`,

    keyFacts: [
      {
        text: `Medicare does NOT cover long-term custodial care (help with bathing, dressing, eating); it covers only short-term skilled nursing care after hospitalization (up to 100 days under specific conditions).`,
        citationIndex: 1,
      },
      {
        text: `Medicaid covers long-term care (nursing home, home health), but eligibility requires "spending down" assets to $2,000-3,000 (varies by state) and meeting income limits.`,
        citationIndex: 2,
      },
      {
        text: `Average nursing home cost in the U.S.: $8,500-12,000/month ($102,000-144,000/year); average duration of stay: 2.5 years, meaning total cost often exceeds $250,000.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The cruelest truth of American elder care: Medicare pays for the heart surgery that saves your life at 75, but not for the help dressing yourself at 85. One is acute care; the other is living. The system covers only the former.`,

    practicalExercise: {
      title: 'Elder Care Financial Planning',
      steps: [
        {
          title: 'Understand Medicare Coverage',
          description: `Medicare Part A covers hospitalization. Medicare Part B covers doctor visits. Medicare does NOT cover: long-term nursing home care, in-home help with bathing/dressing, adult day care, assisted living.`,
        },
        {
          title: 'Check Medicaid Eligibility',
          description: `Visit your state Medicaid office to determine asset limit ($2,000-3,000), income limit, and 5-year look-back period. If assets exceed limit, you must "spend down" first.`,
        },
        {
          title: 'Review Long-Term Care Insurance',
          description: `If under age 60, consider purchasing. Cost: $1,500-4,000/year depending on age. Must buy when healthy. Review daily benefit amount, benefit period, and inflation protection.`,
        },
      ],
      toolLink: 'https://www.medicare.gov/',
      toolLabel: 'Medicare Coverage Tool',
    },

    citations: [
      {
        id: '1',
        text: 'Centers for Medicare & Medicaid Services. Medicare Coverage of Skilled Nursing Facility Care.',
        source: 'CMS',
        year: '2023',
        link: 'https://www.medicare.gov/coverage/skilled-nursing-facility-snf-care',
        tier: 2,
      },
      {
        id: '2',
        text: 'Kaiser Family Foundation. Medicaid and Long-Term Services and Supports: A Primer.',
        source: 'Kaiser Family Foundation',
        year: '2022',
        link: 'https://www.kff.org/medicaid/',
        tier: 2,
      },
      {
        id: '3',
        text: 'Genworth Cost of Care Survey 2023.',
        source: 'Genworth Financial',
        year: '2023',
        link: 'https://www.genworth.com/aging-and-you/finances/cost-of-care.html',
        tier: 3,
      },
      {
        id: '4',
        text: 'American Association for Long-Term Care Insurance. Facts.',
        source: 'AALTCI',
        year: '2023',
        link: 'https://www.aaltci.org/',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          Your mother has advanced dementia. She cannot bathe, dress, or toilet herself. She needs 24-hour supervision. You assume Medicare will cover a nursing home. You are wrong. Medicare covers hospitalization, surgery, doctor visits---not custodial care. The gap between what Medicare covers and what older adults need is the financial cliff of American aging.
          <Citation index={1} />
        </p>

        <h2>What Medicare Covers (and Doesn't)</h2>
        <p>
          Medicare is federal health insurance for people 65+ and younger people with disabilities. It covers acute care---treatment for illness or injury---but NOT long-term custodial care. Medicare does NOT cover: nursing home stays beyond 100 days post-hospitalization, assisted living, in-home help with bathing/dressing/eating, adult day care, memory care.
          <Citation index={2} />
        </p>

        <StatCard
          value="$250,000"
          label="average total out-of-pocket cost for 2.5 years of nursing home care before Medicaid eligibility"
          description="Most families must spend down assets---paying $8,500-12,000/month---until they qualify for Medicaid."
        />

        <h2>Medicaid: The Safety Net</h2>
        <p>
          Medicaid is a joint federal-state program that covers healthcare for low-income individuals. Unlike Medicare, Medicaid DOES cover long-term custodial care. But there is a catch: you must be poor---or become poor---to qualify. Asset limit: $2,000-3,000 for individual. Look-back period: Medicaid reviews 5 years of financial records; gifts or asset transfers within 5 years cause penalties.
          <Citation index={3} />
        </p>

        <ArticleCallout variant="warning" title="The Medicaid Spend-Down">
          <p>
            If your parent has assets above the Medicaid limit, they must "spend down"---use their money to pay for care---until they qualify. Example: Your father has $150,000 in savings. Nursing home costs $10,000/month. He pays out-of-pocket for 15 months, reducing savings to $0. He then qualifies for Medicaid. Spend-down is financially devastating for families.
          </p>
        </ArticleCallout>

        <h2>Long-Term Care Insurance: Worth It?</h2>
        <p>
          Long-term care insurance pays for custodial care that Medicare does not cover. Policies typically pay a daily benefit ($150-300/day) for a set period (2-5 years or lifetime). You pay premiums ($2,000-5,000/year) for decades before you need it. Is it worth it? Depends on your age, assets, and health.
          <Citation index={4} />
        </p>

        <QuoteBlock
          quote="The middle-class trap of elder care: too much money to qualify for Medicaid, too little money to afford private care. The system punishes prudence and rewards spend-down."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(27),
    slug: 'cultural-considerations-in-elder-care-family-expectations',
    title: 'Cultural Considerations in Elder Care: Family Expectations and Tradition',
    description: `Explore how culture shapes elder care expectations, from multigenerational households to nursing home taboos, and navigate conflicts between tradition and capacity.`,
    image: '/images/articles/cat17/cover-027.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Cultural Competence', 'Family Caregiving', 'Multigenerational Care', 'Tradition'],

    summary: `Culture shapes every aspect of elder care: who provides care, where care happens, how decisions are made, and what constitutes "good" caregiving. In many cultures, placing a parent in a nursing home is seen as abandonment. Yet the realities of modern life make traditional family caregiving increasingly unsustainable. This article explores cultural norms, the conflicts that arise when tradition meets capacity, and strategies for navigating these tensions.`,

    keyFacts: [
      {
        text: `Asian American, Hispanic, and African American families are more likely to provide family-based elder care and less likely to use nursing homes compared to non-Hispanic white families.`,
        citationIndex: 1,
      },
      {
        text: `Filial piety---the cultural expectation that adult children care for aging parents---is strong in Asian, Hispanic, and Middle Eastern cultures, often creating guilt when institutional care is needed.`,
        citationIndex: 2,
      },
      {
        text: `Immigrant caregivers face unique challenges: language barriers with healthcare providers, lack of knowledge about U.S. eldercare systems, and isolation from extended family networks.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Culture is not a costume you can take off when caregiving gets hard. It is the architecture of your sense of duty, shame, honor, and love. The question is not whether to honor culture, but how to honor it without destroying yourself.`,

    practicalExercise: {
      title: 'Navigating Cultural Expectations',
      steps: [
        {
          title: 'Identify Cultural Beliefs',
          description: `What does your culture teach about elder care? Who is expected to provide care? Is nursing home placement acceptable or taboo? How are decisions made?`,
        },
        {
          title: 'Assess Realistic Capacity',
          description: `What can you actually do? Do you live near your parent? Can you afford to quit work? Do you have medical training for complex care needs? Is your home suitable?`,
        },
        {
          title: 'Explore Culturally Sensitive Options',
          description: `Hybrid model---family provides some care, professional aides provide rest. Adult day care. Assisted living with cultural affinity. Family conference with social worker.`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Caregiving Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Dilworth-Anderson, P., et al. Racial and ethnic differences in perceptions of caregiver burden.',
        source: 'The Gerontologist',
        year: '2004',
        link: 'https://doi.org/10.1093/geront/44.2.237',
        tier: 1,
      },
      {
        id: '2',
        text: 'Pharr, J. R., et al. The influence of cultural values on immigrant Latino parents perceptions of family caregiving.',
        source: 'Journal of Aging Studies',
        year: '2014',
        link: 'https://doi.org/10.1016/j.jaging.2014.02.001',
        tier: 1,
      },
      {
        id: '3',
        text: 'Jang, Y., et al. Symptoms of depression in Korean older immigrants.',
        source: 'Aging & Mental Health',
        year: '2007',
        link: 'https://doi.org/10.1080/13607860701368497',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          You are a 45-year-old Chinese American woman. Your mother has dementia. Your father insists she stay at home---nursing homes are for people who have no family. Your brother lives across the country. Your mother wanders at night, forgets the stove, does not recognize you. You work full-time, have two teenagers, sleep four hours a night. You are drowning. But when you mention assisted living, your father says: "What will people think?"
          <Citation index={1} />
        </p>

        <h2>Cultural Norms Around Elder Care</h2>
        <p>
          Different cultures have different expectations: Asian cultures value filial piety---adult children are expected to care for aging parents at home. Hispanic cultures emphasize familismo---family loyalty and interdependence. African American cultures rely on extended family networks and church community. Middle Eastern cultures view nursing home placement as taboo.
          <Citation index={2} />
        </p>

        <StatCard
          value="68%"
          label="of Hispanic caregivers and 64% of Asian caregivers live with the person they care for"
          description="Compared to 37% of non-Hispanic white caregivers. Multigenerational households are more common in immigrant communities."
        />

        <h2>When Tradition Meets Reality</h2>
        <p>
          Traditional models of elder care assume extended family lives nearby, women do not work outside the home, medical needs are basic, and community provides support. In modern America, these assumptions often do not hold. Families are geographically dispersed, women work full-time, medical care is complex, and social isolation is common.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="You are not betraying your culture by setting limits. You are honoring it by caring for your family in the only way that is sustainable. Tradition that demands self-destruction is not tradition---it is trauma dressed as duty."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(28),
    slug: 'sandwich-generation-caregiving-for-parents-and-children',
    title: 'Sandwich Generation: Caregiving for Parents and Children Simultaneously',
    description: `Navigate the unique pressures of caring for aging parents while raising children: time scarcity, financial strain, and strategies for sustainable dual caregiving.`,
    image: '/images/articles/cat17/cover-028.svg',
    category: CATEGORY_AGING,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sandwich Generation', 'Dual Caregiving', 'Work-Life Balance', 'Financial Strain'],

    summary: `You are 48 years old. Your mother has dementia; your youngest child is 14. You manage medications and doctor appointments while driving carpool and helping with homework. You work full-time because you need the income and health insurance. You are the "sandwich generation"---squeezed between aging parents and dependent children, with no time, money, or energy left for yourself. Nearly half of adults in their 40s and 50s are in this position.`,

    keyFacts: [
      {
        text: `Forty-seven percent of adults in their 40s and 50s have a parent age 65+ AND are raising or financially supporting a child; this "sandwich generation" provides an average of 21 hours/week of parent care.`,
        citationIndex: 1,
      },
      {
        text: `Sandwich generation caregivers are twice as likely to experience depression, anxiety, and chronic stress compared to non-caregivers, with women disproportionately affected.`,
        citationIndex: 2,
      },
      {
        text: `Financial strain is acute: sandwich caregivers spend an average of $10,000/year on parent care out-of-pocket while simultaneously paying for child expenses, often delaying retirement savings.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The sandwich generation lives in permanent triage: Which need is most urgent---your mother's fall, your daughter's college application, or your own chest pain? The answer is always someone else's crisis, never your own.`,

    practicalExercise: {
      title: 'Triage and Delegation System',
      steps: [
        {
          title: 'Map All Tasks',
          description: `List every caregiving task for parents and children. List work and household tasks. Be exhaustive.`,
        },
        {
          title: 'Categorize by Urgency',
          description: `Critical (only you): medication management, school meetings, urgent work. Delegable: meal prep, housecleaning, grocery shopping, driving. Professional: wound care, financial planning.`,
        },
        {
          title: 'Delegate or Eliminate',
          description: `Hire help for delegable tasks. Use parent's assets to pay for their care. Ask family for specific tasks. Hire professionals for specialized work.`,
        },
        {
          title: 'Protect Non-Negotiables',
          description: `Identify 3-5 things you will NOT sacrifice: sleep 7 hours/night, family dinner 3x/week, therapy appointments. Check new demands against these.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Mental Health',
    },

    citations: [
      {
        id: '1',
        text: 'Pew Research Center. The Sandwich Generation: Rising Financial Burdens.',
        source: 'Pew Research',
        year: '2013',
        link: 'https://www.pewresearch.org/social-trends/',
        tier: 2,
      },
      {
        id: '2',
        text: 'Do, E. K., et al. Psychosocial factors associated with the sandwich generation.',
        source: 'The Gerontologist',
        year: '2014',
        link: 'https://doi.org/10.1093/geront/gnt100',
        tier: 1,
      },
      {
        id: '3',
        text: 'MetLife Mature Market Institute. Caregiving Costs to Working Caregivers.',
        source: 'MetLife',
        year: '2011',
        link: 'https://www.metlife.com/about-us/newsroom/2011/june/',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          It is Tuesday. You wake at 5:30 a.m. to pack your son's lunch, drive him to school, then race to your mother's apartment. She has not bathed in three days. You help her shower, argue about pills, drive her to dialysis. You arrive at work two hours late. At lunch, your daughter calls crying---she failed a math test. After work, you shop for groceries, cook two dinners, help with homework. At 11 p.m., you collapse. Tomorrow, repeat.
          <Citation index={1} />
        </p>

        <h2>Who Is the Sandwich Generation?</h2>
        <p>
          The "sandwich generation" refers to adults (typically ages 40-60) who are simultaneously caring for aging parents AND raising or financially supporting children. This dual responsibility creates unique pressures: time scarcity, financial strain, emotional exhaustion, work-life conflict. Women are disproportionately affected.
          <Citation index={2} />
        </p>

        <StatCard
          value="21 hours"
          label="average hours per week sandwich caregivers spend on parent care"
          description="In addition to child care, household tasks, and full-time work. That's a part-time job with no pay and no time off."
        />

        <h2>Financial Strain: Paying for Two Generations</h2>
        <p>
          Sandwich caregivers face dual financial burdens: parent care costs ($10,000/year average out-of-pocket) and child expenses (childcare, school, college). Plus mortgage, healthcare, retirement savings. Many are simultaneously paying for children's college and parents' nursing home---while earning less because they reduced work hours for caregiving.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="You are not failing if you cannot do it all. You are failing if you destroy yourself trying. The difference between martyrdom and caregiving is whether you survive."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(29),
    slug: 'transitioning-from-caregiver-to-bereavement-grief-after-caregiving',
    title: 'Transitioning from Caregiver to Bereavement: Grief After Long-Term Caregiving',
    description: `Understand the complex grief that follows caregiving: relief, guilt, identity loss, and the process of rebuilding life after years of intensive care.`,
    image: '/images/articles/cat17/cover-029.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Caregiver Grief', 'Bereavement', 'Identity Transition', 'Complicated Grief'],

    summary: `For five years, you were a caregiver. Your identity, schedule, and purpose revolved around your mother. Then she dies. Suddenly, the phone stops ringing with crisis calls. The calendar is empty. You feel relief. Then guilt for feeling relieved. Then emptiness. Who are you if you are not a caregiver? Grief after long-term caregiving is complicated---it mixes sorrow with liberation, guilt with exhaustion, and the disorienting task of rebuilding an identity consumed by caregiving.`,

    keyFacts: [
      {
        text: `Seventy-two percent of bereaved caregivers report feeling relief at their loved one's death; this is immediately followed by guilt, creating "complicated grief" that is harder to resolve.`,
        citationIndex: 1,
      },
      {
        text: `Caregivers experience anticipatory grief---mourning losses while the person is still alive---which can make post-death grief feel anticlimactic or confusing.`,
        citationIndex: 2,
      },
      {
        text: `Post-caregiving identity crisis is common: after years of caregiving consuming all time and energy, former caregivers struggle to remember who they were before or envision who they want to be now.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Grief after caregiving is not just mourning a person---it is mourning the version of yourself who existed only in relation to them. You are not returning to your old life. There is no old life. There is only the strange, guilty work of building a new one.`,

    practicalExercise: {
      title: 'Rebuilding After Caregiving',
      steps: [
        {
          title: 'Acknowledge All Feelings',
          description: `Write down every feeling---sadness, relief, guilt, anger, numbness, peace. All are valid. Relief does not mean you did not love them.`,
        },
        {
          title: 'Grieve What Was Lost Before Death',
          description: `List what you mourned while they were alive: their personality, independence, conversations. Acknowledge that much of your grief happened before death.`,
        },
        {
          title: 'Reclaim Time and Identity',
          description: `For 1 month, journal: What did I do today that was NOT caregiving? What did I enjoy? Slowly reintroduce pre-caregiving activities. Give yourself permission to enjoy life.`,
        },
        {
          title: 'Seek Support',
          description: `Join a bereavement support group for former caregivers. If grief is severe (cannot function after 6+ months, suicidal thoughts), see a grief therapist.`,
        },
      ],
      toolLink: '/crisis',
      toolLabel: 'Crisis Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Schulz, R., et al. End-of-life care and the effects of bereavement on family caregivers.',
        source: 'New England Journal of Medicine',
        year: '2003',
        link: 'https://doi.org/10.1056/NEJMsa035373',
        tier: 1,
      },
      {
        id: '2',
        text: 'Holley, C. K., & Mast, B. T. The impact of anticipatory grief on caregiver burden.',
        source: 'The Gerontologist',
        year: '2009',
        link: 'https://doi.org/10.1093/geront/gnp061',
        tier: 1,
      },
      {
        id: '3',
        text: 'Larkin, M. Life after caring: The post-caring experiences of former carers.',
        source: 'British Journal of Social Work',
        year: '2009',
        link: 'https://doi.org/10.1093/bjsw/bcn030',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Your mother died on a Tuesday. For five years, you cared for her: bathed her, changed her, fed her, held her hand when she cried. You quit your job, lost friends, gained weight, developed high blood pressure. And now she is gone. The hospice nurse says, "You were a wonderful daughter." You nod. You feel nothing. Then, hours later: relief. The phone will not ring at 2 a.m. You are free. Then, immediately: crushing guilt. What kind of person feels relieved?
          <Citation index={1} />
        </p>

        <h2>Anticipatory Grief: Mourning Before Death</h2>
        <p>
          Anticipatory grief is the mourning that happens before death---grieving losses while the person is still alive. For dementia caregivers, this is acute: You grieve the loss of conversation, the loss of the parent-child relationship, the loss of her personality. By the time death comes, much of your grief has already occurred. This is why post-death grief can feel anticlimactic or "not sad enough." You are not cold---you already mourned.
          <Citation index={2} />
        </p>

        <StatCard
          value="72%"
          label="of bereaved caregivers report feeling relief at their loved one's death"
          description="This is immediately followed by guilt. Relief is not evidence of lack of love---it is evidence that caregiving was hard and death ended suffering."
        />

        <h2>Identity Crisis: Who Am I Now?</h2>
        <p>
          For years, caregiving consumed your identity. You introduced yourself as "my mom's caregiver." Your schedule revolved around her needs. Now she is gone---and so is your role. Your calendar is empty. Your identity is erased. Your social circle has shrunk. Many former caregivers describe feeling "lost," "purposeless," or "like a ghost." This is identity grief---mourning the version of yourself that existed only in relation to caregiving.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Grief after caregiving is not just mourning a death---it is mourning the life you gave up, the self you lost, and the future you will never have with them. It is complex because the loss is layered. Be patient with yourself."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(30),
    slug: 'recognizing-elder-abuse-and-neglect-warning-signs-reporting',
    title: 'Recognizing Elder Abuse and Neglect: Warning Signs and Reporting',
    description: `Identify signs of elder abuse (physical, financial, emotional, neglect) and understand mandatory reporting, investigation processes, and protective interventions.`,
    image: '/images/articles/cat17/cover-030.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Elder Abuse', 'Neglect', 'Protective Services', 'Reporting'],

    summary: `One in ten older adults experiences abuse---physical violence, financial exploitation, emotional manipulation, or neglect. Most abuse occurs at home, committed by family members or paid caregivers. Victims are often isolated, cognitively impaired, or financially dependent on the abuser. Warning signs include unexplained bruises, sudden financial changes, fearfulness, poor hygiene, and malnutrition. If you suspect elder abuse, you are legally required to report it in most states.`,

    keyFacts: [
      {
        text: `One in ten adults age 60+ experiences abuse annually; only 1 in 24 cases is reported to authorities, making elder abuse vastly underdetected and under-prosecuted.`,
        citationIndex: 1,
      },
      {
        text: `Financial exploitation is the most common form of elder abuse, with older adults losing an estimated $3 billion per year to scams, theft by family members, and fraudulent caregivers.`,
        citationIndex: 2,
      },
      {
        text: `Ninety percent of abusers are family members or trusted caregivers; spouses and adult children are the most common perpetrators, often motivated by financial stress or caregiver burnout.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Elder abuse is invisible because we do not want to see it. We want to believe that families protect their elders, that nursing homes are safe, that the bruises are from falls. But abuse thrives in denial. Seeing it---and reporting it---is an act of courage.`,

    practicalExercise: {
      title: 'Recognizing and Reporting Abuse',
      steps: [
        {
          title: 'Learn Warning Signs',
          description: `Physical: unexplained bruises, fractures, burns, signs of restraint. Financial: sudden withdrawals, unpaid bills despite funds, new "friends" managing money. Emotional: fearfulness, withdrawal. Neglect: poor hygiene, malnutrition, untreated medical conditions.`,
        },
        {
          title: 'Document Observations',
          description: `Note dates, times, specific observations (bruises on left arm, elder flinched when son entered room). Take photos if possible. Do not confront suspected abuser.`,
        },
        {
          title: 'Report to Adult Protective Services',
          description: `Call your state Adult Protective Services (APS) hotline or Eldercare Locator: 1-800-677-1116. Provide elder's name, address, description of suspected abuse. You can report anonymously. If immediate danger, call 911 first.`,
        },
        {
          title: 'Follow Up',
          description: `APS investigates within 24-72 hours. Outcomes: victim refuses services, APS provides services, emergency removal, or criminal charges. Stay involved, check on elder, report new concerns.`,
        },
      ],
      toolLink: 'https://www.napsa-now.org/get-help/help-in-your-area/',
      toolLabel: 'Find Local APS',
    },

    citations: [
      {
        id: '1',
        text: 'Acierno, R., et al. Prevalence and correlates of emotional, physical, sexual, and financial abuse: The National Elder Mistreatment Study.',
        source: 'American Journal of Public Health',
        year: '2010',
        link: 'https://doi.org/10.2105/AJPH.2009.163089',
        tier: 1,
      },
      {
        id: '2',
        text: 'MetLife Mature Market Institute. Broken Trust: Elders, Family, and Finances.',
        source: 'MetLife',
        year: '2009',
        link: 'https://www.metlife.com/about-us/newsroom/',
        tier: 3,
      },
      {
        id: '3',
        text: 'National Center on Elder Abuse. Elder Abuse: The Size of the Problem.',
        source: 'Administration on Aging',
        year: '2021',
        link: 'https://ncea.acl.gov/',
        tier: 2,
      },
    ],

    content: (
      <>
        <p>
          You visit your uncle in his home. He is 82, has diabetes, lives with his adult son. You notice bruises on his arms ("I fell"), unpaid bills on the table despite his pension income ("My son handles the money"), and a fearful look when his son enters the room. Your uncle says he is fine. His son says, "Dad is just clumsy---you know how old people are." You want to believe them. But something is wrong.
          <Citation index={1} />
        </p>

        <h2>What Is Elder Abuse?</h2>
        <p>
          Elder abuse is intentional or negligent harm to an older adult by someone in a position of trust. Types: Physical abuse (hitting, slapping, restraining), Sexual abuse, Emotional/psychological abuse (verbal assaults, threats, humiliation, isolation), Financial exploitation (theft, fraud, coercion), Neglect (failure to provide necessary care).
          <Citation index={2} />
        </p>

        <StatCard
          value="1 in 10"
          label="older adults experiences abuse annually"
          description="Only 1 in 24 cases is reported. Elder abuse is vastly underdetected, under-reported, and under-prosecuted."
        />

        <h2>Warning Signs of Elder Abuse</h2>
        <p>
          Physical abuse signs: Unexplained bruises, fractures, burns (especially in unusual locations), rope marks, over-sedation. Financial abuse signs: Sudden large withdrawals, unpaid bills despite adequate income, new "friend" managing finances, missing valuables. Emotional abuse signs: Fearfulness, withdrawal, caregiver speaks for elder. Neglect signs: Poor hygiene, malnutrition, dehydration, untreated medical conditions, unsafe living conditions.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Elder abuse is invisible because we do not want to see it. Families are supposed to protect, not harm. But denial does not prevent abuse---it enables it. Seeing and reporting abuse is an act of protection."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
];
