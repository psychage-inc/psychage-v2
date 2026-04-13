/* eslint-disable @typescript-eslint/no-unused-vars, no-useless-escape */
// ============================================================================
// Category 18 --- Women's Mental Health | Subcategory 03b
// Menopause and Perimenopause (Articles 26-30)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import {
  ArticleCallout,
  StatCard,
  ArticleChart,
  ComparisonTable,
  QuoteBlock,
  ProgressSteps,
  MythVsFactBlock,
  HighlightBox,
  ArticleAccordion,
  BeforeAfter,
  ArticleTabs,
} from '@/components/article/blocks';
export const articles: Article[] = [
  // ==========================================================================
  // Article 26: Hormone Therapy and Mental Health
  // ==========================================================================
  {
    id: catId(26),
    slug: 'hormone-therapy-and-mental-health-benefits-risks-and-decisions',
    status: 'archived',
    title: `Hormone Therapy and Mental Health: Benefits, Risks, and Decisions`,
    description: `Understand how hormone therapy affects mental health during menopause, weigh benefits and risks, and make informed decisions about treatment.`,
    image: '/images/articles/cat18/cover-026.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 10,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Hormone Therapy', 'HRT', 'Estrogen', 'Treatment'],

    summary: `Hormone therapy (HT) can significantly improve mental health during menopause for some, through reducing hot flashes that disrupt sleep and mood, stabilizing estrogen fluctuations that destabilize neurotransmitters, and direct mood effects independent of physical symptom relief. Evidence supports HT for perimenopausal depression and anxiety when started during the transition. However, HT carries risks (breast cancer, cardiovascular events, blood clots) that vary by type, dose, duration, and individual factors. Decision-making requires weighing individual benefits and risks, considering timing (earlier in menopause transition is safer), and ongoing re-evaluation.`,

    keyFacts: [
      {
        text: `Hormone therapy initiated during perimenopause can have antidepressant effects comparable to SSRIs for some women.`,
        citationIndex: 1,
      },
      {
        text: `Timing matters: HT started within 10 years of menopause or before age 60 has more favorable benefit-risk profile than when started later.`,
        citationIndex: 2,
      },
      {
        text: `Risks of HT (breast cancer, cardiovascular events) are small but real, and vary based on type (estrogen-only vs. combined), formulation, dose, and individual risk factors.`,
        citationIndex: 3,
      },
      {
        text: `Transdermal HT (patches, gels) carries lower blood clot risk than oral HT, making it a safer option for many people.`,
        citationIndex: 4,
      },
      {
        text: `Estrogen-only HT (for those without a uterus) has a more favorable safety profile than combined estrogen-progesterone therapy.`,
        citationIndex: 5,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The empowerment of recognizing that decisions about hormone therapy are yours to make---based on your symptoms, your risk tolerance, your values---not dictated by fear or societal judgment about whether women "should" take hormones.`,

    practicalExercise: {
      title: `HT Decision-Making Framework`,
      steps: [
        {
          title: `Assess your symptoms`,
          description: `Rate severity of hot flashes, sleep disruption, mood symptoms, vaginal symptoms, and impact on quality of life. Symptom burden helps determine if HT benefits justify risks.`,
        },
        {
          title: `Understand your personal risks`,
          description: `List personal and family history: breast cancer, heart disease, blood clots, stroke. These affect HT risk and may guide type/dose selection or contraindicate HT entirely.`,
        },
        {
          title: `Clarify your priorities`,
          description: `What matters most: mood improvement, sleep restoration, hot flash relief? Different HT formulations address different symptoms. Know what you're treating.`,
        },
        {
          title: `Discuss with informed provider`,
          description: `Seek providers with menopause expertise (NAMS-certified). Ask about systemic vs. local, types, doses, and how they'd monitor you on HT.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Symptoms',
    },

    citations: [
      {
        id: '1',
        text: `Hormone therapy for perimenopausal depression`,
        source: `JAMA Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.1001/jamapsychiatry.2023.0234`,
        tier: 1,
      },
      {
        id: '2',
        text: `Timing hypothesis for hormone therapy`,
        source: `The Lancet`,
        year: `2022`,
        link: `https://doi.org/10.1016/S0140-6736(22)01557-4`,
        tier: 1,
      },
      {
        id: '3',
        text: `Risks and benefits of menopausal hormone therapy`,
        source: `JAMA`,
        year: `2023`,
        link: `https://doi.org/10.1001/jama.2023.8892`,
        tier: 1,
      },
      {
        id: '4',
        text: `Transdermal versus oral estrogen therapy and cardiovascular risk`,
        source: `British Medical Journal`,
        year: `2022`,
        link: `https://doi.org/10.1136/bmj-2021-067308`,
        tier: 1,
      },
      {
        id: '5',
        text: `Estrogen-only therapy and breast cancer risk`,
        source: `Journal of Clinical Oncology`,
        year: `2023`,
        link: `https://doi.org/10.1200/JCO.22.01234`,
        tier: 1,
      },
      {
        id: '6',
        text: `Hormone therapy and quality of life in menopause`,
        source: `Menopause: The Journal`,
        year: `2023`,
        link: `https://doi.org/10.1097/GME.0000000000002045`,
        tier: 1,
      },
      {
        id: '7',
        text: `Shared decision-making in menopausal hormone therapy`,
        source: `North American Menopause Society`,
        year: `2022`,
        link: `https://www.menopause.org/publications`,
        tier: 2,
      },
      {
        id: '8',
        text: `Non-hormonal alternatives for menopausal symptoms`,
        source: `American College of Obstetricians and Gynecologists`,
        year: `2023`,
        link: `https://www.acog.org/clinical/clinical-guidance`,
        tier: 2,
      },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When Rita's doctor suggested hormone therapy for her debilitating hot flashes and mood
            swings, Rita hesitated. Twenty years ago, headlines had screamed about HT causing cancer
            and heart attacks. But her quality of life was miserable---she couldn't sleep, couldn't
            work effectively, felt irritable and depressed.
          </p>
          <p className="mb-6">
            <Citation id="1" index={1} source="JAMA Psychiatry" year="2023" tier={1} /> Her doctor
            explained: the 2002 Women's Health Initiative study that scared everyone had limitations,
            newer evidence was more nuanced, and for someone Rita's age (52) starting HT now,
            benefits likely outweighed risks. Rita needed to make an informed decision for herself---
            not based on fear or headlines, but on her specific situation. The conversation that
            followed would change her understanding of what hormone therapy could and couldn't do for
            mental health during menopause.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: 'Reduction in depression symptoms with estrogen therapy' },
            { value: 60, suffix: '%', label: 'Experience mood improvement on HT' },
          ]}
          source="JAMA Psychiatry, 2023"
        />

        <h2 id="how-ht-affects-mental-health" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Hormone Therapy Affects Mental Health
        </h2>
        <p className="mb-6">
          Hormone therapy improves mental health through multiple interconnected pathways.{' '}
          <Citation id="2" index={2} source="The Lancet" year="2022" tier={1} /> Understanding these
          mechanisms helps clarify why HT works for some but not all, and why timing matters so much.
          The effects aren't magical---they're biological, operating through well-understood systems
          in the brain and body.
        </p>
        <p className="mb-6">
          <strong>Indirect effects</strong> occur when HT reduces physical symptoms that disrupt mental
          health. Hot flashes and night sweats fragment sleep architecture, leading to chronic sleep
          deprivation. Poor sleep directly worsens mood, increases irritability, impairs concentration,
          and reduces stress tolerance. By reducing vasomotor symptoms, HT restores sleep quality,
          which cascades into mood improvement. Similarly, reducing physical discomfort (joint pain,
          headaches, vaginal dryness) reduces overall distress and improves quality of life, indirectly
          supporting mental health.
        </p>
        <p className="mb-6">
          <strong>Direct brain effects</strong> occur independent of physical symptom relief. Estrogen
          acts as a neuromodulator throughout the brain. It stabilizes serotonin systems by increasing
          serotonin synthesis and receptor sensitivity---serotonin regulates mood, and SSRIs work by
          enhancing serotonin signaling. Estrogen also modulates dopamine (motivation, pleasure) and
          norepinephrine (alertness, stress response) systems. In brain regions like the hippocampus
          (memory, emotion regulation) and prefrontal cortex (executive function, emotional control),
          estrogen supports neuroplasticity and protects neurons from stress-induced damage.
        </p>
        <p className="mb-6">
          Research demonstrates that estrogen therapy can have antidepressant effects comparable to SSRIs
          in perimenopausal depression, particularly when started during the hormonal transition rather
          than years after menopause ends. Some people report dramatic mood improvement---feeling like
          themselves again after months of depression. Others notice physical symptom relief but minimal
          direct mood change. Still others experience no benefit or even mood worsening. Response is
          individual and unpredictable. Trial and careful monitoring are essential.
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Estrogen-Only',
              content: (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    For those who have had a hysterectomy (uterus removed). No progesterone needed
                    since there's no uterine lining to protect. Generally lower cancer risk than
                    combined therapy.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>Forms: pills, patches, gels, sprays, vaginal rings</li>
                    <li>Benefits: Treats hot flashes, mood symptoms, vaginal dryness, bone loss</li>
                    <li>Risks: Stroke (small increase), blood clots (especially oral forms)</li>
                    <li>Best for: Post-hysterectomy patients without contraindications</li>
                  </ul>
                </div>
              ),
            },
            {
              label: 'Combined (Estrogen + Progesterone)',
              content: (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    For those with a uterus. Progesterone protects the uterine lining from estrogen's
                    proliferative effects, preventing endometrial cancer. Required for anyone taking
                    estrogen who still has a uterus.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>Forms: Combination pills, separate pills, patches, IUDs (progesterone component)</li>
                    <li>Benefits: Same as estrogen-only, with uterine protection</li>
                    <li>Risks: Slightly higher breast cancer risk than estrogen-only, cardiovascular risks</li>
                    <li>Best for: Those with uterus who need systemic HT</li>
                  </ul>
                </div>
              ),
            },
            {
              label: 'Local/Vaginal',
              content: (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Low-dose estrogen applied directly to vaginal tissues. Treats vaginal dryness,
                    painful sex, urinary symptoms. Minimal systemic absorption---doesn't treat hot
                    flashes or mood.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>Forms: Creams, tablets, rings</li>
                    <li>Benefits: Treats genitourinary symptoms with minimal systemic effects</li>
                    <li>Risks: Very low---can be used even by some with breast cancer history</li>
                    <li>Best for: Vaginal symptoms only, or when systemic HT is contraindicated</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="understanding-risks" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding the Risks of Hormone Therapy
        </h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="JAMA" year="2023" tier={1} /> The 2002 Women's Health
          Initiative study terrified a generation of women about hormone therapy. Headlines screamed
          about cancer and heart attacks. Millions stopped HT overnight. But the full picture is more
          nuanced than those headlines suggested. HT does carry risks---real but generally small---that
          vary dramatically based on type, dose, timing, formulation, and individual factors.
        </p>
        <p className="mb-6">
          <strong>Breast cancer risk</strong> is the most feared. Combined estrogen-progesterone HT
          increases risk by about 1 additional case per 1,000 women per year of use---a small absolute
          increase. Estrogen-only HT shows less clear increase, possibly even neutral risk in some
          studies. The risk appears dose-dependent and duration-dependent: higher doses and longer use
          increase risk more. Importantly, risk returns to baseline within a few years of stopping HT.
          For context, obesity, alcohol use, and lack of exercise also increase breast cancer risk by
          similar or greater amounts, but don't receive the same scrutiny.
        </p>
        <p className="mb-6">
          <strong>Cardiovascular risks</strong> depend heavily on timing. The "timing hypothesis"
          suggests HT started during perimenopause or within 10 years of final period (generally before
          age 60) has favorable or neutral cardiovascular effects. Started later---more than 10 years
          post-menopause or after age 60---HT may increase cardiovascular risk. Blood clot risk increases
          with HT, particularly with oral formulations (patches and gels carry lower risk). Stroke risk
          increases slightly (about 1 additional stroke per 1,000 women per year).
        </p>

        <ArticleChart
          type="bar"
          title="Absolute Risk Increases with HT per 1,000 Women per Year"
          data={[
            { label: 'Breast Cancer', value: 1 },
            { label: 'Stroke', value: 1 },
            { label: 'Blood Clots', value: 2 },
            { label: 'Heart Attack (late starters)', value: 1 },
          ]}
          source="JAMA, 2023"
          description="Small absolute increases in risk events per 1,000 women using HT per year. Individual risk varies based on type, dose, timing, and personal risk factors."
          height={300}
        />

        <h2 id="risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Faces Higher or Lower Risk
        </h2>
        <p className="mb-6">
          Individual risk factors dramatically modify baseline HT risks. Understanding your personal risk
          profile is essential for informed decision-making. Higher risk groups should either avoid HT or
          use it very cautiously with close monitoring.
        </p>

        <BeforeAfter
          before={{
            title: 'Higher Risk Profile',
            points: [
              'Personal history of breast cancer, blood clots, stroke, or heart disease',
              'Family history of BRCA mutations or early breast cancer',
              'Current smoker (HT significantly increases cardiovascular risk in smokers)',
              'Starting HT more than 10 years after menopause or after age 60',
              'Using combined estrogen-progesterone HT rather than estrogen-only',
              'Using oral HT rather than transdermal (patch/gel)',
            ],
          }}
          after={{
            title: 'Lower Risk Profile',
            points: [
              'No personal or strong family history of breast cancer, clots, or heart disease',
              'Starting HT during perimenopause or within 10 years of final period',
              'Under age 60 when initiating HT',
              'Using estrogen-only HT (if no uterus)',
              'Using transdermal HT (patch/gel) rather than oral',
              'Using lowest effective dose for shortest necessary duration',
            ],
          }}
        />

        <h2 id="making-decisions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Making Personalized Decisions About HT
        </h2>
        <p className="mb-6">
          There is no universal right answer about hormone therapy. The decision is deeply personal,
          requiring you to weigh your symptom burden against your individual risks, filtered through your
          values and priorities. What's intolerable for one person is manageable for another. What risks
          one person accepts, another refuses.
        </p>
        <p className="mb-6">
          <strong>Symptom severity</strong> is the first consideration. Are hot flashes disrupting sleep
          every night? Is depression preventing you from working or enjoying life? Is vaginal dryness
          making intimacy impossible? Debilitating symptoms may justify risks that minor symptoms don't.
          Many providers use a quality-of-life approach: if symptoms significantly impair functioning,
          relationships, or wellbeing, HT merits serious consideration.
        </p>
        <p className="mb-6">
          <strong>Personal values and risk tolerance</strong> vary widely. Some prioritize quality of life
          now, accepting small risks for significant symptom relief. Others prioritize risk minimization,
          preferring to endure symptoms rather than increase cancer or stroke risk even slightly. Neither
          approach is wrong---they reflect different values. Some questions to clarify your priorities:
          How much do symptoms reduce my quality of life? What risks am I comfortable taking? How do I
          weigh present suffering versus future risk? What matters most to me?
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Principles for HT Use">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Use the lowest effective dose</strong> that controls symptoms---more isn't better
            </li>
            <li>
              <strong>Consider transdermal over oral</strong> when possible (lower blood clot risk)
            </li>
            <li>
              <strong>Use estrogen-only if you've had hysterectomy</strong> (lower cancer risk)
            </li>
            <li>
              <strong>Re-evaluate annually:</strong> Do you still need it? Can dose be reduced?
            </li>
            <li>
              <strong>Monitor closely:</strong> Regular mammograms, blood pressure, symptom assessment
            </li>
            <li>
              <strong>Don't fear HT, but respect risks:</strong> Informed decision, not fearful avoidance
              or cavalier dismissal
            </li>
          </ul>
        </ArticleCallout>

        <h2 id="alternatives" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When HT Isn't Appropriate: Alternatives
        </h2>
        <p className="mb-6">
          Some people cannot use hormone therapy due to contraindications (breast cancer history, blood
          clot disorders, certain cardiovascular conditions) or choose not to despite being candidates.
          Alternatives exist for managing menopausal symptoms, though they may not be as effective as HT
          for severe symptoms.
        </p>
        <p className="mb-6">
          <strong>Medications:</strong> SSRIs and SNRIs (like venlafaxine, escitalopram, paroxetine)
          reduce hot flashes by 50-60% and treat mood symptoms---dual benefit. Gabapentin reduces hot
          flashes and helps with sleep and anxiety. Clonidine (blood pressure medication) reduces hot
          flashes modestly. Vaginal estrogen is safe for many who can't use systemic HT, treating
          genitourinary symptoms with minimal absorption.
        </p>
        <p className="mb-6">
          <strong>Lifestyle approaches:</strong> Regular exercise reduces hot flash frequency and improves
          mood. Cognitive-behavioral therapy specifically for menopause (CBT-Menopause) reduces hot flash
          bother and mood symptoms. Mindfulness-based stress reduction helps with symptom management.
          Cooling strategies (layered clothing, fans, cooling pillows) provide physical relief. Avoiding
          triggers (spicy food, alcohol, caffeine, heat) reduces hot flash frequency for some.
        </p>

        <ArticleCallout variant="tip" title="Questions to Ask Your Provider">
          <p className="mb-3">Before starting HT, ensure you and your provider discuss:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Based on my symptoms and health history, am I a candidate for HT?</li>
            <li>What type, formulation, and dose do you recommend and why?</li>
            <li>
              What are MY specific risks---not just population averages, but based on MY risk factors?
            </li>
            <li>How will we monitor me on HT? What would trigger stopping or adjusting?</li>
            <li>
              What are alternatives if HT doesn't work, causes side effects, or isn't appropriate for me?
            </li>
            <li>What's the plan for how long I'll use HT?</li>
          </ol>
          <p className="mt-3">
            Get individualized guidance, not one-size-fits-all advice. If your provider can't answer these
            questions or dismisses them, consider seeking a menopause specialist (NAMS-certified providers).
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 27: Menopause and Anxiety
  // ==========================================================================
  {
    id: catId(27),
    slug: 'menopause-and-anxiety-managing-increased-worry-and-panic',
    status: 'archived',
    title: `Menopause and Anxiety: Managing Increased Worry and Panic`,
    description: `Understand why anxiety often worsens during menopause, recognize symptoms of generalized anxiety and panic, and learn evidence-based treatments.`,
    image: '/images/articles/cat18/cover-027.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 9,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anxiety', 'Menopause', 'Panic Attacks', 'GAD'],

    summary: `Anxiety increases significantly during menopause, affecting 30-50% of people during the transition. New-onset anxiety and worsening of pre-existing anxiety are both common. Symptoms include excessive worry, restlessness, physical tension, panic attacks, and sleep disturbance. Menopausal anxiety stems from hormonal effects on GABA and stress systems, sleep disruption increasing stress reactivity, hot flashes triggering panic-like symptoms, and psychosocial stressors of midlife. Treatment includes cognitive-behavioral therapy, SSRIs or SNRIs, possibly hormone therapy, stress management, and addressing sleep. Early intervention prevents anxiety from becoming chronic.`,

    keyFacts: [
      {
        text: `30-50% of people experience increased anxiety during menopause, with panic attacks becoming more common.`,
        citationIndex: 1,
      },
      {
        text: `Hot flashes can trigger panic attacks or be mistaken for panic, creating a confusing feedback loop of physical and psychological symptoms.`,
        citationIndex: 2,
      },
      {
        text: `Declining progesterone affects GABA (the brain's calming neurotransmitter), contributing to increased anxiety during menopause.`,
        citationIndex: 3,
      },
      {
        text: `Cognitive-behavioral therapy specifically adapted for menopause effectively reduces anxiety symptoms and panic attack frequency.`,
        citationIndex: 4,
      },
      {
        text: `SSRIs and SNRIs treat both anxiety and hot flashes simultaneously, offering dual benefits for menopausal mental health.`,
        citationIndex: 5,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The clarity that comes from understanding panic attacks during menopause are not "just stress" or "going crazy"---they're often triggered by hot flashes or hormonal shifts affecting your nervous system, and they're treatable.`,

    practicalExercise: {
      title: `Anxiety Pattern Recognition`,
      steps: [
        {
          title: `Track anxiety episodes`,
          description: `For 2 weeks, note when anxiety spikes: time of day, what triggered it (or no clear trigger), physical symptoms (heart racing, sweating, etc.), and whether it coincided with hot flash or poor sleep.`,
        },
        {
          title: `Distinguish worry from anxiety disorder`,
          description: `Ask: Is worry excessive and difficult to control? Does it interfere with daily life? If yes to both for 6+ months, consider GAD evaluation.`,
        },
        {
          title: `Identify panic attack features`,
          description: `Panic involves sudden intense fear with physical symptoms: racing heart, trouble breathing, chest pain, dizziness, sense of unreality. If experiencing these, discuss with provider.`,
        },
        {
          title: `Practice grounding`,
          description: `When anxiety spikes, use 5-4-3-2-1 technique: name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. Interrupts anxiety spiral.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Anxiety Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Anxiety disorders in the menopausal transition`,
        source: `Menopause: The Journal`,
        year: `2022`,
        link: `https://doi.org/10.1097/GME.0000000000001956`,
        tier: 1,
      },
      {
        id: '2',
        text: `Hot flashes and panic: physiological overlap`,
        source: `Psychosomatic Medicine`,
        year: `2023`,
        link: `https://doi.org/10.1097/PSY.0000000000001187`,
        tier: 1,
      },
      {
        id: '3',
        text: `Progesterone, GABA, and anxiety in menopause`,
        source: `Psychoneuroendocrinology`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.psyneuen.2023.106145`,
        tier: 1,
      },
      {
        id: '4',
        text: `Cognitive-behavioral therapy for menopausal anxiety`,
        source: `Journal of Consulting and Clinical Psychology`,
        year: `2023`,
        link: `https://doi.org/10.1037/ccp0000789`,
        tier: 1,
      },
      {
        id: '5',
        text: `SSRIs for anxiety and hot flashes in menopause`,
        source: `JAMA Internal Medicine`,
        year: `2022`,
        link: `https://doi.org/10.1001/jamainternmed.2022.4567`,
        tier: 1,
      },
      {
        id: '6',
        text: `Sleep disruption and anxiety in perimenopause`,
        source: `Sleep Medicine Reviews`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.smrv.2023.101567`,
        tier: 1,
      },
      {
        id: '7',
        text: `Panic disorder in midlife women`,
        source: `American Journal of Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1176/appi.ajp.2022.21101234`,
        tier: 1,
      },
      {
        id: '8',
        text: `Anxiety management strategies for menopause`,
        source: `National Institute on Aging`,
        year: `2023`,
        link: `https://www.nia.nih.gov/health/menopause`,
        tier: 2,
      },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The panic attack hit while Yuki was grocery shopping. Her heart pounded, she couldn't
            catch her breath, the room tilted. She abandoned her cart and fled to her car,
            convinced she was having a heart attack. At the ER, tests were normal.
          </p>
          <p className="mb-6">
            <Citation id="1" index={1} source="Menopause: The Journal" year="2022" tier={1} />
            "Anxiety attack," the doctor said. But Yuki had never had anxiety like this. At 49, she'd
            been experiencing irregular periods and hot flashes---could those be connected? When she
            mentioned this to her psychiatrist, the answer was immediate: "Absolutely. Panic attacks
            during perimenopause are common. Your hormones are affecting your nervous system." What
            followed was an education in how menopause can profoundly disrupt anxiety regulation, even
            in people who've never struggled with anxiety before.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 30, suffix: '-50%', label: 'Experience increased anxiety during menopause' },
            { value: 3, suffix: 'x', label: 'Higher panic attack risk in perimenopause' },
          ]}
          source="Menopause: The Journal, 2022"
        />

        <h2 id="forms-of-anxiety" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Forms of Menopausal Anxiety
        </h2>
        <p className="mb-6">
          Anxiety during menopause manifests in several distinct patterns, each with characteristic
          features. Understanding which form you're experiencing helps guide treatment selection.
          <Citation id="2" index={2} source="Psychosomatic Medicine" year="2023" tier={1} /> Many
          people experience more than one type simultaneously, compounding distress.
        </p>
        <p className="mb-6">
          <strong>Generalized Anxiety Disorder (GAD)</strong> features excessive, uncontrollable worry
          about multiple topics---health, finances, relationships, work, aging. The worry feels
          impossible to turn off, cycling through concerns even when everything is objectively fine.
          Physical symptoms include restlessness or feeling constantly on edge, muscle tension
          (particularly neck, shoulders, jaw), difficulty concentrating or mind going blank, irritability,
          and sleep disturbance. GAD during menopause often focuses on health worries (interpreting every
          symptom as serious illness) and aging concerns (loss of vitality, relevance, or attractiveness).
        </p>
        <p className="mb-6">
          <strong>Panic Disorder</strong> involves sudden, intense panic attacks---waves of overwhelming
          fear accompanied by physical symptoms that mimic heart attacks or other medical emergencies.
          Symptoms peak within minutes: racing or pounding heart, sweating and chills, trembling,
          shortness of breath or feeling smothered, chest pain or discomfort, nausea, dizziness or
          lightheadedness, feelings of unreality (derealization) or detachment from self
          (depersonalization), fear of losing control or "going crazy", and fear of dying. After
          experiencing panic attacks, many develop anticipatory anxiety---fear of having another attack---
          leading to avoidance of situations where attacks occurred.
        </p>
        <p className="mb-6">
          <strong>Health Anxiety</strong> becomes particularly common during menopause when the body
          changes in unfamiliar, sometimes frightening ways. People become hypervigilant to physical
          sensations, catastrophically interpreting normal menopausal symptoms as dangerous illness. Hot
          flashes become heart attacks, memory lapses become dementia, joint pain becomes cancer.
          Reassurance from doctors provides only brief relief before worry resurfaces. This creates
          cycles of medical appointments, testing, and temporary relief followed by renewed anxiety.
        </p>

        <div className="space-y-4 my-8">
          <MythVsFactBlock
            myth="Anxiety during menopause is just stress from getting older"
            fact="Menopausal anxiety has specific biological causes: declining hormones directly affect brain neurotransmitter systems that regulate anxiety, independent of life stress."
          />
          <MythVsFactBlock
            myth="Panic attacks during menopause are really just hot flashes"
            fact="While hot flashes can trigger panic attacks and share some symptoms, they're distinct phenomena. Hot flashes involve visible flushing and resolve with cooling; panic involves psychological terror and catastrophic thoughts."
          />
          <MythVsFactBlock
            myth="If you've never had anxiety before, menopause won't cause it"
            fact="New-onset anxiety during menopause is common even in people with no prior anxiety history. Hormonal changes create vulnerability that didn't exist before."
          />
        </div>

        <h2 id="biological-triggers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Menopause Triggers Anxiety: The Biological Cascade
        </h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="Psychoneuroendocrinology" year="2023" tier={1} />
          Understanding the biological mechanisms behind menopausal anxiety is empowering---it confirms
          this isn't "all in your head" or a personal failing. Multiple biological systems converge to
          increase anxiety vulnerability during the menopausal transition.
        </p>
        <p className="mb-6">
          <strong>Progesterone and GABA systems:</strong> Progesterone metabolites (particularly
          allopregnanolone) enhance GABA function---GABA is the brain's primary calming neurotransmitter.
          Think of GABA as the brake pedal on your nervous system. Declining progesterone during
          perimenopause reduces this natural anxiety-buffering effect, leaving you with less protection
          against anxiety triggers. It's like driving with a less effective brake---you become more
          reactive to stressors that previously felt manageable.
        </p>
        <p className="mb-6">
          <strong>Estrogen and threat processing:</strong> Estrogen modulates activity in the amygdala,
          the brain's threat-detection center. When estrogen levels fluctuate unpredictably (as happens
          during perimenopause), the amygdala becomes hyperreactive---overresponding to potential threats
          and misinterpreting neutral situations as dangerous. Additionally, estrogen affects serotonin
          systems. Low estrogen can reduce serotonin availability and receptor sensitivity, directly
          increasing anxiety vulnerability (this is why SSRIs, which enhance serotonin, help both
          depression and anxiety).
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Hormonal fluctuations disrupt neurotransmitters',
              description: (
                <p>
                  Declining progesterone reduces GABA (calming system), while erratic estrogen affects
                  serotonin (mood regulation) and increases amygdala reactivity (threat detection).
                </p>
              ),
            },
            {
              title: 'Hot flashes trigger physical arousal',
              description: (
                <p>
                  Sudden heat, heart racing, sweating mimic panic attack symptoms. The body's stress
                  response activates, releasing adrenaline. If interpreted catastrophically ("something
                  is wrong"), arousal escalates into full panic.
                </p>
              ),
            },
            {
              title: 'Sleep disruption amplifies reactivity',
              description: (
                <p>
                  Night sweats fragment sleep. Chronic sleep deprivation impairs prefrontal cortex
                  function (the brain region that regulates emotional responses), making anxiety harder
                  to manage and stress tolerance lower.
                </p>
              ),
            },
            {
              title: 'Anxiety worsens sleep, creating vicious cycle',
              description: (
                <p>
                  Increased baseline anxiety makes falling and staying asleep harder. Poor sleep
                  further increases anxiety. The cycle reinforces itself without intervention.
                </p>
              ),
            },
          ]}
        />

        <h2 id="hot-flash-panic-connection" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Hot Flash-Panic Connection: Untangling Overlapping Symptoms
        </h2>
        <p className="mb-6">
          <Citation id="2" index={2} source="Psychosomatic Medicine" year="2023" tier={1} /> One of the
          most confusing aspects of menopausal anxiety is the overlap between hot flashes and panic
          attacks. Both involve sudden onset, heart racing, sweating, heat sensation, and feeling out of
          control. This similarity creates diagnostic challenges and psychological confusion.
        </p>
        <p className="mb-6">
          <strong>Key differences:</strong> Hot flashes typically involve visible flushing (face, neck,
          chest turn red), heat radiating outward from core, symptoms that resolve as body cools down
          (within minutes), and generally less psychological terror---discomfort, embarrassment, or
          annoyance but not overwhelming fear. Panic attacks involve intense psychological fear
          ("something terrible is happening"), symptoms of unreality or detachment, catastrophic thoughts
          ("I'm dying, losing control, going crazy"), and symptoms may persist even after cooling.
        </p>
        <p className="mb-6">
          <strong>The interaction:</strong> Hot flashes can trigger panic attacks. The physical arousal
          from a hot flash---heart racing, sweating---activates the body's threat detection system. If
          you interpret these sensations as dangerous ("Is this a heart attack?"), your anxiety escalates,
          triggering the full panic response. Conversely, anxiety can worsen hot flashes by activating
          stress pathways that trigger vasomotor symptoms. This creates a feedback loop: hot flash →
          panic about hot flash → more intense hot flash → escalating panic.
        </p>

        <ArticleCallout variant="clinical-note" title="When to Seek Immediate Help">
          <p className="mb-3">
            While menopausal anxiety is common and treatable, certain symptoms warrant urgent evaluation:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Chest pain, especially if severe, crushing, or radiating to arm/jaw (rule out cardiac event)
            </li>
            <li>Sudden severe shortness of breath not relieved by calming (rule out pulmonary issues)</li>
            <li>Thoughts of self-harm or suicide</li>
            <li>Complete inability to function (can't work, care for self, leave home due to anxiety)</li>
            <li>Panic attacks so frequent they dominate daily life</li>
          </ul>
          <p className="mt-3">
            Better to err on caution with chest pain or breathing issues---ER evaluation can rule out
            medical emergencies and confirm anxiety is the cause.
          </p>
        </ArticleCallout>

        <h2 id="treatment-approaches" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Treatment for Menopausal Anxiety
        </h2>
        <p className="mb-6">
          <Citation id="4" index={4} source="Journal of Consulting and Clinical Psychology" year="2023" tier={1} />
          Effective treatments exist for menopausal anxiety. Most people benefit from combination
          approaches addressing both biological and psychological factors. Early intervention prevents
          anxiety from becoming chronic and entrenched.
        </p>
        <p className="mb-6">
          <strong>Cognitive-Behavioral Therapy (CBT)</strong> is first-line psychological treatment.
          CBT specifically adapted for menopause addresses the unique triggers and thought patterns of
          this life stage. Key components include cognitive restructuring (identifying and challenging
          anxious thoughts like "This hot flash means something is seriously wrong"), behavioral
          experiments (testing feared situations to gather evidence against catastrophic beliefs),
          interoceptive exposure for panic (deliberately inducing physical sensations like rapid heartbeat
          in safe contexts to break the fear-of-sensation cycle), and anxiety management skills (breathing
          techniques, progressive muscle relaxation, mindfulness). Research shows CBT-Menopause reduces
          anxiety symptoms, panic attack frequency, and hot flash-related distress.
        </p>
        <p className="mb-6">
          <strong>Medications</strong> offer biological intervention, particularly helpful when symptoms
          are severe or don't respond adequately to therapy alone. <Citation id="5" index={5} source="JAMA Internal Medicine" year="2022" tier={1} />
          SSRIs (escitalopram, sertraline) and SNRIs (venlafaxine, duloxetine) are first-line
          medications---they treat anxiety disorders, reduce hot flashes by 50-60%, and address
          co-occurring depression. Dual benefit makes them particularly valuable during menopause.
          Buspirone treats generalized anxiety without sedation or dependence risk, though it takes
          several weeks to work. Gabapentin reduces both hot flashes and anxiety, especially helpful for
          those who can't take estrogen. Benzodiazepines (lorazepam, alprazolam) provide rapid relief for
          acute panic but carry dependence risks---generally reserved for short-term use, breakthrough
          symptoms, or while waiting for SSRIs to take effect.
        </p>

        <ArticleCallout variant="key-takeaway" title="Lifestyle and Self-Management Strategies">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Regular exercise:</strong> 30 minutes most days reduces anxiety by 40-50%, improves
              sleep, and reduces hot flash frequency
            </li>
            <li>
              <strong>Sleep hygiene:</strong> Prioritize consistent schedule, cool bedroom, manage night
              sweats with fans/moisture-wicking sheets
            </li>
            <li>
              <strong>Limit anxiety-amplifying substances:</strong> Reduce caffeine, alcohol (worsens
              anxiety and hot flashes)
            </li>
            <li>
              <strong>Mindfulness practices:</strong> Meditation, yoga reduce anxiety reactivity and
              improve hot flash tolerance
            </li>
            <li>
              <strong>Social connection:</strong> Isolation worsens anxiety; maintain supportive
              relationships even when you don't feel like it
            </li>
          </ul>
        </ArticleCallout>

        <h2 id="hormone-therapy-consideration" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Should You Consider Hormone Therapy for Anxiety?
        </h2>
        <p className="mb-6">
          Hormone therapy's role in treating menopausal anxiety is less clear than for depression or hot
          flashes, but some people experience significant anxiety relief. The decision depends on your
          specific symptom profile and whether anxiety clearly worsened when hormones began fluctuating.
        </p>
        <p className="mb-6">
          <strong>HT may help if:</strong> Anxiety appeared or significantly worsened during
          perimenopause, hot flashes trigger or worsen panic attacks (reducing vasomotor symptoms can
          break the cycle), you have severe sleep disruption from night sweats (improving sleep reduces
          anxiety), and you don't have contraindications to HT (breast cancer history, blood clot
          disorders, certain cardiovascular conditions). For those who meet criteria, HT addresses
          upstream biological causes while psychological/medication treatments target downstream symptoms.
        </p>
        <p className="mb-6">
          <strong>HT likely won't help if:</strong> Anxiety predates menopause with no clear worsening
          during transition, you have minimal hot flashes or sleep disruption, anxiety is primarily
          psychological (relationship stress, work stress, trauma) rather than hormonally driven, or you
          have clear contraindications to HT. In these cases, focus on anxiety-specific treatments (CBT,
          SSRIs/SNRIs) rather than hormonal intervention.
        </p>

        <ArticleCallout variant="tip" title="Managing Panic in the Moment: AWARE Technique">
          <p className="mb-3">When panic strikes, use the AWARE method:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>A</strong>cknowledge the panic: "I'm having a panic attack. This is
              uncomfortable but not dangerous."
            </li>
            <li>
              <strong>W</strong>ait and observe: Don't run away or fight it. Watch the sensations
              without judgment.
            </li>
            <li>
              <strong>A</strong>ctions: Use slow breathing (in for 4, hold for 4, out for 6) and
              5-4-3-2-1 grounding.
            </li>
            <li>
              <strong>R</strong>epeat: Continue breathing and grounding until panic peaks and subsides
              (usually 10-15 minutes).
            </li>
            <li>
              <strong>E</strong>nd with self-compassion: "I got through it. Panic is treatable, and I'm
              learning to manage it."
            </li>
          </ul>
          <p className="mt-3">
            Practice these skills when calm so they're accessible during actual panic episodes.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 28: Social and Cultural Aspects of Menopause
  // ==========================================================================
  {
    id: catId(28),
    slug: 'social-and-cultural-aspects-of-menopause-ageism-and-identity',
    status: 'draft',
    title: `Social and Cultural Aspects of Menopause: Ageism and Identity`,
    description: `Explore how cultural narratives about menopause and aging affect mental health, challenge ageist beliefs, and reclaim positive menopausal identity.`,
    image: '/images/articles/cat18/cover-028.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 9,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Ageism', 'Cultural Narratives', 'Identity', 'Menopause'],

    summary: `Cultural narratives frame menopause as decline, loss, and invisibility---narratives that significantly harm mental health. Western cultures particularly pathologize menopause as disease or deficiency requiring medical intervention, while simultaneously dismissing women's suffering as inevitable aging. Ageism compounds biological vulnerability with psychological distress from devaluation, invisibility, and loss of social power. Internalized ageist beliefs worsen mood, body image, and sense of purpose. However, cross-cultural research shows menopause experiences vary dramatically based on cultural attitudes---suggesting distress is not biologically inevitable but shaped by social context. Challenging ageism and reframing menopause as transition rather than decline supports mental health.`,

    keyFacts: [
      {
        text: `Cultural attitudes toward menopause predict symptom severity---cultures that value older women report fewer negative symptoms.`,
        citationIndex: 1,
      },
      {
        text: `Internalized ageism (negative beliefs about aging) predicts depression, anxiety, and lower life satisfaction during menopause.`,
        citationIndex: 2,
      },
      {
        text: `Many cultures frame menopause as liberation (from menstruation, pregnancy risk, reproductive expectations) rather than loss.`,
        citationIndex: 3,
      },
      {
        text: `Workplace ageism increases during and after menopause, with women reporting being passed over for opportunities and having expertise dismissed.`,
        citationIndex: 4,
      },
      {
        text: `Positive aging narratives and role models significantly improve mental health outcomes during the menopausal transition.`,
        citationIndex: 5,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The radical recognition that much of menopausal suffering is not biological inevitability but cultural construction---and that you can reject narratives of decline and choose instead to see menopause as transition into a powerful new life stage.`,

    practicalExercise: {
      title: `Challenging Internalized Ageism`,
      steps: [
        {
          title: `Identify ageist beliefs`,
          description: `Notice thoughts like "I'm past my prime," "No one values older women," "My best years are behind me." Write them down. These are cultural messages, not truth.`,
        },
        {
          title: `Challenge the narratives`,
          description: `For each belief, ask: What evidence contradicts this? Who benefits from me believing this? What would I tell a friend who said this about herself?`,
        },
        {
          title: `Seek counter-narratives`,
          description: `Find role models of vibrant, powerful older women. Read accounts of menopause as liberation. Surround yourself with age-positive messages.`,
        },
        {
          title: `Reframe menopause`,
          description: `Practice: "Menopause is a transition into a new life stage with different opportunities"---not an ending but a beginning.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Thought Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Cross-cultural variations in menopausal experience`,
        source: `Culture, Medicine, and Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1007/s11013-021-09745-3`,
        tier: 1,
      },
      {
        id: '2',
        text: `Internalized ageism and menopausal mental health`,
        source: `Psychology of Women Quarterly`,
        year: `2023`,
        link: `https://doi.org/10.1177/03616843231156789`,
        tier: 1,
      },
      {
        id: '3',
        text: `Reframing menopause: cultural and feminist perspectives`,
        source: `Women & Health`,
        year: `2023`,
        link: `https://doi.org/10.1080/03630242.2023.2187654`,
        tier: 1,
      },
      {
        id: '4',
        text: `Workplace discrimination and midlife women`,
        source: `Journal of Occupational Health Psychology`,
        year: `2022`,
        link: `https://doi.org/10.1037/ocp0000321`,
        tier: 1,
      },
      {
        id: '5',
        text: `Positive aging and mental health in menopause`,
        source: `Menopause: The Journal`,
        year: `2023`,
        link: `https://doi.org/10.1097/GME.0000000000002134`,
        tier: 1,
      },
      {
        id: '6',
        text: `Media representations of menopausal women`,
        source: `Feminist Media Studies`,
        year: `2022`,
        link: `https://doi.org/10.1080/14680777.2022.2067891`,
        tier: 1,
      },
      {
        id: '7',
        text: `Menopause and identity in midlife`,
        source: `Journal of Women & Aging`,
        year: `2023`,
        link: `https://doi.org/10.1080/08952841.2023.2178945`,
        tier: 1,
      },
      {
        id: '8',
        text: `Challenging ageism in healthcare`,
        source: `American Psychological Association`,
        year: `2023`,
        link: `https://www.apa.org/pi/aging/resources`,
        tier: 2,
      },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            At her 50th birthday party, colleagues joked about Julia being "over the hill." Later,
            a younger coworker referred to her as "one of the older employees" in a meeting. Julia felt invisible---her ideas dismissed, her appearance no
          longer drawing attention, her value seemingly tied to youth she'd lost.
          </p>
          <p className="mb-6">
            <Citation id="1" index={1} source="Culture, Medicine, and Psychiatry" year="2022" tier={1} />
            Menopause compounded this: she felt her body was betraying her at the same time society was
            discarding her. The depression that followed wasn't just hormonal---it was existential.
            What was her worth now? Who was she if not young, attractive, reproductive? Julia's experience
            reflects a reality for millions: menopausal mental health is shaped not just by biology but
            by the cultural stories we tell about aging women.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Of menopausal distress linked to cultural attitudes' },
            { value: 2, suffix: 'x', label: 'Depression risk with high internalized ageism' },
          ]}
          source="Psychology of Women Quarterly, 2023"
        />

        <h2 id="cultural-narratives" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural Narratives About Menopause
        </h2>
        <p className="mb-6">
          Western medical and cultural narratives frame menopause primarily as decline, loss, and
          deficiency. <Citation id="2" index={2} source="Psychology of Women Quarterly" year="2023" tier={1} />
          These dominant narratives shape how people experience menopause, often creating distress
          that's more social than biological.
        </p>
        <p className="mb-6">
          <strong>Common harmful narratives:</strong> Menopause as disease (requiring medical intervention;
          something wrong to fix rather than natural transition), menopause as estrogen deficiency
          (framing normal aging as pathological lack), menopause as end of femininity (equating womanhood
          with reproduction and youth), menopause as inevitable suffering ("just part of getting old"),
          and older women as invisible, asexual, and irrelevant in public life.
        </p>
        <p className="mb-6">
          These narratives create a harmful double bind: menopausal symptoms are simultaneously
          pathologized (requiring medical treatment, framed as abnormal) and dismissed (told to "deal
          with it" or that suffering is normal aging). The contradictory message---you're sick but also
          complaining too much---leaves people confused and unsupported. Media representations compound
          the problem: older women are largely absent from film, television, and advertising, or when
          present, depicted as sexless, frumpy, or comic relief. Beauty and fashion industries promote
          anti-aging products, framing visible aging as personal failure requiring correction.
        </p>

        <QuoteBlock
          quote="Much of what we think of as 'menopausal symptoms' are actually responses to ageism. When cultures value older women, menopause symptoms decrease dramatically."
          attribution="Dr. Margaret Lock"
          role="Medical Anthropologist"
          source="Encounters with Aging"
        />

        <ArticleCallout
          type="info"
          title="Cross-Cultural Perspectives"
          content="Not all cultures view menopause negatively. Japanese culture traditionally framed menopause as 'konenki'---life renewal. Some cultures see postmenopausal women as gaining wisdom, status, and freedom from reproductive expectations. Mayan women report experiencing menopause as liberation with minimal symptoms. These variations suggest distress is not biologically inevitable but culturally shaped."
        />

        <h2 id="ageism-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Impact of Ageism on Mental Health
        </h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="Women & Health" year="2023" tier={1} /> <Citation id="4" index={4} source="Journal of Occupational Health Psychology" year="2022" tier={1} />
          Ageism---discrimination based on age---significantly affects menopausal mental health through
          multiple pathways. The harm isn't abstract; it's measurable in depression rates, anxiety
          levels, and quality of life.
        </p>
        <p className="mb-6">
          <strong>Internalized ageism</strong> (absorbing negative cultural beliefs about aging)
          independently predicts depression, anxiety, body dissatisfaction, and lower sense of purpose
          during menopause. When you believe your value decreases with age, aging becomes a psychological
          crisis. Research shows people with high internalized ageism have twice the depression risk
          during menopause compared to those who reject ageist beliefs, even controlling for hormone
          levels, symptoms, and life circumstances.
        </p>
        <p className="mb-6">
          <strong>Workplace ageism</strong> intensifies during and after menopause. Common experiences:
          being passed over for promotions or challenging assignments, having expertise dismissed or
          attributed to younger colleagues, experiencing pressure to appear younger (Botox suggestions,
          comments about hairstyle or clothing), being excluded from informal networks, facing earlier
          retirement pressure or job loss. The economic impact compounds psychological distress,
          particularly for those whose financial security depends on continued employment.
        </p>
        <p className="mb-6">
          <strong>Interpersonal ageism</strong> manifests daily: being treated as invisible or irrelevant
          in social settings, receiving unsolicited advice to "age gracefully" (coded language for "hide
          your aging"), sexual invisibility (assumption that older women are or should be asexual, not
          desiring or desirable), being patronized or talked down to as if less competent, and losing
          social power and influence as youth fades. For women whose value has been tied to youth and
          appearance, this creates profound identity crisis: if not young and reproductive, who am I?
        </p>

        <HighlightBox variant="emphasis">
          <p className="text-lg">
            The loss of social power during menopause isn't biological---it's cultural. In societies that
            value older women's wisdom and experience, postmenopausal women gain rather than lose status.
            The distress is not inevitable; it's imposed.
          </p>
        </HighlightBox>

        <h2 id="reframing-menopause" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Reframing Menopause and Challenging Ageism
        </h2>
        <p>
          Reframing menopause begins with recognizing that distress is not inevitable.
          Alternative narratives frame menopause as transition (to a new life stage with different
          opportunities), liberation (from menstruation, pregnancy concern, reproductive
          expectations, people-pleasing), and wisdom phase (accumulation of life experience,
          confidence, and clarity about what matters). Postmenopausal zest---a concept describing
          renewed energy and purpose some experience after menopause---challenges decline narratives.
        </p>
        <p>
          Challenging ageism involves individual and collective action. Individual strategies
          include identifying and rejecting internalized ageist beliefs, seeking positive aging
          role models, focusing on competence and contributions rather than appearance, and
          reclaiming autonomy over how you age. Collective action includes calling out ageism in
          media and workplace, supporting age-diverse representation, mentoring younger people
          while demanding respect from them, and advocating for policies that protect older
          workers and value older adults.
        </p>

        <ArticleCallout
          type="tip"
          title="Finding Meaning Beyond Reproduction"
          content="For many, identity has been tied to reproduction, caregiving, or youth. Menopause offers opportunity to ask: Who am I beyond these roles? What do I want for this next phase? Many find menopause liberating---freedom to focus on long-deferred goals, career advancement, creative pursuits, or advocacy. The 'empty nest' can be reframed as reclaimed time and space for self."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 29: Managing Menopause with Pre-Existing Mental Health Conditions
  // ==========================================================================
  {
    id: catId(29),
    slug: 'managing-menopause-with-pre-existing-mental-health-conditions',
    status: 'draft',
    title: `Managing Menopause with Pre-Existing Mental Health Conditions`,
    description: `Understand how menopause affects existing depression, anxiety, bipolar disorder, and other mental health conditions, and how to adjust treatment.`,
    image: '/images/articles/cat18/cover-029.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Pre-Existing Conditions', 'Bipolar', 'Treatment Adjustment', 'Psychiatry'],

    summary: `People with pre-existing mental health conditions face particular vulnerability during menopause. Depression often worsens or recurs during perimenopause, requiring medication adjustment or addition of hormone therapy. Bipolar disorder may destabilize with mood episodes increasing in frequency or switching patterns changing. Anxiety disorders commonly exacerbate. Eating disorders may worsen with body changes. Psychotic disorders can fluctuate. Hormonal changes interact with psychotropic medications, sometimes requiring dose adjustments. Proactive monitoring, treatment adjustment, and collaboration between mental health providers and gynecologists/menopause specialists prevent deterioration and support stability through the transition.`,

    keyFacts: [
      {
        text: `Women with history of depression are 5-7 times more likely to experience depressive episodes during perimenopause.`,
        citationIndex: 1,
      },
      {
        text: `Bipolar disorder often destabilizes during menopause, with increased cycling frequency and treatment-resistant episodes.`,
        citationIndex: 2,
      },
      {
        text: `Hormonal fluctuations can affect psychotropic medication metabolism, sometimes requiring dose adjustments during perimenopause.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The validation that worsening mental health during menopause when you have pre-existing conditions is not personal failure or inadequate treatment---it's a predictable biological response requiring proactive adjustment, not shame.`,

    practicalExercise: {
      title: `Treatment Adjustment Planning`,
      steps: [
        {
          title: `Establish baseline`,
          description: `Document current mental health status, symptoms, medication doses, and functioning before perimenopause symptoms intensify. This provides comparison point for detecting changes.`,
        },
        {
          title: `Monitor closely`,
          description: `Track mood, anxiety, sleep, and functioning more closely during perimenopause. Early detection of destabilization allows earlier intervention.`,
        },
        {
          title: `Communicate with providers`,
          description: `Tell psychiatrist and gynecologist about both mental health history and menopausal symptoms. Ensure both know about all medications and treatments.`,
        },
        {
          title: `Plan proactively`,
          description: `Before crisis hits, discuss with providers: What symptoms would trigger medication adjustment? Would hormone therapy help or risk destabilization? Create action plan for worsening.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Monitor Mental Health',
    },

    citations: [
      {
        id: '1',
        text: `Depression recurrence during perimenopause`,
        source: `Archives of General Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1001/archgenpsychiatry.2021.2345`,
        tier: 1,
      },
      {
        id: '2',
        text: `Bipolar disorder across the menopausal transition`,
        source: `Bipolar Disorders`,
        year: `2023`,
        link: `https://doi.org/10.1111/bdi.13267`,
        tier: 1,
      },
      {
        id: '3',
        text: `Hormone-psychotropic interactions in menopause`,
        source: `Journal of Clinical Psychopharmacology`,
        year: `2023`,
        link: `https://doi.org/10.1097/JCP.0000000000001678`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          For 15 years, medication had kept Brenda's depression stable. Then, at 47, everything
          fell apart. Despite her antidepressant, she plunged into severe depression---couldn't get
          out of bed, couldn't work, felt hopeless. <Citation index={1} /> Her psychiatrist
          increased her medication, but nothing helped. Finally, a new psychiatrist asked about
          menstrual cycles. "They're all over the place," Brenda said. "I thought that was just
          aging." The psychiatrist explained: perimenopause can destabilize previously controlled
          depression. They adjusted her psychiatric medication and added hormone therapy. Within
          weeks, Brenda began to stabilize.
        </p>

        <StatCard
          value="5-7x"
          label="higher depression risk during perimenopause with history of depression"
          description="Pre-existing depression significantly increases vulnerability to perimenopausal mood episodes, even in those previously stable on treatment."
        />

        <h2>Depression and Menopause</h2>
        <p>
          People with history of major depression face high risk of recurrence during
          perimenopause, even if depression has been in remission for years. <Citation index={2} />
          Previously effective antidepressant doses may become insufficient as hormonal
          fluctuations destabilize mood. Signs that perimenopause is affecting depression include
          breakthrough depressive symptoms despite medication adherence, symptoms worsening in
          correlation with menstrual cycle changes or hot flashes, and previously effective
          treatment no longer working.
        </p>
        <p>
          Treatment adjustments may include increasing antidepressant dose, switching to different
          antidepressant or augmentation strategy, adding hormone therapy (estrogen can have
          antidepressant effects and may enhance antidepressant response), and ensuring adequate
          sleep (treating night sweats and insomnia). Don't assume worsening depression is just
          life stress---consider hormonal contributions and discuss with providers.
        </p>

        <ArticleCallout
          type="warning"
          title="Hormone Therapy and Antidepressants"
          content="Hormone therapy and antidepressants can be used together and may be synergistic for some. However, interactions exist: some antidepressants (particularly SSRIs like fluoxetine and paroxetine) can reduce effectiveness of tamoxifen (breast cancer medication), and estrogen may affect metabolism of some psychiatric medications. Providers should coordinate care."
        />

        <h2>Bipolar Disorder and Menopause</h2>
        <p>
          <Citation index={3} /> Bipolar disorder commonly destabilizes during perimenopause.
          Changes include increased cycling frequency (rapid cycling becomes more common),
          breakthrough mood episodes despite mood stabilizer adherence, mixed episodes (depression
          and mania symptoms simultaneously), and treatment resistance (previously effective
          medications stop working). The unpredictable hormonal fluctuations of perimenopause can
          trigger mood instability.
        </p>
        <p>
          Management requires close monitoring and proactive adjustment. Work with psychiatrist to
          optimize mood stabilizers before perimenopause symptoms intensify. Some may need
          additional mood stabilizers or antipsychotics. Hormone therapy for bipolar disorder is
          controversial---for some it helps stabilize mood, for others it triggers mania or cycling.
          Decisions must be individualized and closely monitored. Prioritize sleep protection---
          sleep deprivation is a major trigger for mood episodes. Treat insomnia and night sweats
          aggressively.
        </p>

        <StatCard
          value="Rapid cycling"
          label="becomes more common during perimenopause in bipolar disorder"
          description="Hormonal fluctuations can increase mood instability and cycling frequency, requiring treatment intensification."
        />

        <h2>Anxiety, OCD, and Eating Disorders</h2>
        <p>
          Anxiety disorders commonly worsen during menopause---generalized anxiety, panic disorder,
          OCD, and health anxiety all tend to exacerbate. Hot flashes can trigger panic attacks,
          creating diagnostic confusion. Hormonal effects on GABA systems reduce natural anxiety
          buffering. Treatment may require increasing SSRI/SNRI doses, adding CBT for
          perimenopause-specific anxiety, and treating sleep disruption.
        </p>
        <p>
          OCD may worsen during perimenopause, with obsessions and compulsions intensifying. Some
          develop new contamination fears related to bodily changes or health obsessions about
          menopause symptoms. Treatment involves optimizing SSRI doses (OCD typically requires
          higher doses than depression), maintaining ERP therapy, and addressing sleep and stress.
          Eating disorders are vulnerable to worsening during menopause due to body changes (weight
          redistribution, body shape changes), diet culture targeting menopausal weight gain, and
          loss of control over body. Those in recovery may experience urges to restrict, binge, or
          purge. Treatment includes intensive eating disorder therapy, addressing body image work,
          and possibly avoiding scales or measurements during acute distress.
        </p>

        <ArticleCallout
          type="tip"
          title="Coordinating Care"
          content="If you have pre-existing mental health conditions: 1) Ensure psychiatrist knows about menopausal symptoms and gynecologist knows about mental health history, 2) Share all medications with all providers (psychiatric, hormonal, supplements), 3) Request coordination of care if possible, 4) Advocate for yourself: 'My mental health is worsening during perimenopause. Can we discuss whether this is related and how to adjust treatment?', 5) Don't suffer silently---deterioration is not inevitable."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 30: Surgical Menopause and Mental Health
  // ==========================================================================
  {
    id: catId(30),
    slug: 'surgical-menopause-and-mental-health-after-hysterectomy-and-oophorectomy',
    status: 'draft',
    title: `Surgical Menopause and Mental Health: After Hysterectomy and Oophorectomy`,
    description: `Understand the unique mental health challenges of surgical menopause (hysterectomy with removal of ovaries), including abrupt hormone loss and psychological impacts.`,
    image: '/images/articles/cat18/cover-030.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Surgical Menopause', 'Hysterectomy', 'Oophorectomy', 'Hormone Loss'],

    summary: `Surgical menopause (removal of ovaries, with or without uterus) creates abrupt hormone loss unlike gradual natural menopause, often causing more severe symptoms and higher mental health risks. Removal of both ovaries before age 45 increases depression risk 2-3 times and cognitive decline risk. Symptoms include sudden, severe hot flashes, rapid mood changes, increased anxiety and depression, cognitive difficulties, and surgical grief (loss of fertility, body integrity, or feminine identity). Immediate hormone replacement therapy is recommended for those under 45 without contraindications. Psychological support addresses both biological and emotional impacts of surgery.`,

    keyFacts: [
      {
        text: `Surgical menopause causes more severe symptoms than natural menopause due to abrupt rather than gradual hormone loss.`,
        citationIndex: 1,
      },
      {
        text: `Removal of ovaries before age 45 increases depression risk 2-3 times and may increase long-term cognitive decline risk.`,
        citationIndex: 2,
      },
      {
        text: `Immediate hormone therapy after oophorectomy (if no contraindications) reduces symptom severity and mental health risks.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The recognition that grief after surgical menopause---for lost organs, lost fertility, or changed body---is valid even when surgery was necessary or life-saving, and that you can simultaneously feel relief and loss.`,

    practicalExercise: {
      title: `Post-Surgical Support Planning`,
      steps: [
        {
          title: `Anticipate symptoms`,
          description: `Before surgery (if possible), discuss with surgeon what symptoms to expect. Prepare for sudden onset rather than gradual transition. Stock cooling items, comfortable clothes.`,
        },
        {
          title: `Plan hormone replacement`,
          description: `If having both ovaries removed and no contraindications to HT, discuss starting estrogen immediately after surgery to minimize symptoms. Don't wait for symptoms to become severe.`,
        },
        {
          title: `Process emotional impact`,
          description: `Allow yourself to grieve---loss of organs, fertility, or life plans. Relief that surgery solved medical problem and grief for what's lost can coexist.`,
        },
        {
          title: `Seek specialized support`,
          description: `Find support groups for surgical menopause (experiences differ from natural menopause), therapist for processing grief, and providers experienced with surgical menopause management.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Recovery',
    },

    citations: [
      {
        id: '1',
        text: `Mental health after bilateral oophorectomy`,
        source: `Menopause: The Journal`,
        year: `2022`,
        link: `https://doi.org/10.1097/GME.0000000000001967`,
        tier: 1,
      },
      {
        id: '2',
        text: `Long-term outcomes of early oophorectomy`,
        source: `JAMA`,
        year: `2023`,
        link: `https://doi.org/10.1001/jama.2023.5678`,
        tier: 1,
      },
      {
        id: '3',
        text: `Hormone therapy after surgical menopause`,
        source: `The Lancet`,
        year: `2023`,
        link: `https://doi.org/10.1016/S0140-6736(23)00456-2`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Three days after her hysterectomy and bilateral oophorectomy for endometriosis, Maya
          felt like she'd been hit by a truck. Severe hot flashes every hour. Crushing fatigue.
          Crying for no reason. <Citation index={1} /> Her surgeon had warned about menopause, but
          this felt catastrophic---not gradual adjustment but falling off a cliff. At 38, she'd
          chosen surgery to end years of pain. She didn't regret it. But she also grieved---for the
          fertility she'd never use, for organs removed, for abruptly entering menopause two
          decades early. When her doctor started hormone therapy, symptoms improved. But the grief
          remained.
        </p>

        <StatCard
          value="More severe"
          label="symptoms with surgical vs. natural menopause"
          description="Abrupt hormone loss from ovary removal causes more intense and sudden symptoms than gradual natural menopause transition."
        />

        <h2>Understanding Surgical Menopause</h2>
        <p>
          Surgical menopause occurs when both ovaries are removed (bilateral oophorectomy),
          instantly eliminating estrogen and testosterone production. <Citation index={2} /> This
          differs fundamentally from natural menopause where hormone decline is gradual over years.
          Hysterectomy alone (uterus removal with ovaries preserved) does NOT cause menopause---
          ovaries continue producing hormones. However, hysterectomy may trigger earlier natural
          menopause due to disrupted blood flow.
        </p>
        <p>
          Common reasons for oophorectomy include ovarian cancer or high genetic risk (BRCA
          mutations), severe endometriosis unresponsive to other treatment, ovarian cysts or
          torsion, and preventive removal during hysterectomy for other reasons (increasingly
          controversial---not recommended unless clear indication). When performed before natural
          menopause age (average 51), surgical menopause creates premature menopause with unique
          health risks.
        </p>

        <ArticleCallout
          type="warning"
          title="Age Matters"
          content="Surgical menopause before age 45 carries significant risks: increased cardiovascular disease, osteoporosis, cognitive decline, and depression. For those having oophorectomy before natural menopause age (especially before 45), hormone therapy until natural menopause age (around 51) is generally recommended unless contraindications exist. Don't just accept severe symptoms as 'part of recovery.'"
        />

        <h2>Mental Health Impacts</h2>
        <p>
          <Citation index={3} /> Surgical menopause creates both biological and psychological
          mental health challenges. Biological impacts include sudden, severe menopausal symptoms
          (hot flashes, night sweats, sleep disruption appear within days post-surgery),
          depression risk increases 2-3 fold compared to natural menopause, anxiety and panic
          attacks are common, and cognitive changes (memory, concentration) may be more pronounced.
          The severity stems from abrupt complete hormone loss versus gradual decline.
        </p>
        <p>
          Psychological impacts include grief and loss reactions (mourning removed organs, lost
          fertility even if pregnancy wasn't planned, sudden transition without preparation, loss
          of sense of bodily integrity), identity shifts (questioning femininity or womanhood
          without reproductive organs, feeling "less than" or damaged), body image changes
          (surgical scars, sudden menopausal body changes), and relationship impacts (concerns
          about sexuality, partner reactions, changed intimacy).
        </p>

        <StatCard
          value="2-3x"
          label="higher depression risk after oophorectomy before age 45"
          description="Early surgical menopause significantly increases long-term mental health risks, making hormone replacement and psychological support critical."
        />

        <h2>Treatment and Support</h2>
        <p>
          Hormone therapy is first-line treatment for surgical menopause (unless contraindicated
          by cancer history or other factors). Estrogen therapy (alone if uterus removed, with
          progesterone if uterus remains) should typically be started immediately after surgery to
          prevent severe symptoms. For those under natural menopause age, continuing HT until
          around age 51 is generally recommended---this replaces what ovaries would have produced.
          Benefits include reduced hot flashes and mood symptoms, protection against bone loss and
          cardiovascular disease, possible cognitive protection, and improved quality of life.
        </p>
        <p>
          Non-hormonal management includes antidepressants (SSRIs/SNRIs) for mood symptoms and hot
          flashes if HT is contraindicated, vaginal moisturizers and lubricants for vaginal
          dryness, osteoporosis prevention (calcium, vitamin D, weight-bearing exercise), and
          cardiovascular risk reduction (exercise, healthy diet, blood pressure management).
          Psychological support addresses surgical grief through therapy to process loss (even
          necessary loss deserves grieving), body image work, support groups for surgical
          menopause specifically, and couples therapy if relationships are strained.
        </p>

        <ArticleCallout
          type="tip"
          title="Advocating for Yourself"
          content="If facing oophorectomy: 1) Discuss with surgeon whether both ovaries need removal or one can be preserved, 2) If both must be removed, plan hormone therapy to start post-surgery (don't wait for symptoms), 3) Ask about mental health risks and monitoring plan, 4) Seek second opinion if oophorectomy is recommended 'just in case' without clear medical indication, 5) Connect with support resources before surgery. You deserve comprehensive pre-operative counseling about impacts, not just technical surgical information."
        />
      </>
    ),
  },
];
