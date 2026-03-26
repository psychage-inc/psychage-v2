/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_EMOTIONAL_REGULATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ProgressSteps,
  ComparisonTable,
  ArticleAccordion,
  ArticleTabs,
  ArticleChart,
  BeforeAfter,
  QuoteBlock,
} from '../../../components/article/blocks';

export const everydayEmotionalRegulationArticlesA: Article[] = [
  // ─── Article 11: 10 Evidence-Based Techniques ──────────────────────────────
  {
    id: catId(11),
    slug: '10-evidence-based-techniques-to-regulate-emotions',
    title: '10 Evidence-Based Techniques to Regulate Your Emotions in the Moment',
    description: 'Discover 10 science-backed strategies to manage intense emotions when they arise. Learn practical techniques from cognitive behavioral therapy, mindfulness, and neuroscience research.',
    image: "/images/articles/cat01/cover-011.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Emotional Regulation', 'Coping Skills', 'CBT', 'Mindfulness', 'Self-Help'],
    citations: [
      {
        id: '1',
        text: 'The emerging field of emotion regulation: An integrative review',
        source: 'Review of General Psychology',
        year: '1998',
        link: 'https://doi.org/10.1037/1089-2680.2.3.271',
        tier: 1,
      },
      {
        id: '2',
        text: 'Cognitive emotion regulation strategies and depressive symptoms: differences between males and females',
        source: 'Personality and Individual Differences',
        year: '2004',
        link: 'https://doi.org/10.1016/j.paid.2003.12.004',
        tier: 1,
      },
      {
        id: '3',
        text: 'Emotion regulation: Current status and future prospects',
        source: 'Psychological Inquiry',
        year: '2015',
        link: 'https://doi.org/10.1080/1047840X.2014.940781',
        tier: 1,
      },
      {
        id: '4',
        text: 'Mindfulness-based stress reduction and health benefits: A meta-analysis',
        source: 'Journal of Psychosomatic Research',
        year: '2004',
        link: 'https://doi.org/10.1016/S0022-3999(03)00573-7',
        tier: 1,
      },
      {
        id: '5',
        text: 'The efficacy of cognitive behavioral therapy: A review of meta-analyses',
        source: 'Cognitive Therapy and Research',
        year: '2012',
        link: 'https://doi.org/10.1007/s10608-012-9476-1',
        tier: 1,
      },
      {
        id: '6',
        text: 'Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli',
        source: 'Psychological Science',
        year: '2007',
        link: 'https://doi.org/10.1111/j.1467-9280.2007.01916.x',
        tier: 1,
      },
      {
        id: '7',
        text: 'Deep breathing and relaxation techniques for stress management',
        source: 'National Center for Complementary and Integrative Health',
        year: '2023',
        link: 'https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know',
        tier: 2,
      },
      {
        id: '8',
        text: 'Coping with stress: Strategies that work',
        source: 'American Psychological Association',
        year: '2022',
        link: 'https://www.apa.org/topics/stress/managing-stress',
        tier: 3,
      },
      {
        id: '9',
        text: 'The role of physical activity in managing stress and emotion',
        source: 'Frontiers in Psychology',
        year: '2020',
        link: 'https://doi.org/10.3389/fpsyg.2020.01362',
        tier: 1,
      },
      {
        id: '10',
        text: 'Emotion regulation choice: A conceptual framework and supporting evidence',
        source: 'Journal of Experimental Psychology: General',
        year: '2017',
        link: 'https://doi.org/10.1037/xge0000250',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You are in a meeting and your heart starts racing. Someone cuts you off in traffic and rage floods your body. A text message sends you spiraling into worry. These moments happen every day, and how you respond to them shapes your mental health, your relationships, and your quality of life.
          </p>
          <p className="mb-6">
            Emotion regulation refers to the strategies we use to influence which emotions we have, when we have them, and how we experience and express them <Citation id="1" index={1} source="Review of General Psychology" year="1998" tier={1} />. Research shows that people who can regulate their emotions effectively report less depression, less anxiety, and stronger relationships <Citation id="2" index={2} source="Personality and Individual Differences" year="2004" tier={1} />. The good news? These skills can be learned and improved at any age.
          </p>
        </div>

        <h2 id="why-emotion-regulation-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Emotion Regulation Matters
        </h2>
        <p className="mb-6">
          Emotions are not the enemy. They carry important information about our needs, values, and boundaries. The goal of emotion regulation is not to eliminate feelings but to manage them so they do not overwhelm you or drive harmful behavior <Citation id="3" index={3} source="Psychological Inquiry" year="2015" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 80, suffix: '%', label: 'of adults report significant daily stress' },
            { value: 3, suffix: 'x', label: 'higher burnout risk without regulation skills' },
            { value: 50, suffix: '%', label: 'reduction in anxiety with regular practice' },
          ]}
          source="American Psychological Association, 2022"
        />

        <p className="mb-6">
          Poor emotion regulation is linked to nearly every mental health condition, from depression and anxiety to substance use and eating disorders. Building these skills is one of the most impactful things you can do for your overall well-being <Citation id="5" index={5} source="Cognitive Therapy and Research" year="2012" tier={1} />.
        </p>

        <h2 id="ten-techniques" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          10 Evidence-Based Techniques
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'technique-1',
              title: '1. Deep Diaphragmatic Breathing',
              content: (
                <div>
                  <p className="mb-4">
                    Slow, deep breathing activates your parasympathetic nervous system, the body's natural calming response. Breathe in for 4 counts, hold for 4, and exhale for 6. This technique can lower heart rate and reduce cortisol within minutes.
                  </p>
                </div>
              ),
            },
            {
              id: 'technique-2',
              title: '2. Cognitive Reappraisal',
              content: (
                <div>
                  <p className="mb-4">
                    Reframe the situation by looking at it from a different angle. Instead of thinking "This is a disaster," try "This is difficult, but I can handle it." Studies show reappraisal reduces emotional intensity without suppressing feelings.
                  </p>
                </div>
              ),
            },
            {
              id: 'technique-3',
              title: '3. Affect Labeling (Name It to Tame It)',
              content: (
                <div>
                  <p className="mb-4">
                    Simply putting your emotion into words reduces amygdala activation. Say to yourself, "I am feeling anxious right now." Research from UCLA shows this simple act calms the emotional brain.
                  </p>
                </div>
              ),
            },
            {
              id: 'technique-4',
              title: '4. Grounding Through the Senses (5-4-3-2-1)',
              content: (
                <div>
                  <p className="mb-4">
                    Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste. This pulls your attention from internal distress back to the present moment.
                  </p>
                </div>
              ),
            },
            {
              id: 'technique-5',
              title: '5. Progressive Muscle Relaxation',
              content: (
                <div>
                  <p className="mb-4">
                    Tense and release each muscle group for 5 seconds, starting from your toes and working up. This releases physical tension that emotions create in the body.
                  </p>
                </div>
              ),
            },
            {
              id: 'technique-6',
              title: '6. Mindful Observation',
              content: (
                <div>
                  <p className="mb-4">
                    Watch your emotion like a wave. Notice where it appears in your body, its intensity, and how it shifts. Mindfulness training reduces emotional reactivity over time.
                  </p>
                </div>
              ),
            },
            {
              id: 'technique-7',
              title: '7. Physical Movement',
              content: (
                <div>
                  <p className="mb-4">
                    Even a 10-minute walk can shift your emotional state. Movement burns off stress hormones and releases endorphins. Choose whatever feels accessible: walking, stretching, dancing, or shaking.
                  </p>
                </div>
              ),
            },
            {
              id: 'technique-8',
              title: '8. Self-Compassion Break',
              content: (
                <div>
                  <p className="mb-4">
                    Place a hand on your chest and say, "This is a moment of difficulty. Everyone struggles sometimes. May I be kind to myself." Self-compassion reduces the shame spiral that makes emotions harder to manage.
                  </p>
                </div>
              ),
            },
            {
              id: 'technique-9',
              title: '9. Opposite Action',
              content: (
                <div>
                  <p className="mb-4">
                    From dialectical behavior therapy: when an emotion urges you toward an unhelpful behavior, do the opposite. Feeling like withdrawing? Reach out to someone. Feeling like lashing out? Speak gently. This breaks the emotion-behavior cycle.
                  </p>
                </div>
              ),
            },
            {
              id: 'technique-10',
              title: '10. Temperature Change (Cold Water)',
              content: (
                <div>
                  <p className="mb-4">
                    Splash cold water on your face or hold ice cubes. Cold triggers the dive reflex, which slows your heart rate and activates the vagus nerve. This is especially effective during intense panic or rage.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="choosing-the-right-technique" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Choosing the Right Technique for the Right Moment
        </h2>
        <p className="mb-6">
          Not every strategy works for every situation. Research on emotion regulation choice shows that flexibility matters more than any single technique <Citation id="10" index={10} source="Journal of Experimental Psychology: General" year="2017" tier={1} />. High-intensity emotions may need body-based strategies first (breathing, cold water, movement), while lower-intensity emotions respond well to cognitive strategies (reappraisal, labeling).
        </p>

        <ComparisonTable
          title="Which Strategy to Use When"
          columns={['Situation', 'Body-Based', 'Mind-Based']}
          items={[
            { feature: 'Panic or rage', values: [true, false] },
            { feature: 'Mild frustration', values: [false, true] },
            { feature: 'Persistent worry', values: ['Both helpful', true] },
            { feature: 'Sadness or grief', values: [true, 'Both helpful'] },
            { feature: 'Social anxiety before event', values: [true, true] },
          ]}
          highlightColumn={1}
        />

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          You do not need to master all ten techniques at once. Pick two or three that feel most natural and practice them during low-stress moments first <Citation id="8" index={8} source="American Psychological Association" year="2022" tier={3} />. When you practice during calm periods, the techniques become automatic and easier to access when emotions run high.
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Start small</strong> --- try one breathing exercise today for just two minutes.</li>
          <li><strong>Notice patterns</strong> --- when do you most often feel overwhelmed? Morning? Evening? After social events?</li>
          <li><strong>Build a rotation</strong> --- alternate between body-based and mind-based techniques to find your best fit.</li>
          <li><strong>Track what works</strong> --- write a brief note after each practice about how it felt.</li>
        </ol>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If intense emotions regularly interfere with your work, relationships, or daily life, a therapist trained in cognitive behavioral therapy (CBT) or dialectical behavior therapy (DBT) can help you build stronger regulation skills <Citation id="5" index={5} source="Cognitive Therapy and Research" year="2012" tier={1} />. There is no shame in asking for support. Regulation is a skill, and like any skill, some people benefit from expert guidance.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>Emotion regulation is not about controlling or eliminating feelings. It is about building a toolbox of strategies so you can choose how to respond rather than react on autopilot. Start with one technique, practice it regularly, and expand your toolkit over time.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 12: The STOP Technique ──────────────────────────────────────
  {
    id: catId(12),
    slug: 'stop-technique-60-second-reset',
    title: 'The STOP Technique: A 60-Second Reset When Emotions Overwhelm You',
    description: 'Learn the STOP technique --- a simple four-step method used in CBT and DBT to pause emotional reactivity and regain control in under a minute.',
    image: "/images/articles/cat01/cover-012.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['STOP Technique', 'Emotional Regulation', 'DBT', 'Quick Coping', 'Stress Management'],
    citations: [
      {
        id: '1',
        text: 'Skills training manual for treating borderline personality disorder',
        source: 'Guilford Press',
        year: '2015',
        link: 'https://doi.org/10.1016/j.cpr.2006.10.002',
        tier: 5,
      },
      {
        id: '2',
        text: 'Dialectical behavior therapy: A comprehensive multi- and transdiagnostic intervention',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2019.101786',
        tier: 1,
      },
      {
        id: '3',
        text: 'The role of distress tolerance in emotion regulation',
        source: 'Behavior Therapy',
        year: '2010',
        link: 'https://doi.org/10.1016/j.beth.2009.09.005',
        tier: 1,
      },
      {
        id: '4',
        text: 'Pausing before acting: Brief mindfulness practice reduces impulsive responding',
        source: 'Mindfulness',
        year: '2016',
        link: 'https://doi.org/10.1007/s12671-015-0467-z',
        tier: 1,
      },
      {
        id: '5',
        text: 'Emotional reactivity and cognitive control in anxiety: A neural perspective',
        source: 'Biological Psychology',
        year: '2014',
        link: 'https://doi.org/10.1016/j.biopsycho.2014.07.014',
        tier: 1,
      },
      {
        id: '6',
        text: 'Stress in America 2023: A national mental health crisis',
        source: 'American Psychological Association',
        year: '2023',
        link: 'https://www.apa.org/news/press/releases/stress/2023/collective-trauma-recovery',
        tier: 3,
      },
      {
        id: '7',
        text: 'Behavioral activation and inhibition in daily life',
        source: 'Journal of Personality and Social Psychology',
        year: '2001',
        link: 'https://doi.org/10.1037/0022-3514.80.6.958',
        tier: 1,
      },
      {
        id: '8',
        text: 'Brief interventions for emotion regulation: A systematic review',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2020.11.072',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your boss criticizes your work in front of the team. Your partner says something that stings. Your child throws a tantrum in the grocery store. In moments like these, your brain floods with stress hormones and your rational mind takes a back seat. What if you had a technique that could reset your nervous system in under 60 seconds?
          </p>
          <p className="mb-6">
            The STOP technique is a cornerstone of dialectical behavior therapy (DBT), developed by Dr. Marsha Linehan to help people manage intense emotional reactions <Citation id="1" index={1} source="Guilford Press" year="2015" tier={5} />. It works by creating a brief pause between the trigger and your response, giving your prefrontal cortex time to come back online <Citation id="5" index={5} source="Biological Psychology" year="2014" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-stop" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is the STOP Technique?
        </h2>
        <p className="mb-6">
          STOP is an acronym that guides you through four quick steps when emotions feel overwhelming. It is designed to interrupt the automatic fight-or-flight response and give you back the power to choose your next action <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'S --- Stop',
              description: (
                <p>Freeze. Do not act, do not speak, do not send the text. Simply pause whatever you are doing. This interrupts the automatic reaction loop.</p>
              ),
            },
            {
              title: 'T --- Take a Breath',
              description: (
                <p>Take one slow, deep breath. Inhale for 4 counts, hold for 2, exhale for 6. This activates your parasympathetic nervous system and begins calming the stress response.</p>
              ),
            },
            {
              title: 'O --- Observe',
              description: (
                <p>Notice what is happening inside you and around you. What emotion are you feeling? Where do you feel it in your body? What triggered it? Observation creates distance between you and the emotion.</p>
              ),
            },
            {
              title: 'P --- Proceed Mindfully',
              description: (
                <p>Now choose your response intentionally. Ask yourself: What action aligns with my values right now? What would be most effective? Then act from that place of clarity.</p>
              ),
            },
          ]}
        />

        <h2 id="why-stop-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why STOP Works: The Neuroscience
        </h2>
        <p className="mb-6">
          When you experience a strong emotion, your amygdala (the brain's alarm system) fires before your prefrontal cortex (the rational decision-maker) can process the situation. This is why people say and do things they regret in the heat of the moment <Citation id="5" index={5} source="Biological Psychology" year="2014" tier={1} />.
        </p>
        <p className="mb-6">
          Research shows that even a brief mindfulness pause of a few seconds can reduce impulsive responding and improve decision-making <Citation id="4" index={4} source="Mindfulness" year="2016" tier={1} />. The STOP technique works because it creates that critical gap. By the time you have completed all four steps, roughly 20 to 60 seconds have passed, enough time for the prefrontal cortex to re-engage.
        </p>

        <ArticleCallout variant="did-you-know" title="The 90-Second Rule">
          <p>Neuroscientist Dr. Jill Bolte Taylor found that the chemical lifespan of an emotion in the body is approximately 90 seconds. If you can ride out the initial surge without reacting, the intensity naturally decreases. The STOP technique helps you get through that window.</p>
        </ArticleCallout>

        <h2 id="real-world-scenarios" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Real-World Scenarios
        </h2>
        <p className="mb-6">
          STOP is versatile enough for nearly any emotionally charged situation. Here are some common examples:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>At work:</strong> A colleague takes credit for your idea. Instead of confronting them angrily, you STOP, breathe, observe your frustration, and choose to address it calmly after the meeting.</li>
          <li><strong>In relationships:</strong> Your partner criticizes you during an argument. Instead of firing back, you STOP, notice the hurt beneath the anger, and say, "I need a moment before I respond."</li>
          <li><strong>While parenting:</strong> Your child screams "I hate you." Instead of reacting defensively, you STOP, take a breath, recognize they are overwhelmed too, and respond with calm presence.</li>
          <li><strong>Online:</strong> You read a social media comment that enrages you. Instead of typing a reply, you STOP, close the app, and come back later with perspective.</li>
        </ul>

        <h2 id="practice-tips" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Brief interventions like STOP are most effective when you practice them in low-stakes moments first <Citation id="8" index={8} source="Journal of Affective Disorders" year="2021" tier={1} />. Try using STOP during minor frustrations --- a slow driver, a long line, a dropped cup --- so the steps become automatic before you need them in high-stakes moments.
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Set a phone reminder to practice STOP twice daily for one week.</li>
          <li>After each practice, rate your emotional intensity before and after on a 1-10 scale.</li>
          <li>Notice which step feels most impactful for you --- the pause, the breath, the observation, or the mindful choice.</li>
        </ol>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you find that emotions regularly overwhelm you despite practicing techniques like STOP, a therapist trained in DBT can teach you a full range of distress tolerance and emotion regulation skills <Citation id="3" index={3} source="Behavior Therapy" year="2010" tier={1} />. DBT is especially effective for people who experience emotions with high intensity and have difficulty returning to baseline <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>STOP is a 60-second micro-intervention that can prevent minutes, hours, or even days of emotional fallout. Stop, Take a breath, Observe, and Proceed mindfully. Practice it in small moments so it is there when you need it most.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 13: Breathing Exercises ─────────────────────────────────────
  {
    id: catId(13),
    slug: 'breathing-exercises-for-emotional-regulation',
    title: 'Breathing Exercises That Actually Work for Emotional Regulation',
    description: 'Explore breathing techniques backed by science --- from box breathing to physiological sighs --- and learn which patterns work best for different emotional states.',
    image: "/images/articles/cat01/cover-013.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Breathing Exercises', 'Nervous System', 'Stress Relief', 'Vagus Nerve', 'Relaxation'],
    citations: [
      {
        id: '1',
        text: 'How breath-control can change your life: A systematic review on psycho-physiological correlates of slow breathing',
        source: 'Frontiers in Human Neuroscience',
        year: '2018',
        link: 'https://doi.org/10.3389/fnhum.2018.00353',
        tier: 1,
      },
      {
        id: '2',
        text: 'Brief structured respiration practices enhance mood and reduce physiological arousal',
        source: 'Cell Reports Medicine',
        year: '2023',
        link: 'https://doi.org/10.1016/j.xcrm.2022.100895',
        tier: 1,
      },
      {
        id: '3',
        text: 'Voluntary activation of the sympathetic nervous system and attenuation of the innate immune response in humans',
        source: 'Proceedings of the National Academy of Sciences',
        year: '2014',
        link: 'https://doi.org/10.1073/pnas.1322174111',
        tier: 1,
      },
      {
        id: '4',
        text: 'Heart rate variability biofeedback: How and why does it work?',
        source: 'Frontiers in Psychology',
        year: '2014',
        link: 'https://doi.org/10.3389/fpsyg.2014.00756',
        tier: 1,
      },
      {
        id: '5',
        text: 'The effect of diaphragmatic breathing on attention, negative affect and stress in healthy adults',
        source: 'Frontiers in Psychology',
        year: '2017',
        link: 'https://doi.org/10.3389/fpsyg.2017.00874',
        tier: 1,
      },
      {
        id: '6',
        text: 'Relaxation techniques for health: What the science says',
        source: 'National Center for Complementary and Integrative Health',
        year: '2023',
        link: 'https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know',
        tier: 2,
      },
      {
        id: '7',
        text: 'Breathing practices for treatment of psychiatric and stress-related medical conditions',
        source: 'Psychiatric Clinics of North America',
        year: '2013',
        link: 'https://doi.org/10.1016/j.psc.2013.01.001',
        tier: 1,
      },
      {
        id: '8',
        text: 'Sudarshan Kriya yoga: Breathing for health',
        source: 'International Journal of Yoga',
        year: '2013',
        link: 'https://doi.org/10.4103/0973-6131.113405',
        tier: 1,
      },
      {
        id: '9',
        text: 'Clinical handbook of psychological disorders: A step-by-step treatment manual',
        source: 'Guilford Press',
        year: '2014',
        link: 'https://www.guilford.com/books/Clinical-Handbook-of-Psychological-Disorders/Barlow/9781462513260',
        tier: 5,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Breathing is the only autonomic function you can control consciously. Every other automatic process --- your heartbeat, digestion, pupil dilation --- runs beyond your reach. But your breath? You can slow it, deepen it, and change its pattern. And when you do, you send a direct signal to your nervous system that shifts your entire emotional state.
          </p>
          <p className="mb-6">
            A systematic review of slow breathing research found that controlled breathing reduces cortisol, lowers blood pressure, increases heart rate variability, and improves mood across dozens of studies <Citation id="1" index={1} source="Frontiers in Human Neuroscience" year="2018" tier={1} />. A 2023 study from Stanford showed that just five minutes of structured breathing outperformed meditation for mood improvement <Citation id="2" index={2} source="Cell Reports Medicine" year="2023" tier={1} />.
          </p>
        </div>

        <h2 id="how-breathing-affects-emotions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Breathing Affects Your Emotions
        </h2>
        <p className="mb-6">
          Your vagus nerve is the longest cranial nerve in your body. It runs from your brainstem through your chest and into your abdomen. When you exhale slowly, you stimulate the vagus nerve, which activates your parasympathetic (rest-and-digest) system <Citation id="4" index={4} source="Frontiers in Psychology" year="2014" tier={1} />. This is why slow breathing calms you down --- it is not a metaphor or a mindset trick. It is a direct physiological mechanism.
        </p>
        <p className="mb-6">
          Different breathing patterns create different effects. Fast breathing activates the sympathetic (fight-or-flight) system, which can be useful when you need energy. Slow breathing activates the parasympathetic system, calming you down <Citation id="1" index={1} source="Frontiers in Human Neuroscience" year="2018" tier={1} />.
        </p>

        <h2 id="five-breathing-techniques" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Five Breathing Techniques That Work
        </h2>

        <ArticleTabs
          tabs={[
            {
              id: 'box',
              label: 'Box Breathing',
              content: (
                <div>
                  <p className="mb-4"><strong>Pattern:</strong> Inhale 4 counts, hold 4, exhale 4, hold 4.</p>
                  <p className="mb-4"><strong>Best for:</strong> Anxiety, pre-performance nerves, racing thoughts.</p>
                  <p className="mb-4"><strong>Why it works:</strong> The equal ratio of inhale-to-exhale creates balance in the nervous system. Used by Navy SEALs and first responders for calm under pressure.</p>
                  <p><strong>Duration:</strong> 4 rounds (about 2 minutes).</p>
                </div>
              ),
            },
            {
              id: 'physiological-sigh',
              label: 'Physiological Sigh',
              content: (
                <div>
                  <p className="mb-4"><strong>Pattern:</strong> Double inhale through the nose (one full breath, then a short top-up sip), followed by a long exhale through the mouth.</p>
                  <p className="mb-4"><strong>Best for:</strong> Acute stress, panic, real-time calming.</p>
                  <p className="mb-4"><strong>Why it works:</strong> The double inhale reinflates collapsed alveoli in the lungs, maximizing CO2 offloading on the exhale. Stanford research confirmed just one to three sighs significantly reduce stress.</p>
                  <p><strong>Duration:</strong> 1-3 breaths (under 30 seconds).</p>
                </div>
              ),
            },
            {
              id: '478',
              label: '4-7-8 Breathing',
              content: (
                <div>
                  <p className="mb-4"><strong>Pattern:</strong> Inhale 4 counts, hold 7 counts, exhale 8 counts.</p>
                  <p className="mb-4"><strong>Best for:</strong> Insomnia, general calming, winding down at night.</p>
                  <p className="mb-4"><strong>Why it works:</strong> The long exhale strongly activates the vagus nerve. The extended hold time also builds CO2 tolerance, which reduces panic sensitivity over time.</p>
                  <p><strong>Duration:</strong> 4 rounds (about 3 minutes).</p>
                </div>
              ),
            },
            {
              id: 'coherent',
              label: 'Coherent Breathing',
              content: (
                <div>
                  <p className="mb-4"><strong>Pattern:</strong> Inhale 5 counts, exhale 5 counts (approximately 6 breaths per minute).</p>
                  <p className="mb-4"><strong>Best for:</strong> Daily practice, heart rate variability training, general well-being.</p>
                  <p className="mb-4"><strong>Why it works:</strong> Six breaths per minute is the resonance frequency for most adults, meaning heart rate and blood pressure oscillations synchronize optimally.</p>
                  <p><strong>Duration:</strong> 5-20 minutes for full benefit.</p>
                </div>
              ),
            },
            {
              id: 'energizing',
              label: 'Energizing Breath',
              content: (
                <div>
                  <p className="mb-4"><strong>Pattern:</strong> Quick, sharp inhales and exhales through the nose (like bellows), about 2-3 cycles per second, for 30 seconds.</p>
                  <p className="mb-4"><strong>Best for:</strong> Low energy, sluggishness, mild dissociation.</p>
                  <p className="mb-4"><strong>Why it works:</strong> Rapid breathing activates the sympathetic nervous system, increasing alertness and energy. Use with caution if you have anxiety.</p>
                  <p><strong>Duration:</strong> 30 seconds, rest, repeat up to 3 times.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="matching-breath-to-emotion" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Matching Your Breath to Your Emotional State
        </h2>
        <p className="mb-6">
          The key to effective breathwork is choosing the right pattern for your current state. A calming breath when you need energy can make you feel worse, and an energizing breath during panic can escalate it <Citation id="7" index={7} source="Psychiatric Clinics of North America" year="2013" tier={1} />.
        </p>

        <ComparisonTable
          title="Breath Pattern Guide by Emotional State"
          columns={['Emotional State', 'Goal', 'Recommended Technique']}
          items={[
            { feature: 'Panic or acute anxiety', values: ['Rapid calming', 'Physiological sigh'] },
            { feature: 'Chronic worry', values: ['Sustained calm', 'Coherent breathing'] },
            { feature: 'Anger or frustration', values: ['De-escalation', 'Box breathing'] },
            { feature: 'Insomnia', values: ['Deep relaxation', '4-7-8 breathing'] },
            { feature: 'Low mood or fatigue', values: ['Activation', 'Energizing breath'] },
          ]}
        />

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Start with the physiological sigh --- it is the simplest, fastest, and requires no counting. Do one to three cycles whenever you notice stress rising. Once comfortable, add five minutes of coherent breathing (5 in, 5 out) to your morning or evening routine <Citation id="5" index={5} source="Frontiers in Psychology" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          Research shows consistent daily practice of controlled breathing produces measurable improvements in mood, anxiety, and heart rate variability within two to four weeks <Citation id="6" index={6} source="National Center for Complementary and Integrative Health" year="2023" tier={2} />.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If breathing exercises trigger more anxiety, lightheadedness, or flashbacks, stop and consult a professional. Some people with trauma histories or panic disorder may need guided instruction from a therapist before practicing independently <Citation id="9" index={9} source="Guilford Press" year="2014" tier={5} />.
        </p>

        <ArticleCallout variant="tip" title="Quick Reference">
          <p>Stressed right now? Try one physiological sigh: breathe in through your nose, take a second small sip of air, then exhale slowly through your mouth. That single breath can lower your heart rate in seconds.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 14: Grounding Techniques ────────────────────────────────────
  {
    id: catId(14),
    slug: 'grounding-techniques-come-back-to-present',
    title: 'Grounding Techniques: How to Come Back to the Present When Feelings Take Over',
    description: 'Learn grounding techniques used in therapy to anchor yourself in the present moment during emotional overwhelm, anxiety, or dissociation.',
    image: "/images/articles/cat01/cover-014.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grounding', 'Anxiety Relief', 'Dissociation', 'Mindfulness', 'Trauma Recovery'],
    citations: [
      {
        id: '1',
        text: 'Grounding techniques for PTSD: A systematic review',
        source: 'Journal of Traumatic Stress',
        year: '2019',
        link: 'https://doi.org/10.1002/jts.22439',
        tier: 1,
      },
      {
        id: '2',
        text: 'Sensory-based interventions for adults with mental health conditions: A systematic review',
        source: 'British Journal of Occupational Therapy',
        year: '2018',
        link: 'https://doi.org/10.1177/0308022617741480',
        tier: 1,
      },
      {
        id: '3',
        text: 'Mindfulness-based interventions for anxiety and depression',
        source: 'Clinical Psychology Review',
        year: '2016',
        link: 'https://doi.org/10.1016/j.cpr.2015.12.005',
        tier: 1,
      },
      {
        id: '4',
        text: 'Post-traumatic stress disorder: Evidence-based research for the third millennium',
        source: 'Evidence-Based Mental Health',
        year: '2019',
        link: 'https://doi.org/10.1136/ebmental-2019-300071',
        tier: 1,
      },
      {
        id: '5',
        text: 'Dissociation and dissociative disorders: Challenging conventional wisdom',
        source: 'Current Directions in Psychological Science',
        year: '2018',
        link: 'https://doi.org/10.1177/0963721418794759',
        tier: 1,
      },
      {
        id: '6',
        text: 'Seeking Safety: A treatment manual for PTSD and substance abuse',
        source: 'Guilford Press',
        year: '2002',
        link: 'https://www.guilford.com/books/Seeking-Safety/Lisa-Najavits/9781572306394',
        tier: 5,
      },
      {
        id: '7',
        text: 'Coping with anxiety: Grounding techniques',
        source: 'National Alliance on Mental Illness',
        year: '2023',
        link: 'https://www.nami.org/Blogs/NAMI-Blog/2023/Grounding-Techniques-for-Anxiety',
        tier: 3,
      },
      {
        id: '8',
        text: 'The body keeps the score: Brain, mind, and body in the healing of trauma',
        source: 'Penguin Books',
        year: '2014',
        link: 'https://doi.org/10.1176/appi.books.9780890425596',
        tier: 5,
      },
      {
        id: '9',
        text: 'Present-centered therapy versus cognitive processing therapy for PTSD',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2015',
        link: 'https://doi.org/10.1037/ccp0000019',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Have you ever been so overwhelmed by a feeling that you lost track of where you were? Maybe anxiety made the room feel distant. Maybe a painful memory pulled you out of the present. Maybe panic made everything feel unreal. In these moments, your mind has disconnected from the here-and-now. Grounding brings you back.
          </p>
          <p className="mb-6">
            Grounding techniques are a core intervention in trauma therapy, anxiety treatment, and dissociation management <Citation id="1" index={1} source="Journal of Traumatic Stress" year="2019" tier={1} />. They work by redirecting your attention from internal distress to the present moment through your senses, your body, or your thinking. Research shows these techniques reduce the intensity of emotional episodes and help people regain a sense of safety <Citation id="2" index={2} source="British Journal of Occupational Therapy" year="2018" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-grounding" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Grounding
        </h2>
        <p className="mb-6">
          Grounding is a coping strategy that helps you anchor your awareness in the present moment. It is especially useful when emotions pull you into the past (flashbacks, rumination) or the future (worry, catastrophizing). The goal is not to avoid emotions but to stabilize yourself enough to process them safely <Citation id="6" index={6} source="Guilford Press" year="2002" tier={5} />.
        </p>
        <p className="mb-6">
          There are three main categories of grounding: physical (using your body and senses), mental (using your thoughts), and soothing (using comfort and kindness). Each works through a different pathway, and having techniques from all three categories gives you the most flexibility <Citation id="7" index={7} source="National Alliance on Mental Illness" year="2023" tier={3} />.
        </p>

        <h2 id="physical-grounding" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Physical Grounding Techniques
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'five-senses',
              title: 'The 5-4-3-2-1 Technique',
              content: (
                <div>
                  <p className="mb-4">Name 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste. This engages all five senses and forces your brain to process external information instead of internal distress.</p>
                </div>
              ),
            },
            {
              id: 'cold-water',
              title: 'Cold Water or Ice',
              content: (
                <div>
                  <p className="mb-4">Hold ice cubes, splash cold water on your face, or press a cold object to your neck. Cold activates the dive reflex, slowing heart rate and pulling you back into physical awareness. This is one of the fastest grounding tools available.</p>
                </div>
              ),
            },
            {
              id: 'feet-on-floor',
              title: 'Feet on the Floor',
              content: (
                <div>
                  <p className="mb-4">Press your feet firmly into the ground. Notice the texture, the temperature, the pressure. Wiggle your toes. This simple act reconnects you to your body and to the physical space you are in.</p>
                </div>
              ),
            },
            {
              id: 'body-scan',
              title: 'Quick Body Scan',
              content: (
                <div>
                  <p className="mb-4">Starting at the top of your head, slowly scan down through your body. Notice any tension, warmth, tingling, or numbness. You do not need to change anything. Just notice. This brings attention inward in a safe, structured way.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="mental-grounding" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Mental Grounding Techniques
        </h2>
        <p className="mb-6">
          Mental grounding uses cognitive tasks to redirect your attention. These are especially helpful when physical grounding is not practical, such as during a meeting or on public transit.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Counting backward from 100 by 7s</strong> --- requires enough concentration to override rumination.</li>
          <li><strong>Naming categories</strong> --- list every dog breed, country, or color you can think of.</li>
          <li><strong>Describing your surroundings in detail</strong> --- "I am sitting in a brown chair. The wall is cream-colored. There is a window to my left."</li>
          <li><strong>Reciting something familiar</strong> --- a poem, song lyrics, or the alphabet backward.</li>
        </ul>

        <h2 id="soothing-grounding" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Soothing Grounding Techniques
        </h2>
        <p className="mb-6">
          Soothing grounding uses comfort and self-compassion to create a sense of safety:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Imagine a safe place</strong> --- picture a location where you feel completely safe and at ease.</li>
          <li><strong>Speak kindly to yourself</strong> --- "I am safe right now. This feeling will pass. I can handle this."</li>
          <li><strong>Touch something comforting</strong> --- a soft blanket, a smooth stone, or your own arm.</li>
          <li><strong>Remember someone who cares about you</strong> --- picture their face, recall their voice.</li>
        </ul>

        <BeforeAfter
          before={{
            title: 'Without Grounding',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Feeling disconnected from surroundings</li>
                <li>Spiraling into worst-case scenarios</li>
                <li>Numbness or emotional shutdown</li>
                <li>Minutes or hours of uncontrolled distress</li>
              </ul>
            ),
          }}
          after={{
            title: 'With Grounding',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Reconnected to the present moment</li>
                <li>Able to assess the situation clearly</li>
                <li>Emotional intensity reduced to manageable levels</li>
                <li>Recovery time shortened to minutes</li>
              </ul>
            ),
          }}
        />

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Pick one technique from each category and practice it daily for a week <Citation id="3" index={3} source="Clinical Psychology Review" year="2016" tier={1} />. Try the 5-4-3-2-1 method during a calm moment so you know the steps. Keep an ice cube in the freezer for high-intensity moments. Develop a safe-place visualization you can access quickly. The goal is to make these techniques reflexive so they are available when you need them most.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you experience frequent dissociation (feeling detached from your body or surroundings), flashbacks, or intense emotional episodes that grounding alone cannot manage, a trauma-informed therapist can help <Citation id="4" index={4} source="Evidence-Based Mental Health" year="2019" tier={1} />. Grounding is a starting point, not a substitute for professional treatment when deeper healing is needed <Citation id="9" index={9} source="Journal of Consulting and Clinical Psychology" year="2015" tier={1} />.
        </p>

        <ArticleCallout variant="tip" title="Grounding Emergency Kit">
          <p>Create a small kit you can carry with you: a smooth stone, a piece of strong-smelling mint, a photo of a safe place, and a card with the 5-4-3-2-1 steps written on it. Having physical anchors available makes grounding faster and easier during moments of high distress.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ─── Article 15: Cognitive Reappraisal ───────────────────────────────────
  {
    id: catId(15),
    slug: 'cognitive-reappraisal-change-feelings-by-changing-thoughts',
    title: 'Cognitive Reappraisal: How to Change What You Feel by Changing How You Think',
    description: 'Learn cognitive reappraisal --- the gold-standard emotion regulation strategy from CBT. Discover how reframing your interpretation of events can transform your emotional experience.',
    image: "/images/articles/cat01/cover-015.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Cognitive Reappraisal', 'CBT', 'Thought Patterns', 'Emotional Regulation', 'Reframing'],
    citations: [
      {
        id: '1',
        text: 'Cognitive reappraisal of emotion: A meta-analysis of human neuroimaging studies',
        source: 'Cerebral Cortex',
        year: '2014',
        link: 'https://doi.org/10.1093/cercor/bht154',
        tier: 1,
      },
      {
        id: '2',
        text: 'Individual differences in two emotion regulation processes: Implications for affect, relationships, and well-being',
        source: 'Journal of Personality and Social Psychology',
        year: '2003',
        link: 'https://doi.org/10.1037/0022-3514.85.2.348',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cognitive therapy of depression',
        source: 'Guilford Press',
        year: '1979',
        link: 'https://www.guilford.com/books/Cognitive-Therapy-of-Depression/Beck-Rush-Shaw-Emery/9780898629194',
        tier: 5,
      },
      {
        id: '4',
        text: 'The process model of emotion regulation: Convergences and divergences with existing frameworks',
        source: 'Emotion Review',
        year: '2023',
        link: 'https://doi.org/10.1177/17540739231164100',
        tier: 1,
      },
      {
        id: '5',
        text: 'Cognitive change as a mechanism of action in cognitive therapy',
        source: 'Archives of General Psychiatry',
        year: '2010',
        link: 'https://doi.org/10.1001/archgenpsychiatry.2009.198',
        tier: 1,
      },
      {
        id: '6',
        text: 'Reappraisal generation after stressor exposure: Effects on emotion',
        source: 'Emotion',
        year: '2017',
        link: 'https://doi.org/10.1037/emo0000271',
        tier: 1,
      },
      {
        id: '7',
        text: 'Age-related differences in emotion regulation: From emotion identification to reappraisal success',
        source: 'Developmental Psychology',
        year: '2021',
        link: 'https://doi.org/10.1037/dev0001116',
        tier: 1,
      },
      {
        id: '8',
        text: 'Cognitive behavioral therapy for anxiety disorders: An update on the empirical evidence',
        source: 'Dialogues in Clinical Neuroscience',
        year: '2015',
        link: 'https://doi.org/10.31887/DCNS.2015.17.3/akaczkurkin',
        tier: 1,
      },
      {
        id: '9',
        text: 'The nature and treatment of emotion dysregulation',
        source: 'National Institute of Mental Health',
        year: '2022',
        link: 'https://www.nimh.nih.gov/health/topics/emotion-regulation',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your colleague does not reply to your email for two days. You could think, "They are ignoring me because they are upset with me." Or you could think, "They are probably swamped with deadlines this week." Same situation. Completely different emotional outcomes. This is the power of cognitive reappraisal --- one of the most well-researched emotion regulation strategies in psychology.
          </p>
          <p className="mb-6">
            Cognitive reappraisal means changing the way you interpret a situation to change the way you feel about it. Neuroimaging studies show that when people use reappraisal successfully, activity in the prefrontal cortex increases while amygdala activation decreases --- the thinking brain calms the emotional brain <Citation id="1" index={1} source="Cerebral Cortex" year="2014" tier={1} />.
          </p>
        </div>

        <h2 id="understanding-reappraisal" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Cognitive Reappraisal
        </h2>
        <p className="mb-6">
          The foundation of cognitive reappraisal comes from Aaron Beck's cognitive model, developed in the 1970s <Citation id="3" index={3} source="Guilford Press" year="1979" tier={5} />. Beck proposed that it is not events themselves that cause our emotions, but our interpretations of those events. When you change the interpretation, the emotion follows.
        </p>
        <p className="mb-6">
          James Gross's process model of emotion regulation identifies five points where you can intervene in the emotion generation process, and reappraisal occurs at the most powerful point --- before the full emotional response has been generated <Citation id="4" index={4} source="Emotion Review" year="2023" tier={1} />.
        </p>

        <QuoteBlock
          quote="Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom."
          attribution="Viktor Frankl"
          role="Psychiatrist and Holocaust Survivor"
          source="Man's Search for Meaning"
          variant="large"
        />

        <h2 id="reappraisal-vs-suppression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Reappraisal vs. Suppression
        </h2>
        <p className="mb-6">
          It is important to understand what reappraisal is not. It is not pushing emotions down, pretending you do not feel them, or putting on a brave face. That is suppression, and research consistently shows suppression backfires --- it increases physiological stress, reduces memory, and damages relationships <Citation id="2" index={2} source="Journal of Personality and Social Psychology" year="2003" tier={1} />.
        </p>

        <ComparisonTable
          title="Reappraisal vs. Suppression"
          columns={['Dimension', 'Reappraisal', 'Suppression']}
          items={[
            { feature: 'Timing', values: ['Before full emotion forms', 'After emotion is fully felt'] },
            { feature: 'Emotional experience', values: ['Reduced intensity', 'Unchanged or increased'] },
            { feature: 'Physical stress', values: ['Reduced', 'Increased'] },
            { feature: 'Relationships', values: ['Strengthened', 'Weakened'] },
            { feature: 'Long-term well-being', values: ['Improved', 'Worsened'] },
            { feature: 'Brain activity', values: ['Prefrontal cortex up, amygdala down', 'High amygdala activation persists'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="how-to-reappraise" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Practice Cognitive Reappraisal
        </h2>
        <p className="mb-6">
          Reappraisal is a skill that improves with practice. Here are the core steps <Citation id="5" index={5} source="Archives of General Psychiatry" year="2010" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Identify the Thought',
              description: <p>Catch the automatic interpretation. What story is your mind telling about this situation? Write it down if possible. Example: 'My friend cancelled plans. They must not want to spend time with me."</p>,
            },
            {
              title: 'Examine the Evidence',
              description: <p>Is this thought factual or an assumption? What evidence supports it? What evidence contradicts it? Are there alternative explanations? 'Has my friend cancelled before because they were tired, not because of me?"</p>,
            },
            {
              title: 'Generate Alternatives',
              description: <p>Create two or three plausible alternative interpretations. They do not need to be positive --- just realistic. 'Maybe they are sick. Maybe they had a family emergency. Maybe they need alone time."</p>,
            },
            {
              title: 'Choose the Most Balanced Interpretation',
              description: <p>Select the interpretation that is most accurate and helpful. It does not need to be the most optimistic --- it needs to be the most realistic. 'I do not know why they cancelled, and jumping to conclusions does not help me."</p>,
            },
          ]}
        />

        <h2 id="common-thinking-traps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Thinking Traps to Watch For
        </h2>
        <p className="mb-6">
          Certain patterns of thinking make reappraisal harder. Recognizing these common distortions (called cognitive distortions in CBT) helps you catch them faster <Citation id="8" index={8} source="Dialogues in Clinical Neuroscience" year="2015" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>All-or-nothing thinking</strong> --- seeing things in black and white with no middle ground.</li>
          <li><strong>Mind reading</strong> --- assuming you know what others are thinking without evidence.</li>
          <li><strong>Catastrophizing</strong> --- jumping to the worst possible outcome.</li>
          <li><strong>Personalization</strong> --- taking responsibility for things that are not about you.</li>
          <li><strong>Emotional reasoning</strong> --- believing something is true because it feels true.</li>
        </ul>

        <h2 id="getting-started" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Get Started
        </h2>
        <p className="mb-6">
          Start by keeping a simple thought log. When you notice a strong emotion, write down: (1) the situation, (2) your automatic thought, (3) the emotion and its intensity, and (4) an alternative interpretation. Research shows that people who regularly practice reappraisal show measurable improvements in well-being within just a few weeks <Citation id="6" index={6} source="Emotion" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          Reappraisal gets easier with age and experience <Citation id="7" index={7} source="Developmental Psychology" year="2021" tier={1} />, but starting the practice now builds a foundation that pays dividends for decades.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If negative thought patterns are deeply entrenched and self-guided reappraisal is not making a difference, cognitive behavioral therapy with a trained professional can help. CBT provides structured, evidence-based guidance for identifying and restructuring unhelpful thought patterns <Citation id="8" index={8} source="Dialogues in Clinical Neuroscience" year="2015" tier={1} />. The National Institute of Mental Health recommends CBT as a first-line treatment for anxiety and depression <Citation id="9" index={9} source="National Institute of Mental Health" year="2022" tier={2} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaway">
          <p>Cognitive reappraisal is not about thinking positively. It is about thinking accurately. When you learn to question your automatic interpretations and consider alternatives, you gain the power to change your emotional experience without suppressing anything.</p>
        </ArticleCallout>
      </>
    ),
  },
];
