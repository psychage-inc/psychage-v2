 
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
    readTime: 12,
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
        <p>
          At 36 weeks pregnant, Tessa couldn't sleep---not because of physical discomfort, but
          because her mind raced with catastrophic scenarios. What if the cord wrapped around the
          baby's neck? What if she didn't make it to the hospital in time? What if she made a
          mistake during labor that hurt the baby? <Citation index={1} /> She counted kicks
          obsessively, called her doctor multiple times a week with health fears, and googled
          every pregnancy symptom at 2 AM. Her partner said it was normal to worry, but Tessa
          knew this felt different---suffocating, uncontrollable, consuming every waking moment.
        </p>

        <StatCard
          value="15-20%"
          label="of perinatal people experience clinically significant anxiety"
          description="Perinatal anxiety is as common as perinatal depression but receives far less attention and recognition in prenatal and postpartum care."
        />

        <h2>Forms of Perinatal Anxiety</h2>
        <p>
          Perinatal anxiety takes several forms. Generalized anxiety disorder involves excessive,
          uncontrollable worry about multiple topics---baby's health, labor complications, ability
          to be a good parent, finances, relationships. <Citation index={2} /> The worry is
          persistent (most days for at least two weeks), difficult to control, and accompanied by
          physical symptoms like restlessness, fatigue, difficulty concentrating, irritability,
          muscle tension, and sleep disturbance.
        </p>
        <p>
          Panic disorder involves sudden, intense panic attacks: racing or pounding heart, trouble
          breathing or feeling like choking, chest pain, dizziness, nausea, sweating, trembling,
          and intense fear of losing control or dying. Postpartum panic attacks often occur during
          nighttime feedings or when alone with baby. Health anxiety (illness anxiety disorder)
          focuses specifically on fears about baby's health---excessive googling, frequent
          unnecessary doctor visits, inability to be reassured despite normal test results.
          Specific phobias related to pregnancy or childbirth (tokophobia, covered in Article 18)
          can also emerge or worsen during the perinatal period.
        </p>

        <ArticleCallout
          type="info"
          title="Normal Worry vs. Perinatal Anxiety"
          content="New parents commonly worry about baby's wellbeing---this is adaptive and helps ensure infant safety. Perinatal anxiety is different: worries are excessive (constant, worst-case scenarios), persistent (dominate most of the day), uncontrollable (can't turn off the worry), and interfering (prevent sleep, bonding, or enjoying moments with baby). If worry causes significant distress or disrupts functioning, it warrants professional evaluation."
        />

        <h2>Intrusive Thoughts and Harm Obsessions</h2>
        <p>
          <Citation index={3} /> A particularly distressing feature of perinatal anxiety is
          intrusive thoughts---unwanted, disturbing mental images or thoughts that pop into
          awareness unbidden. Common examples include images of accidentally dropping or harming
          baby, thoughts about baby dying from SIDS or choking, visualizing car accidents or other
          disasters, or intrusive thoughts about intentionally harming baby (despite having no
          desire to do so).
        </p>
        <p>
          These thoughts are terrifying and often lead to intense shame: "What kind of mother
          thinks these things? Am I dangerous? Should I not be alone with my baby?" The truth is
          that intrusive thoughts are extremely common---up to 90% of new parents experience them.
          They are a symptom of anxiety, not a reflection of desires or predictions. People who
          have intrusive thoughts about harm are at no increased risk of acting on them. In fact,
          the extreme distress these thoughts cause indicates how much the person values their
          baby's safety.
        </p>

        <StatCard
          value="90%"
          label="of new parents experience intrusive thoughts about harm to their baby"
          description="Intrusive thoughts are normal brain activity, not dangerous desires. The distress they cause is what distinguishes anxiety from actual intent to harm."
        />

        <h2>Treatment and Management</h2>
        <p>
          Cognitive-behavioral therapy (CBT) is first-line treatment for perinatal anxiety. CBT
          helps identify anxious thought patterns (catastrophizing, overestimating danger), test
          the accuracy of fears through behavioral experiments, develop coping strategies for
          managing physical anxiety symptoms, and reduce avoidance behaviors that maintain anxiety.
          For intrusive thoughts specifically, exposure and response prevention (ERP)---a form of
          CBT---helps people learn that thoughts are not dangerous and don't need to be controlled
          or avoided.
        </p>
        <p>
          Medication may be necessary for severe anxiety or when therapy alone is insufficient.
          Selective serotonin reuptake inhibitors (SSRIs) like sertraline effectively treat
          anxiety and are safe during pregnancy and breastfeeding. Benzodiazepines (like lorazepam
          or clonazepam) provide rapid relief during acute panic but carry dependency risks and
          are generally reserved for short-term use. Buspirone is another option for generalized
          anxiety. Medication decisions should be made collaboratively with a perinatal
          psychiatrist or knowledgeable provider.
        </p>

        <ArticleCallout
          type="tip"
          title="Self-Help Strategies for Perinatal Anxiety"
          content="While professional treatment is often necessary, these strategies can help: 1) Limit information seeking---set boundaries on googling symptoms or asking for reassurance, 2) Practice grounding techniques when anxiety spikes, 3) Challenge catastrophic thoughts by asking 'What's the evidence?' and 'What's more likely?', 4) Build in designated 'worry time'---15 minutes daily to process worries, then practice redirecting thoughts outside that window, 5) Prioritize sleep---sleep deprivation dramatically worsens anxiety."
        />
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
    ],

    content: (
      <>
        <p>
          When people asked about her birth, Simone said, "It was hard, but baby is healthy"---the
          only acceptable answer. She didn't mention the 38 hours of labor, the emergency
          cesarean without adequate explanation, the feeling of being held down and cut open while
          terrified. <Citation index={1} /> She didn't mention that she couldn't look at her scar
          without reliving the surgery, or that nighttime brought flashbacks of the operating
          room. Three months postpartum, she still felt numb when holding her daughter---loving her
          in theory but feeling disconnected. When a therapist asked, "Do you think you
          experienced trauma during birth?" Simone finally allowed herself to say yes.
        </p>

        <StatCard
          value="25-35%"
          label="of birthing people describe their birth as traumatic"
          description="Birth trauma is common but rarely discussed. Most trauma is not acknowledged or treated, leading to prolonged suffering and impacts on bonding and mental health."
        />

        <h2>Understanding Birth Trauma</h2>
        <p>
          Birth trauma is defined not by objective medical facts but by subjective
          experience---specifically, feeling terrified, powerless, or lacking control during labor
          and delivery. <Citation index={2} /> Births can be medically uncomplicated yet
          psychologically traumatic if the person felt dismissed, violated, or helpless. Common
          traumatic elements include medical emergencies (hemorrhage, emergency cesarean, NICU
          admission, fetal distress), physical experiences (severe pain, tearing, feeling cut or
          violated), lack of informed consent or having procedures performed without explanation,
          feeling powerless or that one's voice was ignored, being alone or unsupported during
          frightening moments, and witnessing or believing baby was in danger.
        </p>
        <p>
          Some births involve clear medical crises; others are traumatic because of how care was
          delivered---being coerced into interventions, having one's concerns dismissed, or
          experiencing rough or disrespectful treatment. Medical staff may not recognize a birth
          as traumatic because outcomes were good ("healthy baby, successful delivery"). But
          trauma resides in the nervous system's response to perceived threat, not in outcome.
          People whose trauma is dismissed often internalize guilt: "I should just be grateful."
        </p>

        <ArticleCallout
          type="warning"
          title="Trauma vs. Disappointment"
          content="Not all difficult births are traumatic. Disappointment that birth didn't go as planned (e.g., wanting unmedicated birth but needing epidural) is different from trauma. Disappointment involves grief for lost expectations; trauma involves terror, powerlessness, and nervous system dysregulation. Both deserve support, but trauma requires specific therapeutic intervention."
        />

        <h2>Postpartum PTSD Symptoms</h2>
        <p>
          <Citation index={3} /> Postpartum PTSD involves four symptom clusters. Intrusive
          symptoms include unwanted, distressing memories or flashbacks of the birth, nightmares
          about birth or harm to baby, and intense psychological or physical distress when
          reminded of birth. Avoidance involves avoiding thoughts or conversations about the
          birth, staying away from hospitals or medical settings, and difficulty bonding with baby
          (if baby is a reminder of trauma).
        </p>
        <p>
          Negative changes in mood and cognition include inability to remember important aspects
          of the birth, negative beliefs about oneself ("I failed," "I was weak"), persistent
          guilt or shame, diminished interest in activities, and feeling detached from others or
          emotionally numb. Hyperarousal symptoms include hypervigilance (excessive monitoring of
          baby, constant fear of medical emergencies), exaggerated startle response, difficulty
          sleeping, and irritability or angry outbursts. Symptoms must persist for more than one
          month and significantly impair functioning.
        </p>

        <StatCard
          value="3-6%"
          label="of birthing people develop full postpartum PTSD"
          description="While 25-35% experience birth trauma, 3-6% meet full diagnostic criteria for PTSD. All trauma deserves support---not just cases meeting clinical thresholds."
        />

        <h2>Impact and Recovery</h2>
        <p>
          Birth trauma affects multiple domains. Parent-infant bonding can be disrupted if baby
          reminds the parent of trauma or if emotional numbing prevents connection. Breastfeeding
          may be difficult if it triggers flashbacks or feels like another loss of bodily
          autonomy. Sexual intimacy often suffers due to physical reminders of birth and ongoing
          sense of violation. Future pregnancy decisions are influenced---some avoid pregnancy
          entirely due to fear, others feel compelled to "try again" for a healing birth.
        </p>
        <p>
          Treatment for postpartum PTSD includes trauma-focused therapies specifically designed to
          process traumatic memories. EMDR (Eye Movement Desensitization and Reprocessing) uses
          bilateral stimulation to help the brain reprocess traumatic memories, reducing their
          emotional intensity. Trauma-focused CBT helps identify and challenge trauma-related
          beliefs, gradually confront avoided reminders, and develop coping strategies. Both
          therapies are highly effective for PTSD and can be adapted for postpartum context.
          Medication (typically SSRIs) may supplement therapy for severe symptoms.
        </p>

        <ArticleCallout
          type="tip"
          title="Supporting Yourself After Birth Trauma"
          content="1) Seek providers who specialize in perinatal trauma---not all therapists have this training, 2) Don't rush processing---immediate postpartum focus on safety and stabilization; trauma work can wait until you're ready, 3) Connect with birth trauma support communities, 4) Consider a 'birth story' session with a doula or therapist to process what happened, 5) If planning future pregnancies, work with trauma-informed OB/midwives who understand trigger management."
        />
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
    readTime: 11,
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
    ],

    content: (
      <>
        <p>
          On day three postpartum, Jessica's partner found her standing over the bassinet at 4
          AM, staring at their sleeping daughter. "I can hear them," Jessica whispered. "They're
          telling me she's not really ours. That we need to protect her from the demons." She
          hadn't slept in 48 hours. <Citation index={1} /> Her mood swung wildly from euphoric
          ("We're chosen! This baby is special!") to terrified ("Something terrible is coming").
          When her partner gently suggested calling the doctor, Jessica became agitated: "You
          don't understand---they'll take her away!" Her partner called 911. By that evening,
          Jessica was in a psychiatric unit, beginning treatment for postpartum psychosis.
        </p>

        <StatCard
          value="1-2 per 1,000"
          label="births result in postpartum psychosis"
          description="PPP is rare but represents a psychiatric emergency with serious risk of harm to parent or infant if untreated. Early intervention is critical."
        />

        <h2>Recognizing Postpartum Psychosis</h2>
        <p>
          Postpartum psychosis is distinct from postpartum depression or anxiety---it is a
          psychotic illness, characterized by loss of contact with reality. <Citation index={2} />
          Core symptoms include hallucinations (seeing or hearing things that aren't there, often
          voices making commands or comments about baby), delusions (false beliefs, commonly that
          baby is possessed, in danger, or has special powers; or that the parent has special
          mission or is being persecuted), severe confusion or disorientation (not knowing where
          one is, what day it is, or who baby is), and disorganized thinking or speech (jumping
          between topics, making no sense).
        </p>
        <p>
          Additional symptoms include extreme and rapidly changing mood (euphoric one moment,
          despairing the next), severe agitation or restlessness, paranoia or intense suspicion,
          bizarre or dangerous behavior, complete lack of insight that something is wrong, and
          inability to sleep even when exhausted. Onset is typically abrupt---within the first two
          weeks postpartum, often in the first 72 hours. This rapid onset distinguishes PPP from
          postpartum depression, which develops more gradually.
        </p>

        <ArticleCallout
          type="warning"
          title="This Is a Medical Emergency"
          content="Postpartum psychosis requires immediate psychiatric hospitalization. It is not something that will improve with rest or support. Risks include infanticide (harming baby based on delusional beliefs) and suicide. If you or someone you know shows signs of postpartum psychosis, call 911 or go to the nearest emergency room immediately. Do not leave the person alone with the baby."
        />

        <h2>Risk Factors and Prevention</h2>
        <p>
          <Citation index={3} /> The strongest risk factor for postpartum psychosis is bipolar
          disorder---up to 50% of people with bipolar disorder who give birth will develop PPP
          without preventive treatment. Other major risk factors include previous postpartum
          psychosis (nearly 100% recurrence risk without prevention), schizoaffective disorder,
          family history of postpartum psychosis or bipolar disorder, and first-time pregnancy
          (though PPP can occur with any pregnancy).
        </p>
        <p>
          People with these risk factors should work with a perinatal psychiatrist to create a
          prevention and monitoring plan before delivery. Preventive strategies include starting
          or continuing mood stabilizers throughout pregnancy and postpartum, beginning
          antipsychotic medication immediately postpartum (even before symptoms emerge), intensive
          sleep protection (ensuring adequate sleep in the early postpartum weeks, as sleep
          deprivation triggers psychosis), and close monitoring with frequent psychiatric check-
          ins in the first month postpartum. Prevention dramatically reduces PPP risk even in
          high-risk individuals.
        </p>

        <StatCard
          value="50%"
          label="of people with bipolar disorder develop postpartum psychosis without prevention"
          description="This extraordinarily high risk makes prevention planning essential for anyone with bipolar disorder who is pregnant or planning pregnancy."
        />

        <h2>Treatment and Recovery</h2>
        <p>
          Treatment for postpartum psychosis requires psychiatric hospitalization---ideally in a
          specialized mother-baby unit where parent and infant can stay together while parent
          receives care. Medications include antipsychotics (such as olanzapine, quetiapine, or
          haloperidol) to treat hallucinations and delusions, mood stabilizers (lithium or
          valproate) for mood symptoms and to prevent recurrence, and benzodiazepines for
          agitation and to promote sleep.
        </p>
        <p>
          In severe cases or when medication response is slow, electroconvulsive therapy (ECT) is
          highly effective and safe postpartum. Most people begin to improve within days to weeks
          of treatment, with full recovery typically within 2-3 months. However, medication is
          usually continued for at least a year to prevent relapse. With proper treatment, 95% of
          people recover fully from postpartum psychosis. Unfortunately, risk of recurrence in
          future pregnancies is high (up to 90%), making prevention planning essential for
          subsequent births.
        </p>

        <ArticleCallout
          type="tip"
          title="After Recovery: Processing the Experience"
          content="Recovery from PPP involves both medical stabilization and psychological healing. Many people experience shame, guilt about thoughts or behaviors during psychosis, grief over missed bonding time, and fear about future pregnancies. Therapy can help process these emotions. Know that actions during psychosis were symptoms of illness, not reflections of your character or love for your baby. Full recovery and healthy parent-child relationships are absolutely possible."
        />
      </>
    ),
  },
];
