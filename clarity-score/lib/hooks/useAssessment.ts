import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../api';

export function useStartAssessment() {
    return useMutation({
        mutationFn: () => api.startAssessment()
    });
}

export function useSubmitAssessment() {
    return useMutation({
        mutationFn: (answers: Record<string, number>) => api.submitAssessment(answers)
    });
}

export function useAssessmentDetail(id: string) {
    return useQuery({
        queryKey: ['assessment', id],
        queryFn: () => api.getAssessment(id),
        enabled: !!id,
        staleTime: 0
    });
}

export function useShareAssessment() {
    return useMutation({
        mutationFn: ({ assessmentId, expiresInDays }: { assessmentId: string; expiresInDays?: number }) =>
            api.shareAssessment({ id: assessmentId, expiresInDays })
    });
}

export function useSharedAssessment(token: string) {
    return useQuery({
        queryKey: ['sharedAssessment', token],
        queryFn: () => api.getSharedAssessment(token),
        enabled: !!token,
        retry: false
    });
}
