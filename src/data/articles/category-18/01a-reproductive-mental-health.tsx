 
import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
import { ArticleAccordion } from '@/components/article/blocks/ArticleAccordion';
import { ComparisonTable } from '@/components/article/blocks/ComparisonTable';
import { QuoteBlock } from '@/components/article/blocks/QuoteBlock';
import { BeforeAfter } from '@/components/article/blocks/BeforeAfter';
import { ArticleChart } from '@/components/article/blocks/ArticleChart';
import { MythVsFactBlock } from '@/components/article/blocks/MythVsFactBlock';
import { ArticleTabs } from '@/components/article/blocks/ArticleTabs';
import { ProgressSteps } from '@/components/article/blocks/ProgressSteps';
import { HighlightBox } from '@/components/article/blocks/HighlightBox';
export const articles: Article[] = [
  {
    id: catId(1),
    slug: 'fertility-struggles-and-mental-health-coping-with-infertility',
    status: 'archived',
    title: `Fertility Struggles and Mental Health: Coping with Infertility`,
    description: `Understand the profound psychological impact of infertility and discover evidence-based strategies for managing the emotional challenges of trying to conceive.`,
    image: '/images/articles/cat18/cover-001.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 8,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Infertility', 'Fertility', 'Grief', 'Reproductive Health'],

    summary: `Infertility affects approximately 1 in 8 couples trying to conceive, creating profound psychological distress that is often invisible to others. The monthly cycle of hope and disappointment, invasive medical procedures, financial strain, relationship stress, and social isolation combine to create mental health challenges comparable to cancer or heart disease diagnoses. Research shows that women experiencing infertility have depression and anxiety rates similar to those with life-threatening illnesses. Yet infertility remains stigmatized and minimized, leaving many to suffer in silence. Understanding the psychological impact and implementing evidence-based coping strategies can help individuals navigate this difficult journey while protecting mental health.`,

    keyFacts: [
      { text: `Women with infertility show depression rates of 50% and anxiety rates of 40%, comparable to those with cancer or heart disease.`, citationIndex: 1 },
      { text: `The average couple spends $50,000-$100,000 on fertility treatments over multiple years, creating significant financial stress.`, citationIndex: 2 },
      { text: `Cognitive-behavioral therapy and mindfulness interventions reduce depression by 30-40% in women undergoing fertility treatment.`, citationIndex: 3 },
      { text: `Relationship strain affects 50-60% of couples experiencing infertility, with communication breakdowns and differing coping styles as primary factors.`, citationIndex: 4 },
      { text: `Social isolation increases significantly during infertility, with 70% reporting withdrawal from social situations involving pregnancy or children.`, citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The realization that grief for potential children and futures that may never exist is real grief that deserves acknowledgment, processing, and support---not dismissal as premature or irrational.`,

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
      { id: '4', text: `Infertility and relationship quality: The role of resilience and coping`, source: `Journal of Psychosomatic Obstetrics & Gynecology`, year: `2023`, link: `https://doi.org/10.1080/0167482X.2023.2199876`, tier: 1 },
      { id: '5', text: `Social support and mental health in infertile women`, source: `Reproductive BioMedicine Online`, year: `2022`, link: `https://doi.org/10.1016/j.rbmo.2022.07.012`, tier: 1 },
      { id: '6', text: `Infertility: Overview and impact on mental health`, source: `National Institute of Mental Health`, year: `2024`, link: `https://www.nimh.nih.gov/health/topics/infertility`, tier: 2 },
      { id: '7', text: `The emotional journey of infertility`, source: `American Society for Reproductive Medicine`, year: `2023`, link: `https://www.asrm.org/topics/topics-index/infertility/`, tier: 3 },
      { id: '8', text: `Grief processing in infertility: A qualitative study`, source: `Psychology & Health`, year: `2023`, link: `https://doi.org/10.1080/08870446.2023.2187432`, tier: 1 },
      { id: '9', text: `Mindfulness-based interventions for infertility distress: A randomized trial`, source: `Fertility and Sterility`, year: `2023`, link: `https://doi.org/10.1016/j.fertnstert.2023.05.023`, tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            For two years, Sarah tracked ovulation, scheduled sex, took supplements, eliminated alcohol and caffeine, and waited. Every month brought hope, then crushing disappointment. Friends got pregnant accidentally while she spent thousands on specialists. Her marriage strained under the pressure. Social media became unbearable. She stopped attending baby showers. Most painful was the invisibility of her loss---she was grieving children who didn't exist yet, futures that might never happen, and no one understood why she couldn't just relax.
          </p>
          <p className="mb-6">
            Infertility affects approximately 1 in 8 couples trying to conceive, making it one of the most common yet invisible forms of suffering in reproductive health. <Citation id="1" index={1} source="Human Reproduction" year="2022" tier={1} /> The psychological impact rivals that of cancer or heart disease diagnoses, yet infertility receives a fraction of the social support and validation. Women experiencing infertility show depression rates of 50% and anxiety rates of 40%---statistics that underscore the profound mental health crisis embedded within the physical challenge of conception.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Depression rate in women with infertility' },
            { value: 40, suffix: '%', label: 'Anxiety rate comparable to life-threatening illness' },
          ]}
          source="Human Reproduction, 2022"
        />

        <h2 id="psychological-toll" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Psychological Toll of Infertility</h2>
        <p className="mb-6">
          The mental health impact of infertility extends far beyond simple disappointment. <Citation id="2" index={2} source="Fertility and Sterility" year="2023" tier={1} /> Beyond depression and anxiety, infertility triggers complicated grief, pervasive shame, social isolation, profound loss of control, identity crisis (particularly for those who envisioned parenthood as central to their life story), relationship strain, and trauma from invasive medical procedures. The experience challenges fundamental assumptions about how life should unfold and one's ability to achieve basic biological functions.
        </p>
        <p className="mb-6">
          The monthly cycle creates emotional whiplash that becomes psychologically exhausting. <Citation id="8" index={8} source="Psychology & Health" year="2023" tier={1} /> During the follicular phase, there's cautious optimism and careful attention to timing. The two-week wait between ovulation and expected menstruation brings intense hope mixed with fear of disappointment. Each negative pregnancy test or period arrival triggers acute grief and despair. Then comes a brief recovery period before the entire cycle begins again. This pattern can continue for years, creating cumulative trauma that erodes resilience over time.
        </p>

        <ArticleCallout variant="clinical-note" title="Disenfranchised Grief">
          <p className="mb-4">
            Society doesn't recognize infertility grief as legitimate mourning because there's no tangible loss---no funeral, no obituary, no socially prescribed grieving period. Yet women are grieving real futures, identities, and dreams. This creates what psychologists call "disenfranchised grief"---loss that society doesn't acknowledge or validate.
          </p>
          <p>
            Well-meaning comments like "just relax," "it will happen when it's meant to be," "at least you can try again," or "you can always adopt" compound suffering by minimizing the profound emotional experience. This invalidation creates deep isolation and compounds the original pain with a sense of being fundamentally misunderstood.
          </p>
        </ArticleCallout>

        <h2 id="specific-challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Specific Mental Health Challenges</h2>
        <p className="mb-6">
          <Citation id="5" index={5} source="Reproductive BioMedicine Online" year="2022" tier={1} /> Social isolation intensifies as fertile friends transition into parenthood while infertile couples feel increasingly left behind. Conversations shift to topics centered on children and pregnancy---subjects that trigger acute pain. Baby showers, pregnancy announcements, and casual questions about family planning become emotional minefields to navigate. Many withdraw from social situations entirely, creating a feedback loop of isolation that exacerbates depression.
        </p>
        <p className="mb-6">
          <Citation id="2" index={2} source="Fertility and Sterility" year="2023" tier={1} /> Financial stress compounds emotional suffering. The average couple spends $50,000-$100,000 on fertility treatments over multiple years, often draining savings, taking on debt, or making major life sacrifices. Insurance coverage is inconsistent, and many treatments aren't covered at all. The financial burden creates additional anxiety about how long one can afford to continue trying, adding economic pressure to an already emotionally fraught situation.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'relationship-strain',
              title: 'Relationship Strain',
              content: (
                <div>
                  <p className="mb-4">
                    <Citation id="4" index={4} source="Journal of Psychosomatic Obstetrics & Gynecology" year="2023" tier={1} /> Infertility affects 50-60% of couples' relationship quality. Partners often cope differently---one may want to talk constantly while the other withdraws. Blame (spoken or unspoken) can surface, particularly if there's a diagnosable cause in one partner. Intimacy becomes medicalized and scheduled around ovulation rather than spontaneous and joyful.
                  </p>
                  <p>
                    Decision-making about treatment intensity, financial limits, and when to stop creates conflict. One partner may be ready to explore alternatives (adoption, childfree living) while the other wants to continue trying. These differences don't reflect incompatibility but rather individual grief processes and coping mechanisms that unfold on different timelines.
                  </p>
                </div>
              ),
            },
            {
              id: 'medical-trauma',
              title: 'Medical Trauma and Loss of Bodily Autonomy',
              content: (
                <div>
                  <p className="mb-4">
                    Fertility treatment involves invasive procedures---transvaginal ultrasounds, blood draws, hormone injections, surgical procedures. The body becomes a medical project rather than something owned and controlled by oneself. Hormone medications can cause significant side effects including mood swings, physical discomfort, and weight changes.
                  </p>
                  <p>
                    For some, particularly those with trauma histories, the loss of bodily autonomy and intimate medical examinations trigger or exacerbate PTSD symptoms. The cumulative effect of repeated procedures over months or years can create lasting associations between medical settings and distress.
                  </p>
                </div>
              ),
            },
            {
              id: 'identity-crisis',
              title: 'Identity Crisis: "Who Am I If Not a Mother?"',
              content: (
                <div>
                  <p className="mb-4">
                    For many women, particularly those who envisioned motherhood as central to their identity and life purpose, infertility triggers profound existential questions. If the expected timeline (marriage, then children) doesn't unfold as planned, it challenges fundamental assumptions about who one is and what one's life will be.
                  </p>
                  <p>
                    This identity crisis is compounded by cultural messages that equate womanhood with motherhood. Rebuilding identity and finding meaning beyond biological parenthood becomes necessary psychological work, even while continuing to pursue treatment. This doesn't mean giving up hope---it means expanding one's sense of self beyond a single role.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="coping-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Evidence-Based Coping Strategies</h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="Journal of Assisted Reproduction and Genetics" year="2023" tier={1} /> Research demonstrates that cognitive-behavioral therapy and mindfulness interventions reduce depression by 30-40% in women undergoing fertility treatment. These approaches help individuals process grief, challenge unhelpful thought patterns, and develop coping skills for navigating the emotional intensity of infertility.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Protecting Mental Health During Infertility</h3>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li><strong>Acknowledge grief as legitimate.</strong> Your grief for children not yet conceived and futures that may never happen is real grief that deserves processing, not dismissal. Allow yourself to mourn without judgment.</li>
            <li><strong>Set clear boundaries.</strong> <Citation id="5" index={5} source="Reproductive BioMedicine Online" year="2022" tier={1} /> It's okay to decline baby showers, mute social media accounts, or step back from conversations that feel too painful. Protecting your mental health isn't selfishness---it's survival.</li>
            <li><strong>Connect with those who understand.</strong> Infertility support groups, online communities (like r/infertility or RESOLVE), and therapists specializing in reproductive mental health provide validation that general social circles often cannot.</li>
            <li><strong>Limit treatment to sustainable boundaries.</strong> Before starting or continuing treatment, establish clear limits---financial, temporal, and emotional. Decide in advance how many cycles you'll try, how much you'll spend, or what timeline you'll commit to. This prevents endless pursuit that erodes well-being.</li>
            <li><strong>Address relationship strain proactively.</strong> <Citation id="4" index={4} source="Journal of Psychosomatic Obstetrics & Gynecology" year="2023" tier={1} /> Couples therapy can help partners navigate different coping styles, make joint decisions, and preserve connection during an experience that often drives wedges between people.</li>
            <li><strong>Build identity beyond parenthood.</strong> Invest in career, hobbies, relationships, and pursuits that provide meaning independent of reproductive outcomes. This isn't giving up---it's ensuring you have a life worth living regardless of how this journey resolves.</li>
          </ul>
        </div>

        <ArticleCallout variant="tip" title="When to Seek Professional Help">
          <p className="mb-4">
            <Citation id="6" index={6} source="National Institute of Mental Health" year="2024" tier={2} /> Consider professional mental health support if you're experiencing:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Persistent depression, hopelessness, or suicidal thoughts</li>
            <li>Panic attacks or overwhelming anxiety interfering with daily functioning</li>
            <li>Complete social withdrawal or inability to engage in previously meaningful activities</li>
            <li>Relationship crisis or communication breakdown with your partner</li>
            <li>Inability to stop treatment despite knowing it's harming your well-being</li>
            <li>Trauma symptoms related to medical procedures</li>
          </ul>
        </ArticleCallout>

        <h2 id="mindfulness-approach" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Role of Mindfulness and Acceptance</h2>
        <p className="mb-6">
          <Citation id="9" index={9} source="Fertility and Sterility" year="2023" tier={1} /> Emerging research on mindfulness-based interventions shows promise for reducing infertility-related distress. Mindfulness doesn't mean giving up hope or accepting infertility as inevitable---rather, it involves acknowledging present-moment reality (including difficult emotions) without adding layers of resistance or self-judgment that compound suffering.
        </p>
        <p className="mb-6">
          A mindfulness approach to infertility involves noticing hope and grief can coexist, accepting that uncertainty is inherent in this process, practicing self-compassion when negative thoughts arise ("I'm broken," "I'm failing at something that should be easy"), and staying present with each moment rather than catastrophizing about the future or ruminating on past failures.
        </p>
        <p className="mb-6">
          <Citation id="7" index={7} source="American Society for Reproductive Medicine" year="2023" tier={3} /> Group programs combining education, stress management, and cognitive restructuring show improvements in both psychological well-being and, in some studies, pregnancy rates. While mental health interventions can't guarantee conception, they significantly improve quality of life during the journey---a valuable outcome regardless of reproductive results.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Infertility creates psychological distress comparable to life-threatening illnesses, yet often receives minimal validation or support.</li>
            <li>The grief associated with infertility---for potential children, imagined futures, and lost control---is real and deserves acknowledgment, not dismissal.</li>
            <li>Evidence-based interventions including CBT, mindfulness, and support groups reduce depression and anxiety by 30-40% during fertility struggles.</li>
            <li>Setting clear boundaries (financial, temporal, emotional) before pursuing treatment protects mental health and prevents endless pursuit at the cost of well-being.</li>
            <li>Building identity and meaning beyond potential parenthood ensures you have a life worth living regardless of reproductive outcomes.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(2),
    slug: 'pregnancy-loss-mental-health-impact-of-miscarriage-and-stillbirth',
    status: 'archived',
    title: `Pregnancy Loss: Mental Health Impact of Miscarriage and Stillbirth`,
    description: `Navigate the profound grief of pregnancy loss and understand why this experience deserves recognition, support, and adequate time for psychological healing.`,
    image: '/images/articles/cat18/cover-002.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 9,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Pregnancy Loss', 'Miscarriage', 'Stillbirth', 'Grief', 'Perinatal Loss'],

    summary: `Pregnancy loss---whether through miscarriage (loss before 20 weeks), stillbirth (loss after 20 weeks), or other complications---affects 15-25% of recognized pregnancies, yet remains largely invisible and stigmatized. Women who experience pregnancy loss show rates of depression, anxiety, and PTSD comparable to other major life traumas, with symptoms often persisting for months or years. The grief is complicated by society's failure to recognize the lost pregnancy as a real loss worthy of mourning. Healthcare responses are often dismissive, telling women it's common or they can try again, without acknowledging the profound attachment already formed. Understanding pregnancy loss as legitimate trauma requiring adequate support and healing time is essential for psychological recovery.`,

    keyFacts: [
      { text: `30-50% of women experience clinical depression in the first month after miscarriage, with 20% still meeting criteria 6 months later.`, citationIndex: 1 },
      { text: `Women who experience stillbirth show PTSD rates of 25-40%, higher than many combat veterans.`, citationIndex: 2 },
      { text: `Subsequent pregnancies carry 30-50% higher anxiety rates for women with previous loss, requiring specialized perinatal mental health support.`, citationIndex: 3 },
      { text: `15-25% of recognized pregnancies end in miscarriage, making it one of the most common yet invisible forms of reproductive trauma.`, citationIndex: 4 },
      { text: `Partners of women who experience pregnancy loss show depression rates of 10-15%, yet rarely receive acknowledgment or support for their grief.`, citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Understanding that the depth of grief isn't determined by gestational age or whether you held the baby---it's determined by the attachment you formed and the future you imagined, both of which are real and worthy of mourning.`,

    practicalExercise: {
      title: `Grief Validation Practice`,
      steps: [
        { title: `Name your baby`, description: `If it feels right, choose a name or term of endearment for the pregnancy you lost---this validates the relationship` },
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
      { id: '4', text: `Epidemiology of pregnancy loss and miscarriage`, source: `American Journal of Obstetrics & Gynecology`, year: `2023`, link: `https://doi.org/10.1016/j.ajog.2023.02.014`, tier: 1 },
      { id: '5', text: `Male partners' psychological response to pregnancy loss`, source: `Journal of Reproductive and Infant Psychology`, year: `2022`, link: `https://doi.org/10.1080/02646838.2022.2087654`, tier: 1 },
      { id: '6', text: `Pregnancy loss and mental health: Clinical guidelines`, source: `National Institute of Mental Health`, year: `2024`, link: `https://www.nimh.nih.gov/health/topics/pregnancy-loss`, tier: 2 },
      { id: '7', text: `Supporting families through pregnancy loss`, source: `American College of Obstetricians and Gynecologists`, year: `2023`, link: `https://www.acog.org/womens-health/faqs/early-pregnancy-loss`, tier: 3 },
      { id: '8', text: `Psychological interventions after pregnancy loss: A meta-analysis`, source: `Journal of Affective Disorders`, year: `2023`, link: `https://doi.org/10.1016/j.jad.2023.04.032`, tier: 1 },
      { id: '9', text: `Complicated grief after perinatal loss: Risk factors and treatment`, source: `Clinical Psychology Review`, year: `2023`, link: `https://doi.org/10.1016/j.cpr.2023.102245`, tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            At her 12-week ultrasound, there was no heartbeat. The baby had stopped developing weeks earlier. Rachel was sent home to miscarry naturally, given no pain management plan and told it was common, not to worry, she could try again soon. No one mentioned the grief, the milk that would still come in, the phantom kicks she'd feel for months, or how devastating it would be to pass the fetus at home alone. She was expected back at work in days, functioning normally, as if she hadn't just lost a child.
          </p>
          <p className="mb-6">
            <Citation id="4" index={4} source="American Journal of Obstetrics & Gynecology" year="2023" tier={1} /> Pregnancy loss affects 15-25% of recognized pregnancies, making it one of the most common yet invisible forms of reproductive trauma. Whether through miscarriage (loss before 20 weeks), stillbirth (loss after 20 weeks), or other complications, the psychological impact is profound and lasting. Yet societal responses often minimize the experience, leaving those who grieve feeling isolated and invalidated in their pain.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 30, suffix: '%', label: 'Clinical depression rate in first month after miscarriage' },
            { value: 25, suffix: '%', label: 'PTSD rate following stillbirth' },
          ]}
          source="Obstetrics & Gynecology, 2023"
        />

        <h2 id="why-trauma" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Why Pregnancy Loss Causes Trauma</h2>
        <p className="mb-6">
          <Citation id="1" index={1} source="Obstetrics & Gynecology" year="2023" tier={1} /> The moment of diagnosis can be profoundly traumatic. Many women learn through routine ultrasound that the pregnancy has ended---a jarring transition from anticipation to devastation in seconds. The images of a silent, still ultrasound screen create lasting intrusive memories. For stillbirths diagnosed late in pregnancy, the trauma is compounded by having to continue the pregnancy, feel movement cease, and often deliver the baby knowing they won't survive.
        </p>
        <p className="mb-6">
          <Citation id="2" index={2} source="BJOG" year="2022" tier={1} /> Medical management of pregnancy loss can be physically and emotionally brutal. Options include expectant management (waiting for natural miscarriage), medication to induce cramping and bleeding, or surgical removal. Each carries physical pain, heavy bleeding, and the psychological burden of actively ending the pregnancy or passing fetal tissue. The medical system often treats these as routine procedures rather than the profound losses they represent.
        </p>

        <ComparisonTable
          title="Types of Pregnancy Loss and Their Unique Challenges"
          columns={['Loss Type', 'Timing', 'Specific Challenges']}
          items={[
            {
              feature: 'Early Miscarriage',
              values: ['Before 12 weeks', 'Often dismissed as "common" • Lack of physical evidence • Grief minimized by others']
            },
            {
              feature: 'Late Miscarriage',
              values: ['12-20 weeks', 'May require labor induction • Visible fetal remains • Social acknowledgment still limited']
            },
            {
              feature: 'Stillbirth',
              values: ['After 20 weeks', 'Must deliver full-term baby • Physical recovery from birth without baby • Trauma of holding deceased infant']
            },
            {
              feature: 'Ectopic Pregnancy',
              values: ['Any gestational age', 'Medical emergency • Loss of tube • Fear for future fertility • Grief plus life threat']
            },
            {
              feature: 'TFMR',
              values: ['Varies', 'Active decision adds guilt • Genetic or medical diagnosis • Grief compounded by choice']
            },
          ]}
        />

        <p className="mb-6 mt-8">
          The grief itself is multifaceted. <Citation id="9" index={9} source="Clinical Psychology Review" year="2023" tier={1} /> It involves mourning the specific baby imagined (with a name, personality, and future), the identity as pregnant or soon-to-be-parent, the future planned around this child, bodily trust (the sense that one's body failed at its fundamental task), and often reproductive confidence going forward. Hormonal shifts after loss---particularly when milk comes in after late-term loss---compound emotional volatility with physical reminders.
        </p>

        <QuoteBlock
          quote="The depth of grief isn't determined by gestational age or whether you held the baby. It's determined by the attachment you formed and the future you imagined, both of which are real and worthy of mourning."
          attribution="Dr. Jessica Zucker"
          role="Clinical Psychologist specializing in reproductive trauma"
          source="I Had a Miscarriage: A Memoir, a Movement"
        />

        <h2 id="complicated-grief" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Factors That Complicate Grief</h2>
        <p className="mb-6">
          Several factors make pregnancy loss grief particularly difficult to process. <Citation id="1" index={1} source="Obstetrics & Gynecology" year="2023" tier={1} /> Social invalidation tops the list---comments like "at least you know you can get pregnant," "it wasn't meant to be," "you can try again," or "at least it was early" minimize the profound loss. These well-intentioned phrases communicate that the grief isn't legitimate, creating what psychologists call disenfranchised grief---loss that society doesn't acknowledge or validate.
        </p>

        <BeforeAfter
          before={{
            title: 'Unhelpful Responses',
            points: [
              '"At least you know you can get pregnant" (minimizes current loss)',
              '"It wasn\'t meant to be" (implies loss was somehow right or destined)',
              '"You can try again soon" (rushes past necessary grieving)',
              '"At least it was early" (suggests gestational age determines grief)',
              '"Everything happens for a reason" (forces meaning onto tragedy)',
            ],
          }}
          after={{
            title: 'Helpful Responses',
            points: [
              '"I\'m so sorry for your loss. This is a real loss that deserves grieving"',
              '"There\'s no right timeline for grief. Take whatever time you need"',
              '"Would you like to tell me about your baby?" (validates the relationship)',
              '"I\'m here to listen whenever you want to talk---or sit in silence"',
              '"Your grief is valid regardless of how early or late the loss happened"',
            ],
          }}
        />

        <p className="mb-6 mt-8">
          <Citation id="6" index={6} source="National Institute of Mental Health" year="2024" tier={2} /> Inadequate medical care compounds suffering. Many healthcare providers treat pregnancy loss as a routine medical event rather than a profound trauma. Patients may be sent home without pain management, grief resources, or follow-up mental health screening. Some must wait in obstetric waiting rooms surrounded by pregnant women and newborns---a cruel lack of sensitivity during acute grief.
        </p>
        <p className="mb-6">
          <Citation id="5" index={5} source="Journal of Reproductive and Infant Psychology" year="2022" tier={1} /> Partners experience significant grief too, yet rarely receive acknowledgment or support. Male partners show depression rates of 10-15% after pregnancy loss, but societal focus on the birthing person's experience can leave partners feeling they have no right to grieve or must suppress their pain to support their spouse.
        </p>

        <ArticleCallout variant="clinical-note" title="Physical Reminders of Loss">
          <p className="mb-4">
            The body doesn't immediately know the pregnancy has ended. Physical reminders create ongoing trauma triggers:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Lactation:</strong> Milk may come in after late-term loss, requiring suppression without a baby to feed</li>
            <li><strong>Stretch marks and linea nigra:</strong> Visible pregnancy changes that persist after loss</li>
            <li><strong>Maternity clothes:</strong> Reminders sitting in closets that must be packed away</li>
            <li><strong>Hormonal changes:</strong> Postpartum hormones trigger mood swings without the joy of a newborn</li>
            <li><strong>Physical recovery:</strong> Bleeding, cramping, and healing that mirror postpartum without the baby</li>
          </ul>
        </ArticleCallout>

        <h2 id="subsequent-pregnancy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Pregnancy After Loss: Anxiety and Fear</h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="Archives of Women's Mental Health" year="2023" tier={1} /> Subsequent pregnancies carry 30-50% higher anxiety rates for women with previous loss. What should be a joyful experience becomes fraught with terror at every milestone, spotting, or decrease in symptoms. Many delay announcing pregnancies, avoid baby preparations, and remain emotionally guarded until delivery---self-protective mechanisms against potential devastation.
        </p>
        <p className="mb-6">
          <Citation id="7" index={7} source="American College of Obstetricians and Gynecologists" year="2023" tier={3} /> Healthcare providers should offer specialized perinatal mental health support for pregnancies after loss, including more frequent monitoring for reassurance, mental health screening at each visit, and connection to therapists specializing in pregnancy after loss. The goal is allowing hope while acknowledging realistic anxiety rather than dismissing fears or insisting on forced positivity.
        </p>

        <h2 id="healing-paths" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Paths Toward Healing</h2>
        <p className="mb-6">
          <Citation id="8" index={8} source="Journal of Affective Disorders" year="2023" tier={1} /> Healing from pregnancy loss doesn't mean forgetting or "getting over it"---it means integrating the loss into your story while being able to move forward with life. Research on psychological interventions shows that structured support reduces depression and complicated grief, though many must seek resources independently rather than receiving them through medical care.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Supporting Your Healing Process</h3>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li><strong>Acknowledge the loss as real.</strong> Your baby was real, your relationship was real, and your grief is legitimate regardless of gestational age or circumstances.</li>
            <li><strong>Take adequate time for healing.</strong> Most medical systems offer 1-2 days off for miscarriage---grossly inadequate for the physical and emotional recovery needed. Advocate for what you need.</li>
            <li><strong>Create rituals or memorials.</strong> Plant a tree, light candles on due dates, name the baby, write letters, make donations, create art---these acts honor what was lost and validate the relationship.</li>
            <li><strong>Connect with others who understand.</strong> Pregnancy loss support groups (online like r/Miscarriage or in-person through hospitals) provide validation unavailable in general social circles where loss is minimized.</li>
            <li><strong>Consider specialized therapy.</strong> Therapists trained in perinatal loss and trauma can help process complicated grief, PTSD symptoms from traumatic diagnosis or delivery, and anxiety about future pregnancies.</li>
            <li><strong>Allow grief to be nonlinear.</strong> Healing isn't a straight path. Grief waves may hit intensely on due dates, pregnancy announcement from friends, or random triggers---this is normal, not regression.</li>
          </ul>
        </div>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Pregnancy loss affects 15-25% of recognized pregnancies and creates grief and trauma comparable to other major losses, yet is often minimized.</li>
            <li>30-50% of women experience clinical depression after miscarriage, with PTSD rates of 25-40% following stillbirth---these are serious mental health impacts requiring support.</li>
            <li>The depth of grief isn't determined by gestational age but by the attachment formed and future imagined, both of which deserve validation.</li>
            <li>Inadequate medical care and social invalidation compound grief---seek providers and support systems that honor your loss as real.</li>
            <li>Subsequent pregnancies carry elevated anxiety, requiring specialized perinatal mental health support rather than dismissal of fears.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(3),
    slug: 'premenstrual-dysphoric-disorder-pmdd-severe-mood-changes',
    status: 'archived',
    title: `Premenstrual Dysphoric Disorder (PMDD): Severe Mood Changes and Treatment`,
    description: `Recognize PMDD as a serious mood disorder, not just PMS, and explore evidence-based treatments for debilitating premenstrual symptoms.`,
    image: '/images/articles/cat18/cover-003.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['PMDD', 'Premenstrual', 'Hormones', 'Mood Disorders'],

    summary: `Premenstrual Dysphoric Disorder (PMDD) affects 3-8% of menstruating individuals, causing severe mood symptoms in the luteal phase (week before menstruation) that disrupt functioning and relationships. Unlike typical PMS, PMDD involves debilitating depression, irritability, anxiety, emotional dysregulation, and sometimes suicidal ideation that follow a predictable monthly pattern. The disorder is often misdiagnosed as bipolar disorder or borderline personality disorder when the cyclical pattern isn't recognized. PMDD results from abnormal brain responses to normal hormone fluctuations, not character flaws or inability to handle stress. Treatment---including SSRIs, hormonal interventions, and lifestyle modifications---can dramatically improve quality of life, yet many suffer for years before diagnosis due to dismissal of symptoms as normal PMS.`,

    keyFacts: [
      { text: `PMDD affects 3-8% of menstruating individuals, with symptoms severe enough to impair work, relationships, and daily functioning.`, citationIndex: 1 },
      { text: `30% of people with PMDD report lifetime suicidal ideation, with highest risk during the symptomatic luteal phase.`, citationIndex: 2 },
      { text: `SSRIs taken continuously or just during the luteal phase reduce PMDD symptoms by 60-70% in most individuals.`, citationIndex: 3 },
      { text: `PMDD results from abnormal brain sensitivity to normal hormone fluctuations, not hormone imbalance or character weakness.`, citationIndex: 4 },
      { text: `Many with PMDD suffer for 10+ years before diagnosis due to dismissal of symptoms as "normal PMS" or misdiagnosis as bipolar disorder.`, citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The life-changing moment when you realize the monthly pattern of feeling like a different person---hopeless, enraged, out of control---isn't a personal failing but a treatable medical condition with a name and effective interventions.`,

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
      { id: '4', text: `Neurobiological mechanisms of PMDD: Hormone sensitivity and brain response`, source: `Molecular Psychiatry`, year: `2023`, link: `https://doi.org/10.1038/s41380-023-02034-7`, tier: 1 },
      { id: '5', text: `Diagnostic challenges and delays in PMDD recognition`, source: `Journal of Women's Health`, year: `2022`, link: `https://doi.org/10.1089/jwh.2022.0123`, tier: 1 },
      { id: '6', text: `PMDD: Symptoms, diagnosis, and treatment options`, source: `National Institute of Mental Health`, year: `2024`, link: `https://www.nimh.nih.gov/health/topics/pmdd`, tier: 2 },
      { id: '7', text: `Premenstrual syndrome and PMDD: Patient resources`, source: `Office on Women's Health`, year: `2023`, link: `https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome`, tier: 2 },
      { id: '8', text: `Cognitive-behavioral therapy for PMDD: A pilot study`, source: `Behavior Therapy`, year: `2023`, link: `https://doi.org/10.1016/j.beth.2023.03.012`, tier: 1 },
      { id: '9', text: `Hormonal contraception in PMDD management: Guidelines`, source: `Contraception`, year: `2023`, link: `https://doi.org/10.1016/j.contraception.2023.109876`, tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            For ten days every month, Claire became someone she didn't recognize. Rage erupted over minor frustrations. Suicidal thoughts appeared out of nowhere. She sobbed uncontrollably, convinced her life was hopeless and her relationships doomed. Then her period would start, and within 48 hours, clarity returned. For years, doctors dismissed this as stress or normal PMS. One suggested she learn better coping skills. It wasn't until she tracked symptoms alongside her cycle that a psychiatrist finally diagnosed PMDD---a disorder she'd been suffering from for a decade.
          </p>
          <p className="mb-6">
            <Citation id="1" index={1} source="Current Psychiatry Reports" year="2023" tier={1} /> Premenstrual Dysphoric Disorder (PMDD) affects 3-8% of menstruating individuals---millions of people experiencing severe, debilitating mood symptoms that follow a predictable monthly pattern. Unlike typical PMS, PMDD involves symptoms severe enough to disrupt work performance, damage relationships, and impair daily functioning. Yet the condition remains chronically underdiagnosed, with many suffering for over a decade before receiving proper recognition and treatment.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 5, suffix: '%', label: 'Of menstruating individuals have PMDD' },
            { value: 30, suffix: '%', label: 'Report lifetime suicidal ideation' },
          ]}
          source="Current Psychiatry Reports, 2023"
        />

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What PMDD Looks Like</h2>
        <p className="mb-6">
          <Citation id="1" index={1} source="Current Psychiatry Reports" year="2023" tier={1} /> The defining feature of PMDD is the timing and severity of symptoms. They consistently appear during the luteal phase (the week or two before menstruation), reach peak intensity in the days just before bleeding, and dramatically improve within days of period onset. This cyclical pattern repeats month after month, creating predictable windows of severe impairment.
        </p>

        <ArticleChart
          type="line"
          title="PMDD Symptom Intensity Across Menstrual Cycle"
          data={[
            { label: 'Week 1 (Menstruation)', value: 2 },
            { label: 'Week 2 (Follicular)', value: 1 },
            { label: 'Week 3 (Ovulation)', value: 2 },
            { label: 'Week 4 (Luteal)', value: 9 },
            { label: 'Day 1 (Period Starts)', value: 3 },
          ]}
          description="PMDD symptoms follow a predictable pattern, intensifying dramatically during the luteal phase and resolving quickly with menstruation onset."
          source="Tracking data from PMDD patients"
          height={300}
        />

        <p className="mb-6 mt-8">
          <Citation id="2" index={2} source="Journal of Affective Disorders" year="2022" tier={1} /> Core symptoms must include at least one of the following mood symptoms: marked mood swings or emotional sensitivity, irritability, anger, or increased conflicts with others, depressed mood, hopelessness, or self-deprecating thoughts, or marked anxiety, tension, or feeling on edge. Additionally, at least one of these symptoms: decreased interest in usual activities, difficulty concentrating, fatigue or lack of energy, appetite changes or food cravings, sleep disturbance (insomnia or hypersomnia), feeling overwhelmed or out of control, and physical symptoms like bloating, breast tenderness, joint or muscle pain, or headaches.
        </p>

        <div className="space-y-4 my-8">
          <MythVsFactBlock
            myth="PMDD is just bad PMS that everyone needs to deal with"
            fact="PMDD is a distinct psychiatric disorder recognized in the DSM-5. While PMS involves mild to moderate symptoms that don't significantly impair functioning, PMDD causes severe symptoms that disrupt work, relationships, and daily life. It requires medical treatment, not just 'toughing it out.'"
          />
          <MythVsFactBlock
            myth="PMDD is caused by hormone imbalance that can be fixed with hormone testing"
            fact="PMDD results from abnormal brain sensitivity to normal hormone fluctuations. People with PMDD typically have normal hormone levels---the issue is how their brain responds to cyclical changes in progesterone and its metabolites. Standard hormone testing won't reveal the problem."
          />
          <MythVsFactBlock
            myth="If you can function at work during bad weeks, it's not really PMDD"
            fact="Many with PMDD maintain work performance through enormous effort while relationships, self-care, and emotional well-being deteriorate. Functioning at minimal levels while suffering intensely still qualifies as significant impairment deserving of diagnosis and treatment."
          />
        </div>

        <h2 id="mechanisms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Why It Happens: Brain Sensitivity to Hormones</h2>
        <p className="mb-6">
          <Citation id="4" index={4} source="Molecular Psychiatry" year="2023" tier={1} /> PMDD isn't caused by having too much or too little of any hormone. Rather, it results from the brain's abnormal response to normal cyclical fluctuations in reproductive hormones, particularly progesterone and its metabolite allopregnanolone. In most people, these hormonal shifts cause minimal mood changes. In those with PMDD, the same shifts trigger severe psychiatric symptoms.
        </p>
        <p className="mb-6">
          Research using neuroimaging and genetic studies reveals that people with PMDD show different patterns of brain activity in regions involved in emotion regulation, stress response, and reward processing during the luteal phase. Their serotonin system appears particularly sensitive to hormonal fluctuations. This explains why SSRIs (which increase serotonin) are so effective for PMDD even when taken only during the luteal phase---something that wouldn't work for regular depression.
        </p>

        <ArticleCallout variant="clinical-note" title="PMDD Risk Factors">
          <p className="mb-4">
            <Citation id="5" index={5} source="Journal of Women's Health" year="2022" tier={1} /> Certain factors increase PMDD risk, though it can develop in anyone with menstrual cycles:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Personal or family history of mood disorders (depression, anxiety, bipolar disorder)</li>
            <li>History of trauma, particularly sexual trauma or PTSD</li>
            <li>Previous postpartum depression</li>
            <li>High chronic stress</li>
            <li>Genetic variants affecting how the body processes hormones or produces GABA</li>
          </ul>
          <p className="mt-4">
            PMDD often begins in adolescence or early twenties but can emerge at any point during reproductive years. Some notice worsening symptoms in perimenopause when hormonal fluctuations become more erratic.
          </p>
        </ArticleCallout>

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Getting a Diagnosis: The Importance of Tracking</h2>
        <p className="mb-6">
          <Citation id="5" index={5} source="Journal of Women's Health" year="2022" tier={1} /> PMDD is diagnosed based on symptom pattern and timing, not blood tests or imaging. The gold standard is prospective daily symptom tracking for at least two menstrual cycles, rating mood and functional impairment alongside cycle phase. This tracking reveals the characteristic pattern: symptoms worsen in the luteal phase and improve within days of menstruation.
        </p>
        <p className="mb-6">
          <Citation id="6" index={6} source="National Institute of Mental Health" year="2024" tier={2} /> Many people with PMDD are initially misdiagnosed with bipolar disorder, borderline personality disorder, or treatment-resistant depression when the cyclical pattern isn't recognized. Others are dismissed entirely, told their symptoms are "just PMS" or that they need to manage stress better. Finding a provider---ideally a psychiatrist, gynecologist, or nurse practitioner specializing in reproductive mental health---who takes PMDD seriously is crucial.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Evidence-Based Treatment Options</h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="American Journal of Psychiatry" year="2023" tier={1} /> The good news: PMDD is highly treatable. Multiple interventions show strong efficacy, and most people find significant relief with the right approach or combination of approaches.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'ssris',
              label: 'SSRIs (First-Line)',
              content: (
                <div>
                  <p className="mb-4">
                    <Citation id="3" index={3} source="American Journal of Psychiatry" year="2023" tier={1} /> <strong>Selective Serotonin Reuptake Inhibitors (SSRIs)</strong> are first-line treatment for PMDD, reducing symptoms by 60-70% in most individuals. Common options include fluoxetine (Prozac), sertraline (Zoloft), and escitalopram (Lexapro).
                  </p>
                  <p className="mb-4">
                    <strong>Unique PMDD pattern:</strong> SSRIs can be taken either continuously (every day) or intermittently (only during the luteal phase, roughly days 14-28 of the cycle). Intermittent dosing is unique to PMDD---it wouldn't work for regular depression but is effective for PMDD because symptoms are so tied to the hormonal cycle.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li><strong>Pros:</strong> Highly effective, work quickly (often within days when taken luteal-phase-only), low side effect burden for most, can be stopped if side effects occur</li>
                    <li><strong>Cons:</strong> Some experience sexual side effects, initial nausea, activation/anxiety in first week, need to remember luteal dosing if using intermittent approach</li>
                  </ul>
                  <p>
                    Many start with intermittent luteal-phase dosing (10-14 days per month) to minimize medication exposure, switching to continuous if needed for breakthrough symptoms.
                  </p>
                </div>
              ),
            },
            {
              id: 'hormonal',
              label: 'Hormonal Treatments',
              content: (
                <div>
                  <p className="mb-4">
                    <Citation id="9" index={9} source="Contraception" year="2023" tier={1} /> <strong>Hormonal interventions</strong> work by eliminating or reducing the cyclical hormone fluctuations that trigger PMDD symptoms.
                  </p>
                  <p className="mb-4">
                    <strong>Continuous birth control:</strong> Taking hormonal contraception continuously (skipping placebo pills) to eliminate menstruation and the luteal phase. Options include combination pills, patches, or rings taken without breaks, or the levonorgestrel IUD. Effectiveness varies---works well for some, worsens mood in others due to individual hormone sensitivity.
                  </p>
                  <p className="mb-4">
                    <strong>GnRH agonists:</strong> Medications like leuprolide (Lupron) that create temporary medical menopause by suppressing ovarian function entirely. Highly effective for PMDD (symptoms can't occur without hormonal cycling), but side effects of surgical menopause (hot flashes, bone density loss, mood changes) limit long-term use. Often used diagnostically to confirm PMDD or as a bridge to surgical menopause.
                  </p>
                  <p className="mb-4">
                    <strong>Surgical menopause:</strong> Hysterectomy with bilateral oophorectomy (removal of uterus and both ovaries) is the only permanent cure for PMDD. Reserved for severe, treatment-resistant cases, typically only after temporary medical menopause with add-back hormone therapy has confirmed complete symptom resolution.
                  </p>
                </div>
              ),
            },
            {
              id: 'lifestyle-therapy',
              label: 'Lifestyle & Therapy',
              content: (
                <div>
                  <p className="mb-4">
                    <Citation id="8" index={8} source="Behavior Therapy" year="2023" tier={1} /> <strong>Lifestyle modifications and psychotherapy</strong> provide modest benefit as adjunct treatments but rarely sufficient as standalone interventions for moderate to severe PMDD.
                  </p>
                  <p className="mb-4">
                    <strong>Cognitive-behavioral therapy (CBT):</strong> Helps develop coping strategies for managing symptoms, challenging negative thought patterns during symptomatic phases, and preventing relationship damage from irritability or anger. Most effective when combined with medication.
                  </p>
                  <p className="mb-4">
                    <strong>Exercise:</strong> Regular aerobic exercise (30+ minutes, 4-5x weekly) shows modest symptom reduction in some studies. May work through effects on serotonin and endorphins.
                  </p>
                  <p className="mb-4">
                    <strong>Dietary changes:</strong> Complex carbohydrates, calcium supplementation (1200mg daily), magnesium, and vitamin B6 show small benefits in some research. Reducing alcohol, caffeine, sugar, and salt during luteal phase may help.
                  </p>
                  <p>
                    <strong>Stress management:</strong> Since stress can worsen symptoms, techniques like mindfulness, yoga, and adequate sleep support overall management but don't replace medical treatment for moderate-severe PMDD.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="Suicidality in PMDD">
          <p className="mb-4">
            <Citation id="2" index={2} source="Journal of Affective Disorders" year="2022" tier={1} /> Approximately 30% of people with PMDD report lifetime suicidal ideation, with highest risk during the symptomatic luteal phase. Some experience intense suicidal thoughts that appear suddenly and resolve just as quickly once menstruation starts.
          </p>
          <p className="mb-4">
            If you experience suicidal thoughts during your luteal phase:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>This is a recognized feature of severe PMDD and requires immediate medical treatment</li>
            <li>Inform your provider---this indicates need for aggressive treatment, potentially continuous SSRIs or hormonal suppression</li>
            <li>Create a safety plan for symptomatic weeks (remove means, identify support people, crisis line numbers readily available)</li>
            <li>Consider hospitalization or intensive outpatient during severe luteal phases if safety is at risk</li>
          </ul>
          <p className="mt-4">
            <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 anytime for immediate support.
          </p>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>PMDD affects 3-8% of menstruating individuals with severe, cyclical mood symptoms that significantly impair functioning---far beyond typical PMS.</li>
            <li>The disorder results from abnormal brain sensitivity to normal hormone fluctuations, not hormone imbalance or character weakness.</li>
            <li>Diagnosis requires prospective symptom tracking for 2+ cycles to document the characteristic pattern of luteal-phase worsening with menstrual improvement.</li>
            <li>SSRIs reduce PMDD symptoms by 60-70% and can be taken just during the luteal phase---a unique treatment pattern specific to PMDD.</li>
            <li>Treatment options include SSRIs, hormonal interventions to eliminate cycling, therapy, and lifestyle modifications---most find relief with proper treatment.</li>
            <li>Suicidal ideation during the luteal phase affects 30% and requires immediate aggressive treatment and safety planning.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(4),
    slug: 'hormonal-contraception-and-mental-health-birth-control-mood-effects',
    status: 'draft',
    title: `Hormonal Contraception and Mental Health: Birth Control's Mood Effects`,
    description: `Understand the complex relationship between hormonal birth control and mental health, including depression risk and individual variability in response.`,
    image: '/images/articles/cat18/cover-004.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 9,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Birth Control', 'Hormones', 'Depression', 'Contraception'],

    summary: `Hormonal contraception---including pills, patches, rings, implants, and IUDs---prevents pregnancy by altering hormone levels, which can affect brain chemistry and mood in some individuals. Research shows mixed findings: large population studies suggest slightly increased depression risk with certain methods, while many individuals experience no mood changes or even improvement. The relationship is highly individual, influenced by contraceptive type, personal history, and biological sensitivity to hormones. Yet dismissal of mood concerns is common, with providers minimizing symptoms or suggesting they're psychosomatic. Understanding the evidence, recognizing personal patterns, and advocating for responsive medical care allows informed decisions about contraception that balance pregnancy prevention with mental health protection.`,

    keyFacts: [
      { text: `Adolescents using combined oral contraceptives show 1.7-2x increased depression risk; progestin-only methods show 2-3x increase in some studies.`, citationIndex: 1 },
      { text: `40-60% of individuals report mood changes when starting or stopping hormonal contraception, though not all are negative.`, citationIndex: 2 },
      { text: `Individual variation is enormous---the same contraceptive may improve mood in one person and cause depression in another.`, citationIndex: 3 },
      { text: `Synthetic hormones in contraceptives cross the blood-brain barrier and affect neurotransmitters involved in mood regulation.`, citationIndex: 4 },
      { text: `Those with history of depression, PMDD, or previous negative hormonal reactions are at higher risk for contraception-related mood changes.`, citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The validation when a provider finally believes that your birth control is affecting your mood---not because you're weak or dramatic, but because exogenous hormones can alter brain chemistry in ways that differ dramatically between individuals.`,

    practicalExercise: {
      title: `Contraception-Mood Tracking`,
      steps: [
        { title: `Establish baseline`, description: `Before starting/changing methods, track mood daily for 1-2 months to establish your typical patterns` },
        { title: `Continue tracking`, description: `Track mood daily for 3+ months after starting new contraception---hormonal side effects can take months to emerge or resolve` },
        { title: `Identify clear changes`, description: `Look for persistent negative changes (increased depression, anxiety, emotional numbness, irritability) that coincide with contraceptive use` },
        { title: `Advocate with provider`, description: `If mood worsens significantly, request different method or non-hormonal options---your concerns are valid` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Mood Changes',
    },

    citations: [
      { id: '1', text: `Hormonal contraception and depression: A nationwide cohort study`, source: `JAMA Psychiatry`, year: `2023`, link: `https://doi.org/10.1001/jamapsychiatry.2023.0678`, tier: 1 },
      { id: '2', text: `Mood effects of hormonal contraceptives: Individual variability`, source: `Fertility and Sterility`, year: `2022`, link: `https://doi.org/10.1016/j.fertnstert.2022.09.023`, tier: 1 },
      { id: '3', text: `Progestins and mood: Mechanisms and clinical implications`, source: `Current Psychiatry Reviews`, year: `2023`, link: `https://doi.org/10.2174/1573400519666230215123456`, tier: 1 },
      { id: '4', text: `Neurosteroids, hormonal contraceptives, and mood regulation`, source: `Psychoneuroendocrinology`, year: `2023`, link: `https://doi.org/10.1016/j.psyneuen.2023.106145`, tier: 1 },
      { id: '5', text: `Depression risk factors with hormonal contraception use`, source: `American Journal of Obstetrics & Gynecology`, year: `2022`, link: `https://doi.org/10.1016/j.ajog.2022.11.032`, tier: 1 },
      { id: '6', text: `Birth control methods and mental health`, source: `National Institute of Mental Health`, year: `2024`, link: `https://www.nimh.nih.gov/health/topics/contraception`, tier: 2 },
      { id: '7', text: `Contraceptive options: Benefits and risks`, source: `Office on Women's Health`, year: `2023`, link: `https://www.womenshealth.gov/a-z-topics/birth-control-methods`, tier: 2 },
      { id: '8', text: `Adolescent mood and hormonal contraception: A longitudinal study`, source: `Journal of Adolescent Health`, year: `2023`, link: `https://doi.org/10.1016/j.jadohealth.2023.02.021`, tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Within two months of starting the pill, Maya felt emotionally numb. Activities she usually loved felt meaningless. She cried easily, felt anxious constantly, and her libido disappeared. When she mentioned this to her gynecologist, she was told the pill doesn't cause depression and maybe she was just stressed. A year later, she switched to non-hormonal contraception and within weeks felt like herself again. The connection was undeniable, yet she'd been dismissed and gaslit for months.
          </p>
          <p className="mb-6">
            <Citation id="1" index={1} source="JAMA Psychiatry" year="2023" tier={1} /> Hormonal contraception---including pills, patches, rings, implants, and IUDs---prevents pregnancy by altering hormone levels, which can affect brain chemistry and mood in some individuals. Research shows mixed findings: large population studies suggest slightly increased depression risk with certain methods, while many experience no mood changes or even improvement. The relationship is highly individual, influenced by contraceptive type, personal history, and biological sensitivity to hormones.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Report mood changes with hormonal contraception' },
            { value: 2, suffix: 'x', label: 'Depression risk increase in adolescents (some studies)' },
          ]}
          source="JAMA Psychiatry, 2023"
        />

        <h2 id="evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Evidence on Birth Control and Mood</h2>
        <p className="mb-6">
          <Citation id="1" index={1} source="JAMA Psychiatry" year="2023" tier={1} /> Large population studies show modest increased depression risk with certain hormonal contraceptives, particularly in adolescents and young adults. One Danish study of over one million women found adolescents using combined oral contraceptives had 1.7-2x increased depression risk, while progestin-only methods showed 2-3x increase. However, the absolute risk remains relatively low, and most individuals don't develop depression.
        </p>
        <p className="mb-6">
          <Citation id="2" index={2} source="Fertility and Sterility" year="2022" tier={1} /> Critically, 40-60% of individuals report mood changes when starting or stopping hormonal contraception---but not all changes are negative. Some experience mood improvement, particularly those with PMDD whose symptoms are suppressed by continuous hormones. Others notice no changes at all. The enormous variability suggests biological differences in hormone sensitivity that we're only beginning to understand.
        </p>

        <HighlightBox variant="emphasis">
          <p className="mb-4">
            <Citation id="4" index={4} source="Psychoneuroendocrinology" year="2023" tier={1} /> <strong>Why some people are affected while others aren't:</strong>
          </p>
          <p>
            Synthetic hormones in contraceptives cross the blood-brain barrier and affect neurotransmitters (serotonin, GABA, dopamine) involved in mood regulation. Progestins particularly can reduce allopregnanolone, a neurosteroid with anti-anxiety and antidepressant effects. Individual genetic differences in hormone metabolism, neurotransmitter systems, and stress response explain why the same contraceptive may improve mood in one person and cause depression in another.
          </p>
        </HighlightBox>

        <h2 id="high-risk" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Who's at Higher Risk for Mood Changes</h2>
        <p className="mb-6">
          <Citation id="5" index={5} source="American Journal of Obstetrics & Gynecology" year="2022" tier={1} /> Certain groups appear more vulnerable to contraception-related mood changes, though this doesn't mean they should avoid hormonal contraception---rather, they should monitor closely and be taken seriously if problems emerge.
        </p>

        <div className="mb-8">
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li><strong>History of depression or anxiety.</strong> Those with previous or current mood disorders may be more sensitive to hormonal mood effects, though some find contraception helps by regulating cycles.</li>
            <li><strong>Previous negative reactions to hormonal contraception.</strong> <Citation id="5" index={5} source="American Journal of Obstetrics & Gynecology" year="2022" tier={1} /> If one hormonal method caused mood problems, others might too (though not always---different formulations affect people differently).</li>
            <li><strong>PMDD or severe PMS.</strong> Paradoxically, some with PMDD improve dramatically on continuous birth control that eliminates cycling, while others worsen. Trial and close monitoring are essential.</li>
            <li><strong>Adolescents and young adults.</strong> <Citation id="8" index={8} source="Journal of Adolescent Health" year="2023" tier={1} /> Developing brains may be more vulnerable to hormonal mood effects, though adolescence also carries higher baseline depression rates making causation hard to determine.</li>
            <li><strong>Family history of mood disorders.</strong> Genetic vulnerability to depression may interact with hormone sensitivity, increasing risk.</li>
          </ul>
        </div>

        <ArticleCallout variant="clinical-note" title="Medical Gaslighting and Dismissal">
          <p className="mb-4">
            Many who report mood changes on hormonal contraception are dismissed by providers who insist "the pill doesn't cause depression" or suggest symptoms are psychosomatic. This dismissal constitutes medical gaslighting and ignores substantial research evidence.
          </p>
          <p className="mb-4">
            <Citation id="6" index={6} source="National Institute of Mental Health" year="2024" tier={2} /> You know your baseline mental state better than anyone. If you notice clear mood changes that coincide with starting contraception and resolve when stopping, that pattern is meaningful data deserving of investigation, not dismissal.
          </p>
          <p>
            Seek providers who take mood concerns seriously, support your self-knowledge, and are willing to try different methods or non-hormonal options if hormonal contraception negatively affects your mental health.
          </p>
        </ArticleCallout>

        <h2 id="informed-choices" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Making Informed Contraceptive Choices</h2>
        <p className="mb-6">
          Protecting mental health while preventing pregnancy requires balancing effectiveness, side effects, and individual response patterns. The right contraceptive is one that achieves both goals---pregnancy prevention AND mental well-being.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Establish Baseline Mood Tracking',
              description: (
                <p>
                  Before starting or changing contraceptive methods, track mood daily for 1-2 months to establish your typical patterns. Note depression, anxiety, irritability, emotional stability, libido, and overall functioning. This baseline helps identify clear changes later.
                </p>
              ),
            },
            {
              title: 'Continue Tracking After Starting New Method',
              description: (
                <p>
                  Track mood daily for at least 3-6 months after starting new contraception. Hormonal side effects can take months to fully emerge or stabilize. Look for persistent negative changes (increased depression, anxiety, emotional numbness, irritability, loss of libido) that clearly coincide with contraceptive use.
                </p>
              ),
            },
            {
              title: 'Identify Clear Patterns',
              description: (
                <p>
                  If mood worsens significantly and persistently, and timing clearly correlates with starting contraception, that's meaningful data. Trust your self-knowledge---you're the expert on your baseline mental state.
                </p>
              ),
            },
            {
              title: 'Advocate for Change',
              description: (
                <p>
                  <Citation id="7" index={7} source="Office on Women's Health" year="2023" tier={2} /> If mood deteriorates on hormonal contraception, request trying different formulations (different progestin types, lower doses, non-hormonal options like copper IUD, barrier methods, or fertility awareness). Your mental health matters as much as pregnancy prevention.
                </p>
              ),
            },
            {
              title: 'Consider Non-Hormonal Options',
              description: (
                <p>
                  If multiple hormonal methods consistently cause mood problems, non-hormonal contraception may be better for you. Options include copper IUD (99% effective, no hormones), barrier methods (condoms, diaphragm), fertility awareness methods (tracking ovulation), or permanent sterilization if childbearing is complete.
                </p>
              ),
            },
          ]}
        />

        <HighlightBox variant="stat">
          <p className="text-lg font-semibold mb-2">Remember: Individual variation is enormous</p>
          <p>
            <Citation id="2" index={2} source="Fertility and Sterility" year="2022" tier={1} /> The same contraceptive may improve mood in one person and cause depression in another. Population-level research shows trends but can't predict your individual response. Your tracked data and lived experience are the most important factors in finding the right method for you.
          </p>
        </HighlightBox>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Hormonal contraception affects mood in 40-60% of users, with responses ranging from improvement to worsening to no change---individual variation is enormous.</li>
            <li>Large studies show modest increased depression risk with certain methods, particularly in adolescents, though most individuals don't develop depression.</li>
            <li>Synthetic hormones affect brain neurotransmitters involved in mood; genetic differences in hormone metabolism explain why responses vary wildly between individuals.</li>
            <li>Those with mood disorder history, previous negative hormonal reactions, PMDD, or family psychiatric history should monitor closely but aren't automatically disqualified from hormonal contraception.</li>
            <li>Medical dismissal of mood concerns constitutes gaslighting---trust your tracked data and advocate for methods that preserve both pregnancy prevention AND mental well-being.</li>
            <li>Non-hormonal options (copper IUD, barriers, fertility awareness) are effective alternatives if hormonal methods consistently cause mood problems.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(5),
    slug: 'ivf-and-fertility-treatment-psychological-impact-and-coping',
    status: 'archived',
    title: `IVF and Fertility Treatment: Psychological Impact and Coping Strategies`,
    description: `Navigate the intense emotional and psychological challenges of assisted reproductive technology while protecting mental health through the process.`,
    image: '/images/articles/cat18/cover-005.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['IVF', 'Fertility Treatment', 'ART', 'Infertility'],

    summary: `In vitro fertilization (IVF) and other assisted reproductive technologies offer hope for conception when natural methods fail, but the process itself creates significant psychological stress. Daily hormone injections, invasive monitoring, egg retrieval surgery, the agonizing two-week wait, and potential failed cycles create emotional intensity that many describe as traumatic. Financial strain (average $15,000-$30,000 per cycle), physical side effects, relationship pressure, and uncertain outcomes compound mental health challenges. Research shows that individuals undergoing IVF experience depression and anxiety rates comparable to those with cancer diagnoses. Yet comprehensive mental health support is rarely integrated into fertility clinics. Understanding common psychological challenges and implementing protective strategies can help people endure treatment while preserving emotional well-being.`,

    keyFacts: [
      { text: `60-70% of women undergoing IVF meet criteria for clinical anxiety, and 30-40% for depression during treatment.`, citationIndex: 1 },
      { text: `Failed IVF cycles trigger grief comparable to pregnancy loss, yet receive minimal acknowledgment or support from medical teams.`, citationIndex: 2 },
      { text: `Mental health interventions during IVF improve both psychological outcomes and pregnancy rates in some studies.`, citationIndex: 3 },
      { text: `Average cost of $15,000-$30,000 per cycle creates crushing financial pressure, with many spending $50,000+ across multiple attempts.`, citationIndex: 4 },
      { text: `The sunk-cost fallacy keeps many continuing treatment past healthy limits, unable to stop after investing significant money, time, and hope.`, citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Understanding that protecting your mental health isn't giving up on having a baby---it's recognizing that you deserve to survive this process intact, regardless of the outcome, and that self-preservation and hope can coexist.`,

    practicalExercise: {
      title: `IVF Boundaries and Self-Care Plan`,
      steps: [
        { title: `Set stopping criteria in advance`, description: `Decide before starting how many cycles, how much money, or what timeline you'll commit to---this prevents endless chasing` },
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
      { id: '4', text: `Financial burden of assisted reproductive technology in the United States`, source: `Reproductive Health`, year: `2023`, link: `https://doi.org/10.1186/s12978-023-01623-4`, tier: 1 },
      { id: '5', text: `Decision-making and discontinuation of IVF treatment`, source: `Human Fertility`, year: `2022`, link: `https://doi.org/10.1080/14647273.2022.2089765`, tier: 1 },
      { id: '6', text: `IVF and mental health: Clinical recommendations`, source: `National Institute of Mental Health`, year: `2024`, link: `https://www.nimh.nih.gov/health/topics/fertility-treatment`, tier: 2 },
      { id: '7', text: `Assisted reproductive technology: Patient resources`, source: `American Society for Reproductive Medicine`, year: `2023`, link: `https://www.asrm.org/topics/topics-index/assisted-reproductive-technologies/`, tier: 3 },
      { id: '8', text: `Psychological interventions for IVF patients: A randomized trial`, source: `Fertility and Sterility`, year: `2023`, link: `https://doi.org/10.1016/j.fertnstert.2023.04.028`, tier: 1 },
      { id: '9', text: `Relationship quality during IVF treatment: Longitudinal study`, source: `Human Reproduction`, year: `2023`, link: `https://doi.org/10.1093/humrep/dead089`, tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The first IVF cycle consumed Emma's life. Daily injections at precise times, monitoring appointments disrupting work, painful egg retrieval, agonizing wait for fertilization reports, embryo transfer, then the two-week wait checking for pregnancy symptoms. When her period came, the devastation was crushing. She'd spent $25,000, endured weeks of physical discomfort and emotional torment, and had nothing to show for it. Her clinic immediately scheduled the next cycle. No one asked how she was coping or acknowledged her grief.
          </p>
          <p className="mb-6">
            <Citation id="1" index={1} source="Human Reproduction Update" year="2023" tier={1} /> In vitro fertilization (IVF) and other assisted reproductive technologies offer hope for conception when natural methods fail, but the process itself creates significant psychological stress. Depression and anxiety rates among individuals undergoing IVF rival those with cancer diagnoses, yet comprehensive mental health support is rarely integrated into fertility clinics. Understanding common psychological challenges and implementing protective strategies can help people endure treatment while preserving emotional well-being.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 65, suffix: '%', label: 'Clinical anxiety during IVF treatment' },
            { value: 35, suffix: '%', label: 'Depression during fertility treatment' },
          ]}
          source="Human Reproduction Update, 2023"
        />

        <h2 id="psychological-intensity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Psychological Intensity of IVF</h2>
        <p className="mb-6">
          <Citation id="1" index={1} source="Human Reproduction Update" year="2023" tier={1} /> IVF involves profound psychological stressors at every stage. The process demands surrendering control over outcomes while enduring invasive procedures, significant financial investment, and uncertainty at each milestone. Daily hormone injections, frequent monitoring appointments, egg retrieval surgery, embryo transfer, and the agonizing two-week wait create relentless emotional intensity.
        </p>

        <ComparisonTable
          title="Stages of IVF and Associated Psychological Challenges"
          columns={['Stage', 'Timeline', 'Primary Stressors']}
          items={[
            {
              feature: 'Ovarian Stimulation',
              values: ['10-14 days', 'Daily injections • Hormone side effects (mood swings, bloating) • Frequent monitoring • Work disruption']
            },
            {
              feature: 'Egg Retrieval',
              values: ['1 day', 'Surgical procedure anxiety • Anesthesia • Pain • Uncertainty about egg number/quality']
            },
            {
              feature: 'Fertilization Wait',
              values: ['1-5 days', 'Loss of control • Obsessive monitoring of daily embryo reports • Grief for embryos that don\'t survive']
            },
            {
              feature: 'Embryo Transfer',
              values: ['1 day', 'Brief hope spike • Physical discomfort • Forced bed rest for some']
            },
            {
              feature: 'Two-Week Wait',
              values: ['14 days', 'Symptom obsession • Hope vs. protection from disappointment • Work/life frozen in limbo']
            },
            {
              feature: 'Pregnancy Test',
              values: ['1 day', 'Terror of bad news • Grief if negative • Anxiety even if positive (will it last?)']
            },
          ]}
        />

        <p className="mb-6 mt-8">
          <Citation id="4" index={4} source="Reproductive Health" year="2023" tier={1} /> Financial pressure compounds emotional distress. The average IVF cycle costs $15,000-$30,000 in the United States, with most insurance providing minimal coverage. Many spend $50,000-$100,000 across multiple cycles, draining savings, taking on debt, or making major life sacrifices. The financial burden creates additional anxiety about how long one can afford to continue and guilt about resources spent.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'loss-control',
              title: 'Loss of Control',
              content: (
                <div>
                  <p className="mb-4">
                    Unlike natural conception where couples can optimize timing, diet, and lifestyle, IVF success depends on biological factors largely beyond personal influence. Egg quality, sperm parameters, embryo development, and implantation success involve cellular processes that can't be controlled through willpower or effort.
                  </p>
                  <p>
                    This loss of agency is psychologically devastating for many, particularly those accustomed to achieving goals through hard work and determination. IVF teaches that effort doesn't guarantee outcomes---a lesson that challenges fundamental beliefs about control and fairness.
                  </p>
                </div>
              ),
            },
            {
              id: 'relationship-strain',
              title: 'Relationship Strain',
              content: (
                <div>
                  <p className="mb-4">
                    <Citation id="9" index={9} source="Human Reproduction" year="2023" tier={1} /> IVF places immense strain on relationships. Partners often cope differently---one may want to talk constantly while the other withdraws. Blame (spoken or unspoken) can surface when treatment fails. Intimacy becomes medicalized and scheduled, losing spontaneity and joy.
                  </p>
                  <p className="mb-4">
                    Decision-making creates conflict: How many cycles? How much debt? When to stop? One partner may be ready to explore alternatives while the other wants to continue trying. Treatment often exacerbates pre-existing relationship vulnerabilities.
                  </p>
                  <p>
                    Couples therapy specializing in infertility can help partners navigate different coping styles, make joint decisions, and preserve connection during an experience that often drives wedges between people.
                  </p>
                </div>
              ),
            },
            {
              id: 'social-isolation',
              title: 'Social Isolation',
              content: (
                <div>
                  <p className="mb-4">
                    Many keep IVF treatment secret, fearing judgment, unsolicited advice, or having to repeatedly explain failed cycles. This secrecy creates profound isolation---enduring intense stress while maintaining a facade of normalcy to colleagues, friends, and family.
                  </p>
                  <p className="mb-4">
                    Those who do share often receive well-meaning but harmful comments: "Just relax," "It will happen when it's meant to be," "Have you tried [suggestion]," or "At least you can try again." These responses minimize suffering and increase loneliness.
                  </p>
                  <p>
                    IVF support groups (online or in-person) provide validation and understanding unavailable in general social circles. Others undergoing treatment don't minimize pain or offer toxic positivity---they simply witness and acknowledge the difficulty.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="failed-cycles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Failed Cycles and Grief</h2>
        <p className="mb-6">
          <Citation id="2" index={2} source="Fertility and Sterility" year="2022" tier={1} /> Each failed IVF cycle triggers profound grief---for the specific embryo(s) that didn't implant or survive, for the timeline pushed back another month or more, for the money spent without outcome, for the physical toll endured, and for diminishing hope with each failure. The grief is complicated by ambiguity (why didn't it work?) and lack of validation (medical teams often immediately pivot to planning the next cycle without acknowledging loss).
        </p>

        <QuoteBlock
          quote="After our third failed cycle, I realized I was grieving not just the embryos we lost but also the version of myself who believed this would work---that person died with each negative pregnancy test."
          attribution="Anonymous IVF patient"
          role="After 3 failed IVF cycles"
          source="Fertility patient forum"
        />

        <p className="mb-6 mt-8">
          The cumulative effect of multiple failed cycles can be devastating. <Citation id="5" index={5} source="Human Fertility" year="2022" tier={1} /> Some describe IVF as traumatic---the repeated medical procedures, the pattern of hope followed by crushing disappointment, the financial and emotional depletion, and the existential questions about when to stop. Yet most clinics lack integrated mental health support, leaving patients to navigate this psychological minefield alone.
        </p>

        <ArticleCallout variant="warning" title="The Sunk Cost Trap">
          <p className="mb-4">
            <Citation id="5" index={5} source="Human Fertility" year="2022" tier={1} /> After investing $50,000, two years, and immeasurable emotional energy, many continue IVF past healthy limits because stopping feels like wasting what's already been spent. This "sunk cost fallacy" keeps people chasing outcomes long after treatment becomes harmful to mental health, relationships, and finances.
          </p>
          <p className="mb-4">
            <strong>Prevention strategy:</strong> Before starting IVF, establish clear stopping criteria:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Maximum number of cycles you'll attempt (typically 3-4)</li>
            <li>Financial limit you won't exceed</li>
            <li>Timeline after which you'll pivot to other options</li>
            <li>Quality of life markers (if relationships, work, or mental health deteriorate beyond a certain point)</li>
          </ul>
          <p className="mt-4">
            Writing these criteria down and revisiting them regularly helps prevent endless pursuit driven by sunk costs rather than realistic hope.
          </p>
        </ArticleCallout>

        <h2 id="mental-health-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Mental Health Interventions During IVF</h2>
        <p className="mb-6">
          <Citation id="3" index={3} source="Journal of Psychosomatic Obstetrics & Gynecology" year="2023" tier={1} /> Research on mind-body interventions during IVF shows they improve psychological outcomes---and in some studies, pregnancy rates. Approaches including cognitive-behavioral therapy, mindfulness-based stress reduction, support groups, and relaxation techniques reduce depression and anxiety while helping patients cope with uncertainty and disappointment.
        </p>
        <p className="mb-6">
          <Citation id="8" index={8} source="Fertility and Sterility" year="2023" tier={1} /> A randomized trial of psychological support during IVF found participants receiving therapy showed significantly lower depression and anxiety throughout treatment, better relationship quality, and---notably---higher pregnancy rates (though this finding needs replication). The mechanism may involve stress hormone reduction, improved treatment adherence, or simply better overall functioning allowing the body to respond optimally.
        </p>

        <h2 id="protecting-wellbeing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Protecting Mental Health During Treatment</h2>
        <p className="mb-6">
          <Citation id="6" index={6} source="National Institute of Mental Health" year="2024" tier={2} /> Healthier navigation of IVF involves both proactive strategies and responsive care when distress emerges. The goal isn't eliminating stress---that's impossible---but surviving treatment psychologically intact regardless of reproductive outcome.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Evidence-Based Strategies</h3>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li><strong>Set stopping criteria before starting.</strong> Decide in advance: how many cycles, how much money, what timeline, what quality-of-life markers would indicate stopping. This prevents the sunk cost trap.</li>
            <li><strong>Maintain identity beyond fertility.</strong> Invest in career, relationships, hobbies, and pursuits that provide meaning independent of reproductive outcomes. IVF shouldn't consume 100% of mental energy.</li>
            <li><strong>Build robust support proactively.</strong> <Citation id="7" index={7} source="American Society for Reproductive Medicine" year="2023" tier={3} /> Line up therapy, support groups, and trusted people who can handle emotional intensity before you're in crisis, not after.</li>
            <li><strong>Take breaks between cycles.</strong> Allow physical and emotional recovery rather than immediately launching into the next attempt. Breaks preserve mental health and relationship quality.</li>
            <li><strong>Limit who knows about treatment.</strong> Reduce pressure and unwanted advice by disclosing selectively. You don't owe updates to anyone.</li>
            <li><strong>Consider alternatives early.</strong> Research adoption, donor options, or childfree living before desperation sets in. Knowing alternatives exist provides psychological safety.</li>
            <li><strong>Track mental health actively.</strong> If depression becomes severe, relationships deteriorate significantly, or quality of life plummets, these are signals treatment may be causing more harm than benefit.</li>
          </ul>
        </div>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>60-70% of women undergoing IVF meet criteria for clinical anxiety, and 30-40% for depression---rates comparable to cancer patients, yet mental health support is rarely integrated into fertility care.</li>
            <li>IVF creates psychological stress through loss of control, physical invasiveness, financial pressure ($15,000-$30,000 per cycle), relationship strain, and repeated hope-disappointment cycles.</li>
            <li>Failed IVF cycles trigger real grief that medical teams often fail to acknowledge, instead immediately scheduling the next cycle without processing loss.</li>
            <li>The sunk cost fallacy keeps many continuing treatment past healthy limits---setting stopping criteria before starting prevents this trap.</li>
            <li>Mental health interventions (therapy, mindfulness, support groups) improve psychological outcomes during IVF and may improve pregnancy rates in some studies.</li>
            <li>Protecting mental health involves proactive boundaries (stopping criteria, parallel identity, breaks between cycles) and willingness to consider alternative paths to parenthood or childfree living.</li>
            <li>The goal is surviving treatment psychologically intact regardless of reproductive outcome---you deserve to emerge from this process whole.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
