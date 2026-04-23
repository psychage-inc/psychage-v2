/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DEPRESSION_GRIEF, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  BeforeAfter,
} from '../../../components/article/blocks';

export const seasonalPatternsArticlesB: Article[] = [
  {
    id: catId(46),
    slug: 'holiday-depression-most-wonderful-time-doesnt-feel-wonderful',
    status: 'published',
    title: `Holiday Depression: Why the "Most Wonderful Time" Doesn't Feel Wonderful`,
    description: "The pressure to feel joyful during holidays can make depression worse. Here's why holidays are hard for many people and how to navigate them.",
    image: '/images/articles/cat07/cover-046.svg',
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Holiday Depression', 'Depression', 'Stress', 'Coping'],
    summary: 'Holiday depression affects many people who struggle with the gap between cultural expectations of joy and their lived reality of grief, loneliness, or mental illness. This article explores why holidays trigger or worsen depression and offers practical strategies for navigating the season with self-compassion instead of forced cheerfulness.',
    keyFacts: [
      { text: 'Psychiatric emergency visits increase during holiday periods, particularly among people with existing mood disorders', citationIndex: 2 },
      { text: 'Social comparison intensifies holiday stress when reality does not match cultural ideals of perfect family gatherings', citationIndex: 3 },
      { text: 'Grief is magnified during holidays as empty chairs and absent loved ones become more visible', citationIndex: 4 },
      { text: 'Seasonal affective disorder often peaks during the winter holiday season, making forced cheerfulness feel particularly cruel', citationIndex: 2 },
      { text: 'Setting boundaries and lowering expectations are evidence-based strategies for reducing holiday-related distress', citationIndex: 5 },
    ],
    sparkMoment: 'Holiday depression is not about being ungrateful or cynical—it is about navigating genuine grief, loneliness, or illness in a culture that insists you should be feeling the opposite.',
    practicalExercise: {
      title: 'Create Your Holiday Survival Plan',
      steps: [
        { title: 'Identify your vulnerabilities', description: 'Write down which specific moments during the holidays tend to be hardest for you (e.g., Christmas morning alone, family dinners with conflict, seeing others celebrate).' },
        { title: 'Set realistic expectations', description: 'Release the idea of a "perfect" holiday. Define what a good-enough holiday looks like given your current mental health and circumstances.' },
        { title: 'Plan coping strategies', description: 'For each vulnerable moment you identified, write down one concrete coping action (e.g., call a friend, take a walk, allow yourself to cry, skip the event).' },
        { title: 'Communicate boundaries', description: 'Practice saying no to at least one holiday obligation that drains you. Use a simple script: "I appreciate the invite, but I need to take care of myself this year."' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Holiday Mood',
    },
    citations: [
      {
        id: '1',
        text: 'Holiday stress and depression: Survey of mental health professionals',
        source: 'Psychology Today Research',
        year: '2019',
        link: 'https://www.psychologytoday.com/holiday-stress-survey',
        tier: 3,
      },
      {
        id: '2',
        text: 'Seasonal patterns in psychiatric emergency visits during holidays',
        source: 'General Hospital Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1016/j.genhosppsych.2018.08.004',
        tier: 1,
      },
      {
        id: '3',
        text: 'Social comparison and holiday stress: Role of expectations',
        source: 'Journal of Social and Clinical Psychology',
        year: '2020',
        link: 'https://doi.org/10.1521/jscp.2020.39.08.678',
        tier: 1,
      },
      {
        id: '4',
        text: 'Grief and the holidays: Clinical recommendations',
        source: 'American Psychological Association',
        year: '2021',
        link: 'https://www.apa.org/topics/grief/holidays',
        tier: 3,
      },
      {
        id: '5',
        text: 'Managing holiday-related stress and depression',
        source: 'National Alliance on Mental Illness',
        year: '2021',
        link: 'https://www.nami.org/holidays-and-mental-health',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            For many people, the winter holidays aren't joyful---they're exhausting, lonely, or triggering. The cultural expectation to feel grateful, festive, and connected creates a painful contrast for those who are grieving, depressed, or isolated. And that contrast can deepen the darkness.
          </p>
          <p className="mb-6">
            Holiday depression is real, common, and understandable. This article explores why holidays are so hard for many people and offers practical strategies for getting through them <Citation id="5" index={5} source="National Alliance on Mental Illness" year="2021" tier={3} />.
          </p>
        </div>

        <h2 id="why-holidays-are-hard" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Holidays Trigger or Worsen Depression
        </h2>
        <p className="mb-6">
          Several factors converge during the holiday season to create a perfect storm for emotional distress <Citation id="2" index={2} source="General Hospital Psychiatry" year="2018" tier={1} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Unrealistic Expectations
        </h3>
        <p className="mb-6">
          Media, advertising, and cultural narratives paint holidays as times of perfect family gatherings, abundant joy, and magical experiences. When your reality doesn't match this ideal, the gap feels like failure <Citation id="3" index={3} source="Journal of Social and Clinical Psychology" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Grief and Loss
        </h3>
        <p className="mb-6">
          Holidays magnify the absence of people who are no longer in your life---due to death, divorce, estrangement, or distance. Empty chairs at the table feel emptier when everyone else is celebrating <Citation id="4" index={4} source="American Psychological Association" year="2021" tier={3} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Family Stress
        </h3>
        <p className="mb-6">
          For some, family gatherings aren't comforting---they're sites of conflict, criticism, old wounds, or dysfunction. Forced togetherness can reactivate painful dynamics.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Social Isolation
        </h3>
        <p className="mb-6">
          Not everyone has family or friends to celebrate with. Holidays can intensify loneliness, especially when the world around you seems to be gathering and connecting.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Financial Pressure
        </h3>
        <p className="mb-6">
          The expectation to buy gifts, travel, and host creates financial stress. For those struggling economically, this pressure can trigger shame and anxiety.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          6. Seasonal Affective Disorder (SAD)
        </h3>
        <p className="mb-6">
          For people with winter-pattern SAD, the holidays coincide with the worst of their seasonal depression. The forced cheerfulness feels particularly cruel.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Holiday depression isn't about being ungrateful or cynical. It's about navigating genuine grief, loneliness, or illness in a culture that insists you should be feeling the opposite.
          </p>
        </ArticleCallout>

        <h2 id="strategies-for-navigating-holidays" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Strategies for Navigating the Holidays with Depression
        </h2>
        <p className="mb-6">
          You can't eliminate all holiday stress, but you can reduce it and create space for your actual experience:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'lower-expectations',
              title: '1. Lower your expectations',
              content: (
                <div>
                  <p className="mb-2">You don't have to create a perfect holiday. You don't even have to enjoy it. The goal is to survive it with your well-being intact.</p>
                  <p className="mb-2">Release the idea of how it "should" be and focus on what's realistic given your current state.</p>
                  <p>Give yourself permission to have a quiet, simple, or even sad holiday if that's what you need.</p>
                </div>
              ),
            },
            {
              id: 'set-boundaries',
              title: '2. Set boundaries and say no',
              content: (
                <div>
                  <p className="mb-2">You are not obligated to attend every gathering, buy every gift, or fulfill every expectation.</p>
                  <p className="mb-2">It's okay to decline invitations, skip traditions that drain you, or leave events early.</p>
                  <p>Saying no to what harms you creates space to say yes to what helps you.</p>
                </div>
              ),
            },
            {
              id: 'create-new-traditions',
              title: '3. Create new traditions (or skip traditions entirely)',
              content: (
                <div>
                  <p className="mb-2">If old traditions feel painful (especially after loss), you don't have to keep doing them.</p>
                  <p className="mb-2">Create small, new rituals that feel meaningful to you---lighting a candle, watching a favorite movie, volunteering, spending time in nature.</p>
                  <p>It's also okay to treat the day like any other day. Not celebrating is a valid choice.</p>
                </div>
              ),
            },
            {
              id: 'plan-for-difficult-moments',
              title: '4. Plan for difficult moments',
              content: (
                <div>
                  <p className="mb-2">Identify when you're most vulnerable (e.g., being alone on Christmas morning, sitting at a table with a missing loved one) and plan coping strategies in advance.</p>
                  <p className="mb-2">This might mean having a friend on standby to call, scheduling a walk, or giving yourself permission to cry.</p>
                  <p>Anticipating pain doesn't make it worse---it helps you meet it prepared.</p>
                </div>
              ),
            },
            {
              id: 'limit-social-media',
              title: '5. Limit social media',
              content: (
                <div>
                  <p className="mb-2">Holiday social media is a highlight reel. Everyone's posting their best moments, not their fights, loneliness, or stress.</p>
                  <p>If scrolling makes you feel worse, take a break. Your mental health is more important than staying connected to curated joy.</p>
                </div>
              ),
            },
            {
              id: 'reach-out',
              title: "6. Reach out if you're alone",
              content: (
                <div>
                  <p className="mb-2">If you don't have people to spend the holidays with, you're not alone in that. Many others are in the same situation.</p>
                  <p className="mb-2">Look for community events, volunteer opportunities, or online gatherings for people spending holidays solo.</p>
                  <p>Crisis lines and support hotlines are also available on holidays if you need someone to talk to.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="supporting-someone-struggling" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Supporting Someone Who's Struggling During the Holidays
        </h2>
        <p className="mb-6">
          If someone you care about is having a hard time during the holidays:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Acknowledge their struggle:</strong> Don't try to cheer them up or insist they "get in the spirit." Validate that holidays can be hard.</li>
          <li><strong>Check in:</strong> A simple "thinking of you" text can mean a lot to someone who feels invisible.</li>
          <li><strong>Offer specific help:</strong> "Can I bring you dinner?" is better than "let me know if you need anything."</li>
          <li><strong>Don't pressure them to participate:</strong> Respect their boundaries if they decline invitations.</li>
          <li><strong>Include them without obligation:</strong> "We're having a low-key gathering. No pressure, but you're welcome anytime."</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            <strong>For people who are grieving:</strong> Don't avoid mentioning the person they lost. Saying "I've been thinking about [name] this season" acknowledges the absence and shows you remember. Silence can feel like erasure.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If holiday stress is triggering thoughts of self-harm or suicide, reach out for help immediately: call or text 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room.
        </p>
        <p className="mb-6">
          If you're dreading the holidays weeks in advance or if last year's holiday season significantly worsened your depression, consider talking to a therapist before the season begins. Preventive support can help you navigate it more safely.
        </p>
      </>
    ),
  },

  {
    id: catId(47),
    slug: 'anniversary-reactions-dates-trigger-emotional-waves',
    status: 'published',
    title: 'Anniversary Reactions: Why Certain Dates Trigger Emotional Waves',
    description: "Calendar dates can trigger powerful emotional reactions, even years after a traumatic or significant event. Here's why anniversary reactions happen and how to navigate them.",
    image: '/images/articles/cat07/cover-047.svg',
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anniversary Reactions', 'Grief', 'Trauma', 'Depression'],
    summary: 'Anniversary reactions are emotional, cognitive, and physical responses triggered by the calendar date of a significant loss or trauma. Your body can remember dates even when your conscious mind does not, producing sudden waves of grief, anxiety, or sadness that may seem to come from nowhere.',
    keyFacts: [
      { text: 'Anniversary reactions can occur years or even decades after the original event without indicating failed healing', citationIndex: 1 },
      { text: 'Implicit memory systems store emotional and sensory associations with dates separately from conscious factual memory', citationIndex: 3 },
      { text: 'Physical symptoms like fatigue, headaches, and digestive issues can manifest during anniversary periods even without emotional awareness', citationIndex: 4 },
      { text: 'Environmental cues such as seasonal changes, weather patterns, and sensory triggers can activate anniversary reactions unconsciously', citationIndex: 3 },
      { text: 'Anticipating and planning for difficult anniversary dates reduces the shock of sudden emotional waves', citationIndex: 5 },
    ],
    sparkMoment: 'Your body remembered, even if your conscious mind did not—anniversary reactions are not weakness, they are testimony to the significance of what you have experienced and lost.',
    practicalExercise: {
      title: 'Prepare for a Difficult Anniversary',
      steps: [
        { title: 'Mark the date', description: 'Add the anniversary to your calendar ahead of time. Knowing it is coming helps you prepare emotionally and reduces the shock of unexpected feelings.' },
        { title: 'Plan a meaningful ritual', description: 'Decide how you want to mark the day. This could be lighting a candle, visiting a meaningful place, writing a letter, or creating art. Rituals help externalize grief.' },
        { title: 'Clear your schedule', description: 'Avoid scheduling demanding tasks, important meetings, or social obligations on or around the anniversary. Give yourself permission to have space.' },
        { title: 'Arrange support', description: 'Reach out to someone who understands the significance of the date. Let them know you might need to talk or simply have company. Connection helps.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Anniversary Reactions',
    },
    citations: [
      {
        id: '1',
        text: 'Anniversary reactions in bereavement: A systematic review',
        source: 'Death Studies',
        year: '2019',
        link: 'https://doi.org/10.1080/07481187.2019.1626944',
        tier: 1,
      },
      {
        id: '2',
        text: 'Temporal patterns in PTSD symptoms: Anniversary phenomena',
        source: 'Journal of Traumatic Stress',
        year: '2018',
        link: 'https://doi.org/10.1002/jts.22298',
        tier: 1,
      },
      {
        id: '3',
        text: 'Implicit memory and anniversary reactions to trauma',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101865',
        tier: 1,
      },
      {
        id: '4',
        text: 'Grief and the body: Physiological responses to anniversary dates',
        source: 'Psychosomatic Medicine',
        year: '2017',
        link: 'https://doi.org/10.1097/PSY.0000000000000479',
        tier: 1,
      },
      {
        id: '5',
        text: 'Coping with anniversary reactions: Clinical guide',
        source: 'National Alliance for Grieving Children',
        year: '2021',
        link: 'https://www.childrengrieve.org/anniversary-reactions',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            A date on the calendar arrives, and suddenly you feel inexplicably sad, anxious, or disconnected---even if you can't immediately remember why. Then it hits you: it's the anniversary of a death, a breakup, a trauma, or another significant loss. Your body remembered, even if your conscious mind didn't.
          </p>
          <p className="mb-6">
            These are anniversary reactions---emotional, cognitive, and physical responses triggered by the calendar date of a past event <Citation id="1" index={1} source="Death Studies" year="2019" tier={1} />. This article explains why they happen and how to navigate them with compassion.
          </p>
        </div>

        <h2 id="what-are-anniversary-reactions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are Anniversary Reactions?
        </h2>
        <p className="mb-6">
          An anniversary reaction is a surge of grief, sadness, anxiety, or other difficult emotions that occurs around the anniversary of a significant event---typically a loss, trauma, or ending <Citation id="2" index={2} source="Journal of Traumatic Stress" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Common triggers include:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Death of a loved one</li>
          <li>Traumatic event (assault, accident, natural disaster)</li>
          <li>End of a significant relationship (divorce, breakup)</li>
          <li>Medical diagnosis or health crisis</li>
          <li>Major life transition (job loss, relocation)</li>
          <li>Birthdays or holidays associated with someone who died</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Anniversary reactions can happen even years or decades after the event. They don't mean you haven't 'moved on' or healed properly. They're a normal part of how memory and emotion intersect.
          </p>
        </ArticleCallout>

        <h2 id="why-they-happen" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Anniversary Reactions Happen
        </h2>
        <p className="mb-6">
          Anniversary reactions occur because of how the brain stores and retrieves memories <Citation id="3" index={3} source="Clinical Psychology Review" year="2020" tier={1} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Implicit Memory
        </h3>
        <p className="mb-6">
          Your body and unconscious mind can remember the date even when your conscious mind doesn't. Emotional and sensory memories are stored separately from explicit (factual) memories, which is why you might feel bad before you realize why.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Environmental Cues
        </h3>
        <p className="mb-6">
          Seasonal changes, weather patterns, smells, sounds, or other environmental factors associated with the original event can trigger memories. If a loved one died in autumn, the shift to cooler weather and shorter days might activate grief even without conscious awareness.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Unfinished Grief
        </h3>
        <p className="mb-6">
          Anniversary reactions can be more intense if grief or trauma was never fully processed. The anniversary becomes an opportunity for the psyche to revisit and work through what was left unresolved.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Social and Cultural Rituals
        </h3>
        <p className="mb-6">
          Anniversaries, birthdays, and holidays explicitly call attention to absence. Cultural rituals (visiting graves, lighting candles) can be comforting but also reactivate grief.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            Anniversary reactions can produce physical symptoms---fatigue, headaches, digestive issues, sleep disturbances---even without conscious emotional awareness. Your body carries the memory <Citation id="4" index={4} source="Psychosomatic Medicine" year="2017" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="signs-of-anniversary-reaction" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs You're Experiencing an Anniversary Reaction
        </h2>
        <p className="mb-6">
          Anniversary reactions manifest differently for everyone, but common signs include:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Emotional:</strong> Sudden sadness, irritability, anxiety, numbness, or emotional overwhelm</li>
          <li><strong>Cognitive:</strong> Intrusive memories, difficulty concentrating, feeling "off" without knowing why</li>
          <li><strong>Physical:</strong> Fatigue, body aches, sleep disruption, changes in appetite</li>
          <li><strong>Behavioral:</strong> Withdrawal, increased substance use, avoidance of reminders, compulsive activity</li>
        </ul>

        <h2 id="how-to-navigate" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Navigate Anniversary Reactions
        </h2>
        <p className="mb-6">
          You can't prevent anniversary reactions, but you can prepare for and move through them more gently <Citation id="5" index={5} source="National Alliance for Grieving Children" year="2021" tier={3} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Unhelpful Approaches',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I should be over this by now"</li>
                <li>Ignoring or suppressing the feelings</li>
                <li>Avoiding the date entirely</li>
                <li>"Why am I still affected by this?"</li>
                <li>Isolating and withdrawing completely</li>
              </ul>
            ),
          }}
          after={{
            title: 'Helpful Approaches',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"Grief doesn't follow a timeline"</li>
                <li>Allowing the feelings to surface</li>
                <li>Marking the date in a meaningful way</li>
                <li>"This reaction makes sense"</li>
                <li>Reaching out for support</li>
              </ul>
            ),
          }}
        />

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Practical Strategies
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Anticipate the date:</strong> Mark it on your calendar. Knowing it's coming reduces the shock of sudden emotional waves.</li>
          <li><strong>Plan a ritual:</strong> Light a candle, write a letter, visit a meaningful place, or create art. Rituals help externalize grief.</li>
          <li><strong>Clear your schedule:</strong> Don't plan demanding tasks or social obligations for that day. Give yourself space.</li>
          <li><strong>Connect with others who remember:</strong> Share memories with someone who knew the person or understands the significance of the date.</li>
          <li><strong>Be gentle with yourself:</strong> This is a day to practice self-compassion, not productivity.</li>
          <li><strong>Allow yourself to cry:</strong> Tears are not weakness. They're release.</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            <strong>If you don't consciously remember the date:</strong> Keep a log of your mood and symptoms. Over time, you may notice patterns that reveal anniversary reactions you weren't aware of.
          </p>
        </ArticleCallout>

        <h2 id="when-reactions-are-severe" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Anniversary Reactions Are Severe
        </h2>
        <p className="mb-6">
          For some people, especially those with unresolved trauma or complicated grief, anniversary reactions can be debilitating---triggering suicidal thoughts, flashbacks, or severe depression.
        </p>
        <p className="mb-6">
          <strong>Seek professional help if:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Anniversary reactions interfere with your ability to function</li>
          <li>You experience suicidal thoughts or self-harm urges</li>
          <li>The reaction lasts weeks beyond the anniversary date</li>
          <li>You're using substances to numb the pain</li>
        </ul>

        <p className="mb-6">
          Therapy---especially trauma-focused therapy or grief counseling---can help process what the anniversary is reactivating.
        </p>

        <h2 id="supporting-someone" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Supporting Someone Through an Anniversary Reaction
        </h2>
        <p className="mb-6">
          If someone you care about is approaching a difficult anniversary:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Remember the date:</strong> Send a message: "Thinking of you today."</li>
          <li><strong>Don't minimize:</strong> Avoid "They wouldn't want you to be sad' or "It's been X years."</li>
          <li><strong>Offer presence, not solutions:</strong> "I'm here if you want to talk, or if you just want company."</li>
          <li><strong>Ask what they need:</strong> Some people want to talk about the person; others want distraction. Follow their lead.</li>
        </ul>
      </>
    ),
  },

  {
    id: catId(48),
    slug: 'cyclothymia-chronic-mood-swings-without-bipolar',
    status: 'published',
    title: "Cyclothymia: Living with Chronic Mood Swings That Don't Meet Bipolar Criteria",
    description: "Cyclothymia is a lesser-known mood disorder characterized by persistent mood fluctuations that are less severe than bipolar but still impactful.",
    image: "/images/articles/cat07/cover-048.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Cyclothymia', 'Mood Disorders', 'Bipolar Spectrum', 'Mental Health'],
    summary: 'Cyclothymia is a chronic mood disorder characterized by persistent fluctuations between mild depression and mild hypomania lasting at least two years, with little stability in between. While less severe than bipolar I or II disorder, cyclothymia significantly impacts daily functioning and may progress to full bipolar disorder in some individuals.',
    keyFacts: [
      { text: 'Cyclothymia requires at least two years of persistent mood fluctuations with no more than two months of stable mood', citationIndex: 2 },
      { text: 'Approximately 0.4 to 1 percent of the population experiences cyclothymia, often beginning in adolescence or early adulthood', citationIndex: 3 },
      { text: 'Between 15 and 50 percent of people with cyclothymia eventually develop full bipolar I or II disorder', citationIndex: 4 },
      { text: 'Mood stabilizers like lithium and lamotrigine are first-line treatments, while antidepressants are generally avoided due to risk of triggering mood cycling', citationIndex: 6 },
      { text: 'Consistent sleep-wake schedules and daily routine structure are critical for mood stability in cyclothymia', citationIndex: 7 },
    ],
    sparkMoment: 'Cyclothymia is not just being moody or temperamental—it is living on a persistent mood roller coaster that makes it difficult to trust your emotions or plan for the future.',
    practicalExercise: {
      title: 'Build a Mood Stability Routine',
      steps: [
        { title: 'Establish consistent sleep times', description: 'Set the same bedtime and wake time every day, including weekends. Sleep disruption is a major trigger for mood cycling in cyclothymia.' },
        { title: 'Create a daily structure', description: 'Schedule regular times for meals, exercise, work, and social contact. Routine helps regulate circadian rhythms and stabilize mood.' },
        { title: 'Track your mood patterns', description: 'Use a mood chart or app to log your daily mood, energy, sleep, and activities. Over time, patterns will emerge that reveal your triggers.' },
        { title: 'Identify early warning signs', description: 'Review your mood data to recognize subtle shifts that precede full mood swings. Catching early signs allows you to intervene before symptoms worsen.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Mood Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Cyclothymic disorder: A critical review',
        source: 'Bipolar Disorders',
        year: '2019',
        link: 'https://doi.org/10.1111/bdi.12799',
        tier: 1,
      },
      {
        id: '2',
        text: 'DSM-5-TR diagnostic criteria for cyclothymic disorder',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '3',
        text: 'Prevalence and clinical characteristics of cyclothymia',
        source: 'Journal of Affective Disorders',
        year: '2018',
        link: 'https://doi.org/10.1016/j.jad.2018.02.074',
        tier: 1,
      },
      {
        id: '4',
        text: 'Cyclothymia and bipolar disorder: Developmental progression',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2020.19101064',
        tier: 1,
      },
      {
        id: '5',
        text: 'Treatment of cyclothymic disorder: Current evidence',
        source: 'CNS Drugs',
        year: '2019',
        link: 'https://doi.org/10.1007/s40263-019-00662-4',
        tier: 1,
      },
      {
        id: '6',
        text: 'Mood stabilizers in cyclothymia: Clinical trial evidence',
        source: 'Bipolar Disorders',
        year: '2017',
        link: 'https://doi.org/10.1111/bdi.12543',
        tier: 1,
      },
      {
        id: '7',
        text: 'Psychotherapy for cyclothymic disorder: Systematic review',
        source: 'Journal of Clinical Psychology',
        year: '2020',
        link: 'https://doi.org/10.1002/jclp.22985',
        tier: 1,
      },
      {
        id: '8',
        text: 'Understanding cyclothymia: A guide for patients and families',
        source: 'Depression and Bipolar Support Alliance',
        year: '2021',
        link: 'https://www.dbsalliance.org/cyclothymia',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Some people live on a mood roller coaster---not the extreme highs and lows of bipolar disorder, but a persistent, low-grade oscillation between mild depression and mild hypomania. Good weeks followed by bad weeks, with little stability in between. This is cyclothymia.
          </p>
          <p className="mb-6">
            Cyclothymic disorder is a chronic mood condition on the bipolar spectrum, characterized by mood swings that are less severe than bipolar I or II but more persistent and disruptive than normal mood variation <Citation id="1" index={1} source="Bipolar Disorders" year="2019" tier={1} />. This article explains what cyclothymia is, how it's diagnosed, and how it's treated.
          </p>
        </div>

        <h2 id="what-is-cyclothymia" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Cyclothymic Disorder?
        </h2>
        <p className="mb-6">
          Cyclothymia (also called cyclothymic disorder) is defined by at least two years (one year in children/adolescents) of numerous periods of hypomanic symptoms and depressive symptoms that don't meet full criteria for hypomanic or major depressive episodes <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />.
          </p>
        <p className="mb-6">
          In other words: you experience mood swings that are clearly abnormal, but they're not severe enough to qualify as full-blown bipolar disorder.
        </p>

        <ComparisonTable
          title="Cyclothymia vs. Bipolar Disorder"
          columns={['Feature', 'Cyclothymia', 'Bipolar II', 'Bipolar I']}
          items={[
            { feature: 'High periods', values: ['Hypomanic symptoms (not full hypomania)', 'Hypomania (≥4 days)', 'Mania (≥7 days)'] },
            { feature: 'Low periods', values: ['Depressive symptoms (not full MDE)', 'Major depressive episodes', 'Major depressive episodes (optional)'] },
            { feature: 'Duration', values: ['Chronic (≥2 years)', 'Episodic', 'Episodic'] },
            { feature: 'Stability', values: ['Rarely stable >2 months', 'Periods of stability between episodes', 'Periods of stability between episodes'] },
            { feature: 'Severity', values: ['Mild to moderate', 'Moderate to severe', 'Severe'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Symptoms of Cyclothymia
        </h2>
        <p className="mb-6">
          People with cyclothymia alternate between periods of elevated mood (hypomanic symptoms) and low mood (depressive symptoms), with brief periods of normal mood in between <Citation id="3" index={3} source="Journal of Affective Disorders" year="2018" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Hypomanic Symptoms (Highs)
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Elevated, expansive, or irritable mood</li>
          <li>Increased energy and activity</li>
          <li>Decreased need for sleep (but not severe insomnia)</li>
          <li>Racing thoughts, rapid speech</li>
          <li>Inflated self-esteem or confidence</li>
          <li>Increased goal-directed activity or restlessness</li>
          <li>Impulsive decisions (spending, travel, starting projects)</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Depressive Symptoms (Lows)
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Low mood, sadness, or emptiness</li>
          <li>Fatigue or low energy</li>
          <li>Difficulty concentrating or making decisions</li>
          <li>Loss of interest or pleasure in activities</li>
          <li>Sleep disturbances (insomnia or hypersomnia)</li>
          <li>Feelings of worthlessness or hopelessness</li>
          <li>Irritability or social withdrawal</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            The key feature of cyclothymia is <strong>chronicity</strong>. It's not occasional mood swings---it's a persistent pattern of fluctuation lasting at least two years, with no more than two months of stable mood.
          </p>
        </ArticleCallout>

        <h2 id="who-gets-cyclothymia" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Gets Cyclothymia?
        </h2>
        <p className="mb-6">
          Cyclothymia affects an estimated 0.4--1% of the population, often beginning in adolescence or early adulthood <Citation id="3" index={3} source="Journal of Affective Disorders" year="2018" tier={1} />. It's equally common in men and women.
        </p>
        <p className="mb-6">
          <strong>Risk factors include:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Family history:</strong> Having a close relative with bipolar disorder or cyclothymia increases risk</li>
          <li><strong>Early onset:</strong> Symptoms often start in the teenage years</li>
          <li><strong>Temperament:</strong> People with naturally high emotional reactivity or energy may be more vulnerable</li>
        </ul>

        <h2 id="diagnosis-challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Cyclothymia Is Often Misdiagnosed
        </h2>
        <p className="mb-6">
          Cyclothymia is frequently missed or misdiagnosed because:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Symptoms are less dramatic:</strong> People may not seek help because the highs feel good and the lows are tolerable</li>
          <li><strong>It's mistaken for personality:</strong> Chronic mood swings may be attributed to being "moody" or "temperamental"</li>
          <li><strong>Overlap with other conditions:</strong> Can be confused with borderline personality disorder, ADHD, or recurrent depression</li>
          <li><strong>Patients present during lows:</strong> When seeking help, people often present during depressive phases, leading to a depression-only diagnosis</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            <strong>Important:</strong> About 15--50% of people with cyclothymia eventually develop full bipolar I or II disorder <Citation id="4" index={4} source="American Journal of Psychiatry" year="2020" tier={1} />. This doesn't mean cyclothymia always progresses, but it underscores the importance of monitoring and treatment.
          </p>
        </ArticleCallout>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment for Cyclothymic Disorder
        </h2>
        <p className="mb-6">
          Treatment aims to stabilize mood swings, reduce symptom severity, and prevent progression to full bipolar disorder <Citation id="5" index={5} source="CNS Drugs" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Medication
        </h3>
        <p className="mb-6">
          Mood stabilizers are the first-line pharmacological treatment for cyclothymia <Citation id="6" index={6} source="Bipolar Disorders" year="2017" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Lithium:</strong> Classic mood stabilizer, well-studied for bipolar spectrum disorders</li>
          <li><strong>Lamotrigine:</strong> May be particularly helpful for depressive symptoms</li>
          <li><strong>Valproate or carbamazepine:</strong> Alternative mood stabilizers</li>
          <li><strong>Atypical antipsychotics:</strong> Sometimes used (e.g., quetiapine, aripiprazole)</li>
        </ul>

        <p className="mb-6">
          <strong>Antidepressants are generally avoided</strong> unless combined with a mood stabilizer, as they can trigger hypomanic symptoms or increase mood cycling.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Psychotherapy
        </h3>
        <p className="mb-6">
          Therapy is essential for learning to manage mood fluctuations and prevent relapse <Citation id="7" index={7} source="Journal of Clinical Psychology" year="2020" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Cognitive-Behavioral Therapy (CBT):</strong> Helps identify triggers, challenge mood-driven thoughts, and develop coping strategies</li>
          <li><strong>Interpersonal and Social Rhythm Therapy (IPSRT):</strong> Focuses on stabilizing daily routines (sleep, meals, social activity) to regulate mood</li>
          <li><strong>Psychoeducation:</strong> Understanding cyclothymia, recognizing early warning signs, and knowing when to seek help</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Lifestyle Modifications
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Sleep hygiene:</strong> Consistent sleep-wake times are critical for mood stability</li>
          <li><strong>Avoid substances:</strong> Alcohol and stimulants can destabilize mood</li>
          <li><strong>Routine structure:</strong> Regular daily routines (meals, exercise, social contact) help regulate circadian rhythms</li>
          <li><strong>Stress management:</strong> Chronic stress can trigger mood cycling</li>
        </ul>

        <h2 id="living-with-cyclothymia" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living with Cyclothymia
        </h2>
        <p className="mb-6">
          Cyclothymia can feel exhausting---the constant ups and downs make it hard to trust your own emotions or plan for the future. But with treatment, many people achieve greater stability and quality of life <Citation id="8" index={8} source="Depression and Bipolar Support Alliance" year="2021" tier={3} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Self-Management Strategies
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Track your moods:</strong> Use a mood chart or app to identify patterns and early warning signs</li>
          <li><strong>Know your triggers:</strong> Sleep deprivation, stress, seasonal changes, or relationship conflict may predictably trigger swings</li>
          <li><strong>Build a support network:</strong> Educate close friends/family about cyclothymia so they can recognize shifts and offer support</li>
          <li><strong>Don't make big decisions during extremes:</strong> Wait until you're in a more stable phase to make major life changes</li>
        </ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you recognize a pattern of chronic mood swings that interfere with your relationships, work, or well-being, talk to a mental health provider. Cyclothymia is treatable, and early intervention can prevent it from worsening.
        </p>
        <p className="mb-6">
          If you experience suicidal thoughts during a low period, seek immediate help: call or text 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room.
        </p>
      </>
    ),
  },

  {
    id: catId(49),
    slug: 'tracking-your-mood-tools-techniques-pattern-recognition',
    status: 'published',
    title: 'Tracking Your Mood: Tools and Techniques for Pattern Recognition',
    description: 'Mood tracking is a powerful self-awareness tool that helps you identify triggers, patterns, and early warning signs of mood shifts.',
    image: "/images/articles/cat07/cover-049.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mood Tracking', 'Self-Monitoring', 'Depression', 'Mental Health'],
    summary: 'Mood tracking is a self-monitoring practice that creates an objective record of your emotional patterns, triggers, and progress. By consistently logging mood, energy, sleep, and activities, you can identify what helps and what harms, measure treatment effectiveness, and catch early warning signs before full depressive episodes develop.',
    keyFacts: [
      { text: 'Self-monitoring mood improves depression treatment outcomes by increasing awareness and identifying triggers', citationIndex: 1 },
      { text: 'After two to four weeks of consistent tracking, meaningful patterns become visible in time of day, sleep correlation, and activity associations', citationIndex: 3 },
      { text: 'Mood tracking apps can reduce depressive symptoms when used consistently, though they work best as a supplement to professional treatment', citationIndex: 2 },
      { text: 'The biggest challenge is maintaining the habit—pairing tracking with an existing daily routine and setting reminders increases adherence', citationIndex: 4 },
      { text: 'Sharing mood charts with therapists helps them see what happens between sessions and tailor interventions to specific triggers', citationIndex: 1 },
    ],
    sparkMoment: 'Depression distorts memory, making bad days feel endless and good moments disappear—mood tracking creates an objective record that cuts through the fog.',
    practicalExercise: {
      title: 'Start Your Mood Tracking Practice',
      steps: [
        { title: 'Choose your tracking method', description: 'Pick a tool that fits your lifestyle: a simple notebook, a spreadsheet, or a mood tracking app. The best tool is the one you will actually use consistently.' },
        { title: 'Define your core metrics', description: 'Start with 3 to 5 data points: mood (1 to 10 scale), energy (1 to 10 scale), sleep hours, and key activities. You can add more later.' },
        { title: 'Set a daily reminder', description: 'Schedule the same time each day to log your mood—ideally before bed when you can reflect on the full day. Pair it with an existing habit like brushing teeth.' },
        { title: 'Review weekly', description: 'Every week, look at the past seven days of data. Ask: What patterns do I see? Are there correlations between sleep and mood? Does exercise help? This reinforces the value of tracking.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Try the Mood Journal',
    },
    citations: [
      {
        id: '1',
        text: 'Self-monitoring in depression treatment: Meta-analysis',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.03.042',
        tier: 1,
      },
      {
        id: '2',
        text: 'Mobile apps for mood tracking: Systematic review and evaluation',
        source: 'JMIR Mental Health',
        year: '2019',
        link: 'https://doi.org/10.2196/11761',
        tier: 1,
      },
      {
        id: '3',
        text: 'Daily mood monitoring and bipolar disorder outcomes',
        source: 'Bipolar Disorders',
        year: '2018',
        link: 'https://doi.org/10.1111/bdi.12648',
        tier: 1,
      },
      {
        id: '4',
        text: 'The therapeutic benefits of journaling and mood logging',
        source: 'Psychotherapy Research',
        year: '2019',
        link: 'https://doi.org/10.1080/10503307.2019.1631501',
        tier: 1,
      },
      {
        id: '5',
        text: 'Mood tracking: Clinical practice guidelines',
        source: 'American Psychiatric Association',
        year: '2021',
        link: 'https://www.psychiatry.org/mood-tracking',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Depression distorts your memory. Bad days feel endless, and good moments disappear. Over time, it's easy to lose track of patterns---what makes you feel better, what makes you worse, and whether you're actually improving. Mood tracking creates an objective record that cuts through the fog.
          </p>
          <p className="mb-6">
            Research shows that self-monitoring mood improves treatment outcomes, helps identify triggers, and increases self-awareness <Citation id="1" index={1} source="Journal of Affective Disorders" year="2020" tier={1} />. This article explains how to track your mood effectively, what tools to use, and how to interpret the patterns you find.
          </p>
        </div>

        <h2 id="why-track-mood" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Track Your Mood?
        </h2>
        <p className="mb-6">
          Mood tracking serves multiple purposes <Citation id="4" index={4} source="Psychotherapy Research" year="2019" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Identify triggers:</strong> Notice what events, people, activities, or thoughts precede mood shifts</li>
          <li><strong>Recognize patterns:</strong> See cycles (e.g., worse in mornings, better after exercise, seasonal dips)</li>
          <li><strong>Measure progress:</strong> Track whether treatment (therapy, medication, lifestyle changes) is working</li>
          <li><strong>Catch early warning signs:</strong> Detect subtle shifts before a full depressive episode develops</li>
          <li><strong>Communicate with providers:</strong> Share data with your therapist or doctor to inform treatment decisions</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Mood tracking isn't about achieving perfect days or judging yourself for bad ones. It's about gathering data so you can make informed decisions about your mental health.
          </p>
        </ArticleCallout>

        <h2 id="what-to-track" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What to Track
        </h2>
        <p className="mb-6">
          The more data points you track, the more patterns you'll see---but start simple. You can always add more later <Citation id="5" index={5} source="American Psychiatric Association" year="2021" tier={3} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Core Metrics
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Mood rating (1--10 scale):</strong> How you felt overall that day</li>
          <li><strong>Energy level (1--10 scale):</strong> Physical and mental energy</li>
          <li><strong>Sleep hours:</strong> Total sleep time and quality</li>
          <li><strong>Activities:</strong> What you did that day (exercise, social contact, work, hobbies)</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Optional Add-Ons
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Anxiety level (1--10 scale):</strong> If anxiety is a factor for you</li>
          <li><strong>Medication adherence:</strong> Did you take your meds as prescribed?</li>
          <li><strong>Substance use:</strong> Alcohol, cannabis, or other substances</li>
          <li><strong>Symptoms:</strong> Specific symptoms like crying, irritability, suicidal thoughts</li>
          <li><strong>Stressful events:</strong> Major stressors or conflicts</li>
          <li><strong>Gratitude or positives:</strong> One good thing from the day (optional, skip if it feels forced)</li>
        </ul>

        <h2 id="tools-for-mood-tracking" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Tools and Methods for Mood Tracking
        </h2>
        <p className="mb-6">
          Choose a method that fits your lifestyle and preferences. The best tool is the one you'll actually use consistently.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Pen and Paper
        </h3>
        <p className="mb-6">
          <strong>Pros:</strong> Simple, no technology needed, can be tailored to your needs<br />
          <strong>Cons:</strong> Harder to visualize trends, easy to lose or forget
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong> Use a notebook, bullet journal, or printable mood chart. Create columns for date, mood, sleep, activities, and notes.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Spreadsheet (Excel, Google Sheets)
        </h3>
        <p className="mb-6">
          <strong>Pros:</strong> Can create charts and graphs, analyze data over time, customizable<br />
          <strong>Cons:</strong> Requires setup, not as mobile-friendly
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong> Create columns for each metric you want to track. Use conditional formatting to color-code mood levels. Create a line graph to visualize trends.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Mood Tracking Apps
        </h3>
        <p className="mb-6">
          <strong>Pros:</strong> Convenient, visual, often include reminders and insights<br />
          <strong>Cons:</strong> Privacy concerns, some charge fees, may have limited customization
        </p>
        <p className="mb-6">
          <strong>Popular options:</strong>
        </p>

        <ComparisonTable
          title="Mood Tracking Apps Comparison"
          columns={['App', 'Best For', 'Cost']}
          items={[
            { feature: 'Daylio', values: ['Simple, icon-based tracking', 'Free (premium upgrade available)'] },
            { feature: 'Moodflow', values: ['Detailed charts and insights', 'Free with ads (premium available)'] },
            { feature: 'eMoods', values: ['Bipolar disorder, detailed symptom tracking', 'Free'] },
            { feature: 'Bearable', values: ['Tracking mood + health symptoms + medications', 'Free (premium upgrade available)'] },
            { feature: 'Sanvello', values: ['Mood + CBT tools + meditation', 'Free (premium subscription for full features)'] },
          ]}
          highlightColumn={0}
        />

        <p className="mb-6 mt-6">
          A 2019 systematic review found that mood tracking apps can reduce depressive symptoms when used consistently, though they work best as a supplement to (not replacement for) professional treatment <Citation id="2" index={2} source="JMIR Mental Health" year="2019" tier={1} />.
        </p>

        <ArticleCallout variant="warning">
          <p>
            <strong>Privacy note:</strong> If using an app, check the privacy policy to see how your data is stored and whether it's shared with third parties. Some apps sell user data.
          </p>
        </ArticleCallout>

        <h2 id="how-to-track-consistently" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Track Consistently
        </h2>
        <p className="mb-6">
          The biggest challenge with mood tracking is maintaining the habit. Here's how to make it stick:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Set a daily reminder:</strong> Same time each day (e.g., before bed) to log your mood</li>
          <li><strong>Keep it simple:</strong> Don't overwhelm yourself with 20 data points. Start with 3--5.</li>
          <li><strong>Make it part of a routine:</strong> Pair it with an existing habit (brushing teeth, morning coffee)</li>
          <li><strong>Don't aim for perfection:</strong> If you miss a day, don't quit. Just pick back up.</li>
          <li><strong>Review weekly:</strong> Look at the past week's data to spot patterns. This reinforces the value of tracking.</li>
        </ul>

        <h2 id="interpreting-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Interpret Your Mood Data
        </h2>
        <p className="mb-6">
          After 2--4 weeks of consistent tracking, you'll have enough data to identify patterns <Citation id="3" index={3} source="Bipolar Disorders" year="2018" tier={1} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Questions to Ask
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Time of day:</strong> Are mornings or evenings worse?</li>
          <li><strong>Day of week:</strong> Do you dip on Sundays or Mondays?</li>
          <li><strong>Sleep correlation:</strong> Is mood better on days you sleep 7+ hours?</li>
          <li><strong>Activity correlation:</strong> Does exercise, social contact, or time outside improve mood?</li>
          <li><strong>Cycle patterns:</strong> Are there weekly or monthly cycles? (Note: women may notice premenstrual dips)</li>
          <li><strong>Triggers:</strong> Do certain people, events, or stressors consistently precede bad days?</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Red Flags to Watch For
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Declining trend:</strong> Mood consistently dropping over weeks</li>
          <li><strong>Loss of stability:</strong> More extreme highs and lows</li>
          <li><strong>Suicidal ideation:</strong> Thoughts of self-harm becoming more frequent</li>
          <li><strong>Functional impairment:</strong> Days you can't complete basic tasks increasing</li>
        </ul>

        <p className="mb-6">
          If you notice these patterns, share your mood chart with your therapist or doctor. It can inform treatment adjustments.
        </p>

        <h2 id="using-data-in-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Using Mood Data in Therapy
        </h2>
        <p className="mb-6">
          Bring your mood chart to therapy sessions. It helps your therapist:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>See what's happening between sessions</li>
          <li>Identify patterns you might not notice yourself</li>
          <li>Tailor interventions to your specific triggers</li>
          <li>Measure whether therapy is working</li>
        </ul>

        <h2 id="when-tracking-isnt-helpful" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Mood Tracking Isn't Helpful
        </h2>
        <p className="mb-6">
          For some people, mood tracking can become:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Obsessive or anxiety-inducing:</strong> Constantly checking and re-checking mood</li>
          <li><strong>Self-critical:</strong> Using low ratings as evidence of failure</li>
          <li><strong>Paralyzing:</strong> Feeling overwhelmed by the data</li>
        </ul>

        <p className="mb-6">
          If tracking makes you feel worse, it's okay to stop. Not every tool works for every person. Talk to your therapist about alternative ways to monitor your progress.
        </p>
      </>
    ),
  },

  {
    id: catId(50),
    slug: 'light-vitamin-d-mental-health-science-hype',
    status: 'published',
    title: 'Light, Vitamin D, and Mental Health: Separating Science from Hype',
    description: 'The internet is full of claims about vitamin D curing depression. What does the science actually show about light exposure, vitamin D, and mental health?',
    image: "/images/articles/cat07/cover-050.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Vitamin D', 'Light Exposure', 'Depression', 'Research'],
    summary: 'While the internet promotes vitamin D as a cure for depression, the science is more nuanced. Light exposure improves mood primarily through direct effects on the brain\'s circadian system and serotonin production—not through vitamin D. Vitamin D supplementation may provide a small benefit if you have a confirmed deficiency, but it is not a replacement for evidence-based depression treatments.',
    keyFacts: [
      { text: 'Light therapy works for seasonal affective disorder by resetting circadian rhythms and boosting serotonin, independent of vitamin D production', citationIndex: 2 },
      { text: 'A meta-analysis of 61 studies found only a small association between low vitamin D and depression, and correlation does not prove causation', citationIndex: 1 },
      { text: 'Vitamin D supplementation shows small mood improvements only in people with confirmed deficiency below 20 nanograms per milliliter', citationIndex: 5 },
      { text: 'For people with normal vitamin D levels, supplementation does not significantly reduce depressive symptoms', citationIndex: 3 },
      { text: 'Thirty minutes of morning outdoor light exposure provides circadian benefits even on cloudy days, while brief midday sun exposure supports vitamin D synthesis', citationIndex: 8 },
    ],
    sparkMoment: 'Light exposure improves mood through the brain\'s master clock—not by raising vitamin D levels—making morning sunlight one of the most underutilized tools in mental health.',
    practicalExercise: {
      title: 'Optimize Your Light Exposure',
      steps: [
        { title: 'Get morning light within 30 minutes of waking', description: 'Step outside for 10 to 15 minutes each morning, even if it is cloudy. Morning light resets your circadian rhythm and suppresses melatonin, improving wakefulness and mood.' },
        { title: 'Add brief midday sun exposure', description: 'Two to three times per week, expose bare skin (arms, legs) to midday sun for 10 to 15 minutes without sunscreen. This supports vitamin D synthesis without excessive skin damage.' },
        { title: 'Test your vitamin D level', description: 'If you live in a northern latitude, have darker skin, or rarely go outside, ask your doctor for a blood test to check your vitamin D status before supplementing.' },
        { title: 'Consider light therapy for winter', description: 'If you experience seasonal mood dips, use a 10,000 lux light therapy box for 20 to 30 minutes each morning from fall through early spring.' },
      ],
      toolLink: '/tools/sleep-architect',
      toolLabel: 'Improve Your Sleep & Light Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Vitamin D and depression: A systematic review and meta-analysis',
        source: 'British Journal of Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1192/bjp.2019.75',
        tier: 1,
      },
      {
        id: '2',
        text: 'Light exposure and mood: Evidence from naturalistic studies',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.07.033',
        tier: 1,
      },
      {
        id: '3',
        text: 'Vitamin D supplementation for depressive symptoms: Randomized controlled trial',
        source: 'JAMA',
        year: '2020',
        link: 'https://doi.org/10.1001/jama.2020.6852',
        tier: 1,
      },
      {
        id: '4',
        text: 'Mechanisms linking sunlight, vitamin D, and serotonin',
        source: 'Dermato-Endocrinology',
        year: '2013',
        link: 'https://doi.org/10.4161/derm.24494',
        tier: 1,
      },
      {
        id: '5',
        text: 'Vitamin D deficiency prevalence and depression outcomes',
        source: 'Nutrients',
        year: '2020',
        link: 'https://doi.org/10.3390/nu12020478',
        tier: 1,
      },
      {
        id: '6',
        text: 'Light therapy vs. vitamin D supplementation for seasonal affective disorder',
        source: 'Psychoneuroendocrinology',
        year: '2018',
        link: 'https://doi.org/10.1016/j.psyneuen.2018.08.025',
        tier: 1,
      },
      {
        id: '7',
        text: 'Vitamin D and mental health: Clinical practice guidelines',
        source: 'Endocrine Society',
        year: '2021',
        link: 'https://www.endocrine.org/vitamin-d-mental-health',
        tier: 3,
      },
      {
        id: '8',
        text: 'Sunlight exposure and mental health: Population study',
        source: 'Environmental Health Perspectives',
        year: '2019',
        link: 'https://doi.org/10.1289/EHP4392',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            "Just get more sun and take vitamin D!" If only treating depression were that simple. The relationship between light exposure, vitamin D, and mental health is real---but it's nuanced, and the evidence doesn't support vitamin D as a cure-all for depression.
          </p>
          <p className="mb-6">
            This article reviews what research actually shows about light, vitamin D, and mood, separating established science from internet oversimplification <Citation id="1" index={1} source="British Journal of Psychiatry" year="2019" tier={1} />.
          </p>
        </div>

        <h2 id="the-connection" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Connection Between Light, Vitamin D, and Mood
        </h2>
        <p className="mb-6">
          There are two separate (though related) pathways linking light exposure to mental health:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Light's Direct Effects on the Brain
        </h3>
        <p className="mb-6">
          When light enters your eyes, it signals the suprachiasmatic nucleus (the brain's master clock), which regulates:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Circadian rhythms (sleep-wake cycle)</li>
          <li>Serotonin production (mood-regulating neurotransmitter)</li>
          <li>Melatonin suppression (wakefulness)</li>
        </ul>

        <p className="mb-6">
          This pathway is <strong>independent of vitamin D</strong>. Bright light therapy works for seasonal affective disorder (SAD) not because it raises vitamin D levels (it doesn't---therapeutic light boxes block UV rays), but because it directly affects brain chemistry <Citation id="2" index={2} source="Journal of Affective Disorders" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Vitamin D's Indirect Effects
        </h3>
        <p className="mb-6">
          Sunlight (specifically UVB rays) triggers vitamin D synthesis in your skin. Vitamin D acts as a hormone and may influence mood through:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Modulating brain-derived neurotrophic factor (BDNF)</li>
          <li>Affecting serotonin synthesis <Citation id="4" index={4} source="Dermato-Endocrinology" year="2013" tier={1} /></li>
          <li>Anti-inflammatory effects on the brain</li>
        </ul>

        <p className="mb-6">
          However, this pathway is <strong>less direct and less established</strong> than light's immediate effects on circadian rhythms and neurotransmitters.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Light exposure improves mood primarily through its effects on the brain's circadian system---not through vitamin D. Vitamin D may play a supporting role, but it's not the main mechanism.
          </p>
        </ArticleCallout>

        <h2 id="does-vitamin-d-help-depression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Does Vitamin D Supplementation Help Depression?
        </h2>
        <p className="mb-6">
          The short answer: <strong>It depends.</strong>
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          What the Research Shows
        </h3>
        <p className="mb-6">
          A 2019 meta-analysis of 61 studies found a small but significant association between low vitamin D levels and increased depression risk <Citation id="1" index={1} source="British Journal of Psychiatry" year="2019" tier={1} />. However, association doesn't prove causation---it's possible that depression causes low vitamin D (due to reduced outdoor activity), rather than the reverse.
        </p>

        <p className="mb-6">
          <strong>Intervention studies (where people take vitamin D supplements) show mixed results:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>People with deficiency:</strong> If your vitamin D level is clinically low (below 20 ng/mL), supplementation may improve mood <Citation id="5" index={5} source="Nutrients" year="2020" tier={1} /></li>
          <li><strong>People with normal levels:</strong> If your vitamin D is already in the normal range, supplementation doesn't significantly reduce depressive symptoms <Citation id="3" index={3} source="JAMA" year="2020" tier={1} /></li>
        </ul>

        <StatCard
          stats={[
            { value: 0.3, suffix: '', label: 'Effect size of vitamin D for depression (small)' },
            { value: 30, suffix: '%', label: 'Of adults in northern latitudes are deficient' },
            { value: 2000, suffix: 'IU', label: 'Typical daily supplementation dose' },
          ]}
          source="British Journal of Psychiatry, 2019; Nutrients, 2020"
        />

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Bottom Line
        </h3>
        <p className="mb-6">
          Vitamin D supplementation is worth trying if:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You have a confirmed vitamin D deficiency (via blood test)</li>
          <li>You live in a northern latitude with limited winter sunlight</li>
          <li>You have darker skin (which produces less vitamin D from sunlight)</li>
          <li>You rarely go outside or wear full sun protection</li>
        </ul>

        <p className="mb-6">
          But <strong>don't expect it to cure depression</strong>. At best, it may provide a small boost---especially if you were deficient to begin with.
        </p>

        <h2 id="light-vs-vitamin-d" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Light Therapy vs. Vitamin D Supplementation
        </h2>
        <p className="mb-6">
          For seasonal affective disorder (SAD), light therapy is far more effective than vitamin D supplementation <Citation id="6" index={6} source="Psychoneuroendocrinology" year="2018" tier={1} />.
        </p>

        <ComparisonTable
          title="Light Therapy vs. Vitamin D for SAD"
          columns={['Intervention', 'Mechanism', 'Evidence Strength']}
          items={[
            { feature: 'Bright light therapy (10,000 lux)', values: ['Resets circadian rhythm, boosts serotonin', 'Strong (multiple RCTs)'] },
            { feature: 'Vitamin D supplementation', values: ['May modulate neurotransmitters', 'Weak to moderate (inconsistent results)'] },
            { feature: 'Sunlight exposure', values: ['Combines both pathways', 'Moderate (observational evidence)'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="how-much-sun" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Much Sunlight Do You Need?
        </h2>
        <p className="mb-6">
          For mood benefits, the goal is <strong>bright light exposure</strong>, not sunburn. Recommendations <Citation id="8" index={8} source="Environmental Health Perspectives" year="2019" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>For circadian regulation:</strong> 30 minutes of outdoor light exposure in the morning (even on cloudy days)</li>
          <li><strong>For vitamin D synthesis:</strong> 10--30 minutes of midday sun exposure on bare skin (arms, legs) several times per week (varies by latitude and skin tone)</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            <strong>Skin cancer risk is real.</strong> Balance vitamin D production with sun protection. Brief, regular exposure (10--15 minutes) without sunscreen is enough for most people. After that, use sunscreen to prevent skin damage.
          </p>
        </ArticleCallout>

        <h2 id="vitamin-d-supplementation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Should You Take Vitamin D Supplements?
        </h2>
        <p className="mb-6">
          <strong>Consider supplementation if:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You have a confirmed deficiency (blood test showing {'<'}20 ng/mL)</li>
          <li>You live in a northern latitude and it's winter</li>
          <li>You have limited sun exposure due to lifestyle, clothing, or sunscreen use</li>
          <li>You have darker skin (requires more sun exposure to produce the same amount of vitamin D)</li>
        </ul>

        <p className="mb-6">
          <strong>Typical dose:</strong> 1,000--2,000 IU daily is generally safe and effective for maintaining normal levels <Citation id="7" index={7} source="Endocrine Society" year="2021" tier={3} />. Higher doses (up to 4,000 IU) may be recommended if you're deficient, but consult a doctor first.
        </p>

        <h2 id="what-works-better" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Works Better Than Vitamin D Alone?
        </h2>
        <p className="mb-6">
          If you're struggling with depression, these interventions have stronger evidence than vitamin D supplementation:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Morning light exposure:</strong> Go outside within 30 minutes of waking, even for 10--15 minutes</li>
          <li><strong>Light therapy (for SAD):</strong> 10,000 lux light box for 20--30 minutes each morning</li>
          <li><strong>Regular exercise:</strong> More effective than vitamin D for reducing depressive symptoms</li>
          <li><strong>Psychotherapy (CBT, IPT):</strong> Evidence-based talk therapy</li>
          <li><strong>Antidepressant medication:</strong> If recommended by a provider</li>
        </ul>

        <h2 id="bottom-line" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Bottom Line
        </h2>
        <p className="mb-6">
          Light exposure---especially morning sunlight---has robust evidence for improving mood. Vitamin D plays a supporting role, and supplementation may help if you're deficient. But vitamin D is not a depression cure, and taking it won't replace evidence-based treatments like therapy, medication, or lifestyle changes.
        </p>
        <p className="mb-6">
          If you're considering vitamin D supplementation for depression, get your levels tested first and talk to a healthcare provider. Don't rely on supplements alone to manage mental health.
        </p>
      </>
    ),
  },
];
