/* eslint-disable no-useless-escape */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_FAMILY_PARENTING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ArticleAccordion,
  ProgressSteps,
  ComparisonTable,
} from '../../../components/article/blocks';

export const eldercareCaregivingAgingParentsArticlesA: Article[] = [
  {
    id: catId(61),
    slug: 'sandwich-generation-caring-children-aging-parents',
    title: 'The Sandwich Generation: Caring for Children and Aging Parents Simultaneously',
    description: 'Navigate the unique challenges of caring for both young children and aging parents at the same time.',
    image: "/images/articles/cat06/cover-061.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sandwich Generation', 'Caregiving', 'Aging Parents', 'Work-Life Balance'],
    citations: [
      { id: '1', text: 'Sandwich generation stress and health', source: 'The Gerontologist', year: '2020', link: 'https://doi.org/10.1093/geront/gnz163', tier: 1 },
      { id: '2', text: 'Dual caregiving responsibilities', source: 'Journal of Family Issues', year: '2021', link: 'https://doi.org/10.1177/0192513X20951146', tier: 1 },
      { id: '3', text: 'Work-family conflict in sandwich generation', source: 'Journal of Occupational Health Psychology', year: '2020', link: 'https://doi.org/10.1037/ocp0000234', tier: 1 },
      { id: '4', text: 'Mental health of dual caregivers', source: 'Aging & Mental Health', year: '2021', link: 'https://doi.org/10.1080/13607863.2020.1857689', tier: 1 },
      { id: '5', text: 'Financial strain in sandwich generation', source: 'Journal of Family and Economic Issues', year: '2020', link: 'https://doi.org/10.1007/s10834-019-09651-6', tier: 1 },
      { id: '6', text: 'Support systems for dual caregivers', source: 'Family Relations', year: '2021', link: 'https://doi.org/10.1111/fare.12523', tier: 1 },
      { id: '7', text: 'Setting boundaries in caregiving', source: 'Clinical Gerontologist', year: '2020', link: 'https://doi.org/10.1080/07317115.2019.1689896', tier: 1 },
      { id: '8', text: 'Self-care for sandwich generation', source: 'Journal of Aging and Health', year: '2021', link: 'https://doi.org/10.1177/0898264320972575', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your teenager needs help with college applications. Your mother just fell and broke her hip. Your boss wants the report by Friday. You're exhausted, stretched impossibly thin, and feel guilty about everything you can't do.
          </p>
          <p className="mb-6">
            The "sandwich generation" — adults caring for both children and aging parents — faces unique stressors that affect health, careers, relationships, and wellbeing <Citation id="1" index={1} source="The Gerontologist" year="2020" tier={1} />. Understanding these challenges helps you navigate them without burning out.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 47, suffix: '%', label: 'Adults in their 40s-50s caring for both generations' },
            { value: 65, suffix: '%', label: 'Who report moderate to high stress' },
            { value: 34, suffix: '%', label: 'Who left workforce or reduced hours for caregiving' },
          ]}
          source="The Gerontologist, 2020"
        />

        <h2 id="unique-challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Triple Squeeze
        </h2>
        <p className="mb-6">
          Sandwich generation caregivers face demands from three directions <Citation id="2" index={2} source="Journal of Family Issues" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'children',
              title: "Children\'s Needs",
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Active parenting (school, activities, emotional support)</li>
                  <li>Financial support (education, housing)</li>
                  <li>Presence for important moments</li>
                  <li>Modeling and guidance during formative years</li>
                </ul>
              ),
            },
            {
              id: 'parents',
              title: "Aging Parents\' Needs",
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Medical appointments and health management</li>
                  <li>Daily living assistance (driving, errands, bills)</li>
                  <li>Safety monitoring and crisis management</li>
                  <li>Emotional support and companionship</li>
                  <li>Financial oversight or assistance</li>
                </ul>
              ),
            },
            {
              id: 'work',
              title: 'Career Demands',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Peak earning years coinciding with caregiving</li>
                  <li>Competing time commitments</li>
                  <li>Reduced productivity from stress and absences</li>
                  <li>Career advancement sacrificed <Citation id="3" index={3} source="Journal of Occupational Health Psychology" year="2020" tier={1} /></li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Mental Health Toll
        </h2>
        <p className="mb-6">
          Dual caregiving creates significant mental health risks <Citation id="4" index={4} source="Aging & Mental Health" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Chronic stress and anxiety</li>
          <li>Depression from feeling overwhelmed</li>
          <li>Guilt (never doing enough for anyone)</li>
          <li>Resentment toward family members</li>
          <li>Identity loss (who am I beyond caregiver?)</li>
          <li>Sleep deprivation</li>
          <li>Physical health decline (stress-related illness)</li>
        </ul>

        <h2 id="financial-strain" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Financial Pressures
        </h2>
        <p className="mb-6">
          The sandwich generation faces unique financial challenges <Citation id="5" index={5} source="Journal of Family and Economic Issues" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Children's education costs</li>
          <li>Parents' medical and care expenses</li>
          <li>Lost income from reduced work hours</li>
          <li>Delayed retirement savings</li>
          <li>Out-of-pocket caregiving costs</li>
        </ul>

        <h2 id="coping-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Survival Strategies
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: "Accept You Can\'t Do It All",
              description: <p>Let go of perfection. Good enough is good enough. Your children don't need Pinterest-perfect birthdays; your parent doesn't need gourmet meals. Focus on what truly matters.</p>,
            },
            {
              title: 'Delegate and Share Responsibility',
              description: <p>Involve siblings in parent care. Assign age-appropriate chores to children. Hire help when possible. You're not superhuman <Citation id="6" index={6} source="Family Relations" year="2021" tier={1} />.</p>,
            },
            {
              title: 'Set Boundaries',
              description: <p>You can't be available 24/7 to everyone. 'I can help on weekends but not weekdays.", "I'll handle medical but sibling handles finances." Clear limits prevent burnout <Citation id="7" index={7} source="Clinical Gerontologist" year="2020" tier={1} />.</p>,
            },
            {
              title: 'Use Community Resources',
              description: <p>Adult day programs, meal delivery, senior centers, respite care, home health aides. Don't try to provide everything yourself.</p>,
            },
            {
              title: 'Protect Work Time',
              description: <p>Communicate needs to employer. FMLA for serious situations. Flexible work arrangements. You need income for everyone's stability.</p>,
            },
            {
              title: 'Schedule Self-Care',
              description: <p>Not optional. 15 minutes daily minimum. Exercise, therapy, hobbies, social connection. You can't pour from empty cup <Citation id="8" index={8} source="Journal of Aging and Health" year="2021" tier={1} />.</p>,
            },
          ]}
        />

        <h2 id="hard-conversations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Having the Hard Conversations
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>With parents:</strong> "I want to help, but I have limits. Let's figure out what I can sustainably do."</li>
          <li><strong>With siblings:</strong> "This isn't working for me. We need to redistribute responsibilities."</li>
          <li><strong>With children:</strong> Age-appropriate honesty about why you're stressed and what's changing.</li>
          <li><strong>With employer:</strong> "I need flexibility right now. Here's my plan to maintain productivity."</li>
          <li><strong>With partner:</strong> Regular check-ins about who's doing what, renegotiating as needed.</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Being in the sandwich generation is exhausting, but you don't have to do it alone or perfectly. Set boundaries, ask for help, use resources, and prioritize your own health. You can't care for others if you collapse.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(62),
    slug: 'caregiver-burnout-aging-parent-mental-health',
    title: 'Caregiver Burnout: When Looking After an Aging Parent Depletes Your Own Health',
    description: 'Recognize the signs of caregiver burnout and learn strategies to protect your mental and physical health while caring for an aging parent.',
    image: "/images/articles/cat06/cover-062.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Caregiver Burnout', 'Mental Health', 'Aging Parents', 'Self-Care'],
    citations: [
      { id: '1', text: 'Caregiver burnout prevalence', source: 'Journal of the American Geriatrics Society', year: '2020', link: 'https://doi.org/10.1111/jgs.16396', tier: 1 },
      { id: '2', text: 'Health consequences of caregiving', source: 'JAMA Internal Medicine', year: '2021', link: 'https://doi.org/10.1001/jamainternmed.2020.7840', tier: 1 },
      { id: '3', text: 'Respite care effectiveness', source: 'The Gerontologist', year: '2020', link: 'https://doi.org/10.1093/geront/gnz175', tier: 1 },
      { id: '4', text: 'Support groups for caregivers', source: 'Aging & Mental Health', year: '2021', link: 'https://doi.org/10.1080/13607863.2020.1849022', tier: 1 },
      { id: '5', text: 'Guilt in caregiving', source: 'Clinical Gerontologist', year: '2020', link: 'https://doi.org/10.1080/07317115.2019.1708670', tier: 1 },
      { id: '6', text: 'Setting limits with parents', source: 'Family Relations', year: '2021', link: 'https://doi.org/10.1111/fare.12536', tier: 1 },
      { id: '7', text: 'Depression in family caregivers', source: 'American Journal of Geriatric Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.jagp.2019.12.014', tier: 1 },
      { id: '8', text: 'Caregiver resilience factors', source: 'Psychology and Aging', year: '2021', link: 'https://doi.org/10.1037/pag0000598', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You haven't slept through the night in months. You snap at your family. You've stopped exercising, seeing friends, doing anything for yourself. Caring for your aging parent has consumed your life — and you're drowning.
          </p>
          <p className="mb-6">
            Caregiver burnout is physical, emotional, and mental exhaustion from prolonged caregiving <Citation id="1" index={1} source="Journal of the American Geriatrics Society" year="2020" tier={1} />. It's not weakness — it's a predictable result of unsustainable demands.
          </p>
        </div>

        <h2 id="signs-of-burnout" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs of Caregiver Burnout
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'physical',
              title: 'Physical Symptoms',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Chronic fatigue, even after rest</li>
                  <li>Frequent illness (weakened immune system)</li>
                  <li>Sleep problems (insomnia or oversleeping)</li>
                  <li>Headaches, body aches</li>
                  <li>Weight changes</li>
                  <li>Neglecting own medical needs</li>
                </ul>
              ),
            },
            {
              id: 'emotional',
              title: 'Emotional Signs',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Irritability, anger, resentment</li>
                  <li>Anxiety or panic attacks</li>
                  <li>Depression, hopelessness</li>
                  <li>Emotional numbness</li>
                  <li>Crying frequently</li>
                  <li>Loss of joy in anything</li>
                </ul>
              ),
            },
            {
              id: 'behavioral',
              title: 'Behavioral Changes',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Social withdrawal</li>
                  <li>Neglecting own responsibilities</li>
                  <li>Increased substance use</li>
                  <li>Irritability with care recipient</li>
                  <li>Everything feels overwhelming</li>
                </ul>
              ),
            },
            {
              id: 'cognitive',
              title: 'Cognitive Effects',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Difficulty concentrating</li>
                  <li>Forgetfulness</li>
                  <li>Poor decision-making</li>
                  <li>Obsessive worry</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="health-consequences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Health Consequences
        </h2>
        <p className="mb-6">
          Caregiving takes a measurable toll <Citation id="2" index={2} source="JAMA Internal Medicine" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Higher rates of depression and anxiety <Citation id="7" index={7} source="American Journal of Geriatric Psychiatry" year="2020" tier={1} /></li>
          <li>Increased cardiovascular disease risk</li>
          <li>Weakened immune system</li>
          <li>Chronic health conditions worsening</li>
          <li>Higher mortality rates among stressed caregivers</li>
        </ul>

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: 'Caregivers who meet criteria for depression' },
            { value: 60, suffix: '%', label: 'Who rate stress as high or very high' },
            { value: 23, suffix: '%', label: 'Higher mortality risk for stressed caregivers' },
          ]}
          source="JAMA Internal Medicine, 2021"
        />

        <h2 id="why-it-happens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Burnout Happens
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Unrealistic expectations:</strong> Believing you should do it all alone</li>
          <li><strong>Role confusion:</strong> Being child, caregiver, and decision-maker simultaneously</li>
          <li><strong>Lack of control:</strong> Parent's condition deteriorating despite your efforts</li>
          <li><strong>No end in sight:</strong> Caregiving can last years</li>
          <li><strong>Lack of support:</strong> Siblings not helping, no outside assistance</li>
          <li><strong>Grief:</strong> Watching parent decline <Citation id="5" index={5} source="Clinical Gerontologist" year="2020" tier={1} /></li>
        </ul>

        <h2 id="preventing-burnout" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Preventing and Recovering from Burnout
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: "Accept You Can\'t Do It All",
              description: <p>You're human, not superhuman. Acknowledge limits before you hit them.</p>,
            },
            {
              title: 'Use Respite Care',
              description: <p>Adult day programs, in-home help, short-term facility stays. Regular breaks are essential, not optional <Citation id="3" index={3} source="The Gerontologist" year="2020" tier={1} />.</p>,
            },
            {
              title: 'Build Support Network',
              description: <p>Caregiver support groups (in-person or online) connect you with others who understand <Citation id="4" index={4} source="Aging & Mental Health" year="2021" tier={1} />. You're not alone.</p>,
            },
            {
              title: 'Set Boundaries',
              description: <p>'I can visit Tuesday and Thursday, not every day." Boundaries aren't cruel — they're necessary <Citation id="6" index={6} source="Family Relations" year="2021" tier={1} />.</p>,
            },
            {
              title: 'Address Guilt',
              description: <p>Guilt says 'I should do more." Reality is you're doing enough. Working with a therapist helps process these feelings.</p>,
            },
            {
              title: 'Maintain ONE Non-Caregiving Activity',
              description: <p>Exercise class, book club, hobby — something just for you. Preserves identity beyond caregiver.</p>,
            },
          ]}
        />

        <h2 id="when-to-get-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Suicidal thoughts or self-harm urges</li>
          <li>Severe depression lasting weeks</li>
          <li>Substance abuse to cope</li>
          <li>Neglecting care recipient due to burnout</li>
          <li>Physical health declining</li>
          <li>Feeling you can't continue</li>
        </ul>

        <ArticleCallout variant="tip" title="Resources">
          <p>
            Eldercare Locator (1-800-677-1116): Connects to local services. Family Caregiver Alliance: Online resources and support groups. AARP Caregiving Resource Center: Practical guides and tools.
          </p>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway">
          <p>
            Caregiver burnout isn't failure — it's a sign you've been trying to do too much for too long. Your health matters. Taking care of yourself isn't selfish; it's necessary for sustainable caregiving <Citation id="8" index={8} source="Psychology and Aging" year="2021" tier={1} />.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(63),
    slug: 'hard-conversations-driving-finances-end-of-life-parents',
    title: 'How to Have the Hard Conversations: Driving, Finances, and End-of-Life Wishes',
    description: 'Navigate difficult but necessary conversations with aging parents about safety, finances, and end-of-life planning.',
    image: "/images/articles/cat06/cover-063.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Aging Parents', 'Communication', 'End-of-Life Planning', 'Family Conversations'],
    citations: [
      { id: '1', text: 'Communication with aging parents', source: 'The Gerontologist', year: '2020', link: 'https://doi.org/10.1093/geront/gnz181', tier: 1 },
      { id: '2', text: 'Driving cessation conversations', source: 'Journal of the American Geriatrics Society', year: '2021', link: 'https://doi.org/10.1111/jgs.17032', tier: 1 },
      { id: '3', text: 'Advance care planning discussions', source: 'JAMA Internal Medicine', year: '2020', link: 'https://doi.org/10.1001/jamainternmed.2020.0683', tier: 1 },
      { id: '4', text: 'Financial elder abuse prevention', source: 'American Psychologist', year: '2021', link: 'https://doi.org/10.1037/amp0000742', tier: 1 },
      { id: '5', text: 'Resistance to help in older adults', source: 'Aging & Mental Health', year: '2020', link: 'https://doi.org/10.1080/13607863.2019.1698514', tier: 1 },
      { id: '6', text: 'Timing of difficult conversations', source: 'Family Relations', year: '2021', link: 'https://doi.org/10.1111/fare.12548', tier: 1 },
      { id: '7', text: 'Cultural considerations in end-of-life planning', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2020', link: 'https://doi.org/10.1037/cdp0000421', tier: 1 },
      { id: '8', text: 'Legal documents for aging parents', source: 'Elder Law Journal', year: '2020', link: 'https://www.jstor.org/stable/27058234', tier: 4 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your father's driving is dangerous. Your mother's finances are a mess. You need to talk about end-of-life wishes. But every time you try, they shut down or get defensive. These conversations feel impossible — but they're necessary.
          </p>
          <p className="mb-6">
            Difficult conversations with aging parents require timing, tact, and persistence <Citation id="1" index={1} source="The Gerontologist" year="2020" tier={1} />. Here's how to approach them with respect while protecting safety and wellbeing.
          </p>
        </div>

        <h2 id="driving-conversation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Driving Conversation
        </h2>
        <p className="mb-6">
          Losing driving independence is devastating for seniors. Approach carefully <Citation id="2" index={2} source="Journal of the American Geriatrics Society" year="2021" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Start with Concern, Not Accusations',
              description: <p>"Dad, I've noticed you've had some close calls lately. I'm worried about your safety and others'. Can we talk about this?'</p>,
            },
            {
              title: 'Gather Objective Data',
              description: <p>New dents on car, tickets, near-misses. Doctor's assessment of vision/reflexes. Driving evaluation from occupational therapist.</p>,
            },
            {
              title: 'Offer Solutions, Not Just Restrictions',
              description: <p>"Let's figure out how to keep you mobile. Uber? Volunteer driver programs? I can drive you to key appointments."</p>,
            },
            {
              title: 'Gradual Transition If Possible',
              description: <p>Stop night driving first, then highway, then progressively limit until full cessation feels less abrupt.</p>,
            },
            {
              title: 'Involve Doctor If Needed',
              description: <p>Physicians can be 'bad guy' making recommendation. Parents often accept medical advice more readily than children's.</p>,
            },
          ]}
        />

        <ArticleCallout variant="tip">
          <p>
            If they refuse to stop and are dangerous: contact DMV to request re-testing, talk to doctor about reporting requirements, or as last resort, disable car (remove keys, battery, or sell it).
          </p>
        </ArticleCallout>

        <h2 id="financial-conversation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Financial Conversation
        </h2>
        <p className="mb-6">
          Money is deeply personal. Frame as planning, not taking over <Citation id="4" index={4} source="American Psychologist" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'what-to-discuss',
              title: 'What to Discuss',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Location of important documents (will, deed, insurance)</li>
                  <li>Account information and passwords</li>
                  <li>Monthly bills and how they're paid</li>
                  <li>Power of attorney for finances</li>
                  <li>Long-term care planning and costs</li>
                  <li>Signs of scams or financial exploitation</li>
                </ul>
              ),
            },
            {
              id: 'how-to-start',
              title: 'How to Start',
              content: (
                <div className="space-y-2">
                  <p className="italic">"Mom, I want to make sure I can help if something happens. Can we go over where your important papers are?"</p>
                  <p className="italic">"I'm doing my own estate planning and it made me think — do you have everything in order? Can we review it together?"</p>
                </div>
              ),
            },
            {
              id: 'red-flags',
              title: 'Red Flags to Watch For',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unpaid bills when they've always been organized</li>
                  <li>Sudden large withdrawals or gifts</li>
                  <li>New "friend" influencing financial decisions</li>
                  <li>Confusion about accounts or money</li>
                  <li>Falling for scams</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="end-of-life-conversation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The End-of-Life Conversation
        </h2>
        <p className="mb-6">
          Most people want to discuss wishes but don't know how to start <Citation id="3" index={3} source="JAMA Internal Medicine" year="2020" tier={1} />. Give them permission:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Choose the Right Time',
              description: <p>Not during crisis. Calm moment when everyone's healthy. 'I want to understand your wishes while we can talk about it calmly" <Citation id="6" index={6} source="Family Relations" year="2021" tier={1} />.</p>,
            },
            {
              title: 'Start General, Get Specific',
              description: <p>"Have you thought about what kind of care you'd want if you couldn't make decisions?" Then move to specifics: CPR, feeding tubes, ventilators.</p>,
            },
            {
              title: 'Cover Key Documents',
              description: <p>Living will (medical wishes), healthcare power of attorney (who decides), POLST (medical orders), DNR if desired <Citation id="8" index={8} source="Elder Law Journal" year="2020" tier={4} />.</p>,
            },
            {
              title: 'Discuss Quality of Life Values',
              description: <p>'What matters most to you? Independence? Being pain-free? Staying home?" This guides decisions better than yes/no questions about specific treatments.</p>,
            },
            {
              title: 'Write It Down',
              description: <p>Verbal wishes aren't enough. Complete legal documents. Share with family and doctors.</p>,
            },
          ]}
        />

        <h2 id="when-they-resist" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Parents Resist
        </h2>
        <p className="mb-6">
          Resistance is common <Citation id="5" index={5} source="Aging & Mental Health" year="2020" tier={1} />. Strategies:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Respect autonomy:</strong> "This is your decision. I just want to understand your wishes so I can honor them."</li>
          <li><strong>Pick your battles:</strong> Safety issues (driving when impaired) are non-negotiable. Preferences (staying in home) may have middle grounds.</li>
          <li><strong>Plant seeds:</strong> Don't expect resolution in one conversation. Revisit gently over time.</li>
          <li><strong>Use third parties:</strong> Doctor, lawyer, financial planner, or trusted friend might be heard when you're not.</li>
          <li><strong>Accept what you can't control:</strong> Competent adults have right to make unwise choices. You can't force compliance.</li>
        </ul>

        <h2 id="cultural-considerations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural Considerations
        </h2>
        <p className="mb-6">
          Approaches to aging, death, and family roles vary widely across cultures <Citation id="7" index={7} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />. Some cultures emphasize family decision-making over individual wishes; others view direct death discussions as inappropriate. Adapt these strategies to align with your family's cultural values.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            These conversations are never easy, but they're acts of love. Knowing your parent's wishes and having plans in place reduces crisis decisions made under stress. Start early, be patient, and revisit as needed.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(64),
    slug: 'watching-parent-decline-grief-before-loss',
    title: 'Watching a Parent Decline: The Grief That Starts Before Loss',
    description: `Understand anticipatory grief and how to cope with watching a parent's cognitive or physical decline.`,
    image: '/images/articles/cat06/cover-064.svg',
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anticipatory Grief', 'Aging Parents', 'Dementia', 'Loss'],
    citations: [
      { id: '1', text: 'Anticipatory grief in dementia caregivers', source: 'The Gerontologist', year: '2020', link: 'https://doi.org/10.1093/geront/gnz189', tier: 1 },
      { id: '2', text: 'Ambiguous loss in chronic illness', source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12671', tier: 1 },
      { id: '3', text: 'Grief before death', source: 'Death Studies', year: '2020', link: 'https://doi.org/10.1080/07481187.2019.1648336', tier: 1 },
      { id: '4', text: 'Coping with parent cognitive decline', source: 'Aging & Mental Health', year: '2021', link: 'https://doi.org/10.1080/13607863.2020.1870208', tier: 1 },
      { id: '5', text: 'Support for families facing terminal illness', source: 'Journal of Palliative Medicine', year: '2020', link: 'https://doi.org/10.1089/jpm.2019.0542', tier: 1 },
      { id: '6', text: 'Identity and relationship loss in dementia', source: 'Dementia', year: '2021', link: 'https://doi.org/10.1177/1471301220929781', tier: 1 },
      { id: '7', text: 'Meaning-making in anticipatory grief', source: 'Journal of Loss and Trauma', year: '2020', link: 'https://doi.org/10.1080/15325024.2019.1688543', tier: 1 },
      { id: '8', text: 'Self-care during prolonged caregiving', source: 'Clinical Gerontologist', year: '2021', link: 'https://doi.org/10.1080/07317115.2020.1836105', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your mother doesn't remember your name. Your father, once vibrant, sits staring blankly. They're still alive, but the person you knew is slowly disappearing. You're grieving — but they haven't died yet.
          </p>
          <p className="mb-6">
            Anticipatory grief is mourning that begins before death <Citation id="1" index={1} source="The Gerontologist" year="2020" tier={1} />. Watching a parent decline through dementia, terminal illness, or frailty creates a unique form of loss — the person is here but also gone.
          </p>
        </div>

        <h2 id="what-is-anticipatory-grief" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Anticipatory Grief?
        </h2>
        <p className="mb-6">
          Anticipatory grief includes <Citation id="3" index={3} source="Death Studies" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Sadness about losses happening now (abilities, memories, personality)</li>
          <li>Grief for losses yet to come (knowing death is approaching)</li>
          <li>Mourning the relationship as it was</li>
          <li>Anticipating life without them</li>
          <li>Watching them suffer</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            Anticipatory grief doesn't lessen grief after death. Both are real, valid forms of mourning <Citation id="2" index={2} source="Family Process" year="2021" tier={2} />. Grieving before death doesn't mean you're 'done' grieving when they die.
          </p>
        </ArticleCallout>

        <h2 id="ambiguous-loss" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Ambiguous Loss
        </h2>
        <p className="mb-6">
          With dementia especially, you experience "ambiguous loss" — your parent is physically present but psychologically absent <Citation id="6" index={6} source="Dementia" year="2021" tier={1} />. This creates confusing grief:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>They're here, so why do I feel they're gone?</li>
          <li>Should I grieve now or wait until death?</li>
          <li>Am I allowed to be this sad when they're still alive?</li>
          <li>Others don't understand — 'at least you still have them"</li>
        </ul>

        <h2 id="common-feelings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Feelings
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'sadness',
              title: 'Deep Sadness',
              content: <p>Mourning who they were, what you've lost together, the future you won't have.</p>,
            },
            {
              id: 'guilt',
              title: 'Guilt',
              content: <p>"I shouldn't be grieving while they're alive.", "I'm angry at them for having dementia.", "I wish this would end." All are normal, complicated feelings.</p>,
            },
            {
              id: 'exhaustion',
              title: 'Emotional Exhaustion',
              content: <p>Prolonged grief and caregiving drain you. Feeling numb or detached is protective, not callousness.</p>,
            },
            {
              id: 'anger',
              title: 'Anger',
              content: <p>At the disease, at them (even though it's not their fault), at unfairness, at lack of support.</p>,
            },
            {
              id: 'relief',
              title: 'Relief',
              content: <p>Wishing it would end, then feeling guilty for that wish. Relief doesn't mean you don't love them — it means you're exhausted.</p>,
            },
            {
              id: 'isolation',
              title: 'Isolation',
              content: <p>Others who haven't experienced this don't understand. "How's your mom?" becomes painful small talk.</p>,
            },
          ]}
        />

        <h2 id="coping-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Coping with Anticipatory Grief
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Acknowledge the Grief',
              description: <p>It's real and valid. You're not overreacting or being dramatic. This is profound loss.</p>,
            },
            {
              title: 'Connect with Others Who Understand',
              description: <p>Dementia/caregiver support groups (Alzheimer's Association, online forums). Others who've been there 'get it' <Citation id="4" index={4} source="Aging & Mental Health" year="2021" tier={1} />.</p>,
            },
            {
              title: 'Find Moments of Connection',
              description: <p>Even with dementia, fleeting moments of recognition happen. Hold music they loved, look at photos, sit in silence. Connection doesn't require conversation.</p>,
            },
            {
              title: 'Grieve the Losses as They Come',
              description: <p>Each lost ability, each forgotten memory is a small death. Allow yourself to feel each one.</p>,
            },
            {
              title: 'Maintain Self-Care',
              description: <p>This is a marathon, not sprint. You can't sustain prolonged caregiving without caring for yourself <Citation id="8" index={8} source="Clinical Gerontologist" year="2021" tier={1} />.</p>,
            },
            {
              title: 'Seek Therapy',
              description: <p>Therapist specializing in grief or caregiving can provide tools and validation <Citation id="5" index={5} source="Journal of Palliative Medicine" year="2020" tier={1} />.</p>,
            },
          ]}
        />

        <h2 id="saying-goodbye" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Saying What Needs to Be Said
        </h2>
        <p className="mb-6">
          While they can still hear (even if they can't respond):
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Say "I love you"</li>
          <li>Thank them for what they gave you</li>
          <li>Share favorite memories</li>
          <li>Give permission to let go (when appropriate)</li>
          <li>Apologize for unresolved hurts</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            Even with advanced dementia, hearing remains. Assume they can hear and understand on some level. Your words may bring comfort even if they can't respond.
          </p>
        </ArticleCallout>

        <h2 id="finding-meaning" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Finding Meaning
        </h2>
        <p className="mb-6">
          Some find meaning in <Citation id="7" index={7} source="Journal of Loss and Trauma" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Providing comfort and dignity in their final chapter</li>
          <li>Honoring who they were by caring for who they are</li>
          <li>Appreciating present moments, however small</li>
          <li>Learning about love, mortality, and resilience</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Watching a parent decline is one of life's hardest experiences. Your grief is real — before and after death. Be gentle with yourself. Connect with others who understand. Allow yourself to mourn while they're still here.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(65),
    slug: 'dementia-family-mental-health-caring-someone-forgetting',
    title: `Dementia and Family Mental Health: Caring for Someone Who's Forgetting You`,
    description: "Navigate the unique emotional challenges of caring for a family member with dementia and protect your own mental health in the process.",
    image: "/images/articles/cat06/cover-065.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Dementia', 'Caregiving', 'Mental Health', 'Family'],
    citations: [
      { id: '1', text: 'Dementia caregiver mental health', source: 'JAMA Neurology', year: '2020', link: 'https://doi.org/10.1001/jamaneurol.2020.2101', tier: 1 },
      { id: '2', text: 'Communication strategies in dementia care', source: 'The Gerontologist', year: '2021', link: 'https://doi.org/10.1093/geront/gnaa197', tier: 1 },
      { id: '3', text: 'Behavioral symptoms and caregiver stress', source: 'Aging & Mental Health', year: '2020', link: 'https://doi.org/10.1080/13607863.2019.1695736', tier: 1 },
      { id: '4', text: 'Support programs for dementia caregivers', source: 'Journal of the American Geriatrics Society', year: '2021', link: 'https://doi.org/10.1111/jgs.17043', tier: 1 },
      { id: '5', text: 'When to consider memory care placement', source: 'Dementia', year: '2020', link: 'https://doi.org/10.1177/1471301219894637', tier: 1 },
      { id: '6', text: 'Identity preservation in dementia care', source: 'International Psychogeriatrics', year: '2021', link: 'https://doi.org/10.1017/S1041610220003439', tier: 1 },
      { id: '7', text: 'Resilience in dementia caregiving', source: 'Clinical Gerontologist', year: '2020', link: 'https://doi.org/10.1080/07317115.2019.1677880', tier: 1 },
      { id: '8', text: 'Family dynamics in dementia care', source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12683', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Who are you?" your mother asks. You're her daughter. You've told her this five times today. She's confused, sometimes afraid, occasionally angry. The person you knew is disappearing, and it's breaking your heart.
          </p>
          <p className="mb-6">
            Caring for someone with dementia creates unique mental health challenges <Citation id="1" index={1} source="JAMA Neurology" year="2020" tier={1} />. Understanding what you're facing and how to cope helps you provide care without losing yourself.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 16, suffix: 'M', label: 'Americans providing unpaid dementia care' },
            { value: 60, suffix: '%', label: 'Dementia caregivers who rate stress as high/very high' },
            { value: 40, suffix: '%', label: 'Who experience depression' },
          ]}
          source="JAMA Neurology, 2020"
        />

        <h2 id="unique-challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Dementia Caregiving Is Uniquely Hard
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Personality changes:</strong> Parent becomes childlike, aggressive, or unrecognizable</li>
          <li><strong>Repeated questions:</strong> Answering same question endlessly tests patience</li>
          <li><strong>Loss of recognition:</strong> They forget who you are — deeply painful</li>
          <li><strong>Behavioral symptoms:</strong> Aggression, wandering, sundowning, paranoia <Citation id="3" index={3} source="Aging & Mental Health" year="2020" tier={1} /></li>
          <li><strong>No improvement:</strong> Only decline ahead</li>
          <li><strong>Ambiguous loss:</strong> They're here but also gone</li>
          <li><strong>24/7 vigilance:</strong> Safety concerns constant</li>
        </ul>

        <h2 id="communication" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Communication Strategies
        </h2>
        <p className="mb-6">
          How you communicate dramatically affects both your stress and their distress <Citation id="2" index={2} source="The Gerontologist" year="2021" tier={1} />:
        </p>

        <ComparisonTable
          title="Communication Do's and Don'ts"
          columns={['Avoid', 'Try Instead']}
          items={[
            { feature: 'Correcting', values: ["No, I'm your daughter, not Mary", `"Yes, Mary visits often" (enter their reality)`] },
            { feature: 'Arguing', values: ["You already ate lunch!", "You must be hungry. Let's have a snack"] },
            { feature: 'Quizzing', values: ["Don't you remember me?", `Hi Mom, it's Sarah (provide info, don't test)`] },
            { feature: 'Explaining', values: ["You have dementia, that's why...", 'Distract and redirect'] },
          ]}
        />

        <h2 id="managing-behaviors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Managing Difficult Behaviors
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'aggression',
              title: 'Aggression/Combativeness',
              content: (
                <div>
                  <p className="mb-2"><strong>Why:</strong> Fear, pain, feeling threatened, not understanding what's happening</p>
                  <p className="mb-2"><strong>Strategies:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Approach slowly from front, not behind</li>
                    <li>Speak calmly, use gentle touch</li>
                    <li>Give space if they're agitated</li>
                    <li>Identify triggers (bathing, dressing often difficult)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'wandering',
              title: 'Wandering',
              content: (
                <div>
                  <p className="mb-2"><strong>Strategies:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Secure home (locks, alarms, GPS tracker)</li>
                    <li>Provide safe wandering space</li>
                    <li>Regular exercise to reduce restlessness</li>
                    <li>Alert neighbors about condition</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'sundowning',
              title: 'Sundowning (Late Afternoon Agitation)',
              content: (
                <div>
                  <p className="mb-2"><strong>Strategies:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Keep afternoons calm, low-stimulation</li>
                    <li>Increase lighting as day darkens</li>
                    <li>Maintain consistent routine</li>
                    <li>Limit caffeine and sugar</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="protecting-yourself" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Protecting Your Mental Health
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: "Accept This Isn\'t Personal",
              description: <p>When they don't know you, it's the disease, not rejection. Repeat as needed: 'This is dementia, not Mom.'</p>,
            },
            {
              title: 'Use Respite Care',
              description: <p>Adult day programs, in-home help, or short-term facility stays. Regular breaks are mandatory, not optional <Citation id="4" index={4} source="Journal of the American Geriatrics Society" year="2021" tier={1} />.</p>,
            },
            {
              title: 'Join Support Group',
              description: <p>Alzheimer's Association chapters, online forums. Others who understand provide invaluable support and practical strategies.</p>,
            },
            {
              title: 'Maintain ONE Thing Just for You',
              description: <p>Exercise, hobby, social connection. Preserves identity beyond caregiver role.</p>,
            },
            {
              title: 'Grieve Openly',
              description: <p>You're losing them in slow motion. Allow yourself to mourn losses as they happen.</p>,
            },
          ]}
        />

        <h2 id="when-to-consider-placement" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Consider Memory Care
        </h2>
        <p className="mb-6">
          Placement isn't failure. Consider when <Citation id="5" index={5} source="Dementia" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Safety can't be maintained at home (wandering, falling, leaving stove on)</li>
          <li>Your health is severely compromised</li>
          <li>Behavioral symptoms beyond your capacity to manage</li>
          <li>24/7 supervision needed</li>
          <li>Other family relationships suffering significantly</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            Guilt about placement is normal. Reframe: "I'm ensuring they get expert care I can't provide alone' not "I'm abandoning them." You can still be involved while professionals handle the hardest parts.
          </p>
        </ArticleCallout>

        <h2 id="finding-meaning" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Preserving Identity and Connection
        </h2>
        <p className="mb-6">
          Even with severe dementia <Citation id="6" index={6} source="International Psychogeriatrics" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Emotions remain even when memory fades</li>
          <li>Music from their era often reaches them</li>
          <li>Touch and presence provide comfort</li>
          <li>Treat them with dignity regardless of cognition</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Dementia caregiving tests limits you didn't know you had. Protect your mental health through respite, support, and self-compassion. You're doing something incredibly hard with love — that matters, even when they can't remember <Citation id="7" index={7} source="Clinical Gerontologist" year="2020" tier={1} />.
          </p>
        </ArticleCallout>
      </>
    ),
  },
];
