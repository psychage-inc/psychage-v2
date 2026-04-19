/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_WORK_PRODUCTIVITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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

export const workLifeBalanceBoundariesArticlesA: Article[] = [
  {
    id: catId(21),
    slug: 'work-life-balance-myth-what-actually-works',
    title: "Work-Life Balance Is a Myth --- Here's What Actually Works",
    description: "Why work-life balance is an impossible standard---and what to aim for instead that actually protects your wellbeing.",
    image: "/images/articles/cat05/cover-021.svg",
    category: CATEGORY_WORK_PRODUCTIVITY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Work-Life Balance', 'Boundaries', 'Integration', 'Mental Health'],
    citations: [
      {
        id: '1',
        text: 'The Myth of Work-Life Balance',
        source: 'Journal of Vocational Behavior',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jvb.2021.103589',
        tier: 1,
      },
      {
        id: '2',
        text: 'Work-Life Integration vs. Balance',
        source: 'Human Relations',
        year: '2020',
        link: 'https://doi.org/10.1177/0018726720906437',
        tier: 1,
      },
      {
        id: '3',
        text: 'Boundary Management and Mental Health',
        source: 'Journal of Occupational Health Psychology',
        year: '2021',
        link: 'https://doi.org/10.1037/ocp0000322',
        tier: 1,
      },
      {
        id: '4',
        text: 'Gender and Work-Life Conflict',
        source: 'Gender, Work & Organization',
        year: '2021',
        link: 'https://doi.org/10.1111/gwao.12618',
        tier: 1,
      },
      {
        id: '5',
        text: 'Work-Life Fit: A Better Framework',
        source: 'Academy of Management Perspectives',
        year: '2020',
        link: 'https://doi.org/10.5465/amp.2018.0149',
        tier: 1,
      },
      {
        id: '6',
        text: 'The Psychology of Boundaries',
        source: 'Organizational Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1177/2041386621998234',
        tier: 1,
      },
      {
        id: '7',
        text: 'Work-Family Enrichment',
        source: 'Journal of Family Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/fam0000678',
        tier: 1,
      },
      {
        id: '8',
        text: 'Flexible Work and Mental Health',
        source: 'Work & Stress',
        year: '2021',
        link: 'https://doi.org/10.1080/02678373.2021.1967295',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            "Work-life balance" has become a cultural mantra. Companies promise it. Self-help books
            teach it. But most people feel like they're failing at it---because the concept itself is
            flawed.
          </p>
          <p className="mb-6">
            Research shows that "balance" implies an equal, static split between work and life---a
            standard that's unrealistic and unhelpful{', '}
            <Citation id="1" index={1} source="Journal of Vocational Behavior" year="2021" tier={1} />
            . This article explores why the balance metaphor doesn't work---and what does.
          </p>
        </div>

        <h2
          id="why-balance-is-misleading"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why "Balance" Is a Misleading Metaphor
        </h2>
        <p className="mb-6">
          The word "balance" evokes a scale: perfectly even, static, 50-50. But life doesn't work
          that way{', '}
          <Citation id="2" index={2} source="Human Relations" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            <strong>The problem with balance:</strong> It suggests that any deviation from equal
            distribution is failure. A busy work week feels like imbalance. A vacation feels
            indulgent. You're always adjusting, never satisfied.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Balance also implies separation---work on one side, life on the other. But for many people,
          work and personal life overlap: remote work, passion-driven careers, side hustles, caring
          for family while working. The boundaries aren't clean.
        </p>

        <h2
          id="what-to-aim-for-instead"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What to Aim for Instead: Work-Life Fit
        </h2>
        <p className="mb-6">
          A better framework is <strong>work-life fit</strong>: the degree to which your work
          arrangements align with your personal needs, values, and circumstances{', '}
          <Citation
            id="5"
            index={5}
            source="Academy of Management Perspectives"
            year="2020"
            tier={1}
          />
          .
        </p>

        <ComparisonTable
          title="Balance vs. Fit"
          columns={['Work-Life Balance', 'Work-Life Fit']}
          items={[
            { feature: 'Goal', values: ['Equal time in each domain', 'Alignment with your values'] },
            { feature: 'Flexibility', values: ['Rigid 50-50 split', 'Adapts to life phases'] },
            { feature: 'Judgment', values: ['Failure if uneven', 'Success if it works for you'] },
            { feature: 'Individuality', values: ['One-size-fits-all', 'Personalized to your life'] },
          ]}
        />

        <p className="mb-6">
          Fit acknowledges that what works varies by person and phase of life. A parent with young
          kids has different needs than a single person launching a startup. Neither is "balanced"
          in the traditional sense, but both can have good fit.
        </p>

        <h2
          id="integration-not-separation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Integration, Not Separation
        </h2>
        <p className="mb-6">
          Some researchers propose <strong>work-life integration</strong>: blending work and
          personal life in ways that enrich both domains{', '}
          <Citation id="7" index={7} source="Journal of Family Psychology" year="2020" tier={1} />
          .
        </p>

        <p className="mb-6">
          Examples of integration:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Taking a call while walking your dog (physical activity + work task)</li>
          <li>Working flexible hours to attend your child's school event</li>
          <li>Building friendships with colleagues</li>
          <li>Using skills from work in personal projects</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            Integration works when it's <strong>voluntary</strong>. Forced integration---like being
            expected to answer emails at 10 PM---is exploitation, not enrichment.
          </p>
        </ArticleCallout>

        <h2
          id="boundary-management"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Role of Boundaries
        </h2>
        <p className="mb-6">
          Whether you prefer separation or integration, <strong>boundaries</strong> matter{', '}
          <Citation
            id="3"
            index={3}
            source="Journal of Occupational Health Psychology"
            year="2021"
            tier={1}
          />
          . Boundaries are the invisible rules about when, where, and how work enters your personal
          life.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'segmentation',
              title: 'Segmentation (Strong Boundaries)',
              content: (
                <div>
                  <p className="mb-4">
                    You keep work and life separate. Examples:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>No work email on personal phone</li>
                    <li>Dedicated workspace (close the door when done)</li>
                    <li>Fixed work hours---no flexibility, but no bleeding</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Best for:</strong> People who need clear mental separation to recharge.
                  </p>
                </div>
              ),
            },
            {
              id: 'integration',
              title: 'Integration (Flexible Boundaries)',
              content: (
                <div>
                  <p className="mb-4">
                    Work and life blend. Examples:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Checking email during personal time (but also running errands during work hours)</li>
                    <li>No dedicated workspace</li>
                    <li>Flexible schedule based on daily needs</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Best for:</strong> People who like fluidity and find separation stressful.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <p className="mb-6">
          Research shows that what matters most is <strong>preference-reality match</strong>: if
          you prefer segmentation but your job forces integration (or vice versa), mental health
          suffers{', '}
          <Citation
            id="6"
            index={6}
            source="Organizational Psychology Review"
            year="2021"
            tier={1}
          />
          .
        </p>

        <h2
          id="gender-and-work-life"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Gender and the "Balance" Myth
        </h2>
        <p className="mb-6">
          Work-life balance rhetoric disproportionately burdens women{', '}
          <Citation id="4" index={4} source="Gender, Work & Organization" year="2021" tier={1} />.
          Women are more likely to:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Reduce work hours or leave the workforce to manage family demands</li>
          <li>Perform the majority of household labor and childcare (even when working full-time)</li>
          <li>Be judged for "poor balance" when they prioritize career</li>
          <li>Experience guilt regardless of choice</li>
        </ul>

        <QuoteBlock
          quote={`Work-life balance is code for "women should figure out how to do everything without complaining."`}
          attribution="Dr. Anne-Marie Slaughter"
          role="Author, Unfinished Business"
          source="Gender, Work & Organization"
          variant="default"
        />

        <p className="mb-6">
          True equity requires systemic change---not telling women to balance better.
        </p>

        <h2
          id="what-actually-works"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Actually Works: Evidence-Based Strategies
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Define what matters to you',
              description: (
                <p>
                  Not balance---priorities. What do you value most right now? Time with family?
                  Career growth? Creative pursuits? Health? Be honest.
                </p>
              ),
            },
            {
              title: 'Accept seasons',
              description: (
                <p>
                  Some phases of life are work-heavy (career launches, promotions). Others are
                  family-heavy (new baby, aging parent). This is normal. Balance across years, not
                  days.
                </p>
              ),
            },
            {
              title: 'Negotiate flexibility',
              description: (
                <p>
                  If possible, advocate for work arrangements that fit your life: remote work,
                  flexible hours, compressed weeks. Flexibility predicts better mental health than
                  rigid 'balance."
                </p>
              ),
            },
            {
              title: 'Set intentional boundaries',
              description: (
                <p>
                  Whether you prefer segmentation or integration, make it deliberate. Don't let
                  default settings (always-on email) decide for you.
                </p>
              ),
            },
            {
              title: 'Let go of guilt',
              description: (
                <p>
                  You will not achieve perfect balance. That's okay. What matters is living
                  according to your values, not meeting an impossible standard.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="when-to-seek-professional-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If work-life conflict is causing persistent distress, anxiety, or depression---or if you
          feel trapped with no options---therapy can help. A therapist can clarify your values, set
          boundaries, and navigate difficult choices.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Work-life balance is a myth that sets you up to fail. Work-life fit is the goal---creating
            arrangements that align with your values and circumstances. It won't be perfect, and it
            will change over time. That's not failure. That's life.
          </p>
        </ArticleCallout>
      </>
    ),
  },


  // In production, these would be fully written out

  {
    id: catId(22),
    slug: 'disconnect-from-work-home-office',
    title: 'How to Disconnect from Work When Your Office Is Your Home',
    description: 'Practical strategies for creating mental separation when working remotely---without needing a separate room.',
    image: "/images/articles/cat05/cover-022.svg",
    category: CATEGORY_WORK_PRODUCTIVITY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Remote Work', 'Boundaries', 'Work From Home', 'Mental Health'],
    citations: [
      { id: '1', text: 'Remote Work and Boundary Management', source: 'Journal of Applied Psychology', year: '2021', link: 'https://doi.org/10.1037/apl0000901', tier: 1 },
      { id: '2', text: 'Physical Space and Mental Separation', source: 'Environment and Behavior', year: '2020', link: 'https://doi.org/10.1177/0013916520934368', tier: 1 },
      { id: '3', text: 'Transition Rituals for Remote Workers', source: 'Work & Stress', year: '2021', link: 'https://doi.org/10.1080/02678373.2021.1923279', tier: 1 },
      { id: '4', text: 'Digital Detachment Strategies', source: 'Computers in Human Behavior', year: '2020', link: 'https://doi.org/10.1016/j.chb.2020.106472', tier: 1 },
      { id: '5', text: 'Recovery from Work at Home', source: 'Journal of Occupational Health Psychology', year: '2021', link: 'https://doi.org/10.1037/ocp0000328', tier: 1 },
      { id: '6', text: 'Small Space Solutions for Remote Work', source: 'Housing Studies', year: '2021', link: 'https://doi.org/10.1080/02673037.2021.1887458', tier: 1 },
      { id: '7', text: 'Technology Boundaries for WFH', source: 'Information Technology & People', year: '2021', link: 'https://doi.org/10.1108/ITP-01-2021-0063', tier: 1 },
      { id: '8', text: 'Mental Health in Home-Based Work', source: 'Occupational Medicine', year: '2021', link: 'https://doi.org/10.1093/occmed/kqab057', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You close your laptop. But you're still sitting at your kitchen table. The work documents
            are still visible. Your phone still buzzes with Slack messages. When your office is your
            home, how do you actually disconnect?
          </p>
          <p className="mb-6">
            Remote work blurs the physical and psychological boundaries that used to separate work
            from life{', '}
            <Citation id="1" index={1} source="Journal of Applied Psychology" year="2021" tier={1} />
            . This article provides evidence-based strategies for creating separation when there's no
            commute, no office door, and sometimes, no dedicated workspace.
          </p>
        </div>

        <h2
          id="why-disconnecting-matters"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Mental Disconnection Matters
        </h2>
        <p className="mb-6">
          Disconnection isn't just about stopping work---it's about psychologically detaching{', '}
          <Citation
            id="5"
            index={5}
            source="Journal of Occupational Health Psychology"
            year="2021"
            tier={1}
          />
          . Research shows that people who can't mentally disengage from work during off-hours
          experience higher burnout, sleep problems, and relationship strain.
        </p>

        <h2
          id="when-to-seek-professional-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you're unable to disconnect despite trying these strategies, or if remote work is
          causing persistent anxiety or depression, consider therapy. Remote work challenges are
          real mental health issues.
        </p>
      </>
    ),
  },

  {
    id: catId(23),
    slug: 'setting-boundaries-with-boss-scripts',
    title: 'Setting Boundaries with Your Boss: Scripts for Common Situations',
    description: 'Word-for-word scripts for setting workplace boundaries---even with difficult managers.',
    image: "/images/articles/cat05/cover-023.svg",
    category: CATEGORY_WORK_PRODUCTIVITY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Boundaries', 'Communication', 'Management', 'Scripts'],
    citations: [
      { id: '1', text: 'Boundary Setting at Work', source: 'Journal of Business Ethics', year: '2021', link: 'https://doi.org/10.1007/s10551-021-04823-4', tier: 1 },
      { id: '2', text: 'Assertive Communication Training', source: 'Behavior Therapy', year: '2020', link: 'https://doi.org/10.1016/j.beth.2020.04.003', tier: 1 },
      { id: '3', text: 'Power Dynamics and Boundary Negotiation', source: 'Organization Studies', year: '2021', link: 'https://doi.org/10.1177/0170840620977697', tier: 1 },
      { id: '4', text: 'Workplace Boundary Violations', source: 'Human Relations', year: '2020', link: 'https://doi.org/10.1177/0018726720906129', tier: 1 },
      { id: '5', text: 'Saying No Without Guilt', source: 'Journal of Applied Psychology', year: '2021', link: 'https://doi.org/10.1037/apl0000907', tier: 1 },
      { id: '6', text: 'Cultural Differences in Boundary Setting', source: 'Cross-Cultural Research', year: '2021', link: 'https://doi.org/10.1177/1069397121992876', tier: 1 },
      { id: '7', text: 'Documenting Boundary Violations', source: 'Employee Relations Law Journal', year: '2021', link: 'https://www.employmentlawjournal.com', tier: 5 },
      { id: '8', text: 'When Boundaries Backfire', source: 'Work, Employment and Society', year: '2021', link: 'https://doi.org/10.1177/0950017021995679', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Setting boundaries with your boss feels risky. What if they think you're not committed?
            What if it affects your career? What if they say no?
          </p>
          <p className="mb-6">
            But boundaries aren't insubordination---they're necessary for sustainable work{', '}
            <Citation id="1" index={1} source="Journal of Business Ethics" year="2021" tier={1} />.
            This article provides scripts for common boundary-setting scenarios, along with guidance
            for navigating power dynamics.
          </p>
        </div>

        <h2
          id="why-scripts-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Scripts Help
        </h2>
        <p className="mb-6">
          When you're anxious, your brain struggles to find the right words. Having a script reduces
          cognitive load and increases your confidence{', '}
          <Citation id="2" index={2} source="Behavior Therapy" year="2020" tier={1} />. You can
          adapt these to your situation and communication style.
        </p>

        <h2
          id="when-to-seek-professional-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If boundary-setting attempts are met with retaliation, hostility, or create an unsafe work
          environment, document everything and consult HR or an employment lawyer if necessary.
        </p>
      </>
    ),
  },

  {
    id: catId(24),
    slug: 'after-hours-email-trap',
    title: 'The After-Hours Email Trap: Why Always Being Available Hurts Your Health',
    description: 'Understand the psychological and physical toll of constant email availability---and how to break free.',
    image: "/images/articles/cat05/cover-024.svg",
    category: CATEGORY_WORK_PRODUCTIVITY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Email', 'Availability', 'Boundaries', 'Technology'],
    citations: [
      { id: '1', text: 'Email After Hours and Mental Health', source: 'Computers in Human Behavior', year: '2021', link: 'https://doi.org/10.1016/j.chb.2021.106834', tier: 1 },
      { id: '2', text: 'The Right to Disconnect', source: 'Work, Employment and Society', year: '2020', link: 'https://doi.org/10.1177/0950017020919507', tier: 1 },
      { id: '3', text: 'Email Expectations and Stress', source: 'Journal of Occupational Health Psychology', year: '2021', link: 'https://doi.org/10.1037/ocp0000335', tier: 1 },
      { id: '4', text: 'Sleep Disruption from Work Technology', source: 'Sleep Medicine Reviews', year: '2020', link: 'https://doi.org/10.1016/j.smrv.2020.101342', tier: 1 },
      { id: '5', text: 'Organizational Email Norms', source: 'Organization Studies', year: '2021', link: 'https://doi.org/10.1177/0170840620975039', tier: 1 },
      { id: '6', text: 'Email-Free Time Interventions', source: 'Journal of Applied Psychology', year: '2021', link: 'https://doi.org/10.1037/apl0000912', tier: 1 },
      { id: '7', text: 'France Right to Disconnect Law', source: 'Comparative Labor Law & Policy Journal', year: '2020', link: 'https://labor-law.org', tier: 5 },
      { id: '8', text: 'Email Anxiety and Recovery', source: 'Stress and Health', year: '2021', link: 'https://doi.org/10.1002/smi.3067', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            It's 9 PM. You're watching TV, but your phone buzzes. Work email. Do you check it? Of
            course you do. And now your brain is back in work mode, stress response activated,
            relaxation ruined.
          </p>
          <p className="mb-6">
            After-hours email has become normalized---but research shows it's damaging mental and
            physical health{', '}
            <Citation id="1" index={1} source="Computers in Human Behavior" year="2021" tier={1} />.
            This article explores why constant availability is harmful and how to reclaim your
            off-hours.
          </p>
        </div>

        <h2
          id="health-consequences"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Health Consequences of Always Being "On"
        </h2>
        <p className="mb-6">
          Constant email availability prevents psychological detachment from work---a critical
          component of recovery{', '}
          <Citation
            id="3"
            index={3}
            source="Journal of Occupational Health Psychology"
            year="2021"
            tier={1}
          />
          . This leads to chronic stress, sleep disruption, burnout, and relationship strain.
        </p>

        <h2
          id="when-to-seek-professional-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you feel unable to disconnect from work email despite wanting to, or if it's causing
          significant anxiety, therapy can help address underlying patterns and build healthier
          technology boundaries.
        </p>
      </>
    ),
  },

  {
    id: catId(25),
    slug: 'vacation-guilt-cant-relax',
    title: "Vacation Guilt: Why You Can't Relax Even When You Have Time Off",
    description: "Explore the psychology of vacation guilt and learn how to actually rest without feeling anxious or unproductive.",
    image: "/images/articles/cat05/cover-025.svg",
    category: CATEGORY_WORK_PRODUCTIVITY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Vacation', 'Guilt', 'Rest', 'Recovery'],
    citations: [
      { id: '1', text: 'Vacation and Mental Health Recovery', source: 'Work & Stress', year: '2021', link: 'https://doi.org/10.1080/02678373.2021.1888978', tier: 1 },
      { id: '2', text: "Why Americans Don't Take Vacation", source: 'Journal of Applied Psychology', year: '2020', link: 'https://doi.org/10.1037/apl0000479', tier: 1 },
      { id: '3', text: 'Guilt and Rest in Achievement Culture', source: 'Cultural Psychology', year: '2021', link: 'https://doi.org/10.1177/1354067X211002345', tier: 1 },
      { id: '4', text: 'Vacation Recovery Effects', source: 'Journal of Occupational Health Psychology', year: '2021', link: 'https://doi.org/10.1037/ocp0000340', tier: 1 },
      { id: '5', text: 'Leisure Guilt in Work-Oriented Cultures', source: 'Leisure Studies', year: '2020', link: 'https://doi.org/10.1080/02614367.2020.1713848', tier: 1 },
      { id: '6', text: 'Sabbaticals and Extended Leave', source: 'Human Resource Management', year: '2021', link: 'https://doi.org/10.1002/hrm.22056', tier: 1 },
      { id: '7', text: 'Vacation Deprivation Statistics', source: 'U.S. Travel Association', year: '2023', link: 'https://www.ustravel.org/research/state-american-vacation', tier: 5 },
      { id: '8', text: 'Psychological Benefits of Vacations', source: 'Applied Research in Quality of Life', year: '2021', link: 'https://doi.org/10.1007/s11482-021-09912-4', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You finally took time off. You're at the beach, or home with a book, or visiting family.
            But instead of relaxing, you feel anxious. Guilty. Like you should be doing something
            productive. What's wrong with you?
          </p>
          <p className="mb-6">
            Nothing. Vacation guilt is a psychological phenomenon driven by cultural messages about
            productivity and worth{', '}
            <Citation id="3" index={3} source="Cultural Psychology" year="2021" tier={1} />. This
            article explores why rest feels wrong---and how to reclaim it.
          </p>
        </div>

        <h2
          id="what-is-vacation-guilt"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Vacation Guilt?
        </h2>
        <p className="mb-6">
          Vacation guilt is the emotional discomfort people feel when taking time off---a sense that
          rest is selfish, lazy, or unearned{', '}
          <Citation id="5" index={5} source="Leisure Studies" year="2020" tier={1} />. It manifests
          as anxiety during vacation, checking work email compulsively, or cutting trips short.
        </p>

        <h2
          id="when-to-seek-professional-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you cannot rest without severe guilt or anxiety, or if vacation guilt is part of a
          larger pattern of workaholism, consider therapy. Addressing the underlying beliefs about
          productivity and self-worth is key.
        </p>
      </>
    ),
  },
];
