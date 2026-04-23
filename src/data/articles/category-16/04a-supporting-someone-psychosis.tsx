/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_PSYCHOSIS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  ArticleTabs,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
  HighlightBox,
} from '../../../components/article/blocks';

// ============================================================================
// Subcategory 4 --- Supporting Someone With Psychosis | Articles 31--35
// ============================================================================

export const supportingSomeoneArticlesA: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-PSY-031 | How to Talk to Someone Experiencing Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(31),
    slug: 'how-to-talk-to-someone-experiencing-psychosis',
    status: 'published',
    title: 'How to Talk to Someone Experiencing Psychosis: A Communication Guide',
    description: 'Practical communication strategies for talking to someone who is hearing voices, experiencing delusions, or otherwise disconnected from shared reality --- what helps, what hurts, and why.',
    image: '/images/articles/cat16/cover-031.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Communication', 'Family Support', 'Practical Guide', 'Psychosis'],

    summary: 'When someone you care about is experiencing psychosis --- hearing voices, expressing beliefs that don\'t match reality, speaking in ways that are difficult to follow --- every instinct tells you to argue them back to reality. But decades of clinical experience and research show that direct confrontation almost always makes things worse. Effective communication during psychosis requires a different approach: one that prioritizes connection over correction, validates emotional experience without endorsing false beliefs, and maintains the relationship even when shared reality has temporarily fractured. This guide provides concrete, evidence-based strategies for talking to someone in psychosis --- whether during acute episodes, ongoing symptoms, or the delicate conversations about treatment and recovery.',

    keyFacts: [
      { text: 'Direct confrontation of delusional beliefs typically strengthens conviction rather than weakening it --- the person\'s brain treats the challenge as further evidence', citationIndex: 1 },
      { text: 'Empathic, non-confrontational communication is associated with lower expressed emotion, which reduces relapse risk by 50%', citationIndex: 2 },
      { text: 'People in psychosis often retain the ability to perceive emotional tone and sincerity even when content processing is impaired', citationIndex: 3 },
      { text: 'Using the person\'s name, speaking slowly, and asking simple closed questions improves comprehension during acute episodes', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'You don\'t need to enter someone\'s delusion to reach them, and you don\'t need to shatter it to help them. The middle path --- acknowledging their emotional experience while gently holding open the door to alternative perspectives --- is both more effective and more humane than either agreement or argument.',

    practicalExercise: {
      title: 'Practicing Empathic Communication',
      steps: [
        { title: 'Replace "that\'s not real" with "that sounds frightening"', description: 'Practice responding to the emotion behind the statement rather than its factual accuracy. If someone says "they\'re poisoning my food," respond to the fear: "That must be terrifying. I want you to feel safe." This validates without confirming.' },
        { title: 'Use "I" statements instead of "you" statements', description: 'Replace "You need to take your medication" with "I\'m worried about you and I want to help." Replace "You\'re not making sense" with "I\'m having trouble following --- can you help me understand?" This reduces defensiveness.' },
        { title: 'Ask one question at a time', description: 'During acute psychosis, information processing is impaired. Ask simple, closed questions: "Are you hungry?" rather than "What do you want to eat for dinner --- we could do pasta or there are leftovers?" Wait for a response before asking the next question.' },
        { title: 'Practice comfortable silence', description: 'You don\'t always need to fill silence. Being present without speaking can communicate safety and acceptance. Sit nearby, offer a drink, and simply be there. Connection doesn\'t always require conversation.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Journal About Your Interactions',
    },

    citations: [
      { id: '1', text: 'Cognitive models of delusion formation and maintenance: A systematic review', source: 'Psychological Medicine', year: '2019', link: 'https://doi.org/10.1017/S0033291719001351', tier: 1 },
      { id: '2', text: 'Expressed emotion and relapse in psychosis: A meta-analysis spanning 35 years', source: 'Psychological Medicine', year: '2019', link: 'https://doi.org/10.1017/S0033291719001065', tier: 1 },
      { id: '3', text: 'Emotion perception in schizophrenia: A meta-analysis of prosodic and facial recognition', source: 'Schizophrenia Bulletin', year: '2018', link: 'https://doi.org/10.1093/schbul/sby002', tier: 1 },
      { id: '4', text: 'De-escalation techniques in acute psychosis: A systematic review', source: 'Aggression and Violent Behavior', year: '2020', link: 'https://doi.org/10.1016/j.avb.2020.101437', tier: 1 },
      { id: '5', text: 'Communication strategies for families of people with psychosis: A practice guide', source: 'British Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1192/bjp.2019.258', tier: 1 },
      { id: '6', text: 'Family intervention for schizophrenia: A Cochrane systematic review', source: 'Cochrane Database of Systematic Reviews', year: '2020', link: 'https://doi.org/10.1002/14651858.CD000088.pub4', tier: 1 },
      { id: '7', text: 'The therapeutic relationship in psychosis: A systematic review', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720001282', tier: 1 },
      { id: '8', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '9', text: 'Mental Health First Aid guidelines for psychosis', source: 'Mental Health First Aid International', year: '2019', link: 'https://mhfa.com.au/mental-health-first-aid-guidelines', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Your brother tells you the government has implanted a tracking device in his arm.
            Your mother says she's been receiving messages from God through the television.
            Your partner sits in silence, staring at the wall, unreachable. In each case, your
            instinct is the same: fix it. Argue the delusion away. Force a response from the
            silence. Insist on reality. And in each case, that instinct --- however loving --- is
            likely to make things
            worse <Citation id="1" index={1} source="Psychological Medicine" year="2019" tier={1} />.
            Communicating with someone experiencing psychosis requires different tools than
            those we use in ordinary conversation. Learning these tools doesn't mean giving
            up on the person. It means meeting them where they are.
          </p>
        </div>

        <h2 id="why-arguing-backfires" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Arguing Doesn't Work
        </h2>
        <p className="mb-6">
          When someone holds a delusional belief, it doesn't feel like a belief to them --- it
          feels like reality. The same way you "know" the sky is blue, they "know" the
          neighbors are spying. Challenging this conviction activates the same psychological
          defenses that protect any deeply held belief: the person doubles down, finds
          additional evidence, and interprets your disagreement as proof that you're either
          naive or part of the
          problem <Citation id="1" index={1} source="Psychological Medicine" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          This isn't stubbornness --- it's how delusional cognition works. The belief is
          maintained by a bias toward confirmatory evidence and away from disconfirmatory
          evidence. Presenting contrary evidence doesn't weaken the delusion; it's
          reinterpreted to fit the existing framework. The argument escalates, the
          relationship suffers, and the person feels more isolated and misunderstood.
        </p>

        <BeforeAfter
          before={{
            title: 'What We Instinctively Say',
            items: [
              '"That\'s not real --- nobody is watching you"',
              '"You need to snap out of this"',
              '"Take your medication right now"',
              '"You\'re not making any sense"',
              '"I\'ve told you a hundred times..."',
            ],
          }}
          after={{
            title: 'What Actually Helps',
            items: [
              '"That sounds really frightening. I want you to feel safe"',
              '"I can see you\'re going through something difficult"',
              '"What do you think might help right now?"',
              '"I want to understand --- can you tell me more?"',
              '"I\'m here with you, and I\'m not going anywhere"',
            ],
          }}
        />

        <h2 id="during-acute-episodes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          During Acute Episodes: De-Escalation Basics
        </h2>
        <p className="mb-6">
          When someone is acutely psychotic --- visibly distressed, disorganized, or agitated ---
          the communication goal shifts from therapeutic conversation to immediate safety
          and
          de-escalation <Citation id="4" index={4} source="Aggression and Violent Behavior" year="2020" tier={1} />.
          The following principles can help:
        </p>

        <ProgressSteps
          steps={[
            { title: 'Ensure safety first', description: 'Assess whether anyone is in immediate danger. If so, call emergency services. If not, focus on creating a calm, safe environment. Remove potential hazards, reduce stimulation (turn off the TV, dim lights), and position yourself near an exit without blocking theirs.' },
            { title: 'Lower your voice and slow down', description: 'Speak softly, slowly, and simply. Use the person\'s name. Avoid rapid-fire questions or complex explanations. Your calm tone communicates safety more than your words do --- people in acute psychosis often process emotional tone better than verbal content.' },
            { title: 'Validate the emotion, not the content', description: '"You seem really scared right now" validates their emotional experience without agreeing that the threat is real. This approach acknowledges their suffering without reinforcing the delusion.' },
            { title: 'Offer simple, concrete choices', description: '"Would you like to sit down?" "Can I get you a glass of water?" Simple offers of care ground the interaction in practical reality and give the person a sense of agency. Avoid open-ended questions during acute distress.' },
            { title: 'Know when to step back', description: 'If your presence is increasing agitation --- if you\'re being incorporated into the delusion as a threat --- it\'s okay to step back. Say "I\'m going to give you some space. I\'ll be in the next room if you need me." Leaving isn\'t abandonment; it\'s strategic compassion.' },
          ]}
        />

        <h2 id="ongoing-communication" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Ongoing Communication: The Long Game
        </h2>
        <p className="mb-6">
          Most communication with someone who has a psychotic condition doesn't happen during
          acute crises --- it happens in the daily, ordinary interactions that make up a
          relationship. Research on expressed emotion shows that the communication patterns
          families use every day predict relapse risk more powerfully than almost any other
          factor <Citation id="2" index={2} source="Psychological Medicine" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          Low expressed emotion --- characterized by warmth, acceptance, and appropriate
          boundaries --- doesn't mean suppressing your feelings. It means expressing them
          skillfully. You can say "I feel worried when you stop taking your medication"
          (an "I" statement expressing genuine concern) without saying "You always stop
          your medication" (a critical generalization that triggers
          defensiveness) <Citation id="5" index={5} source="British Journal of Psychiatry" year="2020" tier={1} />.
        </p>

        <ArticleCallout type="tip" title="The 5:1 Ratio">
          Relationship research suggests that stable relationships maintain approximately
          five positive interactions for every negative one. In families affected by
          psychosis, the ratio often inverts --- conversations become dominated by
          criticism, worry, and conflict. Deliberately increasing positive interactions ---
          shared meals, brief conversations about interests, simple expressions of
          affection --- rebuilds the relational foundation that makes difficult
          conversations
          possible <Citation id="6" index={6} source="Cochrane Database of Systematic Reviews" year="2020" tier={1} />.
        </ArticleCallout>

        <h2 id="medication-conversations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Talking About Medication and Treatment
        </h2>
        <p className="mb-6">
          Medication conversations are among the most fraught in psychosis care. The person
          may not believe they're ill, may have experienced unpleasant side effects, or may
          associate medication with loss of autonomy. Approaching these conversations as
          collaborative explorations rather than directives significantly improves
          outcomes <Citation id="7" index={7} source="Psychological Medicine" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Instead of "You need to take your medication," try "How do you feel about the
          medication?" Instead of "The doctor says you have to take it," try "What concerns
          do you have about it?" If the person identifies side effects, validate them:
          "Weight gain is a real side effect and it makes sense that it bothers you. Would
          you be open to talking to your doctor about alternatives?" This approach treats
          the person as a participant in their own care rather than a problem to be
          managed <Citation id="8" index={8} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
        </p>
        <p className="mb-6">
          And when all else fails --- when the conversation goes nowhere, when the person
          won't engage, when you've said everything and it hasn't landed --- remember that
          your continued presence is itself a communication. Showing up, maintaining the
          relationship, and keeping the door open for future conversations matters more
          than winning any single
          argument <Citation id="9" index={9} source="Mental Health First Aid International" year="2019" tier={3} />.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-032 | Caregiver Burnout in Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(32),
    slug: 'caregiver-burnout-psychosis-recognizing-preventing-recovering',
    status: 'published',
    title: 'Caregiver Burnout in Psychosis: Recognizing, Preventing, and Recovering',
    description: 'How caring for someone with psychosis affects caregiver mental and physical health --- the signs of burnout, evidence-based coping strategies, and why self-care isn\'t selfish.',
    image: '/images/articles/cat16/cover-032.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Caregiver Health', 'Burnout', 'Self-Care', 'Family Support'],

    summary: 'Caring for someone with a psychotic condition is one of the most demanding roles a person can inhabit --- and one of the least supported. Caregivers of people with schizophrenia report rates of depression, anxiety, and physical health problems that significantly exceed the general population. They provide an estimated 5--20 hours of informal care per week, manage crises without training, navigate complex service systems, and do so while processing their own grief, fear, and exhaustion. Yet mental health services have historically treated caregivers as resources to be utilized rather than people who deserve care in their own right. This article addresses caregiver burnout directly --- what it looks like, why it happens, and what evidence-based strategies can prevent or reverse it.',

    keyFacts: [
      { text: 'Approximately 40--60% of caregivers of people with schizophrenia meet criteria for clinically significant depression or anxiety', citationIndex: 1 },
      { text: 'Caregiver burden is associated with worse outcomes for the person with psychosis --- when caregivers burn out, everyone suffers', citationIndex: 2 },
      { text: 'Caregiver support programs reduce depression, anxiety, and subjective burden with moderate to large effect sizes', citationIndex: 3 },
      { text: 'Most caregivers receive no formal support, training, or assessment of their own needs from mental health services', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The airplane safety instruction --- put your own oxygen mask on first --- is a cliché because it\'s true. A caregiver who collapses from exhaustion can\'t help anyone. Self-care in this context isn\'t selfish; it\'s a prerequisite for sustainable caregiving. The evidence shows that when caregivers are supported, everyone in the family does better.',

    practicalExercise: {
      title: 'Caregiver Burnout Assessment',
      steps: [
        { title: 'Check your warning signs', description: 'Rate each on a 0--10 scale: physical exhaustion, emotional numbness or irritability, social isolation, resentment toward the person you care for, neglecting your own health, feeling trapped. If three or more are above 6, you are likely experiencing significant burnout.' },
        { title: 'Identify one thing to reclaim', description: 'Choose one activity you\'ve given up since becoming a caregiver --- a hobby, a friendship, regular exercise, a weekly outing. Make a concrete plan to reintroduce it this week, even in a small way. Reclaiming one piece of your pre-caregiving identity is therapeutic.' },
        { title: 'Set one boundary', description: 'Identify one area where you overfunction --- something you do that the person could do themselves, or something that crosses your personal limits. Practice saying: "I love you and I need to take care of myself too." Start with the easiest boundary first.' },
        { title: 'Connect with another caregiver', description: 'Join a support group --- NAMI\'s Family Support Group, an online community, or a local carers\' group. Speaking with someone who truly understands your experience is often described by caregivers as the single most helpful intervention.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Wellbeing',
    },

    citations: [
      { id: '1', text: 'Mental health of caregivers of people with schizophrenia: A systematic review and meta-analysis', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2020.03.030', tier: 1 },
      { id: '2', text: 'Caregiver burden and patient outcomes in schizophrenia: A bidirectional relationship', source: 'Psychological Medicine', year: '2019', link: 'https://doi.org/10.1017/S0033291719001648', tier: 1 },
      { id: '3', text: 'Psychosocial interventions for caregivers of people with psychosis: A systematic review and meta-analysis', source: 'World Psychiatry', year: '2021', link: 'https://doi.org/10.1002/wps.20878', tier: 1 },
      { id: '4', text: 'Unmet needs of caregivers of people with schizophrenia: A cross-national study', source: 'Social Psychiatry and Psychiatric Epidemiology', year: '2020', link: 'https://doi.org/10.1007/s00127-020-01887-3', tier: 1 },
      { id: '5', text: 'Grief and loss in caregivers of people with psychosis: A qualitative synthesis', source: 'Qualitative Health Research', year: '2019', link: 'https://doi.org/10.1177/1049732319847083', tier: 1 },
      { id: '6', text: 'Mindfulness-based interventions for caregivers of people with mental illness: A systematic review', source: 'Journal of Clinical Psychology', year: '2020', link: 'https://doi.org/10.1002/jclp.22918', tier: 1 },
      { id: '7', text: 'NAMI Family-to-Family: Outcomes of a peer-led family education program', source: 'Psychiatric Services', year: '2018', link: 'https://doi.org/10.1176/appi.ps.201700321', tier: 1 },
      { id: '8', text: 'Respite care for caregivers of people with severe mental illness: A systematic review', source: 'Journal of Psychiatric and Mental Health Nursing', year: '2019', link: 'https://doi.org/10.1111/jpm.12510', tier: 1 },
      { id: '9', text: 'Carers\' assessment and support: NICE guidance', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/ng150', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Nobody trains you for this. One day your child, partner, sibling, or parent
            develops psychosis, and suddenly you're managing medication schedules, interpreting
            bizarre behavior, fielding crisis calls, battling insurance companies, and holding
            the entire family together --- all while grieving the person you remember and trying
            to understand the person they've
            become <Citation id="5" index={5} source="Qualitative Health Research" year="2019" tier={1} />.
            Caregiver burnout in psychosis isn't a sign of weakness. It's the predictable
            consequence of extraordinary demands on ordinary human beings with insufficient
            support.
          </p>
        </div>

        <h2 id="what-burnout-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Caregiver Burnout Actually Looks Like
        </h2>
        <p className="mb-6">
          Burnout doesn't arrive suddenly. It accumulates --- a slow erosion of energy, empathy,
          and identity that many caregivers don't recognize until they're deeply in
          it <Citation id="1" index={1} source="Schizophrenia Research" year="2020" tier={1} />.
          The signs often include:
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Physical Signs',
              content: 'Chronic exhaustion that sleep doesn\'t resolve. Frequent illness from suppressed immunity. Neglecting your own medical appointments. Changes in appetite and weight. Persistent headaches, muscle tension, or gastrointestinal problems. Using alcohol or other substances to cope with stress.',
            },
            {
              label: 'Emotional Signs',
              content: 'Emotional numbness --- feeling nothing where you used to feel intensely. Irritability out of proportion to triggers. Resentment toward the person you\'re caring for --- followed by guilt about the resentment. Hopelessness about the future. Crying unexpectedly or being unable to cry at all.',
            },
            {
              label: 'Social Signs',
              content: 'Withdrawing from friends because you can\'t explain your life or because they don\'t understand. Canceling plans because you\'re too exhausted or worried about leaving. Losing interest in activities that used to bring joy. Feeling increasingly isolated even in company.',
            },
            {
              label: 'Identity Signs',
              content: 'Losing sight of who you are outside the caregiving role. Difficulty remembering what you enjoyed before this started. Defining yourself entirely by your relationship to the ill person. Feeling guilty about wanting your own life.',
            },
          ]}
        />

        <p className="mt-6 mb-6">
          These symptoms mirror those of clinical depression and anxiety disorders --- and
          for good reason. Chronic caregiving stress activates the same biological stress
          systems that underlie mood and anxiety disorders. The difference is that while
          people with depression often struggle to identify the source of their distress,
          burned-out caregivers know exactly what's wrong. They're exhausted from an
          objectively exhausting situation that shows no clear end.
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Caregivers with depression/anxiety' },
            { value: 15, suffix: 'hrs', label: 'Average weekly caregiving time' },
            { value: 3, suffix: '×', label: 'Higher risk of caregiver depression' },
          ]}
          source="Schizophrenia Research, 2020"
        />

        <h2 id="the-grief-factor" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Grief Nobody Talks About
        </h2>
        <p className="mb-6">
          Caregivers of people with psychosis often experience a form of grief that
          psychologists call "ambiguous loss" --- grief for someone who is still physically
          present but psychologically
          changed <Citation id="5" index={5} source="Qualitative Health Research" year="2019" tier={1} />.
          Parents grieve the child they raised --- the personality they knew, the future
          they imagined. Partners grieve the relationship they had. Siblings grieve the
          brother or sister they grew up with.
        </p>
        <p className="mb-6">
          This grief is complicated by the fact that the person is still alive. Society
          has rituals and support structures for bereavement --- but no equivalent for the
          grief of watching someone change before your eyes while being told to "stay
          positive" and "be supportive." Acknowledging this grief --- naming it, allowing
          it, sharing it with others who understand --- is not disloyalty to the person
          you love. It's an essential part of processing an extraordinarily difficult
          experience.
        </p>
        <p className="mb-6">
          Ambiguous loss is particularly painful because it doesn't resolve. The person
          is here but not here. They may have moments of complete clarity followed by
          episodes of complete unreachability. You can't grieve and move on because the
          loss isn't final --- yet you can't not grieve because the change is real. This
          ambiguity prevents closure and prolongs the psychological stress of unresolved
          grief <Citation id="5" index={5} source="Qualitative Health Research" year="2019" tier={1} />.
        </p>

        <QuoteBlock
          quote="I grieve my son every day, even though he's sitting right there. The boy who played soccer and had dreams of being an engineer — he's gone. And I'm supposed to just be grateful the person who replaced him is still alive."
          attribution="Mother of a young man with schizophrenia"
          role="Family caregiver"
          source="Qualitative Health Research, 2019"
          variant="large"
        />

        <h2 id="burden-bidirectional" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Caregiver Wellbeing Affects the Whole Family
        </h2>
        <p className="mb-6">
          Research shows that caregiver burnout doesn't just harm the caregiver --- it
          directly affects outcomes for the person with
          psychosis <Citation id="2" index={2} source="Psychological Medicine" year="2019" tier={1} />.
          This is not about blame. It's about understanding a bidirectional relationship
          that has profound implications for how we approach caregiver support.
        </p>
        <p className="mb-6">
          Burned-out caregivers show higher levels of expressed emotion --- criticism,
          hostility, and emotional over-involvement. This isn't because they're bad
          caregivers. It's because chronic stress depletes the emotional regulation
          capacity needed to remain warm and boundaried under constant pressure. And high
          expressed emotion is one of the strongest predictors of relapse in psychotic
          conditions. When caregivers burn out, relapse rates go up. When relapse rates
          go up, caregiver burden increases. The cycle perpetuates itself.
        </p>

        <ArticleCallout variant="insight" title="The Evidence Is Clear">
          <p className="mb-4">
            Studies tracking families over time show that when caregivers receive support ---
            psychoeducation, peer groups, respite care --- not only do the caregivers improve,
            but the person with psychosis also shows better outcomes: fewer hospitalizations,
            better medication adherence, and improved social
            functioning <Citation id="3" index={3} source="World Psychiatry" year="2021" tier={1} />.
          </p>
          <p>
            Taking care of yourself isn't a diversion from caring for your loved one. It's
            a prerequisite for it. A caregiver who collapses from exhaustion can't help
            anyone. A caregiver who maintains their own wellbeing creates the stable,
            supportive environment that recovery requires.
          </p>
        </ArticleCallout>

        <h2 id="evidence-based-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Strategies for Caregiver Wellbeing
        </h2>
        <p className="mb-6">
          Several interventions have strong evidence for reducing caregiver burden
          and improving
          wellbeing <Citation id="3" index={3} source="World Psychiatry" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Family Psychoeducation Programs',
              content: 'Structured programs like NAMI\'s Family-to-Family provide education about psychosis, communication skills, and peer support in an 8-week format. Research shows significant improvements in caregiver knowledge, coping strategies, and emotional distress. The peer-led format means you learn from people who have walked the same path --- not from clinicians who observe it from outside.',
            },
            {
              title: 'Mindfulness-Based Interventions',
              content: 'Adapted mindfulness programs for caregivers show reductions in anxiety, depression, and subjective burden. Even brief practices --- 10 minutes of guided mindfulness daily --- can reduce the chronic stress activation that drives burnout. The evidence suggests that mindfulness works not by changing the caregiving situation but by changing the caregiver\'s relationship to it.',
            },
            {
              title: 'Peer Support Groups',
              content: 'Regular connection with other caregivers who understand your experience reduces isolation and normalizes the emotions --- including anger, grief, and ambivalence --- that many caregivers feel ashamed of. Online groups can be particularly accessible for caregivers whose schedules make in-person meetings difficult.',
            },
            {
              title: 'Respite Care',
              content: 'Planned breaks from caregiving --- whether for hours, days, or weeks --- are associated with reduced burnout and sustained caregiving capacity over time. Respite isn\'t a luxury; it\'s a clinical intervention for the caregiver. Accessing it requires planning and often advocacy, but it\'s one of the most effective burnout prevention strategies available.',
            },
          ]}
        />

        <h2 id="practical-boundaries" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Setting Boundaries Without Guilt
        </h2>
        <p className="mb-6">
          One of the hardest parts of preventing caregiver burnout is setting boundaries ---
          limits on what you can and cannot do, and what you will and will not tolerate.
          Many caregivers feel that setting any boundary is abandonment. It's not. Boundaries
          protect the relationship and make long-term caregiving sustainable.
        </p>
        <p className="mb-6">
          Examples of healthy caregiver boundaries include: "I will help you manage your
          medication, but I won't call your doctor for you if you refuse to take it." "I'm
          happy to talk about your treatment, but I won't discuss it after 9 PM because I
          need to sleep." "I can visit twice a week, but I can't come every day." These
          boundaries aren't punitive. They're protective --- of your health, your other
          relationships, and the caregiving relationship itself.
        </p>

        <BeforeAfter
          before={{
            title: 'Boundary-less Caregiving',
            items: [
              'Available 24/7 for crisis calls',
              'Canceling work and personal plans unpredictably',
              'Doing everything the person could do themselves',
              'Never saying no out of guilt',
              'Sacrificing all personal time and interests',
            ],
          }}
          after={{
            title: 'Boundaried Caregiving',
            items: [
              'Designated crisis contact hours with backup plan',
              'Planned caregiving time with protected personal time',
              'Supporting independence for tasks they can do',
              'Clear, kind limits: "I want to help, and I can\'t do that"',
              'Regular self-care time treated as non-negotiable',
            ],
          }}
        />

        <h2 id="systemic-failures" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Systems Need to Change
        </h2>
        <p className="mb-6">
          The fact that most caregivers receive no formal support from mental health services
          represents a systemic
          failure <Citation id="4" index={4} source="Social Psychiatry and Psychiatric Epidemiology" year="2020" tier={1} />.
          Caregivers are routinely excluded from treatment discussions, denied information
          about their family member's care (often behind misapplied confidentiality policies),
          and treated as adjuncts to the patient rather than people with their own needs.
        </p>
        <p className="mb-6">
          NICE guidelines explicitly state that caregivers should receive their own assessment,
          be offered psychoeducation, and have access to
          support <Citation id="9" index={9} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
          If you are a caregiver and none of this has happened, you have the right to ask
          for it. And if asking doesn't work, organizations like NAMI, Rethink Mental Illness,
          and the Schizophrenia & Psychosis Action Alliance can help you advocate for the
          support you
          deserve <Citation id="7" index={7} source="Psychiatric Services" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          Advocacy at the system level matters too. When caregivers collectively demand
          better --- access to respite care, inclusion in treatment planning, training in
          communication and crisis management, their own mental health support --- services
          respond. Individual self-care is essential. But so is collective action to change
          systems that treat caregivers as infinite resources rather than human beings who
          need care themselves.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>40-60% of caregivers of people with psychosis experience clinically significant depression or anxiety --- burnout is common, not a personal failing</li>
            <li>Caregiver burnout directly affects outcomes for the person with psychosis --- supporting caregivers improves outcomes for everyone</li>
            <li>Evidence-based interventions (psychoeducation, peer support, mindfulness, respite care) significantly reduce caregiver burden</li>
            <li>Setting boundaries isn't abandonment --- it protects the relationship and makes sustainable caregiving possible</li>
            <li>Caregivers have the right to their own support, assessment, and care from mental health services --- advocacy may be needed to access it</li>
            <li>Ambiguous loss (grieving someone still alive but changed) is real and valid --- acknowledging it is healthy, not disloyal</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-033 | When Someone Refuses Treatment
  // --------------------------------------------------------------------------
  {
    id: catId(33),
    slug: 'when-someone-refuses-treatment-psychosis-what-families-can-do',
    status: 'published',
    title: 'When Someone Refuses Treatment for Psychosis: What Families Can Do',
    description: 'Navigating the agonizing situation when someone with psychosis refuses treatment --- understanding anosognosia, legal options, therapeutic engagement strategies, and when to seek involuntary evaluation.',
    image: '/images/articles/cat16/cover-033.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Treatment Refusal', 'Anosognosia', 'Family Support', 'Legal Rights'],

    summary: 'One of the most agonizing experiences for families of people with psychosis is watching someone they love refuse treatment --- not out of informed disagreement, but because the illness itself impairs their ability to recognize that they are ill. This phenomenon, called anosognosia, affects approximately 50% of people with schizophrenia and is not the same as denial. It is a neurological symptom --- damage to brain circuits responsible for self-awareness --- as real as any hallucination. When someone genuinely cannot perceive their own illness, the usual approaches to persuasion fail. This article explores what anosognosia is, why standard arguments for treatment don\'t work, what strategies can improve engagement, and when involuntary evaluation becomes appropriate.',

    keyFacts: [
      { text: 'Anosognosia --- the inability to recognize one\'s own illness --- affects approximately 50% of people with schizophrenia and 40% with bipolar disorder', citationIndex: 1 },
      { text: 'Anosognosia is a neurological symptom caused by impaired functioning of the prefrontal cortex, not psychological denial', citationIndex: 2 },
      { text: 'Motivational interviewing and LEAP (Listen, Empathize, Agree, Partner) approaches significantly improve treatment engagement compared to direct confrontation', citationIndex: 3 },
      { text: 'Involuntary treatment criteria vary by jurisdiction but generally require imminent danger to self or others or grave inability to care for oneself', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'Imagine having a brain injury that specifically damaged the part of your brain that lets you know you have a brain injury. That\'s anosognosia. The person isn\'t being difficult, stubborn, or in denial --- they genuinely cannot perceive what is happening to them, the same way a person with damage to their visual cortex cannot see.',

    practicalExercise: {
      title: 'The LEAP Approach to Engagement',
      steps: [
        { title: 'Listen reflectively', description: 'Set aside your agenda and genuinely listen to the person\'s perspective. What do they think is happening? What are their concerns? What do they want? Reflective listening doesn\'t mean agreeing --- it means demonstrating that you\'ve heard and understood their point of view.' },
        { title: 'Empathize strategically', description: 'Find the emotional truth in their experience. If they say "I don\'t need medication --- I\'m fine," empathize with the desire for autonomy: "I understand you want to make your own decisions about your body. That makes sense to me." This builds alliance rather than opposition.' },
        { title: 'Agree on common ground', description: 'Find something you genuinely agree on. You might both agree that sleep problems are an issue, that stress is difficult, or that side effects are unpleasant. Starting from agreement rather than disagreement changes the entire dynamic.' },
        { title: 'Partner on shared goals', description: 'Once you\'ve found common ground, partner on the agreed-upon concern: "Since we both agree sleep is a problem, would you be willing to talk to someone about that?" This opens a door to treatment without requiring the person to accept a diagnosis they can\'t perceive.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Explore the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'Anosognosia in schizophrenia: A meta-analysis of prevalence and correlates', source: 'Schizophrenia Bulletin', year: '2020', link: 'https://doi.org/10.1093/schbul/sbz120', tier: 1 },
      { id: '2', text: 'The neuroanatomy of anosognosia in schizophrenia: A systematic review and meta-analysis of neuroimaging studies', source: 'Neuroscience & Biobehavioral Reviews', year: '2019', link: 'https://doi.org/10.1016/j.neubiorev.2019.08.003', tier: 1 },
      { id: '3', text: 'Engagement strategies for treatment-resistant psychosis: A systematic review', source: 'Psychiatric Services', year: '2020', link: 'https://doi.org/10.1176/appi.ps.201900321', tier: 1 },
      { id: '4', text: 'Involuntary treatment in psychiatry: International perspectives and legal frameworks', source: 'The Lancet Psychiatry', year: '2021', link: 'https://doi.org/10.1016/S2215-0366(21)00263-4', tier: 1 },
      { id: '5', text: 'LEAP: A communication approach for families and clinicians (Amador, 2020)', source: 'LEAP Institute', year: '2020', link: 'https://www.leapinstitute.org', tier: 3 },
      { id: '6', text: 'Motivational interviewing for psychosis: A systematic review', source: 'Schizophrenia Research', year: '2019', link: 'https://doi.org/10.1016/j.schres.2019.03.016', tier: 1 },
      { id: '7', text: 'Assisted outpatient treatment: Outcomes and ethical considerations', source: 'Psychiatric Services', year: '2020', link: 'https://doi.org/10.1176/appi.ps.201900453', tier: 1 },
      { id: '8', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '9', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            "I'm not sick. There's nothing wrong with me. I don't need medication." For families
            of people with psychosis, these words --- spoken with absolute conviction by someone
            who is clearly unwell --- represent one of the most painful and confusing aspects of the
            illness. The instinct is to present evidence: "But you were just hospitalized." "The
            doctor said you have schizophrenia." "Don't you remember what happened?" And the
            evidence bounces off. Not because the person is stubborn. Not because they're in
            denial. But because a neurological symptom of their condition prevents them from
            perceiving their own
            illness <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="understanding-anosognosia" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Anosognosia: Not Denial, Not Stubbornness
        </h2>
        <p className="mb-6">
          Anosognosia --- from the Greek for "without knowledge of disease" --- is a neurological
          condition in which a person cannot perceive their own illness. It was first described
          in stroke patients who couldn't recognize their own paralysis, and it occurs in
          approximately 50% of people with
          schizophrenia <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Neuroimaging studies show that anosognosia in schizophrenia is associated with
          structural and functional changes in the prefrontal cortex --- the brain region
          responsible for self-monitoring, self-reflection, and updating self-related
          beliefs <Citation id="2" index={2} source="Neuroscience & Biobehavioral Reviews" year="2019" tier={1} />.
          In other words, the very brain circuitry needed to recognize "something is wrong
          with my thinking" is impaired by the condition that is wrong with their thinking.
        </p>
        <p className="mb-6">
          This isn't a metaphor. When researchers scan the brains of people with anosognosia,
          they see reduced activity in regions involved in error monitoring and self-appraisal.
          The person's brain literally cannot generate the signal that says "this belief I hold
          doesn't match reality." For families, this distinction between "won't" and "can't"
          is crucial. When you understand that the person genuinely cannot perceive their
          illness --- not that they're being stubborn or oppositional --- your emotional response
          shifts from frustration to compassion, and your strategies shift from confrontation
          to creative problem-solving.
        </p>

        <HighlightBox variant="stat">
          <p className="mb-4 font-semibold text-lg">50% of people with schizophrenia have anosognosia</p>
          <p className="mb-4">This means that in half of cases, the person genuinely cannot perceive that they have an illness --- making traditional treatment persuasion ineffective.</p>
          <p className="text-sm">Source: Schizophrenia Bulletin, 2020</p>
        </HighlightBox>

        <ArticleCallout variant="insight" title="Why This Distinction Matters">
          <p className="mb-4">
            When you understand anosognosia as a neurological symptom rather than a choice,
            your approach changes fundamentally. You stop arguing (because arguments target
            a brain function that isn't working). You stop feeling angry (because the person
            isn't choosing to resist). And you start looking for strategies that work around
            the impaired self-awareness rather than trying to force it
            back <Citation id="5" index={5} source="LEAP Institute" year="2020" tier={3} />.
          </p>
          <p>
            This doesn't mean giving up on treatment. It means recognizing that the path to
            engagement requires meeting the person where they are, building trust, and finding
            entry points that don't require them to accept a diagnosis they neurologically
            cannot perceive.
          </p>
        </ArticleCallout>

        <h2 id="engagement-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Strategies That Improve Engagement
        </h2>
        <p className="mb-6">
          When someone can't perceive their illness, traditional arguments for treatment are
          useless. But alternative approaches can significantly improve
          engagement <Citation id="3" index={3} source="Psychiatric Services" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          headers={['Approach', 'How It Works', 'Evidence']}
          rows={[
            ['LEAP (Listen, Empathize, Agree, Partner)', 'Build alliance around shared goals rather than requiring illness acceptance', 'Developed by Dr. Xavier Amador; widely used in clinical practice'],
            ['Motivational Interviewing', 'Explore ambivalence non-judgmentally, support self-efficacy, elicit the person\'s own reasons for change', 'Systematic review shows improved engagement and adherence'],
            ['Problem-focused framing', '"You\'ve been having trouble sleeping --- would you talk to someone about that?" bypasses the diagnosis debate', 'Clinical practice evidence; recommended in NICE guidelines'],
            ['Offering choices', '"Would you prefer to talk to a counselor or a doctor?" preserves autonomy while moving toward treatment', 'Shared decision-making literature supports this approach'],
          ]}
        />

        <p className="mt-6 mb-6">
          The common thread across these approaches is that none of them requires the person
          to accept a diagnosis. They work with whatever the person does recognize --- sleep
          problems, stress, difficulty at work, relationship conflict --- and use that
          acknowledged concern as the entry point for
          treatment <Citation id="6" index={6} source="Schizophrenia Research" year="2019" tier={1} />.
        </p>

        <h2 id="practical-examples" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          LEAP in Action: Real Conversations
        </h2>
        <p className="mb-6">
          The LEAP approach (Listen, Empathize, Agree, Partner) can feel abstract until you
          see it in action. Here are examples of how these principles transform difficult
          conversations about treatment:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
            <p className="font-semibold text-red-900 dark:text-red-100 mb-2">Ineffective: Diagnosis-Focused</p>
            <p className="text-red-800 dark:text-red-200 mb-2">"You have schizophrenia. You need to take your medication or you'll get worse."</p>
            <p className="text-sm text-red-700 dark:text-red-300">This requires the person to accept a diagnosis they cannot perceive. Triggers defensiveness and disengagement.</p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
            <p className="font-semibold text-green-900 dark:text-green-100 mb-2">Effective: LEAP Approach</p>
            <p className="text-green-800 dark:text-green-200 mb-2">"I've noticed you haven't been sleeping well lately. (Listen) That must be exhausting. (Empathize) We both want you to feel better. (Agree) Would you be willing to talk to someone who might help with the sleep issue? (Partner)"</p>
            <p className="text-sm text-green-700 dark:text-green-300">Builds on the person's acknowledged concern (poor sleep), doesn't require illness acceptance, preserves autonomy.</p>
          </div>
        </div>

        <p className="mb-6">
          The key is patience and flexibility. If the person rejects medication language,
          try wellness language. If they won't see a "psychiatrist," would they see a
          "sleep specialist" or "stress counselor"? The goal isn't semantic trickery ---
          it's finding frames that the person can engage with given their current level
          of insight <Citation id="3" index={3} source="Psychiatric Services" year="2020" tier={1} />.
        </p>

        <h2 id="when-safety-is-at-risk" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Safety Is at Risk: Involuntary Evaluation
        </h2>
        <p className="mb-6">
          Most families agonize over the question of involuntary treatment. It feels like a
          betrayal --- calling the police or petitioning a court to force treatment on someone
          you love. But when someone is at imminent risk of harming themselves or others, or
          has deteriorated to the point where they cannot meet their own basic needs,
          involuntary evaluation may be
          necessary <Citation id="4" index={4} source="The Lancet Psychiatry" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          Legal criteria for involuntary treatment vary by jurisdiction but generally require
          at least one of: imminent danger to self, imminent danger to others, or grave
          disability (inability to provide for basic needs like food, shelter, and safety).
          The process typically involves a psychiatric evaluation, a legal hearing within
          a specified timeframe, and the right to legal representation.
        </p>

        <ArticleCallout type="warning" title="Before Calling Emergency Services">
          If the situation is not immediately dangerous, consider calling a mental health
          crisis line first rather than emergency services. Crisis teams are specifically
          trained in de-escalation and can often facilitate evaluation without police
          involvement, which can traumatize the person and escalate the situation. In
          the US, the 988 Suicide and Crisis Lifeline connects to local crisis services.
          In the UK, Crisis Resolution and Home Treatment teams can often
          respond <Citation id="8" index={8} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
        </ArticleCallout>

        <h2 id="the-long-view" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Long View: Treatment Engagement Is a Process
        </h2>
        <p className="mb-6">
          For many families, treatment engagement happens not through a single breakthrough
          conversation but through a gradual, iterative process that unfolds over months or
          years. The person may accept treatment during a crisis, then stop when they feel
          better. They may try medication, experience side effects, and refuse to try again.
          They may engage with one clinician and reject another.
        </p>
        <p className="mb-6">
          Through all of this, maintaining the relationship is the most important thing a
          family can
          do <Citation id="9" index={9} source="National Institute of Mental Health" year="2024" tier={2} />.
          A relationship built on consistent, non-coercive engagement keeps the door open
          for future treatment. A relationship destroyed by repeated confrontation closes
          it. The question isn't "How do I make them accept treatment today?" but "How do I
          maintain the connection that makes treatment possible whenever they're ready?"
        </p>
        <p className="mb-6">
          Some people with anosognosia eventually develop partial insight --- often after
          years of stability on treatment they initially refused. Some never do. But in
          both cases, the families who navigate this with the least damage to the relationship
          are those who learned early to work with anosognosia rather than against it, to
          prioritize connection over correction, and to see treatment refusal not as
          stubbornness but as a symptom requiring compassion and creativity.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Anosognosia affects 50% of people with schizophrenia --- it's a neurological symptom, not denial or stubbornness</li>
            <li>Arguing with someone who has anosognosia strengthens resistance rather than building insight</li>
            <li>LEAP (Listen, Empathize, Agree, Partner) and motivational interviewing bypass the need for illness acceptance</li>
            <li>Problem-focused framing ("sleep issues") opens doors that diagnosis-focused language closes</li>
            <li>Involuntary evaluation criteria require imminent danger or grave disability --- jurisdiction varies</li>
            <li>Maintaining the relationship over time matters more than winning any single treatment argument</li>
            <li>Treatment engagement is a process, often unfolding over months or years, not a one-time event</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-034 | Housing and Independent Living With Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(34),
    slug: 'housing-independent-living-psychosis-options-support',
    status: 'published',
    title: 'Housing and Independent Living With Psychosis: Options and Support',
    description: 'A practical guide to housing options for people with psychotic conditions --- from supported housing to independent living, including how to access services and maintain stable accommodation.',
    image: '/images/articles/cat16/cover-034.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Housing', 'Independent Living', 'Practical Guide', 'Recovery'],

    summary: 'Stable housing is not just a practical necessity for people with psychosis --- it is a clinical intervention. Research consistently shows that housing stability is among the strongest predictors of psychiatric stability, treatment engagement, and recovery. Yet people with psychotic conditions face enormous barriers to obtaining and maintaining housing: discrimination, poverty, the cycling between hospitals and streets, and a chronic shortage of supportive housing options. This article maps the housing landscape for people with psychotic conditions --- from crisis accommodation to fully independent living --- and provides practical guidance on accessing housing services, understanding your rights, and building the skills and support systems that make independent living sustainable.',

    keyFacts: [
      { text: 'People with schizophrenia are approximately 10 times more likely to experience homelessness than the general population', citationIndex: 1 },
      { text: 'Housing First programs --- providing housing without preconditions --- achieve housing retention rates of 80--90% for people with serious mental illness', citationIndex: 2 },
      { text: 'Stable housing is associated with reduced hospitalization, improved medication adherence, and better psychiatric outcomes', citationIndex: 3 },
      { text: 'Fair housing laws in most countries prohibit discrimination based on mental health disability in housing applications', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The old model said: get treatment, achieve stability, earn housing. Housing First says: provide housing, then everything else becomes possible. When you\'re not sleeping under a bridge, you can make your appointments. When you have a door that locks, you can feel safe enough to take medication. Housing isn\'t the reward for recovery --- it\'s the foundation.',

    practicalExercise: {
      title: 'Assessing Housing Readiness and Needs',
      steps: [
        { title: 'Identify your current housing situation', description: 'Where are you living now? Is it safe? Stable? Affordable? If any of these answers is "no," you may benefit from housing support services. Be honest with yourself and your treatment team about housing concerns.' },
        { title: 'Determine your support level', description: 'What level of support do you need to live successfully? This isn\'t about judgment --- it\'s about finding the right fit. Do you need help with medication reminders? Cooking? Budgeting? Crisis response? The answer determines which housing option will work best.' },
        { title: 'Contact your local housing authority', description: 'Ask about Section 8/Housing Choice Vouchers (US), social housing applications (UK), or equivalent programs in your country. Wait lists can be long, so applying early --- even before you urgently need it --- is strategic.' },
        { title: 'Know your rights', description: 'Landlords cannot legally refuse to rent to you based on a mental health diagnosis in most jurisdictions. If you suspect discrimination, contact a disability rights organization. You have the right to reasonable accommodations such as modified lease terms or flexible notice periods.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Housing Goals',
    },

    citations: [
      { id: '1', text: 'Homelessness and mental illness: A systematic review of prevalence studies', source: 'Canadian Journal of Psychiatry', year: '2019', link: 'https://doi.org/10.1177/0706743719827867', tier: 1 },
      { id: '2', text: 'Housing First for people with severe mental illness: A systematic review and meta-analysis', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30107-0', tier: 1 },
      { id: '3', text: 'The relationship between housing and mental health outcomes: A systematic review', source: 'Social Psychiatry and Psychiatric Epidemiology', year: '2019', link: 'https://doi.org/10.1007/s00127-019-01692-3', tier: 1 },
      { id: '4', text: 'Fair Housing Act and disability rights: Mental health protections', source: 'U.S. Department of Housing and Urban Development', year: '2024', link: 'https://www.hud.gov/program_offices/fair_housing_equal_opp', tier: 2 },
      { id: '5', text: 'Supported housing for people with severe mental illness: A Cochrane review', source: 'Cochrane Database of Systematic Reviews', year: '2018', link: 'https://doi.org/10.1002/14651858.CD000453.pub4', tier: 1 },
      { id: '6', text: 'Independent living skills training for people with schizophrenia: A systematic review', source: 'Psychiatric Rehabilitation Journal', year: '2020', link: 'https://doi.org/10.1037/prj0000414', tier: 1 },
      { id: '7', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
      { id: '8', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Without a stable place to live, recovery from psychosis is nearly impossible. You
            can't take medication consistently if you have no secure place to store it. You
            can't attend therapy appointments if you don't know where you'll sleep tonight.
            You can't focus on rehabilitation if you're in survival
            mode <Citation id="3" index={3} source="Social Psychiatry and Psychiatric Epidemiology" year="2019" tier={1} />.
            Yet the intersection of psychosis and housing remains one of the most
            poorly addressed areas in mental health care --- a space where clinical needs,
            social policy, and individual rights collide in ways that too often leave
            people without the foundation they need.
          </p>
        </div>

        <h2 id="housing-continuum" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Housing Continuum: Options at Every Support Level
        </h2>
        <p className="mb-6">
          Housing options for people with psychotic conditions exist on a spectrum from
          most intensive to most
          independent <Citation id="5" index={5} source="Cochrane Database of Systematic Reviews" year="2018" tier={1} />:
        </p>

        <ProgressSteps
          steps={[
            { title: 'Crisis and Respite Housing', description: 'Short-term accommodation during or immediately after a psychiatric crisis. Provides stability and safety while longer-term plans are made. Stay is typically days to weeks.' },
            { title: 'Residential Treatment Facilities', description: 'Structured group settings with 24-hour staffing, medication management, daily activities, and therapeutic programming. Appropriate during periods of acute instability or when intensive skill-building is needed.' },
            { title: 'Supported Housing (Staff on-site)', description: 'Group homes or shared living arrangements with regular staff support. Residents have their own rooms and share common areas. Staff assist with medication, cooking, budgeting, and crisis response.' },
            { title: 'Supported Housing (Floating support)', description: 'Independent apartments with regular visits from support workers. The person lives independently but has scheduled check-ins and access to crisis support. This is the most common model for people who are stable but need some ongoing assistance.' },
            { title: 'Fully Independent Housing', description: 'The person lives independently in their own apartment or house, managing their own tenancy. They may use community mental health services but don\'t receive housing-specific support. This is the goal for many --- and a realistic one with adequate preparation.' },
          ]}
        />

        <h2 id="housing-first" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Housing First: The Evidence-Based Paradigm Shift
        </h2>
        <p className="mb-6">
          The Housing First model --- originally developed for people experiencing homelessness
          and mental illness --- represents a fundamental shift in how housing is provided. The
          traditional approach required people to demonstrate "housing readiness" --- sobriety,
          treatment compliance, stable symptoms --- before being offered permanent housing.
          Housing First eliminates these
          preconditions <Citation id="2" index={2} source="The Lancet Psychiatry" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          The evidence is compelling. Housing First programs achieve housing retention rates
          of 80--90% --- dramatically higher than traditional approaches. Participants show
          improvements in psychiatric symptoms, substance use, and quality of life. And
          counterintuitively, providing housing without preconditions often leads to
          greater treatment engagement, not less --- because the stability of housing
          creates the conditions under which treatment becomes possible.
        </p>

        <StatCard
          stats={[
            { value: 85, suffix: '%', label: 'Housing retention in Housing First' },
            { value: 10, suffix: '×', label: 'Higher homelessness risk with psychosis' },
            { value: 30, suffix: '%', label: 'Reduction in emergency department use' },
          ]}
          source="The Lancet Psychiatry, 2020; Canadian Journal of Psychiatry, 2019"
        />

        <h2 id="building-skills" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building Independent Living Skills
        </h2>
        <p className="mb-6">
          For many people with psychosis, the cognitive symptoms of their condition --- difficulties
          with planning, organization, memory, and problem-solving --- make independent living
          challenging even when symptoms are well
          managed <Citation id="6" index={6} source="Psychiatric Rehabilitation Journal" year="2020" tier={1} />.
          Independent living skills programs address this by teaching and practicing specific
          competencies: budgeting and financial management, meal planning and cooking, medication
          management, household maintenance, using public transportation, and navigating
          administrative tasks (paying bills, communicating with landlords).
        </p>
        <p className="mb-6">
          The most effective programs use compensatory strategies --- external supports that
          bypass cognitive deficits rather than trying to remediate them. Automatic bill
          payments, medication organizers with alarms, visual checklists for household tasks,
          and simplified cooking methods all reduce the cognitive load of daily living.
          Technology can help: smartphone reminders, grocery delivery apps, and banking
          apps with spending alerts make independent management more
          accessible <Citation id="7" index={7} source="National Institute of Mental Health" year="2024" tier={2} />.
        </p>

        <ArticleCallout variant="tip" title="Maintaining Your Housing">
          <p className="mb-4">
            The most common reasons people with psychosis lose housing are: rent arrears (often
            related to financial management difficulties), neighbor complaints (often related
            to symptoms), and lease violations (often related to crisis behaviors). Proactive
            communication with your landlord --- ideally through a support worker who can mediate ---
            and having a crisis plan that doesn't involve property damage or noise disturbance
            can prevent many of these
            situations <Citation id="8" index={8} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
          </p>
          <p>
            If you're at risk of losing your housing, contact your local housing authority or
            a mental health advocacy organization immediately. Emergency housing assistance,
            eviction prevention programs, and legal aid may be available. Don't wait until
            you've received an eviction notice --- early intervention is far more effective.
          </p>
        </ArticleCallout>

        <h2 id="navigating-system" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Navigating the Housing System
        </h2>
        <p className="mb-6">
          Accessing stable, affordable housing when you have a psychotic condition requires
          navigating a complex web of programs, waiting lists, eligibility criteria, and
          bureaucratic barriers. The process can be overwhelming, especially when cognitive
          symptoms make paperwork and phone calls difficult. Here's what you need to know:
        </p>

        <ComparisonTable
          headers={['Program', 'What It Provides', 'How to Access']}
          rows={[
            ['Section 8 / Housing Choice Voucher (US)', 'Rental assistance --- you pay 30% of income, voucher covers rest', 'Apply through local Public Housing Authority; long waiting lists common'],
            ['Social Housing (UK)', 'Council or housing association properties at below-market rent', 'Apply through local council housing department; priority given to those in greatest need'],
            ['Supportive Housing Programs', 'Permanent housing + wraparound support services', 'Contact local mental health center or 211 helpline for referrals'],
            ['Transitional Housing', 'Time-limited housing (6-24 months) with intensive support', 'Mental health agencies, homeless services, or hospitals can refer'],
          ]}
        />

        <p className="mt-6 mb-6">
          Many people find the housing system inaccessible without help. If possible, work
          with a case manager, social worker, or peer specialist who can navigate the system
          with you. These professionals know which programs have capacity, how to frame
          applications for best chances of approval, and how to appeal denials. You don't
          have to do this alone.
        </p>

        <h2 id="rights-protections" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Your Rights and Legal Protections
        </h2>
        <p className="mb-6">
          Fair housing laws in most jurisdictions prohibit discrimination based on mental
          health disability. This means landlords cannot legally refuse to rent to you,
          evict you, or impose different terms solely because you have
          psychosis <Citation id="4" index={4} source="U.S. Department of Housing and Urban Development" year="2024" tier={2} />.
          You also have the right to reasonable accommodations --- modifications to rules
          or procedures that enable you to use and enjoy your housing.
        </p>
        <p className="mb-6">
          Examples of reasonable accommodations include: allowing an emotional support
          animal even in no-pet housing; requesting a specific unit (ground floor, away
          from noise) if your symptoms are triggered by certain environments; requesting
          flexible payment schedules if cognitive symptoms make it hard to remember due
          dates; and asking for communication in writing rather than phone calls if
          auditory processing is impaired.
        </p>
        <p className="mb-6">
          If you believe you've experienced housing discrimination, contact a disability
          rights organization or fair housing center. In the US, you can file complaints
          with HUD (Department of Housing and Urban Development). In the UK, the Equality
          and Human Rights Commission handles discrimination claims. Don't assume refusals
          or evictions are legal just because someone in authority says they are ---
          get informed advice.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>People with psychosis are 10 times more likely to experience homelessness --- stable housing is a clinical intervention, not just a social issue</li>
            <li>Housing First programs provide housing without preconditions and achieve 80-90% retention rates</li>
            <li>The housing continuum ranges from 24-hour staffed facilities to fully independent living --- match support level to current needs</li>
            <li>Independent living skills programs teach compensatory strategies that bypass cognitive deficits</li>
            <li>Fair housing laws prohibit discrimination based on mental health disability --- landlords cannot refuse to rent based on diagnosis</li>
            <li>Reasonable accommodations (modified rules, specific units, flexible payments) are legal rights, not favors</li>
            <li>Navigating the housing system is complex --- work with a case manager or advocate when possible</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-035 | Psychosis and the Criminal Justice System
  // --------------------------------------------------------------------------
  {
    id: catId(35),
    slug: 'psychosis-criminal-justice-system-rights-diversion-support',
    status: 'published',
    title: 'Psychosis and the Criminal Justice System: Rights, Diversion, and Support',
    description: 'How people with psychosis interact with the criminal justice system --- the overrepresentation problem, diversion programs, legal rights, and what families need to know.',
    image: '/images/articles/cat16/cover-035.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Criminal Justice', 'Rights', 'Diversion', 'Advocacy'],

    summary: 'People with psychotic conditions are dramatically overrepresented in the criminal justice system --- not because psychosis causes crime, but because a cascade of systemic failures channels people with untreated mental illness toward incarceration rather than treatment. Inadequate community mental health services, the criminalization of behaviors driven by untreated symptoms, and police encounters that escalate rather than de-escalate create a pipeline from hospital closures to jail cells. Meanwhile, the violence risk associated with psychosis --- massively overstated by media --- is far smaller than the risk of people with psychosis being victims of violence. This article examines how people with psychosis end up in the criminal justice system, what their legal rights are, how mental health courts and diversion programs work, and what families can do when a loved one faces criminal charges.',

    keyFacts: [
      { text: 'People with serious mental illness are 10 times more likely to be in jail or prison than in a state psychiatric hospital in the US', citationIndex: 1 },
      { text: 'The attributable risk of violence due to psychosis alone (without substance use) is approximately 3--5% --- the vast majority of violent acts are committed by people without mental illness', citationIndex: 2 },
      { text: 'Mental health courts reduce recidivism by approximately 20% compared to standard criminal processing', citationIndex: 3 },
      { text: 'People with psychosis are 14 times more likely to be victims of violent crime than to be perpetrators', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The largest providers of mental health care in the United States are not hospitals --- they are jails and prisons. Cook County Jail, Los Angeles County Jail, and Rikers Island each house more people with serious mental illness than any psychiatric hospital in the country. This is not a criminal justice problem. It is a mental health system failure.',

    practicalExercise: {
      title: 'Preparing for Criminal Justice Contact',
      steps: [
        { title: 'Create a crisis card', description: 'Prepare a wallet-sized card that includes: diagnosis, current medications, prescribing psychiatrist\'s name and phone number, emergency contact, and the statement: "I have a mental health condition. Please contact my treatment team." Laminate it and keep it accessible.' },
        { title: 'Know your local crisis services', description: 'Identify alternatives to police for mental health crises: crisis hotlines (988 in the US), mobile crisis teams, crisis stabilization units. Have these numbers saved in your phone and posted at home.' },
        { title: 'Identify legal resources', description: 'Research mental health legal aid in your area. Organizations like the Treatment Advocacy Center, NAMI, and disability rights organizations can provide guidance if criminal charges arise.' },
        { title: 'Ask about diversion programs', description: 'If a family member is arrested, immediately ask whether a mental health court, diversion program, or pre-booking diversion is available in your jurisdiction. These programs route people toward treatment rather than incarceration.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Explore the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'The treatment of persons with mental illness in prisons and jails: A state survey', source: 'Treatment Advocacy Center', year: '2022', link: 'https://www.treatmentadvocacycenter.org', tier: 3 },
      { id: '2', text: 'Violence and mental disorders: Data and public policy', source: 'Annual Review of Clinical Psychology', year: '2019', link: 'https://doi.org/10.1146/annurev-clinpsy-050718-095710', tier: 1 },
      { id: '3', text: 'Mental health courts: A systematic review and meta-analysis of outcomes', source: 'Criminal Justice and Behavior', year: '2020', link: 'https://doi.org/10.1177/0093854820904495', tier: 1 },
      { id: '4', text: 'Victimization of people with severe mental illness: A systematic review and meta-analysis', source: 'Schizophrenia Bulletin', year: '2019', link: 'https://doi.org/10.1093/schbul/sby189', tier: 1 },
      { id: '5', text: 'Crisis Intervention Team (CIT) training for police: A systematic review', source: 'Psychiatric Services', year: '2020', link: 'https://doi.org/10.1176/appi.ps.201900403', tier: 1 },
      { id: '6', text: 'Deinstitutionalization and its consequences: A 50-year retrospective', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30277-7', tier: 1 },
      { id: '7', text: 'Sequential Intercept Model: Community-based responses to justice-involved people with mental illness', source: 'Psychiatric Services', year: '2019', link: 'https://doi.org/10.1176/appi.ps.201800348', tier: 1 },
      { id: '8', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            In the 1960s, the United States began closing its state psychiatric hospitals ---
            a process called deinstitutionalization --- with the promise that community-based
            mental health services would replace them. The hospitals closed. The community
            services never fully materialized. The result, decades later, is a system in
            which jails and prisons have become the de facto mental health institutions of
            last
            resort <Citation id="6" index={6} source="The Lancet Psychiatry" year="2020" tier={1} />.
            Understanding how this happened --- and what can be done about it --- matters for
            anyone whose loved one with psychosis might come into contact with the criminal
            justice system.
          </p>
        </div>

        <h2 id="overrepresentation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Overrepresentation Problem
        </h2>
        <p className="mb-6">
          The numbers are stark. Approximately 15--20% of people in US jails and prisons have
          a serious mental illness --- compared to approximately 4% of the general population.
          People with serious mental illness are 10 times more likely to be incarcerated than
          to be receiving treatment in a state psychiatric
          hospital <Citation id="1" index={1} source="Treatment Advocacy Center" year="2022" tier={3} />.
        </p>
        <p className="mb-6">
          This overrepresentation doesn't reflect a link between psychosis and criminality.
          It reflects a series of systemic failures: untreated psychosis leads to behaviors
          (public disturbance, trespassing, petty theft to survive) that trigger police
          response. Police lack training and alternatives for de-escalation. Emergency
          departments refuse psychiatric admissions for non-dangerous individuals. And the
          revolving door spins: hospital to street to jail, repeat.
        </p>

        <ArticleChart
          type="bar"
          data={[
            { label: 'In jails/prisons', value: 383000 },
            { label: 'In state psychiatric hospitals', value: 35000 },
          ]}
          title="People with serious mental illness in US carceral vs. hospital settings"
          source="Treatment Advocacy Center, 2022"
        />

        <h2 id="violence-myth" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Violence Myth: Victims, Not Perpetrators
        </h2>
        <p className="mb-6">
          Media portrayals consistently link psychosis with violence --- and this misconception
          has real consequences for how people with psychotic conditions are treated by the
          justice system and society. The actual evidence tells a very different
          story <Citation id="2" index={2} source="Annual Review of Clinical Psychology" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          When substance use is controlled for, the attributable risk of violence due to
          psychosis alone is approximately 3--5%. The vast majority of violent acts in society
          are committed by people without mental illness. Meanwhile, people with psychosis
          are 14 times more likely to be victims of violent crime --- assault, robbery, sexual
          violence --- than to be
          perpetrators <Citation id="4" index={4} source="Schizophrenia Bulletin" year="2019" tier={1} />.
          They are among the most victimized populations in society, yet public discourse
          consistently frames them as threats rather than vulnerable people in need of
          protection.
        </p>

        <ArticleCallout type="info" title="Diversion at Every Stage">
          The Sequential Intercept
          Model <Citation id="7" index={7} source="Psychiatric Services" year="2019" tier={1} />
          identifies five points where people with mental illness can be diverted from the
          criminal justice system to treatment: before police contact (community services),
          during police contact (CIT training), during booking (jail diversion), in court
          (mental health courts), and during reentry (community supervision with treatment).
          Each intercept represents an opportunity to redirect someone from incarceration
          to care.
        </ArticleCallout>

        <h2 id="crisis-intervention" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Crisis Intervention Teams: Changing Police Response
        </h2>
        <p className="mb-6">
          Crisis Intervention Team (CIT) training --- a 40-hour program that teaches law
          enforcement officers to recognize mental health crises and de-escalate rather
          than arrest --- has been implemented in communities across the United
          States <Citation id="5" index={5} source="Psychiatric Services" year="2020" tier={1} />.
          CIT-trained officers are more likely to connect people to mental health services
          and less likely to use force or make arrests for behaviors driven by mental illness.
        </p>
        <p className="mb-6">
          Co-responder models --- where a mental health professional accompanies police to
          mental health calls --- go further, providing on-scene clinical assessment and
          direct connection to treatment. Some jurisdictions have implemented non-police
          crisis response entirely: trained mental health professionals responding to
          crisis calls without law enforcement involvement. These models show promising
          results in reducing arrests, injuries, and emergency department visits.
        </p>
        <p className="mb-6">
          However, CIT training availability varies widely. Not all jurisdictions offer
          it, and even where it exists, not all officers receive it. When calling for
          help during a mental health crisis, ask the dispatcher to send CIT-trained
          officers if available. If you have time before the crisis, research your local
          police department's mental health response capabilities so you know what to
          expect and request.
        </p>

        <StatCard
          stats={[
            { value: 14, suffix: '×', label: 'More likely to be victims than perpetrators' },
            { value: 10, suffix: '×', label: 'More likely in jail than hospital' },
            { value: 20, suffix: '%', label: 'Reduced recidivism with mental health courts' },
          ]}
          source="Schizophrenia Bulletin, 2019; Treatment Advocacy Center, 2022; Criminal Justice and Behavior, 2020"
        />

        <h2 id="mental-health-courts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Mental Health Courts and Diversion Programs
        </h2>
        <p className="mb-6">
          Mental health courts are specialized court dockets that offer treatment-based
          alternatives to incarceration for people with mental illness charged with certain
          offenses. Instead of jail or prison, participants receive intensive case
          management, treatment services, and regular court monitoring. Successful
          completion typically results in reduced or dismissed
          charges <Citation id="3" index={3} source="Criminal Justice and Behavior" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Research shows mental health courts reduce recidivism by approximately 20%
          compared to standard criminal processing. They also improve treatment engagement,
          housing stability, and quality of life for participants. However, eligibility
          is often limited to non-violent offenses, and capacity constraints mean many
          jurisdictions have waiting lists or strict admission criteria.
        </p>
        <p className="mb-6">
          Pre-booking diversion programs --- which divert people to treatment before
          charges are filed --- may be even more effective because they prevent a criminal
          record entirely. If your family member is arrested, immediately ask about all
          diversion options available in your jurisdiction. A mental health advocate or
          defense attorney can help navigate the system.
        </p>

        <h2 id="what-families-can-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Families Can Do
        </h2>
        <p className="mb-6">
          If a family member with psychosis is arrested, immediate steps
          include <Citation id="8" index={8} source="National Institute of Mental Health" year="2024" tier={2} />:
          informing the arresting officers and jail staff of the mental health diagnosis and
          current medications; requesting that the person be seen by jail mental health
          services as quickly as possible; contacting a mental health-informed defense
          attorney; asking whether a mental health court or diversion program is available;
          and connecting with organizations like NAMI's helpline for guidance specific to
          your jurisdiction.
        </p>
        <p className="mb-6">
          Prevention is equally important. Having a crisis plan that identifies alternatives
          to police --- crisis hotlines, mobile crisis teams, crisis stabilization centers ---
          can prevent criminal justice involvement entirely. Some communities offer voluntary
          crisis registries where families can pre-register information about a person's
          mental health condition so that responding officers arrive informed rather than
          uninformed. The goal isn't to excuse illegal behavior --- it's to ensure that
          behavior driven by illness is met with treatment rather than punishment.
        </p>

        <h2 id="advocacy-reform" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Need for System Reform
        </h2>
        <p className="mb-6">
          The criminalization of mental illness isn't inevitable. It's the result of
          specific policy choices: the closure of psychiatric hospitals without adequate
          community alternatives, the underfunding of mental health services, the
          militarization of police responses to public health crises, and the use of
          jails as default holding facilities when no other options exist. These choices
          can be reversed.
        </p>
        <p className="mb-6">
          Effective reforms include: expanding mobile crisis teams and non-police crisis
          response; funding mental health courts and diversion programs adequately to meet
          demand; requiring CIT training for all officers; creating more crisis stabilization
          beds and psychiatric hospital capacity; and strengthening community mental health
          services so crises are prevented rather than managed after the fact. Individual
          families navigating the system need immediate help. But the system itself needs
          fundamental change.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>People with serious mental illness are 10× more likely to be in jail than in a psychiatric hospital --- a system failure, not a crime problem</li>
            <li>The violence risk from psychosis alone is 3-5% --- people with psychosis are 14× more likely to be victims than perpetrators</li>
            <li>Mental health courts reduce recidivism by 20% by offering treatment instead of incarceration</li>
            <li>Crisis Intervention Team training teaches police to de-escalate and divert rather than arrest</li>
            <li>The Sequential Intercept Model identifies five diversion points from arrest to reentry --- each is an opportunity for treatment</li>
            <li>Families should immediately inform jail staff of diagnosis/medications, request jail mental health services, and ask about diversion programs</li>
            <li>Prevention strategies include crisis plans with alternatives to police, voluntary crisis registries, and connecting to mobile crisis teams</li>
            <li>System reform --- not just individual advocacy --- is needed to address the criminalization of mental illness</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
