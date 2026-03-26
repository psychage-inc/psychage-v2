 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SELF_WORTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout, StatCard, ProgressSteps, ComparisonTable } from '../../../components/article/blocks';

export const identityValuesArticlesB: Article[] = [
  {
    id: catId(46),
    slug: 'cultural-identity-mental-health-navigating-multiple-selves',
    title: 'Cultural Identity and Mental Health: Navigating Multiple Selves',
    description: 'Navigating multiple cultural identities can be enriching or exhausting. Learn how cultural identity shapes mental health and wellbeing.',
    image: "/images/articles/cat04/cover-046.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 5,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Cultural Identity', 'Bicultural Identity', 'Mental Health', 'Diversity'],
    citations: [
      { id: '1', text: 'Bicultural identity integration and well-being', source: 'Journal of Cross-Cultural Psychology', year: '2020', link: 'https://doi.org/10.1177/0022022120902108', tier: 1 },
      { id: '2', text: 'Cultural identity conflict and mental health', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2021', link: 'https://doi.org/10.1037/cdp0000438', tier: 1 },
      { id: '3', text: 'Third culture kids and identity formation', source: 'International Journal of Intercultural Relations', year: '2020', link: 'https://doi.org/10.1016/j.ijintrel.2020.05.002', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You navigate multiple worlds: the culture you grew up in, the culture you live in now, maybe cultures from parents, partners, or travels. Each comes with values, norms, and expectations. Managing multiple cultural identities can be source of strength and struggle simultaneously.
          </p>
          <p className="mb-6">
            Research shows bicultural individuals who integrate identities (rather than feeling conflict between them) report better mental health <Citation id="1" index={1} source="Journal of Cross-Cultural Psychology" year="2020" tier={1} />. But cultural identity conflict---feeling torn between cultures---correlates with anxiety and depression <Citation id="2" index={2} source="Cultural Diversity and Ethnic Minority Psychology" year="2021" tier={2} />.
          </p>
        </div>

        <h2 id="integration-vs-conflict" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Integration vs. Conflict
        </h2>
        <ComparisonTable
          title="Approaches to Multiple Cultural Identities"
          columns={['Approach', 'Experience', 'Mental Health Impact']}
          items={[
            { feature: 'Integration', values: ['See cultures as complementary, draw from both', 'Better psychological adjustment, higher self-esteem'] },
            { feature: 'Conflict', values: ['See cultures as incompatible, forced to choose', 'Higher anxiety, depression, identity confusion'] },
            { feature: 'Assimilation', values: ['Reject heritage culture, adopt dominant culture', 'Loss of cultural roots, identity strain'] },
            { feature: 'Separation', values: ['Reject dominant culture, maintain only heritage', 'Social isolation, limited opportunities'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Challenges
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Code-switching exhaustion:</strong> Constant adaptation between cultural contexts drains energy</li>
          <li><strong>"Not enough" of either:</strong> Feeling too Western for heritage culture, too ethnic for dominant culture</li>
          <li><strong>Family-culture conflict:</strong> Personal values diverge from family's cultural expectations</li>
          <li><strong>Microaggressions:</strong> "Where are you really from?" questions signal perpetual outsider status</li>
          <li><strong>Third culture experience:</strong> Growing up between cultures creates unique identity (neither/both) <Citation id="3" index={3} source="International Journal of Intercultural Relations" year="2020" tier={1} /></li>
        </ul>

        <h2 id="cultivating-integration" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultivating Cultural Identity Integration
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: `Reframe as "Both/And`, description: <p>You don't have to choose. You can be fully both (or multiple) identities simultaneously.</p> },
            { title: 'Find Community', description: <p>Connect with others navigating similar cultural spaces. Shared experience reduces isolation.</p> },
            { title: 'Celebrate Hybridity', description: <p>Your multicultural identity is a strength---cognitive flexibility, perspective-taking, cultural bridge-building.</p> },
            { title: 'Set Boundaries', description: <p>You're not obligated to explain or represent your culture to others. It's okay to decline 'cultural educator' role.</p> },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Navigating multiple cultural identities shapes mental health significantly. Integration (seeing cultures as complementary) supports wellbeing, while conflict (forced choosing) creates distress. Cultural fluency is a strength when you have choice and community, not just obligation and isolation.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(47),
    slug: 'gender-identity-mental-health-psychological-impact',
    title: 'Gender Identity and Mental Health: Understanding the Psychological Impact',
    description: 'Gender identity---your internal sense of gender---profoundly affects mental health, especially when it conflicts with assigned sex or social expectations.',
    image: "/images/articles/cat04/cover-047.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Gender Identity', 'Transgender', 'Mental Health', 'Identity'],
    citations: [
      { id: '1', text: 'Gender dysphoria and mental health outcomes', source: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.jaac.2019.12.006', tier: 1 },
      { id: '2', text: 'Affirming care and transgender youth mental health', source: 'Pediatrics', year: '2022', link: 'https://doi.org/10.1542/peds.2021-056082', tier: 1 },
      { id: '3', text: 'Minority stress model and gender identity', source: 'Psychology of Sexual Orientation and Gender Diversity', year: '2021', link: 'https://doi.org/10.1037/sgd0000452', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Gender identity---your internal sense of being male, female, both, neither, or another gender---is a fundamental aspect of self. For many, gender identity aligns with sex assigned at birth. For others, it doesn't, creating gender dysphoria and navigating a world that often doesn't recognize or affirm their identity.
          </p>
          <p className="mb-6">
            Research shows transgender and gender-diverse individuals experience higher rates of depression and anxiety---not because of gender identity itself, but due to minority stress: discrimination, lack of affirmation, and social rejection <Citation id="3" index={3} source="Psychology of Sexual Orientation and Gender Diversity" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="gender-dysphoria" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Gender Dysphoria
        </h2>
        <p className="mb-6">
          Gender dysphoria is the distress experienced when gender identity conflicts with assigned sex <Citation id="1" index={1} source="Journal of the American Academy of Child & Adolescent Psychiatry" year="2020" tier={1} />. It involves:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Discomfort with primary/secondary sex characteristics</li>
          <li>Distress about being perceived as assigned gender</li>
          <li>Strong desire to be another gender or rid of sex characteristics</li>
          <li>Conviction that one's feelings/reactions are those of another gender</li>
        </ul>

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Mental Health Impact
        </h2>
        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Transgender youth attempt suicide' },
            { value: 73, suffix: '%', label: 'Reduction in suicidality with affirming care' },
            { value: 2, suffix: 'x', label: 'Higher depression rates without support' },
          ]}
          source="Pediatrics & Psychology of Sexual Orientation, 2021-2022"
        />

        <p className="mb-6 mt-6">
          The mental health challenges stem primarily from <strong>minority stress</strong> <Citation id="3" index={3} source="Psychology of Sexual Orientation and Gender Diversity" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Distal stressors:</strong> Discrimination, violence, rejection</li>
          <li><strong>Proximal stressors:</strong> Internalized transphobia, concealment, anticipation of rejection</li>
          <li><strong>Lack of affirmation:</strong> Misgendering, deadnaming, invalidation of identity</li>
        </ul>

        <h2 id="protective-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Helps
        </h2>
        <p className="mb-6">
          Research identifies clear protective factors <Citation id="2" index={2} source="Pediatrics" year="2022" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Family acceptance:</strong> Single strongest predictor of positive mental health</li>
          <li><strong>Gender-affirming care:</strong> Medical/social transition reduces dysphoria and improves wellbeing</li>
          <li><strong>Supportive community:</strong> Connection with other trans/gender-diverse people</li>
          <li><strong>Legal recognition:</strong> Name/gender marker changes, anti-discrimination protections</li>
          <li><strong>Affirming therapy:</strong> Mental health support that validates identity</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Gender identity profoundly affects mental health---not because being transgender or gender-diverse is pathological, but because minority stress (discrimination, lack of affirmation, rejection) creates psychological harm. Affirming care, family acceptance, and supportive community dramatically improve mental health outcomes.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(48),
    slug: 'sexual-orientation-self-acceptance-psychological-perspective',
    title: 'Sexual Orientation and Self-Acceptance: A Psychological Perspective',
    description: 'Coming to terms with sexual orientation involves navigating internalized stigma, family acceptance, and building authentic identity in a heteronormative world.',
    image: "/images/articles/cat04/cover-048.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 5,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sexual Orientation', 'LGBTQ+', 'Self-Acceptance', 'Mental Health'],
    citations: [
      { id: '1', text: 'Sexual orientation and mental health', source: 'American Psychologist', year: '2020', link: 'https://doi.org/10.1037/amp0000558', tier: 1 },
      { id: '2', text: 'Minority stress and LGB mental health', source: 'Annual Review of Clinical Psychology', year: '2021', link: 'https://doi.org/10.1146/annurev-clinpsy-081219-120559', tier: 1 },
      { id: '3', text: 'Coming out and psychological wellbeing', source: 'Journal of Gay & Lesbian Mental Health', year: '2020', link: 'https://doi.org/10.1080/19359705.2020.1715455', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Discovering and accepting your sexual orientation can be liberating, terrifying, or both. For lesbian, gay, bisexual, and other non-heterosexual individuals, self-acceptance often involves unlearning internalized stigma, navigating family responses, and building identity in contexts that assume heterosexuality.
          </p>
          <p className="mb-6">
            Research shows sexual orientation itself doesn't cause mental health problems---minority stress does <Citation id="2" index={2} source="Annual Review of Clinical Psychology" year="2021" tier={1} />. LGB individuals face higher rates of depression and anxiety due to discrimination, rejection, and internalized stigma <Citation id="1" index={1} source="American Psychologist" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="coming-out-process" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Coming Out Process
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Awareness', description: <p>Recognizing attraction that doesn't align with heterosexual assumption. Can occur at any age.</p> },
            { title: 'Exploration', description: <p>Testing, questioning, seeking information. Uncertainty and confusion common.</p> },
            { title: 'Self-Acceptance', description: <p>Integrating sexual orientation into identity. Overcoming internalized homophobia/biphobia.</p> },
            { title: 'Disclosure', description: <p>Coming out to others---ongoing process, not one-time event. Each context requires new decision <Citation id="3" index={3} source="Journal of Gay & Lesbian Mental Health" year="2020" tier={1} />.</p> },
          ]}
        />

        <h2 id="minority-stress" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Minority Stress and Mental Health
        </h2>
        <p className="mb-6">
          LGB individuals experience unique stressors <Citation id="2" index={2} source="Annual Review of Clinical Psychology" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Internalized stigma:</strong> Believing negative messages about non-heterosexuality</li>
          <li><strong>Concealment stress:</strong> Hiding orientation to avoid discrimination</li>
          <li><strong>Anticipated rejection:</strong> Constant vigilance about safety and acceptance</li>
          <li><strong>Discrimination and victimization:</strong> Experiencing prejudice, harassment, or violence</li>
        </ul>

        <h2 id="building-acceptance" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building Self-Acceptance
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Challenge internalized stigma:</strong> Recognize that negative beliefs are learned, not truth</li>
          <li><strong>Find affirming community:</strong> Connection with other LGB people reduces isolation</li>
          <li><strong>Selective disclosure:</strong> Come out strategically---safety and wellbeing matter more than complete openness</li>
          <li><strong>Affirming therapy:</strong> Work with LGB-affirming therapist if struggling</li>
          <li><strong>Build chosen family:</strong> Create support network of accepting people</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Sexual orientation is a normal variation of human sexuality. Mental health challenges among LGB individuals stem from minority stress---stigma, discrimination, and rejection---not from orientation itself. Self-acceptance involves unlearning internalized stigma, finding affirming community, and building identity authentically.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(49),
    slug: 'career-identity-when-what-you-do-becomes-who-you-are',
    title: 'Career Identity: When What You Do Becomes Who You Are',
    description: 'Your career can be source of meaning or trap. Learn when work identity enriches life and when it becomes problematic over-identification.',
    image: "/images/articles/cat04/cover-049.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 5,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Career Identity', 'Work-Life Balance', 'Identity', 'Burnout'],
    citations: [
      { id: '1', text: 'Career identity and psychological wellbeing', source: 'Journal of Vocational Behavior', year: '2020', link: 'https://doi.org/10.1016/j.jvb.2020.103418', tier: 1 },
      { id: '2', text: 'Work identity entrapment', source: 'Journal of Applied Psychology', year: '2021', link: 'https://doi.org/10.1037/apl0000847', tier: 1 },
      { id: '3', text: 'Career transitions and identity reconstruction', source: 'Journal of Career Development', year: '2020', link: 'https://doi.org/10.1177/0894845319882129', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "I'm a doctor.", "I'm an engineer.", "I'm an artist." For many, career is central to identity---source of meaning, status, and self-definition. But when "what you do" becomes "who you are," job loss, retirement, or career dissatisfaction can trigger identity crisis.
          </p>
          <p className="mb-6">
            Research shows career identity can support psychological wellbeing when it's integrated with (not replacing) other identity aspects <Citation id="1" index={1} source="Journal of Vocational Behavior" year="2020" tier={1} />. But over-identification with work predicts burnout and difficulty navigating transitions <Citation id="2" index={2} source="Journal of Applied Psychology" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="healthy-vs-over-identification" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Healthy Career Identity vs. Over-Identification
        </h2>
        <ComparisonTable
          title="Two Relationships with Work Identity"
          columns={['Feature', 'Healthy Integration', 'Over-Identification']}
          items={[
            { feature: 'Self-concept', values: ['Work is part of who I am', 'Work is ALL of who I am'] },
            { feature: 'Meaning', values: ['Work provides meaning among other sources', 'Work is sole source of meaning/worth'] },
            { feature: 'Identity breadth', values: ['Multiple roles: worker, parent, friend, hobbyist', 'Primarily/only worker identity'] },
            { feature: 'Response to job loss', values: ['Difficult but navigable', 'Identity crisis, severe distress'] },
            { feature: 'Boundaries', values: ['Can separate work from personal life', 'Work permeates all aspects of life'] },
          ]}
          highlightColumn={2}
        />

        <h2 id="risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-gray-300 mb-6 scroll-mt-32">
          Who's at Risk for Over-Identification?
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>High-status professions:</strong> Doctors, lawyers, executives---where career confers identity/prestige</li>
          <li><strong>All-consuming careers:</strong> Startups, medicine, academia---fields demanding constant engagement</li>
          <li><strong>Passionate vocations:</strong> Artists, activists---work tied to values and purpose</li>
          <li><strong>Late-career professionals:</strong> Decades invested; career = life's work</li>
        </ul>

        <h2 id="diversifying-identity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diversifying Your Identity
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Cultivate Non-Work Identities', description: <p>Invest in relationships, hobbies, community roles. Who are you outside of work?</p> },
            { title: 'Practice Introducing Yourself Differently', description: <p>Try introducing yourself without mentioning career. Notice the discomfort; practice other self-descriptors.</p> },
            { title: 'Set Boundaries', description: <p>Protect non-work time. Declining work outside hours reinforces that you're more than your job.</p> },
            { title: 'Plan for Transitions', description: <p>Career changes, retirement inevitable. Proactively build identity that survives these shifts <Citation id="3" index={3} source="Journal of Career Development" year="2020" tier={1} />.</p> },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Career can be meaningful part of identity without consuming it entirely. Over-identification with work creates vulnerability to burnout and identity crisis during transitions. Healthy career identity integrates work with other roles, relationships, and sources of meaning.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(50),
    slug: 'reinventing-yourself-navigate-major-identity-shifts',
    title: 'Reinventing Yourself: How to Navigate Major Identity Shifts',
    description: 'Major life changes require identity reconstruction. Learn how to navigate reinvention after divorce, career change, illness, or other transitions.',
    image: "/images/articles/cat04/cover-050.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Identity Change', 'Life Transitions', 'Resilience', 'Personal Growth'],
    citations: [
      { id: '1', text: 'Identity reconstruction after major life events', source: 'Journal of Personality', year: '2021', link: 'https://doi.org/10.1111/jopy.12601', tier: 1 },
      { id: '2', text: 'Posttraumatic growth and identity change', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101831', tier: 1 },
      { id: '3', text: 'Narrative identity and life transitions', source: 'Identity: An International Journal', year: '2020', link: 'https://doi.org/10.1080/15283488.2020.1735407', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Divorce ends a marriage, but it also ends being a spouse. Retirement ends a career, but it also ends professional identity. Illness changes abilities, changing how you see yourself. Major life transitions don't just alter circumstances---they require reinventing who you are.
          </p>
          <p className="mb-6">
            Research shows identity reconstruction after major life events involves disintegration (loss of old self) and reintegration (building new self) <Citation id="1" index={1} source="Journal of Personality" year="2021" tier={1} />. While painful, this process can lead to posttraumatic growth and more authentic identity <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="common-triggers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Life Events That Require Reinvention
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Relationship changes:</strong> Divorce, widowhood, breakup of long-term relationship</li>
          <li><strong>Career transitions:</strong> Job loss, retirement, career change</li>
          <li><strong>Health changes:</strong> Chronic illness, disability, major injury</li>
          <li><strong>Geographical moves:</strong> Immigration, relocation away from community</li>
          <li><strong>Empty nest:</strong> Children leaving home after decades of active parenting</li>
          <li><strong>Coming out:</strong> Sexual orientation or gender identity disclosure</li>
        </ul>

        <h2 id="stages" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Stages of Reinvention
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: '1. Disintegration: Loss of Old Identity', description: <p>Who you were no longer fits. Disorientation, grief, identity confusion. This is normal, not failure.</p> },
            { title: '2. Liminal Space: Between Identities', description: <p>No longer old self, not yet new self. Uncertainty feels unbearable but is necessary for transformation <Citation id="3" index={3} source="Identity: An International Journal" year="2020" tier={1} />.</p> },
            { title: '3. Exploration: Trying New Selves', description: <p>Experiment with new roles, activities, communities. Not all will fit---that's the point.</p> },
            { title: '4. Commitment: Building New Identity', description: <p>Gradually committing to aspects that resonate. New self emerges through action, not just thought.</p> },
            { title: '5. Integration: Coheren New Self', description: <p>New identity stabilizes. Integration includes parts of old self that still fit.</p> },
          ]}
        />

        <h2 id="practical-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Navigating Reinvention
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Accept the discomfort:</strong> Identity reconstruction is inherently uncertain. Trying to force premature clarity delays the process.</li>
          <li><strong>Grieve what's lost:</strong> Honor old identity even as you move forward. Grief is part of transition.</li>
          <li><strong>Experiment broadly:</strong> Try activities, communities, roles without committing. Exploration precedes clarity.</li>
          <li><strong>Rewrite your narrative:</strong> Tell new story about yourself that integrates past and future. How does this transition fit into your life story?</li>
          <li><strong>Be patient:</strong> Reinvention takes time---months to years, not weeks. Trust the process.</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Major life transitions require identity reinvention---dismantling old self and constructing new one. While disorienting and painful, this process offers opportunity for growth and authenticity. Navigating it requires accepting uncertainty, grieving loss, exploring possibilities, and patiently allowing new identity to emerge.</p>
        </ArticleCallout>
      </>
    ),
  },
];
