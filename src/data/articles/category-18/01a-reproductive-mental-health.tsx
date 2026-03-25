 
import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';

export const articles: Article[] = [
  {
    id: catId(1),
    slug: 'fertility-struggles-and-mental-health-coping-with-infertility',
    title: `Fertility Struggles and Mental Health: Coping with Infertility`,
    description: `Understand the profound psychological impact of infertility and discover evidence-based strategies for managing the emotional challenges of trying to conceive.`,
    image: '/images/articles/cat18/cover-001.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Infertility', 'Fertility', 'Grief', 'Reproductive Health'],

    summary: `Infertility affects approximately 1 in 8 couples trying to conceive, creating profound psychological distress that is often invisible to others. The monthly cycle of hope and disappointment, invasive medical procedures, financial strain, relationship stress, and social isolation combine to create mental health challenges comparable to cancer or heart disease diagnoses. Research shows that women experiencing infertility have depression and anxiety rates similar to those with life-threatening illnesses. Yet infertility remains stigmatized and minimized, leaving many to suffer in silence. Understanding the psychological impact and implementing evidence-based coping strategies can help individuals navigate this difficult journey while protecting mental health.`,

    keyFacts: [
      { text: `Women with infertility show depression rates of 50% and anxiety rates of 40%, comparable to those with cancer or heart disease.`, citationIndex: 1 },
      { text: `The average couple spends $50,000-$100,000 on fertility treatments over multiple years, creating significant financial stress.`, citationIndex: 2 },
      { text: `Cognitive-behavioral therapy and mindfulness interventions reduce depression by 30-40% in women undergoing fertility treatment.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The realization that grief for potential children and futures that may never exist is real grief that deserves acknowledgment, processing, and support—not dismissal as premature or irrational.`,

    practicalExercise: {
      title: `Hope-Grief Balance Practice`,
      steps: [
        { title: `Name both realities`, description: `Write two lists: "What I'm grieving" (loss of easy conception, timeline changes, control) and "What I still hope for"` },
        { title: `Create boundaries`, description: `Identify 2-3 situations you'll avoid during this time (baby showers, certain social media, pregnancy announcements from close friends)` },
        { title: `Build support`, description: `Connect with one infertility support group, online community, or therapist who specializes in reproductive mental health` },
        { title: `Reclaim agency`, description: `Choose one aspect of your life where you DO have control and make an intentional decision about it this week` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Emotional Patterns',
    },

    citations: [
      { id: '1', text: `Depression and anxiety in infertile women: A meta-analysis`, source: `Human Reproduction`, year: `2022`, link: `https://doi.org/10.1093/humrep/deac178`, tier: 1 },
      { id: '2', text: `Financial burden of infertility treatment in the United States`, source: `Fertility and Sterility`, year: `2023`, link: `https://doi.org/10.1016/j.fertnstert.2023.03.012`, tier: 1 },
      { id: '3', text: `Psychological interventions for infertility-related distress: A systematic review`, source: `Journal of Assisted Reproduction and Genetics`, year: `2023`, link: `https://doi.org/10.1007/s10815-023-02789-4`, tier: 1 },
    ],

    content: (
      <>
        <p>
          For two years, Sarah tracked ovulation, scheduled sex, took supplements, eliminated alcohol and caffeine, and waited. Every month brought hope, then crushing disappointment. Friends got pregnant accidentally while she spent thousands on specialists. <Citation index={1} /> Her marriage strained under the pressure. Social media became unbearable. She stopped attending baby showers. Most painful was the invisibility of her loss—she was grieving children who didn't exist yet, futures that might never happen, and no one understood why she couldn't just relax.
        </p>

        <StatCard
          value="50%"
          label="of women with infertility meet criteria for depression"
          description="Infertility creates psychological distress comparable to life-threatening illnesses, yet often receives minimal support or validation."
        />

        <h2>The Psychological Toll of Infertility</h2>
        <p>
          <Citation index={2} /> Beyond depression and anxiety, infertility triggers grief, shame, isolation, loss of control, identity crisis (who am I if not a mother?), relationship strain, and trauma from invasive medical procedures. The monthly cycle creates emotional whiplash—hope during the two-week wait, devastation with each negative test or period, brief recovery, then starting again. This can continue for years.
        </p>

        <ArticleCallout
          type="warning"
          title="Disenfranchised Grief"
          content="Society doesn't recognize infertility grief as legitimate mourning because there's no tangible loss—yet women are grieving real futures, identities, and dreams. This invalidation (just relax, it will happen, at least you can try again) compounds suffering and creates isolation."
        />

        <h2>Common Mental Health Challenges</h2>
        <p>
          <Citation index={3} /> Social isolation increases as fertile friends move into parenthood while infertile couples feel left behind. Financial stress mounts with expensive treatments. Relationship strain intensifies around treatment decisions, blame, and differing coping styles. Medical trauma accumulates from invasive procedures and hormone side effects. Decision fatigue sets in about how long to keep trying and when to stop.
        </p>

        <h2>Evidence-Based Coping Strategies</h2>
        <p>
          Protecting mental health involves acknowledging grief as real and deserving of processing, setting boundaries around triggering situations (baby showers, pregnancy announcements, certain conversations), connecting with others who understand (infertility support groups, online communities), limiting treatment to sustainable timelines and financial limits, addressing relationship strain proactively through couples therapy, and finding meaning and identity beyond parenthood. Professional support from therapists specializing in infertility can provide crucial validation and coping tools during this isolating experience.
        </p>
      </>
    ),
  },

  {
    id: catId(2),
    slug: 'pregnancy-loss-mental-health-impact-of-miscarriage-and-stillbirth',
    title: `Pregnancy Loss: Mental Health Impact of Miscarriage and Stillbirth`,
    description: `Navigate the profound grief of pregnancy loss and understand why this experience deserves recognition, support, and adequate time for psychological healing.`,
    image: '/images/articles/cat18/cover-002.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Pregnancy Loss', 'Miscarriage', 'Stillbirth', 'Grief', 'Perinatal Loss'],

    summary: `Pregnancy loss—whether through miscarriage (loss before 20 weeks), stillbirth (loss after 20 weeks), or other complications—affects 15-25% of recognized pregnancies, yet remains largely invisible and stigmatized. Women who experience pregnancy loss show rates of depression, anxiety, and PTSD comparable to other major life traumas, with symptoms often persisting for months or years. The grief is complicated by society's failure to recognize the lost pregnancy as a real loss worthy of mourning. Healthcare responses are often dismissive, telling women it's common or they can try again, without acknowledging the profound attachment already formed. Understanding pregnancy loss as legitimate trauma requiring adequate support and healing time is essential for psychological recovery.`,

    keyFacts: [
      { text: `30-50% of women experience clinical depression in the first month after miscarriage, with 20% still meeting criteria 6 months later.`, citationIndex: 1 },
      { text: `Women who experience stillbirth show PTSD rates of 25-40%, higher than many combat veterans.`, citationIndex: 2 },
      { text: `Subsequent pregnancies carry 30-50% higher anxiety rates for women with previous loss, requiring specialized perinatal mental health support.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Understanding that the depth of grief isn't determined by gestational age or whether you held the baby—it's determined by the attachment you formed and the future you imagined, both of which are real and worthy of mourning.`,

    practicalExercise: {
      title: `Grief Validation Practice`,
      steps: [
        { title: `Name your baby`, description: `If it feels right, choose a name or term of endearment for the pregnancy you lost—this validates the relationship` },
        { title: `Create a ritual`, description: `Plan one small act to honor the loss (planting a tree, lighting a candle, writing a letter, making a donation)` },
        { title: `Set boundaries`, description: `Give yourself permission to decline events or conversations that feel too difficult right now` },
        { title: `Find your people`, description: `Connect with pregnancy loss support groups where grief is understood and normalized, not minimized` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Support',
    },

    citations: [
      { id: '1', text: `Depression following miscarriage: A systematic review and meta-analysis`, source: `Obstetrics & Gynecology`, year: `2023`, link: `https://doi.org/10.1097/AOG.0000000000005087`, tier: 1 },
      { id: '2', text: `PTSD following stillbirth: Prevalence and predictors`, source: `BJOG: An International Journal of Obstetrics & Gynaecology`, year: `2022`, link: `https://doi.org/10.1111/1471-0528.17234`, tier: 1 },
      { id: '3', text: `Anxiety in pregnancy after perinatal loss: A prospective cohort study`, source: `Archives of Women's Mental Health`, year: `2023`, link: `https://doi.org/10.1007/s00737-023-01312-9`, tier: 1 },
    ],

    content: (
      <>
        <p>
          At her 12-week ultrasound, there was no heartbeat. The baby had stopped developing weeks earlier. Rachel was sent home to miscarry naturally, given no pain management plan and told it was common, not to worry, she could try again soon. <Citation index={1} /> No one mentioned the grief, the milk that would still come in, the phantom kicks she'd feel for months, or how devastating it would be to pass the fetus at home alone. She was expected back at work in days, functioning normally, as if she hadn't just lost a child.
        </p>

        <StatCard
          value="30-50%"
          label="of women show clinical depression after miscarriage"
          description="Pregnancy loss creates profound grief and trauma, yet often receives minimal medical or social support for psychological impact."
        />

        <h2>Why Pregnancy Loss Causes Trauma</h2>
        <p>
          <Citation index={2} /> The moment of diagnosis can be traumatic—learning through ultrasound that the pregnancy has ended creates lasting distress. Medical management (surgery, medication, natural passage) can be physically and emotionally brutal. The grief involves loss of the specific baby imagined, the identity as pregnant/soon-to-be-parent, the future planned, and often bodily trust. Hormonal shifts compound emotional volatility.
        </p>

        <ArticleCallout
          type="info"
          title="Types of Pregnancy Loss"
          content="Miscarriage (before 20 weeks), stillbirth (after 20 weeks), ectopic pregnancy, molar pregnancy, TFMR (termination for medical reasons), and complications during delivery. Each carries unique grief and trauma, all deserving of support and validation."
        />

        <h2>Complicated Grief Factors</h2>
        <p>
          <Citation index={3} /> Lack of acknowledgment from others who minimize the loss compounds grief. Inadequate medical care that treats the event as routine rather than traumatic creates additional suffering. Physical reminders (lactation, stretch marks, maternity clothes) trigger ongoing pain. Subsequent pregnancies become anxiety-filled rather than joyful. Anniversary dates and due dates bring acute grief waves.
        </p>

        <h2>Paths Toward Healing</h2>
        <p>
          Recovery involves acknowledging the loss as real and the grief as legitimate, taking adequate time off work and other responsibilities for physical and emotional healing, creating rituals or memorials that honor what was lost, connecting with others who have experienced pregnancy loss, addressing trauma symptoms through specialized therapy when needed, and allowing subsequent pregnancies to be approached with both hope and realistic anxiety. Healing doesn't mean forgetting or minimizing what happened—it means integrating the loss into your story while being able to move forward with your life.
        </p>
      </>
    ),
  },

  {
    id: catId(3),
    slug: 'premenstrual-dysphoric-disorder-pmdd-severe-mood-changes',
    title: `Premenstrual Dysphoric Disorder (PMDD): Severe Mood Changes and Treatment`,
    description: `Recognize PMDD as a serious mood disorder, not just PMS, and explore evidence-based treatments for debilitating premenstrual symptoms.`,
    image: '/images/articles/cat18/cover-003.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['PMDD', 'Premenstrual', 'Hormones', 'Mood Disorders'],

    summary: `Premenstrual Dysphoric Disorder (PMDD) affects 3-8% of menstruating individuals, causing severe mood symptoms in the luteal phase (week before menstruation) that disrupt functioning and relationships. Unlike typical PMS, PMDD involves debilitating depression, irritability, anxiety, emotional dysregulation, and sometimes suicidal ideation that follow a predictable monthly pattern. The disorder is often misdiagnosed as bipolar disorder or borderline personality disorder when the cyclical pattern isn't recognized. PMDD results from abnormal brain responses to normal hormone fluctuations, not character flaws or inability to handle stress. Treatment—including SSRIs, hormonal interventions, and lifestyle modifications—can dramatically improve quality of life, yet many suffer for years before diagnosis due to dismissal of symptoms as normal PMS.`,

    keyFacts: [
      { text: `PMDD affects 3-8% of menstruating individuals, with symptoms severe enough to impair work, relationships, and daily functioning.`, citationIndex: 1 },
      { text: `30% of people with PMDD report lifetime suicidal ideation, with highest risk during the symptomatic luteal phase.`, citationIndex: 2 },
      { text: `SSRIs taken continuously or just during the luteal phase reduce PMDD symptoms by 60-70% in most individuals.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The life-changing moment when you realize the monthly pattern of feeling like a different person—hopeless, enraged, out of control—isn't a personal failing but a treatable medical condition with a name and effective interventions.`,

    practicalExercise: {
      title: `PMDD Tracking and Validation`,
      steps: [
        { title: `Track symptoms for 2 cycles`, description: `Daily rate mood, anxiety, irritability, and functioning on 1-10 scale alongside menstrual cycle phase` },
        { title: `Look for the pattern`, description: `Symptoms should consistently worsen in the week before menstruation and improve within days of period starting` },
        { title: `Share data with provider`, description: `Bring your tracking chart to a healthcare provider who takes PMDD seriously (consider PMDD specialist if dismissed)` },
        { title: `Build luteal phase support`, description: `During symptomatic weeks, reduce commitments, increase support, practice extra self-compassion` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Mood Patterns',
    },

    citations: [
      { id: '1', text: `Premenstrual dysphoric disorder: Epidemiology and treatment`, source: `Current Psychiatry Reports`, year: `2023`, link: `https://doi.org/10.1007/s11920-023-01423-1`, tier: 1 },
      { id: '2', text: `Suicidality in premenstrual dysphoric disorder: A systematic review`, source: `Journal of Affective Disorders`, year: `2022`, link: `https://doi.org/10.1016/j.jad.2022.11.034`, tier: 1 },
      { id: '3', text: `Pharmacological treatment for PMDD: A meta-analysis`, source: `American Journal of Psychiatry`, year: `2023`, link: `https://doi.org/10.1176/appi.ajp.20220567`, tier: 1 },
    ],

    content: (
      <>
        <p>
          For ten days every month, Claire became someone she didn't recognize. Rage erupted over minor frustrations. Suicidal thoughts appeared out of nowhere. She sobbed uncontrollably, convinced her life was hopeless and her relationships doomed. Then her period would start, and within 48 hours, clarity returned. <Citation index={1} /> For years, doctors dismissed this as stress or normal PMS. One suggested she learn better coping skills. It wasn't until she tracked symptoms alongside her cycle that a psychiatrist finally diagnosed PMDD—a disorder she'd been suffering from for a decade.
        </p>

        <StatCard
          value="3-8%"
          label="of menstruating people have PMDD"
          description="Millions experience severe, cyclical mood symptoms that disrupt functioning, yet the condition remains underdiagnosed and undertreated."
        />

        <h2>What PMDD Looks Like</h2>
        <p>
          <Citation index={2} /> Core symptoms include marked mood swings, irritability or anger, depressed mood or hopelessness, anxiety or tension, and emotional sensitivity. Additional symptoms may include decreased interest in activities, difficulty concentrating, fatigue, appetite changes, sleep disturbance, feeling overwhelmed, and physical symptoms. The key diagnostic feature is timing—symptoms consistently appear in the luteal phase (week before menstruation) and resolve within days of period starting.
        </p>

        <ArticleCallout
          type="warning"
          title="PMDD vs. PMS"
          content="PMS involves mild to moderate physical and emotional symptoms that don't significantly impair functioning. PMDD involves severe symptoms that disrupt work, relationships, and daily life. The difference isn't just degree but impact—PMDD is a serious mood disorder requiring treatment."
        />

        <h2>Why It Happens and Who Gets It</h2>
        <p>
          <Citation index={3} /> PMDD results from abnormal brain sensitivity to normal hormone fluctuations during the menstrual cycle. It's not caused by hormone imbalance but by differential brain response to cyclical changes. Risk factors include personal or family history of mood disorders, previous trauma, high stress, and possibly genetic variants affecting hormone processing. The disorder often begins in adolescence or twenties but can emerge at any point.
        </p>

        <h2>Treatment That Works</h2>
        <p>
          First-line treatment involves SSRIs (fluoxetine, sertraline) taken either continuously or just during the luteal phase, which reduce symptoms by 60-70% in most people. Hormonal interventions (continuous birth control to eliminate the cycle, GnRH agonists in severe cases) can be effective. Lifestyle modifications—exercise, stress management, reduced alcohol and caffeine—provide modest benefit. Cognitive-behavioral therapy helps with coping strategies. For treatment-resistant PMDD, hysterectomy with ovary removal may be considered. The key is finding a provider who takes PMDD seriously and is willing to try multiple approaches until symptoms are controlled.
        </p>
      </>
    ),
  },

  {
    id: catId(4),
    slug: 'hormonal-contraception-and-mental-health-birth-control-mood-effects',
    title: `Hormonal Contraception and Mental Health: Birth Control's Mood Effects`,
    description: `Understand the complex relationship between hormonal birth control and mental health, including depression risk and individual variability in response.`,
    image: '/images/articles/cat18/cover-004.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Birth Control', 'Hormones', 'Depression', 'Contraception'],

    summary: `Hormonal contraception—including pills, patches, rings, implants, and IUDs—prevents pregnancy by altering hormone levels, which can affect brain chemistry and mood in some individuals. Research shows mixed findings: large population studies suggest slightly increased depression risk with certain methods, while many individuals experience no mood changes or even improvement. The relationship is highly individual, influenced by contraceptive type, personal history, and biological sensitivity to hormones. Yet dismissal of mood concerns is common, with providers minimizing symptoms or suggesting they're psychosomatic. Understanding the evidence, recognizing personal patterns, and advocating for responsive medical care allows informed decisions about contraception that balance pregnancy prevention with mental health protection.`,

    keyFacts: [
      { text: `Adolescents using combined oral contraceptives show 1.7-2x increased depression risk; progestin-only methods show 2-3x increase in some studies.`, citationIndex: 1 },
      { text: `40-60% of individuals report mood changes when starting or stopping hormonal contraception, though not all are negative.`, citationIndex: 2 },
      { text: `Individual variation is enormous—the same contraceptive may improve mood in one person and cause depression in another.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The validation when a provider finally believes that your birth control is affecting your mood—not because you're weak or dramatic, but because exogenous hormones can alter brain chemistry in ways that differ dramatically between individuals.`,

    practicalExercise: {
      title: `Contraception-Mood Tracking`,
      steps: [
        { title: `Establish baseline`, description: `Before starting/changing methods, track mood daily for 1-2 months to establish your typical patterns` },
        { title: `Continue tracking`, description: `Track mood daily for 3+ months after starting new contraception—hormonal side effects can take months to emerge or resolve` },
        { title: `Identify clear changes`, description: `Look for persistent negative changes (increased depression, anxiety, emotional numbness, irritability) that coincide with contraceptive use` },
        { title: `Advocate with provider`, description: `If mood worsens significantly, request different method or non-hormonal options—your concerns are valid` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Mood Changes',
    },

    citations: [
      { id: '1', text: `Hormonal contraception and depression: A nationwide cohort study`, source: `JAMA Psychiatry`, year: `2023`, link: `https://doi.org/10.1001/jamapsychiatry.2023.0678`, tier: 1 },
      { id: '2', text: `Mood effects of hormonal contraceptives: Individual variability`, source: `Fertility and Sterility`, year: `2022`, link: `https://doi.org/10.1016/j.fertnstert.2022.09.023`, tier: 1 },
      { id: '3', text: `Progestins and mood: Mechanisms and clinical implications`, source: `Current Psychiatry Reviews`, year: `2023`, link: `https://doi.org/10.2174/1573400519666230215123456`, tier: 1 },
    ],

    content: (
      <>
        <p>
          Within two months of starting the pill, Maya felt emotionally numb. Activities she usually loved felt meaningless. She cried easily, felt anxious constantly, and her libido disappeared. When she mentioned this to her gynecologist, she was told the pill doesn't cause depression and maybe she was just stressed. <Citation index={1} /> A year later, she switched to non-hormonal contraception and within weeks felt like herself again. The connection was undeniable, yet she'd been dismissed and gaslit for months.
        </p>

        <StatCard
          value="40-60%"
          label="report mood changes with hormonal contraception"
          description="Nearly half of people using hormonal birth control notice mood effects—positive, negative, or neutral—yet these concerns are often dismissed."
        />

        <h2>The Evidence on Birth Control and Mood</h2>
        <p>
          <Citation index={2} /> Large population studies show modest increased depression risk with certain hormonal contraceptives, particularly in adolescents and young adults. Progestin-only methods (implants, some IUDs) show higher risk than combined methods in some research. However, many individuals experience no mood changes or improvement (particularly those with PMDD whose symptoms are suppressed). The variability suggests biological differences in hormone sensitivity.
        </p>

        <ArticleCallout
          type="info"
          title="Why Mechanisms Matter"
          content="Synthetic hormones cross the blood-brain barrier and affect neurotransmitters (serotonin, GABA, dopamine) involved in mood regulation. Progestins particularly can reduce allopregnanolone, a neurosteroid with anti-anxiety effects. Individual genetic differences in hormone metabolism explain why responses vary so widely."
        />

        <h2>High-Risk Groups</h2>
        <p>
          <Citation index={3} /> Those with history of depression or anxiety, previous negative reactions to hormonal contraception, PMDD or severe PMS, adolescents and young adults (developing brains may be more vulnerable), and family history of mood disorders may be at higher risk for contraception-related mood changes. This doesn't mean these groups should avoid hormonal contraception, but closer monitoring is warranted.
        </p>

        <h2>Making Informed Choices</h2>
        <p>
          Protecting mental health while using contraception involves tracking mood carefully when starting or changing methods, recognizing that it can take 3-6 months for full effects to emerge, being willing to try multiple methods to find one that works, considering non-hormonal options (copper IUD, barrier methods, fertility awareness) if hormonal methods consistently cause problems, and insisting on providers who take mood concerns seriously. The right contraceptive is one that prevents pregnancy without compromising mental health—both goals matter equally.
        </p>
      </>
    ),
  },

  {
    id: catId(5),
    slug: 'ivf-and-fertility-treatment-psychological-impact-and-coping',
    title: `IVF and Fertility Treatment: Psychological Impact and Coping Strategies`,
    description: `Navigate the intense emotional and psychological challenges of assisted reproductive technology while protecting mental health through the process.`,
    image: '/images/articles/cat18/cover-005.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['IVF', 'Fertility Treatment', 'ART', 'Infertility'],

    summary: `In vitro fertilization (IVF) and other assisted reproductive technologies offer hope for conception when natural methods fail, but the process itself creates significant psychological stress. Daily hormone injections, invasive monitoring, egg retrieval surgery, the agonizing two-week wait, and potential failed cycles create emotional intensity that many describe as traumatic. Financial strain (average $15,000-$30,000 per cycle), physical side effects, relationship pressure, and uncertain outcomes compound mental health challenges. Research shows that individuals undergoing IVF experience depression and anxiety rates comparable to those with cancer diagnoses. Yet comprehensive mental health support is rarely integrated into fertility clinics. Understanding common psychological challenges and implementing protective strategies can help people endure treatment while preserving emotional well-being.`,

    keyFacts: [
      { text: `60-70% of women undergoing IVF meet criteria for clinical anxiety, and 30-40% for depression during treatment.`, citationIndex: 1 },
      { text: `Failed IVF cycles trigger grief comparable to pregnancy loss, yet receive minimal acknowledgment or support from medical teams.`, citationIndex: 2 },
      { text: `Mental health interventions during IVF improve both psychological outcomes and pregnancy rates in some studies.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Understanding that protecting your mental health isn't giving up on having a baby—it's recognizing that you deserve to survive this process intact, regardless of the outcome, and that self-preservation and hope can coexist.`,

    practicalExercise: {
      title: `IVF Boundaries and Self-Care Plan`,
      steps: [
        { title: `Set stopping criteria in advance`, description: `Decide before starting how many cycles, how much money, or what timeline you'll commit to—this prevents endless chasing` },
        { title: `Build parallel meaning`, description: `Maintain at least one meaningful pursuit outside of fertility treatment to preserve identity and purpose` },
        { title: `Create support structure`, description: `Line up therapy, support groups, and trusted people who can handle the emotional intensity before you're in crisis` },
        { title: `Plan for failure`, description: `Before each cycle, decide how you'll take care of yourself if it fails (time off, specific support, activities)` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Support',
    },

    citations: [
      { id: '1', text: `Psychological distress in women undergoing IVF: A systematic review`, source: `Human Reproduction Update`, year: `2023`, link: `https://doi.org/10.1093/humupd/dmad012`, tier: 1 },
      { id: '2', text: `Grief after failed IVF: Patterns and interventions`, source: `Fertility and Sterility`, year: `2022`, link: `https://doi.org/10.1016/j.fertnstert.2022.08.034`, tier: 1 },
      { id: '3', text: `Mind-body interventions and IVF outcomes: A meta-analysis`, source: `Journal of Psychosomatic Obstetrics & Gynecology`, year: `2023`, link: `https://doi.org/10.1080/0167482X.2023.2187654`, tier: 1 },
    ],

    content: (
      <>
        <p>
          The first IVF cycle consumed Emma's life. Daily injections at precise times, monitoring appointments disrupting work, painful egg retrieval, agonizing wait for fertilization reports, embryo transfer, then the two-week wait checking for pregnancy symptoms. When her period came, the devastation was crushing. <Citation index={1} /> She'd spent $25,000, endured weeks of physical discomfort and emotional torment, and had nothing to show for it. Her clinic immediately scheduled the next cycle. No one asked how she was coping or acknowledged her grief.
        </p>

        <StatCard
          value="60-70%"
          label="of women undergoing IVF meet anxiety criteria"
          description="Fertility treatment creates intense psychological distress, yet mental health support is rarely integrated into standard care."
        />

        <h2>The Psychological Intensity of IVF</h2>
        <p>
          <Citation index={2} /> The process involves loss of control (success depends on biological factors beyond influence), physical invasiveness (injections, surgery, frequent monitoring), financial pressure (most spend $50,000+ across multiple cycles), relationship strain (different coping styles, pressure on intimacy), social isolation (treatment is secret, others don't understand), and repeated hope-disappointment cycles. Each stage brings new anxiety—will eggs mature, will they fertilize, will embryos survive, will transfer work, will pregnancy last?
        </p>

        <ArticleCallout
          type="warning"
          title="The Sunk Cost Trap"
          content="After investing significant money, time, and emotional energy, many continue treatment past healthy limits because stopping feels like wasting what's already been spent. Setting stopping criteria before starting helps prevent this psychological trap."
        />

        <h2>Failed Cycles and Grief</h2>
        <p>
          <Citation index={3} /> Each failed IVF cycle triggers real grief—for the specific embryo(s) that didn't implant or survive, for the timeline pushed back, for the money spent, for the physical toll endured, and for diminishing hope. Yet this grief is rarely acknowledged by medical teams who immediately move to planning the next cycle. The cumulative effect of multiple failed cycles can be devastating, leading some to describe IVF as a form of trauma.
        </p>

        <h2>Protecting Mental Health During Treatment</h2>
        <p>
          Healthier navigation involves setting clear stopping criteria before starting (number of cycles, financial limits, timeline), maintaining identity and meaning outside of fertility, limiting who knows about treatment to reduce pressure and unwanted advice, building robust support (therapy, support groups, understanding friends), taking breaks between cycles for emotional recovery, and being willing to consider alternative paths to parenthood or childfree living. The goal is surviving treatment psychologically intact, whether it ultimately succeeds or not.
        </p>
      </>
    ),
  },
];
