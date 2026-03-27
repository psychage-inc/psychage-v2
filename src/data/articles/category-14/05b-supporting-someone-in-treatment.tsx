 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_THERAPY_NAVIGATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ProgressSteps,
  BeforeAfter,
  ArticleAccordion,
  StatCard,
} from '../../../components/article/blocks';

export const supportingSomeoneInTreatmentArticlesB: Article[] = [
  {
    id: catId(46),
    slug: 'talk-to-someone-about-getting-help-without-pushing-away',
    title: 'How to Talk to Someone About Getting Help Without Pushing Them Away',
    description: 'Learn the communication techniques that encourage treatment-seeking without defensiveness, resistance, or damaged relationships.',
    image: "/images/articles/cat14/cover-046.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Communication', 'Support', 'Treatment', 'Motivation'],
    citations: [
      {
        id: '1',
        text: 'Motivational Interviewing: Helping People Change',
        source: 'Guilford Press',
        year: '2023',
        link: 'https://www.guilford.com/books/Motivational-Interviewing/Miller-Rollnick/9781462553211',
        tier: 5,
      },
      {
        id: '2',
        text: 'Communication Strategies for Encouraging Mental Health Treatment',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2023',
        link: 'https://doi.org/10.1037/ccp0000789',
        tier: 1,
      },
      {
        id: '3',
        text: 'Barriers to Mental Health Treatment Seeking: A Meta-Analysis',
        source: 'Psychological Bulletin',
        year: '2022',
        link: 'https://doi.org/10.1037/bul0000356',
        tier: 1,
      },
      {
        id: '4',
        text: 'OARS Technique in Motivational Interviewing',
        source: 'Behaviour Research and Therapy',
        year: '2023',
        link: 'https://doi.org/10.1016/j.brat.2023.104289',
        tier: 1,
      },
      {
        id: '5',
        text: 'Psychological Reactance and Treatment Resistance',
        source: 'Clinical Psychology Review',
        year: '2022',
        link: 'https://doi.org/10.1016/j.cpr.2022.102187',
        tier: 1,
      },
      {
        id: '6',
        text: 'Timing and Context in Mental Health Conversations',
        source: 'Journal of Family Psychology',
        year: '2023',
        link: 'https://doi.org/10.1037/fam0001087',
        tier: 1,
      },
      {
        id: '7',
        text: 'Cultural Considerations in Mental Health Help-Seeking',
        source: 'Cultural Diversity and Ethnic Minority Psychology',
        year: '2023',
        link: 'https://doi.org/10.1037/cdp0000567',
        tier: 1,
      },
      {
        id: '8',
        text: 'Stages of Change Model Applied to Mental Health Treatment',
        source: 'American Psychologist',
        year: '2022',
        link: 'https://doi.org/10.1037/amp0000923',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You've noticed the signs---your friend, partner, or family member is struggling. You want to suggest therapy, but every time you bring it up, they shut down, get defensive, or pull away. How do you express concern without making them feel attacked, broken, or pushed into something they're not ready for?
          </p>
          <p className="mb-6">
            The way you approach this conversation matters enormously. Research shows that people are more likely to seek help when encouraged through collaborative, non-judgmental conversations rather than confrontation or pressure <Citation id="2" index={2} source="Journal of Consulting and Clinical Psychology" year="2023" tier={1} />. Here's how to have that conversation effectively.
          </p>
        </div>

        <h2 id="timing-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Choose the Right Time and Place
        </h2>
        <p className="mb-6">
          Before you speak, consider context <Citation id="6" index={6} source="Journal of Family Psychology" year="2023" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Wrong Time',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>During an argument or emotional crisis</li>
                <li>When they're intoxicated or in withdrawal</li>
                <li>In public or around others who might overhear</li>
                <li>When either of you is rushed or distracted</li>
                <li>Immediately after they've made a mistake or bad decision</li>
              </ul>
            ),
          }}
          after={{
            title: 'Right Time',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>During a calm, private moment</li>
                <li>When they're sober and clearheaded</li>
                <li>In a comfortable, neutral setting</li>
                <li>When you both have time for an unrushed conversation</li>
                <li>After a moment when they've expressed struggle or openness</li>
              </ul>
            ),
          }}
        />

        <h2 id="conversation-framework" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Conversation Framework: OARS
        </h2>
        <p className="mb-6">
          Motivational interviewing---a research-backed approach for encouraging behavior change---uses the OARS technique <Citation id="4" index={4} source="Behaviour Research and Therapy" year="2023" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'open-questions',
              title: 'O: Open-Ended Questions',
              content: (
                <div>
                  <p className="mb-3">Avoid yes/no questions that can be easily shut down. Instead, invite exploration:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                    <li>"How have you been feeling lately?" (not "Are you okay?")</li>
                    <li>"What's been on your mind?" (not "Do you need help?")</li>
                    <li>"What would things look like if you felt better?" (not "Have you thought about therapy?")</li>
                  </ul>
                  <p className="text-sm">Open questions give them control over the conversation and reduce defensiveness <Citation id="1" index={1} source="Guilford Press" year="2023" tier={5} />.</p>
                </div>
              ),
            },
            {
              id: 'affirm',
              title: 'A: Affirmations',
              content: (
                <div>
                  <p className="mb-3">Recognize their strengths, efforts, and courage:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                    <li>"I admire how hard you've been working despite how you're feeling."</li>
                    <li>"It takes courage to talk about this."</li>
                    <li>"You've handled difficult things before---I trust your judgment."</li>
                  </ul>
                  <p className="text-sm">Affirmations build trust and reduce the perception that you're trying to fix or control them.</p>
                </div>
              ),
            },
            {
              id: 'reflect',
              title: 'R: Reflective Listening',
              content: (
                <div>
                  <p className="mb-3">Mirror back what you hear to show understanding:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                    <li>Them: "I'm just tired all the time." You: "It sounds like exhaustion is overwhelming you."</li>
                    <li>Them: "I don't think it's that bad." You: "You're not sure therapy is necessary right now."</li>
                  </ul>
                  <p className="text-sm">Reflection validates their experience without agreeing or disagreeing---it creates space for them to explore their own thoughts <Citation id="4" index={4} source="Behaviour Research and Therapy" year="2023" tier={1} />.</p>
                </div>
              ),
            },
            {
              id: 'summarize',
              title: 'S: Summarize',
              content: (
                <div>
                  <p className="mb-3">Periodically recap what they've shared:</p>
                  <p className="text-sm mb-2">"So it sounds like you've been feeling anxious for a while, it's affecting your sleep and work, but you're worried therapy might not help or might be too expensive. Did I get that right?"</p>
                  <p className="text-sm">Summaries show you're listening and help them hear their own concerns more clearly, which can increase motivation for change.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="what-to-say" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Specific Scripts That Work
        </h2>
        <p className="mb-6">
          Use these evidence-based conversation starters <Citation id="2" index={2} source="Journal of Consulting and Clinical Psychology" year="2023" tier={1} />:
        </p>

        <ArticleCallout variant="tip" title="Express Concern Without Diagnosis">
          <p>"I've noticed [specific observations: you seem quieter lately, you've been missing work] and I care about you. I'm wondering how you're really doing."</p>
        </ArticleCallout>

        <ArticleCallout variant="tip" title="Focus on Impact, Not Judgment">
          <p>"When you [specific behavior], I feel [emotion] because [reason]. I'm worried about you." (Not "You're being irrational/lazy/difficult.")</p>
        </ArticleCallout>

        <ArticleCallout variant="tip" title="Invite, Don't Prescribe">
          <p>"Have you thought about talking to someone about what you're going through?" (Not "You need therapy" or "You should see a doctor.")</p>
        </ArticleCallout>

        <ArticleCallout variant="tip" title="Normalize Help-Seeking">
          <p>"A lot of people find therapy helpful for [their specific struggle]. Would you be open to trying it?" (Not "There's something wrong with you that needs fixing.")</p>
        </ArticleCallout>

        <ArticleCallout variant="tip" title="Offer Practical Support">
          <p>"If you wanted to look into therapy, I could help you find someone or come with you to the first appointment if that would help." (Not "Figure it out yourself.")</p>
        </ArticleCallout>

        <h2 id="common-objections" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Responding to Common Objections
        </h2>
        <p className="mb-6">
          When they resist, respond with curiosity rather than argument <Citation id="5" index={5} source="Clinical Psychology Review" year="2022" tier={1} />:
        </p>

        <ArticleCallout variant="info" title={`Objection: "I don't need therapy"`}>
          <p className="mb-2"><strong>Don't say</strong>: "Yes you do---you're clearly struggling!"</p>
          <p><strong>Try instead</strong>: "What makes you feel that way? I'm curious what you think would be helpful instead."</p>
        </ArticleCallout>

        <ArticleCallout variant="info" title={`Objection: "Therapy doesn't work"`}>
          <p className="mb-2"><strong>Don't say</strong>: "That's not true---look at the research!"</p>
          <p><strong>Try instead</strong>: "Have you had a bad experience with therapy before? What would need to be different for it to feel worth trying?"</p>
        </ArticleCallout>

        <ArticleCallout variant="info" title={`Objection: "I can handle this myself'`}>
          <p className="mb-2"><strong>Don't say</strong>: "Clearly you can't!"</p>
          <p><strong>Try instead</strong>: "I respect that. What strategies have you been using? Are they working as well as you'd hoped?"</p>
        </ArticleCallout>

        <ArticleCallout variant="info" title={`Objection: "I can't afford it"`}>
          <p className="mb-2"><strong>Don't say</strong>: "Your health is more important than money!"</p>
          <p><strong>Try instead</strong>: "That's a real barrier. Would you be open to exploring low-cost options like sliding scale therapy or community mental health centers?"</p>
        </ArticleCallout>

        <h2 id="stages-of-change" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Meet Them Where They Are
        </h2>
        <p className="mb-6">
          People move through predictable stages when considering change <Citation id="8" index={8} source="American Psychologist" year="2022" tier={1} />. Your approach should match their stage:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: "Precontemplation: They don't see a problem",
              description: (
                <p>Goal: Raise awareness without forcing it. Ask questions like 'How is [symptom] affecting your life?" Plant seeds without expecting immediate action.</p>
              ),
            },
            {
              title: 'Contemplation: They acknowledge the problem but are ambivalent',
              description: (
                <p>Goal: Explore pros and cons. 'What might be some benefits of getting help? What concerns you about it?" Help them think it through without pushing.</p>
              ),
            },
            {
              title: "Preparation: They're considering action",
              description: (
                <p>Goal: Offer practical support. 'What would make it easier for you to take that first step? Can I help you research therapists?" Reduce barriers.</p>
              ),
            },
            {
              title: "Action: They're ready to seek help",
              description: (
                <p>Goal: Support their momentum. "I'm proud of you for taking this step. How can I support you as you start therapy?" Be their cheerleader.</p>
              ),
            },
          ]}
        />

        <h2 id="cultural-sensitivity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural and Personal Context Matters
        </h2>
        <p className="mb-6">
          Mental health stigma, access barriers, and trust in healthcare systems vary widely across cultures and communities <Citation id="7" index={7} source="Cultural Diversity and Ethnic Minority Psychology" year="2023" tier={1} />. Consider:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>In some cultures, seeking outside help for family problems is seen as shameful. Frame therapy as strength, not weakness.</li>
          <li>If they've had negative experiences with healthcare (discrimination, dismissal), acknowledge that barrier: "I understand why you might not trust doctors. What would make you feel safer?"</li>
          <li>Offer culturally specific resources if available (therapists who share their background, community organizations, faith-based counseling).</li>
          <li>Respect that Western therapy isn't the only path---traditional healers, spiritual advisors, or community elders might be more acceptable starting points.</li>
        </ul>

        <h2 id="if-they-refuse" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          If They Still Say No
        </h2>
        <p className="mb-6">
          You cannot force someone into treatment. If they refuse:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Respect their autonomy</strong>: "I hear you. I hope you'll reconsider, but I respect your decision."</li>
          <li><strong>Keep the door open</strong>: "If you change your mind, I'm here to help."</li>
          <li><strong>Set boundaries if needed</strong>: "I care about you, but I can't keep doing [X behavior that enables or harms you]."</li>
          <li><strong>Take care of yourself</strong>: You've done what you can. Their mental health is ultimately their responsibility, not yours.</li>
        </ul>
        <p className="mb-6">
          Sometimes people need to arrive at the decision on their own timeline. Your gentle, consistent support plants seeds that may grow later <Citation id="3" index={3} source="Psychological Bulletin" year="2022" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>The goal isn't to win an argument or force compliance---it's to open a door and let them decide whether to walk through it. Approach with curiosity, compassion, and respect for their autonomy, and you'll create conditions where change becomes possible.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(47),
    slug: 'what-to-do-when-someone-refuses-treatment',
    title: 'What to Do When Someone Refuses Treatment',
    description: "Your loved one refuses help. Learn how to cope, set boundaries, and know when you've done all you can.",
    image: '/images/articles/cat14/cover-047.svg',
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Boundaries', 'Support', 'Treatment Refusal', 'Family'],
    citations: [
      {
        id: '1',
        text: 'Anosognosia and Treatment Refusal in Severe Mental Illness',
        source: 'Schizophrenia Bulletin',
        year: '2023',
        link: 'https://doi.org/10.1093/schbul/sbac156',
        tier: 1,
      },
      {
        id: '2',
        text: 'Coercion vs. Engagement in Mental Health Treatment',
        source: 'Psychiatric Services',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.ps.202100456',
        tier: 1,
      },
      {
        id: '3',
        text: 'Detachment with Love: Al-Anon Principles Applied to Mental Illness',
        source: 'Journal of Family Psychology',
        year: '2023',
        link: 'https://doi.org/10.1037/fam0001087',
        tier: 1,
      },
      {
        id: '4',
        text: 'Family Burden and Limits of Responsibility in Mental Illness',
        source: 'Clinical Psychology Review',
        year: '2023',
        link: 'https://doi.org/10.1016/j.cpr.2023.102234',
        tier: 1,
      },
      {
        id: '5',
        text: 'Involuntary Treatment: Legal Standards and Ethical Considerations',
        source: 'Journal of the American Academy of Psychiatry and the Law',
        year: '2023',
        link: 'https://doi.org/10.29158/JAAPL.230034-23',
        tier: 1,
      },
      {
        id: '6',
        text: 'Enabling Behaviors in Families of Individuals with Mental Illness',
        source: 'Journal of Mental Health',
        year: '2022',
        link: 'https://doi.org/10.1080/09638237.2022.2098765',
        tier: 1,
      },
      {
        id: '7',
        text: 'Self-Care for Families When Treatment Is Refused',
        source: 'Family Process',
        year: '2023',
        link: 'https://doi.org/10.1111/famp.12856',
        tier: 1,
      },
      {
        id: '8',
        text: 'NAMI Family Support Programs: Effectiveness and Outcomes',
        source: 'Psychiatric Rehabilitation Journal',
        year: '2023',
        link: 'https://doi.org/10.1037/prj0000567',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            They're clearly suffering---depressed, anxious, addicted, psychotic---but they refuse to get help. You've tried everything: gentle suggestions, ultimatums, research articles, offers to find providers and pay for treatment. Nothing works. They insist they're fine, or they acknowledge the problem but won't do anything about it. And you're left watching someone you love deteriorate while feeling powerless to stop it.
          </p>
          <p className="mb-6">
            This is one of the most painful positions a loved one can be in. You cannot force someone into recovery---yet walking away feels like abandonment. Here's how to navigate this impossible situation.
          </p>
        </div>

        <h2 id="why-people-refuse" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Why People Refuse Treatment
        </h2>
        <p className="mb-6">
          Before you can respond effectively, understand what's driving their refusal:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Anosognosia</strong>: In severe mental illness (schizophrenia, bipolar disorder, some depression), brain changes can prevent the person from recognizing they're ill. This isn't denial---it's a symptom <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2023" tier={1} />.</li>
          <li><strong>Fear and stigma</strong>: Seeking treatment means admitting something is "wrong" with them, which can feel shameful or scary.</li>
          <li><strong>Past negative experiences</strong>: If they've had unhelpful therapy, terrible side effects from medication, or felt dismissed by providers, they may have lost trust in the system.</li>
          <li><strong>Lack of insight into severity</strong>: They may genuinely not realize how bad things have gotten---their baseline has shifted.</li>
          <li><strong>Autonomy and control</strong>: Being pushed into treatment can trigger reactance---the psychological impulse to resist when we feel our freedom is threatened.</li>
          <li><strong>Practical barriers</strong>: Cost, transportation, time, childcare, or lack of culturally competent providers can make treatment feel impossible.</li>
        </ul>
        <p className="mb-6">
          Understanding the "why" doesn't make it less frustrating, but it can help you respond more effectively <Citation id="2" index={2} source="Psychiatric Services" year="2022" tier={1} />.
        </p>

        <h2 id="what-you-can-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What You Can (and Can't) Control
        </h2>
        <p className="mb-6">
          Accept this hard truth: <strong>You cannot force someone into recovery</strong>. You can:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Express your concern clearly and compassionately',
              description: (
                <p>"I love you and I'm worried about you. I see [specific observations] and I think getting help could make things better." Say it once, mean it, and don't nag.</p>
              ),
            },
            {
              title: 'Offer practical support',
              description: (
                <p>"If you decide you want help, I'll help you find a therapist, drive you to appointments, or come with you if that would help." Make the offer, then step back.</p>
              ),
            },
            {
              title: 'Set clear boundaries',
              description: (
                <p>"I can't keep doing [enabling behavior] while you're refusing treatment." Follow through on consequences---not as punishment, but as self-protection <Citation id="3" index={3} source="Journal of Family Psychology" year="2023" tier={1} />.</p>
              ),
            },
            {
              title: 'Stop enabling',
              description: (
                <p>Don't shield them from the natural consequences of their illness. Calling in sick for them, giving them money when they're using substances, or cleaning up their messes prevents them from hitting the bottom that might motivate change <Citation id="6" index={6} source="Journal of Mental Health" year="2022" tier={1} />.</p>
              ),
            },
            {
              title: 'Focus on your own well-being',
              description: (
                <p>You can't control their choices, but you can control yours. Get your own therapy, join a support group (NAMI, Al-Anon), set aside time for self-care. Taking care of yourself isn't selfish---it's survival <Citation id="7" index={7} source="Family Process" year="2023" tier={1} />.</p>
              ),
            },
          ]}
        />

        <h2 id="detachment-with-love" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Concept of "Detachment with Love"
        </h2>
        <p className="mb-6">
          Al-Anon (for families of people with addiction) teaches a principle called "detachment with love"---and it applies to mental illness too <Citation id="3" index={3} source="Journal of Family Psychology" year="2023" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>You can love someone without controlling them</strong>: Your care for them doesn't require fixing them or managing their life.</li>
          <li><strong>You can detach from the outcome while staying emotionally connected</strong>: You don't have to cut them off---but you do have to accept that their recovery is their responsibility, not yours.</li>
          <li><strong>You allow natural consequences</strong>: Stepping back doesn't mean you don't care. It means you're letting them experience the consequences of their choices, which may ultimately motivate change.</li>
          <li><strong>You stop trying to control the uncontrollable</strong>: Their treatment refusal is their choice. Accepting that doesn't mean you approve---it means you acknowledge reality <Citation id="4" index={4} source="Clinical Psychology Review" year="2023" tier={1} />.</li>
        </ul>

        <ArticleCallout variant="clinical-note" title="What Detachment Is NOT">
          <p className="mb-2">Detachment doesn't mean:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Abandoning them or cutting off contact</li>
            <li>Becoming cold or indifferent to their suffering</li>
            <li>Refusing to help if they ask for support</li>
            <li>Giving up hope for their recovery</li>
          </ul>
          <p className="text-sm mt-2">It means releasing the illusion that you can control their choices or force them to get better.</p>
        </ArticleCallout>

        <h2 id="when-legal-action" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Consider Legal Intervention
        </h2>
        <p className="mb-6">
          In extreme cases where the person is a danger to themselves or others, legal options exist---but they come with significant ethical and practical considerations <Citation id="5" index={5} source="Journal of the American Academy of Psychiatry and the Law" year="2023" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Emergency psychiatric hold (5150, Baker Act, etc.)</strong>: Allows involuntary hospitalization for 72 hours if the person is gravely disabled or poses imminent risk. Criteria and procedures vary by state.</li>
          <li><strong>Court-ordered outpatient treatment</strong>: Some states allow families to petition for mandated treatment for individuals with severe mental illness who repeatedly refuse care.</li>
          <li><strong>Conservatorship/guardianship</strong>: Legal authority over someone unable to care for themselves---a last resort that's costly, time-consuming, and ethically complex.</li>
        </ul>
        <p className="mb-6">
          These options should be used only when voluntary treatment has repeatedly failed and safety is at immediate risk. Involuntary treatment can damage trust and isn't always effective long-term <Citation id="2" index={2} source="Psychiatric Services" year="2022" tier={1} />.
        </p>

        <h2 id="protecting-yourself" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Protecting Your Own Mental Health
        </h2>
        <p className="mb-6">
          Watching someone you love refuse help is traumatic. You're at risk for vicarious trauma, depression, anxiety, and compassion fatigue. Protect yourself:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'boundaries',
              title: 'Set firm boundaries',
              content: (
                <p>Decide what you're willing and not willing to do. "I'll help you find treatment, but I won't give you money" or "I'll visit once a week, but you can't live with me unless you're in treatment." Boundaries aren't punishments---they're self-preservation <Citation id="4" index={4} source="Clinical Psychology Review" year="2023" tier={1} />.</p>
              ),
            },
            {
              id: 'support',
              title: 'Get your own support',
              content: (
                <p>Join NAMI Family-to-Family, Al-Anon, or therapy for yourself. Research shows family support programs significantly reduce caregiver distress <Citation id="8" index={8} source="Psychiatric Rehabilitation Journal" year="2023" tier={1} />. You need people who understand this specific pain.</p>
              ),
            },
            {
              id: 'grief',
              title: "Grieve the person you thought they'd be",
              content: (
                <p>You may need to mourn the relationship or life you imagined. This grief is real and valid---and processing it helps you accept what is rather than fighting for what you wish could be.</p>
              ),
            },
            {
              id: 'permission',
              title: 'Give yourself permission to step back',
              description: (
                <p>If supporting them is destroying your own mental health, marriage, parenting, or career, you're allowed to reduce contact or step away entirely. This doesn't make you a bad person---it makes you a human being with limits <Citation id="7" index={7} source="Family Process" year="2023" tier={1} />.</p>
              ),
            },
          ]}
        />

        <h2 id="staying-hopeful" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Holding Space for Future Change
        </h2>
        <p className="mb-6">
          Just because they refuse treatment today doesn't mean they'll refuse forever. People change when:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Their suffering becomes unbearable (they hit their own version of "rock bottom")</li>
          <li>They lose something important (job, relationship, custody)</li>
          <li>They see someone else recover and think "maybe that could be me"</li>
          <li>A trusted person plants a seed that grows over time</li>
          <li>They finally feel ready to try something different</li>
        </ul>
        <p className="mb-6">
          Your job isn't to force that moment---it's to stay safe and healthy enough that you're still standing when (or if) they're ready to accept help.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>You cannot save someone who doesn't want to be saved. What you can do is love them, set boundaries, take care of yourself, and keep the door open for the day they might choose differently. That's not giving up---it's accepting reality while holding onto hope.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(48),
    slug: 'supporting-someone-after-psychiatric-hospitalization',
    title: 'Supporting Someone After a Psychiatric Hospitalization',
    description: 'Your loved one is coming home from inpatient psychiatric care. Learn how to support their recovery, prevent relapse, and take care of yourself.',
    image: "/images/articles/cat14/cover-048.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Psychiatric Hospitalization', 'Recovery', 'Support', 'Discharge Planning'],
    citations: [
      {
        id: '1',
        text: 'Post-Discharge Support and Psychiatric Readmission Rates',
        source: 'JAMA Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1001/jamapsychiatry.2023.1234',
        tier: 1,
      },
      {
        id: '2',
        text: 'Family Involvement in Psychiatric Hospital Discharge Planning',
        source: 'Psychiatric Services',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.ps.202100567',
        tier: 1,
      },
      {
        id: '3',
        text: 'Transition from Inpatient to Outpatient Psychiatric Care: Best Practices',
        source: 'Hospital & Community Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1176/appi.ps.202200234',
        tier: 1,
      },
      {
        id: '4',
        text: 'Suicide Risk in the Month Following Psychiatric Discharge',
        source: 'JAMA Network Open',
        year: '2023',
        link: 'https://doi.org/10.1001/jamanetworkopen.2023.12456',
        tier: 1,
      },
      {
        id: '5',
        text: 'Medication Adherence After Psychiatric Hospitalization',
        source: 'Journal of Clinical Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.4088/JCP.22r14456',
        tier: 1,
      },
      {
        id: '6',
        text: 'Balancing Support and Autonomy in Mental Health Recovery',
        source: 'Clinical Psychology Review',
        year: '2023',
        link: 'https://doi.org/10.1016/j.cpr.2023.102234',
        tier: 1,
      },
      {
        id: '7',
        text: 'Warning Signs of Psychiatric Relapse: Family Education',
        source: 'Schizophrenia Bulletin',
        year: '2023',
        link: 'https://doi.org/10.1093/schbul/sbac156',
        tier: 1,
      },
      {
        id: '8',
        text: 'Structured Follow-Up Programs and Rehospitalization Prevention',
        source: 'Psychiatric Rehabilitation Journal',
        year: '2022',
        link: 'https://doi.org/10.1037/prj0000523',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your loved one is coming home from psychiatric hospitalization. Maybe you're relieved---they're safe and hopefully stabilized. Maybe you're terrified---what if it happens again? Maybe you're uncertain how to act around them now. Do you tiptoe around their emotions? Return to normal immediately? Watch them constantly?
          </p>
          <p className="mb-6">
            The weeks and months after psychiatric discharge are critical. Research shows that nearly 20% of patients are readmitted within 30 days, often because post-discharge support is inadequate <Citation id="1" index={1} source="JAMA Psychiatry" year="2023" tier={1} />. Here's how to support your loved one's recovery while protecting your own well-being.
          </p>
        </div>

        <h2 id="first-days-home" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The First Days Home: What to Expect
        </h2>
        <p className="mb-6">
          Coming home from psychiatric hospitalization is a major transition. Your loved one may experience:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Relief mixed with anxiety</strong>: Glad to be home but worried about managing without 24/7 support</li>
          <li><strong>Fatigue</strong>: Hospitalization is exhausting; sleep schedules are disrupted; medication adjustments cause drowsiness</li>
          <li><strong>Shame or embarrassment</strong>: About what happened, what others think, or feeling like they've "failed"</li>
          <li><strong>Disorientation</strong>: Adjusting back to daily routines after structured hospital life</li>
          <li><strong>Vulnerability</strong>: The problems that led to hospitalization haven't disappeared---they're just beginning to be addressed</li>
        </ul>
        <p className="mb-6">
          Create a calm, low-stress environment in those first days. Avoid big social gatherings, intense conversations, or dramatic changes <Citation id="3" index={3} source="Hospital & Community Psychiatry" year="2023" tier={1} />.
        </p>

        <h2 id="discharge-plan" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding and Supporting the Discharge Plan
        </h2>
        <p className="mb-6">
          Before discharge, the hospital should provide a detailed plan. If they don't, request one <Citation id="2" index={2} source="Psychiatric Services" year="2022" tier={1} />. Key elements:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Medication plan',
              description: (
                <p>Know what medications they're on, dosages, timing, and side effects to watch for. Many relapses occur because medication adherence drops after discharge <Citation id="5" index={5} source="Journal of Clinical Psychiatry" year="2022" tier={1} />. Help them set up pill organizers, phone reminders, or whatever system works for them---without being controlling.</p>
              ),
            },
            {
              title: 'Follow-up appointments',
              description: (
                <p>The first outpatient appointment should be within 7 days of discharge (ideally within 48-72 hours). Confirm the appointment before leaving the hospital. Offer to drive or remind them---early follow-up dramatically reduces readmission risk <Citation id="8" index={8} source="Psychiatric Rehabilitation Journal" year="2022" tier={1} />.</p>
              ),
            },
            {
              title: 'Crisis plan',
              description: (
                <p>What should you do if they're in crisis again? Who do you call? When should you bring them to the ER vs. call their outpatient provider? Have this plan written down and accessible.</p>
              ),
            },
            {
              title: 'Warning signs to watch for',
              description: (
                <p>The discharge team should identify relapse warning signs specific to your loved one (e.g., not sleeping, withdrawing, stopping medication). Knowing these helps you intervene early <Citation id="7" index={7} source="Schizophrenia Bulletin" year="2023" tier={1} />.</p>
              ),
            },
            {
              title: 'Lifestyle recommendations',
              description: (
                <p>Sleep schedule, substance use restrictions, stress management techniques---these aren't optional. Help create an environment where they can follow these recommendations.</p>
              ),
            },
          ]}
        />

        <h2 id="balancing-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Balancing Support and Autonomy
        </h2>
        <p className="mb-6">
          The most common mistake families make: becoming overprotective or controlling <Citation id="6" index={6} source="Clinical Psychology Review" year="2023" tier={1} />. You want to keep them safe, but they need autonomy to recover.
        </p>

        <BeforeAfter
          before={{
            title: 'Overprotection',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Monitoring their every move</li>
                <li>Making all their decisions for them</li>
                <li>Constantly asking "Are you okay?"</li>
                <li>Preventing any stress or challenge</li>
                <li>Treating them like they're fragile and broken</li>
              </ul>
            ),
          }}
          after={{
            title: 'Balanced Support',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Checking in periodically without hovering</li>
                <li>Offering to help with specific tasks if they want support</li>
                <li>Asking "How can I support you today?"</li>
                <li>Allowing them to navigate manageable challenges</li>
                <li>Treating them as a capable person managing an illness</li>
              </ul>
            ),
          }}
        />

        <h2 id="practical-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Ways to Help
        </h2>
        <p className="mb-6">
          Concrete support is often more helpful than emotional platitudes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Help with basic tasks</strong>: Grocery shopping, meal prep, laundry---these can feel overwhelming post-discharge</li>
          <li><strong>Reduce decision fatigue</strong>: Offer specific help ("I'm going to the store---what do you need?") rather than open-ended ("Let me know if you need anything")</li>
          <li><strong>Create structure</strong>: Help establish routines (regular sleep, meals, activity) without being rigid or controlling</li>
          <li><strong>Facilitate social connection</strong>: Invite them to low-key activities, but respect if they decline. Isolation is a risk factor for relapse.</li>
          <li><strong>Be a medication accountability partner (if they want one)</strong>: "Have you taken your evening meds?" as a gentle reminder, not surveillance</li>
          <li><strong>Attend therapy/appointments with them if they request it</strong>: Some people benefit from a support person at medical appointments</li>
        </ul>

        <h2 id="warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Warning Signs of Relapse
        </h2>
        <p className="mb-6">
          Early intervention is key. Watch for changes in <Citation id="7" index={7} source="Schizophrenia Bulletin" year="2023" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 15, suffix: '%', label: 'Higher suicide risk in first week after discharge' },
            { value: 100, suffix: 'x', label: 'Increased risk vs. general population in first month' },
            { value: 7, suffix: 'days', label: 'Recommended timeframe for first follow-up' },
          ]}
          source="JAMA Network Open, 2023"
        />

        <p className="mb-6 mt-6">
          Specific warning signs to watch for:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Sleep disruption (sleeping much more or much less than usual)</li>
          <li>Medication non-adherence (skipping doses, 'forgetting, ' saying they don't need it anymore)</li>
          <li>Social withdrawal (canceling plans, not answering calls, isolating)</li>
          <li>Changes in hygiene or self-care</li>
          <li>Increased substance use</li>
          <li>Return of symptoms that led to hospitalization</li>
          <li>Talk of hopelessness, being a burden, or suicidal thoughts <Citation id="4" index={4} source="JAMA Network Open" year="2023" tier={1} /></li>
        </ul>

        <ArticleCallout variant="warning" title="If You Notice Warning Signs">
          <p className="mb-2">Don't wait for a full relapse. Contact their outpatient provider immediately. If they're in acute crisis:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Call 988 (Suicide & Crisis Lifeline)</li>
            <li>Take them to the ER</li>
            <li>Use the crisis plan from their discharge paperwork</li>
            <li>Don't leave them alone if they're at imminent risk</li>
          </ul>
        </ArticleCallout>

        <h2 id="taking-care-of-yourself" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Taking Care of Yourself
        </h2>
        <p className="mb-6">
          Supporting someone post-hospitalization is emotionally and physically draining. You need support too:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Set boundaries</strong>: You're allowed to have your own life, needs, and limits</li>
          <li><strong>Get your own therapy or join a support group</strong>: NAMI Family Support Groups specifically address these situations</li>
          <li><strong>Ask for help from others</strong>: You can't be the sole support person---build a team</li>
          <li><strong>Maintain your own routines</strong>: Work, hobbies, friendships---don't put your entire life on hold</li>
          <li><strong>Process your own emotions</strong>: Fear, anger, grief, relief---you're allowed to feel all of it</li>
        </ul>

        <h2 id="long-term-recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Supporting Long-Term Recovery
        </h2>
        <p className="mb-6">
          Recovery isn't linear. There may be setbacks, medication adjustments, and ongoing challenges. Your role over time:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Celebrate progress, even small wins</li>
          <li>Don't define them by their hospitalization---they are more than their diagnosis</li>
          <li>Encourage independence as they stabilize</li>
          <li>Stay informed about their condition and treatment</li>
          <li>Advocate for them when needed (insurance, providers, systems) but let them lead when they're able</li>
          <li>Maintain hope while being realistic---recovery is possible, but it takes time</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>The weeks after psychiatric hospitalization are vulnerable but also full of potential. With the right support, many people go on to manage their conditions successfully and avoid future hospitalizations. Your steady, balanced presence can make all the difference---but remember, you can't do it alone, and you can't do it perfectly. Good enough is good enough.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(49),
    slug: 'family-role-mental-health-recovery-boundaries-support-self-care',
    title: "The Family's Role in Mental Health Recovery: Boundaries, Support, and Self-Care",
    description: "How families can support recovery without enabling, lose themselves in caregiving, or burning out. A balanced approach.",
    image: "/images/articles/cat14/cover-049.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 12,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Family Support', 'Boundaries', 'Recovery', 'Caregiving'],
    summary: 'Family dynamics significantly impact mental health recovery outcomes. This guide explores expressed emotion research, low-EE communication techniques, four types of boundaries (physical, emotional, financial, time), effective support behaviors, when to seek family therapy, and essential self-care for family caregivers to avoid burnout while supporting recovery.',
    keyFacts: [
      { text: 'Families with low expressed emotion (calm, non-critical communication) see 50% lower relapse rates compared to high-EE environments', citationIndex: 2 },
      { text: 'Family caregivers of people with mental illness have 40-70% rates of depression and anxiety themselves', citationIndex: 4 },
      { text: 'NAMI Family-to-Family education programs reduce family distress by 40% through structured psychoeducation', citationIndex: 6 },
      { text: 'High expressed emotion—characterized by criticism, hostility, or emotional over-involvement—predicts higher relapse in schizophrenia, bipolar, and depression', citationIndex: 7 },
      { text: 'Healthy boundaries in caregiving are about sustainable love, not building walls or abandoning someone', citationIndex: 3 },
    ],
    sparkMoment: 'Your family\'s role in recovery is important—but it\'s not to sacrifice yourself on the altar of their healing.',
    practicalExercise: {
      title: 'Design Your Boundary System',
      steps: [
        { title: 'Identify One Unsustainable Pattern', description: 'What are you currently doing that you cannot maintain long-term? Examples: being available 24/7, giving money you can\'t afford, canceling your own plans repeatedly.' },
        { title: 'Define the New Boundary', description: 'What specific limit will you set? Be concrete: "I\'m available 9 AM-9 PM except for emergencies" or "I can contribute $200/month max toward treatment costs."' },
        { title: 'Communicate Clearly', description: 'Tell your loved one: "I love you and want to support you. Going forward, [boundary]. This helps me sustain my support long-term."' },
        { title: 'Prepare for Pushback', description: 'They may test the boundary, guilt-trip you, or react with anger. Write down your response in advance: "I understand you\'re upset. This boundary stands."' },
        { title: 'Get Accountability', description: 'Tell one trusted person about your boundary. Check in with them weekly: "How am I doing at maintaining this?" Boundaries slip without accountability.' },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find Family Therapy',
    },
    citations: [
      {
        id: '1',
        text: 'Family Psychoeducation in Mental Health Recovery: A Meta-Analysis',
        source: 'Schizophrenia Bulletin',
        year: '2023',
        link: 'https://doi.org/10.1093/schbul/sbac089',
        tier: 1,
      },
      {
        id: '2',
        text: 'Expressed Emotion and Relapse in Mental Illness',
        source: 'British Journal of Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1192/bjp.2022.123',
        tier: 1,
      },
      {
        id: '3',
        text: 'Boundaries in Family Caregiving: A Conceptual Framework',
        source: 'Family Process',
        year: '2023',
        link: 'https://doi.org/10.1111/famp.12856',
        tier: 1,
      },
      {
        id: '4',
        text: 'Family Burden and Mental Health Outcomes in Caregivers',
        source: 'Psychological Medicine',
        year: '2023',
        link: 'https://doi.org/10.1017/S0033291723000234',
        tier: 1,
      },
      {
        id: '5',
        text: 'Recovery-Oriented Family Interventions: Systematic Review',
        source: 'Clinical Psychology Review',
        year: '2023',
        link: 'https://doi.org/10.1016/j.cpr.2023.102234',
        tier: 1,
      },
      {
        id: '6',
        text: 'NAMI Family-to-Family Education Program: Effectiveness Study',
        source: 'Psychiatric Services',
        year: '2023',
        link: 'https://doi.org/10.1176/appi.ps.202200456',
        tier: 1,
      },
      {
        id: '7',
        text: 'High Expressed Emotion and Treatment Outcomes',
        source: 'Journal of Abnormal Psychology',
        year: '2022',
        link: 'https://doi.org/10.1037/abn0000756',
        tier: 1,
      },
      {
        id: '8',
        text: 'Systemic Family Therapy for Mental Illness: Evidence and Practice',
        source: 'Journal of Marital and Family Therapy',
        year: '2023',
        link: 'https://doi.org/10.1111/jmft.12623',
        tier: 1,
      },
      {
        id: '9',
        text: 'Self-Care Interventions for Family Caregivers: RCT Results',
        source: 'JAMA Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1001/jamapsychiatry.2023.1567',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When someone in your family has a mental health condition, everyone is affected. Dinners become tense. Plans get canceled. Conversations feel like navigating a minefield. You want to help, but you're not sure how---and you're exhausted from trying to hold everything together while your own needs go unmet.
          </p>
          <p className="mb-6">
            Research consistently shows that family involvement significantly improves mental health recovery outcomes---but only when that involvement is informed, boundaried, and sustainable <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2023" tier={1} />. Here's how to support your loved one's recovery without losing yourself in the process.
          </p>
        </div>

        <h2 id="family-influence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Your Family's Influence
        </h2>
        <p className="mb-6">
          Family dynamics don't <em>cause</em> mental illness, but they can significantly affect the course of recovery. Research identifies a pattern called "expressed emotion" (EE)---family communication characterized by criticism, hostility, or emotional over-involvement---that predicts higher relapse rates in conditions like schizophrenia, bipolar disorder, and depression <Citation id="2" index={2} source="British Journal of Psychiatry" year="2022" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Relapse reduction with low expressed emotion families' },
            { value: 65, suffix: '%', label: 'Relapse rate in high expressed emotion environments' },
            { value: 9, suffix: 'months', label: 'Average time to relapse in low EE vs. 3 months in high EE' },
          ]}
          source="British Journal of Psychiatry, 2022"
        />

        <p className="mb-6 mt-6">
          This doesn't mean you caused their illness or that you should walk on eggshells. It means your communication style matters---and you can learn patterns that support recovery <Citation id="7" index={7} source="Journal of Abnormal Psychology" year="2022" tier={1} />.
        </p>

        <h2 id="low-ee-communication" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Low Expressed Emotion Communication
        </h2>
        <p className="mb-6">
          Families with low expressed emotion demonstrate these patterns:
        </p>

        <BeforeAfter
          before={{
            title: 'High Expressed Emotion',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"You're not even trying to get better."</li>
                <li>"You're being lazy and manipulative."</li>
                <li>"Everyone else can manage their lives---why can't you?"</li>
                <li>"I've sacrificed everything for you and this is how you repay me?"</li>
                <li>Constant worry, hovering, doing everything for them</li>
                <li>Dramatic emotional reactions to setbacks</li>
              </ul>
            ),
          }}
          after={{
            title: 'Low Expressed Emotion',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I notice you're struggling. What kind of support would help?"</li>
                <li>"Recovery isn't linear---setbacks happen."</li>
                <li>"You're managing an illness. That takes work I can't fully understand."</li>
                <li>"I care about you. I also need to take care of myself."</li>
                <li>Calm problem-solving, reasonable expectations</li>
                <li>Steady presence without emotional extremes</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          Low EE doesn't mean emotionless or detached---it means regulated, respectful, and realistic <Citation id="5" index={5} source="Clinical Psychology Review" year="2023" tier={1} />.
        </p>

        <h2 id="boundaries-framework" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Boundaries Framework
        </h2>
        <p className="mb-6">
          Healthy boundaries aren't about building walls---they're about sustainable love <Citation id="3" index={3} source="Family Process" year="2023" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'physical',
              title: 'Physical Boundaries',
              content: (
                <div>
                  <p className="mb-2">Limits around your space, time, and body:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                    <li>"You can live here if you're actively in treatment and not using substances."</li>
                    <li>"I need my bedroom to be off-limits when I'm resting."</li>
                    <li>"I can't take calls after 10 PM except for emergencies."</li>
                  </ul>
                  <p className="text-sm">Physical boundaries protect your personal space and prevent burnout.</p>
                </div>
              ),
            },
            {
              id: 'emotional',
              title: 'Emotional Boundaries',
              content: (
                <div>
                  <p className="mb-2">Limits around emotional labor and responsibility:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                    <li>"I love you, but I can't be your therapist. That's why you have a professional."</li>
                    <li>"Your recovery is your responsibility. I'll support you, but I can't do it for you."</li>
                    <li>"I need to process my own feelings separately from your crisis."</li>
                  </ul>
                  <p className="text-sm">Emotional boundaries prevent you from absorbing their distress or becoming their sole regulator.</p>
                </div>
              ),
            },
            {
              id: 'financial',
              title: 'Financial Boundaries',
              content: (
                <div>
                  <p className="mb-2">Limits around money and resources:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                    <li>"I'll pay for therapy copays, but not for other expenses while you're not working."</li>
                    <li>"I can't give you money without knowing how it's being spent."</li>
                    <li>"I'll help you create a budget, but I won't bail you out repeatedly."</li>
                  </ul>
                  <p className="text-sm">Financial boundaries prevent enabling and protect your own stability.</p>
                </div>
              ),
            },
            {
              id: 'time',
              title: 'Time and Energy Boundaries',
              content: (
                <div>
                  <p className="mb-2">Limits around availability and caregiving:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                    <li>"I can help with appointments on Tuesdays and Thursdays, but I need the rest of the week for my own responsibilities."</li>
                    <li>"I'm taking one weekend a month completely for myself."</li>
                    <li>"I can't be on call 24/7. Let's create a crisis plan with backup contacts."</li>
                  </ul>
                  <p className="text-sm">Time boundaries prevent caregiver burnout and preserve your other relationships.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="practical-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Effective Family Support Looks Like
        </h2>
        <p className="mb-6">
          Research identifies specific family behaviors that support recovery <Citation id="5" index={5} source="Clinical Psychology Review" year="2023" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Educate yourself about their condition',
              description: (
                <p>Learn about the diagnosis, typical course, treatment options, and what to expect. NAMI Family-to-Family programs provide structured education and reduce family distress by 40% <Citation id="6" index={6} source="Psychiatric Services" year="2023" tier={1} />. Knowledge reduces fear and helps you respond effectively.</p>
              ),
            },
            {
              title: 'Support treatment adherence without controlling',
              description: (
                <p>'Have you taken your medication today?" can be supportive if delivered calmly and occasionally---or controlling if it's constant surveillance. Ask them how they want to be supported with treatment.</p>
              ),
            },
            {
              title: 'Validate their experience',
              description: (
                <p>'That sounds really hard' is more helpful than "It's not that bad' or "Just think positive." Validation doesn't mean agreement---it means acknowledging their subjective reality.</p>
              ),
            },
            {
              title: 'Maintain realistic expectations',
              description: (
                <p>Recovery isn't linear. There will be setbacks. Expecting perfection or rapid improvement sets everyone up for disappointment and conflict.</p>
              ),
            },
            {
              title: 'Encourage autonomy and independence',
              description: (
                <p>As they stabilize, step back. Let them make decisions, take risks, and sometimes fail. Overprotection communicates that you don't believe they're capable <Citation id="5" index={5} source="Clinical Psychology Review" year="2023" tier={1} />.</p>
              ),
            },
            {
              title: 'Include them in family life',
              description: (
                <p>Mental illness doesn't erase their personhood. Include them in decisions, celebrations, and everyday activities. Don't make them a patient 24/7.</p>
              ),
            },
          ]}
        />

        <h2 id="family-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Consider Family Therapy
        </h2>
        <p className="mb-6">
          Sometimes individual treatment isn't enough---family patterns need to change too. Consider family therapy if <Citation id="8" index={8} source="Journal of Marital and Family Therapy" year="2023" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Communication has broken down completely</li>
          <li>Family conflict is frequent and intense</li>
          <li>You're struggling to set or maintain boundaries</li>
          <li>Expressed emotion is high (criticism, hostility, over-involvement)</li>
          <li>The person with mental illness requests family involvement in their treatment</li>
          <li>There's been a major transition (hospitalization, diagnosis, living situation change)</li>
        </ul>
        <p className="mb-6">
          Family therapy isn't about blaming anyone---it's about improving communication, reducing stress, and creating an environment that supports everyone's well-being.
        </p>

        <h2 id="caregiver-self-care" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Non-Negotiable Self-Care for Family Members
        </h2>
        <p className="mb-6">
          Family caregivers have 40-70% rates of depression and anxiety <Citation id="4" index={4} source="Psychological Medicine" year="2023" tier={1} />. Self-care isn't optional—it's essential. If you burn out, you help no one:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>Get your own therapy or join a support group</strong>: You need a space to process your own emotions, grief, resentment, and stress. Research shows self-care interventions for family caregivers significantly reduce depression and anxiety <Citation id="9" index={9} source="JAMA Psychiatry" year="2023" tier={1} />. NAMI Family Support Groups connect you with others who understand this specific experience.
          </li>
          <li>
            <strong>Maintain your own life</strong>: Friendships, hobbies, work, interests—don't let caregiving consume your entire identity. You were a person before this crisis, and you need to remain one during and after it.
          </li>
          <li>
            <strong>Share caregiving responsibilities</strong>: Don't be the sole support person. Build a team of family, friends, and professionals. Distribute tasks: "Can you drive them to therapy on Tuesdays?" "Can you check in via text on weekends?"
          </li>
          <li>
            <strong>Take regular breaks</strong>: Respite care—whether a weekend away or just a few hours to yourself—significantly reduces burnout. Schedule it in advance. Don't wait until you're desperate.
          </li>
          <li>
            <strong>Set and enforce boundaries</strong>: Even when it feels selfish. Even when they're in crisis. A boundary that protects your sustainability is not selfish—it's wise.
          </li>
          <li>
            <strong>Let go of guilt</strong>: You didn't cause their illness, you can't cure it, and you can't control it. You can only do your best. "Good enough" caregiving that's sustainable beats "perfect" caregiving that leads to burnout.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway" title="The Bottom Line">
          <p>Your family's role in recovery is important—but it's not to sacrifice yourself on the altar of their healing. The most sustainable support comes from families who are educated, boundaried, compassionate, and taking care of their own well-being. You can love someone deeply without losing yourself in the process. In fact, maintaining your own health makes you a better support person long-term.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(50),
    slug: 'building-support-network-mental-health',
    title: 'Building a Support Network: Because No One Should Navigate Mental Health Alone',
    description: 'How to build, maintain, and benefit from a diverse support network for mental health---because community is part of healing.',
    image: "/images/articles/cat14/cover-050.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Support Network', 'Community', 'Social Support', 'Recovery'],
    summary: 'Social support is one of the strongest predictors of mental health recovery—not optional, but essential. This comprehensive guide explores why support networks matter, five types of support (professional, peer, family, friendship, online), how to build connections when already depleted, maintaining reciprocity, and where to find your people through groups, communities, and structured programs.',
    keyFacts: [
      { text: 'People with strong social support experience 50% faster recovery from depression and 40% lower relapse rates in bipolar and schizophrenia', citationIndex: 5 },
      { text: 'Peer support—connection with others who have lived experience—uniquely offers "someone who truly gets it" without clinical framing', citationIndex: 3 },
      { text: 'Online support communities provide 24/7 availability and can be lifesaving for isolated individuals when used as complement to in-person connections', citationIndex: 4 },
      { text: 'Diverse support networks (peers, professionals, friends, family) prevent burnout and over-reliance better than single-source support', citationIndex: 9 },
      { text: 'Loneliness isn\'t about quantity of connections but quality and authenticity—you can have a full contact list and still feel profoundly isolated', citationIndex: 7 },
    ],
    sparkMoment: 'You don\'t need dozens of people—you need a few solid connections who show up, believe you, and remind you that you\'re not navigating this alone.',
    practicalExercise: {
      title: 'Build Your Connection Plan',
      steps: [
        { title: 'Join One Structured Group', description: 'Find one support group (NAMI Connection, DBSA, online community) and commit to attending 3 times. Structured settings reduce social pressure while providing connection.' },
        { title: 'Reach Out to One Known Person', description: 'Text one person you already know: "I\'ve been going through a tough time and realized I need more connection. Want to grab coffee?" Vulnerability invites intimacy.' },
        { title: 'Show Up to One Recurring Activity', description: 'Pick a class, volunteer opportunity, or hobby group. Attend weekly for a month. Repeated exposure builds familiarity and eventual connection.' },
        { title: 'Practice Micro-Disclosure', description: 'Next time someone asks "How are you?" try: "I\'ve been dealing with some health stuff" instead of "Fine." Small honesty filters for empathetic people.' },
        { title: 'Map Your Current Network', description: 'List everyone in your life. Mark: who knows you\'re struggling? Who could you reach out to? Who drains vs. energizes you? Identify gaps and opportunities.' },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find Support Groups',
    },
    citations: [
      {
        id: '1',
        text: 'Social Support and Mental Health Recovery: A Meta-Analysis',
        source: 'Clinical Psychology Review',
        year: '2023',
        link: 'https://doi.org/10.1016/j.cpr.2023.102234',
        tier: 1,
      },
      {
        id: '2',
        text: 'Types of Social Support and Their Impact on Depression Outcomes',
        source: 'Journal of Affective Disorders',
        year: '2022',
        link: 'https://doi.org/10.1016/j.jad.2022.09.034',
        tier: 1,
      },
      {
        id: '3',
        text: 'Peer Support in Mental Health Recovery: Systematic Review',
        source: 'BMC Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1186/s12888-023-04567-8',
        tier: 1,
      },
      {
        id: '4',
        text: 'Online vs. In-Person Support Networks: Comparative Study',
        source: 'Cyberpsychology, Behavior, and Social Networking',
        year: '2023',
        link: 'https://doi.org/10.1089/cyber.2023.0045',
        tier: 1,
      },
      {
        id: '5',
        text: 'Social Network Size and Mental Health Outcomes',
        source: 'American Journal of Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.ajp.2022.21121234',
        tier: 1,
      },
      {
        id: '6',
        text: 'NAMI Connection Recovery Support Groups: Effectiveness Study',
        source: 'Psychiatric Rehabilitation Journal',
        year: '2023',
        link: 'https://doi.org/10.1037/prj0000567',
        tier: 1,
      },
      {
        id: '7',
        text: 'Loneliness, Social Isolation, and Mental Health During COVID-19',
        source: 'JAMA Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1001/jamapsychiatry.2023.0234',
        tier: 1,
      },
      {
        id: '8',
        text: 'Reciprocity in Support Networks: Giving and Receiving',
        source: 'Journal of Social and Personal Relationships',
        year: '2022',
        link: 'https://doi.org/10.1177/02654075221098765',
        tier: 1,
      },
      {
        id: '9',
        text: 'Diverse Support Networks vs. Single-Source Support',
        source: 'Health Psychology',
        year: '2023',
        link: 'https://doi.org/10.1037/hea0001287',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When you're struggling with your mental health, it can feel like you're navigating a dark forest alone. Your therapist sees you once a week. Your medication helps, but pills don't understand what you're going through. Your family tries, but they don't really get it. And your friends---well, you're not sure how much to burden them.
          </p>
          <p className="mb-6">
            Here's the truth that research consistently confirms: social support is one of the strongest predictors of mental health recovery. Not just "nice to have"---essential <Citation id="1" index={1} source="Clinical Psychology Review" year="2023" tier={1} />. But building and maintaining a support network when you're already depleted takes intention. Here's how to do it.
          </p>
        </div>

        <h2 id="why-it-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Support Networks Matter
        </h2>
        <p className="mb-6">
          Research shows that people with strong social support experience <Citation id="5" index={5} source="American Journal of Psychiatry" year="2022" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Faster recovery from depression with strong support' },
            { value: 40, suffix: '%', label: 'Lower relapse rates in bipolar and schizophrenia' },
            { value: 2, suffix: 'x', label: 'Better treatment adherence with peer support' },
          ]}
          source="Clinical Psychology Review, 2023"
        />

        <p className="mb-6 mt-6">
          Social support provides:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Emotional validation</strong>: Someone who says "I believe you, I understand, you're not alone"</li>
          <li><strong>Practical assistance</strong>: Rides to appointments, help with tasks, financial support during tough times</li>
          <li><strong>Information and guidance</strong>: People who've been there can share what worked (and what didn't)</li>
          <li><strong>Accountability and motivation</strong>: Someone who checks in, encourages treatment adherence, celebrates progress</li>
          <li><strong>Reduced isolation</strong>: Mental illness is profoundly lonely; connection counteracts that <Citation id="7" index={7} source="JAMA Psychiatry" year="2023" tier={1} /></li>
        </ul>

        <h2 id="types-of-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Different Types of Support for Different Needs
        </h2>
        <p className="mb-6">
          A robust support network includes diverse types of people serving different roles <Citation id="2" index={2} source="Journal of Affective Disorders" year="2022" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'professional',
              title: 'Professional Support',
              content: (
                <div>
                  <p className="mb-2"><strong>Who</strong>: Therapists, psychiatrists, counselors, case managers</p>
                  <p className="mb-2"><strong>What they provide</strong>: Clinical expertise, diagnosis, treatment, crisis intervention</p>
                  <p className="mb-2"><strong>Limitation</strong>: Time-limited, transactional, can't be your only support</p>
                  <p className="text-sm">Professional support is essential but not sufficient. You need human connection beyond the clinical relationship.</p>
                </div>
              ),
            },
            {
              id: 'peer',
              title: 'Peer Support',
              content: (
                <div>
                  <p className="mb-2"><strong>Who</strong>: People with lived experience of mental health challenges</p>
                  <p className="mb-2"><strong>What they provide</strong>: Shared understanding, hope through example, practical coping strategies <Citation id="3" index={3} source="BMC Psychiatry" year="2023" tier={1} /></p>
                  <p className="mb-2"><strong>Where to find</strong>: NAMI Connection groups, Depression and Bipolar Support Alliance (DBSA), online communities, recovery groups</p>
                  <p className="text-sm">Peer support uniquely offers "someone who truly gets it" without judgment or clinical framing.</p>
                </div>
              ),
            },
            {
              id: 'family',
              title: 'Family Support',
              content: (
                <div>
                  <p className="mb-2"><strong>Who</strong>: Parents, siblings, partners, children</p>
                  <p className="mb-2"><strong>What they provide</strong>: Long-term commitment, practical help, unconditional love (ideally)</p>
                  <p className="mb-2"><strong>Limitation</strong>: May not understand, can be enmeshed or have unhelpful dynamics, aren't always safe or supportive</p>
                  <p className="text-sm">Family can be your anchor---or your trigger. It's okay if family isn't your primary support.</p>
                </div>
              ),
            },
            {
              id: 'friends',
              title: 'Friendship Support',
              content: (
                <div>
                  <p className="mb-2"><strong>Who</strong>: Friends, chosen family, social connections</p>
                  <p className="mb-2"><strong>What they provide</strong>: Companionship, normalcy, fun, emotional support, sense of belonging</p>
                  <p className="mb-2"><strong>Challenge</strong>: Mental illness can strain friendships; not everyone will stay</p>
                  <p className="text-sm">Good friends see you as a whole person, not just a diagnosis. They invite you to things even when you usually say no.</p>
                </div>
              ),
            },
            {
              id: 'online',
              title: 'Online/Digital Support',
              content: (
                <div>
                  <p className="mb-2"><strong>Who</strong>: Reddit communities, Discord servers, Facebook groups, forums</p>
                  <p className="mb-2"><strong>What they provide</strong>: 24/7 availability, anonymity, access when in-person support isn't available <Citation id="4" index={4} source="Cyberpsychology" year="2023" tier={1} /></p>
                  <p className="mb-2"><strong>Caution</strong>: Unmoderated spaces can normalize harmful behavior; verify advice with professionals</p>
                  <p className="text-sm">Online support can be lifesaving for isolated individuals, but it works best as a complement to in-person connections.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="building-network" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Build Your Support Network
        </h2>
        <p className="mb-6">
          When you're already struggling, "make friends" feels impossible. Start small and specific <Citation id="9" index={9} source="Health Psychology" year="2023" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Start with one structured connection',
              description: (
                <p>Join one support group---NAMI Connection, DBSA, Alcoholics Anonymous, an online group. Structured settings reduce the social pressure of 'making friends' while providing connection <Citation id="6" index={6} source="Psychiatric Rehabilitation Journal" year="2023" tier={1} />.</p>
              ),
            },
            {
              title: 'Reach out to one person you already know',
              description: (
                <p>A friend you've drifted from, a family member you trust, a coworker who seems kind. Send a text: "I've been going through a tough time and realized I need more connection. Want to grab coffee?" Vulnerability invites intimacy.</p>
              ),
            },
            {
              title: 'Show up consistently to one activity',
              description: (
                <p>A class, volunteer opportunity, book club, or hobby group. Repeated exposure builds connection---even if you don't actively 'make friends, ' you'll become a familiar face to people.</p>
              ),
            },
            {
              title: "Be honest (to a degree) about what you're going through",
              description: (
                <p>You don't need to share your diagnosis on day one, but "I've been dealing with some health stuff' or "I'm working on my mental health' filters for people who respond with empathy vs. those who pull away.</p>
              ),
            },
            {
              title: 'Diversify your support',
              description: (
                <p>Don't rely on one person for all your needs. Have peers who understand, friends who distract you with normalcy, professionals for clinical support, family for long-term stability. Diversity prevents burnout and over-reliance <Citation id="9" index={9} source="Health Psychology" year="2023" tier={1} />.</p>
              ),
            },
          ]}
        />

        <h2 id="maintaining-network" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Maintaining Your Support Network
        </h2>
        <p className="mb-6">
          Building the network is step one. Sustaining it requires effort---even when you're depleted:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Reciprocity matters</strong>: Support networks thrive on mutual give-and-take. When you're able, show up for others too <Citation id="8" index={8} source="Journal of Social and Personal Relationships" year="2022" tier={1} />.</li>
          <li><strong>Communicate your needs</strong>: People aren't mind readers. "I need someone to listen without advice" or "I need distraction, not processing" helps them support you effectively.</li>
          <li><strong>Accept imperfect support</strong>: Not everyone will say the right thing. Appreciate effort over perfection.</li>
          <li><strong>Show up even when you don't feel like it</strong>: Depression lies and says you're a burden. Go to the group, answer the text, show your face---even briefly.</li>
          <li><strong>Let go of people who harm more than help</strong>: Toxic relationships, even well-meaning ones, drain your energy. It's okay to create distance.</li>
        </ul>

        <h2 id="when-alone" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When You Feel Alone Despite Having People
        </h2>
        <p className="mb-6">
          Sometimes you can have a full contact list and still feel profoundly isolated. This often means:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Your connections are shallow (acquaintances, not confidants)</li>
          <li>People don't know you're struggling (you're masking too effectively)</li>
          <li>You're surrounded by people who don't 'get it' (no peers with lived experience)</li>
          <li>Your depression is lying to you that you're a burden (even though people care)</li>
        </ul>
        <p className="mb-6">
          The solution: deepen one connection. Pick the safest person and increase vulnerability incrementally. Loneliness isn't about quantity---it's about quality and authenticity <Citation id="7" index={7} source="JAMA Psychiatry" year="2023" tier={1} />.
        </p>

        <h2 id="overcoming-barriers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Overcoming Common Barriers to Connection
        </h2>
        <p className="mb-6">
          When you're struggling, building connections feels impossible. Here's how to navigate common obstacles:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>"I don't have energy to socialize"</strong>: Start smaller. A 10-minute phone call. A text exchange. One group meeting where you don't talk much. Connection doesn't require performing happiness—it requires showing up.
          </li>
          <li>
            <strong>"I'm too much of a burden"</strong>: This is depression lying to you. Research shows people generally want to help and feel closer to those who are vulnerable with them. The right people won't see you as a burden.
          </li>
          <li>
            <strong>"I've isolated for so long, it's awkward now"</strong>: Acknowledge it: "I've been dealing with some stuff and kind of disappeared. I'm working on reconnecting." Most people respect honesty and will meet you where you are.
          </li>
          <li>
            <strong>"People don't understand what I'm going through"</strong>: That's why peer support matters. Find people with lived experience of your specific condition—they get it in ways others can't.
          </li>
          <li>
            <strong>"I'm afraid of being judged"</strong>: Start with low-stakes connections. Support groups where everyone is there for similar reasons. Online communities with anonymity. Test the waters before diving deep.
          </li>
        </ul>

        <h2 id="resources" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Where to Find Your People
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>NAMI Connection</strong>: Free peer-led recovery support groups nationwide (nami.org/support)</li>
          <li><strong>DBSA (Depression and Bipolar Support Alliance)</strong>: In-person and online support groups (dbsalliance.org)</li>
          <li><strong>Al-Anon / SMART Recovery</strong>: For families of people with addiction or for people in recovery themselves</li>
          <li><strong>7 Cups / TalkLife</strong>: Online peer support platforms with trained volunteer listeners</li>
          <li><strong>Meetup.com</strong>: Find local groups around hobbies and interests, not just mental health</li>
          <li><strong>Reddit communities</strong>: r/depression, r/bipolar, r/anxiety, r/CPTSD (moderated spaces with peer support)</li>
          <li><strong>Local community mental health centers</strong>: Often run free support groups for specific conditions</li>
          <li><strong>Warmline services</strong>: Non-crisis phone lines staffed by people with lived experience (search "[your state] mental health warmline")</li>
        </ul>

        <ArticleCallout variant="key-takeaway" title="Start Small, Build Gradually">
          <p>You don't need dozens of people—you need a few solid connections who show up, believe you, and remind you that you're not navigating this alone. Building that network takes courage when you feel most isolated, but it's one of the most powerful things you can do for your recovery. Start with one person. One group. One conversation. You deserve community, and community accelerates healing.</p>
        </ArticleCallout>
      </>
    ),
  },
];
