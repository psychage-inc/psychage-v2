
export interface Symptom {
    id: string;
    label: string;
    category: 'physical' | 'emotional' | 'cognitive' | 'behavioral';
    severity?: number; // 1-10, added during refinement
}

export interface Condition {
    id: string;
    name: string;
    description: string;
    matchRate: number; // calculated at runtime
    symptoms: string[]; // IDs of symptoms associated with this condition
    redFlags: string[]; // IDs of critical symptoms
    recommendedAction: string;
    articleId?: string; // Link to Learn content
}

export const SYMPTOMS: Symptom[] = [
    // Emotional
    { id: 'sadness', label: 'Persistent Sadness', category: 'emotional' },
    { id: 'anxiety', label: 'Excessive Worry', category: 'emotional' },
    { id: 'irritability', label: 'Irritability', category: 'emotional' },
    { id: 'hopelessness', label: 'Hopelessness', category: 'emotional' },
    { id: 'mood_swings', label: 'Mood Swings', category: 'emotional' },
    { id: 'numbness', label: 'Emotional Numbness', category: 'emotional' },

    // Cognitive
    { id: 'brain_fog', label: 'Brain Fog', category: 'cognitive' },
    { id: 'concentration', label: 'Difficulty Concentrating', category: 'cognitive' },
    { id: 'racing_thoughts', label: 'Racing Thoughts', category: 'cognitive' },
    { id: 'memory', label: 'Memory Issues', category: 'cognitive' },
    { id: 'intrusive_thoughts', label: 'Intrusive Thoughts', category: 'cognitive' },

    // Physical
    { id: 'fatigue', label: 'Fatigue', category: 'physical' },
    { id: 'insomnia', label: 'Insomnia', category: 'physical' },
    { id: 'oversleeping', label: 'Oversleeping', category: 'physical' },
    { id: 'appetite_loss', label: 'Loss of Appetite', category: 'physical' },
    { id: 'appetite_gain', label: 'Increased Appetite', category: 'physical' },
    { id: 'palpitations', label: 'Heart Palpitations', category: 'physical' },
    { id: 'tension', label: 'Muscle Tension', category: 'physical' },

    // Behavioral
    { id: 'isolation', label: 'Social Withdrawal', category: 'behavioral' },
    { id: 'procrastination', label: 'Avoidance/Procrastination', category: 'behavioral' },
    { id: 'compulsions', label: 'Repetitive Behaviors', category: 'behavioral' },
    { id: 'risk_taking', label: 'Risky Behavior', category: 'behavioral' },

    // Crisis (Red Flags)
    { id: 'suicidal_thoughts', label: 'Thoughts of Self-Harm', category: 'emotional' },
    { id: 'hallucinations', label: 'Seeing/Hearing things', category: 'cognitive' },
];

export const CONDITIONS: Omit<Condition, 'matchRate'>[] = [
    {
        id: 'depression',
        name: 'Major Depressive Disorder',
        description: 'A mood disorder that causes a persistent feeling of sadness and loss of interest.',
        symptoms: ['sadness', 'hopelessness', 'fatigue', 'insomnia', 'oversleeping', 'appetite_loss', 'appetite_gain', 'concentration', 'isolation', 'numbness'],
        redFlags: ['suicidal_thoughts'],
        recommendedAction: 'Consult a mental health professional for a full evaluation. Therapy (CBT) and medication are common treatments.',
        articleId: '1' // Using ID from articles/en.tsx if available or placeholder
    },
    {
        id: 'gad',
        name: 'Generalized Anxiety Disorder',
        description: 'Severe, ongoing anxiety that interferes with daily activities.',
        symptoms: ['anxiety', 'worry', 'tension', 'palpitations', 'insomnia', 'racing_thoughts', 'irritability', 'brain_fog'],
        redFlags: [],
        recommendedAction: 'Therapy, particularly CBT, is highly effective. Mindfulness and lifestyle changes also help.',
        articleId: 'understanding-anxiety-guide'
    },
    {
        id: 'burnout',
        name: 'Professional Burnout',
        description: 'A state of emotional, physical, and mental exhaustion caused by excessive and prolonged stress.',
        symptoms: ['fatigue', 'cynicism', 'irritability', 'brain_fog', 'procrastination', 'numbness', 'insomnia'],
        redFlags: [],
        recommendedAction: 'Prioritize rest and boundary setting. Evaluate work-life balance and consider professional support.',
    },
    {
        id: 'adhd',
        name: 'ADHD (Inattentive Type)',
        description: 'A chronic condition including attention difficulty, hyperactivity, and impulsiveness.',
        symptoms: ['concentration', 'brain_fog', 'procrastination', 'memory', 'racing_thoughts', 'isolation'],
        redFlags: [],
        recommendedAction: 'A specialist can provide a formal diagnosis. Medication and coaching are effective management strategies.',
    },
    {
        id: 'ocd',
        name: 'Obsessive-Compulsive Disorder',
        description: 'Excessive thoughts (obsessions) that lead to repetitive behaviors (compulsions).',
        symptoms: ['intrusive_thoughts', 'compulsions', 'anxiety', 'worry'],
        redFlags: [],
        recommendedAction: 'ERP (Exposure and Response Prevention) therapy is the gold standard treatment for OCD.',
    }
];

export const checkSymptoms = (selectedSymptomIds: string[]): { conditions: Condition[], isCrisis: boolean } => {
    // 1. Check for Crisis
    const isCrisis = selectedSymptomIds.some(id =>
        ['suicidal_thoughts', 'hallucinations'].includes(id)
    );

    if (isCrisis) return { conditions: [], isCrisis: true };

    // 2. Calculate Matches
    const matches = CONDITIONS.map(condition => {
        const matchCount = condition.symptoms.filter(s => selectedSymptomIds.includes(s)).length;
        const totalSymptoms = condition.symptoms.length;
        // Simple algorithm: % of condition's symptoms present in selection
        // Could also do Jaccard index or similar
        const rawScore = matchCount / totalSymptoms;
        const matchRate = Math.round(rawScore * 100);

        return {
            ...condition,
            matchRate
        };
    })
        .filter(c => c.matchRate > 20) // Filter out low quality matches
        .sort((a, b) => b.matchRate - a.matchRate); // Sort by highest match

    return { conditions: matches.slice(0, 3), isCrisis: false }; // Return top 3
};
