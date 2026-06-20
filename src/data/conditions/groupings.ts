/**
 * The ICD-11 Chapter 6 family groupings (the "~20 families"). These organise the
 * conditions reference alongside the A–Z index — they are the ICD-11 blocks, and are
 * deliberately UNRELATED to the 30 article categories.
 *
 * Order follows the ICD-11 MMS chapter order.
 */
export const ICD11_GROUPINGS = [
    'Neurodevelopmental disorders',
    'Schizophrenia or other primary psychotic disorders',
    'Catatonia',
    'Mood disorders',
    'Anxiety or fear-related disorders',
    'Obsessive-compulsive or related disorders',
    'Disorders specifically associated with stress',
    'Dissociative disorders',
    'Feeding or eating disorders',
    'Elimination disorders',
    'Disorders of bodily distress or bodily experience',
    'Disorders due to substance use or addictive behaviours',
    'Impulse control disorders',
    'Disruptive behaviour or dissocial disorders',
    'Personality disorders and related traits',
    'Paraphilic disorders',
    'Factitious disorders',
    'Neurocognitive disorders',
    'Disorders associated with pregnancy, childbirth or the puerperium',
    'Secondary mental or behavioural syndromes',
] as const;

export type Icd11Grouping = (typeof ICD11_GROUPINGS)[number];
