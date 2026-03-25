 
// ============================================================================
// Category 18 — Women's Mental Health | Subcategory 02b
// Perinatal and Postpartum Mental Health (Articles 16-20)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';

export const articles: Article[] = [
  // ==========================================================================
  // Article 16: Pregnancy After Loss
  // ==========================================================================
  {
    id: catId(16),
    slug: 'pregnancy-after-loss-navigating-fear-hope-and-complicated-emotions',
    title: `Pregnancy After Loss: Navigating Fear, Hope, and Complicated Emotions`,
    description: `Understand the unique psychological challenges of pregnancy after miscarriage, stillbirth, or infant loss, including managing anxiety and honoring both grief and hope.`,
    image: '/images/articles/cat18/cover-016.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Pregnancy After Loss', 'Grief', 'Anxiety', 'Rainbow Pregnancy'],

    summary: `Pregnancy after loss—whether from miscarriage, stillbirth, or infant death—brings complex emotions: hope mixed with terror, joy shadowed by trauma, and difficulty bonding due to fear of another loss. Up to 40% of people pregnant after loss experience clinically significant anxiety or depression. Common challenges include hypervigilance about fetal movement, difficulty celebrating pregnancy milestones, survivor's guilt, and feeling unable to discuss fears without seeming ungrateful. Support requires acknowledging both grief for the lost baby and hope for the current pregnancy—these emotions coexist and both are valid.`,

    keyFacts: [
      {
        text: `30-40% of people experience clinically significant anxiety or depression during pregnancy after loss.`,
        citationIndex: 1,
      },
      {
        text: `Pregnancy after loss is often called "rainbow pregnancy"—beauty after a storm—but the metaphor can minimize ongoing grief and fear.`,
        citationIndex: 2,
      },
      {
        text: `Trauma-informed prenatal care that acknowledges loss history significantly reduces anxiety and improves bonding outcomes.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The understanding that you can simultaneously grieve one baby and hope for another—these are not conflicting emotions but the reality of holding both loss and possibility in a heart stretched wide by love.`,

    practicalExercise: {
      title: `Holding Both Grief and Hope`,
      steps: [
        {
          title: `Name your fears`,
          description: `Write what you're afraid of in this pregnancy. Naming fears reduces their power and helps distinguish realistic concerns from anxiety spirals.`,
        },
        {
          title: `Honor both babies`,
          description: `Find a way to acknowledge your lost baby while connecting with this pregnancy—separate journals, a ritual, or simply saying both names. You don't have to choose between them.`,
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
    ],

    content: (
      <>
        <p>
          When the ultrasound showed a heartbeat at 8 weeks, Kendra felt numb instead of joyful.
          Her previous pregnancy had ended at 10 weeks—she couldn't let herself believe this one
          would be different. <Citation index={1} /> Each prenatal appointment brought panic, not
          excitement. She checked for bleeding constantly, counted every symptom as proof of
          impending loss, and couldn't bring herself to tell anyone she was pregnant. When friends
          asked if she was "so excited," Kendra lied. The truth—that she was terrified—felt like
          tempting fate or dishonoring the baby. But the fear was suffocating.
        </p>

        <StatCard
          value="30-40%"
          label="of people experience significant anxiety during pregnancy after loss"
          description="Pregnancy after loss is not a simple 'fresh start'—it's a complex emotional experience requiring specific support and understanding."
        />

        <h2>The Psychological Landscape of Pregnancy After Loss</h2>
        <p>
          Pregnancy after loss exists in the tension between hope and terror. Unlike first
          pregnancies marked by innocent excitement, pregnancy after loss carries the knowledge
          that pregnancy doesn't guarantee a baby. <Citation index={2} /> Common psychological
          experiences include hypervigilance (constant monitoring of symptoms, fetal movement,
          bleeding; difficulty trusting that baby is okay between appointments), delayed bonding
          (protecting oneself from attachment due to fear of another loss; feeling emotionally
          distant from the pregnancy), milestone anxiety (each milestone that passed before
          previous loss triggers intense fear; difficulty celebrating achievements like viability
          or third trimester), and survivor's guilt (questioning why this pregnancy continues when
          the previous one didn't; feeling disloyal to the lost baby by hoping for this one).
        </p>
        <p>
          Social isolation compounds these challenges. People may delay pregnancy announcements,
          avoid baby preparation, or withdraw from pregnant friends whose excitement feels
          inaccessible. Well-meaning comments like "At least you can get pregnant!" or "This one
          will be fine!" minimize both the previous loss and current fear. Many describe feeling
          unable to express anxiety without seeming ungrateful or pessimistic.
        </p>

        <ArticleCallout
          type="info"
          title="Rainbow Pregnancy: Beautiful but Complicated"
          content="'Rainbow baby' refers to a baby born after loss—beauty after a storm. While the metaphor honors hope, it can inadvertently minimize ongoing grief. A rainbow doesn't erase the storm. Pregnancy after loss involves both grief for the baby who died and hope for the baby who may live. Both emotions are real, valid, and can coexist."
        />

        <h2>Managing Anxiety and Trauma</h2>
        <p>
          <Citation index={3} /> Pregnancy after loss can trigger or worsen trauma symptoms,
          especially as pregnancy progresses past the point of previous loss. People may
          experience flashbacks to discovering the loss, intrusive thoughts about another loss
          occurring, physical anxiety symptoms (racing heart, nausea, panic) at appointments or
          ultrasounds, and avoidance of pregnancy-related activities that feel too hopeful or
          risky.
        </p>
        <p>
          Helpful coping strategies include grounding techniques when anxiety spikes (5-4-3-2-1
          sensory grounding, deep breathing, progressive muscle relaxation), realistic reassurance
          (distinguishing between anxiety-based fears and actual warning signs; working with
          providers on appropriate monitoring without excessive testing that feeds anxiety),
          scheduled "worry time" (designating 15-20 minutes daily to process fears, then
          practicing redirecting anxious thoughts outside that window), and connection with
          pregnancy-after-loss support communities where fears are normalized, not dismissed.
        </p>

        <StatCard
          value="Milestone anxiety"
          label="peaks at the gestation of previous loss"
          description="As pregnancy approaches and passes the point of previous loss, anxiety often intensifies. This is normal and predictable—not a sign that something is wrong."
        />

        <h2>Trauma-Informed Prenatal Care</h2>
        <p>
          Healthcare providers can significantly reduce distress through trauma-informed care.
          Helpful approaches include acknowledging loss history at every appointment (not just
          intake), allowing extra ultrasounds or monitoring when medically appropriate for
          reassurance, offering appointments on days that feel safer (e.g., weekly rather than
          monthly in early pregnancy), providing direct, clear information without minimizing fears
          or offering false reassurance, and respecting decisions about birth planning that relate
          to previous trauma (e.g., elective cesarean after stillbirth, continuous fetal
          monitoring).
        </p>
        <p>
          Unhelpful provider responses include "Don't worry, lightning doesn't strike twice"
          (statistically false and dismissive), "You need to relax or you'll stress the baby"
          (adds guilt to anxiety), focusing only on current pregnancy without acknowledging the
          lost baby, or treating anxiety as irrational rather than understandable trauma response.
          If providers can't offer trauma-informed care, it's appropriate to seek different
          providers who understand pregnancy after loss.
        </p>

        <ArticleCallout
          type="tip"
          title="Honoring Both Babies"
          content="You don't have to choose between grieving your lost baby and hoping for this one. Some find it helpful to: keep photos or mementos of the lost baby visible during current pregnancy, use different journals or memory boxes for each baby, celebrate the lost baby's due date or remembrance day even while pregnant, or simply speak both babies' names. Love isn't a finite resource—your heart is big enough for both."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 17: Perinatal OCD
  // ==========================================================================
  {
    id: catId(17),
    slug: 'perinatal-ocd-intrusive-thoughts-and-compulsive-safety-behaviors',
    title: `Perinatal OCD: Intrusive Thoughts and Compulsive Safety Behaviors`,
    description: `Understand perinatal obsessive-compulsive disorder, distinguish it from normal worry, and learn about exposure-based treatments that reduce obsessions and compulsions.`,
    image: '/images/articles/cat18/cover-017.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
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
        text: `Intrusive thoughts about harm in perinatal OCD are ego-dystonic (unwanted, distressing, opposite of desires)—very different from psychotic delusions.`,
        citationIndex: 2,
      },
      {
        text: `Exposure and Response Prevention (ERP) therapy achieves 60-80% symptom reduction in perinatal OCD.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The liberation of learning that horrifying intrusive thoughts are a symptom of how much you care about your baby's safety—not a sign of danger—and that you don't have to perform rituals or avoid triggers to keep your baby safe.`,

    practicalExercise: {
      title: `Recognizing OCD Patterns`,
      steps: [
        {
          title: `Identify the cycle`,
          description: `Notice: obsession (intrusive thought) → anxiety spike → compulsion (safety behavior) → temporary relief → obsession returns. This cycle maintains OCD.`,
        },
        {
          title: `Distinguish OCD from reality`,
          description: `Ask: Is this thought distressing and unwanted (OCD)? Or is this something I actually want to do (not OCD)? Perinatal OCD thoughts are ego-dystonic—opposite of desires.`,
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
    ],

    content: (
      <>
        <p>
          Every time Rachel held her newborn son, an image flashed through her mind: dropping him
          down the stairs. She would freeze in terror, then immediately put him down and check his
          body for injuries—even though she hadn't actually dropped him. <Citation index={1} />
          The thought felt like a premonition, a warning that she was dangerous. She stopped
          carrying him near stairs, then near any hard surfaces, then avoided holding him while
          standing. She spent hours googling "postpartum psychosis" and "thoughts about harming
          baby," terrified she was becoming dangerous. When a therapist explained perinatal OCD,
          Rachel cried with relief: she wasn't psychotic or evil—she had a treatable anxiety
          disorder.
        </p>

        <StatCard
          value="2-9%"
          label="of perinatal people develop OCD during pregnancy or postpartum"
          description="Perinatal OCD is often undiagnosed because people are afraid to disclose disturbing thoughts, fearing they'll be seen as dangerous or have their baby taken away."
        />

        <h2>Understanding Perinatal OCD</h2>
        <p>
          Perinatal OCD is characterized by obsessions (intrusive, unwanted thoughts, images, or
          urges) and compulsions (repetitive behaviors or mental acts performed to reduce anxiety
          from obsessions). <Citation index={2} /> Common perinatal obsessions include harm
          obsessions (thoughts or images of accidentally or intentionally harming baby—dropping,
          shaking, suffocating, stabbing, or sexually abusing baby), contamination obsessions
          (excessive fear of germs, chemicals, or toxins harming baby), symmetry or "just right"
          obsessions (needing things arranged perfectly or rituals performed correctly to keep
          baby safe), and unwanted sexual or religious obsessions (thoughts that feel blasphemous
          or perverted).
        </p>
        <p>
          Common compulsions include checking (repeatedly checking baby's breathing, locks,
          appliances, or that no harm occurred), cleaning or washing (excessive sterilization,
          handwashing, or avoiding "contaminated" objects), reassurance-seeking (repeatedly asking
          others "I wouldn't hurt my baby, right?" or googling symptoms), mental rituals (counting,
          praying, or repeating phrases to prevent harm), and avoidance (avoiding knives, stairs,
          bathtubs, or being alone with baby). Compulsions temporarily reduce anxiety but
          ultimately maintain the OCD cycle.
        </p>

        <ArticleCallout
          type="warning"
          title="Perinatal OCD vs. Postpartum Psychosis"
          content="Perinatal OCD and postpartum psychosis are completely different. In OCD, intrusive thoughts are ego-dystonic (unwanted, distressing, opposite of desires), insight is intact (person knows thoughts are irrational), and there's no intention to act on thoughts. In psychosis, delusions are ego-syntonic (believed to be true), insight is impaired, and there may be intent to act. If you're terrified by your thoughts, that's OCD. If you believe your thoughts are true commands, that's psychosis—seek emergency care."
        />

        <h2>Why Perinatal OCD Develops</h2>
        <p>
          <Citation index={3} /> Several factors contribute to perinatal OCD onset. Hormonal
          changes (estrogen and progesterone fluctuations affect serotonin, the neurotransmitter
          implicated in OCD), heightened sense of responsibility (becoming a parent creates
          intense awareness of baby's vulnerability, making harm-related thoughts more salient and
          distressing), sleep deprivation (worsens OCD symptoms and makes it harder to dismiss
          intrusive thoughts), and pre-existing vulnerability (history of OCD, anxiety disorders,
          or subclinical OCD symptoms that worsen under perinatal stress).
        </p>
        <p>
          The cruel irony of perinatal OCD is that it affects people who deeply care about their
          baby's safety. The more you value your baby's wellbeing, the more distressing intrusive
          harm thoughts become, and the more compulsions you perform to prevent harm. OCD
          essentially weaponizes your love for your child against you. Understanding this helps
          reduce shame: intrusive thoughts are a symptom of caring too much, not caring too little.
        </p>

        <StatCard
          value="60-80%"
          label="symptom reduction with ERP therapy for perinatal OCD"
          description="Exposure and Response Prevention is the gold-standard treatment for OCD, helping people learn that intrusive thoughts are not dangerous and compulsions are unnecessary."
        />

        <h2>Treatment: Exposure and Response Prevention</h2>
        <p>
          The most effective treatment for perinatal OCD is Exposure and Response Prevention
          (ERP), a specialized form of cognitive-behavioral therapy. ERP involves two components:
          exposure (gradually, systematically confronting feared situations or thoughts—e.g., being
          near stairs while holding baby, or intentionally thinking the intrusive thought) and
          response prevention (refraining from compulsions that provide temporary relief—no
          checking, reassurance-seeking, or avoidance).
        </p>
        <p>
          ERP teaches the brain that intrusive thoughts are not dangerous, predictions don't come
          true, and anxiety decreases on its own without compulsions. While counterintuitive,
          facing fears without performing safety behaviors breaks the OCD cycle. Treatment is
          typically 12-20 sessions and can be done while pregnant or postpartum. Medication
          (SSRIs, particularly sertraline, fluoxetine, or fluvoxamine) can augment therapy,
          especially for severe OCD. Many SSRIs are safe during pregnancy and breastfeeding.
        </p>

        <ArticleCallout
          type="tip"
          title="Finding the Right Therapist"
          content="Not all therapists are trained in ERP. Helpful questions to ask: 'Do you specialize in OCD treatment using Exposure and Response Prevention?', 'Have you treated perinatal OCD specifically?', 'What does ERP look like for harm obsessions?' If a therapist offers only talk therapy or reassurance, they may not have OCD-specific training. Organizations like the International OCD Foundation (IOCDF) have provider directories."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 18: Tokophobia (Fear of Childbirth)
  // ==========================================================================
  {
    id: catId(18),
    slug: 'tokophobia-understanding-and-treating-fear-of-childbirth',
    title: `Tokophobia: Understanding and Treating Fear of Childbirth`,
    description: `Explore tokophobia (pathological fear of childbirth), distinguish it from normal birth anxiety, and learn about therapeutic interventions that reduce fear and support birth decision-making.`,
    image: '/images/articles/cat18/cover-018.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Tokophobia', 'Birth Fear', 'Childbirth', 'Maternal Request Cesarean'],

    summary: `Tokophobia is pathological fear of childbirth, affecting 6-14% of pregnant people. Primary tokophobia occurs in people who have never given birth; secondary tokophobia develops after traumatic birth experiences. Symptoms include severe anxiety or panic about labor, avoidance of pregnancy despite wanting children, termination of wanted pregnancy due to fear, and requests for elective cesarean to avoid labor. Tokophobia is distinct from normal birth anxiety—it's debilitating and interferes with reproductive decisions. Treatment includes psychoeducation, cognitive-behavioral therapy, birth trauma processing (for secondary tokophobia), and respectful discussion of birth options including maternal request cesarean.`,

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
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The validation that extreme fear of childbirth is not cowardice or weakness but a specific phobia deserving of treatment—and that choosing how you give birth based on what feels safest to you is not "giving up" but exercising bodily autonomy.`,

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
    ],

    content: (
      <>
        <p>
          At 32 weeks pregnant, Emma had her fifth panic attack this month. The thought of labor
          made her physically ill—not normal nervousness, but visceral terror. <Citation
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
          content="Most pregnant people experience some anxiety about birth—this is normal and adaptive, motivating preparation. Tokophobia is different: fear is severe (7-10 on intensity scale), persistent (not just occasional worry), interferes with functioning (avoiding prenatal care, unable to bond with pregnancy, terminating wanted pregnancy), and doesn't respond to reassurance or education. If fear is debilitating, it warrants treatment."
        />

        <h2>Impact on Pregnancy and Birth</h2>
        <p>
          <Citation index={3} /> Tokophobia significantly affects pregnancy experiences and
          outcomes. During pregnancy, people may delay or avoid prenatal care (fear of
          appointments discussing labor), difficulty bonding with baby (emotional detachment as
          self-protection), severe anxiety or depression, and hyperemesis or other physical
          symptoms potentially exacerbated by extreme stress. Some terminate wanted pregnancies
          due to unbearable fear of childbirth—a devastating outcome of untreated tokophobia.
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
          pain management options, and statistics can reduce fear based on misinformation—though
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
    title: `Postpartum Rage: Understanding Anger and Irritability After Birth`,
    description: `Explore postpartum rage as a symptom of perinatal mood disorders, understand its triggers, and learn strategies for managing intense anger while protecting relationships.`,
    image: '/images/articles/cat18/cover-019.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Postpartum Rage', 'Anger', 'Irritability', 'Postpartum Mood'],

    summary: `Postpartum rage—intense, disproportionate anger or irritability—affects up to 40% of postpartum people but is rarely discussed. Rage manifests as explosive anger at partner or other children, intrusive thoughts of throwing or hitting things, verbal outbursts, and feeling out of control. Rage is often a symptom of postpartum depression, anxiety, or trauma, driven by hormonal shifts, sleep deprivation, overwhelm, and unmet needs. It's not a character flaw or evidence of being a bad parent—it's a symptom requiring treatment. Managing rage involves addressing underlying mood disorders, practical support, anger management skills, and couples therapy to repair relationships.`,

    keyFacts: [
      {
        text: `Up to 40% of postpartum people experience episodes of intense rage or irritability, though it's underreported due to shame.`,
        citationIndex: 1,
      },
      {
        text: `Postpartum rage is commonly a symptom of depression, anxiety, or PTSD—not a standalone diagnosis but a signal that treatment is needed.`,
        citationIndex: 2,
      },
      {
        text: `Sleep deprivation, unmet needs, and hormonal fluctuations contribute to rage by lowering distress tolerance and increasing reactivity.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The relief of learning that postpartum rage is not proof you're a terrible parent but a symptom of an overwhelmed nervous system desperately signaling that something needs to change—and that you deserve support, not shame.`,

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
    ],

    content: (
      <>
        <p>
          When her partner asked "What's for dinner?" for the third night in a row without
          offering to cook, something snapped in Nadia. She felt white-hot rage—a fury so intense
          she wanted to throw the plate at the wall. <Citation index={1} /> Instead, she screamed,
          shocking both of them. Later, when the baby wouldn't stop crying at 2 AM, the rage
          returned: intrusive thoughts of shaking her, images of throwing the bassinet. Nadia was
          horrified. She loved her daughter desperately—where was this violent anger coming from?
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
          symptom of depression—particularly in people socialized to express distress as anger
          rather than sadness. The cultural narrative of postpartum depression as only sadness and
          tearfulness means rage-predominant presentations are often missed.
        </p>

        <ArticleCallout
          type="warning"
          title="Rage vs. Postpartum Psychosis"
          content="Postpartum rage (even intense) is different from postpartum psychosis. Rage involves anger in response to triggers (sleep deprivation, partner behavior, crying baby), with intact reality testing and no intent to harm baby. Psychosis involves delusions, hallucinations, and loss of reality contact. If you have intrusive violent thoughts that distress you, that's likely rage or OCD. If you believe violent thoughts are commands you should follow, that's psychosis—seek emergency care."
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
          that something fundamental is unsustainable—it's a desperate alarm bell, not a character
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
          (splash cold water on face, squeeze ice cubes, do jumping jacks—activating body helps
          regulate nervous system), and wait until regulated before engaging with partner or
          returning to baby. You cannot parent effectively while in rage—temporarily stepping away
          is responsible, not neglectful.
        </p>
        <p>
          Longer-term treatment addresses root causes. Screen for and treat underlying postpartum
          depression, anxiety, or PTSD—rage often diminishes when mood disorders are treated.
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
          content="Telling your provider 'I'm experiencing postpartum rage' helps them understand what you're facing. Describe frequency, intensity, triggers, and whether it's accompanied by depression or anxiety. If you fear judgment, try: 'I'm having intense anger episodes that feel out of control. I need help managing this.' You're not alone—many providers now recognize rage as a common postpartum symptom deserving of compassionate care."
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
    title: `Partner Perinatal Mental Health: Supporting Non-Birthing Parents`,
    description: `Understand mental health challenges facing partners during pregnancy and postpartum, including paternal/partner depression, anxiety, and the unique barriers to seeking support.`,
    image: '/images/articles/cat18/cover-020.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Partner Mental Health', 'Paternal Depression', 'Non-Birthing Parent', 'Couples'],

    summary: `Perinatal mental health challenges affect partners too—not just birthing parents. Paternal/partner postpartum depression affects 8-10% of fathers and non-birthing partners, with anxiety even more common. Risk factors include partner's depression, relationship conflict, financial stress, and lack of support. Unique challenges for partners include feeling helpless or inadequate, being expected to be "the strong one," having mental health needs dismissed, and lacking access to screening or services. Untreated partner depression affects couple relationship, parenting, and child development. Partners deserve screening, support, and treatment—not just as supports for birthing parents but for their own wellbeing.`,

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

    sparkMoment: `The recognition that partners' mental health matters not just instrumentally (so they can support the birthing parent) but intrinsically—they are also becoming parents, also experiencing massive life transition, and also deserve care.`,

    practicalExercise: {
      title: `Partner Mental Health Check-In`,
      steps: [
        {
          title: `Assess your own symptoms`,
          description: `Check: persistent sadness or emptiness, irritability or anger, withdrawal from baby or partner, loss of interest in activities, sleep or appetite changes, feeling inadequate as parent. If multiple symptoms persist, consider evaluation.`,
        },
        {
          title: `Challenge "strong one" narrative`,
          description: `Notice beliefs like "I need to hold it together for my partner" or "My struggles don't matter compared to theirs." Your mental health matters—period.`,
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
          motions—diaper changes, bottle prep, rocking her to sleep—but felt disconnected, like
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
          diagnosis—depression presenting as anger may be labeled as relationship problem or
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
          predictor is birthing partner's depression—when one partner is depressed, the other's
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
          content="If you're struggling: 1) Tell your primary care provider 'I'm experiencing symptoms of postpartum depression' (yes, use that term even if you didn't give birth), 2) Seek therapists who work with new fathers/partners specifically, 3) Join online support communities for non-birthing parents, 4) If your partner is also struggling, advocate for couples therapy and individual treatment for both of you. Your mental health is not a luxury—it's essential for your wellbeing and your family's health."
        />
      </>
    ),
  },
];
