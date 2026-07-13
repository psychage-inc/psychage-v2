// Preview-only content module. Single source of truth = preview/_build/05_final/*.json
// (the same PEAF payload the app will one day consume). This module is imported ONLY from
// the env-gated preview route tree, so it is tree-shaken out of the production bundle.
import part1 from '../../preview/_build/05_final/part1.json';
import part2 from '../../preview/_build/05_final/part2.json';
import part3 from '../../preview/_build/05_final/part3.json';
import part4 from '../../preview/_build/05_final/part4.json';
import part5 from '../../preview/_build/05_final/part5.json';

export interface PreviewCitation {
    n: number;
    dossier_id: string;
    tier: string;
    year: number;
    pmid?: string | null;
    doi?: string | null;
    citation_text: string;
}

export interface PreviewBlock {
    type: string;
    [key: string]: unknown;
}

export interface PreviewPart {
    part_id: number;
    slug: string;
    title: string;
    form: string;
    meta: {
        thesis_claim: string;
        the_risk: string;
        reviewer_credit: string;
        word_count: number;
        claim_count: number;
    };
    enrich: {
        summary: string | null;
        keyFacts: { text: string; citationIndex?: number }[];
        sparkMoment: string | null;
        practicalExercise: null;
    };
    citations: PreviewCitation[];
    body: PreviewBlock[];
}

export const PARTS: PreviewPart[] = [
    part1 as unknown as PreviewPart,
    part2 as unknown as PreviewPart,
    part3 as unknown as PreviewPart,
    part4 as unknown as PreviewPart,
    part5 as unknown as PreviewPart,
];

export const CONDITION = {
    slug: 'schizophrenia',
    name: 'Schizophrenia',
    reviewerCredit: 'Reviewed by Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology.',
    // One-line promise beneath the name is pulled from Part 1's thesis.claim (build plan §12).
    promise: PARTS[0].meta.thesis_claim,
    // Three inherited StatCards, echoes of the three most surprising claims across the guide.
    // (Attributed to their source study + part; the hub holds no prose of its own.)
    hubStats: [
        { value: '~0.7', suffix: '%', label: 'lifetime risk of ever developing schizophrenia, far below the ~6% who ever have a psychotic experience', source: 'Saha 2005 · Part 1' },
        { value: '287', suffix: '', label: 'genomic loci carry risk, there is no single "schizophrenia gene"', source: 'Trubetskoy 2022 · Part 3' },
        { value: '14.5', suffix: ' yrs', label: 'of life lost on average, driven mostly by preventable cardiovascular disease, not suicide alone', source: 'Hjorthøj 2017 · Part 5' },
    ],
};

export const PREVIEW_BASE = '/preview/conditions/schizophrenia';
export function partPath(slug: string) {
    return `${PREVIEW_BASE}/${slug}`;
}
export function getPart(slug: string): PreviewPart | undefined {
    return PARTS.find((p) => p.slug === slug);
}
