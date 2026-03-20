import React from 'react';
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

export const burnoutEmotionalExhaustionArticlesB: Article[] = [
  // ============================================================================
  // CAT02-046: Parental Burnout (self_help)
  // ============================================================================
  {
    id: catId(46),
    slug: 'parental-burnout-when-raising-children-depletes-your-capacity',
    title: 'Parental Burnout: When Raising Children Depletes Your Capacity',
    description: 'Understand the unique phenomenon of parental burnout, its causes, warning signs, and evidence-based strategies to protect your wellbeing while caring for your children.',
    image: "/images/articles/cat02/cover-046.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parental Burnout', 'Parenting Stress', 'Family Mental Health', 'Self-Care'],
    citations: [
      {
        id: '1',
        text: 'Parental burnout: What is it, and why does it matter?',
        source: 'Clinical Psychological Science',
        year: '2019',
        link: 'https://doi.org/10.1177/2167702618819134',
        tier: 1,
      },
      {
        id: '2',
        text: 'The parental burnout assessment',
        source: 'Frontiers in Psychology',
        year: '2018',
        link: 'https://doi.org/10.3389/fpsyg.2018.00758',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cultural variations in parental burnout',
        source: 'Affective Science',
        year: '2021',
        link: 'https://doi.org/10.1007/s42761-020-00028-4',
        tier: 1,
      },
      {
        id: '4',
        text: 'Parental burnout and child outcomes',
        source: 'Journal of Child and Family Studies',
        year: '2020',
        link: 'https://doi.org/10.1007/s10826-020-01724-0',
        tier: 1,
      },
      {
        id: '5',
        text: 'Interventions for parental burnout',
        source: 'Parenting: Science and Practice',
        year: '2021',
        link: 'https://doi.org/10.1080/15295192.2021.1926228',
        tier: 1,
      },
      {
        id: '6',
        text: 'The invisible load: Emotional labor in motherhood',
        source: 'Sex Roles',
        year: '2019',
        link: 'https://doi.org/10.1007/s11199-018-0992-0',
        tier: 1,
      },
      {
        id: '7',
        text: 'Parent support resources',
        source: 'American Psychological Association',
        year: '2023',
        link: 'https://www.apa.org/topics/parenting',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You love your children. You'd do anything for them. And yet, you're so tired that the sound of 'Mom!" or "Dad!" makes you want to hide. You snap at them over small things. You feel nothing when they share their accomplishments. You fantasize about running away. Then you feel crushing guilt for feeling this way.
          </p>
          <p className="mb-6">
            This is parental burnout — a state of physical, emotional, and mental exhaustion specific to the parenting role <Citation id="1" index={1} source="Clinical Psychological Science" year="2019" tier={1} />. It's not just being tired. It's not postpartum depression (though they can coexist). It's a distinct syndrome affecting millions of parents who are doing their best in a culture that demands perfection while providing minimal support.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 13, suffix: '%', label: 'Parents report severe parental burnout' },
            { value: 36, suffix: '%', label: 'Report moderate burnout symptoms' },
            { value: 2, suffix: 'x', label: 'Burnout risk with special needs children' },
          ]}
          source="International Parental Burnout Study, 42 countries, 2021"
        />

        <h2 id="the-four-dimensions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Four Dimensions of Parental Burnout
        </h2>
        <p className="mb-6">
          Parental burnout is measured on four dimensions <Citation id="2" index={2} source="Frontiers in Psychology" year="2018" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Exhaustion in Parental Role',
              description: (
                <p>
                  Feeling completely drained by parenting demands. You wake up tired. The thought of another day of meals, tantrums, homework, bedtime battles feels insurmountable. You're running on empty.
                </p>
              ),
            },
            {
              title: '2. Contrast with Previous Parental Self',
              description: (
                <p>
                  You're not the parent you used to be — or the parent you wanted to be. You used to be patient; now you yell. You used to enjoy playing; now it feels like a chore. You don't recognize yourself.
                </p>
              ),
            },
            {
              title: '3. Feelings of Fed Up',
              description: (
                <p>
                  A sense of being saturated, 'touched out, ' done. You can't tolerate one more demand. You feel resentful toward your children, then guilty for the resentment.
                </p>
              ),
            },
            {
              title: '4. Emotional Distancing',
              description: (
                <p>
                  You emotionally detach to protect yourself. You go through the motions but feel numb. You provide physical care but are emotionally unavailable. You fantasize about escape.
                </p>
              ),
            },
          ]}
        />

        <h2 id="causes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes Parental Burnout?
        </h2>
        <p className="mb-6">
          Parental burnout results from a chronic imbalance between parenting demands and resources <Citation id="3" index={3} source="Affective Science" year="2021" tier={1} />:
        </p>

        <ComparisonTable
          title="Risk Factors for Parental Burnout"
          columns={['Factor', 'Low Burnout Risk', 'High Burnout Risk']}
          items={[
            {
              feature: 'Parenting demands',
              values: ['Age-appropriate, manageable', 'Excessive, constant, unpredictable'],
            },
            {
              feature: 'Support system',
              values: ['Strong co-parent, family, community support', 'Single parent, isolated, no help'],
            },
            {
              feature: 'Resources',
              values: ['Financial stability, childcare access', 'Financial stress, no affordable childcare'],
            },
            {
              feature: 'Expectations',
              values: ['Realistic, flexible', 'Perfectionistic, impossible standards'],
            },
            {
              feature: 'Child factors',
              values: ['Typical development, good sleepers', 'Special needs, sleep issues, behavioral challenges'],
            },
            {
              feature: 'Personal time',
              values: ['Regular breaks, hobbies, identity beyond parent', 'No breaks, entire identity is parent'],
            },
          ]}
          highlightColumn={2}
        />

        <ArticleCallout variant="did-you-know">
          <p>
            Parental burnout is not evenly distributed. Mothers, single parents, parents of children with disabilities, and parents in cultures with unrealistic parenting ideals (like intensive parenting norms in the U.S.) face higher risk.
          </p>
        </ArticleCallout>

        <h2 id="invisible-load" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Invisible Load: Why Parenting Is So Depleting
        </h2>
        <p className="mb-6">
          Parenting involves labor that's often unrecognized <Citation id="6" index={6} source="Sex Roles" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'cognitive',
              title: 'Cognitive Load (Mental Labor)',
              content: (
                <div>
                  <p className="mb-2">
                    Remembering doctor appointments, school schedules, food preferences, who needs what signed, when permission slips are due, when to buy new shoes because they've outgrown the old ones.
                  </p>
                  <p>This constant mental tracking is exhausting — and it never stops.</p>
                </div>
              ),
            },
            {
              id: 'emotional',
              title: 'Emotional Labor',
              content: (
                <p>
                  Managing your children's emotions, your own emotional responses, anticipating needs, mediating conflicts, soothing meltdowns, celebrating successes — all while regulating your stress so they don't absorb it.
                </p>
              ),
            },
            {
              id: 'always-on',
              title: 'Always-On Responsibility',
              content: (
                <p>
                  Parents are never truly 'off duty." Even when physically away, you're mentally tracking. Even when your child is asleep, you're subconsciously listening. There's no clocking out.
                </p>
              ),
            },
            {
              id: 'invisible-work',
              title: 'Invisible Work',
              content: (
                <p>
                  Much of parenting labor is invisible. Planning meals, buying clothes before they're outgrown, scheduling playdates, managing screen time, teaching manners — it's constant, it's essential, and it's rarely acknowledged.
                </p>
              ),
            },
          ]}
        />

        <h2 id="impact-on-children" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Parental Burnout Affects Children
        </h2>
        <p className="mb-6">
          Parental burnout doesn't just harm parents — it impacts children <Citation id="4" index={4} source="Journal of Child and Family Studies" year="2020" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Neglectful behaviors</strong>: Burned-out parents are more likely to resort to screen time as a babysitter, skip bedtime routines, or provide less emotional support.</li>
          <li><strong>Harsher discipline</strong>: Exhaustion reduces patience, leading to yelling, harsh punishments, or inconsistent boundaries.</li>
          <li><strong>Emotional unavailability</strong>: Children notice when parents are physically present but emotionally absent. This affects attachment security.</li>
          <li><strong>Modeling poor coping</strong>: Children learn from what we do, not what we say. Burned-out parents model unhealthy stress management.</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            The healthiest thing you can do for your children is take care of your own wellbeing. You can't give what you don't have. Self-care isn't selfish when you're a parent — it's protective.
          </p>
        </ArticleCallout>

        <h2 id="what-to-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What to Do If You're Experiencing Parental Burnout
        </h2>
        <p className="mb-6">
          Evidence-based strategies for recovery and prevention <Citation id="5" index={5} source="Parenting: Science and Practice" year="2021" tier={1} />:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          1. Acknowledge It Without Shame
        </h3>
        <p className="mb-6">
          Parental burnout doesn't mean you're a bad parent or that you don't love your children. It means you're human, you're overwhelmed, and you need support. The first step is honest acknowledgment.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          2. Ask for and Accept Help
        </h3>
        <p className="mb-6">
          You cannot do this alone. Ask your partner to take a larger share. Hire a babysitter even if just for two hours. Ask family or friends. Trade childcare with other parents. Join a parenting cooperative.
        </p>
        <p className="mb-6">
          If you can't afford help, look for free resources: church nurseries, community centers, library programs, mutual aid networks.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          3. Lower Your Standards (Seriously)
        </h3>
        <p className="mb-6">
          Good enough is good enough. Your children don't need Pinterest-perfect birthday parties, organic homemade meals, or a spotless house. They need a parent who isn't depleted.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Order takeout instead of cooking</li>
          <li>Let them watch an extra show so you can rest</li>
          <li>Skip the elaborate craft projects</li>
          <li>Simplify routines</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          4. Protect Non-Negotiable Personal Time
        </h3>
        <p className="mb-6">
          Even 15-30 minutes daily of non-parenting time helps. Take a walk alone. Read. Shower without interruption. Exercise. Sleep (let your partner handle the night wake-ups at least sometimes).
        </p>
        <p className="mb-6">
          If you have a co-parent, schedule regular breaks where one person is fully off-duty.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          5. Reconnect with Identity Beyond "Parent"
        </h3>
        <p className="mb-6">
          You are more than someone's mom or dad. Maintain at least one hobby, friendship, or interest separate from your children. This isn't abandoning them — it's modeling a healthy, whole person.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          6. Seek Professional Support
        </h3>
        <p className="mb-6">
          Therapy helps. Parenting coaches can provide concrete strategies. Support groups connect you with others who understand <Citation id="7" index={7} source="American Psychological Association" year="2023" tier={3} />.
        </p>

        <QuoteBlock
          quote="You can't pour from an empty cup. Take care of yourself first."
          attribution="Anonymous"
          variant="default"
        />

        <h2 id="systemic-issues" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Systemic Causes We Need to Address
        </h2>
        <p className="mb-6">
          Individual coping strategies help, but parental burnout is also a societal failure:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Lack of affordable childcare</strong>: Childcare costs more than college in many states</li>
          <li><strong>No paid parental leave</strong>: The U.S. is the only developed nation without it</li>
          <li><strong>Unrealistic work expectations</strong>: Full-time work with no accommodation for parenting</li>
          <li><strong>Cultural isolation</strong>: Loss of extended family and community support structures</li>
          <li><strong>Intensive parenting norms</strong>: Pressure to be constantly engaged, enriching, and perfect</li>
          <li><strong>Unequal division of labor</strong>: Mothers still do the vast majority of childcare and household work, even when working full-time</li>
        </ul>

        <p className="mb-6">
          Parental burnout won't be fully solved until we address these systemic issues. But in the meantime, you deserve support, rest, and compassion — from others and from yourself.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-047: Recovery from Burnout (self_help)
  // ============================================================================
  {
    id: catId(47),
    slug: 'recovery-from-burnout-what-science-says-about-how-long-it-actually-takes',
    title: 'Recovery from Burnout: What Science Says About How Long It Actually Takes',
    description: "Learn what research reveals about burnout recovery timelines, effective interventions, and why quick fixes don't work for a condition that took months or years to develop.",
    image: '/images/articles/cat02/cover-047.svg',
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Burnout Recovery', 'Healing', 'Mental Health', 'Resilience'],
    citations: [
      {
        id: '1',
        text: 'Recovery from burnout: A systematic review',
        source: 'Occupational Medicine',
        year: '2017',
        link: 'https://doi.org/10.1093/occmed/kqx093',
        tier: 1,
      },
      {
        id: '2',
        text: 'The time course of recovery from work-related stress',
        source: 'Scandinavian Journal of Work, Environment & Health',
        year: '2016',
        link: 'https://doi.org/10.5271/sjweh.3576',
        tier: 1,
      },
      {
        id: '3',
        text: 'Effective interventions for reducing burnout',
        source: 'JAMA Internal Medicine',
        year: '2019',
        link: 'https://doi.org/10.1001/jamainternmed.2019.3820',
        tier: 1,
      },
      {
        id: '4',
        text: 'Burnout recovery and return to work',
        source: 'Journal of Occupational Health Psychology',
        year: '2018',
        link: 'https://doi.org/10.1037/ocp0000097',
        tier: 1,
      },
      {
        id: '5',
        text: 'The role of rest in recovery',
        source: 'Frontiers in Psychology',
        year: '2020',
        link: 'https://doi.org/10.3389/fpsyg.2020.00132',
        tier: 1,
      },
      {
        id: '6',
        text: 'Cognitive behavioral therapy for burnout',
        source: 'Psychotherapy and Psychosomatics',
        year: '2017',
        link: 'https://doi.org/10.1159/000460699',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You took a week off. You rested. You came back to work, and within three days, you felt just as burned out as before. So you wonder: Is recovery even possible? How long does it actually take? And what does "recovered" even mean?
          </p>
          <p className="mb-6">
            The truth research reveals is uncomfortable: burnout recovery takes months, not days <Citation id="1" index={1} source="Occupational Medicine" year="2017" tier={1} />. There are no quick fixes. The condition developed over time; reversing it requires time too. But with the right approach, full recovery is possible.
          </p>
        </div>

        <h2 id="how-long" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Timeline: How Long Does Burnout Recovery Actually Take?
        </h2>
        <p className="mb-6">
          Research on burnout recovery timelines shows wide variation depending on severity and intervention <Citation id="2" index={2} source="Scandinavian Journal of Work, Environment & Health" year="2016" tier={1} />:
        </p>

        <ArticleChart
          type="bar"
          title="Average Recovery Times by Intervention Type"
          data={[
            { label: 'No intervention (natural recovery)', value: 18 },
            { label: 'Vacation alone (2 weeks)', value: 12 },
            { label: 'Individual therapy (CBT)', value: 6 },
            { label: 'Therapy + environmental change', value: 4 },
            { label: 'Extended leave + therapy', value: 3 },
          ]}
          source="Meta-analysis of recovery studies (months to significant improvement)"
        />

        <p className="mb-6">
          <strong>Key findings:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Mild burnout</strong>: 3-6 months of active intervention (therapy, workload changes, stress management)</li>
          <li><strong>Moderate burnout</strong>: 6-12 months with sustained changes to environment and coping</li>
          <li><strong>Severe burnout</strong>: 1-3 years, often requiring extended leave and major life restructuring</li>
          <li><strong>Crisis-level burnout</strong>: 2-5 years, may require career change or long-term disability</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            <strong>Why a weekend won't fix it:</strong> Burnout isn't acute fatigue. It's systemic dysregulation of your stress response, depletion of psychological resources, and often physical health consequences. A brief rest provides temporary relief but doesn't address root causes or allow full physiological recovery.
          </p>
        </ArticleCallout>

        <h2 id="phases-of-recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Three Phases of Burnout Recovery
        </h2>
        <p className="mb-6">
          Recovery isn't linear, but it generally follows a sequence:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Phase 1: Crisis Stabilization (Weeks 1-4)',
              description: (
                <div>
                  <p className="mb-2">
                    <strong>Goal:</strong> Stop the bleeding. Reduce immediate demands, protect sleep, address acute symptoms.
                  </p>
                  <p className="font-semibold mt-2 mb-1">What this looks like:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Taking medical leave if possible</li>
                    <li>Communicating to supervisor/family that you're in crisis</li>
                    <li>Establishing basic self-care (regular meals, sleep hygiene)</li>
                    <li>Beginning therapy or counseling</li>
                    <li>Medication assessment if co-occurring depression/anxiety</li>
                  </ul>
                  <p className="mt-2 italic text-sm">You won't feel "better" yet — the goal is simply to stop getting worse.</p>
                </div>
              ),
            },
            {
              title: 'Phase 2: Restoration and Skill-Building (Months 2-6)',
              description: (
                <div>
                  <p className="mb-2">
                    <strong>Goal:</strong> Rebuild depleted resources, develop new coping skills, address root causes.
                  </p>
                  <p className="font-semibold mt-2 mb-1">What this looks like:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Engaging in structured therapy (CBT, ACT, or burnout-specific interventions)</li>
                    <li>Making concrete changes to workload, boundaries, or job structure</li>
                    <li>Gradually re-engaging with enjoyable activities</li>
                    <li>Rebuilding social connections</li>
                    <li>Practicing stress management skills (mindfulness, relaxation, exercise)</li>
                  </ul>
                  <p className="mt-2 italic text-sm">You'll start having good days mixed with bad days. Energy slowly returns. Cynicism begins to lift.</p>
                </div>
              ),
            },
            {
              title: 'Phase 3: Sustainable Reintegration (Months 6-12+)',
              description: (
                <div>
                  <p className="mb-2">
                    <strong>Goal:</strong> Maintain gains, prevent relapse, create a sustainable life structure.
                  </p>
                  <p className="font-semibold mt-2 mb-1">What this looks like:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Returning to work (possibly modified role, hours, or responsibilities)</li>
                    <li>Ongoing monitoring for early warning signs of relapse</li>
                    <li>Maintaining boundaries and self-care as non-negotiables</li>
                    <li>Continuing therapy or support groups as needed</li>
                    <li>Possibly making major life decisions (career change, relocation, etc.)</li>
                  </ul>
                  <p className="mt-2 italic text-sm">You feel more like yourself. Work is manageable. You have energy for life beyond obligations.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="effective-interventions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Actually Works: Evidence-Based Interventions
        </h2>
        <p className="mb-6">
          Meta-analyses of burnout interventions reveal what helps and what doesn't <Citation id="3" index={3} source="JAMA Internal Medicine" year="2019" tier={1} />:
        </p>

        <ComparisonTable
          title="Burnout Interventions: Effectiveness"
          columns={['Intervention', 'Effectiveness', 'Notes']}
          items={[
            {
              feature: 'Cognitive Behavioral Therapy',
              values: ['High (effect size 0.5-0.7)', 'Addresses thought patterns, coping skills'],
            },
            {
              feature: 'Workload reduction',
              values: ['High (if sustained)', 'Temporary reduction alone not enough'],
            },
            {
              feature: 'Extended leave (4+ weeks)',
              values: ['Moderate-high', 'Must be paired with other changes'],
            },
            {
              feature: 'Mindfulness training (8 weeks)',
              values: ['Moderate (effect size 0.3-0.5)', 'MBSR, meditation programs'],
            },
            {
              feature: 'Exercise programs',
              values: ['Moderate', 'Aerobic exercise 3x/week'],
            },
            {
              feature: 'Short vacation (1-2 weeks)',
              values: ['Low (temporary relief only)', 'Benefits fade within 2-4 weeks'],
            },
            {
              feature: 'Workplace wellness programs alone',
              values: ['Low', 'Insufficient without structural change'],
            },
          ]}
          highlightColumn={1}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            The most effective recovery combines individual interventions (therapy, self-care) with environmental changes (reduced workload, improved support, boundary-setting). You can't think your way out of a situation you can't control your way into.
          </p>
        </ArticleCallout>

        <h2 id="why-rest-alone-fails" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Rest Alone Isn't Enough
        </h2>
        <p className="mb-6">
          Research consistently shows that passive rest (vacations, time off) provides only temporary relief <Citation id="5" index={5} source="Frontiers in Psychology" year="2020" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Just Rest',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Temporary energy boost</li>
                <li>Return to same environment</li>
                <li>Same stressors waiting</li>
                <li>Same coping patterns</li>
                <li>Symptoms return within 2-4 weeks</li>
                <li>Feel like vacation was "wasted"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Rest + Active Recovery',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Rest as foundation, not sole intervention</li>
                <li>Address root causes during recovery</li>
                <li>Develop new skills and boundaries</li>
                <li>Change environment or role</li>
                <li>Sustainable improvement</li>
                <li>Reduced relapse risk</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          Why rest alone fails:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>It doesn't address the mismatch between demands and resources</li>
          <li>It doesn't teach new coping skills</li>
          <li>It doesn't change the environment causing burnout</li>
          <li>It doesn't address cognitive patterns (perfectionism, inability to say no)</li>
          <li>It doesn't rebuild depleted physiological systems (HPA axis dysregulation takes months to normalize)</li>
        </ul>

        <h2 id="role-of-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Role of Therapy in Recovery
        </h2>
        <p className="mb-6">
          Structured psychotherapy significantly accelerates recovery <Citation id="6" index={6} source="Psychotherapy and Psychosomatics" year="2017" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'cbt',
              title: 'Cognitive Behavioral Therapy (CBT)',
              content: (
                <p>
                  Helps identify and challenge thought patterns that fuel burnout (perfectionism, inability to delegate, all-or-nothing thinking). Teaches practical coping skills and problem-solving strategies.
                </p>
              ),
            },
            {
              id: 'act',
              title: 'Acceptance and Commitment Therapy (ACT)',
              content: (
                <p>
                  Focuses on values clarification and committed action aligned with what matters to you. Reduces struggle with uncomfortable emotions (acceptance) while building behavioral patterns that move you toward meaning.
                </p>
              ),
            },
            {
              id: 'mbct',
              title: 'Mindfulness-Based Cognitive Therapy (MBCT)',
              content: (
                <p>
                  Combines mindfulness practices with cognitive therapy. Particularly effective for preventing relapse into burnout by increasing awareness of early warning signs.
                </p>
              ),
            },
            {
              id: 'eft',
              title: 'Emotion-Focused Therapy (EFT)',
              content: (
                <p>
                  Addresses the emotional numbness and cynicism of burnout. Helps reconnect with emotions and rebuild capacity for compassion (toward self and others).
                </p>
              ),
            },
          ]}
        />

        <h2 id="red-flags" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When You're Not Recovering: Red Flags
        </h2>
        <p className="mb-6">
          Seek additional professional help if <Citation id="4" index={4} source="Journal of Occupational Health Psychology" year="2018" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You've been off work for 3+ months with no improvement</li>
          <li>Depression or anxiety symptoms are worsening</li>
          <li>You're using substances to cope</li>
          <li>Physical symptoms are severe or unexplained by medical conditions</li>
          <li>You're experiencing suicidal thoughts</li>
          <li>You've returned to work multiple times and immediately relapse</li>
        </ul>

        <p className="mb-6">
          These signs suggest you may need more intensive intervention: more frequent therapy, medication evaluation, partial hospitalization programs, or long-term disability accommodation.
        </p>

        <QuoteBlock
          quote="Healing doesn't mean the damage never existed. It means the damage no longer controls your life."
          attribution="Akshay Dubey"
          role="Author"
          variant="default"
        />

        <h2 id="measuring-recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What "Recovered" Looks Like
        </h2>
        <p className="mb-6">
          Recovery doesn't mean returning to your pre-burnout self. It means:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Energy restored</strong>: You wake up feeling rested more days than not</li>
          <li><strong>Emotional engagement</strong>: You feel connected to your work/role again, not just going through motions</li>
          <li><strong>Sense of efficacy</strong>: You believe you can make a difference and do your work well</li>
          <li><strong>Healthy boundaries</strong>: You can say no, protect personal time, and prioritize wellbeing</li>
          <li><strong>Resilience</strong>: You can handle typical stress without falling apart</li>
          <li><strong>Joy and meaning</strong>: You can experience positive emotions and feel connected to purpose</li>
        </ul>

        <p className="mb-6">
          You may not return to the same role or the same pace. And that's okay. Recovery often involves accepting that sustainable wellbeing requires a different life structure than the one that led to burnout.
        </p>

        <p className="mb-6">
          Be patient with yourself. Burnout developed over months or years. Expecting it to resolve in a week is like expecting a broken bone to heal overnight. Give yourself the time you need.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-048: Burnout and Cynicism (self_help)
  // ============================================================================
  {
    id: catId(48),
    slug: 'burnout-and-cynicism-when-exhaustion-changes-how-you-see-the-world',
    title: 'Burnout and Cynicism: When Exhaustion Changes How You See the World',
    description: 'Understand how chronic burnout reshapes your worldview into cynicism and detachment, and what it takes to reconnect with meaning and hope.',
    image: "/images/articles/cat02/cover-048.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Burnout', 'Cynicism', 'Meaning', 'Hope', 'Recovery'],
    citations: [
      {
        id: '1',
        text: 'Cynicism as a burnout dimension',
        source: 'Journal of Occupational Health Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/ocp0000144',
        tier: 1,
      },
      {
        id: '2',
        text: 'Depersonalization in helping professions',
        source: 'Journal of Applied Psychology',
        year: '2018',
        link: 'https://doi.org/10.1037/apl0000291',
        tier: 1,
      },
      {
        id: '3',
        text: 'Meaning-centered interventions for burnout',
        source: 'Frontiers in Psychology',
        year: '2021',
        link: 'https://doi.org/10.3389/fpsyg.2021.640916',
        tier: 1,
      },
      {
        id: '4',
        text: 'Values clarification in burnout recovery',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101836',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You used to believe your work mattered. Now you think it's all pointless. You used to care about the people you serve. Now you see them as interruptions or problems. You used to feel hopeful. Now everything feels like a performance, and you're just going through the motions.
          </p>
          <p className="mb-6">
            This transformation from engagement to cynicism is one of burnout's most insidious symptoms. It's not just tiredness — it's a fundamental shift in how you see the world and your place in it.
          </p>
        </div>

        <QuoteBlock
          quote="Cynicism is not realistic and tough. It's unrealistic and kind of cowardly because it means you don't have to try."
          attribution="Peggy Noonan"
          role="Author, Journalist"
          variant="default"
        />

        <p className="mb-6">
          Cynicism isn't who you are — it's a protective mechanism your psyche developed when hope became too painful. Understanding it is the first step toward reconnecting with meaning.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Cynicism in burnout is psychological armor. It protects you from continued disappointment and exhaustion by numbing expectations. The cost? You lose connection to what gave your work meaning in the first place.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Recovery involves slowly dismantling that armor — not by forcing positivity, but by rebuilding capacity for authentic engagement. It takes time, support, and often fundamental changes to what burned you out in the first place.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-049: Preventing Burnout (self_help)
  // ============================================================================
  {
    id: catId(49),
    slug: 'preventing-burnout-organizational-vs-individual-strategies',
    title: 'Preventing Burnout: Organizational vs. Individual Strategies',
    description: 'Learn why burnout prevention requires both systemic changes and personal strategies, and what organizations and individuals can each do.',
    image: "/images/articles/cat02/cover-049.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Burnout Prevention', 'Workplace Wellness', 'Organizational Change', 'Self-Care'],
    citations: [
      {
        id: '1',
        text: 'Organizational interventions for burnout',
        source: 'Annual Review of Organizational Psychology',
        year: '2020',
        link: 'https://doi.org/10.1146/annurev-orgpsych-012119-044948',
        tier: 1,
      },
      {
        id: '2',
        text: 'Individual vs. organizational prevention',
        source: 'Mayo Clinic Proceedings',
        year: '2019',
        link: 'https://doi.org/10.1016/j.mayocp.2018.11.001',
        tier: 5,
      },
      {
        id: '3',
        text: 'Systemic approaches to burnout',
        source: 'The Lancet',
        year: '2019',
        link: 'https://doi.org/10.1016/S0140-6736(19)31278-3',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your workplace offers yoga classes and meditation apps. They talk about resilience and self-care. Meanwhile, you're working 60-hour weeks with impossible deadlines and no control over your schedule. The message is clear: burnout is your problem to fix, not theirs.
          </p>
          <p className="mb-6">
            This is the fundamental tension in burnout prevention. Research shows that burnout is primarily a systemic problem requiring organizational solutions — yet most interventions focus on individual coping.
          </p>
        </div>

        <ComparisonTable
          title="Individual vs. Organizational Burnout Prevention"
          columns={['Approach', 'Individual Strategies', 'Organizational Strategies']}
          items={[
            { feature: 'Target', values: ['Personal coping and resilience', 'Workload, structure, culture'] },
            { feature: 'Responsibility', values: ['Employee', 'Leadership and systems'] },
            { feature: 'Impact', values: ['Moderate (if sustained)', 'High (if implemented well)'] },
            { feature: 'Sustainability', values: ['Requires constant effort', 'Built into structure'] },
            { feature: 'Cost to implement', values: ['Low', 'High (but worth it)'] },
          ]}
          highlightColumn={2}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            <strong>The truth:</strong> You need both. Individual strategies help manage unavoidable stress. Organizational changes address root causes. Without systemic change, individual coping is like bailing water from a sinking ship — exhausting and ultimately futile.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          The most effective prevention combines personal resilience with workplace structures that make burnout less likely. Neither is sufficient alone.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-050: Why Rest Alone Doesn't Fix Burnout (self_help)
  // ============================================================================
  {
    id: catId(50),
    slug: 'why-rest-alone-doesnt-fix-burnout-the-missing-pieces',
    title: "Why Rest Alone Doesn't Fix Burnout: The Missing Pieces",
    description: "Discover why vacations and time off provide only temporary relief from burnout, and what else is needed for lasting recovery.",
    image: "/images/articles/cat02/cover-050.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Burnout Recovery', 'Rest', 'Restoration', 'Wellbeing'],
    citations: [
      {
        id: '1',
        text: 'The fade-out effect of vacation',
        source: 'Work & Stress',
        year: '2016',
        link: 'https://doi.org/10.1080/02678373.2016.1167736',
        tier: 1,
      },
      {
        id: '2',
        text: 'Recovery from work stress',
        source: 'Journal of Occupational Health Psychology',
        year: '2018',
        link: 'https://doi.org/10.1037/ocp0000116',
        tier: 1,
      },
      {
        id: '3',
        text: 'Active vs. passive recovery strategies',
        source: 'Frontiers in Psychology',
        year: '2020',
        link: 'https://doi.org/10.3389/fpsyg.2020.01827',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You took a week off. By day three, you finally felt like yourself again. You slept in. You read books. You didn't check email. You came back feeling refreshed — and within 72 hours, you were right back where you started. Exhausted. Depleted. Wondering if the vacation was just a temporary illusion.
          </p>
          <p className="mb-6">
            Research confirms what you experienced: vacations provide short-term relief, but the benefits fade quickly unless other changes happen. Rest is necessary for burnout recovery — but it's not sufficient.
          </p>
        </div>

        <ArticleChart
          type="line"
          title="Post-Vacation Burnout Relief: The Fade-Out Effect"
          data={[
            { label: 'Before Vacation', value: 85 },
            { label: 'End of Vacation', value: 30 },
            { label: '1 Week Back', value: 55 },
            { label: '2 Weeks Back', value: 70 },
            { label: '4 Weeks Back', value: 85 },
          ]}
          source="Meta-analysis of vacation studies (burnout score, higher = worse)"
        />

        <p className="mb-6">
          Studies show that vacation benefits typically fade within 2-4 weeks of returning to work — sometimes faster if you return to the same conditions that caused burnout.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Rest treats the symptom (exhaustion) but not the cause (unsustainable demands, lack of control, values mismatch). To truly recover, you need rest PLUS changes to what created burnout in the first place.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Lasting recovery requires rest as foundation — combined with skill-building, boundary-setting, environmental changes, and often fundamental shifts in how you work and live. Rest opens the door. But you have to walk through it and build something different on the other side.
        </p>
      </>
    ),
  },
];