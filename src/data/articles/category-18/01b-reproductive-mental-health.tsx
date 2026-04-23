 
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
    status: 'published',
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
      {
        text: `Five years after abortion, 95% of people report their decision was the right one, with sustained emotional well-being over time.`,
        citationIndex: 4,
      },
      {
        text: `People denied wanted abortions experience worse mental health, economic stability, and physical health compared to those who received abortion care.`,
        citationIndex: 5,
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
      {
        id: '4',
        text: `Five-year mental health trajectories after abortion`,
        source: `JAMA Psychiatry`,
        year: `2020`,
        link: `https://doi.org/10.1001/jamapsychiatry.2020.0724`,
        tier: 1,
      },
      {
        id: '5',
        text: `The Turnaway Study: Effects of being denied abortion`,
        source: `Advances in Social Work`,
        year: `2021`,
        link: `https://doi.org/10.18060/24234`,
        tier: 1,
      },
      {
        id: '6',
        text: `Stigma and mental health after abortion`,
        source: `Perspectives on Sexual and Reproductive Health`,
        year: `2022`,
        link: `https://doi.org/10.1363/psrh.12181`,
        tier: 1,
      },
      {
        id: '7',
        text: `Abortion and mental health: Scientific evidence`,
        source: `National Academies of Sciences, Engineering, and Medicine`,
        year: `2023`,
        link: `https://www.nationalacademies.org/our-work/the-safety-and-quality-of-abortion-care-in-the-united-states`,
        tier: 2,
      },
      {
        id: '8',
        text: `Post-abortion emotional responses and decision satisfaction`,
        source: `Contraception`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.contraception.2023.109892`,
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

        <ArticleCallout variant="info" title="The Evidence on 'Post-Abortion Syndrome'">
          <p>
            'Post-abortion syndrome' is not a recognized medical or psychiatric diagnosis. Major
            medical organizations including the American Psychological Association and the American
            Psychiatric Association have found no scientific evidence for a specific trauma
            syndrome caused by abortion. This does not invalidate individual experiences of grief
            or sadness---it means those emotions are not a pathological syndrome but rather normal
            human responses to complex life circumstances.
          </p>
        </ArticleCallout>

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

        <h2 id="supporting-mental-health" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Supporting Mental Health and Recovery
        </h2>
        <p className="mb-6">
          Evidence-based mental health support after abortion begins with respecting autonomy
          and honoring individual experiences. <Citation index={6} /> Some people need space to
          grieve, others want to move forward immediately, and many experience both. Post-abortion
          counseling should be available but never mandatory---forcing people into counseling can
          itself be harmful and undermines autonomy.
        </p>
        <p className="mb-6">
          Therapeutic approaches that help include cognitive processing of mixed emotions,
          mindfulness for managing ambivalence, narrative therapy to integrate the experience
          into one's life story, and connection with peer support groups where desired. The goal
          is not to "get over" the abortion but to process emotions authentically and make
          meaning in alignment with personal values. For many, this means acknowledging the
          decision as an act of responsibility and self-determination.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Role of Social Support
        </h3>
        <p className="mb-6">
          Social support quality significantly shapes emotional adjustment after abortion. Having
          even one trusted person who listens without judgment---whether a friend, family member,
          partner, or counselor---predicts better mental health outcomes. <Citation index={7} />
          Supportive relationships provide validation that the decision was legitimate, space to
          process complex emotions, and practical assistance during recovery.
        </p>
        <p className="mb-6">
          Conversely, exposure to stigma profoundly harms mental health. People who face
          anti-abortion protests at clinics, receive judgment from family or community members, or
          internalize cultural messages of shame report higher rates of depression and anxiety.
          Importantly, this distress stems from stigma---not the abortion itself. Reducing stigma
          through policy changes, healthcare provider training, and cultural shifts would prevent
          much of the mental health burden currently associated with abortion.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Addressing Pre-Existing Mental Health Conditions
        </h3>
        <p className="mb-6">
          People with pre-existing depression, anxiety, or trauma histories may experience
          exacerbation of symptoms during the abortion decision-making and recovery period---but
          this reflects the stress of difficult circumstances, not the abortion procedure causing
          new mental illness. <Citation index={8} /> Those with mental health conditions deserve
          comprehensive support that addresses both the current situation and ongoing treatment
          needs.
        </p>
        <p className="mb-6">
          Mental health conditions are not contraindications to abortion. In fact, pregnancy and
          parenting with inadequate resources or readiness can significantly worsen mental health
          for those with existing conditions. Providers should offer mental health screening and
          referrals as part of standard abortion care, recognizing that psychological support is
          healthcare---not evidence that abortion harms mental health.
        </p>

        <ArticleCallout variant="tip" title="When to Seek Professional Support">
          <p>
            Consider reaching out to a mental health professional if you experience persistent
            depression lasting more than two weeks, intrusive thoughts about the abortion that
            interfere with daily life, suicidal ideation, or worsening of pre-existing mental
            health conditions. These symptoms indicate a need for support---not that abortion was
            the wrong decision, but that additional care can help you process complex circumstances.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 7: PCOS and Mental Health
  // ==========================================================================
  {
    id: catId(7),
    slug: 'pcos-and-mental-health-beyond-physical-symptoms',
    status: 'published',
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
      {
        text: `The average diagnostic delay for PCOS is 2-3 years, during which mental health often deteriorates due to unexplained symptoms and medical dismissal.`,
        citationIndex: 4,
      },
      {
        text: `People with PCOS have higher rates of eating disorders, with restrictive eating and binge eating both occurring at elevated frequencies.`,
        citationIndex: 5,
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
      {
        id: '4',
        text: `Diagnostic delays in polycystic ovary syndrome`,
        source: `Fertility and Sterility`,
        year: `2022`,
        link: `https://doi.org/10.1016/j.fertnstert.2022.08.850`,
        tier: 1,
      },
      {
        id: '5',
        text: `Eating disorders and disordered eating in PCOS`,
        source: `Journal of Clinical Endocrinology and Metabolism`,
        year: `2023`,
        link: `https://doi.org/10.1210/clinem/dgad234`,
        tier: 1,
      },
      {
        id: '6',
        text: `Hormonal mechanisms of mood disorders in PCOS`,
        source: `Psychoneuroendocrinology`,
        year: `2022`,
        link: `https://doi.org/10.1016/j.psyneuen.2022.105892`,
        tier: 1,
      },
      {
        id: '7',
        text: `Medical management of PCOS: Clinical guidelines`,
        source: `Endocrine Society`,
        year: `2023`,
        link: `https://www.endocrine.org/clinical-practice-guidelines/polycystic-ovary-syndrome`,
        tier: 2,
      },
      {
        id: '8',
        text: `Quality of life and psychological wellbeing in PCOS`,
        source: `Human Reproduction`,
        year: `2022`,
        link: `https://doi.org/10.1093/humrep/deac187`,
        tier: 1,
      },
      {
        id: '9',
        text: `Weight stigma in reproductive endocrinology`,
        source: `Fertility and Sterility`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.fertnstert.2023.03.028`,
        tier: 1,
      },
      {
        id: '10',
        text: `PCOS and mental health: Patient experiences`,
        source: `Journal of Psychosomatic Obstetrics & Gynecology`,
        year: `2023`,
        link: `https://doi.org/10.1080/0167482X.2023.2187654`,
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

        <ArticleCallout variant="warning" title="The Impact of Medical Dismissal">
          <p>
            Many people with PCOS report feeling dismissed by healthcare providers who reduce the
            condition to a 'weight problem' or cosmetic concern. This medical gaslighting compounds
            psychological distress. PCOS is a complex endocrine disorder that affects metabolism,
            reproductive function, cardiovascular health, and mental well-being. Symptoms are not
            character flaws or evidence of insufficient effort.
          </p>
        </ArticleCallout>

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

        <h2 id="fertility-concerns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Fertility Concerns and Life Planning
        </h2>
        <p className="mb-6">
          <Citation index={4} /> PCOS is one of the leading causes of infertility, affecting
          reproductive planning and creating psychological distress even for those not currently
          trying to conceive. The diagnosis often comes with information about potential fertility
          challenges, creating anticipatory anxiety about future family planning. Many describe
          feeling rushed to make major life decisions earlier than desired or grieving the
          uncertainty around whether they'll be able to have biological children.
        </p>
        <p className="mb-6">
          Fertility concerns intersect with other PCOS symptoms in complex ways. The same hormonal
          imbalances that cause irregular periods and metabolic issues also affect ovulation.
          Treatment decisions become fraught---should you prioritize symptom management now or
          preserve fertility options for later? The pressure to "time" treatment around potential
          pregnancy attempts adds another layer of stress to an already demanding condition.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Eating Disorders and Disordered Eating
        </h3>
        <p className="mb-6">
          <Citation index={5} /> People with PCOS experience eating disorders at rates 2-3 times
          higher than the general population. Both restrictive eating and binge eating occur with
          elevated frequency. The relationship between PCOS, weight, and eating pathology is
          bidirectional and complex: insulin resistance and hormonal factors make weight management
          difficult, leading to restrictive dieting that often triggers binge eating, which in turn
          worsens metabolic symptoms.
        </p>
        <p className="mb-6">
          Medical advice to "lose weight" without acknowledgment of metabolic barriers or eating
          disorder risk contributes to this cycle. <Citation index={9} /> Many develop disordered
          eating patterns while attempting to follow medical recommendations, only to face blame
          when those efforts don't produce expected results. Comprehensive care must screen for
          eating disorders and refer to specialists who understand both PCOS physiology and eating
          pathology.
        </p>

        <h2 id="integrated-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Integrated Treatment Approaches
        </h2>
        <p className="mb-6">
          <Citation index={8} /> Evidence-based care for PCOS addresses both physical and
          psychological dimensions. Medical management may include hormonal contraception for
          menstrual regulation, metformin for insulin resistance, anti-androgens for hirsutism, or
          fertility treatment when desired. These interventions can improve mood indirectly by
          reducing symptom burden and sense of loss of control.
        </p>
        <p className="mb-6">
          Psychological treatment often includes cognitive-behavioral therapy to challenge negative
          beliefs about self-worth and body image, acceptance and commitment therapy to develop
          psychological flexibility with symptoms that may not fully resolve, and support for
          managing grief around fertility concerns or altered life timeline. <Citation index={10} />
          Group support reduces isolation and provides validation that symptoms are real and
          burdensome---not evidence of personal failure.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Finding Comprehensive Care
        </h3>
        <p className="mb-6">
          Comprehensive PCOS care involves a team approach: endocrinologist or reproductive
          endocrinologist for medical management, mental health professional familiar with chronic
          illness and body image issues, registered dietitian who understands insulin resistance
          and avoids weight stigma, and potentially pelvic floor physical therapist for pain
          management. Not everyone needs all these providers simultaneously, but knowing they're
          available options empowers better self-advocacy.
        </p>
        <p className="mb-6">
          The goal of integrated treatment isn't to "cure" PCOS---it's a lifelong condition---but
          to optimize quality of life, reduce symptom burden, protect mental health, and support
          informed decision-making about reproduction and long-term health. Success looks different
          for each person based on their priorities, values, and life circumstances.
        </p>

        <ArticleCallout variant="tip" title="Self-Advocacy in Healthcare">
          <p>
            Bring a list of both physical and psychological symptoms to appointments. If a provider
            dismisses mental health concerns or reduces PCOS to weight management alone, it's
            appropriate to seek a different provider or request referral to a mental health
            professional with PCOS expertise. You deserve comprehensive care that honors the full
            impact of this condition.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 8: Endometriosis and Mental Health
  // ==========================================================================
  {
    id: catId(8),
    slug: 'endometriosis-and-mental-health-chronic-pain-and-psychological-impact',
    status: 'published',
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
      {
        text: `30-50% of people with endometriosis experience infertility, creating psychological distress around fertility planning and life timeline decisions.`,
        citationIndex: 4,
      },
      {
        text: `Medical gaslighting and repeated invalidation of pain constitute a form of medical trauma that compounds the psychological burden of endometriosis.`,
        citationIndex: 5,
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
      {
        id: '4',
        text: `Endometriosis and infertility: Clinical outcomes`,
        source: `Fertility and Sterility`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.fertnstert.2023.01.012`,
        tier: 1,
      },
      {
        id: '5',
        text: `Medical trauma and gaslighting in chronic pain conditions`,
        source: `Journal of General Internal Medicine`,
        year: `2022`,
        link: `https://doi.org/10.1007/s11606-022-07234-x`,
        tier: 1,
      },
      {
        id: '6',
        text: `Chronic pelvic pain and quality of life in endometriosis`,
        source: `American Journal of Obstetrics and Gynecology`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.ajog.2023.02.015`,
        tier: 1,
      },
      {
        id: '7',
        text: `Psychological interventions for endometriosis pain`,
        source: `Cochrane Database of Systematic Reviews`,
        year: `2022`,
        link: `https://doi.org/10.1002/14651858.CD013429.pub2`,
        tier: 1,
      },
      {
        id: '8',
        text: `Clinical guidelines for endometriosis management`,
        source: `American College of Obstetricians and Gynecologists`,
        year: `2023`,
        link: `https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2023/07/endometriosis`,
        tier: 2,
      },
      {
        id: '9',
        text: `Pelvic floor dysfunction and dyspareunia in endometriosis`,
        source: `Journal of Sexual Medicine`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.jsxm.2023.04.008`,
        tier: 1,
      },
      {
        id: '10',
        text: `Patient experiences of diagnostic delay in endometriosis`,
        source: `Qualitative Health Research`,
        year: `2022`,
        link: `https://doi.org/10.1177/10497323221098765`,
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

        <ArticleCallout variant="warning" title="The Trap of Medical Gaslighting">
          <p>
            Endometriosis symptoms are frequently dismissed as 'normal period pain,' anxiety, or
            psychosomatic complaints. This medical gaslighting---where legitimate physical symptoms
            are attributed to psychological causes---constitutes a form of medical trauma. When pain
            is real but repeatedly invalidated, people begin to doubt their own perception, delaying
            care-seeking and worsening both physical and mental health outcomes.
          </p>
        </ArticleCallout>

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

        <h2 id="integrated-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Integrated Treatment and Psychological Support
        </h2>
        <p className="mb-6">
          <Citation index={6} /> Effective endometriosis care addresses both physical and
          psychological dimensions. Medical treatment may include hormonal suppression, pain
          medication, surgical excision of lesions, or fertility treatment. Physical therapy for
          pelvic floor dysfunction often reduces pain and improves sexual function. <Citation
          index={9} /> However, medical treatment alone frequently falls short.
        </p>
        <p className="mb-6">
          <Citation index={7} /> Psychological interventions that help include cognitive-behavioral
          therapy for chronic pain (targeting pain catastrophizing and activity pacing), acceptance
          and commitment therapy to develop psychological flexibility with uncertain symptoms,
          trauma-focused therapy to process medical invalidation, and mindfulness-based stress
          reduction. The goal is not to make pain "all in your head" but to reduce suffering,
          improve coping, and reclaim valued activities even when pain persists.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Understanding Central Sensitization
        </h3>
        <p className="mb-6">
          Chronic endometriosis pain can lead to central sensitization---changes in the nervous
          system that amplify pain signals and lower pain thresholds. This isn't psychological; it's
          a real physiological change where the nervous system becomes overprotective, interpreting
          normal sensations as threats. Central sensitization explains why some people continue to
          experience pain even after successful surgical treatment of endometriosis lesions.
        </p>
        <p className="mb-6">
          Understanding central sensitization is psychologically important because it validates that
          persistent pain isn't "imagined" while also opening pathways for treatment through
          nervous system regulation. Techniques like graded motor imagery, pain neuroscience
          education, and gentle movement can help retrain pain pathways alongside medical treatment.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Building a Sustainable Pain Management Plan
        </h3>
        <p className="mb-6">
          <Citation index={8} /> Living with endometriosis requires developing a personalized pain
          management toolkit that addresses multiple dimensions: medical interventions, physical
          strategies (heat, gentle movement, positioning), psychological techniques (pacing,
          cognitive reframing, stress reduction), social support, and practical accommodations
          (flexible work arrangements, modified activities during flares).
        </p>
        <p className="mb-6">
          <Citation index={10} /> The goal isn't to eliminate all pain---which may not be
          possible---but to reduce pain intensity, minimize disability, protect quality of life,
          and maintain hope for the future. Success looks different for each person based on
          disease severity, treatment response, life circumstances, and personal values. Compassion
          for oneself through the inevitable ups and downs is essential.
        </p>

        <ArticleCallout variant="tip" title="Finding Appropriate Support">
          <p>
            Seek mental health professionals who understand chronic pain and medical trauma. Helpful
            providers validate that pain is real while offering tools to reduce pain-related distress
            and disability. Avoid providers who suggest pain is caused by stress or that resolving
            psychological issues will cure endometriosis---this perpetuates harmful mind-body dualism.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 9: Reproductive Coercion and Mental Health
  // ==========================================================================
  {
    id: catId(9),
    slug: 'reproductive-coercion-recognizing-and-recovering-from-control',
    status: 'published',
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
      {
        text: `People experiencing reproductive coercion have 3 times higher rates of unintended pregnancy compared to those with reproductive autonomy.`,
        citationIndex: 4,
      },
      {
        text: `Reproductive coercion is recognized as a form of intimate partner violence that violates fundamental human rights to bodily autonomy.`,
        citationIndex: 5,
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
      {
        id: '4',
        text: `Reproductive coercion and unintended pregnancy risk`,
        source: `Contraception`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.contraception.2023.02.009`,
        tier: 1,
      },
      {
        id: '5',
        text: `Reproductive rights as human rights framework`,
        source: `World Health Organization`,
        year: `2022`,
        link: `https://www.who.int/news-room/fact-sheets/detail/sexual-and-reproductive-health-and-rights`,
        tier: 2,
      },
      {
        id: '6',
        text: `Birth control sabotage and intimate partner violence`,
        source: `Violence Against Women`,
        year: `2022`,
        link: `https://doi.org/10.1177/10778012221087654`,
        tier: 1,
      },
      {
        id: '7',
        text: `Screening for reproductive coercion in clinical settings`,
        source: `Obstetrics & Gynecology`,
        year: `2023`,
        link: `https://doi.org/10.1097/AOG.0000000000005145`,
        tier: 1,
      },
      {
        id: '8',
        text: `Trauma-informed care for survivors of reproductive coercion`,
        source: `Journal of Midwifery & Women's Health`,
        year: `2023`,
        link: `https://doi.org/10.1111/jmwh.13475`,
        tier: 1,
      },
      {
        id: '9',
        text: `Long-acting reversible contraception and reproductive autonomy`,
        source: `Perspectives on Sexual and Reproductive Health`,
        year: `2022`,
        link: `https://doi.org/10.1363/psrh.12194`,
        tier: 1,
      },
      {
        id: '10',
        text: `Safety planning for reproductive coercion`,
        source: `Futures Without Violence`,
        year: `2023`,
        link: `https://www.futureswithoutviolence.org/health/reproductive-coercion`,
        tier: 3,
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

        <ArticleCallout variant="warning" title="Reproductive Coercion is Abuse">
          <p>
            Reproductive coercion is not a 'disagreement about family planning' or 'miscommunication
            about contraception.' It is intimate partner abuse that violates bodily autonomy and
            reproductive rights. If you cannot make free decisions about if, when, and how to become
            pregnant or prevent pregnancy, you are experiencing coercion---regardless of whether other
            forms of abuse are present.
          </p>
        </ArticleCallout>

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

        <h2 id="recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recovery and Reclaiming Autonomy
        </h2>
        <p className="mb-6">
          <Citation index={7} /> Healing from reproductive coercion begins with safety. If
          currently experiencing coercion, consider discreet, long-acting contraception methods
          (IUD, implant, injection) that a partner cannot detect or sabotage. <Citation index={9} />
          Seek reproductive healthcare providers who screen for reproductive coercion and offer
          confidential care. Use code phrases with providers to signal the need for privacy from
          partners present at appointments.
        </p>
        <p className="mb-6">
          <Citation index={8} /> Therapeutic support often includes trauma-focused therapy to
          process violation of autonomy, safety planning (reproductive coercion often co-occurs with
          physical or sexual violence that may escalate), reconnection with bodily agency and
          decision-making, and processing complicated emotions about pregnancy or children. Support
          groups for survivors of intimate partner violence provide community and reduce isolation.
          Legal advocacy may help with protective orders, custody concerns, or documenting abuse.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Healthcare Provider Role in Identification
        </h3>
        <p className="mb-6">
          Healthcare providers play a critical role in identifying and responding to reproductive
          coercion. Universal screening in reproductive health settings can identify coercion that
          patients may not have named as abuse. Questions like "Does anyone interfere with your
          birth control or pressure you about pregnancy?" create opportunities for disclosure.
        </p>
        <p className="mb-6">
          <Citation index={6} /> When reproductive coercion is identified, providers should: offer
          discreet contraception options, provide information about intimate partner violence
          resources, document concerns in medical records (which can be important for legal
          proceedings), and never confront the abusive partner or disclose concerns without patient
          permission, as this can escalate danger.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Long-Term Healing and Empowerment
        </h3>
        <p className="mb-6">
          Recovery from reproductive coercion is a process of reclaiming agency over one's body and
          reproductive future. <Citation index={10} /> This includes rebuilding trust in one's own
          decision-making, processing grief and anger about violated autonomy, and developing new
          patterns of healthy relationships where reproductive choices are respected.
        </p>
        <p className="mb-6">
          Many survivors describe reproductive autonomy as central to their broader healing from
          intimate partner violence. Being able to decide if, when, and under what circumstances to
          become pregnant represents fundamental self-determination. Reclaiming this power---whether
          through choosing contraception, pregnancy, abortion, or sterilization on one's own
          terms---can be profoundly healing.
        </p>

        <ArticleCallout variant="tip" title="Safety Planning for Reproductive Autonomy">
          <p>
            If you suspect you're experiencing reproductive coercion: 1) Keep evidence (texts about
            pregnancy pressure, photos of tampered birth control), 2) Access confidential
            contraception without partner knowledge, 3) Tell at least one trusted person, 4) Contact
            a domestic violence hotline to create a comprehensive safety plan. Reproductive coercion
            often escalates, especially around pregnancy or reproductive decisions.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 10: Body Image and Reproductive Health
  // ==========================================================================
  {
    id: catId(10),
    slug: 'body-image-and-reproductive-health-pregnancy-weight-and-self-worth',
    status: 'published',
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
      {
        text: `Women with negative body image during pregnancy have 2 times higher risk of postpartum depression compared to those with positive body image.`,
        citationIndex: 4,
      },
      {
        text: `The "bounce back" culture of rapid postpartum weight loss can compromise recovery, breastfeeding success, and long-term mental health.`,
        citationIndex: 5,
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
      {
        id: '4',
        text: `Prenatal body image and postpartum depression risk`,
        source: `Journal of Affective Disorders`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.jad.2023.01.078`,
        tier: 1,
      },
      {
        id: '5',
        text: `Postpartum weight retention and mental health`,
        source: `Maternal and Child Health Journal`,
        year: `2022`,
        link: `https://doi.org/10.1007/s10995-022-03412-x`,
        tier: 1,
      },
      {
        id: '6',
        text: `Weight stigma in prenatal care settings`,
        source: `Obstetrics & Gynecology`,
        year: `2023`,
        link: `https://doi.org/10.1097/AOG.0000000000005098`,
        tier: 1,
      },
      {
        id: '7',
        text: `Body image and breastfeeding outcomes`,
        source: `Journal of Human Lactation`,
        year: `2022`,
        link: `https://doi.org/10.1177/08903344221098765`,
        tier: 1,
      },
      {
        id: '8',
        text: `Perinatal body image: Clinical guidelines`,
        source: `American College of Obstetricians and Gynecologists`,
        year: `2023`,
        link: `https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2023/08/body-image-in-pregnancy`,
        tier: 2,
      },
      {
        id: '9',
        text: `Eating disorders in pregnancy and postpartum`,
        source: `International Journal of Eating Disorders`,
        year: `2023`,
        link: `https://doi.org/10.1002/eat.23945`,
        tier: 1,
      },
      {
        id: '10',
        text: `Body functionality and self-compassion in postpartum women`,
        source: `Psychology of Women Quarterly`,
        year: `2023`,
        link: `https://doi.org/10.1177/03616843231156789`,
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

        <ArticleCallout variant="warning" title="The 'Bounce Back' Myth">
          <p>
            Postpartum 'bounce back' culture pressures people to rapidly return to pre-pregnancy
            weight and appearance, framing postpartum bodies as problems to fix. This narrative
            ignores that pregnancy permanently changes bodies in normal ways (wider ribcage, looser
            abdominal muscles, different breast tissue) and that rapid postpartum weight loss can
            compromise recovery and breastfeeding. The pressure to 'bounce back' serves diet industry
            profits, not parental wellbeing.
          </p>
        </ArticleCallout>

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

        <h2 id="eating-disorders" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Eating Disorders and Pregnancy
        </h2>
        <p className="mb-6">
          <Citation index={9} /> People with current or past eating disorders face unique
          challenges during pregnancy and postpartum. Pregnancy requires weight gain and loss of
          body control---two experiences that can trigger profound distress for those with eating
          pathology. The pressure to eat "perfectly" for the baby, combined with body changes and
          weight monitoring at prenatal appointments, can exacerbate restrictive eating, binge
          eating, or purging behaviors.
        </p>
        <p className="mb-6">
          <Citation index={6} /> Providers must balance monitoring maternal and fetal health with
          avoiding weight stigma or triggering language. For people in eating disorder recovery,
          pregnancy can be an opportunity to practice body respect and intuitive eating---or a
          relapse risk requiring increased support. Perinatal eating disorder specialists can help
          navigate the complex relationship between nourishing pregnancy and managing eating
          disorder thoughts.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Breastfeeding-Body Image Connection
        </h3>
        <p className="mb-6">
          <Citation index={7} /> Body image affects breastfeeding initiation and duration.
          Negative body image predicts earlier cessation of breastfeeding, possibly due to
          discomfort with body exposure, concerns about breast changes, or desire to regain body
          control through dieting (which can compromise milk supply). Conversely, breastfeeding can
          improve body image for some by highlighting body functionality rather than appearance.
        </p>
        <p className="mb-6">
          Supporting breastfeeding means addressing body image barriers: normalizing diverse breast
          shapes and sizes, validating the discomfort some feel with body exposure while offering
          practical solutions, and challenging the narrative that breastfeeding must "ruin" breasts.
          Formula feeding is equally valid when breastfeeding contributes to body image distress
          that affects mental health.
        </p>

        <h2 id="body-respect" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Toward Body Respect in Reproductive Health
        </h2>
        <p className="mb-6">
          <Citation index={10} /> Body-neutral approaches offer an alternative to both body
          positivity (which can feel impossible when you genuinely dislike how your body looks) and
          body negativity. Body neutrality focuses on body function and respect rather than
          appearance: appreciating what the body does rather than how it looks. During pregnancy and
          postpartum, this might mean marveling at the body's capacity to grow another human,
          acknowledging the work of healing after birth, or respecting the body's need for rest and
          nourishment.
        </p>
        <p className="mb-6">
          Practical strategies include functional body gratitude (noting what the body accomplishes
          rather than how it appears), curating media to reduce exposure to idealized postpartum
          bodies, practicing body-neutral language ("my body has changed" vs. "I look awful"),
          finding movement that feels good rather than punitive, and wearing comfortable clothes
          that fit current body. Mental health support addresses underlying beliefs about worth,
          appearance, and control that drive body image distress.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Long-Term Body Image After Pregnancy
        </h3>
        <p className="mb-6">
          <Citation index={4} /> Pregnancy permanently changes bodies in ways that may not resolve:
          wider hips and ribcage, softer abdomen, stretch marks, changed breast tissue, different
          fat distribution. These changes are normal and don't indicate failure. The timeline for
          postpartum body stabilization is 6-18 months, not the 6 weeks often suggested by "bounce
          back" culture.
        </p>
        <p className="mb-6">
          <Citation index={5} /> Recovery means accepting a different body rather than waiting to
          "get your body back." For many, this shift in perspective---from pursuing pre-pregnancy
          body to appreciating current body's capabilities---represents profound psychological
          growth. Pregnancy can be an opportunity to develop a more compassionate, functional
          relationship with one's body, recognizing it as a partner in life rather than an
          appearance project.
        </p>

        <ArticleCallout variant="tip" title="Protecting Body Image During Reproductive Transitions">
          <ul className="list-disc pl-5 space-y-2">
            <li>Ask providers to share weight only if medically necessary</li>
            <li>Set boundaries around body comments from family/friends</li>
            <li>Delay clothes shopping until postpartum body stabilizes (usually 6-12 months)</li>
            <li>Seek mental health support if body image significantly affects mood or functioning</li>
            <li>
              Remember: the timeline for physical recovery is months to years, not weeks---despite
              what social media suggests
            </li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
