import { Question } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

// Fallback to mock data if Supabase fails
import { assessmentQuestions as mockQuestions } from '../data/assessment';

export interface AssessmentResult {
    id?: string;
    score: number;
    breakdown: {
        anxiety: number;
        mood: number;
        stress: number;
        sleep: number;
    };
    recommendations: string[];
    created_at?: string;
}

export const assessmentService = {
    getQuestions: async (): Promise<Question[]> => {
        try {
            const { data, error } = await supabase
                .from('assessment_questions')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw error;
            return (data || []).map(mapToQuestion);
        } catch (error) {
            console.error('Failed to fetch assessment questions from Supabase, using mock data:', error);
            return mockQuestions as unknown as Question[];
        }
    },

    submitAssessment: async (answers: Record<number, number>, userId?: string): Promise<AssessmentResult> => {
        try {
            // First get questions to calculate breakdown
            const questions = await assessmentService.getQuestions();

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
            const recommendations = generateRecommendations(breakdown);

            // Save to Supabase if user is authenticated
            if (userId) {
                const { data, error } = await supabase
                    .from('assessment_results')
                    .insert({
                        user_id: userId,
                        score: normalizedScore,
                        breakdown,
                        answers,
                        recommendations
                    })
                    .select()
                    .single();

                if (error) {
                    console.error('Failed to save assessment result:', error);
                } else if (data) {
                    return {
                        id: data.id,
                        score: normalizedScore,
                        breakdown,
                        recommendations,
                        created_at: data.created_at
                    };
                }
            }

            return {
                score: normalizedScore,
                breakdown,
                recommendations
            };
        } catch (error) {
            console.error('Failed to submit assessment:', error);
            throw error;
        }
    },

    getHistory: async (userId: string): Promise<AssessmentResult[]> => {
        try {
            const { data, error } = await supabase
                .from('assessment_results')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return (data || []).map(item => ({
                id: item.id,
                score: item.score,
                breakdown: item.breakdown,
                recommendations: item.recommendations || [],
                created_at: item.created_at
            }));
        } catch (error) {
            console.error('Failed to fetch assessment history:', error);
            return [];
        }
    },

    getStats: async (userId: string): Promise<{ averageScore: number; totalAssessments: number; latestScore: number | null; trend: 'up' | 'down' | 'stable' }> => {
        try {
            const { data, error } = await supabase
                .from('assessment_results')
                .select('score, created_at')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!data || data.length === 0) {
                return { averageScore: 0, totalAssessments: 0, latestScore: null, trend: 'stable' };
            }

            const scores = data.map(d => d.score);
            const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
            const latestScore = scores[0];

            // Determine trend based on last 3 assessments
            let trend: 'up' | 'down' | 'stable' = 'stable';
            if (scores.length >= 2) {
                const recentAvg = scores.slice(0, Math.min(3, scores.length)).reduce((a, b) => a + b, 0) / Math.min(3, scores.length);
                const olderAvg = scores.length > 3
                    ? scores.slice(3).reduce((a, b) => a + b, 0) / (scores.length - 3)
                    : scores[scores.length - 1];

                if (recentAvg > olderAvg + 5) trend = 'up';
                else if (recentAvg < olderAvg - 5) trend = 'down';
            }

            return {
                averageScore,
                totalAssessments: data.length,
                latestScore,
                trend
            };
        } catch (error) {
            console.error('Failed to fetch assessment stats:', error);
            return { averageScore: 0, totalAssessments: 0, latestScore: null, trend: 'stable' };
        }
    }
};

interface QuestionRow {
    id: number;
    text: string;
    dimension: 'anxiety' | 'mood' | 'stress' | 'sleep';
    options: { text: string; value: number }[];
}

function mapToQuestion(data: QuestionRow): Question {
    return {
        id: data.id,
        text: data.text,
        dimension: data.dimension,
        options: data.options || []
    };
}

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
