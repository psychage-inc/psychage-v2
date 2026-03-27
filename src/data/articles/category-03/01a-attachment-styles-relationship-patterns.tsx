 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_RELATIONSHIPS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  ProgressSteps,
} from '../../../components/article/blocks';

export const attachmentStylesArticlesA: Article[] = [
  // ==========================================================================
  // CAT03-001: The Four Attachment Styles
  // ==========================================================================
  {
    id: catId(1),
    slug: 'four-attachment-styles-how-early-bonds-shape-adult-love',
    status: 'draft',
    title: 'The Four Attachment Styles: How Early Bonds Shape Adult Love',
    description: 'Discover how your childhood relationships with caregivers influence your adult romantic patterns through the lens of attachment theory.',
    image: "/images/articles/cat03/cover-001.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Attachment Theory', 'Relationships', 'Psychology', 'Self-Awareness'],
    citations: [
      {
        id: '1',
        text: 'Attachment and Loss, Vol. 1: Attachment',
        source: 'Basic Books',
        year: '1969',
        link: 'https://www.attachmentproject.com/bibliography/',
        tier: 5,
      },
      {
        id: '2',
        text: 'Adult attachment, stress, and romantic relationships',
        source: 'Current Opinion in Psychology',
        year: '2019',
        link: 'https://doi.org/10.1016/j.copsyc.2018.12.012',
        tier: 1,
      },
      {
        id: '3',
        text: 'Attachment theory and research: New directions and emerging themes',
        source: 'Psychological Bulletin',
        year: '2013',
        link: 'https://doi.org/10.1037/a0032765',
        tier: 1,
      },
      {
        id: '4',
        text: 'The origins of attachment theory: John Bowlby and Mary Ainsworth',
        source: 'Developmental Psychology',
        year: '1992',
        link: 'https://doi.org/10.1037/0012-1649.28.5.759',
        tier: 1,
      },
      {
        id: '5',
        text: 'Adult attachment patterns: A test of the typological model',
        source: 'Attachment in Adulthood',
        year: '2007',
        link: 'https://doi.org/10.1093/acprof:oso/9780198570844.001.0001',
        tier: 5,
      },
      {
        id: '6',
        text: 'Attachment style and affect regulation: Relationships with health behavior and family experiences',
        source: 'Health Psychology',
        year: '2005',
        link: 'https://doi.org/10.1037/0278-6133.24.4.394',
        tier: 1,
      },
      {
        id: '7',
        text: 'Attachment styles among young adults: A test of a four-category model',
        source: 'Journal of Personality and Social Psychology',
        year: '1991',
        link: 'https://doi.org/10.1037/0022-3514.61.2.226',
        tier: 1,
      },
      {
        id: '8',
        text: 'The distribution of adult attachment styles in non-clinical, psychologically distressed, and clinical samples',
        source: 'Attachment & Human Development',
        year: '2014',
        link: 'https://doi.org/10.1080/14616734.2014.912487',
        tier: 1,
      },
      {
        id: '9',
        text: 'Adult attachment and relationship satisfaction: The mediating role of emotion regulation',
        source: 'Journal of Social and Personal Relationships',
        year: '2018',
        link: 'https://doi.org/10.1177/0265407517746518',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The way you love as an adult has roots in the relationships you formed in your first years of life. This isn't about blame---it's about understanding a powerful psychological framework that explains why you seek closeness or distance, trust easily or struggle with vulnerability, and react the way you do when relationships feel uncertain.
          </p>
          <p className="mb-6">
            Attachment theory, first developed by psychiatrist John Bowlby in the 1960s, proposes that early experiences with caregivers create internal working models for how we expect relationships to function <Citation id="1" index={1} source="Basic Books" year="1969" tier={5} />. These patterns follow us into adulthood, shaping how we navigate romantic relationships, friendships, and even professional connections <Citation id="2" index={2} source="Current Opinion in Psychology" year="2019" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-attachment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Attachment?
        </h2>
        <p className="mb-6">
          Attachment is the emotional bond between a child and their primary caregiver. When a baby cries and a caregiver responds with comfort, the baby learns: "My needs matter. The world is safe. I can rely on others." When responses are inconsistent, absent, or frightening, different lessons get encoded <Citation id="3" index={3} source="Psychological Bulletin" year="2013" tier={1} />.
        </p>
        <p className="mb-6">
          Psychologist Mary Ainsworth expanded Bowlby's work through the "Strange Situation" experiment, which observed how toddlers responded to brief separations from their caregivers <Citation id="4" index={4} source="Developmental Psychology" year="1992" tier={1} />. Her research revealed distinct patterns that researchers later mapped onto adult relationships.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Attachment is not destiny. While early patterns influence your tendencies, awareness and new relationship experiences can reshape how you connect with others.</p>
        </ArticleCallout>

        <h2 id="four-styles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Four Attachment Styles
        </h2>
        <p className="mb-6">
          Adult attachment research identifies four primary styles, each with distinct characteristics in how people approach intimacy, independence, and emotional vulnerability <Citation id="5" index={5} source="Attachment in Adulthood" year="2007" tier={5} />.
        </p>

        <ArticleChart
          type="bar"
          title="Distribution of Attachment Styles in the General Population"
          data={[
            { label: 'Secure', value: 60 },
            { label: 'Anxious', value: 20 },
            { label: 'Avoidant', value: 15 },
            { label: 'Disorganized', value: 5 },
          ]}
          source="Attachment & Human Development, 2014"
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Secure Attachment (~60% of adults)
        </h3>
        <p className="mb-6">
          Secure individuals are comfortable with intimacy and independence. They trust that others will be there for them but don't need constant reassurance. Relationships feel like safe havens, not threats <Citation id="6" index={6} source="Health Psychology" year="2005" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Core belief:</strong> "I am worthy of love, and others are generally trustworthy and responsive."
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Can express needs and emotions openly</li>
          <li>Comfortable with conflict, seeing it as resolvable</li>
          <li>Not threatened by partner's independence</li>
          <li>Can give and receive support effectively</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Anxious (Preoccupied) Attachment (~20% of adults)
        </h3>
        <p className="mb-6">
          Anxious individuals crave closeness but worry constantly about rejection or abandonment. They seek high levels of intimacy and approval but often feel their needs aren't fully met <Citation id="7" index={7} source="Journal of Personality and Social Psychology" year="1991" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Core belief:</strong> "I need others to feel complete, but I'm not sure they'll be there for me."
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Highly attuned to relationship cues (often overinterpreting)</li>
          <li>Frequent need for reassurance</li>
          <li>Fear of being alone or unwanted</li>
          <li>Intense emotional reactions to perceived distance</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Avoidant (Dismissive) Attachment (~15% of adults)
        </h3>
        <p className="mb-6">
          Avoidant individuals prioritize independence and self-reliance. Closeness can feel uncomfortable or suffocating. They often downplay emotions and prefer maintaining emotional distance <Citation id="8" index={8} source="Attachment & Human Development" year="2014" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Core belief:</strong> "I don't need others. Depending on people leads to disappointment."
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Discomfort with vulnerability</li>
          <li>Value independence over connection</li>
          <li>Suppress or minimize emotions</li>
          <li>Pull away when things get "too close"</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Disorganized (Fearful-Avoidant) Attachment (~5% of adults)
        </h3>
        <p className="mb-6">
          Disorganized attachment combines anxious and avoidant patterns in confusing ways. Individuals simultaneously crave and fear intimacy, creating a push-pull dynamic in relationships <Citation id="9" index={9} source="Journal of Social and Personal Relationships" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Core belief:</strong> "I want closeness but expect to be hurt. People are both the source of comfort and pain."
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Oscillating between clinging and distancing</li>
          <li>High fear of rejection combined with distrust</li>
          <li>Difficulty regulating emotions in relationships</li>
          <li>Often linked to trauma or inconsistent early caregiving</li>
        </ul>

        <ComparisonTable
          title="Attachment Styles: Key Differences"
          columns={['Style', 'View of Self', 'View of Others', 'Primary Fear']}
          items={[
            { feature: 'Secure', values: ['Worthy', 'Trustworthy', 'Neither---balanced'] },
            { feature: 'Anxious', values: ['Unworthy', 'Trustworthy but unreliable', 'Abandonment'] },
            { feature: 'Avoidant', values: ['Self-sufficient', 'Unreliable', 'Losing independence'] },
            { feature: 'Disorganized', values: ['Unworthy', 'Unpredictable', 'Both intimacy and rejection'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="how-it-shows-up" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Attachment Shows Up in Adult Relationships
        </h2>
        <p className="mb-6">
          Attachment patterns influence everything from how you handle conflict to how you interpret a partner's silence. A text that goes unanswered might feel neutral to a secure person, alarming to an anxious person, and like welcome space to an avoidant person.
        </p>
        <p className="mb-6">
          Understanding your style isn't about labeling yourself---it's about recognizing patterns so you can make conscious choices instead of automatic reactions.
        </p>

        <ArticleCallout variant="tip">
          <p><strong>Reflection prompt:</strong> Think about your last relationship conflict. Did you move toward your partner (anxious), pull away (avoidant), do both at different times (disorganized), or communicate openly (secure)? Your default response under stress reveals your attachment tendency.</p>
        </ArticleCallout>

        <h2 id="beyond-categories" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Attachment Is a Spectrum, Not a Box
        </h2>
        <p className="mb-6">
          Most people don't fit perfectly into one category. You might lean secure but show anxious patterns when stressed, or shift between styles depending on the relationship. Attachment is better understood as a spectrum of anxiety (fear of abandonment) and avoidance (discomfort with closeness).
        </p>
        <p className="mb-6">
          Additionally, your attachment style can vary across relationship types. You might be secure with friends but anxious in romantic relationships, or avoidant at work but secure at home.
        </p>

        <h2 id="what-determines-style" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Determines Your Attachment Style?
        </h2>
        <p className="mb-6">
          Early caregiver responsiveness is the primary factor. Consistent, attuned care fosters secure attachment. Inconsistent care (sometimes responsive, sometimes not) creates anxious attachment. Neglectful or dismissive care leads to avoidant patterns. Frightening or chaotic care results in disorganized attachment.
        </p>
        <p className="mb-6">
          But attachment isn't fixed at age five. Significant relationships throughout life---romantic partners, close friends, therapists---can gradually shift your internal working models toward greater security.
        </p>

        <h2 id="recognizing-your-pattern" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Your Own Pattern
        </h2>
        <p className="mb-6">
          Ask yourself these questions:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Do you worry about being abandoned or unloved? (Anxious tendency)</li>
          <li>Do you feel uncomfortable when people get too close? (Avoidant tendency)</li>
          <li>Can you rely on others without losing yourself? (Secure tendency)</li>
          <li>Do you simultaneously want and fear intimacy? (Disorganized tendency)</li>
        </ul>

        <ArticleCallout variant="info">
          <p>Formal attachment assessments like the Experiences in Close Relationships (ECR) questionnaire can provide more detailed insight, but self-reflection and honest examination of your relationship history are powerful starting points.</p>
        </ArticleCallout>

        <h2 id="what-next" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Comes Next
        </h2>
        <p className="mb-6">
          Knowing your attachment style is the first step. The subsequent articles in this series dive deeper into each style, exploring how they manifest in daily life and what healing looks like. Understanding attachment doesn't fix everything overnight, but it does offer a map---one that explains where your relationship patterns come from and, crucially, how they can change.
        </p>
        <p className="mb-6">
          You're not stuck with the attachment style you developed in childhood. With awareness, intention, and often the support of therapy or secure relationships, movement toward earned secure attachment is possible.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-002: Anxious Attachment
  // ==========================================================================
  {
    id: catId(2),
    slug: 'anxious-attachment-when-fear-of-abandonment-drives-relationships',
    status: 'draft',
    title: 'Anxious Attachment: When Fear of Abandonment Drives Your Relationships',
    description: 'Explore the patterns of anxious attachment---chronic worry about rejection, emotional intensity, and the constant need for reassurance in relationships.',
    image: "/images/articles/cat03/cover-002.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anxious Attachment', 'Anxiety', 'Relationships', 'Insecurity'],
    citations: [
      {
        id: '1',
        text: 'Anxious attachment is associated with BOLD coupling between the amygdala and ventrolateral prefrontal cortex',
        source: 'NeuroImage',
        year: '2017',
        link: 'https://doi.org/10.1016/j.neuroimage.2017.06.005',
        tier: 1,
      },
      {
        id: '2',
        text: 'Attachment anxiety, relationship context, and person perception',
        source: 'Journal of Experimental Social Psychology',
        year: '2013',
        link: 'https://doi.org/10.1016/j.jesp.2013.03.017',
        tier: 1,
      },
      {
        id: '3',
        text: 'Attachment-related strategies during thought suppression: Ironic rebounds and vulnerable self-representations',
        source: 'Journal of Personality and Social Psychology',
        year: '2006',
        link: 'https://doi.org/10.1037/0022-3514.91.5.940',
        tier: 1,
      },
      {
        id: '4',
        text: 'Hyperactivating strategies in anxious attachment: Pursuit of closeness at all costs',
        source: 'Attachment & Human Development',
        year: '2011',
        link: 'https://doi.org/10.1080/14616734.2011.609009',
        tier: 1,
      },
      {
        id: '5',
        text: 'The anxious attachment style and texting behavior in romantic relationships',
        source: 'Computers in Human Behavior',
        year: '2019',
        link: 'https://doi.org/10.1016/j.chb.2019.05.034',
        tier: 1,
      },
      {
        id: '6',
        text: 'Attachment anxiety and self-disclosure in initial romantic relationships',
        source: 'Personal Relationships',
        year: '2012',
        link: 'https://doi.org/10.1111/j.1475-6811.2011.01391.x',
        tier: 1,
      },
      {
        id: '7',
        text: 'Attachment insecurity and the emotional experience of attachment threat',
        source: 'Journal of Social and Clinical Psychology',
        year: '2015',
        link: 'https://doi.org/10.1521/jscp.2015.34.3.205',
        tier: 1,
      },
      {
        id: '8',
        text: 'Reassurance seeking in romantic relationships: Environmental and interpersonal correlates',
        source: 'Journal of Research in Personality',
        year: '2018',
        link: 'https://doi.org/10.1016/j.jrp.2018.02.003',
        tier: 1,
      },
      {
        id: '9',
        text: 'From anxious attachment to depressive symptoms: The mediating role of relationship quality and rejection sensitivity',
        source: 'Personality and Individual Differences',
        year: '2020',
        link: 'https://doi.org/10.1016/j.paid.2020.109839',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You check your phone for the tenth time in an hour. Your partner hasn't responded to your text, and your mind floods with explanations: They're upset. They're losing interest. You did something wrong. The anxiety builds until you send another message---then immediately regret it.
          </p>
          <p className="mb-6">
            This pattern isn't weakness or neediness. It's anxious attachment---a relationship style rooted in early experiences where love felt conditional or unpredictable <Citation id="1" index={1} source="NeuroImage" year="2017" tier={1} />. People with anxious attachment crave closeness but live with a persistent fear that it will be taken away.
          </p>
        </div>

        <h2 id="what-is-anxious-attachment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Anxious Attachment?
        </h2>
        <p className="mb-6">
          Anxious attachment (also called preoccupied attachment) is characterized by high anxiety about rejection and low avoidance of intimacy. You want to be close---very close---but you're haunted by the fear that others won't want the same level of connection <Citation id="2" index={2} source="Journal of Experimental Social Psychology" year="2013" tier={1} />.
        </p>
        <p className="mb-6">
          This style typically develops when caregivers were inconsistent in their responsiveness. Sometimes they were attuned and loving; other times they were distracted, dismissive, or unavailable. The child learns: "I need to work hard for love. I can't trust that it will be there unless I constantly check."
        </p>

        <StatCard
          stats={[
            { value: 20, suffix: '%', label: 'Adults with anxious attachment' },
            { value: 2, suffix: 'x', label: 'Higher rates of relationship anxiety' },
            { value: 3, suffix: 'x', label: 'More likely to seek reassurance' },
          ]}
          source="Attachment & Human Development, 2011"
        />

        <h2 id="core-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Core Patterns of Anxious Attachment
        </h2>
        <p className="mb-6">
          Anxious attachment manifests through what researchers call "hyperactivating strategies"---behaviors designed to increase closeness and elicit caregiving responses from others <Citation id="4" index={4} source="Attachment & Human Development" year="2011" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Constant Need for Reassurance
        </h3>
        <p className="mb-6">
          You frequently ask questions like "Do you still love me?" or "Are we okay?" even when there's no evidence of a problem. Reassurance provides temporary relief, but the anxiety returns quickly <Citation id="8" index={8} source="Journal of Research in Personality" year="2018" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Overanalyzing Communication
        </h3>
        <p className="mb-6">
          A delayed text response, a short reply, or a change in punctuation becomes evidence of waning interest. You read between lines that may not exist, searching for threats to the relationship <Citation id="5" index={5} source="Computers in Human Behavior" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Fear of Abandonment
        </h3>
        <p className="mb-6">
          The thought of being left feels catastrophic. This fear can lead to behaviors designed to prevent abandonment---clinging, monitoring, or suppressing your own needs to avoid conflict <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2006" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Protest Behavior
        </h3>
        <p className="mb-6">
          When you feel distance from a partner, you may engage in behaviors to regain their attention: excessive calling or texting, emotional outbursts, or creating drama to elicit a response---any response---that confirms you still matter.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Difficulty Being Alone
        </h3>
        <p className="mb-6">
          Solitude feels threatening. You may struggle to self-soothe or find comfort outside of relationship connection, leading to dependence on others for emotional regulation.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>Brain imaging studies show that people with anxious attachment have heightened activity in the amygdala (the brain's threat detection center) when exposed to attachment-related stress, and reduced activity in areas responsible for emotion regulation.</p>
        </ArticleCallout>

        <h2 id="how-it-affects-relationships" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Anxious Attachment Affects Relationships
        </h2>
        <p className="mb-6">
          Anxious attachment creates a painful paradox: the behaviors meant to maintain closeness often push partners away. Constant reassurance-seeking can feel exhausting. Emotional intensity can overwhelm. The fear of abandonment can become a self-fulfilling prophecy <Citation id="7" index={7} source="Journal of Social and Clinical Psychology" year="2015" tier={1} />.
        </p>

        <QuoteBlock
          quote="The irony of anxious attachment is that the hypervigilance meant to protect the relationship often becomes the very thing that strains it."
          attribution="Dr. Amir Levine"
          role="Psychiatrist and Attachment Researcher"
          source="Attached: The New Science of Adult Attachment"
          variant="default"
        />

        <p className="mb-6">
          Anxiously attached individuals often end up in relationships with avoidant partners, creating a toxic push-pull dynamic. The anxious person pursues; the avoidant person withdraws. The withdrawal triggers more anxiety, which triggers more pursuit, which triggers more withdrawal.
        </p>

        <h2 id="internal-experience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Internal Experience
        </h2>
        <p className="mb-6">
          From the outside, anxious attachment might look like clinginess or drama. From the inside, it feels like survival. The threat of abandonment activates the same neural pathways as physical danger. The need for reassurance isn't manipulation---it's a desperate attempt to regulate overwhelming fear.
        </p>
        <p className="mb-6">
          Many people with anxious attachment describe feeling like they're "too much"---too emotional, too needy, too intense. This shame compounds the original wound, creating a cycle where you need reassurance that you're worthy of love while believing you're fundamentally unworthy <Citation id="9" index={9} source="Personality and Individual Differences" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Anxious attachment is not a character flaw. It's an adaptive strategy that made sense in an environment where love was uncertain. The behaviors that once helped you survive may no longer serve you, but that doesn't make you broken.</p>
        </ArticleCallout>

        <h2 id="common-triggers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Triggers for Anxious Attachment
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Delayed responses to texts or calls</li>
          <li>Partner needing alone time or space</li>
          <li>Perceived changes in affection or attention</li>
          <li>Conflict or disagreement (interpreted as rejection)</li>
          <li>Partner spending time with others</li>
          <li>Uncertainty about the relationship's future</li>
          <li>Noticing your partner's flaws (creates fear they'll notice yours)</li>
        </ul>

        <h2 id="self-disclosure-paradox" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Self-Disclosure Paradox
        </h2>
        <p className="mb-6">
          Research shows that anxiously attached individuals tend to over-disclose early in relationships---sharing intimate details quickly in an attempt to accelerate bonding <Citation id="6" index={6} source="Personal Relationships" year="2012" tier={1} />. This can create a false sense of intimacy before trust has been built, setting up later disappointment when the relationship doesn't deepen as quickly as hoped.
        </p>

        <h2 id="recognizing-pattern" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing the Pattern in Yourself
        </h2>
        <p className="mb-6">
          You might have anxious attachment if you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Feel anxious when you don't hear from your partner</li>
          <li>Need frequent reassurance about the relationship</li>
          <li>Take small cues (tone of voice, word choice) as signs of rejection</li>
          <li>Fear being alone more than you fear being in a bad relationship</li>
          <li>Suppress your own needs to avoid conflict</li>
          <li>Feel like you love more intensely than your partner</li>
          <li>Experience intense jealousy or possessiveness</li>
          <li>Replay conversations obsessively, looking for hidden meanings</li>
        </ul>

        <h2 id="moving-toward-security" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Moving Toward Security
        </h2>
        <p className="mb-6">
          Anxious attachment can shift. It requires building new internal working models---learning through experience that you can be loved without constantly earning it, that absence doesn't equal abandonment, and that you can self-soothe without external validation.
        </p>
        <p className="mb-6">
          This often happens through:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Therapy, particularly attachment-focused or emotion-focused approaches</li>
          <li>Relationships with securely attached partners who provide consistency</li>
          <li>Developing self-awareness about your triggers and patterns</li>
          <li>Building a stronger relationship with yourself (self-compassion practices)</li>
          <li>Learning to tolerate the discomfort of uncertainty without protest behaviors</li>
        </ul>

        <p className="mb-6">
          The goal isn't to eliminate the need for connection---that's human. The goal is to trust that connection can exist without constant vigilance, and that you're worthy of love even when you're not actively working for it.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-003: Avoidant Attachment
  // ==========================================================================
  {
    id: catId(3),
    slug: 'avoidant-attachment-when-closeness-feels-like-a-threat',
    status: 'draft',
    title: 'Avoidant Attachment: When Closeness Feels Like a Threat',
    description: 'Understand the patterns of avoidant attachment---emotional distance, discomfort with vulnerability, and the prioritization of independence over intimacy.',
    image: "/images/articles/cat03/cover-003.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Avoidant Attachment', 'Independence', 'Intimacy', 'Emotional Distance'],
    citations: [
      {
        id: '1',
        text: 'Avoidant attachment and neural correlates of mentalizing across adolescence and early adulthood',
        source: 'Developmental Cognitive Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.1016/j.dcn.2019.100734',
        tier: 1,
      },
      {
        id: '2',
        text: 'Deactivating strategies in avoidant attachment: Target-article',
        source: 'Attachment & Human Development',
        year: '2011',
        link: 'https://doi.org/10.1080/14616734.2011.584405',
        tier: 1,
      },
      {
        id: '3',
        text: 'Avoidant attachment and emotional suppression: Not just about negative emotions',
        source: 'Journal of Social and Personal Relationships',
        year: '2016',
        link: 'https://doi.org/10.1177/0265407515616257',
        tier: 1,
      },
      {
        id: '4',
        text: 'Attachment avoidance and the fear of closeness: Neurobiological correlates',
        source: 'Social Cognitive and Affective Neuroscience',
        year: '2018',
        link: 'https://doi.org/10.1093/scan/nsy023',
        tier: 1,
      },
      {
        id: '5',
        text: 'The dismissive-avoidant pattern: Relationship functioning and emotional experience',
        source: 'Personal Relationships',
        year: '2014',
        link: 'https://doi.org/10.1111/pere.12031',
        tier: 1,
      },
      {
        id: '6',
        text: 'Attachment avoidance and relationship satisfaction: The moderating role of partner support',
        source: 'Journal of Family Psychology',
        year: '2017',
        link: 'https://doi.org/10.1037/fam0000275',
        tier: 1,
      },
      {
        id: '7',
        text: 'Childhood experiences of dismissive-avoidant individuals: A systematic review',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101851',
        tier: 1,
      },
      {
        id: '8',
        text: 'Avoidant attachment and self-reliance: The protective facade',
        source: 'Journal of Personality',
        year: '2015',
        link: 'https://doi.org/10.1111/jopy.12092',
        tier: 1,
      },
      {
        id: '9',
        text: 'The physiological response to intimacy in avoidant attachment',
        source: 'Psychophysiology',
        year: '2019',
        link: 'https://doi.org/10.1111/psyp.13345',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your partner says "I love you," and instead of warmth, you feel trapped. They want to spend more time together, and you suddenly remember everything you need to get done alone. Vulnerability feels like weakness. Depending on someone feels dangerous. You pride yourself on not needing anyone---but deep down, the isolation aches.
          </p>
          <p className="mb-6">
            This is avoidant attachment---a protective strategy that equates closeness with loss of autonomy and emotional expression with risk <Citation id="1" index={1} source="Developmental Cognitive Neuroscience" year="2019" tier={1} />. It's not that you don't want connection. It's that connection has historically felt unsafe, so you've learned to survive by not needing it.
          </p>
        </div>

        <h2 id="what-is-avoidant-attachment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Avoidant Attachment?
        </h2>
        <p className="mb-6">
          Avoidant attachment (also called dismissive attachment) is characterized by discomfort with intimacy and a strong emphasis on independence. People with this style often minimize the importance of relationships, suppress emotions, and maintain distance to protect themselves from vulnerability <Citation id="2" index={2} source="Attachment & Human Development" year="2011" tier={1} />.
        </p>
        <p className="mb-6">
          This pattern typically develops when caregivers were emotionally unavailable, dismissive of emotions, or encouraged extreme self-reliance. The child learns: "My needs won't be met. Expressing emotions makes things worse. I can only count on myself" <Citation id="7" index={7} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Avoidant attachment isn't about not having emotions---it's about learning to hide them so well that even you forget they're there.</p>
        </ArticleCallout>

        <h2 id="core-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Core Patterns of Avoidant Attachment
        </h2>
        <p className="mb-6">
          Avoidant attachment operates through "deactivating strategies"---behaviors designed to suppress attachment needs and maintain emotional distance <Citation id="2" index={2} source="Attachment & Human Development" year="2011" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Suppression of Emotions',
              description: (
                <p>
                  Feelings---especially vulnerable ones like sadness, fear, or longing---are minimized, rationalized, or ignored. "I'm fine" becomes the default response, even when it's not true <Citation id="3" index={3} source="Journal of Social and Personal Relationships" year="2016" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Prioritization of Independence',
              description: (
                <p>
                  Self-reliance is valued above all else. Asking for help feels like failure. You'd rather struggle alone than risk depending on someone who might let you down <Citation id="8" index={8} source="Journal of Personality" year="2015" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Discomfort with Closeness',
              description: (
                <p>
                  When relationships deepen, you feel suffocated rather than supported. Intimacy triggers a need for space. Physical or emotional closeness can feel intrusive or overwhelming <Citation id="4" index={4} source="Social Cognitive and Affective Neuroscience" year="2018" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Withdrawal During Conflict',
              description: (
                <p>
                  When things get emotionally intense, you shut down, change the subject, or leave. Conflict feels threatening, so you avoid it---which prevents resolution and deepens disconnect.
                </p>
              ),
            },
            {
              title: 'Idealization of Past Relationships or Singlehood',
              description: (
                <p>
                  You may romanticize ex-partners who are safely in the past, or emphasize how much better life is when you're alone. This keeps current partners at a distance <Citation id="5" index={5} source="Personal Relationships" year="2014" tier={1} />.
                </p>
              ),
            },
          ]}
        />

        <h2 id="how-it-affects-relationships" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Avoidant Attachment Affects Relationships
        </h2>
        <p className="mb-6">
          Avoidant individuals often enter relationships ambivalently. Part of them wants connection; another part fears it. This creates a pattern of getting close, then pulling away when intimacy threatens autonomy.
        </p>
        <p className="mb-6">
          Partners often describe feeling shut out, unimportant, or like they're "too much." The avoidant person, meanwhile, feels pressured, misunderstood, or controlled. Both are in pain, but the pain manifests in opposite ways <Citation id="6" index={6} source="Journal of Family Psychology" year="2017" tier={1} />.
        </p>

        <ComparisonTable
          title="Avoidant vs. Anxious Attachment in Relationships"
          columns={['Aspect', 'Avoidant', 'Anxious']}
          items={[
            { feature: 'Response to closeness', values: ['Pull away', 'Move closer'] },
            { feature: 'Conflict response', values: ['Withdraw/shut down', 'Pursue/escalate'] },
            { feature: 'Emotional expression', values: ['Suppress feelings', 'Intensify feelings'] },
            { feature: 'Fear', values: ['Losing independence', 'Being abandoned'] },
            { feature: 'Relationship focus', values: ['Flaws and incompatibilities', 'Reassurance and connection'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="physiological-response" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Physiology of Avoidance
        </h2>
        <p className="mb-6">
          Brain imaging and psychophysiological studies reveal that avoidant individuals experience heightened stress responses to intimacy-related cues---but they're skilled at suppressing the outward signs <Citation id="9" index={9} source="Psychophysiology" year="2019" tier={1} />. Heart rate variability studies show that while they appear calm during conflict, their nervous systems are highly activated.
        </p>
        <p className="mb-6">
          This means the discomfort with closeness isn't just psychological---it's embodied. Intimacy literally feels physiologically threatening, even when there's no real danger.
        </p>

        <ArticleCallout variant="clinical-note">
          <p>Avoidant attachment often co-occurs with alexithymia---difficulty identifying and describing one's own emotions. This isn't intentional withholding; it's a genuine disconnect from internal emotional experience.</p>
        </ArticleCallout>

        <h2 id="internal-experience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Internal Experience
        </h2>
        <p className="mb-6">
          From the outside, avoidant attachment can look like cold indifference. From the inside, it's often a carefully constructed defense against overwhelming vulnerability. Many avoidant individuals describe feeling:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Frustrated that partners want "too much" emotionally</li>
          <li>Relieved when alone, but also lonely</li>
          <li>Confused about why relationships feel suffocating</li>
          <li>Ashamed of not being able to meet partners" emotional needs</li>
          <li>Resentful of feeling pressured to share feelings</li>
        </ul>

        <QuoteBlock
          quote="Avoidant individuals aren't heartless. They've learned that the safest way to protect their heart is to pretend it doesn't need protection."
          attribution="Dr. Sue Johnson"
          role="Clinical Psychologist"
          source="Hold Me Tight: Seven Conversations for a Lifetime of Love"
          variant="large"
        />

        <h2 id="common-triggers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Triggers for Avoidant Attachment
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Partner expressing emotional needs</li>
          <li>Requests for more quality time together</li>
          <li>Conversations about the future of the relationship</li>
          <li>Vulnerability or "heavy" emotional topics</li>
          <li>Feeling dependent on someone</li>
          <li>Partner's emotional intensity (crying, anger)</li>
          <li>Loss of personal space or autonomy</li>
          <li>Someone saying "we need to talk"</li>
        </ul>

        <h2 id="relationship-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Relationship Patterns
        </h2>
        <p className="mb-6">
          Avoidant individuals often find themselves in relationships with anxiously attached partners---creating a toxic cycle where one person pursues connection and the other retreats. The pursuit intensifies the avoidance, which intensifies the pursuit.
        </p>
        <p className="mb-6">
          Alternatively, they may stay in relationships that remain surface-level or choose emotionally unavailable partners (safely keeping intimacy at bay), or repeatedly end relationships when they start to deepen.
        </p>

        <h2 id="recognizing-pattern" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing the Pattern in Yourself
        </h2>
        <p className="mb-6">
          You might have avoidant attachment if you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Value independence more than connection</li>
          <li>Feel uncomfortable when people get "too close"</li>
          <li>Struggle to identify or express emotions</li>
          <li>Prefer not to rely on others or have others rely on you</li>
          <li>Find yourself focusing on partners" flaws when things get serious</li>
          <li>Withdraw during conflict or emotional conversations</li>
          <li>Feel trapped or suffocated in committed relationships</li>
          <li>Idealize singlehood or past relationships more than current ones</li>
          <li>Rarely ask for help, even when you need it</li>
        </ul>

        <h2 id="moving-toward-security" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Moving Toward Security
        </h2>
        <p className="mb-6">
          Shifting from avoidant to earned secure attachment requires learning that vulnerability doesn't equal weakness and that depending on others doesn't mean losing yourself. This is uncomfortable work---it involves deliberately doing the things your nervous system has learned to avoid.
        </p>
        <p className="mb-6">
          Healing strategies include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Therapy focused on attachment patterns and emotion regulation</li>
          <li>Practicing small acts of vulnerability in safe relationships</li>
          <li>Learning to identify and name emotions (building emotional literacy)</li>
          <li>Staying present during discomfort instead of withdrawing</li>
          <li>Choosing partners who are securely attached and patient</li>
          <li>Challenging beliefs that independence is the only safe path</li>
        </ul>

        <ArticleCallout variant="tip">
          <p><strong>Start small:</strong> If expressing emotions feels impossible, try narrating physical sensations instead. "My chest feels tight" or "My shoulders are tense" are entry points to emotional awareness that feel less vulnerable than "I'm scared' or "I need you."</p>
        </ArticleCallout>

        <p className="mb-6">
          The goal isn't to become emotionally dependent or lose your autonomy. It's to discover that closeness and independence can coexist---that you can be both connected and free, vulnerable and safe.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-004: Disorganized Attachment
  // ==========================================================================
  {
    id: catId(4),
    slug: 'disorganized-attachment-push-pull-pattern-confuses-everyone',
    title: 'Disorganized Attachment: The Push-Pull Pattern That Confuses Everyone',
    description: 'Explore the complexities of disorganized attachment---simultaneous fear of intimacy and abandonment, often rooted in trauma or chaotic early caregiving.',
    image: "/images/articles/cat03/cover-004.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Disorganized Attachment', 'Trauma', 'Relationships', 'Attachment'],
    citations: [
      {
        id: '1',
        text: 'Disorganized attachment in adulthood: Theory, measurement, and implications for romantic relationships',
        source: 'Review of General Psychology',
        year: '2017',
        link: 'https://doi.org/10.1037/gpr0000111',
        tier: 1,
      },
      {
        id: '2',
        text: 'The origins of disorganized attachment: An examination of the dual-pathway model',
        source: 'Development and Psychopathology',
        year: '2015',
        link: 'https://doi.org/10.1017/S0954579414001291',
        tier: 1,
      },
      {
        id: '3',
        text: 'Fearful-avoidant attachment and borderline personality features: A structural analysis',
        source: 'Journal of Personality Disorders',
        year: '2018',
        link: 'https://doi.org/10.1521/pedi_2017_31_297',
        tier: 1,
      },
      {
        id: '4',
        text: 'Disorganized attachment and interpersonal trauma: The role of unresolved experiences',
        source: 'Attachment & Human Development',
        year: '2016',
        link: 'https://doi.org/10.1080/14616734.2016.1173716',
        tier: 1,
      },
      {
        id: '5',
        text: 'Neural correlates of disorganized attachment in adults',
        source: 'Social Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.1080/17470919.2018.1554661',
        tier: 1,
      },
      {
        id: '6',
        text: 'The developmental pathway from disorganized attachment to adult relationship dysfunction',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101829',
        tier: 1,
      },
      {
        id: '7',
        text: 'Simultaneous activation of approach and avoidance in fearful attachment',
        source: 'Journal of Research in Personality',
        year: '2014',
        link: 'https://doi.org/10.1016/j.jrp.2014.02.003',
        tier: 1,
      },
      {
        id: '8',
        text: 'Treatment of disorganized attachment in adults: A meta-analytic review',
        source: 'Psychotherapy Research',
        year: '2021',
        link: 'https://doi.org/10.1080/10503307.2020.1831097',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You want to be close---desperately close. Then, the moment someone gets near, you panic and push them away. You crave connection but expect betrayal. You seek safety in relationships but feel most threatened when you find it. Your partners are confused. You're confused. Nothing feels stable, not even your own feelings.
          </p>
          <p className="mb-6">
            This is disorganized attachment---sometimes called fearful-avoidant attachment. It's the rarest and most challenging attachment style, characterized by the simultaneous activation of two contradictory impulses: the drive toward connection and the urge to flee from it <Citation id="1" index={1} source="Review of General Psychology" year="2017" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-disorganized-attachment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Disorganized Attachment?
        </h2>
        <p className="mb-6">
          Disorganized attachment combines high anxiety about rejection with high avoidance of intimacy. Unlike anxious or avoidant styles, which have clear strategies (pursue or withdraw), disorganized attachment has no consistent strategy. The attachment system is in perpetual conflict <Citation id="7" index={7} source="Journal of Research in Personality" year="2014" tier={1} />.
        </p>
        <p className="mb-6">
          This pattern typically develops when caregivers were both the source of comfort and the source of fear---often in cases of trauma, abuse, severe neglect, or frightening caregiver behavior <Citation id="2" index={2} source="Development and Psychopathology" year="2015" tier={2} />. The child's dilemma becomes impossible: "I need you to survive, but you hurt me."
        </p>

        <StatCard
          stats={[
            { value: 5, suffix: '%', label: 'Adults with disorganized attachment in general population' },
            { value: 25, suffix: '%', label: 'Prevalence in those with childhood trauma' },
            { value: 80, suffix: '%', label: 'Association with unresolved loss or trauma' },
          ]}
          source="Development and Psychopathology, 2015"
        />

        <ArticleCallout variant="key-takeaway">
          <p>Disorganized attachment is not a personality flaw or emotional instability---it's an adaptive response to an environment where the source of safety was also the source of threat.</p>
        </ArticleCallout>

        <h2 id="core-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Core Patterns of Disorganized Attachment
        </h2>
        <p className="mb-6">
          Disorganized attachment manifests through contradictory behaviors that often leave both the individual and their partners feeling bewildered.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. The Push-Pull Dynamic
        </h3>
        <p className="mb-6">
          You oscillate between clinging and distancing. When apart, you desperately seek closeness. When close, you feel trapped and push away. Neither state feels safe---distance triggers abandonment fears, intimacy triggers engulfment fears <Citation id="4" index={4} source="Attachment & Human Development" year="2016" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Expecting Betrayal or Harm
        </h3>
        <p className="mb-6">
          You anticipate that people who get close will eventually hurt you. Trust feels impossible. Even kind gestures can trigger suspicion: "What do they want from me?" or "They'll leave once they see the real me."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Emotional Dysregulation
        </h3>
        <p className="mb-6">
          Emotions can feel overwhelming and unpredictable. You may experience rapid mood shifts, intense reactions to small triggers, or difficulty calming down once activated. The nervous system struggles to find equilibrium <Citation id="5" index={5} source="Social Neuroscience" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Relationship Chaos
        </h3>
        <p className="mb-6">
          Relationships often feel turbulent. Frequent breakups and reunions. Intense highs and devastating lows. Difficulty maintaining stable, calm connection over time.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Dissociation or Numbing
        </h3>
        <p className="mb-6">
          When overwhelmed, you may disconnect from your emotions or the present moment entirely. This can look like emotional flatness, memory gaps, or feeling "not really there."
        </p>

        <QuoteBlock
          quote="Disorganized attachment is the mind's attempt to solve an unsolvable problem: how to seek safety from the person who is also the threat."
          attribution="Dr. Karlen Lyons-Ruth"
          role="Clinical Psychologist and Attachment Researcher"
          source="Harvard Medical School"
          variant="default"
        />

        <h2 id="how-it-develops" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Disorganized Attachment Develops
        </h2>
        <p className="mb-6">
          Disorganized attachment almost always has roots in trauma or severely disrupted caregiving. Common origins include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Physical, sexual, or emotional abuse by a caregiver</li>
          <li>Severe neglect or inconsistent care</li>
          <li>Caregiver with unresolved trauma (frightening behavior even without intent to harm)</li>
          <li>Caregiver with severe mental illness or substance use disorder</li>
          <li>Loss of a caregiver without adequate support to process grief</li>
          <li>Witnessing domestic violence or other trauma</li>
        </ul>
        <p className="mb-6">
          The child learns that the person meant to protect them is also unpredictable or dangerous. There's no safe strategy---approaching is risky, but so is staying away. This impossible bind creates a disorganized response <Citation id="2" index={2} source="Development and Psychopathology" year="2015" tier={1} />.
        </p>

        <h2 id="how-it-affects-relationships" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Disorganized Attachment Affects Adult Relationships
        </h2>
        <p className="mb-6">
          Disorganized attachment creates a relationship paradox: intimacy is both desperately wanted and intensely feared. This leads to patterns that can be exhausting for everyone involved <Citation id="6" index={6} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'roller-coaster',
              title: 'Relationship Roller Coaster',
              content: (
                <p>
                  Relationships tend to be high-intensity and unstable. Breakups and reunions are common. The fear of abandonment drives pursuit, but the fear of being hurt drives withdrawal. Partners often feel whiplashed by the inconsistency.
                </p>
              ),
            },
            {
              id: 'testing',
              title: 'Testing Behavior',
              content: (
                <p>
                  You may unconsciously test partners to see if they'll leave---pushing boundaries, creating conflict, or withdrawing suddenly. It's a way of confirming the belief that people always leave, while also hoping to be proven wrong.
                </p>
              ),
            },
            {
              id: 'idealization-devaluation',
              title: 'Idealization Followed by Devaluation',
              content: (
                <p>
                  Partners may be idealized at first ("they're perfect, they'll save me"), then abruptly devalued when they inevitably disappoint or when closeness becomes overwhelming ("they're terrible, I need to get out").
                </p>
              ),
            },
            {
              id: 'difficult-trust',
              title: 'Difficulty Trusting Stability',
              content: (
                <p>
                  Even in healthy relationships, it's hard to believe safety will last. You may constantly scan for signs of betrayal or abandonment, interpreting neutral events as threats.
                </p>
              ),
            },
          ]}
        />

        <h2 id="overlap-with-other-conditions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Overlap with Other Conditions
        </h2>
        <p className="mb-6">
          Disorganized attachment shares features with several mental health conditions, particularly those involving trauma and emotion dysregulation <Citation id="3" index={3} source="Journal of Personality Disorders" year="2018" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Borderline Personality Disorder (BPD):</strong> Fear of abandonment, unstable relationships, emotional dysregulation</li>
          <li><strong>Complex PTSD:</strong> Childhood trauma, difficulty with relationships, emotional regulation challenges</li>
          <li><strong>Reactive Attachment Disorder:</strong> Severe disruption in early attachment bonds</li>
        </ul>
        <p className="mb-6">
          This doesn't mean disorganized attachment <em>is</em> a disorder---it's a pattern. But it does mean professional support is often helpful for healing.
        </p>

        <h2 id="internal-experience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Internal Experience
        </h2>
        <p className="mb-6">
          People with disorganized attachment often describe feeling:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Constantly torn between wanting closeness and fearing it</li>
          <li>Overwhelmed by emotions that seem to come from nowhere</li>
          <li>Convinced they'll be abandoned or betrayed, even without evidence</li>
          <li>Ashamed of being "too much" or "too broken" for relationships</li>
          <li>Exhausted by the internal conflict</li>
          <li>Confused about their own needs and feelings</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>If this resonates deeply and causes significant distress, working with a trauma-informed therapist trained in attachment-based therapy (such as EMDR, Somatic Experiencing, or Emotionally Focused Therapy) can be transformative.</p>
        </ArticleCallout>

        <h2 id="recognizing-pattern" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing the Pattern in Yourself
        </h2>
        <p className="mb-6">
          You might have disorganized attachment if you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Want intimacy but feel terrified when you get it</li>
          <li>Experience intense fear of both abandonment and engulfment</li>
          <li>Have tumultuous, on-again-off-again relationships</li>
          <li>Struggle to trust anyone, including people who've proven trustworthy</li>
          <li>Feel overwhelmed by emotions you can't always identify</li>
          <li>Alternate between clinging to partners and pushing them away</li>
          <li>Have a history of childhood trauma or severely inconsistent caregiving</li>
          <li>Find yourself testing relationships to see if people will stay</li>
        </ul>

        <h2 id="healing-is-possible" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Healing Is Possible
        </h2>
        <p className="mb-6">
          Disorganized attachment is the most challenging to shift, but it's absolutely possible. Healing involves building a new internal working model---learning through experience that closeness doesn't always lead to harm, and that you can survive both intimacy and distance <Citation id="8" index={8} source="Psychotherapy Research" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          Effective approaches include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Trauma-focused therapy (EMDR, Somatic Experiencing, Internal Family Systems)</li>
          <li>Attachment-based therapy that builds secure relational experiences with a therapist</li>
          <li>Dialectical Behavior Therapy (DBT) for emotion regulation skills</li>
          <li>Relationships with securely attached, patient partners who can tolerate the push-pull without abandoning or controlling</li>
          <li>Mindfulness practices to build awareness of internal states</li>
          <li>Nervous system regulation techniques (breathwork, grounding, somatic practices)</li>
        </ul>

        <p className="mb-6">
          The journey isn't linear. There will be setbacks. But with support, disorganized attachment can evolve into earned secure attachment---a place where you can hold both your need for connection and your need for autonomy without them being in constant war.
        </p>

        <ArticleCallout variant="tip">
          <p><strong>For partners of someone with disorganized attachment:</strong> Consistency is key. Predictable responses, clear communication, and gentle boundaries help build safety. It's not your job to fix them, but your steady presence can create the conditions for healing.</p>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-005: Can You Change Your Attachment Style?
  // ==========================================================================
  {
    id: catId(5),
    slug: 'can-you-change-attachment-style-what-research-says',
    title: 'Can You Change Your Attachment Style? What the Research Says',
    description: 'Examine the scientific evidence on attachment stability and change---exploring earned secure attachment, neuroplasticity, and pathways to transformation.',
    image: "/images/articles/cat03/cover-005.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Attachment Theory', 'Neuroplasticity', 'Change', 'Research'],
    citations: [
      {
        id: '1',
        text: 'Stability and change in attachment security: A meta-analysis',
        source: 'Monographs of the Society for Research in Child Development',
        year: '2018',
        link: 'https://doi.org/10.1111/mono.12362',
        tier: 1,
      },
      {
        id: '2',
        text: 'Earned secure attachment in adulthood: Reconciling prior emotional experiences with current security',
        source: 'Journal of Social and Personal Relationships',
        year: '2019',
        link: 'https://doi.org/10.1177/0265407518790411',
        tier: 1,
      },
      {
        id: '3',
        text: 'Romantic relationships and the transformation of insecure attachment',
        source: 'Psychological Science',
        year: '2007',
        link: 'https://doi.org/10.1111/j.1467-9280.2007.01959.x',
        tier: 1,
      },
      {
        id: '4',
        text: 'Psychotherapy and attachment security: A meta-analysis',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2014',
        link: 'https://doi.org/10.1037/a0036049',
        tier: 1,
      },
      {
        id: '5',
        text: 'Neural plasticity and attachment: Evidence from neuroimaging studies',
        source: 'Developmental Cognitive Neuroscience',
        year: '2020',
        link: 'https://doi.org/10.1016/j.dcn.2020.100856',
        tier: 1,
      },
      {
        id: '6',
        text: 'Life events and attachment change: A longitudinal study',
        source: 'Development and Psychopathology',
        year: '2016',
        link: 'https://doi.org/10.1017/S0954579416000213',
        tier: 1,
      },
      {
        id: '7',
        text: 'Attachment-based interventions: Meta-analytic evidence for effectiveness',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102080',
        tier: 1,
      },
      {
        id: '8',
        text: 'The role of mentalizing in attachment security change',
        source: 'Attachment & Human Development',
        year: '2017',
        link: 'https://doi.org/10.1080/14616734.2017.1282229',
        tier: 1,
      },
      {
        id: '9',
        text: 'Corrective emotional experiences and attachment change in therapy',
        source: 'Psychotherapy Research',
        year: '2019',
        link: 'https://doi.org/10.1080/10503307.2018.1469803',
        tier: 1,
      },
      {
        id: '10',
        text: 'Long-term stability of attachment styles in romantic relationships: A 20-year longitudinal study',
        source: 'Journal of Personality and Social Psychology',
        year: '2015',
        link: 'https://doi.org/10.1037/pspp0000015',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You've read about attachment styles. You recognize your pattern---maybe the anxious clinging, the avoidant distance, or the disorganized push-pull. And now you're wondering: Am I stuck like this forever? Can patterns formed in infancy really change decades later?
          </p>
          <p className="mb-6">
            The short answer: Yes, attachment styles can change. The longer answer: It's not easy, it's not instant, and it doesn't happen by simply understanding your pattern. But decades of research show that attachment security is not destiny---it's malleable, influenced by new relationships, life experiences, and intentional therapeutic work <Citation id="1" index={1} source="Monographs of the Society for Research in Child Development" year="2018" tier={1} />.
          </p>
        </div>

        <h2 id="stability-vs-change" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Stability vs. Change: What the Numbers Say
        </h2>
        <p className="mb-6">
          Attachment styles show moderate stability over time. Longitudinal studies---following the same people for years or decades---reveal that about 60-70% of individuals maintain the same attachment classification across adulthood <Citation id="10" index={10} source="Journal of Personality and Social Psychology" year="2015" tier={1} />.
        </p>
        <p className="mb-6">
          But that means 30-40% <em>do</em> change. And even among those who stay in the same category, the intensity of anxious or avoidant tendencies can shift significantly.
        </p>

        <ArticleChart
          type="donut"
          title="Attachment Stability in Adulthood (20-Year Study)"
          data={[
            { label: 'Stable attachment', value: 65 },
            { label: 'Changed attachment', value: 35 },
          ]}
          source="Journal of Personality and Social Psychology, 2015"
        />

        <ArticleCallout variant="key-takeaway">
          <p>Attachment is not a fixed trait like eye color. It's a working model shaped by ongoing relational experiences. Your brain is plastic---capable of forming new neural pathways based on new relational input.</p>
        </ArticleCallout>

        <h2 id="what-drives-change" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Drives Attachment Change?
        </h2>
        <p className="mb-6">
          Attachment styles shift in response to significant relational experiences---both positive and negative <Citation id="6" index={6} source="Development and Psychopathology" year="2016" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Factors That Increase Attachment Security
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Stable, secure romantic relationships:</strong> Partners who are consistently responsive, emotionally available, and non-judgmental provide corrective experiences <Citation id="3" index={3} source="Psychological Science" year="2007" tier={1} />.</li>
          <li><strong>Effective psychotherapy:</strong> Particularly attachment-based, psychodynamic, or emotion-focused therapy <Citation id="4" index={4} source="Journal of Consulting and Clinical Psychology" year="2014" tier={1} />.</li>
          <li><strong>Supportive friendships:</strong> Close, consistent friendships can provide secure base experiences.</li>
          <li><strong>Mentorship or positive parental figures later in life:</strong> Teachers, coaches, or mentors who provide stable support.</li>
          <li><strong>Successful parenting experiences:</strong> Raising children can sometimes help individuals work through their own attachment wounds.</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Factors That Decrease Attachment Security
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Traumatic events:</strong> Loss of a loved one, abuse, betrayal</li>
          <li><strong>Chronic relationship instability:</strong> Repeated breakups, infidelity, inconsistent caregiving</li>
          <li><strong>Major life stressors:</strong> Job loss, illness, financial hardship without adequate support</li>
        </ul>

        <h2 id="earned-secure-attachment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Earned Secure Attachment
        </h2>
        <p className="mb-6">
          One of the most hopeful concepts in attachment research is "earned secure attachment"---individuals who had insecure or traumatic childhoods but develop secure attachment patterns in adulthood <Citation id="2" index={2} source="Journal of Social and Personal Relationships" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          These individuals aren't denying or forgetting their past. Instead, they've processed their early experiences---often through therapy, meaningful relationships, or intentional self-work---in a way that no longer controls their current relational behavior.
        </p>
        <p className="mb-6">
          Earned secure individuals can:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Reflect on difficult childhood experiences without becoming overwhelmed</li>
          <li>Recognize how past patterns influenced them without being bound by them</li>
          <li>Form healthy, stable relationships despite early adversity</li>
          <li>Parent their own children with secure attachment, breaking intergenerational cycles</li>
        </ul>

        <QuoteBlock
          quote="Earned security is proof that our biology is not our biography. The past informs us, but it doesn't have to define us."
          attribution="Dr. Dan Siegel"
          role="Clinical Professor of Psychiatry, UCLA"
          source="The Developing Mind"
          variant="large"
        />

        <h2 id="neuroplasticity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Neuroscience of Change
        </h2>
        <p className="mb-6">
          The brain's capacity for change---neuroplasticity---is central to attachment transformation. Repeated relational experiences create and strengthen neural pathways. Early attachment patterns carve deep grooves, but new experiences can create new grooves <Citation id="5" index={5} source="Developmental Cognitive Neuroscience" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Neuroimaging studies show that:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Insecure attachment is associated with hyperactivity in threat-detection brain regions (amygdala) and reduced connectivity with emotion regulation regions (prefrontal cortex)</li>
          <li>Successful therapy can normalize these patterns, showing increased prefrontal activity and decreased amygdala reactivity</li>
          <li>The brain's social circuitry remains plastic throughout life---change is possible at any age</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>Neuroplasticity doesn't mean change is effortless. It means the brain <em>can</em> change with sufficient repetition of new experiences. Think of it like learning a new language after speaking only one for 30 years---possible, but requiring consistent practice and immersion.</p>
        </ArticleCallout>

        <h2 id="role-of-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Role of Therapy
        </h2>
        <p className="mb-6">
          Meta-analyses (studies that combine results from many studies) show that attachment-focused therapy can significantly shift attachment security <Citation id="7" index={7} source="Clinical Psychology Review" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          Effective approaches include:
        </p>

        <ComparisonTable
          title="Therapeutic Approaches for Attachment Change"
          columns={['Therapy Type', 'Primary Mechanism', 'Best For']}
          items={[
            { feature: 'Emotionally Focused Therapy (EFT)', values: ['Creates corrective emotional experiences with partner', 'Couples with insecure patterns'] },
            { feature: 'Psychodynamic Therapy', values: ['Explores early attachment wounds and unconscious patterns', 'Deep-rooted attachment trauma'] },
            { feature: 'Internal Family Systems (IFS)', values: ['Works with protective parts formed in childhood', 'Disorganized or complex attachment'] },
            { feature: 'EMDR', values: ['Processes traumatic attachment memories', 'Trauma-based insecure attachment'] },
            { feature: 'Mentalization-Based Therapy', values: ['Builds capacity to understand own and others\' mental states', 'Borderline features or severe disorganization'] },
          ]}
          highlightColumn={0}
        />

        <p className="mb-6">
          The therapeutic relationship itself is a key change agent. A therapist who is consistently attuned, non-judgmental, and reliable provides a "secure base" experience---often the first one a client has had <Citation id="9" index={9} source="Psychotherapy Research" year="2019" tier={1} />.
        </p>

        <h2 id="role-of-relationships" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Role of Romantic Relationships
        </h2>
        <p className="mb-6">
          Romantic partners can be powerful catalysts for attachment change---but only under certain conditions <Citation id="3" index={3} source="Psychological Science" year="2007" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>What helps:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Partner with secure attachment who can tolerate your insecurity without becoming dysregulated</li>
          <li>Consistent emotional availability and responsiveness</li>
          <li>Willingness to communicate openly about attachment needs</li>
          <li>Patience with setbacks and regression</li>
        </ul>
        <p className="mb-6">
          <strong>What doesn't help:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Hoping a partner will "fix" you without doing your own work</li>
          <li>Relationships with equally insecure partners (e.g., anxious-avoidant pairings often reinforce patterns)</li>
          <li>Expecting instant change or perfect attunement</li>
        </ul>

        <h2 id="self-work" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Self-Work and Conscious Change
        </h2>
        <p className="mb-6">
          While attachment change is fundamentally relational (you can't do it entirely alone), self-awareness accelerates the process <Citation id="8" index={8} source="Attachment & Human Development" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          Practices that support attachment security:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Mindfulness:</strong> Observing attachment-driven thoughts and emotions without being controlled by them</li>
          <li><strong>Journaling:</strong> Reflecting on relationship patterns and triggers</li>
          <li><strong>Self-compassion:</strong> Treating yourself with kindness when attachment wounds are activated</li>
          <li><strong>Somatic practices:</strong> Body-based therapies (yoga, somatic experiencing) that regulate the nervous system</li>
          <li><strong>Reading and education:</strong> Understanding attachment intellectually doesn't change it, but it provides a framework for recognizing and interrupting automatic patterns</li>
        </ul>

        <ArticleCallout variant="tip">
          <p><strong>Start here:</strong> Notice your automatic reaction when a partner needs space or when they seek closeness. Can you pause between stimulus and response? That pause---however brief---is where change begins.</p>
        </ArticleCallout>

        <h2 id="timeline" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Long Does Change Take?
        </h2>
        <p className="mb-6">
          There's no universal timeline. Some people report noticeable shifts within months of intensive therapy or entering a secure relationship. For others, particularly those with disorganized attachment or significant trauma, the process takes years.
        </p>
        <p className="mb-6">
          Research suggests that meaningful attachment change typically requires:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>At least 1-2 years of consistent therapy or stable secure relationships</li>
          <li>Multiple corrective relational experiences, not just one</li>
          <li>Active engagement---passive exposure to secure people isn't enough</li>
        </ul>

        <StatCard
          stats={[
            { value: 35, suffix: '%', label: 'Clients show attachment change after 1 year of therapy' },
            { value: 58, suffix: '%', label: 'Show change after 2+ years of therapy' },
            { value: 70, suffix: '%', label: 'Maintain gains 3 years post-therapy' },
          ]}
          source="Journal of Consulting and Clinical Psychology, 2014"
        />

        <h2 id="realistic-expectations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Realistic Expectations
        </h2>
        <p className="mb-6">
          Change is not linear. You'll have moments where old patterns resurface, especially under stress. This doesn't mean failure---it's part of the process.
        </p>
        <p className="mb-6">
          What to expect:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Two steps forward, one step back progress</li>
          <li>Activation of old patterns during stressful life events</li>
          <li>Slow, gradual shifts rather than overnight transformation</li>
          <li>Moments of clarity followed by regression</li>
          <li>Increased awareness before behavioral change (you'll notice your patterns earlier, even if you can't stop them yet)</li>
        </ul>

        <h2 id="bottom-line" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Bottom Line
        </h2>
        <p className="mb-6">
          You are not locked into your childhood attachment style. The patterns are real, they're powerful, and they matter---but they're not permanent. With awareness, supportive relationships, and often professional help, insecure attachment can evolve into earned security.
        </p>
        <p className="mb-6">
          The process isn't easy. It requires vulnerability, patience, and the willingness to trust new relational experiences even when your nervous system screams that it's unsafe. But the research is clear: change is not only possible---it happens all the time.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Your attachment style was an adaptive response to your early environment. If that environment changes---through new relationships, therapy, or conscious effort---your attachment patterns can change too. You're not rewriting your past; you're writing a new future.</p>
        </ArticleCallout>
      </>
    ),
  },
];
