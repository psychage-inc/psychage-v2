/* eslint-disable no-useless-escape */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_TRAUMA_HEALING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const traumaInformedCareArticlesA: Article[] = [
  {
    id: catId(41),
    slug: 'trauma-informed-care-principles-everyone-should-know',
    title: 'What Is Trauma-Informed Care? The Principles Everyone Should Know',
    description: 'Learn the core principles of trauma-informed care and how this framework transforms healthcare, education, and human services.',
    image: "/images/articles/cat11/cover-041.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Trauma-Informed Care', 'TIC Principles', 'Safety', 'Empowerment'],
    citations: [
      {
        id: '1',
        text: "SAMHSA\'s concept of trauma and guidance for a trauma-informed approach",
        source: 'SAMHSA',
        year: '2014',
        link: 'https://store.samhsa.gov/product/SAMHSA-s-Concept-of-Trauma-and-Guidance-for-a-Trauma-Informed-Approach/SMA14-4884',
        tier: 2,
      },
      {
        id: '2',
        text: 'The implementation of trauma-informed care: A systematic review',
        source: 'Trauma, Violence, & Abuse',
        year: '2021',
        link: 'https://doi.org/10.1177/1524838021991305',
        tier: 1,
      },
      {
        id: '3',
        text: 'Trauma-informed care in behavioral health services',
        source: 'Journal of Behavioral Health Services & Research',
        year: '2020',
        link: 'https://doi.org/10.1007/s11414-020-09726-z',
        tier: 1,
      },
      {
        id: '4',
        text: 'The adverse childhood experiences study and the need for trauma-informed care',
        source: 'Pediatrics',
        year: '2020',
        link: 'https://doi.org/10.1542/peds.2019-3852',
        tier: 1,
      },
      {
        id: '5',
        text: 'Trauma-informed care: What it is and why it matters',
        source: 'Clinical Psychological Science',
        year: '2019',
        link: 'https://doi.org/10.1177/2167702619857309',
        tier: 1,
      },
      {
        id: '6',
        text: 'Creating trauma-informed systems: Child welfare, education, first responders, health care, juvenile justice',
        source: 'Routledge',
        year: '2019',
        link: 'https://www.routledge.com/Creating-Trauma-Informed-Systems/',
        tier: 5,
      },
      {
        id: '7',
        text: 'Outcomes of trauma-informed care implementation in healthcare settings',
        source: 'Journal of Nursing Care Quality',
        year: '2021',
        link: 'https://doi.org/10.1097/NCQ.0000000000000498',
        tier: 1,
      },
      {
        id: '8',
        text: 'The neuroscience of trauma-informed care',
        source: 'Frontiers in Psychology',
        year: '2020',
        link: 'https://doi.org/10.3389/fpsyg.2020.01937',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Imagine walking into a hospital, and before anyone asks about your symptoms, they dim the harsh fluorescent lights and speak in calm tones. The intake form doesn't ask invasive questions without explanation. No one touches you without asking permission first. This isn't luxury care—it's trauma-informed care: a paradigm shift in how systems serve people, based on one fundamental understanding: <em>trauma is common, and the way we deliver services can either heal or retraumatize.</em>
          </p>
          <p className="mb-6">
            Trauma-informed care (TIC) isn't a clinical intervention or a specific therapy. It's a framework for delivering services—in healthcare, education, criminal justice, social services, and beyond—with an awareness of trauma's prevalence and impact <Citation id="1" index={1} source="SAMHSA" year="2014" tier={2} />. It shifts the question from "What's wrong with you?" to "What happened to you?"—and transforms how institutions interact with the people they serve.
          </p>
        </div>

        <h2 id="what-is-tic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Trauma-Informed Care?
        </h2>
        <p className="mb-6">
          Trauma-informed care is an organizational approach that recognizes the widespread impact of trauma and integrates knowledge about trauma into policies, procedures, and practices <Citation id="2" index={2} source="Trauma, Violence, & Abuse" year="2021" tier={1} />. Key assumptions include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Trauma is common:</strong> Up to 70% of adults have experienced at least one traumatic event. Many people seeking services carry trauma histories.</li>
          <li><strong>Trauma affects everyone differently:</strong> Responses vary based on type, timing, and individual factors.</li>
          <li><strong>Services can retraumatize:</strong> Traditional approaches (coercion, restraints, lack of choice) can mirror trauma dynamics and cause harm.</li>
          <li><strong>Recovery is possible:</strong> People are resilient, and the right environment supports healing.</li>
        </ul>

        <StatCard
          stats={[
            { value: 61, suffix: '%', label: 'of adults report at least one adverse childhood experience (ACE)' },
            { value: 16, suffix: '%', label: 'report four or more ACEs (high trauma exposure)' },
            { value: 85, suffix: '%', label: 'of people seeking mental health/substance use services have trauma histories' },
          ]}
          source="CDC, 2023"
        />

        <h2 id="six-principles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Six Principles of Trauma-Informed Care
        </h2>
        <p className="mb-6">
          SAMHSA identifies six core principles that guide trauma-informed practice <Citation id="1" index={1} source="SAMHSA" year="2014" tier={2} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'safety',
              title: '1. Safety',
              content: (
                <div>
                  <p className="mb-4"><strong>Physical and emotional safety for everyone—clients and staff.</strong></p>
                  <p className="mb-4">In practice:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Clear, predictable procedures</li>
                    <li>Safe physical environments (good lighting, comfortable spaces, visible exits)</li>
                    <li>Staff trained in de-escalation, not force</li>
                    <li>Confidentiality respected</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'trustworthiness',
              title: '2. Trustworthiness and Transparency',
              content: (
                <div>
                  <p className="mb-4"><strong>Operations and decisions are conducted with transparency to build trust.</strong></p>
                  <p className="mb-4">In practice:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Clear communication about what to expect</li>
                    <li>Honest explanations for procedures</li>
                    <li>Following through on commitments</li>
                    <li>Admitting mistakes and repairing ruptures</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'peer-support',
              title: '3. Peer Support',
              content: (
                <div>
                  <p className="mb-4"><strong>Mutual self-help and shared experiences are integral to recovery.</strong></p>
                  <p className="mb-4">In practice:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Peer support specialists on staff</li>
                    <li>Support groups facilitated by those with lived experience</li>
                    <li>Recognition that healing happens in connection</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'collaboration',
              title: '4. Collaboration and Mutuality',
              content: (
                <div>
                  <p className="mb-4"><strong>Power differences are leveled; decisions are made together.</strong></p>
                  <p className="mb-4">In practice:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Shared decision-making about treatment</li>
                    <li>Clients involved in program planning</li>
                    <li>Staff and clients work <em>with</em> each other, not <em>on</em> each other</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'empowerment',
              title: '5. Empowerment, Voice, and Choice',
              content: (
                <div>
                  <p className="mb-4"><strong>Strengths are recognized and built upon; autonomy is supported.</strong></p>
                  <p className="mb-4">In practice:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Clients have meaningful choices (appointment times, treatment options)</li>
                    <li>Strengths-based language ("What's strong with you?")</li>
                    <li>Respect for "no"—people can decline interventions</li>
                    <li>Recognition of resilience, not just pathology</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'cultural',
              title: '6. Cultural, Historical, and Gender Issues',
              content: (
                <div>
                  <p className="mb-4"><strong>Recognizing and addressing historical trauma, bias, and power dynamics.</strong></p>
                  <p className="mb-4">In practice:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Culturally responsive care (language access, cultural humility)</li>
                    <li>Awareness of systemic oppression as trauma</li>
                    <li>Gender-responsive services (recognizing different trauma patterns)</li>
                    <li>Addressing institutional racism, sexism, homophobia</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="trauma-informed-vs-trauma-specific" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Trauma-Informed vs. Trauma-Specific Care
        </h2>
        <p className="mb-6">
          These terms are often confused <Citation id="5" index={5} source="Clinical Psychological Science" year="2019" tier={1} />:
        </p>

        <ComparisonTable
          title="Key Distinctions"
          columns={['Approach', 'Focus', 'Who Provides It']}
          items={[
            { feature: 'Trauma-Informed Care', values: ['Creating safe, empowering environments for ALL people', 'Everyone: receptionists, nurses, teachers, case workers, security'] },
            { feature: 'Trauma-Specific Treatment', values: ['Directly treating PTSD and trauma symptoms', 'Trained clinicians: EMDR, CPT, PE therapists'] },
          ]}
        />

        <p className="mb-6">
          <strong>Example:</strong> A trauma-informed emergency room doesn't assume every patient needs EMDR. But it <em>does</em> ensure that no one is restrained without extreme necessity, that staff ask before touching patients, and that the environment minimizes triggers (bright lights, loud alarms, lack of privacy).
        </p>

        <h2 id="what-tic-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Trauma-Informed Care Looks Like in Practice
        </h2>

        <BeforeAfter
          before={{
            title: 'Traditional Approach (Potentially Retraumatizing)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Intake forms ask invasive questions with no explanation</li>
                <li>Staff touch patients without asking permission</li>
                <li>Bright fluorescent lights, loud environments</li>
                <li>Coercion or restraints used quickly</li>
                <li>"You need to comply with treatment"</li>
                <li>Punishment for "non-compliance"</li>
                <li>Focus on deficits: "What's wrong with you?"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Trauma-Informed Approach',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Forms explain why information is needed; optional questions clearly marked</li>
                <li>Staff ask: "Is it okay if I listen to your lungs?"</li>
                <li>Adjustable lighting, quiet spaces, calming colors</li>
                <li>De-escalation prioritized; restraints last resort with trauma-aware protocols</li>
                <li>"What would help you feel safe enough to participate?"</li>
                <li>Curiosity about barriers: "What's getting in the way?"</li>
                <li>Focus on strengths: "What happened to you? What's helped you survive?"</li>
              </ul>
            ),
          }}
        />

        <h2 id="benefits" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Benefits of Trauma-Informed Care
        </h2>
        <p className="mb-6">
          Research shows trauma-informed approaches improve outcomes <Citation id="7" index={7} source="Journal of Nursing Care Quality" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Better engagement:</strong> Clients are more likely to attend appointments and complete treatment</li>
          <li><strong>Reduced retraumatization:</strong> Fewer adverse events (seclusion, restraint, crisis escalations)</li>
          <li><strong>Improved staff satisfaction:</strong> Lower burnout, better retention</li>
          <li><strong>Cost savings:</strong> Fewer emergency interventions, better long-term outcomes</li>
          <li><strong>Enhanced safety:</strong> For both clients and staff</li>
        </ul>

        <h2 id="implementing-tic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Organizations Implement TIC
        </h2>
        <p className="mb-6">
          Trauma-informed care isn't a checklist—it's a cultural transformation <Citation id="6" index={6} source="Creating Trauma-Informed Systems" year="2019" tier={5} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Organizational assessment', description: <p>Evaluate current practices: Where might we be retraumatizing? What's already working?</p> },
            { title: 'Leadership commitment', description: <p>TIC must be championed from the top and resourced adequately (training, time, policy changes).</p> },
            { title: 'Universal trauma training', description: <p>ALL staff (not just clinicians) learn about trauma, its impact, and the six principles.</p> },
            { title: 'Policy revision', description: <p>Review restraint protocols, intake procedures, physical environment, communication norms. Revise to align with TIC principles.</p> },
            { title: 'Ongoing evaluation', description: <p>Collect data: Are seclusion/restraint rates dropping? Is engagement improving? Are clients reporting feeling safe?</p> },
            { title: 'Self-care for staff', description: <p>Vicarious trauma is real. TIC organizations support staff well-being to prevent burnout and compassion fatigue.</p> },
          ]}
        />

        <h2 id="tic-across-settings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          TIC Across Different Settings
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Healthcare:</strong> Ask permission before touch, explain procedures, offer pain management, minimize wait times</li>
          <li><strong>Schools:</strong> Understand behavior as communication, use restorative practices not punishment, create sensory-safe classrooms</li>
          <li><strong>Criminal justice:</strong> Minimize use of solitary confinement, trauma screening at intake, gender-responsive programming</li>
          <li><strong>Child welfare:</strong> Keep families together when safe, minimize placements, involve parents as partners</li>
          <li><strong>Homeless services:</strong> Low-barrier access, harm reduction approaches, respect autonomy</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p><strong>Bottom line:</strong> Trauma-informed care recognizes that people don't come to services as blank slates. They bring histories—and those histories shape how they experience help. When we ignore trauma, we risk harm. When we acknowledge it, we create conditions for healing.</p>
        </ArticleCallout>

        <h2 id="asking-for-tic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Advocate for Trauma-Informed Care
        </h2>
        <p className="mb-6">
          As a service user, you can ask:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"Is this organization trauma-informed?"</li>
          <li>"Can I have some time to decide before starting this procedure?"</li>
          <li>"Is there a quieter space I can wait in?"</li>
          <li>"Can you explain why you need this information?"</li>
        </ul>
        <p className="mb-6">
          If a provider responds defensively to these questions, that's information. Trauma-informed organizations welcome these conversations—because they're committed to continuous improvement, not defensiveness.
        </p>
      </>
    ),
  },
  {
    id: catId(42),
    slug: 'trauma-informed-parenting-raising-children-adversity',
    title: 'Trauma-Informed Parenting: Raising Children Who Have Experienced Adversity',
    description: 'Learn trauma-informed parenting strategies that help children heal from adverse experiences while building safety, trust, and resilience.',
    image: "/images/articles/cat11/cover-042.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Trauma-Informed Parenting', 'Adverse Childhood Experiences', 'Foster Care', 'Adoption'],
    citations: [
      {
        id: '1',
        text: 'Trauma-informed parenting: A review of intervention programs for parents with histories of child maltreatment',
        source: 'Child Abuse & Neglect',
        year: '2021',
        link: 'https://doi.org/10.1016/j.chiabu.2021.105094',
        tier: 1,
      },
      {
        id: '2',
        text: 'The Connected Child: Bring hope and healing to your adoptive family',
        source: 'McGraw-Hill',
        year: '2007',
        link: 'https://www.mheducation.com/highered/product/connected-child-purvis-cross/M9780071475006.html',
        tier: 5,
      },
      {
        id: '3',
        text: 'Trust-Based Relational Intervention for children with developmental trauma',
        source: 'Child & Youth Services',
        year: '2020',
        link: 'https://doi.org/10.1080/0145935X.2020.1718452',
        tier: 1,
      },
      {
        id: '4',
        text: 'Parenting children with trauma: Understanding attachment and how it helps',
        source: 'Child and Adolescent Social Work Journal',
        year: '2019',
        link: 'https://doi.org/10.1007/s10560-019-00608-w',
        tier: 1,
      },
      {
        id: '5',
        text: 'The impact of adverse childhood experiences on parenting',
        source: 'JAMA Pediatrics',
        year: '2020',
        link: 'https://doi.org/10.1001/jamapediatrics.2020.2274',
        tier: 1,
      },
      {
        id: '6',
        text: 'Therapeutic parenting: A model for parenting children with developmental trauma',
        source: 'Clinical Child Psychology and Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1177/1359104521991310',
        tier: 1,
      },
      {
        id: '7',
        text: 'Building the Bonds of Attachment: Awakening Love in Deeply Traumatized Children',
        source: 'Rowman & Littlefield',
        year: '2006',
        link: 'https://rowman.com/ISBN/9780765703705/',
        tier: 5,
      },
      {
        id: '8',
        text: 'ACEs and parenting interventions: Evidence review',
        source: 'Child Welfare',
        year: '2020',
        link: 'https://www.cwla.org/child-welfare-journal/',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your child melts down over what seems like nothing. They hoard food even though the pantry is full. They flinch when you reach to hug them. Traditional parenting advice tells you to set firm boundaries, use time-outs, or let them "cry it out." But for children who've experienced trauma—abuse, neglect, foster care, adoption, domestic violence—these approaches don't just fail. They backfire. Because trauma-affected children don't need more control or consequences. They need safety, connection, and co-regulation. They need trauma-informed parenting.
          </p>
          <p className="mb-6">
            Trauma-informed parenting recognizes that behavior is communication, and that children who've experienced adversity carry wounds that shape how they experience the world <Citation id="1" index={1} source="Child Abuse & Neglect" year="2021" tier={1} />. This approach prioritizes felt safety, builds trust slowly, and meets dysregulation with calm presence—not punishment.
          </p>
        </div>

        <h2 id="understanding-developmental-trauma" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Developmental Trauma
        </h2>
        <p className="mb-6">
          Children who experience trauma—especially chronic or relational trauma—during critical developmental periods often exhibit <Citation id="4" index={4} source="Child and Adolescent Social Work Journal" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Dysregulated nervous systems:</strong> Stuck in hyperarousal (anxious, reactive) or hypoarousal (shut down, numb)</li>
          <li><strong>Insecure attachment:</strong> Don't trust caregivers to meet their needs or keep them safe</li>
          <li><strong>Control-seeking behaviors:</strong> Try to control environment/people to feel safe</li>
          <li><strong>Sensory processing issues:</strong> Over- or under-reactive to touch, sound, light</li>
          <li><strong>Difficulty with transitions:</strong> Any change feels threatening</li>
          <li><strong>Trust deficits:</strong> Adults have hurt or abandoned them before—why trust you?</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p><strong>Reframe:</strong> "My child isn't giving me a hard time. My child is <em>having</em> a hard time." Trauma-informed parenting starts with this shift in perspective.</p>
        </ArticleCallout>

        <h2 id="core-principles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Core Principles of Trauma-Informed Parenting
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'safety-first',
              title: '1. Safety First (Felt Safety, Not Just Physical)',
              content: (
                <div>
                  <p className="mb-4">Trauma-affected children often don't <em>feel</em> safe even when they <em>are</em> safe. Your job is to help their nervous system learn safety.</p>
                  <p className="mb-4">In practice:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Predictable routines (reduces hypervigilance)</li>
                    <li>Calm tone of voice, slow movements</li>
                    <li>No surprises—warn before transitions</li>
                    <li>Safe physical environment (child-proofed, sensory-friendly)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'connection',
              title: '2. Connection Before Correction',
              content: (
                <div>
                  <p className="mb-4">Discipline doesn't work when a child is dysregulated. Connect first, teach later <Citation id="2" index={2} source="The Connected Child" year="2007" tier={5} />.</p>
                  <p className="mb-4">Example:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Traditional:</strong> Child hits sibling → Time-out</li>
                    <li><strong>Trauma-informed:</strong> Child hits sibling → "You're having big feelings. Let's take some deep breaths together. When you're calm, we'll talk about what happened."</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'co-regulation',
              title: '3. Co-Regulation (You Are Their Calm)',
              content: (
                <div>
                  <p className="mb-4">Trauma-affected children can't self-regulate yet. They need to borrow your calm nervous system to learn how to regulate their own.</p>
                  <p className="mb-4">In practice:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>When they're dysregulated, YOU stay calm</li>
                    <li>Use your voice, body language, presence to soothe</li>
                    <li>"I'm here. You're safe. We'll get through this together."</li>
                    <li>Model the regulation you want them to learn</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'trust-building',
              title: '4. Rebuilding Trust Through Attunement',
              content: (
                <div>
                  <p className="mb-4">Attunement = accurately reading and responding to your child's needs. This builds trust that you "get" them <Citation id="3" index={3} source="Child & Youth Services" year="2020" tier={1} />.</p>
                  <p className="mb-4">Examples:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Child hoards food → Don't shame. Provide a personal snack box they control.</li>
                    <li>Child resists bedtime → Don't force. Offer choices: 'Would you like the nightlight or the door cracked?'</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'behavior-communication',
              title: '5. Behavior as Communication',
              content: (
                <div>
                  <p className="mb-4">Every behavior is the child's attempt to meet a need or communicate something they can't verbalize.</p>
                  <p className="mb-4">Ask: "What is this behavior trying to tell me?"</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Aggression → "I feel unsafe and need to protect myself"</li>
                    <li>Withdrawal → "I'm overwhelmed and shutting down"</li>
                    <li>Control → "The world feels unpredictable and scary"</li>
                    <li>Testing limits → "Will you still love me if I'm bad?"</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="tbri-model" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Trust-Based Relational Intervention (TBRI)
        </h2>
        <p className="mb-6">
          TBRI is an evidence-based model for parenting children from hard places <Citation id="3" index={3} source="Child & Youth Services" year="2020" tier={1} />. It includes three pillars:
        </p>

        <ComparisonTable
          title="TBRI Pillars"
          columns={['Pillar', 'Focus', 'Strategies']}
          items={[
            { feature: 'Connecting Principles', values: ['Building felt safety and attachment', 'Eye contact, playful engagement, matching affect'] },
            { feature: 'Empowering Principles', values: ['Meeting physical/sensory needs', 'Hydration, nutrition, sensory tools, routines'] },
            { feature: 'Correcting Principles', values: ['Addressing behavior with compassion', 'Redos, choices, teaching not punishing'] },
          ]}
        />

        <h2 id="practical-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Trauma-Informed Strategies
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: `Use "do-overs" instead of time-outs`, description: <p>When a child misbehaves: "That didn't go well. Let's try that again." This teaches skills, not shame.</p> },
            { title: 'Offer choices (within limits)', description: <p>'Do you want to brush your teeth first or put on pajamas first?" Giving control reduces power struggles.</p> },
            { title: 'Stay close during meltdowns', description: <p>Don't send them away. Sit nearby (respecting their space if needed): "I'm here when you're ready."</p> },
            { title: 'Name and validate feelings', description: <p>"You're feeling really mad right now. It's okay to be mad. Let's find a safe way to let that anger out."</p> },
            { title: 'Anticipate triggers', description: <p>Know what sets your child off (crowds, transitions, certain adults) and plan ahead with coping strategies.</p> },
            { title: 'Repair when you mess up', description: <p>You will lose your cool. Model repair: "I yelled, and that wasn't okay. I'm sorry. I'm working on staying calm."</p> },
          ]}
        />

        <ArticleCallout variant="tip">
          <p><strong>Script for meltdowns:</strong> "I see you're really upset. I'm going to stay right here with you. You're safe. I won't let you hurt yourself or anyone else. When you're ready, we can talk."</p>
        </ArticleCallout>

        <h2 id="what-doesnt-work" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Doesn't Work for Trauma-Affected Children
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Traditional time-outs:</strong> Isolation feels like abandonment, triggering attachment wounds.</li>
          <li><strong>Harsh consequences:</strong> Punishment reinforces shame and fear, not learning.</li>
          <li><strong>"Cry it out":</strong> Ignoring distress teaches: "My needs don't matter. No one will help me."</li>
          <li><strong>Overstimulation:</strong> Loud voices, crowds, sensory overload trigger fight/flight/freeze.</li>
          <li><strong>Rewards/sticker charts (for some kids):</strong> Can feel manipulative if trust isn't established. Focus on intrinsic motivation.</li>
        </ul>

        <h2 id="self-care-for-parents" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Self-Care for Parents: You Can't Pour from Empty
        </h2>
        <p className="mb-6">
          Parenting traumatized children is <strong>exhausting</strong>. Your nervous system is constantly regulating theirs. Without self-care, you'll burn out <Citation id="5" index={5} source="JAMA Pediatrics" year="2020" tier={1} />.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Get your own therapy:</strong> Process your triggers, grief, and vicarious trauma.</li>
          <li><strong>Build a support network:</strong> Other trauma-informed parents, respite care, trusted family.</li>
          <li><strong>Practice self-compassion:</strong> You will mess up. Trauma-informed parenting is hard. Forgive yourself.</li>
          <li><strong>Regulate YOUR nervous system:</strong> Breathwork, exercise, sleep, boundaries with extended family who "don't get it."</li>
        </ul>

        <ArticleCallout variant="warning">
          <p><strong>Caregiver burnout is real:</strong> If you're feeling hopeless, resentful, or fantasizing about giving up, reach out. You're not failing—you're overwhelmed and need support.</p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Consider trauma-focused family therapy or parent coaching if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Your child's behaviors are escalating or dangerous</li>
          <li>You feel overwhelmed, resentful, or unable to connect</li>
          <li>Traditional parenting approaches are making things worse</li>
          <li>Your child has been diagnosed with RAD, PTSD, or other trauma-related conditions</li>
          <li>You need guidance tailoring strategies to your child's specific needs</li>
        </ul>
        <p className="mb-6">
          Look for therapists trained in TBRI, attachment-focused therapy, or trauma-informed family systems work.
        </p>

        <p className="mb-6">
          Trauma-informed parenting isn't permissive—it's deeply attuned. You still set boundaries. You still teach. But you do it with compassion, recognizing that your child isn't broken—they're wounded. And with the right care, wounds can heal.
        </p>
      </>
    ),
  },
  {
    id: catId(43),
    slug: 'trauma-affects-relationships-attachment-trust-intimacy',
    title: 'How Trauma Affects Relationships: Attachment, Trust, and Intimacy After Pain',
    description: 'Understand how trauma shapes relationship patterns, and learn strategies to build healthier connections despite a painful past.',
    image: "/images/articles/cat11/cover-043.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Trauma and Relationships', 'Attachment', 'Intimacy', 'Trust Issues'],
    citations: [
      {
        id: '1',
        text: 'The impact of trauma on adult romantic relationships',
        source: 'Journal of Family Violence',
        year: '2021',
        link: 'https://doi.org/10.1007/s10896-021-00278-z',
        tier: 1,
      },
      {
        id: '2',
        text: 'Attachment and PTSD in adults: A systematic review',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101853',
        tier: 1,
      },
      {
        id: '3',
        text: 'Intimacy and trauma: Navigating closeness after interpersonal violation',
        source: 'Journal of Sex & Marital Therapy',
        year: '2021',
        link: 'https://doi.org/10.1080/0092623X.2021.1888830',
        tier: 1,
      },
      {
        id: '4',
        text: "Wired for Love: How Understanding Your Partner\'s Brain and Attachment Style Can Help You Defuse Conflict",
        source: 'New Harbinger',
        year: '2012',
        link: 'https://www.newharbinger.com/9781608820580/',
        tier: 5,
      },
      {
        id: '5',
        text: 'Trust and betrayal in intimate relationships: The role of trauma',
        source: 'Psychological Trauma: Theory, Research, Practice, and Policy',
        year: '2020',
        link: 'https://doi.org/10.1037/tra0000596',
        tier: 1,
      },
      {
        id: '6',
        text: 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma',
        source: 'Penguin Books',
        year: '2014',
        link: 'https://www.penguinrandomhouse.com/books/220975/',
        tier: 5,
      },
      {
        id: '7',
        text: 'Couples therapy for trauma survivors: Attachment-focused approaches',
        source: 'Journal of Marital and Family Therapy',
        year: '2021',
        link: 'https://doi.org/10.1111/jmft.12482',
        tier: 1,
      },
      {
        id: '8',
        text: 'SAMHSA: Trauma and relationships',
        source: 'SAMHSA',
        year: '2022',
        link: 'https://www.samhsa.gov/resource/ebp/trauma-relationships',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You crave intimacy but recoil when someone gets too close. You test your partner to see if they'll leave—and when they don't, you push harder. You're hypervigilant for signs of betrayal, misreading neutral expressions as rejection. Or maybe you've gone numb, staying in relationships that feel empty because at least they're predictable. Trauma doesn't just live in your body and memories—it lives in the space between you and the people you love. And until it's addressed, it shapes every relationship you try to build.
          </p>
          <p className="mb-6">
            Research shows that trauma—especially relational trauma (abuse, neglect, betrayal)—profoundly affects how we attach, trust, and connect <Citation id="1" index={1} source="Journal of Family Violence" year="2021" tier={1} />. But these patterns aren't permanent. With awareness and intentional work, you can build healthier, safer relationships despite your history.
          </p>
        </div>

        <h2 id="how-trauma-disrupts-attachment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Trauma Disrupts Attachment
        </h2>
        <p className="mb-6">
          Attachment theory describes how early relationships with caregivers shape your "working model" of relationships <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />. When those early relationships involve trauma, your working model becomes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>"People will hurt me"</strong> → hypervigilance, mistrust</li>
          <li><strong>"I'm unworthy of love"</strong> → self-sabotage, settling for less</li>
          <li><strong>"Closeness = danger"</strong> → avoidance of intimacy</li>
          <li><strong>"I can't survive alone"</strong> → codependency, clinging</li>
        </ul>

        <ComparisonTable
          title="Trauma and Attachment Styles"
          columns={['Attachment Style', 'Trauma Impact', 'Relationship Pattern']}
          items={[
            { feature: 'Secure (baseline)', values: ['Minimal, or healed trauma', 'Comfortable with closeness and autonomy'] },
            { feature: 'Anxious-Preoccupied', values: ['Abandonment, neglect', 'Clingy, needs constant reassurance'] },
            { feature: 'Dismissive-Avoidant', values: ['Emotional neglect, rejection', 'Distant, self-reliant, fears vulnerability'] },
            { feature: 'Fearful-Avoidant (Disorganized)', values: ['Abuse, trauma from caregiver', 'Wants closeness but fears it; push-pull dynamic'] },
          ]}
        />

        <h2 id="trust-issues" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Trust Issues: The Core Wound
        </h2>
        <p className="mb-6">
          When trust is violated—especially by someone you depended on—it creates a lasting injury <Citation id="5" index={5} source="Psychological Trauma: Theory, Research, Practice, and Policy" year="2020" tier={1} />. Trust becomes both what you crave most and fear most.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'hypervigilance',
              title: 'Hypervigilance: Scanning for Betrayal',
              content: (
                <div>
                  <p className="mb-4">You read into every text delay, every facial expression, every change in tone. Your nervous system is on constant alert for signs that this person will hurt you too.</p>
                  <p><strong>Impact:</strong> Partners feel scrutinized, controlled, or unable to do anything right. You exhaust yourself—and them.</p>
                </div>
              ),
            },
            {
              id: 'testing',
              title: `Testing: "Will You Leave If I'm Unlovable?`,
              content: (
                <div>
                  <p className="mb-4">You push boundaries, pick fights, or withdraw to see if your partner will abandon you. When they don't, you escalate—because you don't believe they'll stay.</p>
                  <p><strong>Impact:</strong> Eventually, the testing becomes a self-fulfilling prophecy. They leave, confirming your belief: 'Everyone abandons me.'</p>
                </div>
              ),
            },
            {
              id: 'walls',
              title: `Walls: "If I Don't Let You In, You Can't Hurt Me`,
              content: (
                <div>
                  <p className="mb-4">You keep people at arm's length. Share facts, not feelings. Deflect vulnerability with humor or intellectualizing. Intimacy feels terrifying.</p>
                  <p><strong>Impact:</strong> Partners feel shut out, lonely, or like they don't really know you. The relationship feels superficial.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="intimacy-challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Intimacy Challenges After Trauma
        </h2>
        <p className="mb-6">
          Intimacy requires vulnerability—and vulnerability requires feeling safe. For trauma survivors, safety is elusive <Citation id="3" index={3} source="Journal of Sex & Marital Therapy" year="2021" tier={1} />.
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Emotional intimacy:</strong> Sharing feelings feels like handing someone ammunition to hurt you</li>
          <li><strong>Physical intimacy:</strong> Touch can trigger body memories, freeze responses, or dissociation</li>
          <li><strong>Sexual intimacy:</strong> May involve flashbacks, numbness, or inability to be present</li>
          <li><strong>Interdependence:</strong> Relying on someone feels dangerous; you stay hyper-independent</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>Research shows that 60-80% of people with PTSD report relationship difficulties as a primary symptom—not because they don't want connection, but because trauma makes connection feel unsafe <Citation id="6" index={6} source="The Body Keeps the Score" year="2014" tier={5} />.</p>
        </ArticleCallout>

        <h2 id="relationship-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Trauma-Driven Relationship Patterns
        </h2>

        <BeforeAfter
          before={{
            title: 'Unhealthy Patterns (Trauma-Driven)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Reenactment: Dating people who hurt you like your abuser did</li>
                <li>Codependency: Losing yourself to keep someone close</li>
                <li>Isolation: Avoiding relationships entirely to avoid pain</li>
                <li>Volatility: Intense connections that burn out quickly</li>
                <li>People-pleasing: Fawning to prevent abandonment</li>
              </ul>
            ),
          }}
          after={{
            title: 'Healing Patterns (Trauma-Informed)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Choosing partners who are emotionally safe, not just exciting</li>
                <li>Maintaining individuality while connecting</li>
                <li>Taking risks on connection, supported by therapy</li>
                <li>Building slow, steady trust over time</li>
                <li>Setting boundaries without guilt</li>
              </ul>
            ),
          }}
        />

        <h2 id="healing-in-relationships" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Healing Relationships After Trauma
        </h2>
        <p className="mb-6">
          You can build healthy relationships despite trauma history. It requires:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Recognize your patterns', description: <p>Do you push people away? Cling? Test? Avoid? Awareness is step one.</p> },
            { title: 'Communicate your needs', description: <p>"I need reassurance when you're quiet. My trauma makes me assume you're upset." Explaining helps partners understand.</p> },
            { title: 'Choose safe partners', description: <p>Look for: consistency, respect for boundaries, willingness to learn about trauma, patience during your healing.</p> },
            { title: 'Practice vulnerability in doses', description: <p>Share small things. Notice: they don't weaponize your vulnerability. Build trust slowly.</p> },
            { title: 'Work on your trauma (individually)', description: <p>Your partner can support you, but they can't heal your trauma. That's therapy's job.</p> },
            { title: 'Repair when triggered', description: <p>"I got triggered and shut down. That wasn't about you. I need some time to regulate, then we can talk."</p> },
          ]}
        />

        <ArticleCallout variant="tip">
          <p><strong>Script for partners:</strong> "When I pull away, it's my trauma—not you. I'm working on staying present. If I need space, I'll let you know it's temporary."</p>
        </ArticleCallout>

        <h2 id="for-partners" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          For Partners of Trauma Survivors
        </h2>
        <p className="mb-6">
          If you're dating/married to someone with trauma:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Educate yourself:</strong> Learn about PTSD, attachment, and trauma responses</li>
          <li><strong>Don't take it personally:</strong> Their hypervigilance/walls aren't about you</li>
          <li><strong>Be consistent:</strong> Predictability builds trust</li>
          <li><strong>Respect boundaries:</strong> Don't push for vulnerability they're not ready to give</li>
          <li><strong>Encourage therapy:</strong> Support their healing, but don't be their therapist</li>
          <li><strong>Take care of yourself:</strong> Loving a trauma survivor is hard. Get support.</li>
        </ul>

        <h2 id="couples-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Couples Therapy
        </h2>
        <p className="mb-6">
          Consider trauma-informed couples therapy if <Citation id="7" index={7} source="Journal of Marital and Family Therapy" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Trauma patterns are damaging the relationship</li>
          <li>You're repeating the same conflicts without resolution</li>
          <li>One or both partners feel unsafe or unheard</li>
          <li>You want to stay together but don't know how to bridge the gap</li>
          <li>Sexual intimacy is affected by trauma</li>
        </ul>
        <p className="mb-6">
          Look for therapists trained in Emotionally Focused Therapy (EFT), Gottman Method, or trauma-focused couples work. They'll help you build secure attachment, even with a painful past.
        </p>

        <p className="mb-6">
          Trauma doesn't have to define your relationships forever. With the right support, you can learn: closeness doesn't always lead to pain. Vulnerability can be safe. And you deserve love that doesn't hurt.
        </p>
      </>
    ),
  },
  {
    id: catId(44),
    slug: 'trauma-substance-use-self-medication-hypothesis',
    title: 'Trauma and Substance Use: Understanding the Self-Medication Hypothesis',
    description: 'Explore the link between trauma and addiction, and learn why treating both simultaneously is essential for lasting recovery.',
    image: "/images/articles/cat11/cover-044.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Trauma and Addiction', 'Substance Use', 'Self-Medication', 'Dual Diagnosis'],
    citations: [
      {
        id: '1',
        text: 'The self-medication hypothesis of substance use disorders: A reconsideration and recent applications',
        source: 'Harvard Review of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1097/HRP.0000000000000243',
        tier: 1,
      },
      {
        id: '2',
        text: 'PTSD and substance use disorder comorbidity: Prevalence, mechanisms, and treatment',
        source: 'Journal of Substance Abuse Treatment',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jsat.2021.108374',
        tier: 1,
      },
      {
        id: '3',
        text: 'Adverse childhood experiences and substance misuse: A systematic review',
        source: 'Drug and Alcohol Dependence',
        year: '2020',
        link: 'https://doi.org/10.1016/j.drugalcdep.2020.108085',
        tier: 1,
      },
      {
        id: '4',
        text: 'In the Realm of Hungry Ghosts: Close Encounters with Addiction',
        source: 'North Atlantic Books',
        year: '2010',
        link: 'https://www.northatlanticbooks.com/shop/in-the-realm-of-hungry-ghosts/',
        tier: 5,
      },
      {
        id: '5',
        text: 'Integrated treatment for PTSD and substance use disorders: A meta-analysis',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102067',
        tier: 1,
      },
      {
        id: '6',
        text: 'The neurobiology of trauma and addiction',
        source: 'Frontiers in Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.3389/fpsyt.2020.541476',
        tier: 1,
      },
      {
        id: '7',
        text: 'SAMHSA TIP 42: Substance abuse treatment for persons with co-occurring disorders',
        source: 'SAMHSA',
        year: '2020',
        link: 'https://store.samhsa.gov/product/TIP-42-Substance-Abuse-Treatment-Persons-Co-Occurring-Disorders/PEP20-02-01-004',
        tier: 2,
      },
      {
        id: '8',
        text: 'Seeking Safety: A treatment manual for PTSD and substance abuse',
        source: 'Guilford Press',
        year: '2002',
        link: 'https://www.guilford.com/books/Seeking-Safety/Lisa-Najavits/9781572306394',
        tier: 5,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You drink to quiet the flashbacks. You use opioids because they numb the pain your body won't let go. You smoke weed to sleep through the nightmares. For a few hours, the substances work—they silence the hypervigilance, soften the shame, make the world feel bearable. But when they wear off, the trauma is still there. And now, so is the addiction. This isn't moral failure. It's the self-medication hypothesis: trauma survivors use substances not for fun, but for survival.
          </p>
          <p className="mb-6">
            Research shows a profound link between trauma and substance use disorders (SUDs). Up to 75% of people in addiction treatment have trauma histories <Citation id="2" index={2} source="Journal of Substance Abuse Treatment" year="2021" tier={1} />. And the relationship is bidirectional: trauma increases addiction risk, and addiction can create new trauma. Healing requires addressing both—simultaneously.
          </p>
        </div>

        <h2 id="self-medication-hypothesis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Self-Medication Hypothesis
        </h2>
        <p className="mb-6">
          The self-medication hypothesis, developed by Dr. Edward Khantzian, proposes that people with SUDs aren't seeking pleasure—they're seeking relief <Citation id="1" index={1} source="Harvard Review of Psychiatry" year="2020" tier={1} />. Substances are chosen (often unconsciously) based on which symptoms they alleviate:
        </p>

        <ComparisonTable
          title="Substance Selection and Trauma Symptoms"
          columns={['Substance', 'Trauma Symptom Targeted', "Why It 'Works'"]}
          items={[
            { feature: 'Alcohol', values: ['Hyperarousal, anxiety, insomnia', 'Depressant; calms nervous system, induces sleep'] },
            { feature: 'Opioids', values: ['Emotional pain, numbness, dissociation', 'Numbs physical and emotional pain, creates warmth/safety feeling'] },
            { feature: 'Stimulants (cocaine, meth)', values: ['Hypoarousal, depression, fatigue', 'Boosts energy, counters shutdown/dissociation'] },
            { feature: 'Cannabis', values: ['Hypervigilance, nightmares, intrusive thoughts', 'Reduces anxiety, suppresses REM sleep (fewer nightmares)'] },
            { feature: 'Benzodiazepines', values: ['Panic attacks, flashbacks', 'Rapid anxiolytic effect, interrupts acute distress'] },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p><strong>Critical insight:</strong> The substance isn't the problem—it's the solution the person found to an untreated trauma problem. Addressing addiction without treating trauma sets people up for relapse.</p>
        </ArticleCallout>

        <h2 id="ace-and-addiction" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Adverse Childhood Experiences (ACEs) and Addiction Risk
        </h2>
        <p className="mb-6">
          The ACE Study (1998) was groundbreaking: it showed a dose-response relationship between childhood trauma and addiction <Citation id="3" index={3} source="Drug and Alcohol Dependence" year="2020" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 2, suffix: 'x', label: 'Addiction risk with 1 ACE' },
            { value: 4, suffix: 'x', label: 'Addiction risk with 4+ ACEs' },
            { value: 12, suffix: 'x', label: 'Risk of injecting drugs with 4+ ACEs' },
          ]}
          source="CDC Adverse Childhood Experiences Study, 2023"
        />

        <p className="mb-6">
          ACEs include: physical/emotional/sexual abuse, neglect, household dysfunction (domestic violence, parental substance use, mental illness, incarceration, divorce). The more ACEs, the higher the risk—not just of addiction, but of early initiation (starting substance use younger).
        </p>

        <h2 id="neurobiology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Neurobiology: Why Trauma and Addiction Co-Occur
        </h2>
        <p className="mb-6">
          Trauma and addiction affect overlapping brain systems <Citation id="6" index={6} source="Frontiers in Psychiatry" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Stress response system:</strong> Trauma dysregulates the HPA axis (cortisol, stress hormones). Substances temporarily "reset" it—but worsen dysregulation long-term.</li>
          <li><strong>Reward circuitry:</strong> Trauma damages dopamine pathways. Substances flood these pathways, creating powerful reinforcement.</li>
          <li><strong>Emotional regulation:</strong> Trauma impairs prefrontal cortex function. Substances become the only tool for managing overwhelming emotions.</li>
          <li><strong>Memory:</strong> Substances suppress the hippocampus, reducing flashbacks and intrusive memories temporarily.</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>Dr. Gabor Maté argues that "the question is not why the addiction, but why the pain" <Citation id="4" index={4} source="In the Realm of Hungry Ghosts" year="2010" tier={5} />. Trauma survivors aren't seeking escape for fun—they're seeking survival.</p>
        </ArticleCallout>

        <h2 id="vicious-cycle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Vicious Cycle: How Addiction Worsens Trauma
        </h2>
        <p className="mb-6">
          While substances provide short-term relief, they worsen trauma symptoms long-term:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Rebound anxiety:</strong> Alcohol/benzo withdrawal increases hyperarousal</li>
          <li><strong>Sleep disruption:</strong> Substances fragment sleep, worsening nightmares</li>
          <li><strong>Emotional dysregulation:</strong> Chronic use impairs natural emotion regulation</li>
          <li><strong>New trauma:</strong> Intoxication increases risk of accidents, violence, assault</li>
          <li><strong>Shame spiral:</strong> Addiction creates new shame, compounding trauma-related shame</li>
          <li><strong>Social isolation:</strong> Addiction damages relationships, eliminating support systems</li>
        </ul>

        <h2 id="barriers-to-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Barriers to Integrated Treatment
        </h2>
        <p className="mb-6">
          Historically, trauma and addiction were treated separately—or trauma wasn't addressed at all. This sequential approach fails because:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Untreated trauma drives relapse (people return to substances to cope)</li>
          <li>Active substance use makes trauma therapy less effective</li>
          <li>Trauma symptoms (dissociation, avoidance) interfere with addiction treatment engagement</li>
          <li>Telling someone to "get sober first" ignores that substances are how they're surviving trauma</li>
        </ul>

        <ArticleCallout variant="warning">
          <p><strong>Outdated approach:</strong> "You need to be sober for a year before we can address trauma." Modern evidence supports treating both simultaneously <Citation id="5" index={5} source="Clinical Psychology Review" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="integrated-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Integrated Treatment: Addressing Both at Once
        </h2>
        <p className="mb-6">
          Evidence-based integrated treatments include:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'seeking-safety',
              title: 'Seeking Safety',
              content: (
                <div>
                  <p className="mb-4">A present-focused therapy that teaches coping skills for both PTSD and SUD <Citation id="8" index={8} source="Seeking Safety" year="2002" tier={5} />.</p>
                  <p className="mb-4">Focus: Safety (emotional, physical, relational), grounding, healthy coping</p>
                  <p>Format: 25 topics (e.g., PTSD vs. SUD, asking for help, compassion)</p>
                </div>
              ),
            },
            {
              id: 'cope',
              title: 'COPE (Concurrent Treatment of PTSD and SUD)',
              content: (
                <div>
                  <p className="mb-4">Combines Prolonged Exposure (for PTSD) with relapse prevention (for SUD).</p>
                  <p className="mb-4">Research shows: Treating PTSD doesn't increase substance use—it often <em>reduces</em> it.</p>
                </div>
              ),
            },
            {
              id: 'tss',
              title: 'TARGET (Trauma Affect Regulation)',
              content: (
                <div>
                  <p className="mb-4">Teaches how to recognize and regulate trauma-related emotions without substances.</p>
                  <p>Useful for: People who use substances primarily for emotional numbing.</p>
                </div>
              ),
            },
            {
              id: 'mat',
              title: 'Medication-Assisted Treatment (MAT) + Trauma Therapy',
              content: (
                <div>
                  <p className="mb-4">Methadone, buprenorphine, or naltrexone stabilize opioid/alcohol use, creating space for trauma processing.</p>
                  <p>MAT reduces cravings, allowing engagement in therapy.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="what-helps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Helps in Recovery
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Find trauma-informed addiction treatment', description: <p>Ask: 'Do you address trauma as part of SUD treatment?" Look for programs familiar with co-occurring disorders.</p> },
            { title: 'Stabilize, then process', description: <p>Early recovery: build coping skills, establish safety. Later: process trauma memories (EMDR, PE). Sequencing matters.</p> },
            { title: 'Address underlying pain', description: <p>What are you medicating? Grief, shame, loneliness, rage? Therapy helps you feel it without substances.</p> },
            { title: 'Build alternative coping', description: <p>Substances worked for a reason. You need new tools: breathwork, exercise, connection, therapy, support groups.</p> },
            { title: 'Peer support', description: <p>12-step, SMART Recovery, trauma-focused groups. Connection reduces isolation and shame.</p> },
            { title: 'Treat mental health', description: <p>Depression, anxiety often co-occur. SSRIs, therapy, lifestyle changes all support recovery.</p> },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Seek integrated treatment if <Citation id="7" index={7} source="SAMHSA" year="2020" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You use substances primarily to manage trauma symptoms</li>
          <li>You've relapsed repeatedly despite trying to quit</li>
          <li>You have both PTSD and SUD diagnoses</li>
          <li>Substance use is causing harm, but you can't stop</li>
          <li>You've tried addiction treatment without trauma work—and it didn't stick</li>
        </ul>
        <p className="mb-6">
          Look for dual-diagnosis programs, trauma-informed rehabs, or therapists certified in Seeking Safety, COPE, or TARGET. Resources: SAMHSA National Helpline (1-800-662-4357), free, confidential, 24/7.
        </p>

        <p className="mb-6">
          Addiction isn't weakness. For trauma survivors, it's often the most effective tool you had—until you get better ones. Recovery isn't about willpower. It's about healing the pain underneath. And when that pain is addressed, the need for substances begins to fade.
        </p>
      </>
    ),
  },
  {
    id: catId(45),
    slug: 'supporting-partner-ptsd-what-helps-what-doesnt',
    title: "Supporting a Partner with PTSD: What Helps and What Doesn't",
    description: "Learn practical, evidence-based strategies for supporting a loved one with PTSD while maintaining your own well-being.",
    image: "/images/articles/cat11/cover-045.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['PTSD', 'Caregiving', 'Relationships', 'Support'],
    citations: [
      {
        id: '1',
        text: 'Caring for a partner with PTSD: The impact on relationship quality and caregiver burden',
        source: 'Journal of Traumatic Stress',
        year: '2021',
        link: 'https://doi.org/10.1002/jts.22677',
        tier: 1,
      },
      {
        id: '2',
        text: 'Partner accommodation in PTSD: Helping or hindering recovery?',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101886',
        tier: 1,
      },
      {
        id: '3',
        text: 'Couples therapy for PTSD: A systematic review',
        source: 'Journal of Marital and Family Therapy',
        year: '2021',
        link: 'https://doi.org/10.1111/jmft.12476',
        tier: 1,
      },
      {
        id: '4',
        text: 'Secondary traumatic stress in partners of combat veterans',
        source: 'Military Psychology',
        year: '2020',
        link: 'https://doi.org/10.1080/08995605.2020.1780061',
        tier: 1,
      },
      {
        id: '5',
        text: 'Loving Someone with PTSD: A Practical Guide to Understanding and Connecting with Your Partner after Trauma',
        source: 'New Harbinger',
        year: '2015',
        link: 'https://www.newharbinger.com/9781608829477/',
        tier: 5,
      },
      {
        id: '6',
        text: 'The role of social support in PTSD recovery',
        source: 'Psychological Trauma: Theory, Research, Practice, and Policy',
        year: '2020',
        link: 'https://doi.org/10.1037/tra0000621',
        tier: 1,
      },
      {
        id: '7',
        text: 'SAMHSA: Supporting someone with PTSD',
        source: 'SAMHSA',
        year: '2022',
        link: 'https://www.samhsa.gov/resource/ebp/supporting-someone-ptsd',
        tier: 2,
      },
      {
        id: '8',
        text: 'Caregiver self-care and burnout prevention',
        source: 'Frontiers in Psychology',
        year: '2021',
        link: 'https://doi.org/10.3389/fpsyg.2021.678927',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You watch your partner retreat into silence, jump at sudden noises, or wake screaming from nightmares. You want to help—but you don't know how. You try to be supportive, but sometimes you feel like you're walking on eggshells. You absorb their pain, accommodate their avoidance, and slowly lose yourself in the process. Loving someone with PTSD is hard. And without guidance, you risk burnout, codependency, or inadvertently reinforcing the very symptoms you're trying to ease.
          </p>
          <p className="mb-6">
            Supporting a partner with PTSD requires balancing compassion with boundaries, understanding with accountability <Citation id="1" index={1} source="Journal of Traumatic Stress" year="2021" tier={1} />. Research shows that partners play a crucial role in recovery—but only when that support is informed, sustainable, and doesn't enable avoidance or dependence. Here's what actually helps.
          </p>
        </div>

        <h2 id="what-ptsd-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What PTSD Looks Like in a Relationship
        </h2>
        <p className="mb-6">
          PTSD symptoms affect how your partner relates to you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Hypervigilance:</strong> Constantly on edge, scanning for danger, misreading neutral cues as threats</li>
          <li><strong>Emotional numbing:</strong> Difficulty feeling or expressing love, seeming distant or detached</li>
          <li><strong>Irritability/anger:</strong> Low frustration tolerance, explosive reactions to minor stressors</li>
          <li><strong>Avoidance:</strong> Withdrawing from social situations, refusing to discuss the trauma, isolating</li>
          <li><strong>Nightmares/insomnia:</strong> Sleep disturbances that affect both of you</li>
          <li><strong>Flashbacks/triggers:</strong> Sudden shifts into re-experiencing the trauma, seeming "not present"</li>
        </ul>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'of veterans with PTSD report relationship problems' },
            { value: 3, suffix: 'x', label: 'Higher divorce rate for couples where one has PTSD' },
            { value: 68, suffix: '%', label: 'of partners report caregiver burden or burnout' },
          ]}
          source="Journal of Traumatic Stress, 2021"
        />

        <h2 id="what-helps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Helps: Evidence-Based Support Strategies
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Educate yourself about PTSD', description: <p>Understanding that symptoms are <em>neurobiological</em> (not personal) reduces blame and frustration. Read about PTSD, attend workshops, or join partner support groups <Citation id="6" index={6} source="Psychological Trauma: Theory, Research, Practice, and Policy" year="2020" tier={1} />.</p> },
            { title: 'Validate without fixing', description: <p>When they share: "That sounds really hard. I'm here." Don't minimize ("It wasn't that bad") or problem-solve unless asked. Presence {'>'} solutions.</p> },
            { title: 'Ask how to help', description: <p>'What do you need from me right now?" Don't assume. Some people want space, others want presence. Let them tell you.</p> },
            { title: `Support (don't pressure) treatment`, description: <p>"I think therapy could help. I'll support you if you want to try." Offer to help find a therapist, attend couples sessions, but don't force it.</p> },
            { title: 'Maintain your own life', description: <p>Don't make their PTSD your identity. Keep hobbies, friends, routines. This models healthy coping and prevents codependency.</p> },
            { title: 'Celebrate small wins', description: <p>They attended therapy. Went to a social event. Had a good week. Acknowledge progress, even if recovery is slow.</p> },
          ]}
        />

        <h2 id="what-doesnt-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Doesn't Help (Even If It Feels Supportive)
        </h2>

        <BeforeAfter
          before={{
            title: 'Unhelpful (Even if Well-Intentioned)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Accommodating all avoidance (skipping events, isolating together)</li>
                <li>"Just get over it" or "It's been long enough"</li>
                <li>Walking on eggshells to prevent triggers</li>
                <li>Taking over all responsibilities to "protect" them</li>
                <li>Ignoring your own needs to focus on theirs</li>
                <li>Shaming them for symptoms ("Why are you so angry?")</li>
              </ul>
            ),
          }}
          after={{
            title: 'Helpful (Evidence-Based)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Encouraging gradual re-engagement (with support)</li>
                <li>"Recovery takes time. I'm here for the long haul."</li>
                <li>Learning their triggers, but not avoiding all of them</li>
                <li>Sharing responsibilities; encouraging autonomy</li>
                <li>Prioritizing self-care so you don't burn out</li>
                <li>"You're having a trauma response. Let's ground together."</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="warning">
          <p><strong>Accommodation vs. support:</strong> Accommodation (doing everything to prevent distress) reinforces avoidance and can worsen PTSD long-term <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />. Support means helping them face challenges, not removing all challenges.</p>
        </ArticleCallout>

        <h2 id="handling-specific-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Respond to Specific Symptoms
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'flashbacks',
              title: 'Flashbacks/Dissociation',
              content: (
                <div>
                  <p className="mb-4"><strong>What to do:</strong></p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Speak calmly: "You're safe. You're with [your name]. This is [year]."</li>
                    <li>Don't touch without asking (can be triggering)</li>
                    <li>Guide them to ground: "Can you name 5 things you see?"</li>
                  </ul>
                  <p><strong>What NOT to do:</strong> Shake them, yell, or say "Snap out of it."</p>
                </div>
              ),
            },
            {
              id: 'nightmares',
              title: 'Nightmares',
              content: (
                <div>
                  <p className="mb-4"><strong>What to do:</strong></p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Wake them gently if they're thrashing/screaming</li>
                    <li>Reassure: "You had a nightmare. You're safe now."</li>
                    <li>Suggest therapy (imagery rehearsal therapy helps nightmares)</li>
                  </ul>
                  <p><strong>What NOT to do:</strong> Ignore it or tell them to "just go back to sleep."</p>
                </div>
              ),
            },
            {
              id: 'anger',
              title: 'Irritability/Anger',
              content: (
                <div>
                  <p className="mb-4"><strong>What to do:</strong></p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Set a boundary: "I want to hear you, but not when you're yelling."</li>
                    <li>Give space: "Let's take a break and come back to this."</li>
                    <li>Later, when calm: "I notice you've been really on edge. What's going on?"</li>
                  </ul>
                  <p><strong>What NOT to do:</strong> Engage when they're escalated, or excuse abusive behavior ("It's just the PTSD").</p>
                </div>
              ),
            },
            {
              id: 'emotional-numbing',
              title: 'Emotional Numbing',
              content: (
                <div>
                  <p className="mb-4"><strong>What to do:</strong></p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Don't take it personally. It's a symptom, not rejection.</li>
                    <li>Verbalize your needs: 'I need some affection. Can we hug?'</li>
                    <li>Encourage activities that build connection (walks, cooking together)</li>
                  </ul>
                  <p><strong>What NOT to do:</strong> Withdraw in response, or demand emotional intimacy they can't give.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="secondary-trauma" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Secondary Traumatic Stress: When You Absorb Their Pain
        </h2>
        <p className="mb-6">
          Partners of people with PTSD can develop secondary traumatic stress (STS)—experiencing PTSD-like symptoms from exposure to the partner's trauma <Citation id="4" index={4} source="Military Psychology" year="2020" tier={1} />. Signs include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Hypervigilance about your partner's well-being</li>
          <li>Intrusive images/thoughts about their trauma</li>
          <li>Difficulty sleeping, nightmares</li>
          <li>Emotional numbing or compassion fatigue</li>
          <li>Avoiding reminders of their trauma</li>
        </ul>
        <p className="mb-6">
          If you're experiencing STS, you need support too. Consider therapy, support groups for partners, or self-care practices.
        </p>

        <h2 id="self-care" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Self-Care Isn't Selfish—It's Necessary
        </h2>
        <p className="mb-6">
          You can't support them if you're depleted <Citation id="8" index={8} source="Frontiers in Psychology" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Maintain boundaries:</strong> It's okay to say "I need a break" or "I can't talk about this right now."</li>
          <li><strong>Seek your own therapy:</strong> Process your frustration, grief, or STS with a professional.</li>
          <li><strong>Stay connected:</strong> Don't isolate with them. Keep friendships, hobbies, routines.</li>
          <li><strong>Join a support group:</strong> Partners of PTSD survivors (e.g., VA programs, NAMI groups) provide community and validation.</li>
          <li><strong>Rest:</strong> Sleep, exercise, eat well. Caregiver burnout is real.</li>
        </ul>

        <ArticleCallout variant="tip">
          <p><strong>Reminder:</strong> Their healing is their responsibility. You can support it, but you can't do it for them. Letting go of that burden is self-care.</p>
        </ArticleCallout>

        <h2 id="couples-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Consider Couples Therapy
        </h2>
        <p className="mb-6">
          Couples therapy for PTSD (like Cognitive-Behavioral Conjoint Therapy) can help both partners <Citation id="3" index={3} source="Journal of Marital and Family Therapy" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Improve communication about PTSD symptoms</li>
          <li>Address accommodation patterns</li>
          <li>Rebuild intimacy and trust</li>
          <li>Develop shared coping strategies</li>
          <li>Process how PTSD has affected the relationship</li>
        </ul>
        <p className="mb-6">
          Look for therapists trained in trauma-focused couples work (CBCT, EFT).
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Help for Yourself
        </h2>
        <p className="mb-6">
          Get support if <Citation id="7" index={7} source="SAMHSA" year="2022" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You're experiencing STS symptoms yourself</li>
          <li>You feel hopeless, resentful, or trapped</li>
          <li>You've lost your identity in caregiving</li>
          <li>Your mental or physical health is deteriorating</li>
          <li>You're experiencing abuse (PTSD doesn't excuse violence)</li>
        </ul>
        <p className="mb-6">
          Resources: National Domestic Violence Hotline (1-800-799-7233), NAMI Helpline (1-800-950-6264), local partner support groups.
        </p>

        <p className="mb-6">
          Loving someone with PTSD takes patience, education, and boundaries. You can be supportive without losing yourself. You can encourage healing without doing the healing for them. And you deserve care too—because your well-being matters just as much.
        </p>
      </>
    ),
  },
];
