import { api } from '../lib/api';
import { useMemo } from 'react';

const USE_API = import.meta.env.VITE_API_URL ? true : false;

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
    name: string;
    phone: string;
    description: string;
    available: string;
}

// Crisis symptom IDs
const crisisSymptomIds = [
    'suicidal-thoughts',
    'self-harm',
    'suicide-ideation',
    'crisis',
    'emergency'
];

// Mock condition database
const conditionDatabase: ConditionMatch[] = [
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

// Crisis resources
const crisisResources: CrisisResource[] = [
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

function checkSymptomsLocal(selectedIds: string[]): SymptomCheckResult {
    // Check for crisis symptoms
    const hasCrisisSymptom = selectedIds.some(id =>
        crisisSymptomIds.some(crisis => id.toLowerCase().includes(crisis))
    );

    if (hasCrisisSymptom) {
        return {
            conditions: [],
            isCrisis: true
        };
    }

    // Return mock conditions based on number of symptoms
    const numConditions = Math.min(selectedIds.length, 3);
    const conditions = conditionDatabase.slice(0, numConditions).map((condition, index) => ({
        ...condition,
        matchRate: Math.max(50, condition.matchRate - (index * 10))
    }));

    return {
        conditions,
        isCrisis: false
    };
}

export const symptomService = {
    checkSymptoms: async (selectedIds: string[]): Promise<SymptomCheckResult> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 800));
            return checkSymptomsLocal(selectedIds);
        }

        try {
            const response = await api.post<SymptomCheckResult>('/api/symptoms/check', { symptoms: selectedIds });
            return response.data || { conditions: [], isCrisis: false };
        } catch (error) {
            console.error('Failed to check symptoms via API, using local check:', error);
            return checkSymptomsLocal(selectedIds);
        }
    },

    getCrisisResources: async (): Promise<CrisisResource[]> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return crisisResources;
        }

        try {
            const response = await api.get<CrisisResource[]>('/api/symptoms/crisis-resources');
            return response.data || crisisResources;
        } catch (error) {
            console.error('Failed to fetch crisis resources from API, using local data:', error);
            return crisisResources;
        }
    }
};

// Keep the standalone function for backward compatibility
export function checkSymptoms(selectedIds: string[]): SymptomCheckResult {
    return checkSymptomsLocal(selectedIds);
}

// Hook wrapper for React components
export function useSymptomService() {
    return useMemo(() => symptomService, []);
}
