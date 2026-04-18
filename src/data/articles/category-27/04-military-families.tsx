
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_MILITARY_VETERANS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Military Families | Articles 28–28
// ============================================================================

export const militaryFamiliesArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-MIL-038 | Military Children and Adolescent Mental Health: Growing Up i
  // --------------------------------------------------------------------------
  {
    id: catId(28),
    slug: 'military-children-mental-health',
    title: 'Military Children and Adolescent Mental Health: Growing Up in the Shadow of Service',
    description: 'Understanding mental health challenges facing military children and adolescents. Research on deployment effects, relocation stress, parental PTSD impact, resilience factors, school transitions, and support programs for military-connected youth.',
    image: '/images/articles/cat27/cover-028.svg',
    category: CATEGORY_MILITARY_VETERANS,
    readTime: 9,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['military children mental health', 'military kid psychology', 'deployment effects children', 'military family children', 'military child resilience'],

    summary: 'Approximately 1.7 million children in the United States have at least one parent serving in the active-duty military, with an additional million connected to Reserve and National Guard families—a population whose developmental experiences are shaped by the unique demands of military life in ways that are both challenging and, in many cases, growth-promoting. Military children—sometimes self-identified as "military brats"—navigate a childhood defined by frequent relocations (the average military child moves 6–9 times before graduating high school), parental deployments that can last 6–15 months, the constant possibility of parental injury or death, exposure to a parent\'s combat-related PTSD, and the perpetual process of leaving friends and rebuilding social networks in unfamiliar communities. Research documents elevated rates of anxiety, depression, behavioral problems, and academic difficulties among military children during parental deployment—with younger children, those experiencing multiple deployments, and those whose deployed parent returns with PTSD or physical injury at greatest risk. Yet research also reveals that many military children develop remarkable resilience, adaptability, cultural competence, and maturity—qualities that serve them well throughout life. Understanding military children\'s mental health requires holding both realities: that military life imposes genuine psychological burdens on children who did not choose this life, and that many of these children develop strengths precisely because of the challenges they navigate.',

    keyFacts: [
      { text: 'Military children experience significantly elevated rates of anxiety, depression, and behavioral problems during parental deployment', citationIndex: 1 },
      { text: 'The average military child relocates 6–9 times before high school graduation', citationIndex: 2 },
      { text: 'Parental PTSD significantly affects military children\'s psychological functioning', citationIndex: 3 },
      { text: 'Younger children (ages 3–8) are particularly vulnerable to deployment-related distress', citationIndex: 4 },
      { text: 'Military children demonstrate remarkable resilience when supported by strong family functioning, community support, and consistent routines', citationIndex: 5 },
    ],

    sparkMoment: 'They did not enlist. They did not take an oath. They did not choose this life. But military children serve alongside their parents—bearing the weight of absences they cannot prevent, relocations they did not request, and fears they are told to be brave about. Their service is invisible, their sacrifices uncounted, their resilience remarkable. The military child who has moved eight times and said goodbye to eight sets of friends and waited through three deployments has learned something that most adults never learn: how to carry uncertainty with grace, how to build a home inside themselves when...',

    practicalExercise: {
      title: 'If you are a military parent',
      steps: [
        { title: 'If you are a military parent', description: ', maintain consistent routines during deployment, communicate honestly about the deployment at your child\'s developmental level, and monitor your own mental health—your functioning is the strongest predictor of your child\'s adjustment.' },
        { title: 'Help your child name their feelings.', description: 'Military children often learn to suppress distress to avoid burdening their parents. Create space for them to express anxiety, sadness, anger, and fear without judgment.' },
        { title: 'Connect with military child support programs.', description: 'Military OneSource (1-800-342-9647), Military Child Education Coalition, and installation Family Support Centers offer resources specifically designed for military children and families.' },
        { title: 'Support school transitions proactively.', description: 'Before a move, connect with the new school, transfer records early, and help your child research their new community. After a move, facilitate social connection through activities, sports, or organizations.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Gorman, G. H., Eide, M., & Hisle-Gorman, E. (2010). Wartime military deployment and increased pediatric mental and behavioral health complaints. Pediatrics, 126(6), 1058–1066. https://doi.org/10.1542/peds.2009-2856', source: 'Pediatrics', year: '2010', link: '', tier: 1 },
      { id: '2', text: 'Lester, P., & Flake, E. (2013). How wartime military service affects children and families. The Future of Children, 23(2), 121–141. https://doi.org/10.1353/foc.2013.0015', source: 'The Future of Children', year: '2013', link: '', tier: 1 },
      { id: '3', text: 'Dekel, R., & Goldblatt, H. (2008). Is there intergenerational transmission of trauma? The case of combat veterans\' children. American Journal of Orthopsychiatry, 78(3), 281–289. https://doi.org/10.1037/a0013955', source: 'American Journal of Orthopsychiatry', year: '2008', link: '', tier: 1 },
      { id: '4', text: 'Chartrand, M. M., Frank, D. A., White, L. F., & Shope, T. R. (2008). Effect of parents\' wartime deployment on the behavior of young children in military families. Archives of Pediatrics & Adolescent Medicine, 162(11), 1009–1014. https://doi.org/10.1001/archpedi.162.11.1009', source: 'Archives of Pediatrics & Adolescent Medicine', year: '2008', link: '', tier: 1 },
      { id: '5', text: 'Meadows, S. O., Tanielian, T., & Karney, B. R. (Eds.). (2016). The Deployment Life Study: Longitudinal Analysis of Military Families Across the Deployment Cycle. Santa Monica, CA: RAND Corporation.', source: 'The Deployment Life Study: Longitudinal Analysis of Military Families Across the Deployment Cycle', year: '2016', link: '', tier: 1 },
      { id: '6', text: 'Chandra, A., Lara-Cinisomo, S., Jaycox, L. H., Tanielian, T., Burns, R. M., Ruder, T., & Han, B. (2010). Children on the homefront: The experience of children from military families. Pediatrics, 125(1), 16–25. https://doi.org/10.1542/peds.2009-1180', source: 'Pediatrics', year: '2010', link: '', tier: 1 },
      { id: '7', text: 'Esposito-Smythers, C., Wolff, J., Lemmon, K. M., Bodzy, M., Swenson, R. R., & Spirito, A. (2011). Military youth and the deployment cycle: Emotional health consequences and recommendations for intervention. Journal of Family Psychology, 25(4), 497–507. https://doi.org/10.1037/a0024534', source: 'Journal of Family Psychology', year: '2011', link: '', tier: 1 },
      { id: '8', text: 'Park, N. (2011). Military children and families: Strengths and challenges during peace and war. American Psychologist, 66(1), 65–72. https://doi.org/10.1037/a0021249', source: 'American Psychologist', year: '2011', link: '', tier: 1 },
      { id: '9', text: 'Cozza, S. J., & Lerner, R. M. (Eds.). (2013). Military Children and Families: Theory and Research. Cambridge, UK: Cambridge University Press.', source: 'Military Children and Families: Theory and Research', year: '2013', link: '', tier: 5 },
      { id: '10', text: 'Military Child Education Coalition. (2012). The Military Child: A Comprehensive Guide for Parents, Teachers, and Communities. Harker Heights, TX: MCEC.', source: 'The Military Child: A Comprehensive Guide for Parents, Teachers, and Communities', year: '2012', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Approximately 1.7 million children in the United States have at least one parent serving in the active-duty military, with an additional million connected to Reserve and National Guard families—a population whose developmental experiences are shaped by the unique demands of military life in ways that are both challenging and, in many cases, growth-promoting.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Military children experience significantly elevated rates of anxiety, depression, and behavioral problems during parental deployment
        </ArticleCallout>

        <h3 id="the-deployment-cycle-through-a-childs-eyes" className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-32">The Deployment Cycle Through a Child&apos;s Eyes</h3>
        <p className="mb-6">To understand the psychological impact of deployment on military children, it is essential to see the deployment cycle through the child's developmental lens—recognizing that the same event is experienced very differently depending on the child's age, cognitive maturity, and emotional resources.</p>
        <p className="mb-6">Chartrand and colleagues (2008) studied the effects of deployment on young children (ages 3–5) and found significantly elevated rates of behavioral problems—particularly internalizing behaviors (anxiety, sadness, withdrawal) and externalizing behaviors (aggression, defiance, regression to earlier developmental stages)—compared to children of non-deployed parents. Young children lack the cognitive capacity to understand where the deployed parent has gone, why they left, when they will return, or whether they will be safe. The parent's absence is experienced not as a temporary military necessity but as a confusing, potentially permanent loss that the child cannot explain or predict.</p>
        <p className="mb-6">For school-age children (6–12), deployment produces a different but equally significant pattern of distress. These children possess enough cognitive development to understand that the deployed parent is in danger—but not enough emotional maturity to manage the anxiety that this understanding produces. Gorman and colleagues (2010) documented increased outpatient mental health visits, behavioral diagnoses, and stress-related physical complaints among school-age children during parental deployment. Academic performance may decline, social behavior may become more aggressive or withdrawn, and the child may take on inappropriate levels of responsibility within the household—becoming the "little adult" who supports the at-home parent's functioning at the cost of their own developmental needs.</p>
        <p className="mb-6">Adolescents face deployment challenges that intersect with the normative developmental tasks of identity formation, autonomy development, and social belonging. The teenager whose parent deploys may experience anger at the disruption of their social life, anxiety about the parent's safety that they feel unable to express without appearing "babyish," premature assumption of adult responsibilities, and conflict with the at-home parent who is managing the household under stress. Risk-taking behavior—substance use, sexual activity, rule-breaking—may increase as the adolescent struggles with emotional distress they cannot articulate and adult supervision that has been stretched thin.</p>
        <h3 id="the-relocation-burden" className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-32">The Relocation Burden</h3>
        <p className="mb-6">While deployment receives the most research attention, military children consistently identify frequent relocation as one of the most stressful aspects of their experience. Lester and Flake (2013) documented the cumulative impact of military mobility on child development, finding that repeated relocations produce chronic disruption across social, academic, and emotional domains.</p>
        <p className="mb-6"><strong>Social disruption</strong>: each move requires leaving established friendships and rebuilding social networks from scratch. For children, particularly during the identity-forming years of adolescence, friendships are not merely pleasant additions to life—they are essential developmental resources that provide emotional support, social learning, and identity validation. The military child who has learned that every friendship will eventually end may develop self-protective patterns—avoiding deep connection, maintaining emotional distance, or developing superficial social skills that allow rapid integration without genuine intimacy—patterns that may persist into adulthood as difficulty with attachment and commitment.</p>
        <p className="mb-6"><strong>Academic discontinuity</strong>: different states have different curricula, standards, and requirements. The military child who moves from a state that teaches algebra in 8th grade to one that teaches it in 9th grade may be placed in a class that is too easy or too hard. Transcripts may be delayed, course credits may not transfer, and graduation requirements may differ. The Interstate Compact on Educational Opportunity for Military Children—adopted by all 50 states—has addressed some of these issues, but implementation remains inconsistent, and the academic disruption of frequent moves continues to affect military children's educational trajectories.</p>
        <p className="mb-6"><strong>Identity and belonging</strong>: the repeated experience of being "the new kid" produces a complex relationship with identity and belonging. Some military children develop remarkable adaptability and cultural competence—the ability to quickly assess a new social environment, adapt their presentation, and build connections. Others develop a persistent sense of rootlessness—a feeling that they belong nowhere fully, that home is not a place but a concept that shifts with every set of orders. Both responses can coexist in the same child, and both can persist into adult life.</p>
        <h3 id="the-shadow-of-parental-ptsd" className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-32">The Shadow of Parental PTSD</h3>
        <p className="mb-6">When a deployed parent returns with combat-related PTSD, the effects extend beyond the veteran to the entire family system—with children experiencing what researchers have termed secondary traumatization or the intergenerational transmission of trauma. Dekel and Goldblatt (2008) reviewed the literature on PTSD's impact on family members and identified multiple pathways through which parental PTSD affects children.</p>
        <p className="mb-6"><strong>Emotional unavailability</strong>: the PTSD symptom cluster of emotional numbing—diminished interest in activities, feeling detached from others, restricted range of affect—produces a parent who is physically present but emotionally absent. The child who excitedly shares a school achievement with a parent whose emotional numbness prevents them from responding with appropriate enthusiasm experiences a subtle but cumulative rejection that damages self-esteem and attachment security.</p>
        <p className="mb-6"><strong>Hyperarousal and irritability</strong>: the PTSD symptoms of irritability, angry outbursts, and exaggerated startle response create an unpredictable home environment in which children learn to walk on eggshells—constantly monitoring the parent's mood and adjusting their behavior to avoid triggering an explosive reaction. This hypervigilance mirrors the parent's own—the child becomes a sentinel in their own home, scanning for danger just as the parent scans for threats in public environments.</p>
        <p className="mb-6"><strong>Behavioral modeling</strong>: children learn emotional regulation strategies by observing their parents. When the primary model is a parent who copes with distress through avoidance, emotional suppression, substance use, or angry outbursts, children absorb these strategies as normal—potentially developing maladaptive coping patterns that persist into their own adult relationships.</p>
        <p className="mb-6"><strong>Parentification</strong>: when PTSD impairs a parent's functioning, children may assume caregiving responsibilities that are developmentally inappropriate—comforting a distressed parent, mediating marital conflict, caring for younger siblings, managing household tasks. This role reversal, while demonstrating the child's adaptability and compassion, deprives them of the experience of being cared for and protected that is essential for healthy development.</p>
        <h3 id="resilience-and-protective-factors" className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-32">Resilience and Protective Factors</h3>
        <p className="mb-6">The narrative of military childhood is not exclusively one of hardship. Meadows and colleagues (2016), through the RAND Corporation's comprehensive study of military families, identified multiple protective factors that promote resilience among military children.</p>
        <p className="mb-6"><strong>At-home parent functioning</strong> is the single most important predictor of child adjustment during deployment. When the at-home parent maintains their own mental health, provides consistent routines, communicates honestly about the deployment in age-appropriate ways, and manages the household with competence and warmth, children demonstrate significantly better adjustment. This finding underscores the importance of supporting the at-home parent as a primary intervention for military children.</p>
        <p className="mb-6"><strong>Community and unit support</strong> provides practical assistance and social connection that buffer the stressors of military life. Military communities—on-base or in military-concentrated areas—offer shared understanding, established support networks, and programs designed specifically for military families. The military child who is surrounded by peers who understand deployment, relocation, and military culture does not carry the burden of having to explain their experience to a civilian world that may not understand.</p>
        <p className="mb-6"><strong>School-based programs</strong> such as the Military Child Education Coalition's Student 2 Student program and the Department of Defense Education Activity (DoDEA) schools provide academic continuity, peer support, and transition assistance that buffer the effects of frequent moves. Schools that identify and support military-connected students proactively can significantly reduce the academic and social disruption of relocation.</p>
        <p className="mb-6"><strong>The child's own coping resources</strong>—temperament, cognitive flexibility, social skills, and meaning-making ability—contribute to resilience. Many military children develop extraordinary adaptability, cultural competence, and empathy from their experiences—qualities that serve them throughout life.</p>

        <ArticleCallout variant="did-you-know">
          The average military child relocates 6–9 times before high school graduation
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Pediatrics" year="2010" tier={1} />
          <Citation id="2" index={2} source="The Future of Children" year="2013" tier={1} />
          <Citation id="3" index={3} source="American Journal of Orthopsychiatry" year="2008" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
