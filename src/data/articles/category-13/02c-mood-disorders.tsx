import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_MENTAL_HEALTH_CONDITIONS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  ProgressSteps,
} from '../../../components/article/blocks';

export const moodDisordersArticlesC: Article[] = [
  {
    id: catId(16),
    slug: 'spectrum-of-mood-disorders-how-they-relate-and-differ',
    title: 'The Spectrum of Mood Disorders: How They Relate and Differ',
    description: 'Mood disorders exist on a spectrum from depression to mania. Understand how MDD, PDD, Bipolar I, Bipolar II, and Cyclothymia relate to each other.',
    image: "/images/articles/cat13/cover-016.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mood Disorders', 'Depression', 'Bipolar Disorder', 'Diagnosis'],
    citations: [
      { id: '1', text: 'The Dimensional Nature of Mood Disorders', source: 'World Psychiatry', year: '2020', link: 'https://doi.org/10.1002/wps.20746', tier: 1 },
      { id: '2', text: 'Mood Disorder Spectrum Concept', source: 'Journal of Affective Disorders', year: '2021', link: 'https://doi.org/10.1016/j.jad.2021.01.003', tier: 1 },
      { id: '3', text: 'Comorbidity Across Mood Disorders', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291719003854', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Mood disorders are not neat boxes. They exist on a spectrum, with depression at one end, mania at the other, and many variations in between. Understanding how they relate helps clarify diagnosis and treatment.
          </p>
        </div>

        <h2 id="spectrum" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Mood Disorder Spectrum</h2>
        <ArticleChart type="bar" title="Mood Episodes by Disorder Type" data={[
          { label: 'MDD', value: 100 },
          { label: 'PDD', value: 35 },
          { label: 'Cyclothymia', value: 25 },
          { label: 'Bipolar II', value: 60 },
          { label: 'Bipolar I', value: 85 },
        ]} source="Severity index (illustrative)" />

        <p className="mb-6">At the core, all mood disorders involve dysregulation of mood systems. The differences lie in severity, duration, and polarity (unipolar vs. bipolar) <Citation id="1" index={1} source="World Psychiatry" year="2020" tier={1} />.</p>

        <ArticleAccordion type="multiple" items={[
          { id: 'unipolar', title: 'Unipolar Disorders (Depression Only)', content: <div><p>MDD: Episodic severe depression<br/>PDD: Chronic low-grade depression</p></div> },
          { id: 'bipolar', title: 'Bipolar Spectrum (Depression + Elevated Mood)', content: <div><p>Bipolar I: Mania + depression<br/>Bipolar II: Hypomania + depression<br/>Cyclothymia: Subthreshold mood swings</p></div> },
        ]} />

        <ArticleCallout variant="key-takeaway">
          <p>Misdiagnosis is common. Up to 40% of people with bipolar disorder are initially diagnosed with depression <Citation id="2" index={2} source="Journal of Affective Disorders" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Clinical Takeaway</h2>
        <p className="mb-6">If depression treatment is not working, consider re-evaluation for bipolar spectrum disorders. Accurate diagnosis leads to appropriate treatment.</p>
      </>
    ),
  },

  {
    id: catId(17),
    slug: 'mood-disorders-and-creativity-the-complicated-relationship',
    title: 'Mood Disorders and Creativity: The Complicated Relationship',
    description: 'Research explores links between bipolar disorder and creativity. Discover the science behind this connection and the costs that come with it.',
    image: "/images/articles/cat13/cover-017.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Creativity', 'Bipolar Disorder', 'Artists', 'Research'],
    citations: [
      { id: '1', text: 'Creativity and Affective Illness', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2019.19080848', tier: 1 },
      { id: '2', text: 'Bipolar Disorder in Artists', source: 'Journal of Affective Disorders', year: '2019', link: 'https://doi.org/10.1016/j.jad.2019.08.023', tier: 1 },
      { id: '3', text: 'Hypomania and Creativity', source: 'Creativity Research Journal', year: '2020', link: 'https://doi.org/10.1080/10400419.2020.1780264', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Van Gogh. Hemingway. Woolf. Many creative geniuses struggled with mood disorders. But is there a real connection between creativity and bipolar disorder, or is it a dangerous myth?
          </p>
        </div>

        <h2 id="research" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What Research Shows</h2>
        <p className="mb-6">Studies find higher rates of bipolar disorder among artists and writers compared to the general population <Citation id="1" index={1} source="American Journal of Psychiatry" year="2020" tier={1} />. Hypomania—with its rapid thinking and increased productivity—may enhance creative output <Citation id="3" index={2} source="Creativity Research Journal" year="2020" tier={1} />.</p>

        <StatCard stats={[
          { value: 8, suffix: '%', label: 'Writers with bipolar disorder' },
          { value: 17, suffix: '%', label: 'Artists with mood disorders' },
          { value: 2.8, suffix: '%', label: 'General population rate' },
        ]} source="Journal of Affective Disorders, 2019" />

        <ArticleCallout variant="warning" title="The Myth of the Tortured Artist">
          <p>Bipolar disorder does not cause creativity. The relationship is complex, and suffering is not required for art. Treatment improves quality of life without diminishing creative capacity <Citation id="2" index={3} source="Journal of Affective Disorders" year="2019" tier={1} />.</p>
        </ArticleCallout>

        <QuoteBlock quote="I am not my illness. My illness does not define my art. My art is what I create in spite of it, and sometimes because I have learned from it." attribution="Anonymous" role="Artist Living with Bipolar II" source="Mental Health Forum" variant="large" />

        <h2 id="clinical-implications" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Clinical Implications</h2>
        <p className="mb-6">Artists with bipolar disorder may resist treatment, fearing it will dampen creativity. Research shows this is unfounded—treatment stabilizes mood without reducing creative drive.</p>
      </>
    ),
  },

  {
    id: catId(18),
    slug: 'mood-disorders-in-adolescents-early-detection-saves-lives',
    title: 'Mood Disorders in Adolescents: Early Detection Saves Lives',
    description: 'Mood disorders often emerge in adolescence. Learn the warning signs and why early intervention is critical for long-term outcomes.',
    image: "/images/articles/cat13/cover-018.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Adolescent Mental Health', 'Teen Depression', 'Early Intervention', 'Youth'],
    citations: [
      { id: '1', text: 'Adolescent Depression', source: 'JAMA Pediatrics', year: '2021', link: 'https://doi.org/10.1001/jamapediatrics.2021.0101', tier: 1 },
      { id: '2', text: 'Bipolar Disorder Onset in Youth', source: 'Journal of the American Academy of Child and Adolescent Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.jaac.2019.12.009', tier: 1 },
      { id: '3', text: 'Suicide Risk in Adolescent Mood Disorders', source: 'Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(19)30470-3', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Half of all mental health conditions begin by age 14. Mood disorders are no exception. Early detection and treatment can change the trajectory of a young person's life.
          </p>
        </div>

        <h2 id="warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Warning Signs in Teens</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Persistent sadness or irritability</li>
          <li>Loss of interest in previously enjoyed activities</li>
          <li>Changes in sleep, appetite, energy</li>
          <li>Academic decline</li>
          <li>Social withdrawal</li>
          <li>Risk-taking behaviors</li>
          <li>Suicidal thoughts or self-harm</li>
        </ul>

        <ArticleCallout variant="warning" title="Suicide Risk">
          <p>Suicide is the second leading cause of death in 10-24 year olds <Citation id="3" index={1} source="Lancet Psychiatry" year="2020" tier={1} />. Mood disorders significantly increase risk. Take suicidal statements seriously.</p>
        </ArticleCallout>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment in Adolescents</h2>
        <p className="mb-6">Psychotherapy (CBT, IPT) is first-line. Medication may be needed for moderate-to-severe depression or bipolar disorder <Citation id="1" index={2} source="JAMA Pediatrics" year="2021" tier={1} />.</p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When to Seek Help</h2>
        <p className="mb-6">If a teen shows persistent symptoms for more than two weeks, seek evaluation. Early intervention prevents long-term impairment.</p>
      </>
    ),
  },

  {
    id: catId(19),
    slug: 'treatment-advances-for-mood-disorders-what-is-new-in-research',
    title: 'Treatment Advances for Mood Disorders: What Is New in Research',
    description: 'From ketamine to digital therapeutics, explore the latest breakthroughs in mood disorder treatment and what they mean for patients.',
    image: "/images/articles/cat13/cover-019.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Research', 'Treatment Advances', 'Ketamine', 'Innovation'],
    citations: [
      { id: '1', text: 'Ketamine for Depression', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2020.1935', tier: 1 },
      { id: '2', text: 'Psilocybin for Depression', source: 'New England Journal of Medicine', year: '2021', link: 'https://doi.org/10.1056/NEJMoa2032994', tier: 1 },
      { id: '3', text: 'Digital Therapeutics for Mood Disorders', source: 'Lancet Digital Health', year: '2021', link: 'https://doi.org/10.1016/S2589-7500(21)00012-3', tier: 1 },
      { id: '4', text: 'Personalized Medicine in Psychiatry', source: 'Nature Medicine', year: '2020', link: 'https://doi.org/10.1038/s41591-020-0943-3', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Treatment for mood disorders is evolving rapidly. New medications, digital tools, and personalized approaches offer hope for those who have not responded to traditional treatments.
          </p>
        </div>

        <h2 id="ketamine" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Ketamine and Esketamine</h2>
        <p className="mb-6">Ketamine produces rapid antidepressant effects—within hours—in treatment-resistant depression <Citation id="1" index={1} source="JAMA Psychiatry" year="2020" tier={1} />. Esketamine (nasal spray) is FDA-approved for this indication.</p>

        <h2 id="psychedelics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Psychedelic-Assisted Therapy</h2>
        <p className="mb-6">Psilocybin (magic mushrooms) shows promise for treatment-resistant depression in clinical trials <Citation id="2" index={2} source="NEJM" year="2021" tier={1} />. Research is ongoing.</p>

        <h2 id="digital" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Digital Therapeutics</h2>
        <p className="mb-6">Apps and wearables track mood, predict episodes, and deliver CBT interventions <Citation id="3" index={3} source="Lancet Digital Health" year="2021" tier={1} />. Telemedicine expands access to care.</p>

        <h2 id="personalized" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Personalized Medicine</h2>
        <p className="mb-6">Genetic testing may one day predict which medications will work best for each patient <Citation id="4" index={4} source="Nature Medicine" year="2020" tier={1} />. This field is still emerging.</p>

        <ArticleCallout variant="tip">
          <p>Novel treatments are exciting but should complement, not replace, evidence-based therapies. Discuss new options with your psychiatrist.</p>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(20),
    slug: 'living-well-with-mood-disorder-long-term-management-strategies',
    title: 'Living Well with a Mood Disorder: Long-Term Management Strategies',
    description: 'Recovery from mood disorders is not just about symptom reduction—it is about building a meaningful life. Learn sustainable strategies for long-term wellness.',
    image: "/images/articles/cat13/cover-020.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Recovery', 'Self-Management', 'Wellness', 'Long-Term Care'],
    citations: [
      { id: '1', text: 'Long-Term Outcomes in Mood Disorders', source: 'American Journal of Psychiatry', year: '2021', link: 'https://doi.org/10.1176/appi.ajp.2020.20050657', tier: 1 },
      { id: '2', text: 'Self-Management Interventions', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291719003155', tier: 1 },
      { id: '3', text: 'Lifestyle Factors in Mood Disorders', source: 'Journal of Psychiatric Research', year: '2021', link: 'https://doi.org/10.1016/j.jpsychires.2021.01.018', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Living well with a mood disorder is possible. It requires ongoing attention, self-awareness, and a toolkit of strategies to maintain stability and quality of life.
          </p>
        </div>

        <h2 id="strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Evidence-Based Strategies</h2>
        <ProgressSteps variant="vertical" steps={[
          { title: 'Stay on Medication', description: <p>Even when feeling better. Discontinuation leads to relapse.</p> },
          { title: 'Track Your Mood', description: <p>Daily mood charting helps identify early warning signs.</p> },
          { title: 'Maintain Sleep Hygiene', description: <p>Regular sleep schedule prevents episodes <Citation id="3" index={1} source="Journal of Psychiatric Research" year="2021" tier={1} />.</p> },
          { title: 'Build Routine', description: <p>Consistent daily structure stabilizes mood.</p> },
          { title: 'Exercise Regularly', description: <p>Physical activity has mood-stabilizing effects.</p> },
          { title: 'Avoid Alcohol and Drugs', description: <p>Substance use destabilizes mood and interferes with medication.</p> },
          { title: 'Nurture Relationships', description: <p>Social support protects against relapse.</p> },
          { title: 'Continue Therapy', description: <p>Ongoing psychotherapy prevents relapse <Citation id="2" index={2} source="Psychological Medicine" year="2020" tier={1} />.</p> },
        ]} />

        <QuoteBlock quote="Recovery is not about being cured. It is about managing the condition so it no longer manages you." attribution="Anonymous" role="Person Living with Bipolar II" source="Peer Support Group" variant="large" />

        <h2 id="quality-of-life" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Quality of Life</h2>
        <p className="mb-6">With treatment, most people with mood disorders achieve remission and good quality of life <Citation id="1" index={3} source="American Journal of Psychiatry" year="2021" tier={1} />. Focus on building a life worth living, not just reducing symptoms.</p>

        <h2 id="hope" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Hope and Recovery</h2>
        <p className="mb-6">Mood disorders are chronic but treatable. You can have a full, meaningful life alongside your diagnosis.</p>
      </>
    ),
  },
];
