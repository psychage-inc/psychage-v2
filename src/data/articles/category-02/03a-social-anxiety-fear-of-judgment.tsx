import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_ANXIETY_STRESS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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
} from '../../../components/article/blocks';

// ============================================================================
// Subtopic 3: Social Anxiety & Fear of Judgment | Articles 21-25
// ============================================================================

export const socialAnxietyArticlesA: Article[] = [
  // ============================================================================
  // Article 21: Social Anxiety Disorder
  // ============================================================================
  {
    id: catId(21),
    slug: 'social-anxiety-disorder-more-than-just-shyness',
    title: 'Social Anxiety Disorder: More Than Just Shyness',
    description: 'Understand social anxiety disorder — its diagnosis, neurobiological underpinnings, impact on life, and evidence-based treatments including CBT and exposure therapy.',
    image: "/images/articles/cat02/cover-021.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 14,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Anxiety', 'Social Phobia', 'CBT', 'Mental Health Conditions'],
    citations: [
      {
        id: '1',
        text: 'Social anxiety disorder: Recognition, assessment, and treatment',
        source: 'The Lancet Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1016/S2215-0366(21)00040-2',
        tier: 1,
      },
      {
        id: '2',
        text: 'Cognitive behavioral therapy for social anxiety disorder: Meta-analysis of randomized controlled trials',
        source: 'British Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1192/bjp.2020.178',
        tier: 1,
      },
      {
        id: '3',
        text: 'The neurobiology of social anxiety disorder',
        source: 'Biological Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.biopsych.2020.06.027',
        tier: 1,
      },
      {
        id: '4',
        text: 'Social anxiety disorder in adolescents and young adults: Epidemiology and clinical course',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2021.04.053',
        tier: 1,
      },
      {
        id: '5',
        text: 'Pharmacotherapy for social anxiety disorder: Current evidence and future directions',
        source: 'CNS Drugs',
        year: '2020',
        link: 'https://doi.org/10.1007/s40263-020-00723-z',
        tier: 1,
      },
      {
        id: '6',
        text: 'Safety behaviors in social anxiety disorder and their impact on treatment outcomes',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102044',
        tier: 1,
      },
      {
        id: '7',
        text: 'Cognitive biases in social anxiety disorder: A systematic review',
        source: 'Psychological Medicine',
        year: '2020',
        link: 'https://doi.org/10.1017/S0033291720003342',
        tier: 1,
      },
      {
        id: '8',
        text: 'The role of self-focused attention in social anxiety: Evidence and clinical implications',
        source: 'Behaviour Research and Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.brat.2020.103654',
        tier: 1,
      },
      {
        id: '9',
        text: 'Social anxiety disorder and quality of life: A meta-analysis',
        source: 'Quality of Life Research',
        year: '2021',
        link: 'https://doi.org/10.1007/s11136-021-02845-4',
        tier: 1,
      },
      {
        id: '10',
        text: 'Virtual reality exposure therapy for social anxiety disorder: A systematic review',
        source: 'Journal of Anxiety Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.janxdis.2021.102425',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Walking into a room full of people feels like walking onto a stage where everyone is a critic. Every
            word you speak, every gesture you make is being judged — harshly. The pounding heart, the flushed face,
            the mind going blank. This isn't just shyness or introversion. This is social anxiety disorder, and it
            can be profoundly isolating.
          </p>
          <p className="mb-6">
            Social anxiety disorder (SAD), also called social phobia, is the intense fear of social situations where
            you might be judged, embarrassed, or humiliated{', '}
            <Citation id="1" index={1} source="The Lancet Psychiatry" year="2021" tier={1} />. It's one of the most
            common anxiety disorders, affecting millions — yet it remains widely misunderstood, often dismissed as
            mere "shyness" when it's actually a treatable clinical condition.
          </p>
        </div>

        <h2
          id="what-is-social-anxiety-disorder"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Social Anxiety Disorder?
        </h2>
        <p className="mb-6">
          Social anxiety disorder is characterized by intense, persistent fear of one or more social situations where
          you might be scrutinized by others. The fear is that you'll act in a way that will be humiliating or
          embarrassing, leading to rejection or negative evaluation.
        </p>
        <p className="mb-6">For a diagnosis of SAD, the following criteria must be met:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Marked fear or anxiety</strong> about one or more social situations (e.g., conversations,
            meeting unfamiliar people, being observed eating or drinking, performing in front of others)
          </li>
          <li>
            <strong>Fear of negative evaluation:</strong> You fear that you'll be judged as anxious, weak, stupid,
            boring, intimidating, dirty, or unlikeable
          </li>
          <li>
            <strong>The social situations almost always provoke fear or anxiety</strong>
          </li>
          <li>
            <strong>The situations are avoided</strong> or endured with intense fear or anxiety
          </li>
          <li>
            <strong>The fear is out of proportion</strong> to the actual threat posed by the situation
          </li>
          <li>
            <strong>The fear/avoidance is persistent,</strong> typically lasting 6 months or more
          </li>
          <li>
            <strong>The fear causes significant distress</strong> or impairment in social, occupational, or other
            important areas of functioning
          </li>
        </ul>

        <StatCard
          stats={[
            { value: 7, suffix: '%', label: 'Lifetime prevalence in US adults' },
            { value: 13, suffix: '%', label: 'Age of onset typically before age 13' },
            { value: 36, suffix: '%', label: 'Report symptoms for 10+ years before seeking help' },
          ]}
          source="The Lancet Psychiatry, 2021"
        />

        <h2
          id="subtypes"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Performance-Only vs. Generalized Social Anxiety
        </h2>
        <p className="mb-6">Social anxiety disorder has two main presentations:</p>

        <ComparisonTable
          title="Performance-Only vs. Generalized SAD"
          columns={['Feature', 'Performance-Only', 'Generalized']}
          items={[
            {
              feature: 'Fear focus',
              values: [
                'Fear limited to performance situations only',
                'Fear of most or all social interactions',
              ],
            },
            {
              feature: 'Examples',
              values: [
                'Public speaking, performing on stage, taking tests, presenting at meetings',
                'Conversations, meeting new people, eating in public, being in groups, phone calls',
              ],
            },
            {
              feature: 'Prevalence',
              values: [
                'Less common (~25% of SAD cases)',
                'More common (~75% of SAD cases)',
              ],
            },
            {
              feature: 'Impairment',
              values: [
                'Can function well in non-performance settings',
                'Pervasive impact on daily life and relationships',
              ],
            },
            {
              feature: 'Treatment',
              values: [
                'Often responds well to targeted exposure + beta-blockers if needed',
                'Requires comprehensive CBT and often medication',
              ],
            },
          ]}
        />

        <h2
          id="shyness-vs-sad"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Shyness vs. Social Anxiety Disorder: What's the Difference?
        </h2>
        <p className="mb-6">
          It's normal to feel nervous in some social situations. Social anxiety disorder crosses into clinical
          territory when the fear becomes severe, persistent, and life-limiting.
        </p>

        <BeforeAfter
          before={{
            title: 'Typical Shyness',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Initial nervousness in new situations that fades with time</li>
                <li>Can push through discomfort to engage</li>
                <li>Selective about social situations but not avoiding them entirely</li>
                <li>Nervousness doesn't interfere with work, school, or relationships</li>
                <li>Can make and maintain friendships</li>
                <li>Occasional worry about judgment, not pervasive fear</li>
              </ul>
            ),
          }}
          after={{
            title: 'Social Anxiety Disorder',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Intense, persistent fear that doesn't diminish with exposure</li>
                <li>Avoids social situations or endures them with severe distress</li>
                <li>Avoidance is extensive and interferes with life goals</li>
                <li>Significant impairment in work, school, or relationships</li>
                <li>Difficulty forming or maintaining friendships</li>
                <li>Constant preoccupation with being judged or humiliated</li>
                <li>Physical symptoms: racing heart, sweating, trembling, blushing, nausea</li>
                <li>Severe self-consciousness and self-criticism</li>
              </ul>
            ),
          }}
        />

        <h2
          id="cognitive-patterns"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Cognitive Patterns That Maintain Social Anxiety
        </h2>
        <p className="mb-6">
          Social anxiety is maintained by several interconnected thinking patterns{', '}
          <Citation id="7" index={2} source="Psychological Medicine" year="2020" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'negative-beliefs',
              title: '1. Excessively High Social Standards',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Pattern:</strong> Holding yourself to unrealistic standards for social performance.
                  </p>
                  <p className="mb-4">
                    <strong>Examples:</strong> "I must be articulate and interesting at all times,", "I can never show
                    any signs of anxiety,", "I must make everyone like me,", "Any awkwardness means I've failed."
                  </p>
                  <p>
                    These perfectionistic standards guarantee failure and reinforce the belief that you're socially
                    inadequate.
                  </p>
                </div>
              ),
            },
            {
              id: 'mind-reading',
              title: '2. Mind-Reading and Probability Overestimation',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Pattern:</strong> Assuming you know what others are thinking — and it's always negative.
                  </p>
                  <p className="mb-4">
                    <strong>Examples:</strong> "They think I'm boring,", "She's judging my outfit,", "He thinks I'm
                    stupid,", "Everyone noticed my hands shaking."
                  </p>
                  <p>
                    Research shows people with SAD <strong>overestimate</strong> how negatively others perceive them
                    and <strong>underestimate</strong> how positively others actually view them.
                  </p>
                </div>
              ),
            },
            {
              id: 'self-focused-attention',
              title: '3. Self-Focused Attention',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Pattern:</strong> During social interactions, attention turns inward rather than outward{', '}
                    <Citation id="8" index={3} source="Behaviour Research and Therapy" year="2020" tier={1} />.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> While someone is talking to you, you're monitoring: "Am I making enough
                    eye contact? Do I look nervous? Is my voice shaking? Did I say something stupid?"
                  </p>
                  <p className="mb-4">
                    <strong>Consequence:</strong> You miss social cues, appear disengaged, and have difficulty
                    tracking conversations — which ironically creates the awkwardness you're trying to avoid.
                  </p>
                  <p>
                    Self-focused attention also amplifies awareness of internal anxiety symptoms (racing heart,
                    sweating), making anxiety feel even more intense.
                  </p>
                </div>
              ),
            },
            {
              id: 'post-event-processing',
              title: '4. Post-Event Rumination',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Pattern:</strong> After social situations, you replay the interaction obsessively,
                    analyzing everything you said and did.
                  </p>
                  <p className="mb-4">
                    <strong>Examples:</strong> "Why did I say that?", "I sounded so awkward,", "They must think I'm an
                    idiot,", "I should have said X instead of Y."
                  </p>
                  <p>
                    This rumination reinforces negative beliefs about yourself and increases anxiety about future
                    social situations.
                  </p>
                </div>
              ),
            },
            {
              id: 'catastrophizing',
              title: '5. Catastrophic Interpretation of Social Mishaps',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Pattern:</strong> Minor social awkwardness is interpreted as catastrophic.
                  </p>
                  <p className="mb-4">
                    <strong>Examples:</strong> Stumbling over words means "I'm a complete failure," someone not
                    laughing at your joke means "They hate me," blushing means "Everyone thinks I'm weak."
                  </p>
                  <p>
                    The belief: "If people see my anxiety, I'll be judged, rejected, and humiliated beyond repair."
                  </p>
                </div>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="In social anxiety, you become your own worst critic — and you assume everyone else is critiquing you just as harshly. The truth is, most people are too busy worrying about themselves to scrutinize you as intensely as you fear."
          attribution="Core clinical insight"
          role="Cognitive Model of Social Anxiety"
          variant="large"
        />

        <h2
          id="safety-behaviors"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Safety Behaviors: The Hidden Maintainer
        </h2>
        <p className="mb-6">
          Safety behaviors are subtle actions taken during social situations to prevent feared outcomes (judgment,
          embarrassment, rejection). They feel protective but actually maintain social anxiety by preventing you from
          learning that social situations are safe{', '}
          <Citation id="6" index={4} source="Clinical Psychology Review" year="2021" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'conversation',
              label: 'Conversation Safety Behaviors',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Rehearsing what to say in advance</li>
                  <li>Sticking to "safe" topics only</li>
                  <li>Speaking minimally to avoid saying something "wrong"</li>
                  <li>Asking lots of questions to deflect attention from yourself</li>
                  <li>Using humor or self-deprecation excessively to preempt criticism</li>
                  <li>Monitoring every word before it comes out</li>
                </ul>
              ),
            },
            {
              id: 'physical',
              label: 'Physical Safety Behaviors',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Wearing heavy makeup or clothing to hide blushing or sweating</li>
                  <li>Gripping objects tightly to hide trembling hands</li>
                  <li>Avoiding eye contact or staring at phone</li>
                  <li>Positioning yourself near exits</li>
                  <li>Wearing sunglasses indoors</li>
                  <li>Carrying objects (water bottle, book) to have "something to do"</li>
                </ul>
              ),
            },
            {
              id: 'situational',
              label: 'Situational Safety Behaviors',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Arriving late or leaving early to minimize social time</li>
                  <li>Only attending events with a "safe person" companion</li>
                  <li>Using alcohol or substances to "loosen up"</li>
                  <li>Staying on phone to avoid conversation</li>
                  <li>Volunteering for tasks (serving food, cleaning up) to avoid mingling</li>
                </ul>
              ),
            },
          ]}
        />

        <p className="mb-6">
          <strong>Why safety behaviors maintain the problem:</strong> When you use them and the interaction goes
          okay, you attribute success to the safety behavior ("I only survived because I didn't make eye contact"),
          not to your actual social skills. This prevents you from learning that you can handle social situations
          without protective measures.
        </p>

        <h2
          id="neurobiology"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Neurobiology of Social Anxiety
        </h2>
        <p className="mb-6">
          Neuroimaging studies reveal that social anxiety involves altered activity in brain regions related to
          threat detection and social processing{', '}
          <Citation id="3" index={5} source="Biological Psychiatry" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Amygdala hyperactivity:</strong> Overactive fear center triggers excessive threat response to
            social stimuli (faces, especially negative or ambiguous expressions)
          </li>
          <li>
            <strong>Prefrontal cortex dysfunction:</strong> Impaired ability to regulate fear response and reappraise
            social threats
          </li>
          <li>
            <strong>Anterior cingulate cortex:</strong> Increased activity related to fear of negative evaluation and
            error monitoring
          </li>
          <li>
            <strong>Fusiform face area:</strong> Altered processing of facial expressions, leading to biased
            perception of social cues
          </li>
        </ul>
        <p className="mb-6">
          These changes are not permanent. Treatment, particularly CBT, has been shown to normalize brain activity
          patterns in social anxiety disorder.
        </p>

        <h2
          id="impact-on-life"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Impact on Quality of Life
        </h2>
        <p className="mb-6">
          Untreated social anxiety significantly impairs functioning across multiple life domains{', '}
          <Citation id="9" index={6} source="Quality of Life Research" year="2021" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Education',
              description: (
                <p>
                  Difficulty participating in class, asking questions, giving presentations; avoiding group work;
                  lower academic achievement despite intelligence.
                </p>
              ),
            },
            {
              title: 'Career',
              description: (
                <p>
                  Avoiding job interviews, meetings, networking; turning down promotions that require public
                  speaking; underemployment relative to abilities.
                </p>
              ),
            },
            {
              title: 'Relationships',
              description: (
                <p>
                  Difficulty dating, making friends, or maintaining relationships; social isolation; loneliness
                  despite desire for connection.
                </p>
              ),
            },
            {
              title: 'Daily functioning',
              description: (
                <p>
                  Avoiding errands (grocery shopping, calling for appointments); missing medical care; limited life
                  experiences.
                </p>
              ),
            },
            {
              title: 'Mental health',
              description: (
                <p>
                  High comorbidity with depression (50% have MDD); substance use to cope; increased suicide risk;
                  low self-esteem.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="treatment-cbt"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Treatment: Cognitive Behavioral Therapy
        </h2>
        <p className="mb-6">
          CBT is the gold-standard treatment for social anxiety disorder, with remission rates of 50-75% and durable
          long-term outcomes{', '}
          <Citation id="2" index={7} source="British Journal of Psychiatry" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Core CBT Components
        </h3>
        <ol className="list-decimal pl-6 mb-6 space-y-4">
          <li>
            <strong>Psychoeducation:</strong> Understanding the cognitive model of social anxiety, how safety
            behaviors maintain the problem, and the role of self-focused attention.
          </li>
          <li>
            <strong>Cognitive restructuring:</strong> Identifying and challenging distorted thoughts about social
            situations (mind-reading, catastrophizing, probability overestimation).
          </li>
          <li>
            <strong>Attention training:</strong> Learning to shift attention outward (to the conversation, the other
            person, the environment) rather than inward (to your anxiety symptoms and self-monitoring).
          </li>
          <li>
            <strong>Behavioral experiments:</strong> Testing beliefs (e.g., "If I blush, people will think I'm weak")
            by deliberately allowing blushing and observing actual responses.
          </li>
          <li>
            <strong>Exposure therapy:</strong> Systematically facing feared social situations in a graded hierarchy,
            starting with easier situations and progressing to more challenging ones.
          </li>
          <li>
            <strong>Dropping safety behaviors:</strong> Gradually eliminating protective behaviors to learn that you
            can handle social situations without them.
          </li>
          <li>
            <strong>Video feedback:</strong> Recording yourself in social situations to compare your actual
            performance with your catastrophic predictions.
          </li>
          <li>
            <strong>Reducing post-event rumination:</strong> Learning to let go of analyzing interactions rather than
            replaying them obsessively.
          </li>
        </ol>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Virtual Reality Exposure Therapy (VRET)
        </h3>
        <p className="mb-6">
          VRET uses immersive virtual environments to simulate feared social situations (job interviews, public
          speaking, parties). Research shows it's effective for social anxiety{', '}
          <Citation id="10" index={8} source="Journal of Anxiety Disorders" year="2021" tier={1} />, particularly for
          performance anxiety and for people who initially find in vivo exposure too overwhelming.
        </p>

        <h2
          id="medication"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Medication for Social Anxiety Disorder
        </h2>
        <p className="mb-6">
          Several medication classes are effective{', '}
          <Citation id="5" index={9} source="CNS Drugs" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>SSRIs (first-line):</strong> Paroxetine, sertraline, fluvoxamine are FDA-approved for SAD; reduce
            anxiety over 6-12 weeks
          </li>
          <li>
            <strong>SNRIs:</strong> Venlafaxine extended-release is FDA-approved and effective
          </li>
          <li>
            <strong>Benzodiazepines:</strong> Rapid-acting but risk of dependence; not recommended long-term
          </li>
          <li>
            <strong>Beta-blockers (propranolol):</strong> For performance-only social anxiety, taken 30-60 minutes
            before event; reduces physical symptoms (trembling, racing heart) but doesn't address underlying anxiety
          </li>
          <li>
            <strong>Gabapentin:</strong> Some evidence for effectiveness, particularly in generalized SAD
          </li>
        </ul>

        <p className="mb-6">
          <strong>CBT vs. Medication:</strong> Both work, but CBT has more durable effects. After stopping
          medication, relapse is common. After CBT, gains tend to be maintained. Combination treatment (CBT +
          medication) may be optimal for severe social anxiety.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Social anxiety disorder is not a character flaw.</strong> It's not weakness, it's not being 'too
            sensitive, " and it's not something you can simply "get over" with willpower.
          </p>
          <p className="mb-4">
            It's a treatable mental health condition with clear neurobiological underpinnings, predictable cognitive
            patterns, and evidence-based treatments that work. Thousands of people have walked the path from
            crippling social fear to comfortable engagement with others.
          </p>
          <p className="mb-4">
            Treatment requires courage — facing the very situations that terrify you. But it works. With CBT,
            medication if needed, and persistent effort, most people with social anxiety see significant improvement{', '}
            <Citation id="2" index={10} source="British Journal of Psychiatry" year="2020" tier={1} />.
          </p>
          <p>
            You're not fundamentally broken or inadequate. You're experiencing a common, understandable, treatable
            condition. Connection is possible. The world doesn't have to be a stage where everyone is a critic —
            treatment can help you see it differently.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 22: The Inner Critic in Social Anxiety
  // ============================================================================
  {
    id: catId(22),
    slug: 'the-inner-critic-in-social-anxiety-why-you-assume-the-worst',
    title: 'The Inner Critic in Social Anxiety: Why You Assume the Worst',
    description: 'Learn about the harsh inner critic that drives social anxiety, why negative self-talk worsens fear of judgment, and cognitive techniques to develop a more compassionate internal voice.',
    image: "/images/articles/cat02/cover-022.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Anxiety', 'Self-Criticism', 'Cognitive Restructuring', 'Self-Compassion'],
    citations: [
      {
        id: '1',
        text: 'Self-criticism and social anxiety: The role of negative self-appraisal',
        source: 'Personality and Individual Differences',
        year: '2021',
        link: 'https://doi.org/10.1016/j.paid.2021.110892',
        tier: 1,
      },
      {
        id: '2',
        text: 'The relationship between self-compassion and social anxiety: A meta-analysis',
        source: 'Mindfulness',
        year: '2020',
        link: 'https://doi.org/10.1007/s12671-020-01523-y',
        tier: 1,
      },
      {
        id: '3',
        text: 'Negative self-imagery in social anxiety disorder',
        source: 'Journal of Behavior Therapy and Experimental Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jbtep.2020.101626',
        tier: 1,
      },
      {
        id: '4',
        text: 'Cognitive bias modification for negative self-beliefs in social anxiety',
        source: 'Behaviour Research and Therapy',
        year: '2021',
        link: 'https://doi.org/10.1016/j.brat.2021.103941',
        tier: 1,
      },
      {
        id: '5',
        text: 'Compassion-focused therapy for social anxiety: A pilot study',
        source: 'British Journal of Clinical Psychology',
        year: '2020',
        link: 'https://doi.org/10.1111/bjc.12267',
        tier: 1,
      },
      {
        id: '6',
        text: 'The inner critic and social anxiety: Clinical implications',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102062',
        tier: 1,
      },
      {
        id: '7',
        text: 'Self-focused attention and negative self-perception in social situations',
        source: 'Anxiety, Stress, and Coping',
        year: '2020',
        link: 'https://doi.org/10.1080/10615806.2020.1832919',
        tier: 1,
      },
      {
        id: '8',
        text: 'Challenging negative core beliefs in social anxiety: Evidence-based strategies',
        source: 'Cognitive Therapy and Research',
        year: '2021',
        link: 'https://doi.org/10.1007/s10608-021-10234-5',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You walk into a party, and immediately the voice starts: <em>"You look awkward. People are noticing.
            You're going to say something stupid. They don't want you here. Why did you even come?'</em> This isn't
            how others see you — it's your inner critic, and in social anxiety, it's relentless.
          </p>
          <p className="mb-6">
            The inner critic is the harsh, judgmental voice that narrates your social experiences with worst-case
            assumptions{', '}
            <Citation id="1" index={1} source="Personality and Individual Differences" year="2021" tier={1} />. It's
            the lens through which you interpret every interaction — and in social anxiety, that lens is
            mercilessly negative.
          </p>
        </div>

        <h2
          id="what-is-inner-critic"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is the Inner Critic?
        </h2>
        <p className="mb-6">
          The inner critic is the internalized voice of self-judgment. It's formed from past experiences —
          criticism from parents, bullying, social rejection, perfectionist standards — and becomes your automatic
          filter for interpreting social situations.
        </p>
        <p className="mb-6">In social anxiety, the inner critic tells you:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"You're boring and awkward"</li>
          <li>"People can see how anxious you are, and they think you're weak"</li>
          <li>"You're going to embarrass yourself"</li>
          <li>"Everyone else is more confident and capable than you"</li>
          <li>"You don't belong here"</li>
          <li>"That thing you said was stupid; they're judging you"</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>
            Research shows that people with social anxiety are significantly more self-critical than those without
            the disorder{', '}
            <Citation id="6" index={2} source="Clinical Psychology Review" year="2021" tier={1} />. They also assume
            their internal self-judgment matches how others perceive them — when in reality, others usually see them
            far more favorably than they see themselves.
          </p>
        </ArticleCallout>

        <h2
          id="why-it-happens"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why the Inner Critic Is So Harsh
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'learned',
              title: "It's learned from past experiences",
              content: (
                <div>
                  <p>
                    If you were frequently criticized, teased, or rejected in childhood or adolescence, you
                    internalized those messages. The voice that once came from outside ("You're so quiet,", "Why are
                    you so awkward?") is now inside your head, replaying on loop.
                  </p>
                </div>
              ),
            },
            {
              id: 'protective',
              title: "It's a misguided attempt at protection",
              content: (
                <div>
                  <p className="mb-4">
                    The inner critic believes: "If I criticize myself first, it will hurt less when others do it.
                    If I set impossibly high standards, maybe I'll avoid failure."
                  </p>
                  <p>
                    But this backfires. Constant self-criticism doesn't prevent judgment — it amplifies anxiety and
                    creates the very awkwardness you're trying to avoid.
                  </p>
                </div>
              ),
            },
            {
              id: 'confirmation-bias',
              title: 'Confirmation bias reinforces it',
              content: (
                <div>
                  <p className="mb-4">
                    The inner critic selectively attends to information that confirms its negative beliefs while
                    ignoring evidence to the contrary.
                  </p>
                  <p>
                    If someone doesn't laugh at your joke, the critic says: "See? They think you're boring." If
                    someone does laugh, the critic dismisses it: "They're just being polite." No positive evidence
                    is allowed in.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="impact"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How the Inner Critic Fuels Social Anxiety
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Pre-event',
              description: (
                <p>
                  Before social situations, the critic predicts disaster: 'You're going to make a fool of yourself.
                  Don't even bother going.'
                </p>
              ),
            },
            {
              title: 'During event',
              description: (
                <p>
                  The critic provides real-time commentary: 'They're bored. You're talking too much. No, now you're
                  too quiet. You sound stupid. Everyone can tell you're nervous.'
                </p>
              ),
            },
            {
              title: 'After event',
              description: (
                <p>
                  The critic replays every moment, analyzing and condemning: 'Why did you say that? You were so
                  awkward. They'll never want to see you again."
                </p>
              ),
            },
            {
              title: 'Reinforcement',
              description: (
                <p>
                  The cycle deepens: anxiety about the next social situation increases, the critic becomes louder,
                  and avoidance feels like the only option.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="reframe-critic"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How to Quiet the Inner Critic
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Recognize the Critic's Voice
        </h3>
        <p className="mb-6">
          The first step is awareness{', '}
          <Citation id="7" index={3} source="Anxiety, Stress, and Coping" year="2020" tier={1} />. Notice when the
          inner critic is speaking. Give it a name ("The Critic,", "The Judge,", "That Voice") to create distance
          between you and the thoughts.
        </p>
        <p className="mb-6">
          <strong>Practice:</strong> When you notice the critic, mentally label it: "There's the critic again,
          telling me I'm boring.' This creates separation — <em>you</em> are not the critic; it's a pattern of
          thinking, not truth.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Challenge the Critic's Evidence
        </h3>
        <p className="mb-6">
          The critic presents opinions as facts. Question them{', '}
          <Citation id="8" index={4} source="Cognitive Therapy and Research" year="2021" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: "Critic's Statement",
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"Everyone thinks I'm boring"</li>
                <li>"I always say stupid things"</li>
                <li>"People can tell I'm anxious and judge me for it"</li>
                <li>"I ruined that conversation"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Evidence-Based Challenge',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"Can I read minds? Do I have proof that <em>everyone</em> thinks this?"</li>
                <li>"Always? What about the times I said something people laughed at or engaged with?"</li>
                <li>"Do I judge others harshly when they seem nervous? If not, why assume they judge me?"</li>
                <li>"Did the conversation end badly? Did they seem upset? Or is this my interpretation?"</li>
              </ul>
            ),
          }}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Develop a Compassionate Inner Voice
        </h3>
        <p className="mb-6">
          Self-compassion is strongly associated with lower social anxiety{', '}
          <Citation id="2" index={5} source="Mindfulness" year="2020" tier={1} />. Replace the critic with a
          compassionate, realistic voice.
        </p>
        <p className="mb-6">
          <strong>Practice:</strong> What would you say to a friend experiencing the same situation? Say that to
          yourself.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Critic:</strong> "You were so awkward. Everyone noticed."
          </li>
          <li>
            <strong>Compassionate voice:</strong> "You were nervous, and that's understandable. Most people don't
            scrutinize others the way you think they do. Even if you were a bit awkward, that's human and okay.'
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Imagery Rescripting
        </h3>
        <p className="mb-6">
          Many people with social anxiety have vivid negative self-images — mental pictures of themselves as
          incompetent, awkward, or pathetic in social situations{', '}
          <Citation id="3" index={6} source="Journal of Behavior Therapy and Experimental Psychiatry" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Technique:</strong> Identify the negative image. Then, deliberately revise it. Picture yourself as
          calm, engaged, and accepted. Imagine the scene going well. This rewrites the mental script the critic uses.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Cognitive Bias Modification Training
        </h3>
        <p className="mb-6">
          Research shows that training people to interpret ambiguous social situations more positively can reduce
          social anxiety{', '}
          <Citation id="4" index={7} source="Behaviour Research and Therapy" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Practice:</strong> When you notice an ambiguous social cue (someone looking away, not responding
          immediately), deliberately choose a neutral or positive interpretation instead of the negative one the critic
          offers.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Critic:</strong> "They looked away — they're bored with me."
          </li>
          <li>
            <strong>Alternative:</strong> "They looked away — maybe they're thinking, or they're people-watching, or
            they're just looking around.'
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          6. Compassion-Focused Therapy (CFT)
        </h3>
        <p className="mb-6">
          CFT is designed specifically for people with high self-criticism{', '}
          <Citation id="5" index={8} source="British Journal of Clinical Psychology" year="2020" tier={1} />. It
          teaches you to activate your "soothing system" (compassion, warmth, reassurance) instead of constantly
          operating from the "threat system" (criticism, fear, self-attack).
        </p>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>The inner critic isn't protecting you — it's imprisoning you.</strong> Its harsh judgments don't
            prevent social disasters; they create the anxiety and self-consciousness that make interactions harder.
          </p>
          <p className="mb-4">
            Changing your relationship with the inner critic is central to overcoming social anxiety. You don't have
            to believe everything you think. You don't have to accept the critic's judgments as truth.
          </p>
          <p>
            With practice, you can develop a compassionate, realistic internal voice that supports rather than
            sabotages you. The critic may never disappear completely, but it can become quieter, less powerful, and
            easier to dismiss.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 23: Performance Anxiety
  // ============================================================================
  {
    id: catId(23),
    slug: 'performance-anxiety-stage-fright-test-anxiety-and-public-speaking-fear',
    title: 'Performance Anxiety: Stage Fright, Test Anxiety, and Public Speaking Fear',
    description: 'Understand performance anxiety, its physiological basis, and evidence-based strategies to manage fear in high-stakes situations.',
    image: "/images/articles/cat02/cover-023.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Performance Anxiety', 'Public Speaking', 'Test Anxiety', 'Stage Fright'],
    citations: [
      {
        id: '1',
        text: 'Performance anxiety in high-stakes situations: A systematic review',
        source: 'Journal of Applied Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/apl0000476',
        tier: 1,
      },
      {
        id: '2',
        text: 'Public speaking anxiety: Nature, assessment, and treatment',
        source: 'Journal of Anxiety Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.janxdis.2021.102468',
        tier: 1,
      },
      {
        id: '3',
        text: 'Test anxiety and academic performance: Meta-analytic findings',
        source: 'Educational Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1007/s10648-020-09520-z',
        tier: 1,
      },
      {
        id: '4',
        text: 'The neurobiology of performance anxiety: Stress response and cognitive control',
        source: 'Neuroscience and Biobehavioral Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.neubiorev.2020.08.012',
        tier: 1,
      },
      {
        id: '5',
        text: 'Cognitive behavioral therapy for performance anxiety: Evidence and mechanisms',
        source: 'Behaviour Research and Therapy',
        year: '2021',
        link: 'https://doi.org/10.1016/j.brat.2021.103899',
        tier: 1,
      },
      {
        id: '6',
        text: 'Beta-blockers for performance anxiety: Clinical efficacy and limitations',
        source: 'Journal of Clinical Psychopharmacology',
        year: '2020',
        link: 'https://doi.org/10.1097/JCP.0000000000001235',
        tier: 1,
      },
      {
        id: '7',
        text: 'Exposure therapy for public speaking anxiety: Randomized controlled trial',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102073',
        tier: 1,
      },
      {
        id: '8',
        text: 'Reappraising arousal: Challenge vs. threat mindsets in performance situations',
        source: 'Journal of Experimental Psychology: General',
        year: '2020',
        link: 'https://doi.org/10.1037/xge0000756',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The spotlight turns on. All eyes are on you. Your heart races, your hands shake, your mind goes blank.
            Whether it's a presentation at work, a final exam, a musical performance, or speaking at a wedding,
            performance anxiety can turn high-stakes moments into experiences of pure dread.
          </p>
          <p className="mb-6">
            Performance anxiety is the fear and physiological arousal that occurs when you're being evaluated or
            observed in a specific situation{', '}
            <Citation id="1" index={1} source="Journal of Applied Psychology" year="2020" tier={1} />. Unlike
            generalized social anxiety (which affects most social situations), performance anxiety is situational —
            triggered by moments where your competence is on display.
          </p>
        </div>

        <h2
          id="what-is-performance-anxiety"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Performance Anxiety?
        </h2>
        <p className="mb-6">
          Performance anxiety occurs when you must perform a task while being watched, judged, or evaluated. The fear
          centers on the possibility of failure, embarrassment, or not meeting expectations.
        </p>

        <p className="mb-6">Common performance anxiety scenarios include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Public speaking:</strong> Presentations, speeches, lectures, toasts
          </li>
          <li>
            <strong>Academic testing:</strong> Exams, standardized tests, oral defenses
          </li>
          <li>
            <strong>Musical or artistic performance:</strong> Concerts, recitals, auditions, competitions
          </li>
          <li>
            <strong>Athletic performance:</strong> Games, matches, tryouts
          </li>
          <li>
            <strong>Workplace performance:</strong> Job interviews, performance reviews, sales pitches
          </li>
          <li>
            <strong>Sexual performance:</strong> Intimacy with a partner
          </li>
        </ul>

        <StatCard
          stats={[
            { value: 75, suffix: '%', label: 'Report some level of public speaking anxiety' },
            { value: 25, suffix: '%', label: 'Experience severe test anxiety affecting performance' },
            { value: 40, suffix: '%', label: 'Of musicians report debilitating stage fright' },
          ]}
          source="Journal of Anxiety Disorders, 2021"
        />

        <h2
          id="physiology"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Physiology: Why Your Body Reacts So Strongly
        </h2>
        <p className="mb-6">
          When you face a performance situation, your brain interprets it as a threat. The sympathetic nervous system
          activates, flooding your body with adrenaline and cortisol{', '}
          <Citation id="4" index={2} source="Neuroscience and Biobehavioral Reviews" year="2020" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'physical',
              label: 'Physical Symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Racing heart or pounding chest</li>
                  <li>Trembling hands, shaky voice</li>
                  <li>Sweating, hot flashes</li>
                  <li>Nausea, upset stomach</li>
                  <li>Dry mouth, difficulty swallowing</li>
                  <li>Shortness of breath, tight chest</li>
                  <li>Dizziness or lightheadedness</li>
                  <li>Muscle tension</li>
                </ul>
              ),
            },
            {
              id: 'cognitive',
              label: 'Cognitive Symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Mind going blank</li>
                  <li>Racing or scattered thoughts</li>
                  <li>Difficulty concentrating</li>
                  <li>Catastrophic predictions ("I'm going to fail,", "Everyone will laugh at me")</li>
                  <li>Memory problems</li>
                  <li>Negative self-talk</li>
                  <li>Hyper-focus on mistakes</li>
                </ul>
              ),
            },
            {
              id: 'behavioral',
              label: 'Behavioral Symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Avoidance of performance situations</li>
                  <li>Over-preparation or under-preparation (procrastination)</li>
                  <li>Rushing through the performance</li>
                  <li>Freezing or hesitating</li>
                  <li>Using alcohol or medication to cope</li>
                  <li>Seeking excessive reassurance</li>
                </ul>
              ),
            },
          ]}
        />

        <h2
          id="types"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Three Common Types of Performance Anxiety
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Public Speaking Anxiety
        </h3>
        <p className="mb-6">
          Public speaking anxiety is the most common form of performance anxiety{', '}
          <Citation id="2" index={3} source="Journal of Anxiety Disorders" year="2021" tier={1} />. The fear isn't
          just about speaking — it's about being judged while speaking.
        </p>
        <p className="mb-6">
          <strong>Core fears:</strong> "I'll forget what to say,", "I'll sound stupid,", "Everyone will see how nervous
          I am,", "They'll think I'm boring or incompetent."
        </p>
        <p className="mb-6">
          <strong>Physical manifestations:</strong> Trembling voice, blushing, sweating, shaking hands holding notes.
          These visible signs of anxiety often create a feedback loop: you notice them, become more anxious about
          others noticing, and the symptoms intensify.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Test Anxiety
        </h3>
        <p className="mb-6">
          Test anxiety is excessive worry before and during exams that interferes with performance{', '}
          <Citation id="3" index={4} source="Educational Psychology Review" year="2020" tier={1} />. It's not just
          nervousness — it's anxiety severe enough to impair memory, concentration, and problem-solving.
        </p>
        <p className="mb-6">
          <strong>Cognitive interference:</strong> During the test, anxious thoughts ("I'm going to fail,", "I should
          know this,", "I'm running out of time") compete with the cognitive resources needed to recall information and
          solve problems.
        </p>
        <p className="mb-6">
          <strong>Paradox:</strong> Students with test anxiety often know the material well when studying but can't
          access that knowledge during the exam due to anxiety-induced cognitive disruption.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Stage Fright (Performance Anxiety in the Arts)
        </h3>
        <p className="mb-6">
          Musicians, actors, dancers, and other performers often experience intense anxiety before and during
          performances. Unlike some forms of performance anxiety that diminish with exposure, stage fright can persist
          even in highly experienced performers.
        </p>
        <p className="mb-6">
          <strong>The perfectionism factor:</strong> Performers often hold themselves to impossibly high standards.
          Any perceived mistake feels catastrophic, fueling anxiety in future performances.
        </p>

        <h2
          id="maintaining-factors"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Maintains Performance Anxiety?
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'avoidance',
              title: 'Avoidance',
              content: (
                <div>
                  <p className="mb-4">
                    The most powerful maintainer of performance anxiety is avoidance. When you avoid performance
                    situations (turning down speaking opportunities, dropping classes with oral presentations, avoiding
                    auditions), you never learn that you can handle the situation.
                  </p>
                  <p>
                    Short-term: Avoidance reduces anxiety immediately. Long-term: Avoidance reinforces the belief that
                    performance situations are dangerous and that you're incapable of handling them.
                  </p>
                </div>
              ),
            },
            {
              id: 'negative-predictions',
              title: 'Catastrophic Predictions',
              content: (
                <div>
                  <p className="mb-4">
                    Before performances, you predict disaster: "I'm going to freeze up,", "Everyone will judge me,", "I'll
                    fail and my career will be over."
                  </p>
                  <p>
                    These predictions are rarely accurate. But because they feel so real, they fuel anticipatory anxiety
                    and prime you to focus on anything that confirms the prediction during the performance.
                  </p>
                </div>
              ),
            },
            {
              id: 'self-focus',
              title: 'Self-Focused Attention',
              content: (
                <div>
                  <p className="mb-4">
                    During performances, attention turns inward: monitoring your anxiety symptoms, analyzing your
                    performance in real-time, noticing every mistake.
                  </p>
                  <p>
                    This self-focus interferes with performance. When you're monitoring yourself, you're not fully
                    engaged with the task (the speech content, the music, the test questions).
                  </p>
                </div>
              ),
            },
            {
              id: 'post-mortem',
              title: 'Post-Performance Rumination',
              content: (
                <div>
                  <p>
                    After the performance, you replay it obsessively, focusing on mistakes and perceived failures. This
                    strengthens negative beliefs and increases anxiety about the next performance.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="strategies"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Evidence-Based Strategies to Manage Performance Anxiety
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Reappraise Arousal: Anxiety vs. Excitement
        </h3>
        <p className="mb-6">
          Anxiety and excitement are physiologically almost identical — both involve increased heart rate, arousal, and
          alertness. The difference is how you interpret these sensations{', '}
          <Citation id="8" index={5} source="Journal of Experimental Psychology: General" year="2020" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Threat Mindset',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"My racing heart means I'm going to fail"</li>
                <li>"I'm too anxious to perform well"</li>
                <li>"This anxiety is a sign of weakness"</li>
                <li>"I need to calm down or I'll mess up"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Challenge/Excitement Mindset',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"My racing heart means I'm energized and ready"</li>
                <li>"This arousal will help me perform at my best"</li>
                <li>"I'm excited about this opportunity"</li>
                <li>"Feeling energized is normal before performance"</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          <strong>Practice:</strong> When you notice anxiety symptoms, tell yourself: 'I'm excited' instead of "I'm
          anxious." Research shows this simple reappraisal improves performance.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Exposure Therapy: Gradual, Repeated Practice
        </h3>
        <p className="mb-6">
          The most effective long-term treatment for performance anxiety is repeated exposure to performance situations{', '}
          <Citation id="7" index={6} source="Clinical Psychology Review" year="2021" tier={1} />. Start small, build
          gradually:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Step 1: Low-stakes practice',
              description: (
                <p>
                  Practice in front of a mirror, record yourself, present to one trusted friend. Focus on building
                  tolerance for the experience, not perfect performance.
                </p>
              ),
            },
            {
              title: 'Step 2: Small audience',
              description: (
                <p>
                  Present to 2-3 supportive people. Join a group like Toastmasters where everyone is practicing public
                  speaking in a low-pressure environment.
                </p>
              ),
            },
            {
              title: 'Step 3: Moderate stakes',
              description: (
                <p>
                  Volunteer for presentations at work, take classes requiring oral presentations, perform at open mic
                  nights.
                </p>
              ),
            },
            {
              title: 'Step 4: High stakes',
              description: (
                <p>
                  Take on the performance situations that matter most to you — job interviews, conference presentations,
                  competitive auditions.
                </p>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Shift Focus Outward
        </h3>
        <p className="mb-6">
          Instead of monitoring yourself during the performance, redirect attention outward:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Public speaking:</strong> Focus on the message you're delivering and the audience you're serving,
            not on yourself
          </li>
          <li>
            <strong>Music:</strong> Focus on the music itself — the sound, the expression, the connection with the piece
          </li>
          <li>
            <strong>Tests:</strong> Focus on the question in front of you, not on your anxiety or time pressure
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Preparation (But Not Over-Preparation)
        </h3>
        <p className="mb-6">
          Thorough preparation reduces uncertainty, which reduces anxiety. However, over-preparation can backfire —
          perfectionism and excessive rehearsal can increase pressure and rigidity.
        </p>
        <p className="mb-6">
          <strong>Balance:</strong> Prepare enough to feel confident, but practice flexibility. For presentations,
          know your material well but don't memorize every word. For tests, study strategically but set boundaries on
          study time.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Beta-Blockers (For Specific Performance Situations)
        </h3>
        <p className="mb-6">
          Medications like propranolol block the physical symptoms of anxiety (racing heart, trembling, sweating)
          without affecting cognition or alertness{', '}
          <Citation id="6" index={7} source="Journal of Clinical Psychopharmacology" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>When to use:</strong> For occasional, predictable performance situations (a keynote speech, an
          audition, a wedding toast). Taken 30-60 minutes before the event.
        </p>
        <p className="mb-6">
          <strong>Limitations:</strong> Beta-blockers treat symptoms, not the underlying anxiety. They don't help with
          the cognitive aspect (negative thoughts, catastrophic predictions). Long-term use can create dependency — you
          may believe you can only perform well with medication.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          6. Cognitive Behavioral Therapy (CBT)
        </h3>
        <p className="mb-6">
          CBT for performance anxiety targets the thoughts, beliefs, and behaviors that maintain the anxiety{', '}
          <Citation id="5" index={8} source="Behaviour Research and Therapy" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>Identifying and challenging catastrophic predictions</li>
          <li>Reducing self-focused attention during performance</li>
          <li>Conducting behavioral experiments (testing whether feared outcomes actually occur)</li>
          <li>Building tolerance for imperfection and mistakes</li>
          <li>Reducing post-performance rumination</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Performance anxiety is not a sign that you're not cut out for the task.</strong> Many of the most
            accomplished public speakers, performers, and leaders experience performance anxiety.
          </p>
          <p className="mb-4">
            The difference isn't the absence of anxiety — it's how you respond to it. With practice, you can learn to
            reappraise arousal as excitement, shift focus outward, and build confidence through gradual exposure.
          </p>
          <p>
            You don't need to eliminate anxiety to perform well. You just need to stop letting it control whether you
            show up.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 24: Social Anxiety at Work
  // ============================================================================
  {
    id: catId(24),
    slug: 'social-anxiety-at-work-managing-fear-in-professional-settings',
    title: 'Social Anxiety at Work: Managing Fear in Professional Settings',
    description: 'Navigate workplace challenges when social anxiety affects meetings, presentations, and professional relationships.',
    image: "/images/articles/cat02/cover-024.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Anxiety', 'Workplace', 'Career', 'Professional Development'],
    citations: [
      {
        id: '1',
        text: 'Social anxiety in the workplace: Prevalence and functional impairment',
        source: 'Journal of Occupational Health Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/ocp0000234',
        tier: 1,
      },
      {
        id: '2',
        text: 'Career development and social anxiety disorder: Longitudinal outcomes',
        source: 'Journal of Vocational Behavior',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jvb.2021.103612',
        tier: 1,
      },
      {
        id: '3',
        text: 'Workplace accommodations for employees with anxiety disorders',
        source: 'Psychiatric Rehabilitation Journal',
        year: '2020',
        link: 'https://doi.org/10.1037/prj0000412',
        tier: 1,
      },
      {
        id: '4',
        text: 'Meetings and social anxiety: Impact on participation and perceived competence',
        source: 'Group Dynamics: Theory, Research, and Practice',
        year: '2021',
        link: 'https://doi.org/10.1037/gdn0000156',
        tier: 1,
      },
      {
        id: '5',
        text: 'Email versus face-to-face communication in organizational settings with social anxiety',
        source: 'Computers in Human Behavior',
        year: '2020',
        link: 'https://doi.org/10.1016/j.chb.2020.106542',
        tier: 1,
      },
      {
        id: '6',
        text: 'Networking anxiety and career advancement: Gender differences',
        source: 'Journal of Applied Psychology',
        year: '2021',
        link: 'https://doi.org/10.1037/apl0000892',
        tier: 1,
      },
      {
        id: '7',
        text: 'Job interviews and social anxiety: Performance deficits and impression management',
        source: 'International Journal of Selection and Assessment',
        year: '2020',
        link: 'https://doi.org/10.1111/ijsa.12304',
        tier: 1,
      },
      {
        id: '8',
        text: 'Disclosure of mental health conditions in the workplace: Employee perspectives',
        source: 'Work and Stress',
        year: '2021',
        link: 'https://doi.org/10.1080/02678373.2021.1936438',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Meetings where you're expected to speak. Presentations in front of colleagues. Networking events. Small
            talk in the break room. Lunch with coworkers. For people with social anxiety, the workplace can feel like
            a minefield of judgment and evaluation — every day.
          </p>
          <p className="mb-6">
            Social anxiety doesn't disappear when you clock in. In fact, the professional environment can amplify it
            — your performance is literally being evaluated, your competence is on display, and avoidance isn't always
            an option{', '}
            <Citation id="1" index={1} source="Journal of Occupational Health Psychology" year="2020" tier={1} />.
          </p>
        </div>

        <h2
          id="workplace-challenges"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How Social Anxiety Shows Up at Work
        </h2>

        <ArticleTabs
          tabs={[
            {
              id: 'meetings',
              label: 'Meetings',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>The fear:</strong> "Everyone will notice I'm nervous. If I speak, I'll say something stupid
                    and people will judge me. If I don't speak, they'll think I'm incompetent or unengaged.'
                  </p>
                  <p className="mb-4">
                    <strong>Behaviors:</strong> Staying silent even when you have valuable input. Over-preparing what
                    to say, then freezing when it's time to speak. Sitting in the back or avoiding eye contact.
                    Agreeing with others to avoid having to offer your own opinion.
                  </p>
                  <p>
                    <Citation id="4" index={2} source="Group Dynamics: Theory, Research, and Practice" year="2021" tier={1} />{', '}
                    Research shows people with social anxiety are perceived as less competent in meetings not because
                    of their actual abilities, but because anxiety reduces their participation.
                  </p>
                </div>
              ),
            },
            {
              id: 'presentations',
              label: 'Presentations',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>The fear:</strong> Intense performance anxiety combined with fear of judgment. "I'll forget
                    what to say. My voice will shake. Everyone will see how anxious I am. They'll think I don't know my
                    material.'
                  </p>
                  <p>
                    <strong>Impact:</strong> Avoiding roles or projects that require presenting. Declining promotions
                    that involve public speaking. Experiencing severe anticipatory anxiety for days or weeks before the
                    presentation.
                  </p>
                </div>
              ),
            },
            {
              id: 'networking',
              label: 'Networking & Social Events',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>The fear:</strong> "I won't know what to say. People will think I'm boring or awkward. I
                    don't belong here. Everyone else is more confident and successful.'
                  </p>
                  <p>
                    <strong>Behaviors:</strong> Avoiding work social events entirely. Arriving late and leaving early.
                    Staying on your phone. Only talking to people you already know.
                  </p>
                  <p>
                    <strong>Career impact:</strong> Networking is crucial for career advancement{', '}
                    <Citation id="6" index={3} source="Journal of Applied Psychology" year="2021" tier={1} />. Social
                    anxiety can limit access to opportunities that come through informal connections and visibility.
                  </p>
                </div>
              ),
            },
            {
              id: 'interactions',
              label: 'Daily Interactions',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Break room anxiety:</strong> Avoiding common areas to escape small talk. Eating lunch alone
                    at your desk. Taking stairs instead of elevator to avoid conversation.
                  </p>
                  <p className="mb-4">
                    <strong>Communication preference:</strong> Over-relying on email instead of phone calls or
                    face-to-face conversation{', '}
                    <Citation id="5" index={4} source="Computers in Human Behavior" year="2020" tier={1} />, even when
                    direct communication would be more efficient.
                  </p>
                  <p>
                    <strong>Fear of feedback:</strong> Dreading performance reviews or one-on-one meetings with
                    managers, even when feedback is likely positive.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="career-impact"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Career Impact
        </h2>
        <p className="mb-6">
          Untreated workplace social anxiety can have significant long-term career consequences{', '}
          <Citation id="2" index={5} source="Journal of Vocational Behavior" year="2021" tier={1} />:
        </p>

        <ArticleChart
          type="bar"
          title="Career Impacts of Workplace Social Anxiety"
          data={[
            { label: 'Underemployment', value: 42 },
            { label: 'Declined promotions', value: 38 },
            { label: 'Avoided leadership roles', value: 52 },
            { label: 'Lower income', value: 35 },
            { label: 'Job dissatisfaction', value: 58 },
          ]}
          source="Journal of Vocational Behavior, 2021"
        />

        <ul className="list-disc pl-6 mb-6 space-y-2 mt-6">
          <li>
            <strong>Underemployment:</strong> Working below your skill level to avoid social demands
          </li>
          <li>
            <strong>Missed opportunities:</strong> Declining projects, promotions, or roles that require visibility
          </li>
          <li>
            <strong>Limited networking:</strong> Missing out on mentorship, sponsorship, and career connections
          </li>
          <li>
            <strong>Income disparity:</strong> Lower salary negotiation due to fear of advocating for yourself
          </li>
          <li>
            <strong>Job turnover:</strong> Leaving positions due to social demands rather than lack of competence
          </li>
        </ul>

        <h2
          id="strategies"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Strategies for Managing Social Anxiety at Work
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Start Small: Gradual Workplace Exposure
        </h3>
        <p className="mb-6">Don't try to overhaul your behavior overnight. Build tolerance incrementally:</p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Week 1-2: Low-stakes interactions',
              description: (
                <p>
                  Say good morning to one colleague each day. Eat lunch in the break room once this week. Make brief
                  small talk with someone at the coffee machine.
                </p>
              ),
            },
            {
              title: 'Week 3-4: Increase visibility',
              description: (
                <p>
                  Speak up once in a meeting — even just to agree with someone or ask a clarifying question. Respond to
                  a group email. Join one optional work event.
                </p>
              ),
            },
            {
              title: 'Week 5-6: Push the edge',
              description: (
                <p>
                  Volunteer to present one slide in a team meeting. Schedule a one-on-one with your manager. Reach out
                  to a colleague to collaborate on a project.
                </p>
              ),
            },
            {
              title: 'Ongoing: Build on success',
              description: (
                <p>
                  Continue gradually increasing challenges. Notice what goes better than expected and use that evidence
                  to challenge catastrophic predictions.
                </p>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Prepare (But Don't Over-Prepare)
        </h3>
        <p className="mb-6">
          Preparation reduces uncertainty, but excessive preparation can backfire by increasing pressure.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>For meetings:</strong> Jot down 2-3 points you might want to make. Don't script every word.
          </li>
          <li>
            <strong>For presentations:</strong> Know your material well, practice delivery 2-3 times, but avoid
            memorizing verbatim.
          </li>
          <li>
            <strong>For networking:</strong> Have 2-3 conversation starters ready, but let conversations unfold
            naturally.
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Challenge Workplace-Specific Anxious Thoughts
        </h3>

        <ComparisonTable
          title="Reframing Workplace Social Anxiety"
          columns={['Anxious Thought', 'Balanced Alternative']}
          items={[
            {
              feature: 'Speaking up in meetings',
              values: [
                "If I say something wrong, everyone will think I'm incompetent",
                "People make mistakes in meetings all the time. One comment doesn't define my competence.",
              ],
            },
            {
              feature: 'Networking events',
              values: [
                "Everyone else is more successful and confident. I don't belong here.",
                "Many people feel awkward at these events. Appearing confident doesn't mean feeling confident.",
              ],
            },
            {
              feature: 'Presentations',
              values: [
                "If I look nervous, I'll lose all credibility",
                "Nervousness during presentations is normal and doesn't negate expertise. Content matters more than delivery.",
              ],
            },
            {
              feature: 'Small talk',
              values: [
                "If there's a silence, it means I'm boring",
                'Pauses in conversation are natural. Not every moment needs to be filled with words.',
              ],
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Know Your Rights: Workplace Accommodations
        </h3>
        <p className="mb-6">
          In the United States, anxiety disorders are covered under the Americans with Disabilities Act (ADA). You may
          be entitled to reasonable accommodations{', '}
          <Citation id="3" index={6} source="Psychiatric Rehabilitation Journal" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Written agendas in advance of meetings so you can prepare</li>
          <li>Permission to work remotely when possible to reduce social demands</li>
          <li>Modified break times to reduce crowded common-area exposure</li>
          <li>Gradual return to social demands after medical leave</li>
        </ul>
        <p className="mb-6">
          <strong>Disclosure:</strong> You're not required to disclose your diagnosis. However, to request
          accommodations, you'll need to work with HR{', '}
          <Citation id="8" index={7} source="Work and Stress" year="2021" tier={1} />. Consider the workplace culture
          and your level of trust before disclosing.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Master the Job Interview
        </h3>
        <p className="mb-6">
          Job interviews are high-stakes social-evaluative situations{', '}
          <Citation id="7" index={8} source="International Journal of Selection and Assessment" year="2020" tier={1} />.
          Social anxiety can interfere with impression management and articulating your qualifications.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Practice common questions:</strong> Prepare 2-3 examples for common behavioral questions ("Tell me
            about a time when...")
          </li>
          <li>
            <strong>Mock interviews:</strong> Practice with a friend or career counselor to reduce novelty
          </li>
          <li>
            <strong>Shift focus:</strong> Think of the interview as a two-way conversation to see if the role fits you,
            not just a performance where you're being judged
          </li>
          <li>
            <strong>Self-compassion:</strong> Interviews are inherently nerve-wracking. Nervousness doesn't mean you're
            unqualified.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Your competence is not defined by your comfort level in social situations.</strong> Social anxiety
            may make the workplace more challenging, but it doesn't make you less capable or less deserving of career
            success.
          </p>
          <p className="mb-4">
            With gradual exposure, cognitive reframing, and strategic accommodations, you can build a fulfilling career
            without letting social anxiety dictate your professional path. You don't have to become extroverted or love
            networking — you just need to develop enough tolerance to show up.
          </p>
          <p>
            Seek treatment if workplace social anxiety is significantly limiting your career. CBT and medication can
            help you navigate professional settings with less fear and more confidence.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 25: Social Media and Social Anxiety
  // ============================================================================
  {
    id: catId(25),
    slug: 'social-media-and-social-anxiety-how-digital-comparison-fuels-fear',
    title: 'Social Media and Social Anxiety: How Digital Comparison Fuels Fear',
    description: 'Explore the complex relationship between social media use and social anxiety, including comparison, FOMO, and digital wellness strategies.',
    image: "/images/articles/cat02/cover-025.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Anxiety', 'Social Media', 'Digital Wellness', 'FOMO'],
    citations: [
      {
        id: '1',
        text: 'Social media use and social anxiety symptoms: A systematic review',
        source: 'Cyberpsychology, Behavior, and Social Networking',
        year: '2021',
        link: 'https://doi.org/10.1089/cyber.2020.0765',
        tier: 1,
      },
      {
        id: '2',
        text: 'Social comparison on social media and mental health: A meta-analysis',
        source: 'Journal of Computer-Mediated Communication',
        year: '2020',
        link: 'https://doi.org/10.1093/jcmc/zmaa015',
        tier: 1,
      },
      {
        id: '3',
        text: 'Fear of missing out (FOMO) and social anxiety: Longitudinal associations',
        source: 'Computers in Human Behavior',
        year: '2021',
        link: 'https://doi.org/10.1016/j.chb.2021.106831',
        tier: 1,
      },
      {
        id: '4',
        text: 'Instagram and anxiety: Mechanisms linking visual social media to distress',
        source: 'New Media & Society',
        year: '2020',
        link: 'https://doi.org/10.1177/1461444820924623',
        tier: 1,
      },
      {
        id: '5',
        text: 'Passive social media use and well-being: A meta-analytic review',
        source: 'Journal of Personality and Social Psychology',
        year: '2021',
        link: 'https://doi.org/10.1037/pspp0000373',
        tier: 1,
      },
      {
        id: '6',
        text: 'Social media feedback-seeking and social anxiety in young adults',
        source: 'Anxiety, Stress, and Coping',
        year: '2020',
        link: 'https://doi.org/10.1080/10615806.2020.1817000',
        tier: 1,
      },
      {
        id: '7',
        text: 'Digital detox and mental health: A randomized controlled trial',
        source: 'Psychological Science',
        year: '2021',
        link: 'https://doi.org/10.1177/09567976211024895',
        tier: 1,
      },
      {
        id: '8',
        text: 'Healthy social media use: Strategies for reducing anxiety and promoting connection',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101886',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You scroll through Instagram. Everyone's life looks better than yours — more friends, more adventures,
            more success. You post something, then obsessively check for likes and comments, heart sinking when the
            response isn't what you hoped. You see others getting together without you. The anxiety builds: 'I'm
            boring. I'm alone. I'm missing out.'
          </p>
          <p className="mb-6">
            Social media was supposed to connect us. But for people with social anxiety, it often amplifies the very
            fears it promised to ease{', '}
            <Citation id="1" index={1} source="Cyberpsychology, Behavior, and Social Networking" year="2021" tier={1} />.
            The digital world becomes another arena for comparison, judgment, and fear of exclusion.
          </p>
        </div>

        <h2
          id="the-paradox"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Social Media Paradox for Social Anxiety
        </h2>
        <p className="mb-6">Social media presents a contradictory relationship with social anxiety:</p>

        <BeforeAfter
          before={{
            title: 'Why It Feels Safer',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>No face-to-face interaction — time to compose thoughts</li>
                <li>Control over self-presentation — edit, delete, curate</li>
                <li>Asynchronous communication — no pressure for immediate response</li>
                <li>Lower stakes — easier to initiate contact online than in person</li>
                <li>Avoid real-world social situations while staying "connected"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Why It Makes Anxiety Worse',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Constant social comparison — everyone looks happier, more successful</li>
                <li>Fear of negative evaluation — worrying about likes, comments, reactions</li>
                <li>FOMO (fear of missing out) — seeing social events you weren't invited to</li>
                <li>Rumination on posts — "Did I say the wrong thing? Why didn't they like it?"</li>
                <li>Replaces real-world social skill building — avoidance in a new form</li>
              </ul>
            ),
          }}
        />

        <h2
          id="mechanisms"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How Social Media Fuels Social Anxiety
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Upward Social Comparison
        </h3>
        <p className="mb-6">
          Social media is a highlight reel, not a documentary. People post their best moments, most flattering photos,
          and biggest accomplishments{', '}
          <Citation id="2" index={2} source="Journal of Computer-Mediated Communication" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          When you compare your <em>entire life</em> (including the mundane, the difficult, the unglamorous) to
          others" <em>curated highlights</em>, the comparison is inherently skewed. You see their successes, not their
          struggles. Their social events, not their lonely nights. Their confidence, not their insecurities.
        </p>
        <p className="mb-6">
          <strong>Result:</strong> "Everyone else has it together. I'm the only one struggling. There's something wrong
          with me.'
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Fear of Missing Out (FOMO)
        </h3>
        <p className="mb-6">
          Social media makes exclusion visible. You see photos from events you weren't invited to, friend groups you're
          not part of, experiences you're not having{', '}
          <Citation id="3" index={3} source="Computers in Human Behavior" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>For social anxiety:</strong> FOMO reinforces the belief that you're unlikeable, that others don't
          want you around, that you're on the outside looking in. Even when exclusion is neutral (you can't be invited
          to everything), it feels personal.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Seeking Validation Through Metrics
        </h3>
        <p className="mb-6">
          Likes, comments, shares — these become proxies for social approval. When a post gets engagement, it feels
          like acceptance. When it doesn't, it feels like rejection{', '}
          <Citation id="6" index={4} source="Anxiety, Stress, and Coping" year="2020" tier={1} />.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>The cycle:</strong> Post something → anxiously check for reactions → interpret low engagement as
            social rejection → feel worse about yourself → ruminate on what you posted
          </li>
          <li>
            <strong>Comparison within yourself:</strong> "This post got 50 likes, but my last one got 100. What did I do
            wrong?"
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Passive Scrolling vs. Active Engagement
        </h3>
        <p className="mb-6">
          Research distinguishes between active social media use (posting, commenting, messaging) and passive use
          (scrolling, watching, lurking){', '}
          <Citation id="5" index={5} source="Journal of Personality and Social Psychology" year="2021" tier={1} />.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Active use:</strong> Can foster connection and is associated with better well-being when
            interactions are positive
          </li>
          <li>
            <strong>Passive use:</strong> Strongly linked to increased anxiety, depression, and social comparison.
            Scrolling without engaging amplifies feelings of loneliness and inadequacy.
          </li>
        </ul>
        <p className="mb-6">
          For people with social anxiety, passive use is often the default — it feels safer than putting yourself out
          there, but it's also more harmful.
        </p>

        <h2
          id="platforms"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Platform-Specific Anxiety Triggers
        </h2>

        <ComparisonTable
          title="Social Anxiety Triggers by Platform"
          columns={['Platform', 'Primary Anxiety Trigger']}
          items={[
            {
              feature: 'Instagram',
              values: [
                'Visual comparison (appearance, lifestyle, activities)',
                'Likes as visible metrics of social approval',
              ],
            },
            {
              feature: 'Facebook',
              values: [
                "FOMO from seeing events/gatherings you're not part of",
                'Pressure to maintain curated persona for broader network',
              ],
            },
            {
              feature: 'Twitter/X',
              values: [
                "Fear of public criticism or 'getting canceled'",
                'Anxiety about saying the wrong thing in a permanent, searchable forum',
              ],
            },
            {
              feature: 'LinkedIn',
              values: [
                'Professional comparison (career success, achievements)',
                "Imposter syndrome and fear of being 'found out'",
              ],
            },
            {
              feature: 'TikTok',
              values: [
                'Algorithm-driven comparison to idealized content creators',
                'Pressure to be entertaining or go viral',
              ],
            },
          ]}
        />

        <ArticleCallout variant="did-you-know">
          <p>
            Research on Instagram specifically{', '}
            <Citation id="4" index={6} source="New Media & Society" year="2020" tier={1} /> found that the platform's
            visual, curated nature makes it particularly linked to appearance anxiety, lifestyle comparison, and FOMO
            among young adults with social anxiety.
          </p>
        </ArticleCallout>

        <h2
          id="healthier-use"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Strategies for Healthier Social Media Use
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Audit Your Follow List
        </h3>
        <p className="mb-6">
          Not all accounts affect you the same way. Unfollow, mute, or snooze accounts that consistently trigger
          comparison, envy, or inadequacy.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Notice which accounts make you feel worse after viewing them</li>
          <li>It's okay to unfollow friends whose content (even unintentionally) fuels your anxiety</li>
          <li>Follow accounts that are educational, inspiring, or genuinely joyful rather than aspirational</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Shift from Passive to Active Use
        </h3>
        <p className="mb-6">
          When you use social media, engage intentionally rather than scrolling passively:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Comment meaningfully on friends" posts instead of just liking</li>
          <li>Send direct messages to maintain one-on-one connection</li>
          <li>Share content that reflects your values and interests, not what you think will get likes</li>
          <li>Set a timer: "I'll check for 10 minutes, then close the app"</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Challenge Social Media-Fueled Thoughts
        </h3>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'comparison',
              title: "'Everyone else is happier/more successful than me",
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Reality check:</strong> You're comparing your behind-the-scenes to their highlight reel.
                    Social media is performative, not realistic.
                  </p>
                  <p>
                    <strong>Alternative:</strong> "I'm seeing curated snapshots, not full lives. Everyone has struggles
                    they don't post about.'
                  </p>
                </div>
              ),
            },
            {
              id: 'validation',
              title: "Low engagement on my post means people don't like me",
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Reality check:</strong> Engagement is influenced by algorithms, timing, and random factors —
                    not your worth.
                  </p>
                  <p>
                    <strong>Alternative:</strong> "Likes are not a measure of my value or likability. The people who
                    matter to me know me beyond social media."
                  </p>
                </div>
              ),
            },
            {
              id: 'fomo',
              title: "Seeing people together without me proves I'm unlikeable",
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Reality check:</strong> You can't be included in everything. Exclusion from one event
                    doesn't mean rejection.
                  </p>
                  <p>
                    <strong>Alternative:</strong> 'People have different friend groups and plans. Not being invited to
                    one thing doesn't mean I'm unwanted overall.'
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Take Breaks: Digital Detox
        </h3>
        <p className="mb-6">
          Research on digital detoxes shows measurable benefits for anxiety and well-being{', '}
          <Citation id="7" index={7} source="Psychological Science" year="2021" tier={1} />.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>One-day breaks:</strong> Delete apps from your phone for a full day once a week
          </li>
          <li>
            <strong>Morning/evening boundaries:</strong> No social media for the first hour after waking or the last
            hour before bed
          </li>
          <li>
            <strong>Extended breaks:</strong> Try a week-long or month-long hiatus to reset your relationship with
            social media
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Use Social Media for What It's Actually Good For
        </h3>
        <p className="mb-6">
          Social media <em>can</em> support connection when used intentionally{', '}
          <Citation id="8" index={8} source="Clinical Psychology Review" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Staying in touch with long-distance friends or family</li>
          <li>Finding communities around shared interests or experiences (mental health support groups, hobbies)</li>
          <li>Organizing real-world meetups and events</li>
          <li>Learning and education through thoughtful content</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Social media is a tool, not a replacement for real connection.</strong> For people with social
            anxiety, it can feel like a safer alternative to face-to-face interaction — but passive use often makes
            anxiety worse, not better.
          </p>
          <p className="mb-4">
            The goal isn't to quit social media entirely (unless that feels right for you). The goal is to use it in
            ways that genuinely connect rather than isolate, that support rather than undermine your well-being.
          </p>
          <p>
            If social media consistently makes you feel worse about yourself, it's okay to step back. Your mental
            health is more important than staying digitally 'connected."
          </p>
        </ArticleCallout>
      </>
    ),
  },
];
