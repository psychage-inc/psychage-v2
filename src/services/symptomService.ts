import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

export interface ConditionMatch {
    id: string;
    name: string;
    matchRate: number;
    description: string;
    recommendedAction: string;
    articleId?: number;
}

export interface SymptomCheckResult {
    conditions: ConditionMatch[];
    isCrisis: boolean;
}

export interface CrisisResource {
    id?: string;
    name: string;
    phone: string;
    description: string;
    available: string;
}

export interface Symptom {
    id: string;
    name: string;
    category: string;
    is_crisis: boolean;
}

interface ConditionRow {
    id: string;
    name: string;
    description: string;
    recommended_action: string;
    article_id?: number;
}

// Fallback crisis resources if DB fails
const fallbackCrisisResources: CrisisResource[] = [
    {
        name: '988 Suicide & Crisis Lifeline',
        phone: '988',
        description: 'Free, confidential support for people in distress',
        available: '24/7'
    },
    {
        name: 'Crisis Text Line',
        phone: 'Text HOME to 741741',
        description: 'Free crisis counseling via text message',
        available: '24/7'
    },
    {
        name: 'National Domestic Violence Hotline',
        phone: '1-800-799-7233',
        description: 'Support for domestic violence survivors',
        available: '24/7'
    }
];

// Fallback condition database
const fallbackConditions: ConditionMatch[] = [
    {
        id: 'anxiety',
        name: 'Generalized Anxiety Disorder',
        matchRate: 85,
        description: 'Persistent and excessive worry about various aspects of daily life that is difficult to control.',
        recommendedAction: 'Consider speaking with a mental health professional for proper evaluation and treatment options.',
        articleId: 1
    },
    {
        id: 'depression',
        name: 'Major Depressive Disorder',
        matchRate: 72,
        description: 'A mood disorder characterized by persistent feelings of sadness, hopelessness, and loss of interest.',
        recommendedAction: 'Schedule an appointment with a psychiatrist or psychologist for comprehensive assessment.',
        articleId: 2
    },
    {
        id: 'stress',
        name: 'Chronic Stress',
        matchRate: 68,
        description: 'Long-term activation of the stress response system that can impact physical and mental health.',
        recommendedAction: 'Explore stress management techniques and consider lifestyle changes.',
        articleId: 3
    }
];

export const symptomService = {
    getSymptoms: async (): Promise<Symptom[]> => {
        try {
            const { data, error } = await supabase
                .from('symptoms')
                .select('*')
                .order('category', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Failed to fetch symptoms from Supabase:', error);
            return [];
        }
    },

    checkSymptoms: async (selectedIds: string[]): Promise<SymptomCheckResult> => {
        try {
            // Check if any selected symptoms are crisis symptoms
            const { data: crisisSymptoms, error: crisisError } = await supabase
                .from('symptoms')
                .select('id')
                .in('id', selectedIds)
                .eq('is_crisis', true);

            if (crisisError) throw crisisError;

            if (crisisSymptoms && crisisSymptoms.length > 0) {
                return { conditions: [], isCrisis: true };
            }

            // Get matching conditions based on symptoms
            const { data: conditions, error: condError } = await supabase
                .from('conditions')
                .select('*, condition_symptoms!inner(symptom_id)')
                .in('condition_symptoms.symptom_id', selectedIds);

            if (condError) throw condError;

            if (!conditions || conditions.length === 0) {
                // Fallback to basic matching
                const numConditions = Math.min(selectedIds.length, 3);
                return {
                    conditions: fallbackConditions.slice(0, numConditions).map((c, i) => ({
                        ...c,
                        matchRate: Math.max(50, c.matchRate - (i * 10))
                    })),
                    isCrisis: false
                };
            }

            // Calculate match rates based on symptom overlap
            const matchedConditions: ConditionMatch[] = conditions.map((cond: ConditionRow) => ({
                id: cond.id,
                name: cond.name,
                matchRate: Math.min(95, 50 + (selectedIds.length * 10)),
                description: cond.description,
                recommendedAction: cond.recommended_action,
                articleId: cond.article_id
            }));

            return {
                conditions: matchedConditions.slice(0, 3),
                isCrisis: false
            };
        } catch (error) {
            console.error('Failed to check symptoms via Supabase, using fallback:', error);
            // Fallback logic
            const numConditions = Math.min(selectedIds.length, 3);
            return {
                conditions: fallbackConditions.slice(0, numConditions).map((c, i) => ({
                    ...c,
                    matchRate: Math.max(50, c.matchRate - (i * 10))
                })),
                isCrisis: false
            };
        }
    },

    getCrisisResources: async (): Promise<CrisisResource[]> => {
        try {
            const { data, error } = await supabase
                .from('crisis_resources')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (error) throw error;
            return (data || []).map(r => ({
                id: r.id,
                name: r.name,
                phone: r.phone,
                description: r.description,
                available: r.available
            }));
        } catch (error) {
            console.error('Failed to fetch crisis resources from Supabase, using fallback:', error);
            return fallbackCrisisResources;
        }
    },

    getConditions: async (): Promise<ConditionMatch[]> => {
        try {
            const { data, error } = await supabase
                .from('conditions')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            return (data || []).map((c: ConditionRow) => ({
                id: c.id,
                name: c.name,
                matchRate: 0,
                description: c.description,
                recommendedAction: c.recommended_action,
                articleId: c.article_id
            }));
        } catch (error) {
            console.error('Failed to fetch conditions:', error);
            return fallbackConditions;
        }
    }
};

// Keep the standalone function for backward compatibility
export function checkSymptoms(selectedIds: string[]): SymptomCheckResult {
    const numConditions = Math.min(selectedIds.length, 3);
    return {
        conditions: fallbackConditions.slice(0, numConditions).map((c, i) => ({
            ...c,
            matchRate: Math.max(50, c.matchRate - (i * 10))
        })),
        isCrisis: false
    };
}

// Hook wrapper for React components
export function useSymptomService() {
    return useMemo(() => symptomService, []);
}
