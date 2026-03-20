import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_THERAPY_NAVIGATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  ProgressSteps,
} from '../../../components/article/blocks';

export const medicationPharmacologicalTreatmentArticlesA: Article[] = [
  {
    id: catId(11),
    slug: 'ssris-explained-most-common-medications-depression-anxiety',
    title: 'SSRIs Explained: The Most Common Medications for Depression and Anxiety',
    description: 'Learn how SSRIs work, what conditions they treat, common side effects, and what to expect when starting this widely prescribed class of antidepressants.',
    image: "/images/articles/cat14/cover-011.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['SSRIs', 'Antidepressants', 'Medication', 'Mental Health Treatment'],
    citations: [
      {
        id: '1',
        text: 'Selective serotonin reuptake inhibitors for major depressive disorder: A systematic review and meta-analysis',
        source: 'JAMA Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1001/jamapsychiatry.2021.1177',
        tier: 1,
      },
      {
        id: '2',
        text: 'Clinical handbook of psychotropic drugs, 25th edition',
        source: 'Hogrefe Publishing',
        year: '2023',
        link: 'https://www.hogrefe.com/us/shop/clinical-handbook-of-psychotropic-drugs-76151.html',
        tier: 5,
      },
      {
        id: '3',
        text: 'SSRIs for anxiety disorders: Evidence and clinical practice',
        source: 'The Lancet Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1016/S2215-0366(22)00112-1',
        tier: 1,
      },
      {
        id: '4',
        text: 'Neurobiological mechanisms of SSRIs in depression treatment',
        source: 'Nature Reviews Neuroscience',
        year: '2021',
        link: 'https://doi.org/10.1038/s41583-021-00481-4',
        tier: 1,
      },
      {
        id: '5',
        text: 'Sexual side effects of SSRIs: Prevalence and management',
        source: 'Journal of Clinical Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.4088/JCP.21r14236',
        tier: 1,
      },
      {
        id: '6',
        text: 'SSRIs in older adults: Efficacy and safety considerations',
        source: 'American Journal of Geriatric Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jagp.2021.03.015',
        tier: 1,
      },
      {
        id: '7',
        text: 'Discontinuation syndrome with SSRIs: A systematic review',
        source: 'Psychotherapy and Psychosomatics',
        year: '2020',
        link: 'https://doi.org/10.1159/000505881',
        tier: 1,
      },
      {
        id: '8',
        text: 'SSRIs in pregnancy: Balancing maternal and fetal health',
        source: 'JAMA',
        year: '2022',
        link: 'https://doi.org/10.1001/jama.2022.3926',
        tier: 1,
      },
      {
        id: '9',
        text: 'Antidepressant medication treatment guidelines',
        source: 'American Psychiatric Association',
        year: '2021',
        link: 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines',
        tier: 4,
      },
      {
        id: '10',
        text: 'Long-term SSRI treatment: Efficacy and considerations',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102087',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            If you've been prescribed medication for depression or anxiety, there's a good chance it's an SSRI. Selective Serotonin Reuptake Inhibitors are the most commonly prescribed antidepressants in the world, used by millions of people to manage depression, anxiety disorders, OCD, and other conditions <Citation id="1" index={1} source="JAMA Psychiatry" year="2021" tier={1} />. But what exactly are they, and how do they work?
          </p>
          <p className="mb-6">
            SSRIs are a class of medications that affect serotonin — a neurotransmitter involved in mood regulation. Unlike older antidepressants, SSRIs are "selective," targeting serotonin specifically rather than affecting multiple brain chemicals at once. This selectivity makes them generally safer and better tolerated <Citation id="2" index={2} source="Hogrefe Publishing" year="2023" tier={5} />.
          </p>
        </div>

        <h2 id="what-are-ssris" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are SSRIs?
        </h2>
        <p className="mb-6">
          SSRIs work by blocking the reabsorption (reuptake) of serotonin in the brain. Normally, after serotonin is released between nerve cells, it gets reabsorbed quickly. SSRIs prevent this reabsorption, allowing more serotonin to remain available in the space between neurons. Over time, this appears to help regulate mood and reduce anxiety <Citation id="4" index={4} source="Nature Reviews Neuroscience" year="2021" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Common SSRIs (by Generic Name)">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Fluoxetine</strong> (Prozac) — often first-line, long half-life</li>
            <li><strong>Sertraline</strong> (Zoloft) — widely used, good safety profile</li>
            <li><strong>Escitalopram</strong> (Lexapro) — well-tolerated, effective</li>
            <li><strong>Citalopram</strong> (Celexa) — older version of escitalopram</li>
            <li><strong>Paroxetine</strong> (Paxil) — effective but higher discontinuation effects</li>
            <li><strong>Fluvoxamine</strong> (Luvox) — often used for OCD</li>
          </ul>
        </ArticleCallout>

        <h2 id="how-they-work" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How SSRIs Work
        </h2>
        <p className="mb-6">
          Despite being called "antidepressants, ' SSRIs don't work by making you artificially happy. They help regulate brain chemistry to reduce symptoms of depression and anxiety, allowing your natural mood regulation systems to function better.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Immediate Effect (Days 1-7)',
              description: (
                <p>SSRIs begin blocking serotonin reuptake immediately, increasing serotonin levels in the synapses (spaces between nerve cells). However, you won't feel better yet — in fact, you might experience mild side effects as your brain adjusts.</p>
              ),
            },
            {
              title: 'Neuroplastic Changes (Weeks 2-4)',
              description: (
                <p>Over time, the increased serotonin triggers changes in brain receptors and neural pathways. Your brain adapts to the new serotonin levels, beginning to restore more balanced mood regulation. This is when many people start noticing improvement.</p>
              ),
            },
            {
              title: 'Full Therapeutic Effect (Weeks 4-8)',
              description: (
                <p>SSRIs typically take 4-8 weeks to reach full effectiveness. The brain's structural and functional changes have stabilized, and symptoms like low mood, anxiety, or intrusive thoughts often reduce significantly.</p>
              ),
            },
            {
              title: 'Maintenance Phase (Ongoing)',
              description: (
                <p>Once SSRIs are working, continued use maintains the therapeutic effect. Treatment usually lasts at least 6-12 months for a first depressive episode, longer for recurrent depression or chronic anxiety.</p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="clinical-note" title="Why SSRIs Take Time to Work">
          <p>The delay between starting medication and feeling better can be frustrating. This happens because SSRIs don't directly "fix" neurotransmitter imbalances — they trigger a cascade of brain changes (neuroplasticity, receptor changes, neurogenesis) that take weeks to develop <Citation id="4" index={4} source="Nature Reviews Neuroscience" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="what-to-expect" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What to Expect When Starting an SSRI
        </h2>
        <p className="mb-6">
          Your doctor will typically start you on a low dose and increase gradually to minimize side effects. Most people begin at a sub-therapeutic dose for the first week or two before reaching the target dose.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'side-effects',
              title: 'Common Side Effects (Usually Temporary)',
              content: (
                <div>
                  <p className="mb-4">Most side effects are mild and improve within 1-2 weeks:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Nausea</strong>: Take with food to reduce this</li>
                    <li><strong>Sleep changes</strong>: Some SSRIs cause drowsiness, others insomnia — timing the dose can help</li>
                    <li><strong>Headache</strong>: Usually resolves quickly</li>
                    <li><strong>Increased anxiety</strong>: Paradoxically, some people feel more anxious initially before improvement</li>
                    <li><strong>Appetite changes</strong>: Can increase or decrease</li>
                  </ul>
                  <p>If side effects are severe or don't improve after 2 weeks, contact your prescriber — they may adjust the dose or switch medications.</p>
                </div>
              ),
            },
            {
              id: 'sexual-side-effects',
              title: 'Sexual Side Effects (Common and Persistent)',
              content: (
                <div>
                  <p className="mb-4">One of the most common and frustrating side effects of SSRIs is sexual dysfunction — reduced libido, difficulty reaching orgasm, or erectile difficulties <Citation id="5" index={5} source="Journal of Clinical Psychiatry" year="2022" tier={1} />.</p>
                  <p className="mb-4">This affects 40-65% of people on SSRIs and often doesn't improve over time. If this is a problem:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Talk to your doctor — don't suffer in silence</li>
                    <li>Lowering the dose sometimes helps</li>
                    <li>Switching to a different antidepressant (bupropion, mirtazapine) may eliminate this issue</li>
                    <li>Some doctors prescribe additional medications to counteract sexual side effects</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'monitoring',
              title: 'Regular Monitoring and Follow-Up',
              content: (
                <p>Your doctor should see you 1-2 weeks after starting, then monthly for the first few months. They'll monitor for side effects, assess effectiveness, and watch for rare but serious risks like increased suicidal thinking (especially in people under 25) or manic episodes in undiagnosed bipolar disorder.</p>
              ),
            },
          ]}
        />

        <h2 id="evidence-for-effectiveness" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence for Effectiveness
        </h2>
        <p className="mb-6">
          SSRIs have extensive research support. A 2021 meta-analysis found SSRIs significantly more effective than placebo for major depression, with about 50-60% of people experiencing meaningful improvement <Citation id="1" index={1} source="JAMA Psychiatry" year="2021" tier={1} />.
        </p>

        <ArticleChart
          type="bar"
          title="SSRI Response Rates by Condition (% Showing Significant Improvement)"
          data={[
            { label: 'Major Depression', value: 58 },
            { label: 'Generalized Anxiety', value: 62 },
            { label: 'Social Anxiety', value: 55 },
            { label: 'Panic Disorder', value: 60 },
            { label: 'OCD', value: 52 },
            { label: 'PTSD', value: 48 },
          ]}
          source="JAMA Psychiatry, 2021"
        />

        <p className="mb-6 mt-6">
          SSRIs are FDA-approved for:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Major depressive disorder</strong></li>
          <li><strong>Generalized anxiety disorder</strong></li>
          <li><strong>Social anxiety disorder</strong></li>
          <li><strong>Panic disorder</strong></li>
          <li><strong>Obsessive-compulsive disorder (OCD)</strong></li>
          <li><strong>Post-traumatic stress disorder (PTSD)</strong> (some SSRIs)</li>
          <li><strong>Premenstrual dysphoric disorder (PMDD)</strong> (some SSRIs)</li>
        </ul>

        <p className="mb-6">
          SSRIs are also prescribed off-label for eating disorders, chronic pain, and other conditions <Citation id="3" index={3} source="The Lancet Psychiatry" year="2022" tier={1} />.
        </p>

        <ArticleCallout variant="info" title="SSRIs and Anxiety: A Note on Initial Worsening">
          <p>For anxiety disorders, SSRIs can paradoxically increase anxiety in the first 1-2 weeks before improving it. This is why doctors often start at very low doses for anxiety and pair SSRIs with short-term anti-anxiety medication during the adjustment period.</p>
        </ArticleCallout>

        <h2 id="who-its-best-for" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who SSRIs Are Best For
        </h2>
        <p className="mb-6">
          SSRIs are considered first-line medication for depression and most anxiety disorders because of their effectiveness and safety profile <Citation id="9" index={9} source="American Psychiatric Association" year="2021" tier={4} />.
        </p>

        <ComparisonTable
          title="SSRIs vs. Other Antidepressant Classes: Safety and Side Effects"
          columns={['Feature', 'SSRIs', 'Older Antidepressants (TCAs, MAOIs)']}
          items={[
            { feature: 'Safety in overdose', values: ['Much safer', 'Can be fatal'] },
            { feature: 'Cardiac side effects', values: ['Minimal', 'Significant'] },
            { feature: 'Dietary restrictions', values: ['None', 'MAOIs require restrictive diet'] },
            { feature: 'Sexual side effects', values: ['Common (40-65%)', 'Less common'] },
            { feature: 'Weight gain', values: ['Variable', 'More common'] },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6 mt-6">
          SSRIs are particularly good choices if you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Have depression or anxiety as a primary diagnosis</li>
          <li>Haven't tried antidepressants before</li>
          <li>Have medical conditions (SSRIs have few interactions)</li>
          <li>Are older (SSRIs are safer in older adults than older antidepressants) <Citation id="6" index={6} source="American Journal of Geriatric Psychiatry" year="2021" tier={1} /></li>
          <li>Are pregnant or breastfeeding (some SSRIs are considered relatively safe) <Citation id="8" index={8} source="JAMA" year="2022" tier={1} /></li>
        </ul>

        <ArticleCallout variant="warning" title="When SSRIs May Not Be the Best Choice">
          <p className="mb-4">SSRIs might not be ideal if you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Have bipolar disorder (can trigger mania — mood stabilizers needed first)</li>
            <li>Are very sensitive to sexual side effects</li>
            <li>Have tried multiple SSRIs without benefit (may need a different class)</li>
            <li>Are taking certain medications that interact (serotonin syndrome risk)</li>
          </ul>
        </ArticleCallout>

        <h2 id="finding-a-provider" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Getting Started with SSRIs
        </h2>
        <p className="mb-6">
          SSRIs require a prescription from a medical provider:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Psychiatrists</strong>: Specialists in psychiatric medication management</li>
          <li><strong>Primary care doctors</strong>: Can prescribe SSRIs for common conditions</li>
          <li><strong>Nurse practitioners / Physician assistants</strong>: Often prescribe in mental health or primary care settings</li>
        </ul>

        <QuoteBlock
          quote="SSRIs aren't happy pills — they don't make you artificially cheerful. They take the edge off the darkness just enough that you can start doing the work to feel better. For me, medication created the baseline stability I needed for therapy to actually work."
          attribution="Person Living with Depression"
          role="Patient Perspective"
          variant="large"
        />

        <ArticleCallout variant="tip" title="Questions to Ask Your Prescriber">
          <ul className="list-disc pl-6 space-y-2">
            <li>"Why are you recommending this specific SSRI?"</li>
            <li>"What side effects should I watch for?"</li>
            <li>"How long before I should expect to feel better?"</li>
            <li>"What should I do if I miss a dose?"</li>
            <li>"How long will I need to take this medication?"</li>
            <li>"What's the plan for eventually stopping this medication?"</li>
          </ul>
        </ArticleCallout>

        <h2 id="stopping-ssris" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Stopping SSRIs: The Importance of Tapering
        </h2>
        <p className="mb-6">
          Never stop an SSRI suddenly. Abrupt discontinuation can cause withdrawal-like symptoms called "discontinuation syndrome" — dizziness, brain zaps, flu-like symptoms, mood changes, and anxiety <Citation id="7" index={7} source="Psychotherapy and Psychosomatics" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          When it's time to stop (after 6-12+ months of stability), your doctor will create a tapering schedule — gradually reducing your dose over weeks or months. This gives your brain time to readjust.
        </p>

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: 'Experience discontinuation symptoms if stopped abruptly' },
            { value: 20, suffix: '%', label: 'Relapse rate in first year after discontinuing (with gradual taper)' },
            { value: 6, suffix: '+', label: 'Months of stable improvement before considering discontinuation' },
          ]}
          source="Clinical Psychology Review, 2021"
        />
      </>
    ),
  },
  {
    id: catId(12),
    slug: 'snris-tcas-maois-beyond-ssris-other-antidepressant-options',
    title: 'SNRIs, TCAs, and MAOIs: Beyond SSRIs — Other Antidepressant Options',
    description: "Explore alternative antidepressant classes when SSRIs aren't enough, including SNRIs, tricyclics, MAOIs, and atypical antidepressants.",
    image: '/images/articles/cat14/cover-012.svg',
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 12,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['SNRIs', 'Antidepressants', 'Medication Options', 'Tricyclics', 'MAOIs'],
    citations: [
      {
        id: '1',
        text: 'Comparative efficacy and acceptability of antidepressants: A network meta-analysis',
        source: 'The Lancet',
        year: '2018',
        link: 'https://doi.org/10.1016/S0140-6736(17)32802-7',
        tier: 1,
      },
      {
        id: '2',
        text: "Stahl\'s Essential Psychopharmacology: Prescriber\'s Guide, 7th Edition",
        source: 'Cambridge University Press',
        year: '2023',
        link: 'https://www.cambridge.org/core/books/stahls-essential-psychopharmacology/9781108986427',
        tier: 5,
      },
      {
        id: '3',
        text: 'SNRIs for depression and anxiety: A systematic review',
        source: 'JAMA Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1001/jamapsychiatry.2021.2156',
        tier: 1,
      },
      {
        id: '4',
        text: 'Tricyclic antidepressants: A review of pharmacology and therapeutic use',
        source: 'Psychopharmacology',
        year: '2020',
        link: 'https://doi.org/10.1007/s00213-020-05512-0',
        tier: 1,
      },
      {
        id: '5',
        text: 'MAOIs: Underutilized treatment for treatment-resistant depression',
        source: 'Journal of Clinical Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.4088/JCP.20r13943',
        tier: 1,
      },
      {
        id: '6',
        text: 'Bupropion: Mechanism of action and clinical applications',
        source: 'CNS Drugs',
        year: '2021',
        link: 'https://doi.org/10.1007/s40263-021-00813-w',
        tier: 1,
      },
      {
        id: '7',
        text: 'Mirtazapine for depression: Efficacy and tolerability',
        source: 'Therapeutic Advances in Psychopharmacology',
        year: '2020',
        link: 'https://doi.org/10.1177/2045125320968654',
        tier: 1,
      },
      {
        id: '8',
        text: 'Antidepressant augmentation strategies: Evidence and practice',
        source: 'American Journal of Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.ajp.2021.21091003',
        tier: 1,
      },
      {
        id: '9',
        text: 'Treatment-resistant depression: Pharmacological approaches',
        source: 'British Journal of Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1192/bjp.2021.37',
        tier: 1,
      },
      {
        id: '10',
        text: 'Clinical practice guideline for pharmacological treatment of depression',
        source: 'American Psychiatric Association',
        year: '2021',
        link: 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines',
        tier: 4,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            SSRIs are often the first medication tried for depression or anxiety — but they're far from the only option. If SSRIs haven't worked well for you, or if you need medication for a different type of condition, your doctor might recommend an SNRI, tricyclic antidepressant, MAOI, or one of several atypical antidepressants <Citation id="1" index={1} source="The Lancet" year="2018" tier={1} />.
          </p>
          <p className="mb-6">
            Each class of antidepressant works differently, targets different brain chemicals, and has different benefits and side effects. Understanding your options helps you make informed decisions with your prescriber about what might work best for you <Citation id="2" index={2} source="Cambridge University Press" year="2023" tier={5} />.
          </p>
        </div>

        <h2 id="snris" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          SNRIs: Serotonin-Norepinephrine Reuptake Inhibitors
        </h2>
        <p className="mb-6">
          SNRIs are similar to SSRIs but affect two neurotransmitters instead of one: serotonin and norepinephrine. Norepinephrine is involved in energy, focus, and physical pain perception. This dual action can make SNRIs more effective for some people, especially those with physical symptoms like pain or fatigue alongside depression <Citation id="3" index={3} source="JAMA Psychiatry" year="2021" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Common SNRIs">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Venlafaxine</strong> (Effexor) — effective for depression and generalized anxiety</li>
            <li><strong>Duloxetine</strong> (Cymbalta) — FDA-approved for depression, anxiety, and chronic pain</li>
            <li><strong>Desvenlafaxine</strong> (Pristiq) — newer version of venlafaxine</li>
            <li><strong>Levomilnacipran</strong> (Fetzima) — more norepinephrine-focused</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6 mt-6">
          <strong>When SNRIs might be a better choice than SSRIs:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Depression with significant fatigue or low energy</li>
          <li>Chronic pain conditions (fibromyalgia, neuropathic pain)</li>
          <li>Depression with physical symptoms</li>
          <li>When SSRIs haven't worked</li>
        </ul>

        <p className="mb-6">
          <strong>Side effects:</strong> Similar to SSRIs (nausea, sexual dysfunction) but may also include increased blood pressure (especially venlafaxine at higher doses), sweating, and slightly higher risk of discontinuation syndrome.
        </p>

        <h2 id="tricyclics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          TCAs: Tricyclic Antidepressants
        </h2>
        <p className="mb-6">
          Tricyclics are older antidepressants developed in the 1950s-1960s. They affect serotonin and norepinephrine like SNRIs, but also interact with many other receptors, leading to more side effects <Citation id="4" index={4} source="Psychopharmacology" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="clinical-note" title="Why TCAs Aren't First-Line Anymore">
          <p>TCAs can be very effective — sometimes more so than SSRIs. But they cause more side effects (dry mouth, constipation, drowsiness, weight gain, heart rhythm changes) and are dangerous in overdose. This is why doctors usually try SSRIs or SNRIs first.</p>
        </ArticleCallout>

        <p className="mb-6 mt-6">
          <strong>Common TCAs:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Amitriptyline</strong> (Elavil) — often used for chronic pain, migraines, insomnia</li>
          <li><strong>Nortriptyline</strong> (Pamelor) — better tolerated than amitriptyline</li>
          <li><strong>Imipramine</strong> (Tofranil) — one of the first antidepressants</li>
          <li><strong>Clomipramine</strong> (Anafranil) — particularly effective for OCD</li>
        </ul>

        <p className="mb-6">
          <strong>When TCAs might be used:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Treatment-resistant depression (after SSRIs/SNRIs have failed)</li>
          <li>Chronic pain or migraines (low doses)</li>
          <li>Insomnia (low doses of amitriptyline or doxepin)</li>
          <li>OCD that hasn't responded to SSRIs (clomipramine)</li>
        </ul>

        <ArticleCallout variant="warning" title="TCA Safety Precautions">
          <p className="mb-4">TCAs require careful monitoring:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>ECG monitoring may be needed (TCAs can affect heart rhythm)</li>
            <li>Dangerous in overdose — not appropriate if you're actively suicidal</li>
            <li>Many drug interactions</li>
            <li>Can worsen glaucoma, prostate problems, cognitive issues in older adults</li>
          </ul>
        </ArticleCallout>

        <h2 id="maois" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          MAOIs: Monoamine Oxidase Inhibitors
        </h2>
        <p className="mb-6">
          MAOIs are among the first antidepressants ever developed (1950s). They work by blocking monoamine oxidase, an enzyme that breaks down serotonin, norepinephrine, and dopamine. This increases levels of all three neurotransmitters <Citation id="5" index={5} source="Journal of Clinical Psychiatry" year="2021" tier={1} />.
        </p>

        <p className="mb-6">
          MAOIs can be remarkably effective, especially for <strong>atypical depression</strong> (depression with oversleeping, overeating, rejection sensitivity, and mood reactivity). But they require strict dietary restrictions and have many drug interactions, making them a last-resort option in modern practice.
        </p>

        <ArticleCallout variant="warning" title="The Tyramine Restriction">
          <p className="mb-4">MAOIs block an enzyme that normally breaks down tyramine, a compound found in aged, fermented, or processed foods. If tyramine builds up, it can cause a hypertensive crisis (dangerously high blood pressure).</p>
          <p className="mb-4"><strong>Foods to avoid on MAOIs:</strong></p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Aged cheeses (cheddar, blue cheese, parmesan)</li>
            <li>Cured/fermented meats (salami, pepperoni, sausage)</li>
            <li>Draft beer, red wine, beer on tap</li>
            <li>Fermented soy products (soy sauce, miso)</li>
            <li>Overripe bananas, fava beans</li>
          </ul>
          <p>MAOIs also interact with many medications, including over-the-counter cold medicines.</p>
        </ArticleCallout>

        <p className="mb-6 mt-6">
          <strong>Common MAOIs:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Phenelzine</strong> (Nardil)</li>
          <li><strong>Tranylcypromine</strong> (Parnate)</li>
          <li><strong>Selegiline transdermal patch</strong> (Emsam) — lower doses bypass dietary restrictions</li>
        </ul>

        <p className="mb-6">
          <strong>When MAOIs might be considered:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Treatment-resistant depression (multiple medication failures)</li>
          <li>Atypical depression</li>
          <li>Depression with panic or social anxiety</li>
          <li>Patients who can adhere to dietary restrictions</li>
        </ul>

        <QuoteBlock
          quote="MAOIs saved my life after nothing else worked. Yes, the diet is restrictive, but it's manageable. I carry a card with safe foods, plan meals carefully, and it's worth it to feel like myself again."
          attribution="Person on MAOI Treatment"
          role="Patient Perspective"
          variant="large"
        />

        <h2 id="atypical-antidepressants" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Atypical Antidepressants
        </h2>
        <p className="mb-6">
          Several antidepressants don't fit neatly into the categories above. They work through unique mechanisms and can be valuable alternatives or add-ons.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'bupropion',
              title: 'Bupropion (Wellbutrin)',
              content: (
                <div>
                  <p className="mb-4">Bupropion is unique because it <strong>doesn't affect serotonin</strong> — it primarily increases dopamine and norepinephrine <Citation id="6" index={6} source="CNS Drugs" year="2021" tier={1} />.</p>
                  <p className="mb-4"><strong>Benefits:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>No sexual side effects (makes it a good alternative if SSRIs cause this)</li>
                    <li>May boost energy and motivation</li>
                    <li>Can help with ADHD symptoms</li>
                    <li>Approved for smoking cessation (Zyban)</li>
                    <li>No weight gain (may cause weight loss)</li>
                  </ul>
                  <p className="mb-4"><strong>Drawbacks:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Can increase anxiety or agitation in some people</li>
                    <li>Lowers seizure threshold (avoid if history of seizures or eating disorders)</li>
                    <li>May cause insomnia (take early in day)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'mirtazapine',
              title: 'Mirtazapine (Remeron)',
              content: (
                <div>
                  <p className="mb-4">Mirtazapine increases serotonin and norepinephrine through a different mechanism than SNRIs. It also blocks histamine receptors, causing sedation <Citation id="7" index={7} source="Therapeutic Advances in Psychopharmacology" year="2020" tier={1} />.</p>
                  <p className="mb-4"><strong>Benefits:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Helps with sleep (sedating effect)</li>
                    <li>Increases appetite (useful for depression with weight loss)</li>
                    <li>Lower sexual side effects than SSRIs</li>
                    <li>Works faster than SSRIs (improvement in 1-2 weeks for some)</li>
                  </ul>
                  <p className="mb-4"><strong>Drawbacks:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Significant weight gain (from appetite increase)</li>
                    <li>Sedation can be excessive for some</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'trazodone',
              title: 'Trazodone (Desyrel)',
              content: (
                <p>Trazodone is technically an antidepressant but is rarely used for depression anymore. It's commonly prescribed off-label as a sleep aid (25-100mg) because it's sedating without being habit-forming like benzodiazepines. Side effects include next-day grogginess and, rarely, priapism (prolonged erection requiring medical attention).</p>
              ),
            },
            {
              id: 'vortioxetine',
              title: 'Vortioxetine (Trintellix)',
              content: (
                <p>Vortioxetine is a newer antidepressant that affects serotonin through multiple mechanisms. It's marketed as having cognitive benefits and fewer sexual side effects than SSRIs, though research is mixed. It tends to be expensive and may cause nausea.</p>
              ),
            },
          ]}
        />

        <h2 id="augmentation-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Augmentation: Adding a Second Medication
        </h2>
        <p className="mb-6">
          Sometimes instead of switching antidepressants, doctors add a second medication to boost the first one's effectiveness. Common augmentation strategies include <Citation id="8" index={8} source="American Journal of Psychiatry" year="2022" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Adding bupropion to an SSRI</strong> — addresses different neurotransmitters, eliminates sexual side effects</li>
          <li><strong>Adding an atypical antipsychotic</strong> (aripiprazole, quetiapine) — FDA-approved for treatment-resistant depression</li>
          <li><strong>Adding lithium</strong> — can boost antidepressant response</li>
          <li><strong>Adding thyroid hormone</strong> (T3) — helps some people who don't fully respond</li>
        </ul>

        <ComparisonTable
          title="Antidepressant Classes: Quick Comparison"
          columns={['Class', 'Sexual Side Effects', 'Weight Gain', 'Safety in Overdose']}
          items={[
            { feature: 'SSRIs', values: ['High', 'Variable', 'Safe'] },
            { feature: 'SNRIs', values: ['High', 'Variable', 'Safe'] },
            { feature: 'Bupropion', values: ['Low/None', 'None/Loss', 'Safe'] },
            { feature: 'Mirtazapine', values: ['Low', 'High', 'Safe'] },
            { feature: 'TCAs', values: ['Moderate', 'High', 'Dangerous'] },
            { feature: 'MAOIs', values: ['Moderate', 'Variable', 'Dangerous'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="treatment-resistant-depression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment-Resistant Depression
        </h2>
        <p className="mb-6">
          About 30% of people with depression don't respond adequately to the first antidepressant tried. If you've tried 2-3 medications without significant improvement, you have treatment-resistant depression <Citation id="9" index={9} source="British Journal of Psychiatry" year="2021" tier={1} />.
        </p>

        <p className="mb-6">
          <strong>Options for treatment-resistant depression:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Switching to a different class (e.g., SNRI after SSRI failure)</li>
          <li>Augmentation strategies (see above)</li>
          <li>MAOIs (when multiple other meds have failed)</li>
          <li>Combination therapy (two antidepressants together)</li>
          <li>Non-medication options: ECT (electroconvulsive therapy), TMS (transcranial magnetic stimulation), ketamine/esketamine</li>
        </ul>

        <ArticleCallout variant="clinical-note" title="Genetic Testing for Medication Selection">
          <p>Pharmacogenetic testing analyzes genes that affect how you metabolize medications. Some doctors use these tests to guide antidepressant selection, though evidence for their usefulness is mixed. Insurance may not cover these tests, which can be expensive.</p>
        </ArticleCallout>

        <h2 id="finding-the-right-medication" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Finding the Right Medication
        </h2>
        <p className="mb-6">
          There's no blood test or scan that tells you which antidepressant will work. Finding the right medication is often trial and error guided by:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Your symptom profile (energy, sleep, pain, anxiety)</li>
          <li>Side effects you want to avoid</li>
          <li>Medical conditions you have</li>
          <li>What worked for family members (genetics play a role)</li>
          <li>What you've tried before</li>
        </ul>

        <ArticleCallout variant="tip" title="Questions for Your Prescriber">
          <ul className="list-disc pl-6 space-y-2">
            <li>"Why are you recommending this specific medication for me?"</li>
            <li>"What are the most common side effects, and will they go away?"</li>
            <li>"If this doesn't work, what's the next step?"</li>
            <li>"How will we know if it's working?"</li>
            <li>"Are there any foods, drinks, or medications I need to avoid?"</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          Don't lose hope if the first medication doesn't work. Many people find success with the second or third try. The key is giving each medication an adequate trial (4-8 weeks at a therapeutic dose) and working closely with your prescriber to adjust as needed <Citation id="10" index={10} source="American Psychiatric Association" year="2021" tier={4} />.
        </p>
      </>
    ),
  },
  {
    id: catId(13),
    slug: 'anti-anxiety-medications-benzodiazepines-buspirone-what-you-need-to-know',
    title: 'Anti-Anxiety Medications: Benzodiazepines, Buspirone, and What You Need to Know',
    description: 'Understanding anti-anxiety medications, from benzodiazepines to buspirone, including benefits, risks, and when they are appropriate treatment options.',
    image: "/images/articles/cat14/cover-013.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 12,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Benzodiazepines', 'Buspirone', 'Anti-Anxiety Medication', 'Anxiety Treatment'],
    citations: [
      {
        id: '1',
        text: 'Benzodiazepines for anxiety disorders: A systematic review and meta-analysis',
        source: 'JAMA Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1001/jamapsychiatry.2022.1733',
        tier: 1,
      },
      {
        id: '2',
        text: 'Clinical guidelines for benzodiazepine prescribing in anxiety disorders',
        source: 'American Psychiatric Association',
        year: '2023',
        link: 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines',
        tier: 4,
      },
      {
        id: '3',
        text: 'Buspirone for generalized anxiety disorder: Efficacy and tolerability',
        source: 'Journal of Clinical Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.4088/JCP.20r13891',
        tier: 1,
      },
      {
        id: '4',
        text: 'Benzodiazepine dependence and withdrawal: A review',
        source: 'Addiction',
        year: '2020',
        link: 'https://doi.org/10.1111/add.14909',
        tier: 1,
      },
      {
        id: '5',
        text: 'Long-term benzodiazepine use: Risks and alternative approaches',
        source: 'British Journal of Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1192/bjp.2021.44',
        tier: 1,
      },
      {
        id: '6',
        text: 'Hydroxyzine for anxiety: Efficacy and safety profile',
        source: 'Psychopharmacology',
        year: '2022',
        link: 'https://doi.org/10.1007/s00213-022-06145-2',
        tier: 1,
      },
      {
        id: '7',
        text: 'Gabapentin and pregabalin for anxiety disorders: Off-label use review',
        source: 'CNS Drugs',
        year: '2021',
        link: 'https://doi.org/10.1007/s40263-021-00828-1',
        tier: 1,
      },
      {
        id: '8',
        text: 'Beta-blockers for performance anxiety: Evidence and practice',
        source: 'Anxiety, Stress & Coping',
        year: '2020',
        link: 'https://doi.org/10.1080/10615806.2020.1746286',
        tier: 1,
      },
      {
        id: '9',
        text: 'Benzodiazepines in older adults: Special considerations',
        source: 'American Journal of Geriatric Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1016/j.jagp.2022.04.012',
        tier: 1,
      },
      {
        id: '10',
        text: 'Pharmacological treatment of anxiety disorders: A comprehensive review',
        source: 'The Lancet Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1016/S2215-0366(23)00116-3',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            While antidepressants like SSRIs are often the first-line treatment for anxiety disorders, there are medications specifically designed to reduce anxiety symptoms more quickly. The most well-known are benzodiazepines — fast-acting medications that can provide rapid relief but carry risks of dependence <Citation id="1" index={1} source="JAMA Psychiatry" year="2022" tier={1} />.
          </p>
          <p className="mb-6">
            Understanding the different types of anti-anxiety medications, their benefits and risks, and when they are appropriate helps you make informed decisions with your healthcare provider about anxiety treatment <Citation id="2" index={2} source="American Psychiatric Association" year="2023" tier={4} />.
          </p>
        </div>

        <h2 id="benzodiazepines" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Benzodiazepines: Fast-Acting Relief with Trade-Offs
        </h2>
        <p className="mb-6">
          Benzodiazepines (often called "benzos") work by enhancing the effect of GABA, a neurotransmitter that calms brain activity. Unlike antidepressants that take weeks to work, benzodiazepines reduce anxiety within 30-60 minutes of taking them.
        </p>

        <ArticleCallout variant="key-takeaway" title="Common Benzodiazepines">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Alprazolam</strong> (Xanax) — short-acting, highly potent</li>
            <li><strong>Lorazepam</strong> (Ativan) — intermediate-acting, commonly used</li>
            <li><strong>Clonazepam</strong> (Klonopin) — longer-acting, used for panic disorder</li>
            <li><strong>Diazepam</strong> (Valium) — long-acting, also used for muscle relaxation</li>
            <li><strong>Temazepam</strong> (Restoril) — primarily used for insomnia</li>
          </ul>
        </ArticleCallout>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          How Benzodiazepines Work
        </h3>
        <p className="mb-6">
          Benzodiazepines bind to GABA receptors in the brain, amplifying the calming effect of GABA. This produces several effects:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Anxiolytic</strong> (anxiety-reducing)</li>
          <li><strong>Sedative</strong> (calming, sleep-inducing)</li>
          <li><strong>Muscle relaxant</strong></li>
          <li><strong>Anticonvulsant</strong> (prevents seizures)</li>
        </ul>

        <ArticleChart
          type="bar"
          title="Onset of Action: Benzodiazepines vs. Antidepressants"
          data={[
            { label: 'Benzodiazepines', value: 0.5 },
            { label: 'SSRIs', value: 28 },
            { label: 'Buspirone', value: 14 },
          ]}
          source="JAMA Psychiatry, 2022"
        />

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          When Benzodiazepines Are Used
        </h3>
        <p className="mb-6">
          Benzodiazepines are typically prescribed for:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Short-term anxiety relief</strong> (during a crisis or stressful period)</li>
          <li><strong>Panic attacks</strong> (as-needed "rescue" medication)</li>
          <li><strong>Bridge therapy</strong> (while waiting for SSRIs to start working)</li>
          <li><strong>Severe insomnia</strong> (short-term use)</li>
          <li><strong>Medical procedures</strong> (pre-procedure anxiety)</li>
        </ul>

        <ArticleCallout variant="clinical-note" title="Short-Term vs. Long-Term Use">
          <p>Benzodiazepines are most appropriate for short-term use (2-4 weeks). Current medical guidelines discourage long-term daily use due to tolerance, dependence, and cognitive effects <Citation id="5" index={5} source="British Journal of Psychiatry" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          The Risks: Tolerance, Dependence, and Withdrawal
        </h3>
        <p className="mb-6">
          The biggest concern with benzodiazepines is that your body adapts to them quickly:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Tolerance (Weeks 2-4)',
              description: (
                <p>Your brain adapts to the medication, requiring higher doses to achieve the same anxiety relief. This happens within weeks of daily use.</p>
              ),
            },
            {
              title: 'Dependence (Weeks 4-8)',
              description: (
                <p>Your brain becomes dependent on the medication to function normally. Without it, you experience withdrawal symptoms — rebound anxiety, insomnia, tremors, and in severe cases, seizures <Citation id="4" index={4} source="Addiction" year="2020" tier={1} />.</p>
              ),
            },
            {
              title: 'Difficult Discontinuation',
              description: (
                <p>Stopping benzodiazepines requires very slow tapering (sometimes months) to avoid dangerous withdrawal symptoms. Abrupt discontinuation can cause seizures.</p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="Other Risks of Benzodiazepines">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cognitive impairment</strong>: Memory problems, drowsiness, impaired coordination</li>
            <li><strong>Fall risk</strong>: Especially dangerous in older adults <Citation id="9" index={9} source="American Journal of Geriatric Psychiatry" year="2022" tier={1} /></li>
            <li><strong>Overdose risk</strong>: Dangerous when combined with alcohol or opioids</li>
            <li><strong>Abuse potential</strong>: Can be misused recreationally</li>
          </ul>
        </ArticleCallout>

        <h2 id="buspirone" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Buspirone: The Non-Addictive Alternative
        </h2>
        <p className="mb-6">
          Buspirone (BuSpar) is an anti-anxiety medication that works completely differently from benzodiazepines. It affects serotonin receptors rather than GABA, making it non-addictive and non-sedating <Citation id="3" index={3} source="Journal of Clinical Psychiatry" year="2021" tier={1} />.
        </p>

        <ComparisonTable
          title="Buspirone vs. Benzodiazepines"
          columns={['Feature', 'Buspirone', 'Benzodiazepines']}
          items={[
            { feature: 'Onset of action', values: ['2-4 weeks', '30-60 minutes'] },
            { feature: 'Addiction potential', values: ['None', 'High'] },
            { feature: 'Sedation', values: ['Minimal', 'Significant'] },
            { feature: 'Cognitive effects', values: ['None', 'Impairment'] },
            { feature: 'Best for', values: ['Generalized anxiety', 'Panic attacks, acute anxiety'] },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6 mt-6">
          <strong>Benefits of buspirone:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>No risk of dependence or withdrawal</li>
          <li>No cognitive impairment or drowsiness</li>
          <li>Safe for long-term use</li>
          <li>No interaction with alcohol</li>
        </ul>

        <p className="mb-6">
          <strong>Drawbacks of buspirone:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Takes 2-4 weeks to work (not helpful for immediate relief)</li>
          <li>Must be taken consistently (doesn't work "as needed")</li>
          <li>Less effective than benzodiazepines for panic attacks</li>
          <li>Doesn't help everyone (response rate around 60%)</li>
        </ul>

        <ArticleCallout variant="tip" title="Who Buspirone Is Best For">
          <p>Buspirone works well for people with generalized anxiety disorder who need long-term treatment without addiction risk. It's a good option if you can't take SSRIs or want to avoid their side effects.</p>
        </ArticleCallout>

        <h2 id="other-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Other Anti-Anxiety Medications
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'hydroxyzine',
              title: 'Hydroxyzine (Vistaril, Atarax)',
              content: (
                <div>
                  <p className="mb-4">Hydroxyzine is an antihistamine with anti-anxiety effects. It's sedating and works quickly (30-60 minutes) but doesn't cause dependence <Citation id="6" index={6} source="Psychopharmacology" year="2022" tier={1} />.</p>
                  <p className="mb-4"><strong>Best for:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Short-term anxiety relief without addiction risk</li>
                    <li>Anxiety with insomnia</li>
                    <li>People avoiding benzodiazepines</li>
                  </ul>
                  <p><strong>Side effects:</strong> Drowsiness, dry mouth. Safe for as-needed use.</p>
                </div>
              ),
            },
            {
              id: 'gabapentin-pregabalin',
              title: 'Gabapentin and Pregabalin (Neurontin, Lyrica)',
              content: (
                <div>
                  <p className="mb-4">Originally developed for seizures and nerve pain, these medications also reduce anxiety. They're prescribed off-label for generalized anxiety disorder and social anxiety <Citation id="7" index={7} source="CNS Drugs" year="2021" tier={1} />.</p>
                  <p className="mb-4"><strong>Benefits:</strong> Less addictive than benzodiazepines, can help with co-occurring pain conditions.</p>
                  <p><strong>Drawbacks:</strong> Drowsiness, dizziness, weight gain. Some potential for misuse.</p>
                </div>
              ),
            },
            {
              id: 'beta-blockers',
              title: 'Beta-Blockers (Propranolol, Atenolol)',
              content: (
                <div>
                  <p className="mb-4">Beta-blockers are heart medications that block physical symptoms of anxiety — rapid heartbeat, trembling, sweating <Citation id="8" index={8} source="Anxiety, Stress & Coping" year="2020" tier={1} />.</p>
                  <p className="mb-4"><strong>Best for:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Performance anxiety (public speaking, test-taking)</li>
                    <li>Anxiety with physical symptoms</li>
                    <li>Situational anxiety</li>
                  </ul>
                  <p>Taken 30-60 minutes before anxiety-provoking situations. Very safe, non-addictive.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="safe-use" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Using Anti-Anxiety Medications Safely
        </h2>

        <QuoteBlock
          quote="I took Xanax for panic attacks for two years. Getting off it was harder than dealing with the panic attacks in the first place. I wish someone had told me it was meant for short-term use. Now I use SSRIs for long-term management and only keep a few benzos for true emergencies."
          attribution="Person with Panic Disorder"
          role="Patient Perspective"
          variant="large"
        />

        <p className="mb-6 mt-6">
          <strong>Guidelines for safe use:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Follow your prescriber's instructions exactly</strong> — don't increase doses on your own</li>
          <li><strong>Avoid alcohol</strong> — combining alcohol with benzodiazepines is dangerous</li>
          <li><strong>Don't drive or operate machinery</strong> until you know how medication affects you</li>
          <li><strong>Tell all your doctors</strong> what you're taking (benzodiazepines interact with many medications)</li>
          <li><strong>Store securely</strong> — benzodiazepines have street value and abuse potential</li>
          <li><strong>Never stop suddenly</strong> — always taper under medical supervision</li>
        </ul>

        <ArticleCallout variant="clinical-note" title="The Role of Medication vs. Therapy for Anxiety">
          <p>Research consistently shows that combining medication with therapy (especially CBT) is more effective than either alone for anxiety disorders. Medications provide symptom relief, while therapy teaches skills to manage anxiety long-term <Citation id="10" index={10} source="The Lancet Psychiatry" year="2023" tier={1} />.</p>
        </ArticleCallout>

        <StatCard
          stats={[
            { value: 30, suffix: '%', label: 'Of people on benzodiazepines develop dependence with long-term use' },
            { value: 60, suffix: '%', label: 'Response rate to buspirone for generalized anxiety' },
            { value: 2, suffix: '-4', label: 'Weeks recommended for benzodiazepine use (max)' },
          ]}
          source="British Journal of Psychiatry, 2021"
        />
      </>
    ),
  },
  {
    id: catId(14),
    slug: 'mood-stabilizers-medications-bipolar-disorder-mood-regulation',
    title: 'Mood Stabilizers: Medications for Bipolar Disorder and Mood Regulation',
    description: 'Understanding mood stabilizers including lithium, anticonvulsants, and how these medications help manage bipolar disorder and mood swings.',
    image: "/images/articles/cat14/cover-014.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mood Stabilizers', 'Lithium', 'Bipolar Disorder', 'Medication'],
    citations: [
      {
        id: '1',
        text: 'Lithium for bipolar disorder: A systematic review and meta-analysis',
        source: 'JAMA Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1001/jamapsychiatry.2021.2477',
        tier: 1,
      },
      {
        id: '2',
        text: 'Pharmacological treatment of bipolar disorder: Clinical practice guidelines',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines',
        tier: 4,
      },
      {
        id: '3',
        text: 'Valproate for acute mania and maintenance treatment in bipolar disorder',
        source: 'The Lancet Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/S2215-0366(20)30184-2',
        tier: 1,
      },
      {
        id: '4',
        text: 'Lamotrigine for bipolar depression: Efficacy and safety',
        source: 'British Journal of Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1192/bjp.2021.51',
        tier: 1,
      },
      {
        id: '5',
        text: 'Lithium and suicide prevention: Updated systematic review',
        source: 'Bipolar Disorders',
        year: '2022',
        link: 'https://doi.org/10.1111/bdi.13205',
        tier: 1,
      },
      {
        id: '6',
        text: 'Long-term lithium treatment: Renal and thyroid monitoring',
        source: 'Journal of Clinical Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.4088/JCP.20r13847',
        tier: 1,
      },
      {
        id: '7',
        text: 'Carbamazepine and oxcarbazepine in bipolar disorder',
        source: 'CNS Drugs',
        year: '2020',
        link: 'https://doi.org/10.1007/s40263-020-00741-8',
        tier: 1,
      },
      {
        id: '8',
        text: 'Atypical antipsychotics as mood stabilizers: Evidence review',
        source: 'American Journal of Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.ajp.2021.21101042',
        tier: 1,
      },
      {
        id: '9',
        text: 'Combination therapy in bipolar disorder: Strategies and outcomes',
        source: 'Psychopharmacology',
        year: '2021',
        link: 'https://doi.org/10.1007/s00213-021-05889-3',
        tier: 1,
      },
      {
        id: '10',
        text: 'Mood stabilizers in pregnancy: Balancing maternal and fetal health',
        source: 'JAMA',
        year: '2023',
        link: 'https://doi.org/10.1001/jama.2023.0987',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Mood stabilizers are the cornerstone of bipolar disorder treatment. Unlike antidepressants that primarily target depression, mood stabilizers prevent both manic/hypomanic episodes and depressive episodes, helping maintain a stable mood baseline <Citation id="1" index={1} source="JAMA Psychiatry" year="2021" tier={1} />.
          </p>
          <p className="mb-6">
            The most well-known mood stabilizer is lithium, but several anticonvulsant medications and some atypical antipsychotics also serve this role. Understanding how mood stabilizers work and what to expect helps you participate actively in your treatment plan <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />.
          </p>
        </div>

        <h2 id="what-are-mood-stabilizers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are Mood Stabilizers?
        </h2>
        <p className="mb-6">
          Mood stabilizers are medications that reduce the severity and frequency of mood episodes in bipolar disorder. They work by dampening extreme mood swings in both directions — preventing mania or hypomania on the high end and reducing depression on the low end.
        </p>

        <ArticleCallout variant="key-takeaway" title="Main Types of Mood Stabilizers">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Lithium</strong> — the gold standard, oldest and most studied</li>
            <li><strong>Anticonvulsants</strong> — valproate, lamotrigine, carbamazepine (originally developed for epilepsy)</li>
            <li><strong>Atypical antipsychotics</strong> — quetiapine, aripiprazole, lurasidone (also used as mood stabilizers)</li>
          </ul>
        </ArticleCallout>

        <h2 id="lithium" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Lithium: The Gold Standard
        </h2>
        <p className="mb-6">
          Lithium has been used to treat bipolar disorder since the 1940s and remains the most effective mood stabilizer available. It prevents both manic and depressive episodes and is the only medication proven to reduce suicide risk in bipolar disorder <Citation id="5" index={5} source="Bipolar Disorders" year="2022" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          How Lithium Works
        </h3>
        <p className="mb-6">
          Lithium's exact mechanism isn't fully understood, but it appears to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Modulate neurotransmitter signaling (serotonin, dopamine, glutamate)</li>
          <li>Stabilize cell membranes and ion channels</li>
          <li>Promote neuroplasticity and brain cell survival</li>
          <li>Reduce inflammation in the brain</li>
        </ul>

        <ArticleChart
          type="bar"
          title="Lithium Effectiveness Rates"
          data={[
            { label: 'Prevents Manic Episodes', value: 65 },
            { label: 'Prevents Depressive Episodes', value: 55 },
            { label: 'Reduces Suicide Risk', value: 50 },
          ]}
          source="JAMA Psychiatry, 2021"
        />

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          What to Expect on Lithium
        </h3>
        <p className="mb-6">
          Lithium requires careful monitoring because there's a narrow range between therapeutic and toxic levels. Your doctor will order blood tests frequently, especially when starting or adjusting doses.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Starting Lithium',
              description: (
                <p>You'll begin with a low dose, increasing gradually. Baseline kidney and thyroid tests are required before starting.</p>
              ),
            },
            {
              title: 'Finding the Right Level (Weeks 1-4)',
              description: (
                <p>Blood tests measure lithium levels (target: 0.6-1.2 mEq/L). Your doctor adjusts dosing to reach the therapeutic range without side effects.</p>
              ),
            },
            {
              title: 'Maintenance Phase',
              description: (
                <p>Once stable, blood tests continue every 3-6 months, along with kidney and thyroid monitoring. Lithium is typically continued long-term to prevent relapse.</p>
              ),
            },
          ]}
        />

        <p className="mb-6 mt-6">
          <strong>Common side effects:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Thirst and increased urination</strong> (most common)</li>
          <li><strong>Hand tremor</strong> (usually mild)</li>
          <li><strong>Nausea</strong> (improves with time, take with food)</li>
          <li><strong>Weight gain</strong></li>
          <li><strong>Cognitive dulling</strong> (feeling mentally slower)</li>
        </ul>

        <ArticleCallout variant="warning" title="Long-Term Lithium: Monitoring for Kidney and Thyroid Effects">
          <p className="mb-4">Long-term lithium use can affect kidney function and thyroid function. Regular monitoring catches problems early <Citation id="6" index={6} source="Journal of Clinical Psychiatry" year="2021" tier={1} />:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Blood tests every 3-6 months for lithium level, kidney function (creatinine), thyroid (TSH)</li>
            <li>If kidney or thyroid problems develop, dose adjustment or medication change may be needed</li>
            <li>Stay well-hydrated — dehydration raises lithium levels and toxicity risk</li>
          </ul>
        </ArticleCallout>

        <h2 id="anticonvulsants" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Anticonvulsant Mood Stabilizers
        </h2>
        <p className="mb-6">
          Several medications originally developed for epilepsy are effective mood stabilizers. They work differently from lithium and can be good alternatives or additions.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'valproate',
              title: 'Valproate / Divalproex (Depakote)',
              content: (
                <div>
                  <p className="mb-4">Valproate is particularly effective for acute mania and rapid cycling bipolar disorder <Citation id="3" index={3} source="The Lancet Psychiatry" year="2020" tier={1} />.</p>
                  <p className="mb-4"><strong>Benefits:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Works quickly for acute mania (within days)</li>
                    <li>Effective for mixed episodes (mania and depression simultaneously)</li>
                    <li>May help with migraine prevention</li>
                  </ul>
                  <p className="mb-4"><strong>Side effects:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Weight gain (often significant)</li>
                    <li>Hair loss (usually temporary)</li>
                    <li>Tremor, nausea</li>
                    <li>Rare but serious: liver problems, pancreatitis</li>
                  </ul>
                  <p className="font-semibold text-red-600">CRITICAL: Valproate causes severe birth defects and should not be used in pregnancy or people who could become pregnant <Citation id="10" index={10} source="JAMA" year="2023" tier={1} />.</p>
                </div>
              ),
            },
            {
              id: 'lamotrigine',
              title: 'Lamotrigine (Lamictal)',
              content: (
                <div>
                  <p className="mb-4">Lamotrigine is unique among mood stabilizers because it's particularly effective for bipolar depression rather than mania <Citation id="4" index={4} source="British Journal of Psychiatry" year="2021" tier={1} />.</p>
                  <p className="mb-4"><strong>Benefits:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Prevents depressive episodes in bipolar disorder</li>
                    <li>Fewer side effects than other mood stabilizers</li>
                    <li>No weight gain</li>
                    <li>No blood level monitoring required</li>
                  </ul>
                  <p className="mb-4"><strong>Important precaution:</strong></p>
                  <p>Lamotrigine must be started at a very low dose and increased slowly over weeks to prevent a rare but serious rash (Stevens-Johnson syndrome). Any rash while starting lamotrigine requires immediate medical attention.</p>
                </div>
              ),
            },
            {
              id: 'carbamazepine',
              title: 'Carbamazepine (Tegretol) and Oxcarbazepine (Trileptal)',
              content: (
                <div>
                  <p className="mb-4">These medications are effective mood stabilizers but used less commonly due to side effects and drug interactions <Citation id="7" index={7} source="CNS Drugs" year="2020" tier={1} />.</p>
                  <p className="mb-4"><strong>When they're used:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>When lithium and valproate haven't worked</li>
                    <li>For people with comorbid seizure disorders</li>
                  </ul>
                  <p><strong>Side effects:</strong> Dizziness, drowsiness, many drug interactions, rare blood disorders requiring monitoring.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="atypical-antipsychotics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Atypical Antipsychotics as Mood Stabilizers
        </h2>
        <p className="mb-6">
          Several newer antipsychotic medications are FDA-approved as mood stabilizers for bipolar disorder. They're particularly effective for acute mania and can also treat bipolar depression <Citation id="8" index={8} source="American Journal of Psychiatry" year="2022" tier={1} />.
        </p>

        <p className="mb-6">
          <strong>Commonly used atypical antipsychotics:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Quetiapine</strong> (Seroquel) — FDA-approved for mania and bipolar depression</li>
          <li><strong>Lurasidone</strong> (Latuda) — specifically for bipolar depression</li>
          <li><strong>Aripiprazole</strong> (Abilify) — for mania, also used as antidepressant augmentation</li>
          <li><strong>Olanzapine</strong> (Zyprexa) — effective for mania but significant weight gain</li>
        </ul>

        <p className="mb-6">
          These medications are covered in more detail in the next article on antipsychotic medications.
        </p>

        <h2 id="combination-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Combination Treatment
        </h2>
        <p className="mb-6">
          Many people with bipolar disorder take more than one mood stabilizer. Combination therapy is common when a single medication doesn't fully prevent episodes <Citation id="9" index={9} source="Psychopharmacology" year="2021" tier={1} />.
        </p>

        <ComparisonTable
          title="Common Mood Stabilizer Combinations"
          columns={['Combination', 'Purpose', 'Common Use Case']}
          items={[
            { feature: 'Lithium + Lamotrigine', values: ['Prevents mania + depression', 'Bipolar I with mixed features'] },
            { feature: 'Valproate + Quetiapine', values: ['Acute mania + long-term stability', 'Rapid cycling bipolar'] },
            { feature: 'Lithium + Aripiprazole', values: ['Enhanced mania prevention', 'Incomplete response to lithium alone'] },
          ]}
          highlightColumn={0}
        />

        <QuoteBlock
          quote="Finding the right mood stabilizer was life-changing. I tried valproate first, but the weight gain was unbearable. Lithium worked better for me — yes, I have to get blood tests and I'm always thirsty, but I haven't had a manic episode in three years. That stability is worth everything."
          attribution="Person with Bipolar I Disorder"
          role="Patient Perspective"
          variant="large"
        />

        <h2 id="long-term-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Long-Term Treatment and Monitoring
        </h2>
        <p className="mb-6">
          Bipolar disorder is typically a lifelong condition, and mood stabilizers are usually taken indefinitely. Stopping medication increases the risk of relapse significantly — even after years of stability.
        </p>

        <ArticleCallout variant="clinical-note" title="Why Lifelong Treatment?">
          <p>Research shows that each mood episode increases the likelihood of future episodes and can cause structural brain changes. Continuous mood stabilizer treatment prevents episodes and protects long-term brain health <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />.</p>
        </ArticleCallout>

        <StatCard
          stats={[
            { value: 80, suffix: '%', label: 'Risk of relapse within 5 years if mood stabilizers are stopped' },
            { value: 50, suffix: '%', label: 'Reduction in suicide risk with lithium treatment' },
            { value: 3, suffix: '-6', label: 'Months of blood test monitoring (initial phase)' },
          ]}
          source="Bipolar Disorders, 2022"
        />
      </>
    ),
  },
  {
    id: catId(15),
    slug: 'antipsychotic-medications-what-they-treat-how-they-work',
    title: 'Antipsychotic Medications: What They Treat and How They Work',
    description: 'Understanding antipsychotic medications, from schizophrenia treatment to mood stabilization, including typical vs. atypical antipsychotics.',
    image: "/images/articles/cat14/cover-015.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 12,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Antipsychotics', 'Schizophrenia', 'Psychosis', 'Medication'],
    citations: [
      {
        id: '1',
        text: 'Antipsychotic medications for schizophrenia: Systematic review and network meta-analysis',
        source: 'The Lancet',
        year: '2020',
        link: 'https://doi.org/10.1016/S0140-6736(19)31135-3',
        tier: 1,
      },
      {
        id: '2',
        text: 'Clinical practice guideline for the treatment of schizophrenia',
        source: 'American Psychiatric Association',
        year: '2021',
        link: 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines',
        tier: 4,
      },
      {
        id: '3',
        text: 'Atypical antipsychotics: Metabolic side effects and cardiovascular risk',
        source: 'JAMA Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1001/jamapsychiatry.2022.0094',
        tier: 1,
      },
      {
        id: '4',
        text: 'Clozapine for treatment-resistant schizophrenia: Efficacy and monitoring',
        source: 'British Journal of Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1192/bjp.2020.256',
        tier: 1,
      },
      {
        id: '5',
        text: 'Antipsychotic-induced movement disorders: Pathophysiology and management',
        source: 'CNS Drugs',
        year: '2021',
        link: 'https://doi.org/10.1007/s40263-021-00831-6',
        tier: 1,
      },
      {
        id: '6',
        text: 'Long-acting injectable antipsychotics: Adherence and outcomes',
        source: 'Schizophrenia Bulletin',
        year: '2022',
        link: 'https://doi.org/10.1093/schbul/sbab142',
        tier: 1,
      },
      {
        id: '7',
        text: 'Antipsychotics in bipolar disorder: Evidence and clinical use',
        source: 'Bipolar Disorders',
        year: '2021',
        link: 'https://doi.org/10.1111/bdi.13089',
        tier: 1,
      },
      {
        id: '8',
        text: 'Typical versus atypical antipsychotics: Comparative effectiveness',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2020.19070740',
        tier: 1,
      },
      {
        id: '9',
        text: 'Antipsychotic polypharmacy in schizophrenia: Benefits and risks',
        source: 'Psychopharmacology',
        year: '2022',
        link: 'https://doi.org/10.1007/s00213-022-06103-y',
        tier: 1,
      },
      {
        id: '10',
        text: 'Low-dose antipsychotics for conditions other than psychosis',
        source: 'Journal of Clinical Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.4088/JCP.20r13785',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Despite the name, antipsychotic medications aren't only for psychosis. They're used to treat schizophrenia, bipolar disorder, severe depression, agitation, and other conditions. Understanding how these medications work, their side effects, and who they help can reduce stigma and support informed treatment decisions <Citation id="1" index={1} source="The Lancet" year="2020" tier={1} />.
          </p>
          <p className="mb-6">
            Antipsychotics are divided into two categories: "typical" (older, first-generation) and "atypical" (newer, second-generation). Atypical antipsychotics are now more commonly prescribed due to fewer movement-related side effects, though they carry their own risks <Citation id="2" index={2} source="American Psychiatric Association" year="2021" tier={4} />.
          </p>
        </div>

        <h2 id="what-are-antipsychotics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are Antipsychotic Medications?
        </h2>
        <p className="mb-6">
          Antipsychotics primarily work by blocking dopamine receptors in the brain. Dopamine is a neurotransmitter involved in motivation, reward, and perception. Excessive dopamine activity in certain brain pathways is associated with psychosis (hallucinations, delusions, disorganized thinking).
        </p>

        <ArticleCallout variant="key-takeaway" title="What Antipsychotics Treat">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Schizophrenia</strong> — primary use, reduces positive symptoms (hallucinations, delusions)</li>
            <li><strong>Bipolar disorder</strong> — treats acute mania, prevents mood episodes</li>
            <li><strong>Severe depression</strong> — added to antidepressants for treatment-resistant cases</li>
            <li><strong>Agitation and aggression</strong> — in dementia, autism, other conditions</li>
            <li><strong>OCD, PTSD, insomnia</strong> — off-label uses at low doses</li>
          </ul>
        </ArticleCallout>

        <h2 id="typical-antipsychotics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Typical (First-Generation) Antipsychotics
        </h2>
        <p className="mb-6">
          Typical antipsychotics were developed in the 1950s and primarily block dopamine D2 receptors. They're effective for psychosis but cause significant movement-related side effects (extrapyramidal symptoms) <Citation id="8" index={8} source="American Journal of Psychiatry" year="2020" tier={1} />.
        </p>

        <p className="mb-6">
          <strong>Common typical antipsychotics:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Haloperidol</strong> (Haldol) — high-potency, often used in hospitals for acute psychosis</li>
          <li><strong>Chlorpromazine</strong> (Thorazine) — first antipsychotic ever developed</li>
          <li><strong>Fluphenazine</strong> (Prolixin) — available as long-acting injection</li>
        </ul>

        <p className="mb-6">
          These medications are less commonly prescribed today but may be used when:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Atypical antipsychotics haven't worked</li>
          <li>Someone has responded well to them in the past</li>
          <li>Cost is a major concern (generics are very inexpensive)</li>
          <li>Injectable long-acting formulations are needed</li>
        </ul>

        <ArticleCallout variant="warning" title="Extrapyramidal Symptoms (EPS)">
          <p className="mb-4">Typical antipsychotics commonly cause movement-related side effects <Citation id="5" index={5} source="CNS Drugs" year="2021" tier={1} />:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Akathisia</strong>: Inner restlessness, inability to sit still</li>
            <li><strong>Dystonia</strong>: Muscle spasms, especially of neck and eyes (can be frightening but treatable)</li>
            <li><strong>Parkinsonism</strong>: Tremor, stiffness, shuffling gait</li>
            <li><strong>Tardive dyskinesia</strong>: Involuntary movements (lip smacking, tongue movements) — can be permanent</li>
          </ul>
        </ArticleCallout>

        <h2 id="atypical-antipsychotics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Atypical (Second-Generation) Antipsychotics
        </h2>
        <p className="mb-6">
          Atypical antipsychotics were developed starting in the 1990s. They block dopamine like typical antipsychotics but also affect serotonin and other neurotransmitters. This reduces movement side effects but increases metabolic side effects (weight gain, diabetes risk) <Citation id="3" index={3} source="JAMA Psychiatry" year="2022" tier={1} />.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'risperidone',
              title: 'Risperidone (Risperdal)',
              content: (
                <div>
                  <p className="mb-4">One of the first atypical antipsychotics, effective for schizophrenia and bipolar mania.</p>
                  <p className="mb-4"><strong>Benefits:</strong> Effective, available in long-acting injectable form.</p>
                  <p><strong>Side effects:</strong> Weight gain, elevated prolactin (can cause breast enlargement, menstrual changes), sedation. Higher EPS risk than other atypicals.</p>
                </div>
              ),
            },
            {
              id: 'olanzapine',
              title: 'Olanzapine (Zyprexa)',
              content: (
                <div>
                  <p className="mb-4">Highly effective for schizophrenia and bipolar disorder.</p>
                  <p className="mb-4"><strong>Benefits:</strong> One of the most effective antipsychotics, low EPS risk.</p>
                  <p><strong>Side effects:</strong> Significant weight gain (often 20+ pounds), diabetes risk, high cholesterol. Sedating.</p>
                </div>
              ),
            },
            {
              id: 'quetiapine',
              title: 'Quetiapine (Seroquel)',
              content: (
                <div>
                  <p className="mb-4">FDA-approved for schizophrenia, bipolar mania, and bipolar depression.</p>
                  <p className="mb-4"><strong>Benefits:</strong> Less weight gain than olanzapine, effective for bipolar depression, often used off-label for sleep.</p>
                  <p><strong>Side effects:</strong> Sedation (very sedating initially), weight gain, metabolic effects.</p>
                </div>
              ),
            },
            {
              id: 'aripiprazole',
              title: 'Aripiprazole (Abilify)',
              content: (
                <div>
                  <p className="mb-4">Works differently — a "partial dopamine agonist" that moderates dopamine activity rather than blocking it completely.</p>
                  <p className="mb-4"><strong>Benefits:</strong> Lower weight gain risk, less sedating, often used as add-on for depression.</p>
                  <p><strong>Side effects:</strong> Akathisia (restlessness) is common, nausea, insomnia.</p>
                </div>
              ),
            },
            {
              id: 'lurasidone',
              title: 'Lurasidone (Latuda)',
              content: (
                <div>
                  <p className="mb-4">Newer antipsychotic FDA-approved specifically for bipolar depression.</p>
                  <p className="mb-4"><strong>Benefits:</strong> Low weight gain, effective for bipolar depression.</p>
                  <p><strong>Side effects:</strong> Must be taken with food (350+ calories) to absorb properly, akathisia, nausea. Expensive.</p>
                </div>
              ),
            },
            {
              id: 'clozapine',
              title: 'Clozapine (Clozaril) — The Most Effective',
              content: (
                <div>
                  <p className="mb-4">Clozapine is the most effective antipsychotic for treatment-resistant schizophrenia but requires intensive monitoring due to serious side effects <Citation id="4" index={4} source="British Journal of Psychiatry" year="2021" tier={1} />.</p>
                  <p className="mb-4"><strong>When it's used:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Schizophrenia that hasn't responded to at least two other antipsychotics</li>
                    <li>High suicide risk in schizophrenia (clozapine reduces suicide)</li>
                  </ul>
                  <p className="mb-4"><strong>Why it requires monitoring:</strong></p>
                  <p>Clozapine can cause agranulocytosis (dangerously low white blood cell count), requiring weekly or biweekly blood tests. Other side effects: significant weight gain, drooling, sedation, seizure risk at high doses.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="side-effects" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Side Effects and Monitoring
        </h2>
        <p className="mb-6">
          All antipsychotics have side effects, but the specific risks vary by medication.
        </p>

        <ComparisonTable
          title="Atypical Antipsychotics: Side Effect Comparison"
          columns={['Medication', 'Weight Gain', 'Sedation', 'EPS Risk']}
          items={[
            { feature: 'Olanzapine', values: ['Very High', 'High', 'Low'] },
            { feature: 'Quetiapine', values: ['Moderate-High', 'Very High', 'Very Low'] },
            { feature: 'Risperidone', values: ['Moderate', 'Moderate', 'Moderate'] },
            { feature: 'Aripiprazole', values: ['Low', 'Low', 'Moderate (akathisia)'] },
            { feature: 'Lurasidone', values: ['Low', 'Low', 'Moderate (akathisia)'] },
            { feature: 'Clozapine', values: ['Very High', 'Very High', 'Very Low'] },
          ]}
          highlightColumn={0}
        />

        <p className="mb-6 mt-6">
          <strong>Metabolic monitoring is critical:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Weight, BMI, waist circumference — every visit</li>
          <li>Fasting glucose and lipids — baseline, 3 months, then annually</li>
          <li>Blood pressure — every visit</li>
        </ul>

        <ArticleCallout variant="clinical-note" title="Why Metabolic Monitoring Matters">
          <p>Atypical antipsychotics significantly increase the risk of metabolic syndrome, diabetes, and cardiovascular disease. Early detection and lifestyle interventions (diet, exercise) can mitigate these risks <Citation id="3" index={3} source="JAMA Psychiatry" year="2022" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="long-acting-injectables" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Long-Acting Injectable Antipsychotics
        </h2>
        <p className="mb-6">
          Many antipsychotics are available as long-acting injections given every 2-4 weeks (or monthly). These are particularly helpful for people who struggle with daily pill adherence <Citation id="6" index={6} source="Schizophrenia Bulletin" year="2022" tier={1} />.
        </p>

        <p className="mb-6">
          <strong>Available as long-acting injections:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Risperidone (Risperdal Consta) — every 2 weeks</li>
          <li>Aripiprazole (Abilify Maintena, Aristada) — monthly or every 6 weeks</li>
          <li>Paliperidone (Invega Sustenna, Trinza) — monthly or every 3 months</li>
          <li>Haloperidol decanoate — monthly (typical antipsychotic)</li>
        </ul>

        <ArticleCallout variant="tip" title="Benefits of Long-Acting Injections">
          <ul className="list-disc pl-6 space-y-2">
            <li>Eliminates daily pill burden</li>
            <li>Ensures consistent medication levels</li>
            <li>Reduces relapse risk (adherence is guaranteed)</li>
            <li>Helpful for people with cognitive issues affecting memory</li>
          </ul>
        </ArticleCallout>

        <h2 id="bipolar-use" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Antipsychotics in Bipolar Disorder
        </h2>
        <p className="mb-6">
          Several atypical antipsychotics are FDA-approved as mood stabilizers for bipolar disorder, either alone or combined with lithium or valproate <Citation id="7" index={7} source="Bipolar Disorders" year="2021" tier={1} />.
        </p>

        <p className="mb-6">
          <strong>FDA-approved for bipolar disorder:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Quetiapine</strong> — mania, depression, maintenance</li>
          <li><strong>Lurasidone</strong> — bipolar depression (alone or with lithium/valproate)</li>
          <li><strong>Aripiprazole</strong> — mania, maintenance</li>
          <li><strong>Olanzapine</strong> — mania, maintenance, bipolar depression (combined with fluoxetine)</li>
        </ul>

        <h2 id="off-label-uses" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Off-Label Uses of Antipsychotics
        </h2>
        <p className="mb-6">
          Antipsychotics are frequently prescribed off-label (for conditions not FDA-approved) at low doses <Citation id="10" index={10} source="Journal of Clinical Psychiatry" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Insomnia</strong> — quetiapine 25-100mg (sedating but not FDA-approved for sleep)</li>
          <li><strong>Treatment-resistant depression</strong> — aripiprazole or quetiapine added to antidepressants</li>
          <li><strong>OCD</strong> — low-dose antipsychotic added to SSRIs</li>
          <li><strong>PTSD, severe anxiety</strong> — off-label use when other treatments fail</li>
        </ul>

        <ArticleCallout variant="warning" title="The Risk of Off-Label Use">
          <p>Using antipsychotics for conditions like insomnia exposes people to metabolic side effects without FDA approval or strong evidence. Discuss risks and benefits carefully with your prescriber.</p>
        </ArticleCallout>

        <QuoteBlock
          quote="Antipsychotics saved my life. When I was first diagnosed with schizophrenia, I couldn't tell what was real. The hallucinations were terrifying. Risperidone brought me back to reality within weeks. Yes, I gained weight and had to work with a dietitian, but I got my life back."
          attribution="Person with Schizophrenia"
          role="Patient Perspective"
          variant="large"
        />

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Of people with schizophrenia show significant improvement with antipsychotics' },
            { value: 25, suffix: '%', label: 'Average weight gain in first year on olanzapine' },
            { value: 30, suffix: '%', label: 'Have treatment-resistant schizophrenia (may benefit from clozapine)' },
          ]}
          source="The Lancet, 2020"
        />
      </>
    ),
  },
];
