export interface ScaleOptionData {
    value: number;
    label: string;
}

export interface Question {
    id: string;
    domainId: number;
    text: string;
    options: ScaleOptionData[];
}

export const DOMAINS = [
    { id: 0, name: 'Emotional', description: 'PHQ-4', citation: 'Over the last 2 weeks...', color: 'text-teal', bgColor: 'bg-teal' },
    { id: 1, name: 'Vitality', description: 'WHO-5', citation: 'Over the last 2 weeks...', color: 'text-indigo-500', bgColor: 'bg-indigo-500' },
    { id: 2, name: 'Social', description: 'UCLA-3', citation: 'How often do you feel...', color: 'text-pink-500', bgColor: 'bg-pink-500' },
    { id: 3, name: 'Cognitive', description: 'PSS-4', citation: 'In the last month...', color: 'text-amber-500', bgColor: 'bg-amber-500' },
    { id: 4, name: 'Functioning', description: 'General', citation: 'Over the last 2 weeks...', color: 'text-emerald-500', bgColor: 'bg-emerald-500' },
];

const phqOptions: ScaleOptionData[] = [
    { value: 0, label: 'Not at all' },
    { value: 1, label: 'Several days' },
    { value: 2, label: 'More than half the days' },
    { value: 3, label: 'Nearly every day' },
];

const who5Options: ScaleOptionData[] = [
    { value: 0, label: 'All of the time' },
    { value: 1, label: 'Most of the time' },
    { value: 2, label: 'More than half of the time' },
    { value: 3, label: 'Less than half of the time' },
    { value: 4, label: 'Some of the time' },
    { value: 5, label: 'At no time' },
];

const uclaOptions: ScaleOptionData[] = [
    { value: 1, label: 'Hardly ever' },
    { value: 2, label: 'Some of the time' },
    { value: 3, label: 'Often' },
];

const pssDirectOptions: ScaleOptionData[] = [
    { value: 0, label: 'Never' },
    { value: 1, label: 'Almost never' },
    { value: 2, label: 'Sometimes' },
    { value: 3, label: 'Fairly often' },
    { value: 4, label: 'Very often' },
];

const functioningOptions: ScaleOptionData[] = [
    { value: 0, label: 'Not at all' },
    { value: 1, label: 'A little bit' },
    { value: 2, label: 'Moderately' },
    { value: 3, label: 'Quite a bit' },
    { value: 4, label: 'Extremely' },
];

export const QUESTIONS: Question[] = [
    // PHQ-4
    { id: 'q1', domainId: 0, text: 'Feeling nervous, anxious or on edge', options: phqOptions },
    { id: 'q2', domainId: 0, text: 'Not being able to stop or control worrying', options: phqOptions },
    { id: 'q3', domainId: 0, text: 'Little interest or pleasure in doing things', options: phqOptions },
    { id: 'q4', domainId: 0, text: 'Feeling down, depressed, or hopeless', options: phqOptions },

    // WHO-5
    { id: 'q5', domainId: 1, text: 'I have felt cheerful and in good spirits', options: who5Options },
    { id: 'q6', domainId: 1, text: 'I have felt calm and relaxed', options: who5Options },
    { id: 'q7', domainId: 1, text: 'I have felt active and vigorous', options: who5Options },
    { id: 'q8', domainId: 1, text: 'I woke up feeling fresh and rested', options: who5Options },
    { id: 'q9', domainId: 1, text: 'My daily life has been filled with things that interest me', options: who5Options },

    // UCLA-3
    { id: 'q10', domainId: 2, text: 'How often do you feel that you lack companionship?', options: uclaOptions },
    { id: 'q11', domainId: 2, text: 'How often do you feel left out?', options: uclaOptions },
    { id: 'q12', domainId: 2, text: 'How often do you feel isolated from others?', options: uclaOptions },

    // PSS-4
    { id: 'q13', domainId: 3, text: 'How often have you felt that you were unable to control the important things in your life?', options: pssDirectOptions },
    { id: 'q14', domainId: 3, text: 'How often have you felt confident about your ability to handle your personal problems?', options: pssDirectOptions },
    { id: 'q15', domainId: 3, text: 'How often have you felt that things were going your way?', options: pssDirectOptions },
    { id: 'q16', domainId: 3, text: 'How often have you felt difficulties were piling up so high that you could not overcome them?', options: pssDirectOptions },

    // Functioning
    { id: 'q17', domainId: 4, text: 'How much have your symptoms interfered with your daily life or work?', options: functioningOptions },
    { id: 'q18', domainId: 4, text: 'How much difficulty have you had maintaining personal relationships?', options: functioningOptions },
    { id: 'q19', domainId: 4, text: 'How often have you struggled to fulfill your responsibilities?', options: functioningOptions },
    { id: 'q20', domainId: 4, text: 'How much has your mental state affected your physical health?', options: functioningOptions },
];
