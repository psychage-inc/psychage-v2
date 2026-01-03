import { Question } from '../types/models';
import { api } from '../lib/api';
import { useMemo } from 'react';

// Fallback to mock data if API fails
import { assessmentQuestions as mockQuestions } from '../data/assessment';

const USE_API = import.meta.env.VITE_API_URL ? true : false;

export interface AssessmentResult {
    score: number;
    breakdown: {
        anxiety: number;
        mood: number;
        stress: number;
        sleep: number;
    };
    recommendations: string[];
}

export const assessmentService = {
    getQuestions: async (): Promise<Question[]> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 700));
            return mockQuestions as unknown as Question[];
        }

        try {
            const response = await api.get<Question[]>('/api/assessment/questions');
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch assessment questions from API, using mock data:', error);
            return mockQuestions as unknown as Question[];
        }
    },

    submitAssessment: async (answers: Record<number, number>): Promise<AssessmentResult> => {
        if (!USE_API) {
            // Calculate mock result
            await new Promise(resolve => setTimeout(resolve, 1000));
            const questions = mockQuestions as unknown as Question[];

            const breakdown = {
                anxiety: 0,
                mood: 0,
                stress: 0,
                sleep: 0
            };

            let totalScore = 0;
            let questionCount = 0;

            Object.entries(answers).forEach(([questionId, value]) => {
                const question = questions.find(q => q.id === parseInt(questionId));
                if (question) {
                    breakdown[question.dimension] += value;
                    totalScore += value;
                    questionCount++;
                }
            });

            // Normalize to 0-100 scale (inverted - higher is better)
            const maxPossible = questionCount * 3;
            const normalizedScore = Math.round(((maxPossible - totalScore) / maxPossible) * 100);

            return {
                score: normalizedScore,
                breakdown,
                recommendations: generateRecommendations(breakdown)
            };
        }

        try {
            const response = await api.post<AssessmentResult>('/api/assessment/submit', { answers });
            return response.data || { score: 0, breakdown: { anxiety: 0, mood: 0, stress: 0, sleep: 0 }, recommendations: [] };
        } catch (error) {
            console.error('Failed to submit assessment to API:', error);
            throw error;
        }
    }
};

function generateRecommendations(breakdown: AssessmentResult['breakdown']): string[] {
    const recommendations: string[] = [];

    if (breakdown.anxiety >= 4) {
        recommendations.push('Consider practicing daily breathing exercises or meditation');
        recommendations.push('Limit caffeine intake and try grounding techniques');
    }
    if (breakdown.mood >= 4) {
        recommendations.push('Try to maintain a regular routine and stay connected with loved ones');
        recommendations.push('Consider speaking with a mental health professional');
    }
    if (breakdown.stress >= 4) {
        recommendations.push('Practice time management and set realistic goals');
        recommendations.push('Take regular breaks and engage in physical activity');
    }
    if (breakdown.sleep >= 4) {
        recommendations.push('Establish a consistent sleep schedule');
        recommendations.push('Create a relaxing bedtime routine and limit screen time before bed');
    }

    if (recommendations.length === 0) {
        recommendations.push('Continue maintaining your healthy habits');
        recommendations.push('Regular self-check-ins help maintain mental wellness');
    }

    return recommendations;
}

// Hook wrapper for React components
export function useAssessmentService() {
    return useMemo(() => assessmentService, []);
}
