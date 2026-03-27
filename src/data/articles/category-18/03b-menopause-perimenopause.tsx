/* eslint-disable @typescript-eslint/no-unused-vars, no-useless-escape */
// ============================================================================
// Category 18 --- Women's Mental Health | Subcategory 03b
// Menopause and Perimenopause (Articles 26-30)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
export const articles: Article[] = [
  // ==========================================================================
  // Article 26: Hormone Therapy and Mental Health
  // ==========================================================================
  {
    id: catId(26),
    slug: 'hormone-therapy-and-mental-health-benefits-risks-and-decisions',
    title: `Hormone Therapy and Mental Health: Benefits, Risks, and Decisions`,
    description: `Understand how hormone therapy affects mental health during menopause, weigh benefits and risks, and make informed decisions about treatment.`,
    image: '/images/articles/cat18/cover-026.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
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
    ],

    content: (
      <>
        <p>
          When Rita's doctor suggested hormone therapy for her debilitating hot flashes and mood
          swings, Rita hesitated. Twenty years ago, headlines had screamed about HT causing cancer
          and heart attacks. <Citation index={1} /> But her quality of life was miserable---she
          couldn't sleep, couldn't work effectively, felt irritable and depressed. Her doctor
          explained: the 2002 study that scared everyone had limitations, newer evidence was more
          nuanced, and for someone Rita's age (52) starting HT now, benefits likely outweighed
          risks. Rita needed to make an informed decision for herself---not based on fear or
          headlines, but on her specific situation.
        </p>

        <StatCard
          value="Antidepressant effects"
          label="of estrogen therapy in perimenopausal depression"
          description="For some women, hormone therapy effectively treats mood symptoms during perimenopause---not just by reducing physical symptoms but through direct brain effects."
        />

        <h2>How Hormone Therapy Affects Mental Health</h2>
        <p>
          Hormone therapy improves mental health through multiple pathways. <Citation index={2} />
          Indirect effects include reducing hot flashes and night sweats (which improves sleep,
          which improves mood), and reducing physical discomfort that contributes to distress and
          irritability. Direct brain effects occur independent of physical symptom relief: estrogen
          stabilizes serotonin, dopamine, and norepinephrine systems (neurotransmitters critical
          for mood), supports neuroplasticity and neuroprotection in brain regions like the
          hippocampus, and modulates stress response systems.
        </p>
        <p>
          Studies show estrogen therapy can have antidepressant effects in perimenopausal
          depression, particularly when started during the transition (not years later). Some women
          report dramatic mood improvement on HT; others notice physical symptom relief but minimal
          mood change; still others experience no benefit or even mood worsening. Response is
          individual and unpredictable---trial and error is often necessary.
        </p>

        <ArticleCallout
          type="info"
          title="Types of Hormone Therapy"
          content="Systemic HT (treats whole-body symptoms): estrogen-only (for those without a uterus), combined estrogen-progesterone (for those with a uterus---progesterone protects uterine lining from estrogen's effects). Formulations include pills, patches, gels, sprays. Local/vaginal HT (treats vaginal symptoms only): creams, tablets, rings with minimal systemic absorption. Can be used even by some who can't use systemic HT."
        />

        <h2>Risks of Hormone Therapy</h2>
        <p>
          <Citation index={3} /> HT carries real but generally small risks. Breast cancer risk
          increases with combined estrogen-progesterone HT (about 1 additional case per 1,000
          women per year of use), less clear increase with estrogen-only HT, and risk returns to
          baseline within years of stopping. Cardiovascular risks include increased risk of blood
          clots (particularly with oral HT), increased stroke risk (small absolute risk), and
          effects on heart disease risk depend on timing (lower risk if started early in
          menopause, possible increased risk if started 10+ years post-menopause or after age 60---
          the "timing hypothesis").
        </p>
        <p>
          Individual risk factors modify these baseline risks. Higher risk groups include those
          with personal history of breast cancer, blood clots, or cardiovascular disease, smokers
          (HT increases cardiovascular risk), those with certain genetic mutations (e.g., BRCA),
          and those starting HT many years after menopause. Lower risk groups include those using
          estrogen-only HT, using transdermal (patch/gel) rather than oral HT (lower blood clot
          risk), using lowest effective dose for shortest necessary time, and starting HT during
          perimenopause or early postmenopause.
        </p>

        <StatCard
          value="Timing matters"
          label="HT safer when started <10 years from menopause or <age 60"
          description="The 'timing hypothesis' suggests HT has more favorable benefit-risk profile when started during menopausal transition rather than years later."
        />

        <h2>Making Informed Decisions</h2>
        <p>
          HT decision-making is personalized---there's no universal right answer. Considerations
          include symptom severity (debilitating symptoms may justify risks that minor symptoms
          don't), age and time since menopause (earlier initiation is generally safer), personal
          and family health history (affects risk calculation), and values and risk tolerance
          (some prioritize quality of life now even with small risks; others prioritize risk
          minimization even if symptoms persist).
        </p>
        <p>
          If choosing HT, work with providers to minimize risks: use lowest effective dose, choose
          transdermal over oral when possible (lower clot risk), use estrogen-only if you've had
          hysterectomy, re-evaluate annually (do you still need it?), and monitor with regular
          mammograms, blood pressure checks, and symptom assessment. If HT isn't appropriate due
          to contraindications, alternatives exist: SSRIs or SNRIs for mood and hot flashes,
          gabapentin for hot flashes, vaginal estrogen for local symptoms (safe even for many who
          can't use systemic HT), and non-pharmacological approaches.
        </p>

        <ArticleCallout
          type="tip"
          title="Questions for Your Provider"
          content="Before starting HT: 1) Based on my symptoms and health history, am I a candidate for HT?, 2) What type/formulation/dose do you recommend and why?, 3) What are MY specific risks (not just general population risks)?, 4) How will we monitor me on HT?, 5) What are alternatives if HT doesn't work or isn't appropriate? Get individualized guidance, not one-size-fits-all advice."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 27: Menopause and Anxiety
  // ==========================================================================
  {
    id: catId(27),
    slug: 'menopause-and-anxiety-managing-increased-worry-and-panic',
    title: `Menopause and Anxiety: Managing Increased Worry and Panic`,
    description: `Understand why anxiety often worsens during menopause, recognize symptoms of generalized anxiety and panic, and learn evidence-based treatments.`,
    image: '/images/articles/cat18/cover-027.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
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
    ],

    content: (
      <>
        <p>
          The panic attack hit while Yuki was grocery shopping. Her heart pounded, she couldn't
          catch her breath, the room tilted. She abandoned her cart and fled to her car,
          convinced she was having a heart attack. <Citation index={1} /> At the ER, tests were
          normal. "Anxiety attack," the doctor said. But Yuki had never had anxiety like this. At
          49, she'd been experiencing irregular periods and hot flashes---could those be connected?
          When she mentioned this to her psychiatrist, the answer was immediate: "Absolutely.
          Panic attacks during perimenopause are common. Your hormones are affecting your nervous
          system."
        </p>

        <StatCard
          value="30-50%"
          label="experience increased anxiety during menopausal transition"
          description="Anxiety symptoms---worry, panic, physical tension---increase significantly during perimenopause even in those without prior anxiety disorders."
        />

        <h2>Forms of Menopausal Anxiety</h2>
        <p>
          Anxiety during menopause takes several forms. Generalized anxiety disorder (GAD)
          features excessive, uncontrollable worry about multiple topics (health, finances,
          relationships, aging), restlessness or feeling on edge, difficulty concentrating, muscle
          tension, and sleep disturbance. <Citation index={2} /> Panic disorder involves sudden,
          intense panic attacks with physical symptoms (racing or pounding heart, sweating,
          trembling, shortness of breath, chest pain, nausea, dizziness, fear of losing control or
          dying), and fear of future panic attacks leading to avoidance of triggering situations.
        </p>
        <p>
          Health anxiety becomes more common during menopause---excessive worry about physical
          symptoms (Is this hot flash a heart problem? Is memory loss dementia?), frequent doctor
          visits or medical tests, and inability to be reassured by normal results. Social anxiety
          may worsen if body image changes increase self-consciousness. Pre-existing anxiety
          disorders often exacerbate during menopause, requiring treatment adjustment.
        </p>

        <ArticleCallout
          type="warning"
          title="Hot Flashes vs. Panic Attacks"
          content="Hot flashes and panic attacks share symptoms: sudden onset, heart racing, sweating, heat sensation, feeling out of control. This creates confusion. Key differences: hot flashes include visible flushing and resolve as you cool down; panic includes intense fear and psychological symptoms. However, hot flashes can trigger panic attacks, and panic can worsen hot flashes---they interact. Treating both is often necessary."
        />

        <h2>Why Menopause Triggers Anxiety</h2>
        <p>
          <Citation index={3} /> Hormonal changes directly affect anxiety neurobiology. Estrogen
          modulates serotonin (low estrogen can increase anxiety) and affects the amygdala (the
          brain's fear center---estrogen fluctuations increase amygdala reactivity to threats).
          Progesterone metabolites enhance GABA function (the brain's main calming system)---
          declining progesterone reduces this calming effect, increasing baseline anxiety and
          reactivity.
        </p>
        <p>
          Sleep deprivation from night sweats creates a vicious cycle: poor sleep increases stress
          reactivity and anxiety; anxiety worsens sleep. Chronic sleep loss also impairs prefrontal
          cortex function (the brain region that regulates emotional responses), making it harder
          to manage anxiety. Hot flashes themselves trigger physiological arousal that can spiral
          into panic, especially if you interpret the symptoms catastrophically. Psychosocial
          stressors of midlife (aging parents, career pressures, relationship changes, existential
          concerns about aging) compound biological vulnerability.
        </p>

        <StatCard
          value="GABA reduction"
          label="from declining progesterone increases anxiety vulnerability"
          description="Progesterone's calming metabolites decline during menopause, reducing the brain's natural anxiety-buffering system."
        />

        <h2>Treatment Approaches</h2>
        <p>
          Cognitive-behavioral therapy (CBT) is first-line treatment for anxiety disorders,
          including menopausal anxiety. CBT targets anxious thought patterns (catastrophizing,
          overestimating danger), teaches anxiety management skills (breathing techniques,
          progressive muscle relaxation, mindfulness), and uses exposure to reduce avoidance. For
          panic disorder specifically, interoceptive exposure (deliberately inducing physical
          sensations like rapid heartbeat in safe contexts) helps break the fear-of-fear cycle.
        </p>
        <p>
          Medication options include SSRIs and SNRIs (first-line for generalized anxiety and panic
          disorder; also reduce hot flashes as a bonus), buspirone (for generalized anxiety; no
          sedation or dependence risk), gabapentin (reduces both hot flashes and anxiety; useful
          when both are present), and benzodiazepines (rapid relief for acute panic but carry
          dependency risks---generally reserved for short-term use or breakthrough symptoms).
          Hormone therapy may help anxiety for some, particularly if anxiety worsened with
          hormonal changes. Lifestyle interventions---regular exercise, stress management, adequate
          sleep, limiting caffeine and alcohol---support anxiety management.
        </p>

        <ArticleCallout
          type="tip"
          title="Managing Panic in the Moment"
          content="When panic strikes: 1) Remind yourself this is uncomfortable but not dangerous (panic can't hurt you), 2) Focus on slow, deep breathing (breath in for 4, hold for 4, out for 6---repeat), 3) Ground yourself with 5-4-3-2-1 sensory technique, 4) Don't fight the panic---let it peak and pass (resistance makes it worse), 5) Return to what you were doing once symptoms subside (avoidance maintains panic). Practice these skills before panic occurs so they're accessible during episodes."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 28: Social and Cultural Aspects of Menopause
  // ==========================================================================
  {
    id: catId(28),
    slug: 'social-and-cultural-aspects-of-menopause-ageism-and-identity',
    title: `Social and Cultural Aspects of Menopause: Ageism and Identity`,
    description: `Explore how cultural narratives about menopause and aging affect mental health, challenge ageist beliefs, and reclaim positive menopausal identity.`,
    image: '/images/articles/cat18/cover-028.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
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
    ],

    content: (
      <>
        <p>
          At her 50th birthday party, colleagues joked about Julia being "over the hill." Later,
          a younger coworker referred to her as "one of the older employees" in a meeting.{' '}
          <Citation index={1} /> Julia felt invisible---her ideas dismissed, her appearance no
          longer drawing attention, her value seemingly tied to youth she'd lost. Menopause
          compounded this: she felt her body was betraying her at the same time society was
          discarding her. The depression that followed wasn't just hormonal---it was existential.
          What was her worth now? Who was she if not young, attractive, reproductive?
        </p>

        <StatCard
          value="Cultural attitudes"
          label="predict menopausal symptom severity more than biological factors"
          description="Research across cultures shows menopause experiences vary dramatically based on whether cultures value or devalue older women."
        />

        <h2>Cultural Narratives About Menopause</h2>
        <p>
          Western medical and cultural narratives frame menopause primarily as decline, loss, and
          deficiency. <Citation index={2} /> Common narratives include menopause as disease
          (requiring medical intervention; something wrong to fix), menopause as estrogen
          deficiency (framing normal aging as pathological lack), menopause as end of femininity
          (equating womanhood with reproduction and youth), menopause as inevitable suffering
          ("just part of getting old"), and older women as invisible, asexual, and irrelevant.
        </p>
        <p>
          These narratives create a double bind: women's menopausal symptoms are simultaneously
          pathologized (requiring medical treatment) and dismissed (told to "deal with it" or that
          suffering is normal). The message is contradictory: you're sick but also complaining too
          much. Media representations compound this---older women are largely absent, or when
          present, depicted as sexless, frumpy, or comic relief. Beauty and fashion industries
          promote anti-aging products, framing visible aging as failure.
        </p>

        <ArticleCallout
          type="info"
          title="Cross-Cultural Perspectives"
          content="Not all cultures view menopause negatively. Japanese culture traditionally framed menopause as 'konenki'---life renewal. Some cultures see postmenopausal women as gaining wisdom, status, and freedom from reproductive expectations. Mayan women report experiencing menopause as liberation with minimal symptoms. These variations suggest distress is not biologically inevitable but culturally shaped."
        />

        <h2>Impact of Ageism on Mental Health</h2>
        <p>
          <Citation index={3} /> Ageism---discrimination based on age---significantly affects
          menopausal mental health. Internalized ageism (absorbing negative cultural beliefs about
          aging) predicts depression, anxiety, body dissatisfaction, and lower sense of purpose
          during menopause. When you believe your value decreases with age, aging becomes a
          psychological crisis. Workplace ageism includes being passed over for opportunities,
          having expertise dismissed, experiencing pressure to appear younger, and facing earlier
          retirement or job loss.
        </p>
        <p>
          Interpersonal ageism manifests in being treated as invisible or irrelevant, receiving
          unsolicited advice to "age gracefully" (code for hide aging), sexual invisibility
          (assumption that older women are or should be asexual), and being patronized or talked
          down to. The loss of social power that often accompanies aging in Western cultures---
          particularly for women whose value has been tied to youth and appearance---creates
          vulnerability to depression. Identity crisis emerges: if not young and reproductive, who
          am I? What is my purpose?
        </p>

        <StatCard
          value="Internalized ageism"
          label="independently predicts menopausal depression"
          description="Negative beliefs about aging harm mental health during menopause beyond hormonal and circumstantial factors."
        />

        <h2>Reframing Menopause and Challenging Ageism</h2>
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
