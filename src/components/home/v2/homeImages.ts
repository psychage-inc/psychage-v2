// Central image path constants for homepage clay figure system
// All images are static assets in src/assets/images/homepage/

import listener from '@/assets/images/homepage/figures/A-1.jpeg';
import supporter from '@/assets/images/homepage/figures/A-2.jpeg';
import seeker from '@/assets/images/homepage/figures/A-3.jpeg';
import resting from '@/assets/images/homepage/figures/A-4.jpeg';
import rising from '@/assets/images/homepage/figures/A-5.jpeg';
import holder from '@/assets/images/homepage/figures/A-6.jpeg';
import gazer from '@/assets/images/homepage/figures/A-7.jpeg';
import open from '@/assets/images/homepage/figures/A-8.jpeg';

import sphereCluster from '@/assets/images/homepage/objects/B-1.jpeg';
import thinArc from '@/assets/images/homepage/objects/B-2.jpeg';
import softCube from '@/assets/images/homepage/objects/B-3.jpeg';
import floatingDisc from '@/assets/images/homepage/objects/B-4.jpeg';
import pairedPebbles from '@/assets/images/homepage/objects/B-5.jpeg';
import threadLoop from '@/assets/images/homepage/objects/B-6.jpeg';
import tinyPyramid from '@/assets/images/homepage/objects/B-7.jpeg';
import nestedBowls from '@/assets/images/homepage/objects/B-8.jpeg';
import singleDroplet from '@/assets/images/homepage/objects/B-9.jpeg';
import scatteredSeeds from '@/assets/images/homepage/objects/B-10.jpeg';
import gentleHelix from '@/assets/images/homepage/objects/B-11.jpeg';
import restingRing from '@/assets/images/homepage/objects/B-12.jpeg';

import turning from '@/assets/images/homepage/scenes/C-1.jpeg';
import score from '@/assets/images/homepage/scenes/C-2.jpeg';
import companion from '@/assets/images/homepage/scenes/C-3.jpeg';
import rhythm from '@/assets/images/homepage/scenes/C-4.jpeg';
import architecture from '@/assets/images/homepage/scenes/C-5.jpeg';
import map from '@/assets/images/homepage/scenes/C-6.jpeg';
import relationship from '@/assets/images/homepage/scenes/C-7.jpeg';

export const FIGURES = { listener, supporter, seeker, resting, rising, holder, gazer, open } as const;
export const OBJECTS = { sphereCluster, thinArc, softCube, floatingDisc, pairedPebbles, threadLoop, tinyPyramid, nestedBowls, singleDroplet, scatteredSeeds, gentleHelix, restingRing } as const;
export const SCENES = { turning, score, companion, rhythm, architecture, map, relationship } as const;

export const FIGURE_ALT = {
  listener: 'A person beginning to listen to themselves, hand on chest, head gently tilted',
  supporter: 'Two people together, one with a hand on the other\'s back in a posture of support',
  seeker: 'A person reaching forward with an open palm, moving toward understanding',
  resting: 'A person sitting cross-legged with hands on knees, palms up, in pure stillness',
  rising: 'A person mid-transition from seated to standing, one knee still down',
  holder: 'A person in self-embrace, arms wrapped around their own torso',
  gazer: 'A person looking back over their shoulder, hand raised in acknowledgment',
  open: 'A person standing with palms rotated outward, in a posture of openness and availability',
} as const;

export const OBJECT_ALT = {
  sphereCluster: 'A cluster of three small gathered shapes',
  thinArc: 'A curved crescent arc',
  softCube: 'A rounded-edge cube in warm tones',
  floatingDisc: 'A thin disc hovering above a surface, slightly tilted',
  pairedPebbles: 'Two organic pebble forms leaning toward each other',
  threadLoop: 'A thin thread in a loose open loop',
  tinyPyramid: 'A small soft-edged pyramid',
  nestedBowls: 'Two shallow bowls nested with offset',
  singleDroplet: 'A teardrop shape with tapered end pointing up',
  scatteredSeeds: 'Several small seed-like forms scattered loosely',
  gentleHelix: 'A soft spiral standing vertically',
  restingRing: 'A torus shape lying flat on a surface',
} as const;

export const SCENE_ALT = {
  turning: 'A seated person with a floating constellation of symbolic objects around them',
  score: 'A person holding a softly glowing orb',
  companion: 'Two people in conversation with symbolic objects between them',
  rhythm: 'A person placing a form into a sequence row',
  architecture: 'A reclined person beneath a protective arch',
  map: 'A person scanning toward glowing waypoints in the distance',
  relationship: 'Two people holding symbolic forms between them',
} as const;

export const TOOL_VIGNETTES = [
  { image: SCENES.score, alt: SCENE_ALT.score, name: 'Clarity Score', href: '/clarity-score' },
  { image: SCENES.companion, alt: SCENE_ALT.companion, name: 'MindMate', href: '/tools/mindmate' },
  { image: SCENES.rhythm, alt: SCENE_ALT.rhythm, name: 'Mood Journal', href: '/tools/mood-journal' },
  { image: SCENES.architecture, alt: SCENE_ALT.architecture, name: 'Sleep', href: '/tools/sleep-architect' },
  { image: SCENES.map, alt: SCENE_ALT.map, name: 'Providers', href: '/providers' },
  { image: SCENES.relationship, alt: SCENE_ALT.relationship, name: 'Relationships', href: '/tools' },
] as const;
