/**
 * Merged "in depth" content for the conditions reference, keyed by slug.
 *
 * Each ICD-11 family is authored in its own file and merged here. The seeder
 * (src/scripts/seedConditionDeep.ts) reads this map and upserts the fuller core fields,
 * deep_sections, and sources into conditions_reference. Add a family file + spread it in
 * below as it is authored.
 */

import type { ConditionDeepMap } from './types';
import { neurodevelopmentalDeep } from './01-neurodevelopmental';
import { psychoticDeep } from './02-psychotic';
import { catatoniaDeep } from './03-catatonia';
import { moodDeep } from './04-mood';
import { anxietyDeep } from './05-anxiety';
import { ocdDeep } from './06-ocd';
import { stressDeep } from './07-stress';
import { dissociativeDeep } from './08-dissociative';
import { eatingDeep } from './09-eating';
import { eliminationDeep } from './10-elimination';
import { bodilyDistressDeep } from './11-bodily-distress';
import { substanceUseDeep } from './12-substance-use';
import { addictiveBehavioursDeep } from './13-addictive-behaviours';
import { impulseControlDeep } from './14-impulse-control';
import { disruptiveDeep } from './15-disruptive';
import { personalityDeep } from './16-personality';
import { paraphilicDeep } from './17-paraphilic';
import { factitiousDeep } from './18-factitious';
import { neurocognitiveDeep } from './19-neurocognitive';
import { perinatalDeep } from './20-perinatal';
import { secondaryDeep } from './21-secondary';

export const conditionDeepContent: ConditionDeepMap = {
    ...neurodevelopmentalDeep,
    ...psychoticDeep,
    ...catatoniaDeep,
    ...moodDeep,
    ...anxietyDeep,
    ...ocdDeep,
    ...stressDeep,
    ...dissociativeDeep,
    ...eatingDeep,
    ...eliminationDeep,
    ...bodilyDistressDeep,
    ...substanceUseDeep,
    ...addictiveBehavioursDeep,
    ...impulseControlDeep,
    ...disruptiveDeep,
    ...personalityDeep,
    ...paraphilicDeep,
    ...factitiousDeep,
    ...neurocognitiveDeep,
    ...perinatalDeep,
    ...secondaryDeep,
};

/** Slugs that have authored deep content (for progress tracking / audits). */
export const deepAuthoredSlugs = Object.keys(conditionDeepContent);
