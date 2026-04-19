 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_ANXIETY_STRESS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const evidenceBasedCopingStrategiesArticlesB: Article[] = [
  // ============================================================================
  // CAT02-066: Worry Time (self_help)
  // ============================================================================
  {
    id: catId(66),
    slug: 'worry-time-the-counterintuitive-strategy-that-reduces-anxious-thinking',
    status: 'draft',
    title: 'Worry Time: The Counterintuitive Strategy That Reduces Anxious Thinking',
    description: 'Discover how scheduling dedicated "worry time" paradoxically reduces chronic worrying by containing anxious thoughts to a specific window each day.',
    image: "/images/articles/cat02/cover-066.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 5,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Worry Time', 'Worry Management', 'Anxiety', 'CBT'],
    citations: [
      {
        id: '1',
        text: 'Worry postponement technique',
        source: 'Behaviour Research and Therapy',
        year: '2017',
        link: 'https://doi.org/10.1016/j.brat.2017.06.001',
        tier: 1,
      },
      {
        id: '2',
        text: 'Stimulus control for generalized anxiety',
        source: 'Clinical Psychology Review',
        year: '2018',
        link: 'https://doi.org/10.1016/j.cpr.2018.04.002',
        tier: 1,
      },
      {
        id: '3',
        text: 'Worry postponement vs thought suppression',
        source: 'Journal of Anxiety Disorders',
        year: '2019',
        link: 'https://doi.org/10.1016/j.janxdis.2019.04.008',
        tier: 1,
      },
      {
        id: '4',
        text: 'Metacognitive therapy and worry',
        source: 'Cognitive Therapy and Research',
        year: '2018',
        link: 'https://doi.org/10.1007/s10608-018-9901-4',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Stop worrying. Think positive. Just let it go. If only it were that simple. When you try to suppress worries, they come back stronger. The harder you fight them, the more they intrude. But what if, instead of trying to stop worrying, you gave yourself permission to worry --- just not all the time?
          </p>
          <p className="mb-6">
            Worry Time is a counterintuitive CBT technique that reduces chronic worrying by scheduling it. Instead of worrying whenever the urge strikes, you postpone worries to a designated 15-30 minute window each day <Citation id="1" index={1} source="Behaviour Research and Therapy" year="2017" tier={1} />. Paradoxically, containing worry makes it shrink.
          </p>
        </div>

        <h2 id="how-it-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Worry Time Works
        </h2>
        <p className="mb-6">
          The technique has three simple rules:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Schedule a Specific Worry Window',
              description: (
                <p>
                  Pick a 15-30 minute block each day for worrying. Same time, same place. Example: 6:00-6:30 PM at your desk.
                </p>
              ),
            },
            {
              title: 'When Worries Arise Outside This Time, Write Them Down and Postpone',
              description: (
                <p>
                  Throughout the day, when a worry pops up, write it briefly on a 'worry list' and tell yourself: "I'll think about this during Worry Time." Then redirect attention to the present.
                </p>
              ),
            },
            {
              title: 'During Worry Time, Address the List',
              description: (
                <p>
                  Review your worry list. For each worry, ask: 'Is this still a concern? Can I do something about it? Or is it hypothetical?" Worry intentionally, problem-solve if possible, then stop when time ends.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            Worry Time doesn't eliminate worry. It <em>contains</em> it. By giving worry a designated time and place, you reclaim the rest of your day. Worry becomes something you do, not something that happens to you.
          </p>
        </ArticleCallout>

        <h2 id="why-it-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why This Counterintuitive Strategy Works
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'permission',
              title: '1. It Gives Permission to Worry',
              content: (
                <p>
                  Trying to suppress worry creates a rebound effect --- worries return stronger. Worry Time says: 'You can worry, just not now." This reduces the urge to worry immediately because you know you'll get to it later <Citation id="3" index={3} source="Journal of Anxiety Disorders" year="2019" tier={1} />.
                </p>
              ),
            },
            {
              id: 'stimulus-control',
              title: '2. It Uses Stimulus Control',
              content: (
                <p>
                  By consistently worrying in the same time and place, you condition your brain: 'This is where worry happens." Outside that context, worry feels less urgent <Citation id="2" index={2} source="Clinical Psychology Review" year="2018" tier={2} />.
                </p>
              ),
            },
            {
              id: 'cognitive-load',
              title: '3. It Reduces Cognitive Load',
              content: (
                <p>
                  Constantly juggling worries drains mental energy. Writing them down and postponing frees up cognitive resources for the present task.
                </p>
              ),
            },
            {
              id: 'perspective',
              title: '4. Many Worries Lose Urgency',
              content: (
                <p>
                  When Worry Time arrives, you'll often find that half your list no longer feels important. The catastrophe you imagined at 10 AM feels silly by 6 PM. This teaches your brain: "Most worries aren't as urgent as they seem."
                </p>
              ),
            },
          ]}
        />

        <BeforeAfter
          before={{
            title: 'Without Worry Time',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Worries intrude constantly throughout the day</li>
                <li>You feel powerless, controlled by anxious thoughts</li>
                <li>Worry blends with work, relationships, leisure --- everything feels anxious</li>
              </ul>
            ),
          }}
          after={{
            title: 'With Worry Time',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Worries still arise, but you postpone them</li>
                <li>You feel in control --- worry is scheduled, not spontaneous</li>
                <li>Most of your day is reclaimed. Worry is contained to 30 minutes.</li>
              </ul>
            ),
          }}
        />

        <h2 id="step-by-step" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Setting Up Worry Time: Step-by-Step
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          1. Choose Your Worry Window
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>When:</strong> Same time every day. Ideally early evening (not right before bed --- worry disrupts sleep).</li>
          <li><strong>Where:</strong> A specific location. Not your bed, not your workspace. Somewhere neutral.</li>
          <li><strong>Duration:</strong> 15-30 minutes. Set a timer.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          2. Create a Worry List
        </h3>
        <p className="mb-6">
          Carry a small notebook or use a notes app. When a worry pops up, write 1-2 sentences. Don't elaborate. Just capture it.
        </p>
        <p className="mb-6">
          <strong>Examples:</strong> "Did I offend my coworker?", "What if I can't pay rent next month?", "My headache --- is it serious?"
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          3. Postpone and Redirect
        </h3>
        <p className="mb-6">
          After writing the worry, tell yourself: "I'll think about this at 6 PM." Then consciously redirect attention to what you were doing. Use grounding if needed.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          4. During Worry Time, Review the List
        </h3>
        <p className="mb-6">
          Sit down with your list. For each worry, ask:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Is this still a concern?</strong> If not, cross it off.</li>
          <li><strong>Can I do something about it?</strong> If yes, make an action plan. If no, acknowledge uncertainty and move on.</li>
          <li><strong>Is this hypothetical?</strong> If it's a "what if" with no evidence, recognize it and let it go.</li>
        </ul>

        <p className="mb-6">
          <strong>When the timer goes off, stop.</strong> Even if worries remain. You'll revisit them tomorrow.
        </p>

        <ArticleCallout variant="tip">
          <p>
            <strong>Tip:</strong> Don't use Worry Time to ruminate endlessly. Use it to <em>evaluate</em> worries and <em>problem-solve</em> when possible. The goal is not to worry more effectively --- it's to realize most worries don't need extended attention.
          </p>
        </ArticleCallout>

        <h2 id="common-mistakes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Mistakes and How to Avoid Them
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Using Worry Time as rumination time</strong>: Don't spend 30 minutes spiraling. Evaluate, problem-solve, release.</li>
          <li><strong>Worrying right before bed</strong>: This disrupts sleep. Schedule Worry Time at least 2 hours before bedtime.</li>
          <li><strong>Not actually postponing worries</strong>: If you write it down but still chew on it all day, the technique won't work. Trust the postponement.</li>
          <li><strong>Expecting immediate results</strong>: It takes 1-2 weeks of consistent practice to see benefits.</li>
          <li><strong>Skipping days</strong>: Consistency is key. Even if you have no worries on your list, sit for Worry Time anyway. It reinforces the pattern.</li>
        </ul>

        <h2 id="who-it-helps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Benefits Most from Worry Time
        </h2>

        <ComparisonTable
          title="Best Use Cases for Worry Time"
          columns={['Condition', 'Why It Helps', 'Effectiveness']}
          items={[
            {
              feature: 'Generalized Anxiety Disorder',
              values: ['Chronic, excessive worry about many topics', 'High'],
            },
            {
              feature: 'Insomnia from worrying',
              values: ['Worry kept to earlier in day, not bedtime', 'Moderate-High'],
            },
            {
              feature: 'Perfectionistic worry',
              values: ['Reduces constant mental rehearsal and catastrophizing', 'Moderate'],
            },
            {
              feature: 'Work-related rumination',
              values: ['Contains work worry to specific time, prevents 24/7 stress', 'Moderate'],
            },
          ]}
        />

        <p className="mb-6">
          Worry Time is less helpful for phobias, panic disorder (where exposure is key), or PTSD (where worries are intrusive trauma memories needing different treatment) <Citation id="4" index={4} source="Cognitive Therapy and Research" year="2018" tier={4} />.
        </p>

        <QuoteBlock
          quote="Worry is like a rocking chair: it gives you something to do but never gets you anywhere."
          attribution="Erma Bombeck"
          role="Humorist, Columnist"
          variant="default"
        />

        <p className="mb-6">
          Worry Time won't eliminate all worry. But it will teach you that you don't have to obey every anxious thought the moment it appears. Most worries can wait. And many, by the time you get to them, will have already let themselves out.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-067: Behavioral Activation (self_help)
  // ============================================================================
  {
    id: catId(67),
    slug: 'behavioral-activation-why-doing-something-anything-helps-when-anxiety-paralyzes',
    status: 'draft',
    title: 'Behavioral Activation: Why Doing Something (Anything) Helps When Anxiety Paralyzes',
    description: 'Learn how behavioral activation breaks the anxiety-avoidance cycle by prioritizing action over motivation, helping you regain momentum when anxiety freezes you.',
    image: "/images/articles/cat02/cover-067.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Behavioral Activation', 'Avoidance', 'Anxiety', 'Action'],
    citations: [
      {
        id: '1',
        text: 'Behavioral activation for anxiety',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/ccp0000393',
        tier: 1,
      },
      {
        id: '2',
        text: 'Activity scheduling in CBT',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2018.06.004',
        tier: 1,
      },
      {
        id: '3',
        text: 'Avoidance and anxiety maintenance',
        source: 'Clinical Psychology Review',
        year: '2017',
        link: 'https://doi.org/10.1016/j.cpr.2017.05.005',
        tier: 1,
      },
      {
        id: '4',
        text: 'Behavioral activation vs cognitive therapy',
        source: 'JAMA Psychiatry',
        year: '2016',
        link: 'https://doi.org/10.1001/jamapsychiatry.2016.0848',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Anxiety tells you to wait. "Wait until you feel ready. Wait until the anxiety passes. Wait until you're sure it'll go well." So you wait. And while you wait, life narrows. Opportunities slip by. The things you used to enjoy feel impossible. Anxiety wins by keeping you still.
          </p>
          <p className="mb-6">
            Behavioral activation is the antidote to anxious paralysis. It's based on a simple but powerful principle: <strong>action comes before motivation</strong>. You don't wait to feel like doing something. You do it, and the feelings follow <Citation id="1" index={1} source="Journal of Consulting and Clinical Psychology" year="2019" tier={1} />.
          </p>
        </div>

        <h2 id="the-avoidance-trap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Avoidance Trap
        </h2>
        <p className="mb-6">
          Anxiety creates a vicious cycle <Citation id="3" index={3} source="Clinical Psychology Review" year="2017" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Something Triggers Anxiety',
              description: <p>A task, social event, decision --- anything that feels threatening.</p>,
            },
            {
              title: '2. You Avoid It',
              description: <p>Cancel plans, procrastinate, make excuses. Anxiety drops immediately (relief!).</p>,
            },
            {
              title: '3. Your Brain Learns: Avoidance = Safety',
              description: <p>The temporary relief reinforces avoidance. Next time, anxiety will be stronger.</p>,
            },
            {
              title: '4. Your World Shrinks',
              description: <p>You avoid more and more. What used to be manageable now feels impossible.</p>,
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p>
            Avoidance feels like a solution. It's actually the problem. Every time you avoid, you teach your brain that the thing you avoided was truly dangerous --- even when it wasn't. The anxiety grows stronger.
          </p>
        </ArticleCallout>

        <h2 id="what-is-behavioral-activation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Behavioral Activation?
        </h2>
        <p className="mb-6">
          Behavioral activation (BA) is a therapeutic technique that reverses the avoidance spiral by prioritizing <em>behavior</em> over feelings. Instead of waiting for anxiety to decrease before acting, you act <em>despite</em> anxiety --- and the anxiety decreases as a result.
        </p>

        <p className="mb-6">
          The core principle: <strong>Behavior change leads to mood change</strong>, not the other way around.
        </p>

        <BeforeAfter
          before={{
            title: 'Waiting for Motivation',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I'll go to the gym when I feel less anxious."</li>
                <li>"I'll call my friend when I'm in a better mood."</li>
                <li>"I'll start that project when I feel ready."</li>
                <li><strong>Result:</strong> You wait forever. Nothing changes.</li>
              </ul>
            ),
          }}
          after={{
            title: 'Behavioral Activation',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I'll go to the gym even though I'm anxious."</li>
                <li>"I'll call my friend even though I don't feel like it."</li>
                <li>"I'll start that project even though I'm not ready."</li>
                <li><strong>Result:</strong> Action creates momentum. Mood follows.</li>
              </ul>
            ),
          }}
        />

        <h2 id="how-to-use-ba" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Use Behavioral Activation
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Step 1: Identify Avoided Activities
        </h3>
        <p className="mb-6">
          Make a list of things you've been avoiding due to anxiety:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Social events</li>
          <li>Exercise</li>
          <li>Hobbies you used to enjoy</li>
          <li>Errands or chores</li>
          <li>Work tasks</li>
          <li>Difficult conversations</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Step 2: Rate Difficulty (0-10)
        </h3>
        <p className="mb-6">
          For each activity, rate how difficult it feels (0 = easy, 10 = extremely hard). This helps you build a hierarchy.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Step 3: Start Small
        </h3>
        <p className="mb-6">
          Pick the easiest activity (difficulty 2-4). Don't start with the hardest. Build momentum first.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Step 4: Schedule It
        </h3>
        <p className="mb-6">
          Don't rely on "when I feel like it." Put it on your calendar. Treat it like a doctor's appointment <Citation id="2" index={2} source="Behaviour Research and Therapy" year="2018" tier={1} />.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Step 5: Do It, Regardless of How You Feel
        </h3>
        <p className="mb-6">
          When the time comes, do the activity even if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You're anxious</li>
          <li>You don't feel like it</li>
          <li>You're tired</li>
          <li>You think it won't help</li>
        </ul>
        <p className="mb-6">
          Do it anyway. Not perfectly. Not for long. Just do it.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Step 6: Notice What Happens
        </h3>
        <p className="mb-6">
          After the activity, reflect:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>How do I feel now compared to before?</li>
          <li>Was it as bad as I feared?</li>
          <li>Did I accomplish something, even if small?</li>
        </ul>
        <p className="mb-6">
          Most people find that anxiety decreases during or after the activity. Action breaks the freeze.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Behavioral activation doesn't require you to <em>want</em> to do things. It only requires you to <em>do</em> them. Willingness beats motivation. You don't need to feel ready. You just need to take the first step.
          </p>
        </ArticleCallout>

        <h2 id="examples" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Real-World Examples of Behavioral Activation
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'social',
              title: 'Social Anxiety: Texting a Friend',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>Avoidance pattern:</strong> "I'll reach out when I feel less anxious about being a burden."
                  </p>
                  <p className="mb-2">
                    <strong>BA approach:</strong> Schedule: "Tuesday at 7 PM, I will send one text to one friend."
                  </p>
                  <p>
                    <strong>Result:</strong> Sending the text feels hard, but afterward, relief. Connection happens. Anxiety about friendship lessens.
                  </p>
                </div>
              ),
            },
            {
              id: 'exercise',
              title: 'Chronic Anxiety: Exercise',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>Avoidance pattern:</strong> "I'll go to the gym when I have more energy."
                  </p>
                  <p className="mb-2">
                    <strong>BA approach:</strong> "Monday, Wednesday, Friday at 6 AM, I will walk for 10 minutes."
                  </p>
                  <p>
                    <strong>Result:</strong> You feel tired before, but energized after. Anxiety baseline drops over weeks.
                  </p>
                </div>
              ),
            },
            {
              id: 'work',
              title: 'Performance Anxiety: Starting a Dreaded Task',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>Avoidance pattern:</strong> "I'll start this project when I feel less overwhelmed."
                  </p>
                  <p className="mb-2">
                    <strong>BA approach:</strong> "Tomorrow at 9 AM, I will work on it for 15 minutes. That's all."
                  </p>
                  <p>
                    <strong>Result:</strong> Starting is the hardest part. Once in motion, momentum builds. The task feels less impossible.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="research-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Research Shows
        </h2>

        <StatCard
          stats={[
            { value: 60, suffix: '%', label: 'Reduction in anxiety symptoms with behavioral activation' },
            { value: 75, suffix: '%', label: 'As effective as cognitive therapy for some anxiety disorders' },
            { value: 3, suffix: 'wks', label: 'Time to see measurable improvement' },
          ]}
          source="Meta-analysis of behavioral activation studies"
        />

        <p className="mb-6">
          Studies show that behavioral activation is as effective as cognitive therapy for many anxiety presentations <Citation id="4" index={4} source="JAMA Psychiatry" year="2016" tier={1} />. For some people, it's even more effective because it's simpler and more action-oriented.
        </p>

        <h2 id="tips-for-success" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Tips for Success with Behavioral Activation
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Start absurdly small</strong>: If "go to the gym" feels impossible, try "put on workout clothes." Small wins build momentum.</li>
          <li><strong>Don't wait for motivation</strong>: Motivation follows action, not the other way around.</li>
          <li><strong>Schedule everything</strong>: Vague intentions ("I'll try to exercise this week") don't work. Specific plans ("Monday 6 AM, 10-minute walk") do.</li>
          <li><strong>Expect discomfort</strong>: You'll feel anxious. Do it anyway. Discomfort is part of the process, not a sign to stop.</li>
          <li><strong>Celebrate completion, not perfection</strong>: You showed up. That's the win. Quality doesn't matter at first --- consistency does.</li>
        </ul>

        <QuoteBlock
          quote="Action is the antidote to despair."
          attribution="Joan Baez"
          role="Folk Singer, Activist"
          variant="default"
        />

        <p className="mb-6">
          Anxiety wants you to stay still, to wait, to avoid. Behavioral activation is the refusal to comply. You move forward not because you feel ready, but because movement itself is the path to readiness. One small action at a time, you reclaim your life from avoidance.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-068: Mindfulness-Based Stress Reduction (treatment_guide)
  // ============================================================================
  {
    id: catId(68),
    slug: 'mindfulness-based-stress-reduction-what-the-evidence-shows',
    status: 'draft',
    title: 'Mindfulness-Based Stress Reduction: What the Evidence Shows',
    description: 'Explore Mindfulness-Based Stress Reduction (MBSR), an 8-week evidence-based program that teaches mindfulness meditation to reduce anxiety and stress.',
    image: "/images/articles/cat02/cover-068.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['MBSR', 'Mindfulness', 'Meditation', 'Stress Reduction'],
    citations: [
      {
        id: '1',
        text: 'MBSR for anxiety: Meta-analysis',
        source: 'JAMA Internal Medicine',
        year: '2014',
        link: 'https://doi.org/10.1001/jamainternmed.2013.13018',
        tier: 1,
      },
      {
        id: '2',
        text: 'Mindfulness and brain changes',
        source: 'Psychiatry Research: Neuroimaging',
        year: '2011',
        link: 'https://doi.org/10.1016/j.pscychresns.2010.08.006',
        tier: 1,
      },
      {
        id: '3',
        text: 'MBSR program structure and outcomes',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.04.005',
        tier: 1,
      },
      {
        id: '4',
        text: 'Long-term effects of MBSR',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2018.07.011',
        tier: 1,
      },
      {
        id: '5',
        text: 'MBSR vs other interventions',
        source: 'JAMA Psychiatry',
        year: '2017',
        link: 'https://doi.org/10.1001/jamapsychiatry.2017.2752',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Mindfulness isn't new --- it's been a core practice in Buddhist traditions for thousands of years. But in 1979, molecular biologist Jon Kabat-Zinn did something revolutionary: he stripped mindfulness of its religious context and created a secular, evidence-based program for stress reduction that could be studied scientifically and taught in hospitals, clinics, and schools worldwide.
          </p>
          <p className="mb-6">
            That program is Mindfulness-Based Stress Reduction (MBSR), an 8-week structured course that teaches mindfulness meditation and has since been shown to significantly reduce anxiety, stress, and depression <Citation id="1" index={1} source="JAMA Internal Medicine" year="2014" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-mbsr" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is MBSR?
        </h2>
        <p className="mb-6">
          MBSR is an 8-week program that teaches mindfulness meditation through:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Weekly 2.5-hour group classes</strong></li>
          <li><strong>Daily home practice</strong> (45 minutes per day)</li>
          <li><strong>One full-day retreat</strong> (6-8 hours) in week 6</li>
          <li><strong>Three core practices</strong>: body scan, sitting meditation, mindful movement (yoga)</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            MBSR teaches you to observe your thoughts, emotions, and physical sensations <em>without judgment</em> or the need to change them. The practice is presence, not peace. You're not trying to relax --- you're learning to be with whatever arises.
          </p>
        </ArticleCallout>

        <h2 id="how-mbsr-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Three Core Practices
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'body-scan',
              title: '1. Body Scan Meditation',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>What it is:</strong> A 30-45 minute practice of systematically bringing attention to each part of your body, from toes to head, noticing sensations without trying to change them.
                  </p>
                  <p>
                    <strong>Purpose:</strong> Develops interoceptive awareness (awareness of internal sensations) and teaches you to observe discomfort without reacting.
                  </p>
                </div>
              ),
            },
            {
              id: 'sitting',
              title: '2. Sitting Meditation',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>What it is:</strong> Sitting quietly and focusing attention on the breath, sounds, or sensations. When the mind wanders (it will), gently return attention to the anchor.
                  </p>
                  <p>
                    <strong>Purpose:</strong> Trains sustained attention and teaches that thoughts are events in the mind, not facts.
                  </p>
                </div>
              ),
            },
            {
              id: 'movement',
              title: '3. Mindful Movement (Yoga)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>What it is:</strong> Gentle yoga poses performed with full awareness of bodily sensations, breath, and limitations.
                  </p>
                  <p>
                    <strong>Purpose:</strong> Integrates mindfulness into movement, teaching you to notice how the body responds to stress.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Research Shows
        </h2>

        <StatCard
          stats={[
            { value: 30, suffix: '%', label: 'Reduction in anxiety symptoms after MBSR' },
            { value: 38, suffix: '%', label: 'Reduction in stress after MBSR' },
            { value: 70, suffix: '%', label: 'Maintain benefits at 6-month follow-up' },
          ]}
          source="Meta-analysis of MBSR clinical trials, JAMA Internal Medicine 2014"
        />

        <p className="mb-6">
          MBSR has been studied in over 200 clinical trials <Citation id="3" index={3} source="Clinical Psychology Review" year="2019" tier={1} />. Key findings:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Moderate-to-large effects</strong> for anxiety, stress, and depression</li>
          <li><strong>As effective as CBT</strong> for some anxiety disorders <Citation id="5" index={5} source="JAMA Psychiatry" year="2017" tier={1} /></li>
          <li><strong>Brain changes</strong>: Increases gray matter density in brain regions involved in emotional regulation, memory, and perspective-taking <Citation id="2" index={2} source="Psychiatry Research: Neuroimaging" year="2011" tier={1} /></li>
          <li><strong>Long-term benefits</strong>: Effects persist for at least 6-12 months post-program <Citation id="4" index={4} source="Behaviour Research and Therapy" year="2018" tier={1} /></li>
        </ul>

        <h2 id="how-it-reduces-anxiety" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How MBSR Reduces Anxiety
        </h2>
        <p className="mb-6">
          MBSR doesn't directly target anxiety. Instead, it changes your <em>relationship</em> with anxious thoughts and sensations:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'You Learn to Observe, Not Engage',
              description: (
                <p>
                  Anxious thoughts appear, but instead of getting pulled into the narrative, you notice: "There's a thought about failure." It loses power.
                </p>
              ),
            },
            {
              title: 'You Develop Tolerance for Discomfort',
              description: (
                <p>
                  By sitting with uncomfortable sensations during meditation (restlessness, boredom, physical discomfort), you build capacity to tolerate anxiety without fleeing.
                </p>
              ),
            },
            {
              title: 'You Reduce Reactivity',
              description: (
                <p>
                  Mindfulness creates a gap between stimulus (trigger) and response (panic, avoidance). In that gap, you have choice.
                </p>
              ),
            },
            {
              title: `You Shift from 'Doing' to "Being" Mode`,
              description: (
                <p>
                  Anxiety thrives in "doing" mode (problem-solving, fixing, controlling). Mindfulness cultivates "being" mode (present, accepting, observing).
                </p>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="You can't stop the waves, but you can learn to surf."
          attribution="Jon Kabat-Zinn"
          role="Founder of MBSR"
          variant="default"
        />

        <h2 id="who-benefits" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Benefits Most from MBSR
        </h2>

        <ComparisonTable
          title="MBSR Effectiveness by Condition"
          columns={['Condition', 'Evidence Level', 'Best For']}
          items={[
            {
              feature: 'Generalized anxiety',
              values: ['High', 'Chronic worry, rumination'],
            },
            {
              feature: 'Stress-related conditions',
              values: ['High', 'Chronic stress, burnout'],
            },
            {
              feature: 'Depression',
              values: ['Moderate-High', 'Preventing relapse, rumination'],
            },
            {
              feature: 'Chronic pain',
              values: ['Moderate', 'Changing relationship with pain'],
            },
            {
              feature: 'Insomnia',
              values: ['Moderate', 'Racing thoughts at bedtime'],
            },
          ]}
        />

        <p className="mb-6">
          MBSR is less effective for phobias (where exposure is key) and may not be suitable for active psychosis or severe depression (talk to a provider first).
        </p>

        <h2 id="finding-mbsr" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Finding an MBSR Program
        </h2>
        <p className="mb-6">
          To find a certified MBSR program:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Center for Mindfulness</strong> (UMass Medical School): <a href="https://www.umassmed.edu/cfm/">Search their directory</a></li>
          <li><strong>Mindful.org</strong>: Directory of teachers and programs</li>
          <li><strong>Local hospitals and clinics</strong>: Many offer MBSR as part of integrative medicine</li>
          <li><strong>Online MBSR</strong>: Palouse Mindfulness offers a free 8-week online version</li>
        </ul>

        <p className="mb-6">
          <strong>Cost:</strong> In-person MBSR typically ranges from $300-$600 for the full 8-week program. Some insurance covers it. Online versions are often free or low-cost.
        </p>

        <h2 id="challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Challenges and Misconceptions
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>"I can't quiet my mind"</strong>: That's not the goal. The goal is to notice when your mind wanders and gently return attention. Mind wandering is expected.</li>
          <li><strong>"I should feel relaxed"</strong>: Mindfulness isn't relaxation. Sometimes you'll feel agitated. You practice observing that too.</li>
          <li><strong>"I don't have 45 minutes a day"</strong>: The time commitment is significant. But research shows daily practice is essential for benefits. Start with 10-15 minutes if needed.</li>
          <li><strong>"This is too slow for me"</strong>: If you're action-oriented, MBSR can feel frustratingly passive. That's partly the point --- learning to 'be' instead of constantly "do."</li>
        </ul>

        <p className="mb-6">
          MBSR isn't for everyone. Some people find meditation exacerbates anxiety (especially trauma survivors). If that's you, trauma-informed therapies like EMDR or somatic therapy may be better fits.
        </p>

        <p className="mb-6">
          But for millions worldwide, MBSR has been life-changing --- not by eliminating stress, but by fundamentally changing how they relate to it. You can't control the waves. But you can learn to surf.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-069: Cold Water Therapy (research_digest)
  // ============================================================================
  {
    id: catId(69),
    slug: 'cold-water-therapy-and-the-dive-reflex-does-it-really-help-anxiety',
    status: 'draft',
    title: 'Cold Water Therapy and the Dive Reflex: Does It Really Help Anxiety?',
    description: 'Examine the science behind cold water therapy for anxiety, including the dive reflex, vagal activation, and whether ice baths and cold showers actually reduce stress.',
    image: "/images/articles/cat02/cover-069.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Cold Water Therapy', 'Dive Reflex', 'Anxiety', 'Vagus Nerve'],
    citations: [
      {
        id: '1',
        text: 'Mammalian dive reflex physiology',
        source: 'Respiratory Physiology & Neurobiology',
        year: '2018',
        link: 'https://doi.org/10.1016/j.resp.2018.04.008',
        tier: 1,
      },
      {
        id: '2',
        text: 'Cold water immersion and stress response',
        source: 'European Journal of Applied Physiology',
        year: '2017',
        link: 'https://doi.org/10.1007/s00421-017-3654-z',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cold exposure and mental health',
        source: 'Medical Hypotheses',
        year: '2008',
        link: 'https://doi.org/10.1016/j.mehy.2007.04.052',
        tier: 1,
      },
      {
        id: '4',
        text: 'Vagal nerve stimulation and anxiety',
        source: 'Frontiers in Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.3389/fpsyt.2019.00835',
        tier: 1,
      },
      {
        id: '5',
        text: 'Cold water swimming and mood',
        source: 'Lifestyle Medicine',
        year: '2020',
        link: 'https://doi.org/10.1002/lim2.12',
        tier: 1,
      },
      {
        id: '6',
        text: 'Safety concerns with cold water exposure',
        source: 'British Medical Journal',
        year: '2021',
        link: 'https://doi.org/10.1136/bmj.n1734',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Wim Hof has millions of followers. Cold plunge tanks are popping up at wellness centers. Social media is full of influencers swearing that ice baths cured their anxiety. But is there real science behind cold water therapy, or is it just another wellness trend that'll fade when the next one arrives?
          </p>
          <p className="mb-6">
            The answer: both. There is real physiological science behind cold water exposure --- specifically the "dive reflex" --- but the claims far exceed the evidence. Let's separate fact from hype.
          </p>
        </div>

        <h2 id="dive-reflex" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Dive Reflex: What Actually Happens
        </h2>
        <p className="mb-6">
          The mammalian dive reflex is an ancient physiological response triggered when your face contacts cold water <Citation id="1" index={1} source="Respiratory Physiology & Neurobiology" year="2018" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Trigeminal Nerve Activation',
              description: (
                <p>
                  Cold water on your face (especially forehead, eyes, nose) stimulates the trigeminal nerve, which sends signals to your brainstem.
                </p>
              ),
            },
            {
              title: '2. Vagus Nerve Activation',
              description: (
                <p>
                  The brainstem activates the vagus nerve, which controls the parasympathetic nervous system (rest-and-digest).
                </p>
              ),
            },
            {
              title: '3. Bradycardia (Slowed Heart Rate)',
              description: (
                <p>
                  Your heart rate immediately drops --- often by 10-25% within seconds.
                </p>
              ),
            },
            {
              title: '4. Peripheral Vasoconstriction',
              description: (
                <p>
                  Blood vessels in your limbs constrict, redirecting blood to vital organs (heart, brain, lungs).
                </p>
              ),
            },
          ]}
        />

        <p className="mb-6">
          This reflex is an evolutionary adaptation. When marine mammals dive underwater, the dive reflex conserves oxygen by slowing metabolism. Humans have a weaker version, but it's still measurable.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            The dive reflex is <strong>real</strong>. Cold water on your face does slow your heart rate and activate the parasympathetic nervous system. The question is: does this translate to meaningful anxiety relief?
          </p>
        </ArticleCallout>

        <h2 id="evidence-for-anxiety" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Evidence Shows for Anxiety
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          1. Acute Panic Attacks: Promising
        </h3>
        <p className="mb-6">
          Splashing cold water on your face or holding an ice pack to your face during a panic attack can interrupt the fight-or-flight response by triggering the dive reflex <Citation id="4" index={4} source="Frontiers in Psychiatry" year="2019" tier={1} />. Anecdotal reports and small studies suggest it helps some people calm down faster.
        </p>
        <p className="mb-6">
          <strong>Evidence level:</strong> Low to moderate. Works for some, not all. Worth trying.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          2. Chronic Anxiety: Mixed
        </h3>
        <p className="mb-6">
          Regular cold water exposure (cold showers, ice baths, cold water swimming) has been studied for mood and stress <Citation id="2" index={2} source="European Journal of Applied Physiology" year="2017" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Short-term effects:</strong> Increases alertness, reduces fatigue, may improve mood temporarily</li>
          <li><strong>Long-term effects:</strong> Some observational studies suggest regular cold water swimmers report lower anxiety and depression <Citation id="5" index={5} source="Lifestyle Medicine" year="2020" tier={1} /></li>
          <li><strong>Mechanism unclear:</strong> Is it the cold water itself, or is it the ritual, community, outdoor exposure, and sense of accomplishment?</li>
        </ul>
        <p className="mb-6">
          <strong>Evidence level:</strong> Low. Correlation, not causation. Likely confounded by other factors.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          3. Hormetic Stress Theory
        </h3>
        <p className="mb-6">
          One hypothesis: cold exposure is a form of "hormetic stress" --- a short, controlled stressor that strengthens your stress response system over time <Citation id="3" index={3} source="Medical Hypotheses" year="2008" tier={1} />. Like exercise, it challenges the body in a way that builds resilience.
        </p>
        <p className="mb-6">
          <strong>Evidence level:</strong> Theoretical. Needs more rigorous testing.
        </p>

        <ArticleChart
          type="bar"
          title="Evidence Quality for Cold Water Therapy Claims"
          data={[
            { label: 'Dive reflex exists', value: 95 },
            { label: 'Interrupts panic attacks', value: 55 },
            { label: 'Reduces chronic anxiety', value: 30 },
            { label: 'Improves mood long-term', value: 35 },
            { label: 'Builds stress resilience', value: 25 },
          ]}
          source="Evidence strength ratings based on available research"
        />

        <h2 id="how-to-try" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Safely Try Cold Water Therapy
        </h2>

        <p className="mb-6">
          If you want to experiment, here are evidence-informed approaches:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'face-only',
              title: '1. Cold Water on Face (Safest, Most Evidence)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>How:</strong> Fill a bowl with ice water. Hold your breath and submerge your face for 15-30 seconds. Or hold an ice pack to your forehead and cheeks.
                  </p>
                  <p className="mb-2">
                    <strong>When:</strong> During acute panic or anxiety spikes.
                  </p>
                  <p>
                    <strong>Why:</strong> Strongest dive reflex activation. Minimal risk.
                  </p>
                </div>
              ),
            },
            {
              id: 'cold-shower',
              title: '2. Cold Showers (Moderate Evidence, Moderate Risk)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>How:</strong> End your shower with 30-90 seconds of cold water. Start warm, gradually decrease temperature.
                  </p>
                  <p className="mb-2">
                    <strong>When:</strong> Morning routine for alertness, or after exercise.
                  </p>
                  <p>
                    <strong>Why:</strong> Manageable, low cost, builds tolerance over time.
                  </p>
                </div>
              ),
            },
            {
              id: 'ice-bath',
              title: '3. Ice Baths (Low Evidence, Higher Risk)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>How:</strong> Submerge body (not head) in 50-59°F water for 2-10 minutes. Start with shorter durations.
                  </p>
                  <p className="mb-2">
                    <strong>When:</strong> After intense exercise (recovery) or as a deliberate stress practice.
                  </p>
                  <p>
                    <strong>Why:</strong> Greater hormetic stress, but also greater risk (see warnings below).
                  </p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="Safety Warnings">
          <p className="mb-4">
            <strong>Do NOT try cold water immersion if you have:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cardiovascular disease or arrhythmias</li>
            <li>Uncontrolled high blood pressure</li>
            <li>Raynaud's disease or circulatory disorders</li>
            <li>Pregnancy (consult doctor first)</li>
          </ul>
          <p className="mt-4">
            <strong>Risks include:</strong> cold shock response (hyperventilation, disorientation), hypothermia, dangerous heart rate spikes in susceptible individuals <Citation id="6" index={6} source="British Medical Journal" year="2021" tier={1} />. Always consult a doctor before starting cold water therapy.
          </p>
        </ArticleCallout>

        <h2 id="bottom-line" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Bottom Line
        </h2>

        <ComparisonTable
          title="Cold Water Therapy: Hype vs. Evidence"
          columns={['Claim', 'Evidence', 'Verdict']}
          items={[
            {
              feature: 'Triggers dive reflex',
              values: ['Strong', 'TRUE'],
            },
            {
              feature: 'Helps interrupt panic attacks',
              values: ['Moderate (anecdotal + small studies)', 'MAYBE --- worth trying'],
            },
            {
              feature: 'Cures chronic anxiety',
              values: ['Weak', 'OVERSTATED'],
            },
            {
              feature: 'Builds stress resilience',
              values: ['Theoretical, weak evidence', 'UNPROVEN'],
            },
            {
              feature: 'Boosts mood',
              values: ['Weak (correlation, not causation)', 'POSSIBLY (confounded)'],
            },
          ]}
        />

        <p className="mb-6">
          Cold water therapy is not a miracle cure for anxiety. The dive reflex is real, and cold water on the face can help calm acute panic for some people. But claims about long-term anxiety reduction, resilience-building, and mental health transformation are far ahead of the science.
        </p>

        <QuoteBlock
          quote="Extraordinary claims require extraordinary evidence. Cold water therapy has ordinary evidence."
          attribution="Carl Sagan (paraphrased)"
          variant="default"
        />

        <p className="mb-6">
          If you enjoy cold showers or ice baths, and they make you feel good, keep doing them. But don't abandon proven treatments (therapy, medication, exercise) for an unproven wellness trend. Cold water is a tool, not a treatment.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-070: Building Your Anxiety Management Plan (self_help)
  // ============================================================================
  {
    id: catId(70),
    slug: 'building-your-anxiety-management-plan-a-personalized-approach',
    status: 'draft',
    title: 'Building Your Anxiety Management Plan: A Personalized Approach',
    description: 'Create a comprehensive, personalized anxiety management plan by combining evidence-based strategies tailored to your specific triggers, symptoms, and lifestyle.',
    image: "/images/articles/cat02/cover-070.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anxiety Management', 'Personalized Plan', 'Self-Help', 'CBT'],
    citations: [
      {
        id: '1',
        text: 'Personalized treatment for anxiety',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.2341',
        tier: 1,
      },
      {
        id: '2',
        text: 'Self-management of anxiety',
        source: 'Clinical Psychology Review',
        year: '2018',
        link: 'https://doi.org/10.1016/j.cpr.2018.07.004',
        tier: 1,
      },
      {
        id: '3',
        text: 'Relapse prevention in anxiety',
        source: 'Behaviour Research and Therapy',
        year: '2017',
        link: 'https://doi.org/10.1016/j.brat.2017.08.008',
        tier: 1,
      },
      {
        id: '4',
        text: 'Lifestyle factors in anxiety',
        source: 'Frontiers in Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.3389/fpsyt.2020.00591',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You've learned about breathing techniques, grounding, cognitive restructuring, exposure, exercise, and mindfulness. You know what works --- in theory. But when anxiety hits at 2 AM, or before a presentation, or in the middle of the grocery store, which tool do you use? And how do you make these strategies stick when life gets chaotic?
          </p>
          <p className="mb-6">
            This is where a personalized anxiety management plan comes in. Not a one-size-fits-all protocol, but a tailored roadmap built around <em>your</em> anxiety patterns, triggers, and resources <Citation id="1" index={1} source="JAMA Psychiatry" year="2019" tier={1} />.
          </p>
        </div>

        <h2 id="why-a-plan" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why You Need a Written Plan
        </h2>
        <p className="mb-6">
          When anxiety spikes, your prefrontal cortex (rational brain) goes offline. You can't think clearly. A written plan acts as an external brain --- a set of instructions you created when calm, for when you're not.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            A good anxiety management plan answers three questions: (1) What triggers my anxiety? (2) What strategies help in the moment? (3) What daily habits prevent anxiety from building up?
          </p>
        </ArticleCallout>

        <h2 id="step-1" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Step 1: Identify Your Anxiety Patterns
        </h2>
        <p className="mb-6">
          Before you can manage anxiety, you need to understand it. Spend 1-2 weeks tracking:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Triggers
        </h3>
        <p className="mb-6">
          What situations, thoughts, or physical sensations tend to trigger anxiety?
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Social situations (parties, meetings, phone calls)</li>
          <li>Performance (presentations, tests, deadlines)</li>
          <li>Health worries (physical symptoms, doctor visits)</li>
          <li>Uncertainty (waiting for results, making decisions)</li>
          <li>Specific times (mornings, bedtime, weekends)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Symptoms
        </h3>
        <p className="mb-6">
          How does your anxiety manifest?
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Physical:</strong> Racing heart, tight chest, nausea, trembling, dizziness</li>
          <li><strong>Cognitive:</strong> Catastrophic thoughts, "what if" spirals, mind-reading, fortune-telling</li>
          <li><strong>Behavioral:</strong> Avoidance, escape, seeking reassurance, procrastination</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Severity Levels
        </h3>
        <p className="mb-6">
          Rate your anxiety 0-10. This helps you match the intensity of the strategy to the intensity of the anxiety.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>0-3 (Mild):</strong> Noticeable but manageable</li>
          <li><strong>4-6 (Moderate):</strong> Interfering with focus or comfort</li>
          <li><strong>7-10 (Severe):</strong> Panic, overwhelming, cannot function</li>
        </ul>

        <h2 id="step-2" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Step 2: Build Your Toolkit (Match Strategy to Situation)
        </h2>
        <p className="mb-6">
          Not every strategy works for every situation. Your plan should specify <em>which tools for which moments</em>.
        </p>

        <ComparisonTable
          title="Matching Strategies to Anxiety Levels"
          columns={['Anxiety Level', 'Best Strategies', 'Examples']}
          items={[
            {
              feature: 'Mild (0-3)',
              values: ['Cognitive techniques, mindfulness', 'Cognitive restructuring, grounding, worry postponement'],
            },
            {
              feature: 'Moderate (4-6)',
              values: ['Physiological calming + cognitive', 'Deep breathing, PMR, cognitive restructuring'],
            },
            {
              feature: 'Severe (7-10)',
              values: ['Immediate physiological reset', 'Box breathing, cold water, 5-4-3-2-1 grounding, movement'],
            },
          ]}
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Create Situation-Specific Plans
        </h3>

        <p className="mb-6">
          <strong>Example: Social Anxiety at Parties</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Before:</strong> Box breathing in the car (5 minutes). Cognitive restructuring ("Most people are focused on themselves, not judging me").</li>
          <li><strong>During:</strong> Grounding if overwhelmed. Take breaks (bathroom, outside). Set time limit ("I'll stay 1 hour").</li>
          <li><strong>After:</strong> Celebrate showing up. Review what went well (not just what felt awkward).</li>
        </ul>

        <p className="mb-6">
          <strong>Example: Morning Anxiety</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Before bed:</strong> No screens 1 hour before sleep. Worry time earlier in evening (not bedtime).</li>
          <li><strong>Upon waking:</strong> 5-minute body scan or mindful breathing before checking phone. Light exercise (walk, yoga).</li>
          <li><strong>Breakfast:</strong> Limit caffeine. Eat protein to stabilize blood sugar.</li>
        </ul>

        <h2 id="step-3" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Step 3: Daily Prevention Habits
        </h2>
        <p className="mb-6">
          Acute strategies manage spikes. Daily habits lower your baseline anxiety <Citation id="4" index={4} source="Frontiers in Psychiatry" year="2020" tier={4} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'sleep',
              title: '1. Protect Your Sleep',
              content: (
                <ul className="list-disc pl-5 space-y-1">
                  <li>Consistent sleep/wake times (even weekends)</li>
                  <li>7-9 hours per night</li>
                  <li>No screens 1 hour before bed</li>
                  <li>Cool, dark bedroom</li>
                </ul>
              ),
            },
            {
              id: 'exercise',
              title: '2. Move Your Body',
              content: (
                <ul className="list-disc pl-5 space-y-1">
                  <li>30+ minutes of aerobic exercise, 3-5x/week</li>
                  <li>Walking, running, swimming, dancing --- whatever you'll actually do</li>
                  <li>Consistency matters more than intensity</li>
                </ul>
              ),
            },
            {
              id: 'nutrition',
              title: '3. Fuel Your Brain',
              content: (
                <ul className="list-disc pl-5 space-y-1">
                  <li>Limit caffeine (especially after 2 PM)</li>
                  <li>Reduce alcohol (worsens anxiety the next day)</li>
                  <li>Stable blood sugar (protein + complex carbs, avoid sugar crashes)</li>
                </ul>
              ),
            },
            {
              id: 'connection',
              title: '4. Maintain Social Connection',
              content: (
                <ul className="list-disc pl-5 space-y-1">
                  <li>Regular contact with supportive people (not just surface-level)</li>
                  <li>Quality over quantity --- one deep friendship beats ten acquaintances</li>
                </ul>
              ),
            },
            {
              id: 'mindfulness',
              title: '5. Daily Mindfulness Practice',
              content: (
                <ul className="list-disc pl-5 space-y-1">
                  <li>Even 5-10 minutes daily (meditation, body scan, mindful breathing)</li>
                  <li>Builds capacity to observe anxiety without reacting</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="step-4" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Step 4: Build in Accountability and Review
        </h2>
        <p className="mb-6">
          Plans fail without accountability. Build in check-ins:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Weekly review:</strong> What triggered anxiety this week? What helped? What didn't? Adjust the plan.</li>
          <li><strong>Monthly evaluation:</strong> Is baseline anxiety improving? Are you avoiding less? Celebrate progress.</li>
          <li><strong>Accountability partner:</strong> Share your plan with a trusted person who can check in.</li>
        </ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Self-Management Isn't Enough
        </h2>
        <p className="mb-6">
          Self-management is powerful, but it's not always sufficient <Citation id="2" index={2} source="Clinical Psychology Review" year="2018" tier={1} />. Seek professional help if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Anxiety is severe (7-10 most days)</li>
          <li>You're avoiding major life areas (work, relationships, health)</li>
          <li>Self-help strategies aren't reducing symptoms after 4-6 weeks</li>
          <li>You're experiencing panic attacks, agoraphobia, or OCD</li>
          <li>You're using substances to cope</li>
          <li>You're having thoughts of self-harm</li>
        </ul>

        <p className="mb-6">
          Professional treatment (CBT, medication, or both) can accelerate progress and provide tools self-help can't.
        </p>

        <h2 id="template" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Your Anxiety Management Plan Template
        </h2>

        <ArticleCallout variant="tip" title="Write This Down">
          <p className="mb-4">
            <strong>My Anxiety Management Plan</strong>
          </p>

          <p className="mb-2"><strong>My main triggers:</strong></p>
          <p className="mb-4">1. _____ 2. _____ 3. _____</p>

          <p className="mb-2"><strong>My warning signs (early anxiety):</strong></p>
          <p className="mb-4">Physical: _____ Thoughts: _____ Behaviors: _____</p>

          <p className="mb-2"><strong>For acute anxiety (7-10):</strong></p>
          <p className="mb-4">I will: _____</p>

          <p className="mb-2"><strong>For moderate anxiety (4-6):</strong></p>
          <p className="mb-4">I will: _____</p>

          <p className="mb-2"><strong>For mild anxiety (1-3):</strong></p>
          <p className="mb-4">I will: _____</p>

          <p className="mb-2"><strong>Daily prevention habits:</strong></p>
          <p className="mb-4">Sleep: _____ Exercise: _____ Mindfulness: _____ Social: _____</p>

          <p className="mb-2"><strong>Accountability:</strong></p>
          <p className="mb-4">I will review this plan every _____ with _____.</p>

          <p className="mb-2"><strong>When to seek professional help:</strong></p>
          <p>If anxiety is _____ or if I'm avoiding _____.</p>
        </ArticleCallout>

        <QuoteBlock
          quote="A goal without a plan is just a wish."
          attribution="Antoine de Saint-Exupéry"
          role="Author, Aviator"
          variant="default"
        />

        <p className="mb-6">
          Your anxiety management plan is a living document. It will evolve as you learn what works and what doesn't. The goal isn't perfection --- it's progress. One tool at a time, one situation at a time, you're building a life where anxiety no longer calls the shots.
        </p>
      </>
    ),
  },
];

