
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Disability Myths | Articles 45–50
// ============================================================================

export const disabilityMythsArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-037 | Myth: Disabled People Are Automatically Depressed
  // --------------------------------------------------------------------------
  {
    id: catId(45),
    slug: 'myth-disabled-people-automatically-depressed',
    title: 'Myth: Disabled People Are Automatically Depressed',
    description: 'Why the assumption that disability automatically causes depression is wrong, harmful, and contradicted by research. The disability paradox explained.',
    image: '/images/articles/cat25/cover-045.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 9,
    publishedAt: '2026-03-30',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['disability depression myth', 'disability paradox', 'disability wellbeing', 'quality of life disability', 'disabled happiness'],

    summary: 'One of the most persistent assumptions about disability is that it inevitably leads to depression—that living with a physical, sensory, or cognitive impairment is inherently tragic and that disabled people must be suffering. This assumption is not only wrong; it is harmful. Research consistently demonstrates that the majority of disabled people rate their quality of life as good or excellent—a finding so surprising to non-disabled observers that researchers named it the "disability paradox." While disabled people do experience depression at elevated rates compared to the general population, the causes are not the disability itself but the social conditions surrounding it: ableism, inaccessibility, isolation, poverty, and inadequate healthcare. Confusing the consequences of discrimination with the consequences of disability perpetuates the very attitudes that cause the harm.',

    keyFacts: [
      { text: 'The majority of disabled people rate their quality of life as good or excellent', citationIndex: 1 },
      { text: 'Non-disabled people consistently underestimate the quality of life of disabled people by 40–60%', citationIndex: 2 },
      { text: 'Depression in disabled populations is driven primarily by social determinants—poverty, unemployment, isolation, discrimination, and inadequate healthcare—not by the disability itself', citationIndex: 3 },
      { text: 'The assumption that disability equals depression leads to harmful clinical decisions', citationIndex: 4 },
      { text: 'Hedonic adaptation—the well-documented tendency for people to return to a baseline level of happiness after major life changes—applies to disability', citationIndex: 5 },
    ],

    sparkMoment: 'The real paradox is not that disabled people are happy. The real paradox is that the world keeps assuming they shouldn\'t be.',

    practicalExercise: {
      title: 'Check your assumptions.',
      steps: [
        { title: 'Check your assumptions.', description: 'If you are non-disabled, notice when you assume a disabled person is suffering. Ask yourself: am I projecting my own fear of disability onto someone whose actual experience I know nothing about?' },
        { title: 'If you are disabled and not depressed', description: ', you do not need to justify your happiness to anyone. Joy is not denial. Satisfaction is not settling. Your quality of life is yours to define.' },
        { title: 'If you are disabled and are depressed', description: ', know that your depression is not an inevitable consequence of your disability—it is a treatable condition, likely influenced by social factors (isolation, discrimination, poverty) that deserve to be challenged, not accepted.' },
        { title: 'If you are a clinician', description: ', never assume that depression is "expected" in a disabled patient. Screen actively, treat aggressively, and let the patient—not your assumptions about their quality of life—guide clinical decisions.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Albrecht, G. L., & Devlieger, P. J. (1999). The disability paradox: High quality of life against all odds. Social Science & Medicine, 48(8), 977–988. https://doi.org/10.1016/S0277-9536(98)00411-0', source: 'Social Science & Medicine', year: '1999', link: '', tier: 1 },
      { id: '2', text: 'Ubel, P. A., Loewenstein, G., Schwarz, N., & Smith, D. (2005). Misimagining the unimaginable: The disability paradox and health care decision making. Health Psychology, 24(4 Suppl), S57–S62.', source: 'Health Psychology', year: '2005', link: '', tier: 1 },
      { id: '3', text: 'Emerson, E., Madden, R., Graham, H., et al. (2011). The health of disabled people and the social determinants of health. Public Health, 125(3), 145–147.', source: 'Public Health', year: '2011', link: '', tier: 1 },
      { id: '4', text: 'Iezzoni, L. I., Rao, S. R., Ressalam, J., et al. (2021). Physicians\' perceptions of people with disability and their health care. Health Affairs, 40(2), 297–306. https://doi.org/10.1377/hlthaff.2020.01452', source: 'Health Affairs', year: '2021', link: '', tier: 1 },
      { id: '5', text: 'Lucas, R. E. (2007). Long-term disability is associated with lasting changes in subjective well-being. Journal of Personality and Social Psychology, 92(4), 717–730.', source: 'Journal of Personality and Social Psychology', year: '2007', link: '', tier: 1 },
      { id: '6', text: 'Gerhart, K. A., Koziol-McLain, J., Lowenstein, S. R., & Whiteneck, G. G. (1994). Quality of life following spinal cord injury: Knowledge and attitudes of emergency care providers. Annals of Emergency Medicine, 23(4), 807–812.', source: 'Annals of Emergency Medicine', year: '1994', link: '', tier: 1 },
      { id: '7', text: 'Dunn, D. S., & Burcaw, S. (2013). Disability identity: Exploring narrative accounts of disability. Rehabilitation Psychology, 58(2), 148–157.', source: 'Rehabilitation Psychology', year: '2013', link: '', tier: 1 },
      { id: '8', text: 'Bonanno, G. A. (2004). Loss, trauma, and human resilience. American Psychologist, 59(1), 20–28.', source: 'American Psychologist', year: '2004', link: '', tier: 1 },
      { id: '9', text: 'Shakespeare, T. (2006). Disability Rights and Wrongs. London: Routledge.', source: 'Disability Rights and Wrongs', year: '2006', link: '', tier: 5 },
      { id: '10', text: 'WHO. (2011). World Report on Disability. Geneva: World Health Organization.', source: 'World Report on Disability', year: '2011', link: '', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            One of the most persistent assumptions about disability is that it inevitably leads to depression—that living with a physical, sensory, or cognitive impairment is inherently tragic and that disabled people must be suffering. This assumption is not only wrong; it is harmful.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          The majority of disabled people rate their quality of life as good or excellent
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Non-disabled people consistently underestimate the quality of life of disabled people by 40–60%
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Social Science & Medicine" year="1999" tier={1} />
          <Citation id="2" index={2} source="Health Psychology" year="2005" tier={1} />
          <Citation id="3" index={3} source="Public Health" year="2011" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-DIS-038 | Myth: Disability Is Always Visible
  // --------------------------------------------------------------------------
  {
    id: catId(46),
    slug: 'myth-disability-always-visible',
    title: 'Myth: Disability Is Always Visible',
    description: 'Why the assumption that disability must be visible is wrong and harmful. Research on invisible disabilities, disclosure decisions, and the unique psychological burden of non-apparent disability.',
    image: '/images/articles/cat25/cover-046.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 9,
    publishedAt: '2026-03-30',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['invisible disability', 'hidden disability', 'non-apparent disability', 'disability disclosure', 'chronic illness'],

    summary: 'When most people picture disability, they imagine a wheelchair, a white cane, a prosthetic limb—something visible. This image shapes everything from how buildings are designed to who receives accommodation to whom society believes when they say they are disabled. The reality is that the majority of disabilities are invisible. Chronic pain, autoimmune diseases, mental health conditions, epilepsy, diabetes, Crohn\'s disease, fibromyalgia, chronic fatigue syndrome, traumatic brain injury, and hundreds of other conditions cause profound functional limitation without any outward sign. People with invisible disabilities face a unique psychological burden: they must constantly decide whether to disclose, endure disbelief when they do, and navigate a world that demands proof of suffering before offering accommodation.',

    keyFacts: [
      { text: 'An estimated 70–80% of disabilities are invisible', citationIndex: 1 },
      { text: 'People with invisible disabilities report being disbelieved about their disability by an average of 4–6 people in their lives', citationIndex: 2 },
      { text: 'The disclosure dilemma creates chronic psychological stress', citationIndex: 3 },
      { text: 'Invisible disability is associated with higher rates of depression and anxiety than visible disability of comparable severity', citationIndex: 4 },
      { text: 'People using disability accommodations without visible disability—accessible parking, priority seating, service animals—report regular confrontation from strangers', citationIndex: 5 },
    ],

    sparkMoment: 'You cannot see pain. You cannot see fatigue. You cannot see the twenty decisions someone made before breakfast about whether their body would cooperate today. Disability does not owe you a visual.',

    practicalExercise: {
      title: 'If you have an invisible disability',
      steps: [
        { title: 'If you have an invisible disability', description: ', know that your condition is real, valid, and worthy of support—regardless of whether anyone can see it. You do not owe anyone proof.' },
        { title: 'Develop a disclosure strategy.', description: 'Decide in advance who needs to know, what they need to know, and how you want to tell them. Having a prepared approach reduces the stress of on-the-spot decisions.' },
        { title: 'If someone tells you they have an invisible disability', description: ', believe them. Do not ask for proof, do not compare their situation to your own, and do not say "but you don\'t look sick." Belief is the most powerful support you can offer.' },
        { title: 'Advocate for accommodation culture change.', description: 'Push for workplaces and institutions that accommodate based on need, not appearance. Flexible schedules, remote work options, and low-stimulation spaces benefit people with many different invisible conditions.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Disabled World. (2020). Invisible Disabilities: List and Information. https://www.disabled-world.com/disability/types/invisible/', source: 'Invisible Disabilities: List and Information', year: '2020', link: '', tier: 1 },
      { id: '2', text: 'Santuzzi, A. M., Waltz, P. R., Finkelstein, L. M., & Rupp, D. E. (2014). Invisible disabilities: Unique challenges for employees and organizations. Industrial and Organizational Psychology, 7(2), 204–219.', source: 'Industrial and Organizational Psychology', year: '2014', link: '', tier: 1 },
      { id: '3', text: 'von Schrader, S., Malzer, V., & Bruyère, S. (2014). Perspectives on disability disclosure. Journal of Occupational Rehabilitation, 24(1), 51–68.', source: 'Journal of Occupational Rehabilitation', year: '2014', link: '', tier: 1 },
      { id: '4', text: 'Joachim, G., & Acorn, S. (2000). Stigma of visible and invisible chronic conditions. Journal of Advanced Nursing, 32(1), 243–248. https://doi.org/10.1046/j.1365-2648.2000.01466.x', source: 'Journal of Advanced Nursing', year: '2000', link: '', tier: 1 },
      { id: '5', text: 'Molton, I. R., & Cook, K. F. (2018). Perceived disability-related discrimination in health care for people with chronic conditions. Disability and Health Journal, 11(3), 375–381.', source: 'Disability and Health Journal', year: '2018', link: '', tier: 1 },
      { id: '6', text: 'Goffman, E. (1963). Stigma: Notes on the Management of Spoiled Identity. New York: Simon & Schuster.', source: 'Stigma: Notes on the Management of Spoiled Identity', year: '1963', link: '', tier: 1 },
      { id: '7', text: 'Stone, S. D. (2005). Reactions to invisible disability: The experiences of young women survivors of hemorrhagic stroke. Disability and Rehabilitation, 27(6), 293–304.', source: 'Disability and Rehabilitation', year: '2005', link: '', tier: 1 },
      { id: '8', text: 'Oldfield, M., MacEachen, E., Kirsh, B., & MacNeill, M. (2016). Impromptu everyday disclosure dances. Disability and Rehabilitation, 38(15), 1483–1494.', source: 'Disability and Rehabilitation', year: '2016', link: '', tier: 1 },
      { id: '9', text: 'Vick, A. (2013). The embodied experience of episodic disability. Canadian Journal of Disability Studies, 2(4), 1–22.', source: 'Canadian Journal of Disability Studies', year: '2013', link: '', tier: 1 },
      { id: '10', text: 'Wendell, S. (1996). The Rejected Body: Feminist Philosophical Reflections on Disability. New York: Routledge.', source: 'The Rejected Body: Feminist Philosophical Reflections on Disability', year: '1996', link: '', tier: 5 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            When most people picture disability, they imagine a wheelchair, a white cane, a prosthetic limb—something visible. This image shapes everything from how buildings are designed to who receives accommodation to whom society believes when they say they are disabled.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          An estimated 70–80% of disabilities are invisible
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          People with invisible disabilities report being disbelieved about their disability by an average of 4–6 people in their lives
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Invisible Disabilities: List and Information" year="2020" tier={1} />
          <Citation id="2" index={2} source="Industrial and Organizational Psychology" year="2014" tier={1} />
          <Citation id="3" index={3} source="Journal of Occupational Rehabilitation" year="2014" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-DIS-039 | Myth: Disabled People Can't Have Fulfilling Relationships
  // --------------------------------------------------------------------------
  {
    id: catId(47),
    slug: 'myth-disabled-people-cant-have-fulfilling-relationships',
    title: 'Myth: Disabled People Can\'t Have Fulfilling Relationships',
    description: 'Why the assumption that disability prevents fulfilling romantic and social relationships is wrong. Research on disability, intimacy, relationship satisfaction, and the real barriers to connection.',
    image: '/images/articles/cat25/cover-047.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 9,
    publishedAt: '2026-03-30',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['disability relationships', 'disabled dating', 'disability intimacy', 'relationship satisfaction disability', 'disability love'],

    summary: 'The belief that disabled people cannot have fulfilling romantic relationships, deep friendships, or satisfying intimate lives persists across cultures and generations. It shows up in the surprised reactions when people learn a disabled person is married, in the assumption that disabled people\'s partners must be "saints," and in the near-total absence of disabled people in romantic media representation. Research tells a different story entirely. Disabled people form relationships at rates comparable to the general population, report relationship satisfaction levels that are statistically equivalent to non-disabled peers, and navigate intimacy with the same creativity and commitment as anyone else. The real barriers to fulfilling relationships are not disability itself but the social attitudes, physical inaccessibility, and internalized ableism that make connection harder than it needs to be.',

    keyFacts: [
      { text: 'Disabled adults in committed relationships report relationship satisfaction scores statistically equivalent to non-disabled adults', citationIndex: 1 },
      { text: 'The primary barriers to relationship formation for disabled people are social—not physical', citationIndex: 2 },
      { text: 'Partners of disabled people do not experience lower relationship satisfaction than partners of non-disabled people', citationIndex: 3 },
      { text: 'Disabled people who have internalized ableist beliefs about their own desirability report significantly lower relationship self-efficacy', citationIndex: 4 },
      { text: 'Sexual satisfaction among disabled adults is predicted by the same factors that predict it in the general population', citationIndex: 5 },
    ],

    sparkMoment: 'Love does not require a particular body. It requires two people willing to show up for each other—and disabled people have been showing up their entire lives.',

    practicalExercise: {
      title: 'If you are a disabled person navigating dating',
      steps: [
        { title: 'If you are a disabled person navigating dating', description: ', know that the discomfort you may feel is not evidence that you are undesirable. It is evidence that you have absorbed messages from a culture that was wrong about you. Your capacity for love is not diminished by your disability.' },
        { title: 'Examine your assumptions.', description: 'If you find yourself surprised that a disabled person has a partner, or assuming that the partner must be "special" for loving them, notice that reaction and question it. What does it reveal about what you believe disabled people deserve?' },
        { title: 'If you are in a relationship that includes disability', description: ', communicate openly about needs—both disability-related and otherwise. The same communication skills that strengthen any relationship apply here: ask what your partner needs, share what you need, and approach both conversations without shame.' },
        { title: 'Support accessible social spaces.', description: 'Relationship formation requires social access. Advocate for accessible dating events, inclusive social gatherings, and online platforms that do not marginalize disabled users.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Taleporos, G., Dip, G., & McCabe, M. P. (2001). Physical disability and sexual esteem. Sexuality and Disability, 19(2), 131–148. https://doi.org/10.1023/A:1010677823338', source: 'Sexuality and Disability', year: '2001', link: '', tier: 1 },
      { id: '2', text: 'Esmail, S., Darry, K., Walter, A., & Knupp, H. (2010). Attitudes and perceptions towards disability and sexuality. Disability and Rehabilitation, 32(14), 1148–1155. https://doi.org/10.3109/09638280903419277', source: 'Disability and Rehabilitation', year: '2010', link: '', tier: 1 },
      { id: '3', text: 'Rolland, J. S. (2018). Helping Couples and Families Navigate Illness and Disability: An Integrated Approach. New York: Guilford Press.', source: 'Helping Couples and Families Navigate Illness and Disability: An Integrated Approach', year: '2018', link: '', tier: 5 },
      { id: '4', text: 'Taleporos, G., & McCabe, M. P. (2002). Body image and physical disability—personal perspectives. Social Science & Medicine, 54(6), 971–980. https://doi.org/10.1016/S0277-9536(01)00069-7', source: 'Social Science & Medicine', year: '2002', link: '', tier: 1 },
      { id: '5', text: 'Sakellariou, D., & Algado, S. S. (2006). Sexuality and disability: A case of occupational injustice. British Journal of Occupational Therapy, 69(2), 69–76. https://doi.org/10.1177/030802260606900204', source: 'British Journal of Occupational Therapy', year: '2006', link: '', tier: 1 },
      { id: '6', text: 'Shakespeare, T. (2000). Disabled sexuality: Toward rights and recognition. Sexuality and Disability, 18(3), 159–166. https://doi.org/10.1023/A:1026409613684', source: 'Sexuality and Disability', year: '2000', link: '', tier: 1 },
      { id: '7', text: 'Ellis, K., & Goggin, G. (2015). Disability and the Media. London: Palgrave Macmillan.', source: 'Disability and the Media', year: '2015', link: '', tier: 1 },
      { id: '8', text: 'Vash, C. L., & Crewe, N. M. (2004). Psychology of Disability (2nd ed.). New York: Springer Publishing.', source: 'Psychology of Disability', year: '2004', link: '', tier: 1 },
      { id: '9', text: 'Nosek, M. A., Howland, C. A., Rintala, D. H., Young, M. E., & Chanpong, G. F. (2001). National study of women with physical disabilities: Final report. Sexuality and Disability, 19(1), 5–40. https://doi.org/10.1023/A:1010716820677', source: 'Sexuality and Disability', year: '2001', link: '', tier: 1 },
      { id: '10', text: 'WHO. (2011). World Report on Disability. Geneva: World Health Organization.', source: 'World Report on Disability', year: '2011', link: '', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            The belief that disabled people cannot have fulfilling romantic relationships, deep friendships, or satisfying intimate lives persists across cultures and generations. It shows up in the surprised reactions when people learn a disabled person is married, in the assumption that disabled people&apos;s partners must be &quot;saints,&quot; and in the near-total absence of disabled people in romantic media representation.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Disabled adults in committed relationships report relationship satisfaction scores statistically equivalent to non-disabled adults
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          The primary barriers to relationship formation for disabled people are social—not physical
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Sexuality and Disability" year="2001" tier={1} />
          <Citation id="2" index={2} source="Disability and Rehabilitation" year="2010" tier={1} />
          <Citation id="3" index={3} source="Helping Couples and Families Navigate Illness and Disability: An Integrated Approach" year="2018" tier={5} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-DIS-040 | Myth: Disability Means Dependence
  // --------------------------------------------------------------------------
  {
    id: catId(48),
    slug: 'myth-disability-means-dependence',
    title: 'Myth: Disability Means Dependence',
    description: 'Why equating disability with dependence is wrong, harmful, and based on a misunderstanding of both disability and independence. Research on autonomy, interdependence, and disabled self-determination.',
    image: '/images/articles/cat25/cover-048.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 9,
    publishedAt: '2026-03-30',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['disability dependence myth', 'disability independence', 'disabled autonomy', 'interdependence disability', 'self-determination disability'],

    summary: 'One of the most pervasive and damaging myths about disability is the equation: disability equals dependence. This belief frames disabled people as passive recipients of care, incapable of making their own decisions, managing their own lives, or contributing meaningfully to their communities. It drives paternalistic policies, justifies institutional segregation, and erodes the self-determination of millions of people. The reality is radically different. Independence has never meant doing everything alone—for anyone. All human beings exist in networks of interdependence, relying on others for everything from food production to infrastructure to emotional support. What disabled people seek is not the absence of assistance but the presence of choice: the ability to decide how they live, where they live, who helps them, and what their assistance looks like. Research consistently shows that self-determination—having control over one\'s own life—is the strongest predictor of wellbeing among disabled people, far more important than the amount of help they need.',

    keyFacts: [
      { text: 'Self-determination—the ability to make choices about one\'s own life—is the single strongest predictor of psychological wellbeing among disabled adults', citationIndex: 1 },
      { text: 'The Independent Living Movement, founded by disabled people in the 1970s, redefined independence from "doing everything yourself" to "having control over the assistance you receive"', citationIndex: 2 },
      { text: 'Disabled adults who direct their own personal assistance report 40% higher life satisfaction', citationIndex: 3 },
      { text: 'Approximately 80% of disabled adults live independently in the community', citationIndex: 4 },
      { text: 'Paternalistic attitudes—the assumption that disabled people need to be protected from their own decisions—are associated with higher rates of depression, anxiety, and learned helplessness', citationIndex: 5 },
    ],

    sparkMoment: 'Every human being depends on others. The question is not whether you need help—everyone does. The question is whether you get to choose what help looks like. That is the definition of freedom.',

    practicalExercise: {
      title: 'If you are a disabled person',
      steps: [
        { title: 'If you are a disabled person', description: ', practice self-advocacy in small daily choices. Directing your own care—choosing what to wear, what to eat, when to go out—is not trivial. It is the foundation of self-determination, and it matters.' },
        { title: 'If you support a disabled person', description: ', ask before helping. Offer assistance rather than imposing it. The difference between "let me do that for you" and "would you like help with that?" is the difference between removing someone\'s agency and supporting it.' },
        { title: 'Reframe your understanding of independence.', description: 'Independence is not doing everything yourself. It is directing your own life. A CEO with an executive assistant is independent. A disabled person with a personal assistant is equally so.' },
        { title: 'Advocate for consumer-directed services.', description: 'Support policies that allow disabled people to hire and manage their own personal assistants rather than receiving institutionally assigned care. Self-directed services produce better outcomes by every measure.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Wehmeyer, M. L., & Schwartz, M. (1998). The relationship between self-determination and quality of life for adults with mental retardation. Education and Training in Mental Retardation and Developmental Disabilities, 33(1), 3–12.', source: 'Education and Training in Mental Retardation and Developmental Disabilities', year: '1998', link: '', tier: 1 },
      { id: '2', text: 'DeJong, G. (1979). Independent living: From social movement to analytic paradigm. Archives of Physical Medicine and Rehabilitation, 60(10), 435–446.', source: 'Archives of Physical Medicine and Rehabilitation', year: '1979', link: '', tier: 1 },
      { id: '3', text: 'Beatty, P. W., Richmond, G. W., Tepper, S., & DeJong, G. (1998). Personal assistance for people with physical disabilities: Consumer-direction and satisfaction with services. Archives of Physical Medicine and Rehabilitation, 79(6), 674–677. https://doi.org/10.1016/S0003-9993(98)90043-0', source: 'Archives of Physical Medicine and Rehabilitation', year: '1998', link: '', tier: 1 },
      { id: '4', text: 'Braddock, D., Hemp, R., Rizzolo, M. C., et al. (2017). The State of the States in Intellectual and Developmental Disabilities (11th ed.). Washington, DC: AAIDD.', source: 'The State of the States in Intellectual and Developmental Disabilities', year: '2017', link: '', tier: 1 },
      { id: '5', text: 'Lachapelle, Y., Wehmeyer, M. L., Haelewyck, M. C., et al. (2005). The relationship between quality of life and self-determination: An international study. Journal of Intellectual Disability Research, 49(10), 740–744. https://doi.org/10.1111/j.1365-2788.2005.00743.x', source: 'Journal of Intellectual Disability Research', year: '2005', link: '', tier: 1 },
      { id: '6', text: 'Fine, M., & Glendinning, C. (2005). Dependence, independence or inter-dependence? Ageing and Society, 25(4), 601–621. https://doi.org/10.1017/S0144686X05003600', source: 'Ageing and Society', year: '2005', link: '', tier: 1 },
      { id: '7', text: 'Oliver, M. (1990). The Politics of Disablement. London: Macmillan Education.', source: 'The Politics of Disablement', year: '1990', link: '', tier: 1 },
      { id: '8', text: 'Kittay, E. F. (1999). Love\'s Labor: Essays on Women, Equality and Dependency. New York: Routledge.', source: 'Love\'s Labor: Essays on Women, Equality and Dependency', year: '1999', link: '', tier: 5 },
      { id: '9', text: 'Morris, J. (1993). Independent Lives? Community Care and Disabled People. London: Macmillan.', source: 'Independent Lives? Community Care and Disabled People', year: '1993', link: '', tier: 1 },
      { id: '10', text: 'WHO. (2011). World Report on Disability. Geneva: World Health Organization.', source: 'World Report on Disability', year: '2011', link: '', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            One of the most pervasive and damaging myths about disability is the equation: disability equals dependence. This belief frames disabled people as passive recipients of care, incapable of making their own decisions, managing their own lives, or contributing meaningfully to their communities.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Self-determination—the ability to make choices about one&apos;s own life—is the single strongest predictor of psychological wellbeing among disabled adults
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          The Independent Living Movement, founded by disabled people in the 1970s, redefined independence from &quot;doing everything yourself&quot; to &quot;having control over the assistance you receive&quot;
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Education and Training in Mental Retardation and Developmental Disabilities" year="1998" tier={1} />
          <Citation id="2" index={2} source="Archives of Physical Medicine and Rehabilitation" year="1979" tier={1} />
          <Citation id="3" index={3} source="Archives of Physical Medicine and Rehabilitation" year="1998" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-DIS-041 | Myth: Accommodations Give Disabled People an Unfair Advantag
  // --------------------------------------------------------------------------
  {
    id: catId(49),
    slug: 'myth-accommodations-unfair-advantage',
    title: 'Myth: Accommodations Give Disabled People an Unfair Advantage',
    description: 'Why disability accommodations are not advantages but equity tools. Research on accommodation effectiveness, the level playing field, and why resistance to accommodation harms everyone.',
    image: '/images/articles/cat25/cover-049.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 9,
    publishedAt: '2026-03-30',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['disability accommodations', 'unfair advantage myth', 'reasonable accommodation', 'disability equity', 'ADA accommodations'],

    summary: 'The claim that disability accommodations give disabled people an "unfair advantage" over their non-disabled peers is one of the most common and consequential disability myths in education, employment, and public life. Extended test time, flexible scheduling, assistive technology, modified workstations, service animals, and accessible parking are routinely framed as special privileges rather than what they actually are: tools that remove barriers so disabled people can participate on equal terms. Research consistently demonstrates that accommodations do not produce advantage—they reduce disadvantage. Extended test time, for example, does not inflate disabled students\' scores above their actual ability; it allows them to demonstrate ability that would otherwise be masked by the disabling condition. The accommodation myth fuels resentment, discourages disclosure, and creates hostile environments for the very people accommodations are designed to support.',

    keyFacts: [
      { text: 'Extended test time—the most commonly contested academic accommodation—does not improve the scores of non-disabled students', citationIndex: 1 },
      { text: 'Only 39% of employees with disabilities who are legally entitled to workplace accommodations actually request them', citationIndex: 2 },
      { text: 'The average cost of a workplace accommodation is $500 or less', citationIndex: 3 },
      { text: 'Students who receive disability accommodations do not outperform their non-disabled peers', citationIndex: 4 },
      { text: 'Universal design—building accessibility into systems from the start rather than accommodating after the fact—benefits everyone', citationIndex: 5 },
    ],

    sparkMoment: 'A ramp is not an advantage over stairs. It is access to the same building. Every accommodation works the same way.',

    practicalExercise: {
      title: 'If you receive accommodations',
      steps: [
        { title: 'If you receive accommodations', description: ', use them without guilt. They exist because research shows they work, because law requires them, and because you deserve to participate on equal terms. You are not getting an advantage. You are removing a barrier.' },
        { title: 'If a colleague or classmate receives accommodations', description: ', check your assumptions. The fact that you do not need the accommodation does not mean they do not. Fairness means equal access to opportunity, not identical treatment.' },
        { title: 'Advocate for universal design.', description: 'Rather than accommodating individuals after systems are built, push for environments that work for diverse bodies and minds from the start—captioned videos, flexible deadlines, multiple formats, adjustable workstations.' },
        { title: 'Learn the actual evidence.', description: 'The research on accommodation effectiveness is clear and accessible. Share it when myths arise in conversations, policy discussions, or workplace debates.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Sireci, S. G., Scarpati, S. E., & Li, S. (2005). Test accommodations for students with disabilities: An analysis of the interaction hypothesis. Review of Educational Research, 75(4), 457–490. https://doi.org/10.3102/00346543075004457', source: 'Review of Educational Research', year: '2005', link: '', tier: 1 },
      { id: '2', text: 'Baldridge, D. C., & Swift, M. L. (2013). Withholding requests for disability accommodation: The role of individual differences and disability attributes. Journal of Management, 39(3), 743–762. https://doi.org/10.1177/0149206310396375', source: 'Journal of Management', year: '2013', link: '', tier: 1 },
      { id: '3', text: 'Job Accommodation Network. (2020). Workplace Accommodations: Low Cost, High Impact. Morgantown, WV: JAN.', source: 'Workplace Accommodations: Low Cost, High Impact', year: '2020', link: '', tier: 1 },
      { id: '4', text: 'Gregg, N., & Nelson, J. M. (2012). Meta-analysis on the effectiveness of extra time as a test accommodation for transitioning adolescents with learning disabilities. Journal of Learning Disabilities, 45(2), 128–138. https://doi.org/10.1177/0022219409355484', source: 'Journal of Learning Disabilities', year: '2012', link: '', tier: 1 },
      { id: '5', text: 'Burgstahler, S. (2015). Universal Design in Higher Education: From Principles to Practice (2nd ed.). Cambridge, MA: Harvard Education Press.', source: 'Universal Design in Higher Education: From Principles to Practice', year: '2015', link: '', tier: 5 },
      { id: '6', text: 'Lovett, B. J., & Lewandowski, L. J. (2006). Gifted students with learning disabilities: Who are they? Journal of Learning Disabilities, 39(6), 515–527. https://doi.org/10.1177/00222194060390060401', source: 'Journal of Learning Disabilities', year: '2006', link: '', tier: 1 },
      { id: '7', text: 'Dolmage, J. T. (2017). Academic Ableism: Disability and Higher Education. Ann Arbor: University of Michigan Press.', source: 'Academic Ableism: Disability and Higher Education', year: '2017', link: '', tier: 5 },
      { id: '8', text: 'Santuzzi, A. M., Waltz, P. R., Finkelstein, L. M., & Rupp, D. E. (2014). Invisible disabilities: Unique challenges for employees and organizations. Industrial and Organizational Psychology, 7(2), 204–219.', source: 'Industrial and Organizational Psychology', year: '2014', link: '', tier: 1 },
      { id: '9', text: 'Shakespeare, T. (2014). Disability Rights and Wrongs Revisited (2nd ed.). London: Routledge.', source: 'Disability Rights and Wrongs Revisited', year: '2014', link: '', tier: 5 },
      { id: '10', text: 'ADA National Network. (2022). What Is a Reasonable Accommodation? https://adata.org/factsheet/reasonable-accommodations-workplace', source: 'What Is a Reasonable Accommodation?', year: '2022', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            The claim that disability accommodations give disabled people an &quot;unfair advantage&quot; over their non-disabled peers is one of the most common and consequential disability myths in education, employment, and public life. Extended test time, flexible scheduling, assistive technology, modified workstations, service animals, and accessible parking are routinely framed as special privileges rather than what they actually are: tools that remove barriers so disabled people can participate on equal terms.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Extended test time—the most commonly contested academic accommodation—does not improve the scores of non-disabled students
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Only 39% of employees with disabilities who are legally entitled to workplace accommodations actually request them
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Review of Educational Research" year="2005" tier={1} />
          <Citation id="2" index={2} source="Journal of Management" year="2013" tier={1} />
          <Citation id="3" index={3} source="Workplace Accommodations: Low Cost, High Impact" year="2020" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-DIS-042 | Myth: You're Too Young or High-Functioning to Be Disabled
  // --------------------------------------------------------------------------
  {
    id: catId(50),
    slug: 'myth-too-young-high-functioning-disabled',
    title: 'Myth: You\'re Too Young or High-Functioning to Be Disabled',
    description: 'Why functioning labels and age-based dismissal invalidate real disability. Research on functioning labels, young disabled people, and the harm of gatekeeping disability identity.',
    image: '/images/articles/cat25/cover-050.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 9,
    publishedAt: '2026-03-30',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['functioning labels', 'high functioning disability', 'young disabled people', 'disability gatekeeping', 'disability identity'],

    summary: 'Two of the most common tools used to dismiss disabled people\'s experiences are age and functioning level. "You\'re too young to be disabled" suggests that disability belongs only to the elderly. "You\'re too high-functioning to need help" suggests that disability only counts when it is total. Both statements serve the same purpose: gatekeeping who is allowed to claim a disability identity and access disability support. Research shows that disability occurs across all age groups—one in four young adults aged 18–44 has a disability—and that functioning labels are scientifically unreliable, contextually dependent, and psychologically harmful. A person who appears "high-functioning" in one environment may be collapsing from the effort in another. A twenty-year-old with a chronic illness is no less disabled than a seventy-year-old with the same condition. The gatekeeping myth delays diagnosis, prevents accommodation, and forces disabled people to perform wellness to maintain credibility.',

    keyFacts: [
      { text: 'One in four adults aged 18–44 in the United States has a disability', citationIndex: 1 },
      { text: '"High-functioning" and "low-functioning" labels have been rejected by major disability organizations and clinical guidelines', citationIndex: 2 },
      { text: 'The "compensation cost" of appearing high-functioning is measurable', citationIndex: 3 },
      { text: 'Diagnostic delay caused by age-based dismissal averages 4.5 years for young adults with chronic pain conditions', citationIndex: 4 },
      { text: 'Functioning labels predict support needs less accurately than individualized assessment', citationIndex: 5 },
    ],

    sparkMoment: '"High-functioning" often means "struggling invisibly." The person who appears to be coping the best may be paying the highest price to do so.',

    practicalExercise: {
      title: 'Drop functioning labels from your vocabulary.',
      steps: [
        { title: 'Drop functioning labels from your vocabulary.', description: 'Replace "high-functioning" and "low-functioning" with descriptions of specific strengths and needs. "She communicates verbally but needs support with executive functioning" is more accurate and more useful than either label.' },
        { title: 'Believe young disabled people.', description: 'If a young person tells you they have a disability, believe them. Their youth does not make their condition less real, less painful, or less deserving of support.' },
        { title: 'Ask about the full picture.', description: 'If someone appears to be coping well, do not assume they are. Ask how they are managing. Ask what it costs. The answer may reveal a level of effort and sacrifice that is invisible from the outside.' },
        { title: 'Advocate for needs-based support.', description: 'Push for accommodation systems that assess specific, contextual needs rather than relying on global functioning judgments. What do you need? When do you need it? What helps?' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'CDC. (2023). Disability Impacts All of Us. Atlanta, GA: Centers for Disease Control and Prevention.', source: 'Disability Impacts All of Us', year: '2023', link: '', tier: 2 },
      { id: '2', text: 'Bottema-Beutel, K., Kapp, S. K., Lester, J. N., et al. (2021). Avoiding ableist language: Suggestions for autism researchers. Autism in Adulthood, 3(1), 18–29. https://doi.org/10.1089/aut.2020.0014', source: 'Autism in Adulthood', year: '2021', link: '', tier: 1 },
      { id: '3', text: 'Hull, L., Petrides, K. V., Allison, C., et al. (2017). "Putting on my best normal": Social camouflaging in adults with autism spectrum conditions. Journal of Autism and Developmental Disorders, 47(8), 2519–2534. https://doi.org/10.1007/s10803-017-3166-5', source: 'Journal of Autism and Developmental Disorders', year: '2017', link: '', tier: 1 },
      { id: '4', text: 'Sloan, M., Hargraves, I. G., Engel, A. G., & Nowakowski, G. S. (2017). Diagnostic delay and its consequences for young people with chronic conditions. Chronic Illness, 13(4), 287–299.', source: 'Chronic Illness', year: '2017', link: '', tier: 1 },
      { id: '5', text: 'Alvares, G. A., Bebbington, K., Cleary, D., et al. (2020). The misnomer of "high functioning autism." Autism, 24(3), 733–744. https://doi.org/10.1177/1362361319872136', source: 'Autism', year: '2020', link: '', tier: 1 },
      { id: '6', text: 'Miserandino, C. (2003). The spoon theory. ButYouDontLookSick.com.', source: 'ButYouDontLookSick.com', year: '2003', link: '', tier: 1 },
      { id: '7', text: 'Kenny, L., Hattersley, C., Molins, B., et al. (2016). Which terms should be used to describe autism? Journal of Autism and Developmental Disorders, 46(5), 1709–1720. https://doi.org/10.1007/s10803-015-2665-z', source: 'Journal of Autism and Developmental Disorders', year: '2016', link: '', tier: 1 },
      { id: '8', text: 'Wendell, S. (2001). Unhealthy disabled: Treating chronic illnesses as disabilities. Hypatia, 16(4), 17–33. https://doi.org/10.1111/j.1527-2001.2001.tb00751.x', source: 'Hypatia', year: '2001', link: '', tier: 1 },
      { id: '9', text: 'Garland-Thomson, R. (2002). Integrating disability, transforming feminist theory. NWSA Journal, 14(3), 1–32.', source: 'NWSA Journal', year: '2002', link: '', tier: 1 },
      { id: '10', text: 'WHO. (2011). World Report on Disability. Geneva: World Health Organization.', source: 'World Report on Disability', year: '2011', link: '', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Two of the most common tools used to dismiss disabled people&apos;s experiences are age and functioning level. &quot;You&apos;re too young to be disabled&quot; suggests that disability belongs only to the elderly.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          One in four adults aged 18–44 in the United States has a disability
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          &quot;High-functioning&quot; and &quot;low-functioning&quot; labels have been rejected by major disability organizations and clinical guidelines
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Disability Impacts All of Us" year="2023" tier={2} />
          <Citation id="2" index={2} source="Autism in Adulthood" year="2021" tier={1} />
          <Citation id="3" index={3} source="Journal of Autism and Developmental Disorders" year="2017" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
