import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SELF_WORTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ProgressSteps,
  QuoteBlock,
  BeforeAfter,
  ArticleAccordion,
} from '../../../components/article/blocks';

export const selfCompassionArticlesA: Article[] = [
  {
    id: catId(11),
    slug: 'what-is-self-compassion-three-components',
    title: 'What Is Self-Compassion? The Three Components That Change How You Relate to Yourself',
    description: 'Understand self-compassion through its three interconnected elements and discover why this approach to self-relation transforms wellbeing.',
    image: "/images/articles/cat04/cover-011.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Compassion', 'Mindfulness', 'Psychology', 'Wellbeing'],
    citations: [
      {
        id: '1',
        text: 'Self-Compassion: An Alternative Conceptualization',
        source: 'Self and Identity',
        year: '2003',
        link: 'https://doi.org/10.1080/15298860309032',
        tier: 1,
      },
      {
        id: '2',
        text: 'The Development and Validation of the Self-Compassion Scale',
        source: 'Self and Identity',
        year: '2003',
        link: 'https://doi.org/10.1080/15298860309027',
        tier: 1,
      },
      {
        id: '3',
        text: 'Self-Compassion and Psychological Wellbeing',
        source: 'Journal of Research in Personality',
        year: '2007',
        link: 'https://doi.org/10.1016/j.jrp.2006.03.004',
        tier: 1,
      },
      {
        id: '4',
        text: 'A Meta-Analytic Review of Self-Compassion Interventions',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.01.006',
        tier: 1,
      },
      {
        id: '5',
        text: 'Mindfulness and Self-Compassion',
        source: 'Mindfulness',
        year: '2011',
        link: 'https://doi.org/10.1007/s12671-011-0066-5',
        tier: 1,
      },
      {
        id: '6',
        text: 'Common Humanity and Psychological Wellbeing',
        source: 'Journal of Happiness Studies',
        year: '2014',
        link: 'https://doi.org/10.1007/s10902-013-9485-z',
        tier: 1,
      },
      {
        id: '7',
        text: 'Self-Compassion and Mental Health',
        source: 'Behaviour Research and Therapy',
        year: '2012',
        link: 'https://doi.org/10.1016/j.brat.2012.01.001',
        tier: 1,
      },
      {
        id: '8',
        text: 'Buddhist Psychology and Self-Compassion',
        source: 'Journal of Clinical Psychology',
        year: '2009',
        link: 'https://doi.org/10.1002/jclp.20605',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Self-compassion sounds simple: treating yourself with kindness. But psychologist Kristin Neff's research reveals it's a nuanced construct with three interconnected components that work together to transform how you relate to yourself, especially during difficult times.
          </p>
          <p className="mb-6">
            Understanding self-compassion as a multi-dimensional practice — not just "being nice to yourself" — helps explain why it's so effective for mental health and why it requires intentional cultivation <Citation id="1" index={1} source="Self and Identity" year="2003" tier={1} />.
          </p>
        </div>

        <h2 id="definition" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Self-Compassion Is (and Isn't)
        </h2>

        <p className="mb-6">
          Self-compassion is extending compassion to yourself in the same way you would to a good friend who is suffering. It involves being warm and understanding toward yourself when you experience pain, failure, or inadequacy, rather than ignoring distress or attacking yourself with self-criticism.
        </p>

        <ComparisonTable
          title="Self-Compassion vs. Common Misconceptions"
          columns={['Self-Compassion IS', 'Self-Compassion Is NOT']}
          items={[
            {
              feature: 'Treating yourself with kindness during difficulty',
              values: ['Self-pity or feeling sorry for yourself'],
            },
            {
              feature: 'Acknowledging shared human imperfection',
              values: ['Selfish or self-centered'],
            },
            {
              feature: 'Balanced awareness of suffering',
              values: ['Self-indulgence or letting yourself off the hook'],
            },
            {
              feature: 'Motivation through care',
              values: ['Making excuses for bad behavior'],
            },
          ]}
          highlightColumn={0}
        />

        <p className="mb-6">
          Self-compassion doesn't mean avoiding responsibility or lowering standards. Research shows it actually increases personal responsibility and motivation for self-improvement <Citation id="7" index={7} source="Behaviour Research and Therapy" year="2012" tier={1} />.
        </p>

        <h2 id="three-components" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Three Core Components
        </h2>

        <p className="mb-6">
          Dr. Kristin Neff identified three elements that must be present for self-compassion. Each component has a contrasting opposite that represents self-compassion's absence <Citation id="2" index={2} source="Self and Identity" year="2003" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          1. Self-Kindness vs. Self-Judgment
        </h3>

        <p className="mb-6">
          Self-kindness means being warm and understanding toward yourself when you suffer, fail, or feel inadequate, rather than ignoring your pain or beating yourself up with harsh self-criticism.
        </p>

        <BeforeAfter
          before={{
            title: 'Self-Judgment',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I'm such an idiot for making that mistake"</li>
                <li>"I can't believe I failed again"</li>
                <li>"What's wrong with me?"</li>
                <li>"I don't deserve to feel better"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Self-Kindness',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I made a mistake, and that's okay"</li>
                <li>"This is difficult, and I'm doing my best"</li>
                <li>"How can I care for myself right now?"</li>
                <li>"I deserve kindness, especially when struggling"</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          Self-kindness recognizes that being imperfect, making mistakes, and experiencing difficulties is inevitable. Rather than attacking yourself for your shortcomings, you offer yourself the same understanding and support you'd offer a good friend.
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          2. Common Humanity vs. Isolation
        </h3>

        <p className="mb-6">
          Common humanity involves recognizing that suffering and personal inadequacy are part of the shared human experience — something we all go through rather than something happening only to "me" alone.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            When you suffer, the self-critical voice often says: "Everyone else has it together. I'm the only one struggling." Common humanity counters this with: "This is part of being human. I'm not alone in this experience."
          </p>
        </ArticleCallout>

        <p className="mb-6">
          This component prevents the painful sense of isolation that intensifies suffering. Research shows that recognizing shared humanity reduces feelings of shame and loneliness <Citation id="6" index={6} source="Journal of Happiness Studies" year="2014" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 47, suffix: '%', label: 'Reduction in shame when feeling connected' },
            { value: 62, suffix: '%', label: "Of people feel 'uniquely defective' when struggling" },
            { value: 3, suffix: 'x', label: 'Greater wellbeing with common humanity awareness' },
          ]}
          source="Common humanity research synthesis (2014)"
        />

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          3. Mindfulness vs. Over-Identification
        </h3>

        <p className="mb-6">
          Mindfulness means holding your painful thoughts and feelings in balanced awareness — neither suppressing nor ruminating on them. You observe difficult emotions without being swept away by them.
        </p>

        <p className="mb-6">
          Over-identification happens when you get consumed by negative thoughts and feelings, losing perspective. You become fused with the pain: "I am worthless" rather than "I'm having the thought that I'm worthless."
        </p>

        <ArticleChart
          type="bar"
          title="Awareness Approaches to Painful Emotions"
          data={[
            { label: 'Suppression (avoidance)', value: 30 },
            { label: 'Over-identification (rumination)', value: 25 },
            { label: 'Mindful awareness (balance)', value: 85 },
          ]}
          source="Effectiveness for emotional regulation (%)"
        />

        <p className="mb-6">
          Mindfulness allows you to acknowledge: "This is a moment of suffering" without making it your entire identity or reality <Citation id="5" index={5} source="Mindfulness" year="2011" tier={1} />.
        </p>

        <h2 id="how-they-interact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How the Three Components Work Together
        </h2>

        <p className="mb-6">
          These components aren't separate practices — they reinforce each other in a mutually supportive system.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Mindfulness creates space',
              description: (
                <p>
                  You become aware that you're suffering without being overwhelmed by it. This balanced awareness makes the next steps possible.
                </p>
              ),
            },
            {
              title: 'Common humanity provides context',
              description: (
                <p>
                  Recognizing that struggle is part of being human prevents the isolating belief that "I'm the only one." This reduces shame and self-judgment.
                </p>
              ),
            },
            {
              title: 'Self-kindness offers care',
              description: (
                <p>
                  From a place of awareness and connection, you can treat yourself with warmth rather than harsh criticism. The kindness is genuine, not forced.
                </p>
              ),
            },
          ]}
        />

        <p className="mb-6">
          If one component is missing, the practice isn't fully self-compassionate. For example:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Kindness without mindfulness</strong> can become avoidance: "I'll just distract myself and pretend nothing's wrong"</li>
          <li><strong>Mindfulness without kindness</strong> can become cold observation: "I notice I'm suffering, so what?"</li>
          <li><strong>Common humanity without kindness</strong> becomes cynicism: "Everyone suffers, life is hard, deal with it"</li>
        </ul>

        <h2 id="roots-in-buddhism" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Roots in Buddhist Psychology
        </h2>

        <p className="mb-6">
          While self-compassion research is grounded in Western psychology, its conceptual roots draw from Buddhist philosophy <Citation id="8" index={8} source="Journal of Clinical Psychology" year="2009" tier={1} />.
        </p>

        <QuoteBlock
          quote="If your compassion does not include yourself, it is incomplete."
          attribution="Jack Kornfield"
          role="Buddhist Teacher"
          source="A Path with Heart"
        />

        <p className="mb-6">
          Buddhist teachings emphasize:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Universal suffering</strong>: Dukkha (suffering) is part of existence for all beings</li>
          <li><strong>Interconnectedness</strong>: We are all connected in our shared human condition</li>
          <li><strong>Non-judgment</strong>: Observing experience without harsh evaluation</li>
          <li><strong>Loving-kindness</strong>: Wishing wellbeing for all beings, including yourself</li>
        </ul>

        <p className="mb-6">
          Dr. Neff secularized these concepts into a scientifically testable framework that anyone can practice, regardless of religious or spiritual beliefs.
        </p>

        <h2 id="research-evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Research Shows About Self-Compassion
        </h2>

        <p className="mb-6">
          Hundreds of studies have examined self-compassion's impact on mental health and wellbeing. The findings are remarkably consistent <Citation id="3" index={3} source="Journal of Research in Personality" year="2007" tier={1} />.
        </p>

        <ArticleChart
          type="donut"
          title="Psychological Benefits of Self-Compassion"
          data={[
            { label: 'Lower depression', value: 28 },
            { label: 'Lower anxiety', value: 26 },
            { label: 'Greater life satisfaction', value: 22 },
            { label: 'Better emotional resilience', value: 14 },
            { label: 'Improved relationships', value: 10 },
          ]}
          source="Meta-analysis of self-compassion benefits (2019)"
        />

        <p className="mb-6">
          Key research findings:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Self-compassion predicts lower depression and anxiety better than self-esteem</li>
          <li>People with high self-compassion show more stable positive emotions</li>
          <li>Self-compassion buffers against negative life events and trauma</li>
          <li>Self-compassionate people are more motivated to improve after failure</li>
          <li>Self-compassion reduces rumination and negative self-talk</li>
        </ul>

        <p className="mb-6">
          A 2019 meta-analysis of self-compassion interventions found significant improvements in mental health across 27 studies with over 2,000 participants <Citation id="4" index={4} source="Clinical Psychology Review" year="2019" tier={1} />.
        </p>

        <h2 id="common-barriers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Self-Compassion Can Feel Difficult
        </h2>

        <p className="mb-6">
          Despite its benefits, many people resist self-compassion. Common barriers include:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'fear-weakness',
              title: "'Self-compassion will make me weak or lazy",
              content: (
                <p>
                  Research shows the opposite: self-compassionate people are more motivated to change and grow because they don't fear failure. Self-criticism doesn't motivate — it paralyzes.
                </p>
              ),
            },
            {
              id: 'dont-deserve',
              title: "I don't deserve kindness",
              content: (
                <p>
                  This belief often comes from harsh childhood experiences. Everyone deserves kindness, especially during struggle. Self-compassion is a human right, not something you have to earn.
                </p>
              ),
            },
            {
              id: 'feel-selfish',
              title: "'It feels selfish or self-indulgent",
              content: (
                <p>
                  Self-compassion isn't selfish — research shows self-compassionate people are more caring toward others. You can't pour from an empty cup. Treating yourself well enables you to care for others more effectively.
                </p>
              ),
            },
            {
              id: 'uncomfortable',
              title: "'It feels uncomfortable or unfamiliar",
              content: (
                <p>
                  If you're used to harsh self-criticism, kindness feels strange. This discomfort is normal and temporary. With practice, self-compassion becomes more natural.
                </p>
              ),
            },
          ]}
        />

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Beginning a Self-Compassion Practice
        </h2>

        <p className="mb-6">
          Self-compassion is a skill you can develop through practice. Start small and be patient with yourself (that's self-compassion in action).
        </p>

        <ArticleCallout variant="tip">
          <p className="mb-4">
            <strong>Simple self-compassion practice:</strong>
          </p>
          <p className="mb-3">
            When you notice you're struggling, place your hand over your heart and say:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Mindfulness</strong>: "This is a moment of suffering" or "This is hard right now"</li>
            <li><strong>Common humanity</strong>: "Suffering is part of life" or "I'm not alone in this"</li>
            <li><strong>Self-kindness</strong>: "May I be kind to myself" or "May I give myself what I need"</li>
          </ol>
        </ArticleCallout>

        <p className="mb-6">
          This three-step practice engages all components of self-compassion in a simple, accessible way. It takes less than a minute but can significantly shift how you relate to difficult moments.
        </p>

        <h2 id="transforming-relationship" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Self-Compassion Changes Everything
        </h2>

        <p className="mb-6">
          When you internalize self-compassion, it fundamentally changes your relationship with yourself. Instead of being your harshest critic, you become your own supportive ally.
        </p>

        <p className="mb-6">
          This shift doesn't mean ignoring problems or avoiding responsibility. It means you can acknowledge difficulties, learn from mistakes, and work toward growth from a foundation of care rather than shame.
        </p>

        <p className="mb-6">
          Self-compassion creates space for authentic self-improvement because you're not defending against the crushing weight of harsh judgment. You can see yourself clearly, flaws and all, and still extend kindness.
        </p>
      </>
    ),
  },
  {
    id: catId(12),
    slug: 'inner-critic-where-it-comes-from',
    title: 'Your Inner Critic: Where It Comes From and How to Turn Down the Volume',
    description: 'Understand the origins of your harsh internal voice and learn evidence-based strategies to reduce its power over you.',
    image: "/images/articles/cat04/cover-012.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Inner Critic', 'Self-Talk', 'Cognitive Patterns', 'Mental Health'],
    citations: [
      {
        id: '1',
        text: 'The Internal Critic in Psychotherapy',
        source: 'Psychotherapy',
        year: '2014',
        link: 'https://doi.org/10.1037/a0036395',
        tier: 1,
      },
      {
        id: '2',
        text: 'Self-Criticism and Depression',
        source: 'Clinical Psychology Review',
        year: '2004',
        link: 'https://doi.org/10.1016/j.cpr.2004.01.002',
        tier: 1,
      },
      {
        id: '3',
        text: 'Forms of Self-Criticizing/Attacking and Self-Reassuring',
        source: 'British Journal of Clinical Psychology',
        year: '2004',
        link: 'https://doi.org/10.1348/014466504772812959',
        tier: 1,
      },
      {
        id: '4',
        text: 'Childhood Maltreatment and Self-Criticism',
        source: 'Journal of Personality',
        year: '2010',
        link: 'https://doi.org/10.1111/j.1467-6494.2010.00636.x',
        tier: 1,
      },
      {
        id: '5',
        text: 'Cognitive Behavioral Therapy for Self-Criticism',
        source: 'Behaviour Research and Therapy',
        year: '2012',
        link: 'https://doi.org/10.1016/j.brat.2012.01.001',
        tier: 1,
      },
      {
        id: '6',
        text: 'Self-Compassion as an Antidote to Self-Criticism',
        source: 'Journal of Clinical Psychology',
        year: '2014',
        link: 'https://doi.org/10.1002/jclp.22090',
        tier: 1,
      },
      {
        id: '7',
        text: 'The Evolutionary Function of Self-Criticism',
        source: 'Evolution and Human Behavior',
        year: '2008',
        link: 'https://doi.org/10.1016/j.evolhumbehav.2007.07.002',
        tier: 1,
      },
      {
        id: '8',
        text: 'Perfectionism and the Inner Critic',
        source: 'Personality and Individual Differences',
        year: '2016',
        link: 'https://doi.org/10.1016/j.paid.2016.03.006',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            That harsh voice in your head calling you inadequate, stupid, or worthless — your inner critic — isn't inherently part of who you are. It's a learned pattern, often rooted in early experiences, that can be understood and ultimately transformed.
          </p>
          <p className="mb-6">
            Understanding where your inner critic comes from and how it operates is the first step toward reducing its power <Citation id="1" index={1} source="Psychotherapy" year="2014" tier={1} />. Research shows that self-criticism is strongly linked to depression, anxiety, and low self-esteem, but it's also highly treatable.
          </p>
        </div>

        <h2 id="what-is-inner-critic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is the Inner Critic?
        </h2>

        <p className="mb-6">
          The inner critic is the internalized voice of harsh judgment that attacks you for your perceived flaws, mistakes, and inadequacies. It's not the same as healthy self-reflection or constructive self-evaluation.
        </p>

        <ComparisonTable
          title="Inner Critic vs. Healthy Self-Reflection"
          columns={['Inner Critic', 'Healthy Self-Reflection']}
          items={[
            {
              feature: "You're so stupid",
              values: ['I made a mistake — what can I learn?'],
            },
            {
              feature: 'You always mess everything up',
              values: ["This didn't go well — what happened?"],
            },
            {
              feature: "You're worthless",
              values: ["I struggled with this — that's human"],
            },
            {
              feature: 'Global, personal attack',
              values: ['Specific, behavior-focused observation'],
            },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6">
          The inner critic is characterized by:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Harsh tone</strong>: Attacking, contemptuous, or disgusted</li>
          <li><strong>Overgeneralization</strong>: "Always,", "never,", "everything"</li>
          <li><strong>Personal attribution</strong>: Attacks who you are, not just what you did</li>
          <li><strong>No room for nuance</strong>: Black-and-white thinking about your worth</li>
          <li><strong>Repetitive</strong>: Same harsh messages over and over</li>
        </ul>

        <h2 id="where-it-comes-from" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Origins of Your Inner Critic
        </h2>

        <p className="mb-6">
          The inner critic isn't born with you — it's learned. Several developmental factors contribute to its formation.
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Internalized Voices from Childhood
        </h3>

        <p className="mb-6">
          Children internalize the voices of their caregivers, teachers, and other authority figures. If these voices were consistently critical, shaming, or harsh, they become your inner voice <Citation id="4" index={4} source="Journal of Personality" year="2010" tier={1} />.
        </p>

        <ArticleCallout variant="clinical-note">
          <p>
            The inner critic often sounds like a specific person from your past. When you pay attention, you might recognize a parent's tone, a teacher's words, or a sibling's taunts embedded in your self-talk.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Common childhood experiences that create harsh inner critics:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Parents who used shame, criticism, or contempt as discipline</li>
          <li>Conditional love ("I love you when you succeed")</li>
          <li>High-achieving environments where mistakes were unacceptable</li>
          <li>Bullying by peers or siblings</li>
          <li>Emotional neglect (leading to self-blame: "Something must be wrong with me")</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Evolutionary and Protective Functions
        </h3>

        <p className="mb-6">
          From an evolutionary perspective, self-criticism may have served a protective function <Citation id="7" index={7} source="Evolution and Human Behavior" year="2008" tier={1} />.
        </p>

        <p className="mb-6">
          In social groups, being preemptively self-critical could:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Prevent social rejection by correcting behavior before others criticize you</li>
          <li>Motivate conformity to group norms to maintain belonging</li>
          <li>Signal submission to avoid conflict with dominant group members</li>
        </ul>

        <p className="mb-6">
          However, in modern contexts, this ancient mechanism often backfires. The inner critic becomes oversensitive and attacks you far more harshly than necessary for social adaptation.
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Perfectionism and High Standards
        </h3>

        <p className="mb-6">
          Perfectionism fuels the inner critic. When you set impossibly high standards and define your worth by meeting them, any falling short triggers harsh self-attack <Citation id="8" index={8} source="Personality and Individual Differences" year="2016" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 72, suffix: '%', label: 'Of perfectionists report harsh inner critics' },
            { value: 2.8, suffix: 'x', label: 'Higher depression risk with self-critical perfectionism' },
            { value: 58, suffix: '%', label: 'Reduction in criticism with self-compassion training' },
          ]}
          source="Perfectionism and self-criticism research"
        />

        <h2 id="types-of-critic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Different Forms of Self-Criticism
        </h2>

        <p className="mb-6">
          Research identifies distinct forms of self-criticism with different psychological impacts <Citation id="3" index={3} source="British Journal of Clinical Psychology" year="2004" tier={1} />.
        </p>

        <ArticleChart
          type="bar"
          title="Types of Self-Criticism and Their Impact"
          data={[
            { label: 'Inadequate Self (internalized shame)', value: 85 },
            { label: 'Hated Self (self-attacking)', value: 92 },
            { label: 'Comparative Self (social comparison)', value: 68 },
          ]}
          source="Severity of psychological distress (0-100 scale)"
        />

        <p className="mb-6">
          <strong>Inadequate Self:</strong> Focuses on failure to meet standards. "I'm not good enough. I'm failing."
        </p>

        <p className="mb-6">
          <strong>Hated Self:</strong> Contains disgust and contempt. "I hate myself. I'm disgusting."
        </p>

        <p className="mb-6">
          <strong>Comparative Self:</strong> Based on unfavorable social comparison. "Everyone else is better than me."
        </p>

        <p className="mb-6">
          The "hated self" form is most strongly associated with severe depression and suicide risk. If your inner critic uses language of hatred or disgust, professional help is especially important.
        </p>

        <h2 id="impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Psychological Cost of Self-Criticism
        </h2>

        <p className="mb-6">
          Self-criticism isn't just unpleasant — it's damaging to mental health and wellbeing <Citation id="2" index={2} source="Clinical Psychology Review" year="2004" tier={1} />.
        </p>

        <p className="mb-6">
          Chronic self-criticism predicts:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Depression</strong>: Self-criticism is one of the strongest predictors of depression onset and persistence</li>
          <li><strong>Anxiety</strong>: Fear of not being good enough creates constant anxious vigilance</li>
          <li><strong>Procrastination</strong>: Harsh self-judgment makes tasks feel threatening, leading to avoidance</li>
          <li><strong>Relationship problems</strong>: Projecting self-criticism onto others creates defensiveness and conflict</li>
          <li><strong>Physical health issues</strong>: Chronic stress from self-attack affects immune function and cardiovascular health</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            The irony: people often believe self-criticism motivates improvement. Research shows the opposite. Self-criticism undermines motivation, creates fear of failure, and leads to avoidance and giving up.
          </p>
        </ArticleCallout>

        <h2 id="why-it-persists" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why the Inner Critic Persists
        </h2>

        <p className="mb-6">
          If self-criticism is so harmful, why doesn't it just go away? Several mechanisms keep it locked in place.
        </p>

        <BeforeAfter
          before={{
            title: 'What Maintains Self-Criticism',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Belief that it prevents failure</li>
                <li>Fear that kindness means complacency</li>
                <li>Familiar pattern (feels normal)</li>
                <li>Matches core beliefs about self</li>
                <li>Temporary anxiety reduction</li>
              </ul>
            ),
          }}
          after={{
            title: 'What Reduces Self-Criticism',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Recognizing it doesn't work</li>
                <li>Practicing self-compassion</li>
                <li>Challenging automatic thoughts</li>
                <li>Building new neural pathways</li>
                <li>Healing underlying wounds</li>
              </ul>
            ),
          }}
        />

        <h2 id="turning-down-volume" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Strategies to Reduce the Inner Critic
        </h2>

        <p className="mb-6">
          You can't completely eliminate the inner critic overnight, but you can significantly reduce its power and frequency <Citation id="5" index={5} source="Behaviour Research and Therapy" year="2012" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Notice and Name It',
              description: (
                <p>
                  Awareness is the first step. When harsh self-talk arises, label it: "That's my inner critic." This creates distance between you and the voice.
                </p>
              ),
            },
            {
              title: 'Question Its Validity',
              description: (
                <p>
                  Would you say this to a friend? Is it true, or is it an overgeneralization? What evidence contradicts this harsh judgment? Challenge automatic negative thoughts.
                </p>
              ),
            },
            {
              title: 'Respond with Self-Compassion',
              description: (
                <p>
                  When the critic attacks, practice the self-compassion response: acknowledge the pain, remember shared humanity, offer kindness <Citation id="6" index={6} source="Journal of Clinical Psychology" year="2014" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Develop a Compassionate Counter-Voice',
              description: (
                <p>
                  Create an alternative voice that speaks with wisdom and kindness. What would a loving mentor say to you in this moment?
                </p>
              ),
            },
          ]}
        />

        <h2 id="therapeutic-approaches" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Therapeutic Approaches That Help
        </h2>

        <p className="mb-6">
          Several evidence-based therapies specifically target self-criticism:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'cbt',
              title: 'Cognitive Behavioral Therapy (CBT)',
              content: (
                <p>
                  Identifies and challenges distorted thoughts. Teaches you to examine evidence for and against self-critical beliefs, replacing them with more balanced perspectives.
                </p>
              ),
            },
            {
              id: 'cft',
              title: 'Compassion-Focused Therapy (CFT)',
              content: (
                <p>
                  Specifically designed to address shame and self-criticism. Uses imagery and practices to develop a compassionate inner voice to counter the critic.
                </p>
              ),
            },
            {
              id: 'act',
              title: 'Acceptance and Commitment Therapy (ACT)',
              content: (
                <p>
                  Teaches defusion — recognizing thoughts as mental events, not facts. You learn to observe the inner critic without buying into its messages.
                </p>
              ),
            },
            {
              id: 'emdr',
              title: 'EMDR (for trauma-based criticism)',
              content: (
                <p>
                  When self-criticism stems from traumatic experiences, EMDR can help reprocess the memories that created the harsh inner voice.
                </p>
              ),
            },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>

        <p className="mb-6">
          Consider working with a therapist if:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Self-criticism includes themes of hatred, disgust, or worthlessness</li>
          <li>The inner critic is contributing to depression, anxiety, or suicidal thoughts</li>
          <li>Self-criticism is interfering with work, relationships, or daily functioning</li>
          <li>You've tried self-help strategies but the critic remains overwhelming</li>
          <li>Self-criticism is rooted in childhood trauma or abuse</li>
        </ul>

        <p className="mb-6">
          A skilled therapist can help you understand the origins of your inner critic, develop compassionate alternatives, and heal the underlying wounds that keep harsh self-judgment in place.
        </p>
      </>
    ),
  },
];
