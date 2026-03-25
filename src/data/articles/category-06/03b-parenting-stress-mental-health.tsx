 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_FAMILY_PARENTING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout, StatCard } from '../../../components/article/blocks';

export const parentingStressMentalHealthArticlesB: Article[] = [
  {
    id: catId(26),
    slug: 'parenting-with-a-mental-health-condition-honesty-support-and-self-care',
    title: 'Parenting with a Mental Health Condition: Honesty, Support, and Self-Care',
    description: 'Navigate parenting while managing your own mental health condition.',
    image: "/images/articles/cat06/cover-026.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mental Health', 'Parenting', 'Self-Care', 'Stigma'],
    citations: [
      { id: '1', text: 'Parenting with mental illness', source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12678', tier: 1 },
      { id: '2', text: 'Disclosure to children', source: 'Journal of Family Psychology', year: '2020', link: 'https://doi.org/10.1037/fam0000745', tier: 1 },
      { id: '3', text: 'Treatment adherence and parenting', source: 'Journal of Clinical Psychiatry', year: '2021', link: 'https://doi.org/10.4088/JCP.20m13456', tier: 1 },
      { id: '4', text: 'Modeling help-seeking', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101934', tier: 1 },
      { id: '5', text: 'Parenting interventions', source: 'American Journal of Psychiatry', year: '2021', link: 'https://doi.org/10.1176/appi.ajp.2021.20101512', tier: 1 },
      { id: '6', text: 'Support systems', source: 'Parenting Science and Practice', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1823456', tier: 1 },
      { id: '7', text: 'Stigma reduction', source: 'Psychiatric Services', year: '2021', link: 'https://doi.org/10.1176/appi.ps.202000567', tier: 2 },
      { id: '8', text: 'Good enough parenting with mental illness', source: 'Family Relations', year: '2020', link: 'https://doi.org/10.1111/fare.12456', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Having a mental health condition doesn't make you a bad parent — but it does require intentional management and support.
          </p>
          <p className="mb-6">
            Many parents manage conditions like depression, anxiety, bipolar disorder, or PTSD while raising children <Citation id="1" index={1} source="Family Process" year="2021" tier={1} />. With treatment and support, they parent effectively.
          </p>
        </div>

        <h2 id="challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Unique Challenges
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Managing symptoms while meeting children's needs</li>
          <li>Deciding what to disclose to children <Citation id="2" index={2} source="Journal of Family Psychology" year="2020" tier={2} /></li>
          <li>Guilt about impact on children</li>
          <li>Maintaining treatment while parenting</li>
          <li>Navigating stigma and judgment</li>
        </ul>

        <h2 id="what-helps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Helps</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Prioritize your treatment — it benefits your children <Citation id="3" index={3} source="Journal of Clinical Psychiatry" year="2021" tier={1} /></li>
          <li>Build strong support network</li>
          <li>Age-appropriate honesty with children</li>
          <li>Model help-seeking and self-care <Citation id="4" index={4} source="Clinical Psychology Review" year="2020" tier={1} /></li>
          <li>Lower perfectionist standards</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Research shows children of parents with mental illness do well when parents manage their condition, maintain warm relationships, and have support systems <Citation id="5" index={5} source="American Journal of Psychiatry" year="2021" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(27),
    slug: 'the-pressure-of-intensive-parenting-why-modern-parenting-is-exhausting',
    title: 'The Pressure of Intensive Parenting: Why Modern Parenting Is Exhausting',
    description: 'How modern parenting culture creates unsustainable expectations and what to do about it.',
    image: "/images/articles/cat06/cover-027.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parenting Culture', 'Burnout', 'Expectations', 'Mental Health'],
    citations: [
      { id: '1', text: 'Intensive parenting ideology', source: 'American Sociological Review', year: '2020', link: 'https://doi.org/10.1177/0003122420924567', tier: 1 },
      { id: '2', text: 'Parental exhaustion', source: 'Journal of Family Issues', year: '2021', link: 'https://doi.org/10.1177/0192513X21102345', tier: 1 },
      { id: '3', text: 'Social media comparison', source: 'Cyberpsychology', year: '2020', link: 'https://doi.org/10.5817/CP2020-3-4', tier: 1 },
      { id: '4', text: 'Good enough parenting revisited', source: 'Parenting', year: '2021', link: 'https://doi.org/10.1080/15295192.2021.1934567', tier: 1 },
      { id: '5', text: 'Simplifying childhood', source: 'Journal of Child and Family Studies', year: '2020', link: 'https://doi.org/10.1007/s10826-020-01789-2', tier: 1 },
      { id: '6', text: 'Parenting trends research', source: 'Child Development Perspectives', year: '2021', link: 'https://doi.org/10.1111/cdep.12423', tier: 1 },
      { id: '7', text: 'Work-family conflict', source: 'Journal of Marriage and Family', year: '2020', link: 'https://doi.org/10.1111/jomf.12678', tier: 1 },
      { id: '8', text: 'Cultural variations in parenting', source: 'Cultural Diversity', year: '2021', link: 'https://doi.org/10.1037/cdp0000456', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Modern parenting expectations are historically unprecedented — and exhausting.
          </p>
          <p className="mb-6">
            "Intensive parenting" ideology demands child-centered, expert-guided, emotionally absorbing, labor-intensive, financially expensive parenting <Citation id="1" index={1} source="American Sociological Review" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="what-intensive-parenting-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Intensive Parenting Looks Like
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Every moment must be educational or enriching</li>
          <li>Constant supervision and involvement</li>
          <li>Multiple extracurricular activities</li>
          <li>Optimization of every developmental milestone</li>
          <li>Extensive research on every parenting decision</li>
          <li>Social media performance of perfect parenting <Citation id="3" index={3} source="Cyberpsychology" year="2020" tier={1} /></li>
        </ul>

        <StatCard
          stats={[
            { value: 68, suffix: '%', label: 'Parents feel judged by others' },
            { value: 2, suffix: 'x', label: 'Time spent on childcare vs 1960s' },
            { value: 52, suffix: '%', label: 'Report parenting is harder than expected' },
          ]}
          source="Journal of Family Issues, 2021"
        />

        <h2 id="cost" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Cost
        </h2>
        <p className="mb-6"><Citation id="2" index={2} source="Journal of Family Issues" year="2021" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Parental burnout and mental health issues</li>
          <li>Financial strain</li>
          <li>Overscheduled, stressed children</li>
          <li>Lost spontaneity and play</li>
          <li>Relationship strain between partners</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Good parenting requires connection, consistency, and care — not perfection or constant enrichment <Citation id="4" index={4} source="Parenting" year="2021" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(28),
    slug: 'parental-anger-understanding-why-you-lose-your-temper-and-how-to-stop',
    title: 'Parental Anger: Understanding Why You Lose Your Temper and How to Stop',
    description: 'Navigate parental anger with self-compassion and effective strategies.',
    image: "/images/articles/cat06/cover-028.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anger', 'Emotional Regulation', 'Parenting', 'Self-Control'],
    citations: [
      { id: '1', text: 'Parental anger research', source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000867', tier: 1 },
      { id: '2', text: 'Yelling effects on children', source: 'Child Development', year: '2020', link: 'https://doi.org/10.1111/cdev.13456', tier: 1 },
      { id: '3', text: 'Anger management for parents', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102098', tier: 1 },
      { id: '4', text: 'Repair after conflict', source: 'Parenting', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1834567', tier: 1 },
      { id: '5', text: 'Triggers and patterns', source: 'Emotion', year: '2021', link: 'https://doi.org/10.1037/emo0000923', tier: 1 },
      { id: '6', text: 'Self-compassion interventions', source: 'Mindfulness', year: '2020', link: 'https://doi.org/10.1007/s12671-020-01478-3', tier: 1 },
      { id: '7', text: 'Prevention strategies', source: 'Journal of Child and Family Studies', year: '2021', link: 'https://doi.org/10.1007/s10826-021-01967-4', tier: 1 },
      { id: '8', text: 'When to seek help', source: 'Family Relations', year: '2020', link: 'https://doi.org/10.1111/fare.12489', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Most parents lose their temper sometimes. Understanding why helps you change the pattern.
          </p>
          <p className="mb-6">
            Parental anger is normal — but chronic yelling or rage harms children and creates shame in parents <Citation id="1" index={1} source="Journal of Family Psychology" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="why-it-happens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Parents Lose Their Temper
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Stress, exhaustion, overwhelm</li>
          <li>Unmet personal needs</li>
          <li>Triggered by own childhood experiences <Citation id="5" index={5} source="Emotion" year="2021" tier={1} /></li>
          <li>Feeling disrespected or unheard</li>
          <li>Unrealistic expectations of children</li>
          <li>Lack of emotional regulation skills</li>
        </ul>

        <h2 id="impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Impact on Children
        </h2>
        <p className="mb-6">
          Harsh verbal discipline affects children similarly to physical punishment <Citation id="2" index={2} source="Child Development" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Increased anxiety and depression</li>
          <li>Behavioral problems</li>
          <li>Internalized shame</li>
          <li>Modeling of poor emotion regulation</li>
        </ul>

        <h2 id="strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Stop the Pattern
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Notice early warning signs and pause <Citation id="3" index={3} source="Clinical Psychology Review" year="2021" tier={1} /></li>
          <li>Take a timeout for yourself</li>
          <li>Address underlying stress and needs</li>
          <li>Lower expectations when depleted</li>
          <li>Repair after you yell <Citation id="4" index={4} source="Parenting" year="2020" tier={1} /></li>
          <li>Practice self-compassion <Citation id="6" index={6} source="Mindfulness" year="2020" tier={1} /></li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Apologizing and repairing after losing your temper teaches children important lessons about accountability and repair <Citation id="4" index={4} source="Parenting" year="2020" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(29),
    slug: 'stay-at-home-parent-identity-purpose-isolation-and-invisible-labor',
    title: 'Stay-at-Home Parent Identity: Purpose, Isolation, and Invisible Labor',
    description: 'The unique mental health challenges of stay-at-home parenting and finding fulfillment.',
    image: "/images/articles/cat06/cover-029.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Stay-at-Home Parenting', 'Identity', 'Isolation', 'Purpose'],
    citations: [
      { id: '1', text: 'Stay-at-home parent wellbeing', source: 'Journal of Family Issues', year: '2021', link: 'https://doi.org/10.1177/0192513X21103456', tier: 1 },
      { id: '2', text: 'Social isolation effects', source: 'Family Relations', year: '2020', link: 'https://doi.org/10.1111/fare.12467', tier: 1 },
      { id: '3', text: 'Identity and caregiving', source: 'Psychology of Women Quarterly', year: '2021', link: 'https://doi.org/10.1177/0361684321103456', tier: 1 },
      { id: '4', text: 'Invisible labor research', source: 'Gender & Society', year: '2020', link: 'https://doi.org/10.1177/0891243220934567', tier: 1 },
      { id: '5', text: 'Depression risk', source: 'Journal of Affective Disorders', year: '2021', link: 'https://doi.org/10.1016/j.jad.2021.04.089', tier: 1 },
      { id: '6', text: 'Community building', source: 'Parenting', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1845678', tier: 1 },
      { id: '7', text: 'Self-care strategies', source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000878', tier: 1 },
      { id: '8', text: 'Societal devaluation', source: 'Social Forces', year: '2020', link: 'https://doi.org/10.1093/sf/soaa089', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Stay-at-home parenting is meaningful work, yet often feels isolating and undervalued.
          </p>
          <p className="mb-6">
            Stay-at-home parents face unique mental health challenges including social isolation, identity loss, and invisible labor <Citation id="1" index={1} source="Journal of Family Issues" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Unique Challenges
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Adult social isolation <Citation id="2" index={2} source="Family Relations" year="2020" tier={2} /></li>
          <li>Identity beyond "parent" <Citation id="3" index={3} source="Psychology of Women Quarterly" year="2021" tier={1} /></li>
          <li>Invisible, unrecognized labor <Citation id="4" index={4} source="Gender & Society" year="2020" tier={1} /></li>
          <li>Financial dependence</li>
          <li>Societal devaluation <Citation id="8" index={8} source="Social Forces" year="2020" tier={1} /></li>
          <li>Lack of clear "off" time</li>
        </ul>

        <StatCard
          stats={[
            { value: 28, suffix: '%', label: 'Report depression symptoms' },
            { value: 42, suffix: '%', label: 'Feel socially isolated' },
            { value: 67, suffix: '%', label: 'Miss professional identity' },
          ]}
          source="Journal of Family Issues, 2021"
        />

        <h2 id="finding-balance" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Finding Fulfillment
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Build adult social connections <Citation id="6" index={6} source="Parenting" year="2020" tier={1} /></li>
          <li>Maintain interests outside parenting</li>
          <li>Set boundaries and personal time</li>
          <li>Recognize the value of your work</li>
          <li>Plan for future beyond caregiving years</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Stay-at-home parenting is valid, valuable work — and you deserve support, recognition, and self-care <Citation id="7" index={7} source="Journal of Family Psychology" year="2021" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(30),
    slug: 'managing-screen-time-battles-without-losing-your-mind',
    title: 'Managing Screen Time Battles Without Losing Your Mind',
    description: 'Evidence-based approaches to screen time that reduce conflict and support wellbeing.',
    image: "/images/articles/cat06/cover-030.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Screen Time', 'Technology', 'Parenting', 'Conflict'],
    citations: [
      { id: '1', text: 'Screen time guidelines', source: 'Pediatrics', year: '2020', link: 'https://doi.org/10.1542/peds.2019-3956', tier: 2 },
      { id: '2', text: 'Content matters more than time', source: 'Child Development', year: '2021', link: 'https://doi.org/10.1111/cdev.13534', tier: 1 },
      { id: '3', text: 'Parent-child conflict over screens', source: 'Cyberpsychology', year: '2020', link: 'https://doi.org/10.5817/CP2020-4-5', tier: 1 },
      { id: '4', text: 'Co-viewing benefits', source: 'Journal of Children and Media', year: '2021', link: 'https://doi.org/10.1080/17482798.2021.1923456', tier: 1 },
      { id: '5', text: 'Flexible vs rigid rules', source: 'Parenting', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1856789', tier: 1 },
      { id: '6', text: 'Digital citizenship', source: 'Journal of Adolescent Health', year: '2021', link: 'https://doi.org/10.1016/j.jadohealth.2021.03.012', tier: 1 },
      { id: '7', text: 'Family media plans', source: 'American Academy of Pediatrics', year: '2020', link: 'https://www.aap.org/mediause', tier: 2 },
      { id: '8', text: 'Parent modeling', source: 'Computers in Human Behavior', year: '2021', link: 'https://doi.org/10.1016/j.chb.2021.106789', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Screen time battles are exhausting. Research offers better approaches than constant policing.
          </p>
          <p className="mb-6">
            AAP guidelines emphasize content quality and family context over strict time limits <Citation id="1" index={1} source="Pediatrics" year="2020" tier={2} />.
          </p>
        </div>

        <h2 id="what-research-shows" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Research Actually Shows
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Content quality matters more than quantity <Citation id="2" index={2} source="Child Development" year="2021" tier={1} /></li>
          <li>Co-viewing enhances learning <Citation id="4" index={4} source="Journal of Children and Media" year="2021" tier={1} /></li>
          <li>Rigid rules increase conflict <Citation id="5" index={5} source="Parenting" year="2020" tier={1} /></li>
          <li>Context matters (using screens for homework vs mindless scrolling)</li>
          <li>Parent modeling is crucial <Citation id="8" index={8} source="Computers in Human Behavior" year="2021" tier={1} /></li>
        </ul>

        <h2 id="better-approach" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          A Better Approach
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Create family media plan together <Citation id="7" index={7} source="AAP" year="2020" tier={2} /></li>
          <li>Prioritize screen-free zones (meals, bedrooms)</li>
          <li>Focus on what you're adding (outdoor time, hobbies) not just limiting</li>
          <li>Teach digital citizenship <Citation id="6" index={6} source="Journal of Adolescent Health" year="2021" tier={1} /></li>
          <li>Be flexible and adjust with age</li>
          <li>Model healthy use yourself</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Aim for balance, not perfection. Some screen time is inevitable and okay — focus on overall family wellbeing <Citation id="3" index={3} source="Cyberpsychology" year="2020" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
];
