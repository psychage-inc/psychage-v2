 
// ============================================================================
// Category 18 --- Women's Mental Health | Subcategory 02b
// Perinatal and Postpartum Mental Health (Articles 16-20)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
import { ArticleAccordion } from '@/components/article/blocks/ArticleAccordion';
import { ArticleTabs } from '@/components/article/blocks/ArticleTabs';
import { QuoteBlock } from '@/components/article/blocks/QuoteBlock';
import { ProgressSteps } from '@/components/article/blocks/ProgressSteps';
import { BeforeAfter } from '@/components/article/blocks/BeforeAfter';
import { ComparisonTable } from '@/components/article/blocks/ComparisonTable';
export const articles: Article[] = [
  // ==========================================================================
  // Article 16: Pregnancy After Loss
  // ==========================================================================
  {
    id: catId(16),
    slug: 'pregnancy-after-loss-navigating-fear-hope-and-complicated-emotions',
    status: 'archived',
    title: `Pregnancy After Loss: Navigating Fear, Hope, and Complicated Emotions`,
    description: `Understand the unique psychological challenges of pregnancy after miscarriage, stillbirth, or infant loss, including managing anxiety and honoring both grief and hope.`,
    image: '/images/articles/cat18/cover-016.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 14,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Pregnancy After Loss', 'Grief', 'Anxiety', 'Rainbow Pregnancy'],

    summary: `Pregnancy after loss---whether from miscarriage, stillbirth, or infant death---brings complex emotions: hope mixed with terror, joy shadowed by trauma, and difficulty bonding due to fear of another loss. Up to 40% of people pregnant after loss experience clinically significant anxiety or depression. Common challenges include hypervigilance about fetal movement, difficulty celebrating pregnancy milestones, survivor's guilt, and feeling unable to discuss fears without seeming ungrateful. Support requires acknowledging both grief for the lost baby and hope for the current pregnancy---these emotions coexist and both are valid.`,

    keyFacts: [
      {
        text: `30-40% of people experience clinically significant anxiety or depression during pregnancy after loss.`,
        citationIndex: 1,
      },
      {
        text: `Pregnancy after loss is often called "rainbow pregnancy"---beauty after a storm---but the metaphor can minimize ongoing grief and fear.`,
        citationIndex: 2,
      },
      {
        text: `Trauma-informed prenatal care that acknowledges loss history significantly reduces anxiety and improves bonding outcomes.`,
        citationIndex: 3,
      },
      {
        text: `Women with a history of miscarriage have a 35% higher risk of developing prenatal anxiety compared to those without loss history.`,
        citationIndex: 4,
      },
      {
        text: `Delayed bonding during pregnancy after loss is a protective mechanism, not a failure of maternal instinct or love.`,
        citationIndex: 5,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The understanding that you can simultaneously grieve one baby and hope for another---these are not conflicting emotions but the reality of holding both loss and possibility in a heart stretched wide by love.`,

    practicalExercise: {
      title: `Holding Both Grief and Hope`,
      steps: [
        {
          title: `Name your fears`,
          description: `Write what you're afraid of in this pregnancy. Naming fears reduces their power and helps distinguish realistic concerns from anxiety spirals.`,
        },
        {
          title: `Honor both babies`,
          description: `Find a way to acknowledge your lost baby while connecting with this pregnancy---separate journals, a ritual, or simply saying both names. You don't have to choose between them.`,
        },
        {
          title: `Set protective boundaries`,
          description: `It's okay to delay sharing pregnancy news, skip baby showers, or opt out of excited conversations. Protect your emotional space.`,
        },
        {
          title: `Find specialized support`,
          description: `Connect with pregnancy-after-loss support groups or therapists who understand this specific experience. General pregnancy support often doesn't address grief.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Emotional Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Mental health in pregnancy after perinatal loss`,
        source: `Obstetrics & Gynecology`,
        year: `2022`,
        link: `https://doi.org/10.1097/AOG.0000000000004892`,
        tier: 1,
      },
      {
        id: '2',
        text: `Psychological aspects of pregnancy following loss`,
        source: `Journal of Perinatal Medicine`,
        year: `2023`,
        link: `https://doi.org/10.1515/jpm-2022-0456`,
        tier: 1,
      },
      {
        id: '3',
        text: `Trauma-informed care in pregnancy after loss`,
        source: `Birth: Issues in Perinatal Care`,
        year: `2023`,
        link: `https://doi.org/10.1111/birt.12678`,
        tier: 1,
      },
      {
        id: '4',
        text: `Anxiety and depression in subsequent pregnancy after miscarriage`,
        source: `Archives of Women's Mental Health`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00737-022-01287-8`,
        tier: 1,
      },
      {
        id: '5',
        text: `Maternal-fetal attachment in pregnancy after loss`,
        source: `Journal of Reproductive and Infant Psychology`,
        year: `2022`,
        link: `https://doi.org/10.1080/02646838.2021.2012837`,
        tier: 1,
      },
      {
        id: '6',
        text: `Guidelines for perinatal bereavement care`,
        source: `American College of Obstetricians and Gynecologists`,
        year: `2023`,
        link: `https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2023/03/perinatal-bereavement`,
        tier: 2,
      },
      {
        id: '7',
        text: `Pregnancy and infant loss statistics`,
        source: `National Institute of Child Health and Human Development`,
        year: `2024`,
        link: `https://www.nichd.nih.gov/health/topics/pregnancyloss`,
        tier: 2,
      },
      {
        id: '8',
        text: `Support interventions for pregnancy after loss`,
        source: `BMC Pregnancy and Childbirth`,
        year: `2023`,
        link: `https://doi.org/10.1186/s12884-023-05678-9`,
        tier: 1,
      },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When the ultrasound showed a heartbeat at 8 weeks, Kendra felt numb instead of joyful.
            Her previous pregnancy had ended at 10 weeks---she couldn't let herself believe this one
            would be different. Each prenatal appointment brought panic, not excitement.
          </p>
          <p className="mb-6">
            <Citation index={1} id="1" source="Obstetrics & Gynecology" year="2022" tier={1} /> She checked for bleeding constantly, counted every symptom as proof of
            impending loss, and couldn't bring herself to tell anyone she was pregnant. When friends
            asked if she was "so excited," Kendra lied. The truth---that she was terrified---felt like
            tempting fate or dishonoring the baby. But the fear was suffocating. This is the reality
            of pregnancy after loss: hope shadowed by trauma, joy complicated by fear, and a journey
            that asks you to hold both grief and possibility in the same fragile heart.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 30, suffix: '-40%', label: 'of people experience significant anxiety during pregnancy after loss' },
            { value: 35, suffix: '%', label: 'higher risk of prenatal anxiety with loss history' },
          ]}
          source="Archives of Women's Mental Health, 2023"
        />

        <h2 id="psychological-landscape" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Psychological Landscape of Pregnancy After Loss
        </h2>
        <p className="mb-6">
          Pregnancy after loss exists in the tension between hope and terror. Unlike first
          pregnancies marked by innocent excitement, pregnancy after loss carries the knowledge
          that pregnancy doesn't guarantee a baby. <Citation index={2} id="2" source="Journal of Perinatal Medicine" year="2023" tier={1} /> This awareness fundamentally changes
          the pregnancy experience, creating a unique psychological landscape that deserves
          recognition and specialized support.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'hypervigilance',
              title: 'Hypervigilance and Safety Monitoring',
              content: (
                <div>
                  <p className="mb-4">
                    Constant monitoring of symptoms, fetal movement, and bleeding. Difficulty trusting
                    that baby is okay between appointments. Checking for signs of loss multiple times
                    per hour. This vigilance is exhausting but feels essential---the mind's attempt to
                    prevent another loss through sheer watchfulness.
                  </p>
                  <p>
                    While some monitoring is protective, excessive checking can increase anxiety rather
                    than relieve it. Finding balance between appropriate awareness and obsessive
                    vigilance is a key challenge of pregnancy after loss.
                  </p>
                </div>
              ),
            },
            {
              id: 'delayed-bonding',
              title: 'Delayed Bonding as Self-Protection',
              content: (
                <div>
                  <p className="mb-4">
                    Many describe feeling emotionally distant from the pregnancy---avoiding baby names,
                    delaying nursery preparation, struggling to imagine a future with this child.
                    <Citation index={5} id="5" source="Journal of Reproductive and Infant Psychology" year="2022" tier={1} /> This isn't failure to love the baby; it's
                    self-protection against devastating grief if loss occurs again.
                  </p>
                  <p>
                    The challenge is that this protective distance, while understandable, can interfere
                    with prenatal bonding that supports maternal well-being and infant attachment. Finding
                    ways to connect with the pregnancy while acknowledging fear is a delicate balance.
                  </p>
                </div>
              ),
            },
            {
              id: 'milestone-anxiety',
              title: 'Milestone Anxiety',
              content: (
                <div>
                  <p className="mb-4">
                    Each milestone that passed before previous loss triggers intense fear. The week of
                    previous loss becomes a psychological hurdle---will this pregnancy also end here?
                    Reaching "viability" (24 weeks) or entering the third trimester feels less like
                    celebration and more like holding your breath.
                  </p>
                  <p>
                    Difficulty celebrating achievements means missing positive pregnancy experiences.
                    Partners or family may not understand why you can't join their excitement at
                    milestones that should feel joyful.
                  </p>
                </div>
              ),
            },
            {
              id: 'survivors-guilt',
              title: 'Survivor\'s Guilt',
              content: (
                <div>
                  <p>
                    Questioning why this pregnancy continues when the previous one didn't. Feeling
                    disloyal to the lost baby by hoping for this one. Some describe feeling they must
                    choose between grieving one baby and bonding with another---an impossible choice that
                    creates profound inner conflict and guilt.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <p className="mb-6">
          Social isolation compounds these challenges. People may delay pregnancy announcements,
          avoid baby preparation, or withdraw from pregnant friends whose excitement feels
          inaccessible. Well-meaning comments like "At least you can get pregnant!" or "This one
          will be fine!" minimize both the previous loss and current fear. <Citation index={4} id="4" source="Archives of Women's Mental Health" year="2023" tier={1} /> Many describe feeling
          unable to express anxiety without seeming ungrateful or pessimistic---as though fear invalidates
          gratitude for a new pregnancy.
        </p>

        <QuoteBlock
          quote="I felt I had to choose between honoring my lost baby and welcoming this one. It took months to understand I could do both---that loving one didn't betray the other."
          attribution="Parent pregnant after loss"
          role="Rainbow pregnancy support group"
          variant="large"
        />

        <ArticleCallout variant="did-you-know" title="The Rainbow Pregnancy Metaphor">
          <p className="mb-4">
            'Rainbow baby' refers to a baby born after loss---beauty after a storm. While the metaphor
            honors hope, it can inadvertently minimize ongoing grief and fear.  A rainbow doesn't erase
            the storm or undo its damage; it exists alongside the aftermath.
          </p>
          <p>
            Pregnancy after loss involves both grief for the baby who died and hope for the baby who
            may live. Both emotions are real, valid, and can coexist. You are not required to feel only
            joy because you're pregnant again, nor to hide fear because it might seem pessimistic.
            This pregnancy's complexity is the truth, not a failure.
          </p>
        </ArticleCallout>

        <h2 id="managing-anxiety" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Managing Anxiety and Trauma Symptoms
        </h2>
        <p className="mb-6">
          <Citation index={3} id="3" source="Birth: Issues in Perinatal Care" year="2023" tier={1} /> Pregnancy after loss can trigger or worsen trauma symptoms,
          especially as pregnancy progresses past the point of previous loss. The body remembers what
          the mind tries to forget, and certain gestational weeks, ultrasound appointments, or physical
          sensations can trigger flashbacks to discovering the previous loss.
        </p>

        <ComparisonTable
          title="Normal Pregnancy Anxiety vs. Trauma Symptoms"
          columns={['Experience', 'Normal Anxiety', 'Trauma Response']}
          items={[
            {
              feature: 'Worry about baby',
              values: ['Occasional, manageable', 'Constant, intrusive'],
            },
            {
              feature: 'Symptom checking',
              values: ['Periodic awareness', 'Obsessive monitoring'],
            },
            {
              feature: 'Appointment anxiety',
              values: ['Nervous before ultrasounds', 'Panic attacks, flashbacks'],
            },
            {
              feature: 'Coping with reassurance',
              values: [true, false],
            },
            {
              feature: 'Impact on functioning',
              values: ['Minimal', 'Significant impairment'],
            },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6">
          Trauma symptoms may include flashbacks to discovering the loss (vivid sensory memories
          triggered by medical settings, pregnancy symptoms, or specific gestational weeks), intrusive
          thoughts about another loss occurring (unwanted mental images of finding no heartbeat or
          experiencing bleeding), physical anxiety symptoms at medical appointments (racing heart,
          nausea, dizziness, or panic attacks during ultrasounds), and avoidance of pregnancy-related
          activities that feel too hopeful or risky (refusing baby showers, avoiding nursery setup,
          or withdrawing from pregnancy communities).
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Grounding Techniques for Acute Anxiety',
              description: (
                <div>
                  <p className="mb-3">
                    When anxiety spikes, use <strong>5-4-3-2-1 sensory grounding</strong>: identify 5
                    things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This anchors
                    you in present reality rather than feared catastrophe.
                  </p>
                  <p>
                    Other effective techniques include box breathing (4 counts in, 4 hold, 4 out, 4
                    hold), progressive muscle relaxation, or placing ice on pulse points for rapid
                    nervous system regulation.
                  </p>
                </div>
              ),
            },
            {
              title: 'Realistic Reassurance',
              description: (
                <div>
                  <p>
                    Learn to distinguish between anxiety-based fears and actual warning signs. Work with
                    providers on appropriate monitoring that addresses real risks without excessive
                    testing that feeds anxiety. <Citation index={6} id="6" source="ACOG Committee Opinion" year="2023" tier={2} /> Not every worry requires an ultrasound; not
                    every sensation signals loss. Therapy can help develop this discernment.
                  </p>
                </div>
              ),
            },
            {
              title: 'Scheduled Worry Time',
              description: (
                <div>
                  <p>
                    Designate 15-20 minutes daily to fully process fears---write them down, feel them,
                    explore worst-case scenarios. Outside this window, practice redirecting anxious
                    thoughts: "I've scheduled time for this worry; I'll address it then." This prevents
                    all-day rumination while honoring that fears need processing.
                  </p>
                </div>
              ),
            },
            {
              title: 'Connection with Specialized Support',
              description: (
                <div>
                  <p>
                    Seek pregnancy-after-loss support groups (online or local) where fears are normalized,
                    not dismissed. General pregnancy groups often don't understand the complexity of
                    holding both hope and terror. Finding community with others on this specific journey
                    reduces isolation and validates your experience.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="trauma-informed-care" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Trauma-Informed Prenatal Care
        </h2>
        <p className="mb-6">
          Healthcare providers can significantly reduce distress through trauma-informed care---an
          approach that recognizes the impact of previous loss and adapts care to support emotional
          safety alongside physical health. <Citation index={8} id="8" source="BMC Pregnancy and Childbirth" year="2023" tier={1} /> Unfortunately, many providers receive little
          training in pregnancy after loss, leading to inadvertently harmful responses.
        </p>

        <BeforeAfter
          before={{
            title: 'Standard Care (Often Harmful)',
            points: [
              'Loss history noted only at intake, never revisited',
              '"Don\'t worry, lightning doesn\'t strike twice" (false reassurance)',
              '"You need to relax or you\'ll stress the baby" (adds guilt)',
              'Routine appointment schedule regardless of anxiety level',
              'Dismissing fears as irrational or overly anxious',
              'Focus only on current pregnancy without acknowledging lost baby',
            ],
          }}
          after={{
            title: 'Trauma-Informed Care (Supportive)',
            points: [
              'Acknowledging loss history at every appointment',
              'Validating fear as normal given past experience',
              'Offering extra ultrasounds or monitoring when appropriate',
              'Flexible appointment scheduling (e.g., weekly in early pregnancy)',
              'Providing clear information without false reassurance',
              'Respecting birth preferences related to previous trauma',
            ],
          }}
        />

        <p className="mb-6">
          Specific trauma-informed practices include acknowledging both babies (referring to "your
          babies" plural, asking about the lost child's name or due date), respecting protective
          behaviors (understanding delayed bonding or nursery setup as coping, not rejection),
          collaborative decision-making about monitoring (discussing risks/benefits of extra
          ultrasounds rather than rigid protocols), and validating emotional responses (normalizing
          tears, panic, or numbness as understandable given circumstances).
        </p>

        <p className="mb-6">
          <Citation index={7} id="7" source="NICHD" year="2024" tier={2} /> If providers can't offer trauma-informed care, it's appropriate to seek different
          providers who understand pregnancy after loss. You deserve care that addresses both your
          physical health and emotional well-being. Advocacy is not being difficult---it's ensuring you
          receive appropriate support for your specific circumstances.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Pregnancy after loss is psychologically distinct from first pregnancy, requiring specific
              support and understanding, not just reassurance to "relax."
            </li>
            <li>
              30-40% experience clinically significant anxiety or depression during pregnancy after
              loss---you're not alone or overreacting.
            </li>
            <li>
              Delayed bonding is self-protection, not failure to love your baby. Finding ways to connect
              while acknowledging fear is possible with support.
            </li>
            <li>
              Trauma-informed prenatal care significantly improves outcomes---seek providers who
              understand pregnancy after loss and adapt care accordingly.
            </li>
            <li>
              You can simultaneously grieve one baby and hope for another. These emotions coexist; you
              don't have to choose between them.
            </li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 17: Perinatal OCD
  // ==========================================================================
  {
    id: catId(17),
    slug: 'perinatal-ocd-intrusive-thoughts-and-compulsive-safety-behaviors',
    status: 'archived',
    title: `Perinatal OCD: Intrusive Thoughts and Compulsive Safety Behaviors`,
    description: `Understand perinatal obsessive-compulsive disorder, distinguish it from normal worry, and learn about exposure-based treatments that reduce obsessions and compulsions.`,
    image: '/images/articles/cat18/cover-017.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 15,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Perinatal OCD', 'Intrusive Thoughts', 'Postpartum OCD', 'Compulsions'],

    summary: `Perinatal OCD affects 2-9% of pregnant and postpartum people, characterized by intrusive, distressing thoughts about harm to baby and compulsive behaviors aimed at preventing harm. Common obsessions include thoughts of accidentally or intentionally harming baby, contamination fears, fears of being a pedophile, and symmetry/order obsessions. Compulsions include excessive checking, cleaning, reassurance-seeking, and avoidance. Perinatal OCD is often misdiagnosed as generalized anxiety or postpartum depression. Exposure and Response Prevention (ERP) therapy is highly effective, helping people learn that intrusive thoughts are not dangerous and compulsions are unnecessary.`,

    keyFacts: [
      {
        text: `2-9% of perinatal people develop OCD, with onset often in late pregnancy or early postpartum period.`,
        citationIndex: 1,
      },
      {
        text: `Intrusive thoughts about harm in perinatal OCD are ego-dystonic (unwanted, distressing, opposite of desires)---very different from psychotic delusions.`,
        citationIndex: 2,
      },
      {
        text: `Exposure and Response Prevention (ERP) therapy achieves 60-80% symptom reduction in perinatal OCD.`,
        citationIndex: 3,
      },
      {
        text: `Up to 91% of new mothers experience intrusive thoughts about harm---but only 2-9% develop clinical OCD requiring treatment.`,
        citationIndex: 4,
      },
      {
        text: `Perinatal OCD is often misdiagnosed as postpartum depression or generalized anxiety disorder, delaying appropriate treatment.`,
        citationIndex: 5,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The liberation of learning that horrifying intrusive thoughts are a symptom of how much you care about your baby's safety---not a sign of danger---and that you don't have to perform rituals or avoid triggers to keep your baby safe.`,

    practicalExercise: {
      title: `Recognizing OCD Patterns`,
      steps: [
        {
          title: `Identify the cycle`,
          description: `Notice: obsession (intrusive thought) → anxiety spike → compulsion (safety behavior) → temporary relief → obsession returns. This cycle maintains OCD.`,
        },
        {
          title: `Distinguish OCD from reality`,
          description: `Ask: Is this thought distressing and unwanted (OCD)? Or is this something I actually want to do (not OCD)? Perinatal OCD thoughts are ego-dystonic---opposite of desires.`,
        },
        {
          title: `Track your compulsions`,
          description: `List all safety behaviors: checking, reassurance-seeking, mental rituals, avoidance. Even subtle compulsions maintain OCD.`,
        },
        {
          title: `Seek ERP-trained therapist`,
          description: `Find a therapist specifically trained in Exposure and Response Prevention for OCD. General anxiety treatment won't target the OCD cycle.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track OCD Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Prevalence of perinatal OCD`,
        source: `Journal of Clinical Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.4088/JCP.21r14256`,
        tier: 1,
      },
      {
        id: '2',
        text: `Clinical features of perinatal obsessive-compulsive disorder`,
        source: `Archives of Women's Mental Health`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00737-022-01289-6`,
        tier: 1,
      },
      {
        id: '3',
        text: `Treatment of perinatal OCD with ERP`,
        source: `Behaviour Research and Therapy`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.brat.2022.104223`,
        tier: 1,
      },
      {
        id: '4',
        text: `Intrusive thoughts in new mothers: normality and clinical significance`,
        source: `Journal of Anxiety Disorders`,
        year: `2022`,
        link: `https://doi.org/10.1016/j.janxdis.2021.102478`,
        tier: 1,
      },
      {
        id: '5',
        text: `Misdiagnosis and delayed treatment of perinatal OCD`,
        source: `Obstetrics & Gynecology Clinics`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.ogc.2023.02.012`,
        tier: 1,
      },
      {
        id: '6',
        text: `Serotonin and OCD: neurobiological mechanisms`,
        source: `Biological Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.biopsych.2022.11.023`,
        tier: 1,
      },
      {
        id: '7',
        text: `Practice guidelines for perinatal mental health screening`,
        source: `American Psychiatric Association`,
        year: `2023`,
        link: `https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines`,
        tier: 2,
      },
      {
        id: '8',
        text: `Medication safety in perinatal OCD treatment`,
        source: `Journal of Clinical Psychopharmacology`,
        year: `2023`,
        link: `https://doi.org/10.1097/JCP.0000000000001625`,
        tier: 1,
      },
      {
        id: '9',
        text: `Cognitive-behavioral therapy for perinatal anxiety disorders`,
        source: `Clinical Psychology Review`,
        year: `2022`,
        link: `https://doi.org/10.1016/j.cpr.2022.102189`,
        tier: 1,
      },
      {
        id: '10',
        text: `International OCD Foundation clinical resources`,
        source: `International OCD Foundation`,
        year: `2024`,
        link: `https://iocdf.org/about-ocd/ocd-treatment/`,
        tier: 3,
      },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Every time Rachel held her newborn son, an image flashed through her mind: dropping him
            down the stairs. She would freeze in terror, then immediately put him down and check his
            body for injuries---even though she hadn't actually dropped him.
          </p>
          <p className="mb-6">
            <Citation index={1} id="1" source="Journal of Clinical Psychiatry" year="2022" tier={1} /> The thought felt like a premonition, a warning that she was dangerous. She stopped
            carrying him near stairs, then near any hard surfaces, then avoided holding him while
            standing. She spent hours googling "postpartum psychosis" and "thoughts about harming
            baby," terrified she was becoming dangerous. When a therapist finally explained perinatal
            OCD, Rachel cried with relief: she wasn't psychotic or evil---she had a treatable, common
            anxiety disorder that weaponizes love as fear.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 2, suffix: '-9%', label: 'of perinatal people develop clinical OCD' },
            { value: 91, suffix: '%', label: 'of new mothers experience intrusive thoughts (normal)' },
          ]}
          source="Journal of Anxiety Disorders, 2022"
        />

        <h2 id="understanding-ocd" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Perinatal OCD
        </h2>
        <p className="mb-6">
          Perinatal OCD is characterized by obsessions (intrusive, unwanted thoughts, images, or
          urges that cause significant distress) and compulsions (repetitive behaviors or mental acts
          performed to reduce anxiety from obsessions). <Citation index={2} id="2" source="Archives of Women's Mental Health" year="2023" tier={1} /> What distinguishes OCD from normal
          new-parent worry is the intensity, frequency, and interference with functioning---and the
          presence of compulsive rituals that temporarily relieve but ultimately maintain anxiety.
        </p>

        <ComparisonTable
          title="Common Perinatal Obsessions and Compulsions"
          columns={['Obsession Type', 'Example Thoughts', 'Common Compulsions']}
          items={[
            {
              feature: 'Harm Obsessions',
              values: [
                'Dropping, shaking, stabbing baby',
                'Checking body, avoiding stairs/knives, constant supervision',
              ],
            },
            {
              feature: 'Contamination',
              values: [
                'Germs, chemicals harming baby',
                'Excessive handwashing, sterilizing, avoiding public places',
              ],
            },
            {
              feature: 'Symmetry/"Just Right"',
              values: [
                'Rituals must be perfect to keep baby safe',
                'Repeating actions, arranging objects, counting',
              ],
            },
            {
              feature: 'Sexual/Religious',
              values: [
                'Unwanted sexual thoughts about baby',
                'Reassurance-seeking, avoidance, mental rituals',
              ],
            },
          ]}
        />

        <p className="mb-6">
          <Citation index={4} id="4" source="Journal of Anxiety Disorders" year="2022" tier={1} /> The critical distinction: up to 91% of new mothers experience intrusive thoughts about
          harm, but only 2-9% develop clinical OCD. What separates normal intrusive thoughts from OCD
          is the response---most people dismiss the thoughts as meaningless mental noise, while those
          with OCD interpret thoughts as dangerous and engage in compulsions to prevent imagined harm.
        </p>

        <ArticleCallout variant="warning" title="Perinatal OCD vs. Postpartum Psychosis">
          <div className="space-y-4">
            <p>
              These conditions are completely different and require different treatment. Understanding
              the distinction is crucial---and reassuring for those with OCD.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-bold mb-2">Perinatal OCD</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Thoughts are ego-dystonic (unwanted, horrifying)</li>
                  <li>Insight intact (knows thoughts are irrational)</li>
                  <li>No intention to act on thoughts</li>
                  <li>Distress from thoughts</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">Postpartum Psychosis (Emergency)</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Delusions are ego-syntonic (believed true)</li>
                  <li>Insight impaired (can't recognize irrationality)</li>
                  <li>May believe thoughts are commands</li>
                  <li>Detachment from reality</li>
                </ul>
              </div>
            </div>
            <p className="font-semibold">
              If you're terrified by your thoughts, that's OCD. If you believe your thoughts are true
              commands you should follow, that's psychosis---seek emergency care immediately.
            </p>
          </div>
        </ArticleCallout>

        <h2 id="why-develops" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Perinatal OCD Develops
        </h2>
        <p className="mb-6">
          <Citation index={3} id="3" source="Behaviour Research and Therapy" year="2023" tier={1} /> Perinatal OCD emerges from a perfect storm of biological vulnerability, psychological
          factors, and the profound identity shift of becoming a parent. <Citation index={6} id="6" source="Biological Psychiatry" year="2023" tier={1} /> Understanding these
          factors helps reduce shame---this is not a character flaw but a treatable condition rooted
          in biology and circumstance.
        </p>

        <ProgressSteps
          variant="horizontal"
          steps={[
            {
              title: 'Biological Factors',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Hormonal fluctuations:</strong> Estrogen and progesterone dramatically shift
                    during pregnancy and postpartum, affecting serotonin---the neurotransmitter implicated
                    in OCD. These hormonal changes can unmask or worsen OCD symptoms.
                  </p>
                  <p>
                    <strong>Genetic vulnerability:</strong> Family history of OCD or anxiety disorders
                    increases risk. Perinatal stress may trigger dormant genetic predisposition.
                  </p>
                </div>
              ),
            },
            {
              title: 'Psychological Factors',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Heightened responsibility:</strong> Becoming a parent creates intense awareness
                    of baby's vulnerability. Harm-related thoughts become more salient and distressing when
                    you're solely responsible for a helpless human.
                  </p>
                  <p>
                    <strong>Sleep deprivation:</strong> Chronic sleep loss worsens OCD symptoms, makes it
                    harder to dismiss intrusive thoughts, and lowers the threshold for anxiety.
                  </p>
                </div>
              ),
            },
            {
              title: 'The OCD Paradox',
              description: (
                <div>
                  <p>
                    The cruel irony: perinatal OCD affects people who deeply care about their baby's safety.
                    The more you value your baby's wellbeing, the more distressing intrusive harm thoughts
                    become, and the more compulsions you perform. OCD weaponizes your love against you.
                    Intrusive thoughts are a symptom of caring too much, not too little.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="I thought the thoughts meant I was dangerous. My therapist explained they meant the opposite---that I cared so deeply about my baby's safety that my brain was on hyper-alert. The thoughts weren't a sign of danger; they were a sign of love gone into overdrive."
          attribution="Mother with perinatal OCD"
          role="ERP therapy participant"
          variant="large"
        />

        <h2 id="recognizing-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing the OCD Cycle
        </h2>
        <p className="mb-6">
          <Citation index={5} id="5" source="Obstetrics & Gynecology Clinics" year="2023" tier={1} /> Perinatal OCD is often misdiagnosed as generalized anxiety or postpartum depression,
          delaying appropriate treatment. Learning to recognize the OCD cycle helps distinguish it from
          other conditions and guides treatment.
        </p>

        <BeforeAfter
          before={{
            title: 'Life Before Recognizing OCD',
            points: [
              'Believing intrusive thoughts mean you\'re dangerous',
              'Performing endless compulsions to prevent harm',
              'Avoiding situations that trigger obsessions',
              'Shame and secrecy about thoughts',
              'Exhaustion from mental and physical rituals',
              'Feeling alone and abnormal',
            ],
          }}
          after={{
            title: 'Life After Understanding OCD',
            points: [
              'Recognizing thoughts as OCD symptoms, not truths',
              'Learning compulsions maintain the cycle',
              'Gradually facing feared situations (ERP)',
              'Connecting with others who understand',
              'Directing energy toward recovery, not rituals',
              'Freedom from constant anxiety and checking',
            ],
          }}
        />

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: Exposure and Response Prevention
        </h2>
        <p className="mb-6">
          The most effective treatment for perinatal OCD is Exposure and Response Prevention (ERP), a
          specialized form of cognitive-behavioral therapy. <Citation index={9} id="9" source="Clinical Psychology Review" year="2022" tier={1} /> ERP is counterintuitive but
          powerful: instead of avoiding feared thoughts or performing compulsions, you gradually confront
          fears while resisting safety behaviors. This breaks the OCD cycle by teaching your brain that
          intrusive thoughts are not dangerous and compulsions are unnecessary.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'exposure',
              label: 'Exposure Component',
              content: (
                <div className="space-y-4">
                  <p>
                    Exposure means gradually, systematically confronting feared situations or thoughts.
                    This doesn't mean doing something dangerous---it means facing the anxiety itself.
                  </p>
                  <p className="font-semibold mb-2">Examples of exposure in perinatal OCD:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Holding baby near stairs (if obsession is dropping baby down stairs)
                    </li>
                    <li>
                      Being in the kitchen with baby (if obsession is stabbing with knives)
                    </li>
                    <li>
                      Intentionally thinking the intrusive thought without performing rituals
                    </li>
                    <li>
                      Reducing excessive handwashing or sterilization (contamination fears)
                    </li>
                    <li>
                      Bathing baby without checking water temperature 10 times
                    </li>
                  </ul>
                  <p>
                    Exposures are hierarchical---starting with moderately anxiety-provoking situations and
                    gradually progressing to more challenging ones as anxiety decreases.
                  </p>
                </div>
              ),
            },
            {
              id: 'response-prevention',
              label: 'Response Prevention',
              content: (
                <div className="space-y-4">
                  <p>
                    Response prevention means refraining from compulsions that provide temporary relief.
                    This is the hardest part---anxiety spikes without compulsions---but it's essential for
                    breaking the cycle.
                  </p>
                  <p className="font-semibold mb-2">Common compulsions to resist:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Checking:</strong> Resisting the urge to repeatedly check baby's breathing,
                      locks, appliances, or your body for signs you harmed baby
                    </li>
                    <li>
                      <strong>Reassurance-seeking:</strong> Not asking partner "I wouldn't hurt our baby,
                      right?" or googling symptoms
                    </li>
                    <li>
                      <strong>Mental rituals:</strong> Not counting, praying, or repeating phrases to
                      "undo" intrusive thoughts
                    </li>
                    <li>
                      <strong>Avoidance:</strong> Confronting rather than avoiding knives, stairs, bathtubs,
                      or being alone with baby
                    </li>
                  </ul>
                  <p>
                    The goal: let anxiety rise and then naturally fall on its own, without compulsions. This
                    teaches your brain that intrusive thoughts aren't dangerous and you can tolerate
                    uncertainty.
                  </p>
                </div>
              ),
            },
            {
              id: 'medication',
              label: 'Medication Options',
              content: (
                <div className="space-y-4">
                  <p>
                    <Citation index={8} id="8" source="Journal of Clinical Psychopharmacology" year="2023" tier={1} /> For moderate-to-severe perinatal OCD, medication can augment ERP
                    therapy. SSRIs (selective serotonin reuptake inhibitors) are first-line treatment,
                    particularly sertraline, fluoxetine, or fluvoxamine.
                  </p>
                  <p className="font-semibold">Medication considerations:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Many SSRIs are safe during pregnancy and breastfeeding (consult with psychiatrist
                      specializing in perinatal mental health)
                    </li>
                    <li>
                      Medication alone is less effective than ERP alone; combination treatment is ideal
                    </li>
                    <li>
                      Typically takes 8-12 weeks to see full benefit; don't discontinue early
                    </li>
                    <li>
                      Higher doses often needed for OCD than for depression
                    </li>
                  </ul>
                  <p>
                    The decision to use medication is personal and depends on severity, breastfeeding
                    status, previous medication response, and individual risk-benefit analysis with your
                    provider.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <p className="mb-6">
          <Citation index={10} id="10" source="International OCD Foundation" year="2024" tier={3} /> Treatment typically involves 12-20 weekly ERP sessions, though some may need longer.
          The good news: 60-80% of people achieve significant symptom reduction with proper treatment.
          Recovery is possible, and you can bond with your baby without the interference of intrusive
          thoughts and compulsions.
        </p>

        <ArticleCallout variant="tip" title="Finding an ERP-Trained Therapist">
          <p className="mb-4">
            Not all therapists are trained in ERP. General talk therapy or cognitive therapy without
            exposure often doesn't effectively treat OCD. Ask potential therapists:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              "Do you specialize in OCD treatment using Exposure and Response Prevention?"
            </li>
            <li>
              "Have you treated perinatal OCD specifically?"
            </li>
            <li>
              "What does ERP look like for harm obsessions?"
            </li>
            <li>
              "How many sessions of ERP do you typically provide?"
            </li>
          </ul>
          <p className="mt-4">
            If a therapist offers only reassurance ("You would never hurt your baby") without addressing
            compulsions, they may not have OCD-specific training. Organizations like the International
            OCD Foundation (IOCDF) maintain directories of ERP-trained providers.
          </p>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              91% of new mothers have intrusive thoughts---but only 2-9% develop clinical OCD requiring
              treatment. Intrusive thoughts alone don't mean you have OCD.
            </li>
            <li>
              Perinatal OCD thoughts are ego-dystonic (unwanted, horrifying)---very different from
              psychotic delusions. If you're terrified by your thoughts, that's OCD, not psychosis.
            </li>
            <li>
              Compulsions (checking, reassurance-seeking, avoidance) maintain OCD by reinforcing the
              belief that thoughts are dangerous. Breaking this cycle requires facing fears without
              rituals.
            </li>
            <li>
              ERP therapy is highly effective (60-80% symptom reduction), teaching your brain that
              intrusive thoughts aren't dangerous and you can tolerate uncertainty.
            </li>
            <li>
              Intrusive harm thoughts are a symptom of how much you care about your baby's safety, not a
              sign you're dangerous. OCD weaponizes love as fear---treatment liberates you from this
              cruel paradox.
            </li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 18: Tokophobia (Fear of Childbirth)
  // ==========================================================================
  {
    id: catId(18),
    slug: 'tokophobia-understanding-and-treating-fear-of-childbirth',
    status: 'draft',
    title: `Tokophobia: Understanding and Treating Fear of Childbirth`,
    description: `Explore tokophobia (pathological fear of childbirth), distinguish it from normal birth anxiety, and learn about therapeutic interventions that reduce fear and support birth decision-making.`,
    image: '/images/articles/cat18/cover-018.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Tokophobia', 'Birth Fear', 'Childbirth', 'Maternal Request Cesarean'],

    summary: `Tokophobia is pathological fear of childbirth, affecting 6-14% of pregnant people. Primary tokophobia occurs in people who have never given birth; secondary tokophobia develops after traumatic birth experiences. Symptoms include severe anxiety or panic about labor, avoidance of pregnancy despite wanting children, termination of wanted pregnancy due to fear, and requests for elective cesarean to avoid labor. Tokophobia is distinct from normal birth anxiety---it's debilitating and interferes with reproductive decisions. Treatment includes psychoeducation, cognitive-behavioral therapy, birth trauma processing (for secondary tokophobia), and respectful discussion of birth options including maternal request cesarean.`,

    keyFacts: [
      {
        text: `6-14% of pregnant people experience tokophobia, with severe fear that significantly impacts pregnancy and birth planning.`,
        citationIndex: 1,
      },
      {
        text: `Primary tokophobia (in those who haven't given birth) is often rooted in witnessing traumatic births, sexual trauma, or fear of pain and loss of control.`,
        citationIndex: 2,
      },
      {
        text: `Cognitive-behavioral therapy reduces tokophobia symptoms by 40-60%, helping people make informed birth decisions from a place of reduced fear.`,
        citationIndex: 3,
      },
      {
        text: `Up to 14% of maternal request cesareans are driven by severe tokophobia, though access varies widely by provider and country.`,
        citationIndex: 4,
      },
      {
        text: `Secondary tokophobia after traumatic birth affects 3-6% of people and is essentially birth PTSD manifesting as phobic avoidance.`,
        citationIndex: 5,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The validation that extreme fear of childbirth is not cowardice or weakness but a specific phobia deserving of treatment---and that choosing how you give birth based on what feels safest to you is not "giving up" but exercising bodily autonomy.`,

    practicalExercise: {
      title: `Fear Assessment and Autonomy`,
      steps: [
        {
          title: `Rate your fear`,
          description: `On a scale of 0-10, rate your fear of childbirth. Scores of 7-10 that interfere with pregnancy planning, prenatal care, or bonding may indicate tokophobia warranting treatment.`,
        },
        {
          title: `Identify fear sources`,
          description: `What specifically are you afraid of? Pain, loss of control, tearing, medical interventions, death, witnessing trauma? Specificity helps target treatment.`,
        },
        {
          title: `Separate fear from choice`,
          description: `Ask: If I had no fear, what birth would I choose? Then: What accommodations would help me feel safer? This clarifies whether fear is driving decisions.`,
        },
        {
          title: `Seek specialized support`,
          description: `Find a therapist experienced in tokophobia and an OB/midwife who respects maternal autonomy in birth planning. Both are essential.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Fear Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Prevalence and impact of tokophobia`,
        source: `BJOG: An International Journal of Obstetrics & Gynaecology`,
        year: `2022`,
        link: `https://doi.org/10.1111/1471-0528.17209`,
        tier: 1,
      },
      {
        id: '2',
        text: `Primary and secondary tokophobia: clinical features`,
        source: `Archives of Women's Mental Health`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00737-022-01312-w`,
        tier: 1,
      },
      {
        id: '3',
        text: `Psychotherapeutic interventions for tokophobia`,
        source: `Acta Obstetricia et Gynecologica Scandinavica`,
        year: `2023`,
        link: `https://doi.org/10.1111/aogs.14478`,
        tier: 1,
      },
      {
        id: '4',
        text: `Maternal request cesarean delivery: prevalence and outcomes`,
        source: `American Journal of Obstetrics & Gynecology`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.ajog.2022.11.045`,
        tier: 1,
      },
      {
        id: '5',
        text: `Birth trauma and secondary tokophobia`,
        source: `Journal of Psychosomatic Obstetrics & Gynecology`,
        year: `2022`,
        link: `https://doi.org/10.1080/0167482X.2022.2048923`,
        tier: 1,
      },
      {
        id: '6',
        text: `Sexual trauma and fear of childbirth`,
        source: `Birth: Issues in Perinatal Care`,
        year: `2023`,
        link: `https://doi.org/10.1111/birt.12689`,
        tier: 1,
      },
      {
        id: '7',
        text: `ACOG Committee Opinion on maternal request cesarean delivery`,
        source: `American College of Obstetricians and Gynecologists`,
        year: `2023`,
        link: `https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2023/05/cesarean-delivery-on-maternal-request`,
        tier: 2,
      },
      {
        id: '8',
        text: `Trauma-focused CBT for birth-related PTSD`,
        source: `Clinical Psychology Review`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.cpr.2023.102267`,
        tier: 1,
      },
      {
        id: '9',
        text: `Autonomy and informed consent in maternity care`,
        source: `Journal of Medical Ethics`,
        year: `2022`,
        link: `https://doi.org/10.1136/medethics-2021-107892`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          At 32 weeks pregnant, Emma had her fifth panic attack this month. The thought of labor
          made her physically ill---not normal nervousness, but visceral terror. <Citation
          index={1} /> She couldn't watch birth scenes in movies, avoided pregnant friends'
          birth stories, and had nightmares about being trapped in uncontrollable pain. When she
          asked her OB about a planned cesarean, the response was dismissive: "You'll be fine.
          Women have been doing this forever." But Emma didn't feel fine. She felt certain
          something catastrophic would happen, that her body would fail, that she would die or be
          permanently damaged. The fear consumed every moment.
        </p>

        <StatCard
          value="6-14%"
          label="of pregnant people experience tokophobia"
          description="Tokophobia exists on a spectrum from moderate fear to debilitating terror that interferes with pregnancy, prenatal care, and birth planning."
        />

        <h2>Types and Origins of Tokophobia</h2>
        <p>
          Tokophobia comes in two forms. Primary tokophobia affects people who have never given
          birth, often beginning in adolescence or even childhood. <Citation index={2} /> Common
          origins include witnessing traumatic births (seeing family members or media portrayals
          of birth as violent, agonizing, or life-threatening), sexual trauma history (fear that
          vaginal birth will re-traumatize or that loss of control during labor mirrors assault),
          fear of pain and medical procedures (especially in people with low pain tolerance or
          medical anxiety), and fear of body damage (tearing, incontinence, or permanent physical
          changes).
        </p>
        <p>
          Secondary tokophobia develops after a traumatic birth experience: emergency cesarean,
          severe tearing, feeling powerless or violated during labor, experiencing or witnessing
          near-death experiences, or NICU admission. Secondary tokophobia is essentially birth
          PTSD manifesting as phobic avoidance. People may avoid subsequent pregnancy entirely or
          experience severe anxiety if pregnant again.
        </p>

        <ArticleCallout
          type="info"
          title="Normal Birth Anxiety vs. Tokophobia"
          content="Most pregnant people experience some anxiety about birth---this is normal and adaptive, motivating preparation. Tokophobia is different: fear is severe (7-10 on intensity scale), persistent (not just occasional worry), interferes with functioning (avoiding prenatal care, unable to bond with pregnancy, terminating wanted pregnancy), and doesn't respond to reassurance or education. If fear is debilitating, it warrants treatment."
        />

        <h2>Impact on Pregnancy and Birth</h2>
        <p>
          <Citation index={3} /> Tokophobia significantly affects pregnancy experiences and
          outcomes. During pregnancy, people may delay or avoid prenatal care (fear of
          appointments discussing labor), difficulty bonding with baby (emotional detachment as
          self-protection), severe anxiety or depression, and hyperemesis or other physical
          symptoms potentially exacerbated by extreme stress. Some terminate wanted pregnancies
          due to unbearable fear of childbirth---a devastating outcome of untreated tokophobia.
        </p>
        <p>
          Birth planning becomes fraught. Many request elective cesarean delivery (maternal
          request cesarean) to avoid labor entirely. This request is often met with judgment or
          refusal from providers who view vaginal birth as superior or believe fear should be
          "overcome" rather than accommodated. However, forcing someone with severe tokophobia
          into labor can be re-traumatizing and may result in emergency intervention anyway due to
          panic-induced complications. Some research suggests that for severe tokophobia,
          planned cesarean may result in better mental health outcomes than attempted vaginal
          birth.
        </p>

        <StatCard
          value="Maternal request cesarean"
          label="accounts for 7-26% of cesarean deliveries in some countries"
          description="Not all maternal request cesareans stem from tokophobia, but fear of childbirth is a common driving factor. Access varies widely by provider and location."
        />

        <h2>Treatment and Birth Planning</h2>
        <p>
          Effective treatment for tokophobia combines psychotherapy and trauma-informed birth
          planning. Cognitive-behavioral therapy (CBT) helps identify and challenge catastrophic
          beliefs about childbirth, develop coping strategies for managing fear, and gradually
          approach avoided topics through exposure. Psychoeducation about birth physiology,
          pain management options, and statistics can reduce fear based on misinformation---though
          education alone is rarely sufficient for severe tokophobia.
        </p>
        <p>
          For secondary tokophobia, birth trauma processing using EMDR or trauma-focused CBT
          addresses the underlying traumatic memory. Couples therapy may help if partner doesn't
          understand the severity of fear or feels disappointed by birth preferences driven by
          tokophobia. Medication (typically SSRIs) may be necessary for severe anxiety, though
          should be combined with therapy rather than used alone.
        </p>

        <ArticleCallout
          type="tip"
          title="Advocating for Maternal Request Cesarean"
          content="If you desire cesarean delivery due to tokophobia, know your rights. Many guidelines (including ACOG) recognize that maternal request cesarean is a reasonable option when fear is severe and persistent. Helpful advocacy: 'I have tokophobia, which is a recognized psychiatric condition. I am requesting planned cesarean to protect my mental health.' If one provider refuses, seek second opinions. You deserve providers who respect your autonomy and mental health needs."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 19: Postpartum Rage
  // ==========================================================================
  {
    id: catId(19),
    slug: 'postpartum-rage-understanding-anger-and-irritability-after-birth',
    status: 'draft',
    title: `Postpartum Rage: Understanding Anger and Irritability After Birth`,
    description: `Explore postpartum rage as a symptom of perinatal mood disorders, understand its triggers, and learn strategies for managing intense anger while protecting relationships.`,
    image: '/images/articles/cat18/cover-019.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Postpartum Rage', 'Anger', 'Irritability', 'Postpartum Mood'],

    summary: `Postpartum rage---intense, disproportionate anger or irritability---affects up to 40% of postpartum people but is rarely discussed. Rage manifests as explosive anger at partner or other children, intrusive thoughts of throwing or hitting things, verbal outbursts, and feeling out of control. Rage is often a symptom of postpartum depression, anxiety, or trauma, driven by hormonal shifts, sleep deprivation, overwhelm, and unmet needs. It's not a character flaw or evidence of being a bad parent---it's a symptom requiring treatment. Managing rage involves addressing underlying mood disorders, practical support, anger management skills, and couples therapy to repair relationships.`,

    keyFacts: [
      {
        text: `Up to 40% of postpartum people experience episodes of intense rage or irritability, though it's underreported due to shame.`,
        citationIndex: 1,
      },
      {
        text: `Postpartum rage is commonly a symptom of depression, anxiety, or PTSD---not a standalone diagnosis but a signal that treatment is needed.`,
        citationIndex: 2,
      },
      {
        text: `Sleep deprivation, unmet needs, and hormonal fluctuations contribute to rage by lowering distress tolerance and increasing reactivity.`,
        citationIndex: 3,
      },
      {
        text: `70% of people experiencing postpartum rage also meet criteria for depression or anxiety---rage is often the primary presenting symptom.`,
        citationIndex: 4,
      },
      {
        text: `Perceived inequity in partnership and unmet needs (sleep, hunger, emotional support) are the strongest predictors of postpartum rage.`,
        citationIndex: 5,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The relief of learning that postpartum rage is not proof you're a terrible parent but a symptom of an overwhelmed nervous system desperately signaling that something needs to change---and that you deserve support, not shame.`,

    practicalExercise: {
      title: `Rage Awareness and Intervention`,
      steps: [
        {
          title: `Map your triggers`,
          description: `For one week, note what precedes rage episodes: sleep, hunger, partner comments, baby crying, feeling dismissed? Patterns reveal what pushes you past threshold.`,
        },
        {
          title: `Identify early warning signs`,
          description: `Notice physical cues before rage peaks: jaw clenching, heart racing, heat rising. Intervening at early signs prevents escalation.`,
        },
        {
          title: `Create a safety plan`,
          description: `When rage hits: 1) Put baby in safe place, 2) Leave room if needed, 3) Use grounding technique (cold water, intense exercise), 4) Return when regulated. You cannot parent while dysregulated.`,
        },
        {
          title: `Seek comprehensive treatment`,
          description: `Address underlying mood disorder (depression, anxiety, trauma), get practical support to reduce overwhelm, and consider couples therapy to repair relationships damaged by rage.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Rage Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Prevalence of postpartum anger and irritability`,
        source: `Journal of Reproductive and Infant Psychology`,
        year: `2022`,
        link: `https://doi.org/10.1080/02646838.2022.2034783`,
        tier: 1,
      },
      {
        id: '2',
        text: `Postpartum rage as symptom of mood and anxiety disorders`,
        source: `Archives of Women's Mental Health`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00737-023-01289-5`,
        tier: 1,
      },
      {
        id: '3',
        text: `Biological and psychosocial contributors to postpartum rage`,
        source: `Frontiers in Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.3389/fpsyt.2023.1045678`,
        tier: 1,
      },
      {
        id: '4',
        text: `Comorbidity of anger and depression in postpartum period`,
        source: `Journal of Affective Disorders`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.jad.2023.04.089`,
        tier: 1,
      },
      {
        id: '5',
        text: `Division of labor and postpartum mental health`,
        source: `Journal of Family Psychology`,
        year: `2022`,
        link: `https://doi.org/10.1037/fam0000987`,
        tier: 1,
      },
      {
        id: '6',
        text: `Anger management interventions for postpartum period`,
        source: `Clinical Psychology Review`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.cpr.2023.102298`,
        tier: 1,
      },
      {
        id: '7',
        text: `Postpartum mental health screening guidelines`,
        source: `US Preventive Services Task Force`,
        year: `2023`,
        link: `https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/perinatal-depression-preventive-interventions`,
        tier: 2,
      },
      {
        id: '8',
        text: `Couples therapy for postpartum relationship distress`,
        source: `Family Process`,
        year: `2022`,
        link: `https://doi.org/10.1111/famp.12789`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          When her partner asked "What's for dinner?" for the third night in a row without
          offering to cook, something snapped in Nadia. She felt white-hot rage---a fury so intense
          she wanted to throw the plate at the wall. <Citation index={1} /> Instead, she screamed,
          shocking both of them. Later, when the baby wouldn't stop crying at 2 AM, the rage
          returned: intrusive thoughts of shaking her, images of throwing the bassinet. Nadia was
          horrified. She loved her daughter desperately---where was this violent anger coming from?
          She felt like a monster, afraid to tell anyone she was struggling with rage.
        </p>

        <StatCard
          value="Up to 40%"
          label="of postpartum people experience episodes of intense rage"
          description="Postpartum rage is common but underreported due to shame. Many suffer in silence, believing anger means they're bad parents."
        />

        <h2>Understanding Postpartum Rage</h2>
        <p>
          Postpartum rage refers to episodes of intense, disproportionate anger or irritability in
          the postpartum period. <Citation index={2} /> Manifestations include explosive anger at
          partner (often over minor issues or perceived inadequacy in sharing responsibility),
          intense irritability with older children, intrusive violent thoughts or images (throwing
          things, hitting, harming), verbal outbursts or yelling, physical aggression toward
          objects (slamming doors, throwing items), and feeling out of control or shocked by one's
          own reactions.
        </p>
        <p>
          Rage is not a standalone diagnosis but typically a symptom of underlying perinatal mood
          and anxiety disorders. Up to 70% of people experiencing postpartum rage also meet
          criteria for postpartum depression, anxiety, or PTSD. Rage can be the primary presenting
          symptom of depression---particularly in people socialized to express distress as anger
          rather than sadness. The cultural narrative of postpartum depression as only sadness and
          tearfulness means rage-predominant presentations are often missed.
        </p>

        <ArticleCallout
          type="warning"
          title="Rage vs. Postpartum Psychosis"
          content="Postpartum rage (even intense) is different from postpartum psychosis. Rage involves anger in response to triggers (sleep deprivation, partner behavior, crying baby), with intact reality testing and no intent to harm baby. Psychosis involves delusions, hallucinations, and loss of reality contact. If you have intrusive violent thoughts that distress you, that's likely rage or OCD. If you believe violent thoughts are commands you should follow, that's psychosis---seek emergency care."
        />

        <h2>What Drives Postpartum Rage</h2>
        <p>
          <Citation index={3} /> Multiple factors contribute to postpartum rage. Biological
          drivers include hormonal fluctuations (estrogen and progesterone plummet postpartum,
          affecting mood regulation), sleep deprivation (dramatically lowers distress tolerance and
          increases reactivity), thyroid dysfunction (common postpartum and can cause irritability),
          and nutritional depletion (low iron, B vitamins, or omega-3s affect mood).
        </p>
        <p>
          Psychological and social factors include overwhelm and loss of control (feeling
          responsible for keeping a helpless human alive with inadequate support), unmet needs
          (hunger, sleep, personal time, or emotional support consistently sacrificed), perceived
          inequity in partnership (carrying disproportionate mental and physical labor), birth
          trauma (rage as a trauma response to feeling violated or powerless), and identity loss
          (grief and anger about loss of pre-baby self, career, or autonomy). Rage often signals
          that something fundamental is unsustainable---it's a desperate alarm bell, not a character
          flaw.
        </p>

        <StatCard
          value="70%"
          label="of people with postpartum rage also have depression or anxiety"
          description="Rage is often the visible symptom of underlying mood disorder. Treating depression/anxiety typically reduces rage."
        />

        <h2>Managing Rage and Seeking Treatment</h2>
        <p>
          Immediate rage management strategies focus on safety and de-escalation. When rage hits:
          ensure baby is safe (in crib, bassinet, or with another adult), physically remove
          yourself from the triggering situation if possible, use intense physical grounding
          (splash cold water on face, squeeze ice cubes, do jumping jacks---activating body helps
          regulate nervous system), and wait until regulated before engaging with partner or
          returning to baby. You cannot parent effectively while in rage---temporarily stepping away
          is responsible, not neglectful.
        </p>
        <p>
          Longer-term treatment addresses root causes. Screen for and treat underlying postpartum
          depression, anxiety, or PTSD---rage often diminishes when mood disorders are treated.
          Secure adequate sleep (even one 4-hour stretch per night significantly improves
          regulation), negotiate equitable division of labor with partner, and develop anger
          management skills (identifying triggers, early intervention, communication strategies).
          Couples therapy can repair relationships damaged by rage and address inequities fueling
          anger. Individual therapy helps process rage's emotional roots: overwhelm, resentment,
          grief, or trauma.
        </p>

        <ArticleCallout
          type="tip"
          title="Talking About Rage Without Shame"
          content="Telling your provider 'I'm experiencing postpartum rage' helps them understand what you're facing. Describe frequency, intensity, triggers, and whether it's accompanied by depression or anxiety. If you fear judgment, try: 'I'm having intense anger episodes that feel out of control. I need help managing this.' You're not alone---many providers now recognize rage as a common postpartum symptom deserving of compassionate care."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 20: Partner Perinatal Mental Health
  // ==========================================================================
  {
    id: catId(20),
    slug: 'partner-perinatal-mental-health-supporting-non-birthing-parents',
    status: 'draft',
    title: `Partner Perinatal Mental Health: Supporting Non-Birthing Parents`,
    description: `Understand mental health challenges facing partners during pregnancy and postpartum, including paternal/partner depression, anxiety, and the unique barriers to seeking support.`,
    image: '/images/articles/cat18/cover-020.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Partner Mental Health', 'Paternal Depression', 'Non-Birthing Parent', 'Couples'],

    summary: `Perinatal mental health challenges affect partners too---not just birthing parents. Paternal/partner postpartum depression affects 8-10% of fathers and non-birthing partners, with anxiety even more common. Risk factors include partner's depression, relationship conflict, financial stress, and lack of support. Unique challenges for partners include feeling helpless or inadequate, being expected to be "the strong one," having mental health needs dismissed, and lacking access to screening or services. Untreated partner depression affects couple relationship, parenting, and child development. Partners deserve screening, support, and treatment---not just as supports for birthing parents but for their own wellbeing.`,

    keyFacts: [
      {
        text: `8-10% of fathers and non-birthing partners experience postpartum depression, with rates peaking 3-6 months postpartum.`,
        citationIndex: 1,
      },
      {
        text: `When one partner has perinatal depression, the other partner's risk increases by 2.5-5 times.`,
        citationIndex: 2,
      },
      {
        text: `Partners face unique barriers to care: lack of screening, stigma about men's mental health, and being seen as support person rather than patient.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The recognition that partners' mental health matters not just instrumentally (so they can support the birthing parent) but intrinsically---they are also becoming parents, also experiencing massive life transition, and also deserve care.`,

    practicalExercise: {
      title: `Partner Mental Health Check-In`,
      steps: [
        {
          title: `Assess your own symptoms`,
          description: `Check: persistent sadness or emptiness, irritability or anger, withdrawal from baby or partner, loss of interest in activities, sleep or appetite changes, feeling inadequate as parent. If multiple symptoms persist, consider evaluation.`,
        },
        {
          title: `Challenge "strong one" narrative`,
          description: `Notice beliefs like "I need to hold it together for my partner" or "My struggles don't matter compared to theirs." Your mental health matters---period.`,
        },
        {
          title: `Identify support barriers`,
          description: `What stops you from seeking help? Lack of time, belief you don't deserve it, not knowing where to go? Name barriers to address them.`,
        },
        {
          title: `Seek partner-inclusive support`,
          description: `Find therapists who work with new parents of all genders, couples therapy if relationship is strained, or online support groups for non-birthing parents.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Mental Health',
    },

    citations: [
      {
        id: '1',
        text: `Paternal postpartum depression: prevalence and risk factors`,
        source: `JAMA Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1001/jamapsychiatry.2021.4193`,
        tier: 1,
      },
      {
        id: '2',
        text: `Couples' concordance of perinatal mental health`,
        source: `Journal of Affective Disorders`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.jad.2022.12.089`,
        tier: 1,
      },
      {
        id: '3',
        text: `Barriers to mental health care for non-birthing partners`,
        source: `Psychology of Men & Masculinities`,
        year: `2023`,
        link: `https://doi.org/10.1037/men0000423`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Three months after their daughter was born, Marcus felt numb. He went through the
          motions---diaper changes, bottle prep, rocking her to sleep---but felt disconnected, like
          watching someone else's life. <Citation index={1} /> His partner struggled with
          postpartum depression and needed his support, so Marcus told himself his own feelings
          didn't matter. He was supposed to be "the strong one." But the exhaustion and emptiness
          were crushing. When he finally mentioned feeling depressed to his doctor at a routine
          checkup, the doctor seemed surprised: "Postpartum depression? That's for moms. You're
          probably just tired."
        </p>

        <StatCard
          value="8-10%"
          label="of fathers and non-birthing partners experience postpartum depression"
          description="Partner depression often develops later than birthing parent depression, peaking 3-6 months postpartum rather than immediately after birth."
        />

        <h2>Understanding Partner Perinatal Mental Health</h2>
        <p>
          Perinatal mental health challenges affect all new parents, regardless of gender or
          whether they gave birth. <Citation index={2} /> Partners experience depression
          (persistent sadness, loss of interest, feeling inadequate as parent, withdrawal from baby
          or family), anxiety (excessive worry about baby's safety, finances, or ability to be
          good parent; panic attacks), relationship distress (increased conflict with partner,
          feeling excluded from parent-baby bond), and identity transition (loss of pre-baby self,
          career identity, or couple identity).
        </p>
        <p>
          Symptoms may manifest differently in partners than in birthing parents. Partners are
          more likely to express distress as anger, irritability, increased work hours (avoiding
          home), substance use, or risky behaviors. This can lead to misdiagnosis or missed
          diagnosis---depression presenting as anger may be labeled as relationship problem or
          character flaw rather than mood disorder.
        </p>

        <ArticleCallout
          type="info"
          title="Why Partner Mental Health Is Overlooked"
          content="Several factors contribute to neglect of partner mental health: lack of screening (partners typically don't attend postpartum checkups where screening occurs), gendered expectations (particularly for male partners, cultural norms that men should be stoic providers), focus on birthing parent (understandably, but leaving partners without support), and partners themselves minimizing needs ('My partner has it worse, my struggles don't matter')."
        />

        <h2>Risk Factors and Relationship Dynamics</h2>
        <p>
          <Citation index={3} /> Several factors increase partner depression risk. The strongest
          predictor is birthing partner's depression---when one partner is depressed, the other's
          risk increases 2.5-5 times. This likely reflects both relationship strain from one
          partner's illness and shared risk factors (financial stress, difficult baby, lack of
          support). Other risk factors include relationship conflict before or during pregnancy,
          financial strain or job loss, lack of social support or parental leave, birth
          complications or NICU admission, and personal or family history of depression.
        </p>
        <p>
          When both partners struggle with perinatal mood disorders simultaneously, outcomes
          worsen significantly. Both parents may feel unsupported, relationship conflict
          intensifies, parenting quality declines, and neither partner can compensate for the
          other's symptoms. This highlights why partner mental health matters not just for the
          individual but for the whole family system. Treating one partner's depression while
          ignoring the other's is insufficient.
        </p>

        <StatCard
          value="2.5-5x"
          label="increased risk of partner depression when birthing parent is depressed"
          description="Perinatal mood disorders affect couples, not just individuals. Both partners need screening and access to treatment."
        />

        <h2>Barriers and Solutions</h2>
        <p>
          Partners face unique barriers to mental health care. Systemic barriers include lack of
          routine screening (partners aren't included in postpartum medical visits), lack of
          parental leave (particularly in the U.S., where many have no paid leave, limiting time
          and energy for self-care), and provider focus on birthing parent (understandable but
          excluding partners from care conversations). Social and cultural barriers include stigma
          about mental health (particularly for men or those socialized as providers), expectation
          to be "the strong one" or support person rather than patient, and minimization of
          partners' experiences ("You didn't give birth, how can you be depressed?").
        </p>
        <p>
          Solutions require multi-level change. Individual level: partners actively monitoring
          their own mental health, challenging beliefs that they don't deserve support, and
          seeking therapy or peer support. Couple level: open communication about both partners'
          mental health needs, equitable division of labor and support, and couples therapy if
          relationship strain is high. Healthcare system level: universal perinatal depression
          screening for all parents regardless of gender, partner-inclusive prenatal and
          postpartum education, and normalizing partner mental health as part of family-centered
          care.
        </p>

        <ArticleCallout
          type="tip"
          title="Self-Advocacy for Partners"
          content="If you're struggling: 1) Tell your primary care provider 'I'm experiencing symptoms of postpartum depression' (yes, use that term even if you didn't give birth), 2) Seek therapists who work with new fathers/partners specifically, 3) Join online support communities for non-birthing parents, 4) If your partner is also struggling, advocate for couples therapy and individual treatment for both of you. Your mental health is not a luxury---it's essential for your wellbeing and your family's health."
        />
      </>
    ),
  },
];
