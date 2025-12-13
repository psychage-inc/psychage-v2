// symptomService.ts - Symptom checker service

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

export function checkSymptoms(selectedIds: string[]): SymptomCheckResult {
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
    checkSymptoms
};
