/**
 * Maps an ICD-11 Chapter 6 family to a top-level Learn taxonomy group.
 *
 * This is information architecture only — it decides which of the three Learn
 * shelves a condition is filed under. It authors NO clinical or diagnostic copy.
 * Most ICD-11 families are clinical disorders and fall under "Conditions &
 * Disorders"; the behaviourally-framed families are filed under "Behavior &
 * Wellness", and paraphilic disorders under "Life & Society".
 */

import type { TopGroupId } from '../../config/taxonomy';

const GROUPING_TO_TOP_GROUP: Record<string, TopGroupId> = {
    'Disorders due to substance use or addictive behaviours': 'behavior-wellness',
    'Impulse control disorders': 'behavior-wellness',
    'Disruptive behaviour or dissocial disorders': 'behavior-wellness',
    'Paraphilic disorders': 'life-society',
};

/** The top-level taxonomy group for an ICD-11 family. Defaults to conditions-disorders. */
export function icd11GroupingToTopGroup(grouping: string): TopGroupId {
    return GROUPING_TO_TOP_GROUP[grouping] ?? 'conditions-disorders';
}
