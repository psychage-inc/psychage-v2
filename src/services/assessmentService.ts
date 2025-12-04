import { Question } from '../types/models';
import { assessmentQuestions } from '../data/assessment';

export const assessmentService = {
    getQuestions: async (): Promise<Question[]> => {
        await new Promise(resolve => setTimeout(resolve, 700));
        return assessmentQuestions as unknown as Question[];
    }
};
