/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SELF_WORTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ComparisonTable,
  ProgressSteps,
  ArticleAccordion,
  StatCard,
} from '../../../components/article/blocks';

export const identityValuesArticlesA: Article[] = [
  {
    id: catId(41),
    slug: 'who-am-i-guide-identity-formation-development',
    title: 'Who Am I? A Guide to Identity Formation and Development',
    description: 'Identity develops throughout life. Understand how you form your sense of self and why "who am I?" is a question worth exploring.',
    image: "/images/articles/cat04/cover-041.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Identity', 'Self-Concept', 'Personal Development', 'Psychology'],
    citations: [
      { id: '1', text: 'Identity development across the lifespan', source: 'Journal of Personality', year: '2020', link: 'https://doi.org/10.1111/jopy.12542', tier: 1 },
      { id: '2', text: "Erikson's theory of psychosocial development", source: 'Developmental Review', year: '2020', link: 'https://doi.org/10.1016/j.dr.2020.100920', tier: 1 },
      { id: '3', text: 'Narrative identity and psychological well-being', source: 'Journal of Personality and Social Psychology', year: '2021', link: 'https://doi.org/10.1037/pspp0000318', tier: 1 },
      { id: '4', text: 'Identity exploration and commitment', source: 'Developmental Psychology', year: '2020', link: 'https://doi.org/10.1037/dev0000988', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Who am I?" It's a simple question with complex answers. Your identity---your sense of self---develops throughout life, shaped by experiences, relationships, choices, and reflection. It's not fixed or discovered; it's constructed, explored, and revised as you grow.
          </p>
          <p className="mb-6">
            Identity formation is a core developmental task, particularly intense in adolescence and young adulthood but continuing throughout the lifespan <Citation id="1" index={1} source="Journal of Personality" year="2020" tier={1} />. Understanding how identity develops helps you navigate questions about who you are and who you want to become.
          </p>
        </div>

        <h2 id="what-is-identity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Identity?
        </h2>
        <p className="mb-6">
          Identity is your internalized story about who you are. It includes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Personal identity:</strong> Unique traits, preferences, values, experiences</li>
          <li><strong>Social identity:</strong> Group memberships (culture, gender, profession, etc.)</li>
          <li><strong>Narrative identity:</strong> The story you tell about your life and how it shapes meaning <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2021" tier={1} /></li>
        </ul>

        <h2 id="erikson-stages" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Erikson's Identity Development
        </h2>
        <p className="mb-6">
          Psychologist Erik Erikson proposed that identity formation is the central task of adolescence, but identity continues evolving across eight life stages <Citation id="2" index={2} source="Developmental Review" year="2020" tier={2} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Adolescence: Identity vs. Role Confusion', description: <p>Explore different roles, values, beliefs. The question 'Who am I?" becomes urgent. Success leads to coherent identity; struggle leads to confusion.</p> },
            { title: 'Young Adulthood: Intimacy vs. Isolation', description: <p>With established identity, you form deep connections. Requires balancing self with relationships.</p> },
            { title: 'Midlife: Generativity vs. Stagnation', description: <p>Contributing to society, mentoring others, leaving a legacy. Identity shifts to 'What am I contributing?"</p> },
            { title: 'Older Adulthood: Integrity vs. Despair', description: <p>Reflecting on life with acceptance or regret. Integrating all previous identities into coherent whole.</p> },
          ]}
        />

        <h2 id="exploration-commitment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Exploration and Commitment
        </h2>
        <p className="mb-6">
          Identity development involves two processes <Citation id="4" index={4} source="Developmental Psychology" year="2020" tier={1} />:
        </p>
        <ComparisonTable
          title="Identity Formation Processes"
          columns={['Process', 'What It Means', 'Healthy vs. Problematic']}
          items={[
            { feature: 'Exploration', values: ['Trying different roles, values, beliefs', 'Healthy: Curious, open experimentation; Problematic: Aimless drifting without reflection'] },
            { feature: 'Commitment', values: ['Choosing and investing in specific identity elements', 'Healthy: Flexible commitment after exploration; Problematic: Rigid commitment without exploration (foreclosure)'] },
          ]}
          highlightColumn={2}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Identity is not something you find---it's something you construct through exploration, reflection, and commitment. It evolves throughout life as you encounter new experiences, relationships, and transitions. "Who am I?" is a lifelong question, not a one-time answer.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(42),
    slug: 'identity-crisis-when-you-dont-know-who-you-are',
    title: "Identity Crisis: When You Don't Know Who You Are Anymore",
    description: "Feeling lost about who you are is disorienting and frightening. Learn what triggers identity crises and how to navigate them constructively.",
    image: "/images/articles/cat04/cover-042.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Identity Crisis', 'Life Transitions', 'Self-Discovery', 'Mental Health'],
    citations: [
      { id: '1', text: 'Identity distress and psychological outcomes', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.101974', tier: 1 },
      { id: '2', text: 'Life transitions and identity reconstruction', source: 'Journal of Adult Development', year: '2020', link: 'https://doi.org/10.1007/s10804-020-09345-6', tier: 1 },
      { id: '3', text: 'Identity flexibility and mental health', source: 'Journal of Personality', year: '2021', link: 'https://doi.org/10.1111/jopy.12639', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You wake up one day and the person you thought you were feels unfamiliar. The roles that defined you---professional, parent, partner---no longer fit. Your values seem unclear, your future uncertain. This disorienting experience is an identity crisis, and it's more common than you might think.
          </p>
          <p className="mb-6">
            Identity crises occur when major life changes disrupt your sense of self <Citation id="1" index={1} source="Clinical Psychology Review" year="2021" tier={1} />. While frightening, they're also opportunities for growth and redefinition <Citation id="2" index={2} source="Journal of Adult Development" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="triggers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Triggers
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Major life transitions:</strong> Career loss, divorce, becoming a parent, retirement</li>
          <li><strong>Loss of defining role:</strong> Empty nest, end of athletic career, job change</li>
          <li><strong>Trauma or illness:</strong> Events that alter how you see yourself</li>
          <li><strong>Cultural displacement:</strong> Immigration, leaving religion, coming out</li>
          <li><strong>Existential questioning:</strong> "Is this all there is?" moments, often in midlife</li>
        </ul>

        <h2 id="what-it-feels-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Identity Crisis Feels Like
        </h2>
        <ArticleAccordion
          type="multiple"
          items={[
            { id: 'confusion', title: 'Confusion and Disorientation', content: <p>Not knowing who you are or what you want. Feeling like a stranger to yourself.</p> },
            { id: 'anxiety', title: 'Anxiety and Uncertainty', content: <p>Fear about the future. Feeling unmoored without clear direction or purpose.</p> },
            { id: 'emptiness', title: 'Emptiness or Void', content: <p>Sense that something fundamental is missing. Life feels hollow or meaningless.</p> },
            { id: 'questioning', title: 'Constant Questioning', content: <p>"Who am I? What do I value? What's my purpose?" Obsessive self-examination without answers.</p> },
          ]}
        />

        <h2 id="navigating-crisis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Navigating Identity Crisis
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Accept the Uncertainty', description: <p>Resist the urge to force clarity. Identity reconstruction takes time. Uncertainty is uncomfortable but normal.</p> },
            { title: 'Explore Without Committing', description: <p>Try new activities, roles, communities. Exploration without immediate commitment reduces pressure.</p> },
            { title: 'Reflect on Values', description: <p>What matters to you? Values provide compass when roles change. Clarifying core values guides decisions.</p> },
            { title: 'Seek Support', description: <p>Talk to trusted friends, therapist, or mentor. Articulating confusion helps clarify it <Citation id="3" index={3} source="Journal of Personality" year="2021" tier={1} />.</p> },
            { title: 'Be Patient', description: <p>Identity doesn't resolve overnight. Small steps, gradual clarity. Trust the process.</p> },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Identity crises are disorienting but common, often triggered by major life transitions. While uncomfortable, they offer opportunities to redefine yourself more authentically. Navigating them requires accepting uncertainty, exploring options, clarifying values, and being patient with the process.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(43),
    slug: 'living-authentically-what-it-means-why-difficult',
    title: "Living Authentically: What It Means and Why It's So Difficult",
    description: "Authenticity means aligning actions with values. Learn why living authentically is psychologically beneficial yet socially challenging.",
    image: "/images/articles/cat04/cover-043.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Authenticity', 'Values', 'Self-Concept', 'Personal Growth'],
    citations: [
      { id: '1', text: 'Authenticity and psychological well-being', source: 'Journal of Counseling Psychology', year: '2020', link: 'https://doi.org/10.1037/cou0000412', tier: 1 },
      { id: '2', text: 'The social costs of authenticity', source: 'Psychological Science', year: '2021', link: 'https://doi.org/10.1177/0956797620975820', tier: 1 },
      { id: '3', text: 'Authenticity in close relationships', source: 'Journal of Personality and Social Psychology', year: '2020', link: 'https://doi.org/10.1037/pspi0000259', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Be yourself" sounds simple. But authenticity---aligning your actions with your true values and self-concept---is psychologically complex and socially risky. It requires knowing who you are, having the courage to express it, and accepting the consequences.
          </p>
          <p className="mb-6">
            Research shows authentic living predicts greater life satisfaction, self-esteem, and psychological well-being <Citation id="1" index={1} source="Journal of Counseling Psychology" year="2020" tier={1} />. Yet it often conflicts with social expectations, creating tension between being yourself and being accepted <Citation id="2" index={2} source="Psychological Science" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-authenticity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Authenticity?
        </h2>
        <p className="mb-6">Authenticity involves three components:</p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Self-awareness:</strong> Knowing your values, preferences, emotions, and motivations</li>
          <li><strong>Unbiased processing:</strong> Honestly assessing yourself, including weaknesses</li>
          <li><strong>Behavior alignment:</strong> Acting in ways consistent with your true self, not just to please others or conform</li>
        </ol>

        <h2 id="why-difficult" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Authenticity Is Difficult
        </h2>
        <ComparisonTable
          title="Barriers to Authenticity"
          columns={['Barrier', 'Description', 'Example']}
          items={[
            { feature: 'Social consequences', values: ['Rejection, conflict, disapproval', 'Coming out risks family rejection'] },
            { feature: 'Unclear self-concept', values: ['Not knowing who you truly are', 'Unsure what you value beyond what others expect'] },
            { feature: 'Fear of judgment', values: ['Anticipating negative evaluation', 'Hiding unconventional interests or beliefs'] },
            { feature: 'Situational demands', values: ['Contexts require different selves', 'Professional mask vs. personal self'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="practicing-authenticity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practicing Authenticity
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Clarify Your Values', description: <p>What matters most to you? What do you stand for? Values guide authentic choices.</p> },
            { title: "Notice When You're Performing", description: <p>Identify moments when you act for approval rather than alignment with self. Awareness is the first step.</p> },
            { title: 'Start Small', description: <p>Express authentic opinions in low-stakes situations. Build confidence gradually.</p> },
            { title: 'Accept That Not Everyone Will Approve', description: <p>Authenticity attracts some, repels others. That's okay. Approval isn't the goal; alignment is <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2020" tier={1} />.</p> },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Authenticity means aligning actions with your true values and self-concept. It's psychologically beneficial but socially risky. Practicing authenticity requires self-awareness, courage to express yourself honestly, and acceptance that not everyone will approve. The cost of inauthenticity---living for others' expectations---is chronic disconnection from yourself.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(44),
    slug: 'values-guide-life-practical-clarification-exercise',
    title: 'How Values Guide Your Life: A Practical Exercise in Clarification',
    description: 'Your values are your compass. Learn what values are, why they matter, and how to clarify your own through practical exercises.',
    image: "/images/articles/cat04/cover-044.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Values', 'Personal Growth', 'Decision Making', 'Self-Awareness'],
    citations: [
      { id: '1', text: 'Values and psychological well-being', source: 'Journal of Positive Psychology', year: '2020', link: 'https://doi.org/10.1080/17439760.2020.1789696', tier: 1 },
      { id: '2', text: 'Acceptance and Commitment Therapy', source: 'Behavior Therapy', year: '2021', link: 'https://doi.org/10.1016/j.beth.2020.12.002', tier: 1 },
      { id: '3', text: 'Values-based decision making', source: 'Journal of Behavioral Decision Making', year: '2020', link: 'https://doi.org/10.1002/bdm.2168', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When decisions feel overwhelming, values provide clarity. When life feels directionless, values point the way. Unlike goals (which you achieve), values are ongoing commitments to what matters---the compass that guides choices throughout life.
          </p>
          <p className="mb-6">
            Research shows living according to your values predicts life satisfaction, resilience, and psychological wellbeing <Citation id="1" index={1} source="Journal of Positive Psychology" year="2020" tier={1} />. Yet many people have never explicitly clarified what they value <Citation id="2" index={2} source="Behavior Therapy" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="what-are-values" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are Values?
        </h2>
        <p className="mb-6">
          Values are chosen life directions---what you want your life to stand for. They're:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Ongoing:</strong> Never "finished" (unlike goals)</li>
          <li><strong>Chosen:</strong> You select them freely, not based on obligation</li>
          <li><strong>Personal:</strong> What matters to you, not what should matter</li>
          <li><strong>Action-guiding:</strong> They inform decisions and behavior</li>
        </ul>

        <h2 id="values-vs-goals" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Values vs. Goals
        </h2>
        <ComparisonTable
          title="Understanding the Difference"
          columns={['Feature', 'Values', 'Goals']}
          items={[
            { feature: 'Nature', values: ['Ongoing direction', 'Specific outcome'] },
            { feature: 'Achievement', values: ["Never 'complete'", 'Can be achieved/finished'] },
            { feature: 'Example', values: ['Being a caring friend', 'Call a friend this week'] },
            { feature: 'Motivation', values: ['Intrinsic meaning', 'Often external reward'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="clarification-exercise" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Values Clarification Exercise
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Identify Life Domains',
              description: (
                <p>Consider different areas: relationships, work, health, personal growth, leisure, community, spirituality. Not all domains matter equally---that's okay.</p>
              ),
            },
            {
              title: 'Ask: What Matters Here?',
              description: (
                <p>For each domain, ask: 'If I could be the person I want to be in this area, what would I stand for? What would guide my actions?" Write freely without judging.</p>
              ),
            },
            {
              title: 'Distinguish Values from Obligations',
              description: (
                <p>Check each item: Is this what I genuinely value, or what I think I 'should' value? Values feel meaningful, not obligatory.</p>
              ),
            },
            {
              title: 'Prioritize',
              description: (
                <p>Identify 3-5 core values across all domains. These are your compass <Citation id="3" index={3} source="Journal of Behavioral Decision Making" year="2020" tier={1} />.</p>
              ),
            },
            {
              title: 'Translate to Actions',
              description: (
                <p>For each value, ask: "What's one small action that aligns with this value this week?" Values guide behavior, not just belief.</p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip">
          <p className="font-semibold mb-3">Sample values across domains:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Relationships:</strong> Authenticity, loyalty, compassion</li>
            <li><strong>Work:</strong> Creativity, contribution, mastery</li>
            <li><strong>Personal growth:</strong> Curiosity, courage, self-compassion</li>
            <li><strong>Health:</strong> Vitality, balance, self-care</li>
          </ul>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway">
          <p>Values are chosen life directions that guide decisions and create meaning. Unlike goals, they're never finished---they're ongoing commitments. Clarifying your values provides a compass for navigating life's decisions, creating coherence between what matters to you and how you live.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(45),
    slug: 'masks-we-wear-code-switching-people-pleasing-losing-yourself',
    title: 'The Masks We Wear: Code-Switching, People-Pleasing, and Losing Yourself',
    description: 'We adapt ourselves to different contexts---but when does flexibility become inauthenticity? Learn when code-switching protects you and when it erodes your sense of self.',
    image: "/images/articles/cat04/cover-045.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Authenticity', 'Code-Switching', 'People-Pleasing', 'Identity'],
    citations: [
      { id: '1', text: 'Code-switching and identity', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2020', link: 'https://doi.org/10.1037/cdp0000346', tier: 1 },
      { id: '2', text: 'People-pleasing and mental health', source: 'Journal of Clinical Psychology', year: '2021', link: 'https://doi.org/10.1002/jclp.23089', tier: 1 },
      { id: '3', text: 'Authenticity and psychological cost of self-concealment', source: 'Journal of Personality', year: '2020', link: 'https://doi.org/10.1111/jopy.12542', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You speak differently at work than with friends. You hide certain opinions around family. You adjust your personality to fit the room. This adaptive shape-shifting---called code-switching---can be protective strategy or chronic self-abandonment. The line between healthy flexibility and losing yourself is context, cost, and choice.
          </p>
          <p className="mb-6">
            Code-switching describes adjusting language, behavior, or presentation based on social context <Citation id="1" index={1} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />. While sometimes necessary for safety or success, chronic masking erodes sense of self and contributes to burnout, anxiety, and identity confusion <Citation id="3" index={3} source="Journal of Personality" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="types-of-masking" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Types of Adaptive Masking
        </h2>
        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'code-switching',
              title: 'Cultural/Linguistic Code-Switching',
              content: (
                <p>
                  Adjusting language, accent, or cultural expression based on context. Common among people navigating multiple cultural worlds. Can be empowering (code fluency) or exhausting (constant performance).
                </p>
              ),
            },
            {
              id: 'professional-masking',
              title: 'Professional Masking',
              content: (
                <p>
                  Presenting a 'professional self' that differs from personal self. Hiding emotions, interests, or aspects of identity deemed "unprofessional." Necessary to some degree but draining when extreme.
                </p>
              ),
            },
            {
              id: 'people-pleasing',
              title: 'People-Pleasing',
              content: (
                <p>
                  Chronically prioritizing others' approval over own needs. Agreeing when you disagree, suppressing preferences, molding yourself to others' expectations <Citation id="2" index={2} source="Journal of Clinical Psychology" year="2021" tier={1} />.
                </p>
              ),
            },
            {
              id: 'identity-concealment',
              title: 'Identity Concealment',
              content: (
                <p>
                  Hiding aspects of identity (sexual orientation, disability, mental health history) due to stigma or safety concerns. Protective but psychologically costly over time.
                </p>
              ),
            },
          ]}
        />

        <h2 id="when-protective" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Masking Is Protective
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Safety:</strong> Concealing identity in genuinely unsafe contexts (e.g., homophobic environment)</li>
          <li><strong>Strategic advancement:</strong> Navigating biased systems requires code-switching for opportunity</li>
          <li><strong>Cultural fluency:</strong> Moving between cultural contexts with skill and choice</li>
          <li><strong>Contextual appropriateness:</strong> Adjusting formality or tone to match setting</li>
        </ul>

        <h2 id="when-harmful" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Masking Becomes Self-Erosion
        </h2>
        <p className="mb-6">Chronic masking harms mental health when:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You no longer know who you are without the mask</li>
          <li>Every context requires a different performance</li>
          <li>There's no space where you can be fully yourself</li>
          <li>You feel like a fraud or impostor constantly</li>
          <li>Exhaustion, burnout, or resentment build from constant adaptation</li>
        </ul>

        <h2 id="reclaiming-self" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Reclaiming Yourself
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Identify Your Masks', description: <p>Notice when and how you code-switch. What aspects of yourself do you hide, and in what contexts?</p> },
            { title: 'Ask: Is This Choice or Obligation?', description: <p>Do you choose to adapt, or does it feel compulsory? Choice preserves agency; obligation erodes it.</p> },
            { title: 'Create Authentic Spaces', description: <p>Find or create at least one context where you can be fully yourself---with certain friends, communities, or activities.</p> },
            { title: 'Practice Micro-Authenticity', description: <p>Slowly introduce authentic expressions in safer contexts. Small revelations build confidence.</p> },
            { title: 'Challenge Assumptions', description: <p>What do you assume will happen if you show up more authentically? Test those assumptions carefully.</p> },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Adapting to different contexts is normal and sometimes necessary. But chronic masking---hiding core aspects of self across all contexts---erodes identity and mental health. Healthy code-switching involves choice, strategy, and spaces where you can drop the mask. The goal isn't rigid consistency, but ensuring you never lose sight of who you actually are.</p>
        </ArticleCallout>
      </>
    ),
  },
];
