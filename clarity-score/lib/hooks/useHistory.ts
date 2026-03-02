import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export function useAssessmentHistory(page = 1) {
    return useQuery({
        queryKey: ['assessmentHistory', page],
        queryFn: () => api.getHistory(page),
        staleTime: 5 * 60 * 1000 // 5 minutes
    });
}
