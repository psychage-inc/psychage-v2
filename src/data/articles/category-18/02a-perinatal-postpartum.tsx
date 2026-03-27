 
// ============================================================================
// Category 18 --- Women's Mental Health | Subcategory 02a
// Perinatal and Postpartum Mental Health (Articles 11-15)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
import { ComparisonTable } from '@/components/article/blocks/ComparisonTable';
import { ProgressSteps } from '@/components/article/blocks/ProgressSteps';
import { BeforeAfter } from '@/components/article/blocks/BeforeAfter';
import { ArticleTabs } from '@/components/article/blocks/ArticleTabs';
import { MythVsFactBlock } from '@/components/article/blocks/MythVsFactBlock';
import { QuoteBlock } from '@/components/article/blocks/QuoteBlock';
import { HighlightBox } from '@/components/article/blocks/HighlightBox';
import { ArticleChart } from '@/components/article/blocks/ArticleChart';
import { ArticleAccordion } from '@/components/article/blocks/ArticleAccordion';
export const articles: Article[] = [
  // ==========================================================================
  // Article 11: Perinatal Depression Overview
  // ==========================================================================
  {
    id: catId(11),
    slug: 'perinatal-depression-understanding-depression-during-pregnancy',
    title: `Perinatal Depression: Understanding Depression During Pregnancy`,
    description: `Explore depression during pregnancy, including risk factors, symptoms, treatment safety, and why maternal mental health is essential prenatal care.`,
    image: '/images/articles/cat18/cover-011.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 10,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Perinatal Depression', 'Pregnancy', 'Prenatal Care', 'Treatment'],

    summary: `Perinatal depression affects 10-20% of pregnant people, yet often goes unrecognized and untreated due to misconceptions that pregnancy is a universally joyful time. Symptoms include persistent sadness, anxiety, difficulty bonding with the pregnancy, sleep and appetite changes, and thoughts of harm. Untreated perinatal depression carries risks for both parent and baby, including preterm birth, low birth weight, and postpartum depression. Evidence-based treatments---including psychotherapy and carefully selected medications---are safe and effective during pregnancy. Screening and treatment should be standard prenatal care.`,

    keyFacts: [
      {
        text: `10-20% of pregnant people experience depression during pregnancy, with highest rates in the third trimester.`,
        citationIndex: 1,
      },
      {
        text: `Untreated perinatal depression increases risk of preterm birth by 30-40% and doubles the risk of postpartum depression.`,
        citationIndex: 2,
      },
      {
        text: `Multiple antidepressants, particularly SSRIs like sertraline and escitalopram, have extensive safety data in pregnancy and can be used when benefits outweigh risks.`,
        citationIndex: 3,
      },
      {
        text: `Cognitive-behavioral therapy and interpersonal therapy show 60-70% response rates for perinatal depression without medication risks.`,
        citationIndex: 5,
      },
      {
        text: `Screening for depression should occur at least once per trimester, as symptoms can emerge or worsen at any point during pregnancy.`,
        citationIndex: 7,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The understanding that depression during pregnancy is not ingratitude or weakness, but a treatable medical condition---and that seeking treatment is an act of care for both yourself and your baby, not a failure of motherhood.`,

    practicalExercise: {
      title: `Mental Health Check-In During Pregnancy`,
      steps: [
        {
          title: `Assess your symptoms`,
          description: `For two weeks, track mood, sleep, appetite, and whether you feel connected to or detached from the pregnancy. Persistent changes may indicate perinatal depression.`,
        },
        {
          title: `Separate stigma from reality`,
          description: `Notice thoughts like "I should be grateful" or "Good mothers don't feel this way." Depression is a medical condition, not a character flaw.`,
        },
        {
          title: `Talk to your provider`,
          description: `At your next prenatal visit, say: "I'm experiencing symptoms of depression. Can we discuss treatment options that are safe during pregnancy?"`,
        },
        {
          title: `Build support`,
          description: `Connect with one person who can provide practical and emotional support. Consider joining a perinatal mental health support group.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Mood Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Prevalence of perinatal depression`,
        source: `JAMA Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1001/jamapsychiatry.2022.0291`,
        tier: 1,
      },
      {
        id: '2',
        text: `Untreated depression in pregnancy: maternal and fetal outcomes`,
        source: `Obstetrics & Gynecology`,
        year: `2023`,
        link: `https://doi.org/10.1097/AOG.0000000000005123`,
        tier: 1,
      },
      {
        id: '3',
        text: `Antidepressant safety in pregnancy: updated evidence`,
        source: `American Journal of Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.1176/appi.ajp.20220456`,
        tier: 1,
      },
      {
        id: '4',
        text: `Risk factors for perinatal depression`,
        source: `Archives of Women's Mental Health`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00737-023-01312-9`,
        tier: 1,
      },
      {
        id: '5',
        text: `Psychotherapy for perinatal depression: efficacy of CBT and IPT`,
        source: `Journal of Affective Disorders`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.jad.2023.02.045`,
        tier: 1,
      },
      {
        id: '6',
        text: `Perinatal Mental Health Screening and Treatment`,
        source: `National Institute of Mental Health`,
        year: `2024`,
        link: `https://www.nimh.nih.gov/health/publications/perinatal-depression`,
        tier: 2,
      },
      {
        id: '7',
        text: `Universal screening for perinatal mood and anxiety disorders`,
        source: `American College of Obstetricians and Gynecologists`,
        year: `2023`,
        link: `https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2023/03/screening-and-diagnosis-of-mental-health-conditions-during-pregnancy-and-postpartum`,
        tier: 2,
      },
      {
        id: '8',
        text: `Impact of maternal depression on child development`,
        source: `Pediatrics`,
        year: `2022`,
        link: `https://doi.org/10.1542/peds.2021-055583`,
        tier: 1,
      },
      {
        id: '9',
        text: `Medication management in pregnancy: risk-benefit analysis`,
        source: `Journal of Clinical Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.4088/JCP.22r14567`,
        tier: 1,
      },
    ],

    content: (
      <>
        {/* Introduction */}
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            At 28 weeks pregnant, Maya couldn't remember the last time she felt excited about the
            baby. Everyone asked if she was "so happy," and Maya said yes---because what kind of
            person feels nothing but dread about their wanted pregnancy?
          </p>
          <p className="mb-6">
            The exhaustion felt bottomless. Sleep brought no rest. She cried for hours and couldn't
            explain why. <Citation id="1" index={1} source="JAMA Psychiatry" year="2022" tier={1} /> When her midwife asked about mood at a routine appointment, Maya finally
            broke down: "I don't think I can do this." The midwife nodded knowingly. "You're
            describing perinatal depression. Let's get you help."
          </p>
          <p className="mb-6">
            Maya's experience reflects a reality that challenges one of our culture's most deeply
            held assumptions: that pregnancy is inherently joyful. For 10-20% of pregnant people,
            the reality is depression---persistent, debilitating, and often hidden behind forced
            smiles and reassurances that "everything is fine."
          </p>
        </div>

        <StatCard
          stats={[
            { value: 10, suffix: '-20%', label: 'of pregnant people experience depression during pregnancy' },
            { value: 50, suffix: '%', label: 'of perinatal depression cases go undiagnosed and untreated' },
          ]}
          source="JAMA Psychiatry, 2022"
        />

        {/* Section: Recognizing Depression During Pregnancy */}
        <h2 id="recognizing-perinatal-depression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Depression During Pregnancy
        </h2>
        <p className="mb-6">
          Perinatal depression---depression during pregnancy---is distinct from typical pregnancy
          discomforts or mood swings. <Citation id="2" index={2} source="Obstetrics & Gynecology" year="2023" tier={1} /> While hormonal changes can cause brief emotional shifts, depression
          involves persistent symptoms lasting most of the day, nearly every day, for at least two
          weeks.
        </p>
        <p className="mb-6">
          Core symptoms include persistent sadness, emptiness, or hopelessness that doesn't lift;
          loss of interest or pleasure in activities previously enjoyed, including preparing for
          baby; excessive anxiety or worry about the pregnancy, baby's health, or ability to be a
          parent; difficulty bonding with or feeling emotionally connected to the pregnancy;
          changes in sleep (beyond normal pregnancy insomnia)---sleeping too much or unable to
          sleep even when tired; appetite changes or disordered eating; difficulty concentrating,
          making decisions, or remembering things; feelings of worthlessness, excessive guilt, or
          being a bad parent already; thoughts of self-harm or that the pregnancy was a mistake;
          and physical symptoms like headaches, digestive problems, or body pain without clear
          medical cause.
        </p>

        <ArticleCallout variant="clinical-note" title="Distinguishing Normal Pregnancy Emotions from Depression">
          <p className="mb-4">
            Pregnancy naturally brings emotional complexity---excitement mixed with fear, joy
            alongside grief for lost freedoms. How do you know when it crosses into depression?
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Normal:</strong> Mixed feelings that shift throughout the day; able to feel joy or connection sometimes</li>
            <li><strong>Depression:</strong> Persistent negative mood that rarely lifts; inability to experience pleasure even in previously enjoyed activities</li>
            <li><strong>Normal:</strong> Anxiety about specific pregnancy concerns (labor, health) that eases with reassurance</li>
            <li><strong>Depression:</strong> Pervasive worry that feels uncontrollable and doesn't respond to logical reassurance</li>
            <li><strong>Normal:</strong> Fatigue that improves somewhat with rest</li>
            <li><strong>Depression:</strong> Exhaustion that persists regardless of sleep, feeling emotionally and physically drained</li>
          </ul>
        </ArticleCallout>

        <h2 id="why-depression-happens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Depression Happens During Pregnancy
        </h2>
        <p className="mb-6">
          Many people delay seeking help because they feel ashamed---pregnancy is "supposed to" be
          joyful, and depression feels like ingratitude or evidence of being unfit for parenthood.{' '}
          <Citation id="4" index={4} source="Archives of Women's Mental Health" year="2023" tier={1} /> This stigma is dangerous. Depression during pregnancy is a medical condition caused by
          biological, psychological, and social factors---not a personal failing or choice.
        </p>
        <p className="mb-6">
          Biological factors include dramatic hormonal fluctuations (estrogen and progesterone
          levels increase up to 100-fold during pregnancy, affecting neurotransmitter systems);
          changes in brain structure and function as the brain adapts to pregnancy; thyroid
          dysfunction, which commonly occurs during pregnancy and mimics or worsens depression;
          genetic vulnerability (family history of depression increases risk); and inflammation and
          immune system changes associated with pregnancy.
        </p>
        <p className="mb-6">
          Psychological risk factors include history of depression or anxiety (50-60% of people
          with previous depression will experience perinatal depression); history of pregnancy
          loss, infertility, or traumatic birth; ambivalent feelings about pregnancy (even if
          pregnancy was planned); perfectionist tendencies or unrealistic expectations about
          pregnancy and motherhood; and poor body image or difficulty with physical changes of
          pregnancy.
        </p>
        <p className="mb-6">
          Social and environmental factors matter enormously: lack of practical and emotional
          support from partner, family, or community; relationship conflict or domestic violence
          (which often escalates during pregnancy); financial stress or housing instability; major
          life transitions or losses during pregnancy; work-related stress or job insecurity; and
          cultural or family pressures about pregnancy, gender, or parenting.
        </p>

        <ArticleCallout variant="warning" title="Why Perinatal Depression Matters">
          <p className="mb-4">
            Untreated depression during pregnancy carries significant risks that extend beyond
            maternal wellbeing:
          </p>
          <p className="mb-4"><strong>For the pregnant person:</strong></p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>30-40% increased risk of preterm labor and delivery</li>
            <li>Poor prenatal care adherence (missed appointments, inadequate nutrition)</li>
            <li>Increased risk of substance use as self-medication</li>
            <li>Suicidal ideation and behavior (maternal suicide is a leading cause of pregnancy-related death)</li>
          </ul>
          <p className="mb-4"><strong>For the baby:</strong></p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Preterm birth and low birth weight</li>
            <li>Developmental delays in infancy and early childhood</li>
            <li>Increased risk of behavioral and emotional problems later in life</li>
          </ul>
          <p><strong>For the postpartum period:</strong> 2-3 times higher risk of postpartum depression, which can affect bonding and infant care. <Citation id="8" index={8} source="Pediatrics" year="2022" tier={1} /></p>
        </ArticleCallout>

        {/* Section: Treatment Options */}
        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: Safety and Effectiveness
        </h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="American Journal of Psychiatry" year="2023" tier={1} /> The question is not whether to treat perinatal depression, but how to treat it
          safely. Treatment decisions require weighing two sets of risks: the risks of untreated
          depression versus the risks of intervention. For most people, untreated depression poses
          greater risks than evidence-based treatments.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Psychotherapy: First-Line for Mild to Moderate Depression
        </h3>
        <p className="mb-6">
          For mild to moderate depression, psychotherapy alone is highly effective and carries no
          medication risks. <Citation id="5" index={5} source="Journal of Affective Disorders" year="2023" tier={1} /> Two therapies have the strongest evidence for perinatal depression:
        </p>
        <p className="mb-6">
          <strong>Cognitive-Behavioral Therapy (CBT)</strong> helps identify negative thought
          patterns specific to pregnancy and motherhood ("I'm going to be a terrible mother," "I
          can't handle this"), test the accuracy of these thoughts through evidence-gathering,
          develop more balanced, realistic thinking patterns, improve coping skills for managing
          stress and emotions, and address behaviors that maintain depression (social withdrawal,
          avoidance, rumination). CBT for perinatal depression typically involves 12-16 weekly
          sessions and can be done individually or in groups.
        </p>
        <p className="mb-6">
          <strong>Interpersonal Therapy (IPT)</strong> focuses on relationship issues and life
          transitions that contribute to depression. For pregnant people, this often means
          processing identity transition from "person without children" to "parent"; addressing
          relationship conflicts with partners, family, or friends; grieving losses (lost
          independence, body changes, previous miscarriages or losses); improving communication
          skills; and building social support networks. IPT typically involves 12-16 weekly
          sessions.
        </p>
        <p className="mb-6">
          Response rates for CBT and IPT in perinatal depression range from 60-70%, meaning most
          people experience significant improvement. Therapy can begin at any point during
          pregnancy and often continues into the postpartum period.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Medication: When and Which Antidepressants
        </h3>
        <p className="mb-6">
          For moderate to severe depression, or when psychotherapy alone is insufficient,
          medication may be necessary. <Citation id="9" index={9} source="Journal of Clinical Psychiatry" year="2023" tier={1} /> The safety data on antidepressants in pregnancy has
          grown substantially over the past two decades, allowing for informed decision-making.
        </p>
        <p className="mb-6">
          <strong>Preferred medications (most safety data):</strong> Sertraline (Zoloft) and
          escitalopram (Lexapro) are often first-line choices due to extensive safety profiles and
          effectiveness for both depression and anxiety. Fluoxetine (Prozac) has the longest track
          record (40+ years of use in pregnancy) with reassuring safety data. Citalopram (Celexa)
          also has good safety evidence. Bupropion (Wellbutrin) is sometimes used when SSRIs are
          ineffective or cause problematic side effects, particularly sexual dysfunction.
        </p>
        <p className="mb-6">
          <strong>What the evidence shows:</strong> No major antidepressant is associated with
          increased risk of major birth defects. Small, controversial studies suggested a link
          between SSRIs and heart defects, but larger, better-designed studies have not confirmed
          this. Some studies show slightly increased risk of preterm birth or low birth weight with
          SSRI use, but these risks are similar to those from untreated depression---making it
          unclear whether medication or illness is responsible. Newborns exposed to SSRIs late in
          pregnancy may experience brief, self-limited withdrawal symptoms (jitteriness,
          irritability, difficulty feeding) in the first few days of life, but these resolve
          without intervention and don't cause lasting effects.
        </p>
        <p className="mb-6">
          The key principle: untreated severe depression poses greater risks than most
          antidepressants. Decisions should be made collaboratively with a provider knowledgeable
          about perinatal psychiatry, weighing your specific situation, severity of symptoms,
          response to previous treatments, and personal values.
        </p>

        <StatCard
          stats={[
            { value: 60, suffix: '-70%', label: 'response rate to psychotherapy for perinatal depression' },
            { value: 30, suffix: '-40%', label: 'increased preterm birth risk with untreated depression' },
          ]}
          source="Journal of Affective Disorders; Obstetrics & Gynecology, 2023"
        />

        {/* Section: Screening and Diagnosis */}
        <h2 id="screening-diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Screening and Getting Diagnosed
        </h2>
        <p className="mb-6">
          <Citation id="7" index={7} source="American College of Obstetricians and Gynecologists" year="2023" tier={2} /> Prenatal care should include routine depression screening---not
          just once, but at least once per trimester, as symptoms can emerge or worsen at any point
          during pregnancy. The American College of Obstetricians and Gynecologists (ACOG)
          recommends universal screening at the first prenatal visit, at least once per trimester,
          and at the postpartum visit.
        </p>
        <p className="mb-6">
          Effective screening tools include the <strong>Edinburgh Postnatal Depression Scale
          (EPDS)</strong>, a 10-item questionnaire that takes 5 minutes to complete and is valid
          during pregnancy (despite the "postnatal" name). Scores of 10-12 indicate possible
          depression warranting further evaluation; scores above 13 indicate probable depression.
          The <strong>Patient Health Questionnaire (PHQ-9)</strong> is a 9-item screening tool
          widely used in primary care and OB settings, measuring severity of depressive symptoms
          over the past two weeks. The <strong>PHQ-2</strong> is an ultra-brief 2-question screen
          that can be followed by the full PHQ-9 if positive.
        </p>
        <p className="mb-6">
          If your provider doesn't screen for mental health, ask for it. Screening is quick,
          non-invasive, and can be the first step toward getting help. A positive screen doesn't
          mean definite depression---it means further evaluation is needed. Your provider should
          either conduct a diagnostic interview or refer you to a mental health professional for
          comprehensive assessment.
        </p>

        <ArticleCallout variant="tip" title="Talking to Your Provider About Depression">
          <p className="mb-4">
            You don't need to wait for screening or be in crisis to bring up mental health
            concerns. If mood symptoms interfere with daily life, bonding with your pregnancy, or
            self-care, tell your provider.
          </p>
          <p className="mb-4"><strong>Useful phrases:</strong></p>
          <ul className="list-disc pl-5 space-y-2">
            <li>"I'm not feeling like myself emotionally. Can we talk about that?"</li>
            <li>"I'm worried I might be experiencing depression during pregnancy."</li>
            <li>"I'm having trouble bonding with the pregnancy and feeling hopeful."</li>
            <li>"I need mental health support. What are my options?"</li>
          </ul>
          <p className="mt-4">
            If a provider dismisses your concerns with "It's just hormones" or "All pregnant people
            feel this way," advocate for yourself or seek a different provider. You deserve
            comprehensive care that includes mental health.
          </p>
        </ArticleCallout>

        {/* Section: Building Support */}
        <h2 id="building-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building a Support Plan
        </h2>
        <p className="mb-6">
          Treatment works best when combined with practical and emotional support. <Citation id="6" index={6} source="National Institute of Mental Health" year="2024" tier={2} /> Depression makes it hard to ask for help---but support significantly improves
          outcomes and recovery.
        </p>
        <p className="mb-6">
          <strong>Practical support:</strong> Identify specific people who can help with concrete
          tasks. This might include preparing meals or bringing food, attending prenatal
          appointments with you, helping with household tasks (cleaning, laundry, errands),
          providing transportation, or offering childcare for other children. Be specific in your
          requests---"Can you bring dinner Tuesday and Thursday?" is more likely to result in help
          than "Let me know if you can help sometime."
        </p>
        <p className="mb-6">
          <strong>Emotional support:</strong> Educate your partner or close family members about
          perinatal depression to reduce judgment and increase empathy. Share resources or articles
          (like this one). Help them understand that depression is not laziness, ingratitude, or
          lack of love for the baby---it's a medical condition. Identify one or two people who can
          listen without judgment when you need to talk. Join perinatal mental health support
          groups where your experiences are normalized and you can connect with others who
          understand.
        </p>
        <p className="mb-6">
          <strong>Postpartum planning:</strong> Since perinatal depression significantly increases
          risk of postpartum depression, plan ahead for postpartum mental health care. Identify a
          therapist or psychiatrist you can continue seeing after delivery. Discuss with your
          provider whether you should continue treatment through the postpartum period even if
          symptoms improve. Build in concrete postpartum support (someone to help with baby care,
          meals, sleep). Create a mental health monitoring plan---how will you track symptoms, and
          at what point will you seek additional help?
        </p>
        <p className="mb-6">
          <strong>Self-compassion:</strong> Recognize that depression is not your fault. Seeking
          help demonstrates strength, not weakness. Treatment is an act of care for both yourself
          and your baby. You don't have to do this alone.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Perinatal depression affects 10-20% of pregnant people and is a medical condition, not a personal failing</li>
            <li>Untreated depression carries serious risks for both parent and baby, making treatment essential healthcare</li>
            <li>Evidence-based treatments---psychotherapy and carefully selected medications---are safe and effective during pregnancy</li>
            <li>Screening should occur at least once per trimester; don't wait for your provider to ask---bring up concerns proactively</li>
            <li>Support from partners, family, and community significantly improves outcomes and recovery</li>
            <li>Planning for postpartum mental health care is essential, as perinatal depression increases postpartum depression risk</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 12: Postpartum Depression
  // ==========================================================================
  {
    id: catId(12),
    slug: 'postpartum-depression-beyond-the-baby-blues',
    title: `Postpartum Depression: Beyond the Baby Blues`,
    description: `Distinguish between baby blues and postpartum depression, understand risk factors and symptoms, and learn about evidence-based treatments for this common postpartum condition.`,
    image: '/images/articles/cat18/cover-012.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 9,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Postpartum Depression', 'Maternal Mental Health', 'PPD', 'Treatment'],

    summary: `Postpartum depression (PPD) affects 15-20% of new parents, significantly more common than the 3-5 day "baby blues" that resolve on their own. PPD symptoms include persistent sadness, anxiety, difficulty bonding with baby, intrusive thoughts about harm, sleep and appetite changes, and feelings of inadequacy as a parent. PPD is caused by dramatic hormonal shifts, sleep deprivation, identity transition, and social pressures---not personal weakness. Evidence-based treatments include psychotherapy, antidepressants compatible with breastfeeding, and practical support. Early intervention prevents worsening symptoms and supports healthy parent-infant bonding.`,

    keyFacts: [
      {
        text: `15-20% of new parents experience postpartum depression, with onset typically in the first 3 months but possible up to one year postpartum.`,
        citationIndex: 1,
      },
      {
        text: `Baby blues (affecting 50-80% of new parents) resolve within two weeks; PPD persists and worsens without treatment.`,
        citationIndex: 2,
      },
      {
        text: `Multiple antidepressants are safe during breastfeeding, with sertraline and paroxetine showing minimal infant exposure.`,
        citationIndex: 3,
      },
      {
        text: `50% of postpartum depression cases go undiagnosed due to stigma, lack of screening, and normalization of suffering.`,
        citationIndex: 5,
      },
      {
        text: `Brexanolone (Zulresso) and zuranolone (Zurzuvae) are FDA-approved rapid-acting treatments specifically for postpartum depression.`,
        citationIndex: 7,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The realization that struggling emotionally after birth doesn't mean you don't love your baby or that you're a bad parent---it means you're experiencing a medical condition that responds to treatment, and getting help is the most loving thing you can do.`,

    practicalExercise: {
      title: `Postpartum Mental Health Assessment`,
      steps: [
        {
          title: `Identify your symptoms`,
          description: `Check which symptoms you're experiencing: sadness, anxiety, difficulty bonding, intrusive thoughts, sleep problems, appetite changes, feelings of inadequacy. If multiple persist beyond two weeks, consider professional evaluation.`,
        },
        {
          title: `Challenge the narrative`,
          description: `When you think "I should be happy" or "Other moms don't feel this way," remember: PPD affects 1 in 5 new parents. This is common and treatable.`,
        },
        {
          title: `Seek evaluation`,
          description: `Contact your OB, midwife, or primary care provider. Say: "I'm experiencing symptoms of postpartum depression and need help." Don't minimize your symptoms.`,
        },
        {
          title: `Accept help`,
          description: `Identify 2-3 specific tasks others can help with (holding baby while you shower, bringing meals, watching baby while you sleep). Depression makes it hard to ask---ask anyway.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Symptoms',
    },

    citations: [
      {
        id: '1',
        text: `Postpartum depression prevalence and risk factors`,
        source: `JAMA Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1001/jamapsychiatry.2021.4126`,
        tier: 1,
      },
      {
        id: '2',
        text: `Baby blues versus postpartum depression`,
        source: `Journal of Affective Disorders`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.jad.2022.11.067`,
        tier: 1,
      },
      {
        id: '3',
        text: `Antidepressant use during breastfeeding`,
        source: `American Journal of Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.1176/appi.ajp.20220567`,
        tier: 1,
      },
      {
        id: '4',
        text: `Postpartum hormonal changes and neurobiology of PPD`,
        source: `Molecular Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.1038/s41380-023-02012-5`,
        tier: 1,
      },
      {
        id: '5',
        text: `Barriers to postpartum depression diagnosis and treatment`,
        source: `Obstetrics & Gynecology`,
        year: `2023`,
        link: `https://doi.org/10.1097/AOG.0000000000005234`,
        tier: 1,
      },
      {
        id: '6',
        text: `Postpartum Depression: Facts and Resources`,
        source: `National Institute of Mental Health`,
        year: `2024`,
        link: `https://www.nimh.nih.gov/health/publications/postpartum-depression-facts`,
        tier: 2,
      },
      {
        id: '7',
        text: `Brexanolone and zuranolone for postpartum depression`,
        source: `New England Journal of Medicine`,
        year: `2023`,
        link: `https://doi.org/10.1056/NEJMoa2212779`,
        tier: 1,
      },
      {
        id: '8',
        text: `Cognitive-behavioral therapy for postpartum depression`,
        source: `Archives of Women's Mental Health`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00737-023-01356-x`,
        tier: 1,
      },
      {
        id: '9',
        text: `Partner and social support in PPD recovery`,
        source: `Journal of Affective Disorders`,
        year: `2024`,
        link: `https://doi.org/10.1016/j.jad.2023.12.045`,
        tier: 1,
      },
    ],

    content: (
      <>
        {/* Introduction */}
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Three weeks after giving birth, Lauren sat in the dark nursery at 3 AM, baby finally
            asleep in her arms, and sobbed silently. She loved her daughter desperately---and also
            felt crushed by the weight of keeping this tiny human alive.
          </p>
          <p className="mb-6">
            Friends who visited exclaimed how "natural" she looked as a mother. Lauren felt like a
            fraud, certain she was failing at every turn. <Citation id="1" index={1} source="JAMA Psychiatry" year="2022" tier={1} /> When she finally told her partner, "I
            think something is wrong with me," he said, "You're just tired. All new moms feel this
            way." But this felt like more than tiredness. This felt like drowning.
          </p>
          <p className="mb-6">
            Lauren's experience is common: 15-20% of new parents---roughly one in five---experience
            postpartum depression. Yet half of these cases go undiagnosed because symptoms are
            dismissed as "normal" new parent exhaustion or because stigma prevents people from
            seeking help.
          </p>
        </div>

        <ComparisonTable
          title="Baby Blues vs. Postpartum Depression"
          columns={['Feature', 'Baby Blues', 'Postpartum Depression']}
          items={[
            { feature: 'Prevalence', values: ['50-80% of new parents', '15-20% of new parents'] },
            { feature: 'Onset', values: ['Within 3-5 days postpartum', 'First 3 months (can occur up to 1 year)'] },
            { feature: 'Duration', values: ['Resolves within 2 weeks', 'Persists and worsens without treatment'] },
            { feature: 'Severity', values: ['Mild mood swings, tearfulness', 'Persistent sadness, difficulty functioning'] },
            { feature: 'Functioning', values: ['Able to care for self and baby', 'Significant impairment in daily tasks'] },
            { feature: 'Treatment needed', values: [false, true] },
          ]}
        />

        {/* Section: Understanding Baby Blues */}
        <h2 id="baby-blues" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding the Baby Blues
        </h2>
        <p className="mb-6">
          The "baby blues" are extremely common, affecting 50-80% of new parents in the first 3-5
          days after delivery. <Citation id="2" index={2} source="Journal of Affective Disorders" year="2023" tier={1} /> Symptoms include mood swings (feeling happy one moment, tearful
          the next), crying spells for no clear reason, anxiety or worry about baby care, feeling
          overwhelmed, difficulty sleeping even when baby sleeps, and irritability or
          restlessness.
        </p>
        <p className="mb-6">
          Baby blues are caused by the dramatic hormonal shifts that occur after delivery---
          estrogen and progesterone levels drop by 90% within 24 hours of giving birth, a more
          rapid hormonal change than occurs at any other time in life. <Citation id="4" index={4} source="Molecular Psychiatry" year="2023" tier={1} /> This hormonal plunge,
          combined with sleep deprivation, physical recovery from childbirth, and the enormity of
          caring for a newborn, creates emotional volatility that typically peaks around day 5
          postpartum and resolves on its own within two weeks.
        </p>
        <p className="mb-6">
          No treatment is required for baby blues---just support, rest (as much as possible with a
          newborn), reassurance that feelings are temporary and normal, and practical help with
          baby care and household tasks. If symptoms persist beyond two weeks or worsen rather
          than improve, this indicates postpartum depression rather than baby blues.
        </p>

        {/* Section: Recognizing PPD */}
        <h2 id="recognizing-ppd" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Postpartum Depression
        </h2>
        <p className="mb-6">
          Postpartum depression is different from baby blues in timing, severity, and duration.
          PPD symptoms persist beyond two weeks, worsen over time, and significantly interfere
          with functioning. Common symptoms include:
        </p>
        <p className="mb-6">
          <strong>Emotional symptoms:</strong> Persistent sadness, emptiness, or hopelessness most
          of the day; severe anxiety or panic attacks; overwhelming guilt or feelings of
          worthlessness; feeling like a bad parent or that baby would be better off with someone
          else; loss of interest or pleasure in activities previously enjoyed; emotional numbness
          or inability to feel joy when with baby.
        </p>
        <p className="mb-6">
          <strong>Cognitive symptoms:</strong> Difficulty concentrating, making decisions, or
          remembering things; intrusive, distressing thoughts about harm to baby or self (these
          are symptoms of anxiety, not desires); excessive worry about baby's health or
          development; obsessive checking behaviors; thoughts of self-harm or suicide.
        </p>
        <p className="mb-6">
          <strong>Physical symptoms:</strong> Sleep disturbances beyond normal new parent
          exhaustion (can't sleep even when baby sleeps, or sleeping excessively); appetite
          changes (eating much more or less than usual); fatigue or lack of energy that doesn't
          improve with rest; physical aches and pains without clear cause.
        </p>
        <p className="mb-6">
          <strong>Behavioral and relationship symptoms:</strong> Difficulty bonding with or
          feeling emotionally connected to baby; withdrawal from partner, family, or friends;
          irritability, anger, or rage disproportionate to situations; avoiding baby care or
          overcompensating with perfectionism; loss of interest in sex or physical intimacy.
        </p>

        <ArticleCallout variant="warning" title="When to Seek Immediate Help">
          <p className="mb-4">
            Contact your provider or crisis services (call 988 Suicide & Crisis Lifeline)
            immediately if you experience:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Thoughts of harming yourself or your baby</li>
            <li>Hallucinations (seeing or hearing things that aren't there)</li>
            <li>Delusions (believing things that aren't true, like baby is possessed or in danger from imagined threats)</li>
            <li>Severe agitation, confusion, or disorientation</li>
            <li>Inability to care for yourself or baby</li>
          </ul>
          <p className="mt-4">
            These symptoms may indicate postpartum psychosis (a rare but serious emergency) or
            severe PPD requiring urgent intervention. This is not something to "wait out"---
            immediate psychiatric care can be life-saving.
          </p>
        </ArticleCallout>

        {/* Section: Why PPD Happens */}
        <h2 id="why-ppd-happens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Postpartum Depression Happens
        </h2>
        <p className="mb-6">
          <Citation id="5" index={5} source="Obstetrics & Gynecology" year="2023" tier={1} /> Postpartum depression results from a complex interaction of biological, psychological,
          and social factors. Understanding these causes helps reduce self-blame and guides
          treatment.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Biological Factors
        </h3>
        <p className="mb-6">
          The dramatic hormonal shifts after delivery---estrogen and progesterone dropping 90%
          within 24 hours---affect neurotransmitter systems involved in mood regulation,
          particularly serotonin, dopamine, and norepinephrine. Some people's brains are more
          sensitive to these rapid hormonal changes. Thyroid dysfunction is common postpartum (1
          in 12 new parents develop postpartum thyroiditis) and can cause or worsen depressive
          symptoms. Sleep deprivation---universal in early parenthood---disrupts neurotransmitter
          function and emotional regulation. Genetic vulnerability plays a role: family history of
          depression or PPD increases risk. Inflammation and immune system changes associated with
          pregnancy and delivery may contribute to depression in vulnerable individuals.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Psychological Factors
        </h3>
        <p className="mb-6">
          Identity transition from "person without children" to "parent" involves profound loss as
          well as gain---loss of independence, spontaneity, career identity, and aspects of
          pre-baby self. This grief is often unacknowledged, adding to emotional burden. History
          of depression or anxiety significantly increases PPD risk (50-60% of those with previous
          depression will experience PPD). Traumatic or difficult birth experiences, whether
          medically complicated or psychologically overwhelming, increase vulnerability. Unrealistic
          expectations about motherhood---shaped by social media, family narratives, and cultural
          ideals---set people up for feelings of failure when reality doesn't match fantasy.
          Perfectionist tendencies can intensify self-criticism when inevitable parenting mistakes
          occur.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Social and Environmental Factors
        </h3>
        <p className="mb-6">
          Lack of practical and emotional support is one of the strongest predictors of PPD. <Citation id="9" index={9} source="Journal of Affective Disorders" year="2024" tier={1} /> This includes unsupportive or absent partners, lack of family nearby, social
          isolation, and inadequate maternity leave or workplace support. Relationship conflict or
          domestic violence (which often escalates during pregnancy and postpartum) dramatically
          increases risk. Financial stress, housing instability, or food insecurity add enormous
          pressure. Major life transitions or losses during the postpartum period compound stress.
          Cultural pressures to be a "perfect mother" who is always happy, selfless, and
          instinctively competent create impossible standards that guarantee feelings of failure.
        </p>

        <StatCard
          stats={[
            { value: 15, suffix: '-20%', label: 'of new parents develop postpartum depression' },
            { value: 50, suffix: '%', label: 'of PPD cases go undiagnosed and untreated' },
          ]}
          source="JAMA Psychiatry, 2022; Obstetrics & Gynecology, 2023"
        />

        {/* Section: Treatment */}
        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Treatment for PPD
        </h2>
        <p className="mb-6">
          <Citation id="6" index={6} source="National Institute of Mental Health" year="2024" tier={2} /> Effective PPD treatment typically combines multiple approaches:
          psychotherapy, medication when needed, and practical/social support. Early intervention
          prevents worsening and supports bonding.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Psychotherapy
        </h3>
        <p className="mb-6">
          <strong>Cognitive-Behavioral Therapy (CBT)</strong> for PPD targets specific negative
          thought patterns common in postpartum depression. <Citation id="8" index={8} source="Archives of Women's Mental Health" year="2023" tier={1} /> This includes identifying and
          challenging thoughts like "I'm a terrible mother," "I can't do anything right," or "My
          baby would be better off without me"; testing the accuracy of these thoughts through
          behavioral experiments; developing more balanced, realistic self-talk; improving problem-
          solving and coping skills; and addressing behaviors that maintain depression (social
          withdrawal, avoidance, rumination). CBT can be delivered individually or in groups and
          typically involves 12-16 weekly sessions.
        </p>
        <p className="mb-6">
          <strong>Interpersonal Therapy (IPT)</strong> focuses on relationship issues and role
          transitions. For postpartum depression, this often means processing the identity shift
          to parenthood and grieving aspects of pre-baby life; improving communication with
          partner about division of labor, intimacy, and emotional needs; addressing conflicts
          with family members (particularly around parenting advice or boundary violations);
          building social support networks; and managing expectations about being a "good enough"
          parent rather than perfect one.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Medication Options
        </h3>
        <p className="mb-6">
          For moderate to severe PPD, medication is often necessary and highly effective. <Citation id="3" index={3} source="American Journal of Psychiatry" year="2023" tier={1} /> Multiple antidepressants are safe during breastfeeding: sertraline (Zoloft) has the
          most safety data and minimal infant exposure via breast milk; paroxetine (Paxil) also
          has extensive safety evidence; escitalopram (Lexapro) and citalopram (Celexa) are safe
          options with slightly higher but still minimal infant exposure. These medications
          typically take 4-6 weeks to reach full effectiveness.
        </p>
        <p className="mb-6">
          Newer, rapid-acting treatments specifically FDA-approved for PPD include <strong>
          brexanolone (Zulresso)</strong>, a synthetic form of allopregnanolone (a hormone that
          drops precipitously after delivery) administered as a 60-hour continuous IV infusion in
          a healthcare setting. <Citation id="7" index={7} source="New England Journal of Medicine" year="2023" tier={1} /> Many people experience significant improvement within
          24-48 hours. The main barrier is cost (~$34,000 per treatment, though often covered by
          insurance) and the need for hospitalization. <strong>Zuranolone (Zurzuvae)</strong> is
          the first oral medication specifically approved for PPD, taken once daily for 14 days.
          It works faster than traditional antidepressants (often within 3-7 days) but is expensive
          and may cause drowsiness.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Support and Practical Interventions
        </h3>
        <p className="mb-6">
          Medication and therapy are essential for clinical PPD, but practical support
          significantly improves outcomes and recovery speed. This includes concrete help with baby
          care (someone holding baby while you shower, sleep, or attend therapy), assistance with
          household tasks (meals, cleaning, laundry), sleep support (partner or family member
          handling one night feeding so you can sleep 6 hours straight), joining postpartum
          depression support groups where experiences are normalized, and maintaining social
          connections even when depression makes withdrawal tempting.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Recognize symptoms',
              description: <p>If sadness, anxiety, or difficulty bonding persist beyond two weeks or significantly interfere with functioning, this warrants professional evaluation---not just "pushing through" or waiting it out.</p>,
            },
            {
              title: 'Seek evaluation',
              description: <p>Contact your OB/GYN, midwife, or primary care provider. Say directly: "I think I have postpartum depression and need help." Many providers can prescribe medication or refer to psychiatry/therapy. Don't minimize symptoms to avoid "bothering" your doctor---this is essential healthcare.</p>,
            },
            {
              title: 'Start treatment',
              description: <p>Begin recommended therapy and/or medication. Give treatments adequate time (CBT often takes 8-12 sessions; antidepressants need 4-6 weeks). If breastfeeding, discuss medication options---multiple antidepressants are safe, and untreated PPD poses greater risks than medication.</p>,
            },
            {
              title: 'Build support',
              description: <p>Identify specific people who can provide practical help. Be concrete in requests: "Can you bring dinner Tuesday and watch the baby while I nap?" Accept help even when guilt says you "should" be able to do it all alone. You can't pour from an empty cup.</p>,
            },
          ]}
        />

        {/* Section: Overcoming Barriers */}
        <h2 id="overcoming-barriers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Overcoming Barriers to Treatment
        </h2>
        <p className="mb-6">
          Despite effective treatments, 50% of PPD cases go untreated. <Citation id="5" index={5} source="Obstetrics & Gynecology" year="2023" tier={1} /> Understanding and addressing
          common barriers is essential.
        </p>

        <BeforeAfter
          before={{
            title: 'Barrier Beliefs',
            points: [
              '"I should be able to handle this alone"',
              '"Taking medication means I\'m weak or failing"',
              '"I can\'t take antidepressants if I\'m breastfeeding"',
              '"Seeking help means I\'m a bad mother"',
              '"This is just normal new parent exhaustion"',
            ]
          }}
          after={{
            title: 'Evidence-Based Reality',
            points: [
              'PPD is a medical condition requiring treatment, like diabetes or thyroid disease',
              'Medication corrects neurochemical imbalances---it\'s medical treatment, not a character flaw',
              'Multiple antidepressants are safe for breastfeeding with minimal infant exposure',
              'Getting help ensures your wellbeing so you CAN be the parent your baby needs',
              'PPD is distinct from normal tiredness---it persists, worsens, and impairs functioning',
            ]
          }}
        />

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>PPD affects 15-20% of new parents and is distinct from baby blues, which resolve within two weeks</li>
            <li>PPD results from biological, psychological, and social factors---not personal weakness or bad parenting</li>
            <li>Evidence-based treatments (CBT, IPT, antidepressants, newer rapid-acting medications) are highly effective</li>
            <li>Multiple antidepressants are safe during breastfeeding; untreated PPD poses greater risks than medication</li>
            <li>Practical and social support significantly improve outcomes---ask for specific help and accept it</li>
            <li>50% of cases go untreated due to stigma and barriers; early intervention prevents worsening and supports bonding</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 13: Perinatal Anxiety
  // ==========================================================================
  {
    id: catId(13),
    slug: 'perinatal-anxiety-when-worry-becomes-overwhelming',
    title: `Perinatal Anxiety: When Worry Becomes Overwhelming`,
    description: `Understand anxiety disorders during pregnancy and postpartum, including generalized anxiety, panic disorder, and health anxiety, plus strategies for managing intrusive worries.`,
    image: '/images/articles/cat18/cover-013.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 9,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Perinatal Anxiety', 'Panic Disorder', 'Intrusive Thoughts', 'Worry'],

    summary: `Perinatal anxiety affects 15-20% of pregnant and postpartum people---as common as perinatal depression but less recognized. Symptoms include excessive worry about baby's health or safety, panic attacks, intrusive thoughts, hypervigilance, physical symptoms (racing heart, trouble breathing), and compulsive checking behaviors. Perinatal anxiety is distinct from normal new parent concerns---it's persistent, distressing, and interferes with functioning. Treatment includes cognitive-behavioral therapy, exposure-based interventions, and anti-anxiety medications when needed. Early recognition prevents escalation and supports healthy parent-infant bonding.`,

    keyFacts: [
      {
        text: `15-20% of pregnant and postpartum people experience clinically significant anxiety, often co-occurring with depression.`,
        citationIndex: 1,
      },
      {
        text: `Perinatal anxiety is distinct from normal new parent worry---symptoms are excessive, persistent, and interfere with daily functioning.`,
        citationIndex: 2,
      },
      {
        text: `Cognitive-behavioral therapy targeting perinatal anxiety is highly effective, with response rates of 60-70%.`,
        citationIndex: 3,
      },
      {
        text: `Up to 90% of new parents experience intrusive thoughts about harm to their baby---these are anxiety symptoms, not dangerous desires.`,
        citationIndex: 5,
      },
      {
        text: `Exposure and Response Prevention (ERP) therapy helps people understand that intrusive thoughts are not dangerous and don't need to be controlled.`,
        citationIndex: 7,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The understanding that intrusive thoughts about harm to your baby are a symptom of anxiety---not a prediction, not your true desires, and not evidence you're dangerous---and that these thoughts lose power when met with understanding rather than fear.`,

    practicalExercise: {
      title: `Anxiety Awareness and Grounding`,
      steps: [
        {
          title: `Identify anxiety patterns`,
          description: `For one week, note when anxiety spikes: What triggers it? What thoughts accompany it? What physical sensations do you notice? Patterns help you recognize anxiety early.`,
        },
        {
          title: `Separate thoughts from reality`,
          description: `Practice: "I'm having the thought that [worry]" vs. "This is definitely true." Anxiety generates worst-case scenarios---not predictions.`,
        },
        {
          title: `Use grounding techniques`,
          description: `When anxiety peaks, try 5-4-3-2-1: Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. This interrupts anxiety spirals.`,
        },
        {
          title: `Seek specialized support`,
          description: `Find a therapist who specializes in perinatal anxiety and uses CBT or exposure therapy. General anxiety treatment may not address perinatal-specific fears.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Anxiety Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Prevalence of perinatal anxiety disorders`,
        source: `General Hospital Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1016/j.genhosppsych.2022.03.008`,
        tier: 1,
      },
      {
        id: '2',
        text: `Clinical features of perinatal anxiety`,
        source: `Journal of Affective Disorders`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.jad.2023.01.089`,
        tier: 1,
      },
      {
        id: '3',
        text: `Cognitive-behavioral therapy for perinatal anxiety`,
        source: `Behaviour Research and Therapy`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.brat.2023.104234`,
        tier: 1,
      },
      {
        id: '4',
        text: `Panic disorder in the perinatal period`,
        source: `Archives of Women's Mental Health`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00737-023-01367-8`,
        tier: 1,
      },
      {
        id: '5',
        text: `Intrusive thoughts in new parents: prevalence and clinical significance`,
        source: `Clinical Psychology Review`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.cpr.2023.102234`,
        tier: 1,
      },
      {
        id: '6',
        text: `Perinatal Anxiety: What It Is and How to Get Help`,
        source: `National Institute of Mental Health`,
        year: `2024`,
        link: `https://www.nimh.nih.gov/health/publications/perinatal-anxiety`,
        tier: 2,
      },
      {
        id: '7',
        text: `Exposure and response prevention for perinatal OCD and intrusive thoughts`,
        source: `Journal of Anxiety Disorders`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.janxdis.2023.102678`,
        tier: 1,
      },
      {
        id: '8',
        text: `SSRI safety and efficacy for perinatal anxiety`,
        source: `Journal of Clinical Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.4088/JCP.22r14623`,
        tier: 1,
      },
      {
        id: '9',
        text: `Sleep deprivation and anxiety in the postpartum period`,
        source: `Sleep Medicine Reviews`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.smrv.2023.101734`,
        tier: 1,
      },
    ],

    content: (
      <>
        {/* Introduction */}
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            At 36 weeks pregnant, Tessa couldn't sleep---not because of physical discomfort, but
            because her mind raced with catastrophic scenarios. What if the cord wrapped around the
            baby's neck? What if she didn't make it to the hospital in time? What if she made a
            mistake during labor that hurt the baby?
          </p>
          <p className="mb-6">
            She counted kicks obsessively, called her doctor multiple times a week with health
            fears, and googled every pregnancy symptom at 2 AM. <Citation id="1" index={1} source="General Hospital Psychiatry" year="2022" tier={1} /> Her partner said it was
            normal to worry, but Tessa knew this felt different---suffocating, uncontrollable,
            consuming every waking moment.
          </p>
          <p className="mb-6">
            Perinatal anxiety---anxiety during pregnancy and the postpartum period---affects 15-20%
            of new and expectant parents, roughly the same prevalence as perinatal depression. Yet
            while depression screening has become standard in prenatal care, anxiety often goes
            unrecognized and untreated, dismissed as "normal" new parent worry when it's actually
            a clinical condition requiring intervention.
          </p>
        </div>

        <ArticleTabs
          tabs={[
            {
              id: 'gad',
              label: 'Generalized Anxiety',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Generalized anxiety disorder (GAD)</strong> involves excessive,
                    uncontrollable worry about multiple topics---baby's health, labor
                    complications, ability to be a good parent, finances, relationships. <Citation id="2" index={2} source="Journal of Affective Disorders" year="2023" tier={1} />
                  </p>
                  <p className="mb-4"><strong>Symptoms:</strong></p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Persistent worry most days for at least two weeks</li>
                    <li>Difficulty controlling the worry</li>
                    <li>Physical symptoms: restlessness, fatigue, difficulty concentrating, irritability, muscle tension, sleep disturbance</li>
                    <li>Worry feels disproportionate to actual risks</li>
                  </ul>
                  <p>GAD during pregnancy often centers on pregnancy complications, birth outcomes, and baby's health. Postpartum, worries shift to baby's development, SIDS, illness, and parenting competence.</p>
                </div>
              ),
            },
            {
              id: 'panic',
              label: 'Panic Disorder',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Panic disorder</strong> involves sudden, intense panic attacks with physical and psychological symptoms that peak within minutes. <Citation id="4" index={4} source="Archives of Women's Mental Health" year="2023" tier={1} />
                  </p>
                  <p className="mb-4"><strong>Panic attack symptoms:</strong></p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Racing or pounding heart</li>
                    <li>Trouble breathing or feeling like choking</li>
                    <li>Chest pain or discomfort</li>
                    <li>Dizziness, lightheadedness, or feeling faint</li>
                    <li>Nausea or abdominal distress</li>
                    <li>Sweating, trembling, or shaking</li>
                    <li>Intense fear of losing control, going crazy, or dying</li>
                  </ul>
                  <p>Postpartum panic attacks often occur during nighttime feedings, when alone with baby, or when triggered by intrusive thoughts about harm. The physical symptoms can mimic medical emergencies, leading to ER visits and fear of future attacks.</p>
                </div>
              ),
            },
            {
              id: 'health-anxiety',
              label: 'Health Anxiety',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Health anxiety</strong> (illness anxiety disorder) in the perinatal period focuses specifically on fears about baby's health and wellbeing.
                  </p>
                  <p className="mb-4"><strong>Common manifestations:</strong></p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Excessive googling of baby symptoms or pregnancy complications</li>
                    <li>Frequent unnecessary doctor visits or calls</li>
                    <li>Inability to be reassured despite normal test results</li>
                    <li>Constant monitoring (kick counting far beyond recommendations, obsessive weight tracking, continuous video monitoring)</li>
                    <li>Catastrophic interpretation of normal variations</li>
                  </ul>
                  <p>Health anxiety can interfere with bonding if every interaction with baby becomes a search for signs of illness rather than connection.</p>
                </div>
              ),
            },
          ]}
        />

        {/* Section: Normal Worry vs. Clinical Anxiety */}
        <h2 id="normal-vs-anxiety" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Normal Worry vs. Perinatal Anxiety
        </h2>
        <p className="mb-6">
          New parents commonly worry about baby's wellbeing---this is adaptive and helps ensure
          infant safety. Perinatal anxiety is different in intensity, persistence, and impact.
        </p>

        <div className="space-y-4 my-8">
          <MythVsFactBlock
            myth="All new parent worry is normal and will pass on its own"
            fact="While some worry is adaptive, perinatal anxiety involves excessive, uncontrollable worry that persists and interferes with functioning. It requires professional treatment, not just 'waiting it out.'"
          />
          <MythVsFactBlock
            myth="If I have intrusive thoughts about harming my baby, I'm dangerous"
            fact="Up to 90% of new parents have intrusive thoughts about harm. These are anxiety symptoms, not desires or predictions. The distress you feel indicates how much you value your baby's safety."
          />
          <MythVsFactBlock
            myth="Anxiety means I'm not cut out to be a parent"
            fact="Perinatal anxiety is a medical condition caused by hormonal changes, sleep deprivation, and life transition---not a reflection of parenting capacity or love for your baby."
          />
        </div>

        <ArticleCallout variant="info" title="When Worry Becomes Clinical Anxiety">
          <p className="mb-4">Perinatal anxiety warrants professional evaluation when worries are:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Excessive:</strong> Constant worst-case scenarios that feel out of proportion to actual risk</li>
            <li><strong>Persistent:</strong> Dominate most of the day, nearly every day, for at least two weeks</li>
            <li><strong>Uncontrollable:</strong> Can't "turn off" the worry through distraction or reassurance</li>
            <li><strong>Interfering:</strong> Prevent sleep, bonding with baby, or enjoying positive moments</li>
          </ul>
        </ArticleCallout>

        {/* Section: Intrusive Thoughts */}
        <h2 id="intrusive-thoughts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Intrusive Thoughts and Harm Obsessions
        </h2>
        <p className="mb-6">
          <Citation id="5" index={5} source="Clinical Psychology Review" year="2023" tier={1} /> A particularly distressing feature of perinatal anxiety is intrusive thoughts---
          unwanted, disturbing mental images or thoughts that pop into awareness unbidden. Up to
          90% of new parents experience these thoughts at least occasionally.
        </p>
        <p className="mb-6">
          Common examples include images of accidentally dropping or harming baby; thoughts about
          baby dying from SIDS, choking, or illness; visualizing car accidents or other disasters;
          intrusive thoughts about intentionally harming baby (despite having absolutely no desire
          to do so); images of baby being kidnapped or harmed by others; and fears of losing
          control and acting on violent impulses.
        </p>
        <p className="mb-6">
          These thoughts are terrifying and often lead to intense shame: "What kind of mother
          thinks these things? Am I dangerous? Should I not be alone with my baby?" The truth is
          that intrusive thoughts are a symptom of anxiety---specifically, a hyperactive threat-
          detection system. Your brain is working overtime to identify and prevent dangers to your
          baby, generating worst-case scenarios as a misguided form of preparation.
        </p>

        <QuoteBlock
          quote="The extreme distress caused by intrusive thoughts is actually evidence that you would never act on them. People who have genuine intent to harm don't find these thoughts distressing---they find them appealing. Your horror at these thoughts demonstrates that they are completely contrary to your values and desires."
          attribution="Dr. Jonathan Abramowitz"
          role="Clinical Psychologist specializing in OCD and perinatal anxiety"
          source="Understanding Postpartum Anxiety"
          variant="large"
        />

        <p className="mb-6">
          <strong>Critical facts about intrusive thoughts:</strong> People who have intrusive
          thoughts about harm are at <em>no increased risk</em> of acting on them. Research shows
          that parents with harm-related intrusive thoughts are no more likely to harm their
          children than parents without these thoughts. The thoughts are <em>ego-dystonic</em>---
          meaning they feel foreign, disturbing, and contrary to your true self. Trying to
          suppress or control the thoughts paradoxically makes them more frequent and distressing.
          Acceptance and exposure-based therapy (ERP) are highly effective treatments. <Citation id="7" index={7} source="Journal of Anxiety Disorders" year="2023" tier={1} />
        </p>

        <HighlightBox variant="stat">
          <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">90%</p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            of new parents experience intrusive thoughts about harm to their baby---these are
            anxiety symptoms, not dangerous desires
          </p>
        </HighlightBox>

        {/* Section: Treatment */}
        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment for Perinatal Anxiety
        </h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="Behaviour Research and Therapy" year="2023" tier={1} /> Cognitive-behavioral therapy (CBT) is first-line treatment for perinatal
          anxiety, with response rates of 60-70%. CBT helps you identify anxious thought patterns
          (catastrophizing, overestimating danger, assuming the worst), test the accuracy of fears
          through behavioral experiments, develop coping strategies for managing physical anxiety
          symptoms, and reduce avoidance behaviors that maintain anxiety.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Exposure and Response Prevention (ERP)
        </h3>
        <p className="mb-6">
          For intrusive thoughts specifically, exposure and response prevention (ERP)---a
          specialized form of CBT---is highly effective. ERP involves deliberately exposing
          yourself to the intrusive thoughts (rather than trying to suppress them) and resisting
          compulsive responses like checking, seeking reassurance, or avoiding situations that
          trigger the thoughts. Through repeated exposure, your brain learns that the thoughts are
          not dangerous and don't require action. The thoughts lose their power and intensity over
          time.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Medication Options
        </h3>
        <p className="mb-6">
          Medication may be necessary for severe anxiety or when therapy alone is insufficient. <Citation id="8" index={8} source="Journal of Clinical Psychiatry" year="2023" tier={1} /> Selective serotonin reuptake inhibitors (SSRIs)---particularly sertraline
          (Zoloft), escitalopram (Lexapro), and paroxetine (Paxil)---effectively treat anxiety and
          are safe during pregnancy and breastfeeding. SSRIs typically take 4-6 weeks to reach
          full effectiveness.
        </p>
        <p className="mb-6">
          Benzodiazepines (lorazepam, clonazepam) provide rapid relief during acute panic attacks
          but carry dependency risks and are generally reserved for short-term use. Buspirone is
          another option for generalized anxiety without the dependency risks of benzodiazepines.
          Medication decisions should be made collaboratively with a perinatal psychiatrist or
          provider knowledgeable about medication safety in pregnancy and breastfeeding.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Lifestyle and Self-Help Strategies
        </h3>
        <p className="mb-6">
          While professional treatment is essential for clinical anxiety, these strategies can
          supplement therapy and medication:
        </p>
        <p className="mb-6">
          <strong>Limit information seeking:</strong> Set boundaries on googling symptoms or
          seeking reassurance. Each google search or reassurance-seeking provides temporary relief
          but reinforces the anxiety cycle. <strong>Practice grounding techniques:</strong> When
          anxiety spikes, use 5-4-3-2-1 grounding (name 5 things you see, 4 you hear, 3 you touch,
          2 you smell, 1 you taste) or deep breathing (4-7-8 technique: inhale for 4, hold for 7,
          exhale for 8). <strong>Challenge catastrophic thoughts:</strong> Ask yourself "What's
          the evidence for this fear?" and "What's more likely to happen?" <strong>Schedule worry
          time:</strong> Designate 15 minutes daily to process worries, then practice redirecting
          thoughts outside that window. <strong>Prioritize sleep:</strong> Sleep deprivation
          dramatically worsens anxiety. <Citation id="9" index={9} source="Sleep Medicine Reviews" year="2023" tier={1} /> Accept help with night feedings to protect sleep.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Perinatal anxiety affects 15-20% of pregnant and postpartum people---as common as depression but less recognized</li>
            <li>Intrusive thoughts about harm affect 90% of new parents and are anxiety symptoms, not dangerous desires</li>
            <li>Perinatal anxiety is distinct from normal worry: excessive, persistent, uncontrollable, and interfering with functioning</li>
            <li>CBT and ERP therapy are highly effective, with 60-70% response rates for perinatal anxiety</li>
            <li>Multiple SSRIs are safe during pregnancy and breastfeeding and effectively treat anxiety</li>
            <li>Early treatment prevents escalation and supports healthy bonding with baby</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 14: Birth Trauma and PTSD
  // ==========================================================================
  {
    id: catId(14),
    slug: 'birth-trauma-and-ptsd-healing-after-difficult-births',
    title: `Birth Trauma and PTSD: Healing After Difficult Births`,
    description: `Understand birth trauma and postpartum PTSD, recognize symptoms, and learn about trauma-focused treatments that support recovery and bonding.`,
    image: '/images/articles/cat18/cover-014.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Birth Trauma', 'PTSD', 'Medical Trauma', 'Recovery'],

    summary: `Birth trauma affects 25-35% of people who give birth, with 3-6% developing full postpartum PTSD. Traumatic births may involve medical emergencies, lack of informed consent, feeling powerless or dismissed, or subjective experiences of terror---trauma is determined by subjective experience, not just objective medical facts. PTSD symptoms include intrusive memories or flashbacks, avoidance of reminders, hypervigilance, and negative changes in mood. Birth trauma can affect bonding, breastfeeding, sexual intimacy, and future pregnancy decisions. Trauma-focused therapies---particularly EMDR and trauma-focused CBT---effectively treat postpartum PTSD.`,

    keyFacts: [
      {
        text: `25-35% of people describe their birth as traumatic, with 3-6% meeting criteria for full postpartum PTSD.`,
        citationIndex: 1,
      },
      {
        text: `Birth trauma is defined by subjective experience---feeling terrified, powerless, or violated---not just by objective medical complications.`,
        citationIndex: 2,
      },
      {
        text: `EMDR (Eye Movement Desensitization and Reprocessing) and trauma-focused CBT are effective treatments for postpartum PTSD.`,
        citationIndex: 3,
      },
      {
        text: `Birth trauma can occur even with "good outcomes"---healthy baby and successful delivery do not negate traumatic experience.`,
        citationIndex: 4,
      },
      {
        text: `Untreated birth trauma affects bonding, breastfeeding, sexual intimacy, and future pregnancy decisions.`,
        citationIndex: 5,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The validation that you can have a healthy baby and still experience trauma---birth trauma is about your subjective experience of terror or powerlessness, not whether medical outcomes were good, and processing trauma is essential for healing.`,

    practicalExercise: {
      title: `Birth Story Processing`,
      steps: [
        {
          title: `Recognize trauma symptoms`,
          description: `Check which symptoms you experience: flashbacks or intrusive memories of birth, avoiding thoughts/reminders of birth, hypervigilance with baby, difficulty bonding, nightmares, feeling detached or numb. Multiple symptoms may indicate trauma.`,
        },
        {
          title: `Validate your experience`,
          description: `If birth felt traumatic to you, it was traumatic---regardless of whether others minimize it with "at least baby is healthy." Both can be true: healthy baby AND traumatic experience.`,
        },
        {
          title: `Write your birth story`,
          description: `When ready (not immediately postpartum), write what happened including emotions, physical sensations, and what you needed but didn't receive. This can be private---the act of organizing the narrative helps processing.`,
        },
        {
          title: `Seek trauma-informed support`,
          description: `Find a therapist trained in perinatal trauma and EMDR or trauma-focused CBT. General postpartum support may not address trauma specifically.`,
        },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Trauma Support',
    },

    citations: [
      {
        id: '1',
        text: `Prevalence of birth trauma and postpartum PTSD`,
        source: `Journal of Affective Disorders`,
        year: `2022`,
        link: `https://doi.org/10.1016/j.jad.2022.08.012`,
        tier: 1,
      },
      {
        id: '2',
        text: `Subjective birth experience and trauma`,
        source: `Birth: Issues in Perinatal Care`,
        year: `2023`,
        link: `https://doi.org/10.1111/birt.12723`,
        tier: 1,
      },
      {
        id: '3',
        text: `Treatment of postpartum PTSD`,
        source: `Archives of Women's Mental Health`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00737-023-01298-4`,
        tier: 1,
      },
      {
        id: '4',
        text: `Birth trauma and mother-infant bonding disruption`,
        source: `Infant Mental Health Journal`,
        year: `2023`,
        link: `https://doi.org/10.1002/imhj.22041`,
        tier: 1,
      },
      {
        id: '5',
        text: `Long-term impact of traumatic childbirth`,
        source: `Journal of Reproductive and Infant Psychology`,
        year: `2024`,
        link: `https://doi.org/10.1080/02646838.2024.2301234`,
        tier: 1,
      },
      {
        id: '6',
        text: `EMDR efficacy for postpartum PTSD`,
        source: `Psychological Trauma: Theory, Research, Practice, and Policy`,
        year: `2023`,
        link: `https://doi.org/10.1037/tra0001356`,
        tier: 1,
      },
      {
        id: '7',
        text: `Trauma-informed maternity care`,
        source: `American College of Obstetricians and Gynecologists`,
        year: `2023`,
        link: `https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2023/08/trauma-informed-care`,
        tier: 2,
      },
      {
        id: '8',
        text: `Risk factors for birth trauma`,
        source: `BMC Pregnancy and Childbirth`,
        year: `2023`,
        link: `https://doi.org/10.1186/s12884-023-05789-3`,
        tier: 1,
      },
      {
        id: '9',
        text: `Birth trauma and subsequent pregnancy planning`,
        source: `Women and Birth`,
        year: `2024`,
        link: `https://doi.org/10.1016/j.wombi.2024.01.008`,
        tier: 1,
      },
    ],

    content: (
      <>
        {/* Introduction */}
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When people asked about her birth, Simone said, "It was hard, but baby is healthy"---the
            only acceptable answer. She didn't mention the 38 hours of labor, the emergency
            cesarean without adequate explanation, the feeling of being held down and cut open while
            terrified.
          </p>
          <p className="mb-6">
            <Citation id="1" index={1} source="Journal of Affective Disorders" year="2022" tier={1} /> She didn't mention that she couldn't look at her scar
            without reliving the surgery, or that nighttime brought flashbacks of the operating
            room. Three months postpartum, she still felt numb when holding her daughter---loving her
            in theory but feeling disconnected. When a therapist asked, "Do you think you
            experienced trauma during birth?" Simone finally allowed herself to say yes.
          </p>
          <p className="mb-6">
            Birth trauma is far more common than most people realize, affecting one in four birthing
            people. Yet it remains deeply stigmatized, dismissed with platitudes like "at least baby
            is healthy" that silence suffering and prevent healing. This article explores what birth
            trauma is, how to recognize postpartum PTSD, and evidence-based treatments that support
            recovery and parent-child bonding.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 25, suffix: '-35%', label: 'of birthing people describe their birth as traumatic' },
            { value: 3, suffix: '-6%', label: 'develop full postpartum PTSD requiring treatment' },
          ]}
          source="Journal of Affective Disorders, 2022"
        />

        {/* Section: Understanding Birth Trauma */}
        <h2 id="understanding-birth-trauma" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Birth Trauma
        </h2>
        <p className="mb-6">
          <Citation id="2" index={2} source="Birth: Issues in Perinatal Care" year="2023" tier={1} /> Birth trauma is defined not by objective medical facts but by subjective
          experience---specifically, feeling terrified, powerless, or lacking control during labor
          and delivery. Births can be medically uncomplicated yet psychologically traumatic if the
          person felt dismissed, violated, or helpless. Conversely, medically complex births aren't
          automatically traumatic if the person felt informed, supported, and in control.
        </p>
        <p className="mb-6">
          <strong>Common traumatic elements include:</strong> Medical emergencies such as hemorrhage,
          emergency cesarean, NICU admission, fetal distress, or maternal health complications.
          Physical experiences like severe pain beyond what was expected, significant tearing,
          feeling cut or violated during procedures, or loss of bodily autonomy. Interpersonal trauma
          including lack of informed consent, procedures performed without explanation or permission,
          having concerns or pain reports dismissed, feeling that one's voice was ignored by medical
          staff, or being left alone during frightening moments. Finally, witnessing or believing
          baby was in danger, seeing baby turn blue or unresponsive, or being separated from baby
          immediately after birth without explanation.
        </p>
        <p className="mb-6">
          <Citation id="8" index={8} source="BMC Pregnancy and Childbirth" year="2023" tier={1} /> Some births involve clear medical crises; others are traumatic because of how care was
          delivered---being coerced into interventions, having one's pain minimized, or
          experiencing rough or disrespectful treatment. Medical staff may not recognize a birth
          as traumatic because outcomes were good ("healthy baby, successful delivery"). But
          trauma resides in the nervous system's response to perceived threat, not in outcome.
          People whose trauma is dismissed often internalize guilt: "I should just be grateful baby
          is healthy. Why am I still suffering?"
        </p>

        <ArticleCallout variant="warning" title="Trauma vs. Disappointment">
          <p className="mb-4">
            Not all difficult births are traumatic. Disappointment that birth didn't go as
            planned---for example, wanting an unmedicated birth but needing an epidural, or planning
            vaginal delivery but having a cesarean---is different from trauma.
          </p>
          <p className="mb-4">
            <strong>Disappointment</strong> involves grief for lost expectations, processing the gap
            between the hoped-for experience and reality. It's normal and deserves validation, but
            typically resolves with time and support.
          </p>
          <p>
            <strong>Trauma</strong> involves terror, powerlessness, nervous system dysregulation, and
            intrusive re-experiencing of the event. It doesn't fade with time---it requires specific
            therapeutic intervention. Both experiences deserve support, but they require different
            approaches.
          </p>
        </ArticleCallout>

        {/* Section: Postpartum PTSD Symptoms */}
        <h2 id="postpartum-ptsd-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Postpartum PTSD
        </h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="Archives of Women's Mental Health" year="2023" tier={1} /> Postpartum PTSD involves four core symptom clusters, each reflecting different ways
          trauma affects the mind and body. Symptoms must persist for more than one month and
          significantly impair functioning---interfering with bonding, self-care, relationships, or
          daily activities.
        </p>

        <ArticleChart
          type="bar"
          title="Postpartum PTSD Symptom Categories"
          data={[
            { label: 'Intrusive Re-experiencing', value: 85 },
            { label: 'Avoidance', value: 72 },
            { label: 'Negative Mood/Cognition', value: 68 },
            { label: 'Hyperarousal', value: 78 },
          ]}
          description="Percentage of individuals with postpartum PTSD experiencing each symptom cluster. Most people with PTSD experience symptoms across multiple categories."
          source="Archives of Women's Mental Health, 2023"
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Intrusive Re-experiencing
        </h3>
        <p className="mb-6">
          Unwanted, distressing memories or flashbacks of the birth that intrude into awareness
          without warning. During flashbacks, you may feel like you're re-living the birth---seeing
          the operating room, feeling pain, hearing sounds, experiencing the same terror. Nightmares
          about birth, harm to baby, or being trapped in the hospital. Intense psychological distress
          (panic, fear, overwhelming emotion) or physical reactions (racing heart, sweating,
          trembling) when reminded of the birth---for example, driving past the hospital, seeing
          pregnant people, or hearing medical terminology.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Avoidance
        </h3>
        <p className="mb-6">
          Actively avoiding thoughts, conversations, or reminders of the birth. This might look like
          changing the subject when others ask about delivery, refusing to look at birth photos, or
          avoiding postpartum checkups or medical settings. Some people avoid bonding with baby
          because the baby is a living reminder of trauma---this creates profound guilt but is a
          genuine trauma response, not a lack of love. Difficulty discussing the birth even when you
          want to process it; words may feel stuck or the mind goes blank when trying to talk about
          it.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Negative Changes in Mood and Cognition
        </h3>
        <p className="mb-6">
          Inability to remember important aspects of the birth (trauma-related dissociation can
          create memory gaps). Persistent negative beliefs about yourself: "I failed," "I was weak,"
          "My body betrayed me," "I should have known/done something differently." Persistent guilt
          or shame---feeling you caused the trauma, or guilt for "not being grateful" when baby is
          healthy. Diminished interest in activities that used to bring joy. Feeling detached from
          others, even loved ones, or feeling emotionally numb---"going through the motions" without
          genuine connection.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Hyperarousal and Reactivity
        </h3>
        <p className="mb-6">
          Hypervigilance about baby's health---obsessively checking breathing, constant fear of SIDS
          or medical emergencies, inability to relax or trust that baby is safe. Exaggerated startle
          response---jumping at sudden sounds or movements. Difficulty sleeping even when baby is
          asleep (hyperarousal keeps the nervous system on high alert). Irritability, angry
          outbursts, or difficulty concentrating. Always feeling "on edge," scanning for threats,
          unable to feel calm or safe.
        </p>

        {/* Section: Impact on Life and Relationships */}
        <h2 id="impact-and-relationships" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Birth Trauma Affects Daily Life
        </h2>
        <p className="mb-6">
          <Citation id="4" index={4} source="Infant Mental Health Journal" year="2023" tier={1} /> Birth trauma creates ripple effects across multiple life domains, affecting bonding,
          physical health, intimacy, and future family planning.
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Parent-infant bonding:</strong> Bonding may be disrupted if baby is a reminder
            of trauma or if emotional numbing prevents genuine connection. Parents may feel love "in
            theory" but struggle to feel it emotionally, creating profound guilt and fear of being a
            "bad parent."
          </li>
          <li>
            <strong>Breastfeeding challenges:</strong> If birth involved loss of bodily autonomy,
            breastfeeding can feel like another demand on your body. Physical touch or sensations
            during nursing may trigger flashbacks. Breastfeeding difficulties compound feelings of
            failure.
          </li>
          <li>
            <strong>Sexual intimacy:</strong> <Citation id="5" index={5} source="Journal of Reproductive and Infant Psychology" year="2024" tier={1} /> Trauma often affects sexual intimacy due to physical reminders of birth (scars,
            pain), ongoing sense of violation, or dissociation during physical touch. Partners may
            feel rejected, not understanding the trauma connection.
          </li>
          <li>
            <strong>Future pregnancy decisions:</strong> <Citation id="9" index={9} source="Women and Birth" year="2024" tier={1} /> Some people avoid future pregnancies entirely due to fear of re-traumatization.
            Others feel compelled to "try again" for a healing birth, which carries its own risks if
            trauma isn't first processed.
          </li>
        </ul>

        {/* Section: Treatment and Recovery */}
        <h2 id="treatment-and-recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Treatment for Birth Trauma
        </h2>
        <p className="mb-6">
          The good news: postpartum PTSD is highly treatable with trauma-focused therapies. Recovery
          is possible, bonding can be repaired, and many people go on to have positive experiences
          with subsequent pregnancies after processing trauma.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          EMDR (Eye Movement Desensitization and Reprocessing)
        </h3>
        <p className="mb-6">
          <Citation id="6" index={6} source="Psychological Trauma: Theory, Research, Practice, and Policy" year="2023" tier={1} /> EMDR is a specialized therapy that uses bilateral stimulation (side-to-side eye
          movements, tapping, or sounds) while recalling traumatic memories. This process helps the
          brain reprocess the memories, integrating them in a way that reduces their emotional
          intensity and intrusive quality. EMDR is highly effective for PTSD and typically requires
          fewer sessions than traditional talk therapy. It can be adapted for postpartum context,
          with sessions structured around infant care schedules.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)
        </h3>
        <p className="mb-6">
          TF-CBT helps you identify and challenge trauma-related beliefs ("I failed," "I'm damaged,"
          "I should have prevented this"), gradually confront avoided reminders through controlled
          exposure, develop coping strategies for managing PTSD symptoms, and process the narrative
          of what happened. This approach is evidence-based for PTSD and teaches skills you can use
          long after therapy ends.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Medication and Adjunctive Support
        </h3>
        <p className="mb-6">
          SSRIs (selective serotonin reuptake inhibitors) such as sertraline or paroxetine may
          supplement therapy for severe PTSD symptoms. Medication can reduce intrusive thoughts,
          hyperarousal, and depressive symptoms, making therapy more effective. SSRIs are generally
          safe during breastfeeding. Birth trauma support groups provide validation and reduce
          isolation---hearing others' experiences helps counteract the "I'm the only one" narrative.
          Couples therapy can help partners understand trauma responses and rebuild intimacy. <Citation id="7" index={7} source="American College of Obstetricians and Gynecologists" year="2023" tier={2} /> Trauma-informed maternity care for future pregnancies involves working with providers
          who understand triggers, validate trauma, and support informed consent.
        </p>

        <ArticleCallout variant="tip" title="Supporting Yourself After Birth Trauma">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Seek specialized providers:</strong> Look for therapists who specialize in
              perinatal trauma and EMDR or TF-CBT---not all therapists have this training.
            </li>
            <li>
              <strong>Don't rush processing:</strong> Immediate postpartum focus should be on safety
              and stabilization. Trauma work can wait until you feel ready and have adequate support.
            </li>
            <li>
              <strong>Connect with communities:</strong> Birth trauma support groups (online or
              in-person) provide validation and reduce isolation.
            </li>
            <li>
              <strong>Consider a birth story session:</strong> Some doulas and therapists offer
              sessions where you can process what happened with a trained professional who can help
              you make sense of the experience.
            </li>
            <li>
              <strong>Plan for future pregnancies:</strong> If considering another pregnancy, work
              with trauma-informed OB/midwives who understand trigger management and can create a
              birth plan that addresses trauma history.
            </li>
          </ul>
        </ArticleCallout>

        {/* FAQ Section */}
        <h2 id="common-questions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Questions About Birth Trauma
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'q1',
              title: 'Can I have birth trauma even though my baby is healthy?',
              content: (
                <p>
                  <strong>Yes, absolutely.</strong> Birth trauma is about <em>your</em> subjective
                  experience of terror, powerlessness, or violation---not about medical outcomes. A
                  healthy baby and a traumatic birth are not mutually exclusive. Both can be true
                  simultaneously. The phrase "at least baby is healthy" dismisses your suffering and
                  prevents healing.
                </p>
              ),
            },
            {
              id: 'q2',
              title: 'How is birth trauma different from postpartum depression?',
              content: (
                <div>
                  <p className="mb-4">
                    Postpartum depression involves persistent low mood, loss of interest, and
                    feelings of worthlessness or hopelessness. Birth trauma (PTSD) involves
                    re-experiencing a specific traumatic event through flashbacks, nightmares, and
                    intrusive memories.
                  </p>
                  <p>
                    Many people have <strong>both</strong> conditions---trauma can trigger
                    depression, and both deserve treatment. The key difference: PTSD is tied to
                    re-living a specific event; depression is a more generalized mood state.
                  </p>
                </div>
              ),
            },
            {
              id: 'q3',
              title: 'Will birth trauma affect bonding with my baby permanently?',
              content: (
                <div>
                  <p className="mb-4">
                    No. While birth trauma can disrupt early bonding, <strong>bonding is not a
                    one-time event</strong>---it's an ongoing process that continues throughout
                    childhood. With trauma treatment, bonding can be repaired.
                  </p>
                  <p>
                    Research shows that parents who receive trauma-focused therapy experience
                    significant improvements in bonding, emotional availability, and parenting
                    confidence. Early difficulties do not doom the parent-child relationship.
                  </p>
                </div>
              ),
            },
            {
              id: 'q4',
              title: 'Should I have another baby after a traumatic birth?',
              content: (
                <div>
                  <p className="mb-4">
                    This is a deeply personal decision with no universal answer. Some people find
                    healing through a positive subsequent birth experience; others protect their
                    mental health by choosing not to have more children. Both are valid.
                  </p>
                  <p>
                    <strong>If you are considering another pregnancy:</strong> First process the
                    trauma from your previous birth with a specialized therapist. Work with
                    trauma-informed maternity providers who will validate your history and
                    collaborate on a birth plan that addresses triggers. Give yourself permission to
                    change your mind at any point---including during pregnancy or labor.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Birth trauma affects 25-35% of birthing people and is defined by subjective
              experience---not medical outcomes
            </li>
            <li>
              You can have a healthy baby AND experience trauma---both are simultaneously true, and
              both deserve acknowledgment
            </li>
            <li>
              Postpartum PTSD involves re-experiencing (flashbacks, nightmares), avoidance, negative
              mood changes, and hyperarousal
            </li>
            <li>
              EMDR and trauma-focused CBT are highly effective treatments that can restore bonding
              and quality of life
            </li>
            <li>
              Birth trauma is treatable---early intervention prevents long-term impacts on parenting,
              intimacy, and future pregnancies
            </li>
            <li>
              Seek providers who specialize in perinatal trauma, not just general postpartum support
            </li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 15: Postpartum Psychosis
  // ==========================================================================
  {
    id: catId(15),
    slug: 'postpartum-psychosis-recognizing-and-responding-to-psychiatric-emergency',
    title: `Postpartum Psychosis: Recognizing and Responding to Psychiatric Emergency`,
    description: `Understand postpartum psychosis as a rare but serious psychiatric emergency, learn to recognize symptoms, and know when and how to seek urgent care.`,
    image: '/images/articles/cat18/cover-015.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Postpartum Psychosis', 'Psychiatric Emergency', 'Psychosis', 'Crisis'],

    summary: `Postpartum psychosis (PPP) is a rare but serious psychiatric emergency affecting 1-2 per 1,000 new parents, typically within the first 2 weeks postpartum. Symptoms include hallucinations, delusions (often about baby being harmed or possessed), extreme agitation or confusion, rapid mood swings, and disorganized thinking. PPP is not postpartum depression or anxiety---it is a medical emergency requiring immediate hospitalization. Risk is highest among those with bipolar disorder or previous psychotic episodes. With rapid treatment (antipsychotics, mood stabilizers, sometimes ECT), most people recover fully within weeks to months.`,

    keyFacts: [
      {
        text: `Postpartum psychosis affects 1-2 per 1,000 births, with 50% risk among those with bipolar disorder and 100% risk with history of postpartum psychosis.`,
        citationIndex: 1,
      },
      {
        text: `Onset is typically rapid---within the first 2 weeks postpartum, often in the first 72 hours---distinguishing it from PPD or anxiety.`,
        citationIndex: 2,
      },
      {
        text: `With prompt treatment, 95% of people recover fully from postpartum psychosis, though risk of recurrence in future pregnancies is high.`,
        citationIndex: 3,
      },
      {
        text: `Postpartum psychosis is a medical emergency requiring immediate hospitalization---not something that will improve with rest or support alone.`,
        citationIndex: 4,
      },
      {
        text: `Preventive treatment with mood stabilizers and sleep protection can reduce PPP risk by 70-90% in high-risk individuals.`,
        citationIndex: 5,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The critical recognition that postpartum psychosis is not the person's fault or a reflection of their parenting capacity---it is a medical emergency like a stroke or heart attack, requiring immediate intervention but also offering hope for full recovery with proper treatment.`,

    practicalExercise: {
      title: `Postpartum Psychosis Awareness Plan`,
      steps: [
        {
          title: `Know your risk`,
          description: `Risk factors include bipolar disorder, schizoaffective disorder, previous postpartum psychosis, family history of PPP. If at risk, discuss prevention plan with psychiatrist before delivery.`,
        },
        {
          title: `Educate support people`,
          description: `Partners, family, or close friends should know PPP symptoms (hallucinations, delusions, confusion, agitation) and emergency protocol (call 911 or go to ER).`,
        },
        {
          title: `Create a crisis plan`,
          description: `If at high risk, identify: which hospital to go to, who will care for baby, emergency contacts for psychiatric provider. Write this down before delivery.`,
        },
        {
          title: `Act immediately on symptoms`,
          description: `If you or someone you know develops PPP symptoms: do NOT wait to see if it improves. Seek emergency psychiatric care immediately. This is life-threatening.`,
        },
      ],
      toolLink: '/crisis',
      toolLabel: 'Access Emergency Resources',
    },

    citations: [
      {
        id: '1',
        text: `Epidemiology and risk factors for postpartum psychosis`,
        source: `The Lancet Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1016/S2215-0366(22)00068-2`,
        tier: 1,
      },
      {
        id: '2',
        text: `Clinical features and onset of postpartum psychosis`,
        source: `American Journal of Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.1176/appi.ajp.20220678`,
        tier: 1,
      },
      {
        id: '3',
        text: `Treatment and outcomes of postpartum psychosis`,
        source: `Archives of Women's Mental Health`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00737-023-01345-0`,
        tier: 1,
      },
      {
        id: '4',
        text: `Postpartum psychosis as psychiatric emergency`,
        source: `British Journal of Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.1192/bjp.2023.45`,
        tier: 1,
      },
      {
        id: '5',
        text: `Prevention strategies for high-risk women`,
        source: `Journal of Clinical Psychiatry`,
        year: `2024`,
        link: `https://doi.org/10.4088/JCP.23r14892`,
        tier: 1,
      },
      {
        id: '6',
        text: `Electroconvulsive therapy for postpartum psychosis`,
        source: `Journal of ECT`,
        year: `2023`,
        link: `https://doi.org/10.1097/YCT.0000000000000912`,
        tier: 1,
      },
      {
        id: '7',
        text: `Mother-baby units for postpartum psychiatric care`,
        source: `Psychiatric Services`,
        year: `2023`,
        link: `https://doi.org/10.1176/appi.ps.202200456`,
        tier: 1,
      },
      {
        id: '8',
        text: `Screening and management of postpartum psychosis`,
        source: `National Institute for Health and Care Excellence (NICE)`,
        year: `2023`,
        link: `https://www.nice.org.uk/guidance/cg192`,
        tier: 2,
      },
      {
        id: '9',
        text: `Long-term outcomes and recurrence risk`,
        source: `Acta Psychiatrica Scandinavica`,
        year: `2024`,
        link: `https://doi.org/10.1111/acps.13645`,
        tier: 1,
      },
    ],

    content: (
      <>
        {/* Introduction */}
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            On day three postpartum, Jessica's partner found her standing over the bassinet at 4
            AM, staring at their sleeping daughter. "I can hear them," Jessica whispered. "They're
            telling me she's not really ours. That we need to protect her from the demons."
          </p>
          <p className="mb-6">
            <Citation id="1" index={1} source="The Lancet Psychiatry" year="2022" tier={1} /> She hadn't slept in 48 hours. Her mood swung wildly from euphoric
            ("We're chosen! This baby is special!") to terrified ("Something terrible is coming").
            When her partner gently suggested calling the doctor, Jessica became agitated: "You
            don't understand---they'll take her away!" Her partner called 911. By that evening,
            Jessica was in a psychiatric unit, beginning treatment for postpartum psychosis.
          </p>
          <p className="mb-6">
            Postpartum psychosis (PPP) is a rare but serious psychiatric emergency requiring immediate
            medical intervention. Unlike postpartum depression or anxiety, PPP involves a complete
            loss of contact with reality through hallucinations, delusions, and severe confusion. This
            article explains how to recognize PPP, who is at risk, and the life-saving treatments that
            lead to full recovery in 95% of cases.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 1, suffix: '-2', label: 'per 1,000 births result in postpartum psychosis' },
            { value: 95, suffix: '%', label: 'recover fully with prompt treatment' },
          ]}
          source="The Lancet Psychiatry, 2022"
        />

        <ArticleCallout variant="danger" title="This Is a Medical Emergency">
          <p className="mb-4">
            <strong>Postpartum psychosis requires immediate psychiatric hospitalization.</strong> It
            is not something that will improve with rest, support, or "waiting it out." Risks include
            infanticide (harming baby based on delusional beliefs) and suicide.
          </p>
          <p className="font-semibold">
            If you or someone you know shows signs of postpartum psychosis: Call 911 or go to the
            nearest emergency room immediately. Do not leave the person alone with the baby. Do not
            delay seeking help.
          </p>
        </ArticleCallout>

        {/* Section: Recognizing Symptoms */}
        <h2 id="recognizing-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Postpartum Psychosis
        </h2>
        <p className="mb-6">
          <Citation id="2" index={2} source="American Journal of Psychiatry" year="2023" tier={1} /> Postpartum psychosis is distinct from postpartum depression or anxiety---it is a
          psychotic illness characterized by loss of contact with reality. Onset is typically
          abrupt, within the first two weeks postpartum (often in the first 72 hours), which
          distinguishes it from PPD that develops more gradually over weeks to months.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Core Symptoms of Postpartum Psychosis
        </h3>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Hallucinations:</strong> Seeing or hearing things that aren't there. Auditory
            hallucinations are most common---voices making commands ("Hurt the baby"), offering
            commentary ("You're a terrible mother"), or giving instructions ("The baby needs to be
            saved"). Visual hallucinations may include seeing demons, religious figures, or distorted
            images of the baby.
          </li>
          <li>
            <strong>Delusions:</strong> False, fixed beliefs that cannot be changed by logic or
            evidence. Common delusions include believing baby is possessed by evil spirits, baby has
            special powers or divine purpose, baby is not really theirs (substituted by hospital),
            people are plotting to steal or harm the baby, or the parent has a special mission from
            God.
          </li>
          <li>
            <strong>Severe confusion and disorientation:</strong> Not knowing where they are, what
            day or time it is, who people around them are (including partner or baby), or how they
            got to their current location. This is distinct from "baby brain" fogginess---it's
            profound disorientation.
          </li>
          <li>
            <strong>Disorganized thinking and speech:</strong> Jumping rapidly between unrelated
            topics (flight of ideas), making statements that don't make sense or follow logic,
            speaking incoherently or using made-up words, or being unable to complete thoughts.
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Additional Warning Signs
        </h3>

        <p className="mb-6">
          Beyond the core psychotic symptoms, PPP involves dramatic changes in behavior and mood:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Extreme mood swings:</strong> Shifting from euphoric ("I'm the best mother ever!
            This baby will change the world!") to despairing or terrified within minutes to hours.
            This is more severe and rapid than typical postpartum mood fluctuations.
          </li>
          <li>
            <strong>Severe agitation or restlessness:</strong> Inability to sit still, pacing,
            wringing hands, extreme anxiety that cannot be soothed.
          </li>
          <li>
            <strong>Paranoia:</strong> Intense suspicion that others are trying to harm baby,
            believing medical staff poisoned medications, refusing to let anyone touch or see the
            baby.
          </li>
          <li>
            <strong>Bizarre or dangerous behavior:</strong> Acting on delusional beliefs (attempting
            to "exorcise" baby, preparing to flee to "protect" baby), taking baby outside in
            dangerous weather, refusing to feed baby due to fear of poisoning.
          </li>
          <li>
            <strong>Complete lack of insight:</strong> The person does not recognize that anything is
            wrong. They believe their delusions are reality and may resist help.
          </li>
          <li>
            <strong>Inability to sleep:</strong> <Citation id="4" index={4} source="British Journal of Psychiatry" year="2023" tier={1} /> Not just difficulty sleeping, but complete inability to sleep even when
            exhausted---staying awake for 48-72+ hours. This both signals and worsens psychosis.
          </li>
        </ul>

        {/* Comparison Table */}
        <h2 id="distinguishing-ppp" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Distinguishing PPP from Other Postpartum Conditions
        </h2>

        <ComparisonTable
          title="Postpartum Psychosis vs. Postpartum Depression"
          columns={['Feature', 'Postpartum Depression', 'Postpartum Psychosis']}
          items={[
            { feature: 'Onset', values: ['Gradual (weeks to months)', 'Abrupt (hours to days, usually <2 weeks)'] },
            { feature: 'Core symptoms', values: ['Low mood, loss of interest, guilt', 'Hallucinations, delusions, confusion'] },
            { feature: 'Contact with reality', values: ['Maintained', 'Lost'] },
            { feature: 'Insight', values: ['Usually present ("I feel terrible")', 'Usually absent ("Nothing is wrong")'] },
            { feature: 'Sleep', values: ['Difficulty sleeping, early waking', 'Complete inability to sleep for days'] },
            { feature: 'Prevalence', values: ['10-15% of births', '1-2 per 1,000 births'] },
            { feature: 'Treatment setting', values: ['Outpatient therapy ± medication', 'Psychiatric hospitalization (emergency)'] },
            { feature: 'Risk to self/baby', values: ['Moderate (suicide risk)', 'High (suicide and infanticide risk)'] },
          ]}
          highlightColumn={2}
        />

        {/* Section: Risk Factors */}
        <h2 id="risk-factors-prevention" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Is at Risk?
        </h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="Archives of Women's Mental Health" year="2023" tier={1} /> While postpartum psychosis can occur in anyone, certain risk factors dramatically
          increase likelihood:
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'risk with bipolar disorder (no prevention)' },
            { value: 100, suffix: '%', label: 'recurrence risk with previous postpartum psychosis' },
          ]}
          source="Archives of Women's Mental Health, 2023"
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          High-Risk Groups
        </h3>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Bipolar disorder:</strong> Up to 50% of people with bipolar disorder who give
            birth will develop PPP without preventive treatment. This is the single strongest risk
            factor.
          </li>
          <li>
            <strong>Previous postpartum psychosis:</strong> Nearly 100% recurrence risk in subsequent
            pregnancies without prevention. If you've had PPP before, you WILL have it again unless
            preventive measures are taken.
          </li>
          <li>
            <strong>Schizoaffective disorder:</strong> Elevated risk similar to bipolar disorder.
          </li>
          <li>
            <strong>Family history:</strong> Having a first-degree relative (mother, sister) with
            postpartum psychosis or bipolar disorder increases risk.
          </li>
          <li>
            <strong>First-time pregnancy:</strong> PPP is more common with first births, though it
            can occur with any pregnancy.
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Prevention for High-Risk Individuals
        </h3>

        <p className="mb-6">
          <Citation id="5" index={5} source="Journal of Clinical Psychiatry" year="2024" tier={1} /> If you have any of the above risk factors, you should work with a perinatal
          psychiatrist to create a prevention plan <em>before</em> delivery. Preventive treatment can
          reduce PPP risk by 70-90% even in very high-risk individuals.
        </p>

        <p className="mb-6">
          <strong>Effective prevention strategies include:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Medication continuation/initiation:</strong> Starting or continuing mood
            stabilizers (lithium, valproate) throughout pregnancy and postpartum. Beginning
            antipsychotic medication immediately postpartum, even before symptoms emerge.
          </li>
          <li>
            <strong>Intensive sleep protection:</strong> Sleep deprivation is a major trigger for
            psychosis. High-risk individuals need structured sleep schedules with partner or family
            taking over all night feedings to ensure 6-8 hours of uninterrupted sleep.
          </li>
          <li>
            <strong>Close monitoring:</strong> Frequent psychiatric check-ins (every 2-3 days) in the
            first month postpartum to catch early warning signs.
          </li>
          <li>
            <strong>Education of support people:</strong> Partners, family members, and friends
            should be trained to recognize PPP symptoms and know the emergency protocol.
          </li>
        </ul>

        <ArticleCallout variant="clinical-note" title="Prevention Success Rates">
          <p>
            Research shows that with comprehensive prevention planning---medication, sleep
            protection, and monitoring---70-90% of high-risk individuals do NOT develop postpartum
            psychosis. Prevention is highly effective and should be standard care for anyone with
            bipolar disorder or previous PPP.
          </p>
        </ArticleCallout>

        {/* Section: Treatment */}
        <h2 id="treatment-recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment and Recovery Timeline
        </h2>
        <p className="mb-6">
          Treatment for postpartum psychosis requires psychiatric hospitalization---this is not
          negotiable. <Citation id="7" index={7} source="Psychiatric Services" year="2023" tier={1} /> Ideally, care occurs in a specialized mother-baby unit where parent and infant
          can stay together while the parent receives intensive psychiatric treatment. Unfortunately,
          mother-baby units are rare in the United States, so most people are hospitalized in
          standard psychiatric units with baby cared for by partner or family.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Emergency Stabilization (Days 1-3)',
              description: (
                <p>
                  Immediate hospitalization with safety monitoring. Antipsychotic medication started
                  to treat hallucinations and delusions (olanzapine, quetiapine, haloperidol).
                  Benzodiazepines to reduce agitation and promote sleep. Mood stabilizers initiated
                  (lithium or valproate). Medical workup to rule out physical causes (infections,
                  thyroid issues, eclampsia).
                </p>
              ),
            },
            {
              title: 'Symptom Improvement (Days 4-14)',
              description: (
                <p>
                  Most people begin to show improvement within the first week of treatment.
                  Hallucinations and delusions start to diminish. Sleep begins to normalize. Mood
                  stabilizes. Insight gradually returns ("I was very sick"). If response is slow,
                  medication adjustments made or ECT considered.
                </p>
              ),
            },
            {
              title: 'Recovery Phase (Weeks 2-12)',
              description: (
                <p>
                  <Citation id="6" index={6} source="Journal of ECT" year="2023" tier={1} /> Continued medication with gradual symptom resolution. Begin rebuilding
                  parent-infant bond with supervised contact. Therapy to process the experience and
                  address guilt/shame. Education about ongoing treatment and recurrence prevention.
                  Most people achieve full remission within 2-3 months.
                </p>
              ),
            },
            {
              title: 'Maintenance and Prevention (Months 3-12+)',
              description: (
                <p>
                  <Citation id="9" index={9} source="Acta Psychiatrica Scandinavica" year="2024" tier={1} /> Medication continued for at least 12 months to prevent relapse. Ongoing
                  therapy to process trauma and rebuild confidence. If planning future pregnancies,
                  create comprehensive prevention plan. Risk of recurrence is 50-90% without
                  prevention, so lifelong psychiatric follow-up is essential.
                </p>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Treatment Options
        </h3>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Antipsychotics:</strong> First-line treatment for hallucinations and delusions.
            Common choices include olanzapine (Zyprexa), quetiapine (Seroquel), or haloperidol
            (Haldol). These medications work within days to weeks.
          </li>
          <li>
            <strong>Mood stabilizers:</strong> Lithium or valproate (Depakote) for mood symptoms and
            to prevent future episodes. Lithium is particularly effective but requires regular blood
            monitoring.
          </li>
          <li>
            <strong>Benzodiazepines:</strong> Short-term use of lorazepam (Ativan) or clonazepam
            (Klonopin) to reduce agitation and promote sleep during acute phase.
          </li>
          <li>
            <strong>Electroconvulsive therapy (ECT):</strong> <Citation id="6" index={6} source="Journal of ECT" year="2023" tier={1} /> Highly effective for severe PPP or when medication response is slow.
            ECT is safe postpartum and often works faster than medication alone. Response rates are
            excellent (80-90%).
          </li>
        </ul>

        <ArticleCallout variant="info" title="Breastfeeding and Medication">
          <p className="mb-4">
            Most psychiatric medications used for PPP are compatible with breastfeeding, though some
            require monitoring. The priority is treating the psychosis---untreated PPP poses far
            greater risk to baby than medication exposure through breast milk.
          </p>
          <p>
            Work with your psychiatrist and pediatrician to weigh risks and benefits. Some people
            continue breastfeeding with medication; others formula-feed. Both choices are valid and
            safe. <Citation id="8" index={8} source="National Institute for Health and Care Excellence (NICE)" year="2023" tier={2} />
          </p>
        </ArticleCallout>

        {/* Section: After Recovery */}
        <h2 id="after-recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Life After Postpartum Psychosis
        </h2>
        <p className="mb-6">
          Recovery from PPP involves both medical stabilization and psychological healing. With
          treatment, 95% of people recover fully and go on to have healthy, loving relationships with
          their children. However, the experience often leaves emotional scars that deserve
          attention.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Common Emotional Challenges After Recovery
        </h3>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Shame and guilt:</strong> "What kind of mother has those thoughts? How could I
            have believed those things about my baby?" Remember: actions and beliefs during psychosis
            were symptoms of severe illness, not reflections of your character or love for your baby.
          </li>
          <li>
            <strong>Grief over missed bonding time:</strong> Time spent in psychosis or hospitalized
            is time away from baby. This loss is real and deserves acknowledgment. Bonding can still
            occur---it's an ongoing process, not a one-time event.
          </li>
          <li>
            <strong>Fear and trauma:</strong> The experience of psychosis---especially if it involved
            hospitalization against your will or loss of custody (even temporarily)---can be
            traumatic. PTSD symptoms are common after PPP.
          </li>
          <li>
            <strong>Fear about future pregnancies:</strong> "Will this happen again? Can I risk
            another pregnancy?" These are valid concerns requiring thoughtful discussion with your
            psychiatrist.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Postpartum psychosis is a rare (1-2 per 1,000 births) but serious psychiatric emergency
              requiring immediate hospitalization
            </li>
            <li>
              PPP involves hallucinations, delusions, severe confusion, and rapid mood changes---it is
              distinct from postpartum depression
            </li>
            <li>
              People with bipolar disorder face 50% risk without prevention; those with previous PPP
              face nearly 100% recurrence risk
            </li>
            <li>
              Preventive treatment (medication, sleep protection, monitoring) reduces PPP risk by
              70-90% in high-risk individuals
            </li>
            <li>
              With prompt treatment---antipsychotics, mood stabilizers, sometimes ECT---95% of people
              recover fully within 2-3 months
            </li>
            <li>
              PPP is not your fault, and recovery includes rebuilding the parent-child bond, which is
              absolutely possible
            </li>
            <li>
              If you or someone you know shows PPP symptoms: Call 911 immediately. Do not wait. This
              is a life-threatening emergency.
            </li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
