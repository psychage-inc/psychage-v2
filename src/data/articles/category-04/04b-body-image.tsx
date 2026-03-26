 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SELF_WORTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ComparisonTable,
  StatCard,
  ProgressSteps,
  ArticleAccordion,
} from '../../../components/article/blocks';

export const bodyImageArticlesB: Article[] = [
  {
    id: catId(36),
    slug: 'how-diet-culture-damages-mental-health',
    title: 'How Diet Culture Damages Mental Health',
    description: `Diet culture isn't just about weight---it's a system of beliefs that harms mental health, self-worth, and your relationship with food and body.`,
    image: '/images/articles/cat04/cover-036.svg',
    category: CATEGORY_SELF_WORTH,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Diet Culture', 'Mental Health', 'Eating Disorders', 'Body Image'],
    citations: [
      { id: '1', text: 'Diet culture and mental health outcomes', source: 'Eating Behaviors', year: '2021', link: 'https://doi.org/10.1016/j.eatbeh.2021.101498', tier: 1 },
      { id: '2', text: 'Weight stigma and psychological distress', source: 'Obesity Reviews', year: '2020', link: 'https://doi.org/10.1111/obr.12976', tier: 1 },
      { id: '3', text: 'Dieting and eating disorder risk', source: 'International Journal of Eating Disorders', year: '2020', link: 'https://doi.org/10.1002/eat.23238', tier: 1 },
      { id: '4', text: 'Health At Every Size vs. weight-centric approaches', source: 'Nutrition Today', year: '2021', link: 'https://doi.org/10.1097/NT.0000000000000454', tier: 1 },
      { id: '5', text: 'Diet culture and self-worth', source: 'Body Image', year: '2020', link: 'https://doi.org/10.1016/j.bodyim.2020.08.003', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Diet culture is everywhere: the belief that thinness equals health, morality, and worth. It's the voice that labels foods "good" or "bad, ' that celebrates weight loss and demonizes weight gain, that ties your value to the number on a scale. And it's profoundly damaging to mental health.
          </p>
          <p className="mb-6">
            Research shows diet culture contributes to disordered eating, low self-esteem, anxiety, depression, and eating disorders <Citation id="1" index={1} source="Eating Behaviors" year="2021" tier={1} />. It's a multi-billion dollar industry built on making you feel inadequate so you'll buy the next solution <Citation id="5" index={5} source="Body Image" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-diet-culture" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Diet Culture?
        </h2>
        <ArticleCallout variant="clinical-note">
          <p className="font-semibold mb-3">Core beliefs of diet culture:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Thinness = health, worth, moral superiority</strong></li>
            <li><strong>Weight loss should always be pursued</strong></li>
            <li><strong>Certain foods are "good" (virtuous) and others are "bad" (sinful)</strong></li>
            <li><strong>Your body should be controlled, disciplined, and optimized</strong></li>
            <li><strong>Smaller bodies are more valuable than larger ones</strong></li>
            <li><strong>Restriction and deprivation are necessary and admirable</strong></li>
          </ul>
        </ArticleCallout>

        <h2 id="mental-health-impacts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Diet Culture Harms Mental Health
        </h2>

        <ComparisonTable
          title="Mental Health Impacts of Diet Culture"
          columns={['Impact', 'Mechanism', 'Outcome']}
          items={[
            { feature: 'Chronic dieting', values: [`Restriction → bingeing → shame cycle', "Eating disorder risk increases 18x <Citation id="3" />`] },
            { feature: 'Food moralization', values: ['Labeling foods good/bad creates guilt', 'Disordered relationship with eating'] },
            { feature: 'Weight stigma', values: [`Internalizing bias against larger bodies', "Depression, anxiety, low self-worth <Citation id="2" />`] },
            { feature: 'Body surveillance', values: ['Constant monitoring of weight/appearance', 'Obsessive thoughts, reduced presence in life'] },
            { feature: 'Worth tied to weight', values: ['Self-esteem fluctuates with scale', 'Fragile identity, chronic inadequacy'] },
          ]}
          highlightColumn={2}
        />

        <h2 id="diet-cycle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Diet Cycle
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Promise of Control', description: <p>New diet promises weight loss, health, happiness. You believe this time will be different.</p> },
            { title: 'Restriction', description: <p>Cut calories, eliminate foods, follow rules. Initial weight loss feels validating.</p> },
            { title: 'Deprivation & Rebellion', description: <p>Restriction triggers biological hunger and psychological deprivation. Eventually, you eat 'forbidden' foods.</p> },
            { title: `Perceived "Failure`, description: <p>Diet breaks down. You blame yourself, not the unsustainable approach. Shame and self-criticism intensify.</p> },
            { title: 'Return to Dieting', description: <p>Seek a new diet to 'fix' the problem, restarting the cycle. Each iteration erodes self-trust and mental health.</p> },
          ]}
        />

        <h2 id="alternatives" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Alternatives to Diet Culture
        </h2>
        <p className="mb-6">
          Rejecting diet culture doesn't mean ignoring health---it means redefining it <Citation id="4" index={4} source="Nutrition Today" year="2021" tier={1} />:
        </p>
        <ArticleAccordion
          type="single"
          items={[
            { id: 'intuitive-eating', title: 'Intuitive Eating', content: <p>Honor hunger and fullness cues, make peace with food, reject diet mentality. Trust your body's signals rather than external rules.</p> },
            { id: 'haes', title: 'Health At Every Size (HAES)', content: <p>Pursue health-promoting behaviors (joyful movement, varied nutrition, stress management) without weight-loss focus. Health exists across all body sizes.</p> },
            { id: 'neutral-language', title: 'Food Neutrality', content: <p>Remove moral labels from food. All foods fit; no food is inherently good or bad. Eat for nourishment, pleasure, and satisfaction.</p> },
            { id: 'body-respect', title: 'Body Respect', content: <p>Treat your body with care regardless of size. Reject the belief that you must earn respect through thinness.</p> },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Diet culture damages mental health by tying worth to weight, moralizing food, and promoting restriction that leads to disordered eating. Rejecting diet culture means recognizing health is not defined by thinness, that your body deserves respect at any size, and that you can trust your internal cues over external rules.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(37),
    slug: 'exercise-addiction-when-movement-becomes-body-image-weapon',
    title: 'Exercise Addiction: When Movement Becomes a Body Image Weapon',
    description: 'Exercise can become compulsive when driven by body image anxiety. Learn the difference between healthy movement and exercise addiction.',
    image: "/images/articles/cat04/cover-037.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Exercise Addiction', 'Compulsive Exercise', 'Body Image', 'Eating Disorders'],
    citations: [
      { id: '1', text: 'Compulsive exercise and eating disorders', source: 'International Journal of Eating Disorders', year: '2020', link: 'https://doi.org/10.1002/eat.23227', tier: 1 },
      { id: '2', text: 'Exercise addiction: Symptoms and prevalence', source: 'Sports Medicine', year: '2021', link: 'https://doi.org/10.1007/s40279-021-01451-4', tier: 1 },
      { id: '3', text: 'Distinguishing healthy from compulsive exercise', source: 'Body Image', year: '2020', link: 'https://doi.org/10.1016/j.bodyim.2020.05.006', tier: 1 },
      { id: '4', text: 'Exercise dependence and mental health', source: 'Journal of Behavioral Addictions', year: '2021', link: 'https://doi.org/10.1556/2006.2021.00013', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Exercise is healthy---until it isn't. When movement becomes compulsive, driven by anxiety about weight or appearance, and causes distress if missed, it crosses into exercise addiction. What looks like dedication from the outside can be a prison of obsession and body image anxiety.
          </p>
          <p className="mb-6">
            Research shows 3-5% of regular exercisers meet criteria for exercise addiction, with higher rates among those with eating disorders (39-48%) <Citation id="1" index={1} source="International Journal of Eating Disorders" year="2020" tier={1} />. The line between healthy and compulsive exercise is drawn by motivation, flexibility, and impact on life <Citation id="2" index={2} source="Sports Medicine" year="2021" tier={2} />.
          </p>
        </div>

        <h2 id="healthy-vs-compulsive" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Healthy Exercise vs. Compulsive Exercise
        </h2>
        <ComparisonTable
          title="Two Relationships with Movement"
          columns={['Feature', 'Healthy Exercise', 'Compulsive Exercise']}
          items={[
            { feature: 'Motivation', values: ['Enjoyment, energy, health', 'Burning calories, controlling weight, anxiety relief'] },
            { feature: 'Flexibility', values: ['Can skip without distress', 'Intense anxiety if missed; will exercise when sick/injured'] },
            { feature: 'Duration', values: ['Moderate, balanced', 'Excessive (2+ hours daily), rigid schedule'] },
            { feature: 'Impact on life', values: ['Enhances life', 'Impairs relationships, work, social life'] },
            { feature: 'Emotional response', values: ['Energized, satisfied', 'Guilty if missed, never satisfied'] },
            { feature: 'After eating', values: ['Unrelated to food intake', "Must 'earn' food or 'burn off' calories"] },
          ]}
          highlightColumn={2}
        />

        <h2 id="warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Warning Signs of Exercise Addiction
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Exercising despite injury, illness, or medical advice to rest</li>
          <li>Severe anxiety, irritability, or depression if unable to exercise</li>
          <li>Exercise takes priority over relationships, work, or social commitments</li>
          <li>Calculating exercise needed to "compensate" for food eaten</li>
          <li>Feeling obligated to exercise, not choosing to</li>
          <li>Exercising in secret or lying about amount</li>
          <li>Inability to take rest days without guilt</li>
        </ul>

        <h2 id="link-to-eating-disorders" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Connection to Eating Disorders
        </h2>
        <p className="mb-6">
          Compulsive exercise is a common symptom in anorexia nervosa, bulimia nervosa, and binge eating disorder. It serves as a compensatory behavior---attempting to control weight or "undo" eating <Citation id="1" index={1} source="International Journal of Eating Disorders" year="2020" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 45, suffix: '%', label: 'Anorexia patients show compulsive exercise' },
            { value: 3, suffix: 'x', label: 'Higher injury risk with compulsive exercise' },
            { value: 80, suffix: '%', label: 'Exercise addiction driven by appearance concerns' },
          ]}
          source="International Journal of Eating Disorders, 2020"
        />

        <h2 id="moving-toward-healthy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Moving Toward Healthy Movement
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Examine Motivation', description: <p>Ask: Why am I exercising? If the answer is 'to burn calories' or "because I have to," it may be compulsive <Citation id="3" index={3} source="Body Image" year="2020" tier={1} />.</p> },
            { title: 'Practice Flexibility', description: <p>Intentionally take rest days. Notice the anxiety and practice tolerating it without exercising.</p> },
            { title: 'Decouple Exercise from Food', description: <p>Stop 'earning' meals or "burning off" food. Eat based on hunger, exercise for enjoyment.</p> },
            { title: 'Prioritize Joy Over Obligation', description: <p>Choose movement that feels good, not just what burns the most calories. Dance, walk, stretch---whatever brings pleasure.</p> },
            { title: 'Seek Help if Needed', description: <p>If exercise feels compulsive and you can't stop despite negative consequences, treatment can help <Citation id="4" index={4} source="Journal of Behavioral Addictions" year="2021" tier={1} />.</p> },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Exercise becomes addictive when it's compulsive, driven by body image anxiety, inflexible, and impairs life. Healthy movement is joyful, flexible, and enhances wellbeing---not a punishment for eating or a requirement for worth.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(38),
    slug: 'body-image-across-cultures-different-ideals-same-impact',
    title: 'Body Image Across Cultures: Different Ideals, Same Psychological Impact',
    description: 'Beauty standards vary across cultures, but body dissatisfaction is universal. Explore how cultural ideals shape body image worldwide.',
    image: "/images/articles/cat04/cover-038.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Cultural Psychology', 'Body Image', 'Global Health', 'Beauty Standards'],
    citations: [
      { id: '1', text: 'Cultural variations in body ideals', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2020', link: 'https://doi.org/10.1037/cdp0000360', tier: 1 },
      { id: '2', text: 'Globalization and body dissatisfaction', source: 'Body Image', year: '2021', link: 'https://doi.org/10.1016/j.bodyim.2021.01.008', tier: 1 },
      { id: '3', text: 'Cross-cultural body image research', source: 'International Journal of Eating Disorders', year: '2020', link: 'https://doi.org/10.1002/eat.23271', tier: 1 },
      { id: '4', text: 'Western media influence on global body ideals', source: 'Sex Roles', year: '2020', link: 'https://doi.org/10.1007/s11199-020-01141-2', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            What's considered beautiful varies dramatically across cultures: pale skin in some contexts, tanned in others; thinness in the West, fuller figures in parts of Africa and Latin America. But regardless of the specific ideal, the psychological pattern is the same---striving for an often unattainable standard creates body dissatisfaction.
          </p>
          <p className="mb-6">
            Research shows body image concerns exist across all cultures studied, though the specific focus varies <Citation id="1" index={1} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />. Globalization and Western media are homogenizing beauty ideals, spreading thin-ideal body dissatisfaction worldwide <Citation id="2" index={2} source="Body Image" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="cultural-variations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural Variations in Beauty Ideals
        </h2>
        <ComparisonTable
          title="Body Ideals Across Cultures"
          columns={['Culture/Region', 'Traditional Ideal', 'Modern Shift']}
          items={[
            { feature: 'Western (US/Europe)', values: ['Thin, toned, youthful', 'Increasingly muscular for women'] },
            { feature: 'East Asian', values: ['Pale skin, delicate features, thinness', 'V-shaped face, large eyes (cosmetic surgery common)'] },
            { feature: 'Latin American', values: ['Curvy, fuller hips/buttocks', 'Thin waist + curves (Western influence)'] },
            { feature: 'African (varied)', values: ['Fuller figures valued in some regions', 'Urban areas adopting thin ideal'] },
            { feature: 'South Asian', values: ['Fair skin highly valued', 'Thinness + fair skin (Bollywood influence)'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="universal-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Universal Patterns Despite Different Ideals
        </h2>
        <p className="mb-6">
          Across cultures, certain psychological patterns emerge <Citation id="3" index={3} source="International Journal of Eating Disorders" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Unrealistic standards:</strong> Most people can't naturally achieve their culture's ideal</li>
          <li><strong>Status association:</strong> The ideal often reflects privilege (historically, thinness = wealth in food-scarce contexts; fullness = wealth in food-abundant contexts)</li>
          <li><strong>Social comparison:</strong> People compare themselves to ideals and feel inadequate</li>
          <li><strong>Beauty as currency:</strong> Appearance tied to social and economic opportunities</li>
          <li><strong>Gendered pressure:</strong> Women face more intense appearance pressure across all cultures</li>
        </ul>

        <h2 id="globalization-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Globalizing of Western Ideals
        </h2>
        <p className="mb-6">
          Western media---Hollywood, Instagram, TikTok---has global reach. Research shows exposure to Western media correlates with adoption of thin-ideal body dissatisfaction, even in cultures that traditionally valued fuller figures <Citation id="4" index={4} source="Sex Roles" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="warning">
          <p><strong>Example:</strong> In Fiji, eating disorders were virtually unknown until Western television was introduced in 1995. Within three years, rates of disordered eating in teenage girls increased significantly.</p>
        </ArticleCallout>

        <h2 id="intersectionality" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Intersectionality and Body Image
        </h2>
        <p className="mb-6">
          People navigate multiple cultural contexts simultaneously. A woman of color in a Western country may face:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Pressure to conform to Western thin ideal</li>
          <li>Pressure to maintain cultural beauty standards (e.g., fair skin)</li>
          <li>Fetishization or exoticization of certain features</li>
          <li>Lack of representation in media/beauty industries</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Beauty ideals vary across cultures, but the psychological impact is universal: striving for culturally specific standards creates body dissatisfaction. Globalization is homogenizing ideals, spreading Western thin-ideal pressures worldwide while eroding cultural diversity in body acceptance.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(39),
    slug: 'aging-body-image-navigating-physical-changes-self-compassion',
    title: 'Aging and Body Image: Navigating Physical Changes with Self-Compassion',
    description: `Aging bodies change. Learn how to maintain positive body image as you age, resisting ageist beauty standards and honoring your body's evolution.`,
    image: '/images/articles/cat04/cover-039.svg',
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Aging', 'Body Image', 'Self-Compassion', 'Ageism'],
    citations: [
      { id: '1', text: 'Body image across the lifespan', source: 'Body Image', year: '2020', link: 'https://doi.org/10.1016/j.bodyim.2020.02.012', tier: 1 },
      { id: '2', text: 'Ageism and body dissatisfaction in older adults', source: 'Psychology and Aging', year: '2021', link: 'https://doi.org/10.1037/pag0000595', tier: 1 },
      { id: '3', text: 'Body appreciation in midlife and beyond', source: 'Journal of Women & Aging', year: '2020', link: 'https://doi.org/10.1080/08952841.2019.1681244', tier: 1 },
      { id: '4', text: 'Anti-aging industry and mental health', source: 'Feminist Media Studies', year: '2020', link: 'https://doi.org/10.1080/14680777.2019.1667062', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Wrinkles appear. Skin sags. Hair grays or thins. Weight redistributes. Your body ages, and a culture obsessed with youth tells you this is a problem to fix, hide, or resist. But aging is not a failure---it's a privilege. Navigating body image as you age requires rejecting ageist beauty standards and honoring your body's evolution.
          </p>
          <p className="mb-6">
            Research shows body image concerns don't necessarily decrease with age---they shift. While some older adults report greater body acceptance, others experience distress about visible aging <Citation id="1" index={1} source="Body Image" year="2020" tier={1} />. Cultural ageism intensifies these concerns <Citation id="2" index={2} source="Psychology and Aging" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="changes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Physical Changes with Aging
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Skin:</strong> Wrinkles, age spots, loss of elasticity</li>
          <li><strong>Hair:</strong> Graying, thinning, changes in texture</li>
          <li><strong>Body composition:</strong> Muscle loss, fat redistribution, metabolism changes</li>
          <li><strong>Height:</strong> Gradual decrease due to spinal compression</li>
          <li><strong>Mobility:</strong> Joint stiffness, reduced flexibility</li>
        </ul>
        <p className="mb-6">
          These changes are normal, universal, and not inherently problematic. The distress comes from cultural narratives that frame aging as decline, failure, or loss of value.
        </p>

        <h2 id="ageism-body-image" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Ageism Fuels Body Image Distress
        </h2>
        <ArticleCallout variant="clinical-note">
          <p className="font-semibold mb-3">Ageist messages about bodies:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>"Anti-aging" products imply aging is something to fight</li>
            <li>Media centers young bodies; older bodies are invisible or stereotyped</li>
            <li>Compliments like "you don't look your age' suggest looking your age is bad</li>
            <li>Beauty industry profits from making aging seem unacceptable</li>
            <li>Gendered ageism: women face harsher standards than men</li>
          </ul>
        </ArticleCallout>

        <h2 id="body-acceptance-aging" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultivating Body Acceptance While Aging
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Reframe Aging as Accumulation, Not Loss', description: <p>Your body holds stories: scars from adventures, laugh lines from joy, strength from endurance. Aging reflects a life lived <Citation id="3" index={3} source="Journal of Women & Aging" year="2020" tier={1} />.</p> },
            { title: `Challenge "Anti-Aging" Language`, description: <p>Reject the framing. You're not fighting your body's natural evolution. Skincare can be self-care without being anti-aging warfare <Citation id="4" index={4} source="Feminist Media Studies" year="2020" tier={1} />.</p> },
            { title: 'Focus on Function Over Form', description: <p>What can your body still do? Appreciate mobility, sensation, healing---not just appearance. Functional decline is gradual; your body remains capable in many ways.</p> },
            { title: 'Seek Age-Diverse Representation', description: <p>Follow older influencers, watch media featuring diverse ages. Normalize seeing bodies that look like yours.</p> },
            { title: 'Practice Self-Compassion', description: <p>Treat yourself as you would a friend. You wouldn't judge their wrinkles harshly---extend the same kindness to yourself.</p> },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Aging bodies change, and cultural ageism frames these changes as problems. Body image in later life improves when you reject "anti-aging" narratives, honor your body's history, focus on function over appearance, and practice self-compassion. Aging is not a failure---it's evidence of a life lived.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(40),
    slug: 'helping-children-develop-healthy-body-image',
    title: 'Helping Children Develop Healthy Body Image',
    description: 'Body image forms early. Learn how parents and caregivers can foster positive body image in children and protect them from harmful messages.',
    image: "/images/articles/cat04/cover-040.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parenting', 'Child Development', 'Body Image', 'Prevention'],
    citations: [
      { id: '1', text: 'Development of body image in children', source: 'Developmental Psychology', year: '2020', link: 'https://doi.org/10.1037/dev0000927', tier: 1 },
      { id: '2', text: 'Parental influence on child body image', source: 'Body Image', year: '2021', link: 'https://doi.org/10.1016/j.bodyim.2021.03.002', tier: 1 },
      { id: '3', text: 'Preventing eating disorders through family intervention', source: 'International Journal of Eating Disorders', year: '2020', link: 'https://doi.org/10.1002/eat.23290', tier: 1 },
      { id: '4', text: 'Media literacy interventions for children', source: 'Journal of Youth and Adolescence', year: '2021', link: 'https://doi.org/10.1007/s10964-021-01421-3', tier: 1 },
      { id: '5', text: 'Body Talk and child development', source: 'Eating Behaviors', year: '2020', link: 'https://doi.org/10.1016/j.eatbeh.2020.101371', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Children as young as five express body dissatisfaction. By age six, many have internalized cultural beauty standards. Body image forms early, shaped by family messages, peer interactions, and media exposure. Parents and caregivers have profound influence---both protective and harmful---on how children learn to perceive their bodies.
          </p>
          <p className="mb-6">
            Research shows parental attitudes and behaviors significantly predict child body image <Citation id="2" index={2} source="Body Image" year="2021" tier={1} />. Children observe how adults talk about bodies, food, and appearance, internalizing these patterns <Citation id="5" index={5} source="Eating Behaviors" year="2020" tier={1} />. Prevention starts with mindful modeling.
          </p>
        </div>

        <h2 id="development" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Body Image Develops in Children
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Ages 3-5: Awareness Begins', description: <p>Children notice physical differences (size, skin color, abilities). They begin categorizing bodies but don't yet judge them as good or bad <Citation id="1" index={1} source="Developmental Psychology" year="2020" tier={1} />.</p> },
            { title: 'Ages 6-8: Internalizing Standards', description: <p>Exposure to media, peers, and adult comments teaches children which bodies are valued. Many begin expressing body dissatisfaction.</p> },
            { title: 'Ages 9-12: Peer Comparison Intensifies', description: <p>Social comparison increases. Teasing about appearance can have lasting effects. Puberty begins for some, bringing body changes and heightened awareness.</p> },
            { title: 'Adolescence: High-Risk Period', description: <p>Body dissatisfaction peaks. Eating disorder risk increases. Appearance becomes tied to social status and identity.</p> },
          ]}
        />

        <h2 id="what-helps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Parents Can Do
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'model-acceptance',
              title: '1. Model Body Acceptance',
              content: (
                <div>
                  <p className="mb-3"><strong>Children learn from what you do, not just what you say.</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Don't criticize your own body in front of children ("I'm so fat,", "I hate my thighs")</li>
                    <li>Avoid diet talk or labeling foods "good" or "bad"</li>
                    <li>Demonstrate eating for nourishment and pleasure, not punishment or control</li>
                    <li>Show appreciation for what your body can do</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'neutral-language',
              title: '2. Use Neutral, Function-Focused Language',
              content: (
                <div>
                  <p className="mb-3"><strong>Avoid commenting on children's bodies or others" appearances.</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Instead of "You're so pretty," say "You're so kind/creative/funny"</li>
                    <li>Talk about bodies in functional terms: "Your legs are strong---they help you run and jump!"</li>
                    <li>Don't comment on weight gain or loss</li>
                    <li>Never tease or criticize a child's appearance, even jokingly</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'media-literacy',
              title: '3. Teach Media Literacy',
              content: (
                <div>
                  <p className="mb-3"><strong>Help children critically evaluate media messages.</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Point out photo editing, filters, unrealistic portrayals</li>
                    <li>Discuss how advertisers profit from making people feel inadequate</li>
                    <li>Limit exposure to appearance-focused content</li>
                    <li>Follow body-diverse accounts together <Citation id="4" index={4} source="Journal of Youth and Adolescence" year="2021" tier={1} /></li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'celebrate-diversity',
              title: '4. Celebrate Body Diversity',
              content: (
                <div>
                  <p className="mb-3"><strong>Normalize that bodies come in all sizes, shapes, colors, and abilities.</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Read books featuring diverse bodies</li>
                    <li>Watch media with varied representation</li>
                    <li>Avoid using body size as a descriptor unless medically relevant</li>
                    <li>Challenge teasing or bullying about appearance</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'address-teasing',
              title: '5. Address Teasing and Bullying',
              content: (
                <div>
                  <p className="mb-3"><strong>Appearance-based teasing predicts eating disorders and low self-esteem.</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Take teasing seriously, even if it seems minor</li>
                    <li>Teach children responses: "Comments about bodies aren't okay"</li>
                    <li>Work with schools to address bullying</li>
                    <li>Reassure children their worth isn't determined by appearance</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="red-flags" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Warning Signs of Body Image Concerns
        </h2>
        <p className="mb-6">
          Seek professional help if a child shows <Citation id="3" index={3} source="International Journal of Eating Disorders" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Frequent negative comments about their body</li>
          <li>Refusing to eat certain foods or skipping meals</li>
          <li>Excessive exercise or movement</li>
          <li>Frequent weighing or body checking</li>
          <li>Social withdrawal or avoiding activities (swimming, photos)</li>
          <li>Comparison to others or media images</li>
          <li>Signs of anxiety or depression related to appearance</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Children develop body image by observing adults, internalizing media messages, and experiencing peer interactions. Parents can foster healthy body image by modeling acceptance, using function-focused language, teaching media literacy, celebrating diversity, and protecting children from appearance-based teasing. Early intervention prevents lasting harm.</p>
        </ArticleCallout>
      </>
    ),
  },
];
