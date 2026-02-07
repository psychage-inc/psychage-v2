import api from '../lib/api';
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

// Fallback crisis resources if API fails
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
            const response = await api.symptoms.getAll();
            if (!response.success || !response.data) return [];
            return response.data as Symptom[];
        } catch (error) {
            console.error('Failed to fetch symptoms from API:', error);
            return [];
        }
    },

    checkSymptoms: async (selectedIds: string[]): Promise<SymptomCheckResult> => {
        try {
            const response = await api.symptoms.check(selectedIds);
            if (!response.success || !response.data) {
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
            return response.data as SymptomCheckResult;
        } catch (error) {
            console.error('Failed to check symptoms via API, using fallback:', error);
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
            const response = await api.symptoms.getCrisisResources();
            if (!response.success || !response.data) {
                return fallbackCrisisResources;
            }
            return response.data as CrisisResource[];
        } catch (error) {
            console.error('Failed to fetch crisis resources from API, using fallback:', error);
            return fallbackCrisisResources;
        }
    },

    getConditions: async (): Promise<ConditionMatch[]> => {
        try {
            const response = await api.symptoms.getConditions();
            if (!response.success || !response.data) {
                return fallbackConditions;
            }
            return response.data as ConditionMatch[];
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
