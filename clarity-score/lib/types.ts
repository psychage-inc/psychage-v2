export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            assessments: {
                Row: {
                    id: string
                    user_id: string | null
                    created_at: string
                    answers: Json
                    total_score: number
                    domain_scores: Json
                    flags: string[]
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    created_at?: string
                    answers: Json
                    total_score: number
                    domain_scores: Json
                    flags?: string[]
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    created_at?: string
                    answers?: Json
                    total_score?: number
                    domain_scores?: Json
                    flags?: string[]
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

export interface ClarityScoreResults {
    id: string;
    totalScore: number;
    domainScores: {
        emotional: number;     // PHQ-4
        vitality: number;      // WHO-5
        social: number;        // UCLA-3
        cognitive: number;     // PSS-4
        functioning: number;   // Custom
    };
    rawScores: Record<string, number>;
    subScores: {
        phq2: number;
        gad2: number;
        who5Percentage: number;
        uclaScore: number;
        pssScore: number;
    };
    flags: string[];
    strengths: string[];
    growthAreas: string[];
    completedAt: string;
}

export interface AssessmentHistoryItem {
    id: string;
    total_score: number;
    created_at: string;
    label?: string;
    results: ClarityScoreResults;
}

export interface AssessmentState {
    currentDomain: number;
    currentItem: number;
    answers: Record<string, number>;
}
