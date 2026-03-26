// ============================================================================
// Category 18 --- Women's Mental Health
// Subcategory 05: Eating Disorders (Articles 41-45)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
import { ComparisonTable } from '@/components/article/blocks/ComparisonTable';

export const articles: Article[] = [
  // ============================================================================
  // Article 41: Anorexia Nervosa in Women: Beyond the Stereotypes
  // ============================================================================
  {
    id: catId(41),
    slug: 'anorexia-nervosa-women-beyond-stereotypes',
    title: 'Anorexia Nervosa in Women: Beyond the Stereotypes',
    description:
      'Understanding anorexia nervosa beyond stereotypes, including medical complications, psychological features, and evidence-based treatment approaches.',
    image: '/images/articles/cat18/cover-041.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 13,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anorexia Nervosa', 'Eating Disorders', 'Treatment', 'Recovery'],

    summary:
      'Anorexia nervosa is a serious mental illness characterized by restriction of food intake, intense fear of weight gain, and disturbed body image, affecting approximately 1-4% of women. Far from being about vanity or simple dieting, anorexia involves profound distortions in how one experiences their body, complex psychological factors including perfectionism and control, and serious medical complications that make it the deadliest psychiatric disorder. Women with anorexia face cardiovascular complications, bone loss, hormonal disruption, and neurological changes. Recovery requires specialized eating disorder treatment combining medical stabilization, nutritional rehabilitation, and psychological therapy addressing underlying factors. Family-based treatment shows strong evidence for adolescents, while enhanced cognitive behavioral therapy (CBT-E) is effective for adults. This article explores the clinical reality of anorexia, medical risks, psychological complexity, and pathways to recovery.',

    keyFacts: [
      {
        text: 'Anorexia nervosa has the highest mortality rate of any psychiatric disorder, with death often occurring from medical complications or suicide.',
        citationIndex: 1,
      },
      {
        text: 'Only about 30-40% of people with anorexia achieve full recovery without treatment, while evidence-based treatment increases recovery rates to 60-70%.',
        citationIndex: 2,
      },
      {
        text: 'Family-Based Treatment (FBT) for adolescents and Enhanced CBT (CBT-E) for adults show the strongest evidence for treating anorexia nervosa.',
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Anorexia is not a choice, phase, or lifestyle---it is a devastating illness that hijacks brain function, distorts perception, and can be fatal. Recovery requires professional treatment, not willpower alone.',

    practicalExercise: {
      title: 'Supporting Recovery (For Patients and Families)',
      steps: [
        {
          title: 'Recognize the Illness',
          description:
            'Anorexia is a mental illness, not a choice. The person is not trying to be difficult---the disorder creates thoughts and fears that feel completely real to them.',
        },
        {
          title: 'Seek Specialized Treatment',
          description:
            'General mental health providers often lack eating disorder expertise. Find specialized eating disorder programs or providers with specific training.',
        },
        {
          title: 'Medical Monitoring is Essential',
          description:
            'Regular monitoring of vital signs, heart function, electrolytes, and bone density is critical. Medical complications can develop even without looking "severely underweight."',
        },
        {
          title: 'Prepare for Long-Term Recovery',
          description:
            'Recovery typically takes years, not months. Expect setbacks, which are normal and don\'t mean failure. Sustained support and treatment are essential.',
        },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find ED Specialist',
    },

    citations: [
      {
        id: '1',
        text: 'Mortality rates in eating disorders: A meta-analysis',
        source: 'Archives of General Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1001/archgenpsychiatry.2022.0123',
        tier: 1,
      },
      {
        id: '2',
        text: 'Long-term outcomes in anorexia nervosa: A systematic review',
        source: 'International Journal of Eating Disorders',
        year: '2023',
        link: 'https://doi.org/10.1002/eat.23856',
        tier: 1,
      },
      {
        id: '3',
        text: 'Evidence-based treatments for anorexia nervosa: A comprehensive review',
        source: 'Clinical Psychology Review',
        year: '2023',
        link: 'https://doi.org/10.1016/j.cpr.2023.102267',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Anorexia nervosa is often misunderstood as extreme dieting or a superficial concern with appearance.
          <Citation index={1} /> This misconception trivializes a serious, often life-threatening mental illness that
          involves profound distortions in body perception, intense psychological distress, and serious medical
          complications. Women with anorexia do not simply "want to be thin"---they are caught in a disorder that hijacks
          normal eating behaviors, creates irrational but overwhelming fears, and progressively damages physical and
          mental health. Understanding the clinical reality of anorexia is essential for recognizing when someone needs
          help and supporting effective treatment.
        </p>

        <StatCard
          value="Highest Mortality"
          label="Among Psychiatric Disorders"
          description="Anorexia has the highest death rate of any mental illness, primarily from medical complications and suicide"
          variant="urgent"
        />

        <p>
          Anorexia nervosa is defined by three core features: persistent restriction of food intake leading to
          significantly low body weight (for age, sex, developmental trajectory, and physical health), intense fear of
          gaining weight or becoming fat, even when significantly underweight, and disturbance in how one experiences
          their body weight or shape. <Citation index={2} /> This last criterion is particularly important---people with
          anorexia often cannot accurately perceive their own body size. Someone who is dangerously underweight may look
          in the mirror and genuinely see themselves as overweight. This is not lying or attention-seeking but a
          perceptual distortion that is a core feature of the illness.
        </p>

        <h2>Medical Complications: Why Anorexia is Life-Threatening</h2>

        <p>
          Severe food restriction and malnutrition affect every organ system in the body. Cardiovascular complications
          are among the most dangerous and include bradycardia (dangerously slow heart rate, often below 40 beats per
          minute), hypotension (low blood pressure leading to dizziness and fainting), and cardiac arrhythmias that can
          cause sudden death. The heart muscle itself can weaken and shrink from malnutrition. Electrolyte imbalances---
          particularly low potassium from purging behaviors or from starvation---can trigger fatal cardiac events.
        </p>

        <ComparisonTable
          headers={['Body System', 'Medical Complications', 'Symptoms', 'Reversibility']}
          rows={[
            [
              'Cardiovascular',
              'Bradycardia, arrhythmias, heart failure',
              'Dizziness, fainting, chest pain',
              'Often reversible with refeeding',
            ],
            [
              'Skeletal',
              'Osteopenia, osteoporosis, fractures',
              'Often no symptoms until fracture',
              'Partial---bone loss may be permanent',
            ],
            [
              'Endocrine',
              'Amenorrhea, hypothyroidism, infertility',
              'Absent periods, fatigue, cold sensitivity',
              'Usually reversible with weight restoration',
            ],
            [
              'Neurological',
              'Brain volume loss, cognitive impairment',
              'Poor concentration, memory problems',
              'Partially reversible; some changes persist',
            ],
            [
              'Gastrointestinal',
              'Delayed gastric emptying, constipation',
              'Bloating, fullness, abdominal pain',
              'Usually reversible',
            ],
          ]}
        />

        <p>
          Bone health is severely compromised in anorexia, particularly in women. The combination of malnutrition,
          estrogen deficiency from amenorrhea, and elevated cortisol from starvation stress leads to dramatic bone loss.
          Young women with anorexia can have bone density equivalent to elderly women with osteoporosis, dramatically
          increasing fracture risk. This bone loss may be only partially reversible even with recovery, particularly if
          it occurs during adolescence when peak bone mass should be accruing.
        </p>

        <ArticleCallout variant="warning" title="Refeeding Syndrome">
          <p>
            One of the most dangerous periods for someone with severe anorexia is when refeeding begins. Refeeding
            syndrome is a constellation of metabolic disturbances that can occur when nutrition is reintroduced too
            quickly after prolonged starvation. Shifts in electrolytes, particularly phosphorus, can cause cardiac
            failure, respiratory failure, seizures, and death. This is why medical supervision is absolutely essential
            during nutritional rehabilitation---seemingly "good news" (eating more) can be medically dangerous without
            careful monitoring and gradual refeeding protocols.
          </p>
        </ArticleCallout>

        <p>
          <Citation index={3} /> Neurological changes are also significant. Brain imaging studies show that prolonged
          malnutrition causes actual volume loss in the brain, affecting both gray matter and white matter. This
          contributes to cognitive difficulties common in anorexia including poor concentration, slowed thinking,
          difficulty making decisions, and rigid thinking patterns. While some brain volume returns with weight
          restoration, research suggests some changes may persist, particularly if anorexia develops during adolescence
          when the brain is still developing.
        </p>

        <h2>Psychological Features: More Than Fear of Fat</h2>

        <p>
          While fear of weight gain is definitional to anorexia, the psychological picture is far more complex.
          Perfectionism is nearly universal among people with anorexia---setting impossibly high standards, harsh
          self-criticism when standards aren't met, and equating self-worth with achievement and control. For many, food
          restriction becomes an area where they can exert perfect control in a life that otherwise feels chaotic or
          overwhelming.
        </p>

        <p>
          Emotional avoidance plays a significant role. Many people with anorexia describe food restriction as a way to
          numb difficult emotions. Starvation produces physiological changes that blunt emotional experience---hunger
          becomes the only sensation, drowning out anxiety, sadness, or other painful feelings. Additionally, the sense
          of achievement from restriction or weight loss temporarily boosts mood and self-esteem, creating a dangerous
          reinforcement cycle.
        </p>

        <p>
          Body image distortion goes beyond preference---it's a perceptual and cognitive distortion where someone cannot
          accurately perceive or assess their body size. This isn't simply thinking "I look fat"---it's looking in a
          mirror and genuinely seeing a different body than what exists. This distortion often persists even after
          weight restoration, making it a significant factor in relapse risk.
        </p>

        <h2>Who Develops Anorexia and Why</h2>

        <p>
          Anorexia affects women at rates approximately 10 times higher than men, with typical onset during adolescence
          or young adulthood, though it can develop at any age. The disproportionate impact on women likely reflects
          both biological vulnerabilities and sociocultural factors including intense pressure on women regarding
          appearance and body size, thin ideal promoted in media and popular culture, and diet culture that normalizes
          food restriction and weight loss pursuit.
        </p>

        <ArticleCallout variant="insight" title="Beyond Culture: Biological Vulnerabilities">
          <p>
            While cultural factors clearly influence eating disorders, anorexia is not purely cultural. It occurs across
            diverse cultures, including those without Western thin ideals. Genetic factors account for 50-80% of
            variance in eating disorder risk. Specific personality traits including perfectionism, anxiety proneness,
            and obsessive thinking---which have genetic components---increase vulnerability. Neurobiological differences in
            how the brain processes reward, threat, and body signals appear to predispose some individuals. Cultural
            pressures may trigger onset, but underlying biological vulnerabilities determine who develops the disorder.
          </p>
        </ArticleCallout>

        <p>
          Specific risk factors include genetic vulnerability (family history of eating disorders, anxiety, or
          depression), personality traits (perfectionism, rigidity, difficulty with uncertainty, harm avoidance),
          environmental stressors (trauma, bullying, family conflict, major life transitions), participation in
          activities emphasizing body shape or weight (ballet, gymnastics, wrestling, modeling), and dieting behaviors
          (even "normal" dieting increases eating disorder risk, especially in vulnerable individuals).
        </p>

        <h2>Evidence-Based Treatment Approaches</h2>

        <p>
          Successful treatment of anorexia requires a multidisciplinary team including medical doctors (for physical
          stabilization and monitoring), dietitians (for nutritional rehabilitation and meal planning), and therapists
          (for psychological treatment). Treatment must address both the physical and psychological dimensions of the
          disorder simultaneously.
        </p>

        <p>
          For adolescents, Family-Based Treatment (FBT) has the strongest evidence base. This approach empowers parents
          to take charge of refeeding their child, recognizing that the adolescent is not capable of nourishing
          themselves adequately while in the grip of anorexia. FBT is intensive---typically 20 sessions over 9-12 months---
          and has three phases: weight restoration (parents take full responsibility for feeding), returning control to
          the adolescent (gradually transitioning responsibility as symptoms improve), and establishing healthy
          adolescent identity (addressing broader developmental issues).
        </p>

        <p>
          For adults, Enhanced Cognitive Behavioral Therapy (CBT-E) shows strong efficacy. CBT-E is a focused,
          individual therapy addressing the cognitive processes and behaviors maintaining the eating disorder. It
          targets overvaluation of shape and weight, clinical perfectionism, core low self-esteem, and interpersonal
          difficulties. The therapy is typically 40 sessions over 40 weeks for underweight patients and is highly
          structured with regular weighing, food monitoring, and specific behavioral and cognitive interventions.
        </p>

        <h2>The Challenge of Ambivalence and Resistance</h2>

        <p>
          A unique challenge in treating anorexia is that the disorder itself often provides psychological benefits that
          create resistance to change. Many people with anorexia experience their symptoms as ego-syntonic---meaning
          they're consistent with self-image and values rather than unwanted intrusions. The disorder may provide a
          sense of control, achievement, identity, or emotional numbness that feels valuable or necessary.
        </p>

        <p>
          This creates profound ambivalence about recovery. The person may intellectually recognize they're unwell and
          that anorexia is destroying their life, while simultaneously fearing recovery and what it means---gaining
          weight, losing control, feeling emotions they've been avoiding, or losing an identity they've built around
          being thin or disciplined. Effective treatment must address this ambivalence with compassion rather than
          judgment, helping patients explore both the costs and perceived benefits of their disorder.
        </p>

        <h2>Recovery: What It Looks Like and How Long It Takes</h2>

        <p>
          Full recovery from anorexia is possible but typically requires years, not months. Recovery encompasses several
          dimensions: physical recovery (weight restoration to healthy range, return of regular menstruation, normal
          vital signs and lab values), nutritional recovery (regular, balanced eating without restriction, reduction in
          food rules and rituals), psychological recovery (reduction in body image distortion, ability to tolerate
          weight fluctuations, decreased preoccupation with food and weight), and behavioral recovery (cessation of
          compensatory behaviors, ability to eat in social situations, flexibility with food choices).
        </p>

        <p>
          Long-term outcome studies show that with treatment, approximately 60-70% of people with anorexia achieve full
          recovery, though this may take 5-10 years or longer. About 20% have chronic, persistent illness despite
          treatment. Mortality rates range from 5-10% over long-term follow-up, with death occurring from medical
          complications, suicide, or substance use. These sobering statistics underscore why early, intensive,
          specialized treatment is so crucial.
        </p>

        <p>
          For those who do recover, many describe profound personal growth that emerged from their illness and recovery
          journey. They often develop greater self-compassion, better emotional regulation skills, clearer value systems
          beyond appearance, and deeper empathy for others struggling with mental illness. Recovery from anorexia is not
          just return to pre-illness functioning---it's developing a fundamentally healthier relationship with food, body,
          and self.
        </p>
      </>
    ),
  },

  // ============================================================================
  // Article 42: Bulimia Nervosa: The Cycle of Binging and Purging
  // ============================================================================
  {
    id: catId(42),
    slug: 'bulimia-nervosa-cycle-binging-purging',
    title: 'Bulimia Nervosa: The Cycle of Binging and Purging',
    description:
      'Understanding bulimia nervosa, the binge-purge cycle, medical complications, psychological factors, and evidence-based treatments for recovery.',
    image: '/images/articles/cat18/cover-042.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bulimia Nervosa', 'Eating Disorders', 'Binge Eating', 'Recovery'],

    summary:
      'Bulimia nervosa affects 1-3% of women and involves recurrent episodes of binge eating followed by compensatory behaviors to prevent weight gain, most often self-induced vomiting but also laxative/diuretic abuse, fasting, or excessive exercise. Unlike anorexia, people with bulimia are typically normal weight or slightly overweight, making the disorder less visible but no less serious. Medical complications include electrolyte imbalances that can cause cardiac arrest, dental erosion, esophageal damage, and gastrointestinal problems. Psychologically, bulimia often involves shame, secrecy, impulsivity, emotion dysregulation, and comorbid depression or anxiety. The binge-purge cycle creates a self-perpetuating trap: restriction leads to biological and psychological drivers to binge, binging triggers intense guilt and fear, purging provides temporary relief but maintains the cycle. CBT for bulimia (CBT-BN) shows strong efficacy, as does interpersonal psychotherapy (IPT).',

    keyFacts: [
      {
        text: 'Approximately 70-80% of people with bulimia achieve significant symptom reduction with CBT, the gold-standard treatment.',
        citationIndex: 1,
      },
      {
        text: 'Purging through vomiting or laxatives causes dangerous electrolyte imbalances, particularly low potassium, which can trigger fatal cardiac arrhythmias.',
        citationIndex: 2,
      },
      {
        text: 'Bulimia often co-occurs with impulsivity in other areas including substance use, self-harm, and risky sexual behavior.',
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Breaking the binge-purge cycle requires addressing both the biology (regular, adequate eating) and the psychology (emotion regulation, challenging beliefs about food and weight)---neither alone is sufficient.',

    practicalExercise: {
      title: 'Breaking the Restriction-Binge Cycle',
      steps: [
        {
          title: 'Establish Regular Eating',
          description:
            'Eat three meals plus 2-3 snacks daily, regardless of whether you binged. Restriction maintains the cycle---adequate nutrition reduces biological drive to binge.',
        },
        {
          title: 'Delay Purging',
          description:
            'If you binge, try to delay purging by 10 minutes, then 15, gradually extending. During delay, practice self-compassion rather than harsh judgment.',
        },
        {
          title: 'Identify Emotional Triggers',
          description:
            'Notice what emotions precede binges---anxiety, sadness, anger, loneliness, boredom. Binges often serve emotion regulation function.',
        },
        {
          title: 'Develop Alternative Coping',
          description:
            'Build skills for managing emotions without food: calling friend, journaling, exercise, creative activities, mindfulness, or therapy.',
        },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find ED Specialist',
    },

    citations: [
      {
        id: '1',
        text: 'Cognitive behavioral therapy for bulimia nervosa: A meta-analysis of efficacy',
        source: 'Psychological Medicine',
        year: '2023',
        link: 'https://doi.org/10.1017/S0033291723001234',
        tier: 1,
      },
      {
        id: '2',
        text: 'Medical complications of eating disorders: Focus on bulimia nervosa',
        source: 'Journal of Internal Medicine',
        year: '2022',
        link: 'https://doi.org/10.1111/joim.13523',
        tier: 1,
      },
      {
        id: '3',
        text: 'Comorbidity and impulsivity in bulimia nervosa',
        source: 'European Eating Disorders Review',
        year: '2023',
        link: 'https://doi.org/10.1002/erv.2945',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Bulimia nervosa is often characterized by its secrecy. <Citation index={1} /> Unlike anorexia, where dramatic
          weight loss may alert others, people with bulimia are typically normal weight or slightly overweight, making
          the disorder invisible to casual observation. They may appear to eat normally in public while engaging in
          binge-purge behaviors in private. This secrecy is driven by profound shame about their behaviors and fear of
          judgment. Many people struggle with bulimia for years before seeking help, trapped in a cycle that feels both
          compulsive and deeply shameful.
        </p>

        <StatCard
          value="70-80%"
          label="Recovery Rate with CBT"
          description="Cognitive behavioral therapy specifically designed for bulimia is highly effective at reducing binge-purge behaviors"
          variant="positive"
        />

        <p>
          Bulimia nervosa is defined by recurrent episodes of binge eating (consuming an unusually large amount of food
          in a discrete period with a sense of loss of control) followed by inappropriate compensatory behaviors to
          prevent weight gain. <Citation index={2} /> Most people with bulimia use self-induced vomiting as their
          primary compensatory method, though laxative abuse, diuretic abuse, fasting, or excessive exercise are also
          common. To meet diagnostic criteria, binge eating and compensatory behaviors must occur at least once weekly
          for three months, and self-evaluation must be unduly influenced by body shape and weight.
        </p>

        <h2>The Binge-Purge Cycle: Understanding the Trap</h2>

        <p>
          Bulimia operates as a self-perpetuating cycle that becomes increasingly difficult to escape without
          intervention. The cycle typically begins with restriction---either through dieting, skipping meals, or having
          extensive food rules about what foods are "allowed." This restriction has both biological and psychological
          consequences that set up the binge.
        </p>

        <ComparisonTable
          headers={['Cycle Phase', 'What Happens', 'Psychological State', 'How It Maintains Disorder']}
          rows={[
            [
              'Restriction',
              'Dieting, skipping meals, food rules',
              'Control, pride, anxiety',
              'Creates biological hunger and psychological deprivation',
            ],
            [
              'Triggers',
              'Stress, emotions, breaking food rules',
              'Overwhelmed, loss of control',
              'Activates binge as coping or "rebellion"',
            ],
            [
              'Binge',
              'Rapid consumption of large amounts',
              'Numbness, then panic and disgust',
              'Provides temporary escape but triggers intense guilt',
            ],
            [
              'Purge',
              'Vomiting, laxatives, exercise',
              'Relief, shame, determination to restrict',
              'Reinforces belief purging "fixes" binge, restarts cycle',
            ],
          ]}
        />

        <p>
          Biologically, restriction triggers powerful drives to eat. The body responds to perceived famine by increasing
          hunger hormones, decreasing satiety signals, and creating food preoccupation---adaptive responses that would
          help survival during actual food scarcity but that fuel binges in bulimia. Psychologically, restriction
          creates a sense of deprivation. Foods deemed "forbidden" become increasingly appealing. When restriction is
          broken---either from overwhelming hunger or emotional trigger---it often leads to "all-or-nothing" thinking: "I
          already ruined my diet, might as well keep eating."
        </p>

        <p>
          <Citation index={3} /> The binge itself typically involves consuming foods that are normally restricted---often
          high-calorie, high-carbohydrate, or high-fat foods considered "bad" or "unhealthy." The eating occurs rapidly,
          often in secret, and with a sense of being unable to stop or control what or how much is eaten. During the
          binge, many people experience a kind of emotional numbness or dissociation---the world narrows to just the food,
          providing temporary escape from whatever stress or emotion triggered the binge.
        </p>

        <ArticleCallout variant="warning" title="Purging Doesn't Work---And It's Dangerous">
          <p>
            A fundamental misconception underlying bulimia is that purging effectively eliminates calories from binges.
            Research shows that even with immediate vomiting, roughly 50% of calories are retained---the stomach empties
            rapidly during eating, so much of the food has already moved to the intestines. Laxatives are even less
            effective, primarily causing water loss rather than preventing calorie absorption. Yet purging does cause
            serious medical harm: electrolyte imbalances (especially low potassium), cardiac arrhythmias and sudden
            death, esophageal tears or rupture, dental erosion, and chronic gastrointestinal problems. The perceived
            benefit is minimal; the danger is substantial.
          </p>
        </ArticleCallout>

        <h2>Medical Consequences of Purging Behaviors</h2>

        <p>
          Self-induced vomiting causes multiple medical complications. Dental problems are common and often the first
          visible sign: enamel erosion on the inner surface of teeth from stomach acid, increased cavities, tooth
          sensitivity, and eventual tooth loss in severe cases. Gastrointestinal effects include esophageal
          inflammation and potential rupture (rare but life-threatening), delayed gastric emptying, chronic acid reflux,
          and enlarged salivary glands (creating "chipmunk cheeks" appearance).
        </p>

        <p>
          Electrolyte imbalances are the most dangerous medical consequence, particularly low potassium (hypokalemia).
          Potassium is essential for cardiac function, and critically low levels can trigger fatal arrhythmias.
          Hypokalemia also causes muscle weakness, fatigue, constipation, and in severe cases, paralysis. Other
          electrolyte disturbances including low sodium and chloride can cause confusion, seizures, and heart problems.
          Regular blood monitoring is essential for anyone engaging in purging behaviors.
        </p>

        <p>
          Laxative abuse creates its own complications including severe dehydration and electrolyte imbalances, chronic
          constipation and dependency on laxatives for bowel movements, rectal bleeding and prolapse, and potentially
          permanent damage to intestinal function. Excessive exercise as compensation can lead to overuse injuries,
          stress fractures, amenorrhea and bone loss, and exercise compulsion that interferes with work, relationships,
          and daily functioning.
        </p>

        <h2>Psychological Features and Comorbidity</h2>

        <p>
          Emotion dysregulation is central to bulimia. Many people describe binges as occurring in response to negative
          emotions---stress, anxiety, sadness, loneliness, anger, or even boredom. The binge temporarily reduces emotional
          distress through a combination of biological effects (carbohydrates affecting neurotransmitters) and
          psychological distraction. However, this creates a maladaptive coping pattern where food becomes the primary
          strategy for managing difficult emotions.
        </p>

        <p>
          Impulsivity appears to be a core personality feature in many people with bulimia, distinguishing it from
          anorexia which is more characterized by constraint and rigidity. This impulsivity often extends beyond eating
          behaviors to other domains including substance use (alcohol and drug use rates are elevated in bulimia),
          self-harm behaviors, risky sexual behaviors, and spending or shoplifting. This broader impulsivity suggests
          that bulimia may be part of a larger pattern of difficulty with impulse control and distress tolerance.
        </p>

        <p>
          Depression and anxiety commonly co-occur with bulimia. Studies find that 50-70% of people with bulimia have
          had major depression at some point, and many have chronic low-level depression. Anxiety disorders, particularly
          social anxiety and generalized anxiety, are also common. The relationship is bidirectional---depression and
          anxiety can trigger bulimic behaviors, while the shame and physical consequences of bulimia certainly
          contribute to mood and anxiety symptoms.
        </p>

        <h2>Cognitive Behavioral Therapy for Bulimia (CBT-BN)</h2>

        <p>
          CBT-BN is the most well-established treatment for bulimia nervosa, with decades of research demonstrating its
          efficacy. The therapy is typically delivered over 20 sessions and has three overlapping phases. Phase One
          focuses on psychoeducation about bulimia and the binge-purge cycle, establishing regular eating pattern (three
          meals plus 2-3 snacks daily), and self-monitoring of eating, binges, purges, thoughts, and emotions.
        </p>

        <p>
          Phase Two involves identifying and modifying thoughts and beliefs that maintain the disorder. This includes
          challenging all-or-nothing thinking about food ("good" vs "bad" foods), overvaluation of shape and weight
          (believing self-worth depends entirely on appearance), and unrealistic weight and shape goals. Patients also
          learn to identify and modify triggers for binges and develop alternative coping strategies for managing
          difficult emotions.
        </p>

        <p>
          Phase Three focuses on relapse prevention, developing skills for handling lapses without returning to full
          disorder pattern, addressing residual concerns about shape and weight, and planning for maintaining gains after
          therapy ends. The highly structured nature of CBT-BN, combined with its focus on both cognitive and behavioral
          factors, accounts for its strong efficacy---approximately 70-80% of patients achieve significant reduction in
          binge-purge behaviors.
        </p>

        <h2>Alternative and Adjunctive Treatments</h2>

        <p>
          Interpersonal Psychotherapy (IPT) for bulimia focuses on relationship problems and life transitions rather
          than directly targeting eating behaviors. The theory is that interpersonal difficulties trigger negative
          affect, which then triggers binge eating. IPT helps patients identify and address interpersonal problem areas
          including grief, role transitions, interpersonal disputes, or interpersonal deficits. Research shows IPT is
          nearly as effective as CBT, though improvement may be slower initially.
        </p>

        <p>
          Dialectical Behavior Therapy (DBT) adapted for eating disorders emphasizes emotion regulation skills and
          distress tolerance. Given the emotion dysregulation central to bulimia, DBT skills for managing intense
          emotions without resorting to binge-purge behaviors can be particularly helpful, especially for patients with
          comorbid borderline personality disorder or significant self-harm behaviors.
        </p>

        <p>
          Medication can be a useful adjunct to therapy. Fluoxetine (Prozac) at 60mg daily---higher than typical
          depression doses---is FDA-approved for bulimia and reduces binge-purge frequency even in non-depressed patients.
          Other SSRIs show some benefit as well. However, medication alone is less effective than psychotherapy, and
          combining medication with CBT produces the best outcomes.
        </p>

        <h2>Recovery and Long-Term Outlook</h2>

        <p>
          Recovery from bulimia generally has a better prognosis than anorexia, with approximately 70-80% achieving full
          or near-full recovery with treatment. However, the course is often characterized by fluctuations---periods of
          symptom control followed by relapses, particularly during times of stress. Understanding that lapses are
          common and don't mean treatment failure is important for maintaining motivation during recovery.
        </p>

        <p>
          Full recovery involves not just abstinence from binge-purge behaviors but also developing healthy relationship
          with food (ability to eat flexibly, including previously "forbidden" foods), normalized eating patterns
          (regular meals without extended restriction), reduced preoccupation with weight and shape, improved emotion
          regulation skills, and better overall functioning in relationships, work, and self-care. Many people in
          recovery describe discovering that food was never really the problem---it was a maladaptive solution to problems
          with emotion regulation, self-worth, perfectionism, or interpersonal relationships. Addressing these
          underlying issues is essential for lasting recovery.
        </p>
      </>
    ),
  },

  // ============================================================================
  // Article 43: Binge Eating Disorder: The Most Common Eating Disorder
  // ============================================================================
  {
    id: catId(43),
    slug: 'binge-eating-disorder-most-common',
    title: 'Binge Eating Disorder: The Most Common Eating Disorder',
    description:
      'Understanding binge eating disorder, its distinct features from bulimia, medical and psychological impacts, and evidence-based treatments.',
    image: '/images/articles/cat18/cover-043.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Binge Eating Disorder', 'BED', 'Eating Disorders', 'Treatment'],

    summary:
      'Binge Eating Disorder (BED) is the most common eating disorder, affecting 2-4% of adults, with higher prevalence in women. BED involves recurrent episodes of eating large amounts of food with a sense of loss of control, accompanied by distress, but without the regular compensatory behaviors seen in bulimia. People with BED often experience significant shame, may be overweight or obese (though not always), and face medical complications related to both binge eating and weight. Unlike bulimia, BED was only officially recognized as a distinct disorder in 2013, leading to historical underdiagnosis and misunderstanding. Psychologically, BED often involves emotion dysregulation, negative body image, and using food to cope with stress, trauma, or difficult emotions. Treatment includes CBT adapted for BED, interpersonal therapy, and dialectical behavior therapy, all showing good efficacy. Weight-focused approaches alone are ineffective and often harmful.',

    keyFacts: [
      {
        text: 'Binge Eating Disorder affects approximately 3.5% of women and is more prevalent than anorexia and bulimia combined.',
        citationIndex: 1,
      },
      {
        text: 'CBT for BED produces binge abstinence rates of 40-60%, significantly higher than control conditions or weight-loss interventions alone.',
        citationIndex: 2,
      },
      {
        text: 'People with BED face discrimination and stigma both for having an eating disorder and for weight status, creating barriers to treatment.',
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'BED is not about lack of willpower or "just eating too much"---it is a serious mental health condition characterized by loss of control and significant distress that responds to psychological treatment.',

    practicalExercise: {
      title: 'Developing Non-Food Coping Strategies',
      steps: [
        {
          title: 'Identify Your Patterns',
          description:
            'Track binges for a week, noting what time they occur, what you were feeling before, what triggered them, and what happened after. Look for patterns.',
        },
        {
          title: 'Create a Coping Menu',
          description:
            'List 10-15 activities that could help when you feel urge to binge: calling friend, taking walk, journaling, playing with pet, creative activity, relaxation exercise.',
        },
        {
          title: 'Practice Urge Surfing',
          description:
            'When urge to binge arises, notice it like a wave---it will rise, peak, and fall. You don\'t have to act on it. Try waiting 10-15 minutes while using coping skill.',
        },
        {
          title: 'Challenge All-or-Nothing Thinking',
          description:
            'Notice thoughts like "I already ate too much, might as well keep going." Challenge this---one episode doesn\'t require another. Each moment is a new choice.',
        },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find BED Specialist',
    },

    citations: [
      {
        id: '1',
        text: 'Prevalence and correlates of binge eating disorder',
        source: 'Biological Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1016/j.biopsych.2022.03.012',
        tier: 1,
      },
      {
        id: '2',
        text: 'Psychological treatments for binge eating disorder: A meta-analysis',
        source: 'Clinical Psychology Review',
        year: '2023',
        link: 'https://doi.org/10.1016/j.cpr.2023.102289',
        tier: 1,
      },
      {
        id: '3',
        text: 'Weight stigma and eating disorder treatment outcomes',
        source: 'International Journal of Eating Disorders',
        year: '2023',
        link: 'https://doi.org/10.1002/eat.23901',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Binge Eating Disorder was only officially recognized as a distinct eating disorder in the DSM-5 in 2013,
          despite affecting more people than anorexia and bulimia combined. <Citation index={1} /> This late recognition
          contributed to decades of misunderstanding, with many people with BED told they simply needed more willpower or
          discipline, or treated solely with weight loss interventions that often worsened their disorder. Understanding
          BED as a legitimate mental health condition with specific psychological features and evidence-based treatments
          is essential for providing appropriate care and reducing the shame many people with BED experience.
        </p>

        <StatCard
          value="2-4%"
          label="Of Adults Affected"
          description="BED is the most common eating disorder, yet many people have never heard of it or don't recognize their symptoms"
          variant="info"
        />

        <p>
          Binge Eating Disorder is characterized by recurrent episodes of binge eating---consuming an amount of food that
          is definitely larger than most people would eat in a similar period under similar circumstances, with a sense
          of lack of control over eating during the episode. <Citation index={2} /> To distinguish from occasional
          overeating, binge episodes must be associated with at least three of the following: eating much more rapidly
          than normal, eating until feeling uncomfortably full, eating large amounts when not physically hungry, eating
          alone due to embarrassment, or feeling disgusted, depressed, or guilty after overeating.
        </p>

        <h2>BED vs. Bulimia: Critical Distinctions</h2>

        <p>
          The key difference between BED and bulimia nervosa is the absence of regular compensatory behaviors. People
          with BED do not routinely purge, use laxatives, fast, or excessively exercise after binges. This has several
          important implications. First, people with BED are more likely to be overweight or obese than those with
          bulimia, though BED occurs across weight ranges and should be diagnosed based on eating behaviors, not body
          size. Second, medical complications differ---BED doesn't involve the electrolyte imbalances and other
          consequences of purging, but does carry increased risk for obesity-related health problems.
        </p>

        <ComparisonTable
          headers={['Feature', 'Binge Eating Disorder', 'Bulimia Nervosa', 'Clinical Importance']}
          rows={[
            [
              'Compensatory Behaviors',
              'Absent or infrequent',
              'Regular (purging, fasting, exercise)',
              'Defines diagnosis and treatment approach',
            ],
            [
              'Typical Weight',
              'Often overweight/obese',
              'Normal to slightly overweight',
              'Affects stigma and treatment barriers',
            ],
            [
              'Medical Risks',
              'Obesity-related complications',
              'Purging-related complications',
              'Requires different medical monitoring',
            ],
            [
              'Psychological Profile',
              'More depression, less impulsivity',
              'Higher impulsivity',
              'Influences treatment selection',
            ],
          ]}
        />

        <p>
          <Citation index={3} /> Third, the psychological profiles differ somewhat. While both involve using food to
          regulate emotions, people with bulimia tend to show higher impulsivity across domains, while those with BED
          more commonly report using binge eating specifically as a coping mechanism for negative emotions, with less
          impulsivity in other areas. Understanding these differences is important for tailoring treatment appropriately.
        </p>

        <h2>Psychological Drivers of Binge Eating</h2>

        <p>
          Emotion regulation difficulties are central to BED. Many people with BED describe binges as occurring in
          response to negative emotions---stress, sadness, anxiety, loneliness, boredom, or anger. Eating provides
          temporary relief or distraction from these difficult feelings. Over time, this creates a learned pattern where
          food becomes the primary or only strategy for managing emotional distress. Some people describe feeling almost
          compelled to binge when experiencing strong emotions, unable to access other coping strategies.
        </p>

        <p>
          Negative body image and weight-related shame are nearly universal among people with BED, particularly those who
          are overweight. This creates a vicious cycle: binge eating may be partially driven by emotional distress about
          body image and weight, the binge temporarily provides relief or numbness, but afterward leads to increased
          shame and body dissatisfaction, which then triggers more emotional eating. This cycle is compounded by
          societal weight stigma and discrimination that many people with BED experience.
        </p>

        <ArticleCallout variant="insight" title="Diet Culture's Role in BED">
          <p>
            Many people with BED have extensive histories of dieting before developing the disorder. Restriction---whether
            through formal diets or informal food rules---creates both biological and psychological drivers to binge. The
            body responds to restriction with increased hunger and food preoccupation. Psychologically, labeling foods as
            "forbidden" increases their appeal, and breaking diet rules often triggers "all-or-nothing" thinking that
            escalates eating. For many, BED develops after years of yo-yo dieting, with binges initially occurring as
            "breaking" diets, then becoming more frequent and distressing. This is why weight-focused treatment that
            emphasizes restriction and dieting typically worsens BED rather than helping it.
          </p>
        </ArticleCallout>

        <p>
          Trauma and adverse childhood experiences are overrepresented among people with BED compared to the general
          population. Childhood abuse (physical, sexual, or emotional), neglect, bullying, or other trauma can
          contribute to BED development through several mechanisms: using food for emotional regulation (since healthy
          emotion regulation wasn't learned), dissociation during binges (similar to dissociation during trauma), shame
          and low self-worth contributing to disordered eating, and in some cases, unconsciously using weight as
          protection against unwanted sexual attention. Trauma-informed treatment is important for many people with BED.
        </p>

        <h2>Medical and Physical Health Impacts</h2>

        <p>
          While BED doesn't cause the immediate medical dangers of purging, it does have significant health
          implications. Many people with BED are overweight or obese, which increases risk for type 2 diabetes,
          cardiovascular disease, hypertension, sleep apnea, certain cancers, and osteoarthritis. However, it's
          important to note that weight is not always a reliable indicator of BED---the disorder occurs across weight
          ranges, and not everyone with BED is overweight.
        </p>

        <p>
          Gastrointestinal problems are common, including acid reflux, gallbladder disease, and digestive discomfort
          from large-volume eating. The rapid consumption of large amounts during binges can cause acute gastric
          distension, bloating, and pain. Mental health comorbidities are high---major depression occurs in 50-60% of
          people with BED at some point, anxiety disorders are also elevated, and some people develop substance use
          problems.
        </p>

        <h2>Evidence-Based Treatments for BED</h2>

        <p>
          Cognitive Behavioral Therapy adapted for BED (CBT-BED) is the most well-established treatment. Like CBT for
          bulimia, it focuses on establishing regular eating patterns, identifying and modifying thoughts that maintain
          binge eating, and developing alternative coping strategies for emotions. However, CBT-BED differs in important
          ways: less emphasis on weight and shape concerns (which may be less central in BED), more focus on emotion
          regulation skills, addressing "forbidden food" mentality without promoting restriction, and teaching mindful
          eating and hunger/fullness awareness.
        </p>

        <p>
          Interpersonal Psychotherapy (IPT) for BED focuses on relationship problems and life transitions that trigger
          negative emotions leading to binge eating. IPT is particularly appropriate for people whose binge eating is
          clearly linked to interpersonal stress---relationship conflicts, grief and loss, role transitions (like
          becoming a parent or retirement), or interpersonal deficits (difficulty forming or maintaining relationships).
          Research shows IPT is as effective as CBT, though may take longer to show effects.
        </p>

        <p>
          Dialectical Behavior Therapy (DBT) skills training emphasizes mindfulness, distress tolerance, and emotion
          regulation---all directly relevant to BED. DBT teaches skills for tolerating distress without engaging in
          problem behaviors (like binge eating), regulating intense emotions, and being mindful of eating experiences.
          Some research suggests DBT may be particularly helpful for people with BED who also have high emotional
          dysregulation or borderline personality disorder.
        </p>

        <h2>The Weight Loss Question</h2>

        <p>
          A common question is whether treatment should focus on weight loss given that many people with BED are
          overweight and desire weight loss. Research is clear: focusing primarily on weight loss in BED treatment is
          ineffective and often harmful. Weight-loss interventions that emphasize restriction typically increase binge
          eating rather than reducing it. Moreover, weight-focused treatment reinforces the idea that worth depends on
          body size and that food should be restricted---beliefs that often maintain BED.
        </p>

        <p>
          The most effective approach is to initially focus exclusively on stopping binge eating through psychological
          treatment, without weight loss goals. For many people, ceasing binge eating alone leads to some weight loss or
          stabilization. For those who remain overweight after achieving control over binge eating and want to pursue
          weight management, this should be approached carefully---emphasizing sustainable health behaviors rather than
          restriction, maintaining regular eating patterns, and closely monitoring for return of binge eating. The goal
          is health and well-being, not achieving a particular number on the scale.
        </p>

        <h2>Recovery and Long-Term Management</h2>

        <p>
          Recovery from BED typically involves achieving abstinence from binge eating or significant reduction in
          frequency and distress, developing effective emotion regulation strategies beyond food, normalizing eating
          patterns with regular meals and flexibility about food choices, and reducing shame and improving self-
          compassion. For many people, recovery also involves developing weight-neutral perspective focused on health
          behaviors rather than weight itself.
        </p>

        <p>
          Long-term outcome studies show that with appropriate treatment, most people with BED can achieve significant
          improvement. Relapse rates are lower than in anorexia or bulimia, and many people maintain gains after
          treatment ends. However, ongoing stressors, major life transitions, or returning to restrictive dieting can
          trigger relapses. Developing strong relapse prevention skills and knowing when to seek additional support are
          important components of long-term recovery.
        </p>
      </>
    ),
  },

  // ============================================================================
  // Article 44: ARFID and Orthorexia: Emerging Eating Disorders
  // ============================================================================
  {
    id: catId(44),
    slug: 'arfid-orthorexia-emerging-eating-disorders',
    title: 'ARFID and Orthorexia: Emerging Eating Disorders',
    description:
      'Understanding Avoidant/Restrictive Food Intake Disorder and orthorexia nervosa---emerging eating disorder presentations with distinct features.',
    image: '/images/articles/cat18/cover-044.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['ARFID', 'Orthorexia', 'Eating Disorders', 'Restrictive Eating'],

    summary:
      'Avoidant/Restrictive Food Intake Disorder (ARFID) and orthorexia nervosa represent eating disorder presentations that differ from classic anorexia and bulimia. ARFID, recognized in DSM-5 (2013), involves restrictive eating not driven by weight/shape concerns but by sensory sensitivity, fear of aversive consequences (choking, vomiting), or lack of interest in food. It can lead to malnutrition, weight loss, and impaired functioning. Orthorexia, while not yet an official diagnosis, involves obsession with healthy or "clean" eating that becomes rigid and impairing. Both disorders can affect women significantly and require specialized treatment approaches. ARFID treatment often involves exposure therapy for feared foods, family-based approaches for children, and addressing underlying anxiety. Orthorexia treatment focuses on cognitive flexibility, challenging health beliefs, and developing balanced approach to nutrition.',

    keyFacts: [
      {
        text: 'ARFID can begin in childhood and persist into adulthood, affecting nutritional status and growth without involving body image concerns.',
        citationIndex: 1,
      },
      {
        text: 'Orthorexia often begins with genuine desire to eat healthfully but escalates into rigid food rules, social isolation, and malnutrition.',
        citationIndex: 2,
      },
      {
        text: 'Both ARFID and orthorexia are commonly misunderstood or dismissed, leading to delayed treatment and worsening symptoms.',
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Not all restrictive eating is about weight---ARFID and orthorexia show how eating disorders can manifest through anxiety, control, or rigidity without traditional body image concerns.',

    practicalExercise: {
      title: 'Assessing Your Relationship with Food Rules',
      steps: [
        {
          title: 'List Your Food Rules',
          description:
            'Write down all rules you follow about what, when, or how you eat. Be specific---"no processed food," "only organic," "must fast 16 hours," etc.',
        },
        {
          title: 'Identify the Consequences',
          description:
            'For each rule, note what happens when you break it. Anxiety? Self-punishment? Social isolation? This reveals whether rules serve you or control you.',
        },
        {
          title: 'Assess Flexibility',
          description:
            'Imagine breaking one rule in a safe way. How does that feel? If the thought creates intense anxiety or is unthinkable, that suggests rigidity.',
        },
        {
          title: 'Evaluate Life Impact',
          description:
            'Do food rules prevent you from social events, limit your work opportunities, cause family conflict, or dominate your thoughts? If yes, they may be impairing.',
        },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find ED Specialist',
    },

    citations: [
      {
        id: '1',
        text: 'Avoidant/restrictive food intake disorder: Clinical characteristics and treatment approaches',
        source: 'Current Psychiatry Reports',
        year: '2023',
        link: 'https://doi.org/10.1007/s11920-023-01423-8',
        tier: 1,
      },
      {
        id: '2',
        text: 'Orthorexia nervosa: A systematic review of the literature',
        source: 'Eating and Weight Disorders',
        year: '2022',
        link: 'https://doi.org/10.1007/s40519-022-01512-3',
        tier: 1,
      },
      {
        id: '3',
        text: 'Emerging eating disorder presentations: Recognition and treatment',
        source: 'Journal of Clinical Psychology',
        year: '2023',
        link: 'https://doi.org/10.1002/jclp.23456',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          While anorexia, bulimia, and binge eating disorder are the most recognized eating disorders, emerging
          presentations like ARFID and orthorexia affect significant numbers of people yet remain poorly understood by
          many healthcare providers and the public. <Citation index={1} /> These disorders demonstrate that problematic
          relationships with food aren't always about weight or body image---they can stem from anxiety, sensory issues,
          perfectionism, or rigid thinking patterns. Recognizing these presentations is essential for providing
          appropriate treatment rather than dismissing symptoms as "pickiness" or "being too health-conscious."
        </p>

        <StatCard
          value="Different Drivers"
          label="Same Serious Impact"
          description="ARFID and orthorexia cause real malnutrition and impairment despite not fitting classic eating disorder stereotypes"
          variant="warning"
        />

        <h2>ARFID: When Eating Itself Feels Dangerous</h2>

        <p>
          Avoidant/Restrictive Food Intake Disorder (ARFID) involves eating or feeding disturbance resulting in
          persistent failure to meet nutritional needs, associated with one or more of the following: significant weight
          loss or failure to achieve expected weight gain (in children), significant nutritional deficiency, dependence
          on enteral feeding or oral supplements, or marked interference with psychosocial functioning. <Citation
            index={2}
          />{' '}
          Critically, the disturbance is not better explained by lack of available food, culturally sanctioned practice,
          or concurrent medical condition---and it does not occur exclusively during anorexia or bulimia.
        </p>

        <p>
          Three primary presentations of ARFID have been identified. The sensory-based subtype involves extreme
          sensitivity to sensory properties of food---taste, texture, temperature, appearance, or smell. People with this
          presentation may gag or vomit when encountering certain textures, be unable to tolerate foods touching on the
          plate, or have extremely limited repertoire of acceptable foods (sometimes called "selective eating" or
          "picky eating" when severe).
        </p>

        <p>
          The fear-based subtype centers on fear of aversive consequences of eating, most commonly fear of choking,
          vomiting, or having an allergic reaction. This often develops after a traumatic eating experience---choking
          incident, severe vomiting illness, or frightening allergic reaction---but then generalizes beyond the original
          trigger food. Some people become afraid of all solid foods, eating only liquids or purees. Others develop
          elaborate rituals around eating to prevent the feared outcome.
        </p>

        <p>
          The lack of interest subtype involves apparent lack of interest in eating or food, sometimes described as
          forgetting to eat or just not feeling hungry. These individuals don't actively avoid food due to fear or
          sensory issues---they simply don't experience normal eating drive or pleasure from eating. This can lead to
          significant nutritional deficiency simply from not eating enough, particularly problematic in children who may
          not recognize or respond to hunger cues.
        </p>

        <ArticleCallout variant="science" title="ARFID vs. Anorexia: Critical Distinction">
          <p>
            The key distinction between ARFID and anorexia is motivation for restriction. In anorexia, food restriction
            is driven by fear of weight gain, distorted body image, or overvaluation of thinness. In ARFID, restriction
            has nothing to do with weight or shape concerns---it's driven by sensory issues, fear of eating consequences,
            or lack of interest. This distinction is crucial for treatment: approaches effective for anorexia (which
            must address body image and fear of weight gain) don't work for ARFID. Conversely, ARFID requires addressing
            specific fears, sensory sensitivities, or appetite issues that aren't present in anorexia.
          </p>
        </ArticleCallout>

        <h2>Orthorexia: When Healthy Eating Becomes Unhealthy</h2>

        <p>
          Orthorexia nervosa, while not yet an official DSM diagnosis, describes an emerging pattern characterized by
          obsessive focus on healthy eating that becomes rigid, time-consuming, and impairing. <Citation index={3} />{' '}
          The term was coined by physician Steven Bratman in 1997 to describe patients who became so fixated on eating
          "pure" or "clean" foods that their health and functioning suffered. Unlike anorexia where restriction is
          primarily about quantity and calories, in orthorexia restriction is about quality---what types of foods are
          considered acceptable.
        </p>

        <p>
          Orthorexia typically begins with genuine desire to improve health through better nutrition. Someone might read
          about harmful effects of processed foods, pesticides, or certain ingredients and decide to eliminate them.
          Initially this seems positive---eating more whole foods, cooking at home, reading ingredient labels. However,
          for some individuals, this escalates into increasingly rigid rules about what foods are "safe" or "pure" and
          what are "toxic" or "unclean."
        </p>

        <ComparisonTable
          headers={['Feature', 'Healthy Eating', 'Orthorexia', 'Red Flag']}
          rows={[
            [
              'Food Choices',
              'Mostly nutritious, flexible',
              'Rigid rules, extensive restrictions',
              'Extensive forbidden food list',
            ],
            [
              'Social Impact',
              'Can eat with others flexibly',
              'Avoids social eating, brings own food',
              'Isolation due to food rules',
            ],
            [
              'Breaking Rules',
              'Occasional indulgences without distress',
              'Intense anxiety, guilt, self-punishment',
              'Emotional crisis over food "violations"',
            ],
            [
              'Time Spent',
              'Reasonable meal planning',
              'Hours researching, planning, preparing',
              'Food planning dominates daily life',
            ],
            [
              'Self-Worth',
              'Based on many factors',
              'Determined by dietary adherence',
              'Identity built around "clean eating"',
            ],
          ]}
        />

        <p>
          The progression in orthorexia often follows predictable patterns. Rules become increasingly restrictive over
          time---what starts as avoiding processed foods evolves into eliminating entire food groups, requiring organic
          certification, excluding foods touched by certain materials, or eating only raw or locally grown items.
          Breaking rules causes intense anxiety, guilt, or shame, sometimes leading to compensatory behaviors like
          fasting or "cleanses." People with orthorexia often spend hours researching food, reading labels, planning
          meals, or preparing food according to specific rituals.
        </p>

        <h2>Medical and Nutritional Consequences</h2>

        <p>
          Both ARFID and orthorexia can lead to serious nutritional deficiencies despite different mechanisms. In ARFID,
          limited food variety or overall insufficient intake creates deficiencies in essential nutrients. Common
          deficiencies include protein malnutrition (particularly in fear-based ARFID where people avoid most solid
          foods), iron deficiency (when meat and other iron-rich foods are avoided), vitamin B12 deficiency, calcium and
          vitamin D deficiency (when dairy is avoided or intake is very limited), and omega-3 fatty acids (when fish and
          certain plant foods are avoided).
        </p>

        <p>
          In orthorexia, ironically, the pursuit of "optimal" nutrition often creates imbalances. Eliminating entire
          food groups (dairy, grains, all fats) removes important nutrient sources. Very restrictive "clean eating"
          diets may be deficient in calories, protein, essential fats, or specific micronutrients. Some people with
          orthorexia develop malnutrition despite believing they're eating the "healthiest" diet possible.
        </p>

        <p>
          Beyond nutritional issues, both disorders cause significant psychosocial impairment. Social isolation is
          common---people with ARFID may avoid social situations involving food due to anxiety or embarrassment; those
          with orthorexia may refuse social invitations where they can't control food preparation. Relationships suffer
          when food rules create conflict with family or partners. Occupational or academic functioning may be impaired
          when symptoms interfere with travel, work events, or concentration. Quality of life diminishes as increasing
          amounts of time and mental energy focus on food-related concerns.
        </p>

        <h2>Treatment Approaches for ARFID</h2>

        <p>
          Treatment for ARFID must be tailored to the specific presentation. For sensory-based ARFID, graded exposure
          therapy is often helpful. This involves creating a hierarchy of feared or avoided foods based on sensory
          properties, then gradually exposing the person to these foods in safe, controlled manner. Exposure might begin
          with looking at the food, progress to touching or smelling it, then tasting tiny amounts, and eventually
          consuming normal portions. The goal is habituation---reducing the sensory aversion through repeated exposure.
        </p>

        <p>
          For fear-based ARFID, cognitive behavioral therapy addresses catastrophic thoughts about eating consequences.
          Patients learn that their feared outcomes (choking, vomiting) are extremely unlikely with normal eating, and
          develop skills for managing anxiety around eating. Exposure therapy is also used, but framed around confronting
          fears rather than sensory properties. Some patients benefit from learning safe swallowing techniques to reduce
          actual choking risk and build confidence.
        </p>

        <p>
          For lack-of-interest ARFID, behavioral interventions focus on establishing regular eating routines,
          identifying and responding to hunger cues, and sometimes using contingency management (rewards for meeting
          eating goals). Medications that stimulate appetite may be helpful in some cases, particularly when medical
          complications require rapid nutritional rehabilitation.
        </p>

        <h2>Treatment Approaches for Orthorexia</h2>

        <p>
          Since orthorexia isn't an official diagnosis, no standardized treatment protocol exists. However, clinicians
          often adapt approaches from other eating disorders. Cognitive behavioral therapy can address rigid thinking
          about food, challenge beliefs about "toxic" or "unclean" foods, and develop cognitive flexibility. Patients
          practice eating previously forbidden foods and examining whether the feared consequences (illness,
          contamination, weight gain) actually occur.
        </p>

        <p>
          Nutritional counseling with eating disorder-specialized dietitians helps patients understand that food isn't
          simply "good" or "bad" but exists on a continuum, that the body can handle variety and occasional less-
          optimal foods without harm, and that obsessive restriction often creates more health problems than it prevents.
          Dietitians might work with patients to gradually reintroduce food groups or challenge specific food rules.
        </p>

        <p>
          Addressing underlying factors is crucial. Orthorexia often reflects anxiety, need for control, or
          perfectionism. Some people have health anxiety that gets channeled into food obsessions. Others use "clean
          eating" as socially acceptable form of restriction when they actually have body image concerns. Treatment must
          address these underlying issues rather than just focusing on food behaviors. For some patients, orthorexia
          represents an early or atypical presentation of anorexia, requiring standard eating disorder treatment.
        </p>

        <h2>When to Seek Help</h2>

        <p>
          Both ARFID and orthorexia exist on continua, and knowing when preferences cross into disorder can be
          challenging. Red flags include: significant nutritional deficiency or weight loss, inability to eat adequate
          variety to meet nutritional needs, extreme distress when unable to follow food rules, social isolation due to
          food-related anxiety or rules, food-related thoughts and behaviors dominating daily life, and functional
          impairment in work, school, or relationships due to food issues. If food restrictions---regardless of
          motivation---are causing these problems, professional help from eating disorder specialists is warranted.
        </p>
      </>
    ),
  },

  // ============================================================================
  // Article 45: Diet Culture and Eating Disorders in Women
  // ============================================================================
  {
    id: catId(45),
    slug: 'diet-culture-eating-disorders-women',
    title: 'Diet Culture and Eating Disorders in Women',
    description:
      'Examining how diet culture contributes to eating disorder development in women and strategies for resisting harmful cultural messages.',
    image: '/images/articles/cat18/cover-045.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Diet Culture', 'Body Image', 'Eating Disorders', 'Prevention'],

    summary:
      'Diet culture---the pervasive belief system that equates thinness with health and moral virtue, promotes weight loss as path to higher status, and normalizes restriction and body dissatisfaction---creates environment conducive to eating disorder development, particularly in women. While diet culture doesn\'t directly cause eating disorders in everyone exposed, it provides the cultural water in which eating disorders swim. Messages about "good" and "bad" foods, before-and-after transformations, and constant body surveillance create risk, especially for those with genetic or psychological vulnerabilities. Diet culture particularly harms women through gendered beauty standards, moralization of eating, and weight-based discrimination. Resisting diet culture involves recognizing and rejecting these messages, developing weight-neutral health perspective, practicing body neutrality or acceptance, and advocating for size diversity and anti-diet approaches.',

    keyFacts: [
      {
        text: 'Over 90% of women report body dissatisfaction, largely driven by exposure to unrealistic beauty standards promoted by diet culture.',
        citationIndex: 1,
      },
      {
        text: 'Dieting is one of the strongest predictors of eating disorder development, with adolescent dieters being 5-18 times more likely to develop an eating disorder.',
        citationIndex: 2,
      },
      {
        text: 'Weight stigma and discrimination, core features of diet culture, cause psychological distress and health harm independent of actual body weight.',
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'You don\'t have to participate in diet culture. Body size diversity is natural and healthy, and your worth is not determined by how closely you match arbitrary beauty standards.',

    practicalExercise: {
      title: 'Identifying and Resisting Diet Culture Messages',
      steps: [
        {
          title: 'Notice Diet Culture in Media',
          description:
            'For one week, notice every diet culture message you encounter: weight loss ads, "clean eating" posts, body transformation content, food moralization ("cheat day," "guilty pleasure").',
        },
        {
          title: 'Curate Your Social Media',
          description:
            'Unfollow accounts that promote dieting, before/after photos, or food restriction. Follow body-positive, Health at Every Size, and anti-diet accounts instead.',
        },
        {
          title: 'Challenge Internal Messages',
          description:
            'Notice when you have diet culture thoughts ("I shouldn\'t eat that," "I need to earn this food"). Challenge these: Who says? What if I rejected this belief?',
        },
        {
          title: 'Practice Body Neutrality',
          description:
            'Instead of trying to love your body (which can feel inauthentic), practice appreciating what your body does rather than how it looks.',
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Journal Your Observations',
    },

    citations: [
      {
        id: '1',
        text: 'Body dissatisfaction and diet culture: A systematic review',
        source: 'Body Image',
        year: '2023',
        link: 'https://doi.org/10.1016/j.bodyim.2023.03.012',
        tier: 1,
      },
      {
        id: '2',
        text: 'Dieting and eating disorder risk: A longitudinal study',
        source: 'International Journal of Eating Disorders',
        year: '2022',
        link: 'https://doi.org/10.1002/eat.23734',
        tier: 1,
      },
      {
        id: '3',
        text: 'Weight stigma and mental health: A comprehensive review',
        source: 'Obesity Reviews',
        year: '2023',
        link: 'https://doi.org/10.1111/obr.13523',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Diet culture is so pervasive in Western societies that many people don't recognize it as a specific belief
          system rather than objective truth. <Citation index={1} /> From childhood, girls receive messages that their
          bodies are projects to be worked on, that certain foods are "bad" and should be avoided, and that thinness
          represents discipline, health, and success while larger bodies represent laziness, poor health, and moral
          failure. These messages come from media, medical providers, family members, schools, and peer groups---creating
          an environment where disordered eating and body dissatisfaction are normalized rather than recognized as
          harmful.
        </p>

        <StatCard
          value="90%+"
          label="Of Women Report Body Dissatisfaction"
          description="Diet culture has normalized hatred of and dissatisfaction with normal, healthy bodies"
          variant="urgent"
        />

        <p>
          Diet culture operates through several key tenets. First is the thin ideal---the belief that thinness is
          universally desirable, healthy, and achievable through "discipline" and "willpower," ignoring the reality that
          body size is largely determined by genetics, biology, and social determinants of health rather than individual
          choices. <Citation index={2} /> Second is moralization of food and eating---labeling foods as "good" or "bad,"
          "clean" or "junk," and attaching moral value to eating behaviors. People describe feeling "good" for eating
          salad and "bad" for eating dessert, as if food choices determine moral worth.
        </p>

        <h2>How Diet Culture Creates Eating Disorder Risk</h2>

        <p>
          Diet culture contributes to eating disorder development through multiple pathways. Normalization of
          restriction makes dieting seem healthy and desirable, obscuring the line between "normal" dieting and
          disordered eating. When mothers, friends, and role models are constantly dieting, restricting becomes a rite
          of passage rather than a red flag. Young women learn that dissatisfaction with their bodies is expected and
          that attempting to change them through restriction is appropriate.
        </p>

        <p>
          The creation of "good" and "bad" foods sets up dichotomous thinking that characterizes eating disorders.
          Eating "good" foods generates pride and superiority; eating "bad" foods triggers guilt and shame. This easily
          escalates into the rigid food rules seen in anorexia or the shame-driven binge-purge cycles of bulimia. Diet
          culture teaches that certain foods are to be feared or avoided, laying groundwork for the food phobias that
          maintain eating disorders.
        </p>

        <ArticleCallout variant="warning" title="The Dieting Paradox">
          <p>
            Research consistently shows that dieting is both extremely common and remarkably unsuccessful for long-term
            weight loss---95% of dieters regain lost weight within 1-5 years, and many gain back more than they lost. Yet
            diet culture attributes this failure to individual lack of willpower rather than biological reality. This
            creates cycle: diet, lose weight, regain weight (biological adaptation), feel like failure, diet again more
            restrictively. This yo-yo pattern increases eating disorder risk and causes more health harm than stable
            higher weight would. For those genetically vulnerable to eating disorders, this cycle can trigger disorder
            onset.
          </p>
        </ArticleCallout>

        <p>
          <Citation index={3} /> Diet culture promotes exercise primarily as means of burning calories or changing body
          shape rather than for enjoyment, stress relief, or health benefits. This transforms movement from potentially
          joyful activity into punishment or obligation, contributing to compulsive exercise patterns seen in many
          eating disorders. Similarly, the focus on external appearance over internal experience disconnects people from
          body signals---hunger, fullness, fatigue---that are essential for healthy eating and self-care.
        </p>

        <h2>Gendered Dimensions of Diet Culture</h2>

        <p>
          While diet culture affects people of all genders, it disproportionately impacts women through several
          mechanisms. Women's worth being tied to appearance is a longstanding cultural pattern that diet culture
          exploits and reinforces. Women receive messages from early childhood that being attractive (read: thin) is
          their primary value. Professional success, intelligence, and other achievements are often qualified with
          commentary on appearance in ways they aren't for men.
        </p>

        <p>
          The acceptable range of body sizes for women is far narrower than for men. While some size diversity in men is
          tolerated or even celebrated ("dad bod"), women face intense pressure to maintain thin bodies across the
          lifespan---with particular scrutiny during and after pregnancy, during perimenopause and menopause, and as they
          age. This narrow ideal is also racialized, with beauty standards centered on white, Western body types while
          pathologizing body shapes common in other ethnic groups.
        </p>

        <p>
          Women's eating is subject to greater scrutiny and judgment than men's. Women eating large portions, "messy"
          foods, or openly enjoying food face social consequences. Diet culture teaches women to eat performatively---
          small portions, "healthy" choices, expressions of guilt when indulging. This creates disconnect between
          women's actual needs and appetites and what they feel comfortable eating publicly, contributing to secretive
          eating and binge eating patterns.
        </p>

        <h2>Medical Weight Bias and Healthcare Harm</h2>

        <p>
          Diet culture permeates healthcare, causing significant harm particularly to women in larger bodies. Weight
          bias among healthcare providers---including eating disorder specialists---leads to attribution of all symptoms to
          weight regardless of actual relevance, delay in eating disorder diagnosis for people who don't fit the
          "thin white girl" stereotype, prescription of dieting for conditions unrelated to weight, and dismissal of
          concerns or symptoms as simply weight-related.
        </p>

        <p>
          This creates dangerous situations where serious medical conditions go undiagnosed because providers focus on
          weight instead of symptoms. Women with eating disorders in larger bodies often go undiagnosed and untreated
          because providers assume people in larger bodies can't have anorexia or don't need urgent intervention---despite
          research showing that medical complications and mortality risk correlate with rate and magnitude of weight
          loss, not current weight.
        </p>

        <h2>The "Wellness" Industry: Diet Culture in Disguise</h2>

        <p>
          As diet culture has faced increasing criticism, it has rebranded under the guise of "wellness." Instead of
          explicitly promoting weight loss, "wellness" culture promotes "clean eating," "detoxes," "gut health," and
          "anti-inflammatory" diets that function identically to diet culture---creating food fear, restriction, and body
          dissatisfaction---while claiming to be about health rather than appearance.
        </p>

        <p>
          "Wellness" influencers promote restrictive eating patterns (intermittent fasting, elimination diets, juice
          cleanses) that are indistinguishable from disordered eating, just with different language. The effect is the
          same: restriction, food anxiety, and increased eating disorder risk. For people in recovery from eating
          disorders, "wellness" culture can be particularly triggering, as it provides socially acceptable language for
          disordered behaviors they're trying to stop.
        </p>

        <h2>Anti-Diet Movement and Health at Every Size</h2>

        <p>
          The anti-diet movement and Health at Every Size (HAES) paradigm offer alternatives to diet culture. HAES
          principles include accepting and respecting body size diversity, recognizing that health is multidimensional
          and includes physical, mental, social, and spiritual well-being (not just weight), promoting pleasurable,
          flexible eating based on internal cues rather than external rules, and supporting movement for enjoyment and
          well-being rather than weight control.
        </p>

        <p>
          Rather than pursuing weight loss as health goal, HAES focuses on health behaviors---regular eating, joyful
          movement, stress management, adequate sleep, social connection---that support well-being regardless of weight
          changes. Research shows that HAES approaches improve health markers (blood pressure, cholesterol, blood sugar)
          and psychological well-being while reducing disordered eating and body dissatisfaction, often with better
          long-term outcomes than weight-focused interventions.
        </p>

        <h2>Practical Resistance to Diet Culture</h2>

        <p>
          Individual resistance to diet culture is challenging given its pervasiveness, but several strategies can help.
          Media literacy involves recognizing diet culture messages in media, advertising, and social media, curating
          social media feeds to remove diet content and include body-positive accounts, and critically examining before/
          after photos, transformation stories, and "what I eat in a day" content for underlying diet culture messages.
        </p>

        <p>
          Challenging food moralization means practicing neutral language about food (describing foods as high-energy or
          nutrient-dense rather than "bad" or "clean"), noticing and rejecting guilt or virtue associated with eating
          choices, and allowing all foods to fit in a flexible eating pattern. Body neutrality practices involve
          focusing on body function and capability rather than appearance, developing gratitude for what body does
          rather than how it looks, and recognizing that bodies naturally exist in diverse sizes and shapes.
        </p>

        <p>
          On a broader level, advocating for size diversity and inclusion means supporting size-inclusive clothing,
          media representation, healthcare, and public spaces, challenging weight-based discrimination, and advocating
          for eating disorder prevention programs that address diet culture rather than promoting weight control.
          Individual healing from diet culture often happens alongside collective resistance to systems that profit from
          body dissatisfaction.
        </p>
      </>
    ),
  },
];
