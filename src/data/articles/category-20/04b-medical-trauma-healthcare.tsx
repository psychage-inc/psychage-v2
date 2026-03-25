 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_CHRONIC_ILLNESS_PAIN, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  ComparisonTable,
  ArticleTabs,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

// ============================================================================
// Subcategory 4b — Medical Trauma and Healthcare Experiences | Articles 39–42
// ============================================================================

export const medicalTraumaHealthcareArticlesB: Article[] = [
  // --------------------------------------------------------------------------
  // CIP-039 | Pediatric Medical Trauma: How Hospital Experiences Affect Children
  // --------------------------------------------------------------------------
  {
    id: catId(39),
    slug: 'pediatric-medical-trauma-how-hospital-experiences-affect-children',
    title: 'Pediatric Medical Trauma: How Hospital Experiences Affect Children',
    description:
      'Research-based exploration of how hospitalizations, procedures, and medical environments affect children psychologically. Understand the signs of pediatric medical traumatic stress and evidence-based approaches for prevention and recovery.',
    image: '/images/articles/cat20/cover-039.svg',
    category: CATEGORY_CHRONIC_ILLNESS_PAIN,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Pediatric Trauma', 'Medical Trauma', 'Child Psychology', 'Hospital Anxiety', 'PTSS'],

    summary:
      'Children who undergo hospitalizations, surgeries, or repeated medical procedures can develop lasting psychological effects that shape their relationship with healthcare for decades. Pediatric medical traumatic stress (PMTS) is now recognized as a distinct clinical phenomenon affecting up to 80% of hospitalized children at some level of distress. Unlike adult patients who can contextualize medical necessity, young children often interpret invasive procedures through a lens of threat and helplessness. This article examines the research on how hospital experiences imprint on developing minds, why some children are more vulnerable than others, and what evidence-based interventions — from child life programs to trauma-informed pediatric care — can meaningfully reduce long-term psychological harm.',

    keyFacts: [
      { text: 'Up to 80% of children and their families report some level of traumatic stress following hospitalization or serious medical events', citationIndex: 1 },
      { text: 'Approximately 15-25% of children develop persistent post-traumatic stress symptoms after medical procedures', citationIndex: 2 },
      { text: 'Children under age 7 are particularly vulnerable because they cannot fully understand the purpose of painful procedures', citationIndex: 3 },
      { text: 'Child life specialist interventions reduce procedural distress by up to 50% in pediatric settings', citationIndex: 4 },
      { text: 'Medical trauma in childhood is associated with healthcare avoidance and delayed treatment-seeking in adulthood', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'A child does not distinguish between pain that helps and pain that harms. To them, a needle is a needle. Our responsibility is not to eliminate fear — it is to ensure that no child faces medical experiences without the protection of understanding, preparation, and compassionate presence.',

    practicalExercise: {
      title: 'Pre-Procedure Preparation Toolkit for Parents',
      steps: [
        { title: 'Use honest, age-appropriate language', description: 'Explain what will happen using concrete terms the child can understand. Avoid vague reassurances like "it won\'t hurt" when it will. Instead, try: "You will feel a pinch that lasts about five seconds, and then it will be done."' },
        { title: 'Practice coping strategies in advance', description: 'Teach your child one or two coping techniques before the appointment — deep belly breathing, squeezing a comfort object, or counting to ten. Practice together at home so the technique feels familiar.' },
        { title: 'Create a comfort plan', description: 'Ask your child what would help them feel safer: a favorite stuffed animal, a specific song on headphones, holding your hand, or watching a video during the procedure. Write it down together as their "brave plan."' },
        { title: 'Debrief gently afterward', description: 'After the experience, give your child space to talk about what happened. Validate their feelings without dismissing them. "That was hard. You did something really brave even though you were scared" acknowledges both the difficulty and their courage.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Child\'s Emotional Recovery',
    },

    citations: [
      { id: '1', text: 'Pediatric medical traumatic stress: A comprehensive review of the literature', source: 'Journal of Pediatric Psychology', year: '2022', link: 'https://doi.org/10.1093/jpepsy/jsac045', tier: 1 },
      { id: '2', text: 'Prevalence of post-traumatic stress symptoms in children following hospitalization: A meta-analysis', source: 'European Journal of Psychotraumatology', year: '2023', link: 'https://doi.org/10.1080/20008066.2023.2178762', tier: 1 },
      { id: '3', text: 'Developmental considerations in pediatric medical traumatic stress', source: 'Clinical Child and Family Psychology Review', year: '2021', link: 'https://doi.org/10.1007/s10567-021-00360-0', tier: 1 },
      { id: '4', text: 'Child life interventions in pediatric healthcare: A systematic review and meta-analysis', source: 'Pediatrics', year: '2023', link: 'https://doi.org/10.1542/peds.2022-059819', tier: 1 },
      { id: '5', text: 'Childhood medical trauma and adult healthcare avoidance: A longitudinal cohort study', source: 'Health Psychology', year: '2022', link: 'https://doi.org/10.1037/hea0001198', tier: 1 },
      { id: '6', text: 'The D-E-F protocol: A framework for preventing pediatric medical traumatic stress', source: 'National Child Traumatic Stress Network', year: '2023', link: 'https://www.nctsn.org/resources/pediatric-medical-traumatic-stress-toolkit', tier: 2 },
      { id: '7', text: 'Trauma-informed care in pediatric settings: Implementation guidelines', source: 'American Academy of Pediatrics', year: '2023', link: 'https://doi.org/10.1542/peds.2023-061410', tier: 2 },
      { id: '8', text: 'Parent distress and child outcomes in pediatric medical trauma: Mediating pathways', source: 'Journal of Clinical Child & Adolescent Psychology', year: '2021', link: 'https://doi.org/10.1080/15374416.2021.1923020', tier: 1 },
      { id: '9', text: 'Play therapy and procedural preparation in pediatric hospitals: Current evidence', source: 'Children and Youth Services Review', year: '2022', link: 'https://doi.org/10.1016/j.childyouth.2022.106723', tier: 1 },
      { id: '10', text: 'Coping with childhood medical procedures: Guidelines for parents and caregivers', source: 'American Psychological Association', year: '2023', link: 'https://www.apa.org/topics/children/medical-procedures', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            For most adults, a blood draw is an inconvenience. For a four-year-old, it can be a moment
            of profound terror — an experience where strangers hold you down, a sharp object pierces
            your skin, and the people who are supposed to protect you stand by and let it happen.
            The difference between these two experiences is not maturity. It is cognitive development,
            and it matters enormously when we consider how hospital experiences shape children.
          </p>
          <p className="mb-6">
            Pediatric medical traumatic stress (PMTS) refers to the set of psychological and
            physiological responses that children and their families can develop following medical
            events — from a single emergency room visit to years of treatment for chronic
            illness<Citation id="1" index={1} />. Research now shows that up to 80% of hospitalized
            children and their families experience some degree of traumatic
            stress<Citation id="1" index={1} />, and while most recover naturally, a significant
            minority — between 15% and 25% — develop persistent symptoms that interfere with
            daily functioning, school performance, and future healthcare
            engagement<Citation id="2" index={2} />.
          </p>
          <p className="mb-6">
            This is not a question of children being weak or parents being overprotective. It is a
            question of how developing brains process experiences that involve pain, loss of control,
            and separation from safety. Understanding this process is the first step toward building
            medical environments where healing the body does not come at the cost of harming the mind.
          </p>
        </div>

        <h2 id="what-makes-medical-experiences-traumatic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Makes Medical Experiences Traumatic for Children
        </h2>
        <p className="mb-6">
          Trauma, in the clinical sense, is not defined by the severity of the event itself but by
          the person's subjective experience of threat and helplessness. For children, medical settings
          can activate every element of the trauma response: unfamiliar environments, physical pain,
          loss of bodily autonomy, separation from caregivers, and a fundamental inability to
          understand why this is happening<Citation id="3" index={3} />.
        </p>
        <p className="mb-6">
          Children under age seven are especially vulnerable because their cognitive development does
          not yet allow them to fully grasp concepts like "this will help you get better" or "the pain
          is temporary." To a three-year-old, a needle is simply something that hurts. There is no
          mitigating context. The brain registers the experience as a genuine threat, and the
          fight-or-flight response activates accordingly — often manifesting as screaming, thrashing,
          freezing, or later, nightmares and behavioral regression<Citation id="3" index={3} />.
        </p>

        <ArticleCallout type="key-takeaway" title="The Trauma Is in the Experience, Not the Event">
          <p>
            A routine vaccination can be traumatic for one child and unremarkable for another. The
            determining factor is not the medical procedure itself but the child's subjective experience
            of it — how much control they felt, whether they were prepared, whether a trusted adult
            was present, and how their distress was responded to in the moment. This means that even
            minor procedures deserve thoughtful preparation.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Research identifies several factors that increase a child's vulnerability to medical
          trauma: younger age, prior traumatic experiences, pre-existing anxiety, high parental
          distress during the event, inadequate preparation, and the use of physical restraint
          during procedures<Citation id="8" index={8} />. Conversely, protective factors include
          strong parent-child attachment, clear and honest preparation, the presence of a calm
          caregiver, and access to child life specialists who can help the child understand and
          cope with what is happening<Citation id="4" index={4} />.
        </p>

        <h2 id="recognizing-pediatric-medical-traumatic-stress" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Pediatric Medical Traumatic Stress
        </h2>
        <p className="mb-6">
          PMTS does not always look the way adults expect. While some children display obvious signs
          of distress — nightmares, crying at the mention of doctors, refusing to enter medical
          buildings — others internalize their responses in ways that can be easy to miss. A child
          who becomes unusually quiet, withdraws from activities, develops new fears unrelated to
          medicine, or begins regressing to earlier developmental behaviors may be processing
          medical trauma without anyone recognizing it<Citation id="2" index={2} />.
        </p>

        <ArticleTabs tabs={[
          {
            label: 'Preschool (2-5 years)',
            content: (
              <div className="space-y-3">
                <p className="font-medium text-gray-900 dark:text-white">Common signs of medical traumatic stress in young children:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Regression to earlier behaviors — bedwetting, thumb-sucking, baby talk</li>
                  <li>Increased separation anxiety and clinginess</li>
                  <li>Repetitive play that reenacts medical procedures</li>
                  <li>New fears of the dark, monsters, or being alone</li>
                  <li>Sleep disturbances, nightmares, or refusal to sleep alone</li>
                  <li>Tantrums that are more intense or frequent than before</li>
                </ul>
              </div>
            ),
          },
          {
            label: 'School-Age (6-12 years)',
            content: (
              <div className="space-y-3">
                <p className="font-medium text-gray-900 dark:text-white">Common signs in school-age children:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Avoidance of anything related to hospitals, doctors, or medical topics</li>
                  <li>Difficulty concentrating at school or declining academic performance</li>
                  <li>Physical complaints (stomachaches, headaches) with no medical explanation</li>
                  <li>Irritability, aggression, or withdrawal from friends</li>
                  <li>Reluctance to discuss the medical experience or extreme distress when reminded</li>
                  <li>Guilt or self-blame ("I got sick because I was bad")</li>
                </ul>
              </div>
            ),
          },
          {
            label: 'Adolescent (13-18 years)',
            content: (
              <div className="space-y-3">
                <p className="font-medium text-gray-900 dark:text-white">Common signs in adolescents:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Emotional numbness or detachment from peers and family</li>
                  <li>Risk-taking behavior or substance use as a coping mechanism</li>
                  <li>Refusal to attend medical appointments or follow treatment plans</li>
                  <li>Body image concerns, especially after surgeries or visible medical changes</li>
                  <li>Depression, anxiety, or signs of post-traumatic stress disorder</li>
                  <li>Anger directed at parents, doctors, or the healthcare system</li>
                </ul>
              </div>
            ),
          },
        ]} />

        <p className="mb-6">
          The National Child Traumatic Stress Network has developed the D-E-F protocol — Distress,
          Emotional Support, and Family — as a screening framework that can be integrated into
          routine pediatric care<Citation id="6" index={6} />. The protocol encourages healthcare
          providers to assess distress levels throughout the medical encounter, provide emotional
          support tailored to the child's developmental stage, and engage the family as active
          partners in the child's psychological safety.
        </p>

        <h2 id="the-parent-factor" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Parent Factor: How Caregiver Distress Shapes Outcomes
        </h2>
        <p className="mb-6">
          One of the most consistent findings in pediatric medical trauma research is that a parent's
          emotional response during and after medical events significantly predicts the child's
          psychological outcome<Citation id="8" index={8} />. Children are remarkably attuned to
          their caregivers' emotional states. When a parent is visibly terrified, the child's brain
          interprets this as confirmation that the situation is dangerous — regardless of what
          anyone is saying.
        </p>
        <p className="mb-6">
          This does not mean parents should suppress all emotion or pretend to be calm when they are
          not. Children can detect inauthenticity, and forced cheerfulness can be confusing. Instead,
          the research suggests that the most protective parental behavior is what psychologists
          call "regulated presence" — acknowledging the difficulty while communicating that you are
          there, that you can handle this, and that the child is not
          alone<Citation id="8" index={8} />.
        </p>

        <StatCard
          value="50%"
          label="Reduction in procedural distress"
          description="When child life specialist interventions are implemented in pediatric settings"
          citation="Pediatrics, 2023"
        />

        <p className="mb-6">
          Studies show that parental distress operates as a mediating pathway: when parents receive
          support and preparation themselves, their reduced anxiety translates directly into better
          outcomes for their children<Citation id="8" index={8} />. This is why the most effective
          pediatric trauma prevention programs target the entire family system, not just the child
          in isolation.
        </p>

        <h2 id="evidence-based-interventions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Interventions That Work
        </h2>
        <p className="mb-6">
          The field of pediatric medical trauma prevention has produced several interventions with
          strong evidence behind them. Child life specialist programs, now standard in many
          children's hospitals, use therapeutic play, procedural preparation, and emotional support
          to reduce distress by up to 50%<Citation id="4" index={4} />. These professionals are
          trained to translate medical language into age-appropriate explanations, teach coping
          strategies, and serve as the child's advocate throughout the healthcare experience.
        </p>
        <p className="mb-6">
          Therapeutic play is one of the most effective tools for both preparation and
          recovery<Citation id="9" index={9} />. When children can play with medical equipment,
          practice procedures on dolls, or draw pictures of their experiences, they gain a sense
          of mastery over situations that otherwise feel entirely out of their control. This is
          not distraction — it is active cognitive processing through the medium that children
          understand best.
        </p>

        <ArticleAccordion items={[
          {
            title: 'Procedural preparation programs',
            content: (
              <p>
                Age-appropriate explanations delivered before medical procedures reduce anxiety and
                improve cooperation. Effective preparation includes sensory information (what the child
                will see, hear, smell, and feel), honest descriptions of discomfort, and active
                rehearsal of coping strategies. Research shows that preparation is most effective
                when delivered one to seven days before the procedure, giving the child time to
                process without forgetting.
              </p>
            ),
          },
          {
            title: 'Comfort positioning over restraint',
            content: (
              <p>
                Modern pediatric guidelines emphasize comfort positioning — holding children in
                secure, supported positions on a parent's lap rather than using physical restraint.
                Restraint significantly increases the risk of medical traumatic stress, while comfort
                positioning reduces distress and often improves procedural success rates because the
                child is calmer and more cooperative.
              </p>
            ),
          },
          {
            title: 'Trauma-focused cognitive behavioral therapy (TF-CBT)',
            content: (
              <p>
                For children who develop persistent post-traumatic stress symptoms, TF-CBT is the
                most well-supported intervention. It helps children process traumatic memories,
                develop coping skills, and gradually reduce avoidance of medical settings. The therapy
                includes parents in the process, teaching them how to support their child's recovery
                and manage their own distress.
              </p>
            ),
          },
          {
            title: 'Technology-assisted interventions',
            content: (
              <p>
                Virtual reality, interactive apps, and video-based preparation programs are emerging
                as effective tools for reducing pediatric medical anxiety. VR environments can
                familiarize children with hospital settings before they arrive, and interactive apps
                can teach coping strategies in a game-like format that feels natural to digital-native
                children.
              </p>
            ),
          },
        ]} />

        <h2 id="long-term-consequences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Long-Term Consequences: When Childhood Medical Trauma Goes Unaddressed
        </h2>
        <p className="mb-6">
          The effects of pediatric medical trauma do not always stay in childhood. Longitudinal
          research demonstrates that unresolved medical traumatic stress in childhood predicts
          healthcare avoidance in adulthood — adults who experienced traumatic medical events as
          children are significantly more likely to delay seeking medical care, skip preventive
          screenings, and discontinue treatment
          prematurely<Citation id="5" index={5} />.
        </p>
        <p className="mb-6">
          This creates a dangerous feedback loop: the person who most needs consistent medical care
          because of a childhood condition is the same person whose early experiences make engaging
          with healthcare feel threatening. Dental phobia, needle phobia, and white coat syndrome
          in adults frequently trace back to specific childhood medical experiences that were never
          adequately processed<Citation id="5" index={5} />.
        </p>
        <p className="mb-6">
          The American Academy of Pediatrics now recommends that trauma-informed principles be
          integrated into all pediatric care settings — not just emergency departments or oncology
          units<Citation id="7" index={7} />. This means recognizing that every medical encounter
          with a child is an opportunity to either build trust in the healthcare system or erode it.
          The procedures will be forgotten, but the feelings will be remembered.
        </p>

        <h2 id="building-trauma-informed-pediatric-care" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building Trauma-Informed Pediatric Care
        </h2>
        <p className="mb-6">
          Trauma-informed pediatric care is not a specific program but a philosophy that reshapes
          how every interaction with a child patient is approached<Citation id="7" index={7} />.
          It starts with a fundamental question: "How can we accomplish this medical goal while
          preserving this child's sense of safety and dignity?" This does not mean avoiding
          necessary procedures. It means approaching them with the same level of planning and
          sensitivity that we would apply to any other aspect of clinical care.
        </p>
        <p className="mb-6">
          Key elements include giving children choices wherever possible (which arm for the blood
          draw, sitting up or lying down), using language that communicates what will happen rather
          than commanding compliance, involving parents as active comforters rather than bystanders,
          and following up after difficult procedures to acknowledge the child's
          experience<Citation id="10" index={10} />.
        </p>
        <p className="mb-6">
          Perhaps most importantly, trauma-informed care means recognizing that a child's resistance
          is not defiance — it is communication. When a child screams, kicks, or tries to run, they
          are saying "I am afraid." The clinical response to fear should never be force. It should
          be understanding, preparation, and when possible, patience. The few extra minutes spent
          preparing a child for a procedure often save far more time than is lost to distress and
          resistance — and they protect something that no amount of medical expertise can repair
          once it is broken: a child's trust that the adults around them will keep them safe.
        </p>

        <QuoteBlock
          quote="Children do not have the luxury of understanding medical necessity. They only understand medical experience. Our job is to make that experience as safe as possible — not just physically, but emotionally."
          author="Dr. Nancy Kassam-Adams"
          role="Pediatric Psychologist"
          source="Pediatric medical traumatic stress research"
        />
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // CIP-040 | The Psychology of Waiting for Test Results: Managing Medical Uncertainty
  // --------------------------------------------------------------------------
  {
    id: catId(40),
    slug: 'the-psychology-of-waiting-for-test-results-managing-medical-uncertainty',
    title: 'The Psychology of Waiting for Test Results: Managing Medical Uncertainty',
    description:
      'Explore why waiting for medical test results produces intense anxiety and learn evidence-based strategies for managing uncertainty. Understand the cognitive science behind fear of the unknown and practical tools for coping during the waiting period.',
    image: '/images/articles/cat20/cover-040.svg',
    category: CATEGORY_CHRONIC_ILLNESS_PAIN,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Medical Anxiety', 'Uncertainty Tolerance', 'Test Results', 'Coping Strategies', 'Health Anxiety'],

    summary:
      'The period between a medical test and receiving results is one of the most psychologically taxing experiences in healthcare, yet it receives remarkably little clinical attention. Research reveals that waiting for test results can produce anxiety levels comparable to the diagnosis itself, with many people reporting disrupted sleep, impaired concentration, intrusive thoughts, and significant emotional distress during the waiting period. This phenomenon, sometimes called "scanxiety" in oncology settings, is rooted in fundamental features of human cognition: our brains are wired to resolve uncertainty, and when resolution is impossible, the threat-detection system remains perpetually activated. This article examines the cognitive science of medical uncertainty, why some people find the wait more distressing than others, and practical evidence-based strategies for managing the psychological burden of not yet knowing.',

    keyFacts: [
      { text: 'Up to 87% of patients report significant anxiety while waiting for medical test results', citationIndex: 1 },
      { text: 'The anxiety of waiting for results can equal or exceed the distress of receiving a negative diagnosis', citationIndex: 2 },
      { text: 'People with lower intolerance of uncertainty show significantly better coping during medical waiting periods', citationIndex: 3 },
      { text: 'Catastrophic thinking during the waiting period is the strongest predictor of psychological distress, more than the actual risk level', citationIndex: 4 },
      { text: 'Structured mindfulness interventions reduce waiting-period anxiety by approximately 30-40%', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'The waiting room is not just a physical space — it is a psychological one. And unlike the doctor who will eventually call with results, you are the only person who can furnish that inner waiting room with something other than catastrophe. You cannot speed up the clock. But you can choose what you do with the time inside it.',

    practicalExercise: {
      title: 'The Uncertainty Management Protocol',
      steps: [
        { title: 'Schedule your worry', description: 'Set aside 15 minutes twice a day as your designated "worry time." During this period, allow yourself to think about the results, write down your fears, and sit with the discomfort. Outside of this window, gently redirect anxious thoughts with the phrase: "I have time set aside for that."' },
        { title: 'Ground yourself in the present', description: 'When intrusive thoughts about results arise, use the 5-4-3-2-1 technique: name five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste. This activates your sensory cortex and interrupts the rumination loop.' },
        { title: 'Prepare a response plan', description: 'Write down two brief plans: one for good news and one for difficult news. Include your next steps, who you would call, and one kind thing you would do for yourself in each scenario. Having a plan reduces the terror of the unknown by giving your brain something concrete to hold onto.' },
        { title: 'Move your body daily', description: 'Commit to at least 20 minutes of physical movement each day during the waiting period. Walking, swimming, yoga, or any rhythmic activity helps metabolize stress hormones and gives your nervous system a channel for the excess activation that anxiety produces.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Anxiety During the Wait',
    },

    citations: [
      { id: '1', text: 'Prevalence and predictors of anxiety during the medical test waiting period: A systematic review', source: 'Psycho-Oncology', year: '2023', link: 'https://doi.org/10.1002/pon.6051', tier: 1 },
      { id: '2', text: 'The psychological impact of waiting for medical test results: Anxiety levels and coping mechanisms', source: 'Health Psychology Review', year: '2022', link: 'https://doi.org/10.1080/17437199.2022.2074165', tier: 1 },
      { id: '3', text: 'Intolerance of uncertainty and health anxiety: A transdiagnostic model', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102026', tier: 1 },
      { id: '4', text: 'Catastrophizing and the waiting period: Cognitive predictors of distress before medical diagnosis', source: 'Journal of Behavioral Medicine', year: '2023', link: 'https://doi.org/10.1007/s10865-023-00412-6', tier: 1 },
      { id: '5', text: 'Mindfulness-based interventions for medical waiting anxiety: A randomized controlled trial', source: 'Annals of Behavioral Medicine', year: '2022', link: 'https://doi.org/10.1093/abm/kaac042', tier: 1 },
      { id: '6', text: 'Uncertainty in illness: A synthesis of the nursing and medical literature', source: 'Research in Nursing & Health', year: '2021', link: 'https://doi.org/10.1002/nur.22170', tier: 1 },
      { id: '7', text: 'Scanxiety: A concept analysis of anxiety related to cancer surveillance imaging', source: 'Cancer Nursing', year: '2022', link: 'https://doi.org/10.1097/NCC.0000000000001048', tier: 1 },
      { id: '8', text: 'Patient communication and waiting time: Improving the diagnostic experience', source: 'National Institutes of Health', year: '2023', link: 'https://www.nih.gov/news-events/news-releases/reducing-patient-anxiety-test-results', tier: 2 },
      { id: '9', text: 'Acceptance and commitment therapy for health anxiety: Application during medical uncertainty', source: 'Journal of Contextual Behavioral Science', year: '2023', link: 'https://doi.org/10.1016/j.jcbs.2023.04.002', tier: 1 },
      { id: '10', text: 'Coping with medical uncertainty: Resources for patients and families', source: 'American Psychological Association', year: '2023', link: 'https://www.apa.org/topics/health/medical-uncertainty', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You have had the test. The blood has been drawn, the scan has been completed, the biopsy
            has been taken. And now begins what many people describe as the worst part of the entire
            medical experience — not the procedure itself, but the waiting. The hours, days, or
            sometimes weeks that stretch between "we will let you know" and actually knowing.
          </p>
          <p className="mb-6">
            If you have ever found yourself unable to sleep, unable to concentrate, or unable to
            stop your mind from constructing worst-case scenarios while waiting for medical results,
            you are not alone. Research shows that up to 87% of patients report significant anxiety
            during the waiting period<Citation id="1" index={1} />, and for many, this anxiety
            equals or exceeds the distress they would feel upon receiving a difficult
            diagnosis<Citation id="2" index={2} />. This is not a character flaw or a failure of
            willpower. It is a predictable response rooted in how the human brain processes
            uncertainty — and understanding that process is the first step toward managing it.
          </p>
        </div>

        <h2 id="why-uncertainty-is-so-distressing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Uncertainty Is So Distressing to the Human Brain
        </h2>
        <p className="mb-6">
          The human brain evolved to resolve uncertainty as quickly as possible. In ancestral
          environments, ambiguity about whether a rustling bush contained a predator or just wind
          was a matter of life and death. The brain's default response to unresolved uncertainty
          is to treat it as a threat — to keep the amygdala activated, stress hormones circulating,
          and attention focused on the potential danger until the ambiguity is
          resolved<Citation id="3" index={3} />.
        </p>
        <p className="mb-6">
          Medical test results trigger this ancient system with remarkable precision. The question
          "do I have cancer?" or "is my child's condition worsening?" sits in the brain's threat
          detection center like an unresolved alarm. Unlike a tangible threat that you can fight or
          flee from, medical uncertainty offers no action to take. You cannot outrun a pending lab
          result. You cannot fight a diagnosis that does not yet exist. This leaves the nervous
          system in a sustained state of activation with no discharge — the physiological equivalent
          of pressing the gas and brake pedals simultaneously<Citation id="6" index={6} />.
        </p>

        <StatCard
          value="87%"
          label="Of patients report significant anxiety"
          description="While waiting for medical test results, according to systematic review data"
          citation="Psycho-Oncology, 2023"
        />

        <p className="mb-6">
          Neuroimaging studies reveal that uncertainty activates the anterior insula and dorsal
          anterior cingulate cortex — the same brain regions involved in processing physical pain.
          In a very real neurological sense, not knowing hurts. And the longer the uncertainty
          persists, the more the brain escalates its threat response, which is why a three-day
          wait often feels exponentially worse than a three-hour one<Citation id="3" index={3} />.
        </p>

        <h2 id="catastrophic-thinking" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Catastrophic Thinking: The Mind's Default During the Wait
        </h2>
        <p className="mb-6">
          When the brain cannot resolve uncertainty through information, it does the next best
          thing: it guesses. And because the threat detection system is already activated, those
          guesses almost always skew toward the worst possible outcome. This is catastrophic
          thinking — the cognitive tendency to imagine the most devastating result and then treat
          that imagination as though it were already real<Citation id="4" index={4} />.
        </p>
        <p className="mb-6">
          Research identifies catastrophic thinking as the single strongest predictor of
          psychological distress during medical waiting periods — more powerful than the actual
          risk level, the type of test, or the person's prior medical
          history<Citation id="4" index={4} />. A person with a 5% chance of a serious diagnosis
          who catastrophizes will often experience more suffering than someone with a 50% chance
          who does not. The problem is not the probability. The problem is what the mind does with
          it.
        </p>

        <ArticleCallout type="did-you-know" title="Scanxiety: When Surveillance Becomes Suffering">
          <p>
            In oncology, the term "scanxiety" describes the intense anxiety experienced before and
            during surveillance scans that check for cancer recurrence<Citation id="7" index={7} />.
            Studies show that scanxiety can begin days to weeks before the actual scan and does not
            fully resolve until results are received. For cancer survivors who undergo regular
            surveillance for years, this means living with recurring cycles of anticipatory distress
            that can significantly impact quality of life — even when every scan comes back clear.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Catastrophic thinking operates through a well-documented cognitive pattern. First, the
          mind generates the worst-case scenario ("it is cancer"). Then, it selectively attends to
          any information that supports that scenario while dismissing information that contradicts
          it ("that twinge I felt last week must be a symptom"). Next, it projects the catastrophe
          forward in time ("I will need chemotherapy, I will lose my job, my children will grow up
          without me"). Within minutes, the mind has constructed an entire future built on a
          foundation that does not yet exist<Citation id="4" index={4} />.
        </p>
        <p className="mb-6">
          Recognizing this pattern is not about positive thinking or telling yourself everything
          will be fine. It is about seeing the catastrophizing for what it is — a cognitive process,
          not a prophecy. The thought "it might be cancer" is a thought. It is not a diagnosis.
          The ability to hold that distinction, even loosely, is what separates manageable anxiety
          from overwhelming distress.
        </p>

        <h2 id="intolerance-of-uncertainty" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Intolerance of Uncertainty: Why Some People Struggle More
        </h2>
        <p className="mb-6">
          Not everyone finds the waiting period equally unbearable. Research on a trait called
          "intolerance of uncertainty" (IU) helps explain why. People with high IU experience
          ambiguous situations as fundamentally threatening, regardless of the actual probability of
          a negative outcome<Citation id="3" index={3} />. For these individuals, any uncertainty
          feels dangerous — and medical uncertainty, with its life-or-death stakes, can feel
          catastrophic.
        </p>
        <p className="mb-6">
          Intolerance of uncertainty is not a fixed personality trait. It is a cognitive bias that
          can be modified through targeted interventions, particularly cognitive behavioral therapy
          (CBT) and acceptance and commitment therapy (ACT)<Citation id="9" index={9} />. The goal
          of these approaches is not to eliminate uncertainty — that is impossible — but to change
          the person's relationship with it. Instead of "I cannot stand not knowing," the aim is to
          develop the capacity for "I do not yet know, and I can tolerate that."
        </p>

        <ComparisonTable
          headers={['Characteristic', 'Low Intolerance of Uncertainty', 'High Intolerance of Uncertainty']}
          rows={[
            ['Response to ambiguity', 'Uncomfortable but manageable', 'Deeply threatening and overwhelming'],
            ['Cognitive pattern', 'Acknowledges multiple outcomes', 'Fixates on worst-case scenario'],
            ['Information seeking', 'Targeted and bounded', 'Compulsive and escalating'],
            ['Physical symptoms', 'Mild tension or restlessness', 'Insomnia, nausea, panic attacks'],
            ['Functioning during wait', 'Maintained with effort', 'Significantly impaired'],
          ]}
        />

        <h2 id="evidence-based-coping-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Coping Strategies for the Waiting Period
        </h2>
        <p className="mb-6">
          While you cannot eliminate the anxiety of waiting for medical results, research has
          identified several strategies that meaningfully reduce its intensity and
          duration<Citation id="5" index={5} />.
        </p>

        <ProgressSteps steps={[
          {
            title: 'Set boundaries on information seeking',
            description: (
              <span>
                Resist the urge to search your symptoms online during the waiting period. Research
                shows that health-related internet searching during uncertainty almost always increases
                anxiety rather than reducing it. If you need information, write down specific questions
                for your healthcare provider instead.
              </span>
            ),
          },
          {
            title: 'Practice structured mindfulness',
            description: (
              <span>
                Mindfulness interventions have been shown to reduce waiting-period anxiety by 30-40%.
                The key is not to suppress anxious thoughts but to observe them without engaging.
                Even 10 minutes of daily guided meditation can help your nervous system learn that
                uncertainty does not require constant vigilance.
              </span>
            ),
          },
          {
            title: 'Maintain your routine',
            description: (
              <span>
                Anxiety thrives in empty space. Continue going to work, exercising, seeing friends,
                and engaging in activities that give your days structure. This is not avoidance — it
                is giving your brain evidence that your life continues regardless of the pending result.
              </span>
            ),
          },
          {
            title: 'Use scheduled worry periods',
            description: (
              <span>
                Paradoxically, giving yourself permission to worry during designated time slots reduces
                total worry time. Set aside two 15-minute windows per day for focused concern. Outside
                those windows, redirect anxious thoughts gently but firmly.
              </span>
            ),
          },
        ]} />

        <p className="mb-6">
          Acceptance and commitment therapy offers a particularly useful framework for medical
          waiting periods<Citation id="9" index={9} />. Rather than trying to control anxious
          thoughts, ACT teaches people to notice them, name them ("I am having the thought that
          this could be serious"), and then return attention to actions aligned with their values.
          The anxiety is not eliminated, but it is no longer driving behavior. You can be afraid
          and still be present with your family. You can be worried and still do meaningful work.
          The two states can coexist.
        </p>

        <h2 id="what-healthcare-systems-can-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Healthcare Systems Can Do Better
        </h2>
        <p className="mb-6">
          The psychological burden of waiting for results is not entirely the patient's problem to
          solve. Healthcare systems bear significant responsibility for reducing unnecessary
          uncertainty<Citation id="8" index={8} />. Faster turnaround times, clear communication
          about when to expect results, patient portal access that reduces helpless waiting, and
          proactive outreach when results are delayed all represent systemic interventions that
          reduce patient distress without any clinical cost.
        </p>
        <p className="mb-6">
          Some institutions have begun implementing same-day results protocols for certain tests,
          dramatically reducing the waiting window. Others have trained staff to provide patients
          with explicit timelines ("You will receive a call within 72 hours") rather than vague
          promises ("We will be in touch"). These structural changes acknowledge that the waiting
          period is not a neutral pause — it is an active source of psychological harm that
          deserves the same clinical attention as any other aspect of
          care<Citation id="8" index={8} />.
        </p>

        <ArticleCallout type="action-plan" title="If You Are Currently Waiting for Results">
          <ul className="list-disc pl-5 space-y-2">
            <li>Know your timeline — ask your provider exactly when to expect results and how they will be delivered</li>
            <li>Limit yourself to checking your patient portal no more than twice daily</li>
            <li>Tell at least one person you trust that you are waiting — isolation amplifies anxiety</li>
            <li>Move your body every day, even if it is just a 15-minute walk</li>
            <li>If anxiety becomes unmanageable, call your healthcare provider's office — they may be able to expedite results or provide interim reassurance</li>
          </ul>
        </ArticleCallout>

        <h2 id="after-the-results" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          After the Results: Processing Whatever Comes
        </h2>
        <p className="mb-6">
          The waiting ends. The results arrive. And regardless of whether the news is reassuring or
          difficult, most people find that the emotional aftermath requires its own processing.
          Good news does not always bring the relief people expect — sometimes the sustained anxiety
          leaves a residue of hypervigilance that takes weeks to
          dissipate<Citation id="7" index={7} />. Difficult news, while devastating, sometimes
          brings a paradoxical sense of relief because the uncertainty is finally over.
        </p>
        <p className="mb-6">
          Whatever the result, the period after receiving it deserves as much care as the waiting
          period itself. Allow yourself time to absorb the information before making decisions.
          Write down what the provider told you, because anxiety impairs memory. Bring someone
          with you to follow-up appointments. And if the experience of waiting was particularly
          traumatic, consider speaking with a mental health professional who can help you process
          both the medical information and the emotional toll of living in
          uncertainty<Citation id="10" index={10} />.
        </p>

        <QuoteBlock
          quote="The greatest weapon against stress is our ability to choose one thought over another. But during medical uncertainty, the choosing itself becomes the hardest thing we do."
          author="Adapted from William James"
          source="Health Psychology Review, 2022"
        />
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // CIP-041 | Terminal Diagnosis and Mental Health: Finding Meaning at the End
  // --------------------------------------------------------------------------
  {
    id: catId(41),
    slug: 'terminal-diagnosis-and-mental-health-finding-meaning-at-the-end',
    title: 'Terminal Diagnosis and Mental Health: Finding Meaning at the End',
    description:
      'A sensitive, research-based exploration of the psychological dimensions of living with a terminal diagnosis. Examines meaning-making, legacy work, existential distress, and evidence-based therapeutic approaches for end-of-life mental health support.',
    image: '/images/articles/cat20/cover-041.svg',
    category: CATEGORY_CHRONIC_ILLNESS_PAIN,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Terminal Illness', 'End of Life', 'Meaning-Making', 'Palliative Psychology', 'Existential Distress'],

    summary:
      'Receiving a terminal diagnosis confronts a person with the most fundamental human reality — that life ends. The psychological experience of living with the knowledge that time is limited encompasses far more than grief. It involves existential distress, identity reconstruction, relationship renegotiation, and, for many people, a profound search for meaning that can transform the final chapter of life into something unexpectedly purposeful. Research in palliative psychology has demonstrated that targeted mental health interventions — particularly meaning-centered psychotherapy and dignity therapy — significantly reduce depression, hopelessness, and desire for hastened death while improving quality of life and sense of purpose. This article explores the emotional and psychological terrain of terminal diagnosis, not to diminish its devastation, but to illuminate the ways that people find meaning, connection, and even moments of grace when facing the end.',

    keyFacts: [
      { text: 'Up to 50% of people with terminal diagnoses experience clinically significant depression or anxiety', citationIndex: 1 },
      { text: 'Meaning-centered psychotherapy reduces hopelessness and improves spiritual well-being in terminally ill patients', citationIndex: 2 },
      { text: 'Dignity therapy produces a documented legacy that 76% of family members consider a lasting source of comfort', citationIndex: 3 },
      { text: 'Existential distress is distinct from clinical depression and requires different therapeutic approaches', citationIndex: 4 },
      { text: 'Early palliative care that includes psychological support extends survival by an average of 2-3 months in some cancers', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Meaning is not destroyed by mortality. In many ways, it is created by it. The knowledge that time is finite does not empty life of purpose — it concentrates it. Every conversation, every sunrise, every act of love becomes a choice made in full awareness of its preciousness.',

    practicalExercise: {
      title: 'The Legacy Letter Exercise',
      steps: [
        { title: 'Choose your audience', description: 'Select one person you love — a child, partner, friend, or sibling. This letter is for them, written from the deepest and most honest part of who you are.' },
        { title: 'Write what matters most', description: 'Tell them what they have meant to your life. Share a memory that captures something essential about your relationship. Include something you hope they will carry forward — a value, a tradition, a way of seeing the world.' },
        { title: 'Include your wishes for them', description: 'Write about the future you hope they will have. Not instructions or expectations, but genuine wishes — the kind of happiness you hope they will find, the qualities you see in them that will serve them well.' },
        { title: 'Decide what to do with it', description: 'You may choose to share the letter now, to save it for later, or to write it as a process of personal reflection with no obligation to share. The therapeutic value is in the writing itself — the act of distilling what matters most.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect on Your Experience',
    },

    citations: [
      { id: '1', text: 'Prevalence of depression and anxiety in patients with terminal illness: A systematic review and meta-analysis', source: 'Palliative Medicine', year: '2022', link: 'https://doi.org/10.1177/02692163221103081', tier: 1 },
      { id: '2', text: 'Meaning-centered group psychotherapy for patients with advanced cancer: A randomized controlled trial', source: 'Journal of Clinical Oncology', year: '2023', link: 'https://doi.org/10.1200/JCO.22.01975', tier: 1 },
      { id: '3', text: 'Dignity therapy: A novel psychotherapeutic intervention for patients near the end of life', source: 'Journal of Clinical Oncology', year: '2021', link: 'https://doi.org/10.1200/JCO.2021.39.8.856', tier: 1 },
      { id: '4', text: 'Existential distress in patients with advanced illness: Distinguishing demoralization from depression', source: 'Psycho-Oncology', year: '2022', link: 'https://doi.org/10.1002/pon.5923', tier: 1 },
      { id: '5', text: 'Early palliative care for patients with metastatic non-small-cell lung cancer', source: 'New England Journal of Medicine', year: '2020', link: 'https://doi.org/10.1056/NEJMoa2006137', tier: 1 },
      { id: '6', text: 'Clinical practice guidelines for quality palliative care', source: 'National Consensus Project for Quality Palliative Care', year: '2023', link: 'https://www.nationalcoalitionhpc.org/ncp', tier: 2 },
      { id: '7', text: 'Supporting mental health at the end of life: Resources for patients and caregivers', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/end-of-life', tier: 2 },
      { id: '8', text: "Logotherapy and existential analysis in palliative care: Frankl's legacy in modern practice", source: 'American Journal of Hospice and Palliative Medicine', year: '2022', link: 'https://doi.org/10.1177/10499091221089677', tier: 1 },
      { id: '9', text: 'Post-traumatic growth following terminal diagnosis: A qualitative meta-synthesis', source: 'Death Studies', year: '2023', link: 'https://doi.org/10.1080/07481187.2023.2189721', tier: 1 },
      { id: '10', text: 'End-of-life care and mental health: Policy recommendations', source: 'World Health Organization', year: '2023', link: 'https://www.who.int/news-room/fact-sheets/detail/palliative-care', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <ArticleCallout type="warning" title="Crisis Support Resources">
            <p className="mb-3">
              If you or someone you know is experiencing thoughts of suicide or overwhelming
              emotional distress, please reach out for immediate support:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>988 Suicide &amp; Crisis Lifeline</strong>: Call or text <strong>988</strong> (available 24/7)</li>
              <li><strong>Crisis Text Line</strong>: Text <strong>HOME</strong> to <strong>741741</strong></li>
              <li><strong>Veterans Crisis Line</strong>: Call <strong>988</strong>, then press <strong>1</strong></li>
              <li>If you are in immediate danger, call <strong>911</strong> or go to your nearest emergency room</li>
            </ul>
            <p className="mt-3">
              Living with a terminal diagnosis does not mean you must face emotional pain alone.
              Palliative care teams, mental health professionals, and crisis support services
              exist specifically to help during this time.
            </p>
          </ArticleCallout>

          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 mt-8 leading-relaxed">
            There is no preparation for the words "there is nothing more we can do." No amount
            of medical literacy, emotional resilience, or philosophical wisdom fully prepares a
            person for the moment when their diagnosis becomes terminal. And yet, within that
            devastation, something else often begins — a reckoning with what life has meant, what
            still matters, and how the remaining time might be shaped with intention.
          </p>
          <p className="mb-6">
            The psychology of terminal diagnosis is not a story of unrelenting despair, though
            despair is certainly part of it. Research in palliative psychology reveals a far more
            complex picture: one in which grief coexists with gratitude, fear coexists with
            courage, and the search for meaning becomes not a luxury but a psychological
            necessity<Citation id="2" index={2} />. Up to 50% of people with terminal diagnoses
            experience clinically significant depression or anxiety<Citation id="1" index={1} />,
            but targeted interventions can profoundly reduce this suffering while opening space for
            experiences that many people describe as among the most meaningful of their lives.
          </p>
          <p className="mb-6">
            This article approaches the topic of terminal diagnosis and mental health with the
            seriousness and sensitivity it demands. It does not offer platitudes or inspirational
            cliches. It examines what the research tells us about the psychological terrain of
            facing the end of life — and what can genuinely help.
          </p>
        </div>

        <h2 id="the-emotional-landscape" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Emotional Landscape of a Terminal Diagnosis
        </h2>
        <p className="mb-6">
          The emotional response to a terminal diagnosis is not a single event but an unfolding
          process that shifts and deepens over time. In the immediate aftermath, many people
          describe a state of unreality — an inability to absorb what they have been told, as
          though the words were meant for someone else. This dissociative numbness is a protective
          mechanism that allows the psyche to absorb the information gradually rather than all
          at once.
        </p>
        <p className="mb-6">
          As the reality sets in, a spectrum of emotional responses emerges. Anger is common
          and often directed at the disease itself, at the healthcare system, at fate, or at a
          God who allowed it. Profound sadness follows — not just grief for oneself, but grief
          for the people who will be left behind, for the milestones that will be missed, for the
          future that was taken. Fear manifests in many forms: fear of pain, fear of losing
          autonomy, fear of being a burden, and the primal fear of nonexistence
          itself<Citation id="4" index={4} />.
        </p>
        <p className="mb-6">
          What research consistently reveals, however, is that these emotional responses are not
          static. They shift. They coexist. And for many people, they gradually make room for
          other experiences — connection, reflection, generativity, and meaning — that become
          increasingly central as time progresses<Citation id="9" index={9} />.
        </p>

        <h2 id="existential-distress" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Existential Distress: Beyond Depression
        </h2>
        <p className="mb-6">
          One of the most important contributions of palliative psychology has been the
          recognition that existential distress is distinct from clinical
          depression<Citation id="4" index={4} />. A person facing the end of life may
          experience profound sadness, loss of purpose, and a sense that life has become
          meaningless — symptoms that overlap with depression but arise from a fundamentally
          different source. Depression is a disorder of neurochemistry and cognition. Existential
          distress is a response to confronting the finite nature of human existence.
        </p>
        <p className="mb-6">
          This distinction matters because the treatments are different. Antidepressants can
          help when clinical depression accompanies a terminal diagnosis, but they do not address
          the existential questions that keep a person awake at night: "Did my life matter?"
          "What will happen to my family?" "Is there anything after this?" These questions require
          a different kind of therapeutic response — one that takes them seriously as legitimate
          human concerns rather than symptoms to be managed<Citation id="8" index={8} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Existential Distress Untreated',
            points: [
              'Pervasive sense of meaninglessness and purposelessness',
              'Withdrawal from relationships and previously valued activities',
              'Desire for hastened death driven by loss of meaning, not just pain',
              'Inability to identify any positive aspects of remaining life',
              'Intense isolation despite the presence of loved ones',
            ],
          }}
          after={{
            title: 'After Meaning-Centered Intervention',
            points: [
              'Renewed sense of purpose connected to legacy, relationships, or values',
              'Active engagement with loved ones and meaningful activities',
              'Reduced desire for hastened death and improved quality of life',
              'Ability to hold grief and meaning simultaneously',
              'Deeper connection with others through honest emotional expression',
            ],
          }}
        />

        <h2 id="meaning-making-at-the-end" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Meaning-Making at the End: Evidence-Based Approaches
        </h2>
        <p className="mb-6">
          Viktor Frankl, the psychiatrist and Holocaust survivor, argued that the search for
          meaning is the primary human motivation — and that meaning can be found even in the
          most devastating circumstances. His logotherapy framework has been adapted for modern
          palliative care through meaning-centered psychotherapy (MCP), developed by William
          Breitbart at Memorial Sloan Kettering Cancer Center<Citation id="2" index={2} />.
        </p>
        <p className="mb-6">
          MCP is a structured group therapy that helps people with advanced illness explore
          sources of meaning in their lives across four domains: historical meaning (the legacy
          of one's past), attitudinal meaning (how one chooses to face limitations), creative
          meaning (what one can still create or contribute), and experiential meaning (the beauty,
          love, and humor that remain accessible)<Citation id="2" index={2} />. Randomized
          controlled trials demonstrate that MCP significantly reduces hopelessness, improves
          spiritual well-being, and enhances the sense of meaning and peace in people with
          terminal diagnoses.
        </p>

        <StatCard
          value="76%"
          label="Of family members"
          description="Describe the dignity therapy legacy document as a lasting source of comfort after their loved one's death"
          citation="Journal of Clinical Oncology, 2021"
        />

        <p className="mb-6">
          Dignity therapy, developed by Harvey Max Chochinov, takes a different but complementary
          approach<Citation id="3" index={3} />. In dignity therapy, a trained therapist guides
          the patient through a structured interview about their life, their values, the lessons
          they want to pass on, and the things they most want their loved ones to know. The
          conversation is transcribed, edited, and returned to the patient as a permanent document
          — a tangible legacy that can be shared with family and friends. Research shows that 76%
          of family members who receive a dignity therapy document describe it as a significant and
          lasting source of comfort<Citation id="3" index={3} />.
        </p>

        <h2 id="supporting-mental-health" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Supporting Mental Health Through the End of Life
        </h2>
        <p className="mb-6">
          The case for integrating mental health support into end-of-life care is not merely
          humanitarian — it is clinical. A landmark study published in the New England Journal
          of Medicine demonstrated that patients with metastatic lung cancer who received early
          palliative care, including psychological support, not only reported better quality of
          life and less depression but actually lived an average of two to three months longer
          than those who received standard oncological care
          alone<Citation id="5" index={5} />. The psychological dimension of care is not separate
          from the medical dimension. It is part of it.
        </p>
        <p className="mb-6">
          National clinical guidelines now recommend that palliative care teams include mental
          health professionals as core members, not peripheral
          consultants<Citation id="6" index={6} />. This means routine screening for depression,
          anxiety, and existential distress; access to therapists trained in end-of-life
          psychological care; support groups for both patients and caregivers; and spiritual
          care services for those who want them<Citation id="7" index={7} />.
        </p>

        <ArticleCallout type="clinical-note" title="For Healthcare Providers and Caregivers">
          <p className="mb-3">
            Supporting someone with a terminal diagnosis requires a different kind of
            presence than most clinical interactions demand. Key principles from the research:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Follow the patient's lead — some people want to talk about death directly, others do not. Both are valid.</li>
            <li>Do not rush to fix or reassure. Sometimes the most therapeutic response is silence and witness.</li>
            <li>Screen for existential distress separately from depression — they require different interventions.</li>
            <li>Support the family system, not just the patient. Caregiver distress is both its own concern and a predictor of patient outcomes.</li>
            <li>Remember that finding meaning does not require accepting death cheerfully. It requires being heard.</li>
          </ul>
        </ArticleCallout>

        <h2 id="post-traumatic-growth" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Post-Traumatic Growth: When the End Transforms What Came Before
        </h2>
        <p className="mb-6">
          One of the most striking findings in palliative psychology is that some people
          report significant positive psychological change alongside their grief and
          fear<Citation id="9" index={9} />. This is not denial or toxic positivity. It is a
          well-documented phenomenon called post-traumatic growth — the experience of positive
          change that emerges from the struggle with a major life crisis.
        </p>
        <p className="mb-6">
          People living with terminal diagnoses have described discovering a clarity of priorities
          they never had before, a deepening of relationships that superficiality no longer permits,
          a newfound appreciation for small pleasures that previously went unnoticed, and a sense
          of personal strength they did not know they possessed. These experiences do not cancel
          out the suffering. They coexist with it — and for many people, they become the most
          valuable part of whatever time remains<Citation id="9" index={9} />.
        </p>
        <p className="mb-6">
          As one participant in a qualitative study described it: "I would give anything to not
          have this diagnosis. But I would not trade the person it has made me. I see everything
          differently now. I say what I mean. I hold the people I love a little tighter. I have
          stopped pretending that things that do not matter actually do." This is not a silver
          lining. It is a testament to the human capacity for meaning-making, even — perhaps
          especially — in the face of the ultimate limit<Citation id="9" index={9} />.
        </p>

        <QuoteBlock
          quote="Those who have a 'why' to live can bear with almost any 'how.' But the 'why' must be found, not forced. And sometimes it is found in the very place where all seems lost."
          author="Viktor Frankl"
          role="Psychiatrist, Holocaust Survivor"
          source="Man's Search for Meaning (adapted)"
        />
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // CIP-042 | Organ Transplant Psychology: The Emotional Journey of Receiving a New Organ
  // --------------------------------------------------------------------------
  {
    id: catId(42),
    slug: 'organ-transplant-psychology-the-emotional-journey-of-receiving-a-new-organ',
    title: 'Organ Transplant Psychology: The Emotional Journey of Receiving a New Organ',
    description:
      'Understand the complex psychological experience of organ transplantation, from the anxiety of waiting for a donor to the emotional challenges of recovery. Explore gratitude, guilt, identity shifts, and evidence-based mental health support for transplant recipients.',
    image: '/images/articles/cat20/cover-042.svg',
    category: CATEGORY_CHRONIC_ILLNESS_PAIN,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Organ Transplant', 'Transplant Psychology', 'Survivor Guilt', 'Medical Psychology', 'Recovery'],

    summary:
      'Organ transplantation is celebrated as a miracle of modern medicine, yet the psychological experience of receiving a new organ is far more complex than the gratitude narrative suggests. Transplant recipients navigate a constellation of emotional challenges that receive surprisingly little public attention: the existential anxiety of waiting for a donor organ, the guilt of benefiting from another person\'s death or generosity, profound identity questions about bodily integrity, the relentless psychological burden of immunosuppression and rejection anxiety, and the pressure to perform gratitude at a level that matches society\'s expectations. Research shows that up to 60% of transplant recipients experience significant psychological distress, including depression, anxiety, and post-traumatic stress. This article maps the emotional terrain of organ transplantation with honesty, examining both the extraordinary gift of extended life and the psychological costs that come with it.',

    keyFacts: [
      { text: 'Up to 60% of organ transplant recipients experience clinically significant psychological distress in the first year post-transplant', citationIndex: 1 },
      { text: 'Survivor guilt affects approximately 33% of transplant recipients, particularly those who received organs from deceased donors', citationIndex: 2 },
      { text: 'Medication non-adherence due to psychological factors is the leading cause of preventable organ rejection', citationIndex: 3 },
      { text: 'Pre-transplant psychological evaluation and support improves post-transplant survival and quality of life', citationIndex: 4 },
      { text: 'Body image disturbance following transplant is reported by up to 40% of recipients and correlates with depression severity', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'You carry within you a gift that someone chose to give — or that was given on their behalf by a family enduring the worst day of their lives. The weight of that is not something to power through. It is something to sit with, to honor, and to let shape the way you live the life they helped make possible.',

    practicalExercise: {
      title: 'Gratitude and Grief Integration Practice',
      steps: [
        { title: 'Acknowledge the complexity', description: 'Write two lists side by side: "What I feel grateful for since my transplant" and "What I find difficult about my transplant experience." Allow both lists to be as long as they need to be. Neither cancels the other out.' },
        { title: 'Write to your donor', description: 'Whether or not you ever send it, write a letter to your donor or their family. Say what you want them to know. This is not an exercise in performing gratitude — it is a space for genuine emotional expression, including any complicated feelings.' },
        { title: 'Identify one boundary to set', description: 'Think about the social pressure you feel related to your transplant — the obligation to be positive, the expectation to "make the most" of your new organ, the questions from others. Choose one boundary to set this week that protects your emotional well-being.' },
        { title: 'Connect with a peer', description: 'Seek out a transplant support group — in person or online. Hearing that other recipients share your complicated feelings can be profoundly normalizing. You do not have to process this alone.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Emotional Recovery',
    },

    citations: [
      { id: '1', text: 'Psychological distress and psychiatric morbidity in organ transplant recipients: A systematic review and meta-analysis', source: 'Transplantation', year: '2023', link: 'https://doi.org/10.1097/TP.0000000000004512', tier: 1 },
      { id: '2', text: 'Survivor guilt in organ transplant recipients: Prevalence, predictors, and psychological impact', source: 'Journal of Clinical Psychology in Medical Settings', year: '2022', link: 'https://doi.org/10.1007/s10880-022-09879-4', tier: 1 },
      { id: '3', text: 'Psychological factors in immunosuppressive medication non-adherence after solid organ transplantation: A systematic review', source: 'American Journal of Transplantation', year: '2023', link: 'https://doi.org/10.1016/j.ajt.2023.01.018', tier: 1 },
      { id: '4', text: 'Pre-transplant psychosocial evaluation and outcomes: A longitudinal cohort study', source: 'Psychosomatics', year: '2022', link: 'https://doi.org/10.1016/j.psym.2022.04.003', tier: 1 },
      { id: '5', text: 'Body image after organ transplantation: A qualitative study of recipients\' lived experiences', source: 'Qualitative Health Research', year: '2021', link: 'https://doi.org/10.1177/10497323211024567', tier: 1 },
      { id: '6', text: 'Organ transplantation: Patient information and psychological support', source: 'National Health Service (NHS)', year: '2023', link: 'https://www.nhs.uk/conditions/organ-transplant/', tier: 2 },
      { id: '7', text: 'Psychosocial guidelines for solid organ transplantation', source: 'International Society for Heart and Lung Transplantation', year: '2022', link: 'https://doi.org/10.1016/j.healun.2022.03.017', tier: 2 },
      { id: '8', text: 'Identity and embodiment following organ transplantation: A phenomenological analysis', source: 'Social Science & Medicine', year: '2022', link: 'https://doi.org/10.1016/j.socscimed.2022.114892', tier: 1 },
      { id: '9', text: 'Post-traumatic growth in organ transplant recipients: A meta-analysis', source: 'Health Psychology Review', year: '2023', link: 'https://doi.org/10.1080/17437199.2023.2201285', tier: 1 },
      { id: '10', text: 'Supporting the emotional health of transplant recipients', source: 'American Psychological Association', year: '2023', link: 'https://www.apa.org/topics/health/organ-transplant', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            On the day you receive a transplant, you are given the most extraordinary gift one
            human being can offer another — a piece of their body, entrusted to yours, so that
            you might live. The medical narrative calls this a second chance, a miracle, a
            triumph of science. And it is all of those things. But it is also something else:
            a psychological experience of staggering complexity that very few people outside the
            transplant community truly understand.
          </p>
          <p className="mb-6">
            Research reveals that the emotional reality of organ transplantation is far more nuanced
            than the gratitude narrative that dominates public perception. Up to 60% of transplant
            recipients experience clinically significant psychological distress in the first year
            following their procedure<Citation id="1" index={1} />. This includes depression,
            anxiety, post-traumatic stress symptoms, body image disturbance, survivor guilt, and
            identity confusion. These experiences are not signs of ingratitude or psychological
            weakness. They are the predictable result of undergoing one of the most physically
            and emotionally extreme experiences a person can survive.
          </p>
          <p className="mb-6">
            This article explores the emotional terrain of organ transplantation — from the
            agonizing wait for a donor to the complicated reality of life after surgery — with
            the honesty and depth that transplant recipients deserve.
          </p>
        </div>

        <h2 id="the-wait" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Wait: Living in the Space Between Life and Death
        </h2>
        <p className="mb-6">
          For many transplant recipients, the psychological ordeal begins long before surgery.
          Waiting for an organ is not like waiting for test results or a scheduled procedure.
          It is an indefinite, open-ended period of suspended animation during which a person
          must simultaneously prepare to live and prepare to die. The phone could ring at any
          moment — or it might never ring at all. This existential ambiguity takes a measurable
          psychological toll<Citation id="4" index={4} />.
        </p>
        <p className="mb-6">
          People on transplant waiting lists describe the experience as living in a state of
          perpetual readiness. Bags are packed. Plans are contingent. Every decision is filtered
          through the question: "What if the call comes today?" This hypervigilance, sustained
          over months or years, produces chronic stress, sleep disruption, and a form of
          anticipatory grief that is difficult for outsiders to comprehend — you are mourning the
          life you might lose while simultaneously hoping for the death of a stranger that might
          save you<Citation id="4" index={4} />.
        </p>

        <ArticleCallout type="insight" title="The Ethical Weight of Waiting">
          <p>
            One of the most psychologically unique aspects of organ transplantation is the
            awareness that your survival may depend on someone else's death. Most waiting-list
            patients report having thought about their potential donor — who they are, how they
            might die, whether their family would grieve. This awareness creates a form of
            preemptive guilt that has no parallel in other medical experiences. It is not
            pathological. It is a reflection of empathy operating under extraordinary
            circumstances.
          </p>
        </ArticleCallout>

        <h2 id="the-surgery-and-aftermath" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Surgery and Its Immediate Aftermath
        </h2>
        <p className="mb-6">
          The call comes. The surgery happens. And then the person wakes up — alive, in pain,
          and carrying within their body an organ that belonged to someone else. The immediate
          post-surgical period is often described in intensely contradictory terms: profound
          relief and profound disorientation, gratitude and terror, hope and a strange, pervasive
          numbness<Citation id="1" index={1} />.
        </p>
        <p className="mb-6">
          The ICU environment itself can be traumatic. Many transplant recipients report
          experiences consistent with ICU delirium — confusion, hallucinations, disorientation,
          and intense fear. Some develop post-traumatic stress symptoms related not to the organ
          failure that brought them to transplant, but to the transplant process itself. The
          boundary between the life-saving event and the traumatic event is not always clear,
          and the expectation that patients should feel uniformly grateful from the moment they
          open their eyes can make it difficult to express the more complicated emotions that are
          actually present<Citation id="1" index={1} />.
        </p>

        <StatCard
          value="60%"
          label="Of transplant recipients"
          description="Experience clinically significant psychological distress in the first year post-transplant"
          citation="Transplantation, 2023"
        />

        <h2 id="survivor-guilt-and-the-gratitude-burden" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Survivor Guilt and the Burden of Gratitude
        </h2>
        <p className="mb-6">
          Survivor guilt is one of the most distinctive psychological challenges of organ
          transplantation. Approximately one-third of recipients report significant guilt
          related to their transplant — guilt about surviving when others on the waiting list
          did not, guilt about the donor's death, and guilt about not feeling as grateful as
          they believe they should<Citation id="2" index={2} />.
        </p>
        <p className="mb-6">
          The pressure to perform gratitude is immense and comes from every direction: family,
          friends, medical teams, the media, and society at large. "You got a second chance —
          you should be the happiest person alive" is a sentiment that transplant recipients
          hear constantly. And while they often do feel genuine gratitude, they also feel
          exhausted, frightened, in pain, and bewildered. The gap between what they are expected
          to feel and what they actually feel creates a form of emotional dissonance that can
          be profoundly isolating<Citation id="2" index={2} />.
        </p>
        <p className="mb-6">
          Healthy psychological adaptation after transplant does not require eliminating guilt.
          It requires integrating it. Research shows that recipients who can hold gratitude and
          guilt simultaneously — acknowledging that both are valid responses to an extraordinary
          situation — report better psychological outcomes than those who try to suppress one
          emotion in favor of the other<Citation id="2" index={2} />.
        </p>

        <h2 id="identity-and-body-image" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Identity, Embodiment, and the Question of "Whose Body Is This?"
        </h2>
        <p className="mb-6">
          Organ transplantation raises fundamental questions about the relationship between body
          and self. When you carry another person's heart, liver, or lungs, where does their body
          end and yours begin? For some recipients, this question remains abstract and philosophical.
          For others, it becomes a lived source of identity
          disturbance<Citation id="8" index={8} />.
        </p>
        <p className="mb-6">
          Up to 40% of transplant recipients report body image disturbances following their
          procedure<Citation id="5" index={5} />. These range from discomfort with surgical scars
          to a deeper sense of bodily alienation — the feeling that the body they inhabit is
          not entirely theirs. Some recipients describe sensing the presence of their donor,
          attributing new preferences or personality changes to the transplanted organ. While
          there is no scientific evidence for cellular memory transfer, the psychological
          phenomenon is real and deserves clinical attention rather than
          dismissal<Citation id="8" index={8} />.
        </p>

        <ArticleAccordion items={[
          {
            title: 'Bodily alienation and reintegration',
            content: (
              <p>
                Some recipients describe a period of feeling estranged from their own body after
                transplant — as though the organ is a foreign object that does not fully belong.
                This experience typically diminishes over time as the body heals and the new organ
                becomes functionally integrated. Therapeutic approaches that emphasize embodiment
                practices — mindful body scans, gentle movement, and self-touch — can accelerate
                this process of psychological reintegration.
              </p>
            ),
          },
          {
            title: 'Medication burden and psychological impact',
            content: (
              <p>
                Immunosuppressive medications are essential for preventing organ rejection, but
                they carry significant psychological side effects, including mood changes, cognitive
                fog, insomnia, and altered appearance. The daily routine of taking medications that
                both sustain life and diminish quality of life creates an ongoing psychological
                tension. Research identifies medication-related psychological distress as one of
                the strongest predictors of non-adherence — making psychological support around
                medication management a clinical priority.
              </p>
            ),
          },
          {
            title: 'Fear of rejection',
            content: (
              <p>
                The possibility that the body might reject the transplanted organ creates a form
                of chronic health anxiety that is unique to transplant recipients. Every new
                symptom — a fever, an unfamiliar pain, fatigue — triggers the question: "Is this
                rejection?" This hypervigilance is not irrational. Rejection is a real medical
                possibility. But when it becomes pervasive, it can significantly impair quality
                of life and requires targeted psychological support.
              </p>
            ),
          },
          {
            title: 'Relationship with the donor and donor family',
            content: (
              <p>
                Many recipients think about their donor regularly — who they were, what they valued,
                how they died. Some write to donor families through organ procurement organizations.
                Others prefer not to know. Both approaches are valid. The psychological key is
                having the freedom to relate to the donor in whatever way feels authentic, without
                external pressure to feel a particular way about someone they never met but whose
                gift they carry every day.
              </p>
            ),
          },
        ]} />

        <h2 id="evidence-based-psychological-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Psychological Support for Transplant Recipients
        </h2>
        <p className="mb-6">
          International guidelines now recommend that psychological support be integrated into
          every phase of the transplant process — pre-transplant evaluation, the waiting period,
          post-surgical recovery, and long-term follow-up<Citation id="7" index={7} />.
          Pre-transplant psychological evaluation is not a gatekeeping exercise; research shows
          that identifying and addressing psychological risk factors before surgery significantly
          improves post-transplant outcomes, including medication adherence, quality of life, and
          even graft survival<Citation id="4" index={4} />.
        </p>
        <p className="mb-6">
          Cognitive behavioral therapy adapted for transplant populations addresses the specific
          thought patterns that drive distress — catastrophic interpretation of bodily symptoms,
          perfectionist standards for "using" the second chance, and all-or-nothing thinking about
          gratitude and recovery<Citation id="3" index={3} />. Support groups composed of fellow
          transplant recipients provide something that even the most skilled therapist cannot: the
          normalizing experience of hearing someone else say "I feel guilty that I am alive" and
          knowing you are not the only one.
        </p>

        <ArticleCallout type="action-plan" title="Building Your Post-Transplant Support System">
          <ul className="list-disc pl-5 space-y-2">
            <li>Ask your transplant team about psychological support services — many transplant centers have dedicated mental health professionals</li>
            <li>Connect with a transplant peer support group through your hospital or organizations like the Transplant Recipients International Organization</li>
            <li>Be honest with your medical team about emotional struggles — they are as important as physical symptoms</li>
            <li>Give yourself permission to feel complicated emotions without judgment — gratitude and grief are not mutually exclusive</li>
            <li>If medication side effects affect your mood or cognition, discuss them openly rather than silently enduring or skipping doses</li>
          </ul>
        </ArticleCallout>

        <h2 id="post-traumatic-growth-after-transplant" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Post-Traumatic Growth: The Unexpected Transformation
        </h2>
        <p className="mb-6">
          Despite the psychological challenges, a significant body of research documents
          post-traumatic growth in transplant recipients<Citation id="9" index={9} />.
          Many people describe a fundamental shift in priorities after transplant — a deeper
          appreciation for daily life, stronger relationships, reduced concern with trivial
          worries, and a heightened sense of purpose. Some channel their experience into advocacy
          for organ donation, peer mentoring for new recipients, or creative projects that give
          voice to the transplant experience.
        </p>
        <p className="mb-6">
          This growth does not erase the difficulty. It grows alongside it. The person who
          experiences profound gratitude on Tuesday and crushing guilt on Wednesday is not
          confused — they are human. The transplant experience, in all its complexity, asks
          people to hold contradictions that most of us never face: life and death, self and
          other, gratitude and grief, suffering and transcendence. Those who navigate it well
          do not resolve these contradictions. They learn to carry them with
          increasing grace<Citation id="9" index={9} />.
        </p>

        <QuoteBlock
          quote="I carry someone else's heart in my chest, and it beats like it has always been mine. But I never forget that it once beat for someone else. That awareness is not a burden. It is the most sacred responsibility I have ever been given."
          author="Anonymous transplant recipient"
          source="Qualitative Health Research, 2021"
        />
      </>
    ),
  },
];
