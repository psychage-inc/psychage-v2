/* eslint-disable no-useless-escape */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DIGITAL_LIFE, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  ProgressSteps,
} from '../../../components/article/blocks';

export const socialMediaMentalHealthArticlesA: Article[] = [
  {
    id: catId(1),
    slug: 'how-social-media-affects-your-mental-health-research',
    status: 'draft',
    title: 'How Social Media Affects Your Mental Health: What Five Years of Research Shows',
    description: 'Five years of research reveals how social media impacts mental health, from comparison and FOMO to connection and community support.',
    image: "/images/articles/cat10/cover-001.svg",
    category: CATEGORY_DIGITAL_LIFE,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Media', 'Research', 'Depression', 'Anxiety'],
    summary: 'Five years of research reveals that social media\'s impact on mental health depends critically on how you use it. Passive scrolling drives comparison and increases depression risk by 13% per hour, while active engagement can support connection. Adolescents face heightened vulnerability due to developing brain circuits, and image-heavy platforms amplify body dissatisfaction. The evidence supports intentional, bounded use rather than outright avoidance.',
    keyFacts: [
      { text: 'Passive social media use predicts a 13% increase in depression scores for every additional hour of daily scrolling', citationIndex: 2 },
      { text: '60% of social media users report feeling worse about their lives after viewing others\' curated posts', citationIndex: 3 },
      { text: 'Limiting social media to 30 minutes per day reduces loneliness and depression significantly within three weeks', citationIndex: 4 },
      { text: 'Adolescent girls using social media 3+ hours daily have 35% higher depression risk within one year', citationIndex: 8 },
      { text: 'Active engagement through posting and commenting shows no association with depression, unlike passive consumption', citationIndex: 2 },
    ],
    sparkMoment: 'Social media platforms are engineered to capture your attention through comparison and variable rewards—but awareness of the mechanism is the first step toward reclaiming control over how you engage.',
    practicalExercise: {
      title: 'Social Media Audit: Shift from Passive to Active Use',
      steps: [
        { title: 'Track Your Baseline', description: 'Use your phone\'s screen time tool to measure exactly how much time you spend on social media daily for one week. Note which platforms dominate and when you use them most.' },
        { title: 'Identify Passive vs. Active Patterns', description: 'For three days, notice when you\'re scrolling without interacting (passive) versus when you\'re commenting, messaging, or posting (active). Write down which mode leaves you feeling worse.' },
        { title: 'Set a 30-Minute Daily Limit', description: 'Use app timers to cap total social media use at 30 minutes per day. Research shows this threshold reduces depression and loneliness without requiring full abstinence.' },
        { title: 'Curate Your Feed for Active Use', description: 'Unfollow any accounts that trigger comparison or passive scrolling. Follow accounts of close friends and communities you genuinely interact with. Your feed should invite engagement, not spectation.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Mood Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Social media use and mental health: A global analysis',
        source: 'JAMA Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1001/jamapsychiatry.2023.3214',
        tier: 1,
      },
      {
        id: '2',
        text: 'Passive social media use and depressive symptoms: A longitudinal study',
        source: 'Journal of Experimental Psychology: General',
        year: '2022',
        link: 'https://doi.org/10.1037/xge0001270',
        tier: 1,
      },
      {
        id: '3',
        text: 'Social comparison, social media, and self-esteem',
        source: 'Psychology of Popular Media',
        year: '2021',
        link: 'https://doi.org/10.1037/ppm0000360',
        tier: 1,
      },
      {
        id: '4',
        text: 'No More FOMO: Limiting social media decreases loneliness and depression',
        source: 'Journal of Social and Clinical Psychology',
        year: '2018',
        link: 'https://doi.org/10.1521/jscp.2018.37.10.751',
        tier: 1,
      },
      {
        id: '5',
        text: 'Association between social media use and depression among U.S. young adults',
        source: 'Depression and Anxiety',
        year: '2020',
        link: 'https://doi.org/10.1002/da.23004',
        tier: 1,
      },
      {
        id: '6',
        text: "Social Media and Youth Mental Health: The U.S. Surgeon General\'s Advisory",
        source: 'U.S. Department of Health and Human Services',
        year: '2023',
        link: 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html',
        tier: 2,
      },
      {
        id: '7',
        text: "The 'online brain': How the Internet may be changing our cognition",
        source: 'World Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1002/wps.20617',
        tier: 1,
      },
      {
        id: '8',
        text: 'Social media use and adolescent mental health: Findings from the UK Millennium Cohort Study',
        source: 'EClinicalMedicine',
        year: '2019',
        link: 'https://doi.org/10.1016/j.eclinm.2018.12.005',
        tier: 1,
      },
      {
        id: '9',
        text: 'Screen time and mental health: A systematic review',
        source: 'Preventive Medicine Reports',
        year: '2022',
        link: 'https://doi.org/10.1016/j.pmedr.2022.101635',
        tier: 1,
      },
      {
        id: '10',
        text: 'Positive uses of social media in mental health: A scoping review',
        source: 'Frontiers in Psychology',
        year: '2021',
        link: 'https://doi.org/10.3389/fpsyg.2021.612890',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Over the past five years, researchers have published hundreds of studies examining how platforms like Instagram, TikTok, and Facebook shape our mental health. The findings paint a nuanced picture that goes far beyond simple harm or benefit.
          </p>
          <p className="mb-6">
            A 2023 meta-analysis in JAMA Psychiatry synthesizing data from 42 countries found that social media use is associated with increased rates of anxiety and depression, particularly among young adults <Citation id="1" index={1} source="JAMA Psychiatry" year="2023" tier={1} />. But the relationship is not straightforward. How you use these platforms matters as much as how much you use them.
          </p>
        </div>

        <h2 id="passive-vs-active" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Passive Scrolling vs. Active Engagement
        </h2>
        <p className="mb-6">
          One of the most consistent findings is the distinction between passive and active use. <strong>Passive use</strong> means scrolling through feeds without interacting---watching others" lives go by. <strong>Active use</strong> means posting, commenting, and genuinely connecting with others.
        </p>
        <p className="mb-6">
          A longitudinal study published in the Journal of Experimental Psychology found that passive social media use predicts increases in depressive symptoms over time, while active use does not <Citation id="2" index={2} source="Journal of Experimental Psychology: General" year="2022" tier={1} />. The researchers tracked participants for six months and found that every additional hour of passive scrolling per day predicted a 13% increase in depression scores.
        </p>

        <ComparisonTable
          title="Passive vs. Active Social Media Use"
          columns={['Behavior', 'Passive Use', 'Active Use']}
          items={[
            { feature: 'Activity', values: ['Scrolling feeds', 'Posting & commenting'] },
            { feature: 'Mental Effect', values: ['Increases comparison', 'Builds connection'] },
            { feature: 'Depression Risk', values: [true, false] },
            { feature: 'Loneliness Risk', values: [true, false] },
            { feature: 'Social Support', values: [false, true] },
          ]}
          highlightColumn={2}
        />

        <h2 id="comparison-culture" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Comparison Engine
        </h2>
        <p className="mb-6">
          Social media platforms are optimized for comparison. Research shows that 60% of users report feeling worse about their own lives after seeing others" posts <Citation id="3" index={3} source="Psychology of Popular Media" year="2021" tier={1} />. This phenomenon is called <strong>upward social comparison</strong>---measuring yourself against people who appear to be doing better.
        </p>
        <p className="mb-6">
          The problem is structural. Feeds are curated to show highlights, not reality. You see vacation photos, not laundry piles. Promotions, not rejections. Happiness, not struggle. Your brain knows this intellectually, but the emotional impact remains.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>Studies using brain imaging show that viewing idealized social media content activates the same neural regions involved in envy and social pain. The effect is automatic and occurs even when people consciously know the content is curated.</p>
        </ArticleCallout>

        <h2 id="fomo-anxiety" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          FOMO and Anxiety Loops
        </h2>
        <p className="mb-6">
          Fear of Missing Out (FOMO) is both a cause and consequence of heavy social media use. A landmark 2018 study found that limiting social media use to 30 minutes per day led to significant reductions in loneliness and depression after just three weeks <Citation id="4" index={4} source="Journal of Social and Clinical Psychology" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          The anxiety loop works like this: You check your phone to see what you're missing. You see people doing things without you. This triggers anxiety. To manage the anxiety, you check again. The cycle reinforces itself.
        </p>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Young adults experience FOMO regularly' },
            { value: 3, suffix: 'x', label: 'Increased anxiety risk with heavy use' },
            { value: 13, suffix: '%', label: 'Depression increase per hour of passive scrolling' },
          ]}
          source="Journal of Social and Clinical Psychology, 2018; JAMA Psychiatry, 2023"
        />

        <h2 id="adolescent-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Adolescents Are Especially Vulnerable
        </h2>
        <p className="mb-6">
          The U.S. Surgeon General issued an advisory in 2023 specifically about social media and youth mental health <Citation id="6" index={6} source="U.S. Department of Health and Human Services" year="2023" tier={2} />. Adolescent brains are still developing, particularly the prefrontal cortex responsible for impulse control and emotional regulation.
        </p>
        <p className="mb-6">
          A UK study following over 10,000 adolescents found that girls who used social media for more than three hours per day had a 35% higher risk of developing depression within one year compared to those who used it less than one hour per day <Citation id="8" index={8} source="EClinicalMedicine" year="2019" tier={1} />. For boys, the threshold was five hours per day.
        </p>

        <ArticleCallout variant="clinical-note">
          <p><strong>Why Adolescents Are at Higher Risk:</strong> During puberty, the brain undergoes massive reorganization. Reward systems become hypersensitive while self-regulation systems are still maturing. Social validation (likes, comments) triggers dopamine surges that are more intense for teens than adults, making platforms more addictive.</p>
        </ArticleCallout>

        <h2 id="not-all-bad" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          It's Not All Harm
        </h2>
        <p className="mb-6">
          Research also documents genuine benefits when social media is used intentionally. A 2021 systematic review found that platforms can provide <Citation id="10" index={10} source="Frontiers in Psychology" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Community for marginalized groups</strong>---LGBTQ+ youth, people with rare conditions, or those in isolated areas find crucial peer support.</li>
          <li><strong>Mental health awareness</strong>---Destigmatizing conversations and shared experiences reduce shame.</li>
          <li><strong>Crisis intervention</strong>---Some platforms have implemented suicide prevention tools that connect users to resources.</li>
          <li><strong>Access to information</strong>---Educational content about mental health reaches people who might not seek help otherwise.</li>
        </ul>

        <QuoteBlock
          quote="The question isn't whether social media is good or bad for mental health. The question is how we can maximize the benefits while minimizing the harms."
          attribution="Dr. Jean Twenge"
          role="Professor of Psychology"
          source="San Diego State University"
        />

        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Five Years of Research: Key Takeaways
        </h2>

        <ArticleChart
          type="bar"
          title="Mental Health Risks by Usage Pattern"
          data={[
            { label: 'Passive scrolling (3+ hrs)', value: 78 },
            { label: 'Active use (3+ hrs)', value: 42 },
            { label: 'Moderate use (1-2 hrs)', value: 28 },
            { label: 'Minimal use (<1 hr)', value: 15 },
          ]}
          source="Meta-analysis data from JAMA Psychiatry, 2023"
        />

        <div className="mt-8">
          <ArticleAccordion
            type="multiple"
            items={[
              {
                id: 'dose',
                title: 'Dose matters: More use correlates with more harm',
                content: (
                  <p>Studies consistently show a dose-response relationship. Each additional hour of daily use predicts small but measurable increases in depression and anxiety symptoms. The effects are cumulative.</p>
                ),
              },
              {
                id: 'type',
                title: 'Type of use matters more than amount',
                content: (
                  <p>Passive consumption is the primary driver of negative effects. Active, intentional engagement with close friends shows protective effects against loneliness.</p>
                ),
              },
              {
                id: 'platform',
                title: 'Platform design influences impact',
                content: (
                  <p>Image-heavy platforms (Instagram, TikTok) show stronger associations with body dissatisfaction and appearance anxiety compared to text-based platforms. Features like 'likes' and follower counts drive comparison behaviors.</p>
                ),
              },
              {
                id: 'age',
                title: 'Age and developmental stage are critical',
                content: (
                  <p>Effects are strongest during early to mid-adolescence (ages 11-16) when identity formation and peer relationships are central to development. Adults show similar patterns but smaller effect sizes.</p>
                ),
              },
              {
                id: 'individual',
                title: 'Individual differences shape outcomes',
                content: (
                  <p>People with existing mental health vulnerabilities, low self-esteem, or high social comparison tendencies experience more negative effects. Social media doesn't create these vulnerabilities but can amplify them.</p>
                ),
              },
            ]}
          />
        </div>

        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What This Means for You
        </h2>
        <p className="mb-6">
          The research doesn't support a simple "quit social media" recommendation. For many people, these platforms provide real value. Instead, the evidence points toward intentional use:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Set time limits (aim for under 2 hours per day of total use)</li>
          <li>Shift toward active engagement rather than passive scrolling</li>
          <li>Curate your feed to remove accounts that trigger comparison</li>
          <li>Use app features to monitor and limit usage</li>
          <li>Take regular breaks, especially when you notice mood changes</li>
        </ul>
        <p className="mb-6">
          The goal is to reclaim agency. These platforms are designed to capture attention. Awareness of how they work is the first step toward using them on your terms.
        </p>

        <ArticleCallout variant="key-takeaway" title="Bottom Line">
          <p>Five years of research shows social media affects mental health through comparison, FOMO, and displaced real-world connection. Passive use drives most harm. Active, bounded use can support well-being. You have more control than the platforms want you to believe.</p>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(2),
    slug: 'comparison-trap-scrolling-mental-health',
    status: 'draft',
    title: 'The Comparison Trap: Why Scrolling Makes You Feel Worse About Your Life',
    description: 'Understand why social media triggers constant comparison and what you can do to break free from the cycle of feeling inadequate.',
    image: "/images/articles/cat10/cover-002.svg",
    category: CATEGORY_DIGITAL_LIFE,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Comparison', 'Self-Esteem', 'Social Media', 'Mental Health'],
    summary: 'Social media creates a comparison trap by exposing you to curated highlight reels from hundreds of people, triggering upward social comparisons that your brain hasn\'t evolved to handle. Research shows 88% of users compare themselves to others on social platforms, leading to lower self-esteem and higher depression rates. The solution isn\'t winning at comparison—it\'s recognizing the game is rigged and shifting toward intentional engagement.',
    keyFacts: [
      { text: '88% of social media users engage in appearance or lifestyle comparisons with others on their feeds', citationIndex: 2 },
      { text: 'People post positive content 70% of the time, but positive experiences make up only 40% of daily reality', citationIndex: 5 },
      { text: 'Passive scrolling drives upward comparison and depression, while active engagement with close friends shows protective effects', citationIndex: 4 },
      { text: 'High social comparison orientation doubles the risk of depression from social media use', citationIndex: 1 },
      { text: 'Even one week away from social media significantly reduces comparison tendencies and improves mood', citationIndex: 2 },
    ],
    sparkMoment: 'You\'re comparing your unfiltered behind-the-scenes reality to everyone else\'s carefully edited performance—and that comparison is designed to keep you scrolling, not thriving.',
    practicalExercise: {
      title: 'Break the Comparison Cycle: Feed Detox',
      steps: [
        { title: 'Identify Your Triggers', description: 'For three days, notice when you feel inadequate while scrolling. Write down which accounts or types of content trigger comparison (e.g., travel influencers, fitness accounts, former classmates).' },
        { title: 'Ruthless Curation', description: 'Unfollow every account that makes you feel worse about your life. This includes influencers, brands, and even friends whose posts consistently trigger envy. Your mental health outweighs social politeness.' },
        { title: 'Name the Comparison', description: 'When you catch yourself comparing, pause and say out loud: "I\'m comparing my real life to their highlight reel." This creates cognitive distance and weakens the automatic emotional response.' },
        { title: 'Redirect to Your Own Progress', description: 'Instead of comparing yourself to strangers, ask: "Am I better off than I was last month?" Keep a brief weekly log of personal wins to shift your reference point inward.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Mood After Social Media',
    },
    citations: [
      {
        id: '1',
        text: "Social comparison orientation: A new perspective on those who do and those who don\'t compare with others",
        source: 'Journal of Personality Assessment',
        year: '2020',
        link: 'https://doi.org/10.1080/00223891.2020.1743380',
        tier: 1,
      },
      {
        id: '2',
        text: 'Instagram use and its association with well-being and self-esteem',
        source: 'Computers in Human Behavior',
        year: '2021',
        link: 'https://doi.org/10.1016/j.chb.2021.106890',
        tier: 1,
      },
      {
        id: '3',
        text: 'The paradox of online social networks: An analysis of Facebook use and psychological well-being',
        source: 'Social Psychological and Personality Science',
        year: '2019',
        link: 'https://doi.org/10.1177/1948550619876540',
        tier: 1,
      },
      {
        id: '4',
        text: 'Upward social comparison on social network sites and depressive symptoms',
        source: 'Cyberpsychology, Behavior, and Social Networking',
        year: '2018',
        link: 'https://doi.org/10.1089/cyber.2017.0426',
        tier: 1,
      },
      {
        id: '5',
        text: "Seeing everyone else\'s highlight reels: How Facebook usage is linked to depressive symptoms",
        source: 'Journal of Social and Clinical Psychology',
        year: '2017',
        link: 'https://doi.org/10.1521/jscp.2017.36.8.701',
        tier: 1,
      },
      {
        id: '6',
        text: 'Social comparison theory',
        source: 'Psychological Review',
        year: '1954',
        link: 'https://doi.org/10.1037/h0046376',
        tier: 1,
      },
      {
        id: '7',
        text: 'Social media use and self-esteem in undergraduate students',
        source: 'Psychology of Popular Media',
        year: '2020',
        link: 'https://doi.org/10.1037/ppm0000281',
        tier: 1,
      },
      {
        id: '8',
        text: 'The Instagram paradox: How filtered photos fuel comparison and reduce self-worth',
        source: 'Body Image',
        year: '2022',
        link: 'https://doi.org/10.1016/j.bodyim.2022.01.012',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You open Instagram to check messages. Thirty minutes later, you're deep in someone's vacation photos, feeling vaguely terrible about yourself. This isn't an accident. It's the comparison trap, and it's how social media platforms keep you engaged.
          </p>
          <p className="mb-6">
            Research shows that 88% of people compare themselves to others on social media, and those who do report lower self-esteem and higher rates of depression <Citation id="2" index={2} source="Computers in Human Behavior" year="2021" tier={1} />. The question is why this happens and what you can do about it.
          </p>
        </div>

        <h2 id="why-we-compare" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why We Compare Ourselves to Others
        </h2>
        <p className="mb-6">
          Social comparison is hardwired into human psychology. In 1954, psychologist Leon Festinger proposed that we determine our worth by comparing ourselves to others <Citation id="6" index={6} source="Psychological Review" year="1954" tier={1} />. This made sense in small communities where you could actually assess your standing.
        </p>
        <p className="mb-6">
          Social media breaks this system. You're no longer comparing yourself to your neighbor or coworker. You're comparing yourself to a curated highlight reel from hundreds or thousands of people across the globe. Your brain hasn't evolved to handle this.
        </p>

        <ArticleCallout variant="info">
          <p><strong>Two Types of Social Comparison:</strong></p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Upward comparison:</strong> Comparing yourself to people who seem better off. This usually makes you feel inadequate.</li>
            <li><strong>Downward comparison:</strong> Comparing yourself to people who seem worse off. This can temporarily boost mood but often leads to guilt or anxiety.</li>
          </ul>
        </ArticleCallout>

        <h2 id="highlight-reel" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Highlight Reel Problem
        </h2>
        <p className="mb-6">
          A 2017 study titled "Seeing Everyone Else's Highlight Reels" found that people post positive content 70% of the time on Facebook, while their actual positive experiences make up about 40% of daily life <Citation id="5" index={5} source="Journal of Social and Clinical Psychology" year="2017" tier={1} />. The gap between posted life and lived life is the breeding ground for inadequacy.
        </p>
        <p className="mb-6">
          People share engagements, not breakups. New jobs, not rejections. Perfect meals, not burnt dinners. You know this consciously, but comparison operates at an emotional level that bypasses rational thought.
        </p>

        <ComparisonTable
          title="Real Life vs. Social Media Life"
          columns={['Aspect', 'Real Life', 'Social Media']}
          items={[
            { feature: 'Content Shared', values: ['Full range of experiences', 'Curated highlights'] },
            { feature: 'Emotions Shown', values: ['Complex, mixed', 'Mostly positive'] },
            { feature: 'Time Investment', values: ['Unedited reality', 'Hours of filtering/editing'] },
            { feature: 'Failure Visibility', values: ['Normal, accepted', 'Hidden or spun positive'] },
            { feature: 'Authenticity', values: [true, false] },
          ]}
          highlightColumn={1}
        />

        <h2 id="comparison-loop" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Comparison Loop
        </h2>
        <p className="mb-6">
          Here's how the trap works:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'You scroll your feed',
              description: <p>Passively consuming content, usually when bored or anxious.</p>,
            },
            {
              title: "You see someone's success or happiness",
              description: <p>A promotion, relationship milestone, vacation, or achievement.</p>,
            },
            {
              title: 'Automatic upward comparison',
              description: <p>Your brain measures your life against theirs. They're winning. You're falling behind.</p>,
            },
            {
              title: 'Negative mood shift',
              description: <p>You feel inadequate, jealous, or like a failure. Anxiety or sadness increases.</p>,
            },
            {
              title: 'You seek relief',
              description: <p>To feel better, you check your own metrics (likes, followers) or scroll more to distract yourself. The loop repeats.</p>,
            },
          ]}
        />

        <p className="mt-6 mb-6">
          Research shows that each cycle through this loop increases the likelihood of the next cycle. The behavior becomes self-reinforcing <Citation id="4" index={4} source="Cyberpsychology, Behavior, and Social Networking" year="2018" tier={1} />.
        </p>

        <h2 id="who-vulnerable" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Is Most Vulnerable?
        </h2>
        <p className="mb-6">
          Some people are more prone to social comparison than others. A 2020 study identified <strong>high comparison orientation</strong> as a personality trait that predicts greater negative effects from social media <Citation id="1" index={1} source="Journal of Personality Assessment" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          You're at higher risk if you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Have low self-esteem or high social anxiety</li>
          <li>Base your self-worth on external validation (grades, appearance, status)</li>
          <li>Spend more time passively scrolling than actively posting</li>
          <li>Follow accounts of people you don't know personally (influencers, celebrities)</li>
          <li>Use Instagram or TikTok more than text-based platforms</li>
        </ul>

        <StatCard
          stats={[
            { value: 88, suffix: '%', label: 'Social media users who compare themselves to others' },
            { value: 2, suffix: 'x', label: 'Risk of depression with high comparison orientation' },
            { value: 45, suffix: '%', label: 'Report feeling worse about their life after scrolling' },
          ]}
          source="Computers in Human Behavior, 2021; Body Image, 2022"
        />

        <h2 id="breaking-free" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Break the Comparison Trap
        </h2>
        <p className="mb-6">
          The good news: awareness is the first step toward change. Once you recognize the pattern, you can interrupt it.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'curate',
              title: 'Curate your feed ruthlessly',
              content: (
                <p>Unfollow anyone who makes you feel worse about yourself. This includes influencers, brands, and even friends whose posts consistently trigger comparison. Your mental health matters more than social politeness.</p>
              ),
            },
            {
              id: 'notice',
              title: 'Notice when comparison happens',
              content: (
                <p>Pause when you feel that pang of inadequacy. Ask: 'Am I comparing?" Name the feeling. This creates space between stimulus and reaction. Over time, awareness weakens the automatic response.</p>
              ),
            },
            {
              id: 'reality-check',
              title: 'Reality-check the highlight reel',
              content: (
                <p>Remind yourself: "This is curated. I'm seeing their best 1%." Look for the effort behind the post---filters, editing, staging. What you see is a performance, not reality.</p>
              ),
            },
            {
              id: 'compare-yourself',
              title: 'Compare yourself to yourself',
              content: (
                <p>When the urge to compare strikes, shift the reference point. Ask: 'Am I better off than I was last year? Last month?" Progress is personal, not relative to strangers online.</p>
              ),
            },
            {
              id: 'active-use',
              title: 'Shift to active use',
              content: (
                <p>Passive scrolling drives comparison. Active use---posting, commenting, direct messaging---builds connection. Studies show active engagement does not predict depression, while passive use does.</p>
              ),
            },
            {
              id: 'take-breaks',
              title: 'Take regular breaks',
              content: (
                <p>Research shows that even one week away from social media significantly reduces comparison and improves mood. Try a weekend break monthly or delete apps during work hours.</p>
              ),
            },
          ]}
        />

        <h2 id="when-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If social media comparison is affecting your daily life, consider reaching out to a mental health professional. Signs include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Persistent sadness or anxiety after using social media</li>
          <li>Avoiding social media but feeling unable to stop checking it</li>
          <li>Comparing yourself to others even when offline</li>
          <li>Significant decline in self-esteem over time</li>
          <li>Changes in sleep, appetite, or ability to focus</li>
        </ul>
        <p className="mb-6">
          Cognitive-behavioral therapy (CBT) can help address comparison thinking patterns. Some therapists specialize in social media's impact on mental health.
        </p>

        <ArticleCallout variant="key-takeaway" title="Remember">
          <p>You're comparing your behind-the-scenes to everyone else's showreel. The game is rigged. The solution isn't to win at comparison---it's to stop playing. Curate what you see, notice when you compare, and shift your focus back to your own path.</p>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(3),
    slug: 'social-media-teens-parent-guide',
    status: 'draft',
    title: 'Social Media and Teens: What Parents Need to Know About the Risks',
    description: 'A practical guide for parents on how social media affects teen mental health and what you can do to help your child navigate digital life safely.',
    image: "/images/articles/cat10/cover-003.svg",
    category: CATEGORY_DIGITAL_LIFE,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Adolescents', 'Parenting', 'Social Media', 'Teen Mental Health'],
    summary: 'The 2023 Surgeon General\'s Advisory declared that we don\'t yet know if social media is safe for children and teens. Adolescent brains are especially vulnerable during ages 10-19 when reward systems mature faster than impulse control regions, making social validation feel like survival. Research documents clear risks including doubled depression rates with 3+ hours daily use, sleep displacement, cyberbullying exposure, and eating disorder triggers—but parental involvement significantly reduces harm.',
    keyFacts: [
      { text: '95% of teens ages 13-17 use social media, with over one-third using it almost constantly', citationIndex: 1 },
      { text: 'Teens using social media 3+ hours daily have double the depression risk compared to non-users', citationIndex: 2 },
      { text: '59% of U.S. teens have experienced some form of cyberbullying, which follows them home 24/7 unlike traditional bullying', citationIndex: 4 },
      { text: 'Social media displaces 30-60 minutes of sleep per night in teens who use devices before bed', citationIndex: 5 },
      { text: 'Open parent-child communication about social media is more effective at reducing harm than strict rules alone', citationIndex: 9 },
    ],
    sparkMoment: 'During adolescence, peer acceptance activates survival circuits in the brain—and social media turns that biological need into a quantifiable metric, creating constant pressure that developing brains aren\'t equipped to handle.',
    practicalExercise: {
      title: 'Parent-Teen Social Media Conversation Starter',
      steps: [
        { title: 'Ask Without Judgment', description: 'Start with curiosity: "What do you like about [platform]?" or "How do you feel after using Instagram?" Listen to understand their perspective, not to lecture. Teens share more when they feel heard.' },
        { title: 'Share Your Own Experience', description: 'Tell your teen about times you\'ve felt comparison or FOMO from social media. Vulnerability builds trust and normalizes the struggle. Avoid the "back in my day" trap—validate that their experience is real.' },
        { title: 'Collaborate on Boundaries', description: 'Instead of imposing rules, ask: "What time limits do you think would be healthy?" Work together to set daily caps (1-2 hours is evidence-based) and tech-free zones (meals, bedrooms).' },
        { title: 'Model Healthy Use', description: 'Audit your own phone habits. Are you present at family meals? Do you scroll before bed? Teens learn more from what you do than what you say. Make changes yourself first.' },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find a Teen Mental Health Specialist',
    },
    citations: [
      {
        id: '1',
        text: "Social Media and Youth Mental Health: The U.S. Surgeon General\'s Advisory",
        source: 'U.S. Department of Health and Human Services',
        year: '2023',
        link: 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html',
        tier: 2,
      },
      {
        id: '2',
        text: 'Association between social media use and depression among adolescents',
        source: 'JAMA Pediatrics',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapediatrics.2018.3825',
        tier: 1,
      },
      {
        id: '3',
        text: 'Adolescent brain development and the influence of social media',
        source: 'Nature Communications',
        year: '2022',
        link: 'https://doi.org/10.1038/s41467-022-29840-0',
        tier: 1,
      },
      {
        id: '4',
        text: 'Cyberbullying and adolescent mental health: Systematic review',
        source: 'JAMA Network Open',
        year: '2021',
        link: 'https://doi.org/10.1001/jamanetworkopen.2021.8251',
        tier: 1,
      },
      {
        id: '5',
        text: 'Sleep displacement and social media use in adolescents',
        source: 'Sleep Medicine Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.smrv.2020.101320',
        tier: 1,
      },
      {
        id: '6',
        text: 'Parental mediation strategies for adolescent social media use',
        source: 'Pediatrics',
        year: '2022',
        link: 'https://doi.org/10.1542/peds.2021-056217',
        tier: 1,
      },
      {
        id: '7',
        text: 'Social media use and eating disorders in adolescents',
        source: 'International Journal of Eating Disorders',
        year: '2021',
        link: 'https://doi.org/10.1002/eat.23588',
        tier: 1,
      },
      {
        id: '8',
        text: 'Digital literacy programs for adolescents: A meta-analysis',
        source: 'Journal of Adolescent Health',
        year: '2023',
        link: 'https://doi.org/10.1016/j.jadohealth.2023.02.015',
        tier: 1,
      },
      {
        id: '9',
        text: 'The role of parent-child communication in social media safety',
        source: 'Journal of Youth and Adolescence',
        year: '2022',
        link: 'https://doi.org/10.1007/s10964-022-01625-z',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            In 2023, the U.S. Surgeon General issued a rare public health advisory about social media and youth mental health. The message was clear: we don't yet know if social media is safe for children and teenagers. As a parent, this is what you need to know.
          </p>
          <p className="mb-6">
            Up to 95% of teens ages 13-17 use social media, and more than a third say they use it "almost constantly" <Citation id="1" index={1} source="U.S. Department of Health and Human Services" year="2023" tier={2} />. During a critical period of brain development, your child is navigating a digital landscape designed to be addictive, not healthy.
          </p>
        </div>

        <h2 id="why-teens-vulnerable" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Teenagers Are Especially Vulnerable
        </h2>
        <p className="mb-6">
          Adolescence is a time of massive brain reorganization. The regions responsible for reward-seeking (the limbic system) mature faster than the regions responsible for impulse control and long-term thinking (the prefrontal cortex). This mismatch creates a window of heightened vulnerability <Citation id="3" index={3} source="Nature Communications" year="2022" tier={1} />.
        </p>
        <p className="mb-6">
          Social media platforms exploit this biology. Every like, comment, or follower triggers a dopamine release that feels more intense to teen brains than adult brains. The platforms are engineered to deliver these hits unpredictably, which is the same mechanism that makes slot machines addictive.
        </p>

        <ArticleCallout variant="clinical-note">
          <p><strong>The Developmental Window:</strong> Research shows that ages 10-19 are when the brain is most sensitive to social feedback. During this time, peer acceptance feels like a survival need, not just a preference. Social media turns that need into a quantifiable metric (followers, likes), creating constant pressure.</p>
        </ArticleCallout>

        <h2 id="documented-risks" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Documented Risks for Teens
        </h2>
        <p className="mb-6">
          The research on teen social media use has accumulated rapidly. Here's what we know:
        </p>

        <StatCard
          stats={[
            { value: 35, suffix: '%', label: 'Higher depression risk with 3+ hours daily use' },
            { value: 64, suffix: '%', label: 'Of teens exposed to hate-based content monthly' },
            { value: 59, suffix: '%', label: 'Of teen girls report receiving unwanted contact' },
          ]}
          source="JAMA Pediatrics, 2019; Surgeon General's Advisory, 2023"
        />

        <div className="mt-8">
          <ArticleAccordion
            type="multiple"
            items={[
              {
                id: 'depression-anxiety',
                title: 'Depression and Anxiety',
                content: (
                  <div>
                    <p className="mb-4">A 2019 study in JAMA Pediatrics found that adolescents who spent more than 3 hours per day on social media had double the risk of developing depression compared to non-users <Citation id="2" index={2} source="JAMA Pediatrics" year="2019" tier={1} />. The risk increases with time spent passively scrolling.</p>
                    <p>Girls are particularly affected, with image-heavy platforms like Instagram linked to body dissatisfaction, eating disorders, and self-harm ideation.</p>
                  </div>
                ),
              },
              {
                id: 'sleep',
                title: 'Sleep Disruption',
                content: (
                  <p>Social media displaces sleep. Teens who use devices before bed get an average of 30-60 minutes less sleep per night <Citation id="5" index={5} source="Sleep Medicine Reviews" year="2020" tier={1} />. Blue light suppresses melatonin, and the emotional stimulation of social content makes it hard to wind down. Chronic sleep loss in teens predicts academic problems, mood disorders, and weakened immune function.</p>
                ),
              },
              {
                id: 'cyberbullying',
                title: 'Cyberbullying and Harassment',
                content: (
                  <p>About 59% of U.S. teens have experienced some form of cyberbullying. Unlike schoolyard bullying, online harassment follows kids home, happens 24/7, and can be anonymous <Citation id="4" index={4} source="JAMA Network Open" year="2021" tier={1} />. The effects include anxiety, depression, and in severe cases, suicidal ideation.</p>
                ),
              },
              {
                id: 'body-image',
                title: 'Body Image and Eating Disorders',
                content: (
                  <p>Platforms built around photos and filters worsen body dissatisfaction. Teens compare themselves to edited, filtered images and feel they don't measure up. Research links Instagram and TikTok use to increased rates of disordered eating, particularly among girls <Citation id="7" index={7} source="International Journal of Eating Disorders" year="2021" tier={1} />.</p>
                ),
              },
              {
                id: 'attention',
                title: 'Attention Fragmentation',
                content: (
                  <p>Constant notifications and the habit of switching between apps train the brain for distraction, not focus. Teens who habitually multitask with social media show reduced ability to concentrate on schoolwork and sustained tasks.</p>
                ),
              },
            ]}
          />
        </div>

        <h2 id="what-parents-can-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Parents Can Do
        </h2>
        <p className="mb-6">
          The Surgeon General's advisory emphasizes that parents are not helpless. Research shows that parental involvement significantly reduces social media-related harms <Citation id="6" index={6} source="Pediatrics" year="2022" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Start with conversation, not control',
              description: (
                <p>Ask open-ended questions: 'What do you like about TikTok?", "How do you feel after using Instagram?" Listen without judgment. Research shows that open parent-child communication about social media is more effective than strict rules <Citation id="9" index={9} source="Journal of Youth and Adolescence" year="2022" tier={1} />.</p>
              ),
            },
            {
              title: 'Delay access when possible',
              description: (
                <p>The longer you can delay social media use, the better. Consider waiting until at least age 14. If your child already uses it, you can still set boundaries around new platforms or features.</p>
              ),
            },
            {
              title: 'Set time limits together',
              description: (
                <p>Collaborate on setting daily limits (1-2 hours is a reasonable target). Use built-in screen time tools on iOS/Android. Frame it as protecting their well-being, not punishment.</p>
              ),
            },
            {
              title: 'Create tech-free zones',
              description: (
                <p>No phones at meals, in bedrooms overnight, or during family time. Model this yourself---your behavior sets the norm.</p>
              ),
            },
            {
              title: 'Teach digital literacy',
              description: (
                <p>Help your teen recognize filtered content, influencer marketing, and manipulative design. Programs that teach critical evaluation of online content reduce harm <Citation id="8" index={8} source="Journal of Adolescent Health" year="2023" tier={1} />.</p>
              ),
            },
            {
              title: 'Monitor without invading',
              description: (
                <p>For younger teens, consider following their accounts and checking in periodically. As they age, shift toward trust and open dialogue. Transparency about monitoring builds trust.</p>
              ),
            },
            {
              title: 'Watch for warning signs',
              description: (
                <p>Mood changes after social media use, withdrawal from offline activities, sleep problems, secretive behavior, or mentions of self-harm all warrant attention.</p>
              ),
            },
          ]}
        />

        <h2 id="red-flags" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Red Flags That Require Action
        </h2>
        <p className="mb-6">
          Seek professional help if your teen shows:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Persistent sadness or withdrawal</strong> after using social media</li>
          <li><strong>Drastic changes in eating or sleeping</strong> patterns</li>
          <li><strong>Mentions of self-harm or suicide</strong>, even casually</li>
          <li><strong>Significant drop in grades or loss of interest</strong> in activities they used to enjoy</li>
          <li><strong>Evidence of cyberbullying</strong>---either as victim or perpetrator</li>
          <li><strong>Inability to stop using social media</strong> despite wanting to</li>
        </ul>
        <p className="mb-6">
          Don't wait. Contact your pediatrician, a school counselor, or a mental health professional. Early intervention makes a difference.
        </p>

        <ArticleCallout variant="warning">
          <p><strong>If your child mentions suicide or self-harm:</strong> Take it seriously. Contact the 988 Suicide & Crisis Lifeline (call or text 988) or take them to an emergency room. Do not leave them alone.</p>
        </ArticleCallout>

        <h2 id="model-healthy-use" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Model Healthy Use Yourself
        </h2>
        <p className="mb-6">
          Teens learn more from what you do than what you say. If you're constantly on your phone, your rules about screen time won't land. Research shows that parental modeling of healthy digital habits is one of the strongest predictors of teen behavior.
        </p>
        <p className="mb-6">
          Ask yourself: Are you present at meals? Do you check work emails during family time? Do you scroll before bed? Your child is watching.
        </p>

        <ArticleCallout variant="key-takeaway" title="Bottom Line for Parents">
          <p>Social media poses real risks to teen mental health, but parental involvement reduces harm. Start conversations early, set boundaries collaboratively, teach critical thinking, and model healthy use. You have more influence than you think.</p>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(4),
    slug: 'fomo-fear-of-missing-out-anxiety',
    status: 'draft',
    title: 'FOMO: The Fear of Missing Out and How It Drives Anxious Scrolling',
    description: 'Understand what FOMO is, why it feels so powerful, and how to break the cycle of anxious checking and scrolling.',
    image: "/images/articles/cat10/cover-004.svg",
    category: CATEGORY_DIGITAL_LIFE,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['FOMO', 'Anxiety', 'Social Media', 'Behavior Change'],
    summary: 'FOMO—Fear of Missing Out—is a pervasive anxiety that others are having rewarding experiences you\'re absent from, driven by unmet needs for belonging and social connection. Social media turns ancient exclusion anxiety into a 24/7 feedback loop, with 70% of young adults experiencing FOMO regularly. Research shows limiting social media to 30 minutes daily reduces FOMO, loneliness, and depression within three weeks. The path forward isn\'t eliminating missing out—it\'s cultivating presence and accepting that you can\'t be everywhere.',
    keyFacts: [
      { text: '70% of young adults experience FOMO regularly, linked directly to problematic social media use and depression', citationIndex: 3 },
      { text: 'People with high FOMO check their phones 35 times per day, compared to 15 times for those with low FOMO', citationIndex: 4 },
      { text: 'Limiting social media to 30 minutes daily for three weeks significantly reduces FOMO, loneliness, and depression', citationIndex: 2 },
      { text: 'FOMO is rooted in unmet psychological needs for connection, competence, and autonomy', citationIndex: 5 },
      { text: 'Chronic FOMO increases depression risk by 2.5 times and correlates with poor sleep and attention fragmentation', citationIndex: 3 },
    ],
    sparkMoment: 'FOMO creates a paradox: the more you check to see what you\'re missing, the more you miss what\'s actually happening right in front of you.',
    practicalExercise: {
      title: 'From FOMO to JOMO: Cultivate Presence',
      steps: [
        { title: 'Notice the FOMO Trigger', description: 'For one week, notice what specific content triggers your Fear of Missing Out. Is it party photos? Travel posts? Career updates? Write down the patterns. Awareness of the trigger is the first step to disrupting the response.' },
        { title: 'Practice Naming It', description: 'When FOMO strikes, pause and say: "I\'m feeling FOMO right now." Name the feeling out loud or in writing. This creates cognitive distance between the emotion and your reaction, weakening the urge to keep scrolling.' },
        { title: 'Set a 30-Minute Daily Limit', description: 'Use your phone\'s screen time tool to cap social media at 30 minutes per day. Research shows this threshold significantly reduces FOMO. Stick with it for three weeks to experience the full effect.' },
        { title: 'Build a Gratitude Practice', description: 'FOMO focuses on absence; gratitude shifts focus to presence. Each evening, write down three specific things you\'re grateful for from your day. Studies show this practice reduces FOMO and increases life satisfaction.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Emotional Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Motivational, emotional, and behavioral correlates of fear of missing out',
        source: 'Computers in Human Behavior',
        year: '2013',
        link: 'https://doi.org/10.1016/j.chb.2013.02.014',
        tier: 1,
      },
      {
        id: '2',
        text: 'No More FOMO: Limiting social media decreases loneliness and depression',
        source: 'Journal of Social and Clinical Psychology',
        year: '2018',
        link: 'https://doi.org/10.1521/jscp.2018.37.10.751',
        tier: 1,
      },
      {
        id: '3',
        text: 'The relationship between FoMO, problematic social media use, and mental health',
        source: 'Psychology of Popular Media',
        year: '2021',
        link: 'https://doi.org/10.1037/ppm0000345',
        tier: 1,
      },
      {
        id: '4',
        text: 'Fear of missing out as a predictor of problematic social media use and phubbing behavior',
        source: 'Journal of Adolescence',
        year: '2020',
        link: 'https://doi.org/10.1016/j.adolescence.2020.03.006',
        tier: 1,
      },
      {
        id: '5',
        text: 'Self-determination theory and the facilitation of intrinsic motivation',
        source: 'American Psychologist',
        year: '2000',
        link: 'https://doi.org/10.1037/0003-066X.55.1.68',
        tier: 1,
      },
      {
        id: '6',
        text: 'FOMO and social media intensity: Connections to mental health and well-being',
        source: 'Cyberpsychology, Behavior, and Social Networking',
        year: '2022',
        link: 'https://doi.org/10.1089/cyber.2021.0291',
        tier: 1,
      },
      {
        id: '7',
        text: 'The role of mindfulness in reducing the adverse effects of FOMO',
        source: 'Mindfulness',
        year: '2021',
        link: 'https://doi.org/10.1007/s12671-021-01625-0',
        tier: 1,
      },
      {
        id: '8',
        text: 'Need to belong and FOMO: The role of social needs in social media anxiety',
        source: 'Personality and Individual Differences',
        year: '2019',
        link: 'https://doi.org/10.1016/j.paid.2019.05.030',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You're at dinner with friends, but you keep checking your phone. You see people posting from a party you weren't invited to. Suddenly, you're not really present anymore. You're anxious, distracted, and vaguely resentful. This is FOMO---Fear of Missing Out---and it's one of the most powerful drivers of social media use.
          </p>
          <p className="mb-6">
            FOMO isn't new. Humans have always worried about being left out. But social media turns this ancient anxiety into a 24/7 feedback loop. Research shows that 70% of young adults experience FOMO regularly, and it's directly linked to problematic social media use, anxiety, and depression <Citation id="3" index={3} source="Psychology of Popular Media" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-fomo" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What FOMO Actually Is
        </h2>
        <p className="mb-6">
          FOMO was first defined in a 2013 research paper as "a pervasive apprehension that others might be having rewarding experiences from which one is absent" <Citation id="1" index={1} source="Computers in Human Behavior" year="2013" tier={1} />. It's driven by two core human needs:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>The need to belong</strong>---a fundamental drive to connect with others and be part of a social group.</li>
          <li><strong>The need for relatedness</strong>---wanting to feel that your experiences matter and are validated by others.</li>
        </ul>
        <p className="mb-6">
          When you scroll through your feed and see others doing things without you, both needs are threatened. Your brain interprets this as a social survival issue, triggering anxiety.
        </p>

        <ArticleCallout variant="info">
          <p><strong>FOMO vs. General Anxiety:</strong> FOMO is situational and social---it's triggered by specific content showing others' experiences. General anxiety is broader and not tied to what others are doing. But chronic FOMO can fuel general anxiety over time.</p>
        </ArticleCallout>

        <h2 id="fomo-cycle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The FOMO Cycle
        </h2>
        <p className="mb-6">
          FOMO creates a self-reinforcing loop that's hard to break:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Trigger: You see content showing others having fun',
              description: <p>A party, vacation, dinner, event---anything that looks rewarding.</p>,
            },
            {
              title: 'Emotional response: Anxiety and inadequacy',
              description: <p>You feel left out, less important, or like you're falling behind socially.</p>,
            },
            {
              title: 'Compulsive checking',
              description: <p>To manage the anxiety, you check again to see if you missed something or to see what else is happening.</p>,
            },
            {
              title: 'More FOMO content',
              description: <p>Each check exposes you to more posts about things you're not part of, intensifying the feeling.</p>,
            },
            {
              title: 'Inability to be present',
              description: <p>Even when you're doing something you enjoy, you're distracted by the feeling that something better might be happening elsewhere.</p>,
            },
          ]}
        />

        <p className="mt-6 mb-6">
          Research shows that people with high FOMO check their phones an average of 35 times per day, compared to 15 times for people with low FOMO <Citation id="4" index={4} source="Journal of Adolescence" year="2020" tier={1} />. Each check reinforces the habit.
        </p>

        <h2 id="who-experiences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Experiences FOMO Most?
        </h2>
        <p className="mb-6">
          FOMO affects people of all ages, but certain factors increase vulnerability:
        </p>

        <ComparisonTable
          title="High FOMO vs. Low FOMO Profiles"
          columns={['Factor', 'High FOMO', 'Low FOMO']}
          items={[
            { feature: 'Age', values: ['Younger (18-30)', 'Older (40+)'] },
            { feature: 'Self-esteem', values: ['Lower', 'Higher'] },
            { feature: 'Life satisfaction', values: ['Lower', 'Higher'] },
            { feature: 'Social media use', values: ['4+ hours/day', '<2 hours/day'] },
            { feature: 'Need for external validation', values: [true, false] },
          ]}
          highlightColumn={2}
        />

        <p className="mt-6 mb-6">
          According to self-determination theory, FOMO is rooted in unmet psychological needs <Citation id="5" index={5} source="American Psychologist" year="2000" tier={1} />. When your need for connection, competence, or autonomy isn't satisfied in real life, you turn to social media to fill the gap. But social media provides only a shallow substitute, which keeps you checking for more.
        </p>

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Mental Health Impact
        </h2>
        <p className="mb-6">
          FOMO isn't just annoying---it has measurable effects on mental health:
        </p>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Of young adults experience FOMO regularly' },
            { value: 2.5, suffix: 'x', label: 'Higher risk of depression with chronic FOMO' },
            { value: 35, suffix: '', label: 'Daily phone checks driven by FOMO' },
          ]}
          source="Psychology of Popular Media, 2021; Journal of Adolescence, 2020"
        />

        <p className="mt-6 mb-6">
          A landmark 2018 study found that limiting social media use to 30 minutes per day for three weeks significantly reduced FOMO, loneliness, and depression <Citation id="2" index={2} source="Journal of Social and Clinical Psychology" year="2018" tier={1} />. The effect was strongest in participants who reported high FOMO at baseline.
        </p>
        <p className="mb-6">
          Chronic FOMO also correlates with poor sleep, difficulty concentrating, and lower academic or work performance. The constant distraction fragments attention and makes it hard to engage deeply with anything.
        </p>

        <h2 id="breaking-cycle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Break the FOMO Cycle
        </h2>
        <p className="mb-6">
          The good news: FOMO is a learned response, which means it can be unlearned. Here's how:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'awareness',
              title: '1. Recognize the pattern',
              content: (
                <p>Notice when you feel FOMO. Name it: "I'm feeling left out." This creates distance between the feeling and your reaction. Awareness weakens the automatic urge to check your phone.</p>
              ),
            },
            {
              id: 'reality-check',
              title: '2. Reality-check the story',
              content: (
                <p>Ask yourself: 'Am I actually missing out, or does it just feel that way?" Usually, what you see online is a curated slice of someone's life. You're not missing the full picture---just a performance.</p>
              ),
            },
            {
              id: 'gratitude',
              title: '3. Practice gratitude for what you have',
              content: (
                <p>FOMO is about absence. Gratitude shifts focus to presence. Research shows that people who regularly practice gratitude experience less FOMO <Citation id="7" index={7} source="Mindfulness" year="2021" tier={1} />. Write down three things you're grateful for daily.</p>
              ),
            },
            {
              id: 'limit-use',
              title: '4. Set time limits',
              content: (
                <p>Use screen time tools to cap social media at 30 minutes to 1 hour per day. Studies show that reducing use directly reduces FOMO, even if you don't quit entirely.</p>
              ),
            },
            {
              id: 'curate',
              title: '5. Curate your feed',
              content: (
                <p>Unfollow accounts that trigger FOMO---especially people you don't know well or influencers whose lives seem impossibly glamorous. Your feed should support your well-being, not undermine it.</p>
              ),
            },
            {
              id: 'be-present',
              title: '6. Practice being present',
              content: (
                <p>When you're with people or doing something you enjoy, put your phone away. The more you practice presence, the less FOMO has power. Being fully engaged is the antidote to FOMO.</p>
              ),
            },
            {
              id: 'accept',
              title: '7. Accept that you will miss things',
              content: (
                <p>You cannot be everywhere or do everything. Missing out is part of life. The goal isn't to eliminate missing out---it's to be okay with it. This is a mindset shift, not a behavior change.</p>
              ),
            },
          ]}
        />

        <h2 id="jomo" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          From FOMO to JOMO
        </h2>
        <p className="mb-6">
          There's a growing movement toward <strong>JOMO</strong>---the Joy of Missing Out. JOMO means choosing presence over constant connection. It means being content with where you are and what you're doing, without needing to know what everyone else is doing.
        </p>
        <p className="mb-6">
          JOMO doesn't mean becoming a hermit. It means reclaiming your attention and deciding intentionally where to invest it. Research shows that people who cultivate JOMO report higher life satisfaction and lower anxiety <Citation id="6" index={6} source="Cyberpsychology, Behavior, and Social Networking" year="2022" tier={1} />.
        </p>

        <QuoteBlock
          quote="The only way to deal with FOMO is to stop trying to be everywhere and accept that being fully present in one place is more valuable than being partially present in a hundred places."
          attribution="Cal Newport"
          role="Author and Computer Science Professor"
          source="Digital Minimalism"
        />

        <ArticleCallout variant="key-takeaway" title="The Path Forward">
          <p>FOMO thrives on comparison and scarcity. The antidote is presence and gratitude. Limit your exposure to FOMO triggers, practice being where you are, and accept that you can't do everything. Missing out is inevitable. Anxiety about missing out is optional.</p>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(5),
    slug: 'instagram-tiktok-body-image-mental-health',
    title: 'Instagram, TikTok, and Body Image: The Visual Platform Problem',
    description: 'How image-focused social media platforms affect body image, self-esteem, and eating behaviors, and what you can do to protect yourself.',
    image: "/images/articles/cat10/cover-005.svg",
    category: CATEGORY_DIGITAL_LIFE,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Body Image', 'Eating Disorders', 'Social Media', 'Self-Esteem'],
    summary: 'Instagram and TikTok create a visual comparison trap where you measure your unfiltered body against hundreds of edited, filtered images that platforms reward with engagement. Just 30 minutes of Instagram use can significantly worsen body dissatisfaction in young women. Research shows 88% compare their bodies on these platforms, with image-heavy apps uniquely predicting eating disorder symptoms, drive for thinness, and body dysmorphia—effects that text-based platforms don\'t produce.',
    keyFacts: [
      { text: 'Just 30 minutes of Instagram use significantly worsens body dissatisfaction in young women through appearance comparison', citationIndex: 4 },
      { text: '88% of young women compare their bodies on Instagram, with 52% reporting worse feelings after 30 minutes of scrolling', citationIndex: 2 },
      { text: '90% of influencer photos are edited or filtered, creating fundamentally unfair comparisons to real bodies', citationIndex: 7 },
      { text: 'Using Instagram 2+ hours daily increases eating disorder risk 3.2 times compared to under 30 minutes daily', citationIndex: 1 },
      { text: 'Teaching media literacy to recognize editing and filters reduces body dissatisfaction by 40% in controlled trials', citationIndex: 9 },
    ],
    sparkMoment: 'You\'re comparing your real, unedited body to images that have been digitally altered for hours—the comparison isn\'t just unfair, it\'s impossible.',
    practicalExercise: {
      title: 'Detox Your Visual Feed: Body-Positive Curation',
      steps: [
        { title: 'Audit Your Feed', description: 'Scroll through your Instagram and TikTok follows. For each account, ask: "Does this make me feel good or bad about my body?" Be honest. Screenshot accounts that trigger comparison.' },
        { title: 'Ruthless Unfollowing', description: 'Unfollow every account that makes you feel inadequate about your appearance. This includes influencers, fitness accounts, and even friends whose posts consistently trigger body shame. Your mental health outweighs social niceties.' },
        { title: 'Follow Body Diversity', description: 'Actively seek accounts showing diverse body types, body-positive content, and non-appearance-focused topics. Expose your brain to varied representations of normal, not just filtered ideals.' },
        { title: 'Stop Editing Your Own Photos', description: 'Commit to posting only unedited photos for one month. Research shows selfie editing increases body dissatisfaction and eating disorder risk. Practice accepting your real appearance as you document your life.' },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find an Eating Disorder Specialist',
    },
    citations: [
      {
        id: '1',
        text: 'The association between social media use and eating concerns among U.S. young adults',
        source: 'Journal of the Academy of Nutrition and Dietetics',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jand.2020.03.011',
        tier: 1,
      },
      {
        id: '2',
        text: 'Instagram use and body image concerns among young women: The roles of appearance comparison and self-objectification',
        source: 'Body Image',
        year: '2021',
        link: 'https://doi.org/10.1016/j.bodyim.2021.02.008',
        tier: 1,
      },
      {
        id: '3',
        text: 'Selfie editing and photo investment behaviors as predictors of body dissatisfaction and eating disorder pathology',
        source: 'International Journal of Eating Disorders',
        year: '2022',
        link: 'https://doi.org/10.1002/eat.23685',
        tier: 1,
      },
      {
        id: '4',
        text: "The impact of Instagram on young women\'s body image: An experimental investigation",
        source: 'Body Image',
        year: '2019',
        link: 'https://doi.org/10.1016/j.bodyim.2019.08.001',
        tier: 1,
      },
      {
        id: '5',
        text: 'TikTok and eating disorder content: A systematic review',
        source: 'International Journal of Eating Disorders',
        year: '2023',
        link: 'https://doi.org/10.1002/eat.23912',
        tier: 1,
      },
      {
        id: '6',
        text: 'Fitspiration on social media: A content analysis of gendered images',
        source: 'Journal of Health Psychology',
        year: '2018',
        link: 'https://doi.org/10.1177/1359105316639436',
        tier: 1,
      },
      {
        id: '7',
        text: "The effect of Instagram filters on young women\'s self-esteem",
        source: 'Computers in Human Behavior',
        year: '2022',
        link: 'https://doi.org/10.1016/j.chb.2022.107238',
        tier: 1,
      },
      {
        id: '8',
        text: 'Body image and social media: A review',
        source: 'Current Psychiatry Reports',
        year: '2021',
        link: 'https://doi.org/10.1007/s11920-021-01240-9',
        tier: 1,
      },
      {
        id: '9',
        text: 'Social media literacy intervention reduces body dissatisfaction: A randomized controlled trial',
        source: 'Psychology of Popular Media',
        year: '2023',
        link: 'https://doi.org/10.1037/ppm0000435',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Instagram and TikTok are image factories. Every photo is filtered, edited, and optimized. Every video is shot from the best angle. The platforms reward visual perfection, and your brain compares your unfiltered body to everyone else's highlight reel. This is the visual platform problem.
          </p>
          <p className="mb-6">
            Research shows that just 30 minutes of Instagram use can significantly worsen body dissatisfaction in young women <Citation id="4" index={4} source="Body Image" year="2019" tier={1} />. The effect is driven by comparison, idealization, and the illusion that what you see is normal. It's not.
          </p>
        </div>

        <h2 id="why-visual-platforms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Visual Platforms Are Different
        </h2>
        <p className="mb-6">
          Text-based platforms like Twitter or Reddit don't show the same body image effects. The difference is obvious: Instagram and TikTok are built around photos and videos of people. You're constantly exposed to others' appearances, and the algorithms prioritize content that gets engagement---which means visually appealing content rises to the top.
        </p>
        <p className="mb-6">
          A 2021 review in <em>Current Psychiatry Reports</em> found that image-heavy platforms uniquely predict body dissatisfaction, drive for thinness, and symptoms of eating disorders, even after controlling for overall social media use <Citation id="8" index={8} source="Current Psychiatry Reports" year="2021" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 88, suffix: '%', label: 'Of young women compare their bodies on Instagram' },
            { value: 52, suffix: '%', label: 'Report body dissatisfaction after 30 min of scrolling' },
            { value: 3, suffix: 'x', label: 'Increased risk of eating disorder symptoms' },
          ]}
          source="Body Image, 2021; International Journal of Eating Disorders, 2022"
        />

        <h2 id="comparison-machine" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Comparison Machine
        </h2>
        <p className="mb-6">
          Instagram and TikTok are optimized for <strong>appearance-based social comparison</strong>. You see hundreds of bodies per day, most of which are filtered, posed, or edited. Your brain treats this as the norm and judges your body against it.
        </p>
        <p className="mb-6">
          An experimental study found that women who spent just 10 minutes browsing "fitspiration" accounts (fitness influencers) showed immediate increases in body dissatisfaction and negative mood compared to a control group <Citation id="6" index={6} source="Journal of Health Psychology" year="2018" tier={1} />. The effect was strongest in women who already had body image concerns.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>Research shows that 90% of Instagram photos posted by influencers are edited or filtered. You're comparing your real, unedited body to images that have been digitally altered. The comparison is fundamentally unfair.</p>
        </ArticleCallout>

        <h2 id="filters-editing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Filters and Editing: The New Normal
        </h2>
        <p className="mb-6">
          Filters do more than smooth skin. They reshape faces, enlarge eyes, slim noses, and alter body proportions. A 2022 study found that regular use of Instagram filters predicts increases in body dissatisfaction over time <Citation id="7" index={7} source="Computers in Human Behavior" year="2022" tier={1} />.
        </p>
        <p className="mb-6">
          The problem compounds when you start editing your own photos. Research shows that people who frequently edit selfies show higher rates of eating disorder symptoms and body dysmorphia <Citation id="3" index={3} source="International Journal of Eating Disorders" year="2022" tier={1} />. You create an idealized version of yourself, then feel disappointed when you look in the mirror and see your real face.
        </p>

        <ComparisonTable
          title="Unfiltered vs. Filtered Reality"
          columns={['Aspect', 'Real Life', 'Filtered Content']}
          items={[
            { feature: 'Skin texture', values: ['Pores, lines, variation', 'Smooth, airbrushed'] },
            { feature: 'Body shape', values: ['Natural proportions', 'Digitally altered curves'] },
            { feature: 'Lighting', values: ['Whatever is available', 'Optimized, professional'] },
            { feature: 'Effort required', values: ['None', '30+ min of editing'] },
            { feature: 'Represents reality', values: [true, false] },
          ]}
          highlightColumn={1}
        />

        <h2 id="tiktok-problem" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          TikTok's Unique Impact
        </h2>
        <p className="mb-6">
          TikTok introduces a new layer: video. You're not just seeing static images; you're watching bodies in motion, often performing dances or challenges that emphasize appearance. The platform's algorithm learns what you watch and serves more of it, creating echo chambers of body-focused content.
        </p>
        <p className="mb-6">
          A 2023 systematic review found that TikTok exposes users to significant amounts of eating disorder content, including pro-anorexia ("pro-ana") material, "what I eat in a day" videos that normalize restriction, and before-and-after weight loss transformations <Citation id="5" index={5} source="International Journal of Eating Disorders" year="2023" tier={1} />.
        </p>
        <p className="mb-6">
          Concerningly, the algorithm often recommends this content to young users without them seeking it out. Once you watch one video, you're likely to see many more.
        </p>

        <ArticleCallout variant="warning">
          <p><strong>Warning Signs of Eating Disorder Content:</strong> Videos that glorify extreme thinness, track calories obsessively, promote fasting or purging, or frame disordered eating as inspirational ("thinspiration"). If you see this content, report it and use "Not Interested" to train the algorithm away from it.</p>
        </ArticleCallout>

        <h2 id="who-most-affected" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Is Most Affected?
        </h2>
        <p className="mb-6">
          While anyone can experience body image issues from social media, certain groups are at higher risk:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Young women and girls</strong>---Research consistently shows stronger effects in this group, particularly ages 13-25.</li>
          <li><strong>People with existing body image concerns</strong>---If you already struggle with how you look, social media amplifies the problem.</li>
          <li><strong>LGBTQ+ youth</strong>---Particularly trans and gender-nonconforming individuals, who face unique appearance pressures and dysphoria triggers.</li>
          <li><strong>People with histories of eating disorders</strong>---Visual platforms can trigger relapse or worsen symptoms.</li>
        </ul>
        <p className="mb-6">
          A 2020 study found that young adults who used Instagram for more than 2 hours per day had a 3.2 times higher risk of developing disordered eating compared to those who used it less than 30 minutes per day <Citation id="1" index={1} source="Journal of the Academy of Nutrition and Dietetics" year="2020" tier={1} />.
        </p>

        <h2 id="what-you-can-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What You Can Do
        </h2>
        <p className="mb-6">
          You don't have to quit Instagram or TikTok entirely, but you do need to use them intentionally. Here's how:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'curate-feed',
              title: 'Curate your feed aggressively',
              content: (
                <p>Unfollow any account that makes you feel bad about your body. This includes influencers, brands, and even friends. Follow accounts that show diverse bodies, body-positive content, and non-appearance-focused topics. Your feed should support your mental health, not undermine it.</p>
              ),
            },
            {
              id: 'limit-time',
              title: 'Set time limits',
              content: (
                <p>Research shows that limiting Instagram to 30 minutes per day reduces body dissatisfaction. Use built-in screen time tools to enforce this. The less exposure, the less comparison.</p>
              ),
            },
            {
              id: 'no-selfie-editing',
              title: 'Stop editing your own photos',
              content: (
                <p>Studies show that editing your own selfies increases body dissatisfaction and eating disorder risk. Post unedited photos or don't post at all. The more you practice accepting your real appearance, the easier it gets.</p>
              ),
            },
            {
              id: 'notice-comparison',
              title: 'Notice when you compare',
              content: (
                <p>When you feel that pang of 'they look better than me," pause. Name it: "I'm comparing." Remind yourself: "This is edited. This isn't real." Awareness interrupts the automatic emotional response.</p>
              ),
            },
            {
              id: 'block-hashtags',
              title: 'Block triggering hashtags and sounds',
              content: (
                <p>On TikTok, use 'Not Interested' on videos that focus on weight, dieting, or appearance. Block hashtags like #thinspo, #whatieatinaday, or #weightloss. The algorithm will learn to show you less of this content.</p>
              ),
            },
            {
              id: 'media-literacy',
              title: 'Build media literacy',
              content: (
                <p>Learn to recognize editing, filters, and strategic posing. A 2023 randomized trial found that teaching young women to critically analyze Instagram images reduced body dissatisfaction by 40% <Citation id="9" index={9} source="Psychology of Popular Media" year="2023" tier={1} />. Knowing how the tricks work weakens their power.</p>
              ),
            },
            {
              id: 'real-life',
              title: 'Focus on real-life connections',
              content: (
                <p>Spend time with people who value you for more than your appearance. Engage in activities that use your body for what it can do, not how it looks. Movement, creativity, and connection are the antidotes to appearance fixation.</p>
              ),
            },
          ]}
        />

        <h2 id="when-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Help
        </h2>
        <p className="mb-6">
          If social media use is contributing to serious body image issues or eating disorder symptoms, professional help is important. Warning signs include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Obsessive thoughts about weight, food, or appearance</li>
          <li>Restricting food intake, purging, or excessive exercise</li>
          <li>Avoiding social situations because of body shame</li>
          <li>Spending hours editing photos or checking your appearance</li>
          <li>Feeling depressed or anxious after using Instagram or TikTok</li>
        </ul>
        <p className="mb-6">
          Therapists who specialize in eating disorders or body image can help. Cognitive-behavioral therapy (CBT) and acceptance and commitment therapy (ACT) both show strong evidence for treating body dissatisfaction.
        </p>

        <ArticleCallout variant="key-takeaway" title="The Bottom Line">
          <p>Instagram and TikTok are designed to keep you scrolling, and they do it by showing you idealized images that make you feel inadequate. The solution isn't to achieve the impossible standard---it's to recognize the game is rigged and refuse to play. Curate what you see, limit your time, and invest in real life.</p>
        </ArticleCallout>
      </>
    ),
  },
];
