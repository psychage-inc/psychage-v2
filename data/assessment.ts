
export interface Question {
  id: number;
  text: string;
  dimension: 'anxiety' | 'mood' | 'stress' | 'sleep';
  options: {
    text: string;
    value: number;
  }[];
}

export const assessmentQuestions: Question[] = [
  {
    id: 1,
    text: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?",
    dimension: 'anxiety',
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 2,
    text: "Have you not been able to stop or control worrying?",
    dimension: 'anxiety',
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 3,
    text: "Little interest or pleasure in doing things?",
    dimension: 'mood',
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 4,
    text: "Feeling down, depressed, or hopeless?",
    dimension: 'mood',
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 5,
    text: "Trouble falling or staying asleep, or sleeping too much?",
    dimension: 'sleep',
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 6,
    text: "Feeling overwhelmed by your daily responsibilities?",
    dimension: 'stress',
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 7,
    text: "Feeling tired or having little energy?",
    dimension: 'sleep',
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 8,
    text: "Poor appetite or overeating?",
    dimension: 'stress',
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  }
];
