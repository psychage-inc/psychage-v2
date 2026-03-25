 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DEPRESSION_GRIEF, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const treatmentRecoveryMovingForwardArticlesB: Article[] = [
  {
    id: catId(66),
    slug: 'relapse-prevention-staying-well-after-recovery',
    title: 'Relapse Prevention: How to Stay Well After Recovery',
    description: `Recovery from depression doesn't end when symptoms improve. Learning to recognize early warning signs and maintain wellness practices prevents relapse and builds lasting resilience.`,
    image: '/images/articles/cat07/cover-066.svg',
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Relapse Prevention', 'Recovery', 'Wellness', 'Self-Management', 'Depression'],
    citations: [
      {
        id: '1',
        text: 'Relapse and Recurrence of Depression: A Review of Predictors and Prevention',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.01.171',
        tier: 1,
      },
      {
        id: '2',
        text: 'Cognitive Therapy Prevents Relapse Better Than Medication: A Meta-Analysis',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.03.002',
        tier: 1,
      },
      {
        id: '3',
        text: 'Early Warning Signs of Relapse in Depression',
        source: 'British Journal of Clinical Psychology',
        year: '2018',
        link: 'https://doi.org/10.1111/bjc.12173',
        tier: 1,
      },
      {
        id: '4',
        text: 'Lifestyle Factors in Depression Relapse Prevention',
        source: 'Psychiatry Research',
        year: '2021',
        link: 'https://doi.org/10.1016/j.psychres.2021.113975',
        tier: 1,
      },
      {
        id: '5',
        text: 'Mindfulness-Based Cognitive Therapy for Depression Relapse Prevention',
        source: 'JAMA Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1001/jamapsychiatry.2020.0437',
        tier: 1,
      },
      {
        id: '6',
        text: 'Social Support and Depression Relapse',
        source: 'Journal of Clinical Psychology',
        year: '2019',
        link: 'https://doi.org/10.1002/jclp.22743',
        tier: 1,
      },
      {
        id: '7',
        text: 'Relapse Prevention Planning',
        source: 'National Alliance on Mental Illness',
        year: '2023',
        link: 'https://www.nami.org/About-Mental-Illness/Treatments/Recovery',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You've done the hard work of recovering from depression—symptoms have lifted, energy has returned, and life feels manageable again. But recovery doesn't end when you feel better. Without relapse prevention strategies, depression returns in 50-85% of people within two years.
          </p>
          <p className="mb-6">
            Relapse prevention isn't about living in fear that depression will return. It's about building resilience, recognizing early warning signs, and having a plan so you can intervene before a full relapse occurs <Citation id="1" index={1} source="Journal of Affective Disorders" year="2020" tier={1} />. People who complete CBT or other structured therapies have significantly lower relapse rates than those treated with medication alone—because therapy teaches lasting skills <Citation id="2" index={2} source="Clinical Psychology Review" year="2019" tier={1} />.
          </p>
          <p className="mb-6">
            This article explains how to recognize early warning signs, maintain wellness practices, and create a personalized relapse prevention plan.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Relapse rate within 1 year without prevention strategies' },
            { value: 85, suffix: '%', label: 'Relapse rate after 3+ episodes without maintenance' },
            { value: 40, suffix: '%', label: 'Lower relapse with CBT vs. medication alone' },
          ]}
          source="Journal of Affective Disorders, 2020; Clinical Psychology Review, 2019"
        />

        <h2 id="understanding-relapse" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Relapse vs. Recurrence
        </h2>
        <p className="mb-6">
          It's helpful to distinguish between relapse and recurrence—they have different implications and prevention strategies.
        </p>

        <ComparisonTable
          title="Relapse vs. Recurrence"
          columns={['', 'Relapse', 'Recurrence']}
          items={[
            { feature: 'Definition', values: ['Return of symptoms during recovery from current episode', 'New episode after full recovery period'] },
            { feature: 'Timing', values: ['Within 6 months of improvement', 'After 6+ months of sustained wellness'] },
            { feature: 'What it means', values: ['Current episode wasn\'t fully resolved', 'Depression returned as new episode'] },
            { feature: 'Risk factors', values: ['Stopping treatment too soon, residual symptoms', 'Multiple previous episodes, stress, lack of wellness practices'] },
          ]}
        />

        <p className="mb-6 mt-6">
          Both require attention, but relapse prevention focuses on completing treatment fully and maintaining gains during the vulnerable first 6-12 months of recovery.
        </p>

        <h2 id="early-warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Early Warning Signs
        </h2>
        <p className="mb-6">
          Early warning signs—subtle changes that precede full relapse—give you a window to intervene before depression fully returns <Citation id="3" index={3} source="British Journal of Clinical Psychology" year="2018" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            <strong>Your early warning signs are personal.</strong> While some signs are common (sleep changes, withdrawal), everyone has unique patterns. Identifying YOUR specific early warning signs is essential for effective relapse prevention.
          </p>
        </ArticleCallout>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'behavioral-signs',
              title: 'Behavioral Warning Signs',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Starting to cancel plans or avoid social contact</li>
                  <li>Sleeping significantly more or less than usual</li>
                  <li>Neglecting self-care (hygiene, meals, exercise)</li>
                  <li>Procrastinating on important tasks</li>
                  <li>Increasing alcohol or substance use</li>
                  <li>Withdrawing from hobbies or activities you enjoy</li>
                </ul>
              ),
            },
            {
              id: 'cognitive-signs',
              title: 'Cognitive Warning Signs',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Return of negative automatic thoughts ("I'm worthless,", "Nothing matters")</li>
                  <li>All-or-nothing thinking reappearing</li>
                  <li>Difficulty concentrating or making decisions</li>
                  <li>Rumination—repetitively thinking about problems without problem-solving</li>
                  <li>Feeling hopeless about the future</li>
                </ul>
              ),
            },
            {
              id: 'emotional-signs',
              title: 'Emotional Warning Signs',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Increased irritability or low frustration tolerance</li>
                  <li>Feeling emotionally numb or empty</li>
                  <li>Loss of interest in things that usually bring pleasure</li>
                  <li>Crying more easily or frequently</li>
                  <li>Feeling overwhelmed by small stressors</li>
                </ul>
              ),
            },
            {
              id: 'physical-signs',
              title: 'Physical Warning Signs',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Changes in appetite or weight</li>
                  <li>Persistent fatigue despite adequate sleep</li>
                  <li>Sleep disturbances (insomnia or hypersomnia)</li>
                  <li>Physical aches and pains without medical cause</li>
                  <li>Low energy and motivation</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="wellness-practices" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Maintaining Wellness Practices
        </h2>
        <p className="mb-6">
          Certain lifestyle factors significantly influence relapse risk. Maintaining these protective practices reduces vulnerability to depression's return <Citation id="4" index={4} source="Psychiatry Research" year="2021" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Sleep Consistency',
              description: (
                <p>
                  Maintain regular sleep-wake times, aim for 7-9 hours nightly, and address sleep problems promptly. Sleep disruption is both a warning sign and a risk factor for relapse.
                </p>
              ),
            },
            {
              title: 'Physical Activity',
              description: (
                <p>
                  Regular exercise (even moderate walking) has antidepressant effects and protects against relapse. Aim for 30 minutes most days—consistency matters more than intensity.
                </p>
              ),
            },
            {
              title: 'Social Connection',
              description: (
                <p>
                  Maintain relationships even when you don't feel like it. Social isolation is both a symptom and a cause of depression. Schedule regular contact with supportive people <Citation id="6" index={6} source="Journal of Clinical Psychology" year="2019" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Meaningful Activity',
              description: (
                <p>
                  Continue engaging in activities that provide purpose, accomplishment, and pleasure—even in small doses. Don't wait until you 'feel like it."
                </p>
              ),
            },
            {
              title: 'Stress Management',
              description: (
                <p>
                  Use coping skills learned in therapy (thought challenging, problem-solving, mindfulness). Don't abandon these tools when you feel better—that's when you need them most.
                </p>
              ),
            },
            {
              title: 'Limit Alcohol and Substance Use',
              description: (
                <p>
                  Alcohol and drugs interfere with mood regulation and increase depression risk. If you notice increased use, it's a red flag.
                </p>
              ),
            },
          ]}
        />

        <h2 id="medication-continuation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Continuing or Discontinuing Medication
        </h2>
        <p className="mb-6">
          One of the biggest relapse risks is stopping antidepressants prematurely—usually within weeks of feeling better.
        </p>

        <BeforeAfter
          before={{
            title: 'Premature Discontinuation',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Stop medication 2-3 months after feeling better</li>
                <li>"I don't need it anymore—I feel fine!"</li>
                <li>Relapse within weeks to months in 50-60% of cases</li>
                <li>Repeated cycle of starting and stopping medication</li>
              </ul>
            ),
          }}
          after={{
            title: 'Evidence-Based Approach',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Continue for 6-9 months after full remission (first episode)</li>
                <li>Longer for recurrent depression (1-2 years or indefinitely)</li>
                <li>Gradual taper under medical supervision when discontinuing</li>
                <li>20-30% relapse rate with adequate continuation treatment</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="clinical-note">
          <p className="mb-4">
            <strong>When to consider long-term medication:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Three or more previous episodes</li>
            <li>Severe episodes with suicide attempts</li>
            <li>Chronic depression lasting years</li>
            <li>Strong family history of depression</li>
            <li>Rapid relapse when tapering medication in the past</li>
          </ul>
        </ArticleCallout>

        <h2 id="therapy-skills" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Using Therapy Skills Long-Term
        </h2>
        <p className="mb-6">
          If you completed CBT or another structured therapy, the skills you learned are your most powerful relapse prevention tools—but only if you continue using them <Citation id="2" index={2} source="Clinical Psychology Review" year="2019" tier={2} />.
        </p>

        <ArticleCallout variant="tip" title="Maintaining CBT Skills">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Behavioral activation:</strong> Continue scheduling pleasant and meaningful activities even when you feel well</li>
            <li><strong>Thought monitoring:</strong> Notice when negative automatic thoughts return and challenge them</li>
            <li><strong>Activity scheduling:</strong> Maintain structure and routine, especially during stressful periods</li>
            <li><strong>Problem-solving:</strong> Address life stressors proactively rather than avoiding them</li>
            <li><strong>Mindfulness practice:</strong> Regular mindfulness reduces rumination and prevents relapse <Citation id="5" index={5} source="JAMA Psychiatry" year="2020" tier={1} /></li>
          </ul>
        </ArticleCallout>

        <h2 id="relapse-prevention-plan" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Creating Your Relapse Prevention Plan
        </h2>
        <p className="mb-6">
          A written relapse prevention plan—created when you're well—helps you respond quickly if warning signs appear.
        </p>

        <ArticleCallout variant="key-takeaway" title="Essential Elements of a Relapse Prevention Plan">
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Your personal early warning signs</strong> (3-5 specific behaviors, thoughts, or feelings that signal trouble)
            </li>
            <li>
              <strong>Protective strategies</strong> (what keeps you well: sleep schedule, exercise, social contact, therapy skills)
            </li>
            <li>
              <strong>Action steps when warning signs appear:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>If 1-2 warning signs: Increase self-care, reach out to support person, review therapy materials</li>
                <li>If 3-4 warning signs: Contact therapist or provider within 48 hours, consider booster session</li>
                <li>If 5+ warning signs or suicidal thoughts: Same-day contact with provider, crisis resources</li>
              </ul>
            </li>
            <li>
              <strong>Support contacts</strong> (therapist, psychiatrist, supportive friend/family, crisis line numbers)
            </li>
            <li>
              <strong>What helped before</strong> (treatments, coping strategies, activities that aided recovery)
            </li>
          </ol>
        </ArticleCallout>

        <p className="mb-6 mt-6">
          Review and update your plan every 6 months. Share it with trusted people who can help you recognize warning signs if you're having difficulty seeing them yourself.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Reach Out for Help
        </h2>
        <p className="mb-6">
          Don't wait until you're in full relapse to seek support. Early intervention is far more effective than waiting until depression has fully returned.
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Contact your provider if:</strong> You notice 3+ early warning signs persisting for more than a few days</li>
          <li><strong>Schedule a booster session if:</strong> You're experiencing increased stress, life transitions, or symptoms worsening</li>
          <li><strong>Consider medication adjustment if:</strong> Warning signs persist despite increased self-care and therapy skill use</li>
          <li><strong>Seek immediate help if:</strong> Suicidal thoughts return, you can't function at work/home, or symptoms rapidly worsen</li>
        </ul>

        <ArticleCallout variant="warning">
          <p className="mb-4">
            <strong>Crisis resources:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988</li>
            <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
            <li><strong>Your provider's emergency contact:</strong> Keep this number accessible</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6 mt-8">
          Relapse is not failure—it's a common part of depression's course. But with awareness, maintenance of wellness practices, and early intervention when warning signs appear, you can significantly reduce relapse risk and intervene quickly if symptoms return. Recovery is an ongoing process, not a single destination. Resources for relapse prevention planning available through NAMI <Citation id="7" index={7} source="National Alliance on Mental Illness" year="2023" tier={3} />.
        </p>
      </>
    ),
  },
  {
    id: catId(67),
    slug: 'supporting-someone-with-depression-guide',
    title: 'Supporting Someone with Depression: A Guide for Partners, Family, and Friends',
    description: 'Knowing how to help a loved one with depression—what to say, what to do, and what to avoid—can make a significant difference in their recovery while protecting your own wellbeing.',
    image: "/images/articles/cat07/cover-067.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Caregiving', 'Support', 'Family', 'Relationships', 'Depression'],
    citations: [
      {
        id: '1',
        text: 'The Role of Social Support in Depression Recovery',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101891',
        tier: 1,
      },
      {
        id: '2',
        text: 'Supporting a Partner with Depression: Impact on Relationship Quality',
        source: 'Journal of Family Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/fam0000513',
        tier: 1,
      },
      {
        id: '3',
        text: 'What Not to Say to Someone with Depression',
        source: 'Journal of Affective Disorders',
        year: '2018',
        link: 'https://doi.org/10.1016/j.jad.2018.08.069',
        tier: 1,
      },
      {
        id: '4',
        text: 'Family Involvement in Depression Treatment',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2020.19080826',
        tier: 1,
      },
      {
        id: '5',
        text: 'Caregiver Burden and Mental Health Outcomes',
        source: 'Psychological Medicine',
        year: '2021',
        link: 'https://doi.org/10.1017/S0033291720004365',
        tier: 1,
      },
      {
        id: '6',
        text: 'Helping Someone with Depression',
        source: 'National Alliance on Mental Illness',
        year: '2023',
        link: 'https://www.nami.org/Your-Journey/Family-Members-and-Caregivers/Supporting-Someone',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Watching someone you love struggle with depression is painful. You want to help, but you're not sure what to do. Your attempts to cheer them up fall flat. They push you away or become irritable. You feel helpless, frustrated, or worried you're making things worse.
          </p>
          <p className="mb-6">
            Social support is one of the strongest predictors of depression recovery <Citation id="1" index={1} source="Clinical Psychology Review" year="2020" tier={1} />—but unhelpful support can actually worsen outcomes. The difference lies in understanding what depression is, what helps, and what doesn't.
          </p>
          <p className="mb-6">
            This guide explains how to effectively support someone with depression, what to say (and what not to say), when to step in versus step back, and how to protect your own wellbeing in the process.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Improvement in depression with strong social support' },
            { value: 2, suffix: 'x', label: 'Higher treatment adherence with family involvement' },
            { value: 60, suffix: '%', label: 'Family members report high caregiver burden' },
          ]}
          source="Clinical Psychology Review, 2020; American Journal of Psychiatry, 2020"
        />

        <h2 id="understanding-depression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding What Depression Is (and Isn't)
        </h2>
        <p className="mb-6">
          Before you can help effectively, you need to understand what you're dealing with. Depression is not sadness, laziness, or a choice.
        </p>

        <ComparisonTable
          title="Common Misconceptions vs. Reality"
          columns={['Misconception', 'Reality']}
          items={[
            {
              feature: 'They just need to try harder',
              values: [
                `Depression involves biological changes in the brain that make effort and motivation extremely difficult. Telling someone to 'try harder' is like telling someone with a broken leg to "just walk normally.`,
              ],
            },
            {
              feature: 'If they really wanted to get better, they would',
              values: [
                'Depression creates hopelessness that makes recovery feel impossible. Wanting to get better doesn\'t override neurobiological dysfunction.',
              ],
            },
            {
              feature: 'I can fix this by being supportive enough',
              values: [
                'Your support matters, but depression requires professional treatment. You can\'t love someone out of clinical depression.',
              ],
            },
            {
              feature: `They're being selfish by staying in bed all day`,
              values: [
                'Fatigue, lack of motivation, and anhedonia (inability to feel pleasure) are symptoms of depression, not moral failures.',
              ],
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            <strong>Depression is a medical condition</strong> involving neurotransmitter imbalances, altered brain function, and disrupted circuits for mood regulation—not a character flaw or something someone can simply "snap out of."
          </p>
        </ArticleCallout>

        <h2 id="what-helps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Actually Helps: Effective Support Strategies
        </h2>
        <p className="mb-6">
          Research identifies specific types of support that aid depression recovery <Citation id="1" index={1} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Validating Their Experience',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>What it sounds like:</strong> "I can see how hard this is for you.", "Your feelings make sense given what you're going through.", "This must be exhausting."
                  </p>
                  <p>
                    <strong>Why it helps:</strong> Validation communicates that their struggle is real and understandable, reducing shame and isolation.
                  </p>
                </div>
              ),
            },
            {
              title: 'Being Present Without Fixing',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>What it looks like:</strong> Sitting with them in silence, listening without offering solutions, staying nearby without forcing conversation.
                  </p>
                  <p>
                    <strong>Why it helps:</strong> Depression creates profound loneliness. Your presence—not your advice—combats isolation.
                  </p>
                </div>
              ),
            },
            {
              title: 'Practical Support',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>What it looks like:</strong> Grocery shopping, meal prep, helping with household tasks, arranging childcare, driving them to appointments.
                  </p>
                  <p>
                    <strong>Why it helps:</strong> Depression makes basic tasks overwhelming. Practical help reduces burden when executive function is impaired.
                  </p>
                </div>
              ),
            },
            {
              title: 'Gentle Encouragement (Not Pressure)',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>What it sounds like:</strong> "Would you like to take a short walk with me?", "I'm making dinner—would you like to sit with me while I cook?", "No pressure, but I'm here if you want company."
                  </p>
                  <p>
                    <strong>Why it helps:</strong> Behavioral activation (gentle engagement in activities) helps depression—but pressure to "cheer up" backfires. Offer invitations, not demands.
                  </p>
                </div>
              ),
            },
            {
              title: 'Facilitating Professional Help',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>What it looks like:</strong> Researching therapists, making appointments, offering to attend first session, reminding about medication, driving to appointments.
                  </p>
                  <p>
                    <strong>Why it helps:</strong> Depression impairs motivation and executive function. Logistical help removes barriers to treatment <Citation id="4" index={4} source="American Journal of Psychiatry" year="2020" tier={1} />.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="what-doesnt-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Doesn't Help (and Can Make Things Worse)
        </h2>
        <p className="mb-6">
          Well-intentioned comments and actions often backfire, increasing shame, guilt, or hopelessness <Citation id="3" index={3} source="Journal of Affective Disorders" year="2018" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Unhelpful Statements',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"Just think positive!" (Minimizes their struggle)</li>
                <li>"Others have it worse" (Shame-inducing comparison)</li>
                <li>"Have you tried exercising/meditation/vitamins?" (Implies simple fix exists)</li>
                <li>"You have so much to be grateful for" (Guilt-inducing)</li>
                <li>"Snap out of it" (Blames them for illness)</li>
                <li>"I know exactly how you feel" (Dismisses their unique experience)</li>
              </ul>
            ),
          }}
          after={{
            title: 'Helpful Statements',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I'm here for you, and I care about you"</li>
                <li>"This isn't your fault"</li>
                <li>"You're not alone in this"</li>
                <li>"What can I do to support you right now?"</li>
                <li>"I believe you'll get through this"</li>
                <li>"It's okay to not be okay"</li>
              </ul>
            ),
          }}
        />

        <h2 id="when-to-intervene" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Intervene vs. When to Step Back
        </h2>
        <p className="mb-6">
          Finding the balance between supporting and enabling, encouraging and pushing, helping and controlling is challenging.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'encourage-treatment',
              title: 'Encourage Treatment Engagement',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>When to step in:</strong> If they're not in treatment, have stopped medication without medical guidance, are missing therapy appointments, or refuse all professional help despite severe symptoms.
                  </p>
                  <p className="mb-4">
                    <strong>How to approach:</strong> Express concern from "I" statements ("I'm worried about you," not "You need to get help"). Offer to help with logistics. If they resist, suggest starting with primary care doctor or crisis line rather than insisting on psychiatry.
                  </p>
                  <p>
                    <strong>When to step back:</strong> Once they're engaged in treatment, let their providers guide care. Don't micromanage medication adherence or therapy attendance unless they ask for help.
                  </p>
                </div>
              ),
            },
            {
              id: 'daily-activities',
              title: 'Daily Activities and Self-Care',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>When to step in:</strong> If they're not eating, not maintaining basic hygiene for days, or completely isolating themselves from all human contact.
                  </p>
                  <p className="mb-4">
                    <strong>How to approach:</strong> Offer gentle invitations and practical help. "I'm making a sandwich—can I make you one?", "Would you like to sit on the porch with me for 5 minutes?"
                  </p>
                  <p>
                    <strong>When to step back:</strong> If they want alone time, aren't interested in activities, or choose to rest instead of socializing. Depression requires rest—don't force constant engagement.
                  </p>
                </div>
              ),
            },
            {
              id: 'crisis-situations',
              title: 'Crisis Situations',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>When to step in immediately:</strong> If they express suicidal thoughts with plan, talk about wanting to die, give away possessions, say goodbye, engage in reckless behavior, or have access to lethal means.
                  </p>
                  <p className="mb-4">
                    <strong>How to respond:</strong> Take all suicide talk seriously. Ask directly: "Are you thinking about suicide?" Don't leave them alone. Remove access to weapons/medications. Call 988 Suicide & Crisis Lifeline, their therapist, or 911.
                  </p>
                  <p>
                    <strong>Don't:</strong> Promise to keep suicide plans secret, dismiss threats as 'attention-seeking, ' or assume they don't mean it.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="caring-for-yourself" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Taking Care of Yourself
        </h2>
        <p className="mb-6">
          Supporting someone with depression is emotionally and physically exhausting. Caregiver burden is real and can lead to your own mental health problems if unaddressed <Citation id="5" index={5} source="Psychological Medicine" year="2021" tier={1} />.
        </p>

        <ArticleCallout variant="tip" title="Self-Care for Supporters">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Set boundaries:</strong> You can be supportive without sacrificing your own wellbeing. It's okay to say "I can't talk about this right now' or "I need some time to myself."</li>
            <li><strong>Maintain your own life:</strong> Continue hobbies, friendships, and activities. Putting your life on hold doesn't help them and harms you.</li>
            <li><strong>Seek your own support:</strong> Talk to friends, join a support group for caregivers (NAMI Family Support Group), or see a therapist yourself.</li>
            <li><strong>Educate yourself:</strong> Understanding depression reduces frustration and helps you recognize when to seek additional help.</li>
            <li><strong>Accept what you can't control:</strong> You can't cure their depression or force them to get better. You can only offer support and encourage treatment.</li>
          </ul>
        </ArticleCallout>

        <h2 id="supporting-specific-relationships" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Supporting Different Relationships
        </h2>
        <p className="mb-6">
          The dynamics of support vary depending on your relationship to the person with depression.
        </p>

        <ComparisonTable
          title="Support Strategies by Relationship"
          columns={['Relationship', 'Unique Considerations']}
          items={[
            {
              feature: 'Romantic Partner',
              values: [
                `Depression affects intimacy, communication, and household responsibilities. Attend couples therapy if needed. Don't take withdrawal personally. Maintain affection without pressure for sex. Communicate about division of labor.`,
              ],
            },
            {
              feature: 'Parent Supporting Child',
              values: [
                `Validate feelings without dismissing them as "teen angst." Ensure they receive professional evaluation. Monitor for warning signs. Balance support with appropriate expectations for school/activities.`,
              ],
            },
            {
              feature: 'Adult Child Supporting Parent',
              values: [
                'Overcome generational stigma about mental health. Help navigate healthcare system. Respect their autonomy while ensuring safety. Consider impact of aging, medical comorbidities.',
              ],
            },
            {
              feature: 'Friend',
              values: [
                `Check in regularly. Offer specific help ("Can I bring dinner Thursday?") rather than vague offers. Don't take it personally if they cancel plans. Maintain connection even if they withdraw.`,
              ],
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p className="mb-4">
            <strong>If you're in crisis yourself from caregiver burden:</strong>
          </p>
          <p>
            Supporting someone with depression can be overwhelming. If you're experiencing severe stress, anxiety, depression, or thoughts of self-harm, seek help for yourself. Call 988 for the Suicide & Crisis Lifeline or contact a mental health provider. You matter too.
          </p>
        </ArticleCallout>

        <p className="mb-6 mt-8">
          Supporting someone with depression is one of the most challenging and meaningful things you can do. Your presence, validation, and practical help make a real difference—even when it doesn't feel like it. Remember that recovery takes time, professional treatment is essential, and taking care of yourself enables you to be there for them in the long run. Resources for supporters available through NAMI <Citation id="6" index={6} source="National Alliance on Mental Illness" year="2023" tier={3} />.
        </p>
      </>
    ),
  },
  {
    id: catId(68),
    slug: 'when-someone-you-love-is-depressed-helping-without-burnout',
    title: 'When Someone You Love Is Depressed: How to Help Without Burning Out',
    description: 'Loving someone with depression while protecting your own mental health requires boundaries, self-care, and understanding when to seek additional support for both of you.',
    image: "/images/articles/cat07/cover-068.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Caregiver Burnout', 'Boundaries', 'Support', 'Self-Care', 'Depression'],
    citations: [
      {
        id: '1',
        text: 'Caregiver Burden in Partners of People with Depression',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2020.12.178',
        tier: 1,
      },
      {
        id: '2',
        text: 'Compassion Fatigue in Family Members of Individuals with Mental Illness',
        source: 'Family Process',
        year: '2020',
        link: 'https://doi.org/10.1111/famp.12476',
        tier: 1,
      },
      {
        id: '3',
        text: 'Setting Boundaries in Close Relationships: Impact on Mental Health',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.101737',
        tier: 1,
      },
      {
        id: '4',
        text: 'Couples Therapy for Depression: Efficacy and Mechanisms',
        source: 'Journal of Marital and Family Therapy',
        year: '2020',
        link: 'https://doi.org/10.1111/jmft.12435',
        tier: 1,
      },
      {
        id: '5',
        text: 'Self-Care for Caregivers',
        source: 'National Alliance on Mental Illness',
        year: '2023',
        link: 'https://www.nami.org/Your-Journey/Family-Members-and-Caregivers/Taking-Care-of-Yourself',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You pour everything into supporting your loved one with depression—taking on more household responsibilities, offering endless reassurance, sacrificing your own needs—and yet nothing seems to help. You're exhausted, resentful, and starting to feel depressed yourself. This is caregiver burnout, and it's both common and preventable.
          </p>
          <p className="mb-6">
            Partners and family members of people with depression experience significantly elevated rates of anxiety, depression, and stress-related health problems <Citation id="1" index={1} source="Journal of Affective Disorders" year="2021" tier={1} />. Compassion fatigue—emotional and physical exhaustion from caring for someone in distress—affects up to 60% of caregivers for people with mental illness <Citation id="2" index={2} source="Family Process" year="2020" tier={2} />.
          </p>
          <p className="mb-6">
            This article focuses on protecting your own wellbeing while supporting someone you love, recognizing the signs of caregiver burnout, and creating sustainable support that doesn't consume you.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 55, suffix: '%', label: 'Partners of people with depression develop depression themselves' },
            { value: 60, suffix: '%', label: 'Family caregivers experience compassion fatigue' },
            { value: 40, suffix: '%', label: 'Report relationship strain due to untreated depression' },
          ]}
          source="Journal of Affective Disorders, 2021; Family Process, 2020"
        />

        <h2 id="recognizing-burnout" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Caregiver Burnout
        </h2>
        <p className="mb-6">
          Burnout doesn't happen overnight—it builds gradually as you prioritize their needs over your own for weeks or months.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'emotional-signs',
              title: 'Emotional Signs of Burnout',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Feeling resentful toward the person you're caring for</li>
                  <li>Irritability, anger, or emotional numbness</li>
                  <li>Feeling helpless or hopeless about their recovery</li>
                  <li>Loss of empathy or feeling emotionally detached</li>
                  <li>Guilt about your negative feelings</li>
                  <li>Anxiety or depression symptoms yourself</li>
                </ul>
              ),
            },
            {
              id: 'physical-signs',
              title: 'Physical Signs of Burnout',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Chronic fatigue despite adequate sleep</li>
                  <li>Frequent illness (weakened immune system from chronic stress)</li>
                  <li>Sleep disturbances (insomnia or sleeping excessively)</li>
                  <li>Changes in appetite or weight</li>
                  <li>Physical tension, headaches, or body pain</li>
                </ul>
              ),
            },
            {
              id: 'behavioral-signs',
              title: 'Behavioral Signs of Burnout',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Withdrawing from friends and activities you used to enjoy</li>
                  <li>Neglecting your own health, exercise, or self-care</li>
                  <li>Increased alcohol or substance use to cope</li>
                  <li>Avoiding time with the person you're caring for</li>
                  <li>Difficulty concentrating or making decisions</li>
                </ul>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p>
            <strong>If you're experiencing multiple signs of burnout:</strong> You need support too. This isn't selfish—it's essential. You cannot sustainably care for someone else while neglecting yourself.
          </p>
        </ArticleCallout>

        <h2 id="setting-boundaries" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Setting Healthy Boundaries
        </h2>
        <p className="mb-6">
          Boundaries protect both you and your relationship. They're not about being selfish or uncaring—they're about sustainability <Citation id="3" index={3} source="Clinical Psychology Review" year="2019" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Unsustainable Support (No Boundaries)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Available 24/7 for emotional support</li>
                <li>Canceling all your plans to accommodate their needs</li>
                <li>Taking over all household responsibilities indefinitely</li>
                <li>Accepting verbal abuse or disrespect because "they're depressed"</li>
                <li>Never expressing your own needs or frustrations</li>
              </ul>
            ),
          }}
          after={{
            title: 'Sustainable Support (With Boundaries)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Designating specific support times while maintaining personal time</li>
                <li>Maintaining some social commitments and activities</li>
                <li>Sharing responsibilities or accepting "good enough" rather than perfect</li>
                <li>Addressing disrespectful behavior while acknowledging their struggle</li>
                <li>Communicating your needs and limits clearly</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="tip" title="How to Set Boundaries Compassionately">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Use "I" statements:</strong> "I need some time to myself this evening" (not "You're too needy")</li>
            <li><strong>Be specific:</strong> "I can talk for 30 minutes after dinner, but then I need to decompress"</li>
            <li><strong>Explain, don't apologize:</strong> "I'm setting this boundary so I can continue supporting you long-term"</li>
            <li><strong>Follow through:</strong> Boundaries without enforcement aren't boundaries—they're suggestions</li>
            <li><strong>Expect pushback:</strong> They may initially resist, feel abandoned, or become angry. This doesn't mean you're wrong to set limits</li>
          </ul>
        </ArticleCallout>

        <h2 id="what-you-can-control" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What You Can and Can't Control
        </h2>
        <p className="mb-6">
          Burnout often stems from trying to control the uncontrollable—their recovery, their motivation, their choices.
        </p>

        <ComparisonTable
          title="Within vs. Outside Your Control"
          columns={['You CAN Control', 'You CANNOT Control']}
          items={[
            { feature: 'Your own self-care', values: ['Whether they get better', ''] },
            { feature: 'Setting boundaries', values: ['Whether they take medication', ''] },
            { feature: 'Offering support', values: ['Whether they go to therapy', ''] },
            { feature: 'Facilitating treatment access', values: ['Their motivation level', ''] },
            { feature: 'Expressing your needs', values: ['How fast they recover', ''] },
            { feature: 'Seeking couples/family therapy', values: ['Whether they accept your help', ''] },
          ]}
        />

        <p className="mb-6 mt-6">
          Accepting what you cannot control doesn't mean giving up—it means redirecting energy toward what you <strong>can</strong> influence: your own wellbeing, your boundaries, and the support you choose to offer.
        </p>

        <h2 id="self-care-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Essential Self-Care for Caregivers
        </h2>
        <p className="mb-6">
          Self-care isn't selfish—it's what allows you to continue being there for your loved one without destroying yourself in the process.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Maintain Your Own Support Network',
              description: (
                <p>
                  Don't isolate yourself. Continue seeing friends, talking to family members who aren't involved in caregiving, and maintaining connections. You need people you can talk to about YOUR life, not just their depression.
                </p>
              ),
            },
            {
              title: 'Continue Your Own Activities',
              description: (
                <p>
                  Keep hobbies, exercise, work, and interests that give you identity and joy beyond being a caregiver. Depression doesn't pause your life—don't voluntarily do it yourself.
                </p>
              ),
            },
            {
              title: 'Join a Support Group',
              description: (
                <p>
                  NAMI Family Support Groups, online caregiver communities, or therapy groups for partners/family members provide validation, practical advice, and connection with others who understand <Citation id="5" index={5} source="National Alliance on Mental Illness" year="2023" tier={3} />.
                </p>
              ),
            },
            {
              title: 'Consider Your Own Therapy',
              description: (
                <p>
                  Individual therapy helps you process frustration, grief, resentment, and fear. It's not 'taking resources away' from your loved one—it's ensuring you have the emotional capacity to support them sustainably.
                </p>
              ),
            },
            {
              title: 'Take Regular Breaks',
              description: (
                <p>
                  Schedule time away—even brief breaks. A walk alone, an evening out with friends, or a weekend visit to family. Breaks aren't abandonment; they prevent burnout.
                </p>
              ),
            },
          ]}
        />

        <h2 id="couples-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Consider Couples or Family Therapy
        </h2>
        <p className="mb-6">
          Depression doesn't just affect the individual—it affects relationships. Couples therapy can help when depression strains your partnership <Citation id="4" index={4} source="Journal of Marital and Family Therapy" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="clinical-note">
          <p className="mb-4">
            <strong>Consider couples therapy if:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Communication has broken down (constant conflict, silence, or resentment)</li>
            <li>Intimacy (emotional or physical) has disappeared</li>
            <li>You're considering leaving the relationship</li>
            <li>Division of labor feels unfair and causes resentment</li>
            <li>Their depression is being used to avoid addressing relationship issues</li>
            <li>You need help understanding how to support them without enabling</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6 mt-6">
          Couples-focused interventions for depression show strong effectiveness—not just for the relationship, but for the depressed partner's recovery. Addressing relationship dynamics can improve depression outcomes.
        </p>

        <h2 id="when-you-need-to-leave" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When It's Okay to Leave
        </h2>
        <p className="mb-6">
          Sometimes, despite your best efforts, the relationship becomes toxic, abusive, or unsustainable. Mental illness is not an excuse for abuse.
        </p>

        <ArticleCallout variant="warning">
          <p className="mb-4">
            <strong>It's okay to leave if:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>There's emotional, verbal, or physical abuse (depression doesn't justify mistreatment)</li>
            <li>They refuse all professional help despite severe, prolonged symptoms</li>
            <li>Your own mental or physical health is seriously deteriorating</li>
            <li>You've lost all sense of yourself outside the caregiver role</li>
            <li>The relationship has become one-sided with no reciprocity or partnership</li>
          </ul>
          <p className="mt-4">
            Leaving doesn't make you a bad person. You're not responsible for their recovery, and you can't set yourself on fire to keep someone else warm.
          </p>
        </ArticleCallout>

        <h2 id="finding-balance" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Finding the Balance
        </h2>
        <p className="mb-6">
          Supporting someone with depression while protecting yourself requires continuous recalibration. There's no perfect formula—just ongoing assessment of what's sustainable.
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Check in with yourself weekly:</strong> Am I experiencing burnout signs? Do I need to adjust boundaries?</li>
          <li><strong>Communicate regularly:</strong> "I'm feeling overwhelmed. Can we talk about how to share responsibilities differently?"</li>
          <li><strong>Accept imperfection:</strong> You won't always get the balance right. Adjust as needed.</li>
          <li><strong>Remember your humanity:</strong> Feeling frustrated, tired, or resentful doesn't make you a bad partner/family member. It makes you human.</li>
        </ul>

        <p className="mb-6 mt-8">
          Loving someone with depression is hard. Taking care of yourself while doing so isn't selfish—it's essential for both of you. You can be compassionate and set boundaries. You can offer support and maintain your own life. And if you need to step back or leave to protect yourself, that's valid. Resources for caregivers available through NAMI Family Support <Citation id="5" index={5} source="National Alliance on Mental Illness" year="2023" tier={3} />.
        </p>
      </>
    ),
  },
  {
    id: catId(69),
    slug: 'recovery-is-not-linear-understanding-setbacks',
    title: 'Recovery Is Not Linear: Understanding Setbacks on the Path Forward',
    description: `Setbacks don't mean failure. Understanding that depression recovery involves ups and downs—and learning how to navigate rough patches—is essential for long-term wellbeing.`,
    image: '/images/articles/cat07/cover-069.svg',
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Recovery', 'Setbacks', 'Progress', 'Resilience', 'Depression'],
    citations: [
      {
        id: '1',
        text: 'Trajectories of Depression Recovery: Patterns and Predictors',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2021.03.067',
        tier: 1,
      },
      {
        id: '2',
        text: 'Response to Setbacks During Depression Recovery',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101832',
        tier: 1,
      },
      {
        id: '3',
        text: 'Growth Mindset and Mental Health Recovery',
        source: 'Journal of Clinical Psychology',
        year: '2019',
        link: 'https://doi.org/10.1002/jclp.22815',
        tier: 1,
      },
      {
        id: '4',
        text: 'Self-Compassion in Mental Health Recovery',
        source: 'Mindfulness',
        year: '2020',
        link: 'https://doi.org/10.1007/s12671-020-01345-6',
        tier: 1,
      },
      {
        id: '5',
        text: 'Recovery from Depression',
        source: 'National Alliance on Mental Illness',
        year: '2023',
        link: 'https://www.nami.org/About-Mental-Illness/Treatments/Recovery',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You've been doing well for weeks—maybe months. Therapy is working, medication has kicked in, and you're finally feeling like yourself again. Then one day you wake up and the heaviness is back. Negative thoughts flood in. You cancel plans. The panic sets in: "I'm right back where I started."
          </p>
          <p className="mb-6">
            But you're not. A rough day, week, or even month doesn't erase the progress you've made. Recovery from depression is not a straight line from sick to well—it's a winding path with ups and downs, setbacks and breakthroughs <Citation id="1" index={1} source="Journal of Affective Disorders" year="2021" tier={1} />.
          </p>
          <p className="mb-6">
            Understanding that setbacks are normal, learning to distinguish a temporary dip from true relapse, and developing resilience to navigate rough patches are essential skills for sustained recovery.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 80, suffix: '%', label: 'People recovering from depression experience at least one setback' },
            { value: 3, suffix: '–5', label: 'Days typical setback lasts (vs. weeks for relapse)' },
            { value: 60, suffix: '%', label: 'Report setbacks decreased over time with learned skills' },
          ]}
          source="Journal of Affective Disorders, 2021; Clinical Psychology Review, 2020"
        />

        <h2 id="setback-vs-relapse" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Setback vs. Relapse: What's the Difference?
        </h2>
        <p className="mb-6">
          Understanding the distinction between a temporary setback and true relapse helps you respond appropriately.
        </p>

        <ComparisonTable
          title="Setback vs. Relapse"
          columns={['Feature', 'Setback', 'Relapse']}
          items={[
            { feature: 'Duration', values: ['Days to 1-2 weeks', 'Weeks to months'] },
            { feature: 'Severity', values: ['Mild to moderate symptoms', 'Moderate to severe, back to pre-treatment levels'] },
            { feature: 'Trigger', values: ['Usually identifiable (stress, lack of sleep, illness)', 'May or may not have clear trigger'] },
            { feature: 'Functioning', values: ['Reduced but still managing essentials', 'Significantly impaired, can\'t function'] },
            { feature: 'Response to self-care', values: ['Improves with increased coping strategies', 'Doesn\'t improve without professional intervention'] },
            { feature: 'Frequency', values: ['Common and expected during recovery', 'Concerning, requires treatment adjustment'] },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            <strong>Setbacks are temporary dips within overall upward trajectory.</strong> Relapses are sustained return to depression requiring professional intervention. Most rough patches are setbacks, not relapses—and they're a normal part of recovery <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="why-setbacks-happen" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Setbacks Happen
        </h2>
        <p className="mb-6">
          Setbacks aren't random—they usually have triggers, even if they're not immediately obvious.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'stress-triggers',
              title: 'Life Stress and Major Changes',
              content: (
                <div>
                  <p className="mb-4">
                    Even positive changes (new job, moving, relationship milestones) create stress that can temporarily worsen mood. Negative stressors (conflict, loss, disappointment) have even stronger impact.
                  </p>
                  <p>
                    Your brain is still relearning emotional regulation—it takes time to handle stress without reverting to old patterns.
                  </p>
                </div>
              ),
            },
            {
              id: 'biological-factors',
              title: 'Biological Factors',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Sleep disruption:</strong> Even a few nights of poor sleep can trigger depressive symptoms</li>
                  <li><strong>Illness or pain:</strong> Physical health affects mental health</li>
                  <li><strong>Medication changes:</strong> Missing doses, adjusting dosage, or stopping medication</li>
                  <li><strong>Hormonal changes:</strong> Menstrual cycle, pregnancy, postpartum, menopause</li>
                  <li><strong>Seasonal changes:</strong> Less sunlight in fall/winter can worsen mood</li>
                </ul>
              ),
            },
            {
              id: 'stopping-strategies',
              title: 'Abandoning Wellness Practices',
              content: (
                <div>
                  <p className="mb-4">
                    When you feel better, it's tempting to stop therapy homework, skip exercise, cancel therapy appointments, or neglect self-care. Then symptoms creep back.
                  </p>
                  <p>
                    This is like stopping blood pressure medication because your blood pressure is normal—the intervention is what's keeping you well.
                  </p>
                </div>
              ),
            },
            {
              id: 'unrealistic-expectations',
              title: 'Expecting Perfection',
              content: (
                <div>
                  <p className="mb-4">
                    Believing you should never have another bad day after treatment sets you up for disappointment. Recovery means <strong>managing</strong> depression, not <strong>never experiencing</strong> low moods again.
                  </p>
                  <p>
                    Everyone—even people without depression—has difficult days. The difference is you're building skills to navigate them without spiraling.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="navigating-setbacks" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Navigate Setbacks
        </h2>
        <p className="mb-6">
          Your response to setbacks matters more than the setback itself. These strategies help you move through rough patches without spiraling.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Recognize It for What It Is',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Unhelpful thought:</strong> "I'm back to square one. Treatment didn't work. I'll never get better."
                  </p>
                  <p className="mb-3">
                    <strong>Balanced thought:</strong> "I'm having a rough few days. This is a setback, not a relapse. I've felt better before and I will again."
                  </p>
                  <p>
                    Labeling it accurately reduces catastrophizing and reminds you this is temporary.
                  </p>
                </div>
              ),
            },
            {
              title: 'Identify the Trigger',
              description: (
                <p>
                  What changed? Poor sleep? Stressful event? Stopped exercising? Identifying the trigger helps you address the root cause rather than just managing symptoms.
                </p>
              ),
            },
            {
              title: 'Return to Basics',
              description: (
                <div>
                  <p className="mb-3">
                    Go back to the fundamentals that helped you recover:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Behavioral activation: Schedule one small pleasant or meaningful activity today</li>
                    <li>Sleep hygiene: Prioritize regular sleep-wake times</li>
                    <li>Movement: Even a 10-minute walk helps</li>
                    <li>Social contact: Reach out to one supportive person</li>
                    <li>Thought challenging: Use CBT skills to examine catastrophic thoughts</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Resist Avoidance',
              description: (
                <p>
                  The urge to isolate, cancel plans, and withdraw is strong during setbacks. Resist it. Even when you don't feel like it, gentle engagement prevents the downward spiral.
                </p>
              ),
            },
            {
              title: 'Practice Self-Compassion',
              description: (
                <p>
                  Beating yourself up for having a setback worsens it. Treat yourself with the kindness you'd offer a friend: "This is hard right now. It's okay to struggle. I'm doing my best." Self-compassion predicts better recovery outcomes <Citation id="4" index={4} source="Mindfulness" year="2020" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Reach Out for Support',
              description: (
                <p>
                  Contact your therapist, talk to a supportive friend, or attend a support group. Don't isolate and try to 'tough it out' alone.
                </p>
              ),
            },
          ]}
        />

        <h2 id="growth-mindset" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Developing a Growth Mindset About Recovery
        </h2>
        <p className="mb-6">
          How you think about setbacks influences how you navigate them. A growth mindset—believing setbacks are opportunities to learn rather than evidence of failure—improves recovery outcomes <Citation id="3" index={3} source="Journal of Clinical Psychology" year="2019" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Fixed Mindset (Worsens Setbacks)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I failed. Treatment didn't work."</li>
                <li>"I'll never fully recover from this."</li>
                <li>"Having a bad day proves I'm fundamentally broken."</li>
                <li>"I should be over this by now."</li>
                <li>Give up on coping strategies because "they don't work"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Growth Mindset (Navigates Setbacks)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"This is a temporary setback. What can I learn from it?"</li>
                <li>"Recovery takes time. I'm building skills."</li>
                <li>"Bad days don't erase my progress."</li>
                <li>"Setbacks are normal. I know how to get through this."</li>
                <li>Increase use of coping strategies during difficult periods</li>
              </ul>
            ),
          }}
        />

        <h2 id="measuring-progress" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Measure Progress (When It Doesn't Feel Linear)
        </h2>
        <p className="mb-6">
          When recovery feels like two steps forward, one step back, it's hard to see progress. These strategies help you recognize gains even during rough patches.
        </p>

        <ArticleCallout variant="tip" title="Tracking Non-Linear Progress">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Compare to baseline, not yesterday:</strong> Are you better than before treatment started? (Yes) That's progress, even if today feels worse than last week.</li>
            <li><strong>Track frequency and duration of bad days:</strong> Recovery often looks like bad days becoming less frequent and shorter-lasting, not disappearing entirely.</li>
            <li><strong>Notice what's different this time:</strong> During this setback, are you using coping skills faster? Reaching out for support sooner? That's growth.</li>
            <li><strong>Keep a mood journal:</strong> Visual evidence of ups and downs helps you see the overall upward trend you can't feel day-to-day.</li>
            <li><strong>Celebrate small wins:</strong> Got out of bed when you didn't want to? Ate a meal? Called a friend? These matter.</li>
          </ul>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When a Setback Becomes a Relapse
        </h2>
        <p className="mb-6">
          Most rough patches resolve with increased self-care and coping strategies. But sometimes a setback signals the need for professional intervention.
        </p>

        <ArticleCallout variant="warning">
          <p className="mb-4">
            <strong>Contact your provider if:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Symptoms persist for more than 2 weeks despite increased self-care</li>
            <li>You're having suicidal thoughts</li>
            <li>You can't function at work, school, or home</li>
            <li>Sleep or appetite changes are severe and sustained</li>
            <li>You've stopped taking medication or attending therapy</li>
            <li>You're using alcohol or substances to cope</li>
          </ul>
          <p className="mt-4">
            Early intervention prevents setbacks from becoming full relapses. Don't wait until you're in crisis to reach out.
          </p>
        </ArticleCallout>

        <p className="mb-6 mt-8">
          Setbacks are not failure—they're part of the recovery process. Learning to navigate them without catastrophizing, using your coping skills even when you don't feel like it, and maintaining perspective that rough patches are temporary builds the resilience that prevents future relapses. Recovery isn't about never having another bad day—it's about knowing you can get through them. Resources for managing setbacks available through NAMI <Citation id="5" index={5} source="National Alliance on Mental Illness" year="2023" tier={3} />.
        </p>
      </>
    ),
  },
  {
    id: catId(70),
    slug: 'life-after-depression-rebuilding-meaning-purpose-connection',
    title: 'Life After Depression: Rebuilding Meaning, Purpose, and Connection',
    description: `Recovery from depression isn't just about symptom relief—it's about rebuilding a life worth living. Learn how to rediscover meaning, purpose, and authentic connection after depression.`,
    image: '/images/articles/cat07/cover-070.svg',
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Recovery', 'Meaning', 'Purpose', 'Post-Depression Life', 'Resilience'],
    citations: [
      {
        id: '1',
        text: 'Meaning in Life and Depression Recovery',
        source: 'Journal of Clinical Psychology',
        year: '2020',
        link: 'https://doi.org/10.1002/jclp.22927',
        tier: 1,
      },
      {
        id: '2',
        text: 'Purpose in Life as a Protective Factor Against Depression Relapse',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2021.01.040',
        tier: 1,
      },
      {
        id: '3',
        text: 'Social Connection and Mental Health Recovery',
        source: 'American Journal of Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1176/appi.ajp.2019.18091014',
        tier: 1,
      },
      {
        id: '4',
        text: 'Post-Traumatic Growth After Mental Illness',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101848',
        tier: 1,
      },
      {
        id: '5',
        text: 'Values-Based Living and Wellbeing',
        source: 'Journal of Contextual Behavioral Science',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jcbs.2019.09.001',
        tier: 1,
      },
      {
        id: '6',
        text: 'Recovery and Wellbeing',
        source: 'National Alliance on Mental Illness',
        year: '2023',
        link: 'https://www.nami.org/About-Mental-Illness/Treatments/Recovery',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The depression has lifted. You're sleeping better, eating normally, and functioning again. But something still feels empty. You've recovered from depression, but you're not sure what you're recovering <em>to</em>. Where do you go from here?
          </p>
          <p className="mb-6">
            Recovery from depression isn't just about symptom reduction—it's about rebuilding a life that feels meaningful, purposeful, and connected <Citation id="1" index={1} source="Journal of Clinical Psychology" year="2020" tier={1} />. Depression often strips away the things that made life worth living: relationships, interests, goals, sense of purpose. Getting better creates space to rebuild—but you have to actively construct what comes next.
          </p>
          <p className="mb-6">
            This article explores life after depression: how to rediscover meaning and purpose, reconnect with others authentically, rebuild identity beyond illness, and create a life worth protecting from future episodes.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 73, suffix: '%', label: 'Report stronger sense of purpose protects against relapse' },
            { value: 65, suffix: '%', label: 'Experience post-traumatic growth after depression' },
            { value: 80, suffix: '%', label: 'Say reconnecting with others was essential to recovery' },
          ]}
          source="Journal of Affective Disorders, 2021; Clinical Psychology Review, 2020"
        />

        <h2 id="beyond-symptom-relief" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recovery vs. Remission: The Difference Matters
        </h2>
        <p className="mb-6">
          Clinical remission—the absence of symptoms—is only the first step. True recovery involves rebuilding wellbeing, not just eliminating suffering.
        </p>

        <ComparisonTable
          title="Remission vs. Recovery"
          columns={['Remission', 'Recovery']}
          items={[
            { feature: 'Symptoms minimal or absent', values: ['✓', '✓'] },
            { feature: 'Able to function (work, school, daily tasks)', values: ['✓', '✓'] },
            { feature: 'Sense of meaning and purpose', values: ['', '✓'] },
            { feature: 'Authentic social connections', values: ['', '✓'] },
            { feature: 'Engagement in valued activities', values: ['', '✓'] },
            { feature: 'Positive identity beyond illness', values: ['', '✓'] },
            { feature: 'Psychological wellbeing and growth', values: ['', '✓'] },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            You can be in remission—symptom-free—and still feel empty if you haven't rebuilt meaning, purpose, and connection. Full recovery requires actively constructing a life you want to live, not just escaping the life depression created <Citation id="2" index={2} source="Journal of Affective Disorders" year="2021" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="rediscovering-meaning" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Rediscovering Meaning and Purpose
        </h2>
        <p className="mb-6">
          Depression makes everything feel meaningless. Recovery creates the opportunity to reconnect with what matters—but that requires intentional exploration.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Identify Your Values',
              description: (
                <div>
                  <p className="mb-3">
                    Values are what you care about—not goals, but the qualities you want your life to embody. Examples: connection, creativity, learning, contribution, authenticity, adventure, compassion.
                  </p>
                  <p className="mb-3">
                    <strong>Exercise:</strong> Ask yourself: "When I'm 80, looking back, what do I want to have stood for? What do I want to have prioritized?" The answers point toward your values <Citation id="5" index={5} source="Journal of Contextual Behavioral Science" year="2019" tier={1} />.
                  </p>
                  <p>
                    Depression often causes values drift—you lose touch with what matters. Reconnecting requires deliberate reflection.
                  </p>
                </div>
              ),
            },
            {
              title: 'Align Actions with Values',
              description: (
                <div>
                  <p className="mb-3">
                    Values alone don't create meaning—you have to <strong>act</strong> on them. If you value connection but spend all your time alone, there's misalignment.
                  </p>
                  <p>
                    <strong>Start small:</strong> One values-aligned action per week. Value creativity? Sign up for a class. Value contribution? Volunteer for 2 hours. Value learning? Start reading about a topic that fascinates you.
                  </p>
                </div>
              ),
            },
            {
              title: 'Create Goals That Matter',
              description: (
                <div>
                  <p className="mb-3">
                    Goals are the concrete manifestations of your values. But not all goals create meaning—only those aligned with what you care about.
                  </p>
                  <p>
                    <strong>Meaningful goals:</strong> Derive from your values, challenge you to grow, contribute to something beyond yourself, reflect who you want to become—not who you think you "should" be.
                  </p>
                </div>
              ),
            },
            {
              title: 'Embrace Small Moments',
              description: (
                <div>
                  <p className="mb-3">
                    Meaning isn't just found in big achievements. Savoring a meal, noticing beauty, helping someone, having a genuine conversation—these create meaning daily.
                  </p>
                  <p>
                    Depression trains you to dismiss small positives. Recovery involves retraining your attention to notice what matters.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="reconnecting-with-others" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Reconnecting Authentically with Others
        </h2>
        <p className="mb-6">
          Depression isolates. Recovery requires rebuilding social connections—but not superficial ones. Authentic connection protects against future episodes <Citation id="3" index={3} source="American Journal of Psychiatry" year="2019" tier={1} />.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'repairing-relationships',
              title: 'Repairing Damaged Relationships',
              content: (
                <div>
                  <p className="mb-4">
                    Depression strains relationships—you withdrew, became irritable, or pushed people away. Reconnecting requires acknowledging the impact and working to repair.
                  </p>
                  <p className="mb-4">
                    <strong>How to repair:</strong> "I know I was distant/difficult during my depression. I'm sorry for how that affected you. I'd like to reconnect if you're open to it."
                  </p>
                  <p>
                    Some relationships won't survive—and that's okay. Focus on the ones worth rebuilding.
                  </p>
                </div>
              ),
            },
            {
              id: 'authentic-connection',
              title: 'Moving Beyond Surface-Level Connection',
              content: (
                <div>
                  <p className="mb-4">
                    Authentic connection requires vulnerability—sharing your actual thoughts, feelings, and experiences rather than performing who you think you should be.
                  </p>
                  <p className="mb-4">
                    Depression often taught you to hide. Recovery involves selectively opening up to people who've earned trust.
                  </p>
                  <p>
                    <strong>Practice:</strong> Share something real with one trusted person this week. Notice how it feels to be seen.
                  </p>
                </div>
              ),
            },
            {
              id: 'new-connections',
              title: 'Building New Relationships',
              content: (
                <div>
                  <p className="mb-4">
                    Recovery is a chance to build relationships aligned with who you are <strong>now</strong>, not who you were before depression.
                  </p>
                  <p>
                    <strong>Where to start:</strong> Join groups related to your interests or values. Take a class. Volunteer. Show up repeatedly—connection takes time.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="identity-beyond-depression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Rebuilding Identity Beyond Depression
        </h2>
        <p className="mb-6">
          When depression lasts months or years, it becomes part of your identity. Recovery requires separating who you are from what you've experienced.
        </p>

        <BeforeAfter
          before={{
            title: 'Identity Defined by Depression',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I'm a depressed person"</li>
                <li>All conversations revolve around mental health struggles</li>
                <li>Relationships defined by caretaking dynamic</li>
                <li>Hobbies and interests abandoned or forgotten</li>
                <li>Future feels limited by illness</li>
              </ul>
            ),
          }}
          after={{
            title: 'Identity That Includes but Transcends Depression',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I'm someone who has experienced depression and grown from it"</li>
                <li>Can discuss mental health when relevant but it's not your only topic</li>
                <li>Relationships based on mutual interests, values, reciprocity</li>
                <li>Re-engaging with old interests or discovering new ones</li>
                <li>Future feels open and self-determined</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          <strong>How to rebuild identity:</strong> Explore what you're curious about. Try new things. Say yes to invitations. Notice what energizes vs. depletes you. Ask yourself: "Who do I want to become?"
        </p>

        <h2 id="post-traumatic-growth" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Post-Traumatic Growth: Finding Growth Through Struggle
        </h2>
        <p className="mb-6">
          While no one would choose to experience depression, many people report unexpected growth that emerged from the struggle <Citation id="4" index={4} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="did-you-know">
          <p className="mb-4">
            <strong>Common areas of growth after depression:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Increased empathy and compassion</strong> for others" suffering</li>
            <li><strong>Greater appreciation</strong> for life's ordinary moments</li>
            <li><strong>Deeper self-knowledge</strong> and emotional awareness</li>
            <li><strong>Stronger relationships</strong> with people who stayed through the hard times</li>
            <li><strong>Clarified priorities</strong>—knowing what truly matters</li>
            <li><strong>Resilience and confidence</strong> in ability to handle future challenges</li>
            <li><strong>Reduced fear of judgment</strong>—caring less what others think</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6 mt-6">
          Growth doesn't justify suffering, and you don't have to be grateful for depression. But you can acknowledge: "I didn't choose this, but I learned from it."
        </p>

        <h2 id="building-life-worth-protecting" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building a Life Worth Protecting
        </h2>
        <p className="mb-6">
          The best relapse prevention isn't just maintaining wellness practices—it's creating a life so meaningful you're motivated to protect it.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Cultivate Multiple Sources of Meaning',
              description: (
                <p>
                  Don't put all your meaning eggs in one basket (work, one relationship, one goal). Diversified meaning creates resilience—if one area struggles, others sustain you.
                </p>
              ),
            },
            {
              title: 'Engage in Values-Based Living',
              description: (
                <p>
                  Make decisions based on your values, not just avoiding depression. 'What would bring meaning?" becomes your compass, not just "What will prevent relapse?"
                </p>
              ),
            },
            {
              title: 'Create and Contribute',
              description: (
                <p>
                  Creativity and contribution generate meaning. Make something, help someone, teach what you've learned, leave the world slightly better. Purpose emerges from mattering.
                </p>
              ),
            },
            {
              title: 'Practice Gratitude Actively',
              description: (
                <p>
                  Noticing what you appreciate (specific things, not vague "I'm grateful for everything") rewires your brain's default mode toward positivity. Three specific things daily.
                </p>
              ),
            },
          ]}
        />

        <p className="mb-6 mt-8">
          Recovery from depression isn't a return to who you were before—it's becoming someone new. Someone who knows suffering and chose to rebuild. Someone who found meaning not despite depression but through the process of recovering from it. Life after depression can be richer, more authentic, and more intentional than life before—if you actively construct it that way. Resources for recovery and growth available through NAMI <Citation id="6" index={6} source="National Alliance on Mental Illness" year="2023" tier={3} />.
        </p>
      </>
    ),
  },
];
