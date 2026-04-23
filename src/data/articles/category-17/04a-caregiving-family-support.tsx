/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_AGING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ArticleChart,
  ComparisonTable,
  ArticleAccordion,
  ArticleTabs,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const caregivingFamilySupportArticlesA: Article[] = [
  {
    id: catId(21),
    slug: 'caring-for-the-caregiver-professional-support-and-resources',
    status: 'archived',
    title: 'Caring for the Caregiver: Professional Support and Resources',
    description:
      'Comprehensive guide to respite care, adult day programs, in-home services, and community resources that support family caregivers.',
    image: '/images/articles/cat17/cover-021.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Respite Care', 'Adult Day Programs', 'Caregiver Resources', 'Support Services'],

    summary:
      'Professional support services are essential infrastructure for family caregiving sustainability. Adult day programs provide structured activities, socialization, and supervision 3-7 days per week (cost: $70-100 per day, often subsidized by Medicaid or Veterans Affairs). In-home respite care offers paid aides for hours or overnight (cost: $20-30 per hour). Temporary nursing home placement provides 1-2 weeks of 24/7 care for caregiver recovery or vacation. Support groups (Alzheimer Association, hospitals, faith communities) connect caregivers with peers and provide education. Care management coordinates medical appointments, benefits, and services. Financial assistance includes Medicare (limited respite for hospice patients), Medicaid (more comprehensive for low-income), Veterans Affairs (Aid and Attendance benefit), and private long-term care insurance. Barriers to accessing services: cost, lack of awareness, guilt, resistance from care recipient, geographic availability. Overcoming barriers requires education, planning, and recognizing that using services is not abandonment--it is responsible caregiving.',

    keyFacts: [
      {
        text: 'Adult day programs cost $70-100 per day but reduce caregiver depression by 30-40% and delay nursing home placement by 6-12 months.',
        citationIndex: 1,
      },
      {
        text: 'Only 20% of eligible caregivers use respite services--underutilization due to cost, guilt, and lack of awareness.',
        citationIndex: 2,
      },
      {
        text: 'Medicaid covers in-home and community-based services for low-income older adults, including respite and adult day care.',
        citationIndex: 3,
      },
      {
        text: 'Veterans and surviving spouses may qualify for Aid and Attendance benefit (up to $2,431 per month) to help pay for care.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Professional support is not a luxury for caregivers--it is a necessity. You cannot sustain caregiving alone any more than you can hold your breath indefinitely.',

    practicalExercise: {
      title: 'Building Your Support Network',
      steps: [
        {
          title: 'Contact Area Agency on Aging (AAA)',
          description: 'Call Eldercare Locator: 1-800-677-1116 or visit eldercare.acl.gov. AAA connects you to local services: adult day programs, in-home care, transportation, Meals on Wheels, support groups. Many services are free or sliding-scale.',
        },
        {
          title: 'Explore Adult Day Programs',
          description: 'Visit 2-3 adult day centers. Observe activities, staff interactions, safety. Most offer trial days. Programs provide meals, activities, nursing supervision. Cost: $70-100 per day; Medicaid may cover for eligible individuals.',
        },
        {
          title: 'Arrange In-Home Respite',
          description: 'Hire through home health agencies (vetted, insured aides) or privately (lower cost but you manage). Start with 4 hours per week, increase as needed. Use this time for errands, appointments, exercise, rest--not more caregiving tasks.',
        },
        {
          title: 'Join a Support Group',
          description: 'Alzheimer Association (alz.org or 1-800-272-3900) offers free in-person and virtual support groups. Hospital-based groups, faith communities, and senior centers also host groups. Attend 2-3 sessions before deciding if it fits.',
        },
        {
          title: 'Apply for Financial Assistance',
          description: 'Check Medicaid eligibility (medicaid.gov). Veterans: contact VA (1-800-827-1000) about Aid and Attendance. Explore long-term care insurance if you have a policy. Many services have financial aid for those who qualify.',
        },
      ],
      toolLink: '/resources/caregiver-services',
      toolLabel: 'Find Local Services',
    },

    citations: [
      {
        id: '1',
        text: 'Gaugler et al. (2003). Adult day service use and reductions in caregiving hours. International Journal of Geriatric Psychiatry, 18(1), 55-62.',
        source: 'International Journal of Geriatric Psychiatry',
        year: '2003',
        link: 'https://doi.org/10.1002/gps.772',
        tier: 1,
      },
      {
        id: '2',
        text: 'Zarit et al. (2011). Caregivers of persons with dementia: Characteristics and service use. In V. Tuokko & D. Hultsch (Eds.), Mild cognitive impairment. Psychology Press.',
        source: 'Psychology Press',
        year: '2011',
        link: 'https://www.taylorfrancis.com/chapters/edit/10.4324/9780203841174',
        tier: 5,
      },
      {
        id: '3',
        text: 'Medicaid.gov (2024). Home and Community-Based Services.',
        source: 'Centers for Medicare & Medicaid Services',
        year: '2024',
        link: 'https://www.medicaid.gov/medicaid/home-community-based-services/',
        tier: 2,
      },
      {
        id: '4',
        text: 'U.S. Department of Veterans Affairs (2024). Aid and Attendance and Housebound Benefits.',
        source: 'U.S. Department of Veterans Affairs',
        year: '2024',
        link: 'https://www.va.gov/pension/aid-attendance-housebound/',
        tier: 2,
      },
      {
        id: '5',
        text: 'National Alliance for Caregiving (2020). Caregiving in the U.S. 2020 Report.',
        source: 'National Alliance for Caregiving',
        year: '2020',
        link: 'https://www.caregiving.org/caregiving-in-the-us-2020/',
        tier: 3,
      },
      {
        id: '6',
        text: 'Gitlin et al. (2010). Effect of multicomponent interventions on caregiver burden and depression. Psychology and Aging, 25(2), 406-418.',
        source: 'Psychology and Aging',
        year: '2010',
        link: 'https://doi.org/10.1037/a0018713',
        tier: 1,
      },
      {
        id: '7',
        text: 'Montgomery et al. (2002). A cost-benefit analysis of respite care. Journal of Applied Gerontology, 21(2), 151-171.',
        source: 'Journal of Applied Gerontology',
        year: '2002',
        link: 'https://doi.org/10.1177/07364802021002002',
        tier: 1,
      },
      {
        id: '8',
        text: 'Brodaty & Donkin (2009). Family caregivers of people with dementia. Dialogues in Clinical Neuroscience, 11(2), 217-228.',
        source: 'Dialogues in Clinical Neuroscience',
        year: '2009',
        link: 'https://doi.org/10.31887/DCNS.2009.11.2/hbrodaty',
        tier: 1,
      },
    ],

    content: (
      <>
        <h2>Why Professional Support Is Not Optional</h2>
        <p>
          Family caregivers provide an average of 24 hours per week of unpaid care--for dementia caregivers, 40+ hours per week. This is a full-time job with no vacation, no benefits, and no training. Without professional support--respite care, adult day programs, in-home services--caregiver burnout is inevitable. Burnout leads to depression, physical illness, premature nursing home placement, and caregiver mortality.
          <Citation index={8} />
        </p>

        <p>
          Professional support is not a luxury or a sign of weakness--it is essential infrastructure. Just as a building cannot stand without a foundation, caregiving cannot be sustained without support services. Yet only 20% of eligible caregivers use respite care. Barriers: cost, guilt ("I should be able to do this alone"), resistance from care recipient ("I don not want strangers in my house"), and lack of awareness of available services.
          <Citation index={2} />
        </p>

        <StatCard
          stats={[
            { value: '20%', label: 'Caregivers who use respite services', description: 'Despite high need, only 1 in 5 eligible caregivers accesses professional support.' },
            { value: '30-40%', label: 'Reduction in caregiver depression with adult day programs', description: 'Professional support measurably improves caregiver mental health.' },
          ]}
        />

        <h2>Adult Day Programs: The Cornerstone of Respite</h2>
        <p>
          Adult day programs (also called adult day care or adult day health centers) provide structured activities, meals, socialization, and supervision for older adults in a group setting, typically 8am-5pm, 3-7 days per week. Participants engage in cognitive activities, exercise, social interaction, and receive nursing oversight. Caregivers get predictable, reliable breaks.
          <Citation index={1} />
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'What Happens at Adult Day',
              content: (
                <>
                  <p>
                    Morning: Arrival, health check (blood pressure, medications), breakfast, group activities (music, reminiscence, current events discussion). Midday: Lunch, cognitive activities (puzzles, crafts, games), physical exercise (chair yoga, walking, dancing). Afternoon: Social time, snacks, quiet activities (reading, TV). Programming varies by center--some focus on dementia-specific activities, others serve broader populations. Staff includes activity directors, social workers, nurses, and aides.
                    <Citation index={1} />
                  </p>
                </>
              ),
            },
            {
              label: 'Benefits for Participant and Caregiver',
              content: (
                <>
                  <p>
                    <strong>For participant</strong>: Socialization reduces isolation and depression. Cognitive and physical activities slow decline. Structured routine provides stability. Meals address nutrition. Nursing oversight monitors health. <strong>For caregiver</strong>: Reliable 8-hour breaks 3-5 days per week. Time for work, errands, appointments, exercise, rest. Reduces caregiver depression by 30-40%. Delays nursing home placement by 6-12 months. Cost savings: adult day care is far cheaper than nursing home ($70-100 per day vs. $300+ per day).
                    <Citation index={1} />
                  </p>
                </>
              ),
            },
            {
              label: 'Cost and Coverage',
              content: (
                <>
                  <p>
                    Cost: $70-100 per day (average $75-85). Some centers offer sliding-scale fees. <strong>Medicaid</strong> covers adult day care for eligible low-income individuals in most states (check state Medicaid plan). <strong>Veterans Affairs</strong> covers adult day health care for eligible veterans. <strong>Long-term care insurance</strong> may cover if policy includes adult day care benefit. <strong>Private pay</strong>: still cheaper than in-home aides ($20-30 per hour x 8 hours = $160-240 per day vs. $75 adult day).
                    <Citation index={3} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>In-Home Respite Care</h2>
        <p>
          In-home respite brings paid caregivers (certified nursing assistants, home health aides, or companions) to your home to stay with your loved one for hours or overnight. This allows caregivers to leave the house for errands, appointments, or rest while knowing loved one is supervised.
          <Citation index={7} />
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Types of In-Home Respite',
              content: (
                <>
                  <ul>
                    <li><strong>Hourly respite</strong>: 2-8 hours. Use for errands, appointments, exercise, social activities. Cost: $20-30 per hour.</li>
                    <li><strong>Overnight respite</strong>: 8-12 hours. Allows caregiver to sleep uninterrupted. Critical for caregivers dealing with nighttime wandering or incontinence. Cost: $150-250 per night.</li>
                    <li><strong>24-hour live-in care</strong>: Aide lives in home for days or weeks. Provides round-the-clock supervision. Cost: $200-400 per day.</li>
                  </ul>
                  <Citation index={7} />
                </>
              ),
            },
            {
              title: 'How to Arrange In-Home Respite',
              content: (
                <>
                  <p>
                    <strong>Through home health agencies</strong>: Agencies vet, train, insure, and supervise aides. More expensive ($25-35 per hour) but less risk. Agencies handle scheduling, substitutes if aide is sick, and oversight. <strong>Private hire</strong>: Cheaper ($15-25 per hour) but you are responsible for vetting, training, taxes, insurance. Use background checks, references, and trial periods. <strong>Family or friends</strong>: Sometimes neighbors, church members, or extended family can provide unpaid respite. Do not rely solely on this--it is unsustainable long-term.
                    <Citation index={5} />
                  </p>
                </>
              ),
            },
            {
              title: 'Overcoming Resistance',
              content: (
                <>
                  <p>
                    Care recipients often resist in-home respite: "I do not need a babysitter." Strategies: (1) Frame it as "help for you" not "help for me"--aide is here to help with bath, meal prep, etc. (2) Start with short visits (1-2 hours) to build trust. (3) Have aide arrive before you leave, introduce them, show them around. (4) Choose activities recipient enjoys (watching sports, baking, gardening). (5) Expect 2-4 visits before acceptance. Persistence matters.
                    <Citation index={8} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>Support Groups: You Are Not Alone</h2>
        <p>
          Caregiver support groups provide peer connection, validation, practical strategies, and emotional relief. Meeting with others who understand your experience reduces isolation, normalizes your struggles, and provides hope. Meta-analyses show support groups reduce caregiver depression by 20-30% and improve coping skills.
          <Citation index={6} />
        </p>

        <BeforeAfter
          before={{
            title: 'Without Support Groups',
            points: [
              'Isolation: "No one understands what I am going through."',
              'Shame: "I must be doing something wrong if this is so hard."',
              'Reinventing the wheel: Trial and error with no guidance.',
              'Burnout: No outlet for grief, anger, frustration.',
              'Lack of practical strategies: Do not know what resources exist or how to access them.',
            ],
          }}
          after={{
            title: 'With Support Groups',
            points: [
              'Connection: "Others get it--I am not alone."',
              'Validation: "My feelings are normal, not personal failure."',
              'Practical strategies: Learn what worked for others--behavior management, respite options, communication techniques.',
              'Emotional outlet: Safe space to express grief, anger, frustration without judgment.',
              'Resource sharing: Members share information about services, doctors, benefits, legal planning.',
            ],
          }}
        />

        <ArticleCallout
          type="info"
          title="Finding Support Groups"
          content="Alzheimer Association offers free support groups (in-person and virtual) nationwide. Call 24/7 helpline: 1-800-272-3900 or visit alz.org. Hospitals, senior centers, and faith communities also host groups. Try 2-3 different groups to find the right fit--group dynamics vary."
        />

        <h2>Financial Assistance for Caregiver Services</h2>
        <p>
          Cost is the primary barrier to accessing professional support. However, multiple funding sources exist for those who qualify--many caregivers are unaware of these options.
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Medicaid (for low-income individuals)',
              content: (
                <>
                  <p>
                    Medicaid covers home and community-based services (HCBS) for eligible older adults: in-home personal care, adult day care, respite care, home-delivered meals, transportation. Eligibility based on income (varies by state--typically under $2,829 per month for individual) and functional need (requires help with daily activities). Apply through state Medicaid office. HCBS waiver programs specifically support people who would otherwise need nursing home care. Medicaid is the largest payer for long-term care services in the U.S.
                    <Citation index={3} />
                  </p>
                </>
              ),
            },
            {
              title: 'Veterans Affairs (VA) Benefits',
              content: (
                <>
                  <p>
                    <strong>Aid and Attendance benefit</strong>: Monthly payment ($2,431 for veteran, $1,318 for surviving spouse, $2,863 for couple) to help pay for in-home care, adult day care, or assisted living. Eligibility: wartime veteran (or surviving spouse), low income, needs help with daily activities. <strong>VA adult day health care</strong>: Free or low-cost adult day programs at VA facilities. Contact VA: 1-800-827-1000 or va.gov.
                    <Citation index={4} />
                  </p>
                </>
              ),
            },
            {
              title: 'Medicare (limited coverage)',
              content: (
                <>
                  <p>
                    Medicare covers limited respite for hospice patients only (up to 5 days of inpatient respite care for terminally ill patients enrolled in hospice). Medicare does NOT cover long-term in-home care, adult day care, or custodial care (help with bathing, dressing, eating). Many caregivers mistakenly believe Medicare covers these--it does not. Medicaid or private pay are the primary funding sources.
                    <Citation index={3} />
                  </p>
                </>
              ),
            },
            {
              title: 'Long-Term Care Insurance',
              content: (
                <>
                  <p>
                    If care recipient has long-term care insurance policy, check what services are covered. Many policies cover: in-home care, adult day care, assisted living, nursing home care. Review policy details--daily or monthly benefit amount, elimination period (waiting period before benefits start), coverage duration. File claims promptly and keep detailed records.
                    <Citation index={5} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>Care Management: Navigating the System</h2>
        <p>
          Care managers (also called geriatric care managers) are social workers or nurses who assess needs, coordinate services, manage medical appointments, and advocate for families. They are especially helpful when caregiver lives far away (long-distance caregiving), when medical system is complex, or when family conflict complicates decision-making.
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Assessment',
              description: 'Care manager visits home, assesses safety, functional abilities, medical needs, and caregiver burden. Creates care plan with recommendations.',
            },
            {
              title: 'Service Coordination',
              description: 'Arranges adult day care, in-home aides, transportation, meal delivery, medical equipment. Vets providers, negotiates contracts, monitors quality.',
            },
            {
              title: 'Medical Advocacy',
              description: 'Accompanies to doctor appointments, communicates with medical team, ensures medications are managed, coordinates specialists.',
            },
            {
              title: 'Crisis Management',
              description: 'When hospitalization, fall, or rapid decline occurs, care manager coordinates discharge planning, temporary placement, or increased services.',
            },
            {
              title: 'Cost',
              description: 'Private pay: $100-200 per hour for initial assessment; $75-150 per hour for ongoing management. Some long-term care insurance policies cover care management. Worth the investment for complex cases.',
            },
          ]}
        />

        <QuoteBlock
          quote="Accepting help is not giving up--it is the opposite. It is choosing to sustain caregiving long-term rather than burning out and collapsing. Professional support is not Plan B; it is Plan A."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(22),
    slug: 'long-distance-caregiving-strategies-for-supporting-aging-parents-remotely',
    status: 'published',
    title: 'Long-Distance Caregiving: Strategies for Supporting Aging Parents Remotely',
    description:
      'Practical strategies for managing care from afar, including technology, local networks, care coordination, and when remote support is no longer enough.',
    image: '/images/articles/cat17/cover-022.svg',
    category: CATEGORY_AGING,
    readTime: 14,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Long-Distance Caregiving', 'Remote Support', 'Care Coordination', 'Technology'],

    summary:
      'Fifteen percent of family caregivers live more than two hours away from the person they help. Long-distance caregiving introduces unique challenges: you cannot see subtle changes in function or safety; you rely on phone reports that may be incomplete or reassuring rather than accurate; you face guilt and helplessness when crisis occurs and you are not there. Yet with strategic planning, technology, local networks, and professional coordination, it is possible to provide meaningful support and oversight from afar--and to recognize when distance is no longer sustainable.',

    keyFacts: [
      {
        text: 'Fifteen percent of family caregivers live more than two hours away from the person they help; long-distance caregivers spend an average of $8,700 per year on travel, services, and care expenses.',
        citationIndex: 1,
      },
      {
        text: 'Video calls, smart home sensors, and medication dispensers with alerts improve remote monitoring and reduce caregiver anxiety, but they do not replace in-person assessment.',
        citationIndex: 2,
      },
      {
        text: 'Geriatric care managers can serve as local "eyes and ears," coordinating services, attending appointments, and reporting changes to distant family members.',
        citationIndex: 3,
      },
      {
        text: 'Long-distance caregivers are at higher risk for depression and anxiety than local caregivers due to guilt, helplessness, and limited control over care decisions.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Long-distance caregiving is not about being there for everything--it is about building a support ecosystem that functions when you are not. You are the architect, not the only worker.',

    practicalExercise: {
      title: 'Building a Local Support Network',
      steps: [
        {
          title: 'Contact Area Agency on Aging',
          description:
            'Call Eldercare Locator (1-800-677-1116) to find your parent\'s local Area Agency on Aging. Request a needs assessment and list of services (meal delivery, transportation, adult day care).',
        },
        {
          title: 'Hire a Geriatric Care Manager',
          description:
            'Search Aging Life Care Association (aginglifecare.org) for credentialed care managers in your parent\'s area. Schedule an initial home visit and care plan ($100-200/hour).',
        },
        {
          title: 'Recruit Local Allies',
          description:
            'Identify neighbors, friends, church members, or family friends who can check in weekly. Give them your contact information and ask them to alert you to changes.',
        },
        {
          title: 'Set Up Technology',
          description:
            'Install video doorbell, smart home sensors (motion, door, bed), and medication dispenser with alerts. Test system and ensure your parent can use video calls.',
        },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find Local Providers',
    },

    citations: [
      {
        id: '1',
        text: 'National Alliance for Caregiving and AARP. Caregiving in the U.S. 2020.',
        source: 'AARP',
        year: '2020',
        link: 'https://www.aarp.org/caregiving/basics/info-2020/caregiving-in-the-united-states.html',
        tier: 2,
      },
      {
        id: '2',
        text: 'Czaja, S. J., et al. A videophone psychosocial intervention for dementia caregivers.',
        source: 'American Journal of Geriatric Psychiatry',
        year: '2013',
        link: 'https://doi.org/10.1016/j.jagp.2012.12.016',
        tier: 1,
      },
      {
        id: '3',
        text: 'Aging Life Care Association. What is an Aging Life Care Professional?',
        source: 'Aging Life Care Association',
        year: '2021',
        link: 'https://www.aginglifecare.org/',
        tier: 3,
      },
      {
        id: '4',
        text: 'Koerin, B. B., & Harrigan, M. P. P-S-Y-C-H-R: A framework for long-distance caregiving.',
        source: 'Journal of Gerontological Social Work',
        year: '2002',
        link: 'https://doi.org/10.1300/J083v37n03_06',
        tier: 1,
      },
      {
        id: '5',
        text: 'Parker, D., et al. Quality assessment and improvement in nursing homes.',
        source: 'The Gerontologist',
        year: '2004',
        link: 'https://doi.org/10.1093/geront/44.2.159',
        tier: 1,
      },
      {
        id: '6',
        text: 'Carretero, S., et al. The informal caregiver\'s burden of dependent people.',
        source: 'Maturitas',
        year: '2009',
        link: 'https://doi.org/10.1016/j.maturitas.2008.12.004',
        tier: 1,
      },
      {
        id: '7',
        text: 'National Institute on Aging. Long-Distance Caregiving: Twenty Questions and Answers.',
        source: 'National Institute on Aging',
        year: '2022',
        link: 'https://www.nia.nih.gov/health/caregiving/long-distance-caregiving',
        tier: 2,
      },
      {
        id: '8',
        text: 'Family Caregiver Alliance. Long-Distance Caregiving Fact Sheet.',
        source: 'Family Caregiver Alliance',
        year: '2021',
        link: 'https://www.caregiver.org/resource/long-distance-caregiving/',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          When your parent lives in Florida and you are in Oregon, caregiving becomes an exercise in coordination, trust, and surveillance from afar. You cannot see if mail is piling up, if bruises suggest falls, if weight is dropping. You rely on phone calls that sound "fine" even when function is declining. You live with ambient guilt--that you are not there, that you cannot do enough, that geography itself is a form of abandonment.
          <Citation index={1} />
        </p>
        <p>
          But long-distance caregiving is not inherently inadequate. With technology, professional coordination, local networks, and realistic planning, you can provide meaningful support and oversight--and recognize when distance is no longer sustainable.
        </p>

        <h2>Technology: Eyes and Alerts</h2>
        <p>
          Smart home technology extends your presence. Motion sensors alert you if your parent does not get out of bed by 10 a.m.; door sensors show if they left the house at 2 a.m.; video doorbells let you see who is visiting. Medication dispensers with alerts notify you if a dose is missed. Fall detection devices auto-dial emergency contacts.
          <Citation index={2} />
        </p>

        <StatCard
          value="73%"
          label="of long-distance caregivers report reduced anxiety with smart home monitoring technology"
          description="Motion sensors, video doorbells, and medication dispensers provide real-time oversight when you cannot be physically present."
        />

        <ArticleCallout variant="tip" title="Technology Setup Checklist">
          <p>
            Essential devices for remote monitoring: (1) Video doorbell--see visitors, delivery status, whether parent is leaving home safely. (2) Motion sensors--placed in bedroom, bathroom, kitchen to detect daily activity patterns. (3) Smart medication dispenser--locks pills, alerts if dose missed, caregiver receives notifications. (4) Fall detection pendant or watch--auto-dials emergency contacts if fall detected. (5) Video call device--simple tablet with large icons for weekly face-to-face check-ins. Total cost: $400-800 setup, $30-50 monthly monitoring fees.
          </p>
        </ArticleCallout>

        <h2>Building a Local Support Network</h2>
        <p>
          Technology provides data, but human connection provides context. Recruit local allies: neighbors who can knock on the door weekly; friends from church who can report changes; a handyman who can check the furnace. Give them your contact information and explicit permission to "interfere"--to call you if something seems off.
          <Citation index={3} />
        </p>
        <p>
          Consider hiring a geriatric care manager (also called aging life care professional). These are credentialed social workers or nurses who serve as your local "eyes and ears." They visit the home, assess safety and function, coordinate services, attend medical appointments, and report back to you. Cost is $100-200 per hour for initial assessment; $75-150 per hour for ongoing management. Worth it for peace of mind and professional oversight.
          <Citation index={4} />
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'What Does a Geriatric Care Manager Do?',
              content: (
                <>
                  <p>
                    Initial home visit: Assesses living environment, safety hazards, functional abilities (bathing, dressing, cooking), cognitive status, medication management, social supports. Creates written care plan with recommendations. Coordinates services: Researches and arranges adult day care, in-home aides, meal delivery, transportation, medical equipment. Vets providers, negotiates contracts, monitors quality. Medical advocacy: Attends doctor appointments, communicates with medical team, ensures medications are reviewed, coordinates specialists. Crisis management: When hospitalization or rapid decline occurs, care manager coordinates discharge planning, temporary placement, or increased services. Regular reporting: Weekly or monthly check-ins with distant family, written reports on status, alerts to concerning changes.
                  </p>
                </>
              ),
            },
            {
              title: 'How to Find a Qualified Care Manager',
              content: (
                <>
                  <p>
                    Search Aging Life Care Association (aginglifecare.org) for credentialed professionals in your parent's area. Look for credentials: Certified Care Manager (C-ACLP), Licensed Clinical Social Worker (LCSW), or Registered Nurse (RN) with geriatric specialty. Interview candidates: Ask about experience with your parent's conditions (dementia, stroke, heart failure), ask how they communicate with distant family, ask about fees and billing (hourly, retainer, or per-service). Check references: Ask previous clients about responsiveness, accuracy of assessments, and quality of service coordination.
                  </p>
                </>
              ),
            },
            {
              title: 'Cost and Payment',
              content: (
                <>
                  <p>
                    Private pay: $100-200 per hour for initial assessment (2-4 hours); $75-150 per hour for ongoing management. Some care managers offer monthly retainer packages ($500-1,000/month for 5-10 hours of coordination). Long-term care insurance: Many policies cover geriatric care management--check your parent's policy. Not covered by Medicare or Medicaid. Tax-deductible: Care management fees may qualify as medical expense if they exceed 7.5% of adjusted gross income--consult tax advisor.
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>Communication Strategies: Staying Connected</h2>
        <p>
          Schedule regular video calls--not just phone calls--so you can see your parent's appearance, surroundings, and functioning. Weekly is ideal; daily if health is unstable. Use simple video devices (large-button tablets, Portal, Echo Show) that do not require technical skill. During calls, look for clues: Is the house cluttered or dirty (suggesting functional decline)? Is your parent wearing the same clothes as last call? Are they confused about day or recent events? Do they look thinner?
          <Citation index={5} />
        </p>

        <BeforeAfter
          before={{
            title: 'Ineffective Check-In',
            points: [
              '"How are you doing?" "Fine." "Are you eating?" "Yes." "Taking your medications?" "Yes." (Call ends with no real information.)',
              'Parent may minimize problems to avoid worrying you or to preserve independence.',
              'Caregiver feels reassured but misses important warning signs.',
            ],
          }}
          after={{
            title: 'Effective Check-In',
            points: [
              '"What did you have for breakfast?" (Assesses memory and nutrition.) "Show me your pill organizer--let\'s make sure this week is set up." (Visual verification.)',
              '"I noticed the mail piling up on the table--is that hard to get to?" (Identifies functional decline without accusation.)',
              'Caregiver gets concrete, observable data rather than subjective reassurances.',
            ],
          }}
        />

        <h2>When Long-Distance Is No Longer Enough</h2>
        <p>
          There comes a point when distance becomes unsustainable. Warning signs: (1) Repeated falls or hospitalizations that require intensive monitoring. (2) Cognitive decline severe enough that your parent cannot use emergency alert devices or answer the phone reliably. (3) Daily care needs (bathing, dressing, toileting) that require hands-on help multiple times per day. (4) Safety risks--leaving stove on, wandering, forgetting medications--that technology cannot prevent.
          <Citation index={6} />
        </p>
        <p>
          At this point, options are: (1) Relocate your parent closer to you. (2) Relocate yourself temporarily or permanently to your parent's area. (3) Place your parent in assisted living or memory care facility near you or in their current location. (4) Hire 24-hour in-home care in your parent's home (expensive: $15,000-20,000/month). There is no "right" answer--only least-worst options that balance safety, autonomy, finances, and family capacity.
          <Citation index={7} />
        </p>

        <ArticleCallout variant="warning" title="When to Act Immediately">
          <p>
            Red flags requiring urgent intervention: Your parent is hospitalized and hospital says discharge is unsafe without 24-hour care. Local contacts report serious neglect: spoiled food, unsafe home, severe confusion. Your parent is victim of financial exploitation or scam (sudden withdrawals, unfamiliar names on checks). Your parent expresses thoughts of self-harm or suicide. Adult Protective Services contacts you about safety concerns. In these situations, consider emergency Family and Medical Leave Act (FMLA) leave to travel and arrange immediate placement or 24-hour care. Do not wait for "next visit."
          </p>
        </ArticleCallout>

        <QuoteBlock
          quote="Long-distance caregiving is the art of building systems that function when you are not there. You cannot be in two places at once--so you must multiply yourself through people, technology, and professional allies."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(23),
    slug: 'advance-directives-and-end-of-life-care-decisions-for-older-adults',
    status: 'archived',
    title: 'Advance Directives and End-of-Life Care Decisions for Older Adults',
    description:
      'Navigate advance care planning with clarity: living wills, healthcare proxies, DNR orders, POLST forms, and how to honor wishes when crisis comes.',
    image: '/images/articles/cat17/cover-023.svg',
    category: CATEGORY_AGING,
    readTime: 15,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Advance Directives', 'End-of-Life Planning', 'Healthcare Proxy', 'POLST'],

    summary:
      'Only 37% of U.S. adults have completed advance directives--legal documents that specify medical wishes if you cannot speak for yourself. Without them, families face agonizing decisions in hospital corridors: Would Mom want CPR? Would Dad want a feeding tube? These are questions best answered in calm moments, not crisis. Advance care planning--completing living wills, naming healthcare proxies, discussing values and fears--gives families clarity, reduces guilt, and honors autonomy. It is not about "giving up"; it is about taking control.',

    keyFacts: [
      {
        text: 'Only 37% of U.S. adults have completed advance directives; among adults over 65, completion rates are higher (50-60%) but still leave millions without clear guidance.',
        citationIndex: 1,
      },
      {
        text: 'Living wills specify treatment preferences (CPR, mechanical ventilation, feeding tubes); healthcare proxies name a decision-maker to interpret wishes when clinical nuances arise.',
        citationIndex: 2,
      },
      {
        text: 'POLST (Physician Orders for Life-Sustaining Treatment) is a medical order--not just a directive--and is honored by EMS, hospitals, and nursing homes across all settings.',
        citationIndex: 3,
      },
      {
        text: 'Families who complete advance care planning report lower rates of prolonged grief and guilt after a loved one\'s death, compared to families who made decisions without prior guidance.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Advance directives are not about death--they are about living according to your values even when you cannot speak. The question is not "Do you want to die?" but "How do you want to be cared for if cure is no longer possible?"',

    practicalExercise: {
      title: 'Complete Advance Care Planning in Four Steps',
      steps: [
        {
          title: 'Download State-Specific Forms',
          description:
            'Visit CaringInfo.org (National Hospice and Palliative Care Organization) to download free advance directive forms specific to your state. Requirements vary--some states accept standardized forms; others require state-approved documents.',
        },
        {
          title: 'Choose Your Healthcare Proxy',
          description:
            'Select someone who: (1) knows your values and will honor them even under pressure, (2) can make difficult decisions under stress, (3) lives close enough to reach hospital quickly. Have a backup proxy in case primary is unavailable. Discuss your wishes explicitly.',
        },
        {
          title: 'Complete Living Will',
          description:
            'Specify preferences for: CPR (yes/no), mechanical ventilation (yes/no/time-limited trial), artificial nutrition/hydration (yes/no/dependent on prognosis), dialysis, antibiotics, hospitalization. Consider scenarios: terminal illness, persistent vegetative state, advanced dementia.',
        },
        {
          title: 'Distribute Copies',
          description:
            'Give copies to: your healthcare proxy, your primary care doctor, your hospital (if you have chronic illness), family members, your lawyer. Keep original in accessible location--not safe deposit box. Update every 5 years or after major health changes.',
        },
      ],
      toolLink: 'https://www.caringinfo.org/planning/advance-directives/',
      toolLabel: 'Download State Forms',
    },

    citations: [
      {
        id: '1',
        text: 'Yadav, K. N., et al. Approximately one in three US adults completes any type of advance directive for end-of-life care.',
        source: 'Health Affairs',
        year: '2017',
        link: 'https://doi.org/10.1377/hlthaff.2017.0175',
        tier: 1,
      },
      {
        id: '2',
        text: 'Sabatino, C. P. The evolution of health care advance planning law and policy.',
        source: 'The Milbank Quarterly',
        year: '2010',
        link: 'https://doi.org/10.1111/j.1468-0009.2009.00587.x',
        tier: 1,
      },
      {
        id: '3',
        text: 'National POLST. POLST and Advance Directives.',
        source: 'National POLST',
        year: '2023',
        link: 'https://polst.org/',
        tier: 4,
      },
      {
        id: '4',
        text: 'Wright, A. A., et al. Associations between end-of-life discussions, patient mental health, medical care near death, and caregiver bereavement adjustment.',
        source: 'JAMA',
        year: '2008',
        link: 'https://doi.org/10.1001/jama.300.14.1665',
        tier: 1,
      },
      {
        id: '5',
        text: 'Silveira, M. J., et al. Patients\' knowledge of options at the end of life.',
        source: 'Journal of the American Geriatrics Society',
        year: '2000',
        link: 'https://doi.org/10.1111/j.1532-5415.2000.tb03146.x',
        tier: 1,
      },
      {
        id: '6',
        text: 'National Institute on Aging. Advance Care Planning: Healthcare Directives.',
        source: 'National Institute on Aging',
        year: '2022',
        link: 'https://www.nia.nih.gov/health/advance-care-planning',
        tier: 2,
      },
      {
        id: '7',
        text: 'Detering, K. M., et al. The impact of advance care planning on end of life care in elderly patients.',
        source: 'BMJ',
        year: '2010',
        link: 'https://doi.org/10.1136/bmj.c1345',
        tier: 1,
      },
      {
        id: '8',
        text: 'The Conversation Project. Starter Kit for Families.',
        source: 'Institute for Healthcare Improvement',
        year: '2021',
        link: 'https://theconversationproject.org/',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          Your mother collapses. Paramedics arrive, start CPR, intubate her, transport her to the ER. She is 87 years old, has advanced dementia, does not recognize you, has not spoken in six months. The ER doctor asks: "Do you want us to continue life support?" You have no idea what she would want. The question you should have asked two years ago now arrives with a ventilator hissing and a blood pressure crashing.
          <Citation index={1} />
        </p>
        <p>
          Advance directives--living wills, healthcare proxies, POLST forms--are tools that transform this crisis into clarity. They let individuals say, in calm moments, what they want when crisis comes. They spare families from agonizing guesswork. They honor autonomy even when voice is gone.
        </p>

        <h2>What Are Advance Directives?</h2>
        <p>
          Advance directives are legal documents that specify medical wishes if you cannot speak for yourself. There are two main types: (1) Living Will: specifies treatment preferences (CPR, mechanical ventilation, feeding tubes) in specific scenarios (terminal illness, persistent vegetative state, advanced dementia). (2) Healthcare Proxy (also called Medical Power of Attorney or Healthcare Agent): names a person--your proxy--who will make medical decisions on your behalf if you are incapacitated.
          <Citation index={2} />
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Living Will',
              content: (
                <>
                  <p>
                    A living will is a written statement of your treatment preferences. It typically covers: CPR--do you want chest compressions and defibrillation if your heart stops? Mechanical ventilation--do you want a breathing tube and ventilator if you cannot breathe on your own? Artificial nutrition and hydration--do you want a feeding tube if you cannot eat or drink? Dialysis--do you want kidney replacement therapy if kidneys fail? Hospitalization--do you want to be transferred to hospital or receive comfort care at home?
                  </p>
                  <p>
                    Living wills are scenario-specific: you can say "yes to CPR if sudden reversible event (like heart attack), but no to CPR if terminal cancer or advanced dementia." Nuance is possible and encouraged.
                    <Citation index={3} />
                  </p>
                </>
              ),
            },
            {
              label: 'Healthcare Proxy',
              content: (
                <>
                  <p>
                    A healthcare proxy names a person who will make medical decisions for you if you are unconscious, severely confused, or otherwise unable to communicate. This person (your proxy or agent) steps into your shoes and makes decisions based on: (1) Your known wishes (what you have told them or written in advance directives). (2) Your values (what matters most to you--comfort, longevity, dignity, independence). (3) Their best judgment if your wishes are unknown.
                  </p>
                  <p>
                    Choose someone who: knows you well, will honor your wishes even under family pressure, can make hard decisions under stress, lives close enough to reach hospital quickly. Name a backup proxy in case your first choice is unavailable. Discuss your wishes explicitly--do not assume they know.
                    <Citation index={4} />
                  </p>
                </>
              ),
            },
            {
              label: 'POLST Form',
              content: (
                <>
                  <p>
                    POLST (Physician Orders for Life-Sustaining Treatment) is a medical order--not just a directive--signed by a physician and patient. It is brightly colored (often pink or green), portable, and honored across all care settings: EMS, hospitals, nursing homes, home. POLST is for people with serious illness or frailty--not for healthy adults.
                  </p>
                  <p>
                    POLST covers: CPR (yes/no), medical interventions (full treatment/selective treatment/comfort-focused treatment), antibiotics, artificial nutrition. It is reviewed and updated regularly (annually or when health status changes). POLST supplements--not replaces--advance directives. It is the "working document" that travels with you; living wills are the detailed explanation.
                    <Citation index={5} />
                  </p>
                </>
              ),
            },
            {
              label: 'DNR Order',
              content: (
                <>
                  <p>
                    DNR (Do Not Resuscitate) is a specific medical order that tells healthcare providers NOT to perform CPR if your heart stops. DNR does not mean "do not treat"--it only refers to CPR. You can have a DNR and still receive antibiotics, surgery, dialysis, mechanical ventilation (unless you also specify otherwise).
                  </p>
                  <p>
                    DNR is common for: terminal illness where CPR would not restore meaningful function, advanced dementia, severe chronic illness where CPR is unlikely to succeed (success rate for hospitalized elderly: 10-15%). DNR must be written as medical order by physician. In some states, you can request a DNR bracelet or necklace so EMS knows your wishes at home.
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>How to Complete Advance Care Planning</h2>
        <p>
          Step 1: Download state-specific forms from CaringInfo.org (National Hospice and Palliative Care Organization). Each state has different requirements; standardized forms may not be honored. Step 2: Choose your healthcare proxy. Discuss your values and specific scenarios. Step 3: Complete living will, specifying preferences for CPR, ventilation, feeding tubes, and other interventions in different scenarios (terminal illness, persistent vegetative state, advanced dementia). Step 4: Sign and witness forms according to state law (most states require two witnesses or notary). Step 5: Distribute copies to proxy, doctor, hospital, family members. Keep original in accessible location--not safe deposit box.
          <Citation index={6} />
        </p>

        <StatCard
          value="70%"
          label="of patients who completed advance directives received end-of-life care consistent with their wishes"
          description="Compared to only 30% of patients without advance directives. Planning matters."
        />

        <h2>Having the Conversation</h2>
        <p>
          The hardest part is not filling out forms--it is starting the conversation. Many families avoid it because talking about death feels morbid, disrespectful, or like "giving up." But advance care planning is not about death; it is about values. The questions are: What matters most to you--comfort or longevity? If cure is no longer possible, where would you want to be--hospital or home? What quality of life is acceptable to you? What would be unbearable?
          <Citation index={7} />
        </p>

        <ArticleCallout variant="tip" title="Conversation Starters">
          <p>
            Try these openers: "I saw a news story about advance directives and realized I don't know what you'd want if you were ever too sick to tell me. Can we talk about it?" "My friend's mom was in the hospital and they had no idea what she wanted. It made everything harder. I want to make sure I know your wishes." "I'm updating my own advance directive and wondered if you've thought about yours." Avoid: "If you die..." (too blunt). Instead: "If you were ever seriously ill..." Focus on values, not death: "What matters most to you?" "What would make life not worth living for you?"
          </p>
        </ArticleCallout>

        <h2>When Family Disagrees</h2>
        <p>
          Even with clear advance directives, families sometimes disagree. One sibling may feel that "do not resuscitate" is giving up; another may insist on comfort care only. The healthcare proxy has legal authority--but emotional conflict can be devastating. To prevent this: (1) Share advance directives with all family members so no one is surprised. (2) Discuss the "why" behind your wishes, not just the "what." (3) Consider a family meeting with a doctor or palliative care team to discuss prognosis and realistic expectations. (4) If conflict is severe, ask hospital ethics committee to mediate.
          <Citation index={8} />
        </p>

        <BeforeAfter
          before={{
            title: 'No Advance Directive',
            points: [
              'Family gathers in hospital, shocked and unprepared. Doctor asks: "What would your father want?" Siblings disagree: one says "do everything"; another says "he would hate this."',
              'Decisions made under stress, guilt, and grief. Treatments may be inconsistent with patient\'s values. Prolonged family conflict, guilt, regret.',
            ],
          }}
          after={{
            title: 'With Advance Directive',
            points: [
              'Family gathers in hospital. Healthcare proxy presents living will and POLST form. Doctor says: "This is clear--he wants comfort care only." Family says: "This is what Dad wanted. We\'re honoring his wishes."',
              'Decisions made with clarity and unity. Treatments align with patient\'s values. Reduced guilt, prolonged grief, and family conflict.',
            ],
          }}
        />

        <QuoteBlock
          quote="Advance directives are acts of love. They say to your family: 'I have thought about this. I do not want you to bear the weight of guessing. Here is what I want--honor it, and be at peace.'"
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(24),
    slug: 'choosing-a-nursing-home-or-assisted-living-facility-what-to-look-for',
    status: 'archived',
    title: 'Choosing a Nursing Home or Assisted Living Facility: What to Look For',
    description:
      'Navigate nursing home selection with clear criteria: staff ratios, inspection reports, resident care quality, and red flags that signal poor facilities.',
    image: '/images/articles/cat17/cover-024.svg',
    category: CATEGORY_AGING,
    readTime: 16,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Nursing Homes', 'Assisted Living', 'Long-Term Care', 'Quality Assessment'],

    summary:
      'Choosing a nursing home or assisted living facility is one of the hardest decisions families face. One in four nursing homes receives a one-star rating from Medicare for quality; many have serious violations including inadequate staffing, medication errors, abuse, and neglect. Yet families are often rushed--hospital discharge planners hand you a list and say "choose by Friday." You visit facilities that smell like urine, where residents sit unattended, where staff cannot answer basic questions. How do you tell the difference between marketing polish and genuine care? This article provides a systematic framework for evaluating facilities and identifying red flags.',

    keyFacts: [
      {
        text: 'One in four U.S. nursing homes receives a one-star rating (out of five) from Medicare for overall quality; low-rated facilities have significantly higher rates of infections, pressure ulcers, and preventable hospitalizations.',
        citationIndex: 1,
      },
      {
        text: 'Staff turnover in nursing homes averages 65-75% annually; high turnover is the strongest predictor of poor care quality and safety violations.',
        citationIndex: 2,
      },
      {
        text: 'Certified Nursing Assistant (CNA) ratios matter: facilities with fewer than one CNA per 10 residents on day shift (or 1 per 15 on night shift) are associated with higher rates of neglect and decline.',
        citationIndex: 3,
      },
      {
        text: 'Medicare\'s Nursing Home Compare (medicare.gov/care-compare) provides star ratings, inspection reports, staffing data, and penalty history for every facility--check before visiting.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'The best nursing home is not the one with the fanciest lobby--it is the one where staff know residents\' names, where call lights are answered quickly, and where your loved one is treated like a person, not a patient.',

    practicalExercise: {
      title: 'Facility Evaluation Checklist',
      steps: [
        {
          title: 'Check Medicare Star Ratings',
          description:
            'Visit medicare.gov/care-compare and search for facilities in your area. Review overall star rating, health inspection rating, staffing rating, and quality measures rating. Read inspection reports for violations. Eliminate any facility with serious violations (abuse, neglect, medication errors).',
        },
        {
          title: 'Visit at Different Times',
          description:
            'Visit each finalist facility at least twice: once during weekday afternoon (when staffing is highest) and once during evening or weekend (when staffing is lowest). Observe staff responsiveness, resident engagement, cleanliness, and smell.',
        },
        {
          title: 'Ask Key Questions',
          description:
            'Ask administrator: What is your CNA-to-resident ratio on day/evening/night shifts? What is your annual staff turnover rate? How do you handle urgent care needs (falls, chest pain)? Ask staff: How long have you worked here? Do you feel supported? Ask residents (if able): Are you happy here? Is staff responsive when you need help?',
        },
        {
          title: 'Review Contract',
          description:
            'Before signing, review contract with elder law attorney. Check: What is monthly cost and what is included? What triggers discharge (behavioral issues, inability to pay, hospitalization)? Is there a bed-hold policy if resident is hospitalized? What are rules for visitors, outings, and personal belongings?',
        },
      ],
      toolLink: 'https://www.medicare.gov/care-compare/',
      toolLabel: 'Search Nursing Homes',
    },

    citations: [
      {
        id: '1',
        text: 'U.S. Centers for Medicare & Medicaid Services. Nursing Home Compare Five-Star Quality Rating System.',
        source: 'CMS',
        year: '2023',
        link: 'https://www.medicare.gov/care-compare/',
        tier: 2,
      },
      {
        id: '2',
        text: 'Castle, N. G., & Engberg, J. Staff turnover and quality of care in nursing homes.',
        source: 'Medical Care',
        year: '2005',
        link: 'https://doi.org/10.1097/01.mlr.0000163661.67170.b9',
        tier: 1,
      },
      {
        id: '3',
        text: 'Harrington, C., et al. Nursing home staffing standards and staffing levels in six countries.',
        source: 'Journal of Nursing Scholarship',
        year: '2012',
        link: 'https://doi.org/10.1111/j.1547-5069.2011.01430.x',
        tier: 1,
      },
      {
        id: '4',
        text: 'Office of Inspector General. Adverse Events in Skilled Nursing Facilities.',
        source: 'U.S. Department of Health and Human Services',
        year: '2014',
        link: 'https://oig.hhs.gov/oei/reports/oei-06-11-00370.asp',
        tier: 2,
      },
      {
        id: '5',
        text: 'National Consumer Voice for Quality Long-Term Care. Choosing a Nursing Home.',
        source: 'Consumer Voice',
        year: '2022',
        link: 'https://theconsumervoice.org/',
        tier: 3,
      },
      {
        id: '6',
        text: 'Grabowski, D. C., & Mor, V. Nursing home quality: A decade of action and reaction.',
        source: 'Journal of Aging & Social Policy',
        year: '2004',
        link: 'https://doi.org/10.1300/J031v16n03_05',
        tier: 1,
      },
      {
        id: '7',
        text: 'Stevenson, D. G., & Grabowski, D. C. Sizing up the market for assisted living.',
        source: 'Health Affairs',
        year: '2010',
        link: 'https://doi.org/10.1377/hlthaff.2009.0527',
        tier: 1,
      },
      {
        id: '8',
        text: 'National Institute on Aging. What to Ask and Look for When Choosing a Nursing Home.',
        source: 'National Institute on Aging',
        year: '2022',
        link: 'https://www.nia.nih.gov/health/nursing-homes',
        tier: 2,
      },
    ],

    content: (
      <>
        <p>
          The hospital discharge planner hands you a list of nursing homes and says: "Your father cannot go home--he needs 24-hour care. Choose a facility by Friday." You visit the first one. The lobby is clean, decorated with fake plants and a piano no one plays. The staff is friendly, the brochure glossy. But when you walk the halls, you see call lights blinking unanswered. Residents sit alone in wheelchairs, staring. The smell of urine is faint but unmistakable. You ask to see the inspection report. The administrator deflects: "All nursing homes have violations--ours are minor."
          <Citation index={1} />
        </p>
        <p>
          How do you tell the difference between marketing and reality? Between adequate care and neglect? This article provides a systematic framework.
        </p>

        <h2>Start with Medicare's Nursing Home Compare</h2>
        <p>
          Before visiting any facility, check Medicare.gov/care-compare. Enter your zip code and search for nursing homes. Each facility receives an overall star rating (1-5 stars) based on: Health Inspections (state surveyors' findings of violations), Staffing (nurse and aide hours per resident per day), Quality Measures (rates of pressure ulcers, falls, infections, antipsychotic medication use). Read the inspection reports--they list every violation found during the most recent survey, from minor (expired food in kitchen) to severe (physical abuse, medication errors, inadequate staffing).
          <Citation index={2} />
        </p>

        <StatCard
          value="1-star"
          label="facilities have 3x higher rates of preventable hospitalizations compared to 5-star facilities"
          description="Star ratings predict real outcomes. A one-star facility is not 'a little worse'--it is significantly more dangerous."
        />

        <ArticleCallout variant="warning" title="Red Flag Violations">
          <p>
            Eliminate facilities with these violations on recent inspection reports: Immediate jeopardy (facility's actions caused or were likely to cause serious injury, harm, impairment, or death). Actual harm (resident suffered decline, injury, or death due to facility's failure). Widespread deficiencies (affecting many residents or entire facility). Abuse or neglect citations. Medication errors causing harm. Infection control failures. Inadequate staffing cited as deficiency. Do not rationalize: "All nursing homes have violations." Some violations are structural (minor fire code issues); others are evidence of dangerous care.
          </p>
        </ArticleCallout>

        <h2>Staffing: The Single Most Important Factor</h2>
        <p>
          Research is clear: staffing levels predict care quality. Specifically, Certified Nursing Assistant (CNA) ratios matter. CNAs provide direct care--bathing, toileting, feeding, mobility assistance. If there are too few CNAs, residents wait hours for toileting (leading to incontinence and humiliation), are left in bed all day (leading to pressure ulcers and muscle atrophy), miss meals (leading to malnutrition), and fall without supervision.
          <Citation index={3} />
        </p>

        <ArticleChart
          type="bar"
          title="CNA-to-Resident Ratios and Care Quality"
          data={[
            { name: '5-Star Facilities', value: 3.8, color: '#10b981' },
            { name: '3-Star Facilities', value: 2.9, color: '#f59e0b' },
            { name: '1-Star Facilities', value: 2.1, color: '#ef4444' },
          ]}
          xAxisLabel="Facility Rating"
          yAxisLabel="CNA Hours per Resident per Day"
          description="Higher staffing is the strongest predictor of quality. Five-star facilities average 3.8 CNA hours per resident per day; one-star facilities average 2.1 hours."
        />

        <p>
          Minimum acceptable ratios: Day shift (7am-3pm): At least 1 CNA per 8-10 residents. Evening shift (3pm-11pm): At least 1 CNA per 10-12 residents. Night shift (11pm-7am): At least 1 CNA per 12-15 residents. RN on duty 24/7: Licensed Registered Nurse must be present every shift--not just LPN or CNA. Ask the administrator: "What is your actual CNA-to-resident ratio on each shift?" Do not accept vague answers like "We meet state requirements." Get numbers.
          <Citation index={4} />
        </p>

        <h2>The Visit: What to Observe</h2>
        <p>
          Visit at least twice: once during weekday afternoon (peak staffing) and once during evening or weekend (lowest staffing). Walk the halls unannounced. Do not just tour the "model room." Observe: Are residents dressed and groomed, or in nightgowns at 2pm? Are call lights answered promptly (within 5 minutes), or blinking for 20+ minutes? Do staff know residents' names and speak to them respectfully? Are residents engaged (activity room, outdoor space), or sitting alone staring at walls? Is the facility clean and odor-free, or smelling of urine/feces (sign of inadequate toileting)?
          <Citation index={5} />
        </p>

        <BeforeAfter
          before={{
            title: 'Poor-Quality Facility',
            points: [
              'Residents in wheelchairs lined up along hallway, many sleeping. Call lights blinking unanswered. Staff at nurses\' station chatting, ignoring lights.',
              'Dining room: residents eating alone, food cold, no staff assistance for those who need help eating. Plates half-finished.',
              'Rooms: urine smell, soiled linens, no personal items or photos (sign of neglect or frequent turnover).',
            ],
          }}
          after={{
            title: 'High-Quality Facility',
            points: [
              'Residents in common areas, reading, playing cards, or watching TV. Staff interacting--asking questions, assisting with activities. Call lights answered within 5 minutes.',
              'Dining room: staff helping residents who need assistance, conversation, food served hot. Residents finishing meals.',
              'Rooms: clean, personalized with photos and belongings, no odor, well-lit and cheerful.',
            ],
          }}
        />

        <h2>Questions to Ask</h2>
        <p>
          Ask the administrator: (1) What is your annual staff turnover rate? (High turnover--over 50%--predicts poor care.) (2) How do you handle urgent situations--falls, chest pain, choking? (Good answer: RN assesses, 911 called if needed, family notified immediately.) (3) What is your policy on restraints and antipsychotic medications? (Red flag: "We use them as needed." Good answer: "We minimize restraints and follow strict protocols for psychotropic medications.") (4) Can I see the most recent state inspection report? (If they hesitate, leave.)
          <Citation index={6} />
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'What to Ask Current Residents (If Able)',
              content: (
                <>
                  <p>
                    If residents are cognitively able, ask: "Do you like living here?" "Is the staff kind to you?" "Do they come when you need help?" "Is the food good?" "Do you feel safe?" Listen not just to words but tone. Are they enthusiastic or resigned? Do they hesitate before answering (sign of fear of retaliation)? Do they have specific complaints or vague reassurances?
                  </p>
                </>
              ),
            },
            {
              title: 'What to Ask Family Members',
              content: (
                <>
                  <p>
                    If you encounter other visitors, ask: "How long has your loved one been here?" "Have you been satisfied with the care?" "Does staff communicate with you about changes?" "Have there been any problems?" Family members are often the most honest source of information--they have no marketing incentive.
                  </p>
                </>
              ),
            },
            {
              title: 'What to Ask Staff',
              content: (
                <>
                  <p>
                    Ask CNAs or LPNs (not administrator): "How long have you worked here?" "Do you feel supported by management?" "What is the hardest part of your job?" If staff says "not enough time" or "too many residents," that is a red flag. If they say "I love working here--we're like a family," that is a good sign (if genuine).
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>Assisted Living vs. Nursing Home: What's the Difference?</h2>
        <p>
          Assisted living facilities provide help with activities of daily living (bathing, dressing, medications) but do not provide 24-hour skilled nursing care. They are appropriate for people who: are mostly independent but need help with bathing, dressing, or medication reminders; do not need frequent medical monitoring or complex wound care; do not have advanced dementia requiring secure unit. Assisted living is less regulated than nursing homes--no federal oversight, only state regulations. Costs: $4,000-7,000/month private pay (Medicaid does not typically cover). Nursing homes provide 24-hour skilled nursing care and are appropriate for people who: need daily wound care, IV antibiotics, tube feeding, or complex medical management; have advanced dementia with wandering or behavioral issues; require total assistance with all activities of daily living. Nursing homes are heavily regulated by federal and state governments. Costs: $8,000-12,000/month private pay; Medicaid covers after assets depleted.
          <Citation index={7} />
        </p>

        <h2>Paying for Care: Medicaid, Medicare, Private Pay</h2>
        <p>
          Medicare covers short-term nursing home stays (up to 100 days) after hospitalization for rehabilitation (physical therapy, wound care). It does NOT cover long-term custodial care. Medicaid covers long-term nursing home care for people with limited income and assets (must "spend down" assets to $2,000-3,000 depending on state). Not all nursing homes accept Medicaid--ask before admission. Private pay: If paying out-of-pocket, monthly costs are $8,000-12,000. Long-term care insurance may cover if policy purchased years earlier. Veterans benefits (VA Aid and Attendance) may provide $1,800-2,200/month for eligible veterans or spouses.
          <Citation index={8} />
        </p>

        <QuoteBlock
          quote="Choosing a nursing home is not about finding perfection--it is about finding competence, compassion, and accountability. Trust your instincts. If something feels wrong during your visit, it probably is."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(25),
    slug: 'managing-caregiver-guilt-and-setting-boundaries-without-abandoning-your-loved-one',
    status: 'archived',
    title: 'Managing Caregiver Guilt and Setting Boundaries Without Abandoning Your Loved One',
    description:
      'Understand caregiver guilt as a structural problem, not a personal failing, and learn how to set sustainable boundaries that preserve both care and self.',
    image: '/images/articles/cat17/cover-025.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Caregiver Guilt', 'Boundaries', 'Self-Care', 'Burnout Prevention'],

    summary:
      'Eighty-five percent of family caregivers report feeling guilty--guilty for not doing enough, for feeling resentful, for wanting their life back, for considering placement, for being relieved when their loved one dies. Guilt is so pervasive that many caregivers mistake it for devotion. But guilt is not love--it is the emotional tax of a care system that privatizes elder care, romanticizes self-sacrifice, and penalizes boundaries. Managing caregiver guilt requires reframing it as a structural problem, not a personal failing, and learning that setting limits is not abandonment--it is the foundation of sustainable care.',

    keyFacts: [
      {
        text: 'Eighty-five percent of family caregivers report feeling guilty; common guilt triggers include taking time for self, considering nursing home placement, and feeling resentment toward the care recipient.',
        citationIndex: 1,
      },
      {
        text: 'Caregivers who set clear boundaries and practice self-care have lower rates of depression, anxiety, and burnout compared to those who prioritize care recipient needs exclusively.',
        citationIndex: 2,
      },
      {
        text: 'The cultural myth of "good daughter/son syndrome"--the belief that love requires total self-sacrifice--is the strongest predictor of caregiver guilt and burnout.',
        citationIndex: 3,
      },
      {
        text: 'Seventy percent of caregivers who place a loved one in a nursing home report persistent guilt; yet studies show that professional placement often improves both caregiver mental health and care recipient safety.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Guilt tells you that you are not enough. Boundaries tell you that you are human. The difference between the two is whether you survive caregiving or are consumed by it.',

    practicalExercise: {
      title: 'Boundary-Setting Script Practice',
      steps: [
        {
          title: 'Identify Your Limit',
          description:
            'What is one caregiving task that is depleting you? Examples: bathing parent (physically exhausting), managing medications (cognitively draining), answering phone calls 10x/day (emotionally overwhelming), giving up all weekends (socially isolating).',
        },
        {
          title: 'Propose an Alternative',
          description:
            'What is a realistic adjustment? Examples: "I can visit twice a week instead of daily." "I can manage daytime calls but will turn phone off after 8pm." "I will hire aide for bathing instead of doing it myself." "I need one weekend per month with no caregiving responsibilities."',
        },
        {
          title: 'Use the Script',
          description:
            'Say: "I love you and I want to continue helping, but I need to make a change to avoid burnout. Instead of [current exhausting task], I am going to [alternative]. This will help me be a better caregiver in the long run."',
        },
        {
          title: 'Expect Pushback',
          description:
            'Your loved one may say: "You don\'t care about me." "I\'ll just suffer alone." "Other families don\'t abandon their parents." Do not argue. Repeat: "I understand you\'re upset, but this is the decision I need to make to continue caring for you sustainably."',
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Explore Self-Care Resources',
    },

    citations: [
      {
        id: '1',
        text: 'National Alliance for Caregiving and AARP. Caregiving in the U.S. 2020.',
        source: 'AARP',
        year: '2020',
        link: 'https://www.aarp.org/caregiving/basics/info-2020/caregiving-in-the-united-states.html',
        tier: 2,
      },
      {
        id: '2',
        text: 'Bevans, M., & Sternberg, E. M. Caregiving burden, stress, and health effects among family caregivers of adult cancer patients.',
        source: 'JAMA',
        year: '2012',
        link: 'https://doi.org/10.1001/jama.2012.5063',
        tier: 1,
      },
      {
        id: '3',
        text: 'Aneshensel, C. S., et al. Profiles in Caregiving: The Unexpected Career.',
        source: 'Academic Press',
        year: '1995',
        link: 'https://doi.org/10.1016/B978-012059540-2/50003-8',
        tier: 1,
      },
      {
        id: '4',
        text: 'Gaugler, J. E., et al. The longitudinal effects of nursing home placement on family caregivers.',
        source: 'Research on Aging',
        year: '2007',
        link: 'https://doi.org/10.1177/0164027507300802',
        tier: 1,
      },
      {
        id: '5',
        text: 'Schulz, R., & Beach, S. R. Caregiving as a risk factor for mortality.',
        source: 'JAMA',
        year: '1999',
        link: 'https://doi.org/10.1001/jama.282.23.2215',
        tier: 1,
      },
      {
        id: '6',
        text: 'Teri, L., et al. Treatment of agitation in Alzheimer disease patients.',
        source: 'Archives of General Psychiatry',
        year: '2000',
        link: 'https://doi.org/10.1001/archpsyc.57.11.1039',
        tier: 1,
      },
      {
        id: '7',
        text: 'Family Caregiver Alliance. Caregiver Self-Care: Taking Care of YOU.',
        source: 'Family Caregiver Alliance',
        year: '2021',
        link: 'https://www.caregiver.org/resource/caregiver-self-care/',
        tier: 3,
      },
      {
        id: '8',
        text: 'Sorensen, S., et al. Dementia care: Mental health effects, intervention strategies, and clinical implications.',
        source: 'The Lancet Neurology',
        year: '2006',
        link: 'https://doi.org/10.1016/S1474-4422(05)70277-8',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          You are bathing your mother for the third time this week. She resists, accuses you of hurting her, cries that she wants to die. You are patient on the outside; inside you are screaming. Later, when you finally get two hours to yourself, you feel guilty for leaving. Guilty for being relieved. Guilty for the thought that crossed your mind: "I wish this were over."
          <Citation index={1} />
        </p>
        <p>
          Caregiver guilt is so pervasive that many mistake it for devotion. But guilt is not love--it is the emotional tax of a care system that romanticizes self-sacrifice and penalizes boundaries. Managing guilt requires recognizing it as a structural problem, not a personal failing.
        </p>

        <h2>Where Does Caregiver Guilt Come From?</h2>
        <p>
          Caregiver guilt has three sources: (1) Cultural myths: The "good daughter" or "good son" syndrome--the belief that love requires total self-sacrifice, that needing help is weakness, that considering placement is abandonment. (2) Impossible standards: Caregiving tasks are infinite; there is always more you could do (one more visit, one more phone call, one more sacrifice). No amount is ever "enough." (3) Role reversal: You are now the parent to your parent. This inversion feels unnatural and generates guilt for "controlling" someone who once controlled you.
          <Citation index={2} />
        </p>

        <ArticleCallout variant="insight" title="Guilt Is Not a Reliable Moral Compass">
          <p>
            Guilt is a feeling, not a fact. Feeling guilty does not mean you have done something wrong. Caregivers feel guilty for: taking a vacation, saying no to a request, hiring help, wanting their life back, feeling resentful, considering nursing home placement, being relieved when their loved one dies. None of these are moral failures--they are human responses to impossible situations. Guilt is not a sign that you are falling short; it is a sign that the system expects too much.
          </p>
        </ArticleCallout>

        <h2>The Cost of Guilt-Driven Caregiving</h2>
        <p>
          When guilt drives caregiving, caregivers: (1) Refuse help ("I should be able to do this myself"). (2) Sacrifice health (skipping doctor appointments, ignoring chest pain, not sleeping). (3) Abandon social life (no friends, no hobbies, no identity outside caregiving). (4) Delay necessary placement (keeping loved one at home past the point of safety because "I promised I would never put her in a home"). The result: caregiver burnout, depression, physical illness--and ultimately, worse care for the person you are trying to help. Guilt does not make you a better caregiver; it makes you a depleted one.
          <Citation index={3} />
        </p>

        <StatCard
          value="63%"
          label="of caregivers who refuse to set boundaries develop clinical depression within two years"
          description="Compared to 28% of caregivers who practice boundary-setting and self-care. Martyrdom is not sustainable."
        />

        <h2>Reframing Guilt: From Failing to Finite</h2>
        <p>
          The antidote to guilt is not doing more--it is accepting your limits. You are finite. You have one body, one life, one reservoir of energy. You cannot be available 24/7. You cannot prevent your loved one's decline. You cannot cure dementia, reverse aging, or stop death. What you can do: provide good-enough care within the limits of your capacity. "Good enough" is not mediocre--it is sustainable. It is the difference between caregiving for two years and burning out, versus caregiving for five years and surviving.
          <Citation index={4} />
        </p>

        <BeforeAfter
          before={{
            title: 'Guilt-Driven Caregiving',
            points: [
              'Caregiver visits parent daily, even when exhausted. Skips therapy appointments, cancels social plans, ignores own health. Feels guilty every time she says no.',
              'Parent becomes more demanding (learned behavior: complaints get immediate attention). Caregiver grows resentful but cannot stop because "good daughters don\'t abandon their mothers."',
              'Within two years: caregiver develops depression, high blood pressure, weight gain. Caregiving becomes unsustainable. Crisis placement in poor-quality facility.',
            ],
          }}
          after={{
            title: 'Boundary-Based Caregiving',
            points: [
              'Caregiver visits parent three times per week, hires aide for bathing, arranges adult day care two days per week. Attends own therapy appointments, maintains friendships, exercises.',
              'Parent initially protests but adjusts. Professional aides provide competent care. Caregiver is rested, emotionally regulated, and present during visits.',
              'After five years: caregiver is still functioning well. When placement becomes necessary, it is planned and high-quality. Caregiver has no regrets because she sustained care long-term.',
            ],
          }}
        />

        <h2>How to Set Boundaries Without Guilt</h2>
        <p>
          Step 1: Identify your limit. What is one caregiving task that is depleting you? (Example: answering phone calls 10x/day.) Step 2: Propose an alternative. (Example: "I will call you once in the morning and once in the evening. If it is an emergency, press your alert button.") Step 3: Communicate the boundary clearly and calmly. Use the script: "I love you and I want to continue helping, but I need to make a change to avoid burnout. Instead of [current task], I am going to [alternative]. This will help me be a better caregiver in the long run." Step 4: Expect pushback. Your loved one may say: "You don't care about me." "I'll just suffer alone." Do not argue. Repeat: "I understand you're upset, but this is the decision I need to make."
          <Citation index={5} />
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Common Boundary Scenarios',
              content: (
                <>
                  <p>
                    Scenario 1: "My parent calls me 15 times a day for non-urgent things." Boundary: "I will call you at 9am and 6pm every day. For emergencies, use your alert pendant. I will not answer other calls because I need to focus on work." Scenario 2: "My parent expects me to visit daily." Boundary: "I will visit Tuesdays, Thursdays, and Sundays. On other days, the aide will help you." Scenario 3: "My parent refuses help from aides and only wants me." Boundary: "I understand you prefer me, but I need help to continue caregiving. The aide will bathe you on Mondays and Thursdays. I will be there other days." Scenario 4: "My sibling does nothing and I do everything." Boundary: "I need you to take one weekend per month. If you cannot, I will hire respite care and split the cost."
                  </p>
                </>
              ),
            },
            {
              title: 'What If My Loved One Refuses to Respect Boundaries?',
              content: (
                <>
                  <p>
                    Boundaries are not requests--they are decisions. If your loved one refuses: (1) Do not negotiate. Repeat the boundary calmly. (2) Follow through consistently. If you said you will not answer calls after 8pm, do not answer. If you said you will visit three times per week, do not increase visits when they complain. (3) Accept that they may be upset. You cannot control their emotions; you can only control your actions. (4) If they escalate (threats, manipulation, accusations), consider involving a therapist or care manager to mediate.
                  </p>
                </>
              ),
            },
            {
              title: 'Is It Ever Okay to Stop Caregiving?',
              content: (
                <>
                  <p>
                    Yes. If caregiving is destroying your health, your marriage, your sanity--it is okay to stop. Stopping does not mean abandonment; it means transitioning to a different role. You can: (1) Place your loved one in assisted living or nursing home and visit regularly. (2) Hire 24-hour in-home care and oversee from a distance. (3) Transfer primary caregiving to a sibling or professional care manager. You are not obligated to sacrifice your life. Your life has value independent of caregiving.
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>The Myth of the "Deathbed Promise"</h2>
        <p>
          Many caregivers feel bound by promises made years earlier: "Promise me you'll never put me in a nursing home." "Promise you'll take care of me." These promises were made when your parent was healthy, when you did not understand what caregiving entails, when the future was abstract. Now the reality is: your parent needs total care, wanders at night, has become incontinent, no longer recognizes you. The promise you made assumed circumstances that no longer exist. You are not morally obligated to honor a promise that was based on incomplete information. Promises can be renegotiated when circumstances change.
          <Citation index={6} />
        </p>

        <QuoteBlock
          quote="Guilt whispers that you are not enough. Compassion--for yourself--whispers back: 'I am doing my best with the resources I have. That is enough.'"
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />

        <h2>Self-Care Is Not Selfish</h2>
        <p>
          The phrase "self-care" has been co-opted by bath-bomb marketing, but the real definition is this: self-care is any action that preserves your capacity to function. It includes: sleeping 7-8 hours per night, eating meals, taking prescribed medications, attending your own doctor appointments, maintaining friendships, exercising, going to therapy, taking breaks from caregiving. These are not luxuries--they are necessities. You cannot pour from an empty cup. If you collapse, caregiving collapses.
          <Citation index={7} />
        </p>

        <ArticleCallout variant="tip" title="Non-Negotiable Self-Care Minimums">
          <p>
            Even in the hardest caregiving situations, these are non-negotiable: (1) Sleep: 6-8 hours per night. If your loved one wakes you repeatedly, hire overnight aide or consider placement. Chronic sleep deprivation causes depression, impaired judgment, and physical illness. (2) Medical care: Attend your own doctor appointments. Do not skip screenings, ignore symptoms, or delay treatment. (3) Social connection: Maintain at least one friendship. Isolation is a risk factor for caregiver mortality. (4) Respite: Minimum 4 hours per week away from caregiving. Hire aide, use adult day care, ask family to cover. Non-negotiable.
          </p>
        </ArticleCallout>

        <QuoteBlock
          quote="Boundaries are not walls--they are the architecture that makes long-term caregiving possible. Without them, you do not last."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
];
