/**
 * Generates personalized provider questions based on symptom navigator results.
 * Uses matched conditions, symptom details, and severity/duration data.
 */

import type { NavigatorResults, UserSymptomInput } from './types';

interface PersonalizedQuestionsInput {
    results: NavigatorResults;
    selectedSymptoms: Map<string, UserSymptomInput>;
    knowledgeBase?: { symptoms: Array<{ id: string; name: string }> };
}

/**
 * Generates 4-6 tailored questions for provider discussions.
 * Falls back to generic questions if results data is insufficient.
 */
export function generateProviderQuestions({
    results,
    selectedSymptoms,
    knowledgeBase
}: PersonalizedQuestionsInput): string[] {
    // Fallback generic questions if no results
    const fallbackQuestions = [
        "I've been noticing these symptoms for some time. Is this typical?",
        "Could this be related to stress, physical health, or something else?",
        "What are the most effective treatment options for someone with these specific experiences?",
        "Are there any lifestyle changes you would recommend starting today?"
    ];

    if (!results || results.results.length === 0) {
        return fallbackQuestions;
    }

    const questions: string[] = [];
    const topConditions = results.results.slice(0, 3);
    const conditionNames = topConditions.map(r => r.name);

    // Get duration information from first symptom with duration data
    const symptomWithDuration = Array.from(selectedSymptoms.values()).find(s => s.duration);
    const durationText = symptomWithDuration?.duration
        ? formatDuration(symptomWithDuration.duration)
        : 'some time';

    // Get severity information
    const severityCount = Array.from(selectedSymptoms.values()).filter(s => s.severity && s.severity >= 7).length;
    const hasSevereSymptoms = severityCount > 0;

    // Get top symptom names
    const symptomNames = Array.from(selectedSymptoms.keys())
        .slice(0, 3)
        .map(id => {
            const symptom = knowledgeBase?.symptoms.find(s => s.id === id);
            return symptom?.name || '';
        })
        .filter(Boolean);

    // Q1: Duration and pattern
    if (conditionNames.length > 0) {
        questions.push(
            `I've been experiencing ${symptomNames.slice(0, 2).join(' and ')} for ${durationText}. Could this be related to ${conditionNames[0]}?`
        );
    } else {
        questions.push(
            `I've been experiencing these symptoms for ${durationText}. What could be causing this?`
        );
    }

    // Q2: Severity and impact
    if (hasSevereSymptoms) {
        questions.push(
            `Some of these symptoms are quite intense. How concerned should I be, and what should I do if they worsen?`
        );
    } else {
        questions.push(
            `These symptoms are affecting my daily life. When should I seek more immediate help?`
        );
    }

    // Q3: Treatment options specific to conditions
    if (conditionNames.length > 1) {
        questions.push(
            `The results suggest ${conditionNames[0]} or ${conditionNames[1]}. What are the treatment approaches for each?`
        );
    } else if (conditionNames.length === 1) {
        questions.push(
            `If this is ${conditionNames[0]}, what treatment options would you recommend for my situation?`
        );
    } else {
        questions.push(
            `What treatment approaches would you recommend based on what I'm experiencing?`
        );
    }

    // Q4: Differential diagnosis
    if (conditionNames.length > 0) {
        questions.push(
            `Are there other conditions I should be aware of that have similar symptoms?`
        );
    }

    // Q5: Lifestyle and self-care
    questions.push(
        `What lifestyle changes or self-care strategies would you suggest while we work on a treatment plan?`
    );

    // Q6: Next steps
    if (results.safety.has_crisis || results.safety.has_urgent) {
        questions.push(
            `I'm experiencing some concerning symptoms. What immediate steps should I take for safety and support?`
        );
    } else {
        questions.push(
            `What should I monitor or track before our next appointment?`
        );
    }

    return questions.slice(0, 6);
}

/**
 * Formats duration enum to human-readable text
 */
function formatDuration(duration: string): string {
    const durationMap: Record<string, string> = {
        'less_than_1_week': 'less than a week',
        '1_to_2_weeks': '1-2 weeks',
        '2_to_4_weeks': '2-4 weeks',
        '1_to_3_months': '1-3 months',
        '3_to_6_months': '3-6 months',
        '6_months_to_1_year': '6 months to a year',
        'more_than_1_year': 'more than a year'
    };
    return durationMap[duration] || 'some time';
}
