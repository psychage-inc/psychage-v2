import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_FAMILY_PARENTING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ArticleAccordion,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const supportingChildrensMentalHealthArticlesB: Article[] = [
  {
    id: catId(56),
    slug: 'children-grief-how-kids-process-loss-differently',
    title: 'Children and Grief: How Kids Process Loss Differently Than Adults',
    description: 'Understand how children experience and express grief at different ages and how to support them through loss.',
    image: "/images/articles/cat06/cover-056.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grief', 'Children', 'Loss', 'Bereavement'],
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Children don't grieve like adults. They might play happily hours after learning of a death, ask the same questions repeatedly, or seem unaffected. This doesn't mean they're unfeeling — they're processing loss in developmentally appropriate ways.
          </p>
          <p className="mb-6">
            Understanding how children experience grief at different ages helps parents provide appropriate support and recognize when professional help is needed <Citation id="1" index={1} source="Death Studies" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="how-children-grieve-differently" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Children Grieve Differently
        </h2>
        <p className="mb-6">
          Adult grief is often sustained and consuming. Children's grief comes in waves — they may be sad one moment, playing the next <Citation id="2" index={2} source="Journal of Child Psychology and Psychiatry" year="2021" tier={1} />. This "puddle jumping" is normal, not callousness.
          </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Magical thinking:</strong> Believing death is reversible or they caused it</li>
          <li><strong>Concrete understanding:</strong> Difficulty grasping permanence or abstract concepts</li>
          <li><strong>Intermittent grieving:</strong> Processing in short bursts to avoid overwhelm</li>
          <li><strong>Questions repeated:</strong> Trying to make sense, not forgetting your answer</li>
          <li><strong>Behavioral expression:</strong> Acting out grief through behavior rather than words</li>
        </ul>

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
                  <p className="mb-4"><strong>Understanding:</strong> May see death as temporary. Magical thinking — "If I'm good, they'll come back."</p>
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
                <li>"All your feelings are okay — sad, angry, confused."</li>
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
              description: <p>Art, play, journaling, physical activity. Not all children talk — provide multiple outlets.</p>,
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
          Grief rituals and beliefs vary widely across cultures <Citation id="7" index={7} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />. Religious or cultural frameworks can provide comfort and meaning. Balance honoring your traditions with age-appropriate honesty about death.
        </p>

        <h2 id="long-term-effects" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Long-Term Resilience
        </h2>
        <p className="mb-6">
          Childhood loss is difficult, but most children adapt with support <Citation id="8" index={8} source="Development and Psychopathology" year="2020" tier={1} />. Protective factors:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Secure attachment to surviving caregivers</li>
          <li>Honest, age-appropriate communication</li>
          <li>Maintenance of routines and stability</li>
          <li>Permission to grieve in their own way and time</li>
          <li>Continuing bonds (memories, rituals)</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Children grieve in their own way and time. Your presence, honesty, and patience matter more than having perfect words. Let them lead, answer questions honestly, and provide steady support through their process.
          </p>
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
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Harm', 'Adolescents', 'Crisis', 'Parenting'],
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Discovering your teen is cutting, burning, or otherwise hurting themselves is terrifying. Your mind races to worst-case scenarios. But self-harm, while serious, is usually a coping mechanism — not a suicide attempt.
          </p>
          <p className="mb-6">
            Understanding why teens self-harm and how to respond compassionately increases the chances they'll accept help <Citation id="1" index={1} source="JAMA Pediatrics" year="2020" tier={1} />. This is a crisis, but it's a treatable one.
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
          <li><strong>Take care of yourself:</strong> Parent support groups, your own therapy — you can't pour from empty cup</li>
        </ul>

        <h2 id="professional-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Professional Treatment
        </h2>
        <p className="mb-6">
          Evidence-based treatments for self-harm <Citation id="5" index={5} source="Behaviour Research and Therapy" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Dialectical Behavior Therapy (DBT):</strong> Gold standard for self-harm. Teaches emotion regulation, distress tolerance, interpersonal skills</li>
          <li><strong>Cognitive-Behavioral Therapy (CBT):</strong> Addresses thought patterns maintaining self-harm</li>
          <li><strong>Family therapy:</strong> Improves communication, reduces family conflict <Citation id="7" index={7} source="Family Process" year="2021" tier={1} /></li>
          <li><strong>Medication:</strong> SSRIs if underlying depression/anxiety, though not first-line for self-harm alone</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            Find a therapist specializing in adolescent self-harm and evidence-based treatments like DBT. General counseling may not be sufficient for self-harm.
          </p>
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
          There Is Hope
        </h2>
        <p className="mb-6">
          Most teens who self-harm stop with proper treatment. Self-harm is a coping skill — and skills can be replaced with healthier ones. Your compassionate response, commitment to getting help, and ongoing support make all the difference.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Self-harm is frightening, but it's treatable. Respond with care, not panic. Get specialized help quickly. With treatment and support, most teens learn healthier ways to cope and recover fully.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(58),
    slug: 'bullying-mental-health-supporting-child-social-cruelty',
    title: 'Bullying and Mental Health: How to Support Your Child Through Social Cruelty',
    description: 'Learn how bullying affects mental health, how to recognize signs your child is being bullied, and effective intervention strategies.',
    image: "/images/articles/cat06/cover-058.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bullying', 'Children', 'School', 'Mental Health'],
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your child comes home in tears. Again. They're being excluded, mocked, or threatened. Bullying isn't 'just kids being kids' — it's a serious threat to mental health with lasting effects.
          </p>
          <p className="mb-6">
            Children who are bullied have higher rates of anxiety, depression, and even suicidal thoughts <Citation id="1" index={1} source="JAMA Pediatrics" year="2020" tier={1} />. Understanding how to recognize and respond to bullying helps protect your child's wellbeing.
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

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-gray-300 mt-12 mb-6 scroll-mt-32">
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
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Screenshot everything before blocking or reporting</li>
          <li>Block bullies on all platforms</li>
          <li>Report to platform (most have reporting mechanisms)</li>
          <li>Inform school — cyberbullying often involves classmates</li>
          <li>Consider police if threats, sexual content, or illegal activity</li>
          <li>Limit social media use temporarily if needed for mental health</li>
        </ul>

        <h2 id="building-resilience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building Resilience
        </h2>
        <p className="mb-6">
          While addressing bullying, also build protective factors:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Strong parent-child relationship (open communication, support)</li>
          <li>At least one good friendship</li>
          <li>Activities where child feels competent and valued</li>
          <li>Therapy to process trauma and build coping skills</li>
          <li>Clear message: bullying says everything about the bully, nothing about your child's worth</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            If your child expresses suicidal thoughts, self-harms, or shows signs of severe depression, seek immediate help. Call 988 (Suicide & Crisis Lifeline) or go to the ER. Bullying can be life-threatening.
          </p>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway">
          <p>
            Bullying is serious and requires active intervention. Your child needs to know you believe them, will protect them, and are actively working to stop it. With support, most children recover and develop resilience.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(59),
    slug: 'should-child-see-therapist-when-seek-professional-help',
    title: 'Should My Child See a Therapist? When and How to Seek Professional Help',
    description: 'Learn when therapy is appropriate for children, how to find the right therapist, and what to expect from child therapy.',
    image: "/images/articles/cat06/cover-059.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Child Therapy', 'Mental Health', 'Parenting', 'Professional Help'],
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Should I get my child therapy?" This question keeps many parents up at night. You don't want to overreact, but you don't want to miss something important. How do you know when professional help is needed?
          </p>
          <p className="mb-6">
            Therapy can help children develop coping skills, process difficult experiences, and improve mental health — often preventing problems from worsening <Citation id="1" index={1} source="Journal of Clinical Child & Adolescent Psychology" year="2020" tier={1} />. Knowing when and how to seek help empowers you to support your child.
          </p>
        </div>

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
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>No clear treatment plan or goals</li>
          <li>Therapy going on for months with no progress</li>
          <li>Therapist won't communicate with you at all</li>
          <li>Child consistently distressed after sessions (some discomfort is normal, persistent distress isn't)</li>
          <li>Therapist dismisses your concerns</li>
          <li>Inappropriate boundaries (gifts, oversharing, contact outside sessions)</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Therapy is a sign of strength, not weakness. If you're wondering whether your child needs help, err on the side of consultation. A professional can assess and either provide treatment or reassure you that your child is within normal range. Early intervention prevents problems from becoming bigger.
          </p>
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
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Resilience', 'Child Development', 'Parenting', 'Evidence-Based'],
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Resilience isn't something children either have or don't have — it's built through experiences, relationships, and skills. You can't prevent all hardship, but you can equip your children to bounce back from it.
          </p>
          <p className="mb-6">
            Research has identified specific, teachable factors that help children develop resilience — the ability to adapt and thrive despite adversity <Citation id="1" index={1} source="Child Development" year="2020" tier={1} />.
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
          It's NOT about being tough, never feeling bad, or handling everything alone. Resilient children feel emotions fully — and have skills to manage them.
        </p>

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
              description: <p>Exercise reduces stress, builds confidence, teaches persistence. Sports, dance, hiking — find what they enjoy.</p>,
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
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Overprotection:</strong> Shielding from all difficulty prevents skill-building. Let them struggle appropriately.</li>
          <li><strong>Rescuing too quickly:</strong> Solving all problems teaches helplessness, not competence.</li>
          <li><strong>Dismissing emotions:</strong> "Don't cry, you're fine' prevents emotion regulation learning.</li>
          <li><strong>Excessive praise for talent:</strong> "You're so smart!" creates fixed mindset. Praise effort instead.</li>
          <li><strong>Unpredictable caregiving:</strong> Inconsistency creates insecurity, not resilience.</li>
        </ul>

        <ArticleCallout variant="tip" title="The Sweet Spot">
          <p>
            Resilience building is a balance: Support AND challenge. Comfort AND growth. Safety to fail AND expectation to try. Too much support creates dependence; too much challenge overwhelms.
          </p>
        </ArticleCallout>

        <h2 id="cultural-resilience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural and Community Resilience
        </h2>
        <p className="mb-6">
          Resilience looks different across cultures <Citation id="8" index={8} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />. Connection to cultural identity, community, spiritual practices, and collective values can be powerful protective factors. Honor your family's cultural strengths.
        </p>

        <h2 id="resilience-after-trauma" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Resilience After Significant Adversity
        </h2>
        <p className="mb-6">
          For children who've experienced trauma, abuse, loss, or major adversity:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Resilience is still possible and common</li>
          <li>Professional support (therapy) may be needed alongside resilience-building</li>
          <li>Recovery takes time — be patient</li>
          <li>Your consistent presence matters more than having all the answers</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Resilience isn't a trait children are born with — it's built through relationships, experiences, and skills you can actively cultivate. By providing secure attachment, appropriate challenges, and teaching coping skills, you help your child develop the strength to face life's inevitable difficulties.
          </p>
        </ArticleCallout>
      </>
    ),
  },
];
