/**
 * Controlled retrieval vocabulary for the 113 ICD-11 Chapter 6 conditions.
 *
 * Each entry maps a condition slug → the lay synonyms and surface forms a real
 * published article would actually use ("major depressive disorder" → "depression",
 * "low mood", …), plus the names of `article_subcategories` (or categories) that map
 * strongly to that condition's family. This is the input to the OFFLINE classifier
 * `scripts/classify-condition-articles.ts`, which derives the condition↔article
 * mapping stored in `articles.linked_condition_ids`.
 *
 * IMPORTANT:
 *  - These are RETRIEVAL TERMS ONLY — not clinical claims, definitions, or copy.
 *  - This file is imported ONLY by the offline script and its vitest guard. Nothing
 *    in the client (`main.tsx`) import graph references it, so it never ships in the
 *    anon bundle. Keep it that way.
 *  - `terms` are matched case-insensitively on word boundaries against article
 *    title / body / tags. `subcategoryHints` are matched against the article's
 *    subcategory OR category name. Keep both PRECISE — a term that is too generic
 *    (e.g. a bare "fear") or a family-wide subcategory shared across many sibling
 *    conditions inflates false positives that the human review gate then has to prune.
 *
 * Keys are validated against the canonical taxonomy by `condition-terms.test.ts`
 * (count === 113, every key present in the ICD-11 taxonomy).
 */

export interface ConditionTermEntry {
    /** Canonical condition name (informational; terms drive retrieval). */
    name: string;
    icd11_code: string;
    icd11_grouping: string;
    /** Lay synonyms + surface forms a genuine article uses. Retrieval only. */
    terms: string[];
    /** Names of article_subcategories / categories that map strongly to this family. */
    subcategoryHints: string[];
}

