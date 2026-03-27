 
// ============================================================================
// Category 18 --- Women's Mental Health | Subcategory 02a
// Perinatal and Postpartum Mental Health (Articles 11-15)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
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
    readTime: 12,
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
    ],

    content: (
      <>
        <p>
          At 28 weeks pregnant, Maya couldn't remember the last time she felt excited about the
          baby. Everyone asked if she was "so happy," and Maya said yes---because what kind of
          person feels nothing but dread about their wanted pregnancy? <Citation index={1} /> The
          exhaustion felt bottomless. Sleep brought no rest. She cried for hours and couldn't
          explain why. When her midwife asked about mood at a routine appointment, Maya finally
          broke down: "I don't think I can do this." The midwife nodded knowingly. "You're
          describing perinatal depression. Let's get you help."
        </p>

        <StatCard
          value="10-20%"
          label="of pregnant people experience depression during pregnancy"
          description="Perinatal depression is one of the most common complications of pregnancy, yet remains underdiagnosed and undertreated."
        />

        <h2>Recognizing Depression During Pregnancy</h2>
        <p>
          Perinatal depression---depression during pregnancy---is distinct from typical pregnancy
          discomforts or mood swings. <Citation index={2} /> Symptoms include persistent sadness
          or emptiness lasting most of the day for two weeks or more, loss of interest in
          activities previously enjoyed (including preparing for baby), excessive anxiety or worry
          about the pregnancy or baby's health, difficulty bonding with or feeling connected to
          the pregnancy, sleep disturbances beyond normal pregnancy insomnia, appetite changes or
          disordered eating, difficulty concentrating or making decisions, feelings of
          worthlessness or guilt, and thoughts of self-harm or that the pregnancy was a mistake.
        </p>
        <p>
          Many people delay seeking help because they feel ashamed---pregnancy is "supposed to" be
          joyful, and depression feels like ingratitude or evidence of being unfit for parenthood.
          This stigma is dangerous. Depression during pregnancy is a medical condition caused by
          biological, psychological, and social factors---not a personal failing or choice. Risk
          factors include history of depression or anxiety, lack of social support, unplanned or
          ambivalent pregnancy, pregnancy complications, and major life stressors.
        </p>

        <ArticleCallout
          type="warning"
          title="Why Perinatal Depression Matters"
          content="Untreated depression during pregnancy carries significant risks. For the pregnant person: increased risk of preterm labor, poor prenatal care adherence, substance use, and suicidal ideation. For the baby: preterm birth, low birth weight, and developmental delays. For the postpartum period: 2-3 times higher risk of postpartum depression. Treatment is not optional---it's essential healthcare."
        />

        <h2>Treatment Safety and Effectiveness</h2>
        <p>
          <Citation index={3} /> The question is not whether to treat perinatal depression, but
          how to treat it safely. For mild to moderate depression, psychotherapy alone---
          particularly cognitive-behavioral therapy (CBT) and interpersonal therapy (IPT)---is
          highly effective and carries no medication risks. These therapies help identify negative
          thought patterns, improve coping skills, strengthen relationships, and prepare for
          postpartum transition.
        </p>
        <p>
          For moderate to severe depression, medication may be necessary. Multiple antidepressants
          have extensive safety data in pregnancy: sertraline (Zoloft) and escitalopram (Lexapro)
          are often first-line choices due to robust safety profiles; fluoxetine (Prozac) and
          citalopram (Celexa) also have good safety evidence. Bupropion (Wellbutrin) is sometimes
          used when SSRIs are ineffective. The key is that untreated severe depression poses
          greater risks than most antidepressants. Decisions should be made collaboratively with a
          provider knowledgeable about perinatal psychiatry.
        </p>

        <StatCard
          value="30-40%"
          label="increased risk of preterm birth with untreated perinatal depression"
          description="The stress hormones and inflammation associated with depression directly affect pregnancy outcomes, making treatment a medical necessity."
        />

        <h2>Building a Support Plan</h2>
        <p>
          Treatment works best when combined with practical and emotional support. This includes
          identifying specific people who can help with practical tasks (meals, appointments,
          household support), educating partners or family about perinatal depression to reduce
          judgment and increase empathy, joining perinatal mental health support groups where
          experiences are normalized, planning for postpartum mental health care (since perinatal
          depression increases postpartum depression risk), and practicing self-compassion---
          recognizing that depression is not your fault and seeking help demonstrates strength,
          not weakness.
        </p>
        <p>
          Prenatal care should include routine depression screening---not just once, but each
          trimester, as risk increases throughout pregnancy. If your provider doesn't screen for
          mental health, ask for it. Effective screening tools include the Edinburgh Postnatal
          Depression Scale (also valid during pregnancy despite the name) and the Patient Health
          Questionnaire (PHQ-9). Early identification and treatment significantly improve outcomes.
        </p>

        <ArticleCallout
          type="tip"
          title="Talking to Your Provider"
          content="You don't need to be in crisis to seek help. If mood symptoms interfere with daily life, bonding with pregnancy, or self-care, tell your provider. Useful phrases: 'I'm not feeling like myself,' 'I'm worried about depression,' 'I need mental health support during pregnancy.' If a provider dismisses your concerns, advocate for yourself or seek a different provider---you deserve comprehensive care."
        />
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
    readTime: 11,
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
    ],

    content: (
      <>
        <p>
          Three weeks after giving birth, Lauren sat in the dark nursery at 3 AM, baby finally
          asleep in her arms, and sobbed silently. She loved her daughter desperately---and also
          felt crushed by the weight of keeping this tiny human alive. <Citation index={1} />
          Friends who visited exclaimed how "natural" she looked as a mother. Lauren felt like a
          fraud, certain she was failing at every turn. When she finally told her partner, "I
          think something is wrong with me," he said, "You're just tired. All new moms feel this
          way." But this felt like more than tiredness. This felt like drowning.
        </p>

        <StatCard
          value="15-20%"
          label="of new parents experience postpartum depression"
          description="PPD is one of the most common complications of childbirth, more common than gestational diabetes or preeclampsia."
        />

        <h2>Baby Blues vs. Postpartum Depression</h2>
        <p>
          The "baby blues" affect 50-80% of new parents in the first 3-5 days postpartum.{' '}
          <Citation index={2} /> Symptoms include mood swings, tearfulness, anxiety, difficulty
          sleeping, and feeling overwhelmed. Baby blues are caused by dramatic hormonal shifts
          after delivery and typically resolve on their own within two weeks. No treatment is
          needed, though support and rest help.
        </p>
        <p>
          Postpartum depression is different: symptoms persist beyond two weeks, worsen over time,
          and significantly interfere with functioning. PPD includes persistent sadness or
          emptiness, severe anxiety or panic attacks, difficulty bonding with or feeling detached
          from baby, intrusive thoughts about harm to baby or self, excessive worry about baby's
          health or one's own parenting ability, sleep disturbances beyond normal new parent
          exhaustion, appetite changes or disordered eating, irritability or anger, feelings of
          worthlessness or being a bad parent, and thoughts of self-harm or that baby would be
          better off without you.
        </p>

        <ArticleCallout
          type="warning"
          title="When to Seek Immediate Help"
          content="Contact your provider or crisis services immediately if you experience: thoughts of harming yourself or your baby, hallucinations or delusions, severe agitation or confusion, inability to care for yourself or baby. These may indicate postpartum psychosis (rare but medical emergency) or severe PPD requiring urgent intervention."
        />

        <h2>Understanding Risk and Causes</h2>
        <p>
          <Citation index={3} /> Postpartum depression results from biological, psychological,
          and social factors. Biological causes include dramatic hormone shifts (estrogen and
          progesterone drop 90% within 24 hours of delivery), thyroid dysfunction (common
          postpartum), and sleep deprivation affecting neurotransmitter function. Psychological
          factors include identity transition and loss of pre-baby self, history of depression or
          anxiety, traumatic or difficult birth experience, and unrealistic expectations about
          motherhood. Social factors include lack of practical and emotional support, relationship
          stress, financial strain, and cultural pressures to be a "perfect mother."
        </p>
        <p>
          People at higher risk include those with personal or family history of depression, PPD
          with previous pregnancies, depression or anxiety during current pregnancy, lack of
          social support, major life stressors, pregnancy or birth complications, and premature or
          medically fragile babies. However, PPD can affect anyone---even those with no risk
          factors and deeply wanted pregnancies.
        </p>

        <StatCard
          value="50%"
          label="of postpartum depression cases go undiagnosed and untreated"
          description="Many people don't recognize PPD symptoms or feel too ashamed to seek help, leading to prolonged suffering and worse outcomes."
        />

        <h2>Evidence-Based Treatment</h2>
        <p>
          Effective PPD treatment typically combines multiple approaches. Psychotherapy,
          particularly cognitive-behavioral therapy (CBT) and interpersonal therapy (IPT), helps
          identify negative thought patterns, develop coping strategies, improve relationships, and
          process identity transition. Therapy can be done individually or in PPD support groups.
        </p>
        <p>
          For moderate to severe PPD, medication is often necessary and highly effective. Multiple
          antidepressants are safe during breastfeeding: sertraline (Zoloft), paroxetine (Paxil),
          and escitalopram (Lexapro) have minimal infant exposure. Newer options include
          brexanolone (Zulresso), a rapid-acting IV medication for severe PPD administered in
          healthcare settings, and zuranolone (Zurzuvae), the first oral medication specifically
          FDA-approved for PPD. Practical support---help with baby care, household tasks, and sleep
          ---is essential but not sufficient alone for clinical PPD.
        </p>

        <ArticleCallout
          type="tip"
          title="Overcoming Barriers to Treatment"
          content="Common barriers include: 'I should be able to handle this alone' (PPD is a medical condition requiring treatment, like diabetes), 'Medication means I'm weak' (medication corrects chemical imbalances---it's medical treatment, not weakness), 'I can't take medication if breastfeeding' (many antidepressants are safe for breastfeeding), 'Getting help means I'm a bad mother' (getting help makes you a better parent by ensuring your own wellbeing)."
        />
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
