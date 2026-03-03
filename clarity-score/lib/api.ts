import { createClient } from './supabase/client';
import { calculateClarityScore } from './scoring';

// API Client Layer wrapping Supabase Edge Functions / DB
export const api = {
    async startAssessment() {
        const supabase = createClient();
        // Assuming edge function for start logic
        const { data, error } = await supabase.functions.invoke('assessment', {
            body: { action: 'start' }
        });

        if (error) {
            console.warn('Edge function failed/missing, using fallback for startAssessment');
            return { success: true };
        }
        return data;
    },

    async submitAssessment(answers: Record<string, number>) {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        const { data, error } = await supabase.functions.invoke('assessment', {
            body: { action: 'submit', answers }
        });

        if (error) {
            console.warn('Edge function failed/missing. Using local calculation fallback.');
            const scoreData = calculateClarityScore(answers);

            if (session?.user) {
                const { data: inserted, error: dbError } = await supabase
                    .from('assessments')
                    .insert({
                        user_id: session.user.id,
                        answers: answers as any,
                        total_score: scoreData.totalScore,
                        domain_scores: scoreData.domainScores as any,
                        flags: scoreData.flags
                    })
                    .select()
                    .single();

                if (dbError) throw dbError;
                return inserted;
            }

            return { id: `anon-${Date.now()}`, ...scoreData, answers };
        }

        return data;
    },

    async getAssessment(id: string) {
        const supabase = createClient();

        // For anon test results stored in sessionStorage
        if (id.startsWith('anon-')) {
            const stored = typeof window !== 'undefined' ? sessionStorage.getItem(`assessment-${id}`) : null;
            if (stored) return JSON.parse(stored);
            throw new Error('Assessment not found');
        }

        // Fetch from API / DB
        const { data, error } = await supabase
            .from('assessments')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        const scoreData = calculateClarityScore(data.answers as Record<string, number>);

        return {
            id: data.id,
            ...scoreData,
            completedAt: data.created_at
        };
    },

    async getHistory(page = 1, limit = 10) {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) throw new Error('Not authenticated');

        const { data, error, count } = await supabase
            .from('assessments')
            .select('id, total_score, created_at, answers', { count: 'exact' })
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })
            .range((page - 1) * limit, page * limit - 1);

        if (error) throw error;

        const mappedData = data?.map(item => ({
            id: item.id,
            total_score: item.total_score,
            created_at: item.created_at,
            results: {
                id: item.id,
                ...calculateClarityScore(item.answers as Record<string, number>),
                completedAt: item.created_at
            }
        })) || [];

        return {
            data: mappedData,
            count
        };
    },

    async shareAssessment({ id, expiresInDays = 7 }: { id: string; expiresInDays?: number }) {
        const supabase = createClient();
        const { data, error } = await supabase.functions.invoke('assessment-share', {
            body: { action: 'generate_token', assessment_id: id, expires_in_days: expiresInDays }
        });

        if (error) {
            // Fallback: Just return a pseudo-token mapping to ID for frontend demo purposes
            console.warn('Share edge function missing, using fallback token');
            return { token: btoa(id) };
        }
        return data;
    },

    async getSharedAssessment(token: string) {
        const supabase = createClient();
        const { data, error } = await supabase.functions.invoke('assessment-share', {
            body: { action: 'get_shared', token }
        });

        if (error) {
            // Fallback
            try {
                const id = atob(token);
                return await this.getAssessment(id);
            } catch (e) {
                throw new Error('Invalid or expired token');
            }
        }
        return data;
    }
};
