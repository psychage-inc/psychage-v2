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

export const supportingChildrensMentalHealthArticlesA: Article[] = [
  {
    id: catId(51),
    slug: 'signs-child-struggling-parents-guide-mental-health',
    title: "Signs Your Child May Be Struggling: A Parent's Guide to Recognizing Mental Health Issues",
    description: "Learn to recognize the warning signs of mental health struggles in children and when to seek professional help.",
    image: "/images/articles/cat06/cover-051.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Children', 'Mental Health', 'Warning Signs', 'Early Intervention'],
    citations: [
      { id: '1', text: 'Early identification of child mental health problems', source: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.jaac.2020.02.009', tier: 1 },
      { id: '2', text: 'Developmental variations in mental health symptoms', source: 'Child Development Perspectives', year: '2021', link: 'https://doi.org/10.1111/cdep.12413', tier: 1 },
      { id: '3', text: 'Parent recognition of child distress', source: 'Journal of Child Psychology and Psychiatry', year: '2019', link: 'https://doi.org/10.1111/jcpp.13108', tier: 1 },
      { id: '4', text: 'When to seek professional help for children', source: 'Pediatrics', year: '2020', link: 'https://doi.org/10.1542/peds.2020-1570', tier: 2 },
      { id: '5', text: 'Physical symptoms of emotional distress in children', source: 'Clinical Child and Family Psychology Review', year: '2021', link: 'https://doi.org/10.1007/s10567-020-00338-0', tier: 1 },
      { id: '6', text: 'School performance and mental health', source: 'School Mental Health', year: '2020', link: 'https://doi.org/10.1007/s12310-019-09354-8', tier: 1 },
      { id: '7', text: 'Cultural considerations in child mental health assessment', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2021', link: 'https://doi.org/10.1037/cdp0000419', tier: 1 },
      { id: '8', text: 'Early intervention benefits', source: 'American Psychologist', year: '2019', link: 'https://doi.org/10.1037/amp0000467', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Is your child just going through a phase, or is something more serious happening? Distinguishing typical developmental challenges from mental health concerns is one of the hardest parts of parenting.
          </p>
          <p className="mb-6">
            Early recognition and intervention dramatically improve outcomes for children struggling with mental health issues <Citation id="1" index={1} source="Journal of the American Academy of Child & Adolescent Psychiatry" year="2020" tier={1} />. Knowing what to watch for empowers you to get help when it's needed.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 20, suffix: '%', label: 'Children who experience mental health condition' },
            { value: 50, suffix: '%', label: 'Who receive treatment before adulthood' },
            { value: 75, suffix: '%', label: 'Mental health conditions that emerge by age 24' },
          ]}
          source="Pediatrics, 2020"
        />

        <h2 id="normal-vs-concerning" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Normal Development vs. Concerning Signs
        </h2>
        <p className="mb-6">
          Children naturally experience ups and downs, fears, sadness, and behavioral challenges. What differentiates typical development from mental health concerns <Citation id="2" index={2} source="Child Development Perspectives" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Intensity:</strong> Extreme reactions disproportionate to the situation</li>
          <li><strong>Duration:</strong> Symptoms lasting weeks or months, not days</li>
          <li><strong>Frequency:</strong> Issues happening daily or most days</li>
          <li><strong>Interference:</strong> Affecting school, friendships, family life, activities</li>
          <li><strong>Developmental regression:</strong> Losing previously mastered skills</li>
        </ul>

        <h2 id="warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Warning Signs by Category
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'emotional',
              title: 'Emotional Changes',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Persistent sadness, hopelessness, or irritability</li>
                  <li>Excessive worry or fear that interferes with daily life</li>
                  <li>Extreme mood swings</li>
                  <li>Crying frequently without clear trigger</li>
                  <li>Emotional numbness or lack of joy in previously enjoyed activities</li>
                  <li>Expressions of worthlessness or self-hatred</li>
                </ul>
              ),
            },
            {
              id: 'behavioral',
              title: 'Behavioral Changes',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Social withdrawal — avoiding friends, family activities</li>
                  <li>Aggressive outbursts or violent behavior</li>
                  <li>Self-harm (cutting, hitting self, risky behaviors)</li>
                  <li>Dramatic personality changes</li>
                  <li>Oppositional behavior significantly beyond age-appropriate testing</li>
                  <li>Regressive behaviors (thumb-sucking, baby talk in older children)</li>
                </ul>
              ),
            },
            {
              id: 'physical',
              title: 'Physical Symptoms',
              content: (
                <div>
                  <p className="mb-4">
                    Emotional distress often manifests physically in children <Citation id="5" index={5} source="Clinical Child and Family Psychology Review" year="2021" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Frequent stomachaches or headaches without medical cause</li>
                    <li>Sleep problems (insomnia, nightmares, sleeping too much)</li>
                    <li>Significant appetite changes or weight fluctuations</li>
                    <li>Fatigue or low energy</li>
                    <li>Physical tension (clenched jaw, tight shoulders)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'school',
              title: 'School and Academic Changes',
              content: (
                <div>
                  <p className="mb-4">
                    School performance often reflects mental health <Citation id="6" index={6} source="School Mental Health" year="2020" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Sudden drop in grades</li>
                    <li>Difficulty concentrating or completing work</li>
                    <li>School refusal or frequent absences</li>
                    <li>Complaints from teachers about behavior or attention</li>
                    <li>Loss of interest in learning or activities</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'social',
              title: 'Social Difficulties',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sudden loss of friendships or social isolation</li>
                  <li>Inability to make or keep friends</li>
                  <li>Extreme fear of social situations</li>
                  <li>Being bullied or bullying others</li>
                  <li>Inappropriate social behavior (aggression, oversharing)</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="age-specific" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Age-Specific Considerations
        </h2>

        <ComparisonTable
          title="How Mental Health Issues Present by Age"
          columns={['Age Group', 'Common Presentations', 'Watch For']}
          items={[
            {
              feature: 'Preschool (3-5)',
              values: ['Clinginess, tantrums, fears', 'Extreme separation anxiety, regression, aggression'],
            },
            {
              feature: 'School Age (6-12)',
              values: ['Worry, school problems, social issues', 'Somatic complaints, perfectionism, social withdrawal'],
            },
            {
              feature: 'Adolescent (13-18)',
              values: ['Mood swings, risk-taking, identity exploration', 'Self-harm, substance use, eating changes, isolation'],
            },
          ]}
        />

        <h2 id="crisis-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Crisis Signs — Seek Help Immediately
        </h2>
        <p className="mb-6">
          Some symptoms require immediate professional intervention <Citation id="4" index={4} source="Pediatrics" year="2020" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Suicidal thoughts or statements:</strong> "I wish I was dead,", "Everyone would be better off without me"</li>
          <li><strong>Self-harm:</strong> Cutting, burning, hitting self</li>
          <li><strong>Threats or plans to harm others</strong></li>
          <li><strong>Psychotic symptoms:</strong> Hallucinations, delusions, disorganized thinking</li>
          <li><strong>Severe eating disorder behaviors:</strong> Rapid weight loss, refusal to eat, purging</li>
          <li><strong>Substance abuse</strong></li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            If your child expresses suicidal thoughts, call 988 (Suicide & Crisis Lifeline) immediately. Do not leave them alone. Remove access to means (medications, weapons). Go to emergency room if needed.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Consider professional evaluation when <Citation id="8" index={8} source="American Psychologist" year="2019" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Symptoms Persist',
              description: <p>Lasting more than 2-4 weeks without improvement.</p>,
            },
            {
              title: 'Functioning Is Impaired',
              description: <p>Child cannot complete normal activities (school, friendships, family participation).</p>,
            },
            {
              title: "You\'ve Tried Support",
              description: <p>Extra attention, routine changes, and emotional support haven't helped.</p>,
            },
            {
              title: "Gut Feeling Says Something\'s Wrong",
              description: <p>Parents often sense when something is off. Trust your instincts <Citation id="3" index={3} source="Journal of Child Psychology and Psychiatry" year="2019" tier={1} />.</p>,
            },
          ]}
        />

        <h2 id="cultural-considerations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural Considerations
        </h2>
        <p className="mb-6">
          Mental health expression and help-seeking vary across cultures <Citation id="7" index={7} source="Cultural Diversity and Ethnic Minority Psychology" year="2021" tier={1} />. Some cultures emphasize physical symptoms over emotional ones, view mental health issues through spiritual lenses, or face stigma around seeking help. Culturally responsive providers understand these contexts.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Early intervention matters. If you're unsure whether your child needs help, err on the side of consultation. A professional can assess whether symptoms warrant treatment or reassure you that your child is within normal range.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(52),
    slug: 'talk-child-mental-health-age-appropriate-conversations',
    title: 'How to Talk to Your Child About Mental Health: Age-Appropriate Conversations',
    description: 'Learn how to have honest, age-appropriate conversations about mental health that normalize emotions and encourage help-seeking.',
    image: "/images/articles/cat06/cover-052.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mental Health', 'Communication', 'Parenting', 'Children'],
    citations: [
      { id: '1', text: 'Parent-child communication about emotions', source: 'Journal of Family Psychology', year: '2020', link: 'https://doi.org/10.1037/fam0000672', tier: 1 },
      { id: '2', text: 'Mental health literacy in children', source: 'School Mental Health', year: '2021', link: 'https://doi.org/10.1007/s12310-020-09402-4', tier: 1 },
      { id: '3', text: 'Age-appropriate mental health education', source: 'Child Development Perspectives', year: '2020', link: 'https://doi.org/10.1111/cdep.12391', tier: 1 },
      { id: '4', text: 'Reducing mental health stigma in families', source: 'Clinical Child and Family Psychology Review', year: '2021', link: 'https://doi.org/10.1007/s10567-020-00342-4', tier: 1 },
      { id: '5', text: 'Emotion coaching for parents', source: 'Parenting: Science and Practice', year: '2019', link: 'https://doi.org/10.1080/15295192.2019.1642087', tier: 1 },
      { id: '6', text: 'Talking to teens about mental health', source: 'Journal of Adolescent Health', year: '2020', link: 'https://doi.org/10.1016/j.jadohealth.2020.02.005', tier: 1 },
      { id: '7', text: 'Normalizing help-seeking in children', source: 'American Journal of Orthopsychiatry', year: '2021', link: 'https://doi.org/10.1037/ort0000527', tier: 1 },
      { id: '8', text: 'Cultural approaches to mental health conversations', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2020', link: 'https://doi.org/10.1037/cdp0000391', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Why am I feeling like this?", "Is something wrong with me?" Children have questions about their emotions and mental health, but many parents struggle to answer them. The good news: talking about mental health doesn't have to be complicated.
          </p>
          <p className="mb-6">
            Open, age-appropriate conversations about mental health normalize emotions, reduce stigma, and teach children that help-seeking is a strength <Citation id="1" index={1} source="Journal of Family Psychology" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="why-talk-about-it" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why These Conversations Matter
        </h2>
        <p className="mb-6">
          Children who learn about mental health from parents <Citation id="2" index={2} source="School Mental Health" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Develop emotional literacy — can name and understand feelings</li>
          <li>See mental health as normal, not shameful</li>
          <li>Know that struggling is okay and help is available</li>
          <li>Are more likely to seek support when needed</li>
          <li>Feel less alone when they experience difficult emotions</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>
            Children as young as 3 can learn basic emotional vocabulary. Early emotional education predicts better mental health outcomes <Citation id="3" index={3} source="Child Development Perspectives" year="2020" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="preschool-conversations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Preschool Age (3-5 years)
        </h2>
        <p className="mb-6">
          Focus on building emotional vocabulary and validating feelings <Citation id="5" index={5} source="Parenting: Science and Practice" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'preschool-what',
              title: 'What to Teach',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Names for basic emotions (happy, sad, mad, scared, frustrated)</li>
                  <li>All feelings are okay — it's what we do with them that matters</li>
                  <li>Everyone has big feelings sometimes</li>
                  <li>Grown-ups can help when feelings feel too big</li>
                </ul>
              ),
            },
            {
              id: 'preschool-how',
              title: 'How to Say It',
              content: (
                <div className="space-y-2">
                  <p className="italic">"You look sad. Do you want to talk about it?"</p>
                  <p className="italic">"Everyone feels angry sometimes. Let's take some deep breaths together."</p>
                  <p className="italic">"When I feel worried, I talk to someone. Would you like to talk?"</p>
                  <p className="mt-2">Use picture books, emotion charts, and play to explore feelings.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="school-age-conversations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          School Age (6-12 years)
        </h2>
        <p className="mb-6">
          Introduce the concept of mental health alongside physical health:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'school-what',
              title: 'What to Teach',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mental health is about how we think and feel</li>
                  <li>Just like bodies get sick, minds can struggle too</li>
                  <li>Anxiety, depression, and other mental health issues are medical, not moral failures</li>
                  <li>Therapy is like going to the doctor for your mind</li>
                  <li>Many people struggle — they're not alone</li>
                </ul>
              ),
            },
            {
              id: 'school-how',
              title: 'How to Say It',
              content: (
                <div className="space-y-2">
                  <p className="italic">"Mental health is about our feelings and thoughts, just like physical health is about our bodies."</p>
                  <p className="italic">"Sometimes people's brains have a hard time with worry or sadness, and they need help from a therapist — kind of like how we see a doctor when we're sick."</p>
                  <p className="italic">"I notice you've been really worried lately. Let's talk about it. Would it help to talk to someone who's an expert in helping kids with worry?"</p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip">
          <p>
            Use concrete comparisons: "Just like some people need glasses to see better, some people need therapy to feel better."
          </p>
        </ArticleCallout>

        <h2 id="teen-conversations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Adolescents (13-18 years)
        </h2>
        <p className="mb-6">
          Teens need honest, non-patronizing conversations <Citation id="6" index={6} source="Journal of Adolescent Health" year="2020" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'teen-what',
              title: 'What to Teach',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mental health conditions are common (1 in 5 people)</li>
                  <li>The brain is still developing through age 25 — teen years are vulnerable</li>
                  <li>Getting help is smart and brave, not weak</li>
                  <li>Medication can be helpful and isn't "giving up"</li>
                  <li>You can talk to them about anything without judgment</li>
                </ul>
              ),
            },
            {
              id: 'teen-how',
              title: 'How to Say It',
              content: (
                <div className="space-y-2">
                  <p className="italic">"I've noticed you seem down lately. I'm here if you want to talk, no judgment."</p>
                  <p className="italic">"Mental health struggles are really common in teenagers. You're not alone, and there's no shame in getting help."</p>
                  <p className="italic">"If you're having thoughts about hurting yourself, please tell me. I won't be mad — I just want you to be safe."</p>
                  <p className="mt-2">Respect their privacy while staying involved. Offer options: "We could find a therapist together, or I could help you find resources to look on your own."</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="general-principles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          General Principles for All Ages
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Model Emotional Openness',
              description: <p>Share your own feelings appropriately: "I'm feeling stressed about work, so I'm going to take a walk to clear my head." Children learn by watching.</p>,
            },
            {
              title: 'Validate Before Problem-Solving',
              description: <p>'That sounds really hard' before "Here's what you should do." Children need to feel heard first.</p>,
            },
            {
              title: "Normalize, Don\'t Minimize",
              description: <p>'A lot of people feel this way' not "Everyone feels sad sometimes, you'll be fine."</p>,
            },
            {
              title: 'Use Everyday Moments',
              description: <p>Don't wait for a crisis. Talk about emotions during calm times — in the car, at dinner, before bed.</p>,
            },
            {
              title: 'Reduce Stigma',
              description: <p>Avoid language like 'crazy,", "psycho,", "weak." Use: "struggling,", "having a hard time,", "needs support" <Citation id="4" index={4} source="Clinical Child and Family Psychology Review" year="2021" tier={1} />.</p>,
            },
          ]}
        />

        <h2 id="when-your-child-opens-up" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Your Child Opens Up to You
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Listen without judgment:</strong> Don't immediately try to fix it or tell them why they shouldn't feel that way</li>
          <li><strong>Thank them for sharing:</strong> "I'm so glad you told me"</li>
          <li><strong>Ask what they need:</strong> "Do you want advice, or do you just need someone to listen?"</li>
          <li><strong>Follow up later:</strong> "I've been thinking about our conversation. How are you feeling today?"</li>
          <li><strong>Take it seriously:</strong> Even if their problem seems small to you, it's real to them</li>
        </ul>

        <h2 id="cultural-context" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural Context Matters
        </h2>
        <p className="mb-6">
          Mental health stigma varies across cultures <Citation id="8" index={8} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />. If your cultural background views mental health issues through spiritual, family honor, or shame lenses, you can honor that while also normalizing help-seeking for your children.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Talking about mental health with children isn't a one-time conversation — it's an ongoing dialogue. Start early, be open, normalize struggles, and emphasize that help is available and getting it is brave <Citation id="7" index={7} source="American Journal of Orthopsychiatry" year="2021" tier={1} />.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(53),
    slug: 'childhood-anxiety-what-it-looks-like-how-parents-help',
    title: 'Childhood Anxiety: What It Looks Like and How Parents Can Help',
    description: 'Understand how anxiety presents in children, differentiate normal worry from clinical anxiety, and learn evidence-based parenting strategies.',
    image: "/images/articles/cat06/cover-053.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Childhood Anxiety', 'Parenting', 'Mental Health', 'Evidence-Based Strategies'],
    citations: [
      { id: '1', text: 'Prevalence of childhood anxiety disorders', source: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.jaac.2020.05.014', tier: 1 },
      { id: '2', text: 'Parental accommodation of child anxiety', source: 'Clinical Child and Family Psychology Review', year: '2021', link: 'https://doi.org/10.1007/s10567-020-00335-3', tier: 1 },
      { id: '3', text: 'Exposure therapy for childhood anxiety', source: 'Behaviour Research and Therapy', year: '2020', link: 'https://doi.org/10.1016/j.brat.2020.103698', tier: 1 },
      { id: '4', text: 'Cognitive-behavioral strategies for parents', source: 'Journal of Child Psychology and Psychiatry', year: '2021', link: 'https://doi.org/10.1111/jcpp.13442', tier: 1 },
      { id: '5', text: 'Physical symptoms of anxiety in children', source: 'Pediatrics', year: '2019', link: 'https://doi.org/10.1542/peds.2019-0851', tier: 2 },
      { id: '6', text: 'School refusal and separation anxiety', source: 'School Mental Health', year: '2020', link: 'https://doi.org/10.1007/s12310-019-09365-5', tier: 1 },
      { id: '7', text: 'Parental anxiety and child anxiety transmission', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101814', tier: 1 },
      { id: '8', text: 'When to seek professional help for child anxiety', source: 'American Psychologist', year: '2021', link: 'https://doi.org/10.1037/amp0000798', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            All children worry sometimes. But when worry becomes constant, interferes with daily life, or causes physical distress, it may be anxiety — one of the most common mental health issues in childhood.
          </p>
          <p className="mb-6">
            Childhood anxiety disorders affect about 7-10% of children <Citation id="1" index={1} source="Journal of the American Academy of Child & Adolescent Psychiatry" year="2020" tier={1} />. Understanding what anxiety looks like and how to respond helps children develop coping skills and prevents anxiety from worsening.
          </p>
        </div>

        <h2 id="what-it-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Childhood Anxiety Looks Like
        </h2>
        <p className="mb-6">
          Anxiety in children often looks different than adult anxiety:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'physical',
              title: 'Physical Symptoms',
              content: (
                <div>
                  <p className="mb-4">
                    Children may not be able to articulate "I feel anxious," but their bodies show it <Citation id="5" index={5} source="Pediatrics" year="2019" tier={2} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Frequent stomachaches or headaches</li>
                    <li>Nausea, especially before school or events</li>
                    <li>Sleep problems (trouble falling asleep, nightmares)</li>
                    <li>Restlessness, muscle tension</li>
                    <li>Rapid heartbeat, shortness of breath</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'behavioral',
              title: 'Behavioral Signs',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Avoidance (refusing school, activities, new situations)</li>
                  <li>Clinginess, difficulty separating from parents</li>
                  <li>Excessive reassurance-seeking ("Are you sure?" repeated)</li>
                  <li>Tantrums or meltdowns when anxious</li>
                  <li>Perfectionism, refusal to try things they might fail at</li>
                  <li>Rituals or compulsive behaviors to manage anxiety</li>
                </ul>
              ),
            },
            {
              id: 'emotional',
              title: 'Emotional Patterns',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Excessive worry about many things (health, safety, performance, future)</li>
                  <li>Difficulty controlling worry</li>
                  <li>Irritability or moodiness</li>
                  <li>Tearfulness or emotional overwhelm</li>
                  <li>Fear disproportionate to actual danger</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="types" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Types of Childhood Anxiety
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Separation anxiety:</strong> Excessive distress when apart from caregivers, beyond age-appropriate levels</li>
          <li><strong>Social anxiety:</strong> Intense fear of social situations, judgment, or embarrassment</li>
          <li><strong>Generalized anxiety (GAD):</strong> Excessive worry about multiple domains (school, health, safety, world events)</li>
          <li><strong>Specific phobias:</strong> Intense fear of specific things (dogs, thunderstorms, needles, vomiting)</li>
          <li><strong>Panic disorder:</strong> Unexpected panic attacks with physical symptoms</li>
        </ul>

        <StatCard
          stats={[
            { value: 10, suffix: '%', label: 'Children with diagnosable anxiety disorder' },
            { value: 70, suffix: '%', label: 'Anxious children who respond to treatment' },
            { value: 50, suffix: '%', label: 'Adult anxiety disorders that started in childhood' },
          ]}
          source="JAACAP, 2020"
        />

        <h2 id="what-not-to-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What NOT to Do (Common Mistakes)
        </h2>
        <p className="mb-6">
          Well-meaning parents often accidentally reinforce anxiety <Citation id="2" index={2} source="Clinical Child and Family Psychology Review" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Accommodation:</strong> Allowing avoidance, changing family life around anxiety. This teaches children anxiety is dangerous and must be avoided.</li>
          <li><strong>Excessive reassurance:</strong> "You'll be fine' 50 times reinforces that there's something to worry about.</li>
          <li><strong>Dismissing feelings:</strong> "There's nothing to be scared of' invalidates their real experience.</li>
          <li><strong>Modeling anxiety:</strong> Children pick up on parental worry. If you're anxious, they learn the world is dangerous <Citation id="7" index={7} source="Clinical Psychology Review" year="2020" tier={1} />.</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            Accommodation — changing family routines to avoid triggering anxiety — provides short-term relief but long-term worsening. Children need to learn anxiety is uncomfortable but not dangerous.
          </p>
        </ArticleCallout>

        <h2 id="how-to-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Parents Can Help
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Validate Feelings, Not Fears',
              description: <p>"I can see you're worried' not "There's nothing to worry about." Acknowledge the emotion without confirming the danger.</p>,
            },
            {
              title: 'Encourage Brave Behavior',
              description: <p>Gently push through avoidance with support. "I know this is scary, AND I know you can do it. I'll be right here" <Citation id="3" index={3} source="Behaviour Research and Therapy" year="2020" tier={1} />.</p>,
            },
            {
              title: 'Gradual Exposure',
              description: <p>Create a 'fear ladder' — small steps toward the feared situation. Celebrate each step, don't rush to the top.</p>,
            },
            {
              title: 'Teach Coping Skills',
              description: <p>Deep breathing, progressive muscle relaxation, positive self-talk. Practice when calm, use when anxious <Citation id="4" index={4} source="Journal of Child Psychology and Psychiatry" year="2021" tier={1} />.</p>,
            },
            {
              title: 'Limit Reassurance',
              description: <p>Answer worry questions once, then: "We already talked about this. Let's use your coping skills."</p>,
            },
            {
              title: 'Model Calm Confidence',
              description: <p>Your calm presence communicates: 'This situation is safe. You can handle this."</p>,
            },
          ]}
        />

        <h2 id="when-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Consider therapy when <Citation id="8" index={8} source="American Psychologist" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Anxiety interferes with school, friendships, or family life</li>
          <li>School refusal lasting more than a few days <Citation id="6" index={6} source="School Mental Health" year="2020" tier={1} /></li>
          <li>Physical symptoms (stomachaches, headaches) without medical cause</li>
          <li>Your parenting strategies aren't helping</li>
          <li>Anxiety is worsening or spreading to new areas</li>
          <li>Child expresses suicidal thoughts or self-harm</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            Cognitive-Behavioral Therapy (CBT) is the gold-standard treatment for childhood anxiety. Most children see significant improvement within 12-16 sessions.
          </p>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway">
          <p>
            The goal isn't to eliminate anxiety — it's to teach children that anxiety is uncomfortable but manageable. With support, most anxious children learn to face fears and develop lifelong coping skills.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(54),
    slug: 'child-wont-go-school-understanding-school-avoidance',
    title: "When Your Child Won't Go to School: Understanding School Avoidance",
    description: "Learn what causes school refusal, how to differentiate types of school avoidance, and evidence-based strategies to help your child return to school.",
    image: "/images/articles/cat06/cover-054.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['School Refusal', 'Anxiety', 'Children', 'Parenting Strategies'],
    citations: [
      { id: '1', text: 'School refusal: Definition and prevalence', source: 'Child and Adolescent Mental Health', year: '2020', link: 'https://doi.org/10.1111/camh.12363', tier: 1 },
      { id: '2', text: 'Anxiety-driven school avoidance', source: 'School Mental Health', year: '2021', link: 'https://doi.org/10.1007/s12310-020-09408-y', tier: 1 },
      { id: '3', text: 'Cognitive-behavioral intervention for school refusal', source: 'Journal of Clinical Child & Adolescent Psychology', year: '2019', link: 'https://doi.org/10.1080/15374416.2018.1555761', tier: 1 },
      { id: '4', text: 'Truancy vs. school refusal', source: 'Psychology in the Schools', year: '2020', link: 'https://doi.org/10.1002/pits.22398', tier: 1 },
      { id: '5', text: 'School-based interventions for attendance', source: 'Educational Psychology Review', year: '2021', link: 'https://doi.org/10.1007/s10648-020-09573-3', tier: 1 },
      { id: '6', text: 'Bullying and school avoidance', source: 'Journal of School Violence', year: '2020', link: 'https://doi.org/10.1080/15388220.2019.1707682', tier: 1 },
      { id: '7', text: 'Family factors in school refusal', source: 'Family Process', year: '2019', link: 'https://doi.org/10.1111/famp.12456', tier: 1 },
      { id: '8', text: 'Medication and therapy for school refusal', source: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: '2021', link: 'https://doi.org/10.1016/j.jaac.2020.11.020', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "I can't go to school. My stomach hurts.", "Please don't make me go." School refusal is terrifying for parents — you know education matters, but your child is genuinely distressed. What do you do?
          </p>
          <p className="mb-6">
            School refusal affects 2-5% of children and can stem from anxiety, bullying, learning difficulties, or family issues <Citation id="1" index={1} source="Child and Adolescent Mental Health" year="2020" tier={1} />. Understanding the cause is key to effective intervention.
          </p>
        </div>

        <h2 id="what-is-school-refusal" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          School Refusal vs. Truancy
        </h2>
        <p className="mb-6">
          These are different issues requiring different approaches <Citation id="4" index={4} source="Psychology in the Schools" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          title="School Refusal vs. Truancy"
          columns={['Aspect', 'School Refusal', 'Truancy']}
          items={[
            { feature: 'Emotional state', values: ['Anxious, distressed, fearful', 'Unconcerned, may hide absence'] },
            { feature: 'Parent awareness', values: ['Parents know child is home', 'Parents may not know'] },
            { feature: 'Underlying cause', values: ['Anxiety, fear, health issues', 'Conduct problems, disengagement'] },
            { feature: 'Physical symptoms', values: ['Real somatic complaints', 'Rare'] },
            { feature: 'Treatment approach', values: ['Anxiety intervention, gradual return', 'Behavioral intervention, consequences'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="causes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Causes of School Refusal
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'anxiety',
              title: 'Anxiety-Based Refusal',
              content: (
                <div>
                  <p className="mb-4">
                    Most common cause <Citation id="2" index={2} source="School Mental Health" year="2021" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Separation anxiety:</strong> Fear of leaving parent, worries something will happen to parent</li>
                    <li><strong>Social anxiety:</strong> Fear of peer judgment, public speaking, eating in front of others</li>
                    <li><strong>Generalized anxiety:</strong> Worry about tests, performance, pleasing teachers</li>
                    <li><strong>Panic disorder:</strong> Fear of having panic attack at school with no escape</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'bullying',
              title: 'Bullying or Peer Problems',
              content: (
                <div>
                  <p className="mb-4">
                    Genuine safety concern <Citation id="6" index={6} source="Journal of School Violence" year="2020" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Physical bullying, cyberbullying, relational aggression</li>
                    <li>Social exclusion or isolation</li>
                    <li>If bullying is the cause, returning child without addressing safety is harmful</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'academic',
              title: 'Academic Struggles',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Undiagnosed learning disabilities</li>
                  <li>Falling behind and feeling overwhelmed</li>
                  <li>Perfectionism and fear of failure</li>
                </ul>
              ),
            },
            {
              id: 'family',
              title: 'Family Factors',
              content: (
                <div>
                  <p className="mb-4">
                    Sometimes rooted in home dynamics <Citation id="7" index={7} source="Family Process" year="2019" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Parent's own anxiety about separation</li>
                    <li>Family stress (divorce, illness, financial problems)</li>
                    <li>Child feeling needed at home</li>
                    <li>Parent inadvertently reinforcing avoidance</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="red-flags" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Warning Signs</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Frequent Monday absences or post-weekend reluctance</li>
          <li>Physical complaints (stomach, headache) that disappear on weekends</li>
          <li>Crying, tantrums, or pleading before school</li>
          <li>Deteriorating attendance pattern</li>
          <li>Avoiding school-related conversations</li>
          <li>Difficulty sleeping night before school</li>
        </ul>

        <h2 id="what-to-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What to Do: Immediate Steps
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Get Medical Evaluation',
              description: <p>Rule out physical causes of symptoms. But don't allow endless doctor visits to delay return — this reinforces avoidance.</p>,
            },
            {
              title: 'Investigate the Cause',
              description: <p>Talk to child (calmly, not interrogating), talk to teachers, check for bullying. Understanding the cause informs the approach.</p>,
            },
            {
              title: 'Return to School ASAP',
              description: <p>The longer a child stays home, the harder return becomes. Even partial attendance is better than none <Citation id="3" index={3} source="Journal of Clinical Child & Adolescent Psychology" year="2019" tier={1} />.</p>,
            },
            {
              title: 'Create Gradual Return Plan',
              description: <p>If anxiety is severe, work with school on gradual re-entry: half days, start with favorite class, safe person to check in with.</p>,
            },
            {
              title: 'Address Underlying Issue',
              description: <p>If bullying: involve school administration. If anxiety: therapy. If academic: tutoring/IEP.</p>,
            },
            {
              title: 'Work with School',
              description: <p>Collaborate on accommodations without enabling avoidance. School counselor, nurse as safe person; option to take breaks <Citation id="5" index={5} source="Educational Psychology Review" year="2021" tier={1} />.</p>,
            },
          ]}
        />

        <h2 id="what-not-to-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What NOT to Do
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Allow indefinite absence — this worsens anxiety and creates academic gaps</li>
          <li>Make home more appealing than school (TV, video games, attention)</li>
          <li>Punish or shame — this increases distress without solving the problem</li>
          <li>Give up and switch to homeschooling without addressing underlying issue</li>
          <li>Argue endlessly each morning — this delays departure and reinforces pattern</li>
        </ul>

        <ArticleCallout variant="tip" title="Morning Routine Strategy">
          <p>
            Keep mornings calm and brief. Empathize ("I know this is hard") + expect school ("And we're going"). No lengthy negotiations. Get them to school, let school handle distress from there.
          </p>
        </ArticleCallout>

        <h2 id="professional-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Professional Treatment
        </h2>
        <p className="mb-6">
          Most school refusal cases benefit from professional help <Citation id="8" index={8} source="Journal of the American Academy of Child & Adolescent Psychiatry" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>CBT:</strong> Teaches coping skills, gradual exposure, cognitive restructuring</li>
          <li><strong>Family therapy:</strong> Addresses family dynamics maintaining avoidance</li>
          <li><strong>Medication:</strong> SSRIs may help if severe anxiety prevents exposure work</li>
          <li><strong>School-based support:</strong> 504 plan or IEP with accommodations</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            School refusal is treatable. Early intervention, return to school as soon as possible, addressing underlying causes, and therapy create best outcomes. The longer avoidance continues, the harder it becomes — act quickly.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(55),
    slug: 'helping-children-manage-big-emotions-emotion-coaching',
    title: 'Helping Children Manage Big Emotions: Emotion Coaching for Parents',
    description: 'Learn the emotion coaching approach that helps children develop emotional regulation, resilience, and strong parent-child bonds.',
    image: "/images/articles/cat06/cover-055.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Emotion Coaching', 'Emotional Regulation', 'Parenting', 'Child Development'],
    citations: [
      { id: '1', text: 'Emotion coaching and child outcomes', source: 'Parenting: Science and Practice', year: '2020', link: 'https://doi.org/10.1080/15295192.2019.1694836', tier: 1 },
      { id: '2', text: 'Gottman emotion coaching framework', source: 'Journal of Family Psychology', year: '2019', link: 'https://doi.org/10.1037/fam0000505', tier: 1 },
      { id: '3', text: 'Emotional intelligence development', source: 'Child Development', year: '2021', link: 'https://doi.org/10.1111/cdev.13546', tier: 1 },
      { id: '4', text: 'Emotion dismissing parenting effects', source: 'Clinical Child and Family Psychology Review', year: '2020', link: 'https://doi.org/10.1007/s10567-020-00324-6', tier: 1 },
      { id: '5', text: 'Teaching emotional regulation skills', source: 'Development and Psychopathology', year: '2021', link: 'https://doi.org/10.1017/S0954579420000870', tier: 1 },
      { id: '6', text: 'Cultural variations in emotion socialization', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2020', link: 'https://doi.org/10.1037/cdp0000383', tier: 1 },
      { id: '7', text: 'Emotion coaching in practice', source: 'Journal of Applied Developmental Psychology', year: '2019', link: 'https://doi.org/10.1016/j.appdev.2019.101074', tier: 1 },
      { id: '8', text: 'Long-term benefits of emotion coaching', source: 'American Psychologist', year: '2020', link: 'https://doi.org/10.1037/amp0000651', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your child is having a meltdown over a broken crayon. You're exhausted. Your instinct might be "It's just a crayon, stop crying." But what if this moment is an opportunity to teach your child lifelong emotional skills?
          </p>
          <p className="mb-6">
            Emotion coaching — a parenting approach developed by Dr. John Gottman — helps children develop emotional regulation, resilience, and social competence <Citation id="1" index={1} source="Parenting: Science and Practice" year="2020" tier={1} />. It's about treating emotions as teaching moments, not problems to fix.
          </p>
        </div>

        <h2 id="what-is-emotion-coaching" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Emotion Coaching?
        </h2>
        <p className="mb-6">
          Emotion coaching has five steps <Citation id="2" index={2} source="Journal of Family Psychology" year="2019" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Notice the Emotion',
              description: <p>Be aware when your child is experiencing feelings, even low-intensity ones. Don't wait for meltdowns.</p>,
            },
            {
              title: 'See It as an Opportunity',
              description: <p>View emotional moments as chances to connect and teach, not inconveniences to shut down.</p>,
            },
            {
              title: 'Listen and Validate',
              description: <p>Give full attention. Reflect what you hear: "You're really frustrated that your tower fell down." Don't judge or minimize.</p>,
            },
            {
              title: 'Help Label the Emotion',
              description: <p>Put feelings into words: "It sounds like you're feeling disappointed." This builds emotional literacy <Citation id="3" index={3} source="Child Development" year="2021" tier={1} />.</p>,
            },
            {
              title: 'Set Limits and Problem-Solve',
              description: <p>All feelings are okay; not all behaviors are. "It's okay to be angry. It's not okay to hit. What else could you do when you feel this way?"</p>,
            },
          ]}
        />

        <h2 id="contrasting-approaches" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Emotion Coaching vs. Emotion Dismissing
        </h2>

        <ComparisonTable
          title="Parenting Responses to Children's Emotions"
          columns={['Situation', 'Emotion Dismissing', 'Emotion Coaching']}
          items={[
            {
              feature: 'Child cries over broken toy',
              values: ["Stop crying, it's just a toy", "You're really sad. That toy was special to you."],
            },
            {
              feature: 'Child afraid of dark',
              values: ["There's nothing to be scared of", "The dark can feel scary. Let's figure out what might help you feel safer."],
            },
            {
              feature: 'Child angry about rule',
              values: ["Don't use that tone with me!", "You're angry. I get it. And the rule still stands. What can we do to make this easier?"],
            },
          ]}
          highlightColumn={2}
        />

        <h2 id="why-it-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Emotion Coaching Works
        </h2>
        <p className="mb-6">
          Research shows children who receive emotion coaching <Citation id="8" index={8} source="American Psychologist" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Develop better emotional regulation skills</li>
          <li>Have higher emotional intelligence</li>
          <li>Show fewer behavioral problems</li>
          <li>Perform better academically</li>
          <li>Have stronger peer relationships</li>
          <li>Experience less anxiety and depression</li>
          <li>Develop secure attachment to parents</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>
            Emotion dismissing — minimizing, ignoring, or punishing emotions — teaches children their feelings are bad or wrong. This impairs emotional development and self-regulation <Citation id="4" index={4} source="Clinical Child and Family Psychology Review" year="2020" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="practical-examples" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Emotion Coaching in Action
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'tantrum',
              title: 'Scenario: Toddler Tantrum Over Wrong Cup',
              content: (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Emotion Dismissing:</p>
                    <p className="italic">"It's the same cup! Stop being ridiculous. If you don't stop crying, no dessert."</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Emotion Coaching:</p>
                    <p className="italic">"You're very upset. You wanted the blue cup and you got the red one. That's disappointing." [Pause, let them feel it.] "I understand. And we're using this cup today. Would you like help pouring, or do you want to do it yourself?"</p>
                  </div>
                </div>
              ),
            },
            {
              id: 'homework',
              title: 'Scenario: School-Age Child Frustrated with Homework',
              content: (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Emotion Dismissing:</p>
                    <p className="italic">"Just try harder. Other kids can do it."</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Emotion Coaching:</p>
                    <p className="italic">"You seem frustrated. This math is tricky." [Validate] "What part is hardest?" [Listen] "Okay, feeling stuck is no fun. Let's take a short break, then tackle it together."</p>
                  </div>
                </div>
              ),
            },
            {
              id: 'teen',
              title: 'Scenario: Teen Angry About Phone Limit',
              content: (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Emotion Dismissing:</p>
                    <p className="italic">"My house, my rules. End of discussion."</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Emotion Coaching:</p>
                    <p className="italic">"You're really angry right now. You feel like I'm being unfair." [Validate] "I hear you. And I'm still holding this boundary because I care about your sleep and schoolwork. What would make this easier?"</p>
                  </div>
                </div>
              ),
            },
          ]}
        />

        <h2 id="common-challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Challenges and Solutions
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: "I don't have time for this",
              description: <p>Emotion coaching often takes LESS time than power struggles. A 2-minute validation prevents a 30-minute meltdown <Citation id="7" index={7} source="Journal of Applied Developmental Psychology" year="2019" tier={1} />.</p>,
            },
            {
              title: "Won't this spoil them?",
              description: <p>Validation ≠ permissiveness. You can acknowledge feelings while holding firm boundaries. "I see you're disappointed AND you can't have candy before dinner."</p>,
            },
            {
              title: "What if I'm triggered by their emotions?",
              description: <p>Work on your own emotional regulation. When you're calm, you can coach. When you're reactive, take a parent time-out first.</p>,
            },
            {
              title: "My child won't talk about feelings",
              description: <p>Start by naming YOUR feelings. "I'm feeling frustrated right now." Model emotional awareness. Some kids need more time and space.</p>,
            },
          ]}
        />

        <h2 id="teaching-regulation-skills" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Teaching Self-Regulation Skills
        </h2>
        <p className="mb-6">
          Beyond validation, teach specific skills <Citation id="5" index={5} source="Development and Psychopathology" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Breathing exercises:</strong> "Smell the flower, blow out the candle"</li>
          <li><strong>Calming strategies:</strong> Squeezing ice, counting backwards, safe space</li>
          <li><strong>Self-talk:</strong> "I can handle this,", "Feelings pass"</li>
          <li><strong>Problem-solving:</strong> "What are three things you could try?"</li>
        </ul>

        <h2 id="cultural-context" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural Considerations
        </h2>
        <p className="mb-6">
          Emotion socialization varies across cultures <Citation id="6" index={6} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />. Some cultures emphasize emotional restraint; others encourage expression. Adapt emotion coaching to align with your family's values while still validating children's internal experiences.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Emotion coaching isn't about eliminating difficult emotions — it's about teaching children that all emotions are okay and manageable. When children feel heard and understood, they develop the skills to regulate themselves.
          </p>
        </ArticleCallout>
      </>
    ),
  },
];
