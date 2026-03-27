
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_MENTAL_HEALTH_CONDITIONS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout, StatCard, ComparisonTable, SummaryBox, KeyFacts, DiagramBlock, PracticalExercise, SparkMoment, RelatedToolsBlock } from '../../../components/article/blocks';
import { BeforeAfter } from '../../../components/article/blocks/BeforeAfter';
import { QuoteBlock } from '../../../components/article/blocks/QuoteBlock';
import ReferenceList from '../../../components/article/ReferenceList';

export const ocdImpulseArticles: Article[] = [
  { id: catId(31), slug: 'ocd-explained', title: 'OCD Explained: Beyond Handwashing and Checking --- The Full Picture', description: 'OCD is intrusive obsessions + compulsions. Understand the condition beyond stereotypes.', image: "/images/articles/cat13/cover-031.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 14, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['OCD', 'Obsessions', 'Compulsions'], citations: [
    { id: '1', text: 'OCD Overview', source: 'NIMH', year: '2023', link: 'https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd', tier: 2 },
    { id: '2', text: 'DSM-5-TR Criteria', source: 'APA', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '3', text: 'ERP Effectiveness', source: 'Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30056-4', tier: 1 },
    { id: '4', text: 'OCD Neurobiology', source: 'Biological Psychiatry', year: '2021', link: 'https://doi.org/10.1016/j.biopsych.2021.01.002', tier: 1 },
    { id: '5', text: 'SSRI Treatment', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2020.2686', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["OCD: intrusive obsessions + time-consuming compulsions","Prevalence: 1-2% of population","Not about 'perfectionism'—causes severe distress","ERP (Exposure Response Prevention) is gold-standard treatment","SSRIs help but therapy more effective long-term"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Obsessive-Compulsive Disorder involves recurrent intrusive thoughts (obsessions) that cause anxiety, coupled with repetitive behaviors or mental acts (compulsions) performed to reduce that anxiety. OCD affects 1-2% of people globally <Citation id="1" index={1} source="NIMH" year="2023" tier={2} />. It's not about being neat or organized—OCD causes profound distress and can consume hours daily.</p>
    </div>
    <KeyFacts facts={[{label:"Prevalence",value:"1-2%",context:"Of global population"},{label:"Onset Age",value:"19-20",context:"Average age of onset"},{label:"Time Consumed",value:"1+ hours/day",context:"Diagnostic threshold"},{label:"Comorbidity",value:"75%",context:"Have another disorder"}]} className="my-12" />
    <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Obsessions and Compulsions</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300"><strong>Obsessions:</strong> Intrusive, unwanted thoughts/urges/images causing distress. Person recognizes they're excessive but can't control them. <strong>Compulsions:</strong> Repetitive behaviors (checking, washing, ordering) or mental acts (counting, praying, repeating words) to reduce obsession-triggered anxiety <Citation id="2" index={2} source="DSM-5-TR" year="2022" tier={4} />.</p>
    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment: ERP and SSRIs</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">Exposure and Response Prevention: Gradual exposure to feared stimuli while preventing compulsions. Shows 60-70% symptom reduction <Citation id="3" index={3} source="Lancet Psychiatry" year="2020" tier={1} />. SSRIs (fluoxetine, sertraline) at higher doses than depression help 40-60% <Citation id="5" index={4} source="JAMA Psychiatry" year="2020" tier={1} />. Combination therapy most effective.</p>
    <ReferenceList references={[{id:'1',text:'OCD Overview',source:'NIMH',year:'2023',link:'https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd',tier:2},{id:'2',text:'DSM-5-TR',source:'APA',year:'2022',link:'https://doi.org/10.1176/appi.books.9780890425787',tier:4},{id:'3',text:'ERP',source:'Lancet Psychiatry',year:'2020',link:'https://doi.org/10.1016/S2215-0366(20)30056-4',tier:1},{id:'4',text:'Neurobiology',source:'Biological Psychiatry',year:'2021',link:'https://doi.org/10.1016/j.biopsych.2021.01.002',tier:1},{id:'5',text:'SSRI',source:'JAMA Psychiatry',year:'2020',link:'https://doi.org/10.1001/jamapsychiatry.2020.2686',tier:1}]} className="mt-12" />
  </> },

  { id: catId(32), slug: 'ocd-subtypes', title: 'Common OCD Subtypes: Contamination, Harm, Symmetry, and Pure O', description: 'OCD presents in many forms. Learn the major subtypes and their unique features.', image: "/images/articles/cat13/cover-032.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 12, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['OCD', 'Pure O', 'Harm OCD'], citations: [
    { id: '1', text: 'OCD Subtypes', source: 'Journal of Anxiety Disorders', year: '2020', link: 'https://doi.org/10.1016/j.janxdis.2020.102225', tier: 1 },
    { id: '2', text: 'Pure O', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102076', tier: 1 },
    { id: '3', text: 'Harm OCD', source: 'Behavior Therapy', year: '2020', link: 'https://doi.org/10.1016/j.beth.2020.04.002', tier: 1 },
    { id: '4', text: 'Contamination OCD', source: 'Behaviour Research and Therapy', year: '2021', link: 'https://doi.org/10.1016/j.brat.2021.103924', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["Contamination: fear of germs/illness, washing compulsions","Harm: intrusive violent/sexual thoughts, checking compulsions","Symmetry: need for order/balance, arranging compulsions","Pure O: mental obsessions with covert mental compulsions","All subtypes respond to ERP therapy"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">OCD manifests in diverse forms. While subtypes share the obsession-compulsion cycle, their content varies widely <Citation id="1" index={1} source="Journal of Anxiety Disorders" year="2020" tier={1} />. Understanding your specific presentation helps tailor ERP exposure hierarchies.</p>
    </div>
    <ComparisonTable title="Major OCD Subtypes" items={[{name:"Contamination",description:"Fear of germs, illness, bodily fluids. Washing, cleaning, avoidance rituals"},{name:"Harm/Violent",description:"Intrusive thoughts about harming self/others. Checking, reassurance-seeking, avoidance"},{name:"Sexual",description:"Unwanted sexual thoughts (often taboo content). Mental reviewing, avoidance, reassurance-seeking"},{name:"Symmetry/Exactness",description:"Need for things 'just right.' Ordering, counting, repeating until it 'feels right'"},{name:"Pure O",description:"Primarily mental obsessions. Covert mental compulsions (mental checking, neutralizing thoughts)"}]} className="my-8" />
    <h2 id="pure-o" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Pure O Misconception</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">"Pure Obsessional OCD" isn't actually pure obsessions—compulsions exist but are mental (internal debate, mental checking, thought suppression attempts) <Citation id="2" index={2} source="Clinical Psychology Review" year="2021" tier={1} />. Often misdiagnosed as generalized anxiety.</p>
    <ReferenceList references={[{id:'1',text:'OCD Subtypes',source:'Journal of Anxiety Disorders',year:'2020',link:'https://doi.org/10.1016/j.janxdis.2020.102225',tier:1},{id:'2',text:'Pure O',source:'Clinical Psychology Review',year:'2021',link:'https://doi.org/10.1016/j.cpr.2021.102076',tier:1},{id:'3',text:'Harm OCD',source:'Behavior Therapy',year:'2020',link:'https://doi.org/10.1016/j.beth.2020.04.002',tier:1},{id:'4',text:'Contamination',source:'Behaviour Research and Therapy',year:'2021',link:'https://doi.org/10.1016/j.brat.2021.103924',tier:1}]} className="mt-12" />
  </> },

  { id: catId(33), slug: 'body-dysmorphic-disorder', title: "Body Dysmorphic Disorder: When You Can't Stop Seeing Flaws", description: "BDD involves preoccupation with perceived appearance defects. Understand this OCD-related condition.", image: "/images/articles/cat13/cover-033.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 13, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['BDD', 'Body Image', 'OCD Spectrum'], citations: [
    { id: '1', text: 'BDD Criteria', source: 'DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '2', text: 'BDD Prevalence', source: 'American Journal of Psychiatry', year: '2021', link: 'https://doi.org/10.1176/appi.ajp.2020.20070955', tier: 1 },
    { id: '3', text: 'CBT for BDD', source: 'Behaviour Research and Therapy', year: '2020', link: 'https://doi.org/10.1016/j.brat.2020.103725', tier: 1 },
    { id: '4', text: 'Suicide Risk in BDD', source: 'JAMA Dermatology', year: '2021', link: 'https://doi.org/10.1001/jamadermatol.2021.0083', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["BDD: preoccupation with perceived appearance flaws (often imagined/minor)","Prevalence: 1.7-2.4% of general population","High suicide risk—80% have suicidal ideation","Responds to CBT+ERP, SSRIs","Cosmetic procedures don't help—often worsen symptoms"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Body Dysmorphic Disorder involves preoccupation with one or more perceived flaws in appearance that are unnoticeable or minor to others. Person performs repetitive behaviors (mirror checking, skin picking, excessive grooming, reassurance-seeking) or mental acts (comparing to others) <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. BDD causes severe distress and impairment, with 80% experiencing suicidal ideation <Citation id="4" index={2} source="JAMA Dermatology" year="2021" tier={1} />.</p>
    </div>
    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">Cognitive-behavioral therapy with exposure (mirror exposure, reduced checking) and response prevention shows 60-70% improvement <Citation id="3" index={3} source="Behaviour Research and Therapy" year="2020" tier={1} />. SSRIs at OCD doses help. Cosmetic surgery contraindicated—rarely improves BDD and often worsens preoccupation.</p>
    <ArticleCallout type="warning" className="my-8"><h4 className="font-bold mb-2">High Suicide Risk</h4><p>BDD has one of highest suicide rates among mental disorders. If experiencing suicidal thoughts, call 988 immediately.</p></ArticleCallout>
    <ReferenceList references={[{id:'1',text:'BDD Criteria',source:'DSM-5-TR',year:'2022',link:'https://doi.org/10.1176/appi.books.9780890425787',tier:4},{id:'2',text:'Prevalence',source:'American Journal of Psychiatry',year:'2021',link:'https://doi.org/10.1176/appi.ajp.2020.20070955',tier:1},{id:'3',text:'CBT for BDD',source:'Behaviour Research and Therapy',year:'2020',link:'https://doi.org/10.1016/j.brat.2020.103725',tier:1},{id:'4',text:'Suicide Risk',source:'JAMA Dermatology',year:'2021',link:'https://doi.org/10.1001/jamadermatol.2021.0083',tier:1}]} className="mt-12" />
  </> },

  { id: catId(34), slug: 'trichotillomania', title: 'Trichotillomania: Understanding Hair-Pulling Disorder', description: 'TTM is recurrent hair-pulling. Learn causes, impact, and treatment.', image: "/images/articles/cat13/cover-034.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 12, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['Trichotillomania', 'Hair Pulling', 'OCD Spectrum'], citations: [
    { id: '1', text: 'TTM Criteria', source: 'DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '2', text: 'Habit Reversal Training', source: 'Behaviour Research and Therapy', year: '2021', link: 'https://doi.org/10.1016/j.brat.2021.103968', tier: 1 },
    { id: '3', text: 'TTM Prevalence', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2020.19111142', tier: 1 },
    { id: '4', text: 'NAC for TTM', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.1356', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["TTM: recurrent hair-pulling resulting in hair loss","Prevalence: 1-2% of population, 90% female in clinical samples","Often begins in adolescence, worsens with stress","Habit Reversal Training is first-line treatment","NAC (N-acetylcysteine) shows promise as supplement"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Trichotillomania involves recurrent pulling out of one's hair, resulting in noticeable hair loss. Person makes repeated attempts to stop <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. Pulling may be automatic (during sedentary activities) or focused (tension-relieving ritual). Scalp most common site, but eyebrows, eyelashes, pubic hair also affected. Prevalence 1-2%, mostly female in clinical samples <Citation id="3" index={2} source="American Journal of Psychiatry" year="2020" tier={1} />.</p>
    </div>
    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Habit Reversal Training</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">HRT teaches awareness of pulling triggers, competing response (e.g., clenching fists), and stimulus control (barriers like hats, fidget tools). Shows 50-70% reduction in pulling <Citation id="2" index={3} source="Behaviour Research and Therapy" year="2021" tier={1} />. N-acetylcysteine (NAC) supplement may reduce urges <Citation id="4" index={4} source="JAMA Psychiatry" year="2021" tier={1} />.</p>
    <ReferenceList references={[{id:'1',text:'TTM Criteria',source:'DSM-5-TR',year:'2022',link:'https://doi.org/10.1176/appi.books.9780890425787',tier:4},{id:'2',text:'Habit Reversal',source:'Behaviour Research and Therapy',year:'2021',link:'https://doi.org/10.1016/j.brat.2021.103968',tier:1},{id:'3',text:'Prevalence',source:'American Journal of Psychiatry',year:'2020',link:'https://doi.org/10.1176/appi.ajp.2020.19111142',tier:1},{id:'4',text:'NAC',source:'JAMA Psychiatry',year:'2021',link:'https://doi.org/10.1001/jamapsychiatry.2021.1356',tier:1}]} className="mt-12" />
  </> },

  { id: catId(35), slug: 'excoriation-disorder', title: 'Excoriation Disorder: When Skin-Picking Becomes Compulsive', description: 'SPD is recurrent skin-picking causing distress and damage.', image: "/images/articles/cat13/cover-035.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 11, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['Skin Picking', 'Excoriation', 'OCD Spectrum'], citations: [
    { id: '1', text: 'Excoriation Criteria', source: 'DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '2', text: 'HRT for Excoriation', source: 'Behavior Therapy', year: '2021', link: 'https://doi.org/10.1016/j.beth.2021.03.002', tier: 1 },
    { id: '3', text: 'Prevalence', source: 'Journal of Psychiatric Research', year: '2020', link: 'https://doi.org/10.1016/j.jpsychires.2020.10.007', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["Excoriation: recurrent skin-picking causing lesions","Prevalence: 1-2%, predominantly female","Often targets face, arms, hands","Habit Reversal Training + stimulus control","Treat underlying anxiety/stress"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Excoriation (skin-picking) disorder involves recurrent picking at one's skin resulting in lesions, despite repeated attempts to stop <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. Picking provides temporary relief but causes tissue damage, scarring, infections. Prevalence 1-2%, predominantly female <Citation id="3" index={2} source="Journal of Psychiatric Research" year="2020" tier={1} />.</p>
    </div>
    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">Habit Reversal Training teaches awareness, competing response (fidget tools, stress balls), stimulus control (covering mirrors, wearing gloves, keeping nails trimmed) <Citation id="2" index={3} source="Behavior Therapy" year="2021" tier={1} />. Address underlying anxiety/stress. SSRIs may help reduce urges.</p>
    <ReferenceList references={[{id:'1',text:'Excoriation Criteria',source:'DSM-5-TR',year:'2022',link:'https://doi.org/10.1176/appi.books.9780890425787',tier:4},{id:'2',text:'HRT',source:'Behavior Therapy',year:'2021',link:'https://doi.org/10.1016/j.beth.2021.03.002',tier:1},{id:'3',text:'Prevalence',source:'Journal of Psychiatric Research',year:'2020',link:'https://doi.org/10.1016/j.jpsychires.2020.10.007',tier:1}]} className="mt-12" />
  </> },

  { id: catId(36), slug: 'intermittent-explosive-disorder', title: 'Intermittent Explosive Disorder: Understanding Disproportionate Anger Outbursts', description: 'IED involves impulsive aggression out of proportion to triggers.', image: "/images/articles/cat13/cover-036.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 12, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['IED', 'Anger', 'Impulse Control'], citations: [
    { id: '1', text: 'IED Criteria', source: 'DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '2', text: 'IED Prevalence', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2020.2988', tier: 1 },
    { id: '3', text: 'CBT for IED', source: 'Behavior Therapy', year: '2021', link: 'https://doi.org/10.1016/j.beth.2021.05.001', tier: 1 },
    { id: '4', text: 'Neurobiology', source: 'Biological Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.biopsych.2020.09.021', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["IED: recurrent anger outbursts disproportionate to trigger","Prevalence: 3-5% of population","Verbal aggression, property destruction, or physical assault","CBT with anger management techniques","May respond to mood stabilizers/SSRIs"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Intermittent Explosive Disorder involves recurrent behavioral outbursts representing failure to control aggressive impulses, grossly out of proportion to provocation <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. Outbursts: verbal aggression (tantrums, arguments) or physical aggression toward property/animals/people. Person feels tension before, relief after, then guilt/regret. Prevalence 3-5% <Citation id="2" index={2} source="JAMA Psychiatry" year="2020" tier={1} />.</p>
    </div>
    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">Cognitive-behavioral therapy with anger management, relaxation training, cognitive restructuring shows 50-60% reduction in outbursts <Citation id="3" index={3} source="Behavior Therapy" year="2021" tier={1} />. Medications (mood stabilizers, SSRIs) may help reduce irritability.</p>
    <ReferenceList references={[{id:'1',text:'IED Criteria',source:'DSM-5-TR',year:'2022',link:'https://doi.org/10.1176/appi.books.9780890425787',tier:4},{id:'2',text:'Prevalence',source:'JAMA Psychiatry',year:'2020',link:'https://doi.org/10.1001/jamapsychiatry.2020.2988',tier:1},{id:'3',text:'CBT',source:'Behavior Therapy',year:'2021',link:'https://doi.org/10.1016/j.beth.2021.05.001',tier:1},{id:'4',text:'Neurobiology',source:'Biological Psychiatry',year:'2020',link:'https://doi.org/10.1016/j.biopsych.2020.09.021',tier:1}]} className="mt-12" />
  </> },

  { id: catId(37), slug: 'hoarding-disorder', title: 'Hoarding Disorder: More Than Just Collecting --- A Mental Health Condition', description: 'Hoarding causes distress and impairment through inability to discard possessions.', image: "/images/articles/cat13/cover-037.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 13, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['Hoarding', 'OCD Spectrum'], citations: [
    { id: '1', text: 'Hoarding Criteria', source: 'DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '2', text: 'Hoarding Prevalence', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2020.19111122', tier: 1 },
    { id: '3', text: 'CBT for Hoarding', source: 'Behaviour Research and Therapy', year: '2021', link: 'https://doi.org/10.1016/j.brat.2021.103977', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["Hoarding: persistent difficulty discarding possessions","Clutter impairs use of living spaces","Prevalence: 2-6% of population","Often begins in adolescence, worsens with age","CBT for hoarding shows moderate effectiveness"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Hoarding disorder involves persistent difficulty discarding possessions regardless of value, due to perceived need to save items and distress at discarding them. Results in clutter that congests living areas and prevents normal use <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. Prevalence 2-6%, increases with age <Citation id="2" index={2} source="American Journal of Psychiatry" year="2020" tier={1} />. Safety hazards, eviction risk, family conflict common.</p>
    </div>
    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Specialized CBT for Hoarding</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">CBT adapted for hoarding: skills training (decision-making, categorizing, organizing), exposure (discarding items), cognitive work (challenging beliefs about possessions) <Citation id="3" index={3} source="Behaviour Research and Therapy" year="2021" tier={1} />. Home visits often part of treatment. Moderate effectiveness—hoarding harder to treat than other OCD spectrum conditions.</p>
    <ReferenceList references={[{id:'1',text:'Hoarding Criteria',source:'DSM-5-TR',year:'2022',link:'https://doi.org/10.1176/appi.books.9780890425787',tier:4},{id:'2',text:'Prevalence',source:'American Journal of Psychiatry',year:'2020',link:'https://doi.org/10.1176/appi.ajp.2020.19111122',tier:1},{id:'3',text:'CBT',source:'Behaviour Research and Therapy',year:'2021',link:'https://doi.org/10.1016/j.brat.2021.103977',tier:1}]} className="mt-12" />
  </> },

  { id: catId(38), slug: 'ocd-spectrum', title: 'The OCD Spectrum: How Related Conditions Share Common Ground', description: 'OCD-related disorders share repetitive behaviors and intrusive thoughts.', image: "/images/articles/cat13/cover-038.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 8, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['OCD Spectrum', 'Related Disorders'], citations: [
    { id: '1', text: 'OCD Spectrum Concept', source: 'World Psychiatry', year: '2020', link: 'https://doi.org/10.1002/wps.20751', tier: 1 },
    { id: '2', text: 'Shared Features', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102088', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["OCD spectrum: OCD, BDD, hoarding, TTM, excoriation","Share repetitive thoughts/behaviors","Common neurobiological features","Often respond to similar treatments (ERP, SSRIs)","DSM-5-TR groups under 'Obsessive-Compulsive and Related Disorders'"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">OCD-related disorders share core features: intrusive thoughts, repetitive behaviors, difficulty resisting urges, anxiety reduction through rituals <Citation id="1" index={1} source="World Psychiatry" year="2020" tier={1} />. While distinct conditions, they show overlapping neurobiology (cortico-striatal-thalamic circuits) and treatment response <Citation id="2" index={2} source="Clinical Psychology Review" year="2021" tier={1} />. DSM-5-TR groups them together recognizing these commonalities.</p>
    </div>
    <ReferenceList references={[{id:'1',text:'OCD Spectrum Concept',source:'World Psychiatry',year:'2020',link:'https://doi.org/10.1002/wps.20751',tier:1},{id:'2',text:'Shared Features',source:'Clinical Psychology Review',year:'2021',link:'https://doi.org/10.1016/j.cpr.2021.102088',tier:1}]} className="mt-12" />
  </> },

  { id: catId(39), slug: 'ocd-children', title: 'OCD in Children and Adolescents: Early Recognition and Treatment', description: 'Childhood OCD requires early intervention for best outcomes.', image: "/images/articles/cat13/cover-039.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 9, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['Childhood OCD', 'Pediatric OCD'], citations: [
    { id: '1', text: 'Pediatric OCD', source: 'JAACAP', year: '2020', link: 'https://doi.org/10.1016/j.jaac.2020.02.014', tier: 1 },
    { id: '2', text: 'PANS/PANDAS', source: 'Journal of Child and Adolescent Psychopharmacology', year: '2021', link: 'https://doi.org/10.1089/cap.2021.0004', tier: 1 },
    { id: '3', text: 'Family-Based ERP', source: 'Behaviour Research and Therapy', year: '2020', link: 'https://doi.org/10.1016/j.brat.2020.103736', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["OCD often begins age 10-12, but can start younger","50% of adult OCD started in childhood","Family involvement crucial for treatment success","ERP adapted for children shows 60-70% improvement","PANS/PANDAS: sudden OCD onset after infection"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">OCD often begins in childhood/adolescence—50% of adults with OCD had symptom onset before age 18 <Citation id="1" index={1} source="JAACAP" year="2020" tier={1} />. Children may hide symptoms due to shame. Family involvement essential for treatment success. Early intervention prevents chronicity.</p>
    </div>
    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Family-Based ERP</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">ERP adapted for children involves parent training (reducing accommodation of rituals while supporting exposure), developmentally appropriate exposures, rewards systems <Citation id="3" index={2} source="Behaviour Research and Therapy" year="2020" tier={1} />. PANS/PANDAS (sudden OCD onset after strep/infection) requires medical evaluation <Citation id="2" index={3} source="Journal of Child and Adolescent Psychopharmacology" year="2021" tier={1} />.</p>
    <ReferenceList references={[{id:'1',text:'Pediatric OCD',source:'JAACAP',year:'2020',link:'https://doi.org/10.1016/j.jaac.2020.02.014',tier:1},{id:'2',text:'PANS/PANDAS',source:'Journal of Child and Adolescent Psychopharmacology',year:'2021',link:'https://doi.org/10.1089/cap.2021.0004',tier:1},{id:'3',text:'Family ERP',source:'Behaviour Research and Therapy',year:'2020',link:'https://doi.org/10.1016/j.brat.2020.103736',tier:1}]} className="mt-12" />
  </> },

  { id: catId(40), slug: 'erp-treatment', title: 'ERP and Other Treatments for OCD Spectrum Conditions', description: 'Exposure and Response Prevention is the gold-standard treatment for OCD.', image: "/images/articles/cat13/cover-040.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 9, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['ERP', 'OCD Treatment', 'Therapy'],
  summary: 'Exposure and Response Prevention therapy is the gold-standard treatment for OCD, involving systematic confrontation of feared stimuli while preventing compulsions, producing 60-70% symptom reduction maintained long-term through inhibitory learning mechanisms.',
  keyFacts: [
    { text: 'ERP therapy shows 60-70% symptom reduction rates with effects maintained long-term', citationIndex: 1 },
    { text: 'Treatment works through inhibitory learning—creating new safety associations that compete with fear associations', citationIndex: 2 },
    { text: 'Exposure hierarchies progress gradually from moderately difficult to most feared situations', citationIndex: 3 },
    { text: 'Combination ERP plus SSRIs shows best outcomes for moderate-to-severe OCD', citationIndex: 4 },
    { text: 'ERP alone produces more durable long-term results than medication alone', citationIndex: 5 },
  ],
  sparkMoment: 'The path to freedom from OCD runs directly through the fear—exposure teaches your brain that what you feared was never as dangerous as OCD claimed.',
  practicalExercise: {
    title: 'Creating Your Exposure Hierarchy',
    steps: [
      { title: 'List Your Fears', description: 'Write down all situations, objects, or thoughts that trigger obsessions and compulsions. Be specific: "touching a public doorknob without washing for 10 minutes" rather than just "germs."' },
      { title: 'Rate the Difficulty', description: 'Use a 0-100 scale to rate how anxious each situation makes you. 0 = no anxiety, 100 = maximum anxiety you can imagine. This creates your exposure hierarchy.' },
      { title: 'Identify Compulsions', description: 'For each situation, note what compulsions you perform: washing, checking, reassurance-seeking, mental rituals. These are what you will prevent during exposure.' },
      { title: 'Work With a Therapist', description: 'Bring your hierarchy to an ERP-trained therapist. They will help you start with moderately difficult exposures (40-60 range) and progress systematically, teaching you how to tolerate anxiety without compulsions.' },
    ],
    toolLink: '/find-care',
    toolLabel: 'Find an ERP Therapist',
  },
  citations: [
    { id: '1', text: 'Exposure and response prevention for obsessive-compulsive disorder: A review and new directions', source: 'Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30056-4', tier: 1 },
    { id: '2', text: 'Mechanisms of cognitive-behavioral therapy for obsessive-compulsive disorder: An examination of treatment process', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102055', tier: 1 },
    { id: '3', text: 'Maximizing inhibitory learning in exposure therapy: An inhibitory retrieval approach', source: 'Behaviour Research and Therapy', year: '2020', link: 'https://doi.org/10.1016/j.brat.2020.103687', tier: 1 },
    { id: '4', text: 'Pharmacotherapy augmentation of exposure-based treatment for anxiety disorders: A meta-analysis', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.0001', tier: 1 },
    { id: '5', text: 'Long-term outcomes of cognitive-behavioral therapy for obsessive-compulsive disorder', source: 'Journal of Clinical Psychiatry', year: '2020', link: 'https://doi.org/10.4088/JCP.20m13245', tier: 1 },
    { id: '6', text: 'Acceptance and commitment therapy for OCD: A randomized controlled trial', source: 'Journal of Anxiety Disorders', year: '2021', link: 'https://doi.org/10.1016/j.janxdis.2021.102395', tier: 1 },
    { id: '7', text: 'Deep brain stimulation for treatment-refractory OCD', source: 'American Journal of Psychiatry', year: '2021', link: 'https://doi.org/10.1176/appi.ajp.2020.20060815', tier: 1 },
    { id: '8', text: 'Intensive treatment for OCD: A systematic review', source: 'Comprehensive Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.comppsych.2020.152186', tier: 1 },
  ],
  content: <>
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Imagine intentionally touching a public toilet seat without washing your hands. Leaving your house without checking the locks. Holding a knife while experiencing the intrusive thought about harming someone. For people with OCD, these scenarios trigger overwhelming anxiety. Yet confronting these exact fears—while resisting the compulsion to neutralize the anxiety—is precisely how Exposure and Response Prevention (ERP) therapy works.</p>
      <p className="mb-6">ERP is the gold-standard behavioral treatment for OCD, with decades of research demonstrating 60-70% symptom reduction rates that are maintained long-term <Citation id="1" index={1} source="Lancet Psychiatry" year="2020" tier={1} />. The treatment is deceptively simple in concept but requires courage in practice: systematically confront feared situations or thoughts (exposure) while refraining from performing compulsions or safety behaviors (response prevention).</p>
      <p className="mb-6">Through repeated exposures, the brain learns new information that competes with OCD's false alarms—that feared outcomes do not occur, or if they do, they are tolerable <Citation id="2" index={2} source="Clinical Psychology Review" year="2021" tier={1} />. This process, called inhibitory learning, rewires the neural circuits that maintain OCD, producing lasting change that persists after therapy ends <Citation id="5" index={3} source="Journal of Clinical Psychiatry" year="2020" tier={1} />.</p>
    </div>

    <h2 id="how-erp-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">How ERP Works: The Science of Inhibitory Learning</h2>
    <p className="mb-6">Traditional explanations of ERP focused on habituation—the idea that anxiety naturally decreases if you stay in a feared situation long enough without performing compulsions. While habituation occurs, current research emphasizes inhibitory learning as the primary mechanism <Citation id="3" index={4} source="Behaviour Research and Therapy" year="2020" tier={1} />.</p>
    <p className="mb-6"><strong>The Old Fear Association:</strong> Your brain has learned: "If I touch a doorknob and don't wash, I will get sick." This association is stored in memory and triggers anxiety when you encounter doorknobs. Compulsions (washing) reduce anxiety, reinforcing the belief that washing prevents sickness.</p>
    <p className="mb-6"><strong>Creating a New Association:</strong> During exposure, you deliberately activate the fear (touching a doorknob) while preventing the compulsion (not washing). Your brain learns: "I touched the doorknob, didn't wash, and nothing bad happened." This new safety association competes with the old fear association.</p>
    <p className="mb-6"><strong>Strengthening Inhibitory Learning:</strong> With repeated exposures in varied contexts, the new association strengthens and generalizes. Eventually, encountering doorknobs activates the safety association more strongly than the fear association, and anxiety diminishes.</p>
    <p className="mb-6">The key insight: ERP does not erase fear associations. Instead, it creates competing safety associations that inhibit the fear response. This explains why occasional setbacks can occur (the old association still exists) and why practicing exposures in diverse contexts strengthens treatment effects.</p>

    <ComparisonTable
      title="ERP vs. Traditional Talk Therapy for OCD"
      columns={['Approach', 'ERP', 'Traditional Talk Therapy']}
      items={[
        { feature: 'Focus', values: ['Changing behavior to change thoughts', 'Changing thoughts through insight'] },
        { feature: 'Method', values: ['Systematic exposure + response prevention', 'Discussing feelings, exploring origins of anxiety'] },
        { feature: 'Goal', values: ['Tolerate uncertainty, break compulsion cycle', 'Understand and resolve underlying conflicts'] },
        { feature: 'Effectiveness for OCD', values: ['60-70% symptom reduction (evidence-based)', '10-20% symptom reduction (limited evidence)'] },
        { feature: 'Why it Works/Fails', values: ['Directly targets OCD maintaining factors', 'Does not address behavioral cycle maintaining OCD'] },
      ]}
      highlightColumn={1}
    />

    <h2 id="exposure-hierarchy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Building an Exposure Hierarchy</h2>
    <p className="mb-6">ERP begins by creating an exposure hierarchy—a ranked list of feared situations from least to most anxiety-provoking. Treatment progresses systematically through this hierarchy, starting with moderately difficult exposures rather than jumping to the most feared situations.</p>
    <p className="mb-6"><strong>Example Contamination Hierarchy (0-100 anxiety scale):</strong></p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li>30: Touch doorknob at home without washing for 10 minutes</li>
      <li>40: Touch doorknob in therapist's office without washing</li>
      <li>50: Touch public doorknob without washing for 30 minutes</li>
      <li>60: Touch bathroom door handle in public restroom</li>
      <li>70: Touch toilet seat in public restroom</li>
      <li>80: Touch toilet handle without washing for 1 hour</li>
      <li>90: Touch multiple surfaces in public restroom, then eat food without washing</li>
    </ul>
    <p className="mb-6">Each exposure involves confronting the feared stimulus while preventing all compulsions and safety behaviors (no washing, no hand sanitizer, no wiping hands on clothing, no mental reassurance like "I didn't really touch it" or "I can wash later"). The exposure continues until learning occurs—not necessarily until anxiety decreases, though it often does.</p>

    <BeforeAfter
      before={{
        title: 'Life Before ERP',
        points: [
          'Hours daily consumed by compulsions',
          'Avoidance limits activities and relationships',
          'Constant anxiety and doubt',
          'Feeling controlled by OCD',
          'Believing fears are realistic',
        ]
      }}
      after={{
        title: 'Life After ERP',
        points: [
          'Compulsions reduced or eliminated',
          'Engaging fully in work, relationships, activities',
          'Anxiety manageable, comes and goes',
          'Sense of control over behavior',
          'Recognizing OCD thoughts as false alarms',
        ]
      }}
    />

    <h2 id="what-to-expect" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What to Expect During ERP</h2>
    <p className="mb-6">ERP typically involves 12-20 weekly sessions, though some people benefit from intensive treatment (daily sessions over 2-4 weeks) <Citation id="8" index={5} source="Comprehensive Psychiatry" year="2020" tier={1} />.</p>
    <p className="mb-6"><strong>Initial Sessions:</strong> Psychoeducation about OCD and ERP rationale, creating the exposure hierarchy, identifying all compulsions and safety behaviors (including subtle mental rituals), and beginning with moderately difficult exposures (40-60 on your hierarchy).</p>
    <p className="mb-6"><strong>Middle Sessions:</strong> Progressing through the hierarchy, practicing exposures during sessions with therapist support, assigning home practice (daily exposures between sessions), troubleshooting obstacles, and learning to recognize and resist subtle compulsions.</p>
    <p className="mb-6"><strong>Later Sessions:</strong> Tackling the most feared situations, practicing exposures in diverse contexts to strengthen learning, planning relapse prevention, and transitioning to maintenance practice.</p>
    <p className="mb-6"><strong>Home Practice is Essential:</strong> ERP is not a "talk therapy" conducted only during sessions. Daily exposure practice between sessions is where most learning occurs. Therapists assign specific exposures to practice at home, gradually reducing compulsions throughout the week.</p>

    <QuoteBlock
      quote="The goal of ERP is not to eliminate anxiety—it's to eliminate the compulsions that maintain the obsessions. When you stop feeding OCD with compulsions, it loses its power over you."
      attribution="Dr. Jonathan Grayson"
      role="Director of Anxiety and OCD Treatment Center of Philadelphia"
      source="Freedom from Obsessive-Compulsive Disorder"
      variant="large"
    />

    <h2 id="medication" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Combining ERP With Medication</h2>
    <p className="mb-6">For moderate-to-severe OCD, combining ERP with selective serotonin reuptake inhibitors (SSRIs) produces the best outcomes <Citation id="4" index={6} source="JAMA Psychiatry" year="2021" tier={1} />. SSRIs reduce baseline anxiety, making exposures more tolerable and helping people engage more fully in ERP.</p>
    <p className="mb-6">However, ERP alone produces more durable results than medication alone. Studies show that people treated with ERP maintain gains after treatment ends, whereas stopping SSRIs often leads to symptom return unless ERP skills have been learned. The ideal approach for severe OCD combines both—medication to reduce acute distress and facilitate engagement, ERP to teach lasting skills.</p>
    <p className="mb-6">SSRIs for OCD require higher doses than depression treatment (often 2-3 times the standard antidepressant dose) and 8-12 weeks for full effect. Common medications include fluoxetine, sertraline, fluvoxamine, paroxetine, and clomipramine (a tricyclic with stronger serotonin effects but more side effects).</p>

    <h2 id="other-treatments" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Other Treatment Approaches</h2>
    <p className="mb-6"><strong>Acceptance and Commitment Therapy (ACT):</strong> This "third wave" behavioral therapy shares ERP's focus on exposure but emphasizes psychological flexibility—willingness to experience uncomfortable thoughts and feelings while pursuing valued actions. ACT teaches defusion techniques (seeing thoughts as thoughts, not facts) and values clarification. Research shows comparable effectiveness to traditional ERP <Citation id="6" index={7} source="Journal of Anxiety Disorders" year="2021" tier={1} />.</p>
    <p className="mb-6"><strong>Deep Brain Stimulation (DBS):</strong> For severe, treatment-refractory OCD (failed multiple adequate trials of ERP and medication), deep brain stimulation—implanting electrodes that modulate activity in specific brain circuits—shows promise. About 40-50% of treatment-refractory patients experience significant symptom reduction <Citation id="7" index={8} source="American Journal of Psychiatry" year="2021" tier={1} />. DBS is reserved for the most severe cases due to its invasive nature and risks.</p>
    <p className="mb-6"><strong>Intensive/Residential Treatment:</strong> Some programs offer intensive ERP (daily therapy for weeks), which can be effective for severe OCD or when weekly outpatient treatment has not produced adequate improvement. Intensive formats allow more exposure practice in shorter time frames.</p>

    <ArticleCallout variant="key-takeaway" title="Key Takeaways">
      <ul className="list-disc pl-5 space-y-2">
        <li>ERP is the gold-standard treatment for OCD, producing 60-70% symptom reduction maintained long-term</li>
        <li>Treatment works through inhibitory learning—creating new safety associations that compete with fear</li>
        <li>Exposure hierarchies guide systematic progression from moderately difficult to most feared situations</li>
        <li>Home practice between sessions is essential; ERP is not a "talk therapy" but an action-based treatment</li>
        <li>Combining ERP with SSRIs produces best outcomes for moderate-to-severe OCD</li>
      </ul>
    </ArticleCallout>

    <h2 id="finding-erp" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Finding an ERP Therapist</h2>
    <p className="mb-6">Not all therapists are trained in ERP. Traditional talk therapy—exploring the origins of anxiety, discussing feelings, or trying to reassure yourself the feared outcome will not happen—is not effective for OCD and can inadvertently reinforce compulsions.</p>
    <p className="mb-6">Look for therapists specifically trained in ERP or cognitive-behavioral therapy for OCD. Ask potential therapists: "Are you trained in exposure and response prevention for OCD? What does ERP involve? Will we do exposures during sessions and assign home practice?" Therapists who emphasize insight-oriented approaches or say you do not need to do exposures are likely not ERP-trained.</p>
    <p className="mb-6">The International OCD Foundation (iocdf.org) maintains a provider directory of therapists who have demonstrated training in ERP. The Association for Behavioral and Cognitive Therapies (abct.org) also has a "Find a Therapist" directory with OCD filters.</p>
    <p className="mb-6">ERP requires courage—confronting your deepest fears is difficult. But it works. The path to freedom from OCD runs directly through the fear, and with skilled guidance and consistent practice, most people can reclaim their lives from OCD's grip.</p>
  </> },
];
