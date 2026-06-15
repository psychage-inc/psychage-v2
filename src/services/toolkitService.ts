/**
 * Toolkit Service
 *
 * Read access to condition-mapped educational toolkits and their ordered items.
 * Row-level security enforces that anon/authenticated callers can only read
 * toolkits with `status = 'published'` and the items of published toolkits —
 * so a `status = 'review'` toolkit is invisible here by construction.
 *
 * No assessment data (Clarity Score / Symptom Navigator) is referenced or
 * joined. Toolkits are educational collections that link OUT to existing tools.
 */

import { supabase } from '../lib/supabaseClient';
import type { ToolkitItemKind } from '../lib/toolkitRegistry';

export type ToolkitStatus = 'review' | 'published';

export interface Toolkit {
    id: string;
    theme_title: string;
    clinical_subtitle: string | null;
    intro_md: string | null;
    status: ToolkitStatus;
    needs_clinical_review: boolean;
    sort_order: number;
}

export interface ToolkitItem {
    id: string;
    toolkit_id: string;
    kind: ToolkitItemKind;
    ref_id: string;
    label: string;
    sort_order: number;
}

export interface ToolkitWithItems extends Toolkit {
    items: ToolkitItem[];
}

const TOOLKIT_COLUMNS =
    'id, theme_title, clinical_subtitle, intro_md, status, needs_clinical_review, sort_order';
const ITEM_COLUMNS = 'id, toolkit_id, kind, ref_id, label, sort_order';

export const toolkitService = {
    /**
     * List published toolkits, ordered for display. RLS guarantees only
     * `status = 'published'` rows are returned regardless of the filter.
     */
    listPublished: async (): Promise<Toolkit[]> => {
        try {
            const { data, error } = await supabase
                .from('toolkits')
                .select(TOOLKIT_COLUMNS)
                .eq('status', 'published')
                .order('sort_order', { ascending: true });

            if (error) {
                console.error('Error fetching toolkits:', error);
                return [];
            }
            return (data ?? []) as Toolkit[];
        } catch (error) {
            console.error('Failed to fetch toolkits:', error);
            return [];
        }
    },

    /**
     * Fetch one toolkit and its ordered items by id. Returns null when the
     * toolkit is not readable (e.g. still in review) or does not exist.
     */
    getById: async (id: string): Promise<ToolkitWithItems | null> => {
        try {
            const { data: toolkit, error } = await supabase
                .from('toolkits')
                .select(TOOLKIT_COLUMNS)
                .eq('id', id)
                .maybeSingle();

            if (error) {
                console.error('Error fetching toolkit:', error);
                return null;
            }
            if (!toolkit) return null;

            const { data: items, error: itemsError } = await supabase
                .from('toolkit_items')
                .select(ITEM_COLUMNS)
                .eq('toolkit_id', id)
                .order('sort_order', { ascending: true });

            if (itemsError) {
                console.error('Error fetching toolkit items:', itemsError);
            }

            return {
                ...(toolkit as Toolkit),
                items: (items ?? []) as ToolkitItem[],
            };
        } catch (error) {
            console.error('Failed to fetch toolkit:', error);
            return null;
        }
    },
};