export const CONDITION_TERMS: Record<string, ConditionTermEntry> = {
    // ─── Anxiety or fear-related disorders ──────────────────────────────────
    'agoraphobia': {
        name: 'Agoraphobia',
        icd11_code: '6B02',
        icd11_grouping: 'Anxiety or fear-related disorders',
        terms: ['agoraphobia', 'agoraphobic', 'fear of leaving home', 'fear of crowds', 'fear of public transport'],
        subcategoryHints: ['Anxiety Disorders', 'Phobias Specific Fears', 'Understanding Anxiety'],
    },
    'generalized-anxiety-disorder': {
        name: 'Generalised anxiety disorder',
        icd11_code: '6B00',
        icd11_grouping: 'Anxiety or fear-related disorders',
        terms: ['generalised anxiety', 'generalized anxiety', 'gad', 'chronic worry', 'excessive worry', 'constant worrying'],
        subcategoryHints: ['Anxiety Disorders', 'Understanding Anxiety', 'Anxiety In Relationships Work Daily Life'],
    },
    'panic-disorder': {
        name: 'Panic disorder',
        icd11_code: '6B01',
        icd11_grouping: 'Anxiety or fear-related disorders',
        terms: ['panic disorder', 'panic attack', 'panic attacks', 'panic episodes'],
        subcategoryHints: ['Anxiety Disorders', 'Panic Physical Anxiety Somatic Symptoms', 'Understanding Anxiety'],
    },
    'selective-mutism': {
        name: 'Selective mutism',
        icd11_code: '6B06',
        icd11_grouping: 'Anxiety or fear-related disorders',
        terms: ['selective mutism', 'selectively mute'],
        subcategoryHints: ['Anxiety Disorders', 'Supporting Childrens Mental Health'],
    },
    'separation-anxiety-disorder': {
        name: 'Separation anxiety disorder',
        icd11_code: '6B05',
        icd11_grouping: 'Anxiety or fear-related disorders',
        terms: ['separation anxiety'],
        subcategoryHints: ['Anxiety Disorders', 'Supporting Childrens Mental Health'],
    },
    'social-anxiety-disorder': {
        name: 'Social anxiety disorder',
        icd11_code: '6B04',
        icd11_grouping: 'Anxiety or fear-related disorders',
        terms: ['social anxiety', 'social phobia', 'fear of judgment', 'fear of judgement', 'fear of being judged'],
        subcategoryHints: ['Social Anxiety Fear Of Judgment', 'Anxiety Disorders', 'Understanding Anxiety'],
    },
    'specific-phobia': {
        name: 'Specific phobia',
        icd11_code: '6B03',
        icd11_grouping: 'Anxiety or fear-related disorders',
        terms: ['specific phobia', 'phobia', 'phobias', 'fear of flying', 'fear of heights', 'fear of needles'],
        subcategoryHints: ['Phobias Specific Fears', 'Anxiety Disorders'],
    },

    // ─── Catatonia ──────────────────────────────────────────────────────────
    'catatonia-associated-with-another-mental-disorder': {
        name: 'Catatonia associated with another mental disorder',
        icd11_code: '6A40',
        icd11_grouping: 'Catatonia',
        terms: ['catatonia', 'catatonic'],
        subcategoryHints: [],
    },
    'catatonia-induced-by-substances-or-medications': {
        name: 'Catatonia induced by substances or medications',
        icd11_code: '6A41',
        icd11_grouping: 'Catatonia',
        terms: ['substance-induced catatonia', 'medication-induced catatonia'],
        subcategoryHints: [],
    },

    // ─── Disorders associated with pregnancy, childbirth or the puerperium ──
    'mental-or-behavioural-disorders-associated-with-pregnancy-with-psychotic-symptoms': {
        name: 'Mental or behavioural disorders associated with pregnancy, childbirth or the puerperium, with psychotic symptoms',
        icd11_code: '6E21',
        icd11_grouping: 'Disorders associated with pregnancy, childbirth or the puerperium',
        // HIGH-ACUITY: keep precise — do NOT use bare "psychosis" (over-links to schizophrenia).
        terms: ['postpartum psychosis', 'postnatal psychosis', 'puerperal psychosis', 'perinatal psychosis', 'postpartum psychotic'],
        subcategoryHints: ['Perinatal and Postpartum Mental Health'],
    },
    'mental-or-behavioural-disorders-associated-with-pregnancy-without-psychotic-symptoms': {
        name: 'Mental or behavioural disorders associated with pregnancy, childbirth or the puerperium, without psychotic symptoms',
        icd11_code: '6E20',
        icd11_grouping: 'Disorders associated with pregnancy, childbirth or the puerperium',
        terms: ['postpartum depression', 'postnatal depression', 'perinatal depression', 'perinatal anxiety', 'postpartum anxiety', 'maternal mental health', 'baby blues'],
        subcategoryHints: ['Perinatal and Postpartum Mental Health', 'Reproductive Mental Health', 'Depression and Anxiety in Women'],
    },

    // ─── Disorders due to substance use or addictive behaviours ─────────────
    // NOTE: substance disorders share one parent category, so NO category-level
    // subcategoryHint here — that would cross-link every substance article to every
    // substance condition. Disambiguation is left to the substance-specific terms.
    'disorders-due-to-use-of-alcohol': {
        name: 'Disorders due to use of alcohol',
        icd11_code: '6C40',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['alcohol use disorder', 'alcoholism', 'alcohol dependence', 'alcohol addiction', 'problem drinking', 'alcohol withdrawal', 'alcohol'],
        subcategoryHints: ['Substance Use & Addiction'],
    },
    'disorders-due-to-use-of-caffeine': {
        name: 'Disorders due to use of caffeine',
        icd11_code: '6C48',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['caffeine use disorder', 'caffeine dependence', 'caffeine withdrawal', 'caffeine addiction'],
        subcategoryHints: [],
    },
    'disorders-due-to-use-of-cannabis': {
        name: 'Disorders due to use of cannabis',
        icd11_code: '6C41',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['cannabis use disorder', 'cannabis dependence', 'cannabis addiction', 'marijuana addiction', 'weed addiction', 'cannabis withdrawal', 'cannabis', 'marijuana'],
        subcategoryHints: ['Substance Use & Addiction'],
    },
    'disorders-due-to-use-of-cocaine': {
        name: 'Disorders due to use of cocaine',
        icd11_code: '6C45',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['cocaine use disorder', 'cocaine dependence', 'cocaine addiction', 'crack cocaine', 'cocaine'],
        subcategoryHints: ['Substance Use & Addiction'],
    },
    'disorders-due-to-use-of-dissociative-drugs': {
        name: 'Disorders due to use of dissociative drugs including ketamine and PCP',
        icd11_code: '6C4D',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['ketamine addiction', 'ketamine use disorder', 'ketamine dependence', 'pcp', 'dissociative drug'],
        subcategoryHints: [],
    },
    'disorders-due-to-use-of-hallucinogens': {
        name: 'Disorders due to use of hallucinogens',
        icd11_code: '6C49',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['hallucinogen', 'lsd', 'psilocybin', 'magic mushrooms'],
        subcategoryHints: [],
    },
    'disorders-due-to-use-of-mdma-or-related-drugs': {
        name: 'Disorders due to use of MDMA or related drugs, including MDA',
        icd11_code: '6C4C',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['mdma', 'ecstasy'],
        subcategoryHints: [],
    },
    'disorders-due-to-use-of-multiple-specified-psychoactive-substances': {
        name: 'Disorders due to use of multiple specified psychoactive substances',
        icd11_code: '6C4F',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['polysubstance', 'polydrug', 'multiple substance use'],
        subcategoryHints: [],
    },
    'disorders-due-to-use-of-nicotine': {
        name: 'Disorders due to use of nicotine',
        icd11_code: '6C4A',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['nicotine addiction', 'nicotine dependence', 'smoking addiction', 'tobacco addiction', 'vaping addiction', 'quit smoking', 'quitting smoking', 'smoking cessation', 'stop smoking', 'nicotine', 'tobacco'],
        subcategoryHints: ['Substance Use & Addiction'],
    },
    'disorders-due-to-use-of-opioids': {
        name: 'Disorders due to use of opioids',
        icd11_code: '6C43',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['opioid use disorder', 'opioid addiction', 'opioid dependence', 'heroin addiction', 'opioid withdrawal', 'painkiller addiction', 'opioid', 'heroin', 'fentanyl'],
        subcategoryHints: ['Substance Use & Addiction'],
    },
    'disorders-due-to-use-of-other-specified-psychoactive-substances': {
        name: 'Disorders due to use of other specified psychoactive substances, including medications',
        icd11_code: '6C4E',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['other specified psychoactive substance', 'medication misuse'],
        subcategoryHints: [],
    },
    'disorders-due-to-use-of-sedatives-hypnotics-or-anxiolytics': {
        name: 'Disorders due to use of sedatives, hypnotics or anxiolytics',
        icd11_code: '6C44',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['benzodiazepine dependence', 'benzodiazepine addiction', 'benzo addiction', 'sedative use disorder', 'sleeping pill dependence', 'benzodiazepine'],
        subcategoryHints: ['Substance Use & Addiction'],
    },
    'disorders-due-to-use-of-stimulants-including-amphetamines': {
        name: 'Disorders due to use of stimulants including amphetamines, methamphetamine or methcathinone',
        icd11_code: '6C46',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['methamphetamine', 'amphetamine addiction', 'stimulant use disorder', 'meth addiction', 'amphetamine'],
        subcategoryHints: ['Substance Use & Addiction'],
    },
    'disorders-due-to-use-of-synthetic-cannabinoids': {
        name: 'Disorders due to use of synthetic cannabinoids',
        icd11_code: '6C42',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['synthetic cannabinoid', 'spice drug', 'synthetic marijuana'],
        subcategoryHints: [],
    },
    'disorders-due-to-use-of-synthetic-cathinones': {
        name: 'Disorders due to use of synthetic cathinones',
        icd11_code: '6C47',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['synthetic cathinone', 'bath salts'],
        subcategoryHints: [],
    },
    'disorders-due-to-use-of-unknown-or-unspecified-psychoactive-substances': {
        name: 'Disorders due to use of unknown or unspecified psychoactive substances',
        icd11_code: '6C4G',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['unknown substance use', 'unspecified psychoactive substance'],
        subcategoryHints: [],
    },
    'disorders-due-to-use-of-volatile-inhalants': {
        name: 'Disorders due to use of volatile inhalants',
        icd11_code: '6C4B',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['inhalant', 'solvent abuse', 'glue sniffing', 'huffing'],
        subcategoryHints: [],
    },
    'gambling-disorder': {
        name: 'Gambling disorder',
        icd11_code: '6C50',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['gambling disorder', 'gambling addiction', 'compulsive gambling', 'problem gambling'],
        subcategoryHints: [],
    },
    'gaming-disorder': {
        name: 'Gaming disorder',
        icd11_code: '6C51',
        icd11_grouping: 'Disorders due to substance use or addictive behaviours',
        terms: ['gaming disorder', 'gaming addiction', 'video game addiction', 'compulsive gaming'],
        subcategoryHints: ['Digital Addiction and Compulsive Use'],
    },

    // ─── Disorders of bodily distress or bodily experience ──────────────────
    'bodily-distress-disorder': {
        name: 'Bodily distress disorder',
        icd11_code: '6C20',
        icd11_grouping: 'Disorders of bodily distress or bodily experience',
        terms: ['bodily distress disorder', 'somatic symptom disorder', 'somatisation', 'somatization', 'medically unexplained symptoms'],
        subcategoryHints: [],
    },
    'body-integrity-dysphoria': {
        name: 'Body integrity dysphoria',
        icd11_code: '6C21',
        icd11_grouping: 'Disorders of bodily distress or bodily experience',
        terms: ['body integrity dysphoria', 'body integrity identity disorder'],
        subcategoryHints: [],
    },

    // ─── Disorders specifically associated with stress ──────────────────────
    'adjustment-disorder': {
        name: 'Adjustment disorder',
        icd11_code: '6B43',
        icd11_grouping: 'Disorders specifically associated with stress',
        terms: ['adjustment disorder'],
        subcategoryHints: ['Life Transitions & Crises', 'Career Transitions Uncertainty'],
    },
    'complex-post-traumatic-stress-disorder': {
        name: 'Complex post-traumatic stress disorder',
        icd11_code: '6B41',
        icd11_grouping: 'Disorders specifically associated with stress',
        terms: ['complex ptsd', 'complex post-traumatic stress', 'c-ptsd', 'cptsd', 'developmental trauma'],
        subcategoryHints: ['PTSD & Complex Trauma', 'Understanding Trauma & Its Impact', 'Trauma Responses & Survival Patterns'],
    },
    'disinhibited-social-engagement-disorder': {
        name: 'Disinhibited social engagement disorder',
        icd11_code: '6B45',
        icd11_grouping: 'Disorders specifically associated with stress',
        terms: ['disinhibited social engagement'],
        subcategoryHints: [],
    },
    'post-traumatic-stress-disorder': {
        name: 'Post-traumatic stress disorder',
        icd11_code: '6B40',
        icd11_grouping: 'Disorders specifically associated with stress',
        terms: ['ptsd', 'post-traumatic stress', 'posttraumatic stress', 'flashbacks', 'trauma triggers'],
        subcategoryHints: ['PTSD & Complex Trauma', 'Understanding Trauma & Its Impact', 'Trauma and PTSD in Women', 'Combat-Related Mental Health'],
    },
    'prolonged-grief-disorder': {
        name: 'Prolonged grief disorder',
        icd11_code: '6B42',
        icd11_grouping: 'Disorders specifically associated with stress',
        terms: ['prolonged grief', 'complicated grief', 'persistent grief'],
        subcategoryHints: ['Grief Loss Bereavement'],
    },
    'reactive-attachment-disorder': {
        name: 'Reactive attachment disorder',
        icd11_code: '6B44',
        icd11_grouping: 'Disorders specifically associated with stress',
        terms: ['reactive attachment disorder'],
        subcategoryHints: [],
    },

    // ─── Disruptive behaviour or dissocial disorders ────────────────────────
    'conduct-dissocial-disorder': {
        name: 'Conduct-dissocial disorder',
        icd11_code: '6C91',
        icd11_grouping: 'Disruptive behaviour or dissocial disorders',
        terms: ['conduct disorder', 'dissocial disorder'],
        subcategoryHints: ['Supporting Childrens Mental Health', 'Juvenile Justice and Mental Health'],
    },
    'oppositional-defiant-disorder': {
        name: 'Oppositional defiant disorder',
        icd11_code: '6C90',
        icd11_grouping: 'Disruptive behaviour or dissocial disorders',
        terms: ['oppositional defiant disorder', 'odd diagnosis'],
        subcategoryHints: ['Supporting Childrens Mental Health'],
    },

    // ─── Dissociative disorders ─────────────────────────────────────────────
    'depersonalization-derealization-disorder': {
        name: 'Depersonalization-derealization disorder',
        icd11_code: '6B66',
        icd11_grouping: 'Dissociative disorders',
        terms: ['depersonalization', 'depersonalisation', 'derealization', 'derealisation', 'feeling unreal', 'feeling detached'],
        subcategoryHints: ['Trauma & Dissociative Disorders'],
    },
    'dissociative-amnesia': {
        name: 'Dissociative amnesia',
        icd11_code: '6B61',
        icd11_grouping: 'Dissociative disorders',
        terms: ['dissociative amnesia', 'psychogenic amnesia'],
        subcategoryHints: ['Trauma & Dissociative Disorders'],
    },
    'dissociative-identity-disorder': {
        name: 'Dissociative identity disorder',
        icd11_code: '6B64',
        icd11_grouping: 'Dissociative disorders',
        terms: ['dissociative identity disorder', 'multiple personality', 'did diagnosis', 'split personality'],
        subcategoryHints: ['Trauma & Dissociative Disorders'],
    },
    'dissociative-neurological-symptom-disorder': {
        name: 'Dissociative neurological symptom disorder',
        icd11_code: '6B60',
        icd11_grouping: 'Dissociative disorders',
        terms: ['functional neurological disorder', 'dissociative neurological symptom', 'conversion disorder', 'non-epileptic seizures'],
        subcategoryHints: ['Trauma & Dissociative Disorders'],
    },
    'partial-dissociative-identity-disorder': {
        name: 'Partial dissociative identity disorder',
        icd11_code: '6B65',
        icd11_grouping: 'Dissociative disorders',
        terms: ['partial dissociative identity'],
        subcategoryHints: ['Trauma & Dissociative Disorders'],
    },
    'possession-trance-disorder': {
        name: 'Possession trance disorder',
        icd11_code: '6B63',
        icd11_grouping: 'Dissociative disorders',
        terms: ['possession trance'],
        subcategoryHints: [],
    },
    'trance-disorder': {
        name: 'Trance disorder',
        icd11_code: '6B62',
        icd11_grouping: 'Dissociative disorders',
        terms: ['trance disorder', 'dissociative trance'],
        subcategoryHints: [],
    },

    // ─── Elimination disorders ──────────────────────────────────────────────
    'encopresis': {
        name: 'Encopresis',
        icd11_code: '6C01',
        icd11_grouping: 'Elimination disorders',
        terms: ['encopresis', 'soiling', 'faecal incontinence in children'],
        subcategoryHints: [],
    },
    'enuresis': {
        name: 'Enuresis',
        icd11_code: '6C00',
        icd11_grouping: 'Elimination disorders',
        terms: ['enuresis', 'bedwetting', 'bed-wetting'],
        subcategoryHints: [],
    },

    // ─── Factitious disorders ───────────────────────────────────────────────
    'factitious-disorder-imposed-on-another': {
        name: 'Factitious disorder imposed on another',
        icd11_code: '6D51',
        icd11_grouping: 'Factitious disorders',
        terms: ['factitious disorder imposed on another', 'munchausen by proxy', 'munchausen syndrome by proxy'],
        subcategoryHints: [],
    },
    'factitious-disorder-imposed-on-self': {
        name: 'Factitious disorder imposed on self',
        icd11_code: '6D50',
        icd11_grouping: 'Factitious disorders',
        terms: ['factitious disorder', 'munchausen syndrome'],
        subcategoryHints: [],
    },

    // ─── Feeding or eating disorders ────────────────────────────────────────
    'anorexia-nervosa': {
        name: 'Anorexia nervosa',
        icd11_code: '6B80',
        icd11_grouping: 'Feeding or eating disorders',
        terms: ['anorexia nervosa', 'anorexia', 'anorexic', 'food restriction'],
        subcategoryHints: ['Understanding Eating Disorders', 'Eating Disorders Across Populations', 'Eating Disorders in Women'],
    },
    'avoidant-restrictive-food-intake-disorder': {
        name: 'Avoidant-restrictive food intake disorder',
        icd11_code: '6B83',
        icd11_grouping: 'Feeding or eating disorders',
        terms: ['arfid', 'avoidant restrictive food intake', 'avoidant/restrictive food intake'],
        subcategoryHints: ['Understanding Eating Disorders'],
    },
    'binge-eating-disorder': {
        name: 'Binge eating disorder',
        icd11_code: '6B82',
        icd11_grouping: 'Feeding or eating disorders',
        terms: ['binge eating disorder', 'binge eating', 'binge-eating'],
        subcategoryHints: ['Understanding Eating Disorders', 'Eating Disorders Across Populations'],
    },
    'bulimia-nervosa': {
        name: 'Bulimia nervosa',
        icd11_code: '6B81',
        icd11_grouping: 'Feeding or eating disorders',
        terms: ['bulimia nervosa', 'bulimia', 'bulimic', 'binge and purge', 'purging'],
        subcategoryHints: ['Understanding Eating Disorders', 'Eating Disorders Across Populations', 'Eating Disorders in Women'],
    },
    'pica': {
        name: 'Pica',
        icd11_code: '6B84',
        icd11_grouping: 'Feeding or eating disorders',
        terms: ['pica disorder', 'eating non-food'],
        subcategoryHints: ['Understanding Eating Disorders'],
    },
    'rumination-regurgitation-disorder': {
        name: 'Rumination-regurgitation disorder',
        icd11_code: '6B85',
        icd11_grouping: 'Feeding or eating disorders',
        terms: ['rumination disorder', 'regurgitation disorder', 'rumination-regurgitation'],
        subcategoryHints: ['Understanding Eating Disorders'],
    },

    // ─── Impulse control disorders ──────────────────────────────────────────
    'compulsive-sexual-behaviour-disorder': {
        name: 'Compulsive sexual behaviour disorder',
        icd11_code: '6C72',
        icd11_grouping: 'Impulse control disorders',
        terms: ['compulsive sexual behaviour', 'compulsive sexual behavior', 'sex addiction', 'hypersexuality', 'porn addiction'],
        subcategoryHints: [],
    },
    'intermittent-explosive-disorder': {
        name: 'Intermittent explosive disorder',
        icd11_code: '6C73',
        icd11_grouping: 'Impulse control disorders',
        terms: ['intermittent explosive disorder', 'explosive anger', 'rage attacks'],
        subcategoryHints: [],
    },
    'kleptomania': {
        name: 'Kleptomania',
        icd11_code: '6C71',
        icd11_grouping: 'Impulse control disorders',
        terms: ['kleptomania', 'compulsive stealing'],
        subcategoryHints: [],
    },
    'pyromania': {
        name: 'Pyromania',
        icd11_code: '6C70',
        icd11_grouping: 'Impulse control disorders',
        terms: ['pyromania', 'compulsive fire-setting'],
        subcategoryHints: [],
    },

    // ─── Mood disorders ─────────────────────────────────────────────────────
    'bipolar-type-i-disorder': {
        name: 'Bipolar type I disorder',
        icd11_code: '6A60',
        icd11_grouping: 'Mood disorders',
        terms: ['bipolar type i', 'bipolar 1', 'bipolar i disorder', 'manic episode', 'mania'],
        subcategoryHints: ['Mood Disorders'],
    },
    'bipolar-type-ii-disorder': {
        name: 'Bipolar type II disorder',
        icd11_code: '6A61',
        icd11_grouping: 'Mood disorders',
        terms: ['bipolar type ii', 'bipolar 2', 'bipolar ii disorder', 'hypomania', 'hypomanic'],
        subcategoryHints: ['Mood Disorders'],
    },
    'cyclothymic-disorder': {
        name: 'Cyclothymic disorder',
        icd11_code: '6A62',
        icd11_grouping: 'Mood disorders',
        terms: ['cyclothymia', 'cyclothymic disorder'],
        subcategoryHints: ['Mood Disorders'],
    },
    'dysthymic-disorder': {
        name: 'Dysthymic disorder',
        icd11_code: '6A72',
        icd11_grouping: 'Mood disorders',
        terms: ['dysthymia', 'dysthymic disorder', 'persistent depressive disorder', 'chronic depression'],
        subcategoryHints: ['Types Of Depression', 'Understanding Depression'],
    },
    'mixed-depressive-and-anxiety-disorder': {
        name: 'Mixed depressive and anxiety disorder',
        icd11_code: '6A73',
        icd11_grouping: 'Mood disorders',
        terms: ['mixed depressive and anxiety', 'mixed anxiety and depression', 'mixed anxiety-depression'],
        subcategoryHints: [],
    },
    'recurrent-depressive-disorder': {
        name: 'Recurrent depressive disorder',
        icd11_code: '6A71',
        icd11_grouping: 'Mood disorders',
        terms: ['recurrent depression', 'recurrent depressive disorder', 'recurrent major depression', 'relapsing depression'],
        subcategoryHints: ['Understanding Depression', 'Types Of Depression', 'Coping With Depression'],
    },
    'single-episode-depressive-disorder': {
        name: 'Single episode depressive disorder',
        icd11_code: '6A70',
        icd11_grouping: 'Mood disorders',
        terms: ['major depressive disorder', 'major depression', 'depression', 'depressive episode', 'low mood', 'clinical depression'],
        subcategoryHints: ['Understanding Depression', 'Types Of Depression', 'Coping With Depression'],
    },

    // ─── Neurocognitive disorders ───────────────────────────────────────────
    'amnestic-disorder': {
        name: 'Amnestic disorder',
        icd11_code: '6D72',
        icd11_grouping: 'Neurocognitive disorders',
        terms: ['amnestic disorder', 'amnesia syndrome'],
        subcategoryHints: [],
    },
    'delirium': {
        name: 'Delirium',
        icd11_code: '6D70',
        icd11_grouping: 'Neurocognitive disorders',
        terms: ['delirium'],
        subcategoryHints: [],
    },
    'dementia-due-to-alzheimer-disease': {
        name: 'Dementia due to Alzheimer disease',
        icd11_code: '6D80',
        icd11_grouping: 'Neurocognitive disorders',
        terms: ['alzheimer', 'alzheimer disease', "alzheimer's disease", 'alzheimers'],
        subcategoryHints: ['Dementia and Alzheimer Disease', 'Cognitive Aging and Brain Health'],
    },
    'dementia-due-to-cerebrovascular-disease': {
        name: 'Dementia due to cerebrovascular disease',
        icd11_code: '6D81',
        icd11_grouping: 'Neurocognitive disorders',
        terms: ['vascular dementia', 'cerebrovascular dementia', 'post-stroke dementia'],
        subcategoryHints: ['Dementia and Alzheimer Disease'],
    },
    'dementia-due-to-diseases-classified-elsewhere': {
        name: 'Dementia due to diseases classified elsewhere',
        icd11_code: '6D85',
        icd11_grouping: 'Neurocognitive disorders',
        terms: ['parkinson dementia', "huntington's dementia", 'dementia due to other disease'],
        subcategoryHints: ['Dementia and Alzheimer Disease'],
    },
    'dementia-due-to-lewy-body-disease': {
        name: 'Dementia due to Lewy body disease',
        icd11_code: '6D82',
        icd11_grouping: 'Neurocognitive disorders',
        terms: ['lewy body dementia', 'dementia with lewy bodies'],
        subcategoryHints: ['Dementia and Alzheimer Disease'],
    },
    'dementia-due-to-psychoactive-substances': {
        name: 'Dementia due to use of psychoactive substances',
        icd11_code: '6D84',
        icd11_grouping: 'Neurocognitive disorders',
        terms: ['alcohol-related dementia', 'substance-induced dementia', 'korsakoff'],
        subcategoryHints: [],
    },
    'frontotemporal-dementia': {
        name: 'Frontotemporal dementia',
        icd11_code: '6D83',
        icd11_grouping: 'Neurocognitive disorders',
        terms: ['frontotemporal dementia', 'frontotemporal degeneration', 'picks disease'],
        subcategoryHints: ['Dementia and Alzheimer Disease'],
    },
    'mild-neurocognitive-disorder': {
        name: 'Mild neurocognitive disorder',
        icd11_code: '6D71',
        icd11_grouping: 'Neurocognitive disorders',
        terms: ['mild cognitive impairment', 'mild neurocognitive disorder'],
        subcategoryHints: ['Cognitive Aging and Brain Health'],
    },

    // ─── Neurodevelopmental disorders ───────────────────────────────────────
    'attention-deficit-hyperactivity-disorder': {
        name: 'Attention deficit hyperactivity disorder',
        icd11_code: '6A05',
        icd11_grouping: 'Neurodevelopmental disorders',
        terms: ['adhd', 'attention deficit hyperactivity', 'attention-deficit', 'add diagnosis'],
        subcategoryHints: ['Neurodivergence, ADHD & Autism Spectrum — General', 'Neurodevelopmental Conditions'],
    },
    'autism-spectrum-disorder': {
        name: 'Autism spectrum disorder',
        icd11_code: '6A02',
        icd11_grouping: 'Neurodevelopmental disorders',
        terms: ['autism', 'autistic', 'autism spectrum', 'asperger', 'neurodivergent'],
        subcategoryHints: ['Neurodivergence, ADHD & Autism Spectrum — General', 'Neurodevelopmental Conditions'],
    },
    'developmental-learning-disorder': {
        name: 'Developmental learning disorder',
        icd11_code: '6A03',
        icd11_grouping: 'Neurodevelopmental disorders',
        terms: ['learning disorder', 'learning disability', 'dyslexia', 'dyscalculia'],
        subcategoryHints: ['Neurodevelopmental Conditions'],
    },
    'developmental-motor-coordination-disorder': {
        name: 'Developmental motor coordination disorder',
        icd11_code: '6A04',
        icd11_grouping: 'Neurodevelopmental disorders',
        terms: ['dyspraxia', 'developmental coordination disorder', 'motor coordination disorder'],
        subcategoryHints: ['Neurodevelopmental Conditions'],
    },
    'developmental-speech-or-language-disorders': {
        name: 'Developmental speech or language disorders',
        icd11_code: '6A01',
        icd11_grouping: 'Neurodevelopmental disorders',
        terms: ['speech disorder', 'language disorder', 'developmental language disorder', 'stutter'],
        subcategoryHints: ['Neurodevelopmental Conditions'],
    },
    'disorders-of-intellectual-development': {
        name: 'Disorders of intellectual development',
        icd11_code: '6A00',
        icd11_grouping: 'Neurodevelopmental disorders',
        terms: ['intellectual disability', 'intellectual development disorder', 'learning disability'],
        subcategoryHints: ['Intellectual & Developmental Disability', 'Neurodevelopmental Conditions'],
    },
    'stereotyped-movement-disorder': {
        name: 'Stereotyped movement disorder',
        icd11_code: '6A06',
        icd11_grouping: 'Neurodevelopmental disorders',
        terms: ['stereotyped movement disorder', 'stereotypies'],
        subcategoryHints: [],
    },

    // ─── Obsessive-compulsive or related disorders ──────────────────────────
    'body-dysmorphic-disorder': {
        name: 'Body dysmorphic disorder',
        icd11_code: '6B21',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        terms: ['body dysmorphic disorder', 'body dysmorphia', 'bdd'],
        subcategoryHints: ['OCD Spectrum & Impulse Control Disorders', 'Body Image'],
    },
    'body-focused-repetitive-behaviour-disorders': {
        name: 'Body-focused repetitive behaviour disorders',
        icd11_code: '6B25',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        terms: ['body-focused repetitive behaviour', 'trichotillomania', 'hair pulling', 'skin picking', 'excoriation'],
        subcategoryHints: ['OCD Spectrum & Impulse Control Disorders'],
    },
    'hoarding-disorder': {
        name: 'Hoarding disorder',
        icd11_code: '6B24',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        terms: ['hoarding disorder', 'compulsive hoarding'],
        subcategoryHints: ['OCD Spectrum & Impulse Control Disorders'],
    },
    'hypochondriasis': {
        name: 'Hypochondriasis (health anxiety)',
        icd11_code: '6B23',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        terms: ['hypochondriasis', 'health anxiety', 'illness anxiety'],
        subcategoryHints: ['OCD Spectrum & Impulse Control Disorders'],
    },
    'obsessive-compulsive-disorder': {
        name: 'Obsessive-compulsive disorder',
        icd11_code: '6B20',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        terms: ['obsessive-compulsive disorder', 'obsessive compulsive', 'ocd', 'intrusive thoughts', 'compulsions'],
        subcategoryHints: ['OCD Spectrum & Impulse Control Disorders', 'OCD & Related'],
    },
    'olfactory-reference-disorder': {
        name: 'Olfactory reference disorder',
        icd11_code: '6B22',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        terms: ['olfactory reference disorder', 'olfactory reference syndrome'],
        subcategoryHints: [],
    },

    // ─── Paraphilic disorders (HIGH-ACUITY — precise terms, forensic hints) ──
    'coercive-sexual-sadism-disorder': {
        name: 'Coercive sexual sadism disorder',
        icd11_code: '6D33',
        icd11_grouping: 'Paraphilic disorders',
        terms: ['coercive sexual sadism', 'sexual sadism disorder'],
        subcategoryHints: [],
    },
    'exhibitionistic-disorder': {
        name: 'Exhibitionistic disorder',
        icd11_code: '6D30',
        icd11_grouping: 'Paraphilic disorders',
        terms: ['exhibitionistic disorder', 'exhibitionism'],
        subcategoryHints: [],
    },
    'frotteuristic-disorder': {
        name: 'Frotteuristic disorder',
        icd11_code: '6D34',
        icd11_grouping: 'Paraphilic disorders',
        terms: ['frotteuristic disorder', 'frotteurism'],
        subcategoryHints: [],
    },
    'other-paraphilic-disorder-involving-non-consenting-individuals': {
        name: 'Other paraphilic disorder involving non-consenting individuals',
        icd11_code: '6D35',
        icd11_grouping: 'Paraphilic disorders',
        terms: ['paraphilic disorder involving non-consenting'],
        subcategoryHints: [],
    },
    'paraphilic-disorder-involving-solitary-behaviour-or-consenting-individuals': {
        name: 'Paraphilic disorder involving solitary behaviour or consenting individuals',
        icd11_code: '6D36',
        icd11_grouping: 'Paraphilic disorders',
        terms: ['paraphilic disorder involving solitary behaviour', 'paraphilic disorder involving consenting'],
        subcategoryHints: [],
    },
    'pedophilic-disorder': {
        name: 'Pedophilic disorder',
        icd11_code: '6D32',
        icd11_grouping: 'Paraphilic disorders',
        terms: ['pedophilic disorder', 'paedophilic disorder'],
        subcategoryHints: [],
    },
    'voyeuristic-disorder': {
        name: 'Voyeuristic disorder',
        icd11_code: '6D31',
        icd11_grouping: 'Paraphilic disorders',
        terms: ['voyeuristic disorder', 'voyeurism'],
        subcategoryHints: [],
    },

    // ─── Personality disorders and related traits ───────────────────────────
    'personality-disorder': {
        name: 'Personality disorder',
        icd11_code: '6D10',
        icd11_grouping: 'Personality disorders and related traits',
        terms: ['personality disorder', 'borderline personality', 'narcissistic personality', 'antisocial personality', 'bpd', 'emotionally unstable personality'],
        subcategoryHints: [],
    },

    // ─── Schizophrenia or other primary psychotic disorders ─────────────────
    'acute-and-transient-psychotic-disorder': {
        name: 'Acute and transient psychotic disorder',
        icd11_code: '6A23',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        terms: ['acute and transient psychotic disorder', 'brief psychotic disorder', 'acute psychosis'],
        subcategoryHints: ['Understanding Psychosis', 'Treatment for Psychotic Conditions'],
    },
    'delusional-disorder': {
        name: 'Delusional disorder',
        icd11_code: '6A24',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        terms: ['delusional disorder', 'persistent delusions'],
        subcategoryHints: ['Understanding Psychosis'],
    },
    'schizoaffective-disorder': {
        name: 'Schizoaffective disorder',
        icd11_code: '6A21',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        terms: ['schizoaffective disorder', 'schizoaffective'],
        subcategoryHints: ['Understanding Psychosis', 'Related Severe Conditions'],
    },
    'schizophrenia': {
        name: 'Schizophrenia',
        icd11_code: '6A20',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        // Bare "psychosis"/"psychotic"/"hallucinations" are NOT schizophrenia-specific —
        // they bleed across the whole psychotic family and into passing mentions. Keep
        // only schizophrenia-specific surface forms; the subcategory hints carry family context.
        terms: ['schizophrenia', 'schizophrenic'],
        subcategoryHints: ['Schizophrenia', 'Understanding Psychosis', 'Supporting Someone With Psychosis', 'Treatment for Psychotic Conditions', 'Psychosis Research and Emerging Approaches'],
    },
    'schizotypal-disorder': {
        name: 'Schizotypal disorder',
        icd11_code: '6A22',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        terms: ['schizotypal disorder', 'schizotypal personality'],
        subcategoryHints: ['Understanding Psychosis'],
    },

    // ─── Secondary mental or behavioural syndromes ──────────────────────────
    // Defined by an underlying medical cause; rarely the explicit subject of a lay
    // article. Precise multi-word terms only; expect low/zero coverage.
    'secondary-anxiety-syndrome': {
        name: 'Secondary anxiety syndrome',
        icd11_code: '6E63',
        icd11_grouping: 'Secondary mental or behavioural syndromes',
        terms: ['secondary anxiety syndrome', 'organic anxiety'],
        subcategoryHints: [],
    },
    'secondary-catatonia-syndrome': {
        name: 'Secondary catatonia syndrome',
        icd11_code: '6E69',
        icd11_grouping: 'Secondary mental or behavioural syndromes',
        terms: ['secondary catatonia'],
        subcategoryHints: [],
    },
    'secondary-dissociative-syndrome': {
        name: 'Secondary dissociative syndrome',
        icd11_code: '6E65',
        icd11_grouping: 'Secondary mental or behavioural syndromes',
        terms: ['secondary dissociative syndrome'],
        subcategoryHints: [],
    },
    'secondary-impulse-control-syndrome': {
        name: 'Secondary impulse control syndrome',
        icd11_code: '6E66',
        icd11_grouping: 'Secondary mental or behavioural syndromes',
        terms: ['secondary impulse control syndrome'],
        subcategoryHints: [],
    },
    'secondary-mood-syndrome': {
        name: 'Secondary mood syndrome',
        icd11_code: '6E62',
        icd11_grouping: 'Secondary mental or behavioural syndromes',
        terms: ['secondary mood syndrome', 'organic mood disorder'],
        subcategoryHints: [],
    },
    'secondary-neurocognitive-syndrome': {
        name: 'Secondary neurocognitive syndrome',
        icd11_code: '6E67',
        icd11_grouping: 'Secondary mental or behavioural syndromes',
        terms: ['secondary neurocognitive syndrome'],
        subcategoryHints: [],
    },
    'secondary-neurodevelopmental-syndrome': {
        name: 'Secondary neurodevelopmental syndrome',
        icd11_code: '6E60',
        icd11_grouping: 'Secondary mental or behavioural syndromes',
        terms: ['secondary neurodevelopmental syndrome'],
        subcategoryHints: [],
    },
    'secondary-obsessive-compulsive-or-related-syndrome': {
        name: 'Secondary obsessive-compulsive or related syndrome',
        icd11_code: '6E64',
        icd11_grouping: 'Secondary mental or behavioural syndromes',
        terms: ['secondary obsessive-compulsive syndrome'],
        subcategoryHints: [],
    },
    'secondary-personality-change': {
        name: 'Secondary personality change',
        icd11_code: '6E68',
        icd11_grouping: 'Secondary mental or behavioural syndromes',
        terms: ['secondary personality change', 'organic personality change'],
        subcategoryHints: [],
    },
    'secondary-psychotic-syndrome': {
        name: 'Secondary psychotic syndrome',
        icd11_code: '6E61',
        icd11_grouping: 'Secondary mental or behavioural syndromes',
        terms: ['secondary psychotic syndrome', 'organic psychosis', 'substance-induced psychosis'],
        subcategoryHints: [],
    },
};
