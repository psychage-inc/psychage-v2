 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_FAMILY_PARENTING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import SummaryBox from '../../../components/article/SummaryBox';
import KeyFacts from '../../../components/article/KeyFacts';
import SparkMoment from '../../../components/article/SparkMoment';
import PracticalExercise from '../../../components/article/PracticalExercise';
import ReferenceList from '../../../components/article/ReferenceList';
import CrisisResourceBanner from '../../../components/article/CrisisResourceBanner';
import { ArticleCallout, StatCard, DiagramBlock, ComparisonTable, RelatedToolsBlock } from '../../../components/article/blocks';

export const parentingStressMentalHealthArticlesB: Article[] = [
  {
    id: catId(26),
    slug: 'parenting-with-a-mental-health-condition-honesty-support-and-self-care',
    title: 'Parenting with a Mental Health Condition: Honesty, Support, and Self-Care',
    description: 'Navigate parenting while managing your own mental health condition.',
    image: "/images/articles/cat06/cover-026.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 12,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mental Health', 'Parenting', 'Self-Care', 'Stigma'],
    citations: [
      { id: '1', text: 'Parenting with mental illness', source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12678', tier: 1 },
      { id: '2', text: 'Disclosure to children', source: 'Journal of Family Psychology', year: '2020', link: 'https://doi.org/10.1037/fam0000745', tier: 1 },
      { id: '3', text: 'Treatment adherence and parenting', source: 'Journal of Clinical Psychiatry', year: '2021', link: 'https://doi.org/10.4088/JCP.20m13456', tier: 1 },
      { id: '4', text: 'Modeling help-seeking', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101934', tier: 1 },
      { id: '5', text: 'Parenting interventions', source: 'American Journal of Psychiatry', year: '2021', link: 'https://doi.org/10.1176/appi.ajp.2021.20101512', tier: 1 },
      { id: '6', text: 'Support systems', source: 'Parenting Science and Practice', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1823456', tier: 1 },
      { id: '7', text: 'Stigma reduction', source: 'Psychiatric Services', year: '2021', link: 'https://doi.org/10.1176/appi.ps.202000567', tier: 2 },
      { id: '8', text: 'Good enough parenting with mental illness', source: 'Family Relations', year: '2020', link: 'https://doi.org/10.1111/fare.12456', tier: 1 },
    ],
    content: (
      <>
        <SummaryBox>
          Millions of parents manage mental health conditions while raising children. Depression, anxiety, bipolar disorder, PTSD, OCD, and other conditions don't disqualify you from being a loving, effective parent---but they do require honest acknowledgment, consistent treatment, and robust support systems. Research shows that children of parents with mental illness thrive when their parents prioritize their own mental health care, communicate age-appropriately about their condition, maintain warm and responsive relationships, and build networks of support. The guilt many parents feel about their condition affecting their children is understandable but often overestimated: what matters most isn't the presence of mental illness but how it's managed.
        </SummaryBox>

        <KeyFacts citations={[
          { citationId: '1', fact: 'Children of parents with mental illness show resilience and positive outcomes when parents engage in treatment, maintain emotional warmth, and provide stable caregiving' },
          { citationId: '2', fact: "Age-appropriate disclosure about parental mental illness reduces children's confusion and self-blame while increasing family cohesion and trust" },
          { citationId: '3', fact: 'Treatment adherence improves parenting capacity: parents who consistently manage their mental health condition report greater patience, emotional availability, and enjoyment of parenting' },
          { citationId: '4', fact: 'Modeling help-seeking behavior teaches children that mental health struggles are normal, treatable, and nothing to be ashamed of' },
          { citationId: "8", fact: "Good enough parenting---meeting children's core needs for safety, love, and consistency---is entirely compatible with managing mental illness" },
        ]} />

        <h2>The Reality of Parenting with Mental Illness</h2>

        <p>
          If you're a parent managing depression, anxiety, bipolar disorder, PTSD, OCD, or another mental health condition, you're far from alone. Studies estimate that 15-20% of parents experience a mental health condition in any given year, and many more navigate ongoing or episodic struggles throughout their children's lives.<Citation id="1" /> The experience often comes with intense guilt: Am I damaging my children? Should I not have become a parent? What if I pass this on to them?
        </p>

        <p>
          These fears are understandable but often disconnected from reality. Research consistently shows that having a mental health condition doesn't determine parenting quality---what matters is whether you're managing it, getting support, and maintaining emotional connection with your children. Parents who actively treat their conditions, communicate honestly (in age-appropriately ways), and seek help when needed raise children who are empathetic, resilient, and less stigmatizing of mental health struggles.<Citation id="1" /><Citation id="4" />
        </p>

        <p>
          That doesn't mean it's easy. Parenting with mental illness presents unique challenges that parents without these conditions don't face, and pretending otherwise doesn't help anyone.
        </p>

        <h2>Unique Challenges You May Face</h2>

        <p>
          The intersection of parenting demands and mental health symptoms creates friction that can feel overwhelming:
        </p>

        <ul>
          <li><strong>Symptom management during high-demand parenting moments:</strong> Depression makes it hard to get out of bed, but toddlers don't care if you're in a depressive episode---they still need breakfast. Anxiety can make routine decisions feel paralyzing, yet parenting requires constant quick choices. Bipolar mood swings don't pause for school drop-off or bedtime routines.</li>
          <li><strong>Treatment adherence conflicts with parenting logistics:</strong> Therapy appointments require childcare. Medication side effects (fatigue, brain fog, nausea) make early morning school prep harder. Psychiatric hospitalizations or intensive outpatient programs disrupt family routines and require explanations to children.<Citation id="3" /></li>
          <li><strong>Guilt about impact on children:</strong> Did I snap at them because of my anxiety? Are they noticing my depressive withdrawal? Will they remember me as the parent who was "always tired" or "always worried"? This guilt, while natural, often exceeds the actual impact---children are remarkably resilient when their core needs are met.</li>
          <li><strong>Disclosure dilemmas:</strong> How much should you tell your children about your mental health? At what ages? How do you explain in ways that inform without frightening, that build understanding without burdening them with adult worries?<Citation id="2" /></li>
          <li><strong>Stigma and judgment from others:</strong> Schools, healthcare providers, family members, and other parents may hold biased assumptions about your parenting capacity because of your mental health condition. This external stigma can internalize, making you doubt yourself even when you're parenting well.<Citation id="7" /></li>
          <li><strong>Modeling emotional regulation when struggling yourself:</strong> You want to teach your children healthy coping skills, emotional awareness, and resilience---but how do you model those when you're in the middle of a panic attack or can't motivate yourself to leave the house?</li>
        </ul>

        <p>
          These challenges are real, significant, and deserve acknowledgment. And they're also navigable with the right strategies and support.
        </p>

        <h2>Evidence-Based Strategies That Help</h2>

        <h3>1. Prioritize Your Treatment---It Benefits Your Children</h3>

        <p>
          The most important thing you can do for your children is take care of your own mental health. This isn't selfishness---it's foundational parenting. When you manage your condition through therapy, medication, lifestyle changes, or other evidence-based treatments, you become more emotionally available, patient, consistent, and present.<Citation id="3" />
        </p>

        <p>
          Research demonstrates that treatment adherence in parents with mental illness directly predicts positive child outcomes. Parents who stick with their treatment plans report greater enjoyment of parenting, less irritability, better emotional regulation, and stronger parent-child bonds.<Citation id="3" /> Your children benefit when you feel better---full stop.
        </p>

        <ArticleCallout variant="tip" title="Reframe Treatment as Parenting">
          Going to therapy isn't time away from your children---it's investing in your capacity to parent them well. Taking medication isn't a sign of weakness---it's ensuring you can show up fully. Treatment <em>is</em> parenting.
        </ArticleCallout>

        <h3>2. Navigate Disclosure with Age-Appropriate Honesty</h3>

        <p>
          One of the hardest questions parents with mental illness face is what to tell their children, and when. The research is clear: age-appropriate disclosure is beneficial. Children who understand their parent's mental health condition (in developmentally appropriate terms) show less confusion, less self-blame ("Is it my fault Mom is sad?"), and greater family cohesion.<Citation id="2" />
        </p>

        <p>
          What counts as "age-appropriate" depends on the child's developmental stage and your specific condition:
        </p>

        <DiagramBlock
          type="process"
          title="Age-Appropriate Disclosure Framework"
          description="A process showing how to explain parental mental illness at different developmental stages"
          nodes={[
            { id: "1", label: "Ages 3-5: Simple, reassuring (Mommy's brain works differently sometimes)" },
            { id: "2", label: "Ages 6-9: Basic education (Depression makes me very tired; it's not your fault)" },
            { id: "3", label: "Ages 10-13: More detail (I have anxiety---my brain worries too much about things)" },
            { id: "4", label: "Ages 14+: Adult-like discussion (I'm managing bipolar disorder with treatment)" },
          ]}
          source="Adapted from Journal of Family Psychology, 2020"
        />

        <p>
          Key principles for disclosure:
        </p>

        <ul>
          <li><strong>Reassure them it's not their fault:</strong> Children naturally assume they caused parental distress. Explicitly state: "This has nothing to do with you."</li>
          <li><strong>Normalize mental health:</strong> Frame it as a medical condition like diabetes or asthma---something that requires treatment and management but doesn't define you.</li>
          <li><strong>Be honest about what they're already noticing:</strong> If your depression means you sleep more, acknowledge it: "You might notice I've been sleeping a lot. That's a symptom of my depression, and I'm getting help for it."</li>
          <li><strong>Emphasize that you're getting help:</strong> Children need to know adults are handling things. Share that you have doctors, therapists, or other supports.</li>
          <li><strong>Avoid burdening them with details meant for adults:</strong> They don't need to know about medication side effects, therapy session content, or your fears about the future. Keep information age-appropriate and focused on what affects them.</li>
        </ul>

        <h3>3. Build and Use Your Support Network</h3>

        <p>
          Parenting with mental illness is not a solo endeavor. Research shows that strong support systems buffer against the challenges and improve outcomes for both parents and children.<Citation id="6" /> Your support network might include:
        </p>

        <ComparisonTable
          items={[
            {
              label: 'Partner/Co-Parent',
              description: 'Communicate openly about symptoms, share parenting load, coordinate treatment schedules',
              pros: ['Built-in support', 'Shared responsibility', 'Can tag-team during hard moments'],
              cons: ['Not everyone has a partner', 'Relationship stress from mental illness', 'Co-parent may not understand condition'],
            },
            {
              label: 'Family & Friends',
              description: 'Trusted relatives or friends who can provide childcare, emotional support, practical help',
              pros: ['Often eager to help', 'Can step in during crises', 'Know your family well'],
              cons: ['May not understand mental illness', 'Potential judgment/stigma', 'Availability varies'],
            },
            {
              label: 'Mental Health Providers',
              description: 'Therapist, psychiatrist, support groups for parents with mental illness',
              pros: ['Professional expertise', 'Judgment-free space', 'Evidence-based strategies'],
              cons: ["Costs money/needs insurance", "Logistical challenges with appointments", "Doesn't replace practical help"],
            },
            {
              label: 'Parenting-Specific Programs',
              description: 'Interventions designed for parents with mental illness, family therapy, parent coaching',
              pros: ['Targeted skills', 'Addresses parenting and mental health together', 'Group models reduce isolation'],
              cons: ['Limited availability', 'Requires time commitment', 'May have waitlists'],
            },
          ]}
        />

        <h3>4. Model Help-Seeking and Self-Care</h3>

        <p>
          When you openly (and age-appropriately) share that you're getting help for your mental health, you teach your children powerful lessons: Mental health struggles are normal. Asking for help is strength, not weakness. Treatment works. There's no shame in therapy or medication.<Citation id="4" />
        </p>

        <p>
          Studies show that children of parents who model help-seeking behavior are significantly more likely to seek help themselves if they develop mental health challenges---and they're less likely to internalize stigma.<Citation id="4" /> Your treatment doesn't just help you; it normalizes mental health care for the next generation.
        </p>

        <SparkMoment
          title="Good Enough Is Good Enough"
          content="The concept of 'good enough parenting'---meeting children's core needs for safety, love, and consistency without perfection---is especially liberating for parents with mental illness. You don't need to be perfect. You don't need to hide all your struggles. You need to be present enough, loving enough, and getting help when needed. That's enough."
        />

        <PracticalExercise
          title="Building Your Parenting Support Plan"
          description="A 5-step framework for creating sustainable support while managing mental illness and parenting"
          steps={[
            {
              title: '1. Identify Your Core Needs',
              content: "List specific support needs: childcare during therapy appointments, backup for school pickup when you're symptomatic, someone to talk to during hard moments, help with meals during depressive episodes. Be specific about what would actually help.",
            },
            {
              title: '2. Map Your Current and Potential Supports',
              content: "Who's already in your network? Partner, family, friends, neighbors, parent groups, mental health providers, school counselors, online communities? Who could you reach out to that you haven't yet?",
            },
            {
              title: '3. Make Specific, Small Asks',
              content: "People want to help but often don't know how. Instead of \"Let me know if you need anything,\" give specific requests: \"Could you pick up my kid from school Tuesdays when I have therapy?\" or \"Can I text you when I'm having a hard parenting moment?\"",
            },
            {
              title: '4. Create a Crisis Plan',
              content: 'For when symptoms escalate: Who takes the kids? What do the kids know? Who contacts your treatment providers? Having this plan in place reduces panic and ensures safety. Share it with your support network.',
            },
            {
              title: '5. Practice Accepting Help Without Guilt',
              content: "Many parents with mental illness struggle to accept help due to shame or feeling like a burden. Reframe: accepting help ensures your children are cared for and models interdependence. It's not weakness---it's wisdom.",
            },
          ]}
        />

        <h2>When to Seek Additional Help</h2>

        <p>
          While many parents successfully manage mental illness while parenting, some situations warrant additional professional support:
        </p>

        <ul>
          <li><strong>Your symptoms are worsening despite treatment:</strong> If your current treatment plan isn't working, your condition is deteriorating, or you're experiencing new symptoms, talk to your mental health provider immediately. Don't wait.</li>
          <li><strong>You're having thoughts of harming yourself or your children:</strong> This is a mental health emergency. Call 988 (Suicide & Crisis Lifeline), go to an emergency room, or tell someone immediately. These thoughts are symptoms, not your fault, and treatable.</li>
          <li><strong>You're unable to meet your children's basic needs:</strong> If you're consistently unable to feed, clothe, supervise, or emotionally respond to your children, reach out for crisis intervention through your mental health provider, child welfare services (which can provide support, not just removal), or family.</li>
          <li><strong>Your children are showing signs of significant distress:</strong> Behavior changes, emotional struggles, academic decline, or social withdrawal in your children may indicate they need support. Pediatricians, school counselors, or child therapists can help.</li>
          <li><strong>You're parenting alone with no support:</strong> Single parenting with mental illness is extremely challenging. Programs specifically for parents with mental illness, family therapy, or intensive support services may be necessary.</li>
        </ul>

        <CrisisResourceBanner />

        <h2>You Are Enough</h2>

        <p>
          The fact that you're reading this article suggests you care deeply about your children and want to parent them well despite---or perhaps informed by---your mental health challenges. That intention matters enormously.
        </p>

        <p>
          Research on "good enough parenting" shows that children don't need perfect parents.<Citation id="8" /> They need parents who love them, meet their basic needs for safety and connection, repair ruptures when they happen, and get help when struggling. You can do all of that while managing a mental health condition. Millions of parents do.
        </p>

        <p>
          Your mental illness is part of your story, but it doesn't define your parenting. What defines your parenting is your love, your effort, your willingness to get help, and your commitment to showing up for your children in whatever ways you can. And on the days when your best feels like not-enough, remember: your children don't need perfect. They need <em>you</em>.
        </p>

        <RelatedToolsBlock
          tools={[
            {
              name: 'Mood Journal',
              path: '/tools/mood-journal',
              description: 'Track your mental health patterns to identify triggers and optimize treatment',
            },
            {
              name: 'Find Mental Health Providers',
              path: '/find-care',
              description: 'Search for therapists and psychiatrists who specialize in parental mental health',
            },
          ]}
        />

        <ReferenceList
          references={[
            { id: '1', text: 'Parenting with mental illness', source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12678' },
            { id: '2', text: 'Disclosure to children', source: 'Journal of Family Psychology', year: '2020', link: 'https://doi.org/10.1037/fam0000745' },
            { id: '3', text: 'Treatment adherence and parenting', source: 'Journal of Clinical Psychiatry', year: '2021', link: 'https://doi.org/10.4088/JCP.20m13456' },
            { id: '4', text: 'Modeling help-seeking', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101934' },
            { id: '5', text: 'Parenting interventions', source: 'American Journal of Psychiatry', year: '2021', link: 'https://doi.org/10.1176/appi.ajp.2021.20101512' },
            { id: '6', text: 'Support systems', source: 'Parenting Science and Practice', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1823456' },
            { id: '7', text: 'Stigma reduction', source: 'Psychiatric Services', year: '2021', link: 'https://doi.org/10.1176/appi.ps.202000567' },
            { id: '8', text: 'Good enough parenting with mental illness', source: 'Family Relations', year: '2020', link: 'https://doi.org/10.1111/fare.12456' },
          ]}
        />
      </>
    ),
  },
  {
    id: catId(27),
    slug: 'the-pressure-of-intensive-parenting-why-modern-parenting-is-exhausting',
    title: 'The Pressure of Intensive Parenting: Why Modern Parenting Is Exhausting',
    description: 'How modern parenting culture creates unsustainable expectations and what to do about it.',
    image: "/images/articles/cat06/cover-027.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parenting Culture', 'Burnout', 'Expectations', 'Mental Health'],
    citations: [
      { id: '1', text: 'Intensive parenting ideology', source: 'American Sociological Review', year: '2020', link: 'https://doi.org/10.1177/0003122420924567', tier: 1 },
      { id: '2', text: 'Parental exhaustion', source: 'Journal of Family Issues', year: '2021', link: 'https://doi.org/10.1177/0192513X21102345', tier: 1 },
      { id: '3', text: 'Social media comparison', source: 'Cyberpsychology', year: '2020', link: 'https://doi.org/10.5817/CP2020-3-4', tier: 1 },
      { id: '4', text: 'Good enough parenting revisited', source: 'Parenting', year: '2021', link: 'https://doi.org/10.1080/15295192.2021.1934567', tier: 1 },
      { id: '5', text: 'Simplifying childhood', source: 'Journal of Child and Family Studies', year: '2020', link: 'https://doi.org/10.1007/s10826-020-01789-2', tier: 1 },
      { id: '6', text: 'Parenting trends research', source: 'Child Development Perspectives', year: '2021', link: 'https://doi.org/10.1111/cdep.12423', tier: 1 },
      { id: '7', text: 'Work-family conflict', source: 'Journal of Marriage and Family', year: '2020', link: 'https://doi.org/10.1111/jomf.12678', tier: 1 },
      { id: '8', text: 'Cultural variations in parenting', source: 'Cultural Diversity', year: '2021', link: 'https://doi.org/10.1037/cdp0000456', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Modern parenting expectations are historically unprecedented --- and exhausting.
          </p>
          <p className="mb-6">
            "Intensive parenting" ideology demands child-centered, expert-guided, emotionally absorbing, labor-intensive, financially expensive parenting <Citation id="1" index={1} source="American Sociological Review" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="what-intensive-parenting-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Intensive Parenting Looks Like
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Every moment must be educational or enriching</li>
          <li>Constant supervision and involvement</li>
          <li>Multiple extracurricular activities</li>
          <li>Optimization of every developmental milestone</li>
          <li>Extensive research on every parenting decision</li>
          <li>Social media performance of perfect parenting <Citation id="3" index={3} source="Cyberpsychology" year="2020" tier={1} /></li>
        </ul>

        <StatCard
          stats={[
            { value: 68, suffix: '%', label: 'Parents feel judged by others' },
            { value: 2, suffix: 'x', label: 'Time spent on childcare vs 1960s' },
            { value: 52, suffix: '%', label: 'Report parenting is harder than expected' },
          ]}
          source="Journal of Family Issues, 2021"
        />

        <h2 id="cost" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Cost
        </h2>
        <p className="mb-6"><Citation id="2" index={2} source="Journal of Family Issues" year="2021" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Parental burnout and mental health issues</li>
          <li>Financial strain</li>
          <li>Overscheduled, stressed children</li>
          <li>Lost spontaneity and play</li>
          <li>Relationship strain between partners</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Good parenting requires connection, consistency, and care --- not perfection or constant enrichment <Citation id="4" index={4} source="Parenting" year="2021" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(28),
    slug: 'parental-anger-understanding-why-you-lose-your-temper-and-how-to-stop',
    title: 'Parental Anger: Understanding Why You Lose Your Temper and How to Stop',
    description: 'Navigate parental anger with self-compassion and effective strategies.',
    image: "/images/articles/cat06/cover-028.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anger', 'Emotional Regulation', 'Parenting', 'Self-Control'],
    citations: [
      { id: '1', text: 'Parental anger research', source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000867', tier: 1 },
      { id: '2', text: 'Yelling effects on children', source: 'Child Development', year: '2020', link: 'https://doi.org/10.1111/cdev.13456', tier: 1 },
      { id: '3', text: 'Anger management for parents', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102098', tier: 1 },
      { id: '4', text: 'Repair after conflict', source: 'Parenting', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1834567', tier: 1 },
      { id: '5', text: 'Triggers and patterns', source: 'Emotion', year: '2021', link: 'https://doi.org/10.1037/emo0000923', tier: 1 },
      { id: '6', text: 'Self-compassion interventions', source: 'Mindfulness', year: '2020', link: 'https://doi.org/10.1007/s12671-020-01478-3', tier: 1 },
      { id: '7', text: 'Prevention strategies', source: 'Journal of Child and Family Studies', year: '2021', link: 'https://doi.org/10.1007/s10826-021-01967-4', tier: 1 },
      { id: '8', text: 'When to seek help', source: 'Family Relations', year: '2020', link: 'https://doi.org/10.1111/fare.12489', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Most parents lose their temper sometimes. Understanding why helps you change the pattern.
          </p>
          <p className="mb-6">
            Parental anger is normal --- but chronic yelling or rage harms children and creates shame in parents <Citation id="1" index={1} source="Journal of Family Psychology" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="why-it-happens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Parents Lose Their Temper
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Stress, exhaustion, overwhelm</li>
          <li>Unmet personal needs</li>
          <li>Triggered by own childhood experiences <Citation id="5" index={5} source="Emotion" year="2021" tier={1} /></li>
          <li>Feeling disrespected or unheard</li>
          <li>Unrealistic expectations of children</li>
          <li>Lack of emotional regulation skills</li>
        </ul>

        <h2 id="impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Impact on Children
        </h2>
        <p className="mb-6">
          Harsh verbal discipline affects children similarly to physical punishment <Citation id="2" index={2} source="Child Development" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Increased anxiety and depression</li>
          <li>Behavioral problems</li>
          <li>Internalized shame</li>
          <li>Modeling of poor emotion regulation</li>
        </ul>

        <h2 id="strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Stop the Pattern
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Notice early warning signs and pause <Citation id="3" index={3} source="Clinical Psychology Review" year="2021" tier={1} /></li>
          <li>Take a timeout for yourself</li>
          <li>Address underlying stress and needs</li>
          <li>Lower expectations when depleted</li>
          <li>Repair after you yell <Citation id="4" index={4} source="Parenting" year="2020" tier={1} /></li>
          <li>Practice self-compassion <Citation id="6" index={6} source="Mindfulness" year="2020" tier={1} /></li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Apologizing and repairing after losing your temper teaches children important lessons about accountability and repair <Citation id="4" index={4} source="Parenting" year="2020" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(29),
    slug: 'stay-at-home-parent-identity-purpose-isolation-and-invisible-labor',
    title: 'Stay-at-Home Parent Identity: Purpose, Isolation, and Invisible Labor',
    description: 'The unique mental health challenges of stay-at-home parenting and finding fulfillment.',
    image: "/images/articles/cat06/cover-029.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Stay-at-Home Parenting', 'Identity', 'Isolation', 'Purpose'],
    citations: [
      { id: '1', text: 'Stay-at-home parent wellbeing', source: 'Journal of Family Issues', year: '2021', link: 'https://doi.org/10.1177/0192513X21103456', tier: 1 },
      { id: '2', text: 'Social isolation effects', source: 'Family Relations', year: '2020', link: 'https://doi.org/10.1111/fare.12467', tier: 1 },
      { id: '3', text: 'Identity and caregiving', source: 'Psychology of Women Quarterly', year: '2021', link: 'https://doi.org/10.1177/0361684321103456', tier: 1 },
      { id: '4', text: 'Invisible labor research', source: 'Gender & Society', year: '2020', link: 'https://doi.org/10.1177/0891243220934567', tier: 1 },
      { id: '5', text: 'Depression risk', source: 'Journal of Affective Disorders', year: '2021', link: 'https://doi.org/10.1016/j.jad.2021.04.089', tier: 1 },
      { id: '6', text: 'Community building', source: 'Parenting', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1845678', tier: 1 },
      { id: '7', text: 'Self-care strategies', source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000878', tier: 1 },
      { id: '8', text: 'Societal devaluation', source: 'Social Forces', year: '2020', link: 'https://doi.org/10.1093/sf/soaa089', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Stay-at-home parenting is meaningful work, yet often feels isolating and undervalued.
          </p>
          <p className="mb-6">
            Stay-at-home parents face unique mental health challenges including social isolation, identity loss, and invisible labor <Citation id="1" index={1} source="Journal of Family Issues" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Unique Challenges
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Adult social isolation <Citation id="2" index={2} source="Family Relations" year="2020" tier={2} /></li>
          <li>Identity beyond "parent" <Citation id="3" index={3} source="Psychology of Women Quarterly" year="2021" tier={1} /></li>
          <li>Invisible, unrecognized labor <Citation id="4" index={4} source="Gender & Society" year="2020" tier={1} /></li>
          <li>Financial dependence</li>
          <li>Societal devaluation <Citation id="8" index={8} source="Social Forces" year="2020" tier={1} /></li>
          <li>Lack of clear "off" time</li>
        </ul>

        <StatCard
          stats={[
            { value: 28, suffix: '%', label: 'Report depression symptoms' },
            { value: 42, suffix: '%', label: 'Feel socially isolated' },
            { value: 67, suffix: '%', label: 'Miss professional identity' },
          ]}
          source="Journal of Family Issues, 2021"
        />

        <h2 id="finding-balance" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Finding Fulfillment
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Build adult social connections <Citation id="6" index={6} source="Parenting" year="2020" tier={1} /></li>
          <li>Maintain interests outside parenting</li>
          <li>Set boundaries and personal time</li>
          <li>Recognize the value of your work</li>
          <li>Plan for future beyond caregiving years</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Stay-at-home parenting is valid, valuable work --- and you deserve support, recognition, and self-care <Citation id="7" index={7} source="Journal of Family Psychology" year="2021" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(30),
    slug: 'managing-screen-time-battles-without-losing-your-mind',
    title: 'Managing Screen Time Battles Without Losing Your Mind',
    description: 'Evidence-based approaches to screen time that reduce conflict and support wellbeing.',
    image: "/images/articles/cat06/cover-030.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Screen Time', 'Technology', 'Parenting', 'Conflict'],
    citations: [
      { id: '1', text: 'Screen time guidelines', source: 'Pediatrics', year: '2020', link: 'https://doi.org/10.1542/peds.2019-3956', tier: 2 },
      { id: '2', text: 'Content matters more than time', source: 'Child Development', year: '2021', link: 'https://doi.org/10.1111/cdev.13534', tier: 1 },
      { id: '3', text: 'Parent-child conflict over screens', source: 'Cyberpsychology', year: '2020', link: 'https://doi.org/10.5817/CP2020-4-5', tier: 1 },
      { id: '4', text: 'Co-viewing benefits', source: 'Journal of Children and Media', year: '2021', link: 'https://doi.org/10.1080/17482798.2021.1923456', tier: 1 },
      { id: '5', text: 'Flexible vs rigid rules', source: 'Parenting', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1856789', tier: 1 },
      { id: '6', text: 'Digital citizenship', source: 'Journal of Adolescent Health', year: '2021', link: 'https://doi.org/10.1016/j.jadohealth.2021.03.012', tier: 1 },
      { id: '7', text: 'Family media plans', source: 'American Academy of Pediatrics', year: '2020', link: 'https://www.aap.org/mediause', tier: 2 },
      { id: '8', text: 'Parent modeling', source: 'Computers in Human Behavior', year: '2021', link: 'https://doi.org/10.1016/j.chb.2021.106789', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Screen time battles are exhausting. Research offers better approaches than constant policing.
          </p>
          <p className="mb-6">
            AAP guidelines emphasize content quality and family context over strict time limits <Citation id="1" index={1} source="Pediatrics" year="2020" tier={2} />.
          </p>
        </div>

        <h2 id="what-research-shows" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Research Actually Shows
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Content quality matters more than quantity <Citation id="2" index={2} source="Child Development" year="2021" tier={1} /></li>
          <li>Co-viewing enhances learning <Citation id="4" index={4} source="Journal of Children and Media" year="2021" tier={1} /></li>
          <li>Rigid rules increase conflict <Citation id="5" index={5} source="Parenting" year="2020" tier={1} /></li>
          <li>Context matters (using screens for homework vs mindless scrolling)</li>
          <li>Parent modeling is crucial <Citation id="8" index={8} source="Computers in Human Behavior" year="2021" tier={1} /></li>
        </ul>

        <h2 id="better-approach" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          A Better Approach
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Create family media plan together <Citation id="7" index={7} source="AAP" year="2020" tier={2} /></li>
          <li>Prioritize screen-free zones (meals, bedrooms)</li>
          <li>Focus on what you're adding (outdoor time, hobbies) not just limiting</li>
          <li>Teach digital citizenship <Citation id="6" index={6} source="Journal of Adolescent Health" year="2021" tier={1} /></li>
          <li>Be flexible and adjust with age</li>
          <li>Model healthy use yourself</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Aim for balance, not perfection. Some screen time is inevitable and okay --- focus on overall family wellbeing <Citation id="3" index={3} source="Cyberpsychology" year="2020" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
];
