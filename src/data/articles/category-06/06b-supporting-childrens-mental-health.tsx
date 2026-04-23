/* eslint-disable no-useless-escape */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_FAMILY_PARENTING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ArticleAccordion,
  ProgressSteps,
  BeforeAfter,
  QuoteBlock,
  ComparisonTable,
  MythVsFactBlock,
  HighlightBox,
} from '../../../components/article/blocks';

export const supportingChildrensMentalHealthArticlesB: Article[] = [
  {
    id: catId(56),
    slug: 'children-grief-how-kids-process-loss-differently',
    title: 'Children and Grief: How Kids Process Loss Differently Than Adults',
    description: 'Understand how children experience and express grief at different ages and how to support them through loss.',
    image: "/images/articles/cat06/cover-056.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grief', 'Children', 'Loss', 'Bereavement'],
    summary: 'Children process grief differently than adults, cycling between sadness and play, asking repetitive questions, and expressing loss through behavior rather than words. Understanding developmental differences in grief helps parents provide age-appropriate support and recognize when professional intervention is needed.',
    keyFacts: [
      { text: 'Children often engage in "puddle jumping" — moving between grief and play in short bursts to avoid emotional overwhelm, which is developmentally normal.', citationIndex: 2 },
      { text: 'Preschoolers may view death as temporary due to magical thinking, believing "if I\'m good, they\'ll come back."', citationIndex: 1 },
      { text: 'School-age children begin grasping death\'s permanence and often express anxiety about their own death or other loved ones dying.', citationIndex: 1 },
      { text: 'Adolescents understand death like adults but may struggle with existential questions while simultaneously withdrawing or engaging in risk-taking behaviors.', citationIndex: 6 },
      { text: 'Most children adapt to loss with family support, but grief symptoms that intensify after several months or include suicidal thoughts require professional help.', citationIndex: 4 },
    ],
    sparkMoment: 'Your child playing happily hours after learning of a death isn\'t callousness — it\'s their developing brain protecting them from overwhelming pain by processing grief in short, manageable waves.',
    practicalExercise: {
      title: 'Create a Memory Ritual Together',
      steps: [
        { title: 'Choose a Memory Object', description: 'Select or create a special box, jar, or album where your child can keep items that remind them of the person who died.' },
        { title: 'Add Memories Together', description: 'Set aside time to add drawings, photos, written memories, or small objects. Let your child lead what feels meaningful.' },
        { title: 'Establish a Ritual', description: 'Decide together when to revisit the memory collection — maybe on birthdays, holidays, or whenever your child feels the need to connect.' },
        { title: 'Share Stories', description: 'When you open the memory collection, share stories about the person. This maintains healthy continuing bonds while honoring grief.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Emotional Patterns',
    },
    citations: [
      { id: '1', text: 'Childhood bereavement and development', source: 'Death Studies', year: '2020', link: 'https://doi.org/10.1080/07481187.2019.1626936', tier: 1 },
      { id: '2', text: 'Developmental differences in grief processing', source: 'Journal of Child Psychology and Psychiatry', year: '2021', link: 'https://doi.org/10.1111/jcpp.13453', tier: 1 },
      { id: '3', text: 'Supporting grieving children', source: 'Clinical Child and Family Psychology Review', year: '2020', link: 'https://doi.org/10.1007/s10567-020-00330-8', tier: 1 },
      { id: '4', text: 'Complicated grief in children', source: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: '2019', link: 'https://doi.org/10.1016/j.jaac.2019.04.018', tier: 1 },
      { id: '5', text: 'Talking to children about death', source: 'Pediatrics', year: '2020', link: 'https://doi.org/10.1542/peds.2020-0804', tier: 2 },
      { id: '6', text: 'Grief in adolescents', source: 'Journal of Adolescent Health', year: '2021', link: 'https://doi.org/10.1016/j.jadohealth.2020.09.042', tier: 1 },
      { id: '7', text: 'Cultural approaches to childhood grief', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2020', link: 'https://doi.org/10.1037/cdp0000396', tier: 1 },
      { id: '8', text: 'Long-term effects of childhood loss', source: 'Development and Psychopathology', year: '2020', link: 'https://doi.org/10.1017/S0954579420000882', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Children don't grieve like adults. They might play happily hours after learning of a death, ask the same questions repeatedly, or seem unaffected. This doesn't mean they're unfeeling --- they're processing loss in developmentally appropriate ways.
          </p>
          <p className="mb-6">
            Understanding how children experience grief at different ages helps parents provide appropriate support and recognize when professional help is needed <Citation id="1" index={1} source="Death Studies" year="2020" tier={1} />. When you know what's developmentally normal, you can respond with appropriate comfort rather than alarm.
          </p>
          <p className="mb-6">
            The death of a loved one is one of the most difficult experiences a child can face. Yet children are remarkably resilient when given the right support. The key is recognizing that their grief looks different from yours — and that difference is healthy, not concerning.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 5, suffix: '%', label: 'Children who lose a parent before age 18' },
            { value: 1, suffix: ' in 14', label: 'Experience death of sibling, parent, or close friend by age 18' },
            { value: 85, suffix: '%', label: 'Show resilience with appropriate support' },
          ]}
          source="Death Studies, 2020"
        />

        <h2 id="how-children-grieve-differently" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Children Grieve Differently
        </h2>
        <p className="mb-6">
          Adult grief is often sustained and consuming. Children's grief comes in waves --- they may be sad one moment, playing the next <Citation id="2" index={2} source="Journal of Child Psychology and Psychiatry" year="2021" tier={1} />. This "puddle jumping" is normal, not callousness. A child might cry about their grandmother's death at breakfast, then laugh during recess an hour later. This doesn't mean they've forgotten or don't care — it means their developing brain is protecting them from overwhelming emotional pain by dosing it in manageable increments.
          </p>
        <p className="mb-6">
          Young children lack the cognitive and emotional tools to sustain prolonged sadness the way adults do. They process grief in shorter bursts, then return to play and normalcy to recharge. This back-and-forth continues over months or even years as they developmentally revisit the loss at different ages with new understanding.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Magical thinking:</strong> Believing death is reversible or they caused it. A four-year-old might think, "If I wish hard enough, Grandpa will come back," or "I was mad at Daddy before he died, so it's my fault."</li>
          <li><strong>Concrete understanding:</strong> Difficulty grasping permanence or abstract concepts. Young children interpret language literally — "We lost Grandma" might have them searching the house.</li>
          <li><strong>Intermittent grieving:</strong> Processing in short bursts to avoid overwhelm. This protective mechanism prevents emotional flooding while still allowing grief to be processed over time.</li>
          <li><strong>Questions repeated:</strong> Asking "Where did Mommy go?" dozens of times. They're not forgetting your answer — they're trying to integrate an incomprehensible reality.</li>
          <li><strong>Behavioral expression:</strong> Acting out grief through behavior rather than words. Tantrums, aggression, clinginess, or regression communicate what they can't articulate.</li>
        </ul>

        <QuoteBlock
          quote="Children are not miniature adults in their grief. They need permission to be children — to play, to laugh, to live — even while they mourn. Your job isn't to make them grieve like you do, but to support them in grieving like the child they are."
          attribution="Dr. Alan Wolfelt"
          role="Grief counselor and author"
          variant="large"
        />

        <h2 id="grief-by-age" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Grief by Developmental Stage
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'infants-toddlers',
              title: 'Infants and Toddlers (0-3 years)',
              content: (
                <div>
                  <p className="mb-4"><strong>Understanding:</strong> No concept of death permanence. Experience separation from caregiver as distress.</p>
                  <p className="mb-4"><strong>Common responses:</strong> Clinginess, sleep disruption, irritability, searching for deceased person</p>
                  <p className="mb-2"><strong>How to support:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Maintain routines and consistency</li>
                    <li>Provide extra physical affection</li>
                    <li>Simple, honest language: "Grandma died. Her body stopped working."</li>
                    <li>Don't use euphemisms like "went to sleep" (creates fear of sleep)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'preschool',
              title: 'Preschool (3-5 years)',
              content: (
                <div>
                  <p className="mb-4"><strong>Understanding:</strong> May see death as temporary. Magical thinking --- "If I'm good, they'll come back."</p>
                  <p className="mb-4"><strong>Common responses:</strong> Repetitive questions, regression (thumb-sucking, bedwetting), play acting death, apparent lack of emotion</p>
                  <p className="mb-2"><strong>How to support:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Answer questions honestly and simply, expect repetition</li>
                    <li>Reassure they didn't cause the death</li>
                    <li>Use play to process (dolls, drawing)</li>
                    <li>Read age-appropriate books about death</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'school-age',
              title: 'School Age (6-12 years)',
              content: (
                <div>
                  <p className="mb-4"><strong>Understanding:</strong> Beginning to grasp permanence. Curious about physical aspects of death. May personify death as a figure.</p>
                  <p className="mb-4"><strong>Common responses:</strong> Guilt, anger, school problems, somatic complaints (headaches, stomachaches), anxiety about own death or loved ones dying</p>
                  <p className="mb-2"><strong>How to support:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide factual information they request</li>
                    <li>Encourage expression through art, writing, physical activity</li>
                    <li>Maintain structure and expectations</li>
                    <li>Watch for prolonged school performance decline</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'adolescent',
              title: 'Adolescents (13-18 years)',
              content: (
                <div>
                  <p className="mb-4"><strong>Understanding:</strong> Adult-like comprehension of death. May grapple with existential questions <Citation id="6" index={6} source="Journal of Adolescent Health" year="2021" tier={1} />.</p>
                  <p className="mb-4"><strong>Common responses:</strong> Withdrawal, risk-taking, substance use, intense emotions, philosophical questioning, guilt over feeling normal</p>
                  <p className="mb-2"><strong>How to support:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Respect need for privacy while staying connected</li>
                    <li>Allow emotional expression without forcing it</li>
                    <li>Watch for concerning behaviors (self-harm, substance abuse)</li>
                    <li>Encourage peer support and professional help if needed</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="what-to-say" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What to Say (and Not Say)
        </h2>
        <p className="mb-6">
          Honest, age-appropriate communication helps children process loss <Citation id="5" index={5} source="Pediatrics" year="2020" tier={2} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Avoid These Phrases',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"Grandma is sleeping" (creates fear of sleep)</li>
                <li>"God needed another angel" (why would God take someone I love?)</li>
                <li>"They're in a better place' (then why are we sad?)</li>
                <li>"Be strong" (emotions are weakness)</li>
                <li>"Don't cry' (suppresses healthy grieving)</li>
              </ul>
            ),
          }}
          after={{
            title: 'Say This Instead',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"Grandma died. Her body stopped working and she can't come back."</li>
                <li>"I'm sad too. It's okay to feel sad when someone we love dies."</li>
                <li>"We'll remember them together."</li>
                <li>"All your feelings are okay --- sad, angry, confused."</li>
                <li>"I'm here whenever you want to talk or just be together."</li>
              </ul>
            ),
          }}
        />

        <h2 id="when-worry" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Most children grieve with family support. Consider therapy when <Citation id="4" index={4} source="Journal of the American Academy of Child & Adolescent Psychiatry" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Grief symptoms intensify after several months rather than gradually improving</li>
          <li>Child expresses suicidal thoughts or self-harm</li>
          <li>Severe school decline or social withdrawal lasting months</li>
          <li>Persistent belief they caused the death</li>
          <li>Complete denial or inability to acknowledge loss</li>
          <li>Extreme risk-taking or destructive behaviors</li>
        </ul>

        <ArticleCallout variant="tip" title="Support Groups">
          <p>
            Grief support groups for children (like The Dougy Center model) help kids see they're not alone and provide peer support <Citation id="3" index={3} source="Clinical Child and Family Psychology Review" year="2020" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="helping-children-cope" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Helping Children Cope
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Maintain Routines',
              description: <p>Structure provides security. Keep bedtime, mealtimes, school consistent when possible.</p>,
            },
            {
              title: 'Encourage Expression',
              description: <p>Art, play, journaling, physical activity. Not all children talk --- provide multiple outlets.</p>,
            },
            {
              title: 'Include Them Appropriately',
              description: <p>Age-appropriate participation in rituals (funerals, memorials) can help. Prepare them for what to expect; don't force attendance.</p>,
            },
            {
              title: 'Create Memory Rituals',
              description: <p>Memory boxes, lighting candles on special dates, sharing stories. Continuing bonds are healthy.</p>,
            },
            {
              title: 'Model Healthy Grieving',
              description: <p>Let children see you sad (within reason). This normalizes grief and shows it's okay to express emotions.</p>,
            },
          ]}
        />

        <h2 id="cultural-context" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural and Religious Frameworks
        </h2>
        <p className="mb-6">
          Grief rituals and beliefs vary widely across cultures <Citation id="7" index={7} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />. Some cultures openly discuss and prepare children for death from a young age. Others protect children from death-related conversations and rituals. Neither approach is inherently right or wrong — what matters is consistency with your family's values and age-appropriate adaptation.
        </p>
        <p className="mb-6">
          Religious or spiritual frameworks can provide comfort, meaning, and community support during grief. Many children find solace in beliefs about an afterlife, continuing spiritual connection, or divine purpose. Balance honoring your traditions with age-appropriate honesty about death. You can say "We believe Grandma is in heaven" while also acknowledging "Her body stopped working and she can't come back to visit us."
        </p>
        <p className="mb-6">
          If your child asks questions your faith tradition doesn't easily answer ("If heaven is better, why are we sad?" or "Can God see me when I'm in the bathroom?"), it's okay to say "That's a really good question. Different people believe different things. What I believe is..." Honesty about uncertainty can be more comforting than forced certainty.
        </p>

        <h2 id="long-term-effects" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Long-Term Resilience
        </h2>
        <p className="mb-6">
          Childhood loss is difficult, but most children adapt with support <Citation id="8" index={8} source="Development and Psychopathology" year="2020" tier={1} />. The experience can even build resilience and empathy over time, though this doesn't minimize the pain. Children who lose someone close often develop deeper compassion, appreciation for relationships, and understanding that life is precious.
        </p>
        <p className="mb-6">
          Protective factors that promote healthy adaptation include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Secure attachment to surviving caregivers:</strong> Knowing at least one adult is reliably there provides a foundation for processing loss</li>
          <li><strong>Honest, age-appropriate communication:</strong> Children do better when included in truth-telling appropriate to their developmental level</li>
          <li><strong>Maintenance of routines and stability:</strong> Predictable structure creates safety when the child's world feels unpredictable</li>
          <li><strong>Permission to grieve in their own way and time:</strong> Not forcing expression or forbidding it — following the child's lead</li>
          <li><strong>Continuing bonds:</strong> Memories, rituals, photos, and stories keep healthy connection to the deceased person alive</li>
        </ul>
        <p className="mb-6">
          Grief doesn't have a finish line. Your child may revisit this loss at different developmental stages — at elementary school graduation, their wedding, the birth of their own child. Each milestone may bring new grief as they experience what the deceased person will miss. This is normal. Grief evolves; it doesn't end.
        </p>

        <ArticleCallout variant="key-takeaway" title="Remember">
          <ul className="list-disc pl-5 space-y-2">
            <li>Children grieve in their own way and time — often differently than adults expect</li>
            <li>Your presence, honesty, and patience matter more than having perfect words</li>
            <li>Let them lead, answer questions honestly at their developmental level, and provide steady support</li>
            <li>Seek professional help if grief intensifies over time or interferes with daily functioning for months</li>
            <li>Most children are remarkably resilient with appropriate support and maintain healthy connections to deceased loved ones throughout their lives</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(57),
    slug: 'teen-self-harming-parents-guide-responding-care',
    title: "When Your Teen Is Self-Harming: A Parent's Guide to Responding with Care",
    description: "Learn how to respond when you discover your teen is self-harming, why it happens, and how to get appropriate help.",
    image: "/images/articles/cat06/cover-057.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Harm', 'Adolescents', 'Crisis', 'Parenting'],
    summary: 'Self-harm in adolescents is usually a coping mechanism for overwhelming emotions, not a suicide attempt. Responding with compassion rather than panic, getting specialized help quickly, and creating safety plans are key to helping teens learn healthier coping skills and recover fully.',
    keyFacts: [
      { text: '17% of adolescents have self-harmed at least once, with 70% doing so to regulate emotions rather than to die.', citationIndex: 1 },
      { text: 'Self-harm serves specific functions including emotion regulation, self-punishment, feeling something when numb, or communicating distress when words fail.', citationIndex: 2 },
      { text: 'Parent responses in the first conversation matter enormously — shame and punishment increase self-harm, while compassion and listening open dialogue.', citationIndex: 3 },
      { text: 'Dialectical Behavior Therapy (DBT) is the gold standard treatment for self-harm, teaching emotion regulation, distress tolerance, and interpersonal skills.', citationIndex: 5 },
      { text: '90% of teens who self-harm respond to treatment, learning healthier coping strategies to replace self-injury.', citationIndex: 1 },
    ],
    sparkMoment: 'Your teen cutting themselves doesn\'t mean they want to die — it means they\'re in so much emotional pain that physical pain feels like relief.',
    practicalExercise: {
      title: 'Create a Safety Plan Together',
      steps: [
        { title: 'Identify Triggers', description: 'Help your teen recognize situations, emotions, or thoughts that precede urges to self-harm. Write them down specifically.' },
        { title: 'List Warning Signs', description: 'Notice early signals before crisis hits — restlessness, withdrawal, specific thoughts. Recognition creates space for intervention.' },
        { title: 'Develop Coping Strategies', description: 'Brainstorm alternatives: ice on skin, intense exercise, red marker on arm, calling a friend, journaling. Prepare a list they can grab in crisis.' },
        { title: 'Identify Support People', description: 'List specific people they can contact and when — therapist, you, trusted friend, 988 Lifeline. Include names and numbers.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Emotional Patterns',
    },
    citations: [
      { id: '1', text: 'Prevalence of adolescent self-harm', source: 'JAMA Pediatrics', year: '2020', link: 'https://doi.org/10.1001/jamapediatrics.2020.1032', tier: 1 },
      { id: '2', text: 'Functions of non-suicidal self-injury', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2020.101939', tier: 1 },
      { id: '3', text: 'Parent responses to adolescent self-harm', source: 'Journal of Adolescent Health', year: '2020', link: 'https://doi.org/10.1016/j.jadohealth.2020.06.019', tier: 1 },
      { id: '4', text: 'Self-harm vs. suicide risk', source: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: '2021', link: 'https://doi.org/10.1016/j.jaac.2020.10.017', tier: 1 },
      { id: '5', text: 'Dialectical Behavior Therapy for adolescent self-harm', source: 'Behaviour Research and Therapy', year: '2019', link: 'https://doi.org/10.1016/j.brat.2019.103434', tier: 1 },
      { id: '6', text: 'Creating safety plans with teens', source: 'Suicide and Life-Threatening Behavior', year: '2020', link: 'https://doi.org/10.1111/sltb.12647', tier: 1 },
      { id: '7', text: 'Family-based treatment for self-harm', source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12659', tier: 1 },
      { id: '8', text: 'Online communities and self-harm', source: 'Journal of Medical Internet Research', year: '2020', link: 'https://doi.org/10.2196/15973', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Discovering your teen is cutting, burning, or otherwise hurting themselves is terrifying. Your mind races to worst-case scenarios. But self-harm, while serious, is usually a coping mechanism --- not a suicide attempt.
          </p>
          <p className="mb-6">
            Understanding why teens self-harm and how to respond compassionately increases the chances they'll accept help <Citation id="1" index={1} source="JAMA Pediatrics" year="2020" tier={1} />. This is a crisis, but it's a treatable one. Your teen isn't broken or manipulative — they're struggling and need help learning healthier ways to cope.
          </p>
          <p className="mb-6">
            Self-harm is more common than many parents realize, particularly among adolescents. It often starts in early to mid-adolescence and serves as a way to manage emotions that feel overwhelming. The good news: with proper treatment, most teens stop self-harming and develop healthier coping strategies.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 17, suffix: '%', label: 'Adolescents who have self-harmed at least once' },
            { value: 70, suffix: '%', label: 'Who self-harm to regulate emotions, not to die' },
            { value: 90, suffix: '%', label: 'Who respond to treatment' },
          ]}
          source="JAMA Pediatrics, 2020"
        />

        <h2 id="what-is-self-harm" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Self-Harm?
        </h2>
        <p className="mb-6">
          Self-harm (also called non-suicidal self-injury or NSSI) is intentionally hurting one's body without intent to die <Citation id="2" index={2} source="Clinical Psychology Review" year="2021" tier={1} />. Common methods:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Cutting (most common)</li>
          <li>Burning</li>
          <li>Scratching or picking skin</li>
          <li>Hitting self or head-banging</li>
          <li>Interfering with wound healing</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            Self-harm is NOT the same as a suicide attempt. Most teens who self-harm are trying to cope with overwhelming emotions, not trying to die <Citation id="4" index={4} source="Journal of the American Academy of Child & Adolescent Psychiatry" year="2021" tier={1} />. However, self-harm does increase suicide risk and must be taken seriously.
          </p>
        </ArticleCallout>

        <h2 id="why-teens-self-harm" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Teens Self-Harm
        </h2>
        <p className="mb-6">
          Self-harm serves specific functions <Citation id="2" index={2} source="Clinical Psychology Review" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'emotion-regulation',
              title: 'Emotion Regulation (Most Common)',
              content: <p>Physical pain distracts from emotional pain. The act releases endorphins, temporarily relieving intense feelings like anxiety, anger, sadness, or numbness. It's a maladaptive coping skill.</p>,
            },
            {
              id: 'self-punishment',
              title: 'Self-Punishment',
              content: <p>Teens who feel worthless, guilty, or self-hating may harm themselves as punishment. Often related to trauma, shame, or perfectionism.</p>,
            },
            {
              id: 'feeling-something',
              title: 'Feeling Something',
              content: <p>When emotionally numb or dissociated, physical pain can create a sense of being 'real' or alive.</p>,
            },
            {
              id: 'communication',
              title: 'Communicating Distress',
              content: <p>Sometimes (though not always), self-harm is a way to show others how much they're hurting when words fail.</p>,
            },
            {
              id: 'social-factors',
              title: 'Social Influence',
              content: <p>Peer groups, online communities, and social media can normalize self-harm <Citation id="8" index={8} source="Journal of Medical Internet Research" year="2020" tier={1} />. Teens may learn it from others.</p>,
            },
          ]}
        />

        <h2 id="immediate-response" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Respond in the Moment
        </h2>
        <p className="mb-6">
          Your reaction in the first conversation matters enormously <Citation id="3" index={3} source="Journal of Adolescent Health" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Stay Calm',
              description: <p>Take deep breaths. Your panic will make them shut down. Aim for concerned but steady.</p>,
            },
            {
              title: "Don\'t Punish or Shame",
              description: <p>"I'm worried about you' not "How could you do this?" Shame increases self-harm; compassion opens dialogue.</p>,
            },
            {
              title: 'Listen Without Judgment',
              description: <p>"Can you help me understand why you're doing this?" Listen to understand, not to fix immediately.</p>,
            },
            {
              title: 'Express Care and Concern',
              description: <p>"I love you and I want you to be okay. Let's figure this out together."</p>,
            },
            {
              title: 'Assess Immediate Safety',
              description: <p>Are they currently safe? Are injuries serious? Do they have suicidal thoughts? If yes to suicide, seek immediate help (988 Lifeline, ER).</p>,
            },
            {
              title: 'Make a Plan for Professional Help',
              description: <p>"We're going to get you support from someone who specializes in this." Schedule therapy within days, not weeks.</p>,
            },
          ]}
        />

        <BeforeAfter
          before={{
            title: 'Responses That Push Teens Away',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"How could you be so selfish?"</li>
                <li>"You're doing this for attention"</li>
                <li>"If you really loved us, you wouldn't"</li>
                <li>"I'm taking away your phone/door"</li>
                <li>"This is ridiculous"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Responses That Open Connection',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I'm here and I want to understand"</li>
                <li>"You must be in a lot of pain"</li>
                <li>"Thank you for trusting me enough to tell me"</li>
                <li>"Let's find healthier ways to cope together"</li>
                <li>"I love you no matter what"</li>
              </ul>
            ),
          }}
        />

        <h2 id="ongoing-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Ongoing Support Strategies
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Create safety plan:</strong> Together, identify triggers, warning signs, coping strategies, people to contact <Citation id="6" index={6} source="Suicide and Life-Threatening Behavior" year="2020" tier={1} /></li>
          <li><strong>Limit access to means:</strong> Lock up sharp objects when possible, without being overly restrictive</li>
          <li><strong>Teach alternative coping:</strong> Ice on skin, snapping rubber band, red marker on skin, intense exercise</li>
          <li><strong>Stay connected:</strong> Regular check-ins, low-key time together, open communication</li>
          <li><strong>Monitor without surveillance:</strong> Know their online activity, but respect privacy balance</li>
          <li><strong>Take care of yourself:</strong> Parent support groups, your own therapy --- you can't pour from empty cup</li>
        </ul>

        <h2 id="professional-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Professional Treatment
        </h2>
        <p className="mb-6">
          Self-harm responds well to evidence-based treatments <Citation id="5" index={5} source="Behaviour Research and Therapy" year="2019" tier={1} />. The most effective approaches teach teens to understand their emotions and develop healthier coping strategies. Treatment typically involves individual therapy for your teen, with periodic family sessions to improve communication and support at home.
        </p>

        <ComparisonTable
          title="Evidence-Based Treatments for Self-Harm"
          columns={['Treatment', 'Best For', 'Key Components', 'Typical Duration']}
          items={[
            {
              feature: 'DBT (Dialectical Behavior Therapy)',
              values: ['Frequent self-harm, intense emotions', 'Emotion regulation, distress tolerance, mindfulness, interpersonal skills', '6-12 months']
            },
            {
              feature: 'CBT (Cognitive-Behavioral Therapy)',
              values: ['Negative thought patterns, less frequent self-harm', 'Identifying and changing thoughts that maintain self-harm', '12-20 sessions']
            },
            {
              feature: 'Family Therapy',
              values: ['Family conflict, communication problems', 'Improving family dynamics, reducing triggers', 'Used alongside individual therapy']
            },
            {
              feature: 'Medication (SSRIs)',
              values: ['Co-occurring depression or anxiety', 'Treating underlying mood disorder', 'Ongoing, monitored by psychiatrist']
            },
          ]}
          highlightColumn={0}
        />

        <p className="mb-6">
          Dialectical Behavior Therapy (DBT) is considered the gold standard for self-harm. Originally developed for adults with borderline personality disorder, DBT has been adapted for adolescents and shows strong evidence for reducing self-harm. It's comprehensive — teaching concrete skills for managing emotions, tolerating distress, and navigating relationships. Many programs include both individual therapy and skills group sessions.
        </p>

        <QuoteBlock
          quote="Self-harm is not a failed suicide attempt. It's a coping strategy that works — temporarily. Our job isn't to take it away without replacement, but to teach healthier strategies that work better and don't cause harm."
          attribution="Dr. Marsha Linehan"
          role="Creator of Dialectical Behavior Therapy"
          variant="default"
        />

        <ArticleCallout variant="tip" title="Finding the Right Therapist">
          <p className="mb-4">
            Find a therapist specializing in adolescent self-harm and evidence-based treatments like DBT or CBT. General counseling may not be sufficient for self-harm. Ask potential therapists:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>What specific training do you have in treating adolescent self-harm?</li>
            <li>What treatment approach do you use?</li>
            <li>How will you involve me as a parent?</li>
            <li>What's your approach to safety planning?</li>
          </ul>
        </ArticleCallout>

        <h2 id="crisis-resources" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Crisis Resources
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988</li>
          <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
          <li><strong>Emergency room:</strong> If actively self-harming, suicidal, or injuries need medical attention</li>
          <li><strong>Mobile crisis teams:</strong> Many areas have mental health crisis teams that come to you</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            If your teen expresses suicidal intent, has a plan, or you believe they're in immediate danger, do not leave them alone. Go to the ER or call 988. Self-harm increases suicide risk even when not the intent.
          </p>
        </ArticleCallout>

        <h2 id="hope" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          There Is Hope and Recovery Is Possible
        </h2>
        <p className="mb-6">
          Most teens who self-harm stop with proper treatment. Self-harm is a coping skill — and skills can be replaced with healthier ones. Recovery isn't always linear; there may be setbacks. But each attempt to use a healthier strategy instead of self-harm is progress, even if it doesn't work perfectly at first.
        </p>
        <p className="mb-6">
          Your role is crucial but not to fix everything yourself. You can't therapize your own child, and you shouldn't have to. Your job is to respond with compassion, get professional help, stay connected, and maintain hope when your teen struggles to feel it themselves.
        </p>
        <p className="mb-6">
          Many teens who've recovered from self-harm look back and say the turning point was feeling genuinely heard without judgment. Your willingness to sit with their pain, to not run from it or demand they stop immediately, creates the safety needed for change. Treatment provides the skills; your steady presence provides the foundation.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways for Parents">
          <ul className="list-disc pl-5 space-y-2">
            <li>Self-harm is frightening, but it's treatable — 90% of teens respond to proper treatment</li>
            <li>Respond with care and curiosity, not panic or punishment</li>
            <li>Get specialized help quickly — don't wait to see if it stops on its own</li>
            <li>Create a collaborative safety plan identifying triggers, warning signs, and alternatives</li>
            <li>Take care of yourself — parent support groups and your own therapy help you stay steady</li>
            <li>Recovery takes time and may include setbacks, but each small step forward matters</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(58),
    slug: 'bullying-mental-health-supporting-child-social-cruelty',
    status: 'published',
    title: 'Bullying and Mental Health: How to Support Your Child Through Social Cruelty',
    description: 'Learn how bullying affects mental health, how to recognize signs your child is being bullied, and effective intervention strategies.',
    image: "/images/articles/cat06/cover-058.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bullying', 'Children', 'School', 'Mental Health'],
    summary: 'Bullying is a serious threat to child mental health, causing anxiety, depression, and potentially lasting effects into adulthood. Parents can protect their child by recognizing signs, documenting incidents, working collaboratively with schools, and building resilience through supportive relationships and therapy when needed.',
    keyFacts: [
      { text: '20% of students report being bullied, with bullying doubled risk of depression in affected children.', citationIndex: 1 },
      { text: 'Relational bullying (exclusion, rumors, manipulation) is particularly common among girls but affects all genders and is often the hardest type to detect.', citationIndex: 6 },
      { text: 'Cyberbullying is particularly damaging because it follows children home, can be shared widely, and provides no escape from harassment.', citationIndex: 2 },
      { text: 'Long-term effects of childhood bullying include increased adult anxiety and depression, lower self-esteem, trust issues, and relationship difficulties.', citationIndex: 5 },
      { text: 'Building resilience through strong parent-child relationships, supportive friendships, and activities where children feel competent helps protect against bullying\'s harmful effects.', citationIndex: 7 },
    ],
    sparkMoment: 'Bullying says everything about the bully\'s pain and insecurity — and nothing about your child\'s worth.',
    practicalExercise: {
      title: 'Build Your Child\'s Resilience Network',
      steps: [
        { title: 'Identify Safe Adults', description: 'Help your child list 3-5 trusted adults they can talk to besides you — teacher, coach, counselor, family friend, relative.' },
        { title: 'Find a Strength-Based Activity', description: 'Enroll your child in an activity where they feel competent and valued — sports, art, music, volunteering. Success outside school builds resilience.' },
        { title: 'Practice Assertive Responses', description: 'Role-play confident responses to bullying: "Stop," walking away with head up, using humor to deflect. Practice until it feels natural.' },
        { title: 'Schedule Weekly Check-Ins', description: 'Set aside 15 minutes weekly to ask open-ended questions about school social dynamics. Make it routine so it\'s not alarming when you ask.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Emotional Wellbeing',
    },
    citations: [
      { id: '1', text: 'Bullying and mental health outcomes', source: 'JAMA Pediatrics', year: '2020', link: 'https://doi.org/10.1001/jamapediatrics.2020.0124', tier: 1 },
      { id: '2', text: 'Cyberbullying effects', source: 'Journal of Adolescent Health', year: '2021', link: 'https://doi.org/10.1016/j.jadohealth.2020.11.013', tier: 1 },
      { id: '3', text: 'School-based bullying interventions', source: 'School Psychology Review', year: '2020', link: 'https://doi.org/10.1080/2372966X.2020.1716636', tier: 1 },
      { id: '4', text: 'Parent responses to bullying', source: 'Journal of School Violence', year: '2019', link: 'https://doi.org/10.1080/15388220.2018.1519529', tier: 1 },
      { id: '5', text: 'Long-term effects of childhood bullying', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720000057', tier: 1 },
      { id: '6', text: 'Relational aggression in girls', source: 'Journal of Clinical Child & Adolescent Psychology', year: '2021', link: 'https://doi.org/10.1080/15374416.2020.1846542', tier: 1 },
      { id: '7', text: 'Building resilience in bullied children', source: 'Clinical Child and Family Psychology Review', year: '2020', link: 'https://doi.org/10.1007/s10567-020-00326-4', tier: 1 },
      { id: '8', text: 'When to change schools', source: 'Psychology in the Schools', year: '2021', link: 'https://doi.org/10.1002/pits.22501', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Your child comes home in tears. Again. They're being excluded, mocked, or threatened. Bullying isn't 'just kids being kids' --- it's a serious threat to mental health with lasting effects.
          </p>
          <p className="mb-6">
            Children who are bullied have higher rates of anxiety, depression, and even suicidal thoughts <Citation id="1" index={1} source="JAMA Pediatrics" year="2020" tier={1} />. Understanding how to recognize and respond to bullying helps protect your child's wellbeing. This isn't about overreacting to normal childhood conflict — it's about addressing repeated, intentional cruelty that harms your child.
          </p>
          <p className="mb-6">
            Bullying is defined as repeated, intentional aggression where there's a power imbalance. It's not a one-time argument or disagreement between equals. It's systematic targeting of someone perceived as vulnerable. And it requires adult intervention, not a "kids will work it out" approach.
          </p>
        </div>

        <h2 id="types-of-bullying" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Types of Bullying
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'physical',
              title: 'Physical Bullying',
              content: <p>Hitting, kicking, pushing, taking or damaging possessions. Most visible form but less common than others.</p>,
            },
            {
              id: 'verbal',
              title: 'Verbal Bullying',
              content: <p>Name-calling, insults, threats, mocking. Can happen in person or online.</p>,
            },
            {
              id: 'relational',
              title: 'Relational/Social Bullying',
              content: (
                <p>
                  Exclusion, spreading rumors, public humiliation, manipulating friendships. Common among girls but affects all genders <Citation id="6" index={6} source="Journal of Clinical Child & Adolescent Psychology" year="2021" tier={1} />. Often hardest to detect.
                </p>
              ),
            },
            {
              id: 'cyber',
              title: 'Cyberbullying',
              content: (
                <p>
                  Harassment via text, social media, gaming platforms. Particularly damaging because it follows children home and can be shared widely <Citation id="2" index={2} source="Journal of Adolescent Health" year="2021" tier={1} />.
                </p>
              ),
            },
          ]}
        />

        <h2 id="myths" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Myths About Bullying
        </h2>
        <p className="mb-6">
          Misconceptions about bullying can prevent parents from taking it seriously. Here's what the research actually shows:
        </p>

        <div className="space-y-4 my-8">
          <MythVsFactBlock
            myth="Kids need to toughen up and deal with it — that's how they build character."
            fact="Bullying doesn't build character; it causes trauma. Research shows bullied children have higher rates of anxiety, depression, and long-term mental health problems. Resilience comes from support, not suffering."
          />
          <MythVsFactBlock
            myth="If my child were really being bullied, they would tell me about it."
            fact="Many children hide bullying due to shame, fear of making it worse, or belief that adults can't help. Only about 40% of bullied children report it to adults. Watch for behavioral changes, not just direct disclosure."
          />
          <MythVsFactBlock
            myth="Telling the school will just make it worse for my child."
            fact="While fears of retaliation are understandable, research shows that effective school interventions reduce bullying. Documentation and collaborative problem-solving with schools protect children better than silence."
          />
        </div>

        <h2 id="signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs Your Child Is Being Bullied
        </h2>
        <p className="mb-6">
          Many children don't tell parents directly. Watch for:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Unexplained injuries, lost or damaged belongings</li>
          <li>School avoidance, declining grades, loss of interest in school</li>
          <li>Social withdrawal, loss of friendships</li>
          <li>Changes in eating or sleeping</li>
          <li>Anxiety, depression, low self-esteem</li>
          <li>Self-destructive behaviors (self-harm, substance use)</li>
          <li>Coming home hungry (lunch money stolen or too anxious to eat)</li>
          <li>Taking longer route home or asking for rides (avoiding bullies)</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            Ask open-ended questions: "Who did you sit with at lunch?", "What was the best and worst part of your day?" not "Are you being bullied?" which is easy to deflect.
          </p>
        </ArticleCallout>

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-neutral-300 mt-12 mb-6 scroll-mt-32">
          Mental Health Impact
        </h2>
        <p className="mb-6">
          Bullying's effects extend beyond the immediate hurt <Citation id="5" index={5} source="Psychological Medicine" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Short-term:</strong> Anxiety, depression, somatic complaints, sleep problems, academic decline</li>
          <li><strong>Long-term:</strong> Increased risk of adult anxiety and depression, lower self-esteem, trust issues, relationship difficulties</li>
          <li><strong>Severe cases:</strong> PTSD, self-harm, suicidal ideation</li>
        </ul>

        <StatCard
          stats={[
            { value: 20, suffix: '%', label: 'Students who report being bullied' },
            { value: 2, suffix: 'x', label: 'Increased risk of depression from bullying' },
            { value: 60, suffix: '%', label: 'Of bullying occurs away from adult supervision' },
          ]}
          source="JAMA Pediatrics, 2020"
        />

        <h2 id="what-to-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Parents Should Do
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Believe and Validate',
              description: <p>"Thank you for telling me. This isn't your fault. We're going to figure this out together." Don't minimize or tell them to toughen up.</p>,
            },
            {
              title: 'Document Everything',
              description: <p>Dates, times, what happened, witnesses, screenshots of online bullying. You'll need this when approaching school.</p>,
            },
            {
              title: 'Involve the School',
              description: <p>Start with teacher, move to counselor/principal if needed. Be collaborative, not accusatory. Most schools have anti-bullying policies <Citation id="3" index={3} source="School Psychology Review" year="2020" tier={1} />.</p>,
            },
            {
              title: "Don\'t Contact Bully or Their Parents Directly",
              description: <p>This often escalates conflict. Work through school channels unless they fail to act.</p>,
            },
            {
              title: "Build Your Child\'s Support Network",
              description: <p>Activities outside school, supportive friends, therapy if needed. Resilience comes from multiple positive relationships <Citation id="7" index={7} source="Clinical Child and Family Psychology Review" year="2020" tier={1} />.</p>,
            },
            {
              title: 'Teach Coping Skills',
              description: <p>Confident body language, assertive responses, when to walk away, how to report. Role-play scenarios.</p>,
            },
          ]}
        />

        <h2 id="when-school-doesnt-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When School Doesn't Help
        </h2>
        <p className="mb-6">
          If school administrators are unresponsive or ineffective <Citation id="4" index={4} source="Journal of School Violence" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Document all communications with school</li>
          <li>Request written response to your concerns</li>
          <li>Escalate to superintendent or school board</li>
          <li>File complaint with state education department if applicable</li>
          <li>Consult attorney if physical safety threatened or school negligent</li>
          <li>Consider transferring schools if bullying is severe and unaddressed <Citation id="8" index={8} source="Psychology in the Schools" year="2021" tier={1} /></li>
        </ul>

        <h2 id="cyberbullying-specific" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cyberbullying Specifics
        </h2>
        <p className="mb-6">
          Cyberbullying presents unique challenges because there's no escape. It follows children into their homes, their bedrooms, their safe spaces. The audience can be enormous, and content spreads virally. Take it seriously:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Screenshot everything before blocking or reporting:</strong> Evidence is crucial and can be deleted</li>
          <li><strong>Block bullies on all platforms:</strong> Remove their access to your child</li>
          <li><strong>Report to platform:</strong> Most have reporting mechanisms for harassment</li>
          <li><strong>Inform school:</strong> Cyberbullying often involves classmates and affects school environment</li>
          <li><strong>Consider police:</strong> If threats, sexual content, stalking, or illegal activity</li>
          <li><strong>Limit social media temporarily:</strong> If needed for mental health, take a break</li>
        </ul>

        <HighlightBox variant="emphasis">
          <p className="mb-2"><strong>Why cyberbullying is uniquely harmful:</strong></p>
          <p>
            Traditional bullying happened at school and ended when your child came home. Cyberbullying is 24/7. The audience is potentially unlimited. Content is permanent and searchable. The anonymity emboldens bullies to say things they wouldn't say in person. Your child needs both digital boundaries and emotional support to cope.
          </p>
        </HighlightBox>

        <h2 id="building-resilience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building Resilience
        </h2>
        <p className="mb-6">
          While addressing bullying directly, also build protective factors that help your child withstand and recover from cruelty <Citation id="7" index={7} source="Clinical Child and Family Psychology Review" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Strong parent-child relationship:</strong> Open communication, unconditional support, regular one-on-one time. Your belief in them matters more than you know.</li>
          <li><strong>At least one good friendship:</strong> Even one solid friendship provides social support and counteracts bullies' message that they're unlovable.</li>
          <li><strong>Activities where child feels competent:</strong> Sports, art, music, volunteering — anything where they experience success and belonging outside school.</li>
          <li><strong>Therapy to process trauma:</strong> Professional support to work through the impact and build coping skills for current and future challenges.</li>
          <li><strong>Clear, repeated message:</strong> Bullying says everything about the bully's pain and insecurity — nothing about your child's worth.</li>
        </ul>
        <p className="mb-6">
          Resilience doesn't mean your child won't hurt. It means they have resources to cope with the hurt, connections to lean on, and confidence that they can get through hard things. Build these foundations alongside addressing the bullying itself.
        </p>

        <ArticleCallout variant="warning">
          <p>
            If your child expresses suicidal thoughts, self-harms, or shows signs of severe depression, seek immediate help. Call 988 (Suicide & Crisis Lifeline) or go to the ER. Bullying can be life-threatening — don't wait.
          </p>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway" title="Remember">
          <ul className="list-disc pl-5 space-y-2">
            <li>Bullying is serious and requires active intervention, not a "kids will work it out" approach</li>
            <li>Your child needs to know you believe them, will protect them, and are actively working to stop it</li>
            <li>Document everything and work collaboratively with schools using their anti-bullying policies</li>
            <li>Build resilience through strong relationships, outside activities, and therapy when needed</li>
            <li>With support, most children recover and develop strength from overcoming adversity</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(59),
    slug: 'should-child-see-therapist-when-seek-professional-help',
    status: 'published',
    title: 'Should My Child See a Therapist? When and How to Seek Professional Help',
    description: 'Learn when therapy is appropriate for children, how to find the right therapist, and what to expect from child therapy.',
    image: "/images/articles/cat06/cover-059.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Child Therapy', 'Mental Health', 'Parenting', 'Professional Help'],
    summary: 'Knowing when to seek therapy for your child can prevent problems from worsening. Consider professional help when functioning is impaired, symptoms persist beyond 2-4 weeks, or after significant life events. Finding a specialized child therapist with evidence-based approaches and involving yourself appropriately supports successful treatment.',
    keyFacts: [
      { text: '75% of children improve with therapy, yet 50% of children who need help don\'t receive it due to access barriers or parental hesitation.', citationIndex: 1 },
      { text: 'Therapy should be considered when functioning is impaired across school, social, or family domains, symptoms persist beyond 2-4 weeks, or after significant life events like death, divorce, trauma, or bullying.', citationIndex: 2 },
      { text: 'Evidence-based treatments like CBT, play therapy, and family therapy show strong research support for specific childhood issues and age groups.', citationIndex: 3 },
      { text: 'Child therapy looks different than adult therapy — using play, art, and games for younger children while incorporating skill-building and family sessions across ages.', citationIndex: 8 },
      { text: 'Parent involvement in therapy improves outcomes, with therapists involving parents in sessions and teaching parents skills to support treatment at home.', citationIndex: 6 },
    ],
    sparkMoment: 'Therapy isn\'t a sign that you\'ve failed as a parent — it\'s a sign that you\'re doing exactly what your child needs.',
    practicalExercise: {
      title: 'Normalize Therapy for Your Child',
      steps: [
        { title: 'Frame It Positively', description: 'Explain therapy as: "We\'re going to talk to someone who helps kids with big feelings/friendship problems/worry." Focus on what they\'ll gain, not what\'s wrong with them.' },
        { title: 'Address Their Concerns', description: 'Ask what they\'re worried about. Common fears: "Will you tell my parents everything I say?" "Do you think I\'m crazy?" "Will my friends find out?" Address each honestly.' },
        { title: 'Prepare for First Session', description: 'Explain what to expect: "You\'ll meet the therapist, they\'ll ask about what\'s going on, and you might play or draw together. You don\'t have to talk about hard stuff right away."' },
        { title: 'Model Openness', description: 'If comfortable, share your own therapy experience or normalize it: "Lots of people talk to therapists when they\'re going through something hard. It\'s like having a coach for feelings."' },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find Child Therapists',
    },
    citations: [
      { id: '1', text: 'Effectiveness of child therapy', source: 'Journal of Clinical Child & Adolescent Psychology', year: '2020', link: 'https://doi.org/10.1080/15374416.2020.1756300', tier: 1 },
      { id: '2', text: 'When children benefit from therapy', source: 'Child and Adolescent Mental Health', year: '2021', link: 'https://doi.org/10.1111/camh.12451', tier: 1 },
      { id: '3', text: 'Evidence-based treatments for children', source: 'American Psychologist', year: '2020', link: 'https://doi.org/10.1037/amp0000618', tier: 1 },
      { id: '4', text: 'Finding qualified child therapists', source: 'Professional Psychology: Research and Practice', year: '2019', link: 'https://doi.org/10.1037/pro0000256', tier: 1 },
      { id: '5', text: 'Cultural considerations in child therapy', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2020', link: 'https://doi.org/10.1037/cdp0000407', tier: 1 },
      { id: '6', text: 'Parent involvement in child therapy', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2020.101946', tier: 1 },
      { id: '7', text: 'Insurance and access barriers', source: 'Pediatrics', year: '2020', link: 'https://doi.org/10.1542/peds.2019-3778', tier: 2 },
      { id: '8', text: 'What happens in child therapy', source: 'Journal of Child Psychology and Psychiatry', year: '2019', link: 'https://doi.org/10.1111/jcpp.13099', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            "Should I get my child therapy?" This question keeps many parents up at night. You don't want to overreact, but you don't want to miss something important. How do you know when professional help is needed?
          </p>
          <p className="mb-6">
            Therapy can help children develop coping skills, process difficult experiences, and improve mental health — often preventing problems from worsening <Citation id="1" index={1} source="Journal of Clinical Child & Adolescent Psychology" year="2020" tier={1} />. Knowing when and how to seek help empowers you to support your child. Early intervention is key: problems caught early are easier to address than those that become entrenched.
          </p>
          <p className="mb-6">
            Unfortunately, half of children who could benefit from therapy don't receive it. Sometimes parents worry they're overreacting. Sometimes they fear stigma. Sometimes access is difficult. But seeking help when your child is struggling isn't overreacting — it's good parenting. You wouldn't hesitate to see a doctor for a persistent physical symptom. Mental health deserves the same attentiveness.
          </p>
        </div>

        <HighlightBox variant="emphasis">
          <p>
            <strong>Key principle:</strong> If you're wondering whether your child needs therapy, that wondering itself is often a sign that a professional consultation would be valuable. It doesn't commit you to ongoing treatment — just an evaluation to help you understand what your child needs.
          </p>
        </HighlightBox>

        <h2 id="when-to-consider" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Consider Therapy
        </h2>
        <p className="mb-6">
          Consider professional evaluation when <Citation id="2" index={2} source="Child and Adolescent Mental Health" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'functioning',
              title: 'Functioning Is Impaired',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>School performance declining</li>
                  <li>Social withdrawal or friendship problems</li>
                  <li>Family relationships strained</li>
                  <li>Can't participate in normal activities</li>
                  <li>Daily functioning disrupted (sleep, eating, hygiene)</li>
                </ul>
              ),
            },
            {
              id: 'symptoms-persist',
              title: 'Symptoms Persist',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lasting more than 2-4 weeks</li>
                  <li>Not improving with time or your support</li>
                  <li>Worsening rather than getting better</li>
                </ul>
              ),
            },
            {
              id: 'significant-event',
              title: 'After Significant Life Event',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Death of loved one</li>
                  <li>Divorce or family separation</li>
                  <li>Move or major transition</li>
                  <li>Trauma (abuse, violence, accident)</li>
                  <li>Bullying</li>
                </ul>
              ),
            },
            {
              id: 'concerning-behaviors',
              title: 'Concerning Behaviors',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Self-harm or suicidal thoughts</li>
                  <li>Aggressive or violent behavior</li>
                  <li>Substance use</li>
                  <li>Eating disorder signs</li>
                  <li>Excessive anxiety or worry</li>
                  <li>Persistent sadness or hopelessness</li>
                </ul>
              ),
            },
            {
              id: 'gut-feeling',
              title: "Your Gut Says Something\'s Wrong",
              content: <p>Parents often sense when their child needs help. Trust your instincts. It's better to check in with a professional and be reassured than to wait too long.</p>,
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 75, suffix: '%', label: 'Children who improve with therapy' },
            { value: 50, suffix: '%', label: "Who need help but don\'t receive it" },
            { value: 8, suffix: '-12', label: 'Typical sessions for targeted issues' },
          ]}
          source="Journal of Clinical Child & Adolescent Psychology, 2020"
        />

        <h2 id="finding-therapist" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Finding the Right Therapist
        </h2>
        <p className="mb-6">
          Look for <Citation id="4" index={4} source="Professional Psychology: Research and Practice" year="2019" tier={4} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Proper Credentials',
              description: <p>Licensed clinical psychologist (PhD/PsyD), licensed clinical social worker (LCSW), or licensed professional counselor (LPC) with child/adolescent specialization.</p>,
            },
            {
              title: 'Child Specialization',
              description: <p>Working with adults is different than children. Ensure they have training and experience with your child's age group.</p>,
            },
            {
              title: 'Evidence-Based Approaches',
              description: <p>Ask what treatment modality they use (CBT, play therapy, DBT, family therapy). Research shows certain approaches work better for specific issues <Citation id="3" index={3} source="American Psychologist" year="2020" tier={1} />.</p>,
            },
            {
              title: 'Cultural Competence',
              description: <p>Therapist should understand your family's cultural background and values <Citation id="5" index={5} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />.</p>,
            },
            {
              title: 'Good Fit',
              description: <p>Your child should feel comfortable. If they don't click after 2-3 sessions, it's okay to try someone else.</p>,
            },
          ]}
        />

        <h2 id="how-to-find" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Where to Look
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Insurance provider directory:</strong> Check in-network therapists</li>
          <li><strong>Psychology Today therapist finder:</strong> Filter by age, issue, insurance</li>
          <li><strong>School counselor:</strong> Can provide referrals</li>
          <li><strong>Pediatrician:</strong> Often has list of trusted providers</li>
          <li><strong>Community mental health centers:</strong> Lower-cost options</li>
          <li><strong>Online therapy platforms:</strong> BetterHelp Teen, Talkspace Teen (for adolescents)</li>
        </ul>

        <ArticleCallout variant="tip" title="Overcoming Access Barriers">
          <p>
            If cost is prohibitive, ask about sliding scale fees, look for training clinics (graduate students supervised by licensed clinicians at reduced rates), or check community mental health centers that serve regardless of ability to pay <Citation id="7" index={7} source="Pediatrics" year="2020" tier={2} />.
          </p>
        </ArticleCallout>

        <h2 id="what-to-expect" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Happens in Child Therapy?
        </h2>
        <p className="mb-6">
          Child therapy looks different than adult therapy <Citation id="8" index={8} source="Journal of Child Psychology and Psychiatry" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Play therapy (younger children):</strong> Toys, art, games to express feelings and work through issues</li>
          <li><strong>Talk therapy (older children/teens):</strong> More traditional conversation-based therapy</li>
          <li><strong>Skill-building:</strong> Teaching coping strategies, emotional regulation, social skills</li>
          <li><strong>Family sessions:</strong> Many child therapists involve parents regularly <Citation id="6" index={6} source="Clinical Psychology Review" year="2021" tier={1} /></li>
          <li><strong>Homework:</strong> Practicing skills between sessions</li>
        </ul>

        <h2 id="parent-role" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Your Role as a Parent
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Normalize Therapy',
              description: <p>"We're going to talk to someone who helps kids with big feelings' not "You're going to therapy because something's wrong with you."</p>,
            },
            {
              title: 'Attend Consistently',
              description: <p>Weekly appointments are most effective. Prioritize attendance like you would doctor appointments.</p>,
            },
            {
              title: 'Participate When Asked',
              description: <p>Therapist may request parent sessions. This is normal and helps treatment.</p>,
            },
            {
              title: 'Respect Confidentiality',
              description: <p>Child-therapist relationship needs privacy. Therapist will share safety concerns but won't detail every session. Trust the process.</p>,
            },
            {
              title: 'Reinforce Skills at Home',
              description: <p>Practice what child learns in therapy. Follow through on therapist recommendations.</p>,
            },
            {
              title: 'Be Patient',
              description: <p>Change takes time. Don't expect overnight results, but do expect gradual progress.</p>,
            },
          ]}
        />

        <h2 id="red-flags" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Red Flags in Therapy
        </h2>
        <p className="mb-6">
          Most therapists are ethical and competent. But if you notice these warning signs, address concerns directly with the therapist or consider finding someone else:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>No clear treatment plan or goals:</strong> You should know what therapy is working toward and how progress will be measured</li>
          <li><strong>Therapy going on for months with no progress:</strong> Some issues take time, but you should see gradual improvement or clearer understanding</li>
          <li><strong>Therapist won't communicate with you at all:</strong> While respecting child's privacy, therapist should involve you appropriately</li>
          <li><strong>Child consistently distressed after sessions:</strong> Some discomfort is normal when processing difficult topics, but persistent distress after every session isn't</li>
          <li><strong>Therapist dismisses your concerns:</strong> Your input as a parent should be valued and incorporated</li>
          <li><strong>Inappropriate boundaries:</strong> Gifts, oversharing personal details, contact outside sessions — these violate professional ethics</li>
        </ul>
        <p className="mb-6">
          It's okay to switch therapists. Fit matters enormously. If your child doesn't feel comfortable or you don't feel collaborative after 3-4 sessions, try someone else. This isn't failure — it's finding the right match.
        </p>

        <ArticleCallout variant="key-takeaway" title="Remember">
          <ul className="list-disc pl-5 space-y-2">
            <li>Therapy is a sign of strength, not weakness — seeking help shows wisdom and care</li>
            <li>If you're wondering whether your child needs help, err on the side of consultation</li>
            <li>Early intervention prevents problems from becoming bigger and more entrenched</li>
            <li>Find a therapist specializing in children with evidence-based approaches for your child's specific needs</li>
            <li>Your involvement matters — attend when invited, practice skills at home, trust the process</li>
            <li>75% of children improve with therapy — most issues are treatable when addressed</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(60),
    slug: 'building-resilience-children-research-what-works',
    title: 'Building Resilience in Children: What the Research Says Actually Works',
    description: 'Learn evidence-based strategies to help children develop resilience, bounce back from adversity, and thrive despite challenges.',
    image: "/images/articles/cat06/cover-060.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Resilience', 'Child Development', 'Parenting', 'Evidence-Based'],
    summary: 'Resilience is built, not innate. Research identifies six key protective factors: secure relationships, self-efficacy, growth mindset, emotion regulation, problem-solving skills, and social support. Parents can actively cultivate resilience through daily practices, appropriate challenges, and avoiding overprotection.',
    keyFacts: [
      { text: 'The single most important resilience factor is a stable, caring relationship with at least one adult who provides safety, support, and belief in the child.', citationIndex: 2 },
      { text: 'Self-efficacy — believing "I can handle challenges" — develops when children solve age-appropriate problems without immediate adult rescue.', citationIndex: 4 },
      { text: 'Growth mindset, the belief that abilities develop through effort, is strengthened by praising effort and persistence rather than inherent talent or intelligence.', citationIndex: 3 },
      { text: 'Overprotection and rescuing too quickly prevent skill-building, teaching helplessness rather than competence and resilience.', citationIndex: 1 },
      { text: 'Cultural identity, community connection, and collective values are powerful protective factors that vary across cultures and should be honored.', citationIndex: 8 },
    ],
    sparkMoment: 'Resilience building is a balance: support AND challenge, comfort AND growth, safety to fail AND expectation to try.',
    practicalExercise: {
      title: 'Build Self-Efficacy Through Mastery Experiences',
      steps: [
        { title: 'Identify an Age-Appropriate Challenge', description: 'Choose something just beyond your child\'s current ability — riding a bike, making their lunch, completing a puzzle. It should be hard but achievable.' },
        { title: 'Provide Minimal Support', description: 'Offer guidance but resist doing it for them. "What do you think you could try first?" Let them struggle productively.' },
        { title: 'Celebrate the Process', description: 'When they succeed (or make progress), focus on their effort: "You kept trying even when it was hard. That\'s what made the difference."' },
        { title: 'Connect to Future Challenges', description: 'Remind them of this success when facing new difficulties: "Remember when you learned to [X]? You can do hard things."' },
      ],
      toolLink: '/tools',
      toolLabel: 'Explore Wellness Tools',
    },
    citations: [
      { id: '1', text: 'Resilience in children: Protective factors', source: 'Child Development', year: '2020', link: 'https://doi.org/10.1111/cdev.13378', tier: 1 },
      { id: '2', text: 'Fostering resilience in families', source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12662', tier: 1 },
      { id: '3', text: 'Growth mindset and resilience', source: 'Psychological Science', year: '2019', link: 'https://doi.org/10.1177/0956797619830987', tier: 1 },
      { id: '4', text: 'Self-efficacy in children', source: 'Journal of Child Psychology and Psychiatry', year: '2020', link: 'https://doi.org/10.1111/jcpp.13321', tier: 1 },
      { id: '5', text: 'Social support and resilience', source: 'Development and Psychopathology', year: '2021', link: 'https://doi.org/10.1017/S0954579420000894', tier: 1 },
      { id: '6', text: 'Emotion regulation skills', source: 'Clinical Child and Family Psychology Review', year: '2020', link: 'https://doi.org/10.1007/s10567-020-00336-2', tier: 1 },
      { id: '7', text: 'Problem-solving skills development', source: 'Journal of Applied Developmental Psychology', year: '2019', link: 'https://doi.org/10.1016/j.appdev.2019.101086', tier: 1 },
      { id: '8', text: 'Cultural resilience factors', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2020', link: 'https://doi.org/10.1037/cdp0000413', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Resilience isn't something children either have or don't have --- it's built through experiences, relationships, and skills. You can't prevent all hardship, but you can equip your children to bounce back from it.
          </p>
          <p className="mb-6">
            Research has identified specific, teachable factors that help children develop resilience — the ability to adapt and thrive despite adversity <Citation id="1" index={1} source="Child Development" year="2020" tier={1} />. The good news: these aren't mysterious traits some children are born with. They're skills and experiences you can actively cultivate as a parent.
          </p>
          <p className="mb-6">
            Think of resilience as a muscle that strengthens through use. Each time your child faces a challenge, struggles, perseveres, and succeeds (or learns from failure), they build resilience. Your role isn't to remove all obstacles — it's to provide the support and tools needed to navigate them.
          </p>
        </div>

        <h2 id="what-is-resilience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Resilience?
        </h2>
        <p className="mb-6">
          Resilience is the ability to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Cope with stress and adversity</li>
          <li>Bounce back from setbacks</li>
          <li>Adapt to change</li>
          <li>Learn and grow from challenges</li>
          <li>Maintain functioning during difficult times</li>
        </ul>
        <p className="mb-6">
          It's NOT about being tough, never feeling bad, or handling everything alone. Resilient children feel emotions fully — and have skills to manage them. Resilience doesn't prevent pain; it provides capacity to move through pain and emerge stronger.
        </p>

        <QuoteBlock
          quote="We can't prepare the path for our children, but we can prepare our children for the path. Resilience is built not in the absence of adversity, but through successfully navigating it with support."
          attribution="Dr. Kenneth Ginsburg"
          role="Pediatrician and resilience researcher"
          variant="large"
        />

        <h2 id="protective-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Research-Backed Protective Factors
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'secure-attachment',
              title: '1. At Least One Secure Relationship',
              content: (
                <div>
                  <p className="mb-4">
                    The single most important resilience factor: a stable, caring relationship with at least one adult <Citation id="2" index={2} source="Family Process" year="2021" tier={1} />. This person provides safety, support, and belief in the child.
                  </p>
                  <p className="mb-2"><strong>How to build it:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Consistent presence and availability</li>
                    <li>Warm, responsive interactions</li>
                    <li>Unconditional positive regard</li>
                    <li>Active listening without judgment</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'self-efficacy',
              title: '2. Sense of Self-Efficacy',
              content: (
                <div>
                  <p className="mb-4">
                    Belief that "I can handle challenges" <Citation id="4" index={4} source="Journal of Child Psychology and Psychiatry" year="2020" tier={1} />.
                  </p>
                  <p className="mb-2"><strong>How to build it:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Let children solve age-appropriate problems (don't rescue immediately)</li>
                    <li>Celebrate effort and problem-solving, not just outcomes</li>
                    <li>Point out past successes: "Remember when you learned to ride a bike? You kept trying."</li>
                    <li>Give responsibilities they can master</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'growth-mindset',
              title: '3. Growth Mindset',
              content: (
                <div>
                  <p className="mb-4">
                    Belief that abilities can be developed through effort <Citation id="3" index={3} source="Psychological Science" year="2019" tier={1} />.
                  </p>
                  <p className="mb-2"><strong>How to build it:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Praise effort, strategies, and persistence: "You worked really hard on that!"</li>
                    <li>Normalize struggle: "Learning is supposed to be hard at first"</li>
                    <li>Reframe failure: "Mistakes help your brain grow"</li>
                    <li>Use "yet": "You can't do it... yet"</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'emotion-regulation',
              title: '4. Emotion Regulation Skills',
              content: (
                <div>
                  <p className="mb-4">
                    Ability to manage big feelings <Citation id="6" index={6} source="Clinical Child and Family Psychology Review" year="2020" tier={1} />.
                  </p>
                  <p className="mb-2"><strong>How to build it:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Emotion coaching (see article 55)</li>
                    <li>Teach specific strategies: deep breathing, counting, taking breaks</li>
                    <li>Help name feelings: "You seem frustrated"</li>
                    <li>Model your own emotion regulation</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'problem-solving',
              title: '5. Problem-Solving Skills',
              content: (
                <div>
                  <p className="mb-4">
                    Ability to think through challenges <Citation id="7" index={7} source="Journal of Applied Developmental Psychology" year="2019" tier={1} />.
                  </p>
                  <p className="mb-2"><strong>How to build it:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Ask: "What do you think you could try?"</li>
                    <li>Brainstorm multiple solutions together</li>
                    <li>Let them try, fail, and try again</li>
                    <li>Debrief: "What worked? What would you do differently?"</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'social-connections',
              title: '6. Social Support Network',
              content: (
                <div>
                  <p className="mb-4">
                    Multiple supportive relationships <Citation id="5" index={5} source="Development and Psychopathology" year="2021" tier={1} />.
                  </p>
                  <p className="mb-2"><strong>How to build it:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Facilitate friendships (playdates, activities)</li>
                    <li>Maintain extended family connections</li>
                    <li>Involve them in community (sports, clubs, faith groups)</li>
                    <li>Teach social skills (sharing, cooperation, conflict resolution)</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="practical-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Daily Resilience-Building Practices
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Family Rituals and Routines',
              description: <p>Predictable structure creates safety. Regular family dinners, bedtime routines, weekly activities provide stability during chaos.</p>,
            },
            {
              title: 'Storytelling About Adversity',
              description: <p>Share (age-appropriately) about challenges you've overcome. "When I lost my job, I felt scared. Here's what I did..." Normalizes struggle and shows resilience in action.</p>,
            },
            {
              title: 'Service and Helping Others',
              description: <p>Volunteering, helping neighbors, contributing to family builds purpose and competence. 'I can make a difference' is powerfully resilient.</p>,
            },
            {
              title: 'Physical Activity',
              description: <p>Exercise reduces stress, builds confidence, teaches persistence. Sports, dance, hiking --- find what they enjoy.</p>,
            },
            {
              title: 'Creative Expression',
              description: <p>Art, music, writing provide outlets for processing emotions and building identity.</p>,
            },
          ]}
        />

        <h2 id="what-not-to-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Undermines Resilience
        </h2>
        <p className="mb-6">
          Well-intentioned parenting can accidentally undermine resilience. Common pitfalls to avoid:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Overprotection:</strong> Shielding from all difficulty prevents skill-building. Children need appropriate challenges to develop competence. Let them struggle with age-appropriate problems.</li>
          <li><strong>Rescuing too quickly:</strong> Solving all problems teaches learned helplessness, not competence. Wait before jumping in. Ask "What do you think you could try?"</li>
          <li><strong>Dismissing emotions:</strong> "Don't cry, you're fine" or "Toughen up" prevents emotion regulation learning. Validate feelings while teaching coping.</li>
          <li><strong>Excessive praise for talent:</strong> "You're so smart!" or "You're a natural athlete!" creates fixed mindset and fear of failure. Praise effort, strategies, persistence instead.</li>
          <li><strong>Unpredictable caregiving:</strong> Inconsistency in rules, responses, or availability creates insecurity. Predictability builds resilience; chaos undermines it.</li>
          <li><strong>Living through your child:</strong> Pushing them to achieve your unfulfilled dreams creates pressure, not resilience. Support their interests, not yours.</li>
        </ul>

        <ArticleCallout variant="tip" title="The Sweet Spot">
          <p>
            Resilience building is a balance: Support AND challenge. Comfort AND growth. Safety to fail AND expectation to try. Too much support creates dependence; too much challenge overwhelms. Find the zone where your child is stretched but not broken, supported but not rescued. This sweet spot is where resilience grows.
          </p>
        </ArticleCallout>

        <h2 id="cultural-resilience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural and Community Resilience
        </h2>
        <p className="mb-6">
          Resilience looks different across cultures <Citation id="8" index={8} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />. Western psychology often emphasizes individual resilience — self-reliance, independence, personal achievement. But many cultures prioritize collective resilience — family bonds, community support, spiritual connection, honoring elders.
        </p>
        <p className="mb-6">
          Both approaches build resilience. Connection to cultural identity, participation in cultural traditions, community involvement, spiritual practices, and collective values can be powerful protective factors. If your family's culture emphasizes interdependence over independence, that's not weakness — it's a different (and equally valid) path to resilience. Honor your family's cultural strengths.
        </p>

        <h2 id="resilience-after-trauma" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Resilience After Significant Adversity
        </h2>
        <p className="mb-6">
          For children who've experienced trauma, abuse, loss, or major adversity, resilience is still possible — and remarkably common. Research shows that most children exposed to significant hardship do not develop long-term mental health problems when they have protective factors in place.
        </p>
        <p className="mb-6">
          That said, resilience after trauma looks different than preventing problems in the first place:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Resilience is still possible:</strong> Even children who've faced severe adversity can heal and thrive with proper support</li>
          <li><strong>Professional support may be needed:</strong> Trauma-focused therapy alongside resilience-building helps children process what happened and develop coping skills</li>
          <li><strong>Recovery takes time:</strong> Be patient. Healing isn't linear. There will be setbacks alongside progress.</li>
          <li><strong>Your presence matters most:</strong> You don't need to have all the answers or fix everything. Consistent, caring presence provides the foundation for resilience.</li>
          <li><strong>Build on strengths:</strong> Focus on what's working, what your child is good at, moments of joy. Resilience grows from strength, not just addressing weakness.</li>
        </ul>

        <ArticleCallout variant="key-takeaway" title="Key Principles">
          <ul className="list-disc pl-5 space-y-2">
            <li>Resilience isn't a trait children are born with — it's built through relationships, experiences, and skills you actively cultivate</li>
            <li>The most important factor is at least one secure, caring relationship with an adult</li>
            <li>Balance support with appropriate challenges — resilience grows in the zone between comfort and overwhelm</li>
            <li>Avoid overprotection and rescuing too quickly; let children struggle productively and build competence</li>
            <li>Honor your family's cultural approach to resilience, whether individual or collective</li>
            <li>Even after trauma, resilience is possible with professional support, patience, and your steady presence</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
