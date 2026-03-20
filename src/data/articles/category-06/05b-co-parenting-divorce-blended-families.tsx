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
  QuoteBlock,
} from '../../../components/article/blocks';

export const coParentingDivorceBlendedFamiliesArticlesB: Article[] = [
  {
    id: catId(46),
    slug: 'co-parenting-communication-tools-reducing-conflict',
    title: 'Co-Parenting Communication: Tools and Strategies for Reducing Conflict',
    description: "Master practical communication techniques and tools that reduce conflict and keep co-parenting focused on children's needs.",
    image: '/images/articles/cat06/cover-046.svg',
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Co-Parenting', 'Communication', 'Conflict Resolution', 'Parenting Apps'],
    citations: [
      { id: '1', text: 'Effective co-parenting communication', source: 'Family Relations', year: '2020', link: 'https://doi.org/10.1111/fare.12438', tier: 1 },
      { id: '2', text: 'Technology-mediated co-parenting', source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12641', tier: 1 },
      { id: '3', text: 'BIFF response method effectiveness', source: 'Journal of Divorce & Remarriage', year: '2019', link: 'https://doi.org/10.1080/10502556.2019.1627150', tier: 1 },
      { id: '4', text: 'Reducing conflict escalation in high-conflict couples', source: 'Clinical Child and Family Psychology Review', year: '2020', link: 'https://doi.org/10.1007/s10567-020-00328-2', tier: 1 },
      { id: '5', text: 'Structured communication protocols', source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000792', tier: 1 },
      { id: '6', text: 'Co-parenting apps: Evidence and best practices', source: 'Family Court Review', year: '2020', link: 'https://doi.org/10.1111/fcre.12494', tier: 2 },
      { id: '7', text: 'Boundaries in co-parenting communication', source: 'Journal of Divorce & Remarriage', year: '2021', link: 'https://doi.org/10.1080/10502556.2020.1848921', tier: 1 },
      { id: '8', text: 'Parallel parenting communication strategies', source: 'Family Relations', year: '2019', link: 'https://doi.org/10.1111/fare.12391', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Communicating with an ex about children is rarely easy. Old hurts, blame, and resentment can turn simple scheduling questions into fights. But effective co-parenting requires functional communication.
          </p>
          <p className="mb-6">
            The good news: you don't need to like each other or be friends. You need clear boundaries, structured communication, and the right tools <Citation id="1" index={1} source="Family Relations" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="biff-method" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The BIFF Response Method
        </h2>
        <p className="mb-6">
          BIFF (Brief, Informative, Friendly, Firm) is a communication framework designed for high-conflict situations <Citation id="3" index={3} source="Journal of Divorce & Remarriage" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'brief',
              title: 'Brief',
              content: (
                <div>
                  <p className="mb-2">Keep messages short. Long explanations invite argument. Stick to necessary information only.</p>
                  <p className="italic text-sm">Example: "I'll drop off Sarah at 6pm Friday" NOT "I would have preferred 5pm but I know you're always running late so I'm being flexible even though..."</p>
                </div>
              ),
            },
            {
              id: 'informative',
              title: 'Informative',
              content: (
                <div>
                  <p className="mb-2">Provide facts relevant to the children. No opinions about your ex, no personal attacks, no emotional commentary.</p>
                  <p className="italic text-sm">Example: "Jake has a dentist appointment Tuesday at 3pm" NOT "Jake needs a dentist because you feed him too much candy"</p>
                </div>
              ),
            },
            {
              id: 'friendly',
              title: 'Friendly',
              content: (
                <div>
                  <p className="mb-2">Neutral or mildly positive tone. No sarcasm, passive-aggression, or hostility.</p>
                  <p className="italic text-sm">Start with "Hi [name]" not "Listen," or no greeting. End with "Thanks" not demanding language.</p>
                </div>
              ),
            },
            {
              id: 'firm',
              title: 'Firm',
              content: (
                <div>
                  <p className="mb-2">Clear about decisions and boundaries. Don't leave room for misinterpretation, but also don't engage in debates.</p>
                  <p className="italic text-sm">Example: "I won't be able to switch weekends this time" NOT "You always do this and I'm sick of it"</p>
                </div>
              ),
            },
          ]}
        />

        <BeforeAfter
          before={{
            title: 'Reactive Communication',
            content: (
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Subject: RE: You're late AGAIN</p>
                <p>"You're always late and it's disrespectful to my time! I have things to do and can't just sit around waiting for you to decide to show up. This is exactly why our marriage didn't work. You never consider anyone but yourself. Do better."</p>
              </div>
            ),
          }}
          after={{
            title: 'BIFF Response',
            content: (
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Subject: Pickup time clarification</p>
                <p>"Hi [name], Going forward, if you'll be more than 15 minutes late, please text me so I can plan accordingly. Thanks for understanding."</p>
              </div>
            ),
          }}
        />

        <h2 id="co-parenting-apps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Co-Parenting Apps and Technology
        </h2>
        <p className="mb-6">
          Technology can reduce conflict by creating neutral, documented communication channels <Citation id="2" index={2} source="Family Process" year="2021" tier={1} />. Popular co-parenting apps include:
        </p>

        <StatCard
          stats={[
            { value: 68, suffix: '%', label: 'Reduction in conflict reported with co-parenting apps' },
            { value: 85, suffix: '%', label: 'Parents who find apps helpful for tracking schedules' },
            { value: 40, suffix: '%', label: 'Reduction in attorney fees with documented communication' },
          ]}
          source="Family Court Review, 2020"
        />

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>OurFamilyWizard:</strong> Calendar sharing, expense tracking, message board with ToneMeter™ that flags hostile language</li>
          <li><strong>Talking Parents:</strong> Court-admissible records, call recording, secure messaging</li>
          <li><strong>AppClose:</strong> Messaging, calendar, payment tracking, all communication timestamped and stored</li>
          <li><strong>Coparently:</strong> Scheduling, expense sharing, document storage, mediation features</li>
        </ul>

        <ArticleCallout variant="tip" title="Why Apps Help">
          <p>
            Apps create structure, prevent "he said/she said" disputes with documentation, and reduce impulsive emotional responses since everything is in writing <Citation id="6" index={6} source="Family Court Review" year="2020" tier={2} />.
          </p>
        </ArticleCallout>

        <h2 id="boundaries" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Setting Communication Boundaries
        </h2>
        <p className="mb-6">
          Healthy co-parenting requires clear boundaries <Citation id="7" index={7} source="Journal of Divorce & Remarriage" year="2021" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Topics: Children Only',
              description: <p>No personal questions, no commentary on dating/relationships, no financial discussions unrelated to kids. Stay laser-focused on children's needs.</p>,
            },
            {
              title: 'Method: Written Communication',
              description: <p>Email or app messages for non-urgent matters. Reduces escalation that happens in phone calls. Creates record of agreements.</p>,
            },
            {
              title: 'Response Time: Within 24-48 Hours',
              description: <p>Agree on reasonable response windows for non-emergency communication. Reduces anxiety and need for follow-ups.</p>,
            },
            {
              title: 'Emergency Protocol',
              description: <p>Define what constitutes emergency (injury, illness, school crisis). For emergencies only: phone call okay. Everything else: app/email.</p>,
            },
            {
              title: 'No Emotional Baiting',
              description: <p>Don't respond to insults, accusations, or attempts to argue. Acknowledge only child-related information <Citation id="4" index={4} source="Clinical Child and Family Psychology Review" year="2020" tier={1} />.</p>,
            },
          ]}
        />

        <h2 id="handling-difficult-messages" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Responding to Hostile Communication
        </h2>
        <p className="mb-6">
          When messages are hostile, accusatory, or baiting <Citation id="5" index={5} source="Journal of Family Psychology" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Wait before responding:</strong> Read, close the app, wait 24 hours. Never respond when angry.</li>
          <li><strong>Extract child-related facts only:</strong> Ignore personal attacks. Respond only to actual questions or information about children.</li>
          <li><strong>Use "gray rock" technique:</strong> Be boring and unemotional. Don't reward drama with engagement.</li>
          <li><strong>Don't defend or explain:</strong> DEE (Don't Defend, Explain, or Engage) keeps you from escalation spirals.</li>
          <li><strong>Document everything:</strong> Keep records in case of future legal proceedings.</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>
            If your ex sends a long, hostile message with 10 accusations and 1 question about pickup time — respond ONLY to the pickup question. Don't address anything else. This removes the reward for hostile behavior.
          </p>
        </ArticleCallout>

        <h2 id="parallel-parenting-communication" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Switch to Minimal Contact
        </h2>
        <p className="mb-6">
          If every interaction escalates despite best efforts, parallel parenting with minimal communication may be necessary <Citation id="8" index={8} source="Family Relations" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Use apps for essential logistics only</li>
          <li>Transitions at neutral locations (school, daycare)</li>
          <li>No phone calls except emergencies</li>
          <li>Each parent makes independent decisions during their time</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Effective co-parenting communication isn't about being friendly — it's about being functional. With structure, boundaries, and the right tools, you can communicate about children without unnecessary conflict.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(47),
    slug: 'parent-speaks-negatively-other-impact-children',
    title: 'When a Parent Speaks Negatively About the Other: The Impact on Children',
    description: 'Understand how parental bad-mouthing harms children and learn how to protect your child when an ex speaks negatively about you.',
    image: "/images/articles/cat06/cover-047.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parental Conflict', 'Bad-Mouthing', 'Child Wellbeing', 'Co-Parenting'],
    citations: [
      { id: '1', text: 'Interparental conflict and child adjustment', source: 'Clinical Child and Family Psychology Review', year: '2020', link: 'https://doi.org/10.1007/s10567-020-00319-3', tier: 1 },
      { id: '2', text: 'Bad-mouthing and parental alienation', source: 'Family Court Review', year: '2021', link: 'https://doi.org/10.1111/fcre.12571', tier: 2 },
      { id: '3', text: 'Children caught in loyalty conflicts', source: 'Journal of Family Psychology', year: '2019', link: 'https://doi.org/10.1037/fam0000561', tier: 1 },
      { id: '4', text: 'Long-term effects of negative parent talk', source: 'Development and Psychopathology', year: '2021', link: 'https://doi.org/10.1017/S0954579420000863', tier: 1 },
      { id: '5', text: 'Protective factors when one parent bad-mouths', source: 'Family Process', year: '2020', link: 'https://doi.org/10.1111/famp.12541', tier: 1 },
      { id: '6', text: 'Therapeutic interventions for parental alienation', source: 'Journal of Family Therapy', year: '2020', link: 'https://doi.org/10.1111/1467-6427.12295', tier: 1 },
      { id: '7', text: 'Supporting children without reciprocating hostility', source: 'Journal of Divorce & Remarriage', year: '2021', link: 'https://doi.org/10.1080/10502556.2020.1858237', tier: 1 },
      { id: '8', text: 'Legal interventions for alienating behaviors', source: 'Family Law Quarterly', year: '2020', link: 'https://www.jstor.org/stable/27048912', tier: 4 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Your dad doesn't really care about you.", "Your mom is a liar.", "If it weren't for your father, we'd have money." When parents speak negatively about each other, children don't just hear criticism — they internalize pain.
          </p>
          <p className="mb-6">
            Bad-mouthing the other parent is one of the most damaging things divorcing or separated parents can do <Citation id="1" index={1} source="Clinical Child and Family Psychology Review" year="2020" tier={1} />. Children see themselves as half of each parent — criticism of one parent feels like criticism of part of themselves.
          </p>
        </div>

        <h2 id="psychological-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Psychological Impact on Children
        </h2>
        <p className="mb-6">
          When children are exposed to negative talk about a parent, they experience <Citation id="4" index={4} source="Development and Psychopathology" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Loyalty conflicts:</strong> Feeling forced to choose sides or hide affection for the criticized parent</li>
          <li><strong>Shame and self-rejection:</strong> "If dad is bad and I'm like him, does that make me bad?"</li>
          <li><strong>Anxiety:</strong> Hypervigilance about saying the wrong thing or making either parent mad</li>
          <li><strong>Anger and resentment:</strong> Toward the bad-mouthing parent for putting them in this position</li>
          <li><strong>Depression:</strong> Feeling helpless and trapped between two people they love</li>
          <li><strong>Trust issues:</strong> Learning that people you love can talk badly about each other</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            Severe, chronic bad-mouthing can escalate into parental alienation — where a child rejects one parent entirely, believing the negative narrative <Citation id="2" index={2} source="Family Court Review" year="2021" tier={2} />. This is traumatic for everyone involved.
          </p>
        </ArticleCallout>

        <h2 id="forms-of-badmouthing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Bad-Mouthing Looks Like
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'direct-criticism',
              title: 'Direct Criticism',
              content: <p>"Your mother is selfish and doesn't care about anyone but herself." This is overt and clearly harmful, but parents sometimes justify it as "being honest."</p>,
            },
            {
              id: 'subtle-digs',
              title: 'Subtle Digs',
              content: <p>'Well, you know how your dad is..." Eye rolls, sighs, or sarcastic tone convey negativity without explicit words — but children pick up on it.</p>,
            },
            {
              id: 'victim-narrative',
              title: 'Playing the Victim',
              content: <p>"I wanted to take you on vacation, but your father says we can't afford it." This frames the other parent as the bad guy while appearing innocent.</p>,
            },
            {
              id: 'comparisons',
              title: 'Negative Comparisons',
              content: <p>'I would never forget your birthday like your mom did." Implying superiority by highlighting the other parent's failures.</p>,
            },
            {
              id: 'interrogation',
              title: 'Probing for Dirt',
              content: <p>"Did your dad's girlfriend stay over? What did they do?" Mining for information to fuel negativity or gossip.</p>,
            },
          ]}
        />

        <h2 id="if-your-ex-badmouths" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          If Your Ex Bad-Mouths You: What to Do
        </h2>
        <p className="mb-6">
          You can't control your ex's behavior, but you can protect your children and maintain your relationship with them <Citation id="5" index={5} source="Family Process" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'DO NOT Reciprocate',
              description: <p>The most important rule: don't bad-mouth back. It escalates conflict and confuses children. Be the calm, stable presence <Citation id="7" index={7} source="Journal of Divorce & Remarriage" year="2021" tier={1} />.</p>,
            },
            {
              title: 'Listen Without Pressuring',
              description: <p>If children repeat negative things they've heard, listen neutrally. 'That sounds like something you heard. What do you think about it?" Don't pump them for details.</p>,
            },
            {
              title: 'Gently Correct Misinformation',
              description: <p>If claims are factually untrue, calmly provide truth without attacking the other parent. 'Actually, I do help pay for school. But I understand this is confusing."</p>,
            },
            {
              title: 'Validate Their Feelings',
              description: <p>'It must be hard to hear different things from each of us." Let children express confusion, anger, or sadness without judgment.</p>,
            },
            {
              title: 'Reinforce Your Love',
              description: <p>"No matter what anyone says, I love you and I'm always here for you." Consistent reassurance builds security.</p>,
            },
            {
              title: 'Document and Seek Legal Help if Severe',
              description: <p>If bad-mouthing escalates to parental alienation, document instances and consult a family law attorney <Citation id="8" index={8} source="Family Law Quarterly" year="2020" tier={4} />. Courts take alienation seriously.</p>,
            },
          ]}
        />

        <h2 id="what-to-say" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What to Say to Children
        </h2>

        <BeforeAfter
          before={{
            title: 'Reciprocating (Harmful)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"Your mother is lying about me"</li>
                <li>"Don't believe what dad tells you"</li>
                <li>"Ask your mom why she's trying to turn you against me"</li>
                <li>"You'll understand when you're older what kind of person she is"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Protective Response (Helpful)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"Sometimes adults disagree. What matters is that we both love you"</li>
                <li>"I know you might hear different things from each of us. That must be confusing"</li>
                <li>"You don't have to choose between us"</li>
                <li>"I'm here if you ever want to talk about how this feels"</li>
              </ul>
            ),
          }}
        />

        <h2 id="therapy-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Therapy
        </h2>
        <p className="mb-6">
          Consider therapy if children show <Citation id="6" index={6} source="Journal of Family Therapy" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Refusing to see one parent without clear reason</li>
          <li>Repeating one parent's exact language or accusations</li>
          <li>Extreme anxiety about spending time with either parent</li>
          <li>School performance decline or social withdrawal</li>
          <li>Physical symptoms (stomachaches, headaches) before transitions</li>
        </ul>

        <QuoteBlock
          quote="You can't control what the other parent says. But you can control what you say, and your consistent love and stability will matter more than any words spoken against you."
          attribution="Dr. Joshua Coleman"
          role="Parental Alienation Expert"
          source="When Parents Hurt"
          variant="default"
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            Bad-mouthing hurts children more than it hurts you. By refusing to reciprocate, you protect your children's wellbeing and preserve your relationship with them. Take the high road — always.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(48),
    slug: 'shared-custody-attachment-transitions-young-children',
    title: 'Shared Custody and Attachment: How Transitions Affect Young Children',
    description: 'Learn how frequent transitions between parents affect attachment security in young children and strategies to minimize disruption.',
    image: "/images/articles/cat06/cover-048.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Attachment', 'Shared Custody', 'Young Children', 'Parenting Plans'],
    citations: [
      { id: '1', text: 'Attachment security in shared custody arrangements', source: 'Attachment & Human Development', year: '2020', link: 'https://doi.org/10.1080/14616734.2020.1751988', tier: 1 },
      { id: '2', text: 'Developmental needs in custody schedules', source: 'Family Court Review', year: '2021', link: 'https://doi.org/10.1111/fcre.12568', tier: 2 },
      { id: '3', text: 'Overnight visits for infants and toddlers', source: 'Journal of Family Psychology', year: '2019', link: 'https://doi.org/10.1037/fam0000582', tier: 1 },
      { id: '4', text: 'Transition stress in young children', source: 'Infant Mental Health Journal', year: '2020', link: 'https://doi.org/10.1002/imhj.21847', tier: 1 },
      { id: '5', text: 'Parenting plans for children under 3', source: 'Family Relations', year: '2020', link: 'https://doi.org/10.1111/fare.12447', tier: 1 },
      { id: '6', text: 'Graduated parenting schedules', source: 'Parenting: Science and Practice', year: '2021', link: 'https://doi.org/10.1080/15295192.2020.1855185', tier: 1 },
      { id: '7', text: 'Consistency across households and attachment', source: 'Child Development', year: '2020', link: 'https://doi.org/10.1111/cdev.13389', tier: 1 },
      { id: '8', text: 'Supporting secure attachment post-separation', source: 'Clinical Child and Family Psychology Review', year: '2021', link: 'https://doi.org/10.1007/s10567-020-00341-5', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A two-year-old can't understand "You'll see Daddy in three days." They experience separations as disappearances. For young children, attachment security depends on predictability, consistency, and the presence of primary caregivers.
          </p>
          <p className="mb-6">
            Shared custody arrangements that work for older children can be developmentally inappropriate for infants and toddlers <Citation id="1" index={1} source="Attachment & Human Development" year="2020" tier={1} />. Understanding developmental needs helps create custody schedules that protect attachment.
          </p>
        </div>

        <h2 id="attachment-basics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Attachment Needs by Age
        </h2>
        <p className="mb-6">
          Attachment theory tells us that young children need consistent, responsive caregivers to develop secure attachment <Citation id="2" index={2} source="Family Court Review" year="2021" tier={2} />. Different ages have different needs:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'infants',
              title: 'Infants (0-12 months)',
              content: (
                <div>
                  <p className="mb-4"><strong>Needs:</strong> Predictable routines, consistent primary caregiver(s), minimal disruption</p>
                  <p className="mb-4"><strong>Risks of extended separation:</strong> Attachment disruption, increased stress response, feeding/sleep problems</p>
                  <p className="mb-2"><strong>Recommended schedule:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Frequent short visits (daily or every other day) rather than long stretches</li>
                    <li>Overnights only if non-primary parent has established caregiving relationship</li>
                    <li>Consistency in routines across both homes</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'toddlers',
              title: 'Toddlers (1-3 years)',
              content: (
                <div>
                  <p className="mb-4"><strong>Needs:</strong> Secure base, predictable schedules, object permanence still developing</p>
                  <p className="mb-4"><strong>Risks:</strong> Separation anxiety, confusion about parent's return, regression</p>
                  <p className="mb-2"><strong>Recommended schedule:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Shorter time blocks (2-3 days maximum)</li>
                    <li>Visual calendars with photos to show who they'll be with</li>
                    <li>Consistent transition objects (favorite stuffed animal travels between homes)</li>
                    <li>Regular communication with other parent (brief phone/video calls)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'preschool',
              title: 'Preschool (3-5 years)',
              content: (
                <div>
                  <p className="mb-4"><strong>Needs:</strong> Routine and structure, both parents actively involved</p>
                  <p className="mb-4"><strong>Capabilities:</strong> Better understanding of time, can handle longer separations</p>
                  <p className="mb-2"><strong>Recommended schedule:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>2-2-3 or 3-4 day rotations work well</li>
                    <li>Picture calendars showing the weekly pattern</li>
                    <li>Consistent bedtime/mealtime routines in both homes</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="overnight-debate" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Overnight Visits Debate
        </h2>
        <p className="mb-6">
          Should infants and toddlers have overnight visits with non-primary caregivers? Research is mixed, but generally suggests <Citation id="3" index={3} source="Journal of Family Psychology" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Under 18 months:</strong> If possible, frequent daytime visits without overnights support attachment better than week-long separations from primary caregiver</li>
          <li><strong>18 months - 3 years:</strong> Overnights can work if the non-primary parent has established caregiving routines (feeding, soothing, bedtime)</li>
          <li><strong>Quality matters more than quantity:</strong> A parent who's actively involved in caregiving can have overnights earlier than one who hasn't been engaged</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            This is controversial. Some experts prioritize equal parenting time from birth; others emphasize primary attachment figure consistency. Courts increasingly favor shared time, but developmental needs should inform schedules <Citation id="5" index={5} source="Family Relations" year="2020" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="transition-stress" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Minimizing Transition Stress
        </h2>
        <p className="mb-6">
          Transitions between parents are stressful for young children <Citation id="4" index={4} source="Infant Mental Health Journal" year="2020" tier={1} />. Strategies to reduce stress:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Consistent Routines',
              description: <p>Align bedtimes, mealtimes, and nap schedules across homes as much as possible <Citation id="7" index={7} source="Child Development" year="2020" tier={1} />. Predictability reduces anxiety.</p>,
            },
            {
              title: 'Transition Objects',
              description: <p>A special stuffed animal, blanket, or toy that travels with the child provides comfort and continuity.</p>,
            },
            {
              title: 'Positive Send-Offs',
              description: <p>The sending parent should be cheerful and confident: "You're going to have fun with Mommy! I'll see you soon!" Anxiety at transitions increases child stress.</p>,
            },
            {
              title: 'Neutral Exchange Locations',
              description: <p>For conflictual parents, exchange at daycare or school prevents children from witnessing tension.</p>,
            },
            {
              title: 'Brief Check-Ins',
              description: <p>A short video call or voice message from the other parent can reassure young children they haven't been abandoned.</p>,
            },
          ]}
        />

        <h2 id="graduated-schedules" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Graduated Parenting Plans
        </h2>
        <p className="mb-6">
          Schedules should evolve as children grow <Citation id="6" index={6} source="Parenting: Science and Practice" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>0-12 months:</strong> Frequent short visits, overnights only if strong caregiving bond</li>
          <li><strong>1-3 years:</strong> 2-3 day blocks, overnights increase gradually</li>
          <li><strong>3-5 years:</strong> 3-4 day blocks, week-on/week-off may still be too long</li>
          <li><strong>5+ years:</strong> Week-on/week-off or similar longer blocks become workable</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            Build flexibility into court orders. "As child develops and non-primary parent establishes caregiving routines, overnight schedule may increase" allows adjustment without costly court modifications.
          </p>
        </ArticleCallout>

        <h2 id="when-conflict-threatens-attachment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Parental Conflict Undermines Attachment
        </h2>
        <p className="mb-6">
          The biggest threat to children's attachment security isn't shared custody — it's parental conflict <Citation id="8" index={8} source="Clinical Child and Family Psychology Review" year="2021" tier={1} />. Children exposed to ongoing hostility, transitions filled with tension, or loyalty conflicts suffer more than those in any particular custody arrangement.
        </p>
        <p className="mb-6">
          Reducing conflict, supporting the child's relationship with both parents, and maintaining routine consistency matter more than the exact number of overnights.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Shared custody can work for young children when schedules match developmental needs, routines are consistent, and parental conflict is low. The goal isn't equal time at all costs — it's secure attachment to both parents.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(49),
    slug: 'dating-again-single-parent-managing-emotions',
    title: "Dating Again as a Single Parent: Managing Your Own and Your Children's Emotions",
    description: "Navigate the challenges of dating after divorce or separation while protecting your children and managing complex emotions.",
    image: "/images/articles/cat06/cover-049.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Dating', 'Single Parenting', 'New Relationships', 'Blended Families'],
    citations: [
      { id: '1', text: 'Post-divorce dating and family adjustment', source: 'Family Relations', year: '2020', link: 'https://doi.org/10.1111/fare.12452', tier: 1 },
      { id: '2', text: "Children's reactions to parental dating", source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000798', tier: 1 },
      { id: '3', text: 'Timing of partner introductions', source: 'Journal of Divorce & Remarriage', year: '2019', link: 'https://doi.org/10.1080/10502556.2019.1620901', tier: 1 },
      { id: '4', text: 'Attachment and new relationships post-divorce', source: 'Personal Relationships', year: '2020', link: 'https://doi.org/10.1111/pere.12335', tier: 1 },
      { id: '5', text: "Managing children's loyalty conflicts", source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12648', tier: 1 },
      { id: '6', text: 'Red flags in post-divorce dating', source: 'Journal of Family Issues', year: '2020', link: 'https://doi.org/10.1177/0192513X20918625', tier: 1 },
      { id: '7', text: 'Integrating new partners into family systems', source: 'Family Relations', year: '2021', link: 'https://doi.org/10.1111/fare.12511', tier: 1 },
      { id: '8', text: 'Co-parenting and new relationships', source: 'Journal of Social and Personal Relationships', year: '2019', link: 'https://doi.org/10.1177/0265407518819295', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Dating as a single parent is complicated. You're healing from heartbreak, figuring out your identity, protecting your children, and trying to stay open to connection — all at once. And every step affects not just you, but your kids.
          </p>
          <p className="mb-6">
            Navigating new relationships after divorce requires balancing your needs for companionship with your children's need for stability <Citation id="1" index={1} source="Family Relations" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="when-to-start" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Start Dating
        </h2>
        <p className="mb-6">
          There's no universal timeline, but consider:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Your emotional readiness:</strong> Have you processed the divorce grief? Dating from a place of desperation for validation often leads to poor choices <Citation id="4" index={4} source="Personal Relationships" year="2020" tier={1} />.</li>
          <li><strong>Children's adjustment:</strong> Are they relatively stable in the new living arrangement? If they're still struggling with the separation, adding a dating relationship may overwhelm them.</li>
          <li><strong>Your capacity:</strong> Single parenting is exhausting. Do you have bandwidth for dating, or will it stretch you too thin?</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            Many therapists recommend waiting at least 6-12 months post-separation before seriously dating. Casual dating earlier is fine, but serious relationships benefit from you being more healed and stable.
          </p>
        </ArticleCallout>

        <h2 id="children-reactions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Children React to Parental Dating
        </h2>
        <p className="mb-6">
          Children's responses vary by age and temperament, but common reactions include <Citation id="2" index={2} source="Journal of Family Psychology" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'young',
              title: 'Young Children (3-7)',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Jealousy over sharing your attention</li>
                  <li>Confusion about family roles</li>
                  <li>Regression (clinginess, tantrums)</li>
                  <li>Hope that you'll reunite with their other parent</li>
                </ul>
              ),
            },
            {
              id: 'school-age',
              title: 'School-Age (8-12)',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Loyalty conflicts ("Am I betraying mom if I like dad's girlfriend?")</li>
                  <li>Embarrassment or anger</li>
                  <li>Testing boundaries with new partner</li>
                  <li>Grieving finality of parents" relationship</li>
                </ul>
              ),
            },
            {
              id: 'teens',
              title: 'Adolescents (13+)',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Judgment or criticism of your choices</li>
                  <li>Withdrawal or hostility toward new partner</li>
                  <li>Concerns about how this affects them (living arrangements, college plans)</li>
                  <li>Worry about other parent's feelings</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="when-to-introduce" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Introduce a New Partner
        </h2>
        <p className="mb-6">
          Don't introduce children to every person you date. Wait until <Citation id="3" index={3} source="Journal of Divorce & Remarriage" year="2019" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Relationship Is Serious',
              description: <p>At least 6 months of dating, clear commitment trajectory. Children don't need to meet casual dates.</p>,
            },
            {
              title: "You\'re Confident",
              description: <p>You genuinely see long-term potential. Don't introduce someone you're unsure about — children form attachments.</p>,
            },
            {
              title: 'Timing Is Right',
              description: <p>Children are adjusted to post-divorce life, not in crisis (school struggles, grief), and you've prepared them.</p>,
            },
            {
              title: 'Keep It Casual',
              description: <p>First meeting: low-key group activity (park, bowling), not overnight or vacation. Let relationship build gradually.</p>,
            },
            {
              title: 'Let Children Set the Pace',
              description: <p>Don't force affection or closeness. Some children warm up quickly; others need months or years.</p>,
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p>
            Introducing multiple partners over time ("revolving door") harms children's ability to trust and attach <Citation id="5" index={5} source="Family Process" year="2021" tier={1} />. Be selective about who meets your kids.
          </p>
        </ArticleCallout>

        <h2 id="managing-emotions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Managing Your Own Emotions
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Loneliness:</strong> It's okay to want adult companionship. But don't rush into relationships to avoid being alone — heal first.</li>
          <li><strong>Guilt:</strong> You deserve love and happiness. Dating doesn't make you a bad parent — neglecting your kids for dating does.</li>
          <li><strong>Fear of rejection:</strong> Dating after divorce means being vulnerable again. Go slow, therapy helps.</li>
          <li><strong>Comparing to ex:</strong> Notice when you're dating 'rebound versions' of your ex or opposite extremes. Seek healthy partners, not reactions to past pain.</li>
        </ul>

        <h2 id="red-flags" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Red Flags to Watch For
        </h2>
        <p className="mb-6">
          As a single parent, you have extra responsibility to vet partners carefully <Citation id="6" index={6} source="Journal of Family Issues" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Rushing intimacy or pushing to meet your children too soon</li>
          <li>Disrespecting your boundaries around parenting time or decisions</li>
          <li>Bad-mouthing your ex or trying to position themselves as "real parent"</li>
          <li>Impatience with children's adjustment or negative reactions</li>
          <li>Signs of anger issues, controlling behavior, or substance abuse</li>
          <li>Expecting you to prioritize them over your children</li>
        </ul>

        <h2 id="navigating-ex" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Navigating Your Ex's Reactions
        </h2>
        <p className="mb-6">
          Your ex may react with jealousy, anger, or increased conflict <Citation id="8" index={8} source="Journal of Social and Personal Relationships" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Don't flaunt new relationships to punish your ex</li>
          <li>Keep details private — co-parenting messages should focus on children only</li>
          <li>Prepare for potential custody or visitation conflicts</li>
          <li>If ex uses children to get information, don't use children to send messages back</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Dating as a single parent means holding two truths: you deserve love and companionship, AND your children's stability comes first. Go slow, choose wisely, and don't sacrifice your kids' wellbeing for adult relationships <Citation id="7" index={7} source="Family Relations" year="2021" tier={1} />.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(50),
    slug: 'long-term-mental-health-outcomes-children-divorce',
    title: 'The Long-Term Mental Health Outcomes of Children of Divorce',
    description: "Explore what research reveals about how divorce affects children's mental health into adulthood, and the protective factors that support resilience.",
    image: '/images/articles/cat06/cover-050.svg',
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Divorce', 'Research', 'Long-Term Outcomes', 'Resilience'],
    citations: [
      { id: '1', text: 'Long-term effects of parental divorce', source: 'Child Development', year: '2019', link: 'https://doi.org/10.1111/cdev.13224', tier: 1 },
      { id: '2', text: 'Adult children of divorce: Relationship patterns', source: 'Journal of Marriage and Family', year: '2020', link: 'https://doi.org/10.1111/jomf.12672', tier: 1 },
      { id: '3', text: 'Mental health outcomes in adulthood', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2020.101947', tier: 1 },
      { id: '4', text: 'Protective factors and resilience', source: 'Development and Psychopathology', year: '2020', link: 'https://doi.org/10.1017/S0954579419001627', tier: 1 },
      { id: '5', text: 'Divorce effects vary by conflict level', source: 'Family Process', year: '2019', link: 'https://doi.org/10.1111/famp.12465', tier: 1 },
      { id: '6', text: 'Socioeconomic impact on long-term outcomes', source: 'Journal of Family Psychology', year: '2020', link: 'https://doi.org/10.1037/fam0000641', tier: 1 },
      { id: '7', text: 'Longitudinal studies of children of divorce', source: 'American Psychologist', year: '2018', link: 'https://doi.org/10.1037/amp0000368', tier: 1 },
      { id: '8', text: 'Parenting quality matters more than family structure', source: 'Child Development Perspectives', year: '2021', link: 'https://doi.org/10.1111/cdep.12407', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Does divorce ruin children's lives? The answer is more nuanced than headlines suggest. Long-term research shows that most children of divorce grow into well-adjusted adults — but the path depends heavily on how parents handle the divorce.
          </p>
          <p className="mb-6">
            Large longitudinal studies tracking children from divorce through adulthood reveal both risks and resilience <Citation id="1" index={1} source="Child Development" year="2019" tier={1} />.
          </p>
        </div>

        <h2 id="what-research-shows" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Research Shows
        </h2>
        <p className="mb-6">
          Decades of research have identified patterns in how children of divorce fare long-term <Citation id="7" index={7} source="American Psychologist" year="2018" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 75, suffix: '%', label: 'Children of divorce who adjust well' },
            { value: 25, suffix: '%', label: 'Who experience lasting difficulties' },
            { value: 2, suffix: 'x', label: 'Divorce risk in own marriages (vs children of intact families)' },
          ]}
          source="American Psychologist, 2018"
        />

        <h2 id="areas-of-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Areas of Long-Term Impact
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'relationships',
              title: 'Romantic Relationships',
              content: (
                <div>
                  <p className="mb-4">
                    Adult children of divorce are statistically more likely to divorce themselves and may struggle with commitment or trust <Citation id="2" index={2} source="Journal of Marriage and Family" year="2020" tier={1} />. However, many develop strong, healthy relationships.
                  </p>
                  <p className="mb-2"><strong>Protective factors:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Secure attachment to at least one parent</li>
                    <li>Witnessing parental civility post-divorce</li>
                    <li>Therapy to process family patterns</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'mental-health',
              title: 'Mental Health',
              content: (
                <div>
                  <p className="mb-4">
                    Children of high-conflict divorces show elevated rates of anxiety and depression into adulthood <Citation id="3" index={3} source="Clinical Psychology Review" year="2021" tier={1} />. Those from low-conflict divorces often fare as well as children from intact families.
                  </p>
                  <p><strong>Key finding:</strong> Ongoing parental conflict matters more than divorce itself.</p>
                </div>
              ),
            },
            {
              id: 'education-career',
              title: 'Education and Career',
              content: (
                <div>
                  <p className="mb-4">
                    Some studies show modest negative effects on educational attainment and income, often mediated by economic hardship post-divorce <Citation id="6" index={6} source="Journal of Family Psychology" year="2020" tier={1} />.
                  </p>
                  <p>When financial stability is maintained, educational outcomes are often unaffected.</p>
                </div>
              ),
            },
            {
              id: 'attachment',
              title: 'Attachment Patterns',
              content: (
                <p>
                  Children who experience parental conflict, loyalty binds, or emotional neglect may develop insecure attachment styles affecting all relationships. Those who maintain secure bonds with parents typically develop secure adult attachment.
                </p>
              ),
            },
          ]}
        />

        <h2 id="not-all-equal" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Not All Divorces Are Equal
        </h2>
        <p className="mb-6">
          Outcomes vary dramatically based on circumstances <Citation id="5" index={5} source="Family Process" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>High-conflict divorce:</strong> Ongoing hostility, litigation, loyalty conflicts — highest risk for poor outcomes</li>
          <li><strong>Low-conflict divorce:</strong> Civil co-parenting, minimal child exposure to conflict — outcomes similar to intact families</li>
          <li><strong>Divorce from abuse:</strong> Often improves children's wellbeing by removing exposure to violence</li>
          <li><strong>Amicable divorce:</strong> Parents who genuinely cooperate and maintain child focus — children often thrive</li>
        </ul>

        <ArticleCallout variant="key-takeaway" title="The Decisive Factor">
          <p>
            Research consistently shows: parental conflict is more harmful than divorce <Citation id="8" index={8} source="Child Development Perspectives" year="2021" tier={1} />. Children in high-conflict intact families often have worse outcomes than children of low-conflict divorces.
          </p>
        </ArticleCallout>

        <h2 id="protective-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Protective Factors That Build Resilience
        </h2>
        <p className="mb-6">
          What helps children thrive despite divorce <Citation id="4" index={4} source="Development and Psychopathology" year="2020" tier={1} />?
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Low Parental Conflict',
              description: <p>Cooperative co-parenting, no bad-mouthing, children not caught in middle. Single most important factor.</p>,
            },
            {
              title: 'Secure Attachment to At Least One Parent',
              description: <p>Consistent, warm relationship with at least one parent provides safety and stability.</p>,
            },
            {
              title: 'Financial Stability',
              description: <p>Avoiding poverty post-divorce reduces stress and maintains access to resources (activities, therapy, education).</p>,
            },
            {
              title: 'Minimal Life Disruption',
              description: <p>Staying in same school, maintaining friendships, consistent routines provide stability.</p>,
            },
            {
              title: 'Age-Appropriate Communication',
              description: <p>Honest explanations without adult details, permission to ask questions, validation of feelings.</p>,
            },
            {
              title: 'Access to Support',
              description: <p>Therapy when needed, supportive extended family, understanding teachers/mentors.</p>,
            },
          ]}
        />

        <h2 id="positive-outcomes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Positive Outcomes Are Possible
        </h2>
        <p className="mb-6">
          Many children of divorce develop strengths from navigating family change:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Enhanced emotional intelligence and empathy</li>
          <li>Resilience and adaptability to change</li>
          <li>Independence and problem-solving skills</li>
          <li>Appreciation for healthy relationships</li>
          <li>Motivation to create stability in their own families</li>
        </ul>

        <QuoteBlock
          quote="Divorce is a risk factor, not a life sentence. How parents handle divorce — the conflict level, the co-parenting quality, the stability they provide — determines outcomes far more than the divorce itself."
          attribution="Dr. E. Mavis Hetherington"
          role="Developmental Psychologist"
          source="For Better or For Worse: Divorce Reconsidered"
          variant="default"
        />

        <h2 id="what-parents-can-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Parents Can Do
        </h2>
        <p className="mb-6">
          If you're divorcing, focus on what you can control:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Minimize conflict and shield children from adult problems</li>
          <li>Maintain stability in children's daily lives</li>
          <li>Foster secure, warm relationships with both parents</li>
          <li>Seek therapy for children showing adjustment difficulties</li>
          <li>Ensure financial stability when possible</li>
          <li>Let children be children — don't parentify or use as confidants</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            If you're an adult child of divorce struggling with relationship patterns or mental health impacts, therapy can help. Understanding family patterns and working through unresolved grief creates pathways to healthier relationships.
          </p>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway">
          <p>
            Divorce doesn't doom children to poor outcomes. Most adjust well, especially when parents minimize conflict and prioritize children's needs. The quality of parenting post-divorce matters more than the divorce itself.
          </p>
        </ArticleCallout>
      </>
    ),
  },
];
