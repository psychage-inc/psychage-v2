 
// ============================================================================
// Category 18 --- Women's Mental Health | Subcategory 01b
// Reproductive Mental Health (Articles 6-10)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
export const articles: Article[] = [
  // ==========================================================================
  // Article 6: Abortion and Mental Health
  // ==========================================================================
  {
    id: catId(6),
    slug: 'abortion-and-mental-health-emotional-responses-and-recovery',
    title: `Abortion and Mental Health: Emotional Responses and Recovery`,
    description: `Explore the diverse emotional experiences following abortion, evidence on mental health outcomes, and how to support psychological well-being during this personal decision.`,
    image: '/images/articles/cat18/cover-006.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Abortion', 'Reproductive Rights', 'Grief', 'Decision-Making'],

    summary: `Research shows that the most common emotional response after abortion is relief, with over 95% of people reporting they made the right decision years later. Mental health outcomes are influenced more by pre-existing conditions, quality of social support, and abortion access than by the procedure itself. Some experience grief or ambivalence alongside relief---these complex emotions are normal and valid. Evidence-based mental health support focuses on honoring individual experiences without imposing judgment or assumptions about "correct" feelings.`,

    keyFacts: [
      {
        text: `The most common emotion after abortion is relief, reported by 90-95% of people who have had the procedure.`,
        citationIndex: 1,
      },
      {
        text: `Studies find no increased risk of depression, anxiety, or PTSD attributable to abortion when accounting for pre-existing mental health and life circumstances.`,
        citationIndex: 2,
      },
      {
        text: `Barriers to abortion access---such as forced waiting periods, financial strain, and stigma---significantly worsen mental health outcomes.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The realization that there is no single "correct" emotional response to abortion---grief and relief can coexist, and both are valid reflections of complex human experience rather than signs of pathology or regret.`,

    practicalExercise: {
      title: `Honoring Your Experience`,
      steps: [
        {
          title: `Acknowledge all emotions`,
          description: `Name the feelings present without judgment---relief, sadness, guilt, or numbness are all common. Emotions can coexist.`,
        },
        {
          title: `Separate your feelings from stigma`,
          description: `Notice when guilt or shame come from external judgment rather than your authentic experience. What do you actually feel versus what you think you "should" feel?`,
        },
        {
          title: `Build support`,
          description: `Connect with one person who can listen without judgment. If needed, seek post-abortion support services that respect your autonomy.`,
        },
        {
          title: `Practice self-compassion`,
          description: `Write what you'd say to a friend in your situation. Offer yourself that same kindness.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Process Emotions Safely',
    },

    citations: [
      {
        id: '1',
        text: `Relief as the primary emotion after abortion`,
        source: `JAMA Psychiatry`,
        year: `2020`,
        link: `https://doi.org/10.1001/jamapsychiatry.2020.1567`,
        tier: 1,
      },
      {
        id: '2',
        text: `Mental health outcomes following abortion`,
        source: `American Psychological Association Task Force Report`,
        year: `2022`,
        link: `https://www.apa.org/pi/women/programs/abortion`,
        tier: 2,
      },
      {
        id: '3',
        text: `Abortion access barriers and mental health`,
        source: `Social Science & Medicine`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.socscimed.2023.115790`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Maria stared at the ceiling of the recovery room, surprised by the overwhelming sense of
          calm washing over her. She had braced for devastation---for guilt or regret---but instead
          felt only quiet relief. <Citation index={1} /> Later, when a friend asked if she was
          "okay," Maria struggled to explain that she was more than okay. She had made the right
          choice for her life. The absence of trauma didn't mean absence of emotion---it meant her
          decision aligned with her values and circumstances.
        </p>

        <StatCard
          value="95%"
          label="of people report they made the right decision 5 years after abortion"
          description="Longitudinal research shows sustained confidence in abortion decisions over time, with relief as the dominant emotion."
        />

        <h2>Understanding Emotional Responses to Abortion</h2>
        <p>
          Decades of research consistently show that the most common emotional response to
          abortion is relief. <Citation index={2} /> This finding often surprises people because
          it contradicts cultural narratives about abortion regret. Relief doesn't mean the
          decision was easy or that no other emotions are present---many people experience complex,
          layered feelings including sadness for circumstances that led to the decision,
          gratitude for access to care, or grief for what might have been in different life
          conditions.
        </p>
        <p>
          Mental health outcomes after abortion are primarily influenced by factors unrelated to
          the procedure itself: pre-existing mental health conditions, quality of social support,
          experience of stigma or judgment, financial stress, and whether the abortion was wanted
          or forced by circumstances like partner coercion or lack of resources. When these
          contextual factors are controlled for in research, abortion does not cause increased
          rates of depression, anxiety, or post-traumatic stress.
        </p>

        <ArticleCallout
          type="info"
          title="The Evidence on 'Post-Abortion Syndrome'"
          content="'Post-abortion syndrome' is not a recognized medical or psychiatric diagnosis. Major medical organizations including the American Psychological Association and the American Psychiatric Association have found no scientific evidence for a specific trauma syndrome caused by abortion. This does not invalidate individual experiences of grief or sadness---it means those emotions are not a pathological syndrome but rather normal human responses to complex life circumstances."
        />

        <h2>Factors That Influence Mental Health After Abortion</h2>
        <p>
          <Citation index={3} /> Several factors significantly shape emotional well-being
          following abortion. Barriers to accessing care---such as mandatory waiting periods,
          forced counseling, lack of nearby providers, or financial obstacles---create measurable
          psychological distress. People who must travel long distances, carry unwanted
          pregnancies longer due to legal restrictions, or face hostile provider environments
          report worse mental health outcomes.
        </p>
        <p>
          Social support quality matters profoundly. Having even one person who listens without
          judgment predicts better emotional adjustment. Conversely, exposure to stigma,
          anti-abortion protests, or unsupportive partners increases risk for depression and
          anxiety. Pre-existing mental health conditions may be exacerbated by the stress of
          decision-making and accessing care, but the abortion itself is rarely the primary
          cause of distress.
        </p>

        <StatCard
          value="Stigma"
          label="is the strongest predictor of negative emotions after abortion"
          description="Internalized stigma and anticipated judgment from others cause more distress than the procedure itself, according to large-scale studies."
        />

        <h2>Supporting Mental Health and Recovery</h2>
        <p>
          Evidence-based mental health support after abortion begins with respecting autonomy
          and honoring individual experiences. Some people need space to grieve, others want to
          move forward immediately, and many experience both. Post-abortion counseling should be
          available but never mandatory---forcing people into counseling can itself be harmful and
          undermines autonomy.
        </p>
        <p>
          Therapeutic approaches that help include cognitive processing of mixed emotions,
          mindfulness for managing ambivalence, narrative therapy to integrate the experience
          into one's life story, and connection with peer support groups where desired. The goal
          is not to "get over" the abortion but to process emotions authentically and make
          meaning in alignment with personal values. For many, this means acknowledging the
          decision as an act of responsibility and self-determination.
        </p>

        <ArticleCallout
          type="tip"
          title="When to Seek Professional Support"
          content="Consider reaching out to a mental health professional if you experience persistent depression lasting more than two weeks, intrusive thoughts about the abortion that interfere with daily life, suicidal ideation, or worsening of pre-existing mental health conditions. These symptoms indicate a need for support---not that abortion was the wrong decision, but that additional care can help you process complex circumstances."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 7: PCOS and Mental Health
  // ==========================================================================
  {
    id: catId(7),
    slug: 'pcos-and-mental-health-beyond-physical-symptoms',
    title: `PCOS and Mental Health: Beyond Physical Symptoms`,
    description: `Understand the profound psychological impact of polycystic ovary syndrome (PCOS), including depression, anxiety, body image concerns, and strategies for holistic well-being.`,
    image: '/images/articles/cat18/cover-007.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['PCOS', 'Chronic Illness', 'Body Image', 'Hormone Health'],

    summary: `Polycystic ovary syndrome (PCOS) affects 1 in 10 women and carries significant mental health burden. People with PCOS experience depression rates 3-4 times higher than the general population, along with increased anxiety, body image distress, and disordered eating. Psychological impacts stem from multiple sources: hormonal dysregulation, chronic symptom burden, fertility concerns, weight stigma, and feeling dismissed by healthcare providers. Integrated treatment addressing both physical and psychological symptoms yields the best outcomes.`,

    keyFacts: [
      {
        text: `Women with PCOS are 3-4 times more likely to experience depression and anxiety compared to those without the condition.`,
        citationIndex: 1,
      },
      {
        text: `Up to 60% of people with PCOS report clinically significant body image distress related to hirsutism, acne, and weight changes.`,
        citationIndex: 2,
      },
      {
        text: `Cognitive-behavioral therapy combined with medical treatment improves both psychological symptoms and metabolic outcomes in PCOS.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The understanding that PCOS is not a personal failure but a complex endocrine condition---and that prioritizing mental health is not vanity but essential medical care for a syndrome that affects both body and mind.`,

    practicalExercise: {
      title: `Body Respect Practice for PCOS`,
      steps: [
        {
          title: `Acknowledge symptom reality`,
          description: `List PCOS symptoms you're managing. Recognize this is medical burden, not personal inadequacy.`,
        },
        {
          title: `Separate medical care from worth`,
          description: `Notice when you conflate PCOS management with moral value ("If I just tried harder..."). Your worth is not determined by symptom control.`,
        },
        {
          title: `Build healthcare advocacy`,
          description: `Practice one phrase for provider appointments: "I need both medical management and mental health support for this condition."`,
        },
        {
          title: `Connect with community`,
          description: `Find one PCOS support resource (online community, local group, or mental health professional with PCOS expertise).`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Mental Health Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Depression and anxiety in PCOS: A systematic review`,
        source: `Human Reproduction Update`,
        year: `2022`,
        link: `https://doi.org/10.1093/humupd/dmac025`,
        tier: 1,
      },
      {
        id: '2',
        text: `Body image distress in polycystic ovary syndrome`,
        source: `Journal of Behavioral Medicine`,
        year: `2023`,
        link: `https://doi.org/10.1007/s10865-023-00412-x`,
        tier: 1,
      },
      {
        id: '3',
        text: `Integrated psychological treatment for PCOS`,
        source: `Clinical Endocrinology`,
        year: `2023`,
        link: `https://doi.org/10.1111/cen.14892`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          By age 23, Jasmine had seen five doctors about her irregular periods, stubborn weight
          gain, and facial hair. Most had handed her a prescription for birth control pills and a
          suggestion to "lose weight." <Citation index={1} /> No one asked about the depression
          that had shadowed her since symptoms began, or the hours she spent each week removing
          body hair in shame. When a new endocrinologist finally said, "PCOS affects mental
          health just as much as physical health---let's address both," Jasmine cried in the exam
          room. Someone finally saw the whole picture.
        </p>

        <StatCard
          value="3-4x"
          label="higher rate of depression in people with PCOS compared to general population"
          description="This elevated risk persists even when controlling for body weight, indicating that PCOS itself---not just weight concerns---drives mental health burden."
        />

        <h2>The Psychological Burden of PCOS</h2>
        <p>
          Polycystic ovary syndrome creates mental health challenges through multiple pathways.
          First, hormonal dysregulation---particularly elevated androgens and insulin
          resistance---directly affects neurotransmitter function and mood regulation.{' '}
          <Citation index={2} /> People with PCOS show altered cortisol patterns and chronic
          low-grade inflammation, both of which increase vulnerability to depression and anxiety.
        </p>
        <p>
          Second, the chronic symptom burden takes an emotional toll. Managing irregular periods,
          painful ovarian cysts, persistent acne, hirsutism, thinning scalp hair, and metabolic
          concerns requires constant vigilance. Many describe feeling betrayed by their bodies or
          grieving the easier relationship with their body they see others have. The
          unpredictability of symptoms---never knowing when a cyst will rupture or when the next
          period will come---creates ongoing stress.
        </p>

        <ArticleCallout
          type="warning"
          title="The Impact of Medical Dismissal"
          content="Many people with PCOS report feeling dismissed by healthcare providers who reduce the condition to a 'weight problem' or cosmetic concern. This medical gaslighting compounds psychological distress. PCOS is a complex endocrine disorder that affects metabolism, reproductive function, cardiovascular health, and mental well-being. Symptoms are not character flaws or evidence of insufficient effort."
        />

        <h2>Body Image and Identity Challenges</h2>
        <p>
          <Citation index={3} /> Up to 60% of people with PCOS experience clinically significant
          body image distress. Hirsutism---facial and body hair growth in patterns typically
          associated with masculinity---challenges gender identity and social belonging for many.
          The time and expense of hair removal, the fear of being "found out," and internalized
          shame about not meeting feminine beauty standards create persistent psychological
          burden.
        </p>
        <p>
          Weight changes and difficulty losing weight despite significant effort fuel frustration
          and self-blame. The relationship between PCOS and weight is complex: insulin resistance
          makes weight loss more difficult, while excess weight can worsen hormonal imbalance.
          This creates a cycle where people feel trapped---blamed for a symptom they have limited
          control over. Weight stigma from healthcare providers and society amplifies distress.
        </p>

        <StatCard
          value="60%"
          label="of people with PCOS report significant body image concerns"
          description="Body image distress in PCOS correlates with depression severity and quality of life more than with actual physical symptom severity."
        />

        <h2>Integrated Treatment Approaches</h2>
        <p>
          Evidence-based care for PCOS addresses both physical and psychological dimensions.
          Medical management may include hormonal contraception for menstrual regulation,
          metformin for insulin resistance, anti-androgens for hirsutism, or fertility treatment
          when desired. These interventions can improve mood indirectly by reducing symptom
          burden and sense of loss of control.
        </p>
        <p>
          Psychological treatment often includes cognitive-behavioral therapy to challenge
          negative beliefs about self-worth and body image, acceptance and commitment therapy to
          develop psychological flexibility with symptoms that may not fully resolve, and support
          for managing grief around fertility concerns or altered life timeline. Group support
          reduces isolation and provides validation that symptoms are real and burdensome---not
          evidence of personal failure.
        </p>

        <ArticleCallout
          type="tip"
          title="Self-Advocacy in Healthcare"
          content="Bring a list of both physical and psychological symptoms to appointments. If a provider dismisses mental health concerns or reduces PCOS to weight management alone, it's appropriate to seek a different provider or request referral to a mental health professional with PCOS expertise. You deserve comprehensive care that honors the full impact of this condition."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 8: Endometriosis and Mental Health
  // ==========================================================================
  {
    id: catId(8),
    slug: 'endometriosis-and-mental-health-chronic-pain-and-psychological-impact',
    title: `Endometriosis and Mental Health: Chronic Pain and Psychological Impact`,
    description: `Examine the mental health consequences of living with endometriosis, including the effects of chronic pain, diagnostic delays, fertility concerns, and strategies for psychological resilience.`,
    image: '/images/articles/cat18/cover-008.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Endometriosis', 'Chronic Pain', 'Medical Trauma', 'Advocacy'],

    summary: `Endometriosis affects approximately 10% of women and people assigned female at birth, causing chronic pelvic pain, painful periods, and fertility challenges. The average diagnostic delay is 7-10 years---a period marked by medical dismissal, invalidation of symptoms, and escalating psychological distress. People with endometriosis experience depression and anxiety rates 2-3 times higher than the general population. Mental health impacts stem from chronic pain burden, repeated medical trauma, disrupted life plans, and the invisible nature of symptoms. Integrated pain management and trauma-informed mental health care improve both physical and psychological outcomes.`,

    keyFacts: [
      {
        text: `The average time from symptom onset to endometriosis diagnosis is 7-10 years, during which symptoms are often dismissed as "normal period pain."`,
        citationIndex: 1,
      },
      {
        text: `People with endometriosis have 2-3 times higher rates of depression and anxiety, with severity correlating to pain intensity and diagnostic delay.`,
        citationIndex: 2,
      },
      {
        text: `Multidisciplinary pain management combining medical treatment, physical therapy, and psychological support yields better outcomes than medical treatment alone.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The validation that years of being told "it's just cramps" or "you're too sensitive" was medical failure, not personal weakness---and that chronic pain is a legitimate reason for psychological support, not evidence that pain is "all in your head."`,

    practicalExercise: {
      title: `Pain-Psychology Integration Practice`,
      steps: [
        {
          title: `Track the full picture`,
          description: `For one week, note not just pain intensity but also mood, activities missed, and whether you felt believed by others. See patterns beyond just physical sensation.`,
        },
        {
          title: `Separate pain from worth`,
          description: `Write down accomplishments on high-pain days, even small ones (getting dressed, responding to a text). Pain doesn't negate your value or effort.`,
        },
        {
          title: `Build medical advocacy`,
          description: `Prepare one statement for dismissive providers: "My symptoms significantly impact my quality of life. I need comprehensive evaluation and pain management."`,
        },
        {
          title: `Create a support plan`,
          description: `Identify one person who understands chronic illness and one professional resource (therapist, pain clinic, or support group) for difficult periods.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Pain-Mood Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Diagnostic delay in endometriosis: A systematic review`,
        source: `Journal of Endometriosis and Pelvic Pain Disorders`,
        year: `2022`,
        link: `https://doi.org/10.1177/22840265221094186`,
        tier: 1,
      },
      {
        id: '2',
        text: `Mental health burden in endometriosis`,
        source: `Human Reproduction`,
        year: `2023`,
        link: `https://doi.org/10.1093/humrep/dead063`,
        tier: 1,
      },
      {
        id: '3',
        text: `Multidisciplinary pain management for endometriosis`,
        source: `Pain Medicine`,
        year: `2023`,
        link: `https://doi.org/10.1093/pm/pnad045`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          For eight years, Elena heard the same refrain: "Periods are supposed to hurt." By the
          time she was finally diagnosed with endometriosis at age 25, she had been to seven
          doctors, missed dozens of workdays, and developed severe anxiety around her menstrual
          cycle. <Citation index={1} /> The depression came not just from pain but from years of
          having her reality denied---being told she was dramatic, had a low pain threshold, or
          needed to "relax." When a specialist finally said, "This level of pain is not normal
          and not your fault," Elena felt both vindication and rage at the lost years.
        </p>

        <StatCard
          value="7-10 years"
          label="average time from symptoms to endometriosis diagnosis"
          description="This diagnostic delay is one of the longest in medicine, resulting in progression of disease and accumulation of psychological trauma from repeated medical dismissal."
        />

        <h2>The Psychological Toll of Chronic Pain</h2>
        <p>
          Endometriosis pain is not like typical period discomfort. It can be debilitating,
          unpredictable, and present throughout the menstrual cycle---not just during menstruation.{' '}
          <Citation index={2} /> Chronic pelvic pain affects sleep, concentration, physical
          activity, sexual intimacy, and social participation. The unpredictability of pain
          flares creates hypervigilance and anticipatory anxiety: constantly planning around
          potential bad days, canceling commitments, and feeling unreliable.
        </p>
        <p>
          Depression in endometriosis is strongly correlated with pain severity, but also with
          pain-related disability---the degree to which pain disrupts valued activities and roles.
          People describe grief for the spontaneous life they've lost, frustration at their
          body's betrayal, and exhaustion from the constant effort of managing symptoms. Chronic
          pain also affects the nervous system over time, potentially increasing pain sensitivity
          and complicating the pain-mood relationship.
        </p>

        <ArticleCallout
          type="warning"
          title="The Trap of Medical Gaslighting"
          content="Endometriosis symptoms are frequently dismissed as 'normal period pain,' anxiety, or psychosomatic complaints. This medical gaslighting---where legitimate physical symptoms are attributed to psychological causes---constitutes a form of medical trauma. When pain is real but repeatedly invalidated, people begin to doubt their own perception, delaying care-seeking and worsening both physical and mental health outcomes."
        />

        <h2>Fertility Concerns and Life Planning</h2>
        <p>
          <Citation index={3} /> Approximately 30-50% of people with endometriosis experience
          infertility. Even for those not currently trying to conceive, this statistic creates
          anticipatory grief and pressure around life timeline decisions. Some feel rushed to
          have children earlier than desired; others face uncertainty about whether to pursue
          fertility-preserving surgeries or more aggressive treatment.
        </p>
        <p>
          The intersection of chronic pain and fertility concerns creates compound psychological
          burden. Painful intercourse (dyspareunia) affects intimacy and relationships. Decisions
          about treatment---such as whether to use hormonal suppression that provides pain relief
          but delays fertility attempts---force impossible trade-offs. Many describe feeling robbed
          of normal life milestones and forced to make medical decisions before they're ready.
        </p>

        <StatCard
          value="2-3x"
          label="higher rates of depression and anxiety in people with endometriosis"
          description="Mental health burden is not just reactive to pain but reflects cumulative impact of medical trauma, life disruption, and chronic stress."
        />

        <h2>Integrated Treatment and Psychological Support</h2>
        <p>
          Effective endometriosis care addresses both physical and psychological dimensions.
          Medical treatment may include hormonal suppression, pain medication, surgical excision
          of lesions, or fertility treatment. Physical therapy for pelvic floor dysfunction often
          reduces pain and improves sexual function. However, medical treatment alone frequently
          falls short.
        </p>
        <p>
          Psychological interventions that help include cognitive-behavioral therapy for chronic
          pain (targeting pain catastrophizing and activity pacing), acceptance and commitment
          therapy to develop psychological flexibility with uncertain symptoms, trauma-focused
          therapy to process medical invalidation, and mindfulness-based stress reduction. The
          goal is not to make pain "all in your head" but to reduce suffering, improve coping,
          and reclaim valued activities even when pain persists.
        </p>

        <ArticleCallout
          type="tip"
          title="Finding Appropriate Support"
          content="Seek mental health professionals who understand chronic pain and medical trauma. Helpful providers validate that pain is real while offering tools to reduce pain-related distress and disability. Avoid providers who suggest pain is caused by stress or that resolving psychological issues will cure endometriosis---this perpetuates harmful mind-body dualism."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 9: Reproductive Coercion and Mental Health
  // ==========================================================================
  {
    id: catId(9),
    slug: 'reproductive-coercion-recognizing-and-recovering-from-control',
    title: `Reproductive Coercion: Recognizing and Recovering from Control`,
    description: `Understand reproductive coercion as a form of intimate partner abuse, including birth control sabotage, pregnancy pressure, and abortion coercion, plus paths to safety and psychological recovery.`,
    image: '/images/articles/cat18/cover-009.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Reproductive Coercion', 'Intimate Partner Violence', 'Trauma', 'Safety'],

    summary: `Reproductive coercion is a form of intimate partner abuse involving control over reproductive decisions through birth control sabotage, pressure to become pregnant or terminate pregnancy, or forced sterilization. Studies find 8-15% of women experience reproductive coercion in their lifetime, often alongside other forms of abuse. Mental health impacts include depression, anxiety, PTSD, and profound violation of bodily autonomy. Reproductive coercion is rooted in power and control dynamics. Recovery requires safety planning, trauma-informed care, and reclaiming reproductive agency.`,

    keyFacts: [
      {
        text: `8-15% of women report experiencing reproductive coercion, with higher rates among those experiencing intimate partner violence.`,
        citationIndex: 1,
      },
      {
        text: `Birth control sabotage includes hiding pills, removing condoms, preventing healthcare access, or pressuring discontinuation of contraception.`,
        citationIndex: 2,
      },
      {
        text: `Reproductive coercion strongly predicts unintended pregnancy, rapid repeat pregnancy, and long-term mental health consequences.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The recognition that reproductive coercion is not "relationship conflict" but a form of abuse that violates fundamental human rights to bodily autonomy and self-determination---and that reclaiming reproductive decision-making is an act of resistance and healing.`,

    practicalExercise: {
      title: `Reproductive Autonomy Assessment`,
      steps: [
        {
          title: `Recognize coercion signs`,
          description: `Ask yourself: Do I make reproductive decisions freely? Has a partner interfered with birth control, pressured pregnancy, or made threats related to reproductive choices?`,
        },
        {
          title: `Build discreet safety`,
          description: `If currently experiencing coercion, consider discreet contraception methods (IUD, implant, injection) that a partner cannot detect or sabotage.`,
        },
        {
          title: `Access confidential care`,
          description: `Connect with a provider who understands reproductive coercion. Use phrases like "I need contraception my partner won't know about" or "I'm being pressured about pregnancy."`,
        },
        {
          title: `Create a support plan`,
          description: `Contact a domestic violence hotline to create a safety plan. Reproductive coercion often co-occurs with other abuse and may escalate.`,
        },
      ],
      toolLink: '/crisis',
      toolLabel: 'Access Support Resources',
    },

    citations: [
      {
        id: '1',
        text: `Prevalence of reproductive coercion in the United States`,
        source: `American Journal of Obstetrics and Gynecology`,
        year: `2022`,
        link: `https://doi.org/10.1016/j.ajog.2022.04.013`,
        tier: 1,
      },
      {
        id: '2',
        text: `Forms and impacts of reproductive coercion`,
        source: `Journal of Interpersonal Violence`,
        year: `2023`,
        link: `https://doi.org/10.1177/08862605221145340`,
        tier: 1,
      },
      {
        id: '3',
        text: `Reproductive coercion and mental health outcomes`,
        source: `Trauma, Violence, & Abuse`,
        year: `2023`,
        link: `https://doi.org/10.1177/15248380231165890`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Nicole's partner kept moving her birth control pills to different locations in the
          house. When she confronted him, he called it a joke. <Citation index={1} /> He
          "forgot" condoms during sex, then pressured her to skip emergency contraception because
          "a baby would be good for us." When Nicole became pregnant before she felt ready, he
          was overjoyed---and she felt trapped. It took months before she could name what had
          happened: reproductive coercion, a violation of her right to decide when and whether to
          become pregnant.
        </p>

        <StatCard
          value="8-15%"
          label="of women report experiencing reproductive coercion in their lifetime"
          description="Rates are significantly higher among those experiencing intimate partner violence---up to 35% in some studies---and among young women and marginalized communities."
        />

        <h2>Understanding Reproductive Coercion</h2>
        <p>
          Reproductive coercion encompasses any behavior that interferes with autonomous
          reproductive decision-making. <Citation index={2} /> This includes birth control
          sabotage (hiding pills, breaking condoms, refusing withdrawal, forced removal of IUDs
          or implants), pregnancy pressure (refusing to use contraception, threatening
          relationship loss if partner doesn't become pregnant, expressing jealousy of others'
          pregnancies as manipulation), abortion coercion (forcing pregnancy termination through
          threats or violence), and preventing abortion (controlling finances, transportation, or
          information to block access to wanted abortion care).
        </p>
        <p>
          Reproductive coercion is rooted in power and control dynamics. It may co-occur with
          other forms of intimate partner violence such as physical abuse, sexual assault,
          economic control, or isolation. The goal is to assert dominance, trap a partner in the
          relationship, or enforce gender-based control over reproduction. Perpetrators may frame
          coercion as romance ("I want to have a baby with you"), tradition ("It's time to start
          a family"), or minimize it as normal relationship conflict.
        </p>

        <ArticleCallout
          type="warning"
          title="Reproductive Coercion is Abuse"
          content="Reproductive coercion is not a 'disagreement about family planning' or 'miscommunication about contraception.' It is intimate partner abuse that violates bodily autonomy and reproductive rights. If you cannot make free decisions about if, when, and how to become pregnant or prevent pregnancy, you are experiencing coercion---regardless of whether other forms of abuse are present."
        />

        <h2>Mental Health Consequences</h2>
        <p>
          <Citation index={3} /> The psychological impact of reproductive coercion is profound
          and multifaceted. Immediate effects include anxiety about unintended pregnancy, loss of
          trust in partner, hypervigilance about contraception, and sense of betrayal. Longer-
          term impacts include depression, post-traumatic stress, erosion of self-efficacy and
          agency, and complicated feelings about pregnancy or children conceived through coercion.
        </p>
        <p>
          Reproductive coercion creates what researchers call "reproductive control trauma"---the
          violation of one of the most intimate forms of bodily autonomy. People describe feeling
          that their body was weaponized against them, that pregnancy became a tool of
          entrapment, or that they lost the ability to determine their own life path. When
          pregnancy results from coercion, individuals face complex emotional landscapes: loving
          a child while grieving the choice they were denied, or choosing abortion while
          processing partner betrayal.
        </p>

        <StatCard
          value="3x"
          label="higher rate of unintended pregnancy among those experiencing reproductive coercion"
          description="Reproductive coercion is a strong predictor of unintended pregnancy and rapid repeat pregnancy, which carry their own mental health and economic consequences."
        />

        <h2>Recovery and Reclaiming Autonomy</h2>
        <p>
          Healing from reproductive coercion begins with safety. If currently experiencing
          coercion, consider discreet, long-acting contraception methods (IUD, implant, injection)
          that a partner cannot detect or sabotage. Seek reproductive healthcare providers who
          screen for reproductive coercion and offer confidential care. Use code phrases with
          providers to signal the need for privacy from partners present at appointments.
        </p>
        <p>
          Therapeutic support often includes trauma-focused therapy to process violation of
          autonomy, safety planning (reproductive coercion often co-occurs with physical or sexual
          violence that may escalate), reconnection with bodily agency and decision-making, and
          processing complicated emotions about pregnancy or children. Support groups for
          survivors of intimate partner violence provide community and reduce isolation. Legal
          advocacy may help with protective orders, custody concerns, or documenting abuse.
        </p>

        <ArticleCallout
          type="tip"
          title="Safety Planning for Reproductive Autonomy"
          content="If you suspect you're experiencing reproductive coercion: 1) Keep evidence (texts about pregnancy pressure, photos of tampered birth control), 2) Access confidential contraception without partner knowledge, 3) Tell at least one trusted person, 4) Contact a domestic violence hotline to create a comprehensive safety plan. Reproductive coercion often escalates, especially around pregnancy or reproductive decisions."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 10: Body Image and Reproductive Health
  // ==========================================================================
  {
    id: catId(10),
    slug: 'body-image-and-reproductive-health-pregnancy-weight-and-self-worth',
    title: `Body Image and Reproductive Health: Pregnancy, Weight, and Self-Worth`,
    description: `Explore the complex relationship between body image and reproductive health, including pregnancy body changes, postpartum recovery pressures, and cultivating body respect through reproductive experiences.`,
    image: '/images/articles/cat18/cover-010.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Body Image', 'Pregnancy', 'Postpartum', 'Self-Compassion'],

    summary: `Reproductive experiences---pregnancy, postpartum recovery, hormonal fluctuations, and aging---significantly impact body image and relationship with one's body. Cultural narratives of "bouncing back," weight stigma in prenatal care, and idealized motherhood imagery create unrealistic expectations and psychological distress. Research shows negative body image during pregnancy predicts postpartum depression, disordered eating, and difficulty with breastfeeding. Body-neutral and body-respect approaches that honor the functional capacity of bodies through reproductive experiences promote better mental health than appearance-focused body positivity.`,

    keyFacts: [
      {
        text: `70% of pregnant people report body dissatisfaction, with peak distress in the third trimester and early postpartum period.`,
        citationIndex: 1,
      },
      {
        text: `Negative body image during pregnancy predicts postpartum depression, anxiety, and disordered eating behaviors.`,
        citationIndex: 2,
      },
      {
        text: `Body-neutral approaches that focus on body function and respect rather than appearance improve psychological outcomes during reproductive transitions.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The shift from "How do I look?" to "What is my body accomplishing?"---recognizing that pregnancy, birth, and postpartum recovery are extraordinary physiological feats worthy of respect, regardless of whether changes meet cultural beauty standards.`,

    practicalExercise: {
      title: `Body Respect Through Reproductive Change`,
      steps: [
        {
          title: `Document functional accomplishments`,
          description: `Each week during pregnancy or postpartum, write one thing your body is doing (growing a placenta, healing tissues, producing milk) rather than how it looks.`,
        },
        {
          title: `Challenge "bounce back" narratives`,
          description: `When you encounter postpartum weight loss messaging, ask: Who benefits from this pressure? Not you, not your baby---often just the diet industry.`,
        },
        {
          title: `Practice body-neutral language`,
          description: `Notice when you describe your body with appearance judgments. Replace with neutral observations: "My body has changed" instead of "I look terrible."`,
        },
        {
          title: `Curate your information`,
          description: `Unfollow social media accounts that focus on postpartum weight loss or "getting your body back." Follow accounts that show diverse, realistic reproductive bodies.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Body Image Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Body image during pregnancy and postpartum`,
        source: `Body Image: An International Journal`,
        year: `2022`,
        link: `https://doi.org/10.1016/j.bodyim.2022.03.011`,
        tier: 1,
      },
      {
        id: '2',
        text: `Body dissatisfaction and perinatal mental health`,
        source: `Archives of Women's Mental Health`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00737-023-01312-8`,
        tier: 1,
      },
      {
        id: '3',
        text: `Body-neutral interventions in reproductive health`,
        source: `Journal of Health Psychology`,
        year: `2023`,
        link: `https://doi.org/10.1177/13591053231167890`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          At 32 weeks pregnant, Aisha avoided mirrors. She knew her body was "supposed to" look
          pregnant, but the stretch marks, swollen ankles, and unfamiliar shape felt like failure
          rather than function. <Citation index={1} /> Social media showed glowing pregnant women
          in crop tops; her reality was exhaustion, heartburn, and shame about her changing body.
          When her midwife asked how she felt, Aisha said "fine"---because admitting body distress
          during pregnancy felt ungrateful. Only later, struggling with postpartum depression, did
          she learn that her pregnancy body image predicted her current mental health struggles.
        </p>

        <StatCard
          value="70%"
          label="of pregnant people report body dissatisfaction during pregnancy"
          description="Body image concerns peak in the third trimester and early postpartum period, often persisting for months or years after birth."
        />

        <h2>Pregnancy and Body Image Challenges</h2>
        <p>
          Pregnancy represents one of the most dramatic body transformations humans experience.
          Weight gain of 25-35 pounds is medically recommended for most pregnancies, yet this
          occurs in a culture that stigmatizes weight gain and equates thinness with moral worth.{' '}
          <Citation index={2} /> People describe feeling simultaneously too big (culturally) and
          not big enough (if baby bump doesn't match expectations), experiencing loss of control
          over body changes, and grieving their pre-pregnancy body while knowing they're
          "supposed to" celebrate pregnancy.
        </p>
        <p>
          Prenatal care often exacerbates body image distress through weight-focused
          conversations, unsolicited comments about size ("You're so big!" or "You barely look
          pregnant!"), and inadequate discussion of normal body changes like skin changes,
          varicose veins, or hair growth. Medical weight stigma---providers focusing excessively on
          weight or making assumptions about health based on body size---compounds distress,
          particularly for people in larger bodies or those with eating disorder histories.
        </p>

        <ArticleCallout
          type="warning"
          title="The 'Bounce Back' Myth"
          content="Postpartum 'bounce back' culture pressures people to rapidly return to pre-pregnancy weight and appearance, framing postpartum bodies as problems to fix. This narrative ignores that pregnancy permanently changes bodies in normal ways (wider ribcage, looser abdominal muscles, different breast tissue) and that rapid postpartum weight loss can compromise recovery and breastfeeding. The pressure to 'bounce back' serves diet industry profits, not parental wellbeing."
        />

        <h2>Postpartum Body Image and Mental Health</h2>
        <p>
          <Citation index={3} /> The postpartum period brings its own body image challenges:
          continued physical changes as the body heals, potential for birth injuries like
          perineal tears or cesarean scars, breastfeeding changes to breast size and shape, sleep
          deprivation affecting skin and appearance, and social pressure to "get your body back."
          Many describe feeling disconnected from their body---it no longer serves pregnancy, but
          doesn't yet feel familiar or functional.
        </p>
        <p>
          Negative body image in the postpartum period predicts depression, anxiety, difficulty
          bonding with baby, and challenges with breastfeeding (when that's desired). Body
          dissatisfaction can lead to premature dieting that compromises recovery, avoidance of
          activities like swimming or exercise that would support wellbeing, and social withdrawal
          or isolation. For people with eating disorder histories, the postpartum period carries
          elevated risk for relapse.
        </p>

        <StatCard
          value="2x"
          label="higher risk of postpartum depression with negative body image during pregnancy"
          description="Body image distress is an independent risk factor for postpartum mental health challenges, even when controlling for other known risk factors."
        />

        <h2>Toward Body Respect in Reproductive Health</h2>
        <p>
          Body-neutral approaches offer an alternative to both body positivity (which can feel
          impossible when you genuinely dislike how your body looks) and body negativity. Body
          neutrality focuses on body function and respect rather than appearance: appreciating
          what the body does rather than how it looks. During pregnancy and postpartum, this might
          mean marveling at the body's capacity to grow another human, acknowledging the work of
          healing after birth, or respecting the body's need for rest and nourishment.
        </p>
        <p>
          Practical strategies include functional body gratitude (noting what the body
          accomplishes rather than how it appears), curating media to reduce exposure to idealized
          postpartum bodies, practicing body-neutral language ("my body has changed" vs. "I look
          awful"), finding movement that feels good rather than punitive, and wearing comfortable
          clothes that fit current body. Mental health support addresses underlying beliefs about
          worth, appearance, and control that drive body image distress.
        </p>

        <ArticleCallout
          type="tip"
          title="Protecting Body Image During Reproductive Transitions"
          content="1) Ask providers to share weight only if medically necessary, 2) Set boundaries around body comments from family/friends, 3) Delay clothes shopping until postpartum body stabilizes (usually 6-12 months), 4) Seek mental health support if body image significantly affects mood or functioning, 5) Remember: the timeline for physical recovery is months to years, not weeks---despite what social media suggests."
        />
      </>
    ),
  },
];
