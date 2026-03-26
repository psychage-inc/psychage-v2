/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SLEEP_BODY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  ArticleTabs,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const sleepDisordersCommonProblemsArticlesB: Article[] = [
  {
    id: catId(16),
    slug: 'night-terrors-nightmares-when-to-seek-help',
    title: 'Night Terrors and Nightmares: What They Mean and When to Seek Help',
    description: 'Night terrors and nightmares disrupt sleep differently. Learn to distinguish them, understand their causes, and know when professional help is needed.',
    image: "/images/articles/cat09/cover-016.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Nightmares', 'Night Terrors', 'Parasomnias', 'Sleep'],
    citations: [
      { id: '1', text: 'Nightmares and the brain', source: 'Sleep Medicine Reviews', year: '2020', link: 'https://doi.org/10.1016/j.smrv.2020.101297', tier: 1 },
      { id: '2', text: 'Night terrors in children', source: 'Pediatrics', year: '2019', link: 'https://doi.org/10.1542/peds.2019-0791', tier: 1 },
      { id: '3', text: 'Imagery rehearsal therapy for nightmares', source: 'Sleep', year: '2020', link: 'https://doi.org/10.1093/sleep/zsaa054', tier: 1 },
      { id: '4', text: 'PTSD and nightmare treatment', source: 'Journal of Traumatic Stress', year: '2021', link: 'https://doi.org/10.1002/jts.22645', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your child screams in the night, eyes open but unseeing---a night terror. Or you wake drenched in sweat from a vivid nightmare. While both disrupt sleep, they're fundamentally different phenomena requiring different responses.
          </p>
          <p className="mb-6">
            Nightmares are disturbing dreams during REM sleep that you remember upon waking <Citation id="1" index={1} source="Sleep Medicine Reviews" year="2020" tier={1} />. Night terrors are episodes of intense fear during deep sleep, with no dream recall. Understanding the difference helps you respond appropriately.
          </p>
        </div>

        <h2 id="comparison" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Night Terrors vs. Nightmares
        </h2>
        <ComparisonTable title="Key Differences" columns={['Feature', 'Night Terrors', 'Nightmares']} items={[{feature: 'Sleep stage', values: ['Deep sleep (N3)', 'REM sleep']}, {feature: 'Timing', values: ['First 1-3 hours', 'Second half of night']}, {feature: 'Awareness', values: ['No awareness/memory', 'Full awareness upon waking']}, {feature: 'Response', values: ['Screaming, thrashing, unseeing', 'Wake up scared, can be comforted']}, {feature: 'Age', values: ['Mostly children 3-7', 'All ages, more in adults']}, {feature: 'Return to sleep', values: ['Immediate, no recall', 'Difficulty, remembers dream']}]} />

        <h2 id="nightmares" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Nightmares: When Dreams Turn Frightening
        </h2>
        <p className="mb-6"><strong>Occasional nightmares are normal</strong> (most people have them occasionally). <strong>Nightmare disorder</strong> is diagnosed when they occur frequently (1+ per week), cause significant distress, or impair daily functioning.</p>
        <p className="mb-6"><strong>Common triggers:</strong> Stress, trauma, anxiety, depression, PTSD, certain medications (beta-blockers, antidepressants), sleep deprivation, substance withdrawal.</p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Treatment for Nightmares</h3>
        <ProgressSteps variant="vertical" steps={[{title: 'Imagery Rehearsal Therapy (IRT)', description: <p>Rewrite nightmare ending while awake, rehearse new version. Reduces nightmare frequency by 50-70% <Citation id="3" index={3} source="Sleep" year="2020" tier={1} />.</p>}, {title: 'Address Underlying Conditions', description: <p>Treat PTSD, anxiety, depression---nightmares often improve when comorbid conditions are managed <Citation id="4" index={4} source="Journal of Traumatic Stress" year="2021" tier={1} />.</p>}, {title: 'Sleep Hygiene', description: <p>Adequate sleep reduces nightmare frequency. Sleep deprivation worsens REM rebound and nightmare intensity.</p>}, {title: "Medication (If Needed)", description: <p>Prazosin (for PTSD nightmares), antidepressants---consult healthcare provider.</p>}]} />

        <h2 id="night-terrors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Night Terrors: The Deep Sleep Phenomenon
        </h2>
        <p className="mb-6">Night terrors (sleep terrors) are dramatic episodes where a person appears terrified---screaming, thrashing, wide-eyed---but is not actually awake and won't remember the episode <Citation id="2" index={2} source="Pediatrics" year="2019" tier={1} />.</p>
        <p className="mb-6"><strong>What causes them:</strong> Immature sleep systems (in children), sleep deprivation, fever, stress, family history, sleep-disordered breathing.</p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">How to Respond</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li><strong>Don't wake the person</strong>---this can prolong confusion and agitation</li><li><strong>Ensure safety</strong>---remove hazards, gently guide back to bed if wandering</li><li><strong>Stay calm</strong>---the episode will pass in 5-15 minutes</li><li><strong>Don't discuss it in the morning</strong>---they won't remember and bringing it up can cause anxiety</li></ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <ArticleCallout variant="warning"><ul className="list-disc pl-5 space-y-2"><li>Nightmares occur multiple times per week and cause distress</li><li>Night terrors persist past age 12 or begin in adulthood</li><li>Episodes involve injury risk (falling, hitting walls)</li><li>Sleep disruption impairs daytime functioning</li><li>Associated with trauma, PTSD, or other mental health conditions</li></ul></ArticleCallout>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Nightmares occur during REM sleep</strong>---vivid, memorable, emotional dreams.</li><li><strong>Night terrors occur during deep sleep</strong>---no dream recall, person seems awake but isn't.</li><li><strong>Most children outgrow night terrors</strong> by age 10-12.</li><li><strong>Imagery rehearsal therapy is highly effective</strong> for chronic nightmares.</li><li><strong>Seek help if episodes are frequent, dangerous, or impairing</strong>.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(17),
    slug: 'sleepwalking-sleep-talking-parasomnias-explained',
    title: 'Sleepwalking, Sleep Talking, and Other Parasomnias Explained',
    description: 'Parasomnias---unusual behaviors during sleep---range from harmless sleep talking to dangerous sleepwalking. Learn what causes them and how to stay safe.',
    image: "/images/articles/cat09/cover-017.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parasomnias', 'Sleepwalking', 'Sleep Talking', 'REM Behavior Disorder'],
    citations: [
      { id: '1', text: 'Parasomnias: clinical features and treatment', source: 'Sleep Medicine Clinics', year: '2020', link: 'https://doi.org/10.1016/j.jsmc.2020.02.003', tier: 1 },
      { id: '2', text: 'Sleepwalking: epidemiology and treatment', source: 'Current Treatment Options in Neurology', year: '2019', link: 'https://doi.org/10.1007/s11940-019-0571-6', tier: 1 },
      { id: '3', text: 'REM sleep behavior disorder', source: 'Nature Reviews Neurology', year: '2020', link: 'https://doi.org/10.1038/s41582-020-0402-9', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Waking to find you've rearranged furniture in your sleep. Carrying on full conversations while unconscious. Acting out violent dreams. These are parasomnias---abnormal behaviors that occur during sleep transitions or within sleep stages.
          </p>
          <p className="mb-6">
            Parasomnias are classified by when they occur: during NREM sleep (sleepwalking, night terrors), during REM sleep (REM behavior disorder), or during sleep-wake transitions (sleep paralysis) <Citation id="1" index={1} source="Sleep Medicine Clinics" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="nrem-parasomnias" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          NREM Parasomnias (Disorders of Arousal)
        </h2>
        <ArticleTabs tabs={[{id: 'sleepwalking', label: 'Sleepwalking', content: <div><p className="mb-4">Walking or performing complex behaviors while asleep. Person's eyes may be open but they're not conscious. Common in children (15-40%), less in adults (4%) <Citation id="2" index={2} source="Current Treatment Options in Neurology" year="2019" tier={1} />.</p><p><strong>Safety measures:</strong> Lock doors/windows, remove tripping hazards, install alarms.</p></div>}, {id: 'confusional', label: 'Confusional Arousals', content: <div><p className="mb-4">Slow, confused behavior upon waking---disorientation, slow speech, impaired judgment. More common in children.</p></div>}, {id: 'sleep-eating', label: 'Sleep-Related Eating', content: <div><p className="mb-4">Eating while asleep with no memory. Can involve bizarre food combinations or raw ingredients. Risk: injury from cooking.</p></div>}]} />

        <h2 id="rem-parasomnias" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          REM Parasomnias
        </h2>
        <p className="mb-6"><strong>REM Sleep Behavior Disorder (RBD):</strong> Acting out dreams physically---punching, kicking, shouting. Normally, muscles are paralyzed during REM; in RBD, this paralysis fails <Citation id="3" index={3} source="Nature Reviews Neurology" year="2020" tier={3} />.</p>
        <p className="mb-6"><strong>Who gets it:</strong> More common in older men (60+). Strongly associated with Parkinson's disease and other neurodegenerative conditions---often precedes diagnosis by years.</p>
        <p className="mb-6"><strong>Treatment:</strong> Melatonin (reduces episodes), clonazepam (suppresses RBD), bed safety measures (mattress on floor, padded bed frame).</p>

        <h2 id="sleep-talking" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Sleep Talking (Somniloquy)
        </h2>
        <p className="mb-6">Talking during sleep---ranges from mumbling to full conversations. Occurs in all sleep stages. Affects ~65% of people occasionally. Usually harmless, no treatment needed unless disruptive to partner.</p>

        <h2 id="triggers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Triggers
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li>Sleep deprivation</li><li>Stress or anxiety</li><li>Fever (especially in children)</li><li>Alcohol or sedative use</li><li>Certain medications (zolpidem, antidepressants)</li><li>Sleep-disordered breathing (apnea)</li><li>Irregular sleep schedules</li></ul>

        <h2 id="when-to-worry" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to See a Sleep Specialist
        </h2>
        <ArticleCallout variant="warning"><ul className="list-disc pl-5 space-y-2"><li>Episodes involve injury or dangerous behavior</li><li>Occur multiple times per week</li><li>Begin in adulthood (may signal RBD or other disorder)</li><li>Disrupt household or cause relationship strain</li><li>Associated with other sleep problems (snoring, gasping)</li></ul></ArticleCallout>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Parasomnias are abnormal sleep behaviors</strong> occurring during NREM, REM, or transitions.</li><li><strong>Most childhood parasomnias are benign</strong> and outgrown by adolescence.</li><li><strong>Adult-onset parasomnias</strong> warrant medical evaluation (especially RBD).</li><li><strong>Safety is priority</strong>---secure environment for sleepwalkers and RBD patients.</li><li><strong>Triggers include sleep deprivation, stress, alcohol, medications</strong>.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(18),
    slug: 'shift-work-sleep-disorder-irregular-schedule-mental-health',
    title: 'Shift Work Sleep Disorder: Managing Mental Health on an Irregular Schedule',
    description: 'Night shifts and rotating schedules disrupt circadian rhythms, increasing risk of insomnia, depression, and health problems. Learn coping strategies.',
    image: "/images/articles/cat09/cover-018.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Shift Work', 'Circadian Disruption', 'Sleep Disorder', 'Mental Health'],
    citations: [
      { id: '1', text: 'Shift work and health outcomes', source: 'Occupational Medicine', year: '2021', link: 'https://doi.org/10.1093/occmed/kqab010', tier: 1 },
      { id: '2', text: 'Shift work sleep disorder: diagnosis and management', source: 'Sleep Medicine Reviews', year: '2020', link: 'https://doi.org/10.1016/j.smrv.2020.101321', tier: 1 },
      { id: '3', text: 'Light therapy for shift workers', source: 'Journal of Clinical Sleep Medicine', year: '2019', link: 'https://doi.org/10.5664/jcsm.7790', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Working when your body expects to sleep disrupts more than your schedule---it fights against millions of years of evolutionary biology. Shift work sleep disorder affects 10-40% of night and rotating shift workers.
          </p>
          <p className="mb-6">
            The disorder is characterized by insomnia and/or excessive sleepiness directly related to a work schedule that overlaps with the typical sleep period <Citation id="1" index={1} source="Occupational Medicine" year="2021" tier={1} />. Beyond sleep problems, shift work increases risk of depression, anxiety, cardiovascular disease, diabetes, and certain cancers.
          </p>
        </div>

        <h2 id="why-its-hard" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Shift Work Disrupts Sleep
        </h2>
        <p className="mb-6">Your circadian rhythm is programmed for daytime activity and nighttime sleep. Working nights forces you to stay awake when melatonin is high (making you sleepy) and sleep when cortisol is rising (promoting wakefulness). This creates chronic circadian misalignment.</p>
        <p className="mb-6"><strong>The problem compounds:</strong> Daylight exposure after night shifts suppresses melatonin, making daytime sleep difficult. Family/social obligations prevent adequate recovery. Many shift workers get only 5-6 hours of poor-quality sleep.</p>

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Mental Health Consequences
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li><strong>Depression:</strong> Shift workers have 30-40% higher depression rates</li><li><strong>Anxiety:</strong> Chronic stress from sleep deprivation and social isolation</li><li><strong>Cognitive impairment:</strong> Reduced attention, memory, decision-making</li><li><strong>Substance use:</strong> Higher rates of alcohol, caffeine, and sleep medication use</li><li><strong>Relationship strain:</strong> Conflicting schedules with partners/family</li></ul>

        <h2 id="coping-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Coping Strategies
        </h2>
        <ProgressSteps variant="vertical" steps={[{title: 'Optimize Sleep Environment', description: <p>Blackout curtains, white noise, cool temperature (60-67°F). Treat daytime sleep as seriously as nighttime sleep.</p>}, {title: 'Strategic Light Exposure', description: <p>Bright light during work shift maintains alertness. Wear sunglasses on commute home. Keep bedroom dark <Citation id="3" index={3} source="Journal of Clinical Sleep Medicine" year="2019" tier={1} />.</p>}, {title: 'Consistent Sleep Schedule', description: <p>Same sleep time on work days and days off (e.g., always sleep 8 AM-3 PM). Avoids repeated circadian shifts.</p>}, {title: 'Strategic Caffeine Use', description: <p>Consume caffeine early in shift, stop 4-6 hours before planned sleep. Avoid on commute home.</p>}, {title: 'Short Naps', description: <p>20-30 minute nap before night shift improves alertness. Nap during break if possible.</p>}]} />

        <h2 id="medication-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Medical Interventions
        </h2>
        <p className="mb-6"><strong>Wakefulness-promoting agents:</strong> Modafinil, armodafinil---reduce sleepiness during night shifts <Citation id="2" index={2} source="Sleep Medicine Reviews" year="2020" tier={2} />.</p>
        <p className="mb-6"><strong>Melatonin:</strong> 0.5-3mg taken 2 hours before desired sleep time can improve daytime sleep quality.</p>
        <p className="mb-6"><strong>Short-term sedatives:</strong> For severe insomnia, brief use under medical supervision. Not a long-term solution.</p>

        <h2 id="when-to-change" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Consider Leaving Shift Work
        </h2>
        <ArticleCallout variant="warning"><p>If you experience persistent depression, severe health problems, or dangerous levels of sleepiness despite interventions, discuss alternatives with your employer or consider a schedule change. Long-term health impacts may outweigh financial benefits.</p></ArticleCallout>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Shift work disorder affects 10-40%</strong> of night/rotating shift workers.</li><li><strong>Circadian misalignment is the core problem</strong>---working when your body expects sleep.</li><li><strong>Mental health risks are significant</strong>: depression, anxiety, cognitive decline.</li><li><strong>Strategic light exposure and sleep optimization help</strong> but don't fully compensate.</li><li><strong>Some people never adapt</strong>---if health suffers despite interventions, schedule change may be necessary.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(19),
    slug: 'sleep-anxiety-fear-not-sleeping-keeps-you-awake',
    title: 'Sleep Anxiety: When the Fear of Not Sleeping Keeps You Awake',
    description: 'Worrying about sleep creates a vicious cycle of insomnia. Learn how sleep anxiety develops and evidence-based strategies to break free.',
    image: "/images/articles/cat09/cover-019.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sleep Anxiety', 'Insomnia', 'Worry', 'Cognitive Behavioral'],
    citations: [
      { id: '1', text: 'Pre-sleep cognitive arousal and insomnia', source: 'Behavior Therapy', year: '2020', link: 'https://doi.org/10.1016/j.beth.2019.08.003', tier: 1 },
      { id: '2', text: 'Paradoxical intention for sleep onset insomnia', source: 'Sleep Medicine Reviews', year: '2019', link: 'https://doi.org/10.1016/j.smrv.2019.04.002', tier: 1 },
      { id: '3', text: 'Acceptance and commitment therapy for insomnia', source: 'Journal of Contextual Behavioral Science', year: '2020', link: 'https://doi.org/10.1016/j.jcbs.2020.08.004', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            It's 10 PM. You need to sleep because tomorrow is important. But the thought "I need to sleep" triggers anxiety, which triggers arousal, which prevents sleep. The harder you try, the more awake you become. This is sleep anxiety.
          </p>
          <p className="mb-6">
            Sleep anxiety (or sleep-related performance anxiety) occurs when worry about sleeping becomes the primary barrier to sleep <Citation id="1" index={1} source="Behavior Therapy" year="2020" tier={1} />. The fear of not sleeping creates the very insomnia it fears---a classic psychological paradox.
          </p>
        </div>

        <h2 id="how-it-develops" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Sleep Anxiety Develops
        </h2>
        <ProgressSteps variant="vertical" steps={[{title: 'Initial Trigger', description: <p>A period of poor sleep (due to stress, illness, life change) occurs.</p>}, {title: 'Worry Sets In', description: <p>You begin worrying about sleep and its consequences: "What if I can't sleep? I'll be a disaster tomorrow."</p>}, {title: 'Hyperarousal Develops', description: <p>Anxiety activates your nervous system---increased heart rate, alertness, cortisol---making sleep biologically difficult.</p>}, {title: 'Cycle Reinforces', description: <p>Each night of poor sleep confirms your fear, strengthening the anxiety. Sleep becomes a source of dread rather than rest.</p>}]} />

        <h2 id="common-thoughts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Sleep-Anxious Thoughts
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li>"I MUST get 8 hours or I'll be ruined tomorrow"</li><li>"I'm already behind on sleep, tonight is critical"</li><li>"Everyone else can sleep, why can't I?"</li><li>"If I don't fall asleep in the next 10 minutes, I'll be exhausted tomorrow"</li><li>"I'll never be able to sleep normally again"</li><li>Clock-watching and calculating remaining sleep time</li></ul>

        <h2 id="breaking-cycle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Breaking the Cycle
        </h2>

        <ArticleTabs tabs={[{id: 'paradoxical', label: 'Paradoxical Intention', content: <div><p className="mb-4">Instead of trying to sleep, try to stay awake. This removes performance pressure and often results in sleep <Citation id="2" index={2} source="Sleep Medicine Reviews" year="2019" tier={2} />.</p><p><strong>How:</strong> Lie in bed with eyes open, tell yourself "I'm going to stay awake." No screens or stimulating activity---just passive wakefulness.</p></div>}, {id: 'cognitive', label: 'Cognitive Restructuring', content: <div><p className="mb-4">Challenge catastrophic beliefs about sleep consequences.</p><p><strong>Unhelpful:</strong> "If I don't sleep, tomorrow is ruined."<br/><strong>Realistic:</strong> "I'll be tired, but I've functioned on less sleep before. One bad night doesn't ruin a day."</p></div>}, {id: 'acceptance', label: 'Acceptance-Based Approach', content: <div><p className="mb-4">Accept that some nights will have poor sleep. Stop fighting it <Citation id="3" index={3} source="Journal of Contextual Behavioral Science" year="2020" tier={1} />.</p><p><strong>Mindset shift:</strong> "I prefer good sleep, but I can tolerate a bad night. Fighting it makes it worse."</p></div>}]} />

        <h2 id="behavioral-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Behavioral Strategies
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li><strong>Hide the clock</strong>---clock-watching fuels anxiety and prevents sleep</li><li><strong>Get out of bed if not sleeping</strong> within 20 minutes---break the bed-wakefulness association</li><li><strong>Schedule "worry time"</strong> earlier in evening---write concerns down, then set them aside</li><li><strong>Practice relaxation before bed</strong>---diaphragmatic breathing, progressive muscle relaxation</li><li><strong>Avoid "trying" to sleep</strong>---create conditions for sleep, then let it happen</li></ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">If sleep anxiety persists despite self-help strategies, consider Cognitive Behavioral Therapy for Insomnia (CBT-I). It directly addresses the thoughts and behaviors perpetuating sleep anxiety and is highly effective.</p>

        <BeforeAfter before={{title: 'Sleep-Anxious Pattern', content: <ul className="list-disc pl-5 space-y-2"><li>Dreading bedtime hours in advance</li><li>Lying in bed, mind racing with sleep worries</li><li>Calculating hours of potential sleep remaining</li><li>Catastrophizing next day if sleep doesn't come</li><li>Watching clock, growing more anxious each minute</li><li>Trying desperately to "make" sleep happen</li></ul>}} after={{title: 'Healthier Pattern', content: <ul className="list-disc pl-5 space-y-2"><li>Going to bed only when sleepy</li><li>Accepting some nights will be difficult</li><li>Leaving bed if not asleep within 20 minutes</li><li>Trusting body's ability to sleep eventually</li><li>Not checking time during night</li><li>Creating conditions for sleep, then letting go</li></ul>}} />

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Sleep anxiety creates the insomnia it fears</strong>---worry increases arousal, preventing sleep.</li><li><strong>Trying harder to sleep makes it worse</strong>---effort paradox.</li><li><strong>Paradoxical intention works</strong>: try to stay awake instead of forcing sleep.</li><li><strong>Cognitive restructuring reduces catastrophic thinking</strong> about sleep loss.</li><li><strong>Acceptance-based approaches help</strong>: stop fighting, allow the experience.</li><li><strong>CBT-I is effective</strong> for sleep anxiety when self-help isn't enough.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(20),
    slug: 'when-to-see-sleep-specialist-signs-more-than-bad-night',
    title: "When to See a Sleep Specialist: Signs It's More Than Just a Bad Night",
    description: "Not all sleep problems require medical intervention, but some do. Learn when to seek professional help and what to expect from a sleep evaluation.",
    image: "/images/articles/cat09/cover-020.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sleep Specialist', 'Sleep Medicine', 'Diagnosis', 'Treatment'],
    citations: [
      { id: '1', text: 'When to refer to a sleep specialist', source: 'American Academy of Sleep Medicine', year: '2021', link: 'https://aasm.org/clinical-resources/practice-standards/', tier: 4 },
      { id: '2', text: 'Polysomnography: indications and procedures', source: 'Sleep Medicine Clinics', year: '2020', link: 'https://doi.org/10.1016/j.jsmc.2020.02.001', tier: 1 },
      { id: '3', text: 'Home sleep apnea testing', source: 'Journal of Clinical Sleep Medicine', year: '2019', link: 'https://doi.org/10.5664/jcsm.7768', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Everyone has occasional bad nights. But when sleep problems persist despite good sleep hygiene, or when they significantly impair your daily life, it's time to seek professional evaluation.
          </p>
          <p className="mb-6">
            Sleep specialists (physicians board-certified in sleep medicine) diagnose and treat the full range of sleep disorders---from insomnia and sleep apnea to narcolepsy and parasomnias. Knowing when to seek their expertise can be the difference between years of struggling and effective treatment.
          </p>
        </div>

        <h2 id="red-flags" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Red Flags: When to Seek Help
        </h2>
        <ArticleCallout variant="warning"><p><strong>Seek evaluation if you experience any of the following:</strong></p></ArticleCallout>

        <ArticleAccordion type="multiple" items={[{id: 'chronic-insomnia', title: "Chronic Insomnia (3+ Months)", content: <p>Difficulty falling asleep, staying asleep, or early waking that occurs 3+ nights/week for 3+ months despite good sleep hygiene.</p>}, {id: 'snoring-breathing', title: "Loud Snoring + Breathing Pauses", content: <p>Partner reports loud snoring, gasping, or pauses in breathing during sleep. Strong indicator of sleep apnea <Citation id="1" index={1} source="American Academy of Sleep Medicine" year="2021" tier={4} />.</p>}, {id: 'excessive-sleepiness', title: 'Excessive Daytime Sleepiness', content: <p>Falling asleep during activities (driving, meetings, conversations) despite adequate nighttime sleep.</p>}, {id: 'unusual-behaviors', title: 'Unusual Sleep Behaviors', content: <p>Sleepwalking, violent movements during sleep, acting out dreams, sleep-related eating.</p>}, {id: 'restless-legs', title: 'Irresistible Urge to Move Legs', content: <p>Uncomfortable sensations in legs that worsen at rest and in evening, relieved by movement.</p>}, {id: 'mental-health', title: "Sleep + Mental Health Comorbidity", content: <p>Sleep problems co-occurring with depression, anxiety, PTSD that don't improve with mental health treatment alone.</p>}]} />

        <h2 id="what-to-expect" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What to Expect: The Sleep Evaluation Process
        </h2>
        <ProgressSteps variant="vertical" steps={[{title: 'Initial Consultation', description: <p>Detailed sleep history: sleep schedule, symptoms, medical history, medications, sleep hygiene practices. Often includes questionnaires (Epworth Sleepiness Scale, sleep diaries).</p>}, {title: 'Physical Exam', description: <p>Assessment of airway, neck circumference, body weight, neurological exam. May identify structural issues contributing to sleep disorders.</p>}, {title: "Sleep Study (If Needed)", description: <p>Polysomnography (PSG) or home sleep apnea test monitors brain waves, breathing, oxygen, heart rate, and movement during sleep <Citation id="2" index={2} source="Sleep Medicine Clinics" year="2020" tier={1} />.</p>}, {title: 'Diagnosis & Treatment Plan', description: <p>Based on findings, specialist provides diagnosis and evidence-based treatment options (CPAP, CBT-I, medication, lifestyle changes).</p>}]} />

        <h2 id="types-of-studies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Types of Sleep Studies
        </h2>
        <ComparisonTable title="In-Lab vs. Home Sleep Testing" columns={['Feature', 'In-Lab PSG', 'Home Sleep Test']} items={[{feature: 'Setting', values: ['Sleep lab overnight', 'Your own bedroom']}, {feature: 'Measures', values: ['Full monitoring (brain, breathing, heart, movement)', 'Limited (breathing, oxygen, heart)']}, {feature: 'Best for', values: ['Complex cases, parasomnias, narcolepsy', 'Suspected sleep apnea (uncomplicated)']}, {feature: 'Cost', values: ['Higher', 'Lower']}, {feature: 'Convenience', values: ['Less convenient', 'More convenient']}]} />

        <h2 id="finding-specialist" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Find a Sleep Specialist
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li><strong>Ask your primary care provider</strong> for a referral</li><li><strong>Search AASM directory</strong>: aasm.org/clinical-resources/sleep-center-directory/</li><li><strong>Check insurance network</strong> for in-network sleep medicine physicians</li><li><strong>Look for board certification</strong> in sleep medicine (MD or DO with subspecialty training)</li></ul>

        <h2 id="before-appointment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Prepare for Your Appointment
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li>Keep a sleep diary for 1-2 weeks (bedtime, wake time, quality, naps)</li><li>List all medications and supplements</li><li>Note any medical conditions or recent life stressors</li><li>Ask your partner about observed symptoms (snoring, movements)</li><li>Write down questions and concerns</li></ul>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Seek help if sleep problems persist 3+ months</strong> despite good sleep hygiene.</li><li><strong>Red flags include loud snoring, breathing pauses, excessive daytime sleepiness, unusual behaviors</strong>.</li><li><strong>Sleep evaluation includes history, physical exam, and possibly a sleep study</strong>.</li><li><strong>Many sleep disorders are highly treatable</strong> once properly diagnosed.</li><li><strong>Don't wait years</strong>---early intervention prevents complications and improves quality of life.</li></ul></ArticleCallout>
      </>
    ),
  },
];
