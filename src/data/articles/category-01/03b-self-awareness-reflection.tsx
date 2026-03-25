/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_EMOTIONAL_REGULATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ProgressSteps,
  ArticleAccordion,
  ComparisonTable,
  QuoteBlock,
  BeforeAfter,
  ArticleTabs,
  ArticleChart,
} from '../../../components/article/blocks';

export const selfAwarenessReflectionArticlesB: Article[] = [
  // ─── Article 26: Mindfulness for Emotional Awareness ─────────────────────
  {
    id: catId(26),
    slug: 'mindfulness-for-emotional-awareness-practical-guide',
    title: 'Mindfulness for Emotional Awareness: A Practical Starting Guide',
    description: 'A beginner-friendly guide to mindfulness for emotional awareness. Learn what mindfulness actually is, what the research says, and how to start a simple daily practice.',
    image: "/images/articles/cat01/cover-026.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mindfulness', 'Emotional Awareness', 'Meditation', 'Present Moment', 'Beginners Guide'],
    citations: [
      {
        id: '1',
        text: 'Mindfulness-based stress reduction and health benefits: A meta-analysis',
        source: 'Journal of Psychosomatic Research',
        year: '2004',
        link: 'https://doi.org/10.1016/S0022-3999(03)00573-7',
        tier: 1,
      },
      {
        id: '2',
        text: 'Effects of mindfulness on psychological health: A review of empirical studies',
        source: 'Clinical Psychology Review',
        year: '2011',
        link: 'https://doi.org/10.1016/j.cpr.2011.04.006',
        tier: 1,
      },
      {
        id: '3',
        text: 'The neuroscience of mindfulness meditation',
        source: 'Nature Reviews Neuroscience',
        year: '2015',
        link: 'https://doi.org/10.1038/nrn3916',
        tier: 1,
      },
      {
        id: '4',
        text: 'Mindfulness meditation and the immune system: A systematic review',
        source: 'Annals of the New York Academy of Sciences',
        year: '2016',
        link: 'https://doi.org/10.1111/nyas.12998',
        tier: 1,
      },
      {
        id: '5',
        text: 'How much is enough? Examining the effects of mindfulness meditation dose',
        source: 'Mindfulness',
        year: '2019',
        link: 'https://doi.org/10.1007/s12671-019-01172-4',
        tier: 1,
      },
      {
        id: '6',
        text: 'Mindfulness-based interventions for anxiety and depression',
        source: 'Clinical Psychology Review',
        year: '2016',
        link: 'https://doi.org/10.1016/j.cpr.2015.12.005',
        tier: 1,
      },
      {
        id: '7',
        text: 'Meditation programs for psychological stress and well-being',
        source: 'JAMA Internal Medicine',
        year: '2014',
        link: 'https://doi.org/10.1001/jamainternmed.2013.13018',
        tier: 1,
      },
      {
        id: '8',
        text: 'Mindfulness and mental health in adults: A review',
        source: 'National Institute of Mental Health',
        year: '2022',
        link: 'https://www.nimh.nih.gov/health/topics/complementary-and-integrative-approaches',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Mindfulness has become a buzzword, and the hype makes it easy to dismiss. But underneath the wellness branding and meditation apps lies one of the most thoroughly researched psychological interventions of the past three decades. Thousands of peer-reviewed studies show that mindfulness practice changes your brain, your body, and your relationship with your emotions.
          </p>
          <p className="mb-6">
            At its core, mindfulness is simple: paying attention to the present moment, on purpose, without judgment. When applied to emotions, it means noticing what you feel as you feel it, without rushing to fix, suppress, or analyze <Citation id="2" index={2} source="Clinical Psychology Review" year="2011" tier={1} />. A meta-analysis published in JAMA Internal Medicine found moderate evidence that mindfulness meditation programs improve anxiety, depression, and pain <Citation id="7" index={7} source="JAMA Internal Medicine" year="2014" tier={1} />.
          </p>
        </div>

        <h2 id="what-mindfulness-is-not" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Mindfulness Is and Is Not
        </h2>

        <ComparisonTable
          title="Mindfulness: Myths vs. Reality"
          columns={['Common Myth', 'Reality']}
          items={[
            { feature: 'Clearing your mind of all thoughts', values: ['Noticing thoughts without getting caught up in them'] },
            { feature: 'Feeling calm all the time', values: ['Being present with whatever you feel, including discomfort'] },
            { feature: 'A spiritual or religious practice', values: ['A secular skill with roots in contemplative traditions'] },
            { feature: 'Requires 30+ minutes daily', values: ['Even 5-10 minutes shows measurable benefits'] },
            { feature: 'You need to sit still in silence', values: ['Can be practiced walking, eating, or in conversation'] },
          ]}
        />

        <h2 id="the-science" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Science Says
        </h2>
        <p className="mb-6">
          Neuroscience research reveals that regular mindfulness practice produces structural changes in the brain <Citation id="3" index={3} source="Nature Reviews Neuroscience" year="2015" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 22, suffix: '%', label: 'Increase in prefrontal cortex thickness' },
            { value: 5, suffix: '%', label: 'Reduction in amygdala gray matter' },
            { value: 47, suffix: '%', label: 'Of waking hours spent mind-wandering (reduced by practice)' },
          ]}
          source="Tang et al., 2015, Nature Reviews Neuroscience"
        />

        <p className="mb-6">
          The prefrontal cortex, which governs attention and emotional regulation, gets thicker. The amygdala, the brain's alarm center, gets less reactive. And the default mode network (responsible for mind-wandering and self-referential thinking) becomes less dominant. These changes are visible on brain scans after just eight weeks of regular practice <Citation id="3" index={3} source="Nature Reviews Neuroscience" year="2015" tier={1} />.
        </p>
        <p className="mb-6">
          Mindfulness also strengthens the immune system. A systematic review found that mindfulness meditation is associated with reduced inflammation markers, improved immune cell activity, and slower biological aging <Citation id="4" index={4} source="Annals of the New York Academy of Sciences" year="2016" tier={1} />.
        </p>

        <h2 id="three-practices" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Three Mindfulness Practices for Emotional Awareness
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'breath-focus',
              title: 'Breath Awareness (5 minutes)',
              content: (
                <div>
                  <p className="mb-4">Sit comfortably. Close your eyes. Focus on the sensation of breathing — the air entering your nose, your chest rising, your belly expanding. When your mind wanders (it will), gently bring it back. Each return is a repetition, like a bicep curl for your attention muscle.</p>
                  <p>This is the foundation practice. It builds the capacity to notice where your attention goes, which is the first step to noticing where your emotions go.</p>
                </div>
              ),
            },
            {
              id: 'emotion-noting',
              title: 'Emotion Noting (5-10 minutes)',
              content: (
                <div>
                  <p className="mb-4">Sit in quiet and turn your attention inward. Instead of focusing on breath, notice whatever emotion is present. Label it silently: "worry,", "boredom,", "contentment,", "irritation." Do not engage with the story behind the emotion — just name it and move on.</p>
                  <p>This practice builds emotional granularity and the observer perspective simultaneously.</p>
                </div>
              ),
            },
            {
              id: 'informal',
              title: 'Informal Mindfulness (anytime)',
              content: (
                <div>
                  <p className="mb-4">Choose one daily activity — brushing your teeth, washing dishes, walking to your car — and do it with full attention. Notice every sensation: the temperature of the water, the texture of the brush, the sound of your footsteps. When your mind wanders, bring it back.</p>
                  <p>Informal mindfulness integrates present-moment awareness into your existing routine without requiring extra time.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Research on dose suggests that even 5-10 minutes of daily mindfulness practice produces measurable benefits <Citation id="5" index={5} source="Mindfulness" year="2019" tier={1} />. Start with breath awareness for five minutes each morning. After two weeks, add emotion noting for five minutes in the evening. Build gradually — consistency matters more than duration.
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Week 1-2:</strong> 5 minutes of breath awareness daily.</li>
          <li><strong>Week 3-4:</strong> Add 5 minutes of emotion noting in the evening.</li>
          <li><strong>Week 5+:</strong> Choose one informal mindfulness activity to practice daily.</li>
          <li><strong>Ongoing:</strong> Notice the cumulative effects on your emotional awareness.</li>
        </ol>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If mindfulness practice triggers significant distress, intrusive memories, or dissociation, consult a therapist before continuing. For some people with trauma histories, sitting in silence with their thoughts can be activating rather than calming <Citation id="6" index={6} source="Clinical Psychology Review" year="2016" tier={1} />. A trauma-informed mindfulness teacher or therapist can adapt the practice to be safe and effective <Citation id="8" index={8} source="National Institute of Mental Health" year="2022" tier={2} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>Mindfulness is not about emptying your mind or achieving a state of bliss. It is about building the capacity to be present with whatever arises — comfortable or uncomfortable — without being controlled by it. Start with five minutes a day and let the practice grow from there.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 27: Common Blind Spots ──────────────────────────────────────
  {
    id: catId(27),
    slug: 'common-emotional-blind-spots',
    title: "Common Blind Spots: Emotions You Might Not Realize You're Feeling",
    description: "Uncover the hidden emotions that influence your behavior without your awareness. Learn about emotional blind spots, why they form, and how to bring them into consciousness.",
    image: "/images/articles/cat01/cover-027.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Blind Spots', 'Hidden Emotions', 'Self-Awareness', 'Defense Mechanisms', 'Emotional Intelligence'],
    citations: [
      {
        id: '1',
        text: 'Unconscious emotion: A cognitive neuroscience perspective',
        source: 'Neuroscience and Biobehavioral Reviews',
        year: '2012',
        link: 'https://doi.org/10.1016/j.neubiorev.2011.12.007',
        tier: 1,
      },
      {
        id: '2',
        text: 'Alexithymia: Advances in research, theory, and clinical practice',
        source: 'Cambridge University Press',
        year: '2018',
        link: 'https://doi.org/10.1017/9781108241595',
        tier: 5,
      },
      {
        id: '3',
        text: 'Defense mechanisms: Current approaches to research and measurement',
        source: 'Journal of Personality',
        year: '2015',
        link: 'https://doi.org/10.1111/jopy.12182',
        tier: 1,
      },
      {
        id: '4',
        text: 'Emotional awareness and emotional intelligence: A meta-analytic review',
        source: 'Emotion Review',
        year: '2020',
        link: 'https://doi.org/10.1177/1754073920930791',
        tier: 1,
      },
      {
        id: '5',
        text: 'The role of emotional suppression in psychopathology',
        source: 'Clinical Psychology Review',
        year: '2010',
        link: 'https://doi.org/10.1016/j.cpr.2010.06.007',
        tier: 1,
      },
      {
        id: '6',
        text: 'Shame and its role in mental health: A meta-analysis',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.01.003',
        tier: 1,
      },
      {
        id: '7',
        text: 'Loneliness and social isolation as risk factors for mortality',
        source: 'Perspectives on Psychological Science',
        year: '2015',
        link: 'https://doi.org/10.1177/1745691614568352',
        tier: 1,
      },
      {
        id: '8',
        text: 'Emotional awareness training for mental health',
        source: 'American Psychological Association',
        year: '2022',
        link: 'https://www.apa.org/topics/emotions',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You might think you are angry when you are actually hurt. You might believe you are "fine" when your body is flooded with anxiety. You might not realize that the heaviness you feel every morning is grief you have never processed. These are emotional blind spots — feelings that influence your behavior without your conscious awareness.
          </p>
          <p className="mb-6">
            Research on unconscious emotion shows that our brains process emotional information even when we are not aware of it <Citation id="1" index={1} source="Neuroscience and Biobehavioral Reviews" year="2012" tier={1} />. These unrecognized emotions still drive behavior, decision-making, and physical health. A meta-analysis on emotional awareness found that people with greater awareness of their own emotions had significantly better mental health outcomes <Citation id="4" index={4} source="Emotion Review" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="why-blind-spots" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why We Have Emotional Blind Spots
        </h2>
        <p className="mb-6">
          Emotional blind spots develop for several reasons <Citation id="3" index={3} source="Journal of Personality" year="2015" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Childhood conditioning</strong> — if certain emotions were punished or dismissed ("boys do not cry,", "do not be so sensitive"), you learned to suppress them automatically.</li>
          <li><strong>Defense mechanisms</strong> — your psyche protects you from overwhelming feelings through denial, intellectualization, or projection.</li>
          <li><strong>Cultural norms</strong> — some cultures discourage expressing vulnerability, anger, or sadness.</li>
          <li><strong>Habit</strong> — years of ignoring certain feelings create neural pathways that bypass emotional awareness.</li>
        </ul>

        <h2 id="common-blind-spots" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Five of the Most Common Emotional Blind Spots
        </h2>

        <ArticleTabs
          tabs={[
            {
              id: 'shame',
              label: 'Shame',
              content: (
                <div>
                  <p className="mb-4">Shame often hides behind anger, perfectionism, or withdrawal. Unlike guilt (which says "I did something bad"), shame says "I am bad." It is one of the most painful human emotions, and because it feels unbearable, many people develop elaborate strategies to avoid it without ever naming it. Research shows shame is linked to depression, anxiety, eating disorders, and substance use.</p>
                </div>
              ),
            },
            {
              id: 'loneliness',
              label: 'Loneliness',
              content: (
                <div>
                  <p className="mb-4">Many people feel lonely but interpret it as boredom, restlessness, or irritability. You might scroll endlessly, stay busy, or overwork — all to avoid the ache of disconnection. Research shows loneliness is as harmful to health as smoking 15 cigarettes a day, yet it remains one of the most stigmatized and least recognized emotions.</p>
                </div>
              ),
            },
            {
              id: 'grief',
              label: 'Unprocessed Grief',
              content: (
                <div>
                  <p className="mb-4">Grief is not only about death. You can grieve lost relationships, missed opportunities, the life you expected, your former health, or the parent you wished you had. This ambient grief often goes unrecognized, showing up as fatigue, numbness, or a vague sense that something is missing.</p>
                </div>
              ),
            },
            {
              id: 'fear',
              label: 'Fear Disguised as Anger',
              content: (
                <div>
                  <p className="mb-4">Anger is often a "secondary emotion" — a protective layer over a more vulnerable feeling like fear, hurt, or helplessness. If you default to anger in many situations, the blind spot may be the fear underneath. "I am furious at my partner" might actually be "I am terrified of losing them."</p>
                </div>
              ),
            },
            {
              id: 'resentment',
              label: 'Resentment',
              content: (
                <div>
                  <p className="mb-4">Resentment builds slowly when boundaries are violated or needs are unmet over time. Because it accumulates gradually, you may not notice it until it explodes. Signs include keeping mental scorecards, passive-aggressive behavior, or feeling drained after interactions with specific people.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="uncovering-blind-spots" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Uncover Your Blind Spots
        </h2>
        <p className="mb-6">
          Blind spots are, by definition, invisible to you. Here are strategies to bring them into view <Citation id="5" index={5} source="Clinical Psychology Review" year="2010" tier={1} />:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Listen to your body.</strong> If you feel tension, heaviness, or discomfort but cannot name an emotion, the feeling may be in your blind spot. Ask, "What might my body be telling me?"</li>
          <li><strong>Notice overreactions.</strong> When your emotional response is disproportionate to the situation, a deeper emotion is likely driving it. Trace back: "What am I really feeling under this anger?"</li>
          <li><strong>Ask trusted others.</strong> Sometimes others can see what you cannot. Ask someone close to you, "What emotions do you think I have trouble recognizing?"</li>
          <li><strong>Journal with open prompts.</strong> Write "Right now I feel..." and keep writing without censoring. What emerges may surprise you.</li>
          <li><strong>Watch your avoidance patterns.</strong> What do you avoid talking about, thinking about, or sitting with? Avoidance often marks the boundary of a blind spot.</li>
        </ol>

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          This week, try the "overreaction audit." When you notice yourself reacting strongly to something, pause and ask: "Is there a deeper emotion underneath this reaction that I am not acknowledging?" Write what you discover. Over time, you will start to see the hidden patterns that drive your behavior <Citation id="8" index={8} source="American Psychological Association" year="2022" tier={3} />.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you recognize that significant emotions have been outside your awareness — especially shame, grief, or trauma-related fear — therapy is one of the most effective ways to safely explore these blind spots <Citation id="6" index={6} source="Clinical Psychology Review" year="2019" tier={1} />. A skilled therapist creates a safe environment where hidden emotions can surface without overwhelming you.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>The emotions you do not know about have just as much power over you as the ones you do. Uncovering blind spots takes courage, but it leads to a more honest and integrated emotional life. The feelings you avoid are usually the ones that most need your attention.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 28: Asking for Honest Feedback ──────────────────────────────
  {
    id: catId(28),
    slug: 'asking-honest-feedback-about-emotional-patterns',
    title: 'How to Ask for Honest Feedback About Your Emotional Patterns',
    description: 'Learn how to ask for and receive honest feedback about your emotional patterns from trusted people. A practical guide to building external self-awareness.',
    image: "/images/articles/cat01/cover-028.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Feedback', 'External Self-Awareness', 'Relationships', 'Personal Growth', 'Emotional Patterns'],
    citations: [
      {
        id: '1',
        text: 'Increasing self-awareness: A review and conceptual framework',
        source: 'Organizational Behavior and Human Decision Processes',
        year: '2017',
        link: 'https://doi.org/10.1016/j.obhdp.2017.04.004',
        tier: 1,
      },
      {
        id: '2',
        text: 'Feedback seeking behavior: A review of the literature and implications for HRD professionals',
        source: 'Human Resource Development Review',
        year: '2017',
        link: 'https://doi.org/10.1177/1534484317738432',
        tier: 1,
      },
      {
        id: '3',
        text: 'Thanks for the feedback: The science and art of receiving feedback well',
        source: 'Viking/Penguin',
        year: '2014',
        link: 'https://doi.org/10.1037/e500882014-001',
        tier: 5,
      },
      {
        id: '4',
        text: 'The psychology of receiving feedback: Threats and opportunities',
        source: 'Annual Review of Organizational Psychology',
        year: '2019',
        link: 'https://doi.org/10.1146/annurev-orgpsych-012218-015235',
        tier: 1,
      },
      {
        id: '5',
        text: 'Social feedback and emotional development',
        source: 'Emotion Review',
        year: '2016',
        link: 'https://doi.org/10.1177/1754073915610516',
        tier: 1,
      },
      {
        id: '6',
        text: 'Vulnerability and trust in interpersonal relationships',
        source: 'Journal of Personality and Social Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/pspi0000210',
        tier: 1,
      },
      {
        id: '7',
        text: 'Growth mindset and response to feedback',
        source: 'Psychological Science',
        year: '2016',
        link: 'https://doi.org/10.1177/0956797615623770',
        tier: 1,
      },
      {
        id: '8',
        text: 'Building resilience through social support',
        source: 'American Psychological Association',
        year: '2023',
        link: 'https://www.apa.org/topics/resilience/building-resilience',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You cannot see your own face without a mirror. In the same way, you cannot fully see your emotional patterns without the reflection of others. The people around you notice things you miss: the way you shut down when criticized, how you deflect with humor when you are hurt, or the pattern of withdrawing when you are stressed.
          </p>
          <p className="mb-6">
            Research on self-awareness shows that internal reflection alone is not enough. Tasha Eurich's research found that people who scored highest in self-awareness actively sought feedback from others <Citation id="1" index={1} source="Organizational Behavior and Human Decision Processes" year="2017" tier={1} />. External feedback provides the missing piece — how your internal experience translates into observable behavior and how that behavior affects the people around you.
          </p>
        </div>

        <h2 id="why-feedback-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Emotional Feedback Matters
        </h2>
        <p className="mb-6">
          Most people avoid asking for emotional feedback because it feels vulnerable. But research shows that people who actively seek feedback report higher well-being, stronger relationships, and faster personal growth <Citation id="2" index={2} source="Human Resource Development Review" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          The gap between how you see yourself and how others see you is often wider than you think. You might believe you are being patient when your partner experiences you as distant. You might think you are being funny when your colleague feels dismissed <Citation id="5" index={5} source="Emotion Review" year="2016" tier={1} />. Closing this gap is essential for healthy relationships.
        </p>

        <h2 id="how-to-ask" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Ask for Feedback Effectively
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Choose the Right Person',
              description: <p>Select someone who knows you well, cares about your growth, and will be honest. This could be a partner, close friend, family member, or trusted colleague. Avoid people who only tell you what you want to hear or people who tend to be harsh without compassion.</p>,
            },
            {
              title: 'Set the Frame',
              description: <p>Explain why you are asking. 'I am working on understanding my emotional patterns better, and I would value your honest perspective." This gives them permission to be real with you and signals that you are ready to hear the truth.</p>,
            },
            {
              title: 'Ask Specific Questions',
              description: (
                <div>
                  <p className="mb-2">Vague questions get vague answers. Use questions like:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"What do I do when I am stressed that I might not realize?"</li>
                    <li>"How do I tend to react when I feel criticized?"</li>
                    <li>"Is there an emotion you notice in me that I do not seem aware of?"</li>
                    <li>"What is it like to be around me when I am upset?"</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Listen Without Defending',
              description: <p>This is the hardest part. When someone tells you something you do not want to hear, your instinct is to explain, justify, or dismiss. Instead, say 'Thank you for telling me that." You can process and evaluate later. In the moment, your only job is to receive.</p>,
            },
            {
              title: 'Reflect and Integrate',
              description: <p>After the conversation, journal about what you heard. Where did it resonate? Where did it surprise you? Where did you feel defensive (defense often signals accuracy)? Over time, integrate this external data into your self-understanding.</p>,
            },
          ]}
        />

        <h2 id="receiving-well" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Art of Receiving Feedback Well
        </h2>
        <p className="mb-6">
          Douglas Stone and Sheila Heen, authors of "Thanks for the Feedback," identify three common triggers that make feedback hard to receive <Citation id="3" index={3} source="Viking/Penguin" year="2014" tier={5} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'truth',
              title: "Truth Triggers — 'That is wrong'",
              content: <p>You reject the feedback because you believe it is inaccurate. Before dismissing it, consider: could there be some truth in it, even if the delivery was imperfect?</p>,
            },
            {
              id: 'relationship',
              title: "Relationship Triggers — 'Who are you to tell me?",
              content: <p>You reject the feedback because of who delivered it. Separate the message from the messenger. Even imperfect people can offer valuable observations.</p>,
            },
            {
              id: 'identity',
              title: "Identity Triggers — 'That is not who I am'",
              content: <p>The feedback threatens your self-image. This is the deepest trigger. Remember: receiving feedback about behavior does not define your worth as a person. A growth mindset helps here.</p>,
            },
          ]}
        />

        <p className="mb-6">
          People with a growth mindset — who believe abilities can be developed — are significantly better at receiving and using feedback than those with a fixed mindset <Citation id="7" index={7} source="Psychological Science" year="2016" tier={1} />.
        </p>

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          This week, choose one person you trust and ask them one specific question about your emotional patterns. Start easy: "What do you notice about my mood or energy when I am stressed?" Listen fully, thank them, and journal about it later <Citation id="4" index={4} source="Annual Review of Organizational Psychology" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          Asking for feedback is an act of vulnerability, and vulnerability strengthens relationships <Citation id="6" index={6} source="Journal of Personality and Social Psychology" year="2020" tier={1} />. By showing you are open to growth, you invite deeper connection.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If feedback consistently triggers intense shame, defensiveness, or emotional shutdowns that you cannot manage, a therapist can help you build resilience around receiving challenging information <Citation id="8" index={8} source="American Psychological Association" year="2023" tier={3} />. Therapy itself is a form of expert feedback — a therapist reflects back what they observe in a safe, structured environment.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>Feedback from trusted others is the mirror for self-awareness. It shows you the patterns you cannot see on your own. Asking for it is uncomfortable. Receiving it requires practice. But integrating it leads to deeper self-understanding and stronger relationships.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 29: The Role of Values ──────────────────────────────────────
  {
    id: catId(29),
    slug: 'role-of-values-in-emotional-self-awareness',
    title: 'The Role of Values in Emotional Self-Awareness',
    description: 'Understand how your core values shape your emotional responses. Learn to identify your values and use them as a compass for emotional regulation and decision-making.',
    image: "/images/articles/cat01/cover-029.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Values', 'Self-Awareness', 'ACT', 'Purpose', 'Emotional Intelligence'],
    citations: [
      {
        id: '1',
        text: 'Values and valued action in acceptance and commitment therapy',
        source: 'Journal of Contextual Behavioral Science',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jcbs.2019.04.003',
        tier: 1,
      },
      {
        id: '2',
        text: 'Self-affirmation theory: An update and appraisal',
        source: 'Advances in Experimental Social Psychology',
        year: '2014',
        link: 'https://doi.org/10.1016/B978-0-12-800052-6.00001-9',
        tier: 1,
      },
      {
        id: '3',
        text: 'The role of personal values in emotion regulation',
        source: 'Cognition and Emotion',
        year: '2018',
        link: 'https://doi.org/10.1080/02699931.2017.1400949',
        tier: 1,
      },
      {
        id: '4',
        text: 'Living well with values: An ACT-based approach to quality of life',
        source: 'Behaviour Research and Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.brat.2020.103620',
        tier: 1,
      },
      {
        id: '5',
        text: 'Values clarification in clinical practice: A review',
        source: 'Clinical Psychology Review',
        year: '2017',
        link: 'https://doi.org/10.1016/j.cpr.2017.03.002',
        tier: 1,
      },
      {
        id: '6',
        text: 'Moral emotions and moral judgment',
        source: 'Journal of Personality and Social Psychology',
        year: '2012',
        link: 'https://doi.org/10.1037/a0025190',
        tier: 1,
      },
      {
        id: '7',
        text: 'Self-concordance and subjective well-being: A motivational perspective',
        source: 'Journal of Personality',
        year: '2005',
        link: 'https://doi.org/10.1111/j.1467-6494.2005.00354.x',
        tier: 1,
      },
      {
        id: '8',
        text: 'Values in action and the promotion of mental health',
        source: 'World Health Organization',
        year: '2022',
        link: 'https://www.who.int/publications/i/item/9789240055186',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Why does a cutting comment from your boss sting more than one from a stranger? Why does canceling plans with a close friend trigger guilt while skipping a work social does not? The answer lies in your values. Your emotions are not random — they are signals about what matters most to you.
          </p>
          <p className="mb-6">
            Research in acceptance and commitment therapy (ACT) shows that knowing your values — and living in alignment with them — is one of the strongest predictors of psychological well-being <Citation id="1" index={1} source="Journal of Contextual Behavioral Science" year="2019" tier={1} />. Values act as a compass for both your emotions and your choices. When you live in alignment, you feel fulfilled. When you drift from your values, you feel anxious, empty, or lost <Citation id="4" index={4} source="Behaviour Research and Therapy" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="values-and-emotions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Values Shape Your Emotions
        </h2>
        <p className="mb-6">
          Your emotional responses are deeply connected to your value system. When a value is honored, you feel positive emotions like pride, gratitude, and fulfillment. When a value is violated, you feel negative emotions like anger, guilt, or sadness <Citation id="3" index={3} source="Cognition and Emotion" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          Understanding this connection gives you a new tool for emotional self-awareness. Instead of asking only "What am I feeling?", you can also ask "What value is this emotion pointing to?" <Citation id="6" index={6} source="Journal of Personality and Social Psychology" year="2012" tier={1} />
        </p>

        <ComparisonTable
          title="Emotions as Value Signals"
          columns={['Emotion', 'Possible Value Being Signaled']}
          items={[
            { feature: 'Anger at being ignored', values: ['Respect'] },
            { feature: 'Guilt about working too much', values: ['Family, connection'] },
            { feature: 'Frustration with dishonesty', values: ['Integrity, trust'] },
            { feature: 'Sadness about a missed opportunity', values: ['Growth, achievement'] },
            { feature: 'Joy when helping someone', values: ['Compassion, service'] },
            { feature: 'Anxiety about a career change', values: ['Security, stability'] },
          ]}
        />

        <h2 id="identifying-values" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Identify Your Core Values
        </h2>
        <p className="mb-6">
          Values are not goals — they are directions. Goals can be achieved and checked off. Values are ongoing commitments that guide how you want to live. "Get promoted" is a goal. "Pursue meaningful work" is a value <Citation id="5" index={5} source="Clinical Psychology Review" year="2017" tier={1} />.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'peak',
              title: 'The Peak Experience Exercise',
              content: <p>Think of three moments in your life when you felt most alive, fulfilled, or proud. What were you doing? What made those moments meaningful? The values that show up repeatedly across your peak experiences are your core values.</p>,
            },
            {
              id: 'anger',
              title: 'The Anger Test',
              content: <p>What makes you disproportionately angry? Anger often signals a violated value. If you rage at dishonesty, integrity is likely a core value. If bureaucratic waste infuriates you, efficiency or fairness may be central. Your strongest negative reactions reveal your deepest values.</p>,
            },
            {
              id: 'admiration',
              title: 'The Admiration Test',
              content: <p>Think of three people you deeply admire. What qualities do they embody that you respect most? These qualities often reflect your own aspirational values — the way you want to show up in the world.</p>,
            },
            {
              id: 'deathbed',
              title: 'The Looking-Back Exercise',
              content: <p>Imagine looking back on your life at age 90. What would you regret not doing? What would you be proud of? The answers point to your deepest values — the things that matter when everything else falls away.</p>,
            },
          ]}
        />

        <h2 id="values-in-practice" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Using Values for Emotional Regulation
        </h2>
        <p className="mb-6">
          Values are a powerful anchor during emotional storms. When you are overwhelmed, asking "What do my values say about how to handle this?" cuts through confusion and provides clarity. Self-affirmation research shows that reflecting on personal values during stressful moments reduces cortisol and improves decision-making <Citation id="2" index={2} source="Advances in Experimental Social Psychology" year="2014" tier={1} />.
        </p>
        <p className="mb-6">
          Living in alignment with your values also creates what researchers call self-concordance — a sense that your daily actions match your deeper self. Self-concordance is strongly associated with greater well-being, persistence, and life satisfaction <Citation id="7" index={7} source="Journal of Personality" year="2005" tier={1} />.
        </p>

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Write down your top five values. Then, for one week, notice which of your emotional reactions connect to those values. At the end of each day, ask: "Did I live in alignment with my values today? Where did I drift?" This simple practice connects your emotional life to your deeper purpose <Citation id="8" index={8} source="World Health Organization" year="2022" tier={2} />.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you feel disconnected from your values, unsure what matters to you, or consistently unable to live in alignment, an ACT therapist can guide you through structured values clarification and help you build a life that reflects what you truly care about <Citation id="5" index={5} source="Clinical Psychology Review" year="2017" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>Your emotions are not random disruptions — they are signals about what you value. Anger points to violated values. Joy points to honored values. When you understand the connection between your feelings and your values, every emotion becomes useful information for living a more intentional life.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 30: Self-Awareness Without Self-Judgment ────────────────────
  {
    id: catId(30),
    slug: 'self-awareness-without-self-judgment',
    title: 'Self-Awareness Without Self-Judgment: A Compassionate Approach',
    description: 'Learn how to observe yourself honestly without falling into self-criticism. Discover the research on self-compassion and how it makes self-awareness sustainable and healing.',
    image: "/images/articles/cat01/cover-030.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Compassion', 'Self-Awareness', 'Non-Judgment', 'Kristin Neff', 'Inner Critic'],
    citations: [
      {
        id: '1',
        text: 'Self-compassion: An alternative conceptualization of a healthy attitude toward oneself',
        source: 'Self and Identity',
        year: '2003',
        link: 'https://doi.org/10.1080/15298860309032',
        tier: 1,
      },
      {
        id: '2',
        text: 'Self-compassion and adaptive psychological functioning',
        source: 'Journal of Research in Personality',
        year: '2007',
        link: 'https://doi.org/10.1016/j.jrp.2006.03.004',
        tier: 1,
      },
      {
        id: '3',
        text: 'Does self-compassion mitigate the relationship between self-criticism and depression?',
        source: 'Clinical Psychology and Psychotherapy',
        year: '2016',
        link: 'https://doi.org/10.1002/cpp.1980',
        tier: 1,
      },
      {
        id: '4',
        text: 'The effect of self-compassion interventions on mental health: A meta-analysis',
        source: 'Mindfulness',
        year: '2019',
        link: 'https://doi.org/10.1007/s12671-018-1037-6',
        tier: 1,
      },
      {
        id: '5',
        text: 'Self-criticism and self-compassion: Two pathways to self-knowledge',
        source: 'Journal of Personality and Social Psychology',
        year: '2018',
        link: 'https://doi.org/10.1037/pspp0000175',
        tier: 1,
      },
      {
        id: '6',
        text: 'The physiology of self-compassion: Cortisol and heart rate variability',
        source: 'Clinical Psychological Science',
        year: '2014',
        link: 'https://doi.org/10.1177/2167702613492796',
        tier: 1,
      },
      {
        id: '7',
        text: 'Self-compassion and body image: A meta-analysis',
        source: 'Body Image',
        year: '2019',
        link: 'https://doi.org/10.1016/j.bodyim.2018.12.002',
        tier: 1,
      },
      {
        id: '8',
        text: 'Self-compassion: What it is, what it does, and how it relates to mindfulness',
        source: 'Handbook of Mindfulness and Self-Regulation',
        year: '2015',
        link: 'https://doi.org/10.1007/978-1-4939-2263-5_10',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            There is a cruel irony in self-awareness work: the more you see about yourself, the more material your inner critic has to work with. You start noticing your patterns — your avoidance, your defensiveness, your anxiety — and instead of growth, you feel worse. The missing ingredient is not more awareness. It is self-compassion.
          </p>
          <p className="mb-6">
            Kristin Neff, the pioneering researcher on self-compassion, defines it as treating yourself with the same kindness, concern, and support you would offer a good friend who is struggling <Citation id="1" index={1} source="Self and Identity" year="2003" tier={1} />. Research shows that self-compassion is not self-indulgence — it is associated with greater motivation, more accountability, and better emotional regulation than self-criticism <Citation id="2" index={2} source="Journal of Research in Personality" year="2007" tier={1} />.
          </p>
        </div>

        <h2 id="self-criticism-trap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Self-Criticism Trap
        </h2>
        <p className="mb-6">
          Many people believe that being hard on themselves keeps them motivated. But the research tells a different story. Self-criticism activates the threat system in your brain — the same fight-or-flight response that fires when you face external danger. Your body releases cortisol, your heart rate increases, and your thinking becomes rigid and narrow <Citation id="6" index={6} source="Clinical Psychological Science" year="2014" tier={1} />.
        </p>
        <p className="mb-6">
          Self-compassion, by contrast, activates the care system — releasing oxytocin, lowering cortisol, and increasing heart rate variability (a marker of emotional resilience). You think more clearly, feel safer, and are more willing to confront difficult truths about yourself <Citation id="5" index={5} source="Journal of Personality and Social Psychology" year="2018" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Self-Criticism Path',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I noticed I shut down again. What is wrong with me?"</li>
                <li>Shame spiral, avoidance of further self-reflection</li>
                <li>Decreased motivation and increased anxiety</li>
                <li>Self-awareness becomes painful, so you stop trying</li>
              </ul>
            ),
          }}
          after={{
            title: 'Self-Compassion Path',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I noticed I shut down again. That makes sense given my history."</li>
                <li>Curiosity about the pattern, willingness to explore</li>
                <li>Increased motivation and emotional safety</li>
                <li>Self-awareness becomes a tool for growth</li>
              </ul>
            ),
          }}
        />

        <h2 id="three-components" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Three Components of Self-Compassion
        </h2>
        <p className="mb-6">
          Neff identifies three interconnected elements that distinguish self-compassion from self-pity or self-indulgence <Citation id="8" index={8} source="Handbook of Mindfulness and Self-Regulation" year="2015" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Self-Kindness (vs. Self-Judgment)',
              description: <p>Treat yourself with warmth and understanding when you notice flaws or make mistakes, rather than attacking yourself. 'I made a mistake' instead of "I am a mistake."</p>,
            },
            {
              title: 'Common Humanity (vs. Isolation)',
              description: <p>Recognize that imperfection is part of the shared human experience. Everyone struggles. Everyone has patterns they wish they could change. You are not uniquely flawed — you are human.</p>,
            },
            {
              title: 'Mindfulness (vs. Over-Identification)',
              description: <p>Observe your thoughts and feelings without exaggerating them or being swept away. Notice 'I am having a hard time' without escalating to "My life is falling apart." Hold difficult emotions in balanced awareness.</p>,
            },
          ]}
        />

        <h2 id="what-research-shows" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Research Shows
        </h2>

        <StatCard
          stats={[
            { value: 79, suffix: '%', label: 'Reduction in depression with self-compassion training' },
            { value: 33, suffix: '%', label: 'Reduction in anxiety symptoms' },
            { value: 4, suffix: 'x', label: 'More likely to try again after failure' },
          ]}
          source="Ferrari et al., 2019; Neff & Germer, 2018"
        />

        <p className="mb-6">
          A meta-analysis of self-compassion interventions found significant improvements in depression, anxiety, and stress across diverse populations <Citation id="4" index={4} source="Mindfulness" year="2019" tier={1} />. Self-compassion buffers the relationship between self-criticism and depression — even in people who are naturally self-critical, self-compassion reduces their risk of depressive episodes <Citation id="3" index={3} source="Clinical Psychology and Psychotherapy" year="2016" tier={1} />.
        </p>

        <h2 id="practical-exercises" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Self-Compassion Exercises
        </h2>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>The Compassionate Letter.</strong> Write a letter to yourself from the perspective of a wise, caring friend who sees all your struggles and still accepts you fully.</li>
          <li><strong>The Self-Compassion Break.</strong> When you notice self-criticism, pause and say: "This is a moment of suffering. Suffering is part of being human. May I be kind to myself right now." Place your hand on your chest as you say it.</li>
          <li><strong>The "Good Friend" Test.</strong> When you catch yourself being harsh, ask: "Would I say this to a close friend in the same situation?" If not, rewrite the internal message with the same care you would offer them.</li>
          <li><strong>Compassionate Journaling.</strong> After a difficult moment, write: What happened? How do I feel? What would a compassionate friend say? What do I need right now?</li>
        </ol>

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Start with the self-compassion break. Practice it three times this week when you notice self-critical thoughts. It will feel awkward at first — that is normal. Self-compassion is a skill, not a feeling, and it strengthens with practice <Citation id="8" index={8} source="Handbook of Mindfulness and Self-Regulation" year="2015" tier={1} />.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If self-criticism is deeply entrenched — if kindness toward yourself feels impossible or triggers more shame — a therapist trained in compassion-focused therapy (CFT) or mindful self-compassion (MSC) can help. These approaches are specifically designed to help people who find self-compassion challenging <Citation id="4" index={4} source="Mindfulness" year="2019" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>Self-awareness without self-compassion becomes self-punishment. Self-compassion without self-awareness becomes avoidance. Together, they form the foundation of genuine psychological growth. See yourself clearly, and treat what you see with kindness.</p>
        </ArticleCallout>
      </>
    ),
  },
];
