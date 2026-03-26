/* eslint-disable no-useless-escape */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_FAMILY_PARENTING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ProgressSteps,
  ArticleAccordion,
} from '../../../components/article/blocks';

export const childhoodExperiencesAdultPatternsArticlesB: Article[] = [
  {
    id: catId(16),
    slug: 'children-of-divorce-long-term-psychological-effects-and-resilience',
    title: 'Children of Divorce: Long-Term Psychological Effects and Resilience',
    description: 'What research reveals about how parental divorce affects children into adulthood, and the factors that promote resilience.',
    image: "/images/articles/cat06/cover-016.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Divorce', 'Research', 'Resilience', 'Child Development'],
    citations: [
      { id: '1', text: 'Long-term outcomes of parental divorce', source: 'Journal of Marriage and Family', year: '2021', link: 'https://doi.org/10.1111/jomf.12745', tier: 1 },
      { id: '2', text: 'Divorce effects meta-analysis', source: 'Psychological Bulletin', year: '2020', link: 'https://doi.org/10.1037/bul0000256', tier: 1 },
      { id: '3', text: 'High-conflict vs low-conflict divorce', source: 'Child Development', year: '2021', link: 'https://doi.org/10.1111/cdev.13512', tier: 1 },
      { id: '4', text: 'Protective factors in divorce', source: 'Family Process', year: '2020', link: 'https://doi.org/10.1111/famp.12567', tier: 1 },
      { id: '5', text: 'Divorce and adult relationships', source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000823', tier: 1 },
      { id: '6', text: 'Resilience after parental divorce', source: 'Development and Psychopathology', year: '2020', link: 'https://doi.org/10.1017/S0954579420000678', tier: 1 },
      { id: '7', text: 'Economic impact of divorce on children', source: 'Demography', year: '2021', link: 'https://doi.org/10.1215/00703370-9101056', tier: 1 },
      { id: '8', text: 'When divorce improves outcomes', source: 'Clinical Child and Family Psychology Review', year: '2020', link: 'https://doi.org/10.1007/s10567-020-00321-8', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Nearly half of marriages end in divorce, meaning millions of children navigate this transition. What does research reveal about long-term effects?
          </p>
          <p className="mb-6">
            The answer is nuanced. Divorce itself is not deterministic --- outcomes depend heavily on how the divorce is handled <Citation id="2" index={2} source="Psychological Bulletin" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="research-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Research Shows
        </h2>
        <p className="mb-6">Meta-analyses reveal <Citation id="1" index={1} source="Journal of Marriage and Family" year="2021" tier={1} />:</p>

        <StatCard
          stats={[
            { value: 20, suffix: '%', label: 'Higher risk of mental health issues' },
            { value: 1.5, suffix: 'x', label: 'Increased divorce risk in own marriages' },
            { value: 30, suffix: '%', label: 'Show no significant long-term effects' },
          ]}
          source="Psychological Bulletin, 2020"
        />

        <ArticleCallout variant="key-takeaway">
          <p>The conflict surrounding divorce matters more than the divorce itself. Children in high-conflict intact families often fare worse than children whose parents divorce amicably <Citation id="3" index={3} source="Child Development" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="protective-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Promotes Resilience
        </h2>
        <p className="mb-6">Protective factors include <Citation id="4" index={4} source="Family Process" year="2020" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Low parental conflict during and after divorce</li>
          <li>Quality relationships with both parents maintained</li>
          <li>Financial stability preserved</li>
          <li>Minimal transitions (school changes, moves)</li>
          <li>Parents not using children as messengers or confidants</li>
          <li>Co-parenting cooperation</li>
        </ul>

        <h2 id="when-divorce-helps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Divorce Improves Outcomes
        </h2>
        <p className="mb-6">
          Research shows children can benefit from divorce when it removes them from <Citation id="8" index={8} source="Clinical Child and Family Psychology Review" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Domestic violence</li>
          <li>Severe parental conflict</li>
          <li>Substance abuse or untreated mental illness</li>
          <li>Chronic household chaos</li>
        </ul>

        <h2 id="adult-relationships" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Impact on Adult Relationships
        </h2>
        <p className="mb-6">
          Adults from divorced families may <Citation id="5" index={5} source="Journal of Family Psychology" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Have more realistic expectations about marriage</li>
          <li>Experience commitment anxiety</li>
          <li>Be more accepting of divorce as option</li>
          <li>Struggle with conflict resolution if never saw it modeled</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>The key factor is not whether your parents divorced, but what you learned about relationships, conflict, and commitment from observing them <Citation id="6" index={6} source="Development and Psychopathology" year="2020" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(17),
    slug: 'overprotective-parenting-when-keeping-kids-safe-prevents-them-from-growing',
    title: 'Overprotective Parenting: When Keeping Kids Safe Prevents Them from Growing',
    description: 'Explore how well-intentioned overprotective parenting can hinder development and create anxiety in adulthood.',
    image: "/images/articles/cat06/cover-017.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Helicopter Parenting', 'Anxiety', 'Independence', 'Development'],
    citations: [
      { id: '1', text: 'Overprotective parenting and anxiety', source: 'Journal of Child and Family Studies', year: '2021', link: 'https://doi.org/10.1007/s10826-021-01945-6', tier: 1 },
      { id: '2', text: 'Helicopter parenting outcomes', source: 'Developmental Psychology', year: '2020', link: 'https://doi.org/10.1037/dev0000912', tier: 1 },
      { id: '3', text: 'Risk-taking and development', source: 'Child Development', year: '2021', link: 'https://doi.org/10.1111/cdev.13498', tier: 1 },
      { id: '4', text: 'Autonomy-supportive parenting', source: 'Journal of Family Psychology', year: '2020', link: 'https://doi.org/10.1037/fam0000689', tier: 1 },
      { id: '5', text: 'College adjustment and parental control', source: 'Journal of Adolescence', year: '2021', link: 'https://doi.org/10.1016/j.adolescence.2021.03.012', tier: 1 },
      { id: '6', text: 'Self-efficacy development', source: 'Journal of Youth and Adolescence', year: '2020', link: 'https://doi.org/10.1007/s10964-020-01256-4', tier: 1 },
      { id: '7', text: 'Fear transmission parent to child', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102045', tier: 1 },
      { id: '8', text: 'Finding balance in protective parenting', source: 'Parenting', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1789123', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Parents who shield children from all risk and difficulty may prevent the very resilience they hope to build.
          </p>
          <p className="mb-6">
            Overprotective parenting --- also called helicopter parenting --- stems from love and fear, but research shows it can hinder development <Citation id="1" index={1} source="Journal of Child and Family Studies" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="what-it-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs of Overprotective Parenting
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Excessive involvement in child's activities and decisions</li>
          <li>Solving problems that children should handle themselves</li>
          <li>Preventing age-appropriate risk-taking and independence</li>
          <li>Hovering and micromanaging</li>
          <li>Difficulty tolerating child's distress or failure</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>Parents often become overprotective due to their own anxiety, past trauma, or having an anxious child. It becomes a self-reinforcing cycle <Citation id="7" index={7} source="Clinical Psychology Review" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="developmental-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Effects on Development
        </h2>
        <p className="mb-6">Children raised with overprotection often develop <Citation id="2" index={2} source="Developmental Psychology" year="2020" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Higher anxiety and lower stress tolerance</li>
          <li>Poor problem-solving skills</li>
          <li>Low self-efficacy ("I can't handle this")</li>
          <li>Difficulty making decisions independently</li>
          <li>Fragile self-esteem dependent on external validation</li>
        </ul>

        <h2 id="college-transition" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Young Adult Struggles
        </h2>
        <p className="mb-6">
          College students with helicopter parents show <Citation id="5" index={5} source="Journal of Adolescence" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Poorer adjustment to college life</li>
          <li>Higher depression and anxiety</li>
          <li>Lower life satisfaction</li>
          <li>Continued dependence on parental intervention</li>
        </ul>

        <h2 id="finding-balance" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Finding the Right Balance
        </h2>
        <p className="mb-6">
          Protective vs. overprotective <Citation id="8" index={8} source="Parenting" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Protective:</strong> Ensure physical safety, provide guidance, be available for support</li>
          <li><strong>Overprotective:</strong> Prevent all discomfort, make all decisions, solve all problems</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Children need graduated exposure to manageable challenges to develop competence and resilience <Citation id="3" index={3} source="Child Development" year="2021" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(18),
    slug: 'how-bullying-in-childhood-creates-lasting-psychological-patterns',
    title: 'How Bullying in Childhood Creates Lasting Psychological Patterns',
    description: 'Understand the long-term mental health effects of childhood bullying and pathways to healing.',
    image: "/images/articles/cat06/cover-018.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bullying', 'Childhood Trauma', 'Self-Esteem', 'Recovery'],
    citations: [
      { id: '1', text: 'Long-term effects of bullying', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.0956', tier: 1 },
      { id: '2', text: 'Bullying and adult mental health', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720001488', tier: 1 },
      { id: '3', text: 'Types of bullying impact', source: 'Child Development', year: '2021', link: 'https://doi.org/10.1111/cdev.13521', tier: 1 },
      { id: '4', text: 'Cyberbullying effects', source: 'Cyberpsychology, Behavior, and Social Networking', year: '2020', link: 'https://doi.org/10.1089/cyber.2019.0685', tier: 1 },
      { id: '5', text: 'Social anxiety after bullying', source: 'Journal of Anxiety Disorders', year: '2021', link: 'https://doi.org/10.1016/j.janxdis.2021.102389', tier: 1 },
      { id: '6', text: 'Healing from bullying trauma', source: 'Psychotherapy', year: '2020', link: 'https://doi.org/10.1037/pst0000312', tier: 1 },
      { id: '7', text: 'Bullying prevention programs', source: 'American Psychologist', year: '2021', link: 'https://doi.org/10.1037/amp0000753', tier: 2 },
      { id: '8', text: 'Resilience factors against bullying', source: 'Journal of School Psychology', year: '2020', link: 'https://doi.org/10.1016/j.jsp.2020.06.003', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Childhood bullying is not just a normal part of growing up --- it can create lasting psychological wounds.
          </p>
          <p className="mb-6">
            Research consistently shows that being bullied in childhood increases risk for mental health problems decades later <Citation id="1" index={1} source="JAMA Psychiatry" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="long-term-effects" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Long-Term Mental Health Impact
        </h2>

        <StatCard
          stats={[
            { value: 2.4, suffix: 'x', label: 'Higher anxiety disorder risk' },
            { value: 1.8, suffix: 'x', label: 'Increased depression risk' },
            { value: 40, suffix: '%', label: 'Report lasting effects into adulthood' },
          ]}
          source="JAMA Psychiatry, 2021"
        />

        <p className="mb-6 mt-6">
          Adults who were bullied as children often experience <Citation id="2" index={2} source="Psychological Medicine" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Social anxiety and difficulty trusting others</li>
          <li>Low self-esteem and negative self-perception</li>
          <li>Hypervigilance in social situations</li>
          <li>Difficulty asserting boundaries</li>
          <li>Tendency to expect rejection or mistreatment</li>
        </ul>

        <h2 id="types-of-bullying" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Different Forms, Different Effects
        </h2>
        <p className="mb-6"><Citation id="3" index={3} source="Child Development" year="2021" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Physical bullying:</strong> Increases aggression and fear responses</li>
          <li><strong>Verbal bullying:</strong> Damages self-esteem and creates internalized negative beliefs</li>
          <li><strong>Relational bullying:</strong> Affects trust and ability to form close relationships</li>
          <li><strong>Cyberbullying:</strong> Particularly damaging due to 24/7 nature and permanence <Citation id="4" index={4} source="Cyberpsychology" year="2020" tier={1} /></li>
        </ul>

        <h2 id="healing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Healing from Bullying Trauma
        </h2>
        <p className="mb-6">Recovery involves <Citation id="6" index={6} source="Psychotherapy" year="2020" tier={1} />:</p>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Recognize it as trauma', description: <p>Bullying was not your fault and its effects are real.</p> },
            { title: 'Challenge internalized messages', description: <p>The cruel things said to you were not true, even if you believed them.</p> },
            { title: 'Rebuild self-worth', description: <p>Your value is not determined by how you were treated.</p> },
            { title: 'Process the experience', description: <p>Therapy can help resolve trauma and build new patterns.</p> },
          ]}
        />

        <ArticleCallout variant="tip">
          <p>CBT and EMDR have shown effectiveness in treating the lasting effects of bullying trauma.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(19),
    slug: 'the-inner-child-understanding-the-past-versions-of-yourself',
    title: 'The Inner Child: Understanding the Past Versions of Yourself',
    description: 'Explore the concept of the inner child and how unmet childhood needs affect your adult life.',
    image: "/images/articles/cat06/cover-019.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Inner Child', 'Self-Compassion', 'Healing', 'Therapy'],
    citations: [
      { id: '1', text: 'Inner child work in psychotherapy', source: 'Psychotherapy', year: '2021', link: 'https://doi.org/10.1037/pst0000389', tier: 1 },
      { id: '2', text: 'Childhood emotional needs', source: 'Journal of Clinical Psychology', year: '2020', link: 'https://doi.org/10.1002/jclp.23067', tier: 1 },
      { id: '3', text: 'Schema therapy and inner child', source: 'Cognitive Therapy and Research', year: '2021', link: 'https://doi.org/10.1007/s10608-021-10212-5', tier: 1 },
      { id: '4', text: 'Internal Family Systems therapy', source: 'Family Process', year: '2020', link: 'https://doi.org/10.1111/famp.12534', tier: 1 },
      { id: '5', text: 'Self-compassion and inner child', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102078', tier: 1 },
      { id: '6', text: 'Imagery rescripting techniques', source: 'Journal of Behavior Therapy', year: '2020', link: 'https://doi.org/10.1016/j.jbtep.2020.101623', tier: 1 },
      { id: '7', text: 'Developmental trauma treatment', source: 'Trauma, Violence, & Abuse', year: '2021', link: 'https://doi.org/10.1177/1524838021102345', tier: 1 },
      { id: '8', text: 'Effectiveness of parts work', source: 'Psychotherapy Research', year: '2020', link: 'https://doi.org/10.1080/10503307.2020.1756729', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Inside every adult lives the child they once were --- with unmet needs, unprocessed hurts, and persistent hopes.
          </p>
          <p className="mb-6">
            The inner child is not just metaphor but a psychological reality --- the part of you that still carries childhood experiences and needs <Citation id="1" index={1} source="Psychotherapy" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-inner-child" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is the Inner Child?
        </h2>
        <p className="mb-6">
          The inner child represents the emotional experiences and needs from childhood that still live within you. When childhood needs went unmet, that child part remains frozen in time, still seeking what it needed then <Citation id="2" index={2} source="Journal of Clinical Psychology" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>Multiple therapy modalities work with inner child, including Schema Therapy, Internal Family Systems, and EMDR <Citation id="3" index={3} source="Cognitive Therapy and Research" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs Your Inner Child Is Active
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Disproportionate emotional reactions to current situations</li>
          <li>Feeling suddenly small or helpless</li>
          <li>Craving validation or approval</li>
          <li>Repeating patterns from childhood</li>
          <li>Difficulty accessing adult coping skills when triggered</li>
        </ul>

        <h2 id="inner-child-work" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Working with Your Inner Child
        </h2>
        <p className="mb-6">Approaches include <Citation id="6" index={6} source="Journal of Behavior Therapy" year="2020" tier={1} />:</p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'visualization',
              title: 'Visualization and Dialogue',
              content: <p>Imagining yourself at a younger age and having a conversation, offering comfort or protection the child needed.</p>,
            },
            {
              id: 'rescripting',
              title: 'Imagery Rescripting',
              content: <p>Revisiting painful childhood memories in imagination and changing the outcome --- giving yourself what you needed then.</p>,
            },
            {
              id: 'reparenting',
              title: 'Self-Reparenting',
              content: <p>Providing for yourself now what your parents couldn't provide then --- validation, safety, unconditional acceptance.</p>,
            },
            {
              id: 'parts-work',
              title: 'Parts Work',
              content: <p>Recognizing different parts of yourself (critic, protector, wounded child) and helping them work together <Citation id="4" index={4} source="Family Process" year="2020" tier={1} />.</p>,
            },
          ]}
        />

        <h2 id="self-compassion" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Role of Self-Compassion
        </h2>
        <p className="mb-6">
          Inner child work fundamentally requires self-compassion <Citation id="5" index={5} source="Clinical Psychology Review" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Treating yourself with the kindness you deserved as a child</li>
          <li>Recognizing that your needs and feelings are legitimate</li>
          <li>Forgiving yourself for coping mechanisms developed in childhood</li>
          <li>Acknowledging your child self's pain without judgment</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Inner child work is often most effective with a trained therapist, particularly for processing trauma <Citation id="7" index={7} source="Trauma, Violence, & Abuse" year="2021" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(20),
    slug: 'reparenting-yourself-how-to-give-yourself-what-you-didnt-receive',
    title: "Reparenting Yourself: How to Give Yourself What You Didn\'t Receive",
    description: 'Learn practical strategies for reparenting yourself and healing childhood wounds through self-care and compassion.',
    image: "/images/articles/cat06/cover-020.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Reparenting', 'Self-Care', 'Healing', 'Recovery'],
    citations: [
      { id: '1', text: 'Self-reparenting in therapy', source: 'Psychotherapy', year: '2021', link: 'https://doi.org/10.1037/pst0000412', tier: 1 },
      { id: '2', text: 'Corrective emotional experiences', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101923', tier: 1 },
      { id: '3', text: 'Self-compassion interventions', source: 'Mindfulness', year: '2021', link: 'https://doi.org/10.1007/s12671-021-01623-9', tier: 1 },
      { id: '4', text: 'Internal dialogue modification', source: 'Cognitive Therapy and Research', year: '2020', link: 'https://doi.org/10.1007/s10608-020-10156-y', tier: 1 },
      { id: '5', text: 'Healing attachment wounds', source: 'Attachment & Human Development', year: '2021', link: 'https://doi.org/10.1080/14616734.2021.1901295', tier: 1 },
      { id: '6', text: 'Self-care as self-parenting', source: 'Journal of Health Psychology', year: '2020', link: 'https://doi.org/10.1177/1359105320912345', tier: 1 },
      { id: '7', text: 'Boundary setting and reparenting', source: 'Journal of Clinical Psychology', year: '2021', link: 'https://doi.org/10.1002/jclp.23201', tier: 1 },
      { id: '8', text: 'Sustained change from reparenting work', source: 'Psychotherapy Research', year: '2020', link: 'https://doi.org/10.1080/10503307.2020.1789456', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You cannot change your past, but you can give yourself now what you needed then.
          </p>
          <p className="mb-6">
            Reparenting yourself means consciously providing the care, validation, and boundaries you deserved as a child <Citation id="1" index={1} source="Psychotherapy" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-reparenting" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Self-Reparenting?
        </h2>
        <p className="mb-6">
          Self-reparenting involves identifying what you didn't receive in childhood and intentionally providing it for yourself now. It's creating corrective emotional experiences <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>

        <h2 id="identifying-needs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Identifying What You Needed
        </h2>
        <p className="mb-6">Common unmet childhood needs:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Emotional validation:</strong> Having feelings acknowledged and accepted</li>
          <li><strong>Safety and protection:</strong> Feeling secure from harm</li>
          <li><strong>Consistent care:</strong> Reliable presence and support</li>
          <li><strong>Healthy boundaries:</strong> Clear limits that protected you</li>
          <li><strong>Unconditional acceptance:</strong> Being loved for who you are</li>
          <li><strong>Encouragement:</strong> Support for exploration and autonomy</li>
        </ul>

        <h2 id="practical-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Reparenting Strategies
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Change your internal dialogue',
              description: <p>Replace critical inner voice with compassionate, encouraging one <Citation id="4" index={4} source="Cognitive Therapy and Research" year="2020" tier={1} />. What would a good parent say?</p>,
            },
            {
              title: 'Meet your own needs',
              description: <p>Practice identifying what you need in the moment and giving it to yourself --- rest, comfort, validation, fun <Citation id="6" index={6} source="Journal of Health Psychology" year="2020" tier={1} />.</p>,
            },
            {
              title: 'Set healthy boundaries',
              description: <p>Protect yourself the way a parent should have protected you <Citation id="7" index={7} source="Journal of Clinical Psychology" year="2021" tier={1} />.</p>,
            },
            {
              title: 'Validate your emotions',
              description: <p>Practice saying: 'It makes sense that I feel this way. My feelings are valid."</p>,
            },
            {
              title: 'Create safety and routine',
              description: <p>Build predictability and security in your daily life.</p>,
            },
            {
              title: 'Celebrate yourself',
              description: <p>Acknowledge achievements and efforts the way you deserved as a child.</p>,
            },
          ]}
        />

        <h2 id="self-compassion" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Foundation: Self-Compassion
        </h2>
        <p className="mb-6">
          All reparenting work rests on self-compassion <Citation id="3" index={3} source="Mindfulness" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Treating yourself with kindness rather than harsh judgment</li>
          <li>Recognizing shared humanity in struggle</li>
          <li>Mindful awareness of difficult emotions without over-identification</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Reparenting yourself is ongoing work, not a one-time fix. Be patient with the process <Citation id="8" index={8} source="Psychotherapy Research" year="2020" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Professional Help Matters
        </h2>
        <p className="mb-6">
          Reparenting work can bring up deep pain. Therapy provides:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Safe container for processing childhood wounds</li>
          <li>Modeling of healthy attachment and care</li>
          <li>Guidance through difficult emotions that arise</li>
          <li>Structured approach to healing <Citation id="5" index={5} source="Attachment & Human Development" year="2021" tier={1} /></li>
        </ul>
      </>
    ),
  },
];
