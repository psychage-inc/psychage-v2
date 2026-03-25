 
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { symptomService, checkSymptoms } from '../symptomService';

const mockApi = vi.hoisted(() => ({
    symptoms: {
        getAll: vi.fn(),
        check: vi.fn(),
        getCrisisResources: vi.fn(),
        getConditions: vi.fn(),
    },
}));

vi.mock('@/lib/api', () => ({ default: mockApi }));

describe('symptomService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('getSymptoms', () => {
        it('should return symptoms from API', async () => {
            const symptoms = [{ id: 'SYM_001', name: 'Anxiety', category: 'mood', is_crisis: false }];
            mockApi.symptoms.getAll.mockResolvedValue({ success: true, data: symptoms });

            const result = await symptomService.getSymptoms();
            expect(result).toEqual(symptoms);
        });

        it('should return empty array on unsuccessful response', async () => {
            mockApi.symptoms.getAll.mockResolvedValue({ success: false, data: null });

            const result = await symptomService.getSymptoms();
            expect(result).toEqual([]);
        });

        it('should return empty array on error', async () => {
            mockApi.symptoms.getAll.mockRejectedValue(new Error('network'));

            const result = await symptomService.getSymptoms();
            expect(result).toEqual([]);
        });
    });

    describe('checkSymptoms (service)', () => {
        it('should return API results on success', async () => {
            const apiResult = {
                conditions: [{ id: 'gad', name: 'GAD', matchRate: 90 }],
                isCrisis: false,
            };
            mockApi.symptoms.check.mockResolvedValue({ success: true, data: apiResult });

            const result = await symptomService.checkSymptoms(['SYM_001']);
            expect(result).toEqual(apiResult);
        });

        it('should use fallback conditions when API fails', async () => {
            mockApi.symptoms.check.mockResolvedValue({ success: false, data: null });

            const result = await symptomService.checkSymptoms(['s1', 's2']);
            expect(result.conditions).toHaveLength(2);
            expect(result.isCrisis).toBe(false);
            expect(result.conditions[0].name).toBe('Generalized Anxiety Disorder');
        });

        it('should limit fallback conditions to number of selected symptoms', async () => {
            mockApi.symptoms.check.mockRejectedValue(new Error('network'));

            const result = await symptomService.checkSymptoms(['s1']);
            expect(result.conditions).toHaveLength(1);
        });

        it('should cap fallback conditions at 3', async () => {
            mockApi.symptoms.check.mockRejectedValue(new Error('err'));

            const result = await symptomService.checkSymptoms(['s1', 's2', 's3', 's4', 's5']);
            expect(result.conditions).toHaveLength(3);
        });

        it('should decrease match rate for subsequent fallback conditions', async () => {
            mockApi.symptoms.check.mockRejectedValue(new Error('err'));

            const result = await symptomService.checkSymptoms(['s1', 's2', 's3']);
            expect(result.conditions[0].matchRate).toBeGreaterThan(result.conditions[1].matchRate);
            expect(result.conditions[1].matchRate).toBeGreaterThan(result.conditions[2].matchRate);
        });
    });

    describe('getCrisisResources', () => {
        it('should return API resources on success', async () => {
            const resources = [{ name: '988', phone: '988' }];
            mockApi.symptoms.getCrisisResources.mockResolvedValue({ success: true, data: resources });

            const result = await symptomService.getCrisisResources();
            expect(result).toEqual(resources);
        });

        it('should return fallback resources when API fails', async () => {
            mockApi.symptoms.getCrisisResources.mockResolvedValue({ success: false, data: null });

            const result = await symptomService.getCrisisResources();
            expect(result.length).toBeGreaterThan(0);
            expect(result[0].name).toContain('988');
        });

        it('should return fallback resources on error', async () => {
            mockApi.symptoms.getCrisisResources.mockRejectedValue(new Error('err'));

            const result = await symptomService.getCrisisResources();
            expect(result.length).toBe(3);
        });
    });

    describe('getConditions', () => {
        it('should return API conditions on success', async () => {
            const conditions = [{ id: 'test', name: 'Test Condition' }];
            mockApi.symptoms.getConditions.mockResolvedValue({ success: true, data: conditions });

            const result = await symptomService.getConditions();
            expect(result).toEqual(conditions);
        });

        it('should return fallback conditions on failure', async () => {
            mockApi.symptoms.getConditions.mockRejectedValue(new Error('err'));

            const result = await symptomService.getConditions();
            expect(result.length).toBe(3);
            expect(result[0].id).toBe('anxiety');
        });
    });
});

describe('checkSymptoms (standalone function)', () => {
    it('should return conditions based on selected symptom count', () => {
        const result = checkSymptoms(['s1', 's2']);
        expect(result.conditions).toHaveLength(2);
        expect(result.isCrisis).toBe(false);
    });

    it('should cap at 3 conditions', () => {
        const result = checkSymptoms(['s1', 's2', 's3', 's4']);
        expect(result.conditions).toHaveLength(3);
    });

    it('should return decreasing match rates', () => {
        const result = checkSymptoms(['s1', 's2', 's3']);
        for (let i = 1; i < result.conditions.length; i++) {
            expect(result.conditions[i].matchRate).toBeLessThanOrEqual(result.conditions[i - 1].matchRate);
        }
    });

    it('should never return match rate below 50', () => {
        const result = checkSymptoms(['s1', 's2', 's3']);
        result.conditions.forEach(c => {
            expect(c.matchRate).toBeGreaterThanOrEqual(50);
        });
    });
});
