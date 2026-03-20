// ============================================================================
// Citation Type Mapper — bridges frontend Citation and admin EnhancedCitation
// ============================================================================

import type { Citation } from '@/types/models';
import type { EnhancedCitation, ExpandedSourceType } from './types';
import { SOURCE_TYPE_TO_TIER } from './constants';

/** Convert admin EnhancedCitation to frontend Citation for rendering */
export function toFrontendCitation(ec: EnhancedCitation): Citation {
    return {
        id: ec.id,
        text: ec.title,
        link: ec.url,
        source: ec.publisher || ec.journalName || ec.sourceType,
        year: ec.year?.toString(),
        tier: ec.tier,
        sourceType: ec.sourceType,
        doi: ec.doi,
        authors: ec.authors,
        journalName: ec.journalName,
        accessDate: ec.accessDate,
    };
}

/** Convert frontend Citation to admin EnhancedCitation (for editing/saving) */
export function toEnhancedCitation(
    c: Citation,
    articleId: string,
    sortOrder: number
): EnhancedCitation {
    const sourceType: ExpandedSourceType = c.sourceType || 'reference';
    return {
        id: c.id,
        articleId,
        sourceType,
        tier: c.tier || SOURCE_TYPE_TO_TIER[sourceType] || 5,
        title: c.text,
        authors: c.authors || [],
        year: c.year ? parseInt(c.year, 10) : null,
        url: c.link,
        doi: c.doi,
        journalName: c.journalName,
        sortOrder,
        createdAt: new Date().toISOString(),
    };
}
