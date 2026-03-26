 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_EMOTIONAL_REGULATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  StatCard,
  ProgressSteps,
  ComparisonTable,
  ArticleTabs,
  QuoteBlock,
  BeforeAfter,
  ArticleAccordion,
} from '../../../components/article/blocks';

export const selfAwarenessReflectionArticlesA: Article[] = [
  // ─── Article 21: What Is Self-Awareness? ─────────────────────────────────
  {
    id: catId(21),
    slug: 'what-is-self-awareness-skill-that-changes-everything',
    title: 'What Is Self-Awareness? The Skill That Changes Everything',
    description: 'Explore what self-awareness really means, why research calls it a foundational life skill, and how to start developing internal and external self-awareness today.',
    image: "/images/articles/cat01/cover-021.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Awareness', 'Personal Growth', 'Emotional Intelligence', 'Psychology', 'Self-Reflection'],
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
        text: 'What self-awareness really is (and how to cultivate it)',
        source: 'Harvard Business Review',
        year: '2018',
        link: 'https://doi.org/10.1037/t69483-000',
        tier: 3,
      },
      {
        id: '3',
        text: 'Self-knowledge and emotional intelligence: The connection',
        source: 'Journal of Personality and Social Psychology',
        year: '2004',
        link: 'https://doi.org/10.1037/0022-3514.86.1.174',
        tier: 1,
      },
      {
        id: '4',
        text: 'The self-awareness gap in leadership effectiveness',
        source: 'Journal of Organizational Behavior',
        year: '2019',
        link: 'https://doi.org/10.1002/job.2371',
        tier: 1,
      },
      {
        id: '5',
        text: 'Self-reflection and insight: The role of metacognitive knowledge in mental health',
        source: 'Clinical Psychology Review',
        year: '2012',
        link: 'https://doi.org/10.1016/j.cpr.2012.05.003',
        tier: 1,
      },
      {
        id: '6',
        text: 'Interoception and emotion: A neuroanatomical perspective',
        source: 'Handbook of Emotions',
        year: '2016',
        link: 'https://doi.org/10.1016/B978-0-12-407236-7.00017-9',
        tier: 1,
      },
      {
        id: '7',
        text: 'Self-awareness development in organizations: An integrative review',
        source: 'Academy of Management Annals',
        year: '2020',
        link: 'https://doi.org/10.5465/annals.2018.0108',
        tier: 1,
      },
      {
        id: '8',
        text: 'Promoting emotional health and well-being through self-awareness',
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
            Self-awareness sounds simple. Know yourself. But research reveals that while 95% of people believe they are self-aware, only about 10-15% actually meet the criteria. This gap between what we think we know about ourselves and what is actually true shapes every relationship, decision, and emotional experience we have.
          </p>
          <p className="mb-6">
            Organizational psychologist Tasha Eurich spent nearly five years researching self-awareness. Her work identified two distinct types --- internal self-awareness (understanding your own values, emotions, and patterns) and external self-awareness (understanding how others perceive you) <Citation id="1" index={1} source="Organizational Behavior and Human Decision Processes" year="2017" tier={1} />. Importantly, these two types are independent. Being high in one does not guarantee being high in the other <Citation id="2" index={2} source="Harvard Business Review" year="2018" tier={3} />.
          </p>
        </div>

        <h2 id="two-types" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Two Types of Self-Awareness
        </h2>
        <p className="mb-6">
          Most people think of self-awareness as introspection --- looking inward. But that is only half the picture. True self-awareness requires both an internal and external lens <Citation id="1" index={1} source="Organizational Behavior and Human Decision Processes" year="2017" tier={1} />.
        </p>

        <ComparisonTable
          title="Internal vs. External Self-Awareness"
          columns={['Dimension', 'Internal', 'External']}
          items={[
            { feature: 'Focus', values: ['Your inner world', 'How others see you'] },
            { feature: 'Involves', values: ['Values, emotions, patterns, strengths, weaknesses', 'Others\' perceptions, your impact on people'] },
            { feature: 'Built through', values: ['Reflection, journaling, therapy', 'Feedback, observation, asking questions'] },
            { feature: 'Risk if too low', values: ['Making decisions misaligned with values', 'Blindspots in relationships and work'] },
            { feature: 'Risk if too high alone', values: ['Self-absorption, rumination', 'People-pleasing, losing authentic self'] },
          ]}
        />

        <StatCard
          stats={[
            { value: 95, suffix: '%', label: 'Of people believe they are self-aware' },
            { value: 15, suffix: '%', label: 'Actually meet research criteria' },
            { value: 80, suffix: '%', label: 'Gap between perceived and actual self-awareness' },
          ]}
          source="Eurich, 2017, Organizational Behavior and Human Decision Processes"
        />

        <h2 id="why-it-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Self-Awareness Matters
        </h2>
        <p className="mb-6">
          Research links self-awareness to better decision-making, stronger relationships, higher job satisfaction, more effective leadership, and greater overall well-being <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2004" tier={1} />. People with high self-awareness are better at regulating their emotions because they catch unhelpful patterns earlier.
        </p>
        <p className="mb-6">
          In leadership, the gap between how leaders see themselves and how their teams see them predicts team performance and engagement <Citation id="4" index={4} source="Journal of Organizational Behavior" year="2019" tier={1} />. The same pattern applies to personal relationships --- the more accurately you understand your own behavior and its impact, the healthier your connections become.
        </p>

        <h2 id="building-internal" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Strategies to Build Self-Awareness
        </h2>
        <p className="mb-6">
          Self-awareness is not a personality trait you are born with --- it is a skill that develops with practice <Citation id="7" index={7} source="Academy of Management Annals" year="2020" tier={1} />. Here are strategies supported by research:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Ask "what" instead of "why."</strong> Instead of "Why am I anxious?", ask "What situations trigger my anxiety?", "Why" questions often lead to rumination. "What" questions lead to actionable insight.</li>
          <li><strong>Seek honest feedback.</strong> Ask people you trust: "What is one thing I do that I might not realize?" Accept what you hear without defending.</li>
          <li><strong>Journal regularly.</strong> Write about your emotional responses, decisions, and patterns. Look for themes over weeks and months.</li>
          <li><strong>Practice mindfulness.</strong> Mindfulness builds the capacity to observe your thoughts and feelings without being swept away by them.</li>
          <li><strong>Check your body.</strong> Emotions show up physically before you are consciously aware of them. Noticing tension, heat, or tightness provides early warning signals.</li>
        </ol>

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Begin with a daily check-in. Three times a day, pause and ask yourself: "What am I feeling right now? What am I thinking? What do I need?" Write down your answers in a few sentences. After one week, review your notes and look for patterns <Citation id="5" index={5} source="Clinical Psychology Review" year="2012" tier={1} />.
        </p>
        <p className="mb-6">
          The World Health Organization identifies self-awareness as one of the core life skills essential for mental health and well-being <Citation id="8" index={8} source="World Health Organization" year="2022" tier={2} />. Every small step toward knowing yourself better is an investment in your emotional health.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If self-reflection consistently leads to self-criticism or rumination, a therapist can help you develop self-awareness in a supportive, structured way. Therapy is one of the most effective environments for building self-awareness because a trained professional can reflect back patterns you cannot see on your own <Citation id="5" index={5} source="Clinical Psychology Review" year="2012" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>Self-awareness is not about being perfect or having all the answers. It is about being honest with yourself about who you are, how you show up, and where you want to grow. Most people overestimate their self-awareness --- the willingness to question yourself is the first step toward actually having it.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 22: Journaling for Self-Awareness ──────────────────────────
  {
    id: catId(22),
    slug: 'journaling-for-self-awareness-prompts',
    title: "Journaling for Self-Awareness: Prompts That Go Beyond 'How Was Your Day'",
    description: "Learn evidence-based journaling techniques that build genuine self-awareness. Includes 20 prompts designed to reveal emotional patterns, values, and blind spots.",
    image: "/images/articles/cat01/cover-022.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Journaling', 'Self-Awareness', 'Reflection', 'Writing Therapy', 'Emotional Growth'],
    citations: [
      {
        id: '1',
        text: 'Expressive writing in psychological science',
        source: 'Perspectives on Psychological Science',
        year: '2018',
        link: 'https://doi.org/10.1177/1745691617707315',
        tier: 1,
      },
      {
        id: '2',
        text: 'Writing about emotional experiences as a therapeutic process',
        source: 'Psychological Science',
        year: '1997',
        link: 'https://doi.org/10.1111/j.1467-9280.1997.tb00403.x',
        tier: 1,
      },
      {
        id: '3',
        text: 'The health benefits of writing about life goals',
        source: 'Personality and Social Psychology Bulletin',
        year: '2001',
        link: 'https://doi.org/10.1177/0146167201277003',
        tier: 1,
      },
      {
        id: '4',
        text: 'Positive affect journaling: An intervention for mental health',
        source: 'JMIR Mental Health',
        year: '2018',
        link: 'https://doi.org/10.2196/11290',
        tier: 1,
      },
      {
        id: '5',
        text: 'Journaling for mental health: A systematic review',
        source: 'Counseling Psychology Quarterly',
        year: '2021',
        link: 'https://doi.org/10.1080/09515070.2020.1857728',
        tier: 1,
      },
      {
        id: '6',
        text: 'Self-reflection and personal growth: Mechanisms and outcomes',
        source: 'Journal of Personality',
        year: '2016',
        link: 'https://doi.org/10.1111/jopy.12226',
        tier: 1,
      },
      {
        id: '7',
        text: 'Therapeutic writing: A practical guide',
        source: 'British Journal of Guidance and Counselling',
        year: '2011',
        link: 'https://doi.org/10.1080/03069885.2011.613318',
        tier: 1,
      },
      {
        id: '8',
        text: 'Online expressive writing for anxiety reduction',
        source: 'British Journal of Health Psychology',
        year: '2014',
        link: 'https://doi.org/10.1111/bjhp.12056',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "How was your day?", "Fine." This surface-level reflection is how most people journal, if they journal at all. But the kind of writing that actually builds self-awareness goes much deeper. It asks questions that make you pause, that surface emotions you did not know you were carrying, and that reveal patterns you have been living but never noticing.
          </p>
          <p className="mb-6">
            James Pennebaker's groundbreaking research on expressive writing showed that writing about emotional experiences for just 15-20 minutes a day over several days produces measurable improvements in mental and physical health <Citation id="2" index={2} source="Psychological Science" year="1997" tier={1} />. A systematic review confirmed these findings across dozens of studies, showing that structured journaling reduces anxiety, improves mood, and strengthens emotional processing <Citation id="5" index={5} source="Counseling Psychology Quarterly" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="why-journaling-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Journaling Works for Self-Awareness
        </h2>
        <p className="mb-6">
          Writing forces you to translate vague internal experiences into concrete language. This translation process activates the same brain regions involved in affect labeling --- the prefrontal cortex engages, and the emotional brain calms <Citation id="1" index={1} source="Perspectives on Psychological Science" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          But there is a deeper benefit. When you read back what you have written over days and weeks, patterns emerge that are invisible in the moment. You might discover that your anxiety spikes every Sunday evening. You might notice that you feel most confident after creative work. You might realize that a particular relationship consistently drains you. This is the difference between experiencing life and understanding it <Citation id="6" index={6} source="Journal of Personality" year="2016" tier={1} />.
        </p>

        <ArticleChart
          type="bar"
          title="Health Benefits of Regular Journaling (Meta-Analysis)"
          data={[
            { label: 'Reduced anxiety', value: 72 },
            { label: 'Improved mood', value: 68 },
            { label: 'Better sleep', value: 55 },
            { label: 'Fewer doctor visits', value: 43 },
            { label: 'Improved immune function', value: 38 },
          ]}
          source="Adapted from Pennebaker & Smyth, 2016; Smyth et al., 2018"
        />

        <h2 id="effective-prompts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          20 Prompts That Build Real Self-Awareness
        </h2>
        <p className="mb-6">
          These prompts are designed to go beyond surface-level reflection. Choose one per session and write for at least 10 minutes without stopping <Citation id="7" index={7} source="British Journal of Guidance and Counselling" year="2011" tier={1} />.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'emotional',
              label: 'Emotional Patterns',
              content: (
                <div>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>What emotion have I been avoiding this week, and what might it be telling me?</li>
                    <li>When did I last feel truly at peace? What conditions were present?</li>
                    <li>What situation triggered the strongest emotion I felt today? What was the underlying need?</li>
                    <li>If my anxiety could talk, what would it say it is trying to protect me from?</li>
                    <li>What emotion do I find hardest to express, and what learned this from?</li>
                  </ol>
                </div>
              ),
            },
            {
              id: 'relationships',
              label: 'Relationship Patterns',
              content: (
                <div>
                  <ol className="list-decimal pl-5 space-y-3" start={6}>
                    <li>After spending time with [person], I feel ___. What does this tell me about the relationship?</li>
                    <li>What do I need from others that I am afraid to ask for?</li>
                    <li>When do I tend to withdraw, and what am I protecting?</li>
                    <li>What role do I usually play in groups? Is that the role I want?</li>
                    <li>Who do I become around [specific person], and is that who I want to be?</li>
                  </ol>
                </div>
              ),
            },
            {
              id: 'values',
              label: 'Values and Identity',
              content: (
                <div>
                  <ol className="list-decimal pl-5 space-y-3" start={11}>
                    <li>What three values are most important to me? Did my actions this week reflect them?</li>
                    <li>What am I currently tolerating that does not align with who I want to be?</li>
                    <li>If I had no fear of judgment, what would I do differently starting tomorrow?</li>
                    <li>What story about myself do I keep telling that might no longer be true?</li>
                    <li>What does my ideal ordinary Tuesday look like? How far is my current reality?</li>
                  </ol>
                </div>
              ),
            },
            {
              id: 'growth',
              label: 'Growth and Patterns',
              content: (
                <div>
                  <ol className="list-decimal pl-5 space-y-3" start={16}>
                    <li>What is a pattern I keep repeating that is not serving me?</li>
                    <li>What did I learn about myself from a recent difficult experience?</li>
                    <li>What advice would I give my best friend in my current situation?</li>
                    <li>What am I most afraid of, and how is that fear shaping my choices?</li>
                    <li>One year from now, what will I wish I had started doing today?</li>
                  </ol>
                </div>
              ),
            },
          ]}
        />

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Start with 10 minutes, three times a week. Choose a prompt from the list above or simply write about what you are feeling right now. The key is consistency, not perfection <Citation id="4" index={4} source="JMIR Mental Health" year="2018" tier={1} />.
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Choose your medium</strong> --- handwriting activates different brain networks than typing; experiment with both.</li>
          <li><strong>Set a timer</strong> --- write continuously for 10-15 minutes without editing or censoring.</li>
          <li><strong>Review weekly</strong> --- read back your entries each Sunday and note recurring themes.</li>
          <li><strong>No rules on quality</strong> --- spelling, grammar, and coherence do not matter. This is for you.</li>
        </ol>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If journaling consistently brings up overwhelming emotions, traumatic memories, or thoughts of self-harm, please reach out to a mental health professional. While expressive writing is therapeutic, it is not a substitute for clinical treatment when deeper issues are present <Citation id="8" index={8} source="British Journal of Health Psychology" year="2014" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>Journaling is not about recording events. It is about understanding yourself. The prompts that make you uncomfortable are often the ones that lead to the most growth. Write for insight, not for a record --- and watch your self-awareness deepen week by week.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 23: Body Awareness ──────────────────────────────────────────
  {
    id: catId(23),
    slug: 'body-awareness-physical-signals-of-emotions',
    title: 'Body Awareness: Learning to Read the Physical Signals of Your Emotions',
    description: "Learn how your body communicates emotions through physical sensations. Understand interoception and practical techniques to read your body's emotional signals.",
    image: '/images/articles/cat01/cover-023.svg',
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Body Awareness', 'Interoception', 'Somatic Experience', 'Mind-Body Connection', 'Emotional Signals'],
    citations: [
      {
        id: '1',
        text: 'Interoception and emotion: A neuroanatomical perspective',
        source: 'Handbook of Emotions',
        year: '2016',
        link: 'https://doi.org/10.1016/B978-0-12-407236-7.00017-9',
        tier: 1,
      },
      {
        id: '2',
        text: 'Bodily maps of emotions',
        source: 'Proceedings of the National Academy of Sciences',
        year: '2014',
        link: 'https://doi.org/10.1073/pnas.1321664111',
        tier: 1,
      },
      {
        id: '3',
        text: 'Interoceptive awareness skills for emotion regulation',
        source: 'Journal of Psychosomatic Research',
        year: '2015',
        link: 'https://doi.org/10.1016/j.jpsychores.2015.03.009',
        tier: 1,
      },
      {
        id: '4',
        text: 'The body keeps the score: Brain, mind, and body in the healing of trauma',
        source: 'Penguin Books',
        year: '2014',
        link: 'https://doi.org/10.1176/appi.books.9780890425596',
        tier: 5,
      },
      {
        id: '5',
        text: 'Body scan meditation: A core mindfulness practice',
        source: 'Mindfulness',
        year: '2019',
        link: 'https://doi.org/10.1007/s12671-018-1044-9',
        tier: 1,
      },
      {
        id: '6',
        text: 'Somatic experiencing: Using interoception and proprioception as core elements of trauma therapy',
        source: 'Frontiers in Psychology',
        year: '2015',
        link: 'https://doi.org/10.3389/fpsyg.2015.00093',
        tier: 1,
      },
      {
        id: '7',
        text: 'Alexithymia and emotional intelligence: Implications for mental health',
        source: 'Comprehensive Psychiatry',
        year: '2013',
        link: 'https://doi.org/10.1016/j.comppsych.2012.12.010',
        tier: 1,
      },
      {
        id: '8',
        text: 'The role of interoception in health and well-being',
        source: 'Biological Psychology',
        year: '2021',
        link: 'https://doi.org/10.1016/j.biopsycho.2021.108050',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Before you know you are angry, your jaw clenches. Before you consciously feel anxious, your chest tightens. Before sadness fully registers, your shoulders slump. Your body is talking to you all the time --- most of us have just forgotten how to listen.
          </p>
          <p className="mb-6">
            Body awareness, or interoception, is the ability to sense and interpret signals from inside your body <Citation id="1" index={1} source="Handbook of Emotions" year="2016" tier={1} />. A landmark study from Finland mapped where different emotions are felt in the body across 700 participants and five cultures. The results were remarkably consistent: anger lights up the upper body and arms, sadness dims the limbs, anxiety concentrates in the chest, and happiness radiates throughout <Citation id="2" index={2} source="Proceedings of the National Academy of Sciences" year="2014" tier={1} />.
          </p>
        </div>

        <h2 id="understanding-interoception" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Interoception
        </h2>
        <p className="mb-6">
          Interoception is your internal sensing system. It processes information about your heart rate, breathing, muscle tension, gut feelings, temperature, and other body signals. This system is the foundation of emotional experience --- theories of emotion suggest that physical sensations are not just side effects of emotions, they are part of how emotions are constructed <Citation id="1" index={1} source="Handbook of Emotions" year="2016" tier={1} />.
        </p>
        <p className="mb-6">
          People with higher interoceptive awareness tend to have better emotion regulation, greater empathy, and clearer decision-making <Citation id="8" index={8} source="Biological Psychology" year="2021" tier={1} />. Conversely, people with poor body awareness (a trait related to alexithymia, or difficulty identifying emotions) are at higher risk for anxiety, depression, and psychosomatic complaints <Citation id="7" index={7} source="Comprehensive Psychiatry" year="2013" tier={1} />.
        </p>

        <ArticleChart
          type="radar"
          title="Where Emotions Live in the Body"
          data={[
            { label: 'Anger --- chest, arms, head', value: 85 },
            { label: 'Anxiety --- chest, stomach', value: 78 },
            { label: 'Sadness --- chest, throat', value: 65 },
            { label: 'Fear --- chest, stomach, legs', value: 72 },
            { label: 'Happiness --- whole body', value: 90 },
            { label: 'Shame --- face, chest', value: 60 },
          ]}
          source="Nummenmaa et al., 2014, PNAS"
        />

        <h2 id="common-body-signals" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Body Signals and Their Emotional Meanings
        </h2>

        <ComparisonTable
          title="Body Signal Decoder"
          columns={['Body Sensation', 'Possible Emotion', 'What It May Mean']}
          items={[
            { feature: 'Tight chest, shallow breathing', values: ['Anxiety', 'Something feels unsafe or uncertain'] },
            { feature: 'Clenched jaw, tight fists', values: ['Anger', 'A boundary has been crossed'] },
            { feature: 'Lump in throat, heavy chest', values: ['Sadness', 'A loss or unmet need'] },
            { feature: 'Butterflies in stomach', values: ['Excitement or fear', 'Anticipation of something important'] },
            { feature: 'Heaviness in limbs, low energy', values: ['Depression or grief', 'Emotional exhaustion, need for rest'] },
            { feature: 'Heat in face and neck', values: ['Shame or embarrassment', 'Perceived social judgment'] },
          ]}
        />

        <h2 id="building-awareness" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Strategies to Build Body Awareness
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'body-scan',
              title: 'Body Scan Meditation',
              content: (
                <div>
                  <p className="mb-4">Lie down or sit comfortably. Starting at the top of your head, slowly move your attention down through each body part. Notice any sensations --- tension, warmth, tingling, numbness, pain --- without trying to change them. Spend 10-20 minutes. Research shows regular body scans significantly improve interoceptive awareness within weeks.</p>
                </div>
              ),
            },
            {
              id: 'check-in',
              title: 'Three-Point Check-In',
              content: (
                <div>
                  <p className="mb-4">Three times daily, pause and scan three areas: your stomach, your chest, and your shoulders. Rate the tension in each area from 1-10. Over time, you will start noticing these signals automatically, catching emotions before they escalate.</p>
                </div>
              ),
            },
            {
              id: 'movement',
              title: 'Mindful Movement',
              content: (
                <div>
                  <p className="mb-4">During any physical activity --- walking, stretching, cooking --- deliberately focus on the sensations in your body. Notice how your weight shifts, how your muscles engage and release, how your breathing changes. This builds the habit of internal listening.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Begin with the three-point check-in. Set three alarms on your phone --- morning, midday, and evening --- and spend 30 seconds scanning your stomach, chest, and shoulders. Write down what you notice <Citation id="5" index={5} source="Mindfulness" year="2019" tier={1} />. After one week, you will likely notice that you are already more attuned to physical signals without the alarm.
        </p>
        <p className="mb-6">
          As psychiatrist Bessel van der Kolk writes, "The body keeps the score" --- it stores and expresses what the conscious mind may overlook <Citation id="4" index={4} source="Penguin Books" year="2014" tier={5} />. Learning to read your body is learning to read your emotional truth.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If tuning into your body triggers overwhelming anxiety, flashbacks, or dissociation, work with a somatic therapist who can guide you through body awareness at a pace that feels safe <Citation id="6" index={6} source="Frontiers in Psychology" year="2015" tier={1} />. For people with trauma histories, body awareness may need to be developed gradually with professional support rather than independently.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>Your body is your first emotional alert system. Tension, heat, heaviness, and tightness are not random --- they are data. Learning to read these signals gives you earlier access to your emotions, which means more time to respond wisely rather than react impulsively.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 24: How Your Thoughts Shape Your Feelings ───────────────────
  {
    id: catId(24),
    slug: 'how-thoughts-shape-feelings-notice-the-pattern',
    title: 'How Your Thoughts Shape Your Feelings (And How to Notice the Pattern)',
    description: 'Understand the thought-feeling connection at the heart of CBT. Learn to identify automatic thoughts that shape your emotional experience and how to interrupt unhelpful patterns.',
    image: "/images/articles/cat01/cover-024.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Thought Patterns', 'CBT', 'Automatic Thoughts', 'Cognitive Distortions', 'Self-Awareness'],
    citations: [
      {
        id: '1',
        text: 'Cognitive therapy of depression',
        source: 'Guilford Press',
        year: '1979',
        link: 'https://www.guilford.com/books/Cognitive-Therapy-of-Depression/Beck-Rush-Shaw-Emery/9780898629194',
        tier: 5,
      },
      {
        id: '2',
        text: 'Automatic thoughts as a predictor of depressive and anxious symptoms',
        source: 'Cognitive Therapy and Research',
        year: '2016',
        link: 'https://doi.org/10.1007/s10608-016-9764-y',
        tier: 1,
      },
      {
        id: '3',
        text: 'The role of cognition in emotion: A review and synthesis',
        source: 'Cognition and Emotion',
        year: '2013',
        link: 'https://doi.org/10.1080/02699931.2013.782899',
        tier: 1,
      },
      {
        id: '4',
        text: 'Rumination and worry: Are they really different? A meta-analytic review',
        source: 'Clinical Psychology Review',
        year: '2012',
        link: 'https://doi.org/10.1016/j.cpr.2012.07.001',
        tier: 1,
      },
      {
        id: '5',
        text: 'The cognitive model of depression: An update',
        source: 'Annual Review of Clinical Psychology',
        year: '2008',
        link: 'https://doi.org/10.1146/annurev.clinpsy.3.022806.091015',
        tier: 1,
      },
      {
        id: '6',
        text: 'Metacognitive awareness and prevention of relapse in depression',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2010',
        link: 'https://doi.org/10.1037/a0020381',
        tier: 1,
      },
      {
        id: '7',
        text: 'Thought records and cognitive restructuring: A clinical tool review',
        source: 'Behavioural and Cognitive Psychotherapy',
        year: '2018',
        link: 'https://doi.org/10.1017/S1352465818000152',
        tier: 1,
      },
      {
        id: '8',
        text: 'Information about cognitive behavioral therapy',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/psychotherapies',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You get a text from your friend saying "We need to talk." Instantly, your stomach drops. You feel anxious, maybe even panicked. But notice something: the text itself is neutral. It is your interpretation --- "Something is wrong. They are upset with me. I must have done something bad" --- that creates the emotional response.
          </p>
          <p className="mb-6">
            This insight is the foundation of cognitive behavioral therapy (CBT), the most widely studied and practiced form of psychotherapy. Aaron Beck discovered that between every event and every emotion, there is a thought --- often automatic, often outside awareness, and often not entirely accurate <Citation id="1" index={1} source="Guilford Press" year="1979" tier={5} />. Research confirms that these automatic thoughts are powerful predictors of anxiety and depression <Citation id="2" index={2} source="Cognitive Therapy and Research" year="2016" tier={1} />.
          </p>
        </div>

        <h2 id="the-cbt-triangle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Thought-Feeling-Behavior Triangle
        </h2>
        <p className="mb-6">
          The CBT model describes a triangle connecting thoughts, feelings, and behaviors. Each influences the other. A negative thought triggers a painful feeling, which drives a reactive behavior, which creates a situation that confirms the negative thought <Citation id="5" index={5} source="Annual Review of Clinical Psychology" year="2008" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'The Negative Cycle',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Thought:</strong> "They did not reply because they do not care"</li>
                <li><strong>Feeling:</strong> Rejection, sadness, anxiety</li>
                <li><strong>Behavior:</strong> Withdraw, stop reaching out</li>
                <li><strong>Result:</strong> Less contact, confirming "they do not care"</li>
              </ul>
            ),
          }}
          after={{
            title: 'A Healthier Pattern',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Thought:</strong> "They might be busy. I do not know the reason"</li>
                <li><strong>Feeling:</strong> Mild concern, patience</li>
                <li><strong>Behavior:</strong> Follow up when appropriate</li>
                <li><strong>Result:</strong> Connection maintained, no spiral</li>
              </ul>
            ),
          }}
        />

        <h2 id="automatic-thoughts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are Automatic Thoughts?
        </h2>
        <p className="mb-6">
          Automatic thoughts are the rapid, often unconscious interpretations your brain generates about events. They pop up instantly, feel completely true, and shape your emotional experience before you even realize it <Citation id="3" index={3} source="Cognition and Emotion" year="2013" tier={1} />.
        </p>
        <p className="mb-6">
          Common patterns of automatic thoughts include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>All-or-nothing thinking:</strong> "If I am not perfect, I am a failure."</li>
          <li><strong>Catastrophizing:</strong> "This small mistake will ruin everything."</li>
          <li><strong>Mind reading:</strong> "Everyone thinks I am incompetent."</li>
          <li><strong>Fortune telling:</strong> "This is going to go terribly wrong."</li>
          <li><strong>Personalization:</strong> "It is my fault they are in a bad mood."</li>
          <li><strong>Should statements:</strong> "I should be able to handle this. Something is wrong with me."</li>
        </ul>

        <h2 id="catching-thoughts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Catch Your Automatic Thoughts
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Notice the Emotion First',
              description: <p>You feel the emotion before you are aware of the thought. When you notice a strong feeling, pause and ask: 'What was I just thinking?" The thought is usually right below the surface.</p>,
            },
            {
              title: 'Write It Down Exactly',
              description: <p>Record the thought word for word, even if it sounds extreme. 'Nobody likes me.", "I am going to get fired." Writing it down makes the thought concrete and easier to evaluate.</p>,
            },
            {
              title: 'Ask: Is This Fact or Interpretation?',
              description: <p>Most automatic thoughts are interpretations, not facts. 'My colleague did not say hello' is a fact. "My colleague is ignoring me because they are angry" is an interpretation.</p>,
            },
            {
              title: 'Generate Alternative Interpretations',
              description: <p>For every negative automatic thought, write two or three other possible explanations. They do not need to be positive --- just realistic. This breaks the assumption that your first interpretation is the only one.</p>,
            },
          ]}
        />

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Use a simple thought record: when you notice a strong emotion, write down (1) the situation, (2) the automatic thought, (3) the emotion and its intensity (1-10), and (4) an alternative interpretation. Do this once daily for two weeks <Citation id="7" index={7} source="Behavioural and Cognitive Psychotherapy" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          You will likely discover that certain thought patterns repeat across situations. This metacognitive awareness --- being aware of your own thinking patterns --- is one of the strongest predictors of emotional resilience <Citation id="6" index={6} source="Journal of Consulting and Clinical Psychology" year="2010" tier={1} />.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If negative automatic thoughts are persistent, deeply distressing, or accompanied by rumination that you cannot break free from, a CBT therapist can help <Citation id="4" index={4} source="Clinical Psychology Review" year="2012" tier={1} />. CBT is one of the most well-supported treatments for depression and anxiety, and it works specifically by changing the relationship between thoughts and emotions <Citation id="8" index={8} source="National Institute of Mental Health" year="2023" tier={2} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>Your feelings are real, but the thoughts driving them may not be accurate. Learning to catch automatic thoughts and question them is one of the most powerful skills in psychology. It does not change reality --- it changes how clearly you see it.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 25: The Observer Self ───────────────────────────────────────
  {
    id: catId(25),
    slug: 'observer-self-watch-emotions-without-being-consumed',
    title: 'The Observer Self: Learning to Watch Your Emotions Without Being Consumed',
    description: 'Explore the concept of the Observer Self from ACT and mindfulness traditions. Learn how to step back from thoughts and feelings to gain perspective and reduce emotional suffering.',
    image: "/images/articles/cat01/cover-025.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Observer Self', 'ACT', 'Mindfulness', 'Defusion', 'Metacognition'],
    citations: [
      {
        id: '1',
        text: 'Acceptance and commitment therapy: Model, processes, and outcomes',
        source: 'Behaviour Research and Therapy',
        year: '2006',
        link: 'https://doi.org/10.1016/j.brat.2005.06.006',
        tier: 1,
      },
      {
        id: '2',
        text: 'Self-as-context in acceptance and commitment therapy',
        source: 'Journal of Clinical Psychology',
        year: '2019',
        link: 'https://doi.org/10.1002/jclp.22749',
        tier: 1,
      },
      {
        id: '3',
        text: 'Decentering as a common mechanism across mindfulness-based interventions',
        source: 'Cognitive Therapy and Research',
        year: '2015',
        link: 'https://doi.org/10.1007/s10608-014-9662-9',
        tier: 1,
      },
      {
        id: '4',
        text: 'Metacognitive therapy versus cognitive behavioral therapy for depression',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2018',
        link: 'https://doi.org/10.1037/ccp0000307',
        tier: 1,
      },
      {
        id: '5',
        text: 'Mindfulness and decentering: A framework for self-regulation',
        source: 'Clinical Psychology Review',
        year: '2011',
        link: 'https://doi.org/10.1016/j.cpr.2011.07.008',
        tier: 1,
      },
      {
        id: '6',
        text: 'The role of psychological flexibility in well-being',
        source: 'Journal of Contextual Behavioral Science',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jcbs.2020.02.002',
        tier: 1,
      },
      {
        id: '7',
        text: 'Wherever you go, there you are: Mindfulness meditation in everyday life',
        source: 'Hachette Books',
        year: '2005',
        link: 'https://doi.org/10.1016/S0005-7894(02)80056-7',
        tier: 5,
      },
      {
        id: '8',
        text: 'Self-distancing: Theory, research, and current directions',
        source: 'Advances in Experimental Social Psychology',
        year: '2017',
        link: 'https://doi.org/10.1016/bs.aesp.2016.10.002',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            There is a difference between being caught in a storm and watching a storm from a window. The storm is the same --- but your experience of it changes completely based on where you stand. The Observer Self is the "you" that watches from the window. It is the part of you that can notice your thoughts and feelings without being swept away by them.
          </p>
          <p className="mb-6">
            In acceptance and commitment therapy (ACT), the Observer Self (also called "self-as-context") is considered one of the six core processes that lead to psychological flexibility <Citation id="1" index={1} source="Behaviour Research and Therapy" year="2006" tier={1} />. Research shows that people who can access this observing perspective experience less emotional distress, greater resilience, and more aligned decision-making <Citation id="2" index={2} source="Journal of Clinical Psychology" year="2019" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-observer-self" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding the Observer Self
        </h2>
        <p className="mb-6">
          Most of the time, we are fused with our thoughts. When your mind says, "I am a failure," you do not think, "I am having the thought that I am a failure." You feel it as absolute truth. The Observer Self creates the space to notice the thought without becoming the thought <Citation id="3" index={3} source="Cognitive Therapy and Research" year="2015" tier={1} />.
        </p>

        <QuoteBlock
          quote="You are the sky. Everything else is just the weather."
          attribution="Pema Chodron"
          role="Buddhist Teacher"
          variant="large"
        />

        <p className="mb-6">
          This concept appears across many traditions. In mindfulness, it is called "decentering" --- the ability to observe thoughts as mental events rather than as reality <Citation id="5" index={5} source="Clinical Psychology Review" year="2011" tier={1} />. In metacognitive therapy, it is "detached mindfulness" --- watching your thinking from an outside perspective <Citation id="4" index={4} source="Journal of Consulting and Clinical Psychology" year="2018" tier={1} />. In self-distancing research, it is the shift from a first-person to a third-person perspective on your own experience <Citation id="8" index={8} source="Advances in Experimental Social Psychology" year="2017" tier={1} />.
        </p>

        <h2 id="fused-vs-observing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Fused Self vs. Observer Self
        </h2>

        <ComparisonTable
          title="Two Ways of Relating to Your Inner Experience"
          columns={['Dimension', 'Fused (Caught in It)', 'Observing (Watching It)']}
          items={[
            { feature: 'Relationship to thoughts', values: ['Thoughts ARE reality', 'Thoughts are mental events'] },
            { feature: 'Example', values: ['I am anxious', 'I notice anxiety is here'] },
            { feature: 'Emotional impact', values: ['Full intensity, feels permanent', 'Reduced intensity, feels temporary'] },
            { feature: 'Behavioral response', values: ['Reactive, automatic', 'Intentional, chosen'] },
            { feature: 'Sense of identity', values: ['I am my emotions', 'I have emotions, but I am more than them'] },
          ]}
          highlightColumn={2}
        />

        <h2 id="practices" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Strategies to Develop the Observer Self
        </h2>

        <ArticleTabs
          tabs={[
            {
              id: 'language',
              label: 'Language Shifts',
              content: (
                <div>
                  <p className="mb-4">Change how you talk to yourself about inner experiences:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Instead of "I am depressed," say "I am noticing feelings of depression."</li>
                    <li>Instead of "I cannot do this," say "My mind is telling me I cannot do this."</li>
                    <li>Instead of "This is terrible," say "I am having the thought that this is terrible."</li>
                  </ul>
                  <p className="mt-4">These subtle shifts create distance between you and the experience, engaging the observer perspective automatically.</p>
                </div>
              ),
            },
            {
              id: 'meditation',
              label: 'Observer Meditation',
              content: (
                <div>
                  <p className="mb-4">Sit quietly and focus on your breathing. When a thought arises, label it ("thinking"), and return to the breath. When an emotion arises, label it ("sadness" or "worry"), and return. You are practicing being the observer of your inner world rather than a participant in every thought and feeling.</p>
                  <p>Start with 5 minutes and build to 15-20 minutes over time.</p>
                </div>
              ),
            },
            {
              id: 'third-person',
              label: 'Third-Person Perspective',
              content: (
                <div>
                  <p className="mb-4">When processing a difficult experience, describe it to yourself in the third person. Instead of "I feel overwhelmed by this deadline," try "[Your name] is feeling overwhelmed by the deadline."</p>
                  <p>Research on self-distancing shows that this perspective shift reduces emotional reactivity and improves problem-solving without increasing avoidance.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Start with the language shift. For one week, every time you notice a strong emotion, preface it with "I am noticing..." or "My mind is telling me..." You do not need to believe the new phrasing --- just practice it. Over time, the observer perspective becomes more accessible, and emotions feel less like immovable states and more like passing weather <Citation id="6" index={6} source="Journal of Contextual Behavioral Science" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Jon Kabat-Zinn, the founder of mindfulness-based stress reduction, describes this practice as learning to be present to your experience without judgment <Citation id="7" index={7} source="Hachette Books" year="2005" tier={5} />. The more you practice, the wider the space becomes between stimulus and response.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you find it extremely difficult to step back from your thoughts --- if every thought feels absolutely true and impossible to observe from a distance --- a therapist trained in ACT or mindfulness-based cognitive therapy (MBCT) can guide you through the process with structured exercises <Citation id="3" index={3} source="Cognitive Therapy and Research" year="2015" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>The Observer Self is not about detachment or numbness. It is about creating enough space to see your thoughts and emotions clearly, so you can choose how to respond rather than being controlled by automatic reactions. You are not your thoughts. You are the awareness that notices them.</p>
        </ArticleCallout>
      </>
    ),
  },
];
