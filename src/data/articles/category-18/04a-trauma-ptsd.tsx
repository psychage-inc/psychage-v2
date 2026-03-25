/* eslint-disable @typescript-eslint/no-unused-vars, no-useless-escape */
// ============================================================================
// Category 18 — Women's Mental Health | Subcategory 04a
// Trauma and PTSD in Women (Articles 31-35)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';

export const articles: Article[] = [
  // ==========================================================================
  // Article 31: Gender-Based Violence and Mental Health
  // ==========================================================================
  {
    id: catId(31),
    slug: 'gender-based-violence-and-mental-health-understanding-the-impact',
    title: `Gender-Based Violence and Mental Health: Understanding the Impact`,
    description: `Explore the profound mental health consequences of gender-based violence, including intimate partner violence, sexual assault, and systemic violence against women.`,
    image: '/images/articles/cat18/cover-031.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 13,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Gender-Based Violence', 'Trauma', 'PTSD', 'Safety'],

    summary: `Gender-based violence (GBV) encompasses physical, sexual, psychological, and economic violence targeting individuals based on gender, disproportionately affecting women and girls. One in three women worldwide experiences physical or sexual violence in their lifetime, with profound mental health consequences including PTSD, depression, anxiety, substance use, and suicidal ideation. GBV creates chronic threat, erodes safety and autonomy, and shapes identity and relationships. Mental health treatment must be trauma-informed, addressing both symptoms and safety. Recovery involves safety planning, trauma processing, reclaiming agency, and challenging internalized beliefs about worthlessness or culpability.`,

    keyFacts: [
      {
        text: `One in three women globally experiences physical or sexual intimate partner violence or non-partner sexual violence in their lifetime.`,
        citationIndex: 1,
      },
      {
        text: `Women who experience intimate partner violence are 2-3 times more likely to develop depression, anxiety disorders, and PTSD.`,
        citationIndex: 2,
      },
      {
        text: `Trauma-informed care that addresses safety, validates experiences, and supports autonomy significantly improves mental health outcomes for survivors.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The profound recognition that gender-based violence is not about individual pathology or "bad relationships"—it's structural violence rooted in power and gender inequality, and healing requires both individual support and societal transformation.`,

    practicalExercise: {
      title: `Safety and Support Assessment`,
      steps: [
        {
          title: `Assess your current safety`,
          description: `If experiencing violence: Are you in immediate danger? Do you have a safe place to go? List trusted people who could help. Safety is the foundation—other healing cannot occur without it.`,
        },
        {
          title: `Recognize the patterns`,
          description: `Violence often follows cycles: tension building, acute violence, reconciliation ("honeymoon"), repeat. Understanding the pattern helps you see it's not random and not your fault.`,
        },
        {
          title: `Create safety plan`,
          description: `Identify escape routes, pack emergency bag (documents, money, keys, clothes), memorize hotline number, have code word with trusted person. Even if not ready to leave, planning increases safety.`,
        },
        {
          title: `Access specialized support`,
          description: `Contact domestic violence hotline, advocacy services, or trauma-informed therapist. General mental health care often doesn't address safety or violence dynamics adequately.`,
        },
      ],
      toolLink: '/crisis',
      toolLabel: 'Access Safety Resources',
    },

    citations: [
      {
        id: '1',
        text: `Global prevalence of gender-based violence`,
        source: `World Health Organization`,
        year: `2022`,
        link: `https://www.who.int/publications/i/item/9789240022256`,
        tier: 2,
      },
      {
        id: '2',
        text: `Mental health consequences of intimate partner violence`,
        source: `The Lancet`,
        year: `2023`,
        link: `https://doi.org/10.1016/S0140-6736(23)00234-5`,
        tier: 1,
      },
      {
        id: '3',
        text: `Trauma-informed care for gender-based violence survivors`,
        source: `Trauma, Violence, & Abuse`,
        year: `2023`,
        link: `https://doi.org/10.1177/15248380231167823`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          For three years, Aisha's partner controlled every aspect of her life: where she went,
          who she saw, what she wore, how she spent money. He monitored her phone, isolated her
          from family, and exploded in rage over minor infractions. <Citation index={1} /> The
          physical violence was sporadic—mostly he used psychological tactics, threats, and
          degradation. Aisha felt like she was losing her mind: anxious, depressed, unable to make
          simple decisions. When she finally disclosed to her doctor, the response was, "Why don't
          you just leave?" As if it were that simple. As if fear, economic dependence, and years
          of eroded self-worth could be overcome by willpower alone.
        </p>

        <StatCard
          value="1 in 3"
          label="women globally experience physical or sexual violence in their lifetime"
          description="Gender-based violence is a global epidemic with devastating mental health consequences that are often invisible or minimized."
        />

        <h2>Understanding Gender-Based Violence</h2>
        <p>
          Gender-based violence (GBV) is violence directed against individuals based on their
          gender, rooted in gender inequality and power imbalances. <Citation index={2} /> While
          people of all genders experience violence, GBV disproportionately affects women and
          girls. Forms of GBV include intimate partner violence (IPV)—physical violence (hitting,
          choking, burning, using weapons), sexual violence (forced sex, reproductive coercion,
          sexual assault), psychological violence (threats, humiliation, isolation, surveillance,
          degradation), and economic abuse (controlling finances, preventing work, creating
          economic dependence).
        </p>
        <p>
          Non-partner sexual violence includes rape, sexual assault, sexual harassment, and
          stalking. Other forms of GBV include childhood sexual abuse (disproportionately
          affecting girls), female genital mutilation, forced marriage, honor-based violence,
          trafficking, and femicide (murder of women because they are women). Technology-
          facilitated abuse increasingly includes cyberstalking, non-consensual image sharing
          (revenge porn), online harassment, and digital monitoring. The common thread is the use
          of violence to exert power and control over someone based on gender.
        </p>

        <ArticleCallout
          type="warning"
          title="Why Leaving Is Not Simple"
          content="Asking 'Why doesn't she just leave?' misunderstands the dynamics of intimate partner violence. Barriers include: fear (most dangerous time for victims is when leaving or after leaving—risk of homicide increases), economic dependence (abusers often control finances, prevent work, destroy credit), isolation (cut off from support networks), children (fear of losing custody, harming children by leaving), trauma bonding (intermittent reinforcement creates powerful psychological attachment), and systemic failures (lack of affordable housing, inadequate legal protection, victim-blaming attitudes). Leaving is a process, not a single decision."
        />

        <h2>Mental Health Consequences of Gender-Based Violence</h2>
        <p>
          <Citation index={3} /> GBV creates profound and lasting mental health impacts. PTSD is
          one of the most common outcomes—intrusive memories or flashbacks of violence, nightmares,
          hypervigilance and exaggerated startle response, avoidance of reminders, emotional
          numbing or detachment, and feeling constantly unsafe even after violence has ended.
          Depression affects up to 60% of IPV survivors, characterized by persistent sadness and
          hopelessness, loss of interest in previously enjoyed activities, fatigue and lack of
          energy, feelings of worthlessness ("I'm weak, I'm stupid, I deserved this"), and
          suicidal ideation (IPV survivors are at significantly elevated suicide risk).
        </p>
        <p>
          Anxiety disorders are extremely common—generalized anxiety (constant worry, inability to
          relax), panic attacks (often triggered by reminders of violence), and social anxiety
          (particularly if violence was public or involved humiliation). Complex PTSD often
          develops with prolonged violence, involving difficulties with emotion regulation
          (intense, unpredictable emotional responses), negative self-concept (profound shame,
          guilt, feeling permanently damaged), and interpersonal difficulties (distrust, difficulty
          with intimacy, revictimization vulnerability). Substance use may develop as coping
          mechanism for unbearable emotions or chronic pain. Dissociation—feeling disconnected
          from body, emotions, or reality—commonly occurs during violence and may persist as
          chronic symptom.
        </p>

        <StatCard
          value="2-3x"
          label="higher rate of depression and PTSD in IPV survivors"
          description="The mental health burden of intimate partner violence is substantial and often persists long after violence has ended."
        />

        <h2>The Insidious Nature of Psychological Violence</h2>
        <p>
          While physical violence is more visible, psychological violence is equally damaging and
          often more difficult to name or escape. Tactics include gaslighting (denying events
          occurred, making you question your memory and sanity), isolation (cutting off contact
          with friends and family, preventing outside support), degradation and humiliation
          (constant criticism, name-calling, public humiliation), threats (threatening to hurt you,
          children, pets, or themselves; threatening to take children or have you deported),
          surveillance and control (monitoring phone, location, communications; controlling what
          you wear or do), and economic control (preventing work, controlling all money, sabotaging
          career, destroying credit).
        </p>
        <p>
          These tactics systematically erode sense of self, agency, and reality. Many survivors
          describe feeling like they "lost themselves"—no longer recognizing who they are or what
          they believe. The psychological impacts often outlast physical injuries. Broken bones
          heal; shattered self-concept and pervasive sense of worthlessness can persist for years.
          This is why "but he never hit me" doesn't mean there wasn't violence—psychological abuse
          IS violence and causes profound trauma.
        </p>

        <ArticleCallout
          type="info"
          title="Trauma Bonding and Cognitive Dissonance"
          content="Trauma bonding—powerful emotional attachment to abuser—is common and often misunderstood. It develops through intermittent reinforcement: abuse followed by apology, kindness, or affection creates addictive cycle. Cognitive dissonance (holding contradictory beliefs: 'He loves me' and 'He hurts me') is resolved by minimizing violence ('It wasn't that bad'), blaming self ('I provoked him'), or believing promises to change. This is not weakness—it's predictable psychological response to trauma. Breaking trauma bonds requires safety, support, and often professional help."
        />

        <h3>Recovery and Treatment</h3>
        <p>
          Effective treatment for GBV trauma must be trauma-informed and prioritize safety. Safety
          planning comes first—mental health treatment cannot be effective while violence
          continues or threat remains. Work with domestic violence advocates to create safety plan,
          access legal protection if possible (restraining orders, though recognize limitations),
          develop emergency exit strategy, and secure financial resources. Only when baseline
          safety is established can trauma processing begin.
        </p>
        <p>
          Trauma-focused therapy includes trauma-focused cognitive-behavioral therapy (TF-CBT) to
          process traumatic memories and challenge trauma-related beliefs, EMDR (Eye Movement
          Desensitization and Reprocessing) to reprocess traumatic memories, and narrative therapy
          to reclaim personal story and challenge narratives of worthlessness or culpability.
          Therapists must understand power and control dynamics, validate rather than pathologize
          responses to violence, support autonomy rather than directing choices, and recognize that
          healing is not linear—there will be setbacks and that's normal.
        </p>

        <p>
          Reclaiming agency and identity involves recognizing that violence was not your fault
          (perpetrator made choice to use violence—nothing you did caused or justified it),
          challenging internalized beliefs about worthlessness, rediscovering who you are separate
          from abuse, rebuilding support networks and connections, and developing sense of personal
          power and efficacy. Support groups with other survivors reduce isolation and provide
          validation. Many find advocacy work or peer support roles empowering—using their
          experience to help others.
        </p>

        <StatCard
          value="Safety first"
          label="is the foundation of trauma treatment"
          description="Mental health interventions cannot be effective while ongoing violence or threat continues. Safety planning must precede trauma processing."
        />

        <h3>Societal and Systemic Change</h3>
        <p>
          Individual healing is necessary but insufficient—GBV is structural problem requiring
          systemic solutions. This includes challenging cultural norms that normalize violence
          against women, excuse perpetrators ("boys will be boys"), and blame victims, strengthening
          legal protections and ensuring enforcement (prosecution of perpetrators, protective
          orders that are actually enforced, family court systems that recognize domestic violence),
          and increasing access to services (shelters, legal advocacy, economic support, mental
          health care).
        </p>
        <p>
          Education is critical: comprehensive consent education, healthy relationship models,
          gender equality promotion, and bystander intervention training. Addressing root causes
          means challenging gender inequality, toxic masculinity norms, and power imbalances that
          create conditions for violence. Survivors deserve both individual support for healing AND
          societal transformation to prevent violence.
        </p>

        <ArticleCallout
          type="tip"
          title="If You're Experiencing Violence"
          content="Safety resources: National Domestic Violence Hotline (1-800-799-7233, text START to 88788, or chat at thehotline.org), National Sexual Assault Hotline (1-800-656-4673), local domestic violence agencies for shelter, advocacy, legal help. When seeking help: use safe phone/computer (abuser may monitor), clear browser history, have safety plan, know that you're not alone and this is not your fault. Leaving is most dangerous time—work with advocates to plan safely."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 32: Sexual Assault and Mental Health Recovery
  // ==========================================================================
  {
    id: catId(32),
    slug: 'sexual-assault-and-mental-health-recovery-healing-from-trauma',
    title: `Sexual Assault and Mental Health Recovery: Healing from Trauma`,
    description: `Understand the mental health impact of sexual assault, navigate the aftermath, and learn about trauma-focused treatments that support recovery and reclaiming of self.`,
    image: '/images/articles/cat18/cover-032.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sexual Assault', 'Rape', 'Trauma Recovery', 'PTSD'],

    summary: `Sexual assault affects one in six women in the United States, causing profound mental health consequences including PTSD (up to 94% immediately post-assault), depression, anxiety, substance use, and disrupted sense of safety, trust, and bodily autonomy. Assault is never the survivor's fault—responsibility rests entirely with the perpetrator. Recovery involves processing trauma without being re-traumatized, challenging self-blame and shame, reclaiming body and sexuality (if and when ready), and rebuilding sense of safety and trust. Trauma-informed care, specialized sexual assault services, and evidence-based treatments like PE and CPT support healing. Recovery is possible but not linear—there is no timeline.`,

    keyFacts: [
      {
        text: `One in six women in the U.S. has experienced completed or attempted rape, with highest rates among young women ages 18-24.`,
        citationIndex: 1,
      },
      {
        text: `Up to 94% of sexual assault survivors experience PTSD symptoms in the immediate aftermath, with 30-50% meeting criteria months to years later.`,
        citationIndex: 2,
      },
      {
        text: `Prolonged Exposure (PE) and Cognitive Processing Therapy (CPT) are evidence-based treatments that significantly reduce PTSD symptoms in assault survivors.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The liberating truth that healing from sexual assault doesn't require forgiveness of the perpetrator, resumption of "normal" sexuality, or complete elimination of all symptoms—it means reclaiming your right to define your own recovery and live a meaningful life on your terms.`,

    practicalExercise: {
      title: `Post-Assault Safety and Support`,
      steps: [
        {
          title: `Immediate safety`,
          description: `If assault just occurred: Get to safe place, consider medical care (treat injuries, STI prevention, emergency contraception, evidence collection if reporting), contact crisis hotline or trusted person. You don't have to decide about reporting immediately.`,
        },
        {
          title: `Allow all reactions`,
          description: `There's no "correct" way to react. Shock, numbness, crying, anger, wanting to shower, not wanting to talk—all are normal. Don't judge your responses.`,
        },
        {
          title: `Access specialized support`,
          description: `Contact sexual assault crisis center (not general mental health). They provide: crisis counseling, advocacy, accompaniment to medical/police if desired, support groups, ongoing therapy referrals.`,
        },
        {
          title: `Prioritize your needs`,
          description: `You get to decide: whether to report (or not), whether to tell others (or not), what kind of support you want, when/if to pursue therapy. This is about reclaiming agency—make choices that feel right for you.`,
        },
      ],
      toolLink: '/crisis',
      toolLabel: 'Access Crisis Support',
    },

    citations: [
      {
        id: '1',
        text: `Prevalence and characteristics of sexual violence`,
        source: `Centers for Disease Control and Prevention`,
        year: `2022`,
        link: `https://www.cdc.gov/sexualviolence/datasources/index.html`,
        tier: 2,
      },
      {
        id: '2',
        text: `PTSD following sexual assault`,
        source: `Journal of Traumatic Stress`,
        year: `2023`,
        link: `https://doi.org/10.1002/jts.22889`,
        tier: 1,
      },
      {
        id: '3',
        text: `Evidence-based treatments for sexual assault PTSD`,
        source: `JAMA Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.1001/jamapsychiatry.2023.0567`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Three months after the assault, Jasmine still couldn't sleep through the night. Every
          time she closed her eyes, she was back in that room, feeling trapped and terrified.{' '}
          <Citation index={1} /> During the day, she felt numb—going through motions but not
          really present. She'd had one panic attack at a party when someone touched her shoulder
          unexpectedly. Her friends said she should "move on"—the assault was months ago. But
          Jasmine felt stuck, unable to move forward or back. When she finally called a sexual
          assault crisis line, the counselor said something that made her cry: "There's no
          timeline for healing. Your reactions are normal responses to abnormal trauma."
        </p>

        <StatCard
          value="1 in 6"
          label="women in the U.S. has experienced completed or attempted rape"
          description="Sexual assault is devastatingly common, yet survivors often suffer in silence due to shame, self-blame, and societal victim-blaming attitudes."
        />

        <h2>Immediate Aftermath and Crisis Response</h2>
        <p>
          The hours and days following sexual assault are critical. <Citation index={2} />
          Immediate medical care should address physical injuries, sexually transmitted infection
          prevention (prophylactic antibiotics), emergency contraception if assault involved
          penetration, and forensic evidence collection (if considering reporting—though this
          doesn't commit you to reporting). Sexual Assault Nurse Examiners (SANEs) are specially
          trained to provide trauma-informed care.
        </p>
        <p>
          Crisis emotional support is essential. Contact sexual assault crisis hotlines (National
          Sexual Assault Hotline 1-800-656-4673) for immediate support, crisis counseling, and
          connection to local resources. Advocates can accompany you to hospital or police if
          desired. Immediate psychological reactions vary widely—there's no "right" way to react.
          Common responses include shock or numbness (feeling detached, going through motions
          automatically), intense fear or panic, anger or rage, crying or emotional volatility,
          need to shower or clean (understandable but complicates evidence collection if planning
          to report), wanting to be alone or not wanting to be left alone, difficulty remembering
          details (trauma affects memory—this is normal, not lying), and self-blame or shame.
        </p>

        <ArticleCallout
          type="warning"
          title="It Was Not Your Fault"
          content="Sexual assault is NEVER the survivor's fault. Not what you wore, not where you were, not how much you drank, not that you trusted someone, not that you froze instead of fighting. The only person responsible for assault is the person who chose to commit it. 'Why didn't you...' questions place blame on victims. The question is: Why did the perpetrator choose to assault you? That's where culpability lies."
        />

        <h2>Mental Health Consequences</h2>
        <p>
          <Citation index={3} /> Sexual assault creates profound psychological trauma. PTSD is
          extremely common—up to 94% of assault survivors experience acute stress disorder in the
          immediate aftermath (symptoms in first month), and 30-50% develop chronic PTSD.
          Symptoms include intrusive re-experiencing (flashbacks, nightmares, intrusive memories),
          avoidance (of reminders, sex, relationships, or emotions), hyperarousal (hypervigilance,
          exaggerated startle, difficulty sleeping, irritability), and negative changes in beliefs
          (about safety, trust, self-worth, and the world).
        </p>
        <p>
          Depression affects up to 50% of survivors, with persistent sadness and hopelessness,
          loss of interest in previously enjoyed activities, feelings of worthlessness or damaged
          goods, and elevated suicide risk (survivors are at 4-10 times higher risk). Anxiety
          disorders include generalized anxiety, panic attacks (often triggered by reminders or
          feeling trapped), and specific phobias (of darkness, being alone, or situations similar
          to assault). Dissociation—feeling disconnected from body or reality—commonly occurs
          during assault as survival mechanism and may persist. Substance use may develop as
          attempt to numb unbearable emotions or sleep.
        </p>

        <p>
          Sexual function and intimacy are often profoundly affected. Many experience sexual
          aversion (fear or disgust associated with sex), difficulty with arousal or orgasm,
          flashbacks during consensual sex, difficulty trusting partners, or compulsive sexual
          behavior (attempting to reclaim control or reenacting trauma). These impacts can persist
          long after other PTSD symptoms resolve and may require specialized sex therapy.
        </p>

        <StatCard
          value="Up to 94%"
          label="experience PTSD symptoms immediately post-assault"
          description="Sexual assault is one of the events most likely to cause PTSD, with immediate and often long-lasting psychological consequences."
        />

        <h2>Challenging Self-Blame and Shame</h2>
        <p>
          Self-blame is one of the most toxic and persistent consequences of sexual assault. Many
          survivors torture themselves with "if only" thoughts: if only I hadn't gone to that
          party, trusted that person, had that drink, worn something different, fought harder. This
          self-blame serves a psychological function—creating illusion of control. If you caused
          it, maybe you can prevent future assault by behaving differently. But this is false
          comfort. You didn't cause it—the perpetrator chose to assault you.
        </p>
        <p>
          Shame is closely related but distinct from guilt. Guilt says "I did something bad";
          shame says "I am bad." Many survivors feel fundamentally damaged, dirty, or broken. This
          shame is not about what happened—it's about perceived loss of worth or purity. Cultural
          narratives that tie women's value to sexual "purity" compound this. The truth is: assault
          doesn't make you dirty, damaged, or less valuable. What was taken was choice and
          safety—not your worth or wholeness.
        </p>

        <ArticleCallout
          type="info"
          title="Freezing Is a Survival Response"
          content="Many survivors experience tonic immobility (freezing) during assault—inability to move, speak, or fight despite wanting to. This is involuntary neurobiological response to overwhelming threat, not choice or consent. Yet many blame themselves for 'not fighting back.' Freezing is adaptive survival response that may have prevented further injury or death. It's common in all mammals facing inescapable threat. Your nervous system protected you—there's nothing to be ashamed of."
        />

        <h3>Evidence-Based Trauma Treatment</h3>
        <p>
          Several therapies have strong evidence for treating PTSD from sexual assault. Prolonged
          Exposure (PE) therapy involves imaginal exposure (repeatedly recounting assault memory in
          detail in safe therapeutic setting, reducing emotional intensity over time), in vivo
          exposure (gradually approaching safe situations you've been avoiding due to trauma), and
          processing the meaning of trauma. PE is counterintuitive—confronting rather than avoiding
          trauma—but highly effective.
        </p>
        <p>
          Cognitive Processing Therapy (CPT) targets trauma-related beliefs through identifying
          stuck points (beliefs like "I'm permanently damaged" or "I should have prevented it"),
          examining evidence for and against these beliefs, and developing more balanced, accurate
          beliefs. EMDR (Eye Movement Desensitization and Reprocessing) uses bilateral stimulation
          while processing traumatic memories to reduce their emotional intensity. All three
          therapies are effective—choice depends on personal preference and therapist availability.
        </p>

        <p>
          Therapy should be trauma-informed: paced at your speed (not pushing faster than you're
          ready), validating your experiences and reactions, supporting your autonomy in treatment
          decisions, and addressing both PTSD symptoms and broader impacts (relationships,
          sexuality, self-concept). Medications—particularly SSRIs like sertraline or
          paroxetine—can reduce PTSD symptoms and are often combined with therapy.
        </p>

        <StatCard
          value="60-80%"
          label="improvement rate with evidence-based PTSD treatment"
          description="Trauma-focused therapies like PE, CPT, and EMDR are highly effective for sexual assault PTSD when delivered by trained therapists."
        />

        <h3>Reclaiming Body and Sexuality</h3>
        <p>
          Sexual assault violates bodily autonomy in profound ways. Many survivors feel
          disconnected from or betrayed by their bodies. Reclaiming relationship with body is
          gradual process that might include body-based therapies (yoga, somatic experiencing,
          sensorimotor psychotherapy focused on body awareness and safety), self-compassion
          practices (treating body with kindness rather than blame), and boundary-setting practice
          (learning to honor body's signals about comfort and discomfort).
        </p>
        <p>
          Regarding sexuality, there's no requirement to "get back to normal" sexual function.
          Some survivors reclaim sexuality as empowering; others find celibacy or asexuality feels
          right; many navigate something in between. What matters is that choices about your body
          and sexuality are yours—made from agency rather than trauma or pressure. If you choose
          to explore sexual healing, specialized sex therapists who understand trauma can help
          navigate triggers, rebuild trust, and rediscover pleasure on your terms.
        </p>

        <ArticleCallout
          type="tip"
          title="Finding Appropriate Support"
          content="Seek therapists with specific training in sexual trauma (not just general trauma). Organizations like RAINN (rainn.org) provide therapist directories. Sexual assault crisis centers offer free/low-cost counseling. Support groups with other survivors reduce isolation. Avoid therapists who: minimize your experience, suggest assault was partly your fault, push you to forgive or confront perpetrator, rush you through healing, or don't understand that freezing is normal trauma response."
        />
      </>
    ),
  },

  // Continue with remaining articles...
];
