/**
 * Toolkit Admin Service
 *
 * Admin-only reads and the single publish mutation backing the toolkit review
 * surface. RLS does the real gating: `listAll` returns every toolkit only for
 * callers that satisfy `is_admin()`, and `publish` succeeds only for
 * `is_admin_writer()` (super_admin / clinical_admin). Publishing is the only
 * state change exposed — nothing here deletes or auto-publishes.
 */

import { supabase } from '../lib/supabaseClient';
import type { Toolkit } from './toolkitService';

const TOOLKIT_COLUMNS =
    'id, theme_title, clinical_subtitle, intro_md, status, needs_clinical_review, sort_order';

export const toolkitAdminService = {
    /** All toolkits (review + published), ordered for the review list. */
    listAll: async (): Promise<Toolkit[]> => {
        const { data, error } = await supabase
            .from('toolkits')
            .select(TOOLKIT_COLUMNS)
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('Error fetching toolkits for review:', error);
            throw error;
        }
        return (data ?? []) as Toolkit[];
    },

    /** Flip a toolkit to published. Returns the updated row, or throws on denial. */
    publish: async (id: string): Promise<Toolkit> => {
        const { data, error } = await supabase
            .from('toolkits')
            .update({ status: 'published' })
            .eq('id', id)
            .select(TOOLKIT_COLUMNS)
            .single();

        if (error) {
            console.error('Error publishing toolkit:', error);
            throw error;
        }
        return data as Toolkit;
    },
};
