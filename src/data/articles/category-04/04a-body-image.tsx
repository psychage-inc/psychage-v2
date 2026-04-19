/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SELF_WORTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const bodyImageArticlesA: Article[] = [
  {
    id: catId(31),
    slug: 'body-image-mental-health-how-you-see-yourself-matters',
    title: 'Body Image and Mental Health: How You See Yourself Matters',
    description: 'Explore the powerful connection between body image and mental wellbeing, and why how you see your body affects how you feel overall.',
    image: "/images/articles/cat04/cover-031.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Body Image', 'Self-Perception', 'Mental Health', 'Self-Esteem'],
    citations: [
      {
        id: '1',
        text: 'Body Image and Mental Health: A Review',
        source: 'Journal of Eating Disorders',
        year: '2020',
        link: 'https://doi.org/10.1186/s40337-020-00360-5',
        tier: 1,
      },
      {
        id: '2',
        text: 'Body dissatisfaction, depression, and anxiety in adolescents and young adults',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101838',
        tier: 1,
      },
      {
        id: '3',
        text: 'The relationship between body image and psychological well-being',
        source: 'Body Image',
        year: '2021',
        link: 'https://doi.org/10.1016/j.bodyim.2021.03.009',
        tier: 1,
      },
      {
        id: '4',
        text: 'Body Image and Self-Esteem',
        source: 'National Eating Disorders Association',
        year: '2023',
        link: 'https://www.nationaleatingdisorders.org/body-image',
        tier: 3,
      },
      {
        id: '5',
        text: 'Negative body image and mental health outcomes: A meta-analysis',
        source: 'Psychological Bulletin',
        year: '2020',
        link: 'https://doi.org/10.1037/bul0000251',
        tier: 1,
      },
      {
        id: '6',
        text: 'Body appreciation and psychological health',
        source: 'Body Image',
        year: '2019',
        link: 'https://doi.org/10.1016/j.bodyim.2019.08.012',
        tier: 1,
      },
      {
        id: '7',
        text: 'The tripartite influence model of body image and eating disturbance',
        source: 'International Journal of Eating Disorders',
        year: '2021',
        link: 'https://doi.org/10.1002/eat.23498',
        tier: 1,
      },
      {
        id: '8',
        text: 'Body image disturbance and its impact on quality of life',
        source: 'Journal of Health Psychology',
        year: '2020',
        link: 'https://doi.org/10.1177/1359105318820104',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            When you look in the mirror, you're not seeing objective reality. You're seeing an image filtered through beliefs, comparisons, and cultural messages about what bodies 'should' look like. This perception---your body image---isn't superficial vanity. It's deeply connected to your mental health, self-worth, and overall wellbeing.
          </p>
          <p className="mb-6">
            Body image refers to how you perceive, think about, and feel about your physical appearance. Research shows that negative body image correlates significantly with depression, anxiety, low self-esteem, and eating disorders <Citation id="1" index={1} source="Journal of Eating Disorders" year="2020" tier={1} />. The relationship is bidirectional: poor body image contributes to mental health struggles, and mental health difficulties can worsen body image <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-body-image" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Body Image?
        </h2>
        <p className="mb-6">
          Body image is multidimensional, involving several interconnected components <Citation id="3" index={3} source="Body Image" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'perceptual',
              title: 'Perceptual Component',
              content: (
                <p>
                  How you perceive your body size, shape, and appearance. This can be distorted---you may perceive yourself as larger, smaller, or different than you objectively are. Body dysmorphia represents an extreme version of perceptual distortion.
                </p>
              ),
            },
            {
              id: 'affective',
              title: 'Affective Component',
              content: (
                <p>
                  The feelings you have about your appearance. Do you feel satisfied, neutral, or distressed about how you look? Negative affect (shame, disgust, anxiety) about your body is particularly harmful to mental health.
                </p>
              ),
            },
            {
              id: 'cognitive',
              title: 'Cognitive Component',
              content: (
                <p>
                  The thoughts and beliefs about your body. Examples include "I'm too fat,", "No one will find me attractive," or "My worth depends on how I look." These thoughts often involve rigid rules and comparisons.
                </p>
              ),
            },
            {
              id: 'behavioral',
              title: 'Behavioral Component',
              content: (
                <p>
                  The actions you take based on body image. This includes body checking (constantly weighing yourself, measuring body parts), avoidance (not going to social events, avoiding mirrors), and appearance-fixing behaviors (excessive grooming, cosmetic procedures).
                </p>
              ),
            },
          ]}
        />

        <h2 id="the-connection" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Body Image-Mental Health Connection
        </h2>
        <p className="mb-6">
          Negative body image doesn't just mean feeling bad about your appearance---it's linked to a range of mental health outcomes:
        </p>

        <StatCard
          stats={[
            { value: 60, suffix: '%', label: 'Adults report body dissatisfaction' },
            { value: 2, suffix: 'x', label: 'Higher risk of depression with poor body image' },
            { value: 80, suffix: '%', label: 'People with eating disorders have body image disturbance' },
          ]}
          source="Psychological Bulletin & Clinical Psychology Review, 2020"
        />

        <p className="mb-6 mt-6">
          <strong>Specific mental health impacts:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Depression:</strong> Body dissatisfaction correlates strongly with depressive symptoms, low mood, and hopelessness <Citation id="5" index={5} source="Psychological Bulletin" year="2020" tier={1} /></li>
          <li><strong>Anxiety:</strong> Worry about appearance, social anxiety in situations where body is visible (beaches, gyms, intimate settings)</li>
          <li><strong>Low self-esteem:</strong> When appearance becomes a core component of self-worth, body dissatisfaction erodes global self-esteem</li>
          <li><strong>Eating disorders:</strong> Body image disturbance is a central feature of anorexia nervosa, bulimia nervosa, and binge eating disorder</li>
          <li><strong>Social withdrawal:</strong> Avoiding situations that involve body exposure or comparison</li>
          <li><strong>Reduced quality of life:</strong> Impaired relationships, work performance, and overall life satisfaction <Citation id="8" index={8} source="Journal of Health Psychology" year="2020" tier={1} /></li>
        </ul>

        <h2 id="why-it-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Body Image Matters So Much
        </h2>
        <p className="mb-6">
          Several factors explain why body image has such a powerful impact on mental health:
        </p>

        <ComparisonTable
          title="Mechanisms Linking Body Image to Mental Health"
          columns={['Mechanism', 'How It Works', 'Example']}
          items={[
            {
              feature: 'Identity integration',
              values: [
                'Appearance becomes central to self-concept',
                'I am my body; if my body is flawed, I am flawed',
              ],
            },
            {
              feature: 'Social comparison',
              values: [
                'Constant comparison to others/ideals',
                'Everyone else looks better than me',
              ],
            },
            {
              feature: 'Appearance-based worth',
              values: [
                'Tying value to appearance',
                'I need to look a certain way to be lovable/successful',
              ],
            },
            {
              feature: 'Visibility of the body',
              values: [
                'Your body is always with you',
                "Can't escape the source of distress",
              ],
            },
            {
              feature: 'Cultural messaging',
              values: [
                'Unrealistic beauty standards from media',
                'Thin ideal, muscular ideal, anti-aging messages',
              ],
            },
          ]}
          highlightColumn={1}
        />

        <h2 id="positive-body-image" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Positive Body Image Looks Like
        </h2>
        <p className="mb-6">
          Positive body image isn't about thinking you're perfect or loving every aspect of your appearance. It's a flexible, realistic, and compassionate relationship with your body <Citation id="6" index={6} source="Body Image" year="2019" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Negative Body Image',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Rigid focus on perceived flaws</li>
                <li>Worth tied to appearance meeting standards</li>
                <li>Constant comparison to others</li>
                <li>Shame, disgust, anxiety about body</li>
                <li>Avoidance of body-exposing situations</li>
                <li>Body checking or mirror avoidance</li>
                <li>"I'll be happy when I look different"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Positive Body Image',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Appreciates what body can do</li>
                <li>Worth not dependent on appearance</li>
                <li>Resists comparison, focuses on own experience</li>
                <li>Acceptance, respect, care for body</li>
                <li>Engages in life without appearance-based avoidance</li>
                <li>Realistic perception without obsession</li>
                <li>"My body is one part of who I am"</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          Body appreciation---actively valuing your body for its functionality and treating it with care---is particularly protective for mental health <Citation id="6" index={6} source="Body Image" year="2019" tier={1} />.
        </p>

        <h2 id="influences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Shapes Body Image?
        </h2>
        <p className="mb-6">
          Body image is influenced by multiple sources <Citation id="7" index={7} source="International Journal of Eating Disorders" year="2021" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Media and Social Media',
              description: (
                <p>
                  Exposure to idealized, edited images sets unrealistic standards. Instagram, TikTok, and other platforms amplify comparison. Filters and editing normalize digitally altered appearances.
                </p>
              ),
            },
            {
              title: 'Peer Influence',
              description: (
                <p>
                  Conversations about weight, dieting, and appearance ('fat talk') normalize body dissatisfaction. Peer teasing or bullying about appearance has lasting effects.
                </p>
              ),
            },
            {
              title: 'Family Messages',
              description: (
                <p>
                  Comments from family members about your body or their own bodies shape early perceptions. Modeling of dieting, body checking, or appearance-focused behavior teaches these patterns.
                </p>
              ),
            },
            {
              title: 'Cultural Beauty Standards',
              description: (
                <p>
                  Dominant culture's ideals (thinness for women, muscularity for men, anti-aging for all) create narrow acceptable ranges. These standards are often racialized, ableist, and exclusionary.
                </p>
              ),
            },
            {
              title: 'Personal Experiences',
              description: (
                <p>
                  Weight-related teasing, sexual objectification, discrimination based on appearance, or trauma related to the body all contribute to body image disturbance.
                </p>
              ),
            },
          ]}
        />

        <h2 id="improving" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Improving Body Image for Mental Health
        </h2>
        <p className="mb-6">
          Because body image and mental health are so interconnected, addressing body image can improve overall psychological wellbeing <Citation id="4" index={4} source="National Eating Disorders Association" year="2023" tier={3} />:
        </p>

        <ArticleCallout variant="tip">
          <p className="font-semibold mb-3">Evidence-based strategies:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Reduce social media comparison:</strong> Unfollow accounts that trigger negative comparisons; follow body-diverse, function-focused content</li>
            <li><strong>Practice body appreciation:</strong> Focus on what your body enables you to do (walk, hug, create, experience) rather than how it looks</li>
            <li><strong>Challenge appearance-based thoughts:</strong> Notice and reframe thoughts like "I'm ugly' or "I need to look different to be worthy"</li>
            <li><strong>Diversify beauty exposure:</strong> Seek out images of diverse body types, ages, abilities, and appearances</li>
            <li><strong>Engage in self-care not tied to appearance:</strong> Movement for feeling good, eating for nourishment and pleasure, rest for recovery</li>
            <li><strong>Limit body checking:</strong> Reduce weighing, measuring, mirror-checking behaviors that reinforce fixation</li>
            <li><strong>Seek professional help if needed:</strong> Therapy (especially CBT) is effective for body image disturbance</li>
          </ul>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway">
          <p>
            Body image---how you perceive, think about, and feel about your physical appearance---is intimately connected to mental health. Negative body image significantly increases risk for depression, anxiety, low self-esteem, and eating disorders. Improving body image isn't about achieving a certain appearance; it's about developing a flexible, compassionate relationship with your body that doesn't tie your worth to how you look. This shift can profoundly improve overall psychological wellbeing.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(32),
    slug: 'body-dysmorphia-vs-normal-dissatisfaction-where-is-the-line',
    title: `Body Dysmorphia vs. Normal Body Dissatisfaction: Where's the Line?`,
    description: "Understand the difference between common body image concerns and body dysmorphic disorder, and when dissatisfaction becomes clinically significant.",
    image: "/images/articles/cat04/cover-032.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Body Dysmorphic Disorder', 'Body Image', 'Mental Health', 'Diagnosis'],
    citations: [
      {
        id: '1',
        text: 'Body Dysmorphic Disorder',
        source: 'DSM-5-TR',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '2',
        text: 'Prevalence and clinical features of body dysmorphic disorder',
        source: 'Journal of Psychiatric Research',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jpsychires.2021.01.015',
        tier: 1,
      },
      {
        id: '3',
        text: 'Body dysmorphic disorder vs. normal appearance concerns',
        source: 'Body Image',
        year: '2020',
        link: 'https://doi.org/10.1016/j.bodyim.2020.09.012',
        tier: 1,
      },
      {
        id: '4',
        text: 'Cognitive-behavioral model of body dysmorphic disorder',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101831',
        tier: 1,
      },
      {
        id: '5',
        text: 'Body Dysmorphic Disorder: Recognition and Treatment',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2020.19111153',
        tier: 1,
      },
      {
        id: '6',
        text: 'Muscle dysmorphia: A variant of body dysmorphic disorder',
        source: 'International Journal of Eating Disorders',
        year: '2021',
        link: 'https://doi.org/10.1002/eat.23450',
        tier: 1,
      },
      {
        id: '7',
        text: 'Suicide risk in body dysmorphic disorder',
        source: 'Journal of Clinical Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.4088/JCP.19r13297',
        tier: 1,
      },
      {
        id: '8',
        text: 'Evidence-based treatment for body dysmorphic disorder',
        source: 'Behaviour Research and Therapy',
        year: '2021',
        link: 'https://doi.org/10.1016/j.brat.2021.103891',
        tier: 1,
      },
      {
        id: '9',
        text: 'Body dysmorphic disorder by proxy',
        source: 'American Journal of Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1176/appi.ajp.2019.18121400',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Most people have body parts they wish looked different. But for some, perceived flaws become an obsession that dominates daily life---hours spent in the mirror, avoiding social situations, seeking cosmetic procedures that never satisfy. This is the line between normal body dissatisfaction and body dysmorphic disorder (BDD), and it's important to recognize.
          </p>
          <p className="mb-6">
            Body dysmorphic disorder is a mental health condition characterized by obsessive preoccupation with perceived defects in appearance that are either minimal or not observable to others <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. While 60% of adults report some body dissatisfaction, only about 2-3% meet criteria for BDD <Citation id="2" index={2} source="Journal of Psychiatric Research" year="2021" tier={1} />. The difference is one of degree, intensity, and impact on functioning.
          </p>
        </div>

        <h2 id="normal-dissatisfaction" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Normal Body Dissatisfaction
        </h2>
        <p className="mb-6">
          Common, non-clinical body image concerns typically involve <Citation id="3" index={3} source="Body Image" year="2020" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Occasional dissatisfaction:</strong> Wishing certain features looked different, but not constantly thinking about them</li>
          <li><strong>Contextual discomfort:</strong> Feeling self-conscious in specific situations (wearing swimsuit, seeing photos) but not avoiding life</li>
          <li><strong>Realistic perception:</strong> Seeing your body mostly accurately, even if you wish it were different</li>
          <li><strong>Limited time spent:</strong> Occasional appearance-related thoughts or behaviors (checking mirror, grooming) but not hours daily</li>
          <li><strong>Functioning intact:</strong> Work, relationships, and daily activities continue despite appearance concerns</li>
          <li><strong>Proportional distress:</strong> Mild to moderate discomfort, not severe emotional suffering</li>
        </ul>

        <ArticleCallout variant="info">
          <p>
            Normal body dissatisfaction is uncomfortable and worth addressing for wellbeing, but it doesn't meet the threshold for a clinical disorder. It's ego-syntonic (aligned with reality) and manageable.
          </p>
        </ArticleCallout>

        <h2 id="bdd-features" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Body Dysmorphic Disorder: Diagnostic Features
        </h2>
        <p className="mb-6">
          BDD is defined by three core criteria <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Preoccupation with Perceived Defect',
              description: (
                <p>
                  Excessive concern with one or more perceived flaws in physical appearance that are not observable or appear slight to others. Common areas of focus include skin (acne, scars, wrinkles), nose, hair (thinning, excess body hair), weight/shape, or perceived asymmetry.
                </p>
              ),
            },
            {
              title: 'Repetitive Behaviors or Mental Acts',
              description: (
                <div>
                  <p className="mb-3">At some point, the person performs repetitive behaviors in response to appearance concerns:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Mirror checking (or mirror avoidance)</li>
                    <li>Excessive grooming</li>
                    <li>Skin picking</li>
                    <li>Reassurance seeking</li>
                    <li>Comparing appearance to others</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Significant Distress or Impairment',
              description: (
                <p>
                  The preoccupation causes clinically significant distress or impairment in social, occupational, or other important areas of functioning. This is the key distinguisher: BDD disrupts life.
                </p>
              ),
            },
          ]}
        />

        <h2 id="key-differences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Differences: Normal Concern vs. BDD
        </h2>

        <ComparisonTable
          title="Normal Body Dissatisfaction vs. Body Dysmorphic Disorder"
          columns={['Feature', 'Normal Dissatisfaction', 'Body Dysmorphic Disorder']}
          items={[
            {
              feature: 'Time spent thinking',
              values: ['Occasional, minutes daily', '3-8 hours daily on average'],
            },
            {
              feature: 'Perception accuracy',
              values: ['Mostly accurate', "Distorted; sees flaws others don't"],
            },
            {
              feature: 'Insight',
              values: ['Knows concern may be exaggerated', 'Poor to absent insight; convinced flaw is obvious'],
            },
            {
              feature: 'Impact on life',
              values: ['Mild discomfort, life continues', 'Avoids work, socializing, relationships; severe impairment'],
            },
            {
              feature: 'Reassurance seeking',
              values: ['Occasional', 'Constant, never satisfied'],
            },
            {
              feature: 'Cosmetic procedures',
              values: ['May consider, usually satisfied', 'Seeks multiple procedures, never satisfied'],
            },
            {
              feature: 'Emotional intensity',
              values: ['Mild-moderate distress', 'Severe shame, disgust, anxiety, depression'],
            },
          ]}
          highlightColumn={2}
        />

        <h2 id="cognitive-behavioral-model" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How BDD Develops and Persists
        </h2>
        <p className="mb-6">
          BDD operates through a vicious cycle of selective attention, cognitive distortions, and safety behaviors <Citation id="4" index={4} source="Clinical Psychology Review" year="2020" tier={1} />:
        </p>

        <ArticleAccordion
          type="single"
          items={[
            {
              id: 'selective-attention',
              title: '1. Selective Attention to Flaw',
              content: (
                <p>
                  The person focuses intensely on the perceived defect, scanning for it constantly. This selective attention makes the 'flaw' seem more prominent and confirms its importance.
                </p>
              ),
            },
            {
              id: 'distorted-perception',
              title: '2. Perceptual Distortion',
              content: (
                <p>
                  The brain's visual processing becomes distorted---magnifying, exaggerating, or even hallucinating the perceived defect. Neuroimaging shows people with BDD process visual information differently, focusing on details rather than the whole.
                </p>
              ),
            },
            {
              id: 'negative-interpretation',
              title: '3. Catastrophic Interpretation',
              content: (
                <p>
                  The perceived flaw is interpreted as grotesque, repulsive, or socially disqualifying. Example: 'My nose is hideous; everyone is staring at it and judging me.'
                </p>
              ),
            },
            {
              id: 'safety-behaviors',
              title: '4. Safety Behaviors',
              content: (
                <div>
                  <p className="mb-3">To manage anxiety, the person engages in repetitive behaviors:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Checking:</strong> Mirror-checking, photo-taking, touching the area</li>
                    <li><strong>Camouflaging:</strong> Using makeup, clothing, posture, or hair to hide the "flaw"</li>
                    <li><strong>Reassurance-seeking:</strong> Asking others "Does my [body part] look okay?"</li>
                    <li><strong>Avoidance:</strong> Staying home, avoiding mirrors, declining social invitations</li>
                    <li><strong>Seeking procedures:</strong> Pursuing cosmetic treatments or surgery</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'reinforcement',
              title: '5. Reinforcement of Obsession',
              content: (
                <p>
                  These behaviors provide temporary relief but strengthen the obsession. Checking confirms the flaw exists; camouflaging reinforces that it must be hidden; reassurance-seeking never satisfies because the underlying belief ("I'm defective") remains.
                </p>
              ),
            },
          ]}
        />

        <h2 id="prevalence-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Prevalence and Impact
        </h2>

        <StatCard
          stats={[
            { value: 2.4, suffix: '%', label: 'Adults meet criteria for BDD' },
            { value: 80, suffix: '%', label: 'Onset in adolescence' },
            { value: 25, suffix: '%', label: 'Attempt suicide (one of highest rates)' },
          ]}
          source="Journal of Psychiatric Research & Journal of Clinical Psychiatry, 2020-2021"
        />

        <p className="mb-6 mt-6">
          BDD is seriously impairing and often comorbid with other conditions <Citation id="5" index={5} source="American Journal of Psychiatry" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>High comorbidity:</strong> 75% have major depression, 60% have social anxiety disorder, 30% have OCD</li>
          <li><strong>Social impairment:</strong> Many people with BDD avoid dating, work, or school due to appearance concerns</li>
          <li><strong>Suicide risk:</strong> BDD has one of the highest suicide attempt rates of any mental disorder <Citation id="7" index={7} source="Journal of Clinical Psychiatry" year="2020" tier={1} /></li>
          <li><strong>Functional disability:</strong> Work/school performance significantly impaired</li>
          <li><strong>Treatment-seeking:</strong> Most seek cosmetic procedures, not mental health treatment</li>
        </ul>

        <h2 id="special-presentations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Special Presentations of BDD
        </h2>

        <ArticleCallout variant="clinical-note">
          <p className="font-semibold mb-3">Variants and related conditions:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Muscle dysmorphia:</strong> Obsessive preoccupation with being insufficiently muscular (primarily affects men). Excessive weightlifting, steroid use, avoiding situations where body is visible <Citation id="6" index={6} source="International Journal of Eating Disorders" year="2021" tier={1} /></li>
            <li><strong>BDD by proxy:</strong> Preoccupation with perceived defects in another person's appearance (often a child), leading to seeking cosmetic procedures for them <Citation id="9" index={9} source="American Journal of Psychiatry" year="2019" tier={1} /></li>
            <li><strong>Delusional variant:</strong> When insight is completely absent and the person is fully convinced the defect is real and severe (about 25-40% of BDD cases)</li>
          </ul>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If body image concerns cross these thresholds, professional evaluation is warranted:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Spending 1+ hours daily thinking about perceived flaws</li>
          <li>Avoiding work, school, social situations, or relationships due to appearance concerns</li>
          <li>Engaging in repetitive checking, grooming, reassurance-seeking, or camouflaging behaviors</li>
          <li>Seeking or undergoing multiple cosmetic procedures without satisfaction</li>
          <li>Experiencing significant distress, depression, or suicidal thoughts related to appearance</li>
          <li>Others express concern that your perception of the flaw seems exaggerated</li>
        </ul>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment for BDD
        </h2>
        <p className="mb-6">
          BDD is treatable, though it often goes unrecognized. Evidence-based treatments include <Citation id="8" index={8} source="Behaviour Research and Therapy" year="2021" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Ineffective Approaches',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cosmetic procedures:</strong> Rarely satisfy; often worsen BDD by reinforcing focus on appearance</li>
                <li><strong>Reassurance-seeking:</strong> Provides temporary relief but maintains the cycle</li>
                <li><strong>Ignoring the problem:</strong> BDD doesn't spontaneously remit</li>
              </ul>
            ),
          }}
          after={{
            title: 'Evidence-Based Treatment',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>CBT for BDD:</strong> Specialized cognitive-behavioral therapy targeting perceptual retraining, cognitive restructuring, exposure to avoided situations, and response prevention</li>
                <li><strong>SSRIs:</strong> Selective serotonin reuptake inhibitors (often at higher doses than for depression)</li>
                <li><strong>Combined treatment:</strong> CBT + medication is most effective for moderate to severe BDD</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          The goal of treatment isn't to convince someone they're attractive---it's to reduce the obsessive focus on appearance, improve functioning, and help people engage in life despite imperfections.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            The line between normal body dissatisfaction and body dysmorphic disorder is drawn by intensity, time consumed, perceptual distortion, and functional impairment. While most people wish some features looked different, BDD involves obsessive preoccupation that dominates daily life and severely impairs functioning. Recognizing this distinction is crucial: BDD is a serious mental health condition requiring specialized treatment, not a cosmetic problem requiring aesthetic intervention.
          </p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(33),
    slug: 'social-media-body-image-filter-effect-self-perception',
    title: 'Social Media and Body Image: The Filter Effect on Self-Perception',
    description: 'Explore how social media filters, photo editing, and curated content distort body image and what you can do to protect your mental health.',
    image: "/images/articles/cat04/cover-033.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Media', 'Body Image', 'Self-Perception', 'Digital Wellbeing'],
    citations: [
      { id: '1', text: 'Social media use and body image concerns', source: 'Body Image', year: '2021', link: 'https://doi.org/10.1016/j.bodyim.2021.02.006', tier: 1 },
      { id: '2', text: 'Filtered reality: The impact of Instagram filters on body dissatisfaction', source: 'Computers in Human Behavior', year: '2022', link: 'https://doi.org/10.1016/j.chb.2022.107235', tier: 1 },
      { id: '3', text: 'Social comparison and body image on social media', source: 'Psychology of Popular Media', year: '2020', link: 'https://doi.org/10.1037/ppm0000264', tier: 1 },
      { id: '4', text: 'Digital media literacy and body image', source: 'Media Psychology', year: '2021', link: 'https://doi.org/10.1080/15213269.2021.1929670', tier: 1 },
      { id: '5', text: 'The Selfie Dysmorphia phenomenon', source: 'JAMA Facial Plastic Surgery', year: '2018', link: 'https://doi.org/10.1001/jamafacial.2018.0486', tier: 1 },
      { id: '6', text: 'Social media detox and mental health outcomes', source: 'Cyberpsychology, Behavior, and Social Networking', year: '2020', link: 'https://doi.org/10.1089/cyber.2019.0578', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You scroll through Instagram and see flawless skin, perfect bodies, aspirational lifestyles. What you're seeing isn't reality---it's a heavily curated, edited version. Yet your brain processes these images as comparisons, and your body image suffers. Social media hasn't just changed how we communicate; it's fundamentally altered how we perceive ourselves.
          </p>
          <p className="mb-6">
            Research shows that increased social media use correlates with higher body dissatisfaction, especially among adolescents and young adults <Citation id="1" index={1} source="Body Image" year="2021" tier={1} />. The "filter effect"---both literal (photo filters) and metaphorical (selective sharing)---creates unrealistic beauty standards that even the people posting don't actually meet <Citation id="2" index={2} source="Computers in Human Behavior" year="2022" tier={1} />.
          </p>
        </div>

        <h2 id="mechanisms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Social Media Distorts Body Image
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            { id: 'comparison', title: 'Upward Social Comparison', content: <p>You compare your behind-the-scenes reality to others" highlight reels. Seeing 'better' bodies triggers feelings of inadequacy, even though the comparison is fundamentally unfair <Citation id="3" index={3} source="Psychology of Popular Media" year="2020" tier={1} />.</p> },
            { id: 'filters', title: 'Normalization of Digital Alteration', content: <p>Filters smooth skin, enlarge eyes, slim faces. When filtered images become the norm, unedited reality looks 'wrong." This creates "Snapchat dysmorphia"---people seeking cosmetic procedures to look like their filtered selves <Citation id="5" index={5} source="JAMA Facial Plastic Surgery" year="2018" tier={1} />.</p> },
            { id: 'algorithms', title: 'Algorithm-Driven Exposure', content: <p>Platforms show you content similar to what you engage with. If you interact with fitness or beauty content, the algorithm floods your feed with idealized bodies, intensifying comparison.</p> },
            { id: 'validation', title: 'Likes as Appearance Validation', content: <p>When appearance-based posts get likes, it reinforces tying self-worth to looks. The pursuit of validation becomes addictive and anxiety-inducing.</p> },
          ]}
        />

        <h2 id="protecting-yourself" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Protecting Your Body Image Online
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Curate Your Feed', description: <p>Unfollow accounts that trigger comparison. Follow body-diverse, filter-free, function-focused content.</p> },
            { title: 'Use Filters Mindfully', description: <p>Notice when you use filters. Ask: Am I enhancing creativity or hiding perceived flaws? The latter reinforces negative body image.</p> },
            { title: 'Practice Media Literacy', description: <p>Remind yourself: this is curated, edited, not reality. Even influencers don't look like their posts <Citation id="4" index={4} source="Media Psychology" year="2021" tier={1} />.</p> },
            { title: 'Limit Exposure', description: <p>Set time limits. Research shows even a one-week social media break can improve body image and mood <Citation id="6" index={6} source="Cyberpsychology, Behavior, and Social Networking" year="2020" tier={1} />.</p> },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Social media creates a distorted mirror: curated, filtered, algorithmically amplified. Protecting your body image requires active curation of what you consume, critical media literacy, and recognition that what you see online is a highlight reel, not reality. Your unedited self is the only version that matters.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(34),
    slug: 'male-body-image-issues-overlooked-crisis',
    title: 'Male Body Image Issues: The Overlooked Crisis',
    description: 'Men face significant body image pressures---muscle dysmorphia, height anxiety, hair loss. Learn why male body dissatisfaction is rising and under-discussed.',
    image: "/images/articles/cat04/cover-034.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Male Body Image', 'Muscle Dysmorphia', 'Mens Health', 'Masculinity'],
    citations: [
      { id: '1', text: 'Body dissatisfaction in men: A review', source: 'Body Image', year: '2020', link: 'https://doi.org/10.1016/j.bodyim.2020.06.002', tier: 1 },
      { id: '2', text: 'Muscle dysmorphia in men', source: 'International Journal of Eating Disorders', year: '2021', link: 'https://doi.org/10.1002/eat.23450', tier: 1 },
      { id: '3', text: 'The muscular ideal and psychological health', source: 'Psychology of Men & Masculinities', year: '2020', link: 'https://doi.org/10.1037/men0000252', tier: 1 },
      { id: '4', text: 'Male body image and mental health outcomes', source: 'Journal of Health Psychology', year: '2021', link: 'https://doi.org/10.1177/1359105320913913', tier: 1 },
      { id: '5', text: 'Social media and male body dissatisfaction', source: 'New Media & Society', year: '2020', link: 'https://doi.org/10.1177/1461444820912514', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Body image issues are often framed as a women's problem. But research shows men experience significant body dissatisfaction too---it just manifests differently. While women face pressure to be thin, men face pressure to be muscular, tall, and have a full head of hair. And unlike women's body image struggles, men's are rarely discussed.
          </p>
          <p className="mb-6">
            Studies find 90% of teen boys and 70% of adult men report body dissatisfaction <Citation id="1" index={1} source="Body Image" year="2020" tier={1} />. Male body image concerns are rising, linked to social media exposure, idealized male physiques in media, and cultural messages about masculinity <Citation id="4" index={4} source="Journal of Health Psychology" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="male-ideal" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Muscular Ideal
        </h2>
        <p className="mb-6">
          While the female ideal emphasizes thinness, the male ideal emphasizes muscularity: broad shoulders, defined abs, low body fat paired with high muscle mass. This "V-shaped" ideal is increasingly unattainable without intensive training and often steroid use <Citation id="3" index={3} source="Psychology of Men & Masculinities" year="2020" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 90, suffix: '%', label: 'Teen boys report wanting to be more muscular' },
            { value: 25, suffix: '%', label: 'College men show muscle dysmorphia symptoms' },
            { value: 45, suffix: '%', label: 'Men would trade a year of life for ideal body' },
          ]}
          source="International Journal of Eating Disorders, 2021"
        />

        <h2 id="muscle-dysmorphia" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Muscle Dysmorphia: "Bigorexia"
        </h2>
        <p className="mb-6">
          Muscle dysmorphia is a form of body dysmorphic disorder where men believe they're too small or insufficiently muscular, despite often being objectively muscular <Citation id="2" index={2} source="International Journal of Eating Disorders" year="2021" tier={1} />. Behaviors include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Excessive weightlifting (3+ hours daily)</li>
          <li>Strict, rigid diets focused on protein and muscle gain</li>
          <li>Steroid or supplement use despite health risks</li>
          <li>Avoiding situations where body is visible (beaches, pools)</li>
          <li>Distress when missing workouts</li>
          <li>Relationships and work impaired by gym commitment</li>
        </ul>

        <h2 id="other-concerns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Other Male Body Image Concerns
        </h2>
        <ComparisonTable
          title="Common Male Body Image Pressures"
          columns={['Concern', 'Manifestation', 'Impact']}
          items={[
            { feature: 'Height', values: ['Belief that being short makes them less masculine/attractive', 'Social withdrawal, dating anxiety, considering limb-lengthening surgery'] },
            { feature: 'Hair loss', values: ['Distress about balding, feeling less attractive', 'Costly treatments, avoidance of photos, reduced confidence'] },
            { feature: 'Penis size', values: ["Belief they're inadequate despite being average", 'Sexual anxiety, relationship avoidance, considering dangerous procedures'] },
            { feature: 'Gynecomastia', values: ["Enlarged chest tissue ('man boobs')", 'Avoiding shirtless situations, surgery-seeking'] },
          ]}
          highlightColumn={2}
        />

        <h2 id="social-media" className="text-3xl font-display font-bold text-gray-900 dark:text-neutral-300 mt-12 mb-6 scroll-mt-32">
          Social Media's Role
        </h2>
        <p className="mb-6">
          Instagram and TikTok expose men to idealized physiques---often achieved through professional lighting, posing, dehydration for photo shoots, and steroids. Yet these images are processed as realistic comparisons <Citation id="5" index={5} source="New Media & Society" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Male body image issues are common, serious, and under-discussed. The muscular ideal, height anxiety, and hair loss create significant distress. Men need permission to acknowledge these struggles without it being seen as unmasculine. Body image isn't a gendered issue---it affects everyone, just differently.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(35),
    slug: 'body-neutrality-alternative-to-body-positivity',
    title: 'Body Neutrality: An Alternative to Body Positivity',
    description: 'Body positivity demands you love your body. Body neutrality offers a middle path: acceptance without obsession. Learn this compassionate alternative.',
    image: "/images/articles/cat04/cover-035.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Body Neutrality', 'Body Positivity', 'Self-Acceptance', 'Body Image'],
    citations: [
      { id: '1', text: 'Body neutrality vs. body positivity', source: 'Body Image', year: '2021', link: 'https://doi.org/10.1016/j.bodyim.2021.08.011', tier: 1 },
      { id: '2', text: 'Body functionality and mental health', source: 'Psychology of Women Quarterly', year: '2020', link: 'https://doi.org/10.1177/0361684320937605', tier: 1 },
      { id: '3', text: 'Body appreciation and psychological wellbeing', source: 'Body Image', year: '2019', link: 'https://doi.org/10.1016/j.bodyim.2019.08.012', tier: 1 },
      { id: '4', text: 'Limitations of body positivity movement', source: 'Feminist Media Studies', year: '2020', link: 'https://doi.org/10.1080/14680777.2020.1837908', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            "Love your body!" the body positivity movement declares. But what if you don't? What if forcing yourself to love your appearance feels dishonest, exhausting, or impossible? Body neutrality offers an alternative: you don't have to love or hate your body. You can simply... be okay with it existing.
          </p>
          <p className="mb-6">
            Body neutrality shifts focus from how your body looks to what it does. Instead of demanding positive feelings about appearance, it encourages acceptance, functionality, and de-centering appearance from self-worth <Citation id="1" index={1} source="Body Image" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="difference" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Body Positivity vs. Body Neutrality
        </h2>
        <ComparisonTable
          title="Two Approaches to Body Image"
          columns={['Aspect', 'Body Positivity', 'Body Neutrality']}
          items={[
            { feature: 'Core message', values: ['Love your body as it is', 'Your body is neutral---neither good nor bad'] },
            { feature: 'Focus', values: ['Appearance (reframed positively)', 'Functionality and acceptance'] },
            { feature: 'Emotional goal', values: ['Positive feelings about appearance', "Neutral acceptance; appearance isn't identity"] },
            { feature: 'When helpful', values: ['Countering negative body talk', 'When forcing positivity feels inauthentic'] },
            { feature: 'Potential limitation', values: ['Can feel performative or unattainable', 'May seem passive or defeatist'] },
          ]}
          highlightColumn={2}
        />

        <h2 id="principles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Principles of Body Neutrality
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Your Body Is an Instrument, Not an Ornament', description: <p>Shift from 'How does it look?" to "What can it do?" Appreciate movement, sensation, healing---not aesthetics <Citation id="2" index={2} source="Psychology of Women Quarterly" year="2020" tier={1} />.</p> },
            { title: `Appearance Doesn't Define Worth`, description: <p>You are not your body. Your value comes from who you are, what you do, how you treat others---not how you look.</p> },
            { title: 'Acceptance Without Obsession', description: <p>You don't have to love or hate your body. Acceptance means "this is my body, and that's okay' without constant evaluation.</p> },
            { title: 'Opt Out of Appearance Conversation', description: <p>Reduce body talk---positive or negative. Stop commenting on your own or others' appearances. Redirect focus elsewhere.</p> },
          ]}
        />

        <h2 id="practice" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practicing Body Neutrality
        </h2>
        <ArticleCallout variant="tip">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Reframe body-checking thoughts:</strong> Instead of "My stomach looks bloated," try "My stomach is digesting food---it's doing its job."</li>
            <li><strong>Focus on function:</strong> "My legs carried me on a walk" vs. "My thighs are too big."</li>
            <li><strong>Reduce mirror time:</strong> Check appearance for practical reasons (hair neat, food in teeth), not evaluation.</li>
            <li><strong>Unfollow appearance-focused accounts:</strong> Even "body positive" content centers appearance. Follow function/hobby-focused content instead.</li>
            <li><strong>Practice gratitude for function:</strong> Thank your body for what it enables, not how it looks.</li>
          </ul>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway">
          <p>Body neutrality offers a middle path between body hatred and forced positivity. It de-centers appearance, emphasizes functionality, and allows you to simply exist in your body without constant evaluation. You don't have to love your body---accepting it as neutral is enough <Citation id="3" index={3} source="Body Image" year="2019" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
];
