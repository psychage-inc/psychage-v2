/**
 * The 28 LIVE category pictogram concepts.
 *
 * Each maps a canonical taxonomy slug (src/config/taxonomy.ts) to a wordless
 * wayfinding concept: a clay figure ENACTING the category idea + ONE defining
 * prop, plus the short name baked into the lower third of the poster.
 *
 * `name` is the full canonical name (kept as the card's alt text). `bakedName`
 * is the legible short label rendered in the image. `figureLine` / `sceneLine`
 * are dropped verbatim into the prompt. `sensitive` keeps a scene extra calm,
 * dignified and non-graphic. `hue` is the System-A accent (palette.ts derives
 * the rest). Concepts are taken from the task's authoritative table.
 */

export interface Concept {
  slug: string;
  name: string;
  bakedName: string;
  hue: string;
  figureLine: string;
  sceneLine: string;
  atmosphere: string;
  sensitive: boolean;
}

export const CONCEPTS: Concept[] = [
  {
    slug: 'anxiety-stress',
    name: 'Anxiety, Stress & Overwhelm',
    bakedName: 'Anxiety & Stress',
    hue: '#2E9C8A',
    figureLine:
      'A single clay figure crouched low, knees drawn up, both hands pressed to the sides of its head, shoulders tense.',
    sceneLine:
      'A few soft rounded clay forms press gently inward toward the figure from the sides, suggesting mounting pressure without crushing it.',
    atmosphere: 'Tense but contained; the overwhelm is real yet survivable.',
    sensitive: false,
  },
  {
    slug: 'depression-grief',
    name: 'Depression, Grief & Loss',
    bakedName: 'Depression & Grief',
    hue: '#6A78D0',
    figureLine:
      'A single clay figure sitting hunched on the ground, head bowed, arms resting heavily, posture quiet and weighed down.',
    sceneLine:
      'A soft low rain cloud hovers just above the figure, with a few gentle clay raindrops falling slowly around it.',
    atmosphere: 'Gentle and protective; heavy sadness held with care, never bleak.',
    sensitive: true,
  },
  {
    slug: 'trauma-healing',
    name: 'Trauma-Informed Education & Healing',
    bakedName: 'Trauma & Healing',
    hue: '#D45A4A',
    figureLine:
      'A single clay figure rising upright from a low posture, spine lengthening, one hand reaching upward in recovery.',
    sceneLine:
      'Beside the figure a cracked clay form is visibly mending back into one smooth whole, the seam softening into wholeness.',
    atmosphere: 'Hopeful and dignified; repair is underway, never re-wounding.',
    sensitive: true,
  },
  {
    slug: 'mental-health-conditions',
    name: 'Understanding Mental Health Conditions',
    bakedName: 'Mental Health Conditions',
    hue: '#7A5AC8',
    figureLine:
      'A single clay figure standing calmly, both hands cupped in front of its chest, gently holding something.',
    sceneLine:
      'A soft glowing clay orb of understanding rests in the figure\'s cupped hands, emitting a calm steady light.',
    atmosphere: 'Curious and clear; conditions made understandable, not frightening.',
    sensitive: false,
  },
  {
    slug: 'psychosis-schizophrenia',
    name: 'Psychosis, Schizophrenia & Severe Mental Illness',
    bakedName: 'Psychosis & Schizophrenia',
    hue: '#5A8294',
    figureLine:
      'A single clay figure standing calm and steady, grounded and composed, gaze level.',
    sceneLine:
      'A few scattered clay fragments around the figure are visibly resolving and drawing together into one clear, coherent form.',
    atmosphere: 'Calm, clear and non-stigmatizing; clarity emerging from confusion.',
    sensitive: true,
  },
  {
    slug: 'neurodivergence-adhd-autism',
    name: 'Neurodivergence, ADHD & Autism Spectrum',
    bakedName: 'Neurodivergence',
    hue: '#A65AD8',
    figureLine:
      'A single clay figure standing with an open, curious, playful posture, head tilted slightly up.',
    sceneLine:
      'A bright, non-linear constellation of varied small clay shapes — circles, triangles, squiggles — orbits the figure in a lively, irregular pattern.',
    atmosphere: 'Bright and celebratory; difference as a vivid, valued way of thinking.',
    sensitive: false,
  },
  {
    slug: 'eating-body',
    name: 'Eating & Body',
    bakedName: 'Eating & Body',
    hue: '#7AAE7E',
    figureLine:
      'A single clay figure standing calm and at ease, one hand resting gently on its own stomach.',
    sceneLine:
      'A simple round clay bowl or plate form rests on the ground nearby, plain and unthreatening.',
    atmosphere: 'Calm and accepting; a peaceful, non-judgmental relationship with the body.',
    sensitive: true,
  },
  {
    slug: 'chronic-illness-pain',
    name: 'Chronic Illness, Pain & Medical Psychology',
    bakedName: 'Chronic Illness & Pain',
    hue: '#C06A3E',
    figureLine:
      'A single clay figure seated upright and steady on the ground, composed and enduring, holding itself with quiet strength.',
    sceneLine:
      'A soft persistent warm glow sits at one part of the figure\'s body, marking ongoing pain that is acknowledged and managed.',
    atmosphere: 'Steady and resilient; living well alongside a persistent condition.',
    sensitive: true,
  },
  {
    slug: 'aging-dementia-late-life',
    name: 'Aging, Dementia & Late-Life Mental Health',
    bakedName: 'Aging & Late-Life',
    hue: '#C9A24E',
    figureLine:
      'A single contemplative clay figure standing and leaning lightly on a simple straight clay cane, calm and reflective.',
    sceneLine:
      'A few warm concentric clay time-rings spread softly outward on the ground around the figure, like growth rings.',
    atmosphere: 'Warm and dignified; late life rich with accumulated meaning.',
    sensitive: true,
  },
  {
    slug: 'emotional-regulation',
    name: 'Emotional Regulation & Self-Awareness',
    bakedName: 'Emotional Regulation',
    hue: '#D46A86',
    figureLine:
      'A single clay figure standing balanced and centered, one hand resting flat on its own chest, breathing steadily.',
    sceneLine:
      'Calm, balanced clay waves flow in smooth even ripples around the figure, settled and rhythmic.',
    atmosphere: 'Settled and self-aware; feelings noticed and steadied.',
    sensitive: false,
  },
  {
    slug: 'habits-behavior-change',
    name: 'Habits, Motivation & Behavior Change',
    bakedName: 'Habits & Behavior',
    hue: '#4FA85E',
    figureLine:
      'A single clay figure mid-stride, one leg lifted, actively climbing upward with purpose.',
    sceneLine:
      'A few simple clay steps ascend in front of the figure, each one a small achievable rise toward the top.',
    atmosphere: 'Motivated and doable; change built one small step at a time.',
    sensitive: false,
  },
  {
    slug: 'sleep-body-connection',
    name: 'Sleep, Body & Mind-Body Connection',
    bakedName: 'Sleep & Body',
    hue: '#4A5AB0',
    figureLine:
      'A single clay figure lying down on its side asleep, curled comfortably and at rest, fully relaxed.',
    sceneLine:
      'A soft clay crescent moon glows gently in the space above the sleeping figure.',
    atmosphere: 'Restful and restorative; deep calm of good sleep.',
    sensitive: false,
  },
  {
    slug: 'self-worth-identity',
    name: 'Self-Worth, Confidence & Identity',
    bakedName: 'Self-Worth & Identity',
    hue: '#E8B84A',
    figureLine:
      'A single clay figure standing tall, grounded and upright, shoulders open and confident.',
    sceneLine:
      'A warm light glows outward from within the center of the figure\'s chest, radiating quiet inner worth.',
    atmosphere: 'Grounded and self-assured; worth that comes from within.',
    sensitive: false,
  },
  {
    slug: 'therapy-navigation',
    name: 'Therapy, Treatment & Mental Health Navigation',
    bakedName: 'Therapy & Treatment',
    hue: '#2E8C7E',
    figureLine:
      'Two clay figures seated on the ground facing each other, one leaning in and attentively listening, the other speaking.',
    sceneLine:
      'A small calm open space sits between the two figures, the ground bare and uncluttered around them.',
    atmosphere: 'Safe and attentive; the trust of being truly heard.',
    sensitive: false,
  },
  {
    slug: 'creativity-therapeutic-arts',
    name: 'Creativity, Therapeutic Arts & Expressive Healing',
    bakedName: 'Creativity & Arts',
    hue: '#E8843E',
    figureLine:
      'A single clay figure with both hands raised and open, actively shaping and releasing forms into the air.',
    sceneLine:
      'A few colorful flowing clay forms stream and curl outward from the figure\'s hands, expressive and free.',
    atmosphere: 'Expressive and freeing; healing through making and releasing.',
    sensitive: false,
  },
  {
    slug: 'life-skills-practical-psychology',
    name: 'Applied Life Skills, Self-Design & Practical Psychology',
    bakedName: 'Applied Life Skills',
    hue: '#C77B52',
    figureLine:
      'A single clay figure kneeling or leaning forward, actively stacking and arranging simple clay building blocks with both hands.',
    sceneLine:
      'A small, neatly arranged set of simple clay building blocks rises in front of the figure, a structure taking shape.',
    atmosphere: 'Practical and empowering; building a life with usable skills.',
    sensitive: false,
  },
  {
    slug: 'sports-exercise-psychology',
    name: 'Sports, Exercise & Movement Psychology',
    bakedName: 'Sports & Exercise',
    hue: '#F07A2E',
    figureLine:
      'A single clay figure caught mid-run or mid-jump, body extended and dynamic, full of energy and motion.',
    sceneLine:
      'A soft motion arc trails behind the figure on the ground, emphasizing speed and momentum.',
    atmosphere: 'Energetic and alive; the mind lifted by movement.',
    sensitive: false,
  },
  {
    slug: 'relationships-communication',
    name: 'Relationships & Communication',
    bakedName: 'Relationships',
    hue: '#D4845A',
    figureLine:
      'Two clay figures standing side by side, one with an arm warmly around the other\'s shoulders in a supportive gesture.',
    sceneLine:
      'The two figures share one soft connected contact shadow on the ground, joining them as a pair.',
    atmosphere: 'Warm and supportive; closeness built on connection.',
    sensitive: false,
  },
  {
    slug: 'work-productivity',
    name: 'Work, Productivity & Burnout',
    bakedName: 'Work & Burnout',
    hue: '#B08A5A',
    figureLine:
      'A single clay figure seated at a simple clay desk, slightly slumped forward over it, weary but holding on.',
    sceneLine:
      'A soft heavy glow of pressure hovers low overhead just above the figure, pressing down on the workspace.',
    atmosphere: 'Honest about pressure; weariness acknowledged, not glorified.',
    sensitive: false,
  },
  {
    slug: 'loneliness-connection',
    name: 'Loneliness, Social Connection & Belonging',
    bakedName: 'Loneliness & Belonging',
    hue: '#8A65C0',
    figureLine:
      'A single clay figure standing alone with generous empty space around it, one arm reaching outward hopefully.',
    sceneLine:
      'Wide open bare ground surrounds the figure, with the reaching hand stretching toward the open space.',
    atmosphere: 'Honest about loneliness; reaching toward belonging is possible.',
    sensitive: true,
  },
  {
    slug: 'digital-life',
    name: 'Digital Life, Social Media & Modern Stressors',
    bakedName: 'Digital Life',
    hue: '#2E9CB8',
    figureLine:
      'A single clay figure standing calm and composed, holding a simple glowing clay phone in one hand while raising the other palm in a gentle boundary.',
    sceneLine:
      'A soft glow rises from the small clay phone, kept at a calm, controlled distance from the figure.',
    atmosphere: 'Calm and in control; healthy boundaries with the screen.',
    sensitive: false,
  },
  {
    slug: 'technology-digital-life',
    name: 'Technology, Digital Life & Mental Health',
    bakedName: 'Technology & Mind',
    hue: '#5A7AB0',
    figureLine:
      'A single clay figure standing balanced and steady beside a simple soft glowing clay screen panel.',
    sceneLine:
      'A simple upright clay screen emits a soft even screen-light next to the figure, neither dominating nor diminishing it.',
    atmosphere: 'Balanced and intentional; technology kept in healthy proportion.',
    sensitive: false,
  },
  {
    slug: 'cultural-global',
    name: 'Cultural Perspectives, Inclusion & Global Wellness',
    bakedName: 'Cultural Perspectives',
    hue: '#C8924A',
    figureLine:
      'Three clay figures standing close together as a small group, shoulders nearly touching, united.',
    sceneLine:
      'Simple, diverse clay pattern motifs frame the group along the ground, suggesting many cultures side by side.',
    atmosphere: 'Inclusive and global; many cultures, shared wellbeing.',
    sensitive: false,
  },
  {
    slug: 'womens-mental-health',
    name: "Women's Mental Health",
    bakedName: "Women's Mental Health",
    hue: '#C05A9C',
    figureLine:
      'A single dignified clay figure standing tall and composed, one hand placed firmly over its heart in a gesture of strength and care.',
    sceneLine:
      'A soft warm glow radiates gently from beneath the hand at the figure\'s heart, calm and protective.',
    atmosphere: 'Dignified and strong; care held with quiet resolve.',
    sensitive: true,
  },
  {
    slug: 'mens-mental-health',
    name: "Men's Mental Health",
    bakedName: "Men's Mental Health",
    hue: '#4A6A9C',
    figureLine:
      'A single clay figure lowering a simple clay shield away from in front of its body, opening itself up, posture softening.',
    sceneLine:
      'The lowered clay shield rests to one side of the figure, no longer raised as a guard.',
    atmosphere: 'Gentle and opening; strength in letting the guard down.',
    sensitive: true,
  },
  {
    slug: 'environmental-eco-psychology',
    name: 'Environmental, Eco-Psychology & Planetary Mental Health',
    bakedName: 'Eco-Psychology',
    hue: '#3E9C7E',
    figureLine:
      'A single clay figure crouched gently, both hands cupped together carefully holding something small and living.',
    sceneLine:
      'A small living clay sprout with two tiny leaves grows up from the figure\'s cupped hands.',
    atmosphere: 'Tender and grounded; the mind\'s bond with the living planet.',
    sensitive: false,
  },
  {
    slug: 'spirituality-meaning',
    name: 'Spirituality, Meaning & Existential Mental Health',
    bakedName: 'Spirituality & Meaning',
    hue: '#9A6AC8',
    figureLine:
      'A single clay figure standing in an open upward posture, both hands gently open at its sides, head lifted.',
    sceneLine:
      'An expansive soft clay light glows above the figure, opening upward and outward into space.',
    atmosphere: 'Open and expansive; meaning sought with calm wonder.',
    sensitive: false,
  },
  {
    slug: 'financial-wellness',
    name: 'Financial Wellness & Economic Mental Health',
    bakedName: 'Financial Wellness',
    hue: '#8AA85E',
    figureLine:
      'A single clay figure standing calm and steady beside a few simple stacked clay coin discs.',
    sceneLine:
      'A small orderly stack of plain round clay coin forms sits on the ground next to the figure, balanced and stable.',
    atmosphere: 'Calm and stable; a steady, unanxious relationship with money.',
    sensitive: false,
  },
];

export function conceptBySlug(slug: string): Concept | undefined {
  return CONCEPTS.find((c) => c.slug === slug);
}
